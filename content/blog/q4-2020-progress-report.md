---
title: "Q4 2020 Progress Report"
date: 2021-03-08
draft: false

tags:
  - "progress-report"
---

## [Q4 2020 Progress Report](/297-q4-2020-progress-report.html)

<div class="article-tools clearfix">

<dl class="article-info">

<dd class="create">Created: <span>08 March 2021</span></dd>

<dd class="createdby">Written by <span>bositman</span></dd>

</dl>

</div>

<div style="text-align:center;"><ins class="adsbygoogle" style="display:inline-block;width:468px;height:60px" data-ad-client="ca-pub-7741304783035041" data-ad-type="text_image" data-color-border="000000" data-color-bg="FFFFFF" data-color-link="0088CC" data-color-text="555555" data-color-url="AAAAAA"><iframe id="aswift_0" style="height: 1px !important; max-height: 1px !important; max-width: 1px !important; width: 1px !important;"><iframe id="google_ads_frame0"></iframe></ins> <script type="text/javascript">(adsbygoogle = window.adsbygoogle || []).push({});</script></div>

![progress rep q4 2020](/images/stories/frontend/progress_reports/q4-2020/q4-2020-report.jpg)

This quarter has been really amazing for us and for our users that enjoy using PCSX2.

We've made some outstanding progress, hope you guys enjoy the read ![Smile](https://pcsx2.net/images/stories/frontend/smilies/smile.gif)

