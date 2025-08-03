---
title: "System Requirements"
summary: "System requirements to get PCSX2 up and running."
draft: false
toc: true
sidebar_position: 1
---

This section lists the system requirements to get PCSX2 up and running.

<table>
 <thead>
  <tr>
   <th></th>
   <th>Minimum</th>
   <th>Moderate</th>
   <th>Heavy</th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>OS</td>
   <td>
    <ul>
     <li>Latest[^win_10_versions] Windows 10</li>
     <li>Ubuntu 22.04 or other distro[^distros]</li>
     <li>macOS 11 (Big Sur)</li>
    </ul>
   </td>
   <td>
    <ul>
     <li>Windows 11</li>
     <li>Ubuntu 25.04 or other distro[^distros]</li>
     <li>macOS 15 (Sequoia)</li>
    </ul>
   </td>
   <td>
    <ul>
     <li>Windows 11</li>
     <li>Ubuntu 25.04 or other distro[^distros]</li>
     <li>macOS 15 (Sequoia)</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td>CPU</td>
   <td>
    <ul>
     <li>SSE4.1</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 1500</li>
     <li>Two physical cores[^P-cores] with SMT[^SMT]</li>
    </ul>
   </td>
   <td>
    <ul>
     <li>AVX2</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 2000</li>
     <li>Four physical cores[^P-cores] with or without SMT[^SMT]</li>
    </ul>
   </td>
   <td>
    <ul>
     <li>AVX2</li>
     <li>[PassMark single-thread rating](https://www.cpubenchmark.net/singleThread.html) ≥ 2600</li>
     <li>Six physical cores[^P-cores] with SMT[^SMT]</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td>GPU</td>
   <td>
    <ul>
     <li>Vulkan 1.1</li>
     <li>Direct3D 11[^FL10]</li><li>OpenGL 3.3[^extensions]</li>
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/high_end_gpus.html) ≥ 600</li>
    </ul>
   </td>
   <td>
    <ul>
     <li>Vulkan 1.3</li>
     <li>Direct3D 12[^FL11]</li>
     <li>Metal[^Metal]</li>
     <li>OpenGL 4.6</li>
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/high_end_gpus.html) ≥ 6000</li>
     <li>4 GB VRAM</li>
    </ul>
   </td>
   <td>
    <ul>
     <li>Vulkan 1.3</li>
     <li>Direct3D 12[^FL11]</li>
     <li>Metal[^Metal]</li>
     <li>OpenGL 4.6</li>
     <li>[PassMark G3D Mark rating](https://www.videocardbenchmark.net/high_end_gpus.html) ≥ 12000</li>
     <li>8 GB VRAM</li>
    </ul>
   </td>
  </tr>
  <tr>
   <td>RAM</td>
   <td><ul><li>8 GB RAM[^precache]</li></ul></td>
   <td><ul><li>16 GB RAM[^precache]</li></ul></td>
   <td><ul><li>16 GB RAM[^precache]</li></ul></td>
  </tr>
 </tbody>
</table>
:::info

- CPUs that only meet Moderate requirements will struggle with complex games that pushed the PS2 hardware to its limits.
  - CPU-intensive games: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
- Some release titles and 2D games which underutilized the PS2 hardware may run on CPUs rated as low as 1200.
  - CPU-light games: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
- GPU performance is based largely on upscaling level and blending accuracy. For example, Moderate is based on 3x internal resolution.
  - GPU-intensive games: [Wiki](https://wiki.pcsx2.net/Category:GPU_intensive_games)
    :::

## Example Hardware

<table>
 <thead>
  <tr>
   <th></th>
   <th>Minimum</th>
   <th>Moderate</th>
   <th>Heavy</th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td>CPU</td>
   <td><ul><li>Intel Core i7-2760QM</li><li>AMD FX-8350</li></ul></td>
   <td><ul><li>Intel Core i7-4790</li><li>AMD Ryzen 5 1600</li></ul></td>
   <td><ul><li>Intel Core i7-8700K</li><li>AMD Ryzen 5 3600X</li></ul></td>
  </tr>
  <tr>
   <td>GPU</td>
   <td><ul><li>Nvidia GeForce GT 720</li><li>AMD Radeon HD 7610M</li><li>Intel UHD 630</li></ul></td>
   <td><ul><li>Nvidia GeForce GTX 1650</li><li>AMD Radeon RX 570</li><li>Intel Arc A380</li></ul></td>
   <td><ul><li>Nvidia GeForce RTX 3050 8GB</li><li>AMD Radeon RX 5600 XT</li><li>Intel Arc A580</li></ ul></td>
 </tr>
 </tbody>
</table>

## Version Deprecations

- Windows XP and Direct3D 9 support was dropped after stable release v1.4.0.
- Windows 7, Windows 8.0, and Windows 8.1 support was dropped after stable release v1.6.0.
- Windows 10 21H1 and earlier support was dropped after stable release v2.4.0.
- 32-bit support was dropped after stable release v1.6.0.

## Footnotes

[^win_10_versions]: Windows 10 Version 21H2 LTSC / 22H2

[^distros]: Distributed via AppImage or Flatpak. Both Wayland and X11 are supported. Major DEs are supported.

[^SMT]: [Simultaneous multithreading](https://en.wikipedia.org/wiki/Simultaneous_multithreading)

[^P-cores]: If on a 12th Gen Intel CPU or newer, this is the number of P-cores rather than physical cores.

[^FL10]: Direct3D 11 Feature Level 10.0

[^FL11]: Direct3D 12 Feature Level 11.0

[^Metal]: Only on Mac devices

[^extensions]: OpenGL 3.3 additionally requires the extensions `GL_ARB_shading_language_420pack`, `GL_ARB_copy_image`, and `GL_ARB_clip_control`.

[^precache]: Games can optionally be precached such that the entire game disc is loaded into memory. This alone can occupy up to 8 GB of RAM. We recommend at least 32 GB of memory if using this feature.
