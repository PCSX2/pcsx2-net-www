---
title: "Q2 2020 Progress Report"
date: 2020-07-25T00:00:00
summary: "A huge boost in accuracy that we've accomplished was improving Z-Buffer emulation on both hardware and software renderers"
draft: false
tags:
  - "progress-report"
mainAuthor: lightningterror
---

# GSdx Improvements

<span style="color: #00ccff;"> \[Accuracy Enhancement\] </span>
**[\#3414](https://github.com/PCSX2/pcsx2/pull/3414) ,
[\#3433](https://github.com/PCSX2/pcsx2/pull/3433) (HW/SW) Z-Buffer
improvements. By [lightningterror](https://github.com/lightningterror) ,
[refraction](https://github.com/refractionpcsx2) and
[KrossX](https://github.com/KrossX) , backport from Dobiestation.**

A huge boost in accuracy that we've accomplished was improving Z-Buffer
emulation on both hardware and software renderers. What this means is
that a lot of games received a boost in accuracy throughout the ps2 game
library. Many text and HUD issues have been resolved. So far these are
the games that we know of that show an improvement:

-   Itadaki Street 3 (text display),
-   Midnight Club 3 (text input),
-   Rozen Maiden DuellWalzer (text)
-   F1 2004 (starting lights),
-   Alone in the Dark (improper controller display),
-   Silent Hill 2 and 3 (textures not showing on different angles such
    as toilet),
-   Syphon Filter: The Omega Strain (weapon HUD),
-   Tomb Raider Angel of Darkness (book pictures).

For anyone interested what Z-Buffering is and it's technical aspects,
there is a nice wiki page that you can read
[here](https://en.wikipedia.org/wiki/Z-buffering) .

Here are some eye candy image comparisons from some of the mentioned
games

Itadaki Street:

{{< img-cmp-slider before="./img/Itadaki-Street-before.png" after="./img/Itadaki-Street-after.png">}}

Rozen Maiden DuellWalzer:

{{< img-cmp-slider before="./img/Rozen-Maiden-DuellWalzer-before.png" after="./img/Rozen-Maiden-DuellWalzer-after.png">}}

Tomb Raider Angel of Darkness:

{{< img-cmp-slider before="./img/Tomb-Raider-Angel-of-Darkness-before.png" after="./img/Tomb-Raider-Angel-of-Darkness-after.png">}}

Alone in the Dark:

{{< img-cmp-slider before="./img/Alone-in-the-Dark-before.png" after="./img/Alone-in-the-Dark-after.png">}}

<span style="color: #00ccff;"> \[Accuracy Enhancement\] </span>
**[\#3436](https://github.com/PCSX2/pcsx2/pull/3436) (HW) Improved
Texture shuffle detection. By
[lightningterror](https://github.com/lightningterror) and
[kojin](https://github.com/tadanokojin) .**

To put it simply it improves the effect detection so that games can be
properly rendered, plus we removed the CRC hacks that were in its place
to skip the bad draw calls. So far we know of only two games that hit
the code path such as Onimusha 3 and Devil May Cry 3, but we believe
there are more that we don't know of.

Everybody loves image comparisons right?

Onimusha 3:

{{< img-cmp-slider before="./img/Onimusha-3-before.png" after="./img/Onimusha-3-after.png">}}

Devil May Cry 3:

{{< img-cmp-slider before="./img/DMC3-before.png" after="./img/DMC3-after.png">}}

<span style="color: #00ccff;"> \[Accuracy Enhancement\] </span>
**[\#3131](https://github.com/PCSX2/pcsx2/pull/3131) (HW) Invalidate
Source with overlapping draw. By
[iMineLink](https://github.com/iMineLink) .**

Improve texture cache Source objects invalidation logic taking into
account overlapping with current draw.
Fixes eyes rendering for the Major in Jak 1.

{{< img-cmp-slider before="./img/ak-before.png" after="./img/Jak-after.png">}}

<span style="color: #00ccff;"> \[Accuracy Enhancement\] </span>
**[\#3075](https://github.com/PCSX2/pcsx2/pull/3075) (HW) Extend
Software Sprite Renderer to Dragonball Z Budokai Tenkaichi 2 and 3. By
[iMineLink](https://github.com/iMineLink) .**

Previously we've discussed that we have a new feature called
SWSpriteRenderer that we use to properly render the Jak character model
in Jak games. Now we are extending the feature as well as improving the
SWSpriteRenderer code itself to work on Budokai Tenkaichi 2 and 3 games.
This improves rendering of Kaio-ken effect in Dragonball Z Budokai
Tenkaichi 2, as well as improve character silhouette in Dragonball Z
Budokai Tenkaichi 2 and 3 when a character is hidden from displaying
from an obstacle (rock for example), as well as properly render
character flashing on a charged attack.

So far only Jak and Budokai Tenkaichi 2 and 3 games use this feature. In
the future we plan on finding more games that can benefit from this,
further improve the feature and always enable it by default along with
auto detection.

Budokai Tenkaichi 2:

{{< img-cmp-slider before="./img/DBZBT2-before.png" after="./img/DBZBT2-after.png">}}

Budokai Tenkaichi 3:

{{< img-cmp-slider before="./img/DBZBT3-before.png" after="./img/DBZBT3-after.png">}}

<span style="color: #00ccff;"> \[Accuracy Enhancement\] </span>
**[\#3027](https://github.com/PCSX2/pcsx2/pull/3027) (HW) Add dithering
support. By [KrossX](https://github.com/KrossX) .**

Dithering support has been added on all hardware renderers. Another
great step in increasing accuracy which further matches or gets close to
Software renderer. For more specifics about what dithering is you can
check this link [here](https://en.wikipedia.org/wiki/Dither) . For those
who wish to turn off dithering on the latest development builds they can
do so with the Page Down key which is temporary or edit the GSdx ini
file which is permanent. There are 3 levels. Off, Scaled and Unscaled. A
lot of games use dithering so here is an example below from Castlevania.

{{< img-cmp-slider before="./img/castlevania-before.png" after="./img/castlevania-after.png">}}

<span style="color: #00ccff;"> \[Accuracy Enhancement\] </span>
**[\#3264](https://github.com/PCSX2/pcsx2/pull/3264) (HW) Color clip
blending improvements. By
[lightningterror](https://github.com/lightningterror) .**

-   Enable non recursive blending when blending is set to None.
    Previously non recursive blending was enabled only when blending was
    set to Basic or higher, and now it will be active on None option as
    well as there are 0 drawbacks. It is faster so games will gain a
    couple of FPS when blending is disabled and it is also more
    accurate. A win - win situation.

<!-- -->

-   (OpenGL) Always use accurate sw blending on Safe/Accurate Frame
    buffer masking instead of accumulation mode. Fixes shadows in
    Superman Shadows of Apokolips, see image comparison below.

{{< img-cmp-slider before="./img/Superman-Shadows-of-Apokolips-before.png" after="./img/Superman-Shadows-of-Apokolips-after.png">}}

<span style="color: #00ccff;"> \[Misc Enhancements\] </span> **Other
important GSdx changes:**

-   [\#3247](https://github.com/PCSX2/pcsx2/pull/3274) (PSX/PS1 emu) PS1
    emulator plugin support has been dropped/removed, as the code wasn't
    maintained at all and the feature was barely working. What does this
    mean? GSdx as a plugin can no longer be used on other ps1 emulators
    that support a plugin interface such as ePSXe. PS1 titles can still
    be played using PCSX2. By
    [lightningterror](https://github.com/lightningterror) .

<!-- -->

-   [\#3304](https://github.com/PCSX2/pcsx2/pull/3304) (HW) Custom
    Resolution has been removed from the GUI. The option didn't work
    properly with many features such as Depth Emulation, Destination
    Alpha Test and many more, breaking accurate emulation in the
    process. For anyone still wishing to use Custom Resolution even
    though we strongly advise against it, they can modify the GSdx ini
    file. By [lightningterror](https://github.com/lightningterror) .

<!-- -->

-   [\#3263](https://github.com/PCSX2/pcsx2/pull/3263) (HW/SW) Mirror
    RGBAQ to 0x11. FixesRidge Racer V shadows, see image comparison
    below. By [kojin](https://github.com/tadanokojin) and
    [PSI-Rockin](https://github.com/PSI-Rockin) , backport from
    Dobiestation.

{{< img-cmp-slider before="./img/Ridge-Racer-V-before.png" after="./img/Ridge-Racer-V-after.png">}}

-   [\#3279](https://github.com/PCSX2/pcsx2/pull/3279) (HW/SW) Mask A+D
    addresses. Fixes network configuration wizard display issues on some
    games, see image comparison below. By
    [refraction](https://github.com/refractionpcsx2) , backport from
    Dobiestation.

{{< img-cmp-slider before="./img/network-config-before.png" after="./img/network-config-after.png">}}

-   [\#3440](https://github.com/PCSX2/pcsx2/pull/3440) (HW) Alpha
    Stencil hack has been now completely removed from the Direct3D10/11
    renderer as well. As it was the case with OpenGL now DATE Accuracy
    renders the effects properly with little to no side effects, leaving
    Alpha Stencil completely useless. In 9 out of 10 cases Alpha Stencil
    used to break plenty of post processing effects which was an awful
    hack. By [lightningterror](https://github.com/lightningterror) .

------------------------------------------------------------------------

# Core Improvements

<span style="color: #00ccff;"> \[Accuracy Enhancement\] </span>
**[\#3311](https://github.com/PCSX2/pcsx2/pull/3311) ,
[\#3400](https://github.com/PCSX2/pcsx2/pull/3400) IPU Improvements. By
[turtleli](https://github.com/turtleli) .**

-   Adds dithering to the RGB32-&gt;RGB16 conversion (see images from
    Hisshou Pachinko PachiSlot Kouryaku Series Vol 10 - carefully
    ).

{{< img-cmp-slider before="./img/Hisshou-Pachinko-PachiSlot-Kouryaku-Series-Vol-10-before.png" after="./img/Hisshou-Pachinko-PachiSlot-Kouryaku-Series-Vol-10-after.png">}}

-   Adds SSE2 implementation of RGB32-&gt;RGB16 conversion (speed on the
    opening FMV in Hisshou Pachinko PachiSlot Kouryaku Series Vol 10
    goes from \~175% to \~275% with frame limiter disabled using GSdx
    software mode).

<!-- -->

-   Implements VQ (see images from Klonoa 2).

{{< img-cmp-slider before="./img/klonoa-2-before.png" after="./img/klonoa-2-after.png">}}

-   Removes GameDB patches for Klonoa 2, and revert workaround for
    Klonoa 2 crashes which are no longer needed.

<span style="color: #00ccff;"> \[Misc Enhancements\] </span> **Other
important Core changes:**

-   [\#3386](https://github.com/PCSX2/pcsx2/pull/3386) SuperVU legacy
    recompiler has been completely removed. In order to move forward and
    make things easier (for example adding 64bit support) we have
    decided to completely remove the legacy SuperVU recompiler. By
    [arcum42](https://github.com/PCSX2/pcsx2/pull/3386) .

<!-- -->

-   [\#3361](https://github.com/PCSX2/pcsx2/pull/3361) Allow reading of
    8bit timers (and other hardware pages). Fixes Robin Hood (character
    not being able to move, enemies not spawning, missing UI elements).
    By [refraction](https://github.com/refractionpcsx2) .

<!-- -->

-   [\#3385](https://github.com/PCSX2/pcsx2/pull/3385) Fix situation
    where a VIF IRQ triggers and the game triggers a STOPcausing the IRQ
    to never trigger.Fixes Nitro Bike (hanging). By
    [refraction](https://github.com/refractionpcsx2) .

<!-- -->

-   [\#3095](https://github.com/PCSX2/pcsx2/pull/3095) Make recLUT not
    hardcoded to 32 MB.This change makes the EE recompiler not hardcoded
    to working with 32 MB of RAM.This may be helpful if anybody else in
    the future wants to emulate a PS2 dev kit with 128 MB of RAM. By
    [water111](https://github.com/water111) .

<!-- -->

-   [\#3324](https://github.com/PCSX2/pcsx2/pull/3324) Implemented
    memory mode check in COP0.This makes Next Generation Tennis 2003
    (Roland Garros French Open 2003) and Spongebob Squarepants Battle
    for Bikini Bottom (PAL release) work. By
    [prafullpcsx2](https://github.com/prafullpcsx2) and
    [refraction](https://github.com/refractionpcsx2) .

------------------------------------------------------------------------

# SPU2-X Improvements

-   [\#3244](https://github.com/PCSX2/pcsx2/pull/3244) XAudio 2.7 has
    been removed as it's no longer needed since Windows 7 is no longer
    supported. By [MonJamp](https://github.com/MonJamp) .
-   [\#3454](https://github.com/PCSX2/pcsx2/pull/3454) Rewrite the
    spu2-x dialog on Linux in wxwidgets. By
    [arcum42](https://github.com/PCSX2/pcsx2/pull/3386) .

------------------------------------------------------------------------

# GameDB Improvements

-   [\#3376](https://github.com/PCSX2/pcsx2/pull/3376) Performance patch
    fix for Primal and Ghosthunter.Fix for terrible performance in US
    versions of Primal (all the time) and Ghosthunter (when encountering
    Teddy Bear and in the moment of Gator-Man's rush attack, maybe a few
    other cases). By [RazielZnot](https://github.com/RazielZnot) .

<!-- -->

-   Other GameDB additions or deletions have been done throughout the Q2
    cycle as well.

------------------------------------------------------------------------

# Misc Improvements

-   [\#3357](https://github.com/PCSX2/pcsx2/pull/3357) Preliminary work
    on macOS support, it still needs a lot work but it's a great step
    moving forward. By [tellowkrinkle](https://github.com/tellowkrinkle)
    .

<!-- -->

-   [\#3477](https://github.com/PCSX2/pcsx2/pull/3477) ,
    [\#3423](https://github.com/PCSX2/pcsx2/pull/3423) Better DPI
    scaling support. Fixed some texts being cut off from the GUI on
    several plugins as well as the glitchy logo when using DPI scaling.
    By [lightningterror](https://github.com/lightningterror) and
    [Ryudo300](https://github.com/Ryudo300) .

<!-- -->

-   [\#3420](https://github.com/PCSX2/pcsx2/pull/3420) Switch over the
    null plugins dialog code to use wxWidgets instead of gtk on Linux.By
    [arcum42](https://github.com/PCSX2/pcsx2/pull/3386) .

<!-- -->

-   Windows 7 and Windows 8 support has been dropped in order to move
    forward.

<!-- -->

-   There have been other improvements made such as more code cleanups,
    bug fixes and other improvements but we won't mention them since
    they aren't that big of a deal.

------------------------------------------------------------------------

# Future Plans

64 bit support is in progress and getting along nicely, more work on
macOS support, more juicy new core accuracy improvements that will be
mentioned in the next report, more code cleanups, refactoring,
overhauling and so on.

------------------------------------------------------------------------

And that's all from us, see you next time in our Q3 Report!
