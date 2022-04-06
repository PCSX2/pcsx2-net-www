---
title: "Spu2-X 2.0"
date: 2011-06-27T00:00:00
summary: "Not even 2 weeks ago we released SPU2-X 1.5, yet today we feel that the plugin has matured enough for another release."
draft: false
tags:
  - "devblog"
mainAuthor: rama
aliases:
  - "/81-spu2-x-2-0"
  - "/81-spu2-x-2-0.html"
  - "/81-spu2-x-2-0.htm"
---

Not even 2 weeks ago we released SPU2-X 1.5, yet today we feel that the plugin has matured enough for another release.
This time the changes are significant enough to do the version jump to
2.0
😊

SPU2-X always struggled to get the reverberation effects right.
Now after some thorough debugging we've found and fixed the problem we
had all this time!
The resulting reverb is still not exactly like the PS2 does it but it
comes very close in perceived quality.
We'll be working on those final bits in the time to come, hopefully
achieving a fully correct emulation one day.

Note: The custom reverb option has been removed as it no longer serves a
purpose.

Emulation improvements:

-   Next address reporting on voices improved based on tests.
-   Pitch modulation possibly fixed.
-   Status register updated in a way the spu2 library's reset function
    seems to want.
-   Effects area updating changed to allow writing the EEA register
    while effects area writing is enabled.
-   Switched two SPDIF modes which were reversed.
-   Reverb register bug dating back to the first version of SPU2-X
    fixed.


Among the fixed games are titles such as:

-   God of War
-   God of War 2
-   Tales of Destiny
-   Magic Pengel
-   Grand Theft Auto: Vice City
-   Devil May Cry (PAL)
-   Gradius 3+4
-   Everything that uses digital effects
