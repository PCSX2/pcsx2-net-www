---
title: "1.4.0 Released! - Year End Report"
date: 2016-01-07T00:00:00
summary: "Hello PCSX2 followers and a belated Happy New Year!"
draft: false
tags:
  - progress-report
mainAuthor: bositman
aliases:
  - "/273-1-4-0-release-end-2015-report"
  - "/273-1-4-0-release-end-2015-report.html"
  - "/273-1-4-0-release-end-2015-report.htm"
---

<!-- TODO - cleanup -->

{{< img cols="6" src="./img/progrepend.jpg">}}

Hello PCSX2 followers and a belated Happy New Year!

After being late a couple of days (it's a tradition and we can't break
it
😛 ), we present you with a new stable release,
version 1.4.0!

Along with the release comes our year end report for 2015. The following
progress report will provide an overview of all the notable changes from
the previous stable version, 1.2.1, to this update. Keep in mind many of
the changes have been mentioned in previous progress reports, but are
mentioned again as a changelog for 1.4.0. The changes since 1.2.1 are so
many, some smaller, some quite massive, that it was impossible to write
about all of them, but we believe we have nailed all the highlights!

This release is special for our growing Linux user base. You will be
treated with a shiny new GSdx OpenGL backend, for a massive speed and
compatibility boost over 1.2.1 and much more, all thanks to the efforts
of Gregory and various contributors!

Generally, this release includes work from many more contributors than
any previous versions. It appears that switching to Git as our version
control system helped invite more developers and encourages sharing even
small patches and additions.

So without further ado, here is the report!

[ Core
]{style="text-decoration: underline; font-weight: bold; font-size: x-large;"}

