---
title: "Spu2-X 1.5"
date: 2011-06-16T00:00:00
summary: "Hey guys, In light of recent fixes and additions we prepared a new SPU2-X release for you"
draft: false
tags:
  - "devblog"
mainAuthor: rama
aliases:
  - "/82-spu2-x-1-5"
  - "/82-spu2-x-1-5.html"
  - "/82-spu2-x-1-5.htm"
---

Hey guys, In light of recent fixes and additions we prepared a new SPU2-X release for you
😊

This one focuses on SPU2 emulation accuracy but there's also the much
requested volume adjustment feature included.
You can now try a fake SPU2 reverb mode that may sound better than the
(still somewhat broken) original reverb.

Emulation improvements:
- Reverb engine reviewed and mostly rewritten.
- Initialization modified to reflect test results, including a critical
portion of the BIOS initialization sequence to support fast boot.
- Hardware reset feature removed because tests failed to prove its
existence.
- Possible null pointer access eliminated.
- Added support for reading KON and KOF registers, which is used in the
BIOS.
- Improved voice loop logic based on tests.
- Constantly mix the input area and generate IRQs from accessing it.

Among the fixed games are titles such as:
- F1 2005
- Burnout in-game music
- Tomb Raider (the whole series)
- Spyro the Dragon
- Gauntlet Dark Legacy
- Legacy of Kain Soul Reaver 2
- etc

Hope you enjoy, and please report all (new) bugs if you find them!
