---
title: "Windows Setup"
date: 2023-08-02
summary: "Steps on how to gather required files for you to be able to use PCSX2"
draft: false
toc: true
sidebar_position: 3
---

:::tip
Make sure you have acquired all the required software from the [Requirements page](./requirements.md)!
:::

- Head over to the [download page](https://pcsx2.net/downloads) and grab the latest Nightly build if you haven't done so already!

:::info
As we are now drawing closer to releasing a new stable version, we encourage you to use the latest nightly instead of stable. If you encounter a problem, you will likely be told to try the latest nightly as a first step.
:::

- Use [7-Zip](https://www.7-zip.org/download.html) to extract the `.7z` archive.

  - Install 7-Zip.
  - Right click on the archive.
  - Find the entry for 7-Zip.
  - Click on `Extract to [folder name] option.`
    <Image cols={8} src={require("./img/extract.webp").default} />
  - This will extract PCSX2 to the same directory where you put the `.7z` file.
  - You can move the folder somewhere else as the installation is portable.

:::caution

It is worth noting that you should **avoid** placing PCSX2 Nightly on the Program Files directory as it is write-protected by Windows!

Instead, here is some recommendation on where you can safely put PCSX2 in:

- Desktop
- Documents
- `D:\` (If any)

Locations to avoid:

- Program Files
- OneDrive sync folders

:::

- Run the `pcsx2-qt.exe` file
  <Image cols={6} src={require("./img/run.webp").default} />

- Follow the setup wizard and you are ready to play!
  <Image cols={8} src={require("./img/wizard.webp").default} />
