---
title: "PCSX2 1.6.0 Is Out!"
date: 2020-05-07T00:00:00
summary: "Huge thanks to everyone that helped get this release ready, over 4 years in the making"
draft: false
tags:
  - "progress-report"
mainAuthor: bositman
aliases:
  - "/293-pcsx2-1-6-0-is-out"
  - "/293-pcsx2-1-6-0-is-out.html"
  - "/293-pcsx2-1-6-0-is-out.htm"
---

Huge thanks to everyone that helped get this release ready, over 4 years
in the making.

The PCSX2 Dev Team wishes everyone happy emulation with the new release.

The below is a list of highlights, see each respective progress report.

At present we only have the new [Windows Installer and Binary
available](/download/releases/windows.html) however Linux users can
compile from source by following [this
guide](https://github.com/PCSX2/pcsx2/wiki/Installing-on-Linux) .

## Q3,Q4 2019 - Q1 2020 Changes

Q3-Q4 2019, Q1 2010 progress report highlights, read the full report
[here](/blog/2020/q3-2019-to-q1-2020/)

**GSdx changelog:**

GSdx-HW:Improve search/invalidate texture in render target by correctly
matching vertex offsetted draws with buffer offsetted reads in the
texture cache.

GSdx-HW:Implemented Software Sprite Renderer feature which allows to CPU
emulate (SSE accelerated) certain sprite draws directly from the HW
renderer.

GSdx-HW:Added a dedicated fix for Big Mutha Truckers which allows to
render the shadows properly. This also allowed us to reduce the crc hack
level so there are less effects skipped.

GSdx-HW:Sprite Hack has been completely removed as it is no longer
needed and is replaced by far better alternatives.

GSdx-FX:The TFX shader on Direct3D10/11 has been rewritten to match
OpenGL code and its' accuracy for certain effects.

GSdx-D3D:Blend no Barrier support has been ported from OpenGL to
Direct3D 10/11.

GSdx-GUI: Hardware hacks GUI has been updated for better usability.

**SPU2-X changelog:**

Fixed the noise generator outputting 4.8 kHz tone instead of white
noise.

**CDVD changelog:**

PCSX2 now ignores non-existent disc sector reads.

**Core changelog:**

PCSX2: Prevent the UI from hanging/locking up when a game boots.

PCSX2-tas: TAS Recording functionality has been disabled for 1.6 release
as there are some issues to work out (such as hanging/locking up the
emulator).

PCSX2: DI execution is delayed by one instruction.

PCSX2:Reverted back to older VRender/VBlank timings.

PCSX2: Partially fixed IPU pack command.

PCSX2:Fixed the emulator hanging when pressing F4 too fast when toggling
the Frame Limiter in some occasions.

PCSX2:Fixed the emulator hanging when pressing F9 to toggle rendering
between Hardware and Software in some occasions.

PCSX2: Fixed the emulator hanging when pressing F9 to toggle rendering
between Hardware and Software mode too fast.

PCSX2:First Time Wizard now properly selects the correct GSdx plugin
based on the highest instruction set supported by the CPU.

PCSX2: Improved pointer patch command handling.

**PCSX2 GUI changelog:**

PCSX2: DPI scaling has been improved.

PCSX2: Translations have been updated for the release of 1.6.

**Miscellaneous changelog:**

GameDB:True Crime: Streets of L.A. (patched).

GameDB: The database has been once again updated with the inclusion of
many games with required gamefixes, as well as removal of gamefixes
which are no longer needed.

## Q2 2018-Q2 2019 Changes

Q2 2018 - Q2 2019 progress Report highlights, read the full report
[here](/blog/2019/from-q2-2018-to-q2-2019/)

**GSdx changelog:**

GSdx-HW: Fix half-bottom screen issues on texture/color shuffling.

GSdx-TC: Palette management rework.

Gsdx-HW: implement fixed TEX0 for all renderers.

GSdx: OSD improvements and port to Direct3D10/11.

GSdx: Accurate Date update and partial port to Direct3D10/11.

GSdx-GL: Bypass the texture cache when the framebuffer is sampled.

GSdx-GL: Experimental Sparse Texture support.

GSdx-D3D: Improved palette support has been ported from OpenGL to
Direct3D10/11.

GSdx-D3D: GPU accelerate 8 bits texture conversion port from OpenGL to
Direct3D10/11.

GSdx-D3D: Depth Emulation port to Direct3D10/11.

GSdx-D3D: Channel shuffle port to Direct3D10/11.

GSdx-D3D: HDR Colclip blend port to Direct3D10/11.

GSdx-D3D: Accurate Blend Fbmask port to Direct3D10/11.

GSdx-D3D: Partial SW blending port to Direct3D10/11.

GSdx-D3D: Alpha hack has been removed completely, replaced with Blending
Accuracy option.

GSdx-HW: Removal of MSAA support in favor of better optimizations and
accuracy.

GSdx-HW: Removal of Direct3D9 renderer in favor of better optimizations
and accuracy.

GSdx-HW: Removal of many no longer needed hacks.

GSdx-HW: Add Skipdraw Offset option for Skipdraw hack.

GSdx-GUI: GUI update to improve usability.

**Core changelog:**

PCSX2-TAS: Input Recording/Playback Functionality (speedrunning tools).

Vector Units: Fix bug in "Branch in Delay Slot" Optimization.

Recompiler: Fix stall in branch delay slot.

PCSX2: Improved GameDB handling.

VIF: A VIF core update has been made to fixDowntown Run.

Gif Unit: Recheck VIF status after a reset is performed when waiting for
PATH3 (Fixes Eragon).

**PCSX2 GUI changelog:**

PCSX2: "FMV Aspect Ratio Switch/Override" feature.

PCSX2: Save/Load slot improvements, allow to display slot dates.

**SPU2-X changelog:**

SPU2-X-GUI: The gui has been updated to improve usability.

## Q1 2018 Changes

Q1 2018 progress report hightlights, read the full report
[here](/blog/2018/q1-2018-progress-report/)

**GSdx changelog:**

GSdx-TC: Performance improvement by using custom container.

GSdx-TC: Load size calculation in target update.

GSdx: Texture Shuffle port to Direct3D.

GSdx: Channel Shuffle improvements on Direct3D

GSdx: Hack removal/adjustments.

**Core changelog:**

PCSX2-Counters: Fix Hblank calculation for DVD video modes.

**PCSX2 GUI changelog:**

PCSX2: Add configurable Cheats folder to Components Selectors.

PCSX2: Display the video mode on titlebar.

**Miscellaneous changelog:**

Plugins: XPad and USBqemu have been moved to the legacy plugins VS
solution.

General: Code cleanup.

Gamedb: Game database has been updated with many new gamefixes included.

## Q3-Q4 2017 Changes

Q3 & Q4 2017 progress report hightlights, read the full report
[here](/blog/2018/q3-q4-2017-progress-report/)

**GSdx changelog:**

GSdx-d3d11: Extend "Preload Frame Data" support to Direct3D.

GSdx: Add Frame Buffer Conversion option.

GSdx: Automatic mipmapping option.

**Core changelog:**

PCSX2: PSX Memory card support.

PCSX2: Always ask when booting option.

PCSX2: Adaptive Sync support.

PCSX2: Restore "Defaults" option to GS Panel.

PCSX2: Clear ISO list option.

**PCSX2 GUI changelog:**

PCSX2: Many translations have been updated.

## Q1-Q2 2017 Changes

Q1 2017 progress report highlights, read the full report
[here](/blog/2017/q1-2017-progress-report/)

Q2 2017 progress report highlights, read the full report
[here](/blog/2017/q2-2017-progress-report/)

GSdx changelog:

GSdx: Support for dumping GS Dumps in xz format.

GSdx-OpenGL: Reduce Geometry shader overhead.

GSdx-HW: Revamped buffer size calculation for custom resolutions.

GSdx: OSD (On Screen Display) feature.

GSdx: Texture cache speed optimization.

GSdx: Software renderer thread synchronization fix.

GSdx:Improved software renderer float handling.

GSdx: Removal of SSSE3 and AVX configurations.

GSdx: Workarounds for AMD buggy OpenGL driver.

GSdx (Windows): Fix for slow software rendering with Skylake CPUs.

**Core changelog:**

PCSX2: Fix command-line options.

PCSX2-Counters: Proper tracking of scalar limit.

VIF: Unpack speed optimizations.

Vector Units (VU0): Fix CFC2 transfers from TPC register.

**LilyPad and OnePad changelog:**

LilyPad and OnePad changelog:

LilyPad: neGcon controller support.

LilyPad: UI Changes/enhancements.

LilyPad: Core improvements, better controller handling.

Onepad: Update to use SDL2.

**Miscellaneous changelog:**

CMake: Blacklist GCC 7.0/7.1 versions.

## Q3-Q4 2016 Changes

Q3 2016 progress report hightlights, read the full report
[here](/blog/2016/q3-2016-progress-report/)

Q4 2016 progress report hightlights, read the full report
[here](/blog/2017/q4-2016-progress-report/)

**GSdx changelog:**

GSdx: Hardware mipmapping support.

GSdx-TC: Proper scaling of all textures.

GSdx: Handling illegal 8 bits pixel storage format.

GSdx-PCRTC: Feedback write support.

GSdx-glsl: Optimize number of active constant buffers in the shader.

GSdx: Avoid illegal instruction crash on older CPUs.

GSdx: Alpha test improvements.

GSdx: Proper custom resolution scaling.

**Core changelog:**

PCSX2: PSX mode compatibility.

PCSX2:PSX mode, proper video mode initialization.

PCSX2: Improved patch handling.

PCSX2: Accurate video mode detection.

**LilyPad and Onepad changelog:**

LilyPad: Add separate bindings for each pad type.

LilyPad: Add PlayStation Mouse support.

LilyPad: Updated user interface.

LilyPad: Add dance pad support and revamped Lilypad dialog.

OnePad: General improvements on accuracy.

**CDVD changelog:**

cdvdgigaherz: Linux port.

**Miscellaneous changelog:**

PCSX2: FreeBSD support.

Linux: Support Vsync on Linux free driver.

Windows: Remove DirectX redistributable dependency on Windows 8.1/10.

## Q1-Q2 2016 Changes

January - February 2016 progress report hightlights, read the full
report [here](/blog/2016/january-february-2016-progress-report/)

Q2 2016 progress report hightlights, read the full report
[here](/blog/2016/q2-2016-progress-report/)

**GSdx changelog:**

GSdx: Fast texture invalidation option.

GSdx: Improved detection of Framebuffer size.

GSdx: Enable reading of Depth Buffer.

GSdx: Improved PCRTC merge circuit emulation.

GSdx-GL: Fast accurate blending.

GSdx-GL: Depth buffer lookup optimization.

GSdx-FX: Post-Processing updates.

GSdx: Proper handling of 576P/720P/1080I video modes.

**Core changelog:**

PCSX2:Automatic aspect ratio switch during FMV playback.

VIF: Timing fix for MSCALF, MSCNT instructions.

Vector Units: Scarface I bit gamefix.

**CDVD changelog:**

CDVDgigaherz: Fixed dual layer DVD reading.

CDVD: Improved ISO layer break detection algorithm.

**Lilypad and Onepad changelog:**

LilyPad: Add Pop'n Music controller support.

Onepad: GUI redesign.

**Miscellaneous changelog:**

PCSX2: GUI Improvements.

PCSX2: PCSX2-Auto test suite.
