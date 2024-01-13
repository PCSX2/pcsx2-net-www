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
  - Windows 10 Version 1809 (64-bit)
  - Ubuntu 22.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0
- CPU

  - Supports SSE4.1
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 1500
  - A quick reference for CPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
    - And CPU **light** games: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
  - Two physical cores, with hyperthreading
    :::note
    Recommended single thread performance is based on moderately complex games. Games that pushed the PS2 hardware to its limits will struggle on CPUs at this level. Some release titles and 2D games which underutilized the PS2 hardware may run on CPUs rated as low as 1200.
    :::

- GPU
  - Direct3D 11 (Feature Level 11.0) support
  - OpenGL 3.3 support
  - Vulkan 1.1 support
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 3000 (GeForce GTX 750, Radeon RX 560, Intel Arc A380)
    :::note
    Recommended GPU is based on 3x internal, ~1080p resolution requirements. Higher resolutions will require stronger cards; 6x internal, ~4K resolution will require a [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 12000 (GeForce GTX 1070 Ti).
    :::
  - Just like CPU requirements, this is also highly game dependent.
    - A quick reference for GPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:GPU_intensive_games)
  - 2 GB video memory
- RAM
  - 8 GB system memory

### Recommended

- Operating system
  - Windows 10 Version 22H2 (64-bit)
  - Ubuntu 23.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0
- CPU
  - Supports AVX2
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 2000
  - Four physical cores, with or without hyperthreading
- GPU
  - Direct3D12 support
  - OpenGL 4.6 support
  - Vulkan 1.3 support
  - Metal support
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 6000 (GeForce GTX 1650, Radeon RX 570)
  - 4 GB video memory
- RAM
  - 16 GB system memory

### Heavy

- Operating System
  - Windows 10 Version 22H2 (64-bit)
  - Ubuntu 23.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0
- CPU
  - Supports AVX2
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 2600
  - Four physical cores, with or without hyperthreading.
- GPU
  - Direct3D12 support
  - OpenGL 4.6 support
  - Vulkan 1.3 support
  - Metal support
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 6000 (GeForce GTX 1650, Radeon RX 570)
  - 4 GB of Video Memory
- RAM
  - 16 GB of System Memory

## Required Software

### Visual C++ Redistributable

- You need the [Visual C++ 2019 x86 Redistributables](https://support.microsoft.com/en-us/help/2977003/) to run PCSX2.
  - They are combined with other yearly releases Visual Studio 2015, 2017, 2019, and 2022. 64-bit version (x64) is required for 1.7.0 and higher (though early 1.7 builds still required 32 bit versions)

### FFmpeg

- PCSX2 requires some additional ffmpeg libraries to enable video capture.
  - Grab the ffmpeg Windows files [here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-6.0.7.7z).
  - Extract the zip file, then place the extracted dll files in your PCSX2 folder. They should be in the same folder as the main PCSX2 exe file.

## Version Deprecation Notes

- Windows XP and Direct3D9 support was dropped after stable release 1.4.0.
- Windows 7, Windows 8.0, and Windows 8.1 support was dropped after stable release 1.6.0.
- 32-bit support was dropped after stable release 1.6.0.
