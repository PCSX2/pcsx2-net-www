---
title: "Q1 2022 Progress Report"
date: 2022-10-17T00:00:00
summary: "Train of Qt."
draft: false
tags:
  - "progress-report"
mainAuthor: RedDevilus
toc: true
---
## Introduction

## Core Improvements

### CDVD

{{< progress/github-link prNums="5230" title="CDVD: Implement speed register, fix up SpindleCtrl" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5283" title="CDVD: Adjust error timing and modify error used for high sector." authors="refractionpcsx2" >}}

{{< progress/github-link shas="c5ae4a69579aabe6e17283df6bcb4962d9209cbb" title="CDVD: If you abort, actually abort." authors="refractionpcsx2" >}}

{{< progress/github-link shas="fb5e5cc13fde626368a4180ca4e76c80da76ad1b" title="CDVD: Don't delay abort commands on DVDs, at least for now..Fixes #5301" authors="refractionpcsx2" >}}

{{< progress/github-link shas="4194553450846e549d7be9a4e7a9f4f5b6e52d2f" title="CDVD: Centralise cdvd.Ready updates + add MECHA_INIT bit" authors="refractionpcsx2" >}}

### VU

{{< progress/github-link prNums="5374" title="VU: Adjust path for conditional evil blocks" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5391" title="mVU: Rework multiple branch chaining" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5571" title="EE/MicroVU: Elide COP2 flag updates where safe-ish" authors="stenzek" >}}

{{< progress/github-link prNums="5572" title="VU: Run sync ahead on small blocks & Rework VU Kickstart" authors="refractionpcsx2" >}}

### SPU2

{{< progress/github-link prNums="5533" title="SPU2: Don't cap pitch setting on register write." authors="Ziemas" >}}

{{< progress/github-link prNums="5768" title="Qt: Reduce max SPU - Change Speed Preset" authors="RedDevilus" >}}

### PAD

{{< progress/github-link prNums="5086" title="Switch to SDL_GameControllerRumble for rumble" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5335" title="PAD: Clean up the remains of the old logging code from when this was Onepad." authors="arcum42" >}}

### USB

{{< progress/github-link prNums="5232" title="Fix some gcc warnings." authors="arcum42" >}}

{{< progress/github-link prNums="5382" title="USB: CaptureEye/OV511p webcam emulation" authors="Florin9doi" >}}

### DEV9

{{< progress/github-link prNums="5336" title="DEV9: Check for null ifa_addr in PCAPGetIfAdapter" authors="TheLastRar" >}}

{{< progress/github-link prNums="5501" title="DEV9: Merge settings file into Pcsx2Config" authors="TheLastRar" >}}

{{< progress/github-link prNums="5649" title="DEV9: Qt Settings Panel" authors="TheLastRar" >}}

{{< progress/github-link prNums="4944" title="DEV9: Add a socket based backend for DEV9 networking" authors="TheLastRar" >}}

### IPU

{{< progress/github-link prNums="5270" title="IPU: Fix software renderer FMV hack without AR change" authors="stenzek" >}}

{{< progress/github-link prNums="5380" title="IPU DMA: If no underflow occurs on QWC = 0, end DMA." authors="refractionpcsx2" >}}

### Debugger

{{< progress/github-link prNums="5466" title="Debugger: add register name patterns" authors="Tokman5" >}}

{{< progress/github-link prNums="5365" title="Debugger & Core: Lighten IOP breakpoints and fix the memory search" authors="F0bes" >}}

### Miscellanous Core

{{< progress/github-link prNums="5248" title="VTLB: Fix ppmap allocation in 64-bit" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5531" title="Core: Export recompiler offsets" authors="F0bes" >}}

{{< progress/github-link prNums="5725" title="Misc: Cleanup leftover 32bit code" authors="lightningterror" >}}

## GS Improvements

### GS

{{< progress/github-link prNums="5076" title="GS: Add dedicated functions for choosing renderers and adapters" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5245" title="GS: fix loopPagesWithBreak last iteration logic." authors="iMineLink" >}}

{{< progress/github-link prNums="5229" title="GS-d3d11: Enable amd broken point sampler hack only for amd." authors="lightningterror" >}}

{{< progress/github-link prNums="5109" title="GS-hw: Improve DATE selection" authors="lightningterror" >}}

{{< progress/github-link prNums="5224" title="GS: Add a Vulkan renderer" authors="stenzek" >}}

{{< progress/github-link prNums="5292" title="GS/DX11: Implement merge feedback write" authors="stenzek" >}}

{{< progress/github-link prNums="5278" title="GS-hw: Rename DATE_GL42 DATE_GL45." authors="lightningterror" >}}

{{< progress/github-link prNums="5290" title="GS: More mipmapping fixes" authors="stenzek" >}}

{{< progress/github-link prNums="5284" title="GS-hw: Move PABE shader bit to the top of sw blending." authors="lightningterror" >}}

{{< progress/github-link prNums="5313" title=" GS-wx: Fix d3d11 blend option, update tooltips" authors="lightningterror" >}}

{{< progress/github-link prNums="5277" title="GS-hw: Don't enable blending when only alpha is written." authors="lightningterror" >}}

{{< progress/github-link prNums="5249" title="GS:SW: Fix crash when scanline count wasn't divisible by thread count" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5302" title="GS: Don't apply offset when using SLBG" authors="MrCK1" >}}

{{< progress/github-link prNums="5304" title="GS: Support wrapping off-the-end offsets in new GSOffset" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5293" title="GS/DX11: Add a shader cache" authors="stenzek" >}}

{{< progress/github-link prNums="5281" title="GS: use xxHash to hash palettes." authors="iMineLink" >}}

{{< progress/github-link prNums="5291" title="GS: Faster texture preloading" authors="stenzek" >}}

{{< progress/github-link prNums="5346" title="GS: optimize xxHash usage in palette hashing." authors="iMineLink" >}}

{{< progress/github-link prNums="5282" title="GS: improve targets clearing" authors="iMineLink" >}}

{{< progress/github-link prNums="5360" title="GS/Vulkan: Fix combining DATE/barriers with HDR" authors="stenzek" >}}

{{< progress/github-link prNums="5353" title="GS-hw: Implement BLEND CD." authors="lightningterror" >}}

{{< progress/github-link prNums="5189" title="GS-hw: More blend work" authors="lightningterror" >}}

{{< progress/github-link prNums="5373" title="GS: Fix alpha blend factor clamping" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5371" title="GS: Force Blend TFF when scanmsk is used on the frame" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5359" title="GS: Misc fixes from refactoring/Vulkan renderer" authors="stenzek" >}}

{{< progress/github-link prNums="5285" title="GS: fully support target rescaling in TC." authors="iMineLink" >}}

{{< progress/github-link prNums="5389" title="GS-hw: Implement alternative hw blending for Cd*As, Cd*F." authors="lightningterror" >}}

{{< progress/github-link prNums="5377" title="GS: Only autoflush on move/self blend (Perf test)" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5404" title="Revert \"GS: fully support target rescaling in TC.\"" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5395" title="GS: Adjust auto interlace mode with scanmask(frame)" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5412" title="GS-wx: Add extra check for shader options when VK is selected" authors="F0bes" >}}

{{< progress/github-link prNums="5411" title="GS-hw: Implement alternative hw blending for Cs*Ad, Cs*Ad + Cd, Cd - Cs*Ad" authors="lightningterror" >}}

{{< progress/github-link prNums="5417" title="GS-hw: Properly disable skipdraw when userhacks are disabled." authors="lightningterror" >}}

{{< progress/github-link prNums="3895" title="GS-hw, TC: improve tex in rt." authors="iMineLink" >}}

{{< progress/github-link prNums="5400" title="GS: Prefer one-frame-old textures" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5422" title="GS: Get rid of extra binding for channel shuffle" authors="stenzek" >}}

{{< progress/github-link prNums="5433" title="GS: fix overlap check in hw tc." authors="iMineLink" >}}

{{< progress/github-link prNums="4922" title="Various GSDumpGUI Improvements" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5436" title="Revert GS-hw: Exclude triangles from no prim overlap fb read on dx11." authors="lightningterror" >}}

{{< progress/github-link prNums="5387" title="GS: Enable small framebuffers at 1x" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5446" title="GS: Fix region repeat bounds checking for zero crossings" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5447" title="GS/HW: Don't disable depth testing for channel shuffle" authors="stenzek" >}}

{{< progress/github-link prNums="5419" title="GS: target rescaling take 2." authors="iMineLink" >}}

{{< progress/github-link prNums="5448" title="GS/Vulkan: Buffer flag changes, HostDisplay cleanup" authors="stenzek" >}}

{{< progress/github-link prNums="4683" title="Various GSBlock shuffle improvements" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5454" title="GS: Reset/restore API state when changing OSD scale" authors="stenzek" >}}

{{< progress/github-link prNums="5453" title="GS/Vulkan: Use fence counter for upload cmdbuffer selection " authors="stenzek" >}}

{{< progress/github-link prNums="5455" title="GS/DX11: Fix binding depth as tex + fbmask" authors="stenzek" >}}

{{< progress/github-link prNums="5452" title="GS-hw: Implement hw, hw/sw, sw blending on Ad when alpha write is masked, and more optimizations" authors="lightningterror" >}}

{{< progress/github-link prNums="5462" title="GS: Add depth copy convert shader" authors="stenzek" >}}

{{< progress/github-link prNums="5468" title="GS/Vulkan: Fix HDR resolve to cleared target" authors="stenzek" >}}

{{< progress/github-link prNums="5469" title="GS-hw: Optimize fbmask on 16bit format." authors="lightningterror" >}}

{{< progress/github-link prNums="5471" title="GS-hw: Properly enable/disable each channel based on fbmask, adjust fbmask detection when to do blending for 16bit/24bit." authors="lightningterror" >}}

{{< progress/github-link prNums="5474" title="Gran Turismo 4 [PlayStation 2 Racing Pack]" authors="s-andro" >}}

{{< progress/github-link prNums="5475" title="Disallow CLUT load condition processing on invalid format" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5483" title="GS:HW: Fix scale of color → 8 bit converted textures" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5487" title="GS-hw-tc: Remove JackieChanAdv crc hack." authors="lightningterror" >}}

{{< progress/github-link prNums="5489" title="GS-hw: Cleanup crc stuff." authors="lightningterror" >}}

{{< progress/github-link prNums="5493" title="GS: update target pitch on frame lookup." authors="iMineLink" >}}

{{< progress/github-link prNums="5495" title="GS: update target pitch on write." authors="iMineLink" >}}

{{< progress/github-link prNums="5515" title="GS-hw: Prefer sw blend when one barrier is already enabled and prims don't overlap." authors="lightningterror" >}}

{{< progress/github-link prNums="5540" title="GS-hw: Don't wrap on 16bit destination format for blend mix." authors="lightningterror" >}}

{{< progress/github-link prNums="5523" title="GS-hw: Prefer sw blend for clr_blend1_2 on ultra blending." authors="lightningterror" >}}

{{< progress/github-link prNums="5543" title="GS-hw: Partially revert #5540" authors="lightningterror" >}}

{{< progress/github-link prNums="5546" title="GS-ogl: Remove GL_ARB_get_texture_sub_image." authors="lightningterror" >}}

{{< progress/github-link prNums="5550" title="GS-hw: Disable dithering if blend mix is enabled." authors="lightningterror" >}}

{{< progress/github-link prNums="5545" title="GS: Add hash based texture cache" authors="stenzek" >}}

{{< progress/github-link prNums="5562" title="GS/TextureCache: Fix target not getting invalidated in some cases" authors="stenzek" >}}

{{< progress/github-link prNums="5563" title="GS: Add option to disable status indicators" authors="stenzek" >}}

{{< progress/github-link prNums="5557" title="GS-hw: Don't trigger no overlap check for DATE_BARRIER on d3d11." authors="lightningterror" >}}

{{< progress/github-link prNums="5565" title="PCSX2-GUI: Rename Interlacing to Deinterlacing" authors="RedDevilus" >}}

{{< progress/github-link prNums="5477" title="GS: Remove upscaling dependency on PCTRC enabling." authors="iMineLink" >}}

{{< progress/github-link prNums="5547" title="GS: Add texture dumping and replacement system" authors="stenzek" >}}

{{< progress/github-link prNums="5569" title="GS: Ignore 24bit on DATE and Handle Reversed Color and Z" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5574" title="GS: Texture replacement fixes" authors="stenzek" >}}

{{< progress/github-link prNums="5582" title="GS/TextureCache: Don't let hash cache memusage go negative" authors="stenzek" >}}

{{< progress/github-link prNums="5551" title="GS:OGL: Don't memset C++ objects" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5541" title="GS-hw: Fix some warnings." authors="lightningterror" >}}

{{< progress/github-link prNums="5580" title="GS: Handle Auto Flush across pages + improve performance" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5600" title="GS-hw: Optimize blending when ALPHA.A is equal to ALPHA.B." authors="lightningterror" >}}

{{< progress/github-link prNums="5610" title="GS-hw: Improve how we handle blending when output is Cd." authors="lightningterror" >}}

{{< progress/github-link prNums="5623" title="GS/WX: Fix default adapter causing unnecessary GS restarts" authors="stenzek" >}}

{{< progress/github-link prNums="5613" title="GS-hw: Move the Ad to As equation swap when alpha is masked to Basic blend level and higher on gl/vk." authors="lightningterror" >}}

{{< progress/github-link prNums="5617" title="GS: Add Auto Flush for Z buffer draws" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5608" title="GS/Vulkan: Elide render pass restarts on depth buffer toggle" authors="stenzek" >}}

{{< progress/github-link prNums="5601" title="GS: Support local to local transfers that overwrite themselves" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5628" title="GS-hw: Attempt to improve half screen detection" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5593" title="GameDatabase: Automatic GS hardware fixes" authors="stenzek" >}}

{{< progress/github-link prNums="5612" title="GS: Improvements to MTBA Mip Mapping" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5638" title="GS-Build: Fix Dump Verticles for linux" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5646" title="GS/VertexTrace: Fix min/max when last provoking vertex unsupported" authors="stenzek" >}}

{{< progress/github-link prNums="5634" title="Qt: Implement GS dump playback" authors="stenzek" >}}

{{< progress/github-link prNums="5653" title="GS: Loosen requirement for half bottom" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5654" title="GS: Adjust Auto Flush to catch edge cases" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5554" title="GS-hw: Optimize blending equations based on alpha value." authors="lightningterror" >}}

{{< progress/github-link prNums="5679" title="GS: Fix Wunused-variable warnings." authors="lightningterror" >}}

{{< progress/github-link prNums="5675" title="GS: Add SW CPU usage and host GPU usage stats" authors="stenzek" >}}

{{< progress/github-link prNums="5684" title="GUI: Rename Fast Texture Invalidation" authors="JordanTheToaster" >}}

{{< progress/github-link prNums="5687" title="GS:SW: Fix LOD on x64" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5700" title="GS/DX11: Fix incorrect format check for compressed textures" authors="stenzek" >}}

{{< progress/github-link prNums="5697" title="PCSX2-GUI: Rename skipdraw and IDC for Partial Invalidation" authors="RedDevilus" >}}

{{< progress/github-link prNums="5711" title="Misc: Fix incorrect printf of std::string_view" authors="stenzek" >}}

{{< progress/github-link prNums="5625" title="GS: Properly detect 16bit format on Texture Shuffle + Convert" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5718" title="GS: Use pixel format mask for FBMSK checks" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5630" title="GS: Utilize framebuffer fetch for blending/fbmask where available" authors="stenzek" >}}

{{< progress/github-link prNums="5723" title="GS: Fix inverted dsb check" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5728" title="GS/Vulkan: Fix crash is vertex/index buffer causes exec" authors="stenzek" >}}

{{< progress/github-link prNums="5727" title="GS: Fix some edge cases with fbfetch" authors="stenzek" >}}

{{< progress/github-link prNums="5764" title="GS/HW: Fix fbmask not inserting barriers" authors="stenzek" >}}

{{< progress/github-link prNums="5766" title="GS/Vulkan: Implement FXAA and Shadeboost" authors="stenzek" >}}

{{< progress/github-link shas="35d516e140d9b1e6a2a604f1afefc2f416553714" title="GS: Fix GetRecommendedCRCHackLevel for Vulkan.Issue #5312" authors="lightningterror" >}}

## Misc Improvements

### GUI

{{< progress/github-link prNums="5147" title="ProgramLog: Comment out deleted keymapping" authors="RedDevilus" >}}

{{< progress/github-link prNums="5268" title="GSDump: Fix renderer override" authors="stenzek" >}}

{{< progress/github-link prNums="5310" title="GUI: Make aspect ratio/frame limiter OSD messages keyed" authors="CookiePLMonster" >}}

{{< progress/github-link prNums="5327" title="GUI: Convert Power plan name to UTF-8" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5363" title="Qt Part 4" authors="stenzek" >}}

{{< progress/github-link prNums="5439" title="Qt: Enable SDL2 input source for Qt" authors="stenzek" >}}

{{< progress/github-link prNums="5441" title="Qt: Add save state loading/loaded/saved events" authors="stenzek" >}}

{{< progress/github-link prNums="5289" title="GS: Better support of dpi scaling" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5151" title="Resource file cleanup" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5461" title="Qt: Fix type table sizing + spaces" authors="RedDevilus" >}}

{{< progress/github-link prNums="5464" title="Qt: More sizing + improve hotkeys code" authors="RedDevilus" >}}

{{< progress/github-link prNums="5478" title="Qt: Misc graphics settings fixes" authors="stenzek" >}}

{{< progress/github-link prNums="5473" title="Qt: Resize Windows + Change Framerate Presets + Lower OSD time" authors="RedDevilus" >}}

{{< progress/github-link prNums="5485" title="Fix some vsync related issues, implement Vulkan adaptive vsync" authors="stenzek" >}}

{{< progress/github-link prNums="5508" title="Add icon for Cn BIOS" authors="Florin9doi" >}}

{{< progress/github-link prNums="5535" title="QT: Add icon for Hk BIOS." authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5532" title="Qt: Add per game settings UI" authors="stenzek" >}}

{{< progress/github-link prNums="5553" title="Qt: Fix type on graphics panel" authors="seta-san" >}}

{{< progress/github-link prNums="5537" title="Qt: Resize default headersize BIOS + Adding 4 new themes" authors="RedDevilus" >}}

{{< progress/github-link prNums="5560" title="Qt: Fix qt compilation on linux." authors="arcum42" >}}

{{< progress/github-link prNums="4445" title="cli: Extended argument support" authors="AKuHAK" >}}

{{< progress/github-link prNums="5140" title="Pad: Fix connection of macOS GameController framework controllers" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5587" title="WX: Make texture dump location configurable" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5598" title="Qt: Assorted cleanups/add debug log options" authors="stenzek" >}}

{{< progress/github-link prNums="5607" title="Qt: Fix live changing game settings not applying" authors="stenzek" >}}

{{< progress/github-link prNums="5605" title="GUI: Log graphics driver info on startup" authors="stenzek" >}}

{{< progress/github-link prNums="5696" title="Qt: Partial Invalidation" authors="RedDevilus" >}}

{{< progress/github-link prNums="5692" title="Qt: Fix bugs relating to per-game settings" authors="TheLastRar" >}}

{{< progress/github-link prNums="5736" title="Qt: Misc fixes" authors="stenzek" >}}

{{< progress/github-link prNums="5735" title="GUI/Docs : update compatibility URLs" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5752" title="Qt: GS Settings Fixes" authors="TheLastRar" >}}

{{< progress/github-link prNums="5757" title="Qt: Implement BIOS check and shutdown hotkey" authors="stenzek" >}}

{{< progress/github-link prNums="5762" title="Qt: Add missing null terminator in audio settings" authors="stenzek" >}}

{{< progress/github-link prNums="5763" title="Qt: Few fixes for Linux" authors="stenzek" >}}

### GameDB

{{< progress/github-link prNums="5266" title="GameDB: Add VU Kickstart Hack to Dark Cloud 2/Dark Chronicle" authors="trostboot" >}}

{{< progress/github-link prNums="5236" title="GameDB: GameDB: Removal of some patches and adding some fixes" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5276" title="GameDB: add patches to Koukaku Kidoutai and fixes for other games" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5294" title="GameDB: add some missing serials" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5295" title="GameDB: fix  some entries" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5297" title="Gamedb: add gamefix to  Cocoto Funfair" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5321" title="GameDB: add patch to MX Unleashed Migrated and missing serials " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5332" title="GameDB:  add EETiming to 'Kya: Dark Lineage'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5338" title="GameDB: Add eeRoundMode to Teen Titans & Scaler and fixes to other games" authors="icup321" >}}

{{< progress/github-link prNums="5341" title="GameDB: add VUKickstartHack to Ghosthunter" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5358" title="GameDB: add 'SkipMPEGHack'  to \"David Beckham Soccer\"" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5378" title="GameDB: add fixes for Simple Series vol.7 and other games" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5393" title="GameDB: remove EETimingHack  from 'Paris-Dakar 2'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5428" title="GameDB: add 'EETimingHack' to 'Indiana Jones and the Emperor's Tomb'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5450" title="GameDB: add eerounding to 'Neopets - The Darkest Faerie'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5443" title="GameDB: Urban Reign" authors="RedDevilus" >}}

{{< progress/github-link prNums="5460" title="GameDB: Beatmania entries" authors="RedDevilus" >}}

{{< progress/github-link prNums="5490" title="GameDB: Add missing PAL games to GameIndex Correct AFL Football serial" authors="Florin9doi" >}}

{{< progress/github-link prNums="5491" title="GameDB: Add missing NTSC-J games" authors="Florin9doi" >}}

{{< progress/github-link prNums="5463" title="GameDB: Fix Bemani game titles" authors="987123879113" >}}

{{< progress/github-link prNums="5506" title="GameDB: disable mVUFlagHack for Maken Shao" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5498" title="GameDB: Add missing Gran Turismo demos" authors="Blackbird88" >}}

{{< progress/github-link prNums="5520" title="GameDB: add EETimingHack to 'Obscure 2' and patch to 'Snoopy Vs Red Baron'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5527" title="GameDB: add 'VUKickstartHack' to 'Jet Li - Rise to Honor'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5585" title="GameDB: add 'VUSyncHack' to 'Tiger Woods PGA Tour 2002' and update documentation" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5590" title="GameDB: add patch for Cars" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5621" title="GameDB: Katamari games" authors="RedDevilus" >}}

{{< progress/github-link prNums="5616" title="GameDB: add VU clamping to 'DT Racer' and update MGS2 hack" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5635" title="GameDB: Added a whole host of auto GS HW renderer fixes" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5636" title="GameDB: Transformers Armada: Prelude to Energon" authors="RedDevilus" >}}

{{< progress/github-link prNums="5640" title="GameDB: Metal Arms - Glitch in the System (PAL)" authors="Dreadmoth" >}}

{{< progress/github-link prNums="5643" title="GameDB: Auto GS HW renderer fixes for some NAMCO games" authors="SaltyBet" >}}

{{< progress/github-link prNums="5650" title="GameDB: Documentation" authors="RedDevilus" >}}

{{< progress/github-link prNums="5655" title="GameDB: correct and update serials" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5657" title="GameDB: Upscaling GS Batch 1" authors="RedDevilus" >}}

{{< progress/github-link prNums="5658" title="GameDB: Rogue Galaxy" authors="RedDevilus" >}}

{{< progress/github-link prNums="5659" title="GameDB: Add gsHWFixes for Shutokou Battle 01." authors="Tokman5" >}}

{{< progress/github-link prNums="5652" title="GameDB: GS HW renderer fixes for Tales of the Abyss" authors="Tzerinas" >}}

{{< progress/github-link prNums="5667" title="GameDB: Add Software FMV to Grandia 2 and Xtreme" authors="Tzerinas" >}}

{{< progress/github-link prNums="5665" title="GameDB: Add Upscaling Fixes to Onimusha 3" authors="Tzerinas" >}}

{{< progress/github-link prNums="5664" title="GameDB: Upscaling GS Batch 2" authors="RedDevilus" >}}

{{< progress/github-link prNums="5662" title="GameDB: Add gsHWFixes for GTA LCS/VCS" authors="Blackbird88" >}}

{{< progress/github-link prNums="5671" title="GameDB: Dog Island and COD Final Fronts" authors="RedDevilus" >}}

{{< progress/github-link prNums="5673" title="GameDB: Ace Combat + Soul Calibur + Metal Gear Solid Series" authors="RedDevilus" >}}

{{< progress/github-link prNums="5678" title="GameDB: Add a bunch of hw fixes and upscaling fixes" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5680" title="GameDB: More GS HW Fixes" authors="RedDevilus" >}}

{{< progress/github-link prNums="5681" title="GameDB: Add gsHWFixes for Tales of Symphonia" authors="seta-san" >}}

{{< progress/github-link prNums="5683" title="GameDB: Add DMABusy fix to Shining Wind" authors="KrossX" >}}

{{< progress/github-link prNums="5685" title="GameDB: Haunting Ground + 50 Cent and Level 5" authors="RedDevilus" >}}

{{< progress/github-link prNums="5689" title="GameDB: HW fixes for Rockman X8" authors="Immersion95" >}}

{{< progress/github-link prNums="5691" title="GameDB: Rename fastTextureInvalidation" authors="JordanTheToaster" >}}

{{< progress/github-link prNums="5694" title="GameDB: HW fixes for Mega Man/Rockman X7 + Clamping mode fix" authors="Immersion95" >}}

{{< progress/github-link prNums="5701" title="GameDB: remove  no longer needed comments" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5705" title="GameDB: Add fixes for Tak Games" authors="Tzerinas" >}}

{{< progress/github-link prNums="5702" title="GameDB: Add GS HW fixes for Wild Arms Alter Code F" authors="RafaelTrepaUnCarballo" >}}

{{< progress/github-link prNums="5712" title="GameDB: Even more GS HW Fixes" authors="RedDevilus" >}}

{{< progress/github-link prNums="5719" title="GameDB: Remove VU rounding form 'Hitman - Contracts'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5720" title="GameDB: adds 'VUSyncHack' to Panzer Elite Action - Fields of Glory" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5722" title="GameDB: add missing serials" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5724" title="GameDB: GS HW Batch X" authors="RedDevilus" >}}

{{< progress/github-link prNums="5732" title="GameDB: Fixes to TeamICO games." authors="Tzerinas" >}}

{{< progress/github-link prNums="5731" title="GameDB: Fix Midnightclub 3 + Add Evangelion Jo" authors="RedDevilus" >}}

{{< progress/github-link prNums="5737" title="GameDB: Fix 'SLES-54453' title" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5738" title="GameDB: add 'VUSyncHack' to Totally Spies! Totally Party" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5742" title="GameDB: Remove outdated comments" authors="RedDevilus" >}}

{{< progress/github-link prNums="5744" title="GameDB: Megaman + Nicktoons" authors="RedDevilus" >}}

{{< progress/github-link prNums="5745" title="GameDB: GS HW Fix XI" authors="RedDevilus" >}}

{{< progress/github-link prNums="5747" title="GameDB : various game improvements" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5785" title="GameDB:  ':' to '-' + GS and other fixes" authors="RedDevilus" >}}

{{< progress/github-link prNums="5787" title="GameDB: Corrected GSHW Fixes for Radiata Stories" authors="Tzerinas" >}}

{{< progress/github-link prNums="5784" title="GameDB : Atelier Marie + Elie: Salburg no Renkinjutsushi 1&2" authors="darkxex" >}}

{{< progress/github-link prNums="5790" title="GameDB: Silent Hill Origins" authors="RedDevilus" >}}

{{< progress/github-link prNums="5794" title="GameDB: Add Zwei AutoFix" authors="knight-ryu12" >}}

{{< progress/github-link prNums="5793" title="GameDB: Fixes for Tomb Raider Games" authors="Tzerinas" >}}

{{< progress/github-link prNums="5795" title="GameDB: Caspian" authors="RedDevilus" >}}

{{< progress/github-link shas="f1576eeb3270e3fe6cb4620651171c4946f25c16" title="GameDB: Patch for Midnight Club 2 T-Bit" authors="refractionpcsx2" >}}

{{< progress/github-link shas="91ac0368e34b4ab5a63ecef0c97caf19eea08b34" title="GameDB: Add Ratchet & Clank demo and Spider-Man 3 Fixes + several new entries as well as the removal of the virtual-on Ontario program fixes.This commit fixes several entries from the GameIndex, removes the clamping fixes from Virtual On ontario program which wasn't needed, adds several rounding fixes to Ratchet 1 titles to fix the Hydrodisplacer Behaviour and adds several entries as well.For Ratchet 1, After having done tests on actual hardware,the results shows that even real hardware will behave badly on the retail version....However, the demo does indeed have an issue, so let's fix that.Also, this fixes an oversight made for Spiderman 3 in the past, now the proper fix is applied."  >}}

{{< progress/github-link shas="76e25cb7389f127d18049c73010b77e583b0c77b" title="GameDB: Add mipmapping/trilinear for Hot Shots/Everybody's Golf games" authors="refractionpcsx2" >}}

{{< progress/github-link shas="3535edcfa15955cb860e43898d66219481408b0d" title="GameDB: Add partial preloading to Stolen" authors="refractionpcsx2" >}}

{{< progress/github-link shas="8e42fce0aad41582a0d5aa7b636d838322ab7078" title="GameDB: Add alignSprite to GOW 2.Fixes water vertical lines." authors="lightningterror" >}}

{{< progress/github-link shas="6a8cffe615bc2d7d7584cd13642a90876a9d77e8" title="GameDB: Correct Kessen 2 Korean patch" authors="refractionpcsx2" >}}

{{< progress/github-link shas="3e7d32c807c26c14ac649e4442e6b719eb3975da" title="GameDB: Give slightly clearer message for GS Fix override" authors="refractionpcsx2" >}}

### Maintenance

{{< progress/github-link prNums="5256" title="3rdparty: Remove freetype" authors="stenzek" >}}

{{< progress/github-link prNums="5255" title="gitignore: update gs debug gl filename." authors="iMineLink" >}}

{{< progress/github-link prNums="5264" title="3rdparty: Add Vulkan Memory Allocator" authors="stenzek" >}}

{{< progress/github-link prNums="5265" title="3rdparty: Add xxhash.h" authors="stenzek" >}}

{{< progress/github-link prNums="5271" title="CMake: Pass -fsanitize=address as a link option when USE_ASAN is used" authors="F0bes" >}}

{{< progress/github-link prNums="5279" title="vcxproj: Add vulkan shaders and group shaders in renderer category." authors="lightningterror" >}}

{{< progress/github-link prNums="5370" title="Build: Use git tag for file version on windows, attempt 2" authors="TheLastRar" >}}

{{< progress/github-link prNums="5423" title="Bump node-fetch from 2.6.5 to 2.6.7 in /.github/workflows/scripts/releases/generate-release-notes" authors="dependabot" >}}

{{< progress/github-link prNums="5424" title="Bump node-fetch from 2.6.5 to 2.6.7 in /.github/workflows/scripts/releases/upload-release-artifacts" authors="dependabot" >}}

{{< progress/github-link prNums="5425" title="Bump node-fetch from 2.6.5 to 2.6.7 in /.github/workflows/scripts/releases/announce-release" authors="dependabot" >}}

{{< progress/github-link prNums="5385" title="CMake: Prevent people from doing in-tree builds" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5440" title="CI: Build Qt binaries on Windows" authors="stenzek" >}}

{{< progress/github-link prNums="5449" title="Readme: add note about Vulkan drivers" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5456" title="CI: Automatically label Qt" authors="RedDevilus" >}}

{{< progress/github-link prNums="5457" title="cmake: copy resources in build folder." authors="iMineLink" >}}

{{< progress/github-link prNums="5509" title="CI: Label Qt into GUI/Qt" authors="RedDevilus" >}}

{{< progress/github-link prNums="5510" title="CMake: add back HarfBuzz to fix build" authors="SupervisedThinking" >}}

{{< progress/github-link prNums="5521" title="actions: Add windows category for SDL" authors="RedDevilus" >}}

{{< progress/github-link prNums="5573" title="Bump actions/setup-node from 2 to 3" authors="dependabot" >}}

{{< progress/github-link prNums="5519" title="Disable warnings on several third party libraries." authors="arcum42" >}}

{{< progress/github-link prNums="5603" title="Bump actions/checkout from 2 to 3" authors="dependabot" >}}

{{< progress/github-link prNums="5642" title="Docs : Add  GS hardware fixes and MTVUSpeedHack" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5130" title="CI - Remove 32bit Builds" authors="xTVaser" >}}

{{< progress/github-link prNums="5699" title="deps: update `rapid-yaml` to `v0.4.1`" authors="xTVaser" >}}

{{< progress/github-link prNums="5704" title="CI: Update labeler to expand WX" authors="RedDevilus" >}}

{{< progress/github-link prNums="5713" title="Build: Remove cross compiling from build.sh." authors="arcum42" >}}

{{< progress/github-link prNums="5774" title="Bump actions/cache from 2.1.7 to 3" authors="dependabot" >}}

{{< progress/github-link prNums="5773" title="Bump peter-evans/create-pull-request from 3 to 4" authors="dependabot" >}}

### Other

{{< progress/github-link prNums="5259" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5269" title="SysThreadBase: Fix double init of SPU2 etc" authors="stenzek" >}}

{{< progress/github-link prNums="5309" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5324" title="GIF: Separate GIF Reset and GIF DMA Reset" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5351" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5252" title="R5900: Use unsigned math for add/sub instructions" authors="stenzek" >}}

{{< progress/github-link prNums="5355" title="Build: Use git tag for the file version on windows" authors="TheLastRar" >}}

{{< progress/github-link prNums="5401" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5438" title="InputManager/XInput: Fix inverted/incorrect axes" authors="stenzek" >}}

{{< progress/github-link prNums="5442" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5356" title="memcard: Fix folder memory card regressions" authors="xTVaser" >}}

{{< progress/github-link prNums="5482" title="GS: remove bw equality check in tex in rt." authors="iMineLink" >}}

{{< progress/github-link prNums="5499" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5514" title="GS-hw: Apply clamp/wrap when FBMask enabled" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5480" title="COP2: Move COP2 timing messages to release builds." authors="F0bes" >}}

{{< progress/github-link prNums="5516" title="GS-hw: Increase 32->16bit conversion accuracy" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5526" title="pad-windows/unix: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5518" title="GS-HW: Use integers for depth conversion shaders" authors="stenzek" >}}

{{< progress/github-link prNums="5552" title="GS/Vulkan: Fix warning when compiling RGBA8->RGB5A1 shader" authors="stenzek" >}}

{{< progress/github-link prNums="5542" title="Core: remove not needed logging" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5555" title="pad-windows/unix: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5576" title="PAD: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5579" title="GS:Mac: Fix Vulkan init" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5594" title="EE/JIT: Flush const on LDL/LDR instructions" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5606" title="VMManager: Fix brief unpause before shutdown" authors="stenzek" >}}

{{< progress/github-link prNums="5609" title="PAD: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5622" title="Filesystem: Properly convert stat return to bool." authors="Ziemas" >}}

{{< progress/github-link prNums="5618" title="DEV9: Merged confg fixes" authors="TheLastRar" >}}

{{< progress/github-link prNums="5629" title="x86emitter: Fix x64 8-bit rmw codegen" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5633" title="Gif_Unit: Vectorize analyzeTag()" authors="stenzek" >}}

{{< progress/github-link prNums="5651" title="PAD: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5717" title="Build: Remove 32bit configs from vsprops" authors="stenzek" >}}

{{< progress/github-link prNums="5729" title="PAD: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5739" title="GSDumpReplayer: Fix ReadFIFO2 packet executing on wrong thread" authors="stenzek" >}}

{{< progress/github-link prNums="5759" title="Qt: Implement automatic controller mapping" authors="stenzek" >}}

{{< progress/github-link prNums="5775" title="PAD: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5767" title="ShaderCache: Don't delete cache when running 2 instances (D3D11/VK)" authors="stenzek" >}}

### Ambiguous

{{< progress/github-link prNums="5221" title="Merge the Qt branch: Part 2" authors="stenzek" >}}

{{< progress/github-link shas="86309bd837c4cabadeda49564c76282413b0523f" title="GS SW: Adjust order SW is destroyed, fixes GS Dump crash" authors="refractionpcsx2" >}}

{{< progress/github-link shas="3951e15446f165605b38acb43dd9fa896628d0b6" title="VIF: If Force break + Reset requested, Reset gets priorityFixes #5275" authors="refractionpcsx2" >}}

{{< progress/github-link shas="96bc6807ae3d123fd509d589784258da329e24e4" title="github: auto labeler: Add GS Vulkan label." authors="lightningterror" >}}

{{< progress/github-link shas="a95250cabb2ab257ef6130cad51fe3f592a4f6f5" title="GS-hw: Purge WildArms4 and WildArms5 crc hacks.Issue got resolved before 1.6 release." authors="lightningterror" >}}

{{< progress/github-link shas="73732bfb2986b58fcf7d0df7184566c14d8cbb48" title="GS-hw: Add/remove crc ids.Add CRCs for (almost) all versions of R&C, WOC, & J&D.Remove all non-retail crc versions.Re-add Crash 4 version CRC, it's retail actually.Original PR #4535Close #4535" authors="icup321" >}}

{{< progress/github-link shas="ca9ab100e519b0cabfd80d025eec6c8d30a289ea" title="GS-hw: Add crc ids for Ape Escape 2.Sp, De, It, Fr versions." authors="lightningterror" >}}

{{< progress/github-link shas="6ab69e5c1ce00e129fb32c294596bf54829af47b" title="GS-hw: dbg: Fix blend debug logs." authors="lightningterror" >}}

{{< progress/github-link shas="d6293ab081971b69c42b32db4f79856dc9bcd5f4" title="Revert \"Build: Use git tag for file version on windows\"This reverts commit 7f2a9f680664d6d3d6659611f88b6dd921c98c87." authors="tellowkrinkle" >}}

{{< progress/github-link shas="ab2365b475b23c848a1337fd73034e15e87ac377" title="GS-hw: Disable BLEND CD when full barrier is already enabled." authors="lightningterror" >}}

{{< progress/github-link prNums="5361" title="Qt Part 3" authors="stenzek" >}}

{{< progress/github-link shas="93af9656d0fd62df4816f5d5ef1fe91ab16ac3bd" title="GS-hw: Fix clr 1 case shader.Forgot to rename." authors="lightningterror" >}}

{{< progress/github-link shas="c9216e56258c9eb5c3c577d4bc5bf4e0afe61a65" title="GS-hw: Remove useless shader line from CLR As/Af case." authors="lightningterror" >}}

{{< progress/github-link shas="ca55d861874b95959bd84a2f14b7e86303d63794" title="GS-hw: Exclude triangles from no prim overlap fb read on dx11.Fixes mgs3 regression on ultra blending." authors="lightningterror" >}}

{{< progress/github-link shas="d8ca9b5f39fc74c3816b3228eb57386ca65480fc" title="GS-hw: Replace depth +bilinear assert with log, also do some cost, fix some logs.Assert was annoying when debugging, being hit too often." authors="lightningterror" >}}

{{< progress/github-link shas="9d4364176546a19992f405e9b8f0cba737252e4e" title="Build-QT: Fix error in VS Project" authors="refractionpcsx2" >}}

{{< progress/github-link shas="11b467e45545fec121535bd78df89eee4b2acc9e" title="QT: Remove 32bit build targets (which don't exist)Use a separate environment varible for our QT folder to save conflicts" authors="refractionpcsx2" >}}

{{< progress/github-link shas="105aab0345a629100d13b15a4760392bed42801f" title="QT-SDL: Fix SDL Input compilation" authors="refractionpcsx2" >}}

{{< progress/github-link shas="cdae16992210d577bc0a482c645b47bc8c5dad9e" title="GS: Add Point Pallete SW Render for 120-en no HaruFixes #5211" authors="refractionpcsx2" >}}

{{< progress/github-link shas="6085c5bf011804520354d07d153d937136f5b8ae" title="GS-hw: Enable Ad to As blend swap when it detects barrier(fbmask) on d3d11..Allow to run it on basic level, fb is already read so there is no extra cost and is more accurate." authors="lightningterror" >}}

{{< progress/github-link shas="3bdb1f85506dc893afcfa0dc64d7fe1b93c50658" title="GS-hw: No PABE for hw clr_blend1_2 optimization.Will require sw blend." authors="lightningterror" >}}

{{< progress/github-link shas="ee4f498a136c541cf28d196fc8c80e1bb3054467" title="GS-hw: Re add alpha c check for clr_blend1_2.Removed it by accident, nobody saw nothing." authors="lightningterror" >}}

{{< progress/github-link shas="ae4733c59d8d17ec9e7ffac8bc0243e745c2c40c" title="GS-hw: Purge LordOfTheRingsThirdAge crc hack.Shadows are now rendered correctly on all renderers." authors="lightningterror" >}}

{{< progress/github-link shas="d6d420b1f7a8a47e30cc5f5d2e6fe6455132d552" title="QT: Add missing Texture Inside RT option." authors="lightningterror" >}}

{{< progress/github-link prNums="5459" title="Make Xcode Happy" authors="MaddTheSane" >}}

{{< progress/github-link shas="1a3d77b2c0c6b57313f0dceaf5ecc3f8cb453497" title="GS-hw: Fix d3d11 depth sample shader.Also adjust some comments to match updated shader names." authors="lightningterror" >}}

{{< progress/github-link shas="cd5ce6e1625bc82598cf43c065ba0ee3a0427261" title="GH-workflows: Remove os mentions for auto pad db update.Not needed anymore." authors="lightningterror" >}}

{{< progress/github-link shas="753da789a0f788d64a68f7f037c8dab332875f7b" title="GS-hw: Adjust DATE selection.Remove fbmask check from DATE,Enable DATE_BARRIER with one barrier when alpha isn't written and there is no alpha test." authors="lightningterror" >}}

{{< progress/github-link shas="9ce2405f3fa47650ab88f7500467b55690d27b5f" title="GUI/Qt: Fix loading ELF files from menu" authors="refractionpcsx2" >}}

{{< progress/github-link shas="c81c89d6d98b14468fb2858924afdcc248ba0e8b" title="GUI/Qt: Fix startup project for debugger" authors="refractionpcsx2" >}}

{{< progress/github-link shas="bd1f5d08883e93a200d3eab3c33133c63debc629" title="GS: Adjust Tekken 5 CRC hack for fire effect, fixes sun bleed.Fixes #2766" authors="refractionpcsx2" >}}

{{< progress/github-link shas="4a634ca154b07faf59625ba698846fb94800f4ea" title="GS: Fix compilation of GS SW Int Rasterizer" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4932" title="MTVU: Try to make T-Bit more reliable + Add MTVU option to GameDB" authors="refractionpcsx2" >}}

{{< progress/github-link shas="c65ccaa15308738a09739d9bb2c2b10316128f58" title="GS-Config: Clear missing manual GS fixes" authors="refractionpcsx2" >}}

{{< progress/github-link shas="a546f61ea86f2ccc28a1f4677cc5999c77db7d69" title="Qt: Fix Round sprite hack not applying." authors="lightningterror" >}}

{{< progress/github-link shas="13cc0caed7719316cf3c1631d2cd296f38c7c34a" title="GS Debugger: Fix hw hacks behavior not properly disabling." authors="lightningterror" >}}

{{< progress/github-link shas="939d98d6600cf77797e45da7a088f4209d2f0ac2" title="Qt: Allow skipdraw up to 10k max." authors="lightningterror" >}}

{{< progress/github-link prNums="5707" title="Build: Remove 32bit code from project" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5706" title="Core: Remove unused code" authors="MrCK1" >}}

{{< progress/github-link prNums="5714" title="Core: Remove memcmp_mmx." authors="arcum42" >}}

{{< progress/github-link shas="2fedecb809b8690a67acf32543bbb3b608d63585" title="GS-hw: Purge Evangelion crc hack.It's broken, HPO special does the job.Someone should add it to the hw gamefixes." authors="lightningterror" >}}

{{< progress/github-link shas="efc17f265c8a02a1e88bb218bedf2723c77f0fb6" title="readme: Update to reflect recent drop of 32bit." authors="lightningterror" >}}

{{< progress/github-link shas="d89daa1b25c3cf219a10c1ec04ac736ea96dc7cc" title="misc: A few more 32bit cleanups." authors="lightningterror" >}}

{{< progress/github-link prNums="5756" title="Qt: Implement (partial) audio settings and memory card settings" authors="stenzek" >}}

{{< progress/github-link shas="a7900b342ea825e81804c1bb6d77c20571ee9cb2" title="GS-hw: Purge GodOfWar 1 and 2 crc hacks.Not needed, can be solved with upscaling hw hacks, and gs db fixes are a thing." authors="lightningterror" >}}

## Metadata

See you in Q2 2022.

Q1 2022:
(dev2186 to dev2548) (2022-01-01 - 2022-03-31)