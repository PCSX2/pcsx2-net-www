---
title: "Q4 2021 Progress Report"
date: 2022-04-24T00:00:00
summary: "On track with the marriage of speed and accuracy."
draft: false
tags:
  - "progress-report"
mainAuthor: RedDevilus
toc: true
---
## Core Improvements

### DEV9

{{< progress/github-link prNums="4421" title="Convert DEV9 config dialog to wxWidgets" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4933" title="DEV9: Fix Windows config saving/loading" authors="TheLastRar" >}}

{{< progress/github-link prNums="4940" title="DEV9: DNS Logger Crash fix" authors="TheLastRar" >}}

{{< progress/github-link prNums="4960" title="DEV9: Don't shadow return value of GetAdaptersAddresses (Pcap)" authors="TheLastRar" >}}

{{< progress/github-link prNums="5074" title="DEV9: Enable pcap non-blocking" authors="TheLastRar" >}}

### VU

{{< progress/github-link prNums="4901" title="COP2: Simplify reg allocation" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4907" title="Fix unparenthesized macro input" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4910" title="microVU: Use uncached reg when clamping for FMAC instructions" authors="stenzek" >}}

{{< progress/github-link prNums="5048" title="microVU: Preserve XGKIck cycles in delay slot" authors="refractionpcsx2" >}}

### SPU2

{{< progress/github-link prNums="5027" title="SPU: Fix videos in Stolen" authors="Ziemas" >}}

{{< progress/github-link prNums="5183" title="SPU2: Add Cubeb backend, remove Portaudio and SDL2 backends" authors="stenzek" >}}

The current stable (1.6 as of writing) had multiple back-ends namely Xaudio2, DirectSound, PortAudio, WaveOut. DirectSound was being a buggy mess to maintain, WaveOut wasn't much better, PortAudio was fine and Xaudio2 was de facto standard on the Windows side. Now Cubeb replaces PortAudio as it's replacer and keep Xaudio2 as a back-up. Keep in mind in Cubeb the latency slider is ignored as it automatically uses a very low latency automatically based on your system:
Best Case:
(Cubeb) Minimum latency: 10.00 ms (480 audio frames)
Worst Case:
(Cubeb) Minimum latency: 25.00 ms (1200 audio frames)

Xaudio2 can't handle that low latency without bad skipping and warping even on better systems. I hope you guys like the sound. How timeskipping actually works is that you see the first video frame and the sound comes after the targeted sound latency, which for years meant 0.1 seconds delays.

{{< progress/github-link prNums="5238" title="Rename ConfigSoundtouch.cpp to ConfigSoundTouch.cpp" authors="xantares" >}}

### PAD

{{< progress/github-link prNums="4809" title="GUI(linux): Abort 'set all buttons' & fixed window size" authors="JosephLees" >}}

{{< progress/github-link prNums="4985" title="Create a shared pad header, get rid of the originals, and do some cleanup." authors="arcum42" >}}

### USB

{{< progress/github-link prNums="5032" title="USB: Gametrak/RealPlay" authors="Florin9doi" >}}

This Pull Request made the last non-working game work (don't count games like Final Fantasy 11 which were online-only) and looks more like a current Linus Tech Videos about VR with all those wires than a PS2 accessory. I'll stick to my Black Nintendo Wii instead of this seemingly weird copy-cat.

{{< progress/github-link prNums="5184" title="USB: Sony DPP-MP1 printer emulation" authors="Florin9doi" >}}

Most users won't see any usage with this and that is fine but the goal of emulating the endless USB and PAD devices do scare me, here is a small subset of still needing to be emulated: https://github.com/PCSX2/pcsx2/issues/4763


### CDVD

{{< progress/github-link prNums="4839" title="CDVD: Implement correct SpindleCtrl handling" authors="refractionpcsx2" >}}

Fixes some more videos not playing like Digital Devil Saga and fixes texture issues on Shadowman.

{{< progress/github-link prNums="4853" title="CDVD: Fix possible uncaught exception in CheckDiskTypeFS" authors="stenzek" >}}

{{< progress/github-link prNums="4860" title="CDVD: Implement Disc Swapping" authors="refractionpcsx2" >}}

Disc-Swapping has always been a highly requested feature as you have games that have 2 discs to make 1 game where it request please insert disc 2. 

Others that use it as more as an addendum to unlocking more items or a game like Alter Echo which requests to put the original disc back in and correctly reads it. Surprisingly the SingStar series might handle this the best as it can swap songs via disc-swapping and sure there is a button to do disc-swapping but it correctly handles without it.

Though there are quite some games that do not like being ejected while you are playing and okay for some games you can play a bit further because it's stored in memory but when it seeks for new data you are killing the game.

{{< progress/github-link prNums="4871" title="CDVD: Time reads by sectors per second instead of bytes + Some rotational latency" authors="refractionpcsx2" >}}

Another refinement on how the disc emulation handles reading and latencies which again improves the timing which the PS2 so desires.

{{< progress/github-link prNums="4881" title="CDVD: Simulate 1 sector read ahead" authors="refractionpcsx2" >}}

Queues 1 sector from a future read as ready which fixes Star Ocean 3 stuttering and Winning Eleven 8 crashing.

{{< progress/github-link prNums="4913" title="CDVD: Reset VM on sceCdPowerOff writes" authors="F0bes" >}}

Instead of forcefully 'pulling the cord' when you reset or press on a real console once, it will send a signal to reset. So it acts more like how the console worked, though if you see any difference is something else.

{{< progress/github-link prNums="4927" title="CDVD: Buffer up to 16 sectors" authors="refractionpcsx2" >}}

Follows the documentation from developers to improve timing.

{{< progress/github-link prNums="4945" title="input-rec: Use a constant RTC for power-on recordings" authors="xTVaser" >}}

Gives a specific date for input recording (speedrunning).

{{< progress/github-link prNums="4992" title="CDVD: set the correct RTC year when input recording" authors="xTVaser" >}}

Changes how the date is handled for input recording as some games like Metal Gear Solid 3 is sensitive about the date for time-based events. The only comparison I can think of is like the internal battery failure message in Pokemon games if this wasn't done correctly.

{{< progress/github-link prNums="5056" title="CDVD: Adjust DMA timing based on PS1 timings." authors="refractionpcsx2" >}}

The DMA controller that directly accesses the memory with less needing to ask the CPU (EE) wasn't entirely correct but surprisingly didn't break a lot of games but did fix Spongebob Lights, Camera, Pants.

{{< progress/github-link prNums="5142" title="CDVD: Fix some read timing logic" authors="refractionpcsx2" >}}

This will refine the technique for receiving instruction and sending them so that the timing of certain events are handled correctly on time. For example a game like Pro Yakyuu Spirits 5 which does CD Standby and expects it to not be reading.

{{< progress/github-link prNums="5174" title="CDVD: Some Error handling, Status+Ready Flag changes and fix CdStop" authors="refractionpcsx2" >}}

Making sure that the CD/DVD emulation works correctly, there were additions to how the disc sectors were interpreted and handled by expanding the amount of details that it got sent and receive. It fixes certain games spinning eternally in a black screen or seem to just freeze on the spot ranging from Spyro to Aberenbou Princes to Evergrace and more.

{{< progress/github-link prNums="5182" title="CDVD: Check file actually opened before proceeding" authors="stenzek" >}}

### IPU

{{< progress/github-link prNums="5173" title="IPU: Overhaul DMA transfers" authors="refractionpcsx2" >}}

Changes how DMA Transfers are handled for example some games like them to be in a specific order.

Fixes https://github.com/PCSX2/pcsx2/issues/5168 (Top Trumps)
Fixes https://github.com/PCSX2/pcsx2/issues/4063 (Phase Paradox)
Improves the moving billboard quality in Test Drive (Master has corruption)
Fixes video hang in Eggo Mania/Egg Mania - Eggstreme Madess (patch no longer required)
Fixes Smackdown Shut Your Mouth Titantrons.
Fixes Gladiator - Sword of Vengeance videos (patch no longer required) Partial https://github.com/PCSX2/pcsx2/issues/3489
Fixes https://github.com/PCSX2/pcsx2/issues/4360 (Flipnic UFO mission hang)

Also means Mana Khemia and Metal Saga no longer need a gamefix, however I'm leaving it on to be safe, it does no harm.

### Debugger

{{< progress/github-link prNums="4865" title="Debugger: Fix Goto in Disasm option for memory view" authors="F0bes" >}}

{{< progress/github-link prNums="4926" title="Debugger: Support multi-line assembling" authors="F0bes" >}}

{{< progress/github-link prNums="4974" title="Debugger: Initial memory search implementation" authors="F0bes" >}}

Now you can finally go into a search for specific memory instead of scrolling just like in cheat engine.

{{< progress/github-link prNums="4983" title="Debugger: Make the register list DPI aware (Windows)" authors="F0bes" >}}

Fixes the debugger view when having difference in DPI. Pic 3

{{< progress/github-link prNums="5003" title="Debugger: Fix breakpoint edit window on linux" authors="F0bes" >}}

{{< progress/github-link prNums="5016" title="Debugger: Allow access to all of 0xBXXXXXXX" authors="F0bes" >}}

Not sure why certain memory was blocked from being modified, this will alleviate all memory restrictions.

{{< progress/github-link prNums="5031" title="Debugger: Make memory dialog transparent" authors="F0bes" >}}

{{< progress/github-link prNums="5050" title="Debugger: Format search hits with proper specifier" authors="F0bes" >}}

Make sure certain text doesn't hard-crash the search. (Print size_t with %zu instead of %d)

### Input Recording

{{< progress/github-link prNums="5099" title="GameDB / Memcards - Replace `yaml-cpp` with `rapidyaml`" authors="xTVaser" >}}

### Miscellanous Core

{{< progress/github-link prNums="4861" title="Config: Fix folder memory cards initial load" authors="stenzek" >}}

Folder memory cards weren't recognised as a memory card being plugged-in unless you opened the config dialog.

{{< progress/github-link prNums="4914" title="CI: Retain Workflow Artifacts permanently via Github Releases" authors="xTVaser" >}}

This will precompile working versions of the nightlies/dev and future stable versions on GitHub forever instead of only temporary on GitHub.

## GS Improvements

### GS

{{< progress/github-link prNums="3577" title="GS: Merge assembly files in GS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="3642" title="Convert GS Settings dialog to use wxwidgets" authors="arcum42" >}}

{{< progress/github-link prNums="3940" title="GSVertexTrace::FindMinMax improvements" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4094" title="GS-hw: fix Burnout games black sky." authors="iMineLink" >}}

Burnout games weren't emulated correctly due to the texture cache being the biggest pain in the GS side, which you can avoid by switching to the Software renderer and then switching to HW. The game downloaded the texture and then modified it to finally draw it on the CPU side. Now no more shenanigans in having to switch or ignore the sky issue, there is another game that has a similar issue a shooter called 'Black' (A recurring theme that PS2 game title names fit with their badly emulated issues). Black hasn't been fixed yet, perhaps in the future. {{< img-cmp-slider before="./img/Pic5-BurnoutBefore.png" after="./img/Pic6-BurnoutAfter.png">}}

{{< progress/github-link prNums="4346" title="Spin before sleeping threads to reduce thread sleeps/wakes" authors="tellowkrinkle" >}}

Prevents constantly sleeping and waking threads in certain conditions which improves performance in those situations.

{{< progress/github-link prNums="4348" title="Replace cached GSOffset with live calculations" authors="tellowkrinkle" >}}

A normal enduser will probably be scratching his head what this PR brought. Essentially some games like Ultimate Spider-Man and Remote Control Dandy SF (and some others I don't remember) crashed after a few minutes of playing in hardware mode. From what I gathered it didn't flush the memory so even if you had 2TB of RAM you would only delay the inevitable hard-crash and can't expect users to have infinite RAM so just flush the cache when needed.

{{< progress/github-link prNums="4385" title="GS: Simulate scan mask (fix transparency in MGS2 & MGS3)" authors="Sergeanur" >}}

For about forever, transparency didn't work correctly for Metal Gear Solid 3 {{< img-cmp-slider before="./img/Pic1-MGS3Before.png" after="./img/Pic2-MGS3After.png">}} and Gran Turismo 4 Ghost Cars. {{< img-cmp before="./img/Pic3-GT4Before.png" after="./img/Pic4-GT4After.png">}}

{{< progress/github-link prNums="4757" title="Improved stats printout from sw renderer" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4850" title="GS-hw: Don't write clamped depth test value to depth buffer when ZMSK is enabled." authors="lightningterror" >}}

Fixes broken shadows from Kingdom Hearts Re-Chain which produced lines.

{{< progress/github-link prNums="4859" title="GS: Cleanup ini ranges for some values." authors="lightningterror" >}}

{{< progress/github-link prNums="4863" title="GS: Fix OSD, Shade Boost slider values not showing." authors="lightningterror" >}}

{{< progress/github-link prNums="4887" title="gs-tc: propagate texture shuffle format on readback" authors="tadanokojin" >}}

Properly fixes the flashlight in the Silent Hill series:

{{< img-cmp before="./img/Pic19-SilentHillBefore.jpg" after="./img/Pic20-SilentHillAfter.png">}}

{{< progress/github-link prNums="4891" title="GS: Revert be7e1163b4f7e3fe19876462fb26cd082ffb3ab4" authors="lightningterror" >}}

{{< progress/github-link prNums="4906" title="GS: Use stream buffer for vertices/indices/uniforms" authors="stenzek" >}}

This will certainly help AMD GPUs on Windows but it does help NVIDIA GPU users too as the default behavior was to stall (essentialy wait and stop for new instructions) which caused bad performance.

These charts below lists 3 different systems that will give you an easier way to tell how much it could help: 

{{< progress/chart data="./charts/Chart1-4906.json" >}}
{{< progress/chart data="./charts/Chart2-4906.json" >}}
{{< progress/chart data="./charts/Chart3-4906.json" >}}

{{< progress/github-link prNums="4919" title="gs: gsstate (the old gsdx one) cleanup" authors="tadanokojin" >}}

{{< progress/github-link prNums="4941" title="GS: Use custom allocator for SW renderer" authors="tellowkrinkle" >}}

This new behavior improves the software renderer quite drastically in a good way and handles it more specifically in certain situations. I would even state that the sofware renderer has never been this fast even compared to the older stable versions as I always tried to play True Crime NYC and never got full speed in the software renderer and now it's handling it with ease.

{{< progress/github-link prNums="4952" title="GS: Further state cleanup + fixes for older dump compatibility" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4965" title="GS: Let draw happen even if invalid, log invalid draws" authors="refractionpcsx2" >}}

{{< img-cmp-slider before="./img/Pic45-StarOceanBefore.png" after="./img/Pic46-StarOceanAfter.png">}}

{{< progress/github-link prNums="4966" title="GS: Fix up CLUT offset handling in 32bit I8 mode" authors="refractionpcsx2" >}}

This pull request fixes several games with the wrong colors, which depended on the CLUT (Color Look-up table) which basically is a value corresponding to a color palette an example being the RGB values (255, 0, 0) which means full red color but if the game sees a different value it is going to produce another color.

A few examples but not limited to:

{{< img-cmp-slider before="./img/Pic9-HarleyBefore.jpg" after="./img/Pic10-HarleyAfter.jpg">}}
{{< img-cmp-slider before="./img/Pic11-RomanceBefore.jpg" after="./img/Pic12-RomanceAfter.jpg">}}
{{< img-cmp-slider before="./img/Pic13-SanAndreasBefore.jpg" after="./img/Pic14-SanAndreasAfter.jpg">}}}

{{< progress/github-link prNums="4969" title="GS: Don't propagate 24bit textures on download" authors="refractionpcsx2" >}}

{{< img-cmp before="./img/Pic43-ManaKhemiaBefore.png" after="./img/Pic44-ManaKhemiaAfter.png">}}

{{< progress/github-link prNums="4971" title="GS: Redo the Texture min/max opt" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4980" title="Miscellaneous fixes for macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4993" title="GS-ogl: Remove device, driver checks in GLLoader." authors="lightningterror" >}}

{{< progress/github-link prNums="5000" title="GS:SW: Fix fog on x64 avx2" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5006" title="GS: Only reload Auto MIPs on TEX base change" authors="refractionpcsx2" >}}

PCSX2 used to re-new the addresses for textures, but some games rely on re-using the old addresses for textures causing graphical issues due to using the wrong textures with mipmapping enabled.
* It has since been revisited that the draw wasn't being flushed if MTBA updated the MIPS and MTBA on it's own was doing things incorrectly at times.

{{< img-cmp-slider before="./img/Pic39-ParappaBefore.png" after="./img/Pic40-ParappaAfter.png">}}
{{< img-cmp-slider before="./img/Pic41-ApeEscapeBefore.png" after="./img/Pic42-ApeEscapeAfter.png">}}

{{< progress/github-link prNums="5013" title="GS: Fix Half Pixel Offset and Half Screen Fix config swap" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5024" title="GS SW: Handle flat prims without float conversion" authors="refractionpcsx2" >}}

{{< img-cmp-slider before="./img/Pic7-EvangelionBefore.png" after="./img/Pic8-EvangelionAfter.png">}}

{{< progress/github-link prNums="5026" title="GS-gui: Change blending option from None to Minimum." authors="lightningterror" >}}

{{< progress/github-link prNums="5029" title="GS/OpenGL: Use shader+draw for CopyRectConv" authors="stenzek" >}}

{{< progress/chart data="./charts/Chart4-5029.json" >}}

{{< progress/github-link prNums="5035" title="GS: Improve FixedTEX0 accuracy" authors="refractionpcsx2" >}}

The calculation of how to handle texture sizes wasn't perfect and would cause graphical issues when upscaling such as Final Fantasy X.

{{< img-cmp before="./img/Pic37-FFXBefore.png" after="./img/Pic38-FFXAfter.png">}}

{{< progress/github-link prNums="5054" title="Gs-hw: Adjust/minor optimization on sw blend shader a bit" authors="lightningterror" >}}

{{< progress/github-link prNums="5061" title="GS-hw: Improve how we handle AA1 draws" authors="lightningterror" >}}

In the last progress report (Q3 2021) there have been improvements to how Edge Anti-Aliasing works for the software renderer (lines and triangles type), this time the hardware renderer has also been improved for several games such as Doko Demo Issho series, FIFA 2002 and other unknown games. However it has only been fixed on the lines type but not the triangles type which is used a ton for Final Fantasy X. Hopefully in the future we can get feature parity with the software renderer and the issue on hardware renderer is the same but just in higher severity.

{{< img-cmp-slider before="./img/Pic33-DokoHWBefore.png" after="./img/Pic34-DokoHWAfter.png">}}
{{< img-cmp-slider before="./img/Pic35-FIFA2002HWBefore.jpg" after="./img/Pic36-FIFA2002HWAfter.jpg">}}

{{< progress/github-link prNums="5064" title="GS-d3d11: Properly set afix in EmulateBlending." authors="lightningterror" >}}

{{< progress/github-link prNums="5067" title="GS/OpenGL: Use CreateRenderTarget() for temp HDR target" authors="stenzek" >}}

{{< progress/github-link prNums="5072" title="GS-wx: Fix some gui interaction." authors="lightningterror" >}}

{{< progress/github-link prNums="5087" title="GS: Unify HW texture caches" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5088" title="GS-glsl/fx: Split color clamp/wrap in it's own function." authors="lightningterror" >}}

{{< progress/github-link prNums="5098" title="GS Debugger: Fix Length of dump." authors="lightningterror" >}}

{{< progress/github-link prNums="5103" title="GS-hw: Sample depth on green channel" authors="lightningterror" >}}

{{< img-cmp-slider before="./img/Pic21-HitmanBefore.png" after="./img/Pic22-HitmanAfter.png">}}
{{< img-cmp-slider before="./img/Pic23-ImpossibleBefore.png" after="./img/Pic24-ImpossibleAfter.png">}}

{{< progress/github-link prNums="5110" title="GS-hw: Try to use a mix of hw/sw blending in more situations." authors="lightningterror" >}}

This will improve the blending behavior on default settings. Blending affects many things such as the lighting, shadows and more.

{{< img-cmp-slider before="./img/Pic15-ColossusBefore.png" after="./img/Pic16-ColossusAfter.png">}}
{{< img-cmp-slider before="./img/Pic17-MGS2Before.png" after="./img/Pic18-MGS2After.png">}}

{{< progress/github-link prNums="5128" title="GS-ogl: Optimize fragment shader uniform buffer." authors="lightningterror" >}}

{{< progress/github-link prNums="5135" title="GS-hw: Optimize pabe (per pixel alpha blending)" authors="lightningterror" >}}

{{< progress/github-link prNums="5138" title="GS: Replace separate HW renderers with single shared renderer" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5139" title="Fix broken resources" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5154" title="GS: Check CLUT dirty write on vertex kick" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5180" title="GS: Fix looping over pages of textures with massive strides" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5194" title="GS/OpenGL: Add a shader/program cache" authors="stenzek" >}}

{{< progress/github-link prNums="5196" title="GS: Move afix check to high blend level" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5197" title="GS-hw: Fix recent alpha max check." authors="lightningterror" >}}

{{< progress/github-link prNums="5198" title="GS: Unify constant buffers between renderers" authors="stenzek" >}}

{{< progress/github-link prNums="5208" title="GS: Add missing override specifier to a few files" authors="stenzek" >}}

{{< progress/github-link prNums="5213" title="GS-hw: Extend Blend mix to work when alpha is higher than 1." authors="lightningterror" >}}

{{< progress/github-link prNums="5223" title="GS-hw: Mirror anisotropic filtering behavior on Direct3D11 like OpenGL, and allow it to run on Nearest texture filtering" authors="lightningterror" >}}

## Misc Improvements

### GUI

{{< progress/github-link prNums="4451" title="Allow relative elf file paths on command line" authors="Ziemas" >}}

Instead of the absolute path C:/User/Documents/PCSX2/ELF/test.elf, you can do things like ELF/test.elf instead.

{{< progress/github-link prNums="4468" title="ipc: rename to pine" authors="GovanifY" >}}

IPC is a generic name for this function so PINE was chosen as it's replacement. Especially when it's already useful for RPCS3 and other potentially other emulators or programs.

{{< progress/github-link prNums="4867" title="Wx: Fix GS hotkeys losing values after reboot" authors="stenzek" >}}

Makes sure that the hotkeys still retain their function after rebooting.

{{< progress/github-link prNums="4876" title="Fix memory card saving and trace log setting loading/saving" authors="stenzek" >}}

{{< progress/github-link prNums="4882" title="GUI: remove presets 4,5,6" authors="Mrlinkwii" >}}

Preset 4,5,6 (preset 1 is bad too to be fair) were removed as they only brought specific improvements for specific hardware and it wasn't good in most cases anyway as it just did some random EE cyclerate and cycleskip.

{{< progress/github-link prNums="4883" title="GUI : remove EE Cycle Skipping 3" authors="Mrlinkwii" >}}

Since all these major timing changes, this isn't really useful and broke more often than not.

{{< progress/github-link prNums="4888" title="Add the current profile to the status bar." authors="arcum42" >}}

The main window will now say what preset you are using. pic4

{{< progress/github-link prNums="4896" title="GS Debugger: Show \"D3D11 HW\" only on windows." authors="lightningterror" >}}

{{< progress/github-link prNums="4931" title="Core: Few more warnings fixup." authors="lightningterror" >}}

{{< progress/github-link prNums="4975" title="Add \"Clear missing files\" option to recent ISO list" authors="italodirenzo93" >}}

If you moved or renamed your ISOs, you either had to nuke the recently played list, ignore it or set it back how it was before. More granular control on how you want to handle latest games played.

{{< progress/github-link prNums="4986" title="PCSX2-GUI: Fix GUI inconsistencies" authors="RedDevilus" >}}

{{< progress/github-link prNums="4989" title="wx: Fix `pxExplore` on macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5030" title="GUI: Bring back F6 string (Aspect Ratio)" authors="RedDevilus" >}}

Doesn't need much explaining as it was gone by accident to show the keybinding for aspect ratio.

{{< progress/github-link prNums="5220" title="GSDumpDialog: Cache length instead of querying every packet" authors="stenzek" >}}

### GameDB

{{< progress/github-link prNums="4768" title="GameDB: Typo Cleanup" authors="RedDevilus" >}}

{{< progress/github-link prNums="4868" title="GameDB :add 'SingStar ABBA' entry" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4869" title="GameDB :add VU clamping to Monster Rancher 3" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4877" title="GameDB :add missing entry" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4935" title="GameDB:add 'VUKickstart' to 'Maken Shao' games " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4981" title="GameDB: Add and fix SingStar Entries" authors="RedDevilus" >}}

{{< progress/github-link prNums="4984" title="GameDB: Add and fix Power Pros series" authors="Tokman5" >}}

{{< progress/github-link prNums="4991" title="GameDB: add EE clamping to 'Shadow of Zorro' and 'Evil Twin - Cyprien's Chronicles'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5004" title="GameDB: add nearest rounding to 'Hitman - Contracts' and various fixes " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5007" title="GameDB:add 'GIFFIFOHack' to 'Gunfighter 2 - Legend of Jesse James'" authors="Mrlinkwii" >}}

{{< img-cmp-slider before="./img/Pic31-GunfighterBefore.png" after="./img/Pic32-GunfighterAfter.png">}}

{{< progress/github-link prNums="5020" title="GameDB: add  ee-rounding and vu-rounding to various entries" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5023" title="GameDB : add various fixes for various games and remove not needed patches " authors="Mrlinkwii" >}}

{{< img-cmp-slider before="./img/Pic29-OnimushaBefore.png" after="./img/Pic30-OnimushaAfter.png">}}

{{< progress/github-link prNums="5049" title="GameDB : ADD fixes for various games " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5057" title="Gamedb: remove the patch for Virtua Fighter 4" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5058" title="GameDB: purge patches for 'Knockout Kings 2002'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5060" title="GameDB : fix Fuuraiki 2 patch" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5073" title="GameDB: Add fixes for 'Shadow Man - 2econd Coming' and 'Ghosthunter' games." authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5093" title="GameDB: add 'VIFFIFOHack' to 'Men in Black II: Alien Escape'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5097" title="GameDB: add 'VUKickstartHack' to 'Crash Twinsanity'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5106" title="GameDB: add patches to the 'K-1 World' series games add EE clamping full to 'D1 Professional Drift Grand Prix Series'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5114" title="GameDB:add EEclamping full to 'Shinobido Takumi'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5116" title="GameDB: add VU clamping to 'MVP Baseball 2003'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5118" title="GameDB: add EEtiminghack to 'MGS2' and change VU and EE rounding for 'Primal' and add missing entries " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5145" title="GameDB: add patches to the 'Netsu Chu!' series and  'Samurai 7' series" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5148" title="GameDB:add EE clamping to 'Chou Saisoku! Zokusha King B.U.'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5150" title="GameDB: add EEclamping to 'Dark cloud 2'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5153" title="GameDB: add patches to 2k games" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5158" title="Add \"Jikkyou Powerful Pro Yakyuu 2009\" to GameDB" authors="Tokman5" >}}

{{< progress/github-link prNums="5166" title="GameDB: add more 2k games patches" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5172" title="GameDB add gamefixes to 'Titeuf Mega-compet' and patch 'Yamiyo ni Sasayaku - Tantei Sagara Kyouichirou' series" authors="Mrlinkwii" >}}

{{< img-cmp-slider before="./img/Pic27-TiteufBefore.png" after="./img/Pic28-TiteufAfter.png">}}

{{< progress/github-link prNums="5178" title="GameDB: Add EE Clamping to 'Digimon Battle Chronicle' and fixes to other games" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5185" title="GameDB: change VUclamping on \"Sled Storm\"" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5187" title=" GameDB: add VU clamping to \"Ultimate Spider-Man\" and fixes to other games" authors="Mrlinkwii" >}}

The game had wrongly colored eye textures (yellow/blue) but is now correctly white:

{{< img-cmp before="./img/Pic25-UltimateBefore.png" after="./img/Pic26-UltimateAfter.png">}}

{{< progress/github-link prNums="5199" title="Merge the Qt branch: Part 1" authors="stenzek" >}}

The new GUI is moving along very well, but is not at feature parity as the current WX-Widgets GUI is. Please be patient when it will be released to you guys.

{{< progress/github-link prNums="5234" title="GameDB: remove patches for  'Neo Contra' and add EE rounding and clamping" authors="Mrlinkwii" >}}

### Maintenance

{{< progress/github-link prNums="4818" title="Add partial LTO to CMake" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4822" title="EE: Fix JIT exits on 64-bit Windows" authors="stenzek" >}}

{{< progress/github-link prNums="4908" title="Remove 30-day artifact retention on windows builds" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4929" title="Remove GTK dependency on macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4938" title="Fix compilation with LTO on GCC" authors="Ziemas" >}}

{{< progress/github-link prNums="4970" title="actions: create automatic controller db updating workflow" authors="xTVaser" >}}

{{< progress/github-link prNums="4973" title="actions: cleanup discord embed links and add release body" authors="xTVaser" >}}

{{< progress/github-link prNums="4978" title="Create AppRun hook to handle variables" authors="qurious-pixel" >}}

{{< progress/github-link prNums="4982" title="GHActions: Don't shallow clone submodules" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4994" title="actions: increase max linux build times as well until cache-hit rate is reliable" authors="xTVaser" >}}

{{< progress/github-link prNums="4999" title="CMake: Always default `CMAKE_BUILD_PO` off" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5010" title="Update libchdr" authors="orbea" >}}

{{< progress/github-link prNums="5033" title="Update the FAQ, as well as some general cleanup." authors="arcum42" >}}

{{< progress/github-link prNums="5039" title="3rd Party: Update rogue file to correct BSD license" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5040" title="Build: Remove old unused cheatscpp.h file" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5043" title="GitHub: Update and add new issue template for non-game related bug reports" authors="xTVaser" >}}

{{< progress/github-link prNums="5051" title="3rdparty: Upgrade soundtouch lib to 2.3.1" authors="MrCK1" >}}

{{< progress/github-link prNums="5052" title="3rdparty: Upgrade xbyak to 6.00" authors="MrCK1" >}}

{{< progress/github-link prNums="5059" title="actions: Only announce `pre-release` releases" authors="xTVaser" >}}

{{< progress/github-link prNums="5077" title="Fixes to CMake and version upgrade with CMake" authors="kenshen112" >}}

{{< progress/github-link prNums="5083" title="Bump mathieudutour/github-tag-action from 5.6 to 6.0" authors="dependabot" >}}

{{< progress/github-link prNums="5084" title="Bump actions/cache from 2.1.6 to 2.1.7" authors="dependabot" >}}

{{< progress/github-link prNums="5090" title="Readme : update links" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5091" title="GHActions: Fix Mac build" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5100" title="Linux and Windows CMake Builds: Change output executable to lowercase" authors="F0bes" >}}

{{< progress/github-link prNums="5108" title="VS: Add some missing vcxproj filters" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5115" title="Only pass C++ flags to C++ files." authors="arcum42" >}}

{{< progress/github-link prNums="5132" title="Make native builds default on Linux when using build.sh. Remove unused switch." authors="arcum42" >}}

{{< progress/github-link prNums="5152" title="CMake: Remove gio dependency on macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5161" title="VS: Fix location of shaders in project" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5215" title="FreeBSD: fix compilation" authors="shiorid" >}}

{{< progress/github-link prNums="5219" title="GHActions: Fix game controller db updater" authors="tellowkrinkle" >}}

### Other

{{< progress/github-link prNums="4843" title="PGIF: Remove force fifo clear on GP1 (00-01)" authors="null" >}}

{{< progress/github-link prNums="4856" title="Common/StringHelpers: Fix printing of 64-bit pointers" authors="stenzek" >}}

{{< progress/github-link prNums="4890" title="IOP Recompiler: Fix BIOS trace logging on 64bit" authors="Ziemas" >}}

{{< progress/github-link prNums="4900" title="Common: Fix AT&T mixup in FastJmp code" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4920" title="Config: Fix zoom/stretch options not updating on Apply" authors="stenzek" >}}

{{< progress/github-link prNums="4972" title="EE JIT: Backup shift on LDR/L if rs==rt" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4979" title="CI:Add build date to program log of nightly builds" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4997" title="Debugger: Reset breakpoint skip on savestate load" authors="F0bes" >}}

{{< progress/github-link prNums="5001" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5019" title="VSProps: Set MultiProcessorCompilation in CodeGen props" authors="stenzek" >}}

{{< progress/github-link prNums="5037" title="GIF: Modify fifo read behaviour" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5141" title="EERec: Remove zero-distance jmp in full fpu mode" authors="stenzek" >}}

{{< progress/github-link prNums="5164" title="Common: Fix GetWorkingDirectory on unix" authors="tellowkrinkle" >}}

### Ambiguous

{{< progress/github-link prNums="4140" title="Remove wxString ↔︎ std::string implicit conversions" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4709" title="GS Include Cleanup" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4747" title="Savestates: Small refactoring" authors="MrCK1" >}}

{{< progress/github-link prNums="4786" title="Remove configuration coupling to GUI" authors="stenzek" >}}
{{< progress/github-link prNums="4855" title="Fix some compile warnings spewed by MSVC x64" authors="stenzek" >}}

{{< progress/github-link prNums="4872" title="FreeBSD fixup" authors="tadanokojin" >}}

{{< progress/github-link prNums="4885" title="Debugger: Separate symbol maps for EE and IOP" authors="Ziemas" >}}

{{< progress/github-link prNums="4905" title="Replace GSWnd with GL context wrappers, remove pDsp" authors="stenzek" >}}

{{< progress/github-link prNums="4917" title="Savestates: Add missing things from Savestates" authors="refractionpcsx2" >}}

Makes savestates more robust by giving more information so as to lessen the chance of breaking the game.

{{< progress/github-link prNums="4943" title="Misc: Fix more warnings." authors="lightningterror" >}}

{{< progress/github-link prNums="5134" title="Rebase more de-wx-ifying from last month" authors="stenzek" >}}

## Metadata

Q4 2021:
(dev1838 to dev2185) (2021-10-01 - 2021-12-31) 
