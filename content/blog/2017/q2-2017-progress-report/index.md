---
title: "Q2 2017 Progress Report"
date: 2017-09-11T00:00:00
summary: "Hello followers and welcome to the Q2 2017 progress report"
draft: false
tags:
  - "progress-report"
mainAuthor: bositman
aliases:
  - "/284-q2-2017-progress-report"
  - "/284-q2-2017-progress-report.html"
  - "/284-q2-2017-progress-report.htm"
---

![](./img/progrepq22017.jpg)

Hello followers and welcome to the Q2 2017 progress report. You might
notice it's not as exciting as the previous report, but that is because
the PCSX2 team has always slacked during summer time so this was to be
fully expected

That said, here are the most notable changes since the last report

## [PCSX2: Fix command-line options](https://github.com/PCSX2/pcsx2/pull/1907)
- by [turtleli](https://github.com/turtleli)

Since the
<a href="http://forums.pcsx2.net/Thread-blog-The-return-of-the-Commandline?pid=118520&amp;highlight=commandline#pid118520" class="mycode_url">re-addition of the command-line interface</a>
by former developer Air, the command-line code has remained untouched
for years with issues arising on it as the other areas of the emulator
were improved. The known issues of the command line interface were:

-   Booting the ISO from the commandline would fail when CDVD plugin is
    selected on the PCSX2 GUI and vice versa.
-   The --nodisc command line option failed to work.
-   The current ISO selection was cleared when any boot source other
    than ISO was used in the command line.

<span class="mycode_b" style="font-weight: bold;"> Turtleli </span> has
fixed all of these issues and the command line options are now back to
functioning properly as they should.

## [PCSX2-Counters: Proper tracking of scalar limit](https://github.com/PCSX2/pcsx2/pull/2014)
- by [ssakash](https://github.com/turtleli)

PCSX2 allows modification of the base framerate limit in the Emulation
settings dialog. The value of the base framerate limit is 100% by
default and can be modified to effectively increase/decrease the speed
of the game.

We recently found out that the framerate limit wasn't updated according
to the value requested by the user, due to a discrepancy in resetting
the vertical synchronization timer logic whenever new settings were
written to the emulator. The issue has now been fixed by forcing the
reset of the timer logic whenever the emulation settings are updated.

## [CMake: Blacklist GCC 7.0/7.1 versions](https://github.com/PCSX2/pcsx2/pull/1949)
- by [Gregory](https://github.com/gregory38)

It recently came to our attention that hardware rendering has severe
issues when PCSX2 is compiled using GCC versions 7.0 and 7.1 (
<a href="https://github.com/PCSX2/pcsx2/issues/1937" class="mycode_url">#1937</a>
). After analyzing the issue, we found out that these versions have some
issues with generating MMX opcodes. A
<a href="https://gcc.gnu.org/bugzilla/show_bug.cgi?id=80799" class="mycode_url">bug report</a>
regarding the issue was filed on the GCC bug tracker and it was dealt
with quickly thanks to the GCC developers.

To prevent users from compiling PCSX2 on these affected versions, an
error will now be displayed advising the user to back-port the fixed
version or update GCC.

## [GSdx: Support for dumping GS Dumps in xz format](https://github.com/PCSX2/pcsx2/pull/1922)
- by [Gregory](https://github.com/gregory38) and [turtleli](https://github.com/turtleli)

A GS dump is a file which holds the data processed by the Graphics
synthesizer during a specific amount of time. This file is generated
with the help of the GSdx plugin and utilizing this, the developers
could easily replay the graphical bugs recorded by the users on the
dump.

There are two different ways available for capturing GS dumps:

-   <span class="mycode_b" style="font-weight: bold;"> SHIFT + F8
    </span> - Single frame dump. (Captures GS information of a single
    frame)
-   <span class="mycode_b" style="font-weight: bold;"> CONTROL + SHIFT +
    F8 </span> - Multiple frame dump (Captures GS information until you
    stop pressing your control key)


GS dumps are generally large in size and they could even exceed the size
of 1 GB at some cases when capturing multiple frame dumps! To avoid
creating huge files, GS dumps are now directly dumped in the .xz format
for single frame dumps. Compression is only limited to single frame
dumps for now as multiple frame dumps take longer time to compress
leading to a freeze for several minutes.

## [GSdx-OpenGL: Reduce Geometry shader overhead](https://github.com/PCSX2/pcsx2/pull/1995)
- by [Gregory](https://github.com/gregory38)

The GLSL shader operations were modified in order to reduce the overhead
in the geometry shader. This reduction in overhead is achieved by
outputting 1 strip of 2 triangles instead of 2 strips of 1 triangle at
certain scenarios.

Here are some benchmarks of the change taken from Nouveau/Mesa
drivers.

{{< img cols="6" src="./img/shader-opt.webp">}}

However, the performance gain on games should be very small. You might
gain 1-2 fps at most cases and potentially higher if the bottleneck is
the geometry shader execution.

## [GSdx-HW: Revamped buffer size calculation for custom resolutions](https://github.com/PCSX2/pcsx2/pull/1942)
- by [ssakash](https://github.com/ssakash)

There is a certain configuration option of GSdx known as <span
class="mycode_b" style="font-weight: bold;"> "Large Framebuffer" </span>
. When enabled, this option would increase the emulation accuracy in
upscaled resolutions at the cost of extra workload on the GPU.

Here's an example showing the effect of <span class="mycode_b"
style="font-weight: bold;"> Large Framebuffer </span> on ICO,

{{< img-cmp-slider before="./img/ico-before.png" after="./img/ico-after.png">}}

Disabling the <span class="mycode_b" style="font-weight: bold;"> Large
Framebuffer </span> option could cause severe glitches in upscaled
resolutions like the one shown above but only a limited amount of games
seem to rely on this option to function properly, so the extra GPU
workload introduced by enabling this option would end up useless at
games which don't need it.

To avoid such cases, <span class="mycode_b" style="font-weight: bold;">
ssakash </span> has implemented a new buffer size calculation algorithm
which increases the framebuffer size only at necessary scenarios. This
effect is achieved by monitoring the scissoring values of the frame
memory.

In a nutshell, this is how the new algorithm works compared to the
previous one.

```cpp
# Previous code
if ( Large Framebuffer )
   IncreaseFramebufferSize();

# New code
if ( Large Framebuffer )
{
   if ( IsExtraBufferSizeNecessary() )
        IncreaseFramebufferSize();
}
```

This new algorithm improved performance significantly on GS intensive
testcases and provided around 2-5% performance boost on normal test
cases. For example - On the previous algorithm, Ben 10 Alien Force:
Vligax Attacks (rendering at 3840x2160) took over 20 seconds to even
pass the loading screen! After this new implementation, it barely takes
3 seconds to pass the loading screen.

{{< img-cmp before="./img/old-algo.gif" after="./img/new-algo.gif">}}

Now you can safely enable <span class="mycode_b"
style="font-weight: bold;"> Large Framebuffer </span> on custom
resolutions without worrying about any useless GPU overhead.

## [Onepad: Update to use SDL2](https://github.com/PCSX2/pcsx2/pull/1895)
- by [Gregory](https://github.com/gregory38)

The Onepad plugin uses the SDL library to query the controller and
interpret the raw input into game actions. These inputs vary per
controller and are troublesome to deal with as you need to map the
kernel information to the PS2 equivalent value.
Here's how it worked with SDL 1.2:

{{< img cols="6" src="./img/sdl1.2_process.png">}}

Upgrading SDL to version 2.0, we present a generic virtual controller
abstracting the kernel information to Onepad. The values in the virtual
controller are then mapped to their respective PS2 equivalent values.
This gives us support for plug and play, automatic button mapping along
with reduction in code complexity of Onepad. On the other hand, this
change has also removed support for pressure sensitivity and the ability
to manually remap the controller. The legacy Onepad versions are still
available for the support of these features until they're added to the
latest version of Onepad.

Here's a nice schema for the new implementation:

{{< img cols="6" src="./img/sdl2_process.png">}}

Thanks to everyone who collected the info and helped with this report
once more, you know who you are

Next time I promise I'll post some news about our website, forum and
wiki being updated along with some new handy features for our community.
Stay tuned!
