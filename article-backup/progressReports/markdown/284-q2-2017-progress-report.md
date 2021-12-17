::: {.single-article}
::: {.item-page .clearfix}
## [Q2 2017 progress report](/284-q2-2017-progress-report.html) {#q2-2017-progress-report .contentheading}

::: {style="text-align:center;"}
:::

![Progress report q2
2017](/images/stories/frontend/progress_reports/q2-2017/progrepq22017.jpg){width="563"
height="104"}\
Hello followers and welcome to the Q2 2017 progress report. You might
notice it\'s not as exciting as the previous report, but that is because
the PCSX2 team has always slacked during summer time so this was to be
fully expected
![Razz](https://pcsx2.net/images/stories/frontend/smilies/tongue.gif){.yvSmiley
width="20" height="20"} That said, here are the most notable changes
since the last report

\
\
[ \[Bug-Fix\] ]{style="color: #ff3333;"} [ [PCSX2: Fix command-line
options](https://github.com/PCSX2/pcsx2/pull/1907)
]{style="font-weight: bold; text-decoration: underline;"} by
[turtleli](https://github.com/turtleli)\
\
Since the [re-addition of the command-line
interface](http://forums.pcsx2.net/Thread-blog-The-return-of-the-Commandline?pid=118520&highlight=commandline#pid118520){.mycode_url}
by former developer Air, the command-line code has remained untouched
for years with issues arising on it as the other areas of the emulator
were improved. The known issues of the command line interface were:

-   Booting the ISO from the commandline would fail when CDVD plugin is
    selected on the PCSX2 GUI and vice versa.
-   The \--nodisc command line option failed to work.
-   The current ISO selection was cleared when any boot source other
    than ISO was used in the command line.

[ Turtleli ]{.mycode_b style="font-weight: bold;"} has fixed all of
these issues and the command line options are now back to functioning
properly as they should.\
\
[ \[Bug-Fix\] ]{style="color: #ff3333;"} [ [PCSX2-Counters: Proper
tracking of scalar limit](https://github.com/PCSX2/pcsx2/pull/2014)
]{style="font-weight: bold; text-decoration: underline;"} by
[ssakash](https://github.com/turtleli)\
\
PCSX2 allows modification of the base framerate limit in the Emulation
settings dialog. The value of the base framerate limit is 100% by
default and can be modified to effectively increase/decrease the speed
of the game.\
\
We recently found out that the framerate limit wasn\'t updated according
to the value requested by the user, due to a discrepancy in resetting
the vertical synchronization timer logic whenever new settings were
written to the emulator. The issue has now been fixed by forcing the
reset of the timer logic whenever the emulation settings are updated.\
\
[ \[Upstream\] ]{style="color: #9970f9;"} [ [CMake: Blacklist GCC
7.0/7.1 versions](https://github.com/PCSX2/pcsx2/pull/1949)
]{style="font-weight: bold; text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)\
\
It recently came to our attention that hardware rendering has severe
issues when PCSX2 is compiled using GCC versions 7.0 and 7.1 (
[\#1937](https://github.com/PCSX2/pcsx2/issues/1937){.mycode_url} ).
After analyzing the issue, we found out that these versions have some
issues with generating MMX opcodes. A [bug
report](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=80799){.mycode_url}
regarding the issue was filed on the GCC bug tracker and it was dealt
with quickly thanks to the GCC developers.\
\
To prevent users from compiling PCSX2 on these affected versions, an
error will now be displayed advising the user to back-port the fixed
version or update GCC.\
\
[ \[Enhancement\] ]{style="color: #018ddd;"} [ [GSdx: Support for
dumping GS Dumps in xz format](https://github.com/PCSX2/pcsx2/pull/1922)
]{style="font-weight: bold; text-decoration: underline;"} by
[Gregory](https://github.com/gregory38) and
[turtleli](https://github.com/turtleli)\
\
A GS dump is a file which holds the data processed by the Graphics
synthesizer during a specific amount of time. This file is generated
with the help of the GSdx plugin and utilizing this, the developers
could easily replay the graphical bugs recorded by the users on the
dump.\
\
There are two different ways available for capturing GS dumps:

-   [ SHIFT + F8 ]{.mycode_b style="font-weight: bold;"} - Single frame
    dump. (Captures GS information of a single frame)
-   [ CONTROL + SHIFT + F8 ]{.mycode_b style="font-weight: bold;"} -
    Multiple frame dump (Captures GS information until you stop pressing
    your control key)

\
GS dumps are generally large in size and they could even exceed the size
of 1 GB at some cases when capturing multiple frame dumps! To avoid
creating huge files, GS dumps are now directly dumped in the .xz format
for single frame dumps. Compression is only limited to single frame
dumps for now as multiple frame dumps take longer time to compress
leading to a freeze for several minutes.\
\
[ \[Optimization\] ]{style="color: #ff6347;"} [ [GSdx-OpenGL: Reduce
Geometry shader overhead](https://github.com/PCSX2/pcsx2/pull/1995)
]{style="font-weight: bold; text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)\
\
The GLSL shader operations were modified in order to reduce the overhead
in the geometry shader. This reduction in overhead is achieved by
outputting 1 strip of 2 triangles instead of 2 strips of 1 triangle at
certain scenarios.\
\
Here are some benchmarks of the change taken from Nouveau/Mesa drivers.\
\
[![Shader
Optimisation](/images/stories/frontend/progress_reports/q2-2017/shader-opt.png "Shader Optimisation"){width="640"
height="327"}](/images/stories/frontend/progress_reports/q2-2017/shader-opt.png)\
\
However, the performance gain on games should be very small. You might
gain 1-2 fps at most cases and potentially higher if the bottleneck is
the geometry shader execution.\
\
[ \[Optimization\] ]{style="color: #ff6347;"} [ [GSdx-HW: Revamped
buffer size calculation for custom
resolutions](https://github.com/PCSX2/pcsx2/pull/1942)
]{style="font-weight: bold; text-decoration: underline;"} by
[ssakash](https://github.com/ssakash)\
\
There is a certain configuration option of GSdx known as [ \"Large
Framebuffer\" ]{.mycode_b style="font-weight: bold;"} . When enabled,
this option would increase the emulation accuracy in upscaled
resolutions at the cost of extra workload on the GPU.\
\
Here\'s an example showing the effect of [ Large Framebuffer ]{.mycode_b
style="font-weight: bold;"} on ICO,\
\
[![Ico
Before](/images/stories/frontend/progress_reports/q2-2017/ico-befores.png "Ico Before"){width="353"
height="353"}](/images/stories/frontend/progress_reports/q2-2017/ico-before.png)
[![Ico
after](/images/stories/frontend/progress_reports/q2-2017/ico-afters.png "Shader Optimisation"){width="353"
height="353"}](/images/stories/frontend/progress_reports/q2-2017/ico-after.png)\
Disabling the [ Large Framebuffer ]{.mycode_b
style="font-weight: bold;"} option could cause severe glitches in
upscaled resolutions like the one shown above but only a limited amount
of games seem to rely on this option to function properly, so the extra
GPU workload introduced by enabling this option would end up useless at
games which don\'t need it.\
\
To avoid such cases, [ ssakash ]{.mycode_b style="font-weight: bold;"}
has implemented a new buffer size calculation algorithm which increases
the framebuffer size only at necessary scenarios. This effect is
achieved by monitoring the scissoring values of the frame memory.\
\
In a nutshell, this is how the new algorithm works compared to the
previous one.

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      # Previous code            if ( Large Framebuffer )            IncreaseFramebufferSize();                  # New code            if ( Large Framebuffer )            {            if ( IsExtraBufferSizeNecessary() )            IncreaseFramebufferSize();            }     `
:::
:::

\
This new algorithm improved performance significantly on GS intensive
testcases and provided around 2-5% performance boost on normal test
cases. For example - On the previous algorithm, Ben 10 Alien Force:
Vligax Attacks (rendering at 3840x2160) took over 20 seconds to even
pass the loading screen! After this new implementation, it barely takes
3 seconds to pass the loading screen.\
\
[![Old
Algorithm](/images/stories/frontend/progress_reports/q2-2017/old-algo.gif "Old Algorithm"){width="480"
height="270"}](/images/stories/frontend/progress_reports/q2-2017/old-algo.gif)
[![New
Algorithm](/images/stories/frontend/progress_reports/q2-2017/new-algo.gif "New Algorithm"){width="480"
height="270"}](/images/stories/frontend/progress_reports/q2-2017/new-algo.gif)\
Now you can safely enable [ Large Framebuffer ]{.mycode_b
style="font-weight: bold;"} on custom resolutions without worrying about
any useless GPU overhead.
![Smile](https://pcsx2.net/images/stories/frontend/smilies/smile.gif){.yvSmiley
width="20" height="20"}\
\
[ \[Enhancement\] ]{style="color: #018ddd;"} [ [Onepad: Update to use
SDL2](https://github.com/PCSX2/pcsx2/pull/1895)
]{style="font-weight: bold; text-decoration: underline;"} by
[Gregory](https://github.com/gregory38)\
\
The Onepad plugin uses the SDL library to query the controller and
interpret the raw input into game actions. These inputs vary per
controller and are troublesome to deal with as you need to map the
kernel information to the PS2 equivalent value.\
Here\'s how it worked with SDL 1.2:\
[![SDL
1.2](/images/stories/frontend/progress_reports/q2-2017/sdl1.2_process_s.png "SDL 1.2"){width="493"
height="150"}](/images/stories/frontend/progress_reports/q2-2017/sdl1.2_process.png)\
Upgrading SDL to version 2.0, we present a generic virtual controller
abstracting the kernel information to Onepad. The values in the virtual
controller are then mapped to their respective PS2 equivalent values.
This gives us support for plug and play, automatic button mapping along
with reduction in code complexity of Onepad. On the other hand, this
change has also removed support for pressure sensitivity and the ability
to manually remap the controller. The legacy Onepad versions are still
available for the support of these features until they\'re added to the
latest version of Onepad.\
\
Here\'s a nice schema for the new implementation:\
[![SDL
2](/images/stories/frontend/progress_reports/q2-2017/sdl2_process_s.png "SDL 2"){width="492"
height="150"}](/images/stories/frontend/progress_reports/q2-2017/sdl2_process.png)

Thanks to everyone who collected the info and helped with this report
once more, you know who you are
![Smile](https://pcsx2.net/images/stories/frontend/smilies/smile.gif){.yvSmiley
width="20" height="20"} Next time I promise I\'ll post some news about
our website, forum and wiki being updated along with some new handy
features for our community. Stay tuned!
:::
:::
