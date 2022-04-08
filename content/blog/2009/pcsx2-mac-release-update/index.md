---
title: "PCSX2/Mac - Release Update!"
date: 2009-12-30T00:00:00
summary: "It's that time of the year again, so i had some time to work on pcsx2/mac, now with nice sound as well."
draft: false
tags:
  - "devblog"
mainAuthor: zedr0n
aliases:
  - "/113-pcsx2-mac-release-update"
  - "/113-pcsx2-mac-release-update.html"
  - "/113-pcsx2-mac-release-update.htm"
---

It's that time of the year again, so i had some time to work on pcsx2/mac, now with nice sound as well.
😉 This update is about solving the missing
textures problem that has been plaguing pcsx2/mac for ages.

Zerospu2 0.4.6 has been ported to mac using cross-platform Portaudio
library, i recommend all users to use it
😊

Zeydlitz has recently worked on z-buffer swizzling for the ZZOgl plugin
and this has fixed a lot of missing textures problems for us. I also
fixed some code in pcsx2 for ffx missing textures. Some shots:

**FFX**
[![](./img/x11screensnapz018.th.jpg)](./img/x11screensnapz018.jpg)
VS
[![](./img/x11screensnapz024.th.jpg)](./img/x11screensnapz024.jpg)

**Kingdom Hearts**
[![](./img/x11screensnapz025.th.jpg)](./img/x11screensnapz025.jpg)
VS
[![](./img/x11screensnapz027.th.jpg)](./img/x11screensnapz027.jpg)
