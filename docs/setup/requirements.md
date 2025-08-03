---
title: "Requirements"
summary: "System requirements for PCSX2."
draft: false
toc: true
sidebar_position: 1
---

This section lists the system requirements for PCSX2.

## System Requirements

### Minimum

- OS
  - Windows 10 22H2 or LTSC 21H2 64-bit
  - Ubuntu 22.04, Arch Linux, or another distro 64-bit
  - macOS Big Sur
- CPU
  - SSE4.1 compatible
    - Intel Core i5-2300 (4 cores and 4 threads)
  - AV2 compatible
    - Intel Core i3-4150 (2 cores and 4 threads)
  - The CPU requirement can be game dependent.
    - A reference of CPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
    - A reference of **light** games for the CPU: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
- GPU
  - DirectX 11 (10_0) compatible
  - OpenGL 3.3 compatible
  - Vulkan 1.1 compatible
  - NVIDIA GeForce 9600 GT GDDR3, ATI Radeon HD 4670, Intel HD Graphics 530 dual-channel DDR4
    :::note
    The GPU requirement is based on 3x resolution ~1080p.
    :::
  - As with the CPU requirement, the GPU requirement can be game dependent.
    - A reference of GPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:GPU_intensive_games)
  - 1 GB of VRAM
- RAM
  - 4 GB

### Recommended

- OS
  - Windows 11
  - Ubuntu 24.04, Arch Linux, or another distro 64-bit
  - macOS Sequoia
- CPU
  - AVX2 compatible
  - Intel Core i5-4460, AMD Ryzen 3 2200G (4 cores and 4 threads)
- GPU
  - DirectX 12 (11_0) compatible
  - OpenGL 4.6 compatible
  - Vulkan 1.3 compatible
  - Metal compatible
  - NVIDIA GeForce GTX 970, AMD Radeon RX 470, Intel Arc A380
  - 4 GB of VRAM
- RAM
  - 8 GB

## Version Notes

- Windows XP and DirectX 9 support was dropped after v1.4.0.
- Windows 7, Windows 8, and Windows 8.1 support was dropped after v1.6.0.
- 32-bit support was dropped after v1.6.0.
- Windows 10 21H2 and earlier support was dropped after v2.4.0.
