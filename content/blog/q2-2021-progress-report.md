---
title: "Q2 2021 Progress Report"
date: 2021-07-05T18:32:32-04:00
draft: false

tags:
  - "progress-report"
---


{{< ad >}}




<div class="article-tools clearfix">

<dl class="article-info">

<dd class="create">Created: <span>05 July 2021</span></dd>

<dd class="createdby">Written by <span>bositman</span></dd>

</dl>

</div>

<div style="text-align: center"><ins class="adsbygoogle" style="display: inline-block; width: 468px; height: 60px" data-ad-client="ca-pub-7741304783035041" data-ad-type="text_image" data-color-border="000000" data-color-bg="FFFFFF" data-color-link="0088CC" data-color-text="555555" data-color-url="AAAAAA"><iframe id="aswift_0" style="
        height: 1px !important;
        max-height: 1px !important;
        max-width: 1px !important;
        width: 1px !important;
      "><iframe id="google_ads_frame0"></iframe></ins> <script type="text/javascript">(adsbygoogle = window.adsbygoogle || []).push({});</script></div>

![progress rep q2 2021](/images/stories/frontend/progress_reports/q2-2021/progrepq22021.jpg)

Written by [lightningterror](https://forums.pcsx2.net/User-lightningterror)

# Core Improvements

**<span style="color: #00ccff">[Enhancement]</span> DEV9 improvements:**

[#4381](https://github.com/PCSX2/pcsx2/pull/4381) DEV9: Do not apply byteswapping to TX/RX FIFO writes/reads. By [TheLastRar](https://github.com/TheLastRar).

Remove the byte swapping done to TX/RX FIFO writes/reads performed via registers.

Fixes Twisted Metal: Black Online Public Beta v. 1.0 unable to initialize network adapter.

[#4364](https://github.com/PCSX2/pcsx2/pull/4364) DEV9: add ATA Idle Immediate (E1) stub. By [macmenot](https://github.com/macmenot).

Fixes HDD support for Street Fighter Alpha Anthology.

[#4403](https://github.com/PCSX2/pcsx2/pull/4403) DEV9: consistently prefix all console output with DEV9\. By [macmenot](https://github.com/macmenot).

[#4429](https://github.com/PCSX2/pcsx2/pull/4429) DEV9: Update ATA code for wchar GHC. By [TheLastRar](https://github.com/TheLastRar).

[#4496](https://github.com/PCSX2/pcsx2/pull/4496) DEV9: PCAP, check size of read packet. By [TheLastRar](https://github.com/TheLastRar).

In pcap, check size of read packet. If the size exceeds the buffer we are using, drop the packet.

[#4448](https://github.com/PCSX2/pcsx2/pull/4448) DEV9: Always use binary mode for HDD file. By [TheLastRar](https://github.com/TheLastRar).

Opening the file in binary mode is the intended behaviour (and was done in the most common situation),

[#4449](https://github.com/PCSX2/pcsx2/pull/4449) DEV9: Fix potential out of bounds access when manual DNS1 & automatic DNS2 are used together. By [TheLastRar](https://github.com/TheLastRar).

If DNS1 was manually specified, but DNS2 set to be automatically assigned, an off by one error could result in an out of bounds access to an array of adapter DNS addresses.

[#4442](https://github.com/PCSX2/pcsx2/pull/4442) DEV9: Increase min HDD size to 40GiB. By [TheLastRar](https://github.com/TheLastRar).

Most games expect a HDD of 40GiB in size, and may fail to install as a result (and display a confusing error message).

[#4304](https://github.com/PCSX2/pcsx2/pull/4304) DEV9: Internal DHCP support. By [TheLastRar](https://github.com/TheLastRar).

Adds an internal DHCP similer to what CLR_DEV9 offers for pcap & tap.

[#4433](https://github.com/PCSX2/pcsx2/pull/4433) DEV9: Correctly populate DNS2 field with DNS2 IP. By [TheLastRar](https://github.com/TheLastRar).

Correctly populate DNS2 field with DNS2 IP in the DHCP section of the network ui.

[#4435](https://github.com/PCSX2/pcsx2/pull/4435) DEV9: Sleep instead of yield in RxThread. By [TheLastRar](https://github.com/TheLastRar).

Yield might not leave the thread asleep long enough to prevent it from causing excessive CPU load.  
This also brings PCSX2 inline with CLR_DEV9 (which also sleeps for 1ms).

**<span style="color: #00ccff">[Enhancement]</span> Memory card improvements:**

[#3941](https://github.com/PCSX2/pcsx2/pull/3941) Memory card: Folder memcards: Add an index file to track order of files. By [CookiePLMonster](https://github.com/CookiePLMonster).

Adds an index file for folder memory cards in order to track timestamps and order of files in the FAT partition properly. This normally shouldn't matter, but there are at least a few games (ie. GTA games) which rely on the order of files on the memory card. Previously, folder memcards would not care about the order and populate the partition in whatever order the host filesystem provided the files (so, in the case of NTFS partitions, alphabetically). In reality, FAT partitions don't specify the order of files, which means in practice they are sorted by the order of creation.

Fixes saving in GTA games with folder memory cards.

**<span style="color: #00ccff">[Enhancement]</span> microVU improvements:**

[6f7890b](https://github.com/PCSX2/pcsx2/commit/6f7890b709d5e3f7f5b824781e493455efc92339) microVU: Fix mistake when setting Status Flag bits for Signed/Zero. By [refractionpcsx2](https://github.com/refractionpcsx2).

**<span style="color: #00ccff">[Enhancement]</span> Gif improvements:**

[b60765e](https://github.com/PCSX2/pcsx2/commit/b60765e976f6b1c45117bbdd042f8d6698c63002) Gif: Remove MTVU spam that isn't required. By [refractionpcsx2](https://github.com/refractionpcsx2).

Solves stuttering in MTVU mode in some games, and gets rid of some annoying asserts which mean nothing.

**<span style="color: #00ccff">[Enhancement]</span> SPU2 improvements:**

[#3825](https://github.com/PCSX2/pcsx2/pull/3825) SPU2: Change default of latency slider. By [RedDevilus](https://github.com/RedDevilus).

[17519c2](https://github.com/PCSX2/pcsx2/commit/17519c21b4eeefbadaad3374bd98bdd43d44f1a6) SPU2: Fix hi def audio streaming. By [refractionpcsx2](https://github.com/refractionpcsx2).

[#4474](https://github.com/PCSX2/pcsx2/pull/4474) SPU2: Remove cycleptr, grab current cycles directly. By [Ziemas](https://github.com/Ziemas).

This just changes the SPU2 to get the current IOP cycle directly instead of through a pointer. The non-pointer path seems to have been given up on anyway and there seems to be little reason for hiding it behind a pointer.

This removes the path where SPU2 runs off the provided cycle argument to SPU2Async, but that was unused anyway.

[#4437](https://github.com/PCSX2/pcsx2/pull/4437) SPU: Make SPU use the DMA registers from iopHw. By [Ziemas](https://github.com/Ziemas).

The SPU was managing its own DMA Addresses, this makes it use the iopHw functionality for this instead.

**<span style="color: #00ccff">[Enhancement]</span> PAD improvements:**

[#4331](https://github.com/PCSX2/pcsx2/pull/4331) PAD: Just enable pressure on CMD 0x4F. By [KrossX](https://github.com/KrossX).

Fixes Warriors of Might and Magic gamepad not functioning properly.

[#4466](https://github.com/PCSX2/pcsx2/pull/4466) PAD: Fix gamepad choice not affecting rumble test on Linux. By [Lahvuun](https://github.com/Lahvuun).

This change causes the currently selected gamepad to rumble instead of the first one.

**<span style="color: #00ccff">[Enhancement]</span> Eyetoy improvements:**

[#4415](https://github.com/PCSX2/pcsx2/pull/4415) Eyetoy: Motion button support. By [Florin9doi](https://github.com/Florin9doi).

**<span style="color: #00ccff">[Enhancement]</span> Debuggers improvements:**

[#4345](https://github.com/PCSX2/pcsx2/pull/4345) Debugger: Bios thread view support. By [F0bes](https://github.com/F0bes).

**<span style="color: #00ccff">[Enhancement]</span> Misc core improvements:**

#[4399](https://github.com/PCSX2/pcsx2/pull/4399) Core / VU: Disable MTVU when VU1 Interpreter is selected. By [F0bes](https://github.com/F0bes).

[#3860](https://github.com/PCSX2/pcsx2/pull/3860) FPU: Remove FPU Compare Hack. By [kozarovv](https://github.com/kozarovv).

The hack is no longer needed as full Clamping mode can be used instead.

[#4461](https://github.com/PCSX2/pcsx2/pull/4461) Misc: Differentiate Impossible block clearing message from IOP & EE. By [F0bes](https://github.com/F0bes).

Prefix the "Impossible block clearing failure" with "[IOP]" or "[EE]" depending on the recompiler.

[#4425](https://github.com/PCSX2/pcsx2/pull/4425) PSX: Fix Emulated PSX GPU Version. By [Nobbs66](https://github.com/Nobbs66).

Previously it was thought that the PS2 would emulate the v2 GPU, but hardware tests show that it emulates the V0 GPU.

[#4460](https://github.com/PCSX2/pcsx2/pull/4460) Core: Make DMA's instant during the BIOS. By [refractionpcsx2](https://github.com/refractionpcsx2), [tadanokojin](https://github.com/tadanokojin), and [PSI-Rockin](https://github.com/PSI-Rockin).

This hackfixes the BIOS to avoid a Data Cache bug caused by a DMA buffer being overwritten during a transfer without waiting, which messes up the fonts in the BIOS. Fixing this correctly would require implementing the Data Cache, which is something which would make the emulator basically unusable, so this is a reasonable solution, it is only enabled during the BIOS screen.

Fixes certain bios revisions rendering text incorrectly.

[#4498](https://github.com/PCSX2/pcsx2/pull/4498) iR5900: Move recConstBuf memory near recompiler memory. By [TellowKrinkle](https://github.com/tellowkrinkle).

Fixes an issue where recConstBuf was too far away from the main recompiler to LEA in 64-bit builds.

[#4482](https://github.com/PCSX2/pcsx2/pull/4482) CDVD: Fix disc drive path issues on Windows. By [turtleli](https://github.com/turtlelic).

*   Fixes <span class="reference">[CDVD Regression: Booting a physical disc inserted after opening PCSX2 doesn't work.<span class="issue-shorthand"> #3910</span>](https://github.com/PCSX2/pcsx2/issues/3910)</span> (Regression only affects Windows).
*   Fixes an issue where the drive choice is cleared if there is no disc in the selected drive when PCSX2 is first opened (Should only affect Windows, but non-Windows only code is touched too).

* * *

# GSdx Improvements

**<span style="color: #00ccff">[Enhancement]</span> Misc GSdx improvements:**

[#4350](https://github.com/PCSX2/pcsx2/pull/4350) GSdx-gui: Remove partial and full crc hack levels on release builds. By [lightningterror](https://github.com/lightningterror).

Normal users shouldn't really need to choose partial or full since automatic already does that.

[#4383](https://github.com/PCSX2/pcsx2/pull/4383) GSdx-hw: Some minor cleanups. By [lightningterror](https://github.com/lightningterror).

* * *

# TAS (Tool Assisted Speedrun) Utility Improvements

[#4382](https://github.com/PCSX2/pcsx2/pull/4382) Recording: Resolve crash when closing emulator involving GUI elements. By [xTVaser](https://github.com/xTVaser).

[e50a446](https://github.com/PCSX2/pcsx2/commit/e50a4463a532379296a7bc97195f899aa215514d) Recording-gui: Add close box to New Input Recording. By [lightningterror](https://github.com/lightningterror).

[#4393](https://github.com/PCSX2/pcsx2/pull/4393) Recording: Allow configuration of the frame advance amount. By [xTVaser](https://github.com/xTVaser).

Adds a GUI configurable setting to control how many frames the frame-advance feature should advance.

[#4392](https://github.com/PCSX2/pcsx2/pull/4392) Recording: Add warning when creating a save-state recording. By [xTVaser](https://github.com/xTVaser).

Adds a brief warning explaining why you may want to avoid save-state recordings, and what would have to be done if a bad state is achieved.

* * *

# IPC (Interprocess Communication) Improvements

[#4337](https://github.com/PCSX2/pcsx2/pull/4337) IPC: Remove possible memory corruption due to strcat on provided pointer. By [GovanifY](https://github.com/GovanifY).

* * *

# GameDB Improvements

[4676592](https://github.com/PCSX2/pcsx2/commit/467659200dd8165444eae402350b56f8ec2f26cf) GameDB: Add patches for Elemental Gerad and K-1 Grand Prix 2006.By [refractionpcsx2](https://github.com/refractionpcsx2).

[#4388](https://github.com/PCSX2/pcsx2/pull/4388) GameDB: Adds fixes for Energy Airforce - Aim Strike , K-1 World Grand Prix 2006\. By [Mrlinkwii](https://github.com/Mrlinkwii).

[#4405](https://github.com/PCSX2/pcsx2/pull/4405) GameDB: add Nearest EErounding to SSX and SSX tricky. By [Mrlinkwii](https://github.com/Mrlinkwii).

[#4462](https://github.com/PCSX2/pcsx2/pull/4462) GameDB: Add Kickstart for Rayman Raving Rabbids. By [icup321](https://github.com/icup321).

[#4478](https://github.com/PCSX2/pcsx2/pull/4478) GameDB: Adds VU clamping mode extra to Enthusia Professional Racing. By [Mrlinkwii](https://github.com/Mrlinkwii).

[#4488](https://github.com/PCSX2/pcsx2/pull/4488) GameDB: Remove no longer needed 'OPHFLagHack' for Naruto - Uzumaki Chronicles 2\. By [Mrlinkwii](https://github.com/Mrlinkwii).

* * *

# Misc Improvements

[#4278](https://github.com/PCSX2/pcsx2/pull/4278) GUI: Grayout Instant VU1 when MTVU is enabled. By [RedDevilus](https://github.com/RedDevilus).

[#4377](https://github.com/PCSX2/pcsx2/pull/4377) GUI: Revise console with newline on compile + title. By [RedDevilus](https://github.com/RedDevilus).

[#4416](https://github.com/PCSX2/pcsx2/pull/4416) GUI: Swap buttons Browse... and Ask when booting and default to unchecked state. By [RedDevilus](https://github.com/RedDevilus).

[#4378](https://github.com/PCSX2/pcsx2/pull/4378) GUI: change window to debug in the menu and move blockdump to the debug menu. By [Mrlinkwii](https://github.com/Mrlinkwii).

[#4431](https://github.com/PCSX2/pcsx2/pull/4431) GUI: update the 2 smaller app icons. By [Mrlinkwii](https://github.com/Mrlinkwii).

[#4438](https://github.com/PCSX2/pcsx2/pull/4438) GUI: change 'Console to Stdio' to 'Program Log to Stdio' in UI. By [Mrlinkwii](https://github.com/Mrlinkwii).

[#4454](https://github.com/PCSX2/pcsx2/pull/4454) GUI: Rename PSX references to PS1 distinguish between PS1 and DVR. By [Florin9doi](https://github.com/Florin9doi).

[#4329](https://github.com/PCSX2/pcsx2/pull/4329) Misc: Remove SSE2/SSE3 support. By [GovanifY](https://github.com/GovanifY).

Moving forward with our goal to clean up and modernize the code we are removing SSE2/3 support.

[#4444](https://github.com/PCSX2/pcsx2/pull/4444) Misc: Save ELF last path when auto-running an elf. By [F0bes](https://github.com/F0bes).

[#4343](https://github.com/PCSX2/pcsx2/pull/4343) Misc: Enable GS debugger on CI artifacts. By [lightningterror](https://github.com/lightningterror).

Adds an CI environment variable to enable GS debugger on CI artifacts. This can also be enabled locally to enable the GS debugger.

[#4418](https://github.com/PCSX2/pcsx2/pull/4418) CI: Validate GameDB changes in GitHub Actions. By [xTVaser](https://github.com/xTVaser).

Currently, the emulator will fully validate the GameDB, which is how we've been catching these recent mistakes. But this adds a CI check to validate the file in a very similar manner at build time.

[#4180](https://github.com/PCSX2/pcsx2/pull/4180) CI: Add an explicit flag to retain debugging artifacts (.pdb, .exp, .lib, etc) in Windows builds. By [xTVaser](https://github.com/xTVaser).

* * *

dev 1165 and up (last add 1296)

And that's all from us, see you next time in our 2021 Q3 Report!
