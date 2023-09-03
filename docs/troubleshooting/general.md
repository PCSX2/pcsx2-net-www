---
title: "Identifying the problem"
date: 2023-08-02
summary: "Steps on how to diagnose problems during PCSX2 Setup"
draft: false
toc: true
sidebar_position: 1
---

## General

Hit a snag? Follow through this page to find out on how to gather more information about the issues! Especially useful for when you wanted to report them.

### Collecting Emulog

When reporting an issue, it is highly recommended that you also provide `emulog.txt` and GS Dump (For graphical glitches) so we can help you better!

`emulog.txt` contains useful program logs for the team to investigate issues, please provide emulog whenever you're reporting issues.

To get the emulog:

- First enable logging by checking `Tools > Enable File Logging`.
- Restart PCSX2.
- Reproduce your issue.
- Close PCSX2, _and do not open it again. **PCSX2 must be closed before you will be able to upload the emulog, and opening it again will remove any helpful information from the file**._

<Image cols={10} src={require("./img/emulog.webp").default} />

:::tip
To avoid any confusion, make sure you do not boot another game or restart PCSX2 after your issue occurs; **this will wipe any helpful information out of the log and we won't be able to help you!**
:::

### Collecting GS Dump

A GS dump is a dump of PS2 graphics data. The dump allows helpers, testers and developers to figure out how to fix graphics bugs.

#### Where do I make the dump?

Get to a point in your game where the graphics bug is clearly visible. The issue must appear on your screen in order for it to be captured in the dump. More information on the [PCSX2 forums](https://forums.pcsx2.net/Thread-How-to-create-a-proper-GS-dump)

#### How do I make the dump?

Use the key combination `Shift + F8`

You can also use `Tools > Save Single Frame GS Dump`

<Image cols={10} src={require("./img/gsdump.webp").default} />

#### Where does the GS dump save to?

GS dumps are saved to the `/snaps` folder.

Your graphics settings DO NOT affect the dump, and you will not need to change renderers, hardware fixes or any other settings.

## Still have problems?

If your game is not working, there are a few things you can do:

- Check the [compatibility page](/compat) to see if the game has been tested to run properly
- Consult the [wiki page](https://wiki.pcsx2.net) for the game for similar information
- Check the [GitHub issues page](https://github.com/PCSX2/pcsx2/issues) to see if there are any reported issues

### Reach out for help

If none of the above suggestions help you solve your problem, consider reaching out in either the respective [Discord](https://discord.com/invite/TCz3t9k) channel or the forum.
