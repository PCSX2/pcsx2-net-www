---
title: "Requirements"
date: 2023-08-02
summary: "Requirements to get PCSX2 up and running."
draft: false
toc: true
sidebar_position: 1
---

## System Requirements

### Minimum

- Operating system
  - Windows 10 21H2 or newer (1809 or later) (64-bit)
  - Ubuntu 22.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0
- CPU
  - Supports SSE4.1
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 1500
  - A quick reference for CPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
    - Games with **lighter** resource requirements: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
  - Two physical cores, with hyperthreading
    :::note
    Recommended single thread performance is based on moderately complex games. Games that pushed the PS2 hardware to its limits will struggle on CPUs at this level. Some release titles and 2D games which underutilized the PS2 hardware may run on CPUs rated as low as 1200.
    :::

- GPU
  - Supports at least Vulkan 1.1, Direct3D 11 (Feature Level 11.0), OpenGL 3.3.
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating of around 3000 (GeForce GTX 750, Radeon RX 560, Intel Arc A380)
    :::note
    Recommended GPU is based on 3x internal, ~1080p resolution requirements. 
    :::
    - A quick reference for GPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:GPU_intensive_games)
  - 2 GB video memory
- RAM
  - 4 GB system memory

### Recommended

- Operating system
  - Windows 10 23H2 or newer (64-bit) 
  - Ubuntu 23.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0
- CPU
  - Supports AVX2
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 2000 (heavier games can require 2600 and up)
  - Four physical cores, with or without hyperthreading
- GPU
  - Supports Vulkan 1.3, Direct3D12, OpenGL 4.6, Metal (Mac only)
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 6000 (GeForce GTX 1650, Radeon RX 570)
    :::note
    Higher resolutions will require stronger cards; 6x internal PS2 resolution (about 4K) will require a [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating of around 12000 (GeForce GTX 1070 Ti).
    :::
  - 4 GB video memory
- RAM
  - 8 GB system memory

## Required Software

### Visual C++ Redistributables (Windows)

- You need the [Visual C++ 2019 x86 Redistributables](https://support.microsoft.com/en-us/help/2977003/) to run PCSX2.
  - They are combined with other yearly releases Visual Studio 2015, 2017, 2019, and 2022. 64-bit version (x64) is required for 1.7.0 and higher (though early 1.7 builds still required 32 bit versions)

## Optional Software
### FFmpeg (Windows)

- PCSX2 requires some additional ffmpeg libraries to enable video capture.
  - Grab the ffmpeg Windows files [here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases).
  - Extract the zip file, then place the extracted dll files in your PCSX2 folder. They should be in the same folder as the main PCSX2 exe file.

## Technical and Deprecation Notes
- Use the latest GPU driver available for full compatibility with newer graphics API such as Vulkan.
- PCSX2 uses two CPU cores for emulation by default. A third core can be used via the MTVU speed hack, which is compatible with most games. Software renderers will then additionally use however many rendering threads it is set to and will need higher core counts to run efficiently.
- Support for Windows 8.1 and older versions were dropped after stable release 1.6.0. 32-bit support was also removed at this time.
