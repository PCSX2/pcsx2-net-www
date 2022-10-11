---
title: "Explanation Impossible Blend"
date: 2015-06-08T00:00:00
summary: "TODO"
draft: false
tags:
  - devblog
mainAuthor: Gregory
aliases:
  - "/developer-blog/268-explanation-impossible-blend"
  - "/developer-blog/268-explanation-impossible-blend.html"
  - "/developer-blog/268-explanation-impossible-blend.htm"
---

The goal of blending is to combine two colors. The general equation on a
modern GPU is:

<!-- TODO - legacy -->

<div class="title">

Code:

</div>

`     coefficient1 * color1 +/- coefficient2 * color2    `


Color1/Color 2 are either the source color or the destination color.
Coefficient1/Coefficient2 are either the alpha value (transparency) of
source/source2/destination, 1 - alpha, or a constant. The GPU will clamp
the coefficients to \[0;1\]

The general equation on the PS2 however is:

<div class="title">

Code:

</div>

`     (Color1 - Color2) * Coefficient + Color3    `

Color1/Color2/Color3 are either the source or destination color or zero.

Coefficient is the alpha value (transparency) of the source or
destination, or a constant.

The issues we have with this are as follows:
1. In the PS2, the coefficient factor could range from \[0;2\]
(fortunately this almost never happens)
2. If Color3 and Color1 are the same source, the equation will be:



<div class="title">

Code:

</div>

`     Color1 * (1+Coefficient) - Color2 *Coefficient    `


which will result in the first half of this equation always being larger
than 1. This is a problem because the GPU is limited to 1. This is why
this type of blending is impossible on the fixed function unit of a PC's
GPU.

Our recent update fixed the second case. Since it is impossible to do
that blending on the fixed function unit, we instead emulate them in the
GPU's fragment shader. Fragment shaders are very small dedicated CPUs so
it is quite easy to do a few small operations on them.

There is a catch however. Fragment shaders (like any CPU) are relatively
slow. In order to compensate for this the fragments are executed
out-of-order. For example, if you do a draw call consisting of 2
triangles, it is possible that the second triangle will be computed
before the first one. It is quite annoying because blending is an
in-order operation. However as long as primitives don't self overlap,
only a single fragment shader must execute and therefore there is no
issue with order.

Great. At this point we just need to split the draw calls into N draw
calls without primitive overlap. It's not free performance wise to do
this, but it remains reasonable in some cases.

Moving on, we need to access the destination value to compute the final
value, however the GPU has a texture cache. The texture cache is read
only so that there is no coherency issue. The target value can be
written but all the subsequent reads will be wrong because of the
discrepancy with the cache. Getting back to the input texture case, the
texture is read only during the draw but this could change on the
following draw. There must be a way to invalidate the cache if you
upload a new texture to the same location. The driver has this ability,
but until recently applications did not. GL 4.5 changes this. A function
is provided to invalidate the cache

The end result is that we can implement basic blending in the fragment
shader instead of relying on the limited GPU core.


Proofread and corrected by [Blyss
Sarania](http://forums.pcsx2.net/User-Blyss-Sarania)

