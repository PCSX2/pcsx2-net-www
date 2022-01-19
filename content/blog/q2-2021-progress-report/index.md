---
title: "Q2 2021 Progress Report"
date: 2021-07-05T00:00:00
draft: false
summary: ""
mainAuthor: "lightningterror"
secondaryAuthors:
  - "bositman"
tags:
  - "progress-report"
aliases:
  - "/299-q2-2021-progress-report"
toc: true
---

## Core Improvements

### DEV9

{{< progress/pull-request prNum="4381" title="Do not applteswapping to TX/RX FIFO writes/reads" author="TheLastRar" >}}

- Remove thte swapping done to TX/RX FIFO writes/reads performed via registers.
- Fixes Twisted Metal: Black Online Public Beta v. 1.0 unable to initialize network adapter.

{{< progress/pull-request prNum="4364" title="Add ATA Idle Immediate (E1) stub" author="macmenot" >}}

- Fixes HDD support for Street Fighter Alpha Anthology.

{{< progress/pull-request prNum="4403" title="Consistently prefix all console output with DEV9" author="macmenot" >}}{{< progress/pull-request prNum="4429" title="Update ATA code for wchar GHC" author="TheLastRar" >}}

{{< progress/pull-request prNum="4496" title="PCAP, check size of read packet" author="TheLastRar" >}}

- In pcap, check size of read packet. If the size exceeds the buffer we are using, drop the packet.

{{< progress/pull-request prNum="4448" title="Always use binary mode for HDD file" author="TheLastRar" >}}

- Opening the file in binary mode is the intended behaviour (and was done in the most common situation),

{{< progress/pull-request prNum="4449" title="Fix potential out of bounds access when manual DNS1 & automatic DNS2 are used together" author="TheLastRar" >}}

- If DNS1 was manually specified, but DNS2 set to be automatically assigned, an offone error could result in an out of bounds access to an array of adapter DNS addresses.

{{< progress/pull-request prNum="4442" title="Increase min HDD size to 40GiB" author="TheLastRar" >}}

- Most games expect a HDD of 40GiB in size, and may fail to install as a result (and display a confusing error message).

{{< progress/pull-request prNum="4304" title="Internal DHCP support" author="TheLastRar" >}}

- Adds an internal DHCP similer to what CLR\_DEV9 offers for pcap & tap.

{{< progress/pull-request prNum="4433" title="Correctly populate DNS2 field with DNS2 IP" author="TheLastRar" >}}

- Correctly populate DNS2 field with DNS2 IP in the DHCP section of the network ui.

{{< progress/pull-request prNum="4435" title="Sleep instead of yield in RxThread" author="TheLastRar" >}}

- Yield might not leave the thread asleep long enough to prevent it from causing excessive CPU load.
- This also brings PCSX2 inline with CLR\_DEV9 (which also sleeps for 1ms).

### Memory Cards

{{< progress/pull-request prNum="3941" title="Folder memcards: Add an index file to track order of files" author="CookiePLMonster" >}}

> Adds an index file for folder memory cards in order to track timestamps
and order of files in the FAT partition properly. This normally
shouldn't matter, but there are at least a few games (ie. GTA games)
which rely on the order of files on the memory card. Previously, folder
memcards would not care about the order and populate the partition in
whatever order the host filesystem provided the files (so, in the case
of NTFS partitions, alphabetically). In reality, FAT partitions don't
specify the order of files, which means in practice they are sorte
the order of creation.

- Fixes saving in GTA games with folder memory cards.

### microVU

{{< progress/commit sha="6f7890b" title="Fix mistake when setting Status Flag bits for Signed/Zero" author="refractionpcsx2" >}}{{< progress/pull-request prNum="3825" title="Change default of latency slider" author="RedDevilus" >}}

### GIF

{{< progress/commit sha="b60765e" title="Remove MTVU spam that isn't required" author="refractionpcsx2" >}}

Solves stuttering in MTVU mode in some games, and gets rid of some
annoying asserts which mean nothing.

