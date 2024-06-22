---
title: "General Issues"
date: 2024-03-20
summary: "Common issues that may occur when using PCSX2."
draft: false
toc: true
sidebar_position: 1
---

This section details some common issues that may occur when you are using PCSX2.

:::tip
If you are encountering issues, before troubleshooting them it is highly recommended that you update your PCSX2 version if you haven't done so already.
:::

## Game are stuck on black screen or does not load correctly

This usually indicates that your dump is corrupted. To verify the integrity of your dump, right-click on the game you want to check, then click on properties.

You should be greeted with the game properties window. Next up click the verify button under the disc track list.

If it returns a green checkmark (✅) then your game dumps are working just fine, otherwise if it returns a red cross (❌) then your dumps are corrupted and you will have to redump your game. You can checkout [the gathering files page](../setup/dumping.md#dumping-ps2-discs-via-imgburn) for the instructions on how to do so.

<Image src={require("./img/verify.webp").default} />

## Still have problems?

If your game is not working, there are a few things you can do:

- Check the [compatibility page](/compat) to see if the game has been tested to run properly
- Consult the [wiki page](https://wiki.pcsx2.net) for the game for similar information
- Check the [GitHub issues page](https://github.com/PCSX2/pcsx2/issues) to see if there are any reported issues
