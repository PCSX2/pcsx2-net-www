---
title: "Requirements"
date: 2024-03-20
summary: "System requirements to get PCSX2 up and running."
draft: false
toc: true
sidebar_position: 1
---

This section lists the system requirements to get PCSX2 up and running.

## System Requirements

### Minimum

- Operating system
  - Windows 10 Version 1809 (64-bit)
  - Ubuntu 22.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0 (Big Sur)
- CPU

  - SSE4.1 support
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 1500
  - A quick reference for CPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
    - And CPU **light** games: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
  - Two physical cores, with simultaneous multithreading (SMT)
    :::note
    Recommended single thread performance is based on moderately complex games. Games that pushed the PS2 hardware to its limits will struggle on CPUs at this level. Some release titles and 2D games which underutilized the PS2 hardware may run on CPUs rated as low as 1200.
    :::

- GPU
  - Direct3D 11 (Feature Level 10.0) support
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
  - Ubuntu 24.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0 (Big Sur)
- CPU
  - AVX2 support
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 2000
  - Four physical cores, with or without simultaneous multithreading (SMT)
- GPU
  - Direct3D 12 support
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
  - Ubuntu 24.04/Debian or newer, Arch Linux, or other distro (64-bit)
  - macOS 11.0 (Big Sur)
- CPU
  - AVX2 support
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 2600
  - Six physical cores, with simultaneous multithreading (SMT)
- GPU
  - Direct3D 12 support
  - OpenGL 4.6 support
  - Vulkan 1.3 support
  - Metal support
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 12,000 (GeForce RTX 3050, Radeon RX 5600XT)
  - 4 GB video memory
- RAM
  - 16 GB system memory

## Version deprecation notes

- Windows XP and Direct3D 9 support was dropped after stable release 1.4.0.
- Windows 7, Windows 8.0, and Windows 8.1 support was dropped after stable release 1.6.0.
- 32-bit support was dropped after stable release 1.6.0.
