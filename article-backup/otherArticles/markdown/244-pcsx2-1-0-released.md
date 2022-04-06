::: {.single-article}
::: {.item-page .clearfix}
## [PCSX2 1.0 released!](/244-pcsx2-1-0-released.html) {#pcsx2-1.0-released .contentheading}

::: {style="text-align:center;"}
:::

After many long years of development, debugging and testing effort, we
have reached a point where PCSX2 runs a great majority of the games, and
there are no important issues that could possibly be fixed without
requiring major modifications to the emulator.

Because of that (and because we already felt it was overdue), we decided
to stop thinking of new things to do for a bit, polish the stability,
compatibility and existing features and release the result as the first
major version of PCSX2!

There have been tons of changes since the last release, including
improvements to Jake Stine's wxWidgets GUI overhaul, cottonvibes' new
multithreaded VU core and improvements on the primary plugins.

This release is a big milestone that marks the way to new features and
improvements!

Here is an excerpt of the latest changes:

**Windows**

**Core:**

-   Video timing adjustments
-   microVU fixes for Metal Gear Solid 2 and others
-   General speedups
-   microVU speedup
-   New GIF unit that mimics the real one better
-   microVU elementary function bug fixed (affecting Valkyrie Profile 2,
    Radiata Stories and Star Ocean 3)
-   Implemented Multi-Threaded VU! A new speed hack with almost 100%
    compatibility with games, using a third core to run the VU1 unit
    separately
-   CDVD fixes (Time Crisis boots now)
-   Added support for progressive scan timings
-   Path 3 arbitration and timing refinements
-   Added Finnish, Malaysian, Korean, French, Indonesian, Italian,
    Japanese and Polish translations


**SPU2-X:**

-   Configurable output volume
-   Fixes to reverb
-   Various sound looping fixes
-   Improved time stretcher
-   Reverse phase audio quality improved


**GSdx:**

-   Fixed RGB mode movie recording
-   Texture cache change that fixes some black screening games
-   Implemented NVidia FXAA 3.10, page up key activates it
-   Better multithreading
-   Arc the Lad bad fog fix
-   Fixed shadows in software renderer
-   Implementation of GSdx "Shadeboost" project (saturation,
    brightness, contrast settings)
-   User configurable hacks in the GUI
-   Fixed flickering in many FMVs
-   Implementation of GSdx "Cutie" project (various extra CRC hacks)


**Lilypad:**

-   Pad state getting stuck with savestates bug fixed


**USBqemu:**

-   Revamped it a bit


**Linux:**

**OnePad changes:**

-   New dialog configuration panel
-   Improved support of various pad (sixaxis)/mouse/wiimote
-   Added support for more controllers
-   Added support for pressure-sensitive buttons


**GSdx:**

-   GSdx ported for Linux! Based on OpenGL 3.3 with some 4.x hardware
    independent extensions. Requires OpenGL 4.2 drivers and is still in
    experimental stages. Don't expect the hardware renderer to run
    properly, but the Software renderer should be fine.

```{=html}
<!-- -->
```
-   Added support for configuration and keyboard shortcuts from PCSX2


**ZZogl:**

-   Added support for configuration and keyboard shortcuts from PCSX2
-   Added a GLSL backend to replace CG. Like GSdx, it requires OpenGL
    4.2 drivers. Only available with PCSX2 self-compilation.


**PCSX2 GUI:**

-   Added thread timing information to see the CPU usage in the status
    bar
-   Fix multiple frame/box letters sizing.



In addition to these changes we found a fixed several bugs that could
lead to crashes in various situations.
The PCSX2 executable has been built and tested with PGO optimizations
enabled so it will be an extra 10% faster over regular SVN builds.

We hope you enjoy this first major version release and have fun playing
your games on it!
😊

[ [](/download.html "Head to the download section!") [Share on reddit
here!](http://www.reddit.com/r/gaming/comments/xmvhm/ps2_emulator_pcsx2_version_10_out/)
]{style="font-size: medium;"}

[ [Head to the download
section!](/download.html "Head to the download section!")
]{style="font-size: medium;"}

[
[![Download!](/images/jdownloads/downloadimages/download_blue.png){width="120"
height="40"}](/download.html "Head to the download section!")
]{style="font-size: medium;"}
:::
:::
