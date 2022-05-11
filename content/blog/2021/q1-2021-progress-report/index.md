---
title: "Q1 2021 Progress Report"
date: 2021-04-09T00:00:00
summary: "Once again we are back with another progress report bringing you amazing progress."
draft: false
tags:
  - "progress-report"
mainAuthor: lightningterror
aliases:
  - "/298-q1-2021-progress-report"
  - "/298-q1-2021-progress-report.html"
  - "/298-q1-2021-progress-report.htm"
toc: true
---

## Core Improvements


{{< progress/github-link prNums="4115" title="PAD/Counters: MakeVSync Queue adjustable in the UI. Extra Pad update." authors="refractionpcsx2" >}}

New UI option (ini option has been there a while) so users can choose between a little bit extra performance or reduced input lag.

Also added the PAD Update to the VSync call in Counters as it seemed to reduce input lag marginally.

{{< progress/github-link prNums="4066" title="IPU: Return contentsof the bottom of the FIFO in CMD except FDEC/VDEC." authors="refractionpcsx2" >}}

This is based on the work by [@PS1-Rockin](https://github.com/PSI-Rockin) on Dobiestation but modified based on the theory that it always returns the first 32bits of the FIFO unless an FDEC/VDEC command is executed, however FDEC is basically doing this anyway, but VDEC returns decoded information.

Fixed videos for probably all broken EA games, but namely:
- F1 2001
- F1 2002
- Neo Contra
- Shox
- Theme Park Rollercoaster/World

{{< progress/github-link prNums="4225" title="IPU: Fill Input FIFOon command end ready for next command." authors="refractionpcsx2" >}}

Dance Summit 2001: So basically what the game does is it does some IPU
stuff, but the DMA is left with 1 QWC left to be read on the DMA, on the
hardware this will normally be flushed in to the FIFO. The game then
does a FIFO reset (To get rid of it) then starts another DMA. The
problem we have is because we still had the DMA pending for 1 QWC, it
ignored the new DMA start and the IPU would hang up waiting for data to
be fed in. This PR resolves that problem.

Test Drive: Also added DMA 4 (To IPU) being flushed if BCLR is called
without first stopping the DMA.

Set the Picture type on VDEC to I-Picture if set to 0 in the IPU\_CTRL,
this fixes a bunch of Eyetoy games which incorrectly set this register.

- Fixes EyeToy Play(1-3).
- Fixes Bakufuu Slash!! Kizna Arashi.
- Fixes Kaiketsu Zorro Mezase! SIF0 and SIF1 stall control.
- Fixes Test Drive: IPU hang in middle of Event 5.

### DEV9

{{< progress/github-link prNums="4062" title="Support 16bit reads/writes to SPD\_R\_PIO\_DATA & SPD\_R\_PIO\_DIR" authors="TheLastRar" >}}

This improves [#3192](https://github.com/PCSX2/pcsx2/issues/3192), the online beta now sends a DHCP Discover packet, although it appears to be invalid.

{{< progress/github-link prNums="4059" title="Generate unique MAC for TAP" authors="TheLastRar" >}}

An unique MAC is needed for full compatibility with XLink Kai.

Uses a method similar to what was done for pcap.

{{< progress/github-link prNums="3932" title="Add HDDemulation" authors="TheLastRar" >}}

{{< progress/github-link prNums="4214" title="Merge _DEV9*() functions into *Net(), and check ethEnable before calling InitNet()" authors="TheLastRar" >}}

Previously, the ethEnable config value was not checked before starting network RX net thread.

{{< progress/github-link prNums="4219" title="Fix crash on Linux when we fail to open the adapter" authors="TheLastRar" >}}

{{< progress/github-link prNums="4149" title="Re-add pcap(both bridged and switched) on windows" authors="TheLastRar" >}}

### CDVD

{{< progress/github-link prNums="4314,4045" title="Add CHD compression format support" authors="rtissera,SleepyMan,siddhartha77" >}}

{{< progress/github-link prNums="4146" title="Increase buffer for DVD_LAYER_DESCRIPTOR." authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4236" title="Implement mechacon command 0xEF" authors="F0bes" >}}

### microVU

{{< progress/github-link shas="ee07f860fc1dd7e8ada6c13903bb3a592b8d4864" title="microVU: Implement Overflow checks" authors="refractionpcsx2" >}}

Fixes Superman Returns.

{{< progress/github-link shas="413fd004da0ba46786b878683f6b177ad1bdcde7" title="microVU: Fix jump caching when using doJumpAsSameProgram" authors="refractionpcsx2" >}}

{{< progress/github-link shas="c9bc6eac69a3ceea6dffe6cec07b17caa1e2fc6e" title="microVU: Fix P flag instance on Ebit" authors="refractionpcsx2" >}}

Also small fix for flag statuses on M-Bit on Branch.

{{< progress/github-link shas="0f7044a90f62f84db4844292bb2bcc7d4cc7626b" title="microVU: Removed full flag optimisations" authors="refractionpcsx2" >}}

They were unused, broken and cluttering up the code.

{{< progress/github-link prNums="4198" title="Fix Esinopcode" authors="kozarovv" >}}

Someone accidentally used bad function to analyze ESIN opcode on microVU, that generated bad values due to wrong register field being used.

Fixes X2 - Wolverine's Revenge.

{{< progress/github-link shas="f9d96f55a538ce373f1662a5554d8052173940b1" title="microVU: move the overflow flags to the correct position" authors="refractionpcsx2" >}}

### VIF

{{< progress/github-link shas="ddffd9acd671ee3165061980554d4a36c86eeb5e" title="VIF: Fix MPG VU Address wrapping" authors="refractionpcsx2" >}}

Fixes Boogie.

{{< progress/github-link shas="89991594de89b0068efd906286b5a39cc7c8186f" title="VIF: Clean up some old (incorrect) code" authors="refractionpcsx2" >}}

### SPU2

{{< progress/github-link prNums="4074" title="SPU2: Attempt 96khz sample rate if 48khz fails (WASAPI)." authors="refractionpcsx2" >}}

WASAPI is terrible and doesn't support sample rate conversion in shared
(normal) mode and requires exclusive mode.

This PR basically attempts to double the PS2 sample rate of 48khz to
96khz as this tends to be the other windows default. If this fails it
will put a log message to say you need to use Exclusive mode.

Note: When using PS1 game emulation you will need to use exclusive mode,
nothing I can do about this (44.1khz doesn't divide nicely from 48khz or
96khz).

{{< progress/github-link prNums="4057,4085" shas="f1e44bfd47e3761388ebb5cc8ca4db78bb24916c" title="SPU2: Improve DMA/IRQ timing" authors="refractionpcsx2" >}}

- Fixes The Simple 2000 Series Vol 51 - The Senkan (AKA The Battleship) which was not booting with anything but ZeroSPU2
- Fixes The Simpsons, problem was due to an ADMA refill bug.

{{< progress/github-link shas="f5d89062e02933b5dc4e090ff7c7f4dc5368ef26" title="SPU2: Update voices before DMA reads, reset OutPos on reset" authors="refractionpcsx2" >}}

Improves the booting reliability of GTA VC, especially on consecutive boots without closing the emulator.

{{< progress/github-link prNums="4134" title="Switch to a more accurate noise algorithm" authors="Ziemas" >}}

This algorithm comes from PCSX-R and is an implementation of Dr. Hell's research.

The previous implementation was a simple LFSR and did not use the
provided noise clock from the ATTR register.

{{< progress/github-link prNums="4171" title="SPU2: Improve ADMA behaviour/timing." authors="refractionpcsx2" >}}

- Hopefully improves the crackling in burnout 3.
- Fixes music looping in Ratatouille.
- Fixes Vexx clicking sound (Partial ADMA transfers).
- Fixes the Dolby Pro Logic video missing sound in Primal (Partial ADMA transfers).
- Fixes Splinter Cell panning audio problem and high pitched noises in cut-scenes.
- Fixes Myst 3 panning audio problem.
- Fixes Dynasty Warriors 5 stuttering videos when Dolby is enabled.

{{< progress/github-link shas="e0394921e98136547176f9a224a9bb9084fbda47" title="SPU2: Tighten AutoDMA IRQ timing" authors="refractionpcsx2" >}}

Fixes games which monitor the MADR while transferring.

Fixes Tom & Jerry in War of the Whiskers jumpy music.

{{< progress/github-link prNums="4210" title="Adjust interpolation implementations" authors="Ziemas" >}}

These seems to be have been adjusted to match the output of catmull-rom
which is really the one in the wrong by being twice as loud.

As a result of the interpolated output being at a reasonable level we
can use ApplyVolume to apply the ADSR volume.

{{< progress/github-link prNums="4203" title="SPU2: Make sure cache hits match previous block decoded samples." authors="refractionpcsx2" >}}

Caching blocks of ADPCM is a bit sketchy because the previous samples
(which it uses to generate the new ones) can change depending on if it's
the start of the voice on or if it has looped around, so you can end up
with blips and glitches in the sample stream, this should avoid that
problem whilst not making the cache completely unusable.

Should get rid of clicking and popping noises in loops samples.

Fixes Sphinx and the Cursed Mummy sound distortion.

Also fixes remaining blips in Vexx.

{{< progress/github-link prNums="4195" title="Add Gaussian interpolation" authors="Ziemas" >}}

This implements the actual SPU interpolation as documented by nocash.

{{< progress/github-link prNums="4226" title="Resample reverb input/output" authors="Ziemas" >}}

The reverb runs at half the sample rate of the rest of the SPU so a
change of sample rate is required. The way this is currently done is by
decimating when downsampling and duplicating samples when upsampling
without doing any filtering.

This adds proper filtering to this process, the filter coefficients are
from Mednafen but we think they were originally found by Neill Corlett.

{{< progress/github-link shas="f42befadf10493a8ccb5a021de416cc1efeb5e03" title="SPU2: Try to recover DMA pointer after savestate load" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4186" title="SPU2: Ignore LSAL/H Writes after key on if voice sets loop point." authors="refractionpcsx2" >}}

Fixes behaviour with loop address writes within 4T's of a voice keying
on which is what the old Delay Cycles tried to address, if the voice
sets its own loop point the write from hardware is ignored.

Fixes Mafia music loops.

{{< progress/github-link shas="ce8047bd8cb8d036ed3ba4e9cd2f85743f018ccd" title="Reset IRQ Status when swapping game in case it got set previously" authors="refractionpcsx2" >}}

### Memory Card

{{< progress/github-link prNums="4113" title="Memorycards: Fix out of bounds array access in folder memcards." authors="Ziemas" >}}

Don't keep the DataClusterInUse bit when accessing the next cluster.

With this folder memcards work on 64bit.

{{< progress/github-link prNums="2995" title="Memorycards: Add support for OpenPS2Loader VirtualMemoryCards." authors="KrossX" >}}

Adds some basic support to OPL VMC files (.bin) that use 512 bytes
pages.

Normal pages are 528 bytes long, those extra 16 bytes contain 12 bytes
of ECC data.

### Debuggers

{{< progress/github-link prNums="4252" title="Debugger: Add \"Go to address\" for both disasm and memory view context menus." authors="F0bes" >}}

{{< progress/github-link prNums="4289" title="Debugger: Require emulator start before enabling Break/Run button." authors="F0bes" >}}

{{< progress/github-link prNums="4326,4287" title="Misc: Support more BIOSes for the Debugger Thread View." authors="F0bes" >}}

{{< progress/github-link prNums="4271" title="GS/Core: Implement the new generation of GS Debugger." authors="GovanifY" >}}

This is a full in-core reimplementation of GSDumpGUI. It will be used
for GS Debugging once GSdx is merged in to the core.

One step closer in to merging GSdx in to the core.

### Misc core

{{< progress/github-link prNums="3011" title="Implements IOPbreakpoints" authors="monster860" >}}

{{< progress/github-link prNums="4234" title="Execute breakpoints for the interpreter" authors="F0bes" >}}

{{< progress/github-link prNums="4205" title="Don't Destroy() modals" authors="TellowKrinkle" >}}

On macOS it prevents the parent window from regaining focus. By

{{< progress/github-link prNums="4223" title="PGIF: PS1DRV handlesbit 28 of GPU Status register, not PGIF." authors="Nobbs66" >}}

Fixes several PSX games:

- Castlevania: Symphony of the Night
- Twisted Metal
- Pink Panther

{{< progress/github-link shas="c695a7eabbac4c3a0138b6eeb0e9005ff708f985" title="USB: usb-mic: Send 1ms worth of samples for 48kHz and 8kHz sample rates" authors="jackun" >}}

{{< progress/github-link prNums="4310" title="USB: Improve Force Feedback test so it doesn't block UI." authors="CookiePLMonster" >}}

This modifies DirectInput USB Force Feedback test not to block the UI.
Instead of performing the test synchronously on the UI thread, a timer
gets created which advances the test every half a second.

{{< progress/github-link prNums="4232" title="Eyetoy mirroring" authors="Florin9doi" >}}

Fixes Bakufuu Slash! Kizna Arashi.

{{< progress/github-link prNums="4250" title="Core: Preserve read only bits in the COP0 config register." authors="F0bes" >}}

The read-only bits in question are the Instruction cache size (IC) and
the Data cache size (DC).

Before this MTC0 would freely write to the entire config register.

{{< progress/github-link prNums="4123" title="Core: Implement proper %s handling for syscall 117 (0x75)." authors="F0bes" >}}

This makes the syscall iterate through the format string which can be
considered "slow" but this syscall is only going to be used for
debugging purposes.

{{< progress/github-link prNums="4255" title="Core: Added support for little endian data for patches." authors="Tupelov" >}}

Allows users to use the leshort, leword, and ledouble datatypes inside
their patches. Using these datatypes ensures that values in the memory
view appear the same as the values in the patch.

This was made with easing patch development in mind as now developers
can make patches without having to reverse endianness. This is
especially useful when using programs like ghidra that displays
instructions in little endian.

## GSdx Improvements

{{< progress/github-link prNums="4206" title="GSdx-hw: Implement per pixel alpha blending (PABE)." authors="lightningterror,tadanokojin" >}}

Improves shadow/lighting effects on certain games, both HW renderers
support the feature.

So far we have a few games that see an improvement:

Fixes Strawberry Shortcake character shadow/lighting.

Fixes Cartoon Network Racing shadow/lighting.

And for those that enjoy some image comparisons:

Cartoon Network Racing: Before -&gt; After

{{< img-cmp-slider before="./img/cnr_before_s.webp" after="./img/cnr_after_s.webp">}}

Strawberry Shortcake: Before -&gt; After

{{< img-cmp-slider before="./img/ss_before_s.webp" after="./img/ss_after_s.webp">}}

### Misc GSdx

{{< progress/github-link prNums="3973" title="Some GUI changes" authors="RedDevilus" >}}

Changed some options:

- Large framebuffer renamed into conservative framebuffer.
- Dithering context menu re-ordered.
- 8-bit textures renamed into GPU Palette Conversion.

{{< progress/github-link shas="dabfff8b3562f1424526812681bb2beafb560aa0" title="GSdx-hw: Get rid of some extra branches/conditions in DATE selection" authors="lightningterror" >}}

{{< progress/github-link prNums="4182" title="Fix alignment of font" authors="RedDevilus" >}}

Should fix invisible characters.

{{< progress/github-link prNums="4188,4261,4320" title="GSdx: Switch to unicode" authors="GovanifY,F0bes,turtleli" >}}

This brings GSdx one step closer to be merged with the core.

{{< progress/github-link prNums="4270" title="GSdx-d3d11: Cleanup gsdevice11.cpp warnings reported on codacy." authors="lightningterror" >}}

{{< progress/github-link prNums="4131,4288" title="Use constexpr to initialize AVX vectors without AVX instructions " authors="TellowKrinkle" >}}

List of removed CRC hacks:

- {{< progress/github-link prNums="4082" title="Remove Unofficial CRCs" authors="tadanokojin" >}}
- {{< progress/github-link shas="f6e12f82de7fbdb15ccbf574eb8552fb54c47ac2" title="Gsdx-hw: Remove Bully crc hack, it broke a bunch of effects" authors="lightningterror" >}}

## TAS (Tool Assisted Speedrun) Utility Improvements

{{< progress/github-link prNums="4019" title="Recording: Reorganize and realign InputRecordingControls." authors="sonicfind" >}}

{{< progress/github-link prNums="4060" title="Recording: GUI Improvements around savestate-based input recordings." authors="sonicfind" >}}

## IPC (Interprocess Communication) Improvements

{{< progress/github-link prNums="4262" title="Socket re-usability" authors="GovanifY" >}}

This avoids port overfills on windows, while increasing performance
substantially on platforms that do port overfills.

{{< progress/github-link prNums="4267" title="Add a slot system" authors="GovanifY" >}}

This allows multiple emulator sessions to run at the same time and
windows user to configure their used port to their preferred one.

{{< progress/github-link prNums="4272" title="Fix type polymorphism & checkbox" authors="GovanifY" >}}

Some versions of wxWidgets are more sensitive than others on dynamic
casting, so instead I used a C style cast to prevent any crash.

## GameDB Improvements

{{< progress/github-link shas="4b71dd3c08e0f98afe9965a6c38b4262053d8c6b" title="GameDB: Remove patches for Quake 3 videos, no longer required" authors="refractionpcsx2" >}}

{{< progress/github-link shas="7512c01ca6ff861a1dc70066345ccbcb31445061" title="GameDB: Removed no longer required FMV skip patches" authors="refractionpcsx2" >}}

List of removed patches for games include:

- BDFL Manager 2005 (EU)
- F1 Racing Championship (Japan and EU regions)
- Paris-Dakar Rally (EU)

{{< progress/github-link prNums="4259" title="GameDB: Add improved Xenosaga save crash prevention patch." authors="RedPanda4552" >}}

Updated patch rewrites a chunk of game code to decrement JPEG quality,
rather than just immediately floor it. Allows thumbnails to still look
kind of okay.

{{< progress/github-link prNums="4187,4249" title="Add patchesfor KOF series" authors="kozarovv" >}}

Fixes depth precision, game fills upper 16bits of depth with 0xFFFF.
This results in a really high 32 bit value which is then converted to
float because both HW and SW renderers lack double precision the lower
16 bits of the initial 32 bit value lose precision.

## Misc Improvements

{{< progress/github-link prNums="3999" title="Add GHC Filesystem" authors="kenshen112" >}}

This adds GHC filesystem to pcsx2 common utilities.

{{< progress/github-link prNums="4073" title="3rdparty: PortAudio: Upgrade PortAudio to latest master." authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4277" title="3rdparty: Update Libsamplerate to 0.2.1." authors="refractionpcsx2" >}}

{{< progress/github-link prNums="3991" title="Keyboard Shortcuts Strings" authors="RedDevilus" >}}

Based on https://wiki.pcsx2.net/Hotkeys.

{{< progress/github-link prNums="4216" title="Fix compilation in path with spaces" authors="laenion" >}}

{{< progress/github-link prNums="4283" title="Fix various Debug Tools Codacy complaints" authors="F0bes" >}}

{{< progress/github-link prNums="4010" title="Fix paths on macOS" authors="TellowKrinkle" >}}

MacOS was using linux paths rather than wx's macOS-specific subclass,
which doesn't match how the app is installed in macOS (all paths should
be relative to the executable).

Also adds steps to copy missing resources into the app bundle.

{{< progress/github-link prNums="4243" title="Purge GSNull plugin entirely" authors="rtissera" >}}

The plugin is obsolete, GSdx already provides Null(no display functionality).

{{< progress/github-link prNums="4201" title="GUI: Prevent Vsync setting from being wiped on preset changes." authors="RedPanda4552" >}}

Reapplies the currently applied vsync mode when changing preset options.

{{< progress/github-link prNums="4230" title="Remove unused code" authors="MrCK1" >}}

{{< progress/github-link prNums="4244" title="Avoid presets from resetting VsyncQueueSize" authors="KrossX" >}}

The VsyncQueueSize setting is currently affected by presets, would
revert to default on start as well. Since the setting is not grayed out,
this change makes it be unaffected.

{{< progress/github-link prNums="3556" title="GUI: If available, enable menu option to load backup savestate when a game is first launched" authors="xTVaser" >}}

{{< progress/github-link prNums="4306" title="GUI: Visually indicate the current savestate slot in the load/save menu" authors="xTVaser" >}}

{{< progress/github-link prNums="4036" title="Capture: Optimizations with file names, SPU2 recording, and capture menu gui" authors="sonicfind" >}}

Addresses some oversights involving transferring a file name between the
GS & SPU2 recording setups.

Adds a new audio toggle setting that allows a user to control whether a
WAV file should be generated alongside a video recording. In doing this,
behavior for when SPU2 recording fails to be setup becomes more defined
and consistent.

Additionally, F12 will now route to sMainFrame if GUI is active as to
keep the capture menu GUI accurate to the current state.

## Conclusion

And that's all from us, see you next time in our 2021 Q2 Report!

## Metadata

2021 Q1:  
(dev818 to dev1163) (2020-01-01 - 2020-03-31)