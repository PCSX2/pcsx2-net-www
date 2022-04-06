::: {.single-article}
::: {.item-page .clearfix}
## [1.6.0 - What's new](/294-1-6-0-what-s-new.html) {#whats-new .contentheading}

::: {style="text-align:center;"}
:::

![whatsnew160](/images/stories/frontend/static/whatsnew160.webp)

Written by [ssakash](https://forums.pcsx2.net/User-ssakash)

We understand that everyone is thrilled over the release of our new
stable version. In this report, we'll be covering all the significant
improvements made in our new release in comparison to the previous
stable version 1.4.

## [ Games which went from nothing to playable ]{style="text-decoration: underline;"}

This section covers games which went from not rendering anything to
being playable, these issues are the most straight forward to fix, we
debug these issues by monitoring all the abnormal activities occurring
in the core leading to the game to crash and a solution is worked on to
correct that behavior.

[ [ -Preliminary PSX support ]{style="text-decoration: underline;"}
]{style="font-weight: bold;"} has been added! Go try them out yourself,
though do note that the PSX backward compatibility is still in its
infant state and needs lots of work to be done before it reaches a
perfect state.

[![Teaser](/images/stories/frontend/progress_reports/q3-2016/teaser_s.png "Teaser"){width="353"
height="257"}](/images/stories/frontend/progress_reports/q3-2016/teaser.png)

[ [ -Dropship United Peace Force ]{style="text-decoration: underline;"}
]{style="font-weight: bold;"} went from not being able to get into main
menu to being [ playable ]{style="color: #9acd32;"} !

As it turns out, our VU branching subroutines had a longstanding bug
which failed to account for a branch delay slot inside of another branch
delay slot (this is as stupid as it sounds). In other words, the branch
was being read as a NOP and got stuck running the wrong code until the
game would crash. Never underestimate PS2 developers. If you think they
won't do something that's forbidden in the manual, you're dead
wrong.

[![dropship-united-peace-force](/images/stories/frontend/progress_reports/2018-2019/dropship-united-peace-force-s.png "dropship-united-peace-force"){width="353"
height="199"}](/images/stories/frontend/progress_reports/2018-2019/dropship-united-peace-force.png)



-All of the [ [ World Rally championship
]{style="text-decoration: underline;"} ]{style="font-weight: bold;"}
(with the exception of WRC 4 which needs a patch - [get it
here](https://forums.pcsx2.net/Thread-Fixing-unplayable-games) )games
are now [ playable ]{style="color: #9acd32;"} !

This was fixed by properly handling branches in delay slots, the old
behavior wasn't addressing this properly and the new behavior was shown
to be accurate to the original hardware through tests ran from the EE
PS2 testsuite.

-Games which relied on [ game specific patches/hacks
]{style="font-weight: bold;"} no longer need them anymore to boot!

Due to series of improvements in our core functions and recompilers,
games like [ Jak X, Spongebob the Movie, Spongebob Battle for Bikini
Bottom,The Incredibles, The Incredibles Rise of the Underminer, Soukou
Kihei Armodyne, Garfield Saving Arlene, Tales of Fandom Vol. 2
]{style="font-weight: bold;"} are now [ playable
]{style="color: #9acd32;"} without requiring the usage of any hacks or
game specific patches.

This might not come of as a surprise to most users since these games
were still playable in the older versions through the use of game
specific patches, but handling this accurately would mean there are no
potential side effects from the game specific patches and it brings us
one step closer to the goal of emulation accuracy, which we strive to
improve.

## [ Graphics Synthesizer bug fixes ]{style="text-decoration: underline;"}

This section covers games which received an improvement in visual
accuracy, these issues are mostly hard to debug due to the abnormal way
of how the Graphics synthesizer handles most functions and the lack of
any proper documentation regarding them, our GS developers however
always try their best to fix them!

[ [ -GSdx: Implementation of fixed TEX0 context for all renderers
]{style="text-decoration: underline;"} ]{style="font-weight: bold;"}

Fixes texture corruption in games like [ Lupin: The Third and James Bond
007 Nightfire ]{style="font-weight: bold;"} .

[![007-nightfire-before](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-before-s.jpg "007-nightfire-before"){width="353"
height="199"}](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-before.jpg)
[![007-nightfire-after](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-after-s.jpg "007-nightfire-after"){width="353"
height="199"}](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-after.jpg)

[![lupin 1.4](/images/stories/frontend/1.6/lupin_1.4s.jpg){width="353"
height="199"}](/images/stories/frontend/1.6/lupin_1.4.jpg) [![lupin
1.6](/images/stories/frontend/1.6/lupin_1.6s.jpg){width="353"
height="199"}](/images/stories/frontend/1.6/lupin_1.6.jpg)

<div>

[ [ -GSdx: Improvements in the D3D11 renderer
]{style="text-decoration: underline;"} ]{style="font-weight: bold;"}

For a while, the D3D11 renderer has been lagging behind in terms of
emulation accuracy in comparison to the OpenGL renderer, the renderer
has now gone through various improvements by backporting changes like
channel/texture shuffle, depth emulation and texture conversions from
OpenGL and is now much improved compared to the 1.4 version.


[![d3d fixes before
after](/images/stories/frontend/progress_reports/q1-2018/d3d-fixes-before-after.jpg)](/images/stories/frontend/progress_reports/q1-2018/d3d-fixes-before-after.jpg)

[![Blood Will
Tell](/images/stories/frontend/progress_reports/2018-2019/Blood-Will-Tell.jpg){width="634"
height="261"}](/images/stories/frontend/progress_reports/2018-2019/Blood-Will-Tell-l.jpg)

[![fifa_street_broke](/images/stories/frontend/progress_reports/6-2015/fifa_street_broken.jpg "Fifa street broken"){width="353"
height="265"}](/images/stories/frontend/progress_reports/6-2015/fifa_street_broken.jpg)
[![fifa_street_fixed](/images/stories/frontend/progress_reports/6-2015/fifa_street_fixed.jpg "fifa_street_fixed"){width="353"
height="265"}](/images/stories/frontend/progress_reports/6-2015/fifa_street_fixed.jpg)

</div>

-GSdx-PCRTC: Improved calculation of output circuit dimensions and add
unsupported functions

<div>

Previously the height of the framebuffer was calculated using guesswork
based on the width of the framebuffer. This method was obviously wrong
and it caused some conflicts when scaling the buffer for upscaled
resolutions. This was fixed by using the height of the output circuit as
a base for the framebuffer height. This fixed upscaling issues with lots
of games which didn't have adequate buffer size in 1.4 version.

[![Crash Nitro Kart
Before](/images/stories/frontend/progress_reports/q2-2016/CNK-before_s.png "Crash Nitro Kart Before"){width="353"
height="265"}](/images/stories/frontend/progress_reports/q2-2016/CNK-before.png)
[![Crash Nitro Kart
after](/images/stories/frontend/progress_reports/q2-2016/CNK-after_s.png "Crash Nitro Kart after"){width="353"
height="265"}](/images/stories/frontend/progress_reports/q2-2016/CNK-after.png)

[![Richard Burns Rally
Before](/images/stories/frontend/progress_reports/q2-2016/RBR-before_s.png "Richard Burns Rally Before"){width="353"
height="265"}](/images/stories/frontend/progress_reports/q2-2016/RBR-before.png)
[![Richard Burns Rally
after](/images/stories/frontend/progress_reports/q2-2016/RBR-after_s.png "Richard Burns Rally after"){width="353"
height="265"}](/images/stories/frontend/progress_reports/q2-2016/RBR-after.png)

[ -Addition of Feedback write support
]{style="text-decoration: underline; font-weight: bold;"} : Using the
feedback write circuit, we can write a specific rectangular area in the
output image to an arbitrary position in a local buffer at an arbitrary
sampling rate dependent on the status of feedback write setting
registers. This feature was not implemented before, and implementation
of this allows games like Xenosaga to make use of the feedback write
mechanism to convert the color to a luminance greyscale. This fix is
exclusive to the OpenGL renderer at the moment.

[![Xenosaga](/images/stories/frontend/progress_reports/q4-2016/xenosaga-before-s.jpg "Xenosaga"){width="353"
height="198"}](/images/stories/frontend/progress_reports/q4-2016/xenosaga-before.jpg)
[![Xenosaga](/images/stories/frontend/progress_reports/q4-2016/xenosaga-after-s.jpg "Xenosaga"){width="353"
height="198"}](/images/stories/frontend/progress_reports/q4-2016/xenosaga-after.jpg)

[ -Improved merge circuit emulation
]{style="text-decoration: underline; font-weight: bold;"} : In some
cases the GS is configured to use two side by side display rectangles
for rendering. The rectangles are merged by the GS's merge circuit and
the resulting image is sent to the TV. The horizontal position of the
display rectangles, however, was ignored when emulating the merge
circuit, which caused image overlap issues where only half the image was
displayed. The display rectangles' horizontal position is now taken
into account, which fixes the image overlap issues and makes split
screen mode in Time Crisis 2 and 3 playable.

[ Time Crisis 2 ]{style="text-decoration: underline;"} [ (before)
]{style="font-weight: bold;"} [ ( [ 320 X 224 ]{style="color: #66cc33;"}
) ]{style="font-weight: bold;"}

[![Time Crisis 2
Before](/images/stories/frontend/progress_reports/q2-2016/timecrisis-before.png "Time Crisis 2 Before"){width="320"
height="224"}](/images/stories/frontend/progress_reports/q2-2016/timecrisis-before.png)

[ Time Crisis 2 ]{style="text-decoration: underline;"} [ (now)
]{style="font-weight: bold;"} [ ( [ 640 X 224 ]{style="color: #66cc33;"}
) ]{style="font-weight: bold;"}

[![Time Crisis 2
after](/images/stories/frontend/progress_reports/q2-2016/timecrisis-after.png "Time Crisis 2 after"){width="640"
height="224"}](/images/stories/frontend/progress_reports/q2-2016/timecrisis-after.png)

[ -Support double scan mode
]{style="text-decoration: underline; font-weight: bold;"} : The output
size for games are halved whenever the INT and FFMD flag are set in the
display mode registers, however there was a bug which led the halving to
be done twice unintentionally, this behavior was fixed to get proper
output back on games like Gitaroo man.

[![[Image:
gitarooman-broken-s.png]](/images/stories/frontend/progress_reports/1-2-2016/gitarooman-broken-s.png){width="291"
height="131"}](/images/stories/frontend/progress_reports/1-2-2016/gitarooman-broken.png)
[![[Image:
gitarooman-broken-s.png]](/images/stories/frontend/progress_reports/1-2-2016/gitarooman-fixed-s.png){width="278"
height="250"}](/images/stories/frontend/progress_reports/1-2-2016/gitarooman-fixed.png)
[![[Image:
gitarooman-broken-s.png]](/images/stories/frontend/progress_reports/1-2-2016/height-broken-s.png)](/images/stories/frontend/progress_reports/1-2-2016/height-broken.png)
[![[Image:
gitarooman-broken-s.png]](/images/stories/frontend/progress_reports/1-2-2016/height-fixed-s.png){width="280"
height="236"}](/images/stories/frontend/progress_reports/1-2-2016/height-fixed.png)

</div>

<div>

-GSdx: Hardware mipmapping support

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


[![Ratchet and
Clank](/images/stories/frontend/progress_reports/q4-2016/ratchet-before1-s.jpg "Ratchet and Clank"){width="353"
height="309"}](/images/stories/frontend/progress_reports/q4-2016/ratchet-before1.jpg)
[![Ratchet and
Clank](/images/stories/frontend/progress_reports/q4-2016/ratchet-after1-s.jpg "Ratchet and Clank"){width="353"
height="309"}](/images/stories/frontend/progress_reports/q4-2016/ratchet-after1.jpg)
[![Ratchet and
Clank](/images/stories/frontend/progress_reports/q4-2016/ratchet-before2-s.jpg "Ratchet and Clank"){width="353"
height="309"}](/images/stories/frontend/progress_reports/q4-2016/ratchet-before2.jpg)
[![Ratchet and
Clank](/images/stories/frontend/progress_reports/q4-2016/ratchet-after2-s.jpg "Ratchet and Clank"){width="353"
height="309"}](/images/stories/frontend/progress_reports/q4-2016/ratchet-after2.jpg)

</div>

[ GSdx-HW: Improved texture search and validations in texture cache
]{style="font-weight: bold; text-decoration: underline;"}

<div>

Improve texture search/invalidation in render target by correctly
matching vertex offset draws with buffer offset reads in the texture
cache, the eyes are now properly rendered in hardware mode.

</div>

  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                                                Before                                                                                                                                                                                             After
   [![gsdx 3018 before](/images/stories/frontend/progress_reports/q3-2019/gsdx-3018-before-s.png){width="353" height="264"}](/images/stories/frontend/progress_reports/q3-2019/gsdx-3018-before.png)   [![gsdx 3018 after](/images/stories/frontend/progress_reports/q3-2019/gsdx-3018-after-s.png){width="353" height="264"}](/images/stories/frontend/progress_reports/q3-2019/gsdx-3018-after.png)
  --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## [ Core bug fixes ]{style="text-decoration: underline;"}


This section covers games which received an improvement in
timing/graphical accuracy through the changes made in the core Vector
units/Emotion Engine, recompilers and their relevant submodules.

<div>

[ [ Counters: Accurate Hblank calculation for all video modes
]{style="text-decoration: underline;"} ]{style="font-weight: bold;"}

<div>

The horizontal blanking interval calculation algorithm used by video
modes were modified to adapt to each and every different video mode,
this change led to fixing texture corruption and irregular timings in
some PSX and PS2 games.

[![H-blank
fix](/images/stories/frontend/1.6/hblank-fix-s.png "H-blank fix"){width="340"
height="128"}](/images/stories/frontend/1.6/hblank-fix.png)

</div>

</div>

<div>

[ [ IPU: Improved emulation of the PACK command
]{style="text-decoration: underline;"} ]{style="font-weight: bold;"}

<div>

The pack command was modified to convert from RGB32 to RGB16/INDX4
instead of RAW8 to RGB16/INDX4. This change fixed FMV issues in
"Hisshou Pachinko PachiSlot Kouryaku" series of games.

</div>



  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                                                                                               Before                                                                                                                                                                                           After
   [![core 3119 before](/images/stories/frontend/progress_reports/q3-2019/core-3119-before.png){width="353" height="247"}](/images/stories/frontend/progress_reports/q3-2019/core-3119-before.png)   [![core 3119 after](/images/stories/frontend/progress_reports/q3-2019/core-3119-after.png){width="353" height="247"}](/images/stories/frontend/progress_reports/q3-2019/core-3119-after.png)
  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

</div>

[ VIF: Timing fix for MSCALF, MSCNT instructions
]{style="font-weight: bold; text-decoration: underline;"}

Previously the MSCALF and MSCNT instructions were delayed along with the
MSCAL instruction, these instructions trigger the execution of the micro
instructions in VU1. This was done in order to fix the graphics on the
Snowblind Engine games such as Baldur's Gate: Dark Alliance and
Champions of Norrath; However, delaying this seemed to cause quite a few
shadow problems on games like Downhill Domination, Twisted Metal and
potentially other games. These instructions are now properly handled
resolving the issue.

[![DownHill Domination
before](/images/stories/frontend/progress_reports/q2-2016/Downhil-Before_s.jpg "DownHill Domination before"){width="353"
height="265"}](/images/stories/frontend/progress_reports/q2-2016/Downhil-Before.jpg)
[![DownHill Domination
after](/images/stories/frontend/progress_reports/q2-2016/Downhil-after_s.jpg "DownHill Domination after"){width="353"
height="265"}](/images/stories/frontend/progress_reports/q2-2016/Downhil-after.jpg)
[![Twisted Metal
before](/images/stories/frontend/progress_reports/q2-2016/twisted-metal-before_s.png "Twisted Metal before"){width="353"
height="247"}](/images/stories/frontend/progress_reports/q2-2016/twisted-metal-before.png)
[![Twisted Metal
after](/images/stories/frontend/progress_reports/q2-2016/twisted-metal-after_s.png "Twisted Metal after"){width="353"
height="247"}](/images/stories/frontend/progress_reports/q2-2016/twisted-metal-after.png)

<div>

**[ VU0: Fix CFC2 transfers from TPC register
]{style="text-decoration: underline;"}**

<div>

An instruction sequence with the CFC2 instruction had abnormal behavior
when compared to the PS2 hardware on our tests, this behavior was
rectified to bring you no longer levitating skirts in Street Fighter EX
3.

[![Street Fighter EX
3](/images/stories/frontend/progress_reports/q1-2017/sfex-before-s.png "Street Fighter EX 3"){width="353"
height="199"}](/images/stories/frontend/progress_reports/q1-2017/sfex-before.png)
[![Street Fighter EX
3](/images/stories/frontend/progress_reports/q1-2017/sfex-after-s.png "Street Fighter EX 3"){width="353"
height="199"}](/images/stories/frontend/progress_reports/q1-2017/sfex-after.png)

</div>

</div>

------------------------------------------------------------------------

The changes highlighted here are intended to show the strides made in
emulation accuracy from the previous stable release, this report
doesn't cover all the bug fixes and improvements, you can see all our
other changes to the SPU2/GUI/Controllers module on our progress reports
archived in [our site](/?start=5) .
:::
:::
