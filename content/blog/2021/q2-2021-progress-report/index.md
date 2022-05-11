---
title: "Q2 2021 Progress Report"
date: 2021-07-05T00:00:00
draft: false
summary: " "
mainAuthor: "lightningterror"
secondaryAuthors:
  - "bositman"
tags:
  - "progress-report"
aliases:
  - "/299-q2-2021-progress-report"
  - "/299-q2-2021-progress-report.html"
  - "/299-q2-2021-progress-report.htm"
toc: true
---

## Core Improvements

### DEV9

{{< progress/github-link prNums="4381" title="DEV9: Do not apply byteswapping to TX/RX FIFO writes/reads" authors="TheLastRar" >}}

- Remove the byte swapping done to TX/RX FIFO writes/reads performed via registers.
- Fixes Twisted Metal: Black Online Public Beta v. 1.0 unable to initialize network adapter.

{{< progress/github-link prNums="4364" title="Add ATA Idle Immediate (E1) stub" authors="macmenot" >}}

- Fixes HDD support for Street Fighter Alpha Anthology.

{{< progress/github-link prNums="4403" title="Consistently prefix all console output with DEV9" authors="macmenot" >}}

{{< progress/github-link prNums="4429" title="Update ATA code for wchar GHC" authors="TheLastRar" >}}

{{< progress/github-link prNums="4496" title="PCAP, check size of read packet" authors="TheLastRar" >}}

- In PCAP, check size of read packet. If the size exceeds the buffer we are using, drop the packet.

{{< progress/github-link prNums="4448" title="Always use binary mode for HDD file" authors="TheLastRar" >}}

- Opening the file in binary mode is the intended behaviour (and was done in the most common situation),

{{< progress/github-link prNums="4449" title="Fix potential out of bounds access when manual DNS1 & automatic DNS2 are used together" authors="TheLastRar" >}}

- If DNS1 was manually specified, but DNS2 set to be automatically assigned, an off by one error could result in an out of bounds access to an array of adapter DNS addresses.

{{< progress/github-link prNums="4442" title="Increase min HDD size to 40GiB" authors="TheLastRar" >}}

- Most games expect a HDD of 40GiB in size, and may fail to install as a result (and display a confusing error message).

{{< progress/github-link prNums="4304" title="Internal DHCP support" authors="TheLastRar" >}}

- Adds an internal DHCP similar to what CLR\DEV9 offers for PCAP & TAP.

{{< progress/github-link prNums="4433" title="Correctly populate DNS2 field with DNS2 IP" authors="TheLastRar" >}}

- Correctly populate DNS2 field with DNS2 IP in the DHCP section of the network ui.

{{< progress/github-link prNums="4435" title="Sleep instead of yield in RxThread" authors="TheLastRar" >}}

- Yield might not leave the thread asleep long enough to prevent it from causing excessive CPU load.
- This also brings PCSX2 inline with CLR_DEV9 (which also sleeps for 1ms).

### Memory Cards

{{< progress/github-link prNums="3941" title="Folder memcards: Add an index file to track order of files" authors="CookiePLMonster" >}}

> Adds an index file for folder memory cards in order to track timestamps
and order of files in the FAT partition properly. This normally
shouldn't matter, but there are at least a few games (ie. GTA games)
which rely on the order of files on the memory card. Previously, folder
memcards would not care about the order and populate the partition in
whatever order the host filesystem provided the files (so, in the case
of NTFS partitions, alphabetically). In reality, FAT partitions don't
specify the order of files, which means in practice they are sorted to
the order of creation.

- Fixes saving in GTA games with folder memory cards.

### microVU

{{< progress/github-link shas="6f7890b709d5e3f7f5b824781e493455efc92339" title="Fix mistake when setting Status Flag bits for Signed/Zero" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="3825" title="Change default of latency slider" authors="RedDevilus" >}}

### GIF