[ [New Feature] ]{style="color: #1bc449;"} [ [ Debugger
]{style="font-weight: bold;"} ]{style="text-decoration: underline;"} by
[Kingcom](https://github.com/Kingcom)

[![Debugger](/images/stories/frontend/1-4-0-rel/debugger_s.png "Debugger"){width="550"
height="476"}](/images/stories/frontend/1-4-0-rel/debugger.png)

The new debugger features a live disassembly view and allows developers
to debug games way easier than before while being very useful feature in
assisting the debugging of games which aren't working properly. Its
main purpose is aiding in game hacking, translation patches for
example.
list of Keyboard shortcuts for the debugger functions can be found at
**docs/debugger.txt** .

[ [New Feature] ]{style="color: #1bc449;"} [ [ Folder memory cards
]{style="text-decoration: underline;"} ]{style="font-weight: bold;"} by
[AdmiralCurtiss](https://github.com/AdmiralCurtiss)

[![Folder memory
cards](/images/stories/frontend/progress_reports/7-8-2015/folder-memcards-s.jpg "Folder memory cards"){width="550"
height="300"}](/images/stories/frontend/progress_reports/7-8-2015/folder-memcards.jpg)

The new Folder memory card feature allows users to easily share single
game saves instead of the whole memory cards by simply sending the
folder of the specific game. This method also allows easier backup of
the save files and allows deletion of game saves without even going into
the PS2 bios or the game. You even convert your older memory cards to a
folder using the built-in convert feature!

Another neat advantage is that it provides unlimited storage capacity
for save files as games will only see their own saves and the rest of
the perceived 8MB memory card as free space. This allows you to create
as many saves as would fit onto a whole empty memory card in a single
game, without concerns about leaving enough space for other games or
ever running into the problem where you start a new game and only later
realize you don't have enough free space on the memory card to save,
and without the incompatibility issues of emulating bigger third party
memory cards.


[ Note: ]{style="font-weight: bold;"} This feature is purely optional
and can be disabled in the Memory Card Manager.


[ [New Feature] ]{style="color: #1bc449;"} [ [ EE Overclock
]{style="font-weight: bold;"} ]{style="text-decoration: underline;"} by
[ssakash](https://github.com/ssakash) and [Blyss
Sarania](https://github.com/Sarania)

[![EE
overclock](/images/stories/frontend/1-4-0-rel/EEoc_s.png "EE overclock"){width="550"
height="476"}](/images/stories/frontend/1-4-0-rel/EEoc.png)

You can now manipulate the EE Cyclerate to overclock and underclock the
[ Emotion Engine's ]{style="font-style: italic;"} R5900 Core CPU clock
speed, The negative values on the slider allow you to reduce the clock
speed and conversely the positive values effectively increase the
clockspeed.

Take a look at the following comparison video to understand the impact
of the EE overclock feature.




[ [Bug-Fix] ]{style="color: #ff3333;"} [ [ Recompiler Improvements and
Core Refactors ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"} by
[Refraction](https://github.com/refractionpcsx2) ,
[ssakash](https://github.com/ssakash) and
[Gregory](https://github.com/gregory38)


[ GIF: Better Handling for Finish Interrupt request signal
]{style="text-decoration: underline;"} by
[Refraction](https://github.com/refractionpcsx2)

Fixes issues on games like Indiecar Series 2005 where the previously
fired finish signals weren't cleared and it eventually lead to multiple
fires of Interrupt requests.

[ MicroVU: General Improvements ]{style="text-decoration: underline;"}
by [ssakash](https://github.com/ssakash) and
[Refraction](https://github.com/refractionpcsx2)

[![.dot
Hack](/images/stories/frontend/1-4-0-rel/dothackbroken-s.png ".dot Hack bugs"){width="353"
height="309"}](/images/stories/frontend/1-4-0-rel/dothackbroken.png)
[![.dot
Hack](/images/stories/frontend/1-4-0-rel/dothackfixed-s.png ".dot Hack"){width="353"
height="309"}](/images/stories/frontend/1-4-0-rel/dothackfixed.png)

There were some rare flickering issues on games like Naruto ultimate
ninja series and dot hack games at cases when some of the MAC Flag
instances got incorrectly skipped with the mVU Flag Hack. which later
got fixed due to proper detection of Register index status before the
Flag sets.

Also Proper Clamping with COP2 status as parameter was added to some of
the VU upper OP codes to fix hangs on Superman - Shadow Of Apokolips and
proper jump targets were used to fix lots of texture corruptions and
spiky shadows on True Crime - New York City , DT Racer and DT Carnage.

[ Dev note: ]{style="font-weight: bold;"} The XG Kick Instruction
trigger has been reworked to delay cycles regardless of the status of
MemVI parameter which later got removed since it was pretty much useless
as there should always be a delay for XG Kick instructions.


[ SIF: Limit/Mask transfer size to 1mb-16bytes
]{style="text-decoration: underline;"} by
[Refraction](https://github.com/refractionpcsx2)

Gregory Horror Show enters playable state ! The issue was due to the
game using a weird transfer from IOP to EE through SIF that has a size
> 0x80000000 which was due to incorrect masking, causing a flag on the
top of the passed size to be mistaken as part of the size itself. Thanks
to jpd002 (Author of Play!) the suggestion to Limit / Mask the transfer
size finally made the game to enter playable state.



[ VIF: Better handling of IRQ and MFIFO Timing improvements
]{style="text-decoration: underline;"} by
[Refraction](https://github.com/refractionpcsx2)

Stuart Little 3 enters playable state. The issue was actually caused by
a VIF interrupt firing on a "Wait for GS Paths" instruction before the
flushing was complete which caused the emulator to hang. The condition
check has been made a lot more stable now so such issues should never
happen again.

Chessmaster was one of those games which has suffered timing issues for
quite a long time as it hangs even before reaching the menus. This was
eventually changed as Refraction quickly fixed the issue by simulating
the buffer filling time from scratch pad. Finally the game could now go
past the menus!

A fix was made to the detection of invalid VIF Opcodes where the
interrupt bit could be set on an invalid operation, causing Tarzan and
Looney Tunes Back In Action to hang unexpectedly, the condition has now
been updated to make sure this is less likely to happen.

[ EE Interpreter: Improved TLB miss exception handling
]{style="text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)

The Program Counter value would be saved into the EPC register
(Exception-Program Counter) whenever a TLB miss occurs and previously
the program counter got incremented by 4 whenever a CPU exception was
triggered. So instead of executing again the instruction after handling
of the miss, we executed the next one!

This was eventually fixed by fetching the program counter value before
the increment and executing them in case of CPU exception.


[ [New Feature] ]{style="color: #1bc449;"} [ [ Support for loading
Gzip and CSO compressed ISO's ]{style="text-decoration: underline;"}
]{style="font-weight: bold;"} by [Avih](https://github.com/avih) and
[Unknown W.Brackets](https://github.com/unknownbrackets)

PCSX2 can now directly load compresed ISO images, so you can save your
precious HDD space! Here is a breakdown by Unknown Brackets himself:

A few of the differences between CSOs and gzipped ISOs, with respect to
PCSX2, are:

* CSOs have the index built in to the file, and don't require an extra
file.
* CSOs compress fairly well, but lose a bit compared to gzipped ISOs.
* However, if you keep the index file, CSOs may often be smaller.
* In my tests, CSOs read faster in pcsx2 and use less memory than
gzipped ISOs. But this is a tiny part of overall emulation.

For a comparison on size using Final Fantasy 12 (US) as a random
example:
CSO = 90.46% the size
ISO gz w/ pigz = 90.17% (90.95% including index file)
ISO gz w/ 7-zip = 89.49% (90.27% including index file)

Note that 7-zip required significantly longer (around 8 times longer) to
create than the other two, but resulted in the best compression. It was
0.21% smaller than the CSO.

As far as tools, I of course recommend the tool I wrote. There are
others, but I know maxcso supports >= 4GB ISO files, which some of the
others don't.

<https://github.com/unknownbrackets/maxcso/releases>

Additionally, this will use all of your CPU cores to compress as
optimally and quickly as possible. For gzipped ISOs, there's pigz which
will also do this, but many other tools will only use one CPU core.

That's about it. Play! (another PS2 emulator) also supports CSO files.
I don't think it supports gzipped ISOs.

-[Unknown]

[ [ [ GSDX ]{style="font-size: x-large;"} ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"}

[ [Bug-Fix] ]{style="color: #ff3333;"} [ [ Programmable blending to
reproduce GS blending unit output ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)

The source of the issues on GPU blending unit is due to the fact that
the raster operations pipeline (ROP) differ from the GS and the GPU
which means that the GPU ROP's don't support the equations which are
supported by the GS ROP's and hence it leads to wrong blending which
causes situations like horizontal black lines or missing effects on some
games.

Hardware implementations are usually limited to only a subset of all
possible equations. A software implementation based on a CPU (such as a
shader) would be able to do any operation at the cost of performance.

The new option (Blending Unit Accuracy), which is an OpenGL renderer
exclusive, moves the computing of the ROP to the shader. This way it is
more accurate but considerably slower. You can try different levels of
the option "Blending Unit Accuracy" to check out the impact on the
accuracy and performance.

Here are some screenshots showing the improvements :

[![Blending
bugs](/images/stories/frontend/1-4-0-rel/noblend-s.jpg "Blending bugs"){width="353"
height="150"}](/images/stories/frontend/1-4-0-rel/noblend.jpg)
[![Blending
bugs](/images/stories/frontend/1-4-0-rel/blend-s.jpg "Blending bugs"){width="353"
height="150"}](/images/stories/frontend/1-4-0-rel/blend.jpg) [![Rule of
Rose](/images/stories/frontend/1-4-0-rel/RuleofRose-no-blend-s.jpg "Rule of Rose"){width="353"
height="199"}](/images/stories/frontend/1-4-0-rel/RuleofRose-no-blend.jpg)
[![Rule of
Rose](/images/stories/frontend/1-4-0-rel/RuleofRose-blending-s.jpg "Rule of Rose"){width="353"
height="199"}](/images/stories/frontend/1-4-0-rel/RuleofRose-blending.jpg)
[![Valkyrie Profile
2](/images/stories/frontend/1-4-0-rel/VP2-no-blend-s.jpg "Valkyrie Profile 2"){width="353"
height="199"}](/images/stories/frontend/1-4-0-rel/VP2-no-blend.jpg)
[![Valkyrie Profile
2](/images/stories/frontend/1-4-0-rel/VP2-blending-s.jpg "Valkyrie Profile 2"){width="353"
height="199"}](/images/stories/frontend/1-4-0-rel/VP2-blending.jpg)

[ [Bug-Fix] ]{style="color: #ff3333;"} [ [ Improved CRTC output size
handling ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"} by
[ssakash](https://github.com/ssakash) and [.r5](https://github.com/rz5)

There were few rare cases on games running at NTSC video mode where the
detected frame buffer height was too large and eventually caused the
whole screen to have a weird format with unexpected bottom black bars on
the screen. A few games which suffered similar issues are Skyrunner,
Devil may cry 3, Tribes: Aerial Assault. This eventually got fixed by
proper saturation limit for height in case of NTSC video mode.

Here are some comparison screenshots showing before and after the fix :

[![Tribes](/images/stories/frontend/1-4-0-rel/Tribes_before_s.png "Tribes"){width="353"
height="198"}](/images/stories/frontend/1-4-0-rel/Tribes_before.png)
[![Tribes](/images/stories/frontend/1-4-0-rel/Tribes_after_s.png "Tribes"){width="353"
height="198"}](/images/stories/frontend/1-4-0-rel/Tribes_after.png)
[![Devil May Cry
3](/images/stories/frontend/1-4-0-rel/DMC3_before_s.png "Devil May Cry 3"){width="353"
height="198"}](/images/stories/frontend/1-4-0-rel/DMC3_before.png)
[![Devil May Cry
3](/images/stories/frontend/1-4-0-rel/DMC3_after_s.png "Devil May Cry 3"){width="353"
height="198"}](/images/stories/frontend/1-4-0-rel/DMC3_after.png)

[ [Bug-Fix] ]{style="color: #ff3333;"} [ [ Software renderer
improvements ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"} by
[Gabest](https://github.com/gabest11) and
[Gregory](https://github.com/gregory38)

-   Silent Hill outputs a nan in Q to emulate the flashlight - an
    unsupported NaN (not a number) on the projection value (Q). Gregory
    used an isnan test to find such instances and emulate the flash
    light effect. Gabest later decreased the speed impact by using
    inlined ASM. Fixes Flash light effects on Silent Hill 3.


[![Silent Hill
3](/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-broken-s.jpg "Silent Hill 3"){width="353"
height="199"}](/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-broken.jpg)
[![Silent Hill
3](/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-fixed-s.jpg "Silent Hill 3"){width="353"
height="199"}](/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-fixed.jpg)

-   Better texture size management in software mode, fixes Horsez and
    Stolen memory issue and also lowers memory usage in general.

```{=html}
<!-- -->
```
-   Better handling of textures addressing outside the limits by
    extending the cached texture size to the upper limits of the region
    clamp values: Fixes Lupin the 3rd


[ [Bug-Fix] ]{style="color: #ff3333;"} [ [ Accurate destination alpha
testing ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)

Better behavior to replicate one of the GS functions where the Graphics
Synthesizer can discard a pixel based on the destination output. In
order to emulate this function properly you need in-order RW texture.
Unfortunately standard GPU only has either an in-order RO texture or an
out-of-order RW texture, to circumvent around this limitation accurate
date implements a two pass algorithm to implement the effect. The 1st
pass searches the valid primitive ID and the 2nd pass will do the draw
based on the previous pass.

[![Persona](/images/stories/frontend/1-4-0-rel/persona3DATEwrong_s.png "Persona"){width="353"
height="247"}](/images/stories/frontend/1-4-0-rel/persona3DATEwrong.png)
[![Persona](/images/stories/frontend/1-4-0-rel/persona3DATEcorrect_s.png "Persona"){width="353"
height="247"}](/images/stories/frontend/1-4-0-rel/persona3DATEcorrect.png)

[ [Bug-Fix] ]{style="color: #ff3333;"} [ [ Improved read of depth /
color ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)

A standard GPU has separate textures for the color and the depth
information. The GS doesn't enforce such separation between color/depth
information. So it is allowed to read depth as color or write color into
depth. You could even write depth in the color render target. It is used
for effects such as "depth of field". The new option "Hardware
depth", which is an OpenGL renderer exclusive, allows to convert
depth/color into color/depth respectively. Now you can enjoy accurate
reproduction of such effects. However these conversions require
additional resources from your GPU which might gradually decrease
performance in cost of accuracy.

[![Suikoden
Tactics](/images/stories/frontend/1-4-0-rel/suikodentacticshardwaredepthoff_s.png "Suikoden Tactics"){width="353"
height="247"}](/images/stories/frontend/1-4-0-rel/suikodentacticshardwaredepthoff.png)
[![Suikoden
Tactics](/images/stories/frontend/1-4-0-rel/suikodentacticshardwaredepthon_s.png "Suikoden Tactics"){width="353"
height="247"}](/images/stories/frontend/1-4-0-rel/suikodentacticshardwaredepthon.png)

[ [ [ SPU2-X ]{style="font-size: x-large;"}
]{style="font-weight: bold;"} ]{style="text-decoration: underline;"}


[ [New Feature] ]{style="color: #1bc449;"} [ [ Per channel volume
adjustment ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"} by
[gigaherz](https://github.com/gigaherz)

A.K.A Room Correction. This feature is present in the control panel of
some audio chips, but often enough, the settings that work well for the
system in general, don't match the settings that you prefer for
emulated games, due to the intrinsic differences of the emulated
machine.

It does exactly what it sounds like: lets you adjust each output channel
independently, to compensate for things such as distance of the speakers
to the chair, or to emphasize the vocals (center channel) or the
surround sound (side/back channels) when the game's balance is not
fully to your liking.

You'll find the values hidden in the SPU2-X.INI file, under the MIXING
section (VolumeAdjust series of keys). The values are in decibels, which
means writing 1 in one of the volumes will make the amplitude 10x
larger, 2 will blow it up to 100x, and -1 will make it 1/10th of the
original. Smaller values in the range of -1 to 1 are recommended for
testing, as it's easy to cause unwanted clipping in the output.


[ [Bug-Fix] ]{style="color: #ff3333;"} [ [ Time Stretcher:
Improvements to tempo adjustments ]{style="text-decoration: underline;"}
]{style="font-weight: bold;"} by [Avih](https://github.com/avih)

Previously latency values higher than 200ms will make the stretcher
adjustments overshoot the target
equilibrium back and forth, in effect never stabilizing. This bug was
fixed by lowering the tempo adjustments to avoid potential overshoots on
bigger buffers.

The latency slider will now allow a minimum value of 15ms. Providing
choices of choosing from values between 15 to 29ms on the slider.


[ [ [ GUI ]{style="font-size: x-large;"} ]{style="font-weight: bold;"}
]{style="text-decoration: underline;"}

[ [Enhancement] ]{style="color: #018ddd;"} [ [ Configurable template
on GSFrame titlebar ]{style="text-decoration: underline;"}
]{style="font-weight: bold;"} by [Avih](https://github.com/avih)

There was some
[discussion](https://github.com/PCSX2/pcsx2/commit/abdb8266b66db9d8bb2be7284cc216d6fa004714)
among the users about the elements which should be displayed on the
title bar of the rendering window, some of them disagreed with the
placement of the elements and suggested to replace them in different
order and have certain elements prioritized. While our users opinions
are respected, all of them had very different ideas and it was
impossible to satisfy everyone. Hence a consensus was never reached.

So Avih decided to create a [general template
system](https://github.com/PCSX2/pcsx2/commit/9b988ee12d09e1b05e08b7264bdbe7fab15c1fc6)
to allow customization of the elements on the title bar. The following
template is located in the [ inis_1.4.0/PCSX2_ui.ini
]{style="font-weight: bold;"} file though lacks a user interface for
easier customization.


[ [Enhancement] ]{style="color: #018ddd;"} [ [ Revamped Core and GSDX
plugin dialogs ]{style="text-decoration: underline;"}
]{style="font-weight: bold;"} by [Turtleli](https://github.com/turtleli)
, [Gregory](https://github.com/gregory38) and
[ssakash](https://github.com/ssakash)

The Core and GSDX dialogs have undergone quite a deal of changes like
converting the three-state checkboxes to a combobox, inclusion of
tooltips on GSDX dialogs and further simplification / categorization
which eventually lead to the Shader configuration dialog which includes
all the Shader based options. (Shade Boost , FXAA , TV Shader and
External shader )

on the core side, there was a recent WX update from 2.8 to 3.0 which
eventually caused a few issues but all of them got fixed eventually by
our WX Expert [Turtleli](https://github.com/turtleli) and there has also
been support for DPI scaling added for all the dialogs. The Emulation
settings dialog has also been changed slightly to be more consistent
with the Linux GUI.

Here is a preview of the old GSdx GUI and the new one:


![GSdx old
GUI](/images/stories/frontend/1-4-0-rel/gsdx-old.png "GSdx old GUI"){width="294"
height="594"} ![GSdx new
GUI](/images/stories/frontend/1-4-0-rel/gsdx-new.png "GSdx new GUI"){width="353"
height="597"}

In conclusion, the team would like to thank everyone who has contributed
with their time, knowledge, opinion, code or otherwise for this release
to happen. It's too many people, from our forum, wiki, GIT, IRC and
this is why PCSX2 has improved so much over this time. Thank you all for
sticking with us, discussing, debating, offering your opinion, your free
time and your skills!
