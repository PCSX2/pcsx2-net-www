---
date: 2025-09-25
description: "This page lists the system requirements to run PCSX2."
draft: false
sidebar_position: 1
title: "System Requirements"
toc: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { BsWindows, BsApple, BsLightningChargeFill } from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import { FaComputer, FaScaleBalanced } from "react-icons/fa6";
import { GiTurtleShell } from "react-icons/gi"

This page lists the system requirements to run PCSX2.

<table aria-label="4-by-3 table for operating system, CPU, GPU, and RAM requirements">
 <thead>
  <tr>
   <th scope="col"></th>
   <th scope="col">Minimum <GiTurtleShell className="table_header_icon"/></th>
   <th scope="col">Recommended <FaScaleBalanced className="table_header_icon"/></th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td scope="row">OS</td>
   <td>
    <ul aria-label="Minimum operating system">
     <li>Latest updated[^Windows_10] Windows 10</li>
     <li>macOS 11 (Big Sur)</li>
     <li>Ubuntu 22.04 or other Linux distro[^distros]</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Recommended operating system">
     <li>Latest updated Windows 11</li>
     <li>macOS 26 (Tahoe)</li>
     <li>Ubuntu 26.04 or other Linux distro[^distros]</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td scope="row">CPU</td>
   <td>
    <ul aria-label="Minimum CPU requirements">
     <li>x86-64 with SSE4.1</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 1400</li>
     <li>Two physical cores[^P-cores] with SMT[^SMT]</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Recommended CPU requirements">
     <li>x86-64 with AVX2 or Apple M Series[^Rosetta]</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 2000</li>
     <li>Four physical cores[^P-cores] with or without SMT[^SMT]</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td scope="row">GPU</td>
   <td>
    <ul aria-label="Minimum GPU requirements">
     <li>Vulkan 1.1</li>
     <li>Direct3D 11[^FL10]</li>
     <li>OpenGL 3.3[^extensions]</li>
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/midlow_range_gpus.html) ≥ 500[^GPU_relevance]</li>
     <li>512 MB VRAM</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Recommended GPU requirements">
     <li>Vulkan 1.3</li>
     <li>Direct3D 12[^FL11]</li>
     <li>OpenGL 4.6</li>
     <li>Metal[^Metal]</li>
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/high_end_gpus.html) ≥ 6000[^GPU_relevance]</li>
     <li>4 GB VRAM</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td scope="row">RAM</td>
   <td><ul aria-label="Minimum RAM requirements"><li>4 GB RAM[^precache]</li></ul></td>
   <td><ul aria-label="Recommended RAM requirements"><li>16 GB RAM[^precache]</li></ul></td>
  </tr>
 </tbody>
</table>

:::info[Info – Performance]
Hardware requirements can vary drastically between games.

- **If you have performance issues, please check the [corresponding troubleshooting guide.](../troubleshooting/performance)**
  - **Slower hardware may work but playability and performance are not guaranteed.**
- CPUs that only meet Moderate requirements will struggle with complex games that pushed the PS2 hardware to its limits.
  - CPU-intensive games: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
- Some release titles and 2D games which underutilized the PS2 hardware may run on CPUs rated as low as 1200.
  - CPU-light games: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
- GPUs which meet Moderate requirements should handle the vast majority of games just fine.[^GPU_relevance]
  - GPU performance is based largely on upscaling level and blending accuracy.
  - GPU-intensive games: [Wiki](https://wiki.pcsx2.net/Category:GPU_intensive_games)
- It is recommended to install the latest GPU driver version for all the GPUs that are installed on your system.
  - [NVIDIA](https://www.nvidia.com/en-us/drivers/)
  - [AMD](https://www.amd.com/en/support/download/drivers.html)
  - [Intel](https://www.intel.com/content/www/us/en/download-center/home.html)

:::

## Version Deprecations

<Tabs queryString="deprecation">
<TabItem value="general" label={<span className="tab_header_with_icon"><FaComputer />General</span>} default>
- Direct3D 9 support was dropped after stable release v1.4.0.
- 32-bit support was dropped after stable release v1.6.0.

</TabItem>
<TabItem value="windows" label={<span className="tab_header_with_icon"><BsWindows />Windows</span>}>
- Windows XP support was dropped after stable release v1.4.0.
- Windows 7, Windows 8.0, and Windows 8.1 support was dropped after stable release v1.6.0.
- Windows 10 21H1 and earlier support was dropped after stable release v2.4.0.

</TabItem>
<TabItem value="macos" label={<span className="tab_header_with_icon"><BsApple />macOS</span>}>
- macOS 10.14 support was added and dropped during the nightly v1.7.X release cycle.

</TabItem>
<TabItem value="linux" label={<span className="tab_header_with_icon"><FaLinux />Linux</span>}>
- Ubuntu 20.04 support was dropped after stable release v1.6.0.

</TabItem>
</Tabs>

## Footnotes

[^Windows_10]: Windows 10 Version 21H2 LTSC / 22H2

[^distros]: Distributed via AppImage or Flatpak. Both Wayland and X11 are supported. Major DEs are supported. Although ChromeOS [supports Linux applications](https://chromeos.dev/en/linux), PCSX2 offers no official support for ChromeOS.

[^SMT]: [Simultaneous multithreading](https://en.wikipedia.org/wiki/Simultaneous_multithreading)

[^P-cores]: If on a 12th Gen Intel CPU or newer, this is the number of P-cores rather than physical cores.

[^Rosetta]: On Macs with _M_-series CPUs, PCSX2 runs via the translation layer [Rosetta 2](<https://en.wikipedia.org/wiki/Rosetta_(software)>). _M_-series CPUs are exempt from x86 SIMD extension requirements such as AVX2 and all fall under the Heavy CPU requirements.

[^GPU_relevance]: GPU performance is functionally irrelevant if playing games using the [Software Renderer](../configuration/general#software-mode).

[^FL10]: Direct3D 11 Feature Level 10.0

[^FL11]: Direct3D 12 Feature Level 11.0

[^Metal]: Only on Mac devices

[^extensions]: OpenGL 3.3 additionally requires the extensions `GL_ARB_shading_language_420pack`, `GL_ARB_copy_image`, and `GL_ARB_clip_control`.

[^precache]: Games can optionally be precached such that the entire game disc is loaded into memory. This alone can occupy up to 8 GB of RAM. We recommend at least 32 GB of memory if using this feature.
