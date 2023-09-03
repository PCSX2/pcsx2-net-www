---
title: "Performance Issues"
date: 2023-08-02
summary: "Steps on how to diagnose performance bottlenecks in PCSX2"
draft: false
toc: true
sidebar_position: 2
---

## It works but it's slow?

This is the most common problem that users experience. PCSX2 is a very hardware intensive program as with any emulators in general, especially on your processor.

:::info
It is highly recommended you read the first post of this thread: [Will PCSX2 run fast on my computer?](https://forums.pcsx2.net/Thread-Sticky-Will-PCSX2-run-fast-on-my-computer) or refer to the [Requirements page](../usage/setup/requirements.md) and if you still have questions reply to the thread or in the Discord, there are many helpful members who can help with your performance issue.
:::

## Enable OSD to measure performance bottleneck

Whenever you're reporting a perfomance issues, please post a screenshot of the performance counters in the PCSX2 On Screen Display (OSD).

### Where do I enable the counters?

`Settings > Graphics > OSD`

### What boxes do I tick?

For best results, please tick all the boxes. This will add a lot of things to the screen, but you can turn them back off once we are done looking at the performance statistics.

### Why do you need this?

These numbers help us identify where performance bottlenecks are in your system. If you are having performance issues, please make sure you screenshot the numbers while the game is running poorly.

<Image cols={12} src={require("./img/OSD.webp").default} />

## OSD Legends

The OSD contains a lot of acronyms and abbreviations which can be confusing to understand, so here is a list of ones which are available.

### Statistic Metrics

The statistics shows all kind of reports in regards to PCSX2's internal performance reporting. Usually located on the top right.

:::tip
These metrics is crucial in identifying performance bottlenecks in PCSX2.
:::

#### Hardware Mode

<Image cols={8} src={require("./img/OSD_HW.webp").default} />

```ini
=== Line 1 ===
G       = Games Internal FPS
V       = Video Output FPS
N%      = Games running speed (in Percentage)

=== Line 2 ===
P       = Primitives
D       = GS (PS2) Draws
DC      = Draw Calls (on host GPU side)
B       = Barriers
RP      = Render Passes
RB      = Readbacks
TC      = Texture Copies
TU      = Texture Uploads

=== Line 3 ===
VRAM    = Used VRAM
T       = Targets
s       = Sources
H       = Hash Cache size
P       = Pooled
```

#### Software

<Image cols={8} src={require("./img/OSD_SW.webp").default} />

```ini
S       = Syncs
P       = Polygons
D       = Draws
U       = Texture Swizzling (for storing data in the correct format in GS memory)
D       = Texture DeSwizzling (for reading textures out of GS memory)
mpps    = Million pixels per second
```

### Settings Indicator

This indicator shows the settings that are applied on the current VM session, usually located on the bottom right.

<Image cols={8} src={require("./img/OSD_Settings.webp").default} />

```ini
CR      = EE Cycle Rate
CS      = EE Cycle Skip
FCDVD   = Fast CDVD Enabled
IVU     = Instant VU1 Enabled
MTVU    = Multi-Threaded VU1 Enabled
EER     = EE FPU Rounding Mode
EEC     = EE FPU Clamping Mode
VUR     = VU Rounding Mode
VUC     = VU Clamping Mode
VQS     = VSync Queue Size
C       = [CWN] = Normal Cheats (C), Widescreen Patches (W), No-Interlace Patches (N)
IR      = Upscale Multiplier/Internal Resolution
B       = Accurate Blending Unit
PL      = Texture Preloading
PT      = GPU Palette Conversion
MM      = Hardware Mipmapping
BF      = Bilinear Filtering
TF      = Trilinear Filtering
AF      = Anisotropic Filtering
DI      = Dithering
CRC     = CRC Fix Level
HBO     = Half-Bottom Override
HPO     = Half-Pixel Offset
RS      = Round Sprite
TCO     = Texture Offsets
CSBW    = CPU Sprite Render BW
SD      = Skip Draw
```

## Unstable FPS

:::info
Before proceeding with troubleshooting performance issues, please make sure that your computer is up for the task and meets the minimum system requirements!
:::

### Windows Power Plan

:::tip
PCSX2 recommends all computers to be plugged-in at all times and on the high performance (or similar) power plan.
:::

You can find this setting in the control panel. This will ensure PCSX2 can utilise it's full potential. For laptops being unplugged this would mean an internal battery saving mode. Alternatively it's possible you have a slider when you click on the battery icon which you can just drag to the right till high performance mode.

<Image cols={10} src={require("./img/powerplan.webp").default} />
