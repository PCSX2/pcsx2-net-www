::: {.single-article}
::: {.item-page .clearfix}
## [Q1 2021 Progress Report](/298-q1-2021-progress-report.html) {#q1-2021-progress-report .contentheading}

::: {style="text-align:center;"}
:::

![progress rep q1
2021](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/progrepq12021.jpg){width="563"
height="104"}

Once again we are back with another progress report bringing you amazing
progress.

Written by
[lightningterror](https://forums.pcsx2.net/User-lightningterror)

# Core Improvements

**[ \[Enhancement\] ]{style="color: #00ccff;"}
[\#4115](https://github.com/PCSX2/pcsx2/pull/4115) PAD/Counters: Make
VSync Queue adjustable in the UI. Extra Pad update. By
[refractionpcsx2](https://github.com/refractionpcsx2) .**

New UI option (ini option has been there a while) so users can choose
between a little bit extra performance or reduced input lag. Also added
the PAD Update to the VSync call in Counters as it seemed to reduce
input lag marginally.

**[ \[Enhancement\] ]{style="color: #00ccff;"}
[\#4066](https://github.com/PCSX2/pcsx2/pull/4066) IPU: Return contents
of the bottom of the FIFO in CMD except FDEC/VDEC. By
[refractionpcsx2](https://github.com/refractionpcsx2) .**

This is based on the work by
[\@PSI-Rockin](https://github.com/PSI-Rockin){.user-mention} on
Dobiestation but modified based on the theory that it always returns the
first 32bits of the FIFO unless an FDEC/VDEC command is executed,
however FDEC is basically doing this anyway, but VDEC returns decoded
information.

Fixed videos for probably all broken EA games, but namely:\
F1 2001\
F1 2002\
Neo Contra\
Shox\
Theme Park Rollercoaster/World

**[ \[Enhancement\] ]{style="color: #00ccff;"}
[\#4225](https://github.com/PCSX2/pcsx2/pull/4225) IPU: Fill Input FIFO
on command end ready for next command. By
[refractionpcsx2](https://github.com/refractionpcsx2) .**

Dance Summit 2001: So basically what the game does is it does some IPU
stuff, but the DMA is left with 1 QWC left to be read on the DMA, on the
hardware this will normally be flushed in to the FIFO. The game then
does a FIFO reset (To get rid of it) then starts another DMA. The
problem we have is because we still had the DMA pending for 1 QWC, it
ignored the new DMA start and the IPU would hang up waiting for data to
be fed in. This PR resolves that problem.

Test Drive: Also added DMA 4 (To IPU) being flushed if BCLR is called
without first stopping the DMA.

Set the Picture type on VDEC to I-Picture if set to 0 in the IPU_CTRL,
this fixes a bunch of Eyetoy games which incorrectly set this register.

[ Fixes ]{.issue-keyword .tooltipped .tooltipped-se
aria-label="This pull request closes issue #3432."} EyeToy Play(1-3).\
[ Fixes ]{.issue-keyword .tooltipped .tooltipped-se
aria-label="This pull request closes issue #4125."} Bakufuu Slash!!
Kizna Arashi.\
[ Fixes ]{.issue-keyword .tooltipped .tooltipped-se
aria-label="This pull request closes issue #3700."} Kaiketsu Zorro
Mezase! SIF0 and SIF1 stall control.\
[ Fixes ]{.issue-keyword .tooltipped .tooltipped-se
aria-label="This pull request closes issue #1863."} Test Drive: IPU hang
in middle of Event 5.

**[ \[Enhancement\] ]{style="color: #00ccff;"} DEV9 improvements:**

[\#4062](https://github.com/PCSX2/pcsx2/pull/4062) DEV9: Support 16bit
reads/writes to SPD_R\_PIO_DATA & SPD_R\_PIO_DIR.By
[TheLastRar](https://github.com/TheLastRar) .

This improves
[\#3192](https://github.com/PCSX2/pcsx2/issues/3192){.issue-link
.js-issue-link} , the online beta now sends a DHCP Discover packet,
although it appears to be invalid.

[\#4059](https://github.com/PCSX2/pcsx2/pull/4059) DEV9: Generate unique
MAC for TAP.By [TheLastRar](https://github.com/TheLastRar) .

An unique MAC is needed for full compatibility with XLink Kai.

Uses a method similar to what was done for pcap.

[\#3932](https://github.com/PCSX2/pcsx2/pull/3932) DEV9: Add HDD
emulation.By [TheLastRar](https://github.com/TheLastRar) .

[\#4214](https://github.com/PCSX2/pcsx2/pull/4214) DEV9: Merge
\_DEV9\*() functions into \*Net(), and check ethEnable before calling
InitNet(). By [TheLastRar](https://github.com/TheLastRar) .

Previously, the ethEnable config value was not checked before starting
network RX net thread.

[\#4219](https://github.com/PCSX2/pcsx2/pull/4219) DEV9: Fix crash on
Linux when we fail to open the adapter.By
[TheLastRar](https://github.com/TheLastRar) .

[\#4149](https://github.com/PCSX2/pcsx2/pull/4149) DEV9: Re-add pcap
(both bridged and switched) on windows.By
[TheLastRar](https://github.com/TheLastRar) .

**[ \[Enhancement\] ]{style="color: #00ccff;"} CDVD improvements:**

[\#4314](https://github.com/PCSX2/pcsx2/pull/4314)
[\#4045](https://github.com/PCSX2/pcsx2/pull/4045) CDVD: Add CHD
compression format support. By [rtissera](https://github.com/rtissera) ,
[SleepyMan](https://github.com/SleepyMan) and
[siddhartha77](https://github.com/siddhartha77) .

[\#4146](https://github.com/PCSX2/pcsx2/pull/4146) CDVD: Increase buffer
for DVD_LAYER_DESCRIPTOR. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

[\#4236](https://github.com/PCSX2/pcsx2/pull/4236) CDVD: Implement
mechacon command 0xEF. By [F0bes](https://github.com/F0bes) .

**[ \[Enhancement\] ]{style="color: #00ccff;"} microVU improvements:**

[ee07f86](https://github.com/PCSX2/pcsx2/commit/ee07f860fc1dd7e8ada6c13903bb3a592b8d4864)
microVU: Implement Overflow checks. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Fixes Superman Returns.

[413fd00](https://github.com/PCSX2/pcsx2/commit/413fd004da0ba46786b878683f6b177ad1bdcde7)
microVU: Fix jump caching when using doJumpAsSameProgram. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

[c9bc6ea](https://github.com/PCSX2/pcsx2/commit/c9bc6eac69a3ceea6dffe6cec07b17caa1e2fc6e)
microVU: Fix P flag instance on Ebit. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Also small fix for flag statuses on M-Bit on Branch.

[0f7044a](https://github.com/PCSX2/pcsx2/commit/0f7044a90f62f84db4844292bb2bcc7d4cc7626b)
microVU: Removed full flag optimisations. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

They were unused, broken and cluttering up the code.

[\#4198](https://github.com/PCSX2/pcsx2/pull/4198) microVU: Fix Esin
opcode. By [kozarovv](https://github.com/kozarovv) .

Someone accidentally used bad function to analyze ESIN opcode on
microVU, that generated bad values due to wrong register field being
used.

Fixes X2 - Wolverine\'s Revenge.

[f9d96f5](https://github.com/PCSX2/pcsx2/commit/f9d96f55a538ce373f1662a5554d8052173940b1)
microVU: move the overflow flags to the correct position. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

**[ \[Enhancement\] ]{style="color: #00ccff;"} VIF improvements:**

[ddffd9ac](https://github.com/PCSX2/pcsx2/commit/ddffd9acd671ee3165061980554d4a36c86eeb5e)
VIF: Fix MPG VU Address wrapping. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Fixes Boogie.

[8999159](https://github.com/PCSX2/pcsx2/commit/89991594de89b0068efd906286b5a39cc7c8186f)
VIF: Clean up some old (incorrect) code. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

**[ \[Enhancement\] ]{style="color: #00ccff;"} SPU2 improvements:**

[\#4074](https://github.com/PCSX2/pcsx2/pull/4074) SPU2: Attempt 96khz
sample rate if 48khz fails (WASAPI). By
[refractionpcsx2](https://github.com/refractionpcsx2) .

WASAPI is terrible and doesn\'t support sample rate conversion in shared
(normal) mode and requires exclusive mode.

This PR basically attempts to double the PS2 sample rate of 48khz to
96khz as this tends to be the other windows default. If this fails it
will put a log message to say you need to use Exclusive mode.

Note: When using PS1 game emulation you will need to use exclusive mode,
nothing I can do about this (44.1khz doesn\'t divide nicely from 48khz
or 96khz).

[\#4057](https://github.com/PCSX2/pcsx2/pull/4057)
[\#4085](https://github.com/PCSX2/pcsx2/pull/4085)
[f1e44bf](https://github.com/PCSX2/pcsx2/commit/f1e44bfd47e3761388ebb5cc8ca4db78bb24916c)
SPU2: Improve DMA/IRQ timing. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Fixes The Simple 2000 Series Vol 51 - The Senkan (AKA The Battleship)
which was not booting with anything but ZeroSPU2\
Fixes The Simpsons, problem was due to an ADMA refill bug.

[f5d8906](https://github.com/PCSX2/pcsx2/commit/f5d89062e02933b5dc4e090ff7c7f4dc5368ef26)
SPU2: Update voices before DMA reads, reset OutPos on reset. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Improves the booting reliability of GTA VC, especially on consecutive
boots without closing the emulator.

[\#4134](https://github.com/PCSX2/pcsx2/pull/4134) SPU2: Switch to a
more accurate noise algorithm. By [Ziemas](https://github.com/Ziemas) .

This algorithm comes from PCSX-R and is an implementation of Dr. Hell\'s
research.

The previous implementation was a simple LFSR and did not use the
provided noise clock from the ATTR register.

[\#4171](https://github.com/PCSX2/pcsx2/pull/4171) SPU2: Improve ADMA
behaviour/timing. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Hopefully improves the crackling in burnout 3.\
Fixes music looping in Ratatouille.\
[ Fixes ]{.issue-keyword .tooltipped .tooltipped-se
aria-label="This pull request closes issue #3846."} Vexx clicking sound
(Partial ADMA transfers).\
Fixes the Dolby Pro Logic video missing sound in Primal (Partial ADMA
transfers).\
Fixes Splinter Cell panning audio problem and high pitched noises in
cut-scenes.\
Fixes Myst 3 panning audio problem.\
Fixes Dynasty Warriors 5 stuttering videos when Dolby is enabled.

[e039492](https://github.com/PCSX2/pcsx2/commit/e0394921e98136547176f9a224a9bb9084fbda47)
SPU2: Tighten AutoDMA IRQ timing. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Fixes games which monitor the MADR while transferring.

Fixes Tom & Jerry in War of the Whiskers jumpy music.

[\#4210](https://github.com/PCSX2/pcsx2/pull/4210) SPU2: Adjust
interpolation implementations. By [Ziemas](https://github.com/Ziemas) .

These seems to be have been adjusted to match the output of catmull-rom
which is really the one in the wrong by being twice as loud.

As a result of the interpolated output being at a reasonable level we
can use ApplyVolume to apply the ADSR volume.

[\#4203](https://github.com/PCSX2/pcsx2/pull/4203) SPU2: Make sure cache
hits match previous block decoded samples. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Caching blocks of ADPCM is a bit sketchy because the previous samples
(which it uses to generate the new ones) can change depending on if
it\'s the start of the voice on or if it has looped around, so you can
end up with blips and glitches in the sample stream, this should avoid
that problem whilst not making the cache completely unusable.

Should get rid of clicking and popping noises in loops samples.

Fixes Sphinx and the Cursed Mummy sound distortion.

Also fixes remaining blips in Vexx.

[\#4195](https://github.com/PCSX2/pcsx2/pull/4195) SPU2: Add Gaussian
interpolation. By [Ziemas](https://github.com/Ziemas) .

This implements the actual SPU interpolation as documented by nocash.

[\#4226](https://github.com/PCSX2/pcsx2/pull/4226) SPU2: Resample reverb
input/output. By [Ziemas](https://github.com/Ziemas) .

The reverb runs at half the sample rate of the rest of the SPU so a
change of sample rate is required. The way this is currently done is by
decimating when downsampling and duplicating samples when upsampling
without doing any filtering.

This adds proper filtering to this process, the filter coefficients are
from Mednafen but we think they were originally found by Neill Corlett.

[f42befa](https://github.com/PCSX2/pcsx2/commit/f42befadf10493a8ccb5a021de416cc1efeb5e03)
SPU2: Try to recover DMA pointer after savestate load. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

[\#4186](https://github.com/PCSX2/pcsx2/pull/4186) SPU2: Ignore LSAL/H
Writes after key on if voice sets loop point. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

Fixes behaviour with loop address writes within 4T\'s of a voice keying
on which is what the old Delay Cycles tried to address, if the voice
sets its own loop point the write from hardware is ignored.

Fixes Mafia music loops.

[ce8047b](https://github.com/PCSX2/pcsx2/commit/ce8047bd8cb8d036ed3ba4e9cd2f85743f018ccd)
SPU2: Reset IRQ Status when swapping game in case it got set previously.
By [refractionpcsx2](https://github.com/refractionpcsx2) .

**[ \[Enhancement\] ]{style="color: #00ccff;"} Memorycard
improvements:**

[\#4113](https://github.com/PCSX2/pcsx2/pull/4113) Memorycards: Fix out
of bounds array access in folder memcards. By
[Ziemas](https://github.com/Ziemas) .

Don\'t keep the DataClusterInUse bit when accessing the next cluster.

With this folder memcards work on 64bit.

[\#2995](https://github.com/PCSX2/pcsx2/pull/2995) Memorycards: Add
support for OpenPS2Loader VirtualMemoryCards. By
[KrossX](https://github.com/KrossX) .

Adds some basic support to OPL VMC files (.bin) that use 512 bytes
pages.

Normal pages are 528 bytes long, those extra 16 bytes contain 12 bytes
of ECC data.

**[ \[Enhancement\] ]{style="color: #00ccff;"} Debuggers improvements:**

[\#4252](https://github.com/PCSX2/pcsx2/pull/4252) Debugger: Add \"Go to
address\" for both disasm and memory view context menus. By
[F0bes](https://github.com/F0bes) .

[\#4289](https://github.com/PCSX2/pcsx2/pull/4289) Debugger: Require
emulator start before enabling Break/Run button. By
[F0bes](https://github.com/F0bes) .

[\#4287](https://github.com/PCSX2/pcsx2/pull/4287)
[\#4326](https://github.com/PCSX2/pcsx2/pull/4326) Misc: Support more
BIOSes for the Debugger Thread View. By
[F0bes](https://github.com/F0bes) .

[\#4271](https://github.com/PCSX2/pcsx2/pull/4271) GS/Core: Implement
the new generation of GS Debugger. By
[GovanifY](https://github.com/GovanifY) .

This is a full in-core reimplementation of GSDumpGUI. It will be used
for GS Debugging once GSdx is merged in to the core.

One step closer in to merging GSdx in to the core.

**[ \[Enhancement\] ]{style="color: #00ccff;"} Misc core improvements:**

[\#3011](https://github.com/PCSX2/pcsx2/pull/3011) IOP: Implements IOP
breakpoints. By [monster860](https://github.com/monster860) .

[\#4234](https://github.com/PCSX2/pcsx2/pull/4234) IOP: Execute
breakpoints for the interpreter. By [F0bes](https://github.com/F0bes) .

[\#4205](https://github.com/PCSX2/pcsx2/pull/4205) PAD: Don\'t Destroy()
modals.

On macOS it prevents the parent window from regaining focus. By
[TellowKrinkle](https://github.com/tellowkrinkle) .

[\#4223](https://github.com/PCSX2/pcsx2/pull/4223) PGIF: PS1DRV handles
bit 28 of GPU Status register, not PGIF. By
[Nobbs66](https://github.com/Nobbs66) .

Fixes several PSX games:

Castlevania: Symphony of the Night

Twisted Metal

Pink Panther

[c695a7e](https://github.com/PCSX2/pcsx2/commit/c695a7eabbac4c3a0138b6eeb0e9005ff708f985)
USB: usb-mic: Send 1ms worth of samples for 48kHz and 8kHz sample rates.
By [jackun](https://github.com/jackun) .

[\#4310](https://github.com/PCSX2/pcsx2/pull/4310) USB: Improve Force
Feedback test so it doesn\'t block UI. By
[CookiePLMonster](https://github.com/CookiePLMonster) .

This modifies DirectInput USB Force Feedback test not to block the UI.
Instead of performing the test synchronously on the UI thread, a timer
gets created which advances the test every half a second.

[\#4232](https://github.com/PCSX2/pcsx2/pull/4232) USB: Eyetoy
mirroring. By [Florin9doi](https://github.com/Florin9doi) .

Fixes Bakufuu Slash! Kizna Arashi.

[\#4250](https://github.com/PCSX2/pcsx2/pull/4250) Core: Preserve read
only bits in the COP0 config register. By
[F0bes](https://github.com/F0bes) .

The read-only bits in question are the Instruction cache size (IC) and
the Data cache size (DC).

Before this MTC0 would freely write to the entire config register.

[\#4123](https://github.com/PCSX2/pcsx2/pull/4123) Core: Implement
proper %s handling for syscall 117 (0x75). By
[F0bes](https://github.com/F0bes) .

This makes the syscall iterate through the format string which can be
considered \"slow\" but this syscall is only going to be used for
debugging purposes.

[\#4255](https://github.com/PCSX2/pcsx2/pull/4255) Core: Added support
for little endian data for patches. By
[Tupelov](https://github.com/Tupelov) .

Allows users to use the leshort, leword, and ledouble datatypes inside
their patches. Using these datatypes ensures that values in the memory
view appear the same as the values in the patch.

This was made with easing patch development in mind as now developers
can make patches without having to reverse endianness. This is
especially useful when using programs like ghidra that displays
instructions in little endian.

------------------------------------------------------------------------

# GSdx Improvements

**[ \[Enhancement\] ]{style="color: #00ccff;"}
[\#4206](https://github.com/PCSX2/pcsx2/pull/4206) GSdx-hw: Implement
per pixel alpha blending (PABE). By
[lightningterror](https://github.com/lightningterror) and
[tadanokojin](https://github.com/tadanokojin) .**

Improves shadow/lighting effects on certain games, both HW renderers
support the feature.

So far we have a few games that see an improvement:

Fixes Strawberry Shortcake character shadow/lighting.

Fixes Cartoon Network Racing shadow/lighting.

And for those that enjoy some image comparisons:

Cartoon Network Racing: Before -\> After

[![artoon Network Racing
Before](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/cnr_before_s.png){width="300"
height="224"}](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/cnr_before.png)
[![Cartoon Network Racing
after](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/cnr_after_s.png){width="300"
height="224"}](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/cnr_after.png)

Strawberry Shortcake: Before -\> After

[![Strawberry Shortcake
Before](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/ss_before_s.png){width="300"
height="224"}](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/ss_before.png)
[![Strawberry Shortcake
after](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/ss_after_s.png){width="300"
height="224"}](https://pcsx2.net/images/stories/frontend/progress_reports/q1-2021/ss_after.png)

**[ \[Enhancement\] ]{style="color: #00ccff;"} Misc GSdx improvements:**

[\#3973](https://github.com/PCSX2/pcsx2/pull/3973) GSdx-gui: Some GUI
changes. By [RedDevilus](https://github.com/RedDevilus) .

Changed some options:

Large framebuffer renamed into conservative framebuffer.

Dithering context menu re-ordered.

8-bit textures renamed into GPU Palette Conversion.

[dabfff8](https://github.com/PCSX2/pcsx2/commit/dabfff8b3562f1424526812681bb2beafb560aa0)
GSdx-hw: Get rid of some extra branches/conditions in DATE selection. By
[lightningterror](https://github.com/lightningterror) .

[\#4182](https://github.com/PCSX2/pcsx2/pull/4182) GSdx-gui: Fix
alignment of font. By [RedDevilus](https://github.com/RedDevilus) .

Should fix invisible characters.

[\#4188](https://github.com/PCSX2/pcsx2/pull/4188)
[\#4261](https://github.com/PCSX2/pcsx2/pull/4261)
[\#4320](https://github.com/PCSX2/pcsx2/pull/4320) GSdx: Switch to
unicode. By [GovanifY](https://github.com/GovanifY) ,
[F0bes](https://github.com/F0bes) and
[turtleli](https://github.com/turtleli) .

This brings GSdx one step closer to be merged with the core.

[\#4270](https://github.com/PCSX2/pcsx2/pull/4270) GSdx-d3d11: Cleanup
gsdevice11.cpp warnings reported on codacy. By
[lightningterror](https://github.com/lightningterror) .

[\#4131](https://github.com/PCSX2/pcsx2/pull/4131)
[\#4288](https://github.com/PCSX2/pcsx2/pull/4288) GSdx: Use constexpr
to initialize AVX vectors without AVX instructions .By
[TellowKrinkle](https://github.com/tellowkrinkle) .

List of removed CRC hacks:

[\#4082](https://github.com/PCSX2/pcsx2/pull/4082) GSdx-hw: Remove
Unofficial CRCs. By [tadanokojin](https://github.com/tadanokojin) .

[f6e12f8](https://github.com/PCSX2/pcsx2/commit/f6e12f82de7fbdb15ccbf574eb8552fb54c47ac2)
Gsdx-hw: Remove Bully crc hack, it broke a bunch of effects. By
[lightningterror](https://github.com/lightningterror) .

------------------------------------------------------------------------

# TAS (Tool Assisted Speedrun) Utility Improvements

[\#4019](https://github.com/PCSX2/pcsx2/pull/4019) Recording: Reorganize
and realign InputRecordingControls. By
[sonicfind](https://github.com/sonicfind) .

[\#4060](https://github.com/PCSX2/pcsx2/pull/4060) Recording: GUI
Improvements around savestate-based input recordings. By
[sonicfind](https://github.com/sonicfind) .

------------------------------------------------------------------------

# IPC (Interprocess Communication) Improvements

[\#4262](https://github.com/PCSX2/pcsx2/pull/4262) IPC: Socket
re-usability. By [GovanifY](https://github.com/GovanifY) .

This avoids port overfills on windows, while increasing performance
substantially on platforms that do port overfills.

[\#4267](https://github.com/PCSX2/pcsx2/pull/4267) IPC: Add a slot
system. By [GovanifY](https://github.com/GovanifY) .

This allows multiple emulator sessions to run at the same time and
windows user to configure their used port to their preferred one.

[\#4272](https://github.com/PCSX2/pcsx2/pull/4272) IPC: Fix type
polymorphism & checkbox. By [GovanifY](https://github.com/GovanifY) .

Some versions of wxWidgets are more sensitive than others on dynamic
casting, so instead I used a C style cast to prevent any crash.

------------------------------------------------------------------------

# GameDB Improvements

[4b71dd3](https://github.com/PCSX2/pcsx2/commit/4b71dd3c08e0f98afe9965a6c38b4262053d8c6b)
GameDB: Remove patches for Quake 3 videos, no longer required. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

[7512c01](https://github.com/PCSX2/pcsx2/commit/7512c01ca6ff861a1dc70066345ccbcb31445061)
GameDB: Removed no longer required FMV skip patches. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

List of removed patches for games include:

BDFL Manager 2005 (EU)

F1 Racing Championship (Japan and EU regions)

Paris-Dakar Rally (EU)

[\#4259](https://github.com/PCSX2/pcsx2/pull/4259) GameDB: Add improved
Xenosaga save crash prevention patch. By
[RedPanda4552](https://github.com/RedPanda4552) .

Updated patch rewrites a chunk of game code to decrement JPEG quality,
rather than just immediately floor it. Allows thumbnails to still look
kind of okay.

[\#4187](https://github.com/PCSX2/pcsx2/pull/4187)
[\#4249](https://github.com/PCSX2/pcsx2/pull/4249) GameDB: Add patches
for KOF series. By [kozarovv](https://github.com/kozarovv) .

Fixes depth precision, game fills upper 16bits of depth with 0xFFFF.
This results in a really high 32 bit value which is then converted to
float because both HW and SW renderers lack double precision the lower
16 bits of the initial 32 bit value lose precision.

------------------------------------------------------------------------

# Misc Improvements

[\#3999](https://github.com/PCSX2/pcsx2/pull/3999) Add GHC Filesystem.By
[kenshen112](https://github.com/kenshen112) .

This adds GHC filesystem to pcsx2 common utilities.

[\#4073](https://github.com/PCSX2/pcsx2/pull/4073) 3rdparty: PortAudio:
Upgrade PortAudio to latest master. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

[\#4277](https://github.com/PCSX2/pcsx2/pull/4277) 3rdparty: Update
Libsamplerate to 0.2.1. By
[refractionpcsx2](https://github.com/refractionpcsx2) .

[\#3991](https://github.com/PCSX2/pcsx2/pull/3991) GUI: Keyboard
Shortcuts Strings. By [RedDevilus](https://github.com/RedDevilus) .

Based on https://wiki.pcsx2.net/Hotkeys.

[\#4216](https://github.com/PCSX2/pcsx2/pull/4216) Misc: Fix compilation
in path with spaces. By [laenion](https://github.com/laenion) .

[\#4283](https://github.com/PCSX2/pcsx2/pull/4283) Misc: Fix various
DebugTools Codacy complaints. By [F0bes](https://github.com/F0bes) .

[\#4010](https://github.com/PCSX2/pcsx2/pull/4010) Misc: Fix paths on
macOS. By [TellowKrinkle](https://github.com/tellowkrinkle) .

MacOS was using linux paths rather than wx\'s macOS-specific subclass,
which doesn\'t match how the app is installed in macOS (all paths should
be relative to the executable).

Also adds steps to copy missing resources into the app bundle.

[\#4243](https://github.com/PCSX2/pcsx2/pull/4243) Misc: Purge GSNull
plugin entirely. By [rtissera](https://github.com/rtissera) .

The plugin is obsolete, GSdx already provides Null(no display
functionality).

[\#4201](https://github.com/PCSX2/pcsx2/pull/4201) GUI: Prevent Vsync
setting from being wiped on preset changes. By
[RedPanda4552](https://github.com/RedPanda4552) .

Reapplies the currently applied vsync mode when changing preset options.

[\#4230](https://github.com/PCSX2/pcsx2/pull/4230) Common: Remove unused
code. By [MrCK1](https://github.com/MrCK1) .

[\#4244](https://github.com/PCSX2/pcsx2/pull/4244) GUI: Avoid presets
from resetting VsyncQueueSize. By [KrossX](https://github.com/KrossX) .

The VsyncQueueSize setting is currently affected by presets, would
revert to default on start as well. Since the setting is not grayed out,
this change makes it be unaffected.

[\#3556](https://github.com/PCSX2/pcsx2/pull/3556) GUI: If available,
enable menu option to load backup savestate when a game is first
launched. By [xTVaser](https://github.com/xTVaser) .

[\#4306](https://github.com/PCSX2/pcsx2/pull/4306) GUI: Visually
indicate the current savestate slot in the load/save menu. By
[xTVaser](https://github.com/xTVaser) .

[\#4036](https://github.com/PCSX2/pcsx2/pull/4036) Capture:
Optimizations with file names, SPU2 recording, and capture menu gui.By
[sonicfind](https://github.com/sonicfind) .

Addresses some oversights involving transferring a file name between the
GS & SPU2 recording setups.

Adds a new audio toggle setting that allows a user to control whether a
WAV file should be generated alongside a video recording. In doing this,
behavior for when SPU2 recording fails to be setup becomes more defined
and consistent.

Additionally, F12 will now route to sMainFrame if GUI is active as to
keep the capture menu GUI accurate to the current state.

------------------------------------------------------------------------

And that\'s all from us, see you next time in our 2021 Q2 Report!
:::
:::