{{< progress/github-link shas="b60765e976f6b1c45117bbdd042f8d6698c63002" title="Remove MTVU spam that isn't required" authors="refractionpcsx2" >}}

Solves stuttering in MTVU mode in some games, and gets rid of some
annoying asserts which mean nothing.

### SPU2

{{< progress/github-link prNums="3825" title="Change default of latency slider" authors="RedDevilus" >}}

{{< progress/github-link shas="17519c21b4eeefbadaad3374bd98bdd43d44f1a6" title="Fix hi def audio streaming" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4474" title="Remove cycleptr, grab current cycles directly" authors="Ziemas" >}}

- This just changes the SPU2 to get the current IOP cycle directly instead
of through a pointer. The non-pointer path seems to have been given up
on anyway and there seems to be little reason for hiding it behind a
pointer.
- This removes the path where SPU2 runs off the provided cycle argument to
SPU2Async, but that was unused anyway.

{{< progress/github-link prNums="4437" title="Make SPU use theDMA registers from iopHw." authors="Ziemas" >}}

The SPU was managing its own DMA Addresses, this makes it use the iopHw
functionality for this instead.

### PAD

{{< progress/github-link prNums="4331" title="Just enablepressure on CMD 0x4F" authors="KrossX" >}}

Fixes Warriors of Might and Magic GamePad not functioning properly.

{{< progress/github-link prNums="4466" title="Fix gamepad choice not affecting rumble test on Linux" authors="Lahvuun" >}}

This change causes the currently selected GamePad to rumble instead of
the first one.

### Eyetoy

{{< progress/github-link prNums="4415" title="Motion buttonsupport." authors="Florin9doi" >}}

### Debuggers

{{< progress/github-link prNums="4345" title="Bios threadview support." authors="F0bes" >}}

### Misc core

{{< progress/github-link prNums="4399" title="Core / VU: Disable MTVU when VU1 Interpreter is selected." authors="F0bes" >}}

{{< progress/github-link prNums="3860" title="Remove FPUCompare Hack" authors="kozarovv" >}}

The hack is no longer needed as full Clamping mode can be used instead.

{{< progress/github-link prNums="4461" title="DifferentiateImpossible block clearing message from IOP & EE" authors="F0bes" >}}

Prefix the "Impossible block clearing failure" with "\[IOP\]" or
"\[EE\]" depending on the recompiler.

{{< progress/github-link prNums="4425" title="Fix Emulated PSXGPU Version." authors="Nobbs66" >}}

Previously it was thought that the PS2 would emulate the v2 GPU, but
hardware tests show that it emulates the V0 GPU.

{{< progress/github-link prNums="4460" title="Make DMA's instant during the BIOS" authors="refractionpcsx2,tadanokojin,PSI-Rockin" >}}

> This hackfixes the BIOS to avoid a Data Cache bug caused a DMA buffer
being overwritten during a transfer without waiting, which messes up the
fonts in the BIOS. Fixing this correctly would require implementing the
Data Cache, which is something which would make the emulator basically
unusable, so this is a reasonable solution, it is only enabled during
the BIOS screen.

- Fixes certain bios revisions rendering text incorrectly.

{{< progress/github-link prNums="4498" title="MoverecConstBuf memory near recompiler memory" authors="TellowKrinkle" >}}

- Fixes an issue where recConstBuf was too far away from the main recompiler to LEA in 64-bit builds.

{{< progress/github-link prNums="4482" title="Fix disc drivepath issues on Windows." authors="turtleli" >}}

- Fixes [#3910](https://github.com/PCSX2/pcsx2/issues/3910) - CDVD Regression: Booting a physical disc inserted after opening PCSX2 doesn't work. (Regression only affects Windows).
- Fixes an issue where the drive choice is cleared if there is no disc in the selected drive when PCSX2 is first opened (Should only affect Windows, but non-Windows only code is touched too).

## GSdx Improvements

### Misc GSdx

{{< progress/github-link prNums="4350" title="Removepartial and full crc hack levels on release builds" authors="lightningterror" >}}

- Normal users shouldn't really need to choose partial or full since automatic already does that.

{{< progress/github-link prNums="4383" title="Some minorcleanups." authors="lightningterror" >}}

## TAS (Tool Assisted Speedrun) Utility Improvements

{{< progress/github-link prNums="4382" title="Resolve crash when closing emulator involving GUI elements" authors="xTVaser" >}}

{{< progress/github-link shas="e50a4463a532379296a7bc97195f899aa215514d" title="Add close box to New Input Recording" authors="lightningterror" >}}

{{< progress/github-link prNums="4393" title="Allow configuration of the frame advance amount" authors="xTVaser" >}}

- Adds a GUI configurable setting to control how many frames the frame-advance feature should advance.

{{< progress/github-link prNums="4392" title="Add warning when creating a save-state recording" authors="xTVaser" >}}

- Adds a brief warning explaining why you may want to avoid save-state recordings, and what would have to be done if a bad state is achieved.

## IPC (Interprocess Communication) Improvements

{{< progress/github-link prNums="4337" title="Remove possiblememory corruption due to strcat on provided pointer" authors="GovanifY" >}}

## GameDB Improvements

{{< progress/github-link shas="467659200dd8165444eae402350b56f8ec2f26cf" title="Add patches for Elemental Gerad and K-1 Grand Prix 2006" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4388" title="Adds fixesfor Energy Airforce - Aim Strike , K-1 World Grand Prix 2006" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4405" title="add NearestEErounding to SSX and SSX tricky" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4462" title="Add Kickstartfor Rayman Raving Rabbids." authors="icup321" >}}

{{< progress/github-link prNums="4478" title="Adds VUclamping mode extra to Enthusia Professional Racing" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4488" title="Remove nolonger needed 'OPHFLagHack' for Naruto - Uzumaki Chronicles 2" authors="Mrlinkwii" >}}

## Misc Improvements

{{< progress/github-link prNums="4278" title="Grayout InstantVU1 when MTVU is enabled." authors="RedDevilus" >}}

{{< progress/github-link prNums="4377" title="Revise consolewith newline on compile + title" authors="RedDevilus" >}}

{{< progress/github-link prNums="4416" title="Swap buttonsBrowse... and Ask when booting and default to unchecked state" authors="RedDevilus" >}}

{{< progress/github-link prNums="4378" title="change window todebug in the menu and move blockdump to the debug menu" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4431" title="update the 2smaller app icons." authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4438" title="change 'Consoleto Stdio' to 'Program Log to Stdio' in UI" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4454" title="Rename PSXreferences to PS1 distinguish between PS1 and DVR" authors="Florin9doi" >}}

{{< progress/github-link prNums="4329" title="RemoveSSE2/SSE3 support" authors="GovanifY" >}}

Moving forward with our goal to clean up and modernize the code we are
removing SSE2/3 support.

{{< progress/github-link prNums="4444" title="Save ELF lastpath when auto-running an elf" authors="F0bes" >}}

{{< progress/github-link prNums="4343" title="Enable GSdebugger on CI artifacts" authors="lightningterror" >}}

Adds an CI environment variable to enable GS debugger on CI artifacts.
This can also be enabled locally to enable the GS debugger.

{{< progress/github-link prNums="4418" title="Validate GameDBchanges in GitHub Actions." authors="xTVaser" >}}

Currently, the emulator will fully validate the GameDB, which is how
we've been catching these recent mistakes. But this adds a CI check to
validate the file in a very similar manner at build time.

{{< progress/github-link prNums="4180" title="CI: Add an explicit flag to retain debugging artifacts (.pdb, .exp, .lib, etc) in Windows builds." authors="xTVaser" >}}

## Conclusion

And that's all from us, see you next time in our 2021 Q3 Report!

## Metadata

Q2 2021:  
(dev1164 to dev1299) (2020-04-01 - 2020-06-30)