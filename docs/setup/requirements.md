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

This page lists the system requirements to run PCSX2.

<table aria-label="4-by-3 table for operating system, CPU, GPU, and RAM requirements">
 <thead>
  <tr>
   <th scope="col"></th>
   <th scope="col">Minimum</th>
   <th scope="col">Moderate</th>
   <th scope="col">Heavy</th>
  </tr>
 </thead>
 <tbody>
  <tr>
   <td scope="row">OS</td>
   <td>
    <ul aria-label="Minimum operating system requirements">
     <li>Latest[^Windows_10] Windows 10</li>
     <li>macOS 11 (Big Sur)</li>
     <li>Ubuntu 24.04 or other Linux distro[^distros]</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Moderate operating system requirements">
     <li>Windows 11</li>
     <li>macOS 14–15 (Sonoma–Sequoia)</li>
     <li>Ubuntu 25.10 or other Linux distro[^distros]</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Heavy operating system requirements">
     <li>Windows 11</li>
     <li>macOS 14–15 (Sonoma–Sequoia)</li>
     <li>Ubuntu 25.10 or other Linux distro[^distros]</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td scope="row">CPU</td>
   <td>
    <ul aria-label="Minimum CPU requirements">
     <li>x86-64 with SSE4.1</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 1500</li>
     <li>Two physical cores[^P-cores] with SMT[^SMT]</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Moderate CPU requirements">
     <li>x86-64 with AVX2</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 2000</li>
     <li>Four physical cores[^P-cores] with or without SMT[^SMT]</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Heavy CPU requirements">
     <li>x86-64 with AVX2</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 2600</li>
     <li>Six physical cores[^P-cores] with SMT[^SMT]</li>
     <hr />
     <li>Or *M*-series CPU[^Rosetta]</li>
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
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/high_end_gpus.html) ≥ 600[^GPU_relevance]</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Moderate GPU requirements">
     <li>Vulkan 1.3</li>
     <li>Direct3D 12[^FL11]</li>
     <li>OpenGL 4.6</li>
     <li>Metal[^Metal]</li>
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/high_end_gpus.html) ≥ 6000[^GPU_relevance]</li>
     <li>4 GB VRAM</li>
    </ul>
   </td>
   <td>
    <ul aria-label="Heavy GPU requirements">
     <li>Vulkan 1.3</li>
     <li>Direct3D 12[^FL11]</li>
     <li>OpenGL 4.6</li>
     <li>Metal[^Metal]</li>
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/high_end_gpus.html) ≥ 12000[^GPU_relevance]</li>
     <li>8 GB VRAM</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td scope="row">RAM</td>
   <td><ul aria-label="Minimum RAM requirements"><li>8 GB RAM[^precache]</li></ul></td>
   <td><ul aria-label="Moderate RAM requirements"><li>16 GB RAM[^precache]</li></ul></td>
   <td><ul aria-label="Heavy RAM requirements"><li>16 GB RAM[^precache]</li></ul></td>
  </tr>
 </tbody>
</table>

:::info[Info – Performance]
Hardware requirements can vary drastically between games.

- CPUs that only meet Moderate requirements will struggle with complex games that pushed the PS2 hardware to its limits.
  - CPU-intensive games: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
- Some release titles and 2D games which underutilized the PS2 hardware may run on CPUs rated as low as 1200.
  - CPU-light games: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
- GPUs which meet Moderate requirements should handle the vast majority of games just fine.[^GPU_relevance]
  - GPU performance is based largely on upscaling level and blending accuracy.
  - GPU-intensive games: [Wiki](https://wiki.pcsx2.net/Category:GPU_intensive_games)
- If you have performance issues, please check the [corresponding troubleshooting guide.](../troubleshooting/performance)

:::

## Example Hardware

<table aria-label="2-by-3 table for example CPUs and GPUs from major manufacturers">
 <thead>
  <tr>
   <th scope="col"></th>
   <th scope="col">Minimum</th>
   <th scope="col">Moderate</th>
   <th scope="col">Heavy</th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td scope="row">CPU</td>
   <td><ul aria-label="Example minimum CPUs"><li>Intel Core i7-2760QM</li><li>AMD FX-8350</li></ul></td>
   <td><ul aria-label="Example moderate CPUs"><li>Intel Core i7-4790</li><li>AMD Ryzen 5 1600</li></ul></td>
   <td><ul aria-label="Example heavy CPUs"><li>Intel Core i7-8700K</li><li>AMD Ryzen 5 3600X</li></ul></td>
  </tr>
  <tr>
   <td scope="row">GPU[^GPU_relevance]</td>
   <td><ul aria-label="Example minimum GPUs"><li>Nvidia GeForce GT 710</li><li>AMD Radeon R7 A10-7850K</li><li>Intel HD 510</li></ul></td>
   <td><ul aria-label="Example moderate GPUs"><li>Nvidia GeForce GTX 1650</li><li>AMD Radeon RX 570</li><li>Intel Arc A380</li></ul></td>
   <td><ul aria-label="Example heavy GPUs"><li>Nvidia GeForce RTX 3050 8GB</li><li>AMD Radeon RX 5600 XT</li><li>Intel Arc A580</li></ ul></td>
 </tr>
 </tbody>
</table>

## Version Deprecations

<Tabs queryString="deprecation">
<TabItem value="general" label="General" default>
- Direct3D 9 support was dropped after stable release v1.4.0.
- 32-bit support was dropped after stable release v1.6.0.

</TabItem>
<TabItem value="windows" label="Windows">
- Windows XP support was dropped after stable release v1.4.0.
- Windows 7, Windows 8.0, and Windows 8.1 support was dropped after stable release v1.6.0.
- Windows 10 21H1 and earlier support was dropped after stable release v2.4.0.

</TabItem>
<TabItem value="macos" label="macOS">
- macOS 10.4 support was added and dropped during the nightly v1.7.X release cycle.
<!--- TODO: macOS 11 and 12 support was dropped after stable release v2.4.0.-->

</TabItem>
<TabItem value="linux" label="Linux">
- Ubuntu 20.04 support was dropped after stable release v1.6.0.
- Ubuntu 22.04 support was dropped after stable release v2.6.0.
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
