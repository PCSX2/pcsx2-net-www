::: {.single-article}
::: {.item-page .clearfix}
## [From Q2 2018 to Q2 2019 - 1 Year Progress Report](/290-2018-2019-progress-report.html) {#from-q2-2018-to-q2-2019---1-year-progress-report .contentheading}

::: {style="text-align:center;"}
:::

![progrepq2q22018
19](/images/stories/frontend/progress_reports/2018-2019/progrepq2q22018-19.jpg){width="563"
height="104"}

The planets aligned and the time came. A years worth of progress
reports!

Written by
[lightningterror](https://forums.pcsx2.net/User-lightningterror) ,
[CK1](https://forums.pcsx2.net/User-CK1) and
[Kojin](https://forums.pcsx2.net/User-Kojin)

# New Speedrunning Tools Available

[ \[New Feature\] ]{style="color: #00ccff;"}
[\#2412](https://github.com/PCSX2/pcsx2/pull/2412) [ Input
Recording/Playback Functionality
]{style="font-weight: bold; text-decoration: underline;"} by
[xTVaser](https://github.com/xTVaser) and many other external
contributors

After more than a year of reviewing and improving this PR it finally got
merged on April 2019. This PR was introduced mainly with Tool-assisted
speedruns (TAS) in mind, but can be used in various ways. PCSX2 now has
the ability to record your inputs while playing, after enabling the new
GUI option and saving it to a file. You can later load that file and
practically replay your inputs, which can be used for some speed runs or
even recording a video with our internal video recorder, without having
to endure the slowdowns caused by the added load of video encoding.

Unfortunately there are still some issues with some games or some
specific scenarios where PCSX2\'s timing changes each time you replay
the game, causing your inputs to get out of sync, but the feature is
already in a really nice working state.

Special thanks to [xTVaser](https://github.com/xTVaser) for patiently
enduring our very strict nitpicking and addressing every issue found
with proper fixes and in a very cooperative spirit
![Smile](https://pcsx2.net/images/stories/frontend/smilies/smile.gif){.yvSmiley
width="20" height="20"}

# Core Improvements

[ [ \[Accuracy Enhancement\] ]{style="color: #00ccff;"}
]{style="color: #ff3333;"} [ [Vector Units: Fix bug in \"Branch in Delay
Slot\"
Optimization](https://github.com/PCSX2/pcsx2/commit/9b8244954215072068f4f83079d1c714a4b0e09a)
]{style="font-weight: bold; text-decoration: underline;"} by
[Refraction](https://github.com/refractionpcsx2) and
[CK1](https://github.com/MrCK1)

While the Vector Units were well-suited for performing fast calculations
in the hands of experienced programmers, that didn\'t stop them from
ignoring Sony\'s advice and implementing atrocious solutions to do
stupid things. Enter the world of branch delay slots. One pesky game
that we\'ve had issues with for many years was Dropship United Peace
Force. On our end of things, MicroVU will normally \"optimize\" NOP
instructions (represented as `     MOVE.xyzw vf00, vf00    ` ).

As it turns out however, a longstanding bug in this code failed to
account for a branch delay slot inside of another branch delay slot
(this is as stupid as it sounds). In other words, the branch was being
read as a NOP and got stuck running the wrong code until the game would
crash. *Never underestimate PS2 developers. If you think they won\'t do
something that\'s forbidden in the manual, you\'re dead wrong*
![Razz](https://pcsx2.net/images/stories/frontend/smilies/tongue.gif){.yvSmiley
width="20" height="20"}

[![dropship-united-peace-force](/images/stories/frontend/progress_reports/2018-2019/dropship-united-peace-force-s.png "dropship-united-peace-force"){width="353"
height="199"}](/images/stories/frontend/progress_reports/2018-2019/dropship-united-peace-force.png)

Dropship United Peace Force

[ \[Bug Fix\] ]{style="color: #ff0000;"} [**[ Recompiler: Fix stall in
branch delay slot
]{style="text-decoration: underline;"}**](https://github.com/PCSX2/pcsx2/pull/2919)
by [FlatOutPS2](https://github.com/FlatOutPS2)

A recompiler bugfix has also been made which makes WRC games boot
properly without hanging on the loading or relying on gamefix patches.

# GUI/Usability Updates

[ \[Enhancement\] ]{style="color: #00ccff;"} [ [PCSX2: \"FMV Aspect
Ratio Switch/Override\"
feature](https://github.com/PCSX2/pcsx2/pull/2690)
]{style="font-weight: bold; text-decoration: underline;"} by
[FlatOutPS2](https://github.com/FlatOutPS2) and
[lightningterror](https://github.com/lightningterror)

Change \"Switch to 4:3 aspect ratio when an FMV plays\" to \"FMV Aspect
Ratio Override\" drop down menu.

The option temporarily changes the Aspect Ratio to either 16:9 or 4:3
depending on the option that is selected, and depending on the Window
Aspect ratio that is selected.

[ \[Enhancement\] ]{style="color: #00ccff;"} [ [PCSX2: Improved GameDB
handling](https://github.com/PCSX2/pcsx2/pull/2567)
]{style="font-weight: bold; text-decoration: underline;"} by
[turtleli](https://github.com/turtleli)

The GameDB handling has been improved thanks to turtleli. To sum it up
in a short and simple explanation turtleli did some magic, updated the
code which results in slightly faster reading and better overall
performance, a lot of old legacy code was removed as well. For more
details you can read the detailed explanation in the PR description on
Github.

[ \[Enhancement\] ]{style="color: #00ccff;"} [ [PCSX2: Save/Load slot
improvements](https://github.com/PCSX2/pcsx2/pull/2574)
]{style="font-weight: bold; text-decoration: underline;"} by
[arcum42](https://github.com/arcum42)

From now on Save and Load slots will show date when a save is present in
each slot for each game. Also empty save/load slots will show an Empty
name tag instead. empty load slots will also be greyed out from the GUI
interface.

![saveslots](/images/stories/frontend/progress_reports/2018-2019/saveslots.png "saveslots"){width="640"
height="263"}

Comparison of the old and new saveslot interface

# GSdx: Enhancements for all renderers

[ \[Bug Fix\] ]{style="color: #ff0000;"} [[ GSdx-HW: Fix half-bottom
screen issues on texture/color shuffling
]{style="font-weight: bold; text-decoration: underline;"}](https://github.com/PCSX2/pcsx2/pull/2934)
by [kojin](https://github.com/tadanokojin)

Another major issue we have is the half screen bottom issue where only
half of the screen post processing effects are rendered correctly. Kojin
has been very successful and was able to fix a big portion of half
screen issues in cases where texture shuffle or color shuffle was used.
There are still plenty of remaining edge cases that aren\'t handled yet,
but this is a huge step forward for future accuracy.

Link to the meta issue
[\#1339](https://github.com/PCSX2/pcsx2/issues/1339) .

[ \[Performance Enhancement\] ]{style="color: #00ccff;"}
[\#2344](https://github.com/PCSX2/pcsx2/pull/2344) ,
[\#2681](https://github.com/PCSX2/pcsx2/pull/2681) ,
[\#2731](https://github.com/PCSX2/pcsx2/pull/2731) , [ GSdx-TC: Palette
management rework
]{style="font-weight: bold; text-decoration: underline;"} by
[AlessandroVetere](https://github.com/AlessandroVetere)

The entire palette management system in texture cache has seen a huge
update by Alessandro.\
A tl-dr version would be it improves performance in games, a noteworthy
title would be Zone of the Enders 2. The game sees a doubling in
framerate with Allow 8-bit textures being enabled. Overall performance
is still improved when the option is disabled (but to a lesser degree).
The info is pretty technical so if anyone wants to follow up on it and
read the technical stuff they can do so on the multiple linked pull
requests.

[ \[Enhancement\] ]{style="color: #00ccff;"} [ [GSdx: Add Skipdraw
Offset option for Skipdraw
hack](https://github.com/PCSX2/pcsx2/pull/2534)
]{style="font-weight: bold; text-decoration: underline;"} by
[FlatOutPS2](https://github.com/FlatOutPS2) and
[turtleli](https://github.com/turtleli)

Example: When the broken effects are at frames 91-100, the default
skipdraw always skips 0-100, possibly skipping several functioning
effects as well. By adding this new option, it is now possible to skip
just frames 91 - 100.

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"} [ [Gsdx-HW:
implement fixed TEX0 for all
renderers](https://github.com/PCSX2/pcsx2/pull/2855)
]{style="font-weight: bold; text-decoration: underline;"} by
[Gregory](https://github.com/gregory38) and
[lightningterror](https://github.com/lightningterror)

This improves the hardware rendering and fixes the corrupt textures on
games such as Lupin The Third andJames Bond 007: Nightfire, other games
are likely to be affected as well however these are the only ones
confirmed so far.

[![007-nightfire-before](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-before-s.jpg "007-nightfire-before"){width="353"
height="199"}](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-before.jpg)
[![007-nightfire-after](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-after-s.jpg "007-nightfire-after"){width="353"
height="199"}](/images/stories/frontend/progress_reports/2018-2019/007-nightfire-after.jpg)

# GSdx: Enhancements for OpenGL {#gsdx-enhancements-for-opengl style="display: inline-block;"}

[ \[Performance Enhancement\] ]{style="color: #00ccff;"} [ **[GSdx-GL:
Bypass the texture cache when the framebuffer is
sampled](https://github.com/PCSX2/pcsx2/pull/2921)**
]{style="text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)

This allows to bypass the texture cache when the framebuffer is sampled
on OpenGL when at least Basic Blending is enabled, it provides a huge
speed increase in Star Ocean 3, Ratchet and Clank and Jak games.

A great example would be Star Ocean 3 from [ 20fps
]{style="text-decoration: underline;"} to [ 94fps
]{style="text-decoration: underline;"} with the same settings.

[ \[New Feature\] ]{style="color: #00ccff;"}
[\#2837](https://github.com/PCSX2/pcsx2/pull/2837) ,
[\#2844](https://github.com/PCSX2/pcsx2/pull/2844) ,
[\#2843](https://github.com/PCSX2/pcsx2/pull/2843) [ **GSdx-GL:
Experimental Sparse Texture support**
]{style="text-decoration: underline;"} by
[Gregory](https://github.com/gregory38) ,
[kojin](https://github.com/tadanokojin) and
[lightningterror](https://github.com/lightningterror)

This feature is still experimental and can be enabled in OpenGL Advanced
settings within Advanced Settings & HW hacks.

This feature has the potential to greatly reduce the VRAM requirements
accross the board.\
Some games which use a couple of gigabytes of VRAM with this feature
have the potential to reduce that usage to barely a gigabyte. Such
examples would be Gran Turismo Series, Tourist Trophy, Armored Core and
many others.

It is only available on Nvidia hardware as AMD drivers are completely
broken.

# GSdx: Enhancements for Direct3D

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"} [ [GSdx-D3D:
Improved palette support has been ported from OpenGL to
Direct3D10/11](https://github.com/PCSX2/pcsx2/pull/2459)
]{style="font-weight: bold; text-decoration: underline;"} by
[lightningterror](https://github.com/lightningterror)

The purpose of the code is to support alpha channel of RT uses as an
index for a palette texture. It fixes shadows in Star Ocean 3. Other
games could be affected as well but it\'s unknown which right now. For
more technical details please visit the original commit for details
[b0af54d](https://github.com/PCSX2/pcsx2/commit/b0af54d33e0ca35b1bbd3c991234f2b59eb0c001%22)
.

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"} [ [GSdx-D3D: GPU
accelerate 8 bits texture conversion port from OpenGL to
Direct3D10/11](https://github.com/PCSX2/pcsx2/pull/2590)
]{style="font-weight: bold; text-decoration: underline;"} by
[lightningterror](https://github.com/lightningterror) and
[KrossX](https://github.com/KrossX)

Direct3D also supports 8-bit conversion through a shader now like OpenGL
does, this improves rendering on games that use 8-bit textures like FIFA
Street, Blood Will Tell and many others. Previously 8-bit conversion was
done on the CPU with the **Frame Buffer Conversion** hack which was also
very slow. The only downside is that this feature is not supported on
custom resolutions.

For more details please check the original commits
[d29e375f](https://github.com/PCSX2/pcsx2/commit/d29e375f72c94fb206812e589cf6b8c5814249f9)
and
[6121677a](https://github.com/PCSX2/pcsx2/commit/6121677aa1064269db333f4d5db0b3ead65270c1)
.

[![Blood Will
Tell](/images/stories/frontend/progress_reports/2018-2019/Blood-Will-Tell.jpg){width="634"
height="261"}](/images/stories/frontend/progress_reports/2018-2019/Blood-Will-Tell-l.jpg)\
A comparison of graphical improvements on Blood Will Tell

[ \[Enhancement\] ]{style="color: #00ccff;"} [ [GSdx: OSD improvements
and port to Direct3D10/11](https://github.com/PCSX2/pcsx2/pull/2752)
]{style="font-weight: bold; text-decoration: underline;"} by
[kojin](https://github.com/tadanokojin)

On screen display(OSD) has seen quite a number of improvements such as
being able to select the color of the font, some code cleanup and a full
port to Direct3D10/11.

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"} [ [GSdx-D3D: Depth
Emulation port to
Direct3D10/11](https://github.com/PCSX2/pcsx2/pull/2734)
]{style="font-weight: bold; text-decoration: underline;"} by
[lightningterror](https://github.com/lightningterror) ,
[kojin](https://github.com/tadanokojin) and
[KrossX](https://github.com/krossx)

Previously only OpenGL supported depth emulation for rendering special
post processing effects which left out the D3D11 backend a bit behind,
this feature has been fully ported to Direct3D10/11.

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"}
[\#2745](https://github.com/PCSX2/pcsx2/pull/2745) ,
[\#2754](https://github.com/PCSX2/pcsx2/pull/2754) ,
[\#2823](https://github.com/PCSX2/pcsx2/pull/2823) ,
[\#2830](https://github.com/PCSX2/pcsx2/pull/2830) [ GSdx-D3D: Channel
shuffle port to Direct3D10/11
]{style="font-weight: bold; text-decoration: underline;"} by
[lightningterror](https://github.com/lightningterror) ,
[kojin](https://github.com/tadanokojin) and
[KrossX](https://github.com/krossx)

Just like depth emulation, channel shuffle also renders some special
post processing effects, usually referred as the top left corner issue
[\#1318.](https://github.com/PCSX2/pcsx2/issues/1318) The feature has
been fully ported to Direct3D10/11 bringing the accuracy of
Direct3D10/11 much closer to OpenGL. For anyone that missed the channel
shuffle blog post when it was first introduced to OpenGL they can read
it [here](/developer-blog/277-channel-shuffle-effect.html) .

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"}
[\#2718](https://github.com/PCSX2/pcsx2/pull/2718) ,
[\#2723](https://github.com/PCSX2/pcsx2/pull/2723) [ GSdx: Accurate Date
update and partial port to Direct3D10/11
]{style="font-weight: bold; text-decoration: underline;"} by
[lightningterror](https://github.com/lightningterror)

A new Fast option has been added to OpenGL Accurate Date which should
render shadows/transparency without needing the full option, the same
feature has been ported to Direct3D10/11 along with a port of Fast DATE
code. The entire feature is not fully ported to Direct3D10/11 as some
cases are missing however it is still a huge improvement from before.

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"} [[ **GSdx-D3D: HDR
Colclip blend port to Direct3D10/11**
]{style="text-decoration: underline;"}](https://github.com/PCSX2/pcsx2/pull/2807)
by [lightningterror](https://github.com/lightningterror)

The old inaccurate algorithm has been removed and replaced with a more
accurate one just like on OpenGL. This feature imrpoves shadow rendering
on many games.\
A few examples would be: God of War 1 and 2, Final Fight Streetwise,
Steambot Chronicles, Eternal Poison and many others.

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"}
[\#2928](https://github.com/PCSX2/pcsx2/pull/2928) ,
[\#2937](https://github.com/PCSX2/pcsx2/pull/2937) [ GSdx-D3D: Accurate
Blend Fbmask port to Direct3D10/11
]{style="font-weight: bold; text-decoration: underline;"} by
[lightningterror](https://github.com/lightningterror)

This feature allows to better render colors and shadows which can also
be toggled by the Accurate Blending option, the feature on Direct3D
10/11 is split between Basic, Medium and High, whereas on OpenGL Basic
blending fully enables this feature already, we have to do this since
Direct3D10/11 is a limited API. It is quite a big improvement overall
and again should close the gap between OpenGL and Direct3D10/11. Do note
however that the feature operates slower compared to OpenGL because of
the limited API.

For comparison High Blending D3D10/11 is like one third of Basic
Blending OpenGL. That\'s how much entire blending features differ and
Direct3D10/11. Basic software blending is a big feature that
Direct3D10/11 lacks.

Image comparison on Direct3D10/11:

![](/images/stories/frontend/progress_reports/6-2015/fifa_street_broken.jpg)
Accurate Date (Off), Accurate Blending (Off)

![](/images/stories/frontend/progress_reports/6-2015/fifa_street_fixed.jpg)
Accurate Date (Fast), Accurate Blending (Basic)

Accurate Date renders the shadows better while Accurate Blending renders
the stage as well as character models in this game.

[ \[Accuracy Enhancement\] ]{style="color: #00ccff;"} [**GSdx-D3D:
Partial SW blending port to
Direct3D10/11**](https://github.com/PCSX2/pcsx2/pull/2973) by
[hibye8313](https://github.com/hibye8313)

Currently only Accumulation sw blending is supported, this feature
similar to HDR Colclip also improves shadow rendering on games such as
Crash of the Titans, Crash Twinsanity, Castlevania, Nano Breaker and
many others. Part of this feature can be toggled with Accurate Blending
option from the GUI just like on OpenGL.

A notable issue that is resolved would be
[\#1920](https://github.com/PCSX2/pcsx2/issues/1920) .

[ \[Accuracy Enhancement Results\] ]{style="color: #00ccff;"} Here we
can show you a comparison of several games before and after, we can\'t
put these in one specific category above because they could just as
easily fit in several because of the multiple rendering effects that
were fixed.\
\
Keep in mind these comparisons are for Direct3D as these improvements
have been implemented for a long time on OpenGL. Comparison is also done
between PCSX21.4 and current developmentbuilds (14 Jun 2019).

-   ICO HLE implementation would be a great example of this as it uses
    several.ICO uses a depth of field effect for the fog. Depth is
    extracted into the alpha channel of a texture. And then used as
    blending factor. A detailed explanation can be found in the original
    OpenGL pull request [here](https://github.com/PCSX2/pcsx2/pull/1854)
    . Unlike on OpenGL where implementation was easier to do so, we had
    to do a few extra steps on Direct3D because it\'s very limited and
    restricted.\
    \

[![ICO](/images/stories/frontend/progress_reports/2018-2019/ico.jpg){width="700"
height="197"}](/images/stories/frontend/progress_reports/2018-2019/ico-l.jpg)

-   The next example we have is Urban Chaos, and oh boy is this a huge
    improvement, basically we have proper Texture shuffle emulation,
    Depth emulation, Channel shuffle emulation and special HLE shader
    emulation.

[![urban
chaos.jpg](/images/stories/frontend/progress_reports/2018-2019/urban-chaos.jpg){width="700"
height="197"}](/images/stories/frontend/progress_reports/2018-2019/urban-chaos-l.jpg)

Of course we can show you more examples of other similar games that got
fixed too but the visual results are quite similar so for anyone
interested they can check meta issues such as the top left corner issue
(Channel shuffle) [here](https://github.com/PCSX2/pcsx2/issues/1318) .

# GSdx Code Cleanup

-   Removal of Direct3D9 backend. Removal of Direct3D9 allowed us to
    better support the new features that were ported on Direct3D10/11
    without Direct3D9 holding us back.
-   Removal of MSAA. This form of anti-aliasing was removed due to its\'
    incompatibility with newer DirectX features. At the same time, it
    was actively hindering development progress from being made due to a
    high amount of rendering bugs that were being produced while the
    code was still in place. On a more general note, keep in mind that
    MSAA has already fallen out of favor in most PC games in 2019 due to
    its\' high overhead requirements. GS emulation is no stranger to
    this, as most systems would likely have no GPU overhead available to
    run MSAA without incurring major speed penalties. (on more demanding
    titles) *FXAA is still available as a replacement to all users
    through the GSdx dialog or the Page Up keyboard shortcut.*
-   Removal of many CRC hacks. Oh you heard right, once again we removed
    plenty of CRC hacks, this is because of the increased accuracy on
    all renderers - especially Direct3D10/11 and the purge of Direct3D9.

[ \[Enhancement\] ]{style="color: #00ccff;"} [ Other Enhancements
]{style="font-weight: bold; text-decoration: underline;"}

-   [\#2421](https://github.com/PCSX2/pcsx2/pull/2421) Unused Direct
    Compute render has been purged by
    [turtleli](https://github.com/turtleli) .
-   A lot of other legacy/useless code has been purged from the emulator
    as well. Guess we did a bit of a house cleaning.
-   Many fixes and patches were added to the GameDB to fix various
    issues such as unplayable games and visual glitches.
-   There were also core enhancements made by
    [Refraction](https://github.com/refractionpcsx2) that also
    improve/fix some games as well as improve core logging.
-   The GUI for SPUX-2 and GSdx have been updated to improve usability.
-   Gif Unit: Recheck VIF status after a reset is performed when waiting
    for PATH3 (Fixes Eragon)
-   VIF: \"Hacked the Hack\"(Fixes \"Downtown Run\")

As you can see, we have been all but idle these past months, with many
bug fixes, hack removals and improvements all around PCSX2 and plugins.
We know it has been too long since a stable release and 1.5 GIT builds
are already miles ahead the stable 1.4 in all fronts so we are in the
process of feature freezing for the long awaited 1.6 stable release.
Stay tuned!
:::
:::
