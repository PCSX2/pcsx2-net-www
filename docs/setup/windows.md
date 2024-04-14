---
title: "Windows Setup"
date: 2024-03-20
summary: "Steps on how to install and run PCSX2 on Windows"
draft: false
toc: true
sidebar_position: 4
---

This section will help you through the process of setting up PCSX2 on Windows.

## Required software

:::tip
Make sure to install all the required software-first before proceeding with the setup.
:::

### Visual C++ redistributable

- You need the [Visual C++ 2019 x86 Redistributables](https://support.microsoft.com/en-us/help/2977003/) to run PCSX2.
  - They are combined with other yearly releases Visual Studio 2015, 2017, 2019, and 2022. 64-bit version (x64) is required for 1.7.0 and higher (though early 1.7 builds still required 32 bit versions)

### FFmpeg (Optional)

- PCSX2 requires some additional FFmpeg libraries to enable video capture.
  - Grab the FFmpeg Windows files [here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-6.0.7.7z).
  - Extract the zip file, then place the extracted dll files in your PCSX2 folder. They should be in the same folder as the main PCSX2 exe file.

## Setup process

:::info
As we are now drawing closer to releasing a new stable version, we encourage you to use the latest nightly instead of stable. If you encounter a problem, you will likely be told to try the latest nightly as a first step.
:::

### Extracting PCSX2

:::tip

- Head over to the [download page](https://pcsx2.net/downloads) and grab the latest Nightly build if you haven't done so already!

:::

- Use [7-Zip](https://www.7-zip.org/download.html) to extract the `.7z` archive.

  - Install 7-Zip.
  - Right click on the archive.
  - Find the entry for 7-Zip.
  - Click on `Extract to [folder name] option.`
    <Image src={require("./img/extract.webp").default} />
  - This will extract PCSX2 to the same directory where you put the `.7z` file.

### Launching PCSX2

- Run the `pcsx2-qt.exe` file
  <Image src={require("./img/run.webp").default} />

- Follow the setup wizard and you are ready to play!
  <Image src={require("./img/wizard.webp").default} />