### SPU2

{{< progress/pull-request prNum="3825" title="Change default of latency slider" author="RedDevilus" >}}

{{< progress/commit sha="17519c2" title="Fix hi def audio streaming" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4474" title="Remove cycleptr, grab current cycles directly" author="Ziemas" >}}

- This just changes the SPU2 to get the current IOP cycle directly instead
of through a pointer. The non-pointer path seems to have been given up
on anyway and there seems to be little reason for hiding it behind a
pointer.
- This removes the path where SPU2 runs off the provided cycle argument to
SPU2Async, but that was unused anyway.

{{< progress/pull-request prNum="4437" title="Make SPU use theDMA registers from iopHw." author="Ziemas" >}}

The SPU was managing its own DMA Addresses, this makes it use the iopHw
functionality for this instead.

### PAD

{{< progress/pull-request prNum="4331" title="Just enablepressure on CMD 0x4F" author="KrossX" >}}

Fixes Warriors of Might and Magic gamepad not functioning properly.

{{< progress/pull-request prNum="4466" title="Fix gamepadchoice not affecting rumble test on Linux" author="Lahvuun" >}}

This change causes the currently selected gamepad to rumble instead of
the first one.

### Eyetoy

{{< progress/pull-request prNum="4415" title="Motion buttonsupport." author="Florin9doi" >}}

### Debuggers

{{< progress/pull-request prNum="4345" title="Bios threadview support." author="F0bes" >}}

### Misc core

{{< progress/pull-request prNum="4399" title="Core / VU: Disable MTVU when VU1 Interpreter is selected." author="F0bes" >}}

{{< progress/pull-request prNum="3860" title="Remove FPUCompare Hack" author="kozarovv" >}}

The hack is no longer needed as full Clamping mode can be used instead.

{{< progress/pull-request prNum="4461" title="DifferentiateImpossible block clearing message from IOP & EE" author="F0bes" >}}

Prefix the "Impossible block clearing failure" with "\[IOP\]" or
"\[EE\]" depending on the recompiler.

{{< progress/pull-request prNum="4425" title="Fix Emulated PSXGPU Version." author="Nobbs66" >}}

Previously it was thought that the PS2 would emulate the v2 GPU, but
hardware tests show that it emulates the V0 GPU.

# TODO - allow for multiple authors
{{< progress/pull-request prNum="4460" title="Make DMA's instant during the BIOS" author="refractionpcsx2" >}}
[tadanokojin](https://github.com/tadanokojin) , and
<a href="https://github.com/PSI-Rockin" class="user-mention">PSI-Rockin</a>
.

> This hackfixes the BIOS to avoid a Data Cache bug causeda DMA buffer
being overwritten during a transfer without waiting, which messes up the
fonts in the BIOS. Fixing this correctly would require implementing the
Data Cache, which is something which would make the emulator basically
unusable, so this is a reasonable solution, it is only enabled during
the BIOS screen.

- Fixes certain bios revisions rendering text incorrectly.

{{< progress/pull-request prNum="4498" title="MoverecConstBuf memory near recompiler memory" author="TellowKrinkle" >}}

- Fixes an issue where recConstBuf was too far away from the main recompiler to LEA in 64-bit builds.

{{< progress/pull-request prNum="4482" title="Fix disc drivepath issues on Windows." author="turtleli" >}}

-   Fixes <span class="reference">
    <a href="https://github.com/PCSX2/pcsx2/issues/3910" class="issue-link js-issue-link">CDVD Regression: Booting a physical disc inserted after opening PCSX2 doesn't work. <span class="issue-shorthand"> #3910 </span></a>
    </span> (Regression only affects Windows).
-   Fixes an issue where the drive choice is cleared if there is no disc
    in the selected drive when PCSX2 is first opened (Should only affect
    Windows, but non-Windows only code is touched too).

---

## GSdx Improvements

### Misc GSdx

{{< progress/pull-request prNum="4350" title="Removepartial and full crc hack levels on release builds" author="lightningterror" >}}

- Normal users shouldn't really need to choose partial or full since automatic already does that.

{{< progress/pull-request prNum="4383" title="Some minorcleanups." author="lightningterror" >}}

------------------------------------------------------------------------

## TAS (Tool Assisted Speedrun) Utility Improvements

{{< progress/pull-request prNum="4382" title="Resolve crash when closing emulator involving GUI elements" author="xTVaser" >}}

{{< progress/commit sha="e50a446" title="Add close box to New Input Recording" author="lightningterror" >}}

{{< progress/pull-request prNum="4393" title="Allow configuration of the frame advance amount" author="xTVaser" >}}

- Adds a GUI configurable setting to control how many frames the frame-advance feature should advance.

{{< progress/pull-request prNum="4392" title="Add warning when creating a save-state recording" author="xTVaser" >}}

- Adds a brief warning explaining why you may want to avoid save-state recordings, and what would have to be done if a bad state is achieved.

------------------------------------------------------------------------

## IPC (Interprocess Communication) Improvements

{{< progress/pull-request prNum="4337" title="Remove possiblememory corruption due to strcat on provided pointer" author="GovanifY" >}}

------------------------------------------------------------------------

## GameDB Improvements

{{< progress/commit sha="4676592" title="Add patches for Elemental Gerad and K-1 Grand Prix 2006" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4388" title="Adds fixesfor Energy Airforce - Aim Strike , K-1 World Grand Prix 2006" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4405" title="add NearestEErounding to SSX and SSX tricky" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4462" title="Add Kickstartfor Rayman Raving Rabbids." author="icup321" >}}

{{< progress/pull-request prNum="4478" title="Adds VUclamping mode extra to Enthusia Professional Racing" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4488" title="Remove nolonger needed 'OPHFLagHack' for Naruto - Uzumaki Chronicles 2" author="Mrlinkwii" >}}

------------------------------------------------------------------------

## Misc Improvements

{{< progress/pull-request prNum="4278" title="Grayout InstantVU1 when MTVU is enabled." author="RedDevilus" >}}
.

{{< progress/pull-request prNum="4377" title="Revise consolewith newline on compile + title" author="RedDevilus" >}}

{{< progress/pull-request prNum="4416" title="Swap buttonsBrowse... and Ask when booting and default to unchecked state" author="RedDevilus" >}}

{{< progress/pull-request prNum="4378" title="change window todebug in the menu and move blockdump to the debug menu" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4431" title="update the 2smaller app icons." author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4438" title="change 'Consoleto Stdio' to 'Program Log to Stdio' in UI" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4454" title="Rename PSXreferences to PS1 distinguish between PS1 and DVR" author="Florin9doi" >}}

{{< progress/pull-request prNum="4329" title="RemoveSSE2/SSE3 support" author="GovanifY" >}}

Moving forward with our goal to clean up and modernize the code we are
removing SSE2/3 support.

{{< progress/pull-request prNum="4444" title="Save ELF lastpath when auto-running an elf" author="F0bes" >}}

{{< progress/pull-request prNum="4343" title="Enable GSdebugger on CI artifacts" author="lightningterror" >}}

Adds an CI environment variable to enable GS debugger on CI artifacts.
This can also be enabled locally to enable the GS debugger.

{{< progress/pull-request prNum="4418" title="Validate GameDBchanges in GitHub Actions." author="xTVaser" >}}

Currently, the emulator will fully validate the GameDB, which is how
we've been catching these recent mistakes. But this adds a CI check to
validate the file in a very similar manner at build time.

[\#4180](https://github.com/PCSX2/pcsx2/pull/4180) CI: Add an explicit
flag to retain debugging artifacts (.pdb, .exp, .lib, etc) in Windows
builds.[xTVaser](https://github.com/xTVaser) .

------------------------------------------------------------------------

dev 1165 and up (last add 1296)

And that's all from us, see you next time in our 2021 Q3 Report!

</div>

</div>
