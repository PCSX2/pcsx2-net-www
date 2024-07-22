---
title: "Windows"
date: 2024-03-20
summary: "Known Windows-specific issues for PCSX2"
draft: false
toc: true
sidebar_position: 3
---

Here are some known Windows-specific issue that can occur.

## Missing "MSVCP140.dll"

If you see this error message during PCSX2 startup such as the following:

<Image src={require("./img/vcredist.webp").default} />

- You need the [Latest Visual C++ 2019 x64 Redistributables](https://aka.ms/vs/17/release/vc_redist.x64.exe) to run PCSX2.
  - They are combined with other yearly releases Visual Studio 2015, 2017, 2019, and 2022. 64-bit version (x64) is required for 1.7.0 and higher (though early 1.7 builds still required 32 bit versions)

## Crashes

There are various problems that can cause PCSX2 to crash during operation, here we list the most common ones:

### Crash when opening setting

If PCSX2 crashes when opening settings or, you get this error message when attempting to launch a game:
<Image src={require("./img/old_driver.webp").default} />

This means your GPU drivers are out of date, please update your GPU drivers and try again.

#### How do i update my GPU driver?

- Intel: [Search for your GPU or CPU model](https://www.intel.com/content/www/us/en/download-center/home.html)
- Nvidia: [Search for your GPU model](https://www.nvidia.com/Download/index.aspx?lang=en-us) or [use GeForce Experience to update drivers automatically](https://www.nvidia.com/en-us/geforce/geforce-experience/)
- AMD: [Search for your GPU or CPU model, or use the download buttons at the top to update drivers automatically](https://www.amd.com/en/support)

:::caution
Make sure you update the drivers **for all your GPUs** on the system, even if you are not using it for PCSX2.
Most notably for laptops, don't forget to also update the driver for the Integrated GPU as well.
:::

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
