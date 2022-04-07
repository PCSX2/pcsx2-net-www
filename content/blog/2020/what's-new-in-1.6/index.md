---
title: "What's New In 1.6"
date: 2020-06-06T00:00:00
summary: "We understand that everyone is thrilled over the release of our new stable version. In this report, we'll be covering all the significant improvements made in our new release in comparison to the previous stable version 1.4."
draft: false
tags:
  - "progress-report"
mainAuthor: ssakash
aliases:
  - "/294-1-6-0-what-s-new"
  - "/294-1-6-0-what-s-new.html"
  - "/294-1-6-0-what-s-new.htm"
toc: true
---

We understand that everyone is thrilled over the release of our new stable version. In this report, we'll be covering all the significant improvements made in our new release in comparison to the previous stable version 1.4.

## Games which went from nothing to playable

This section covers games which went from not rendering anything to
being playable, these issues are the most straight forward to fix, we
debug these issues by monitoring all the abnormal activities occurring
in the core leading to the game to crash and a solution is worked on to
correct that behavior.

- **Preliminary PSX support** has been added! Go try them out yourself,
though do note that the PSX backward compatibility is still in its
infant state and needs lots of work to be done before it reaches a
perfect state.

{{< img cols="4" src="./img/teaser_s.png">}}

- **Dropship United Peace Force** went from not being able to get into main
menu to being playable!

As it turns out, our VU branching subroutines had a longstanding bug
which failed to account for a branch delay slot inside of another branch
delay slot (this is as stupid as it sounds). In other words, the branch
was being read as a NOP and got stuck running the wrong code until the
game would crash. Never underestimate PS2 developers. If you think they
won't do something that's forbidden in the manual, you're dead
wrong.

{{< img cols="4" src="./img/dropship-united-peace-force-s.png">}}

