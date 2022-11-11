---
title: "PCSX2 0.9.4 Has Arrived"
date: 2007-11-11T00:00:00
summary: "Well ladies and gents, here it is, the brand spanking new PCSX2 0.9.4"
draft: false
tags:
  - progress-report
mainAuthor: refraction
aliases:
  - "/136-pcsx2-0-9-4-has-arrived"
  - "/136-pcsx2-0-9-4-has-arrived.html"
  - "/136-pcsx2-0-9-4-has-arrived.htm"
---

Well ladies and gents, here it is, the brand spanking new PCSX2 0.9.4.
We have lots of new stuff for you people to try out, some of the major
features included in this release are:

- ZeroSPU2 - new SPU2 plugin from zerofrog. It is the most stable SPU2
plugin. Also has a time-scaling feature which slows down sound when the
frame rate is too low (instead of hearing popping sounds). The
time-scaling feature works best under Windows, but is also implemented
in Linux. This new plugin also fixes the voices on the Japanese release
of **Final Fantasy X**

- VU recompilers - games like **Kingdom Hearts II** , **Metal Gear Solid
III** , and **Katamari Damacy** are now playable.

- ZeroGS 0.97 - **ZeroGS DirectX has gone open source!** You can
download it from sourceforge. A lot of bug fixes in this release and the
added support of AA modes up to x16! One new feature is the ability to
tweak ZeroGS options, which were internal up to these release. Read more
about this feature in the [help
guide](/config-guide/official-english-pcsx2-configuration-guide.html)
for how to patch up games.

- Path3 GS fixes - Fixes corrupting textures on many games.

- Memory Card Fixes - Now you can save your games in games like
**Resident Evil 4** and others which refused to see memorycards!

- Dual Layer DVD reading support for games like **Xenosaga** .

- Network Play! Enjoy playing your favorite online game with PS2
Players. ( **[WinPCap](http://www.winpcap.org/install/default.htm)
Required** ), You can read up on how to do it by following this link
[here](http://forums.pcsx2.net/Thread-How-To-Play-Online-Guide)

- Windows x64 and Linux x86-64 support - The recompilers are not
optimized yet, so don't expect major speed improvements. However, pcsx2
can now natively run on these platforms as well as the x86 platforms.
**For Windows, we recommend you stick to the 32bit build rather than the
64bit one.**

- Real Time Clock - Silly as it may seem, this actually makes **Metal
Gear Solid 3** and **Katamari Damacy** work, plus your ps2 says the
actual time!

If you get a d3dx9_36.dll not found error, you need to update your
directx from
[here](http://www.microsoft.com/en-us/download/details.aspx?id=35) .
Enjoy!

**EDIT: There was a slight bug in the ZeroGS plugin. We've updated the
binary and setup files. If you have a graphics that supports pixel
shader 3.0, and zerogs reports it as 2.0, then grab the new files.**

**EDIT2: There was another bug on TLB builds and x64 builds that made
the emulator ~10-20% slower. It has been fixed now. If you are not on
windows xp using the VM build, please get the new setup (or update
sourceforge rev 196). Thanks!**
