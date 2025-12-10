---
title: "Performance Issues"
summary: "This page details causes of and potential solutions to performance issues."
draft: false
toc: true
sidebar_position: 2
---

This page details causes of and potential solutions to performance issues.

## It works but it's slow?

This is the most common problem that users experience. PCSX2 is a very hardware intensive program as with any emulators in general, especially on your processor.

:::caution
It is highly recommended you read the first post of this thread: [Will PCSX2 run fast on my computer?](https://forums.pcsx2.net/Thread-Sticky-Will-PCSX2-run-fast-on-my-computer) or refer to the [Requirements page](../setup/requirements.md) and if you still have questions reply to the thread or in the Discord, there are many helpful members who can help with your performance issue.
:::

## Enable OSD to measure performance bottleneck

Whenever you're reporting a perfomance issues, please post a screenshot of the performance counters in the PCSX2 On Screen Display (OSD).

### Where do I enable the counters?

`Settings > Graphics > OSD`

### What boxes do I tick?

For best results, please tick all the boxes. This will add a lot of things to the screen, but you can turn them back off once we are done looking at the performance statistics.

### Why do you need this?

These numbers help us identify where performance bottlenecks are in your system. If you are having performance issues, please make sure you screenshot the numbers while the game is running poorly.

<Image src={require("./img/OSD.webp").default} />

## OSD Legends

The OSD contains a lot of acronyms and abbreviations which can be confusing to understand, so here is a list of ones which are available.

### Statistic Metrics

The statistics shows all kind of reports in regards to PCSX2's internal performance reporting. Usually located on the top right.

:::info
These metrics is crucial in identifying performance bottlenecks in PCSX2.
:::

#### Hardware Mode

<Image src={require("./img/OSD_HW.webp").default} />

```ini
=== Line 1 ===
FPS     = Games Internal FPS
VPS     = Video Output FPS
Speed   = Games Running Speed (in Percentage)
T       = Games Target Speed (in Percentage)

=== Line 2 ===
PRIM    = Primitives
DRW     = GS (PS2) Draws
DRWC    = Draw Calls (on host GPU side)
BAR     = Barriers
RP      = Render Passes
RB      = Readbacks
TC      = Texture Copies
TU      = Texture Uploads

=== Line 3 ===
VRAM    = Used VRAM
TGT     = Targets
SRC     = Sources
HC      = Hash Cache size
PL      = Pooled
```

:::tip

You can rank the severity in order of:

```sh
<Worst>

[RB]    Readbacks
[TU]    Uploads
[TC]    Copies
[B]     Barrier (AMD)
[RP]    Render Passes
[B]     Barrier (NVIDIA)
[D]     Draws

<Least worst>
```

**The more they are for each of them, the more that the performance will be impacted.**
:::

#### Software Mode

<Image src={require("./img/OSD_SW.webp").default} />

```ini
SYNP     = Syncs
PRIM     = Polygons
DRW      = Draws
SWIZ     = Texture Swizzling (for storing data in the correct format in GS memory)
UNSWIZ   = Texture DeSwizzling (for reading textures out of GS memory)
Mpps     = Million pixels per second
```

### Settings indicator

This indicator shows the settings that are applied on the current VM session, usually located on the bottom right.
When there are applied patches, additional indicator of how many that are loaded will be shown.

<Image src={require("./img/OSD_Settings.webp").default} />

```ini

DB      = Patches loaded from GameDB Compatibility Patches
P       = Patches that are loaded by the user
C       = Cheats that are loaded by the user

==============================================================

CR      = EE Cycle Rate
CS      = EE Cycle Skip
FCDVD   = Fast CDVD Enabled
IVU     = Instant VU1 Enabled
MTVU    = Multi-Threaded VU1 Enabled
VSYNC   = VSync
EER     = EE FPU Rounding Mode
EEC     = EE FPU Clamping Mode
VUR     = VU Rounding Mode
VUC     = VU Clamping Mode
VQS     = VSync Queue Size
IR      = Upscale Multiplier/Internal Resolution
B       = Accurate Blending Unit
PL      = Texture Preloading
PT      = GPU Palette Conversion
DL      = Hardware Download Mode
MM      = Hardware Mipmapping
BF      = Bilinear Filtering
TF      = Trilinear Filtering
AF      = Anisotropic Filtering
DI      = Dithering
HPO     = Half-Pixel Offset
RS      = Round Sprite
NS      = Native Scaling
TCO     = Texture Offsets
CSBW    = CPU Sprite Render BW
CCLUT   = Software CLUT Render
GCLUT   = GPU Target CLUT
SD      = Skip Draw
TexRT   = Texture Inside RT (Render Target)
BLU     = Bilinear Dirty Upscale
FESP    = Force Even Sprite Position
NPD     = Native Palette Draw
MS      = Merge Sprite
AS      = Align Sprite
ATFL    = Auto Flush
FBC     = Framebuffer Conversion
FTC     = Read Targets When Closing
DDC     = Disable Depth Conversion
DPIV    = Disable Partial Source Invalidation
DSF     = Disable Safe Features
DRF     = Disable Render Fixes
PLFD    = Preload Frame Data
ETR     = Estimate Texture Region
RBSG    = Spin GPU During Readbacks
RBSC    = Spin CPU During Readbacks
```

## Consistently low or unstable FPS

:::tip
Before proceeding with troubleshooting performance issues, please make sure that your computer is up for the task and at the very least meets the minimum system requirements!
:::

### Windows power plan

:::tip
PCSX2 recommends all computers to be plugged-in at all times and on the high performance (or similar) power plan.
:::

You can find this setting in the control panel. This will ensure PCSX2 can utilise it's full potential. For laptops being unplugged this would mean an internal battery saving mode. Alternatively it's possible you have a slider when you click on the battery icon which you can just drag to the right till high performance mode.

<Image src={require("./img/powerplan.webp").default} />

### NVIDIA WhisperMode

If you consistently gets low FPS (around 40 FPS at most) and are using a laptop with an NVIDIA GPU, it could very well be caused by NVIDIA's WhisperMode.

:::info
WhisperMode basically just caps the FPS of your game to certain amount in order to save battery power.
:::

#### How can i disable it?

For more information about WhisperMode and how to disable it, please refer to [this article](https://www.nvidia.com/en-us/geforce/news/nvidia-geforce-gtx-whispermode-for-laptops/) by NVIDIA.

<Image src={require("./img/whispermode.webp").default} />

### USB devices are slow

Do not put your games on a USB device! USB devices are built to handle mass storage and bulk transfers. However, small and fast transfers will naturally have latency as the USB bus enters and exits a sleep state.

#### What does this mean for PCSX2

PCSX2 accesses ISO files by simply mirroring the PS2's disc access on to the ISO. This means small and fast transfers against the ISO. Due to the latency of each read, this in turn will have substantial speed penalties to the emulator, and it is strongly recommended to store ISOs on SATA or M.2 drives instead.