- All of the **World Rally championship**
(with the exception of WRC 4 which needs a patch - [get it
here](https://forums.pcsx2.net/Thread-Fixing-unplayable-games) ) games
are now playable!

This was fixed by properly handling branches in delay slots, the old
behavior wasn't addressing this properly and the new behavior was shown
to be accurate to the original hardware through tests ran from the EE
PS2 testsuite.

- Games which relied on **game specific patches/hacks** no longer need them anymore to boot!

Due to series of improvements in our core functions and recompilers,
games like...:
  - Jak X
  - Spongebob the Movie
  - Spongebob Battle for Bikini Bottom
  - The Incredibles
  - The Incredibles Rise of the Underminer
  - Soukou Kihei Armodyne
  - Garfield Saving Arlene
  - Tales of Fandom Vol. 2

...are now playable without requiring the usage of any hacks or
game specific patches.

This might not come of as a surprise to most users since these games
were still playable in the older versions through the use of game
specific patches, but handling this accurately would mean there are no
potential side effects from the game specific patches and it brings us
one step closer to the goal of emulation accuracy, which we strive to
improve.

## Graphics Synthesizer bug fixes

This section covers games which received an improvement in visual
accuracy, these issues are mostly hard to debug due to the abnormal way
of how the Graphics synthesizer handles most functions and the lack of
any proper documentation regarding them, our GS developers however
always try their best to fix them!

- GSdx: Implementation of fixed TEX0 context for all renderers

Fixes texture corruption in games like **Lupin: The Third and James Bond 007 Nightfire**.

{{< img-cmp-slider before="./img/007-nightfire-before-s.jpg" after="./img/007-nightfire-after-s.jpg">}}

{{< img-cmp-slider before="./img/lupin_1.4s.jpg" after="./img/lupin_1.6s.jpg">}}

- GSdx: Improvements in the D3D11 renderer

For a while, the D3D11 renderer has been lagging behind in terms of
emulation accuracy in comparison to the OpenGL renderer, the renderer
has now gone through various improvements by backporting changes like
channel/texture shuffle, depth emulation and texture conversions from
OpenGL and is now much improved compared to the 1.4 version.

{{< img cols="6" src="./img/d3d-fixes-before-after.jpg">}}

{{< img cols="6" src="./img/Blood-Will-Tell.jpg">}}

{{< img-cmp-slider before="./img/fifa_street_broken.jpg" after="./img/fifa_street_fixed.jpg">}}

- GSdx-PCRTC: Improved calculation of output circuit dimensions and add unsupported functions

Previously the height of the framebuffer was calculated using guesswork
based on the width of the framebuffer. This method was obviously wrong
and it caused some conflicts when scaling the buffer for upscaled
resolutions. This was fixed by using the height of the output circuit as
a base for the framebuffer height. This fixed upscaling issues with lots
of games which didn't have adequate buffer size in 1.4 version.

{{< img-cmp-slider before="./img/CNK-before_s.png" after="./img/CNK-after_s.png">}}

{{< img-cmp-slider before="./img/RBR-before_s.png" after="./img/RBR-after_s.png">}}

- Addition of Feedback write support

Using the feedback write circuit, we can write a specific rectangular area in the
output image to an arbitrary position in a local buffer at an arbitrary
sampling rate dependent on the status of feedback write setting
registers. This feature was not implemented before, and implementation
of this allows games like Xenosaga to make use of the feedback write
mechanism to convert the color to a luminance greyscale. This fix is
exclusive to the OpenGL renderer at the moment.

{{< img-cmp-slider before="./img/xenosaga-before-s.jpg" after="./img/xenosaga-after-s.jpg">}}

-Improved merge circuit emulation

In some cases the GS is configured to use two side by side display rectangles
for rendering. The rectangles are merged by the GS's merge circuit and
the resulting image is sent to the TV. The horizontal position of the
display rectangles, however, was ignored when emulating the merge
circuit, which caused image overlap issues where only half the image was
displayed. The display rectangles' horizontal position is now taken
into account, which fixes the image overlap issues and makes split
screen mode in Time Crisis 2 and 3 playable.

{{< img-cmp-slider before="./img/timecrisis-before.png" after="./img/timecrisis-after.png">}}

- Support double scan mode

The output size for games are halved whenever the INT and FFMD flag are set in the
display mode registers, however there was a bug which led the halving to
be done twice unintentionally, this behavior was fixed to get proper
output back on games like Gitaroo man.

{{< img-cmp before="./img/gitarooman-broken-s.png" after="./img/gitarooman-fixed-s.png">}}

{{< img-cmp before="./img/height-broken-s.png" after="./img/height-fixed-s.png">}}

- GSdx: Hardware mipmapping support

Previously, all the hardware renderers suffered from mipmapping issues
due to various unimplemented functions. For example, whenever mipmapping
is performed, it is necessary to set the base pointer address and the
buffer width of the textures of two (or) more mipmap levels, even this
basic function was not emulated before as there wasn't much priority on
getting mipmapping to work on hardware renderers.

The main reasons were that only some few games (around 10-30) had
mipmapping related issues which is quite a small amount of games in
comparison to the whole PS2 library and there was also a possibility
that mipmapping could influence the performance negatively, so none of
the developers were planning on tackling it, as at that time, there were
far more severe bugs related to the CLUT, Texture cache, display
rectangle setup and Z buffer which were more prioritized. However,
mipmapping has now finally been implemented!

{{< img-cmp-slider before="./img/ratchet-before1-s.jpg" after="./img/ratchet-after1-s.jpg">}}

{{< img-cmp-slider before="./img/ratchet-before2-s.jpg" after="./img/ratchet-after2-s.jpg">}}

- GSdx-HW: Improved texture search and validations in texture cache

Improve texture search/invalidation in render target by correctly
matching vertex offset draws with buffer offset reads in the texture
cache, the eyes are now properly rendered in hardware mode.

{{< img-cmp-slider before="./img/gsdx-3018-before-s.png" after="./img/gsdx-3018-after.png">}}

## Core bug fixes

This section covers games which received an improvement in
timing/graphical accuracy through the changes made in the core Vector
units/Emotion Engine, recompilers and their relevant submodules.

- Counters: Accurate Hblank calculation for all video modes

The horizontal blanking interval calculation algorithm used by video
modes were modified to adapt to each and every different video mode,
this change led to fixing texture corruption and irregular timings in
some PSX and PS2 games.

{{< img cols="6" src="./img/hblank-fix-s.png">}}


- IPU: Improved emulation of the PACK command

The pack command was modified to convert from RGB32 to RGB16/INDX4
instead of RAW8 to RGB16/INDX4. This change fixed FMV issues in
"Hisshou Pachinko PachiSlot Kouryaku" series of games.

{{< img-cmp-slider before="./img/core-3119-before.png" after="./img/core-3119-after.png">}}

- VIF: Timing fix for MSCALF, MSCNT instructions

Previously the MSCALF and MSCNT instructions were delayed along with the
MSCAL instruction, these instructions trigger the execution of the micro
instructions in VU1. This was done in order to fix the graphics on the
Snowblind Engine games such as Baldur's Gate: Dark Alliance and
Champions of Norrath; However, delaying this seemed to cause quite a few
shadow problems on games like Downhill Domination, Twisted Metal and
potentially other games. These instructions are now properly handled
resolving the issue.

{{< img-cmp-slider before="./img/Downhil-Before_s.jpg" after="./img/Downhil-after_s.jpg">}}

{{< img-cmp-slider before="./img/twisted-metal-before_s.png" after="./img/twisted-metal-after_s.png">}}

- VU0: Fix CFC2 transfers from TPC register

An instruction sequence with the CFC2 instruction had abnormal behavior
when compared to the PS2 hardware on our tests, this behavior was
rectified to bring you no longer levitating skirts in Street Fighter EX
3.

{{< img-cmp-slider before="./img/sfex-before-s.png" after="./img/sfex-after-s.png">}}
