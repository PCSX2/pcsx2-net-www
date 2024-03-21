---
title: "Reporting for issues"
date: 2024-03-20
summary: "Steps on how to diagnose problems during PCSX2 Setup"
draft: false
toc: true
sidebar_position: 5
---

Hit a snag? Follow through this page to find out on how to gather more information about the issues! Especially useful for when you wanted to report them.

## Collecting Emulog

When reporting an issue, it is highly recommended that you also provide `emulog.txt` and GS Dump (For graphical glitches) so we can help you better!

`emulog.txt` contains useful program logs for the team to investigate issues, please provide emulog whenever you're reporting issues.

To get the emulog:

- First enable logging by checking `Tools > Enable File Logging`.
- Restart PCSX2.
- Go to `Tools -> Open Data Directory...` and then navigate to the `logs` folder. This is where you will find the `emulog.txt` file.
- Reproduce your issue.
- Close PCSX2, _and do not open it again. **PCSX2 must be closed before you will be able to upload the emulog, and opening it again will remove any helpful information from the file.**_

<Image src={require("./img/emulog.webp").default} />

:::tip
To avoid any confusion, make sure you do not boot another game or restart PCSX2 after your issue occurs; **this will wipe any helpful information out of the log and we won't be able to help you!**
:::

## Collecting GS Dump

A GS dump is a dump of PS2 graphics data. The dump allows helpers, testers and developers to figure out how to fix graphics bugs.

### Where do I make the dump?

Get to a point in your game where the graphics bug is clearly visible. The issue must appear on your screen in order for it to be captured in the dump. More information on the [PCSX2 forums](https://forums.pcsx2.net/Thread-How-to-create-a-proper-GS-dump)

### How do I make the dump?

Use the key combination `Shift + F8`

You can also use `Tools > Save Single Frame GS Dump`

<Image src={require("./img/gsdump.webp").default} />

### Where does the GS dump save to?

GS dumps are saved to the `/snaps` folder on PCSX2's data folder, by default this is located on the user's Documents folder.

Use `Tools -> Open Data Directory` to quickly access the folder.

:::info
Your graphics settings DO NOT affect the dump, and you will not need to change renderers, hardware fixes or any other settings.
:::

## Bisecting regressions

Sometimes it is very helpful to find the root cause of a regression down to the exact specific PCSX2 version that introduces the issue.

Start with a known good (working) PCSX2 version and a known bad (broken) PCSX2 version. Grab a build in the middle, halfway in between.

If the middle build is good, the next build to test is halfway in between that and the known bad version. Likewise, if the middle build is bad, the next version will be halfway in between that and the known good version

Keep picking versions to test in between good and bad builds. Repeat until you've narrowed down the issue to one build.

:::tip
It helps to write down the PCSX2 versions you're testing as you go, and note whether each was good or bad.
:::

<Image src={require("./img/bisect.webp").default} />

## Reach out for help

After you've collected all the report materials, consider reaching out in either the respective [Discord](https://discord.com/invite/TCz3t9k) channel or the [forum](https://forums.pcsx2.net/) for further assistance.