Written by [lightningterror](https://forums.pcsx2.net/User-lightningterror)

# Core Improvements

**<span style="color: #00ccff;">[Enhancement] </span>Plugins merger in to core continuation:**

As we mentioned in our previous report we are continuing merging the plugins in to the core which bring us variety of benefits.

For people that used different plugins for specific features that aren't available in the plugins we merged don't worry, we are working on adding those features as well, be patient ![Smile](https://pcsx2.net/images/stories/frontend/smilies/smile.gif)

Currently the following plugins have been merged in to the core:

[#3782](https://github.com/PCSX2/pcsx2/pull/3782) DEV9: For the DEV9 feature that handles PS2 hard disk drive and Ethernet emulation we merged the dev9ghzdrk plugin in to the core. By [GovanifY](https://github.com/GovanifY).

[#3756](https://github.com/PCSX2/pcsx2/pull/3756) SPU2: For the SPU2 feature that handles PS2 audio we merged the SPU2-X plugin in to the core. By [GovanifY](https://github.com/GovanifY).

[#3889](https://github.com/PCSX2/pcsx2/pull/3889) USB: For the USB feature we merged the USBqemu-wheel plugin in to the core. By [GovanifY](https://github.com/GovanifY).

[#3994](https://github.com/PCSX2/pcsx2/pull/3994) PAD: For the PAD feature that handles PS2 controller input we merged LilyPad for Windows users and OnePad 2.0 for Linux/Mac. In the future we will transition and combine both of them so all missing features get added. By [GovanifY](https://github.com/GovanifY).

**<span style="color: #00ccff;">[Enhancement]</span> Counters improvements:**

[#3785](https://github.com/PCSX2/pcsx2/pull/3785) Counters: Tighten tolerances on framelimiter and smooth out frame pacing. By [RedPanda4552](https://github.com/RedPanda4552) and [refractionpcsx2](https://github.com/refractionpcsx2).

Comparing PCSX2's old framelimiter with RTSS showed there was room for improvement. Frametimes regularly would jump up and down in various situations. This change smooths out frame pacing substantially across the board (easily visible in RTSS). We have some comparisons below which you can see the differences, alternatively our users can check out the relative PR for more details.

Note: Master(Before) ->PR(After)

Ratchet & Clank 2

![](/images/stories/frontend/progress_reports/q4-2020/r-c-2-frame-pacing.gif)

Champions - Return to Arms

![](/images/stories/frontend/progress_reports/q4-2020/champions-return-to-arms-frame-pacing.gif)

Metal Arms - Glitch in the System

![](/images/stories/frontend/progress_reports/q4-2020/metal-arms-frame-pacing.gif)

[#3862](https://github.com/PCSX2/pcsx2/pull/3862) Counters: account for vertical frequency differences in non-interlaced analog modes. By [tadanokojin](https://github.com/tadanokojin).

Timing adjustments for double strike analog modes.

Fixes Beatmania IIDX 3rd-8th Style.

[7117633](https://github.com/PCSX2/pcsx2/commit/71176332042b004c2e05a517f481687d6fc39914) Counters/Vsync: Do correct number of HBlanks per VSync for PAL/NTSC. By [refractionpcsx2](https://github.com/refractionpcsx2).

**<span style="color: #00ccff;">[Enhancement]</span> MTVU improvements:**

We are happy to announce that we have made great progress this time around in improving MTVU compatibility with a bunch of games. The MTVU list with remaining compatibility issues can be seen at [#1669](https://github.com/PCSX2/pcsx2/issues/1669).

[#4035](https://github.com/PCSX2/pcsx2/pull/4035) MTVU: Improve compatibility with games that do GS SIGNAL/LABEL/FINISH. By [refractionpcsx2](https://github.com/refractionpcsx2).

Improve compatibility with games that use FINISH/SIGNAL/LABEL on the GS through VU1 when using MTVU.

Performance impact is reasonably minimal, within a couple of percent of master. Although I cannot guarantee the reliability although it looks good, it's a huge improvement and a vast majority of the games listed are now playable with MTVU.

If a game does a double SIGNAL, that still won't work.

Fixed Games when using MTVU:

Backyard Basketball  
Baroque  
Batman: Vengeance  
Crash Nitro Kart  
Gradius V  
Heatseeker  
King's Field IV  
Marvel Ultimate Alliance  
Medal of Honor: Rising Sun  
MTVs Celebrity Deathmatch  
Summon Night Gran-These: Horobi no Ken to Yakusoku no Kishi  
Tony Hawk games  
X-Men Legends 2  
Yu-Gi-Oh! Capsule Monster Coliseum

Slowdown in games using MTVU Fixed:

007 Agent Under Fire  
007 Everything or Nothing  
TimeSplitters 2  
TimeSplitters Future Perfect

Homebrew Fixes:

Aura for Laura

[#4043](https://github.com/PCSX2/pcsx2/pull/4043) VIF: Always update MTVU thread with Row/Col Changes. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes graphical issues in Fatal Frame 2 when swapping to MTVU.

[#4053](https://github.com/PCSX2/pcsx2/pull/4053) MTVU: Clean up GS SIGNAL/LABEL/FINISH communication. By [tellowkrinkle](https://github.com/tellowkrinkle).

Fixes atomic usage and ensures all communication goes in one direction.

Also removed some forced 4-byte alignment, for 4-byte types it's unnecessary and for 8-byte types it's either unnecessary or harmful.

[c9a5443](https://github.com/PCSX2/pcsx2/commit/c9a5443539e5f2ec2a9719a39743fe9f36da551f) VIF: Slightly optimise when Row/Col are written to MTVU. By [refractionpcsx2](https://github.com/refractionpcsx2).

[155cf38](https://github.com/PCSX2/pcsx2/commit/155cf385bda43668ab3ebd7abf07940ed6047eef) microVU: Flush running VU1 program when toggling MTVU on. By [refractionpcsx2](https://github.com/refractionpcsx2).

[7b7278b](https://github.com/PCSX2/pcsx2/commit/7b7278bc85fa3becd39c47168fe6c912523b4d43) VIF: Fix MPG bug incrementing addresses properly when using MTVU. By [refractionpcsx2](https://github.com/refractionpcsx2).

**<span style="color: #00ccff;">[Enhancement]</span> [#3813](https://github.com/PCSX2/pcsx2/pull/3813) COP2: Make sure the status flag gets updated on DIV/SQRT/RSQRT. By [refractionpcsx2](https://github.com/refractionpcsx2).**

Fixes Yanya Caballista running slow (patches removed).  
Fixes Disney's Treasure Planet's crazy camera (that flies off) and ground displacement.

**<span style="color: #00ccff;">[Enhancement]</span> [#3957](https://github.com/PCSX2/pcsx2/pull/3957) MFIFO: Maintain VIF DMA status and Empty condition on VIF reset. By [refractionpcsx2](https://github.com/refractionpcsx2).**

Don't decrement/change VIF1 QWC on VIF1 FIFO write.

This involves removing an old VIF reset hack which was put in for Donald Duck Quack Attack, but doesn't seem to be needed anymore (game uses T-Bit on VU which has been fixed since this hack was placed in and could likely have been the problem).

Fixes Scarface when switching to progressive mode.

**<span style="color: #00ccff;">[Enhancement]</span> microVU improvements:**

[0448b49](https://github.com/PCSX2/pcsx2/commit/0448b4902c5e158af5bb654422d05eb78ceafa83) microVU: Fixed bug in E-bit conditional branches. Fixes DT Racer. By [refractionpcsx2](https://github.com/refractionpcsx2).

[#3865](https://github.com/PCSX2/pcsx2/pull/3865) microVU: Fix program range wrapping. Fixes constant recompilation in IHRA Drag Racing and Dawn of Mana. By [refractionpcsx2](https://github.com/refractionpcsx2).

[#3797](https://github.com/PCSX2/pcsx2/pull/3797) microVU: Make sure flags are exact on M-bit. Fixes Gungrave. By [refractionpcsx2](https://github.com/refractionpcsx2).

[#3971](https://github.com/PCSX2/pcsx2/pull/3971) microVU: Keep start PC, modify prog search to avoid recompilation. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fix some M-Bit stuff to reduce programs created and fix them happening on branches.

Hopefully shouldn't be much in the way of compatibility changes, but should cut down the recompilation of MicroVU0 programs due to the change in how VU0 operates and how things are going to work going forward. MGS3 went down from 115 (and climbing) to around 13\. Crash Twinsanity went down from 32 by the main menu to about 15.

This also sets up some future work of synchronising VU1.

Also fixes a bug in VIF when using MTVU, fixes Def Jam Fight for NY when using MTVU, maybe others.

[03445d0](https://github.com/PCSX2/pcsx2/commit/03445d0b553fc5a8275e5df91fe004a5e10607a2) microVU: Add check when loading quick block from program. By [refractionpcsx2](https://github.com/refractionpcsx2).

Sometimes (CoD Finest Hour) can somehow end up with blocks missing from a program, it still finds the current program, so we check if the block exists, if not, recompile new ones.

**<span style="color: #00ccff;">[Enhancement]</span> SIF improvements:**

[#3808](https://github.com/PCSX2/pcsx2/pull/3808) SIF: Fix attempting to write junk when FIFO full. Fixes Ghosthunter. By [refractionpcsx2](https://github.com/refractionpcsx2).

[#3779](https://github.com/PCSX2/pcsx2/pull/3779) SIF: Transfer SIF0 junk for partial QW transfers from IOP. Fixes True Crime: Streets of LA. By [refractionpcsx2](https://github.com/refractionpcsx2), backport from Dobiestation.

**<span style="color: #00ccff;">[Enhancement]</span> [#3955](https://github.com/PCSX2/pcsx2/pull/3955) DMA: Correctly emulate QWC 0 on NORMAL transfers. By [refractionpcsx2](https://github.com/refractionpcsx2).**

This removes 2 hacks on the IPU for Enter the Matrix and Mana Khemia

On the PS2 if a NORMAL DMA transfer is started with QWC 0, the DMA overflows and transfers another 0xFFFF quadwords on top of the underflowed one, this correctly emulates that.

I did have to do a "kind of" hack to make Mana Khemia work properly, the game relies on the IPU to take some time to decode macroblocks, but we handle them instantly, so I had to place an artificial delay on starting the DMA to let it catch up and do what it needs to do. It shouldn't have any negative impacts.

**<span style="color: #00ccff;">[Enhancement]</span> [#3936](https://github.com/PCSX2/pcsx2/pull/3936) BIOS/HLE: Use BIOS settings on Fastboot. By [refractionpcsx2](https://github.com/refractionpcsx2).**

Fixes bad fonts when booting a game in fast boot.

Selects correct language for games depending on your BIOS setting when using fast boot.

It also makes normal boot works for your language even if you have a difference between BIOS region and game region but you will need to go into BIOS and apply that or let the default settings handle it based on your BIOS. [#4018](https://github.com/PCSX2/pcsx2/pull/4018).

Stops games such as Guitar Hero 2 from crashing on fast boot.

Displays corrects timezones in games.

**<span style="color: #00ccff;">[Enhancement]</span> [#3969](https://github.com/PCSX2/pcsx2/pull/3969) IPU: Stop IPU0 looping when there's no data for it to read. By [refractionpcsx2](https://github.com/refractionpcsx2).**

Fixes bad slowdowns in Ratchet games when using EE Timing fix caused by bad IPU streams.

**<span style="color: #00ccff;">[Enhancement]</span> VIF improvements:**

[678829a](https://github.com/PCSX2/pcsx2/commit/678829a5b2b8ca7a3e42d8edc9ab201bf00b0fe9) VIF: Don't rush finish VU programs. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes remaining SPS in Shadowman.

[#4003](https://github.com/PCSX2/pcsx2/pull/4003) VIF: Don't start transfer if VIF1/0 is stalled. By [refractionpcsx2](https://github.com/refractionpcsx2).

Also Fix missing VIF status check on MFIFO.

Fixes hang in Batman Vengeance, game stalls the VIF during an MFIFO transfer then stops and starts VIF while it's stalled, in the old code this causes it to ignore the stall and continue as normal, this PR fixes that behaviour.

[a4553e8](https://github.com/PCSX2/pcsx2/commit/a4553e821ffadf8a7c95e44a8ca7750d7f5df72f) VIF: Allow VIF1 to continue if stalled and the FIFO is reversed. By [refractionpcsx2](https://github.com/refractionpcsx2).

[843650e](https://github.com/PCSX2/pcsx2/commit/843650e79ecf02b2234728f5d9ab34767da4242b) VIF: Mask VU program address on MSCAL/MSCNT instructions. By [refractionpcsx2](https://github.com/refractionpcsx2).

[97b74fa](https://github.com/PCSX2/pcsx2/commit/97b74fa6ea81a1e213aa7bbdc8b5d7f5b2c27d83) VIF: MSCNT address is -1, so don't mask it. By [refractionpcsx2](https://github.com/refractionpcsx2).

[2409486](https://github.com/PCSX2/pcsx2/commit/2409486c2dc51346d6c04c4ff9297b9fce66d8b5) VIF: Fixed undefined behaviour of Unpack V3-16 in final QW write. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes bad geometry in Homerun.

**<span style="color: #00ccff;">[Enhancement]</span> [#3998](https://github.com/PCSX2/pcsx2/pull/3998) VU: Synchronise VU1, added speedhack for old behaviour. By [refractionpcsx2](https://github.com/refractionpcsx2).**

This synchronises VU1 with the EE and VU0 (as close as we can). A new speedhack has been added to replicate the old behaviour, which is on by default unless you're using the Safest preset. Games which require the new behaviour have an entry in the GameDB to disable it.

Fixed Games:  
Fixes SPS in Shadowman 2encond Coming.  
Fixes "Noodles" in Parappa the Rapper 2 (box in the top left).  
Fixes floor corrupt textures and console error spam in Dropship.  
Slightly improves World series baseball 2k3 but it's still broken, just doesn't run at sub 1fps anymore.

**<span style="color: #00ccff;">[Enhancement]</span> SPU2 improvements:**

[#3961](https://github.com/PCSX2/pcsx2/pull/3961) SPU2: Delay DMA Reads to prevent overrun. By [refractionpcsx2](https://github.com/refractionpcsx2).

[#3959](https://github.com/PCSX2/pcsx2/pull/3959) SPU2: Get rid of the need for delay cycles. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes the entire list of games that required alternative delay cycle handling in [#2371](https://github.com/PCSX2/pcsx2/issues/2371).

Fixes sound issues in Megaman X7.

_Note: This has been re implemented in Q1 with a better solution where it doesn't cause issues._

[#3968](https://github.com/PCSX2/pcsx2/pull/3968) SPU2: Change VolumeSteps from 42 to 5\. By [RedDevilus](https://github.com/RedDevilus).

This will change the jumps from 42 to 5, scroll wheel will still be 2 and all the arrows keys on 1.

[3d3c039](https://github.com/PCSX2/pcsx2/commit/3d3c0395965fc71ab57035d15b9a5430fae5dca7) SPU2: Fix Address masks for voices + Effect area. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes reverb in The Suffering.

**<span style="color: #00ccff;">[Enhancement]</span> USB improvements:**

[#4042](https://github.com/PCSX2/pcsx2/pull/4042) USB: Force Feedback fixes. By [CookiePLMonster](https://github.com/CookiePLMonster).

This PR partially addresses [#3926](https://github.com/PCSX2/pcsx2/issues/3926) and corrects a range of issues with wheel's Force Feedback emulation.

**<span style="color: #00ccff;">[Enhancement]</span> CDVD improvements:**

[#3877](https://github.com/PCSX2/pcsx2/pull/3877) CDVD: Adjust read speed depending on if in inner/outer edge. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes Shadowman 2 Second Coming textures.  
Fixes Arctic Thunder loading problems.  
Fixes looping music on ONI title screen and skipping dialogues.  
Fixes Klonoa 2 missing audio.  
Fixes SPS at the beginning of matches in Next Generation Tennis 2003 (Ronald Garros).

[#3899](https://github.com/PCSX2/pcsx2/pull/3899) CDVD: Check register 14 (ps1 status register) for cd speed and CDDA. By [kenshen112(weirdbeardgame)](https://github.com/kenshen112).

**<span style="color: #00ccff;">[Enhancement]</span> DEV9 improvements:**

[#3740](https://github.com/PCSX2/pcsx2/pull/3740) DEV9: New TAP based networking interface. By [GovanifY](https://github.com/GovanifY).

A new TAP based networking interface was added to DEV9, which is usually a cleaner and simpler solution than the libpcap based one we used up until now. This essentially mirrors the inner workings of all modern VPNs.

[#4021](https://github.com/PCSX2/pcsx2/pull/4021) DEV9: Cancel read of TAP device on suspend/shutdown. By [TheLastRar](https://github.com/TheLastRar).

_Note: Wincap removal is not mentioned as it's re added in Q1 with some modifications._

**<span style="color: #00ccff;">[Enhancement]</span> [#3928](https://github.com/PCSX2/pcsx2/pull/3928) GameDB: Replace GameDB with a YAML equivalent. By [xTVaser (Tyler Wilding)](https://github.com/xTVaser).**

Improve the format of the current GameDB slightly and simplify the code around the handling the file itself. Before it was an extended .ini file format that relied on WX libraries.

Serve as a proof of concept for the YAML library / format that will be coming soon with the larger configuration overhaul.

**<span style="color: #00ccff;">[Enhancement]</span> Misc core improvements:**

[#3791](https://github.com/PCSX2/pcsx2/pull/3791) PGIF/PS1: Correct PGIF Register bit masks. By [Nobbs66](https://github.com/Nobbs66).

[#3806](https://github.com/PCSX2/pcsx2/pull/3806) Gamefix: Purge FMV in SW gamefix. By [tadanokojin](https://github.com/tadanokojin).

The gamefix/hack was broken and kind of pointless, it will be better to properly fix the issues instead so we got rid of it.

[#3844](https://github.com/PCSX2/pcsx2/pull/3844) CDVD: Fix iLinkId issues, fixes timing issues with some BIOS revisions on Time Crisis 2 and 3\. By [kozarovv](https://github.com/kozarovv).

[0d1a583](https://github.com/PCSX2/pcsx2/commit/0d1a5831449c4f31993ca4838dd1c39707e96cce) DMA: Handle undefined Chain mode tags. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes DT Racer speed issues.

[#3874](https://github.com/PCSX2/pcsx2/pull/3874) JIT: Fix FPU IEEE float conversion on x64\. By [GovanifY](https://github.com/GovanifY).

[#3778](https://github.com/PCSX2/pcsx2/pull/3778) IOP DMA: Always fire interrupts for SIF0/SIF1\. By [refractionpcsx2](https://github.com/refractionpcsx2) and [PSI-Rockin](https://github.com/psi-rockin), backport from Dobiestation.

Fixes Knockout Kings 2001 hang on boot. For more technical information please see [this](https://www.patreon.com/posts/sins-of-ps2-2001-42262496) post.

[#3935](https://github.com/PCSX2/pcsx2/pull/3935) Core: Don't reopen everything when we just want to reopen the CDVD. By [TheLastRar](https://github.com/TheLastRar).

[#3743](https://github.com/PCSX2/pcsx2/pull/3743) Core: send osd log event when snapshot is taken. By [tadanokojin](https://github.com/tadanokojin).

[#3604](https://github.com/PCSX2/pcsx2/pull/3604) PNACH: New patch type: apply repeating codes also on load. By [GovanifY](https://github.com/GovanifY).

[#3651](https://github.com/PCSX2/pcsx2/pull/3651) x86emitter: Register class improvements. By [tellowkrinkle](https://github.com/tellowkrinkle).

[#4023](https://github.com/PCSX2/pcsx2/pull/4023) GS: Properly mirror GS reads to CSR. By [tadanokojin](https://github.com/tadanokojin) and [refractionpcsx2](https://github.com/refractionpcsx2).

Puts in the correct behaviour for GS reads.

Fixes Supadoopa's Funslower demo.

[c998a51](https://github.com/PCSX2/pcsx2/commit/c998a51f71f6a81a2f4f0c9d27c85714d74ccd57) IOP DMA: Only acknowledge SPU2 DMA interrupt if DMA hasn't been cancelled. By [refractionpcsx2](https://github.com/refractionpcsx2).

Fixes Gregory Horror Show bad audio.

* * *

# TAS (Tool Assisted Speedrun) Utility Improvements

[#3627](https://github.com/PCSX2/pcsx2/pull/3627) Recording: Add menu items for recording controls with keyboard shortcuts. By [xTVaser (Tyler Wilding)](https://github.com/xTVaser) and [sonicfind](https://github.com/sonicfind).

[#3356](https://github.com/PCSX2/pcsx2/pull/3356) Recording: Overhaul of Recording Tool's VirtualPad. By [xTVaser (Tyler Wilding)](https://github.com/xTVaser).

[#4047](https://github.com/PCSX2/pcsx2/pull/4047) Recording: Properly cancel an input recording on a bad initial savestate. By [sonicfind](https://github.com/sonicfind).

[#3789](https://github.com/PCSX2/pcsx2/pull/3789) Recording: Resolve VirtualPads not drawing for some games. By [sonicfind](https://github.com/sonicfind).

[#3845](https://github.com/PCSX2/pcsx2/pull/3845) GUI: Internalize VirtualPad and Upgrade NewRecordingFrame. By [sonicfind](https://github.com/sonicfind).

Simplifies virtualPad access. This will be useful later down the line when more virtualPads are added.

NewRecordingFrame has improved functionality.

* * *

# GSdx Improvements

[#3858](https://github.com/PCSX2/pcsx2/pull/3858) GSdx: Properly init gsclut function ptrs. By [tadanokojin](https://github.com/tadanokojin).

GS reads lower 3 bits of PSM to determine if format is 8/4 bit and thus whether to write the clut into the clut buffer. Behavior is now correctly emulated.

Fixes international superstar soccer.

[#3873](https://github.com/PCSX2/pcsx2/pull/3873) GSdx-hw: Cleanup blending code a bit. By [lightningterror](https://github.com/lightningterror).

[#3765](https://github.com/PCSX2/pcsx2/pull/3765) Gsdx-hw: Move EmulateAtst in common hw renderer code. By [lightningterror](https://github.com/lightningterror).

Use shared code, instead of duplicates for each renderer.

[#3905](https://github.com/PCSX2/pcsx2/pull/3905) GSdx: Remove TV Shader hotkey toggle (F7). By [lightningterror](https://github.com/lightningterror).

Plenty of users misclicked this setting and don't know how to switch back since it's a rarely used option. We got rid of the hotkey toggle for a quality of life change.

[#3891](https://github.com/PCSX2/pcsx2/pull/3891) GSdx-hw: Don't always set MaxDepth on ps/fs. By [lightningterror](https://github.com/lightningterror).

Seems that it provides a very small fps increase.

[#3880](https://github.com/PCSX2/pcsx2/pull/3880) GSdx: Change DATE accuracy option from a list to a checkbox. By [lightningterror](https://github.com/lightningterror).

For OpenGL it will behave as previously if Full option was selected (more accurate).

For Direct3D10/11 it will behave as previously if Basic option was selected (less accurate).

[#3927](https://github.com/PCSX2/pcsx2/pull/3927) GSdx-ogl: Fix anisotropic filtering on OpenGL. By [lightningterror](https://github.com/lightningterror).

Anisotropic filtering was broken on OpenGL ever since Trilinear filtering was introduced (1.3.1 era), hopefully nobody noticed and we fixed the issue ![Smile](https://pcsx2.net/images/stories/frontend/smilies/smile.gif)

Note that it won't work properly on AMD due to broken driver, issue has been reported and they are working on a fix.

[#3714](https://github.com/PCSX2/pcsx2/pull/3714) GSdx-ogl: Check MinMax for PSConstantBuffer. By [lightningterror](https://github.com/lightningterror).

Fixes Silent Hill 3 character textures.

[#3985](https://github.com/PCSX2/pcsx2/pull/3985) GSdx: Remove some broken buffer width correction code. By [tadanokojin](https://github.com/tadanokojin).

Removes some code that was meant to correct a condition on the GS where 8-bit and 4-bit formats are assigned a buffer width that is not divisible by 2\. Given that the code just forced it to be even (almost certainly not correct) and was some kind of workaround dating back 13 years I'm opting to remove it. If someone can give me an example of a game that is broken without this code I'll look into it again but it seems like a fairly rare condition.

Fixes graphical issues in Galaxy Angel.

List of removed CRC hacks:

[#3908](https://github.com/PCSX2/pcsx2/pull/3908) Star Wars - Force Unleashed. Hack replaced by a gamedb patch since it's not a GSdx issue. By [kozarovv](https://github.com/kozarovv).

[56893a0](https://github.com/PCSX2/pcsx2/commit/56893a07312183a525b5c6f7e1576bb4e3c6a1e4) Removed/merged duplicate hacks for Radiata Stories, Star Ocean 3, and Valkyrie Profile 2\. By [lightningterror](https://github.com/lightningterror).

[d0dd60f](https://github.com/PCSX2/pcsx2/commit/d0dd60f295075a9f8ea98ef539430d0b6031e290) Bleach Blade Battlers. Hack no longer needed, effects rendered properly. By [lightningterror](https://github.com/lightningterror).

[d5adcdd](https://github.com/PCSX2/pcsx2/commit/d5adcdd1b217c4537e50f673a70b3eb5d38c991d) God of War 2\. Hack partially removed because upscaling issues can not be resolved with upscaling hacks. By [lightningterror](https://github.com/lightningterror).

[85c3ee8](https://github.com/PCSX2/pcsx2/commit/85c3ee823fa9d111e2039d6664bc5d63dc21672f) Sly 2 and 3\. Hacks removed, effects emulated properly, upscaling issues can be resolved with upscaling hacks. By [lightningterror](https://github.com/lightningterror).

* * *

# Misc Improvements

[#3531](https://github.com/PCSX2/pcsx2/pull/3531) GUI: Add "Screenshot As..." feature to Capture options. By [xTVaser (Tyler Wilding)](https://github.com/xTVaser).

[#4007](https://github.com/PCSX2/pcsx2/pull/4007) GUI: Fixes speedhacks panel from shrinking when moving the slider, most noticeable when using DPI scaling. By [tadanokojin](https://github.com/tadanokojin).

[#3633](https://github.com/PCSX2/pcsx2/pull/3633) Misc: More Mac build/fixes. By [tellowkrinkle](https://github.com/tellowkrinkle).

[#4044](https://github.com/PCSX2/pcsx2/pull/4044) PAD-Windows: Remove obsolete code related to the output window. By [MrCK1](https://github.com/MrCK1).

* * *

And that's all from us, see you next time in our 2021 Q1 Report!
