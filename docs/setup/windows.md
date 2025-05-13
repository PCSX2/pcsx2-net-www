---
title: "Windows Setup"
summary: "Steps on how to install and run PCSX2 on Windows"
draft: false
toc: true
sidebar_position: 4
---

This section will help you through the process of setting up PCSX2 on Windows.

## Required software

:::tip
Make sure to install all the required software first before proceeding with the setup.
:::

### Visual C++ redistributable

- You need [the latest x64 Visual C++ runtime](https://support.microsoft.com/en-us/help/2977003/) to run PCSX2.

### FFmpeg (Optional)

- PCSX2 requires some additional FFmpeg libraries to enable video capture.
  - Grab the FFmpeg Windows files [here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-7.0.2.7z).
  - Extract the `.zip` file, then place the extracted `.dll` files in your PCSX2 folder. They should be in the same folder as the main PCSX2 `.exe` file.

## Setup process

### Extracting PCSX2

:::tip

- Head over to the [download page](https://pcsx2.net/downloads) and grab the latest build if you haven't done so already! PCSX2 is offered as both a Stable build (updated every several months) and as a Nightly build (updated as PCSX2 is developed).
  :::

- Use [7-Zip](https://www.7-zip.org/download.html) to extract the `.7z` archive.

  - Install 7-Zip.
  - Right-click on the archive.
  - Find the entry for 7-Zip.
  - Click on `Extract to [folder name] option.`
    <Image src={require("./img/extract.webp").default} />
  - This will extract PCSX2 to the same folder where you put the `.7z` file.

### Launching PCSX2

- Run the `pcsx2-qt.exe` file
  <Image src={require("./img/run.webp").default} />

- Follow the setup wizard, and you are ready to play!
  <Image src={require("./img/wizard.webp").default} />

## Build from source (Advanced users)

:::tip
For details on building PCSX2 from source, check out the [Building PCSX2 page](../advanced/building.md#building-on-windows)
:::
