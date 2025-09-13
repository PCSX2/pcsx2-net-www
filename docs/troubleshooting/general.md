---
title: "General Issues"
summary: "This page describes common issues you may encounter using PCSX2."
draft: false
toc: true
sidebar_position: 1
---

This page describes common issues you may encounter using PCSX2.

:::tip
If you are encountering issues, before troubleshooting them it is highly recommended that you update your PCSX2 version if you haven't done so already.
:::

## Game are stuck on black screen or does not load correctly

:::info
This usually indicates that your dump is corrupted or incomplete.
:::

To verify the integrity of your dump, right-click on the game you want to check on the game list, then click on properties. You should be greeted with the game properties window. Next up click the verify button under the disc track list.

<Image src={require("./img/verify.webp").default} />

If it returns a green checkmark (✅) then your game dumps are working just fine, otherwise if it returns a red cross (❌) then your dumps are corrupted and you will have to redump your game. You can check out [the disc dumping guide](../setup/discs.md) for the instructions on how to do so.

## Unable to start Video Capture

<Image src={require("./img/ffmpeg.webp").default} />

:::info
PCSX2 requires some additional ffmpeg libraries to enable video capture.
:::

### Windows

- Grab the ffmpeg Windows files [here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-7.0.2.7z).
- Extract the zip file, then place the extracted dll files in your PCSX2 folder. They should be in the same folder as the main PCSX2 exe file.

## Still have problems?

If your game is not working or you are still having issues, there are a few things you can do:

- Check the [Reporting for issues](./identify.md) page to find out how to report for issues.
- Check the [compatibility page](/compat) to see if the game has been tested to run properly.
- Consult the [wiki page](https://wiki.pcsx2.net) for the game for similar information.
- Join our [Discord server](https://discord.com/invite/TCz3t9k) for futher assistance.
- Check the [GitHub issues page](https://github.com/PCSX2/pcsx2/issues) to see if there are any reported issues.
