---
title: "Windows"
date: 2024-03-20
summary: "Known Windows-specific issues for PCSX2"
draft: false
toc: true
sidebar_position: 3
---

Here are some known Windows-specific issue that can happen to PCSX2

## Missing "MSVCP140.dll"

If you see this error message during PCSX2 startup such as the following:

<Image src={require("./img/vcredist.webp").default} />

- You need the [Latest Visual C++ 2019 x64 Redistributables](https://aka.ms/vs/17/release/vc_redist.x64.exe) to run PCSX2.
  - They are combined with other yearly releases Visual Studio 2015, 2017, 2019, and 2022. 64-bit version (x64) is required for 1.7.0 and higher (though early 1.7 builds still required 32 bit versions)

## Unable to start Video Capture

<Image src={require("./img/ffmpeg.webp").default} />

- PCSX2 requires some additional ffmpeg libraries to enable video capture.
  - Grab the ffmpeg Windows files [here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-6.0.7.7z).
  - Extract the zip file, then place the extracted dll files in your PCSX2 folder. They should be in the same folder as the main PCSX2 exe file.

## Failed to create render device

If you get this error message when attempting to launch a game:
<Image src={require("./img/old_driver.webp").default} />
This means your GPU drivers are out of date, please update your GPU drivers and try again.

Always use the newest driver, but at minimum you need:

```ini
- Nvidia: 497.29
- AMD: Adrenalin 21.12.1
- Intel: 30.0.101.1191
```

:::caution
Make sure you update the drivers **for all your GPUs** on the system, even if you are not using it for PCSX2.
Most notably for laptops, don't forget to also update the driver for the Integrated GPU as well.
:::

## Crashes

There are various culprits that can cause PCSX2 to crash during operation, here we list the most common ones:

### Crash when adding a File/Directory to the Game List or opening PCSX2 setting

- This crash are most likely caused by Windows Shell/UI Mods that are installed on the system, notable example are `OldNewExplorer`.
- To fix this crash, you have to _completely_ remove the offending software as it will interfere with PCSX2 and will cause crashing.

### Crashes Due to OpenCL™, OpenGL®, and Vulkan® Compatibility Pack

#### What is this?

Despite being a compatibility pack, this package does not comply with the Vulkan specification. Installing this package will cause PCSX2 and possibly other applications using Vulkan to crash. On most systems this package is completely unnecessary, if proper GPU drivers are installed.

#### For ROG Ally Users

ASUS seems to have installed this package by default on the ROG Ally, despite it being broken and not necessary, as the ROG Ally has a fully featured GPU driver. You will need to uninstall it to use PCSX2.

#### How do I uninstall this?

Hit Start, Settings, Apps, then find `OpenCL™, OpenGL®, and Vulkan® Compatibility Pack` in the list. Click it, then hit Uninstall. Once uninstalled, reboot your PC.
