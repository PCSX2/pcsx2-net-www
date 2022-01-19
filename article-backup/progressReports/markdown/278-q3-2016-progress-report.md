<div class="single-article">

<div class="item-page clearfix">

## [Q3 2016 progress report](/278-q3-2016-progress-report.html)

<div style="text-align:center;">

</div>

<img src="/images/stories/frontend/progress_reports/q3-2016/progress-rep-q3-2016.jpg" width="563" height="104" alt="Progress report q3 2016" />

------------------------------------------------------------------------

Hello and welcome to the glorious, fabulous, amazing PCSX2 progress
report for Q3 2016! Most of the changes for this quarter are more
technical than usual so I apologize in advance for some of the
explanations. With that out of the way lets jump right into it!

<span style="color: #ff00bf;"> \[Portability\] </span> **<span
style="text-decoration: underline;"> PCSX2: FreeBSD support </span>** by
[turtleli](https://github.com/turtleli)

A lot of platform specific code was converted to portable code and as a
result you can now use PCSX2 on FreeBSD!

<span style="color: #018ddd;"> \[Enhancement\] </span> **<span
style="text-decoration: underline;"> Linux: Support Vsync on Linux free
driver </span>** by [Gregory](https://github.com/gregory38)

OpenGL allows controlling Vsync from the application. Strangely there
isn't a standard extension for all platforms. Most drivers (aka
proprietary) use the extension GLX\_SWAP\_INTERVAL\_EXT. However the
Linux Free driver (aka Mesa) uses the extension
GLX\_SWAP\_INTERVAL\_MESA. PCSX2 now supports the latter as well so you
can set Vsync from within PCSX2 when using Mesa.

<span style="color: #018ddd;"> \[Enhancement\] </span> **<span
style="text-decoration: underline;"> Linux: Optimize number of active
constant buffers in the shader </span>** by
[Gregory](https://github.com/gregory38)

The main advantage of open source GPU drivers is that you can access the
source code. Because of this Gregory took the opportunity to profile
Mesa. He noticed a high number of validations of the GPU constant
buffers. Previously the GSdx GLSL code declared all constant buffers
even if they were unused. This is quite bad for performance as the
driver will validate them anyway. The code was rewritten to define only
useful buffers and this gained 1-2 fps on the free driver. <span
style="color: #018ddd;"> </span>

<span style="color: #018ddd;"> \[Enhancement\] </span> **<span
style="text-decoration: underline;"> Windows: No need to install DirectX
redistributables on Windows 8.1 and 10 </span>** by
[turtleli](https://github.com/turtleli)

For a long time it has been necessary for the DirectX redistributables
to be installed for PCSX2 to work. However, by moving to a newer Windows
SDK which isn't XP compatible and adjusting the code to load libraries
that are already present on these operating systems, the need for the
DirectX redistributables to be installed on Windows 8.1 and Windows 10
has been eliminated. (Caveat: SCP Xinput Wrapper users that need
pressure sensitivity will still require the DirectX redists to be
installed since the XInput wrapper wraps around XInput 1.3 and not
XInput 1.4)

<span style="color: #018ddd;"> \[Enhancement\] </span> **<span
style="text-decoration: underline;"> LilyPad: Add dance pad support and
revamped Lilypad dialog </span>** by
[FlatOut](https://github.com/FlatOutPS2)

In previous versions of the LilyPad plugin it was impossible to complete
certain dance moves in games like the Dance Dance Revolution/Dancing
Stage series where you were required to press both the up and down or
left and right buttons simultaneously. This has now been resolved making
all the game requiring such input fully playable. Additionally the
layout of the controller buttons on the pad settings page has been
improved to more closely resemble a modern analog controller/DualShock
configuration.

[<img src="/images/stories/frontend/progress_reports/q3-2016/lilypad-before_s.png" title="LilyPad before" width="353" height="335" alt="LilyPad before" />](/images/stories/frontend/progress_reports/q3-2016/lilypad-before.png)
[<img src="/images/stories/frontend/progress_reports/q3-2016/lilypad-after_s.png" title="LilyPad after" width="353" height="335" alt="LilyPad after" />](/images/stories/frontend/progress_reports/q3-2016/lilypad-after.png)

<span style="color: #ff3333;"> \[Bug Fix\] </span> **<span
style="text-decoration: underline;"> GSdx: Avoid illegal instruction
crash on older CPUs </span>** by [turtleli](https://github.com/turtleli)

PCSX2 is packaged with 5 different versions of the GSdx plugin that use
different instruction sets (SSE2, SSSE3, SSE4, AVX, AVX2) to provide
better performance for CPUs that support the newer instruction sets
while still allowing those with older CPUs to use the plugin. However on
older CPUs PCSX2 would freeze for long periods of time or crash when
enumerating the AVX or AVX2 versions of the GSdx plugins. This was due
to unsupported vector instructions being present in the global
variable/constant initialization code. This was resolved by deferring
the initialization of all global variables with vector instructions so
that they will only be executed by CPUs which support them.

<span style="color: #ff3333;"> \[Bug Fix\] </span> **<span
style="text-decoration: underline;"> OnePad: General improvements on
accuracy </span>** by [Gregory](https://github.com/gregory38)

Onepad received a major GUI overhaul recently. However there were
several reports of conflicts with 2 player configurations, problems with
loading save states and some issues with the value of axes in the
released state which caused .hack games to produce undesirable results.
These issues were fixed by properly analyzing the pad events in Lilypad
and by simulating the same behavior on OnePad.

<span style="color: #ff3333;"> \[Bug Fix\] </span> **<span
style="text-decoration: underline;"> PCSX2: Improve patch handling
</span>** by [avih](https://github.com/avih)

Recently it was brought to our attention that PCSX2 had some issues with
it's patching system. More specifically there were issues with loading
and unloading patches; for example patches were not cleared properly if
you rebooted in to a new game without closing PCSX2. If any patches were
loaded(including game fixes, custom user patches, and widescreen
patches) on the current game and you attempted to reboot in to a
different game you were very likely to have issues since the previous
patches were not unloaded. Avih made some commits to address this issue
and it seems resolved. You should have no problems rebooting in to one
game from another without closing PCSX2 now. If you notice that some
widescreen patches or game fixes don't work as expected, please let us
know.

<span style="color: #ff3333;"> \[Bug Fix\] </span> **<span
style="text-decoration: underline;"> PCSX2: Accurate video mode
detection </span>** by [ssakash](https://github.com/ssakash)

Previously, PCSX2 used to detect the video mode based on the color burst
value of the SMODE2 register which was very limited and it only allowed
us to differentiate between NTSC/PAL/Progressive. Additional video modes
were ignored and in addition some interlaced modes were reported as
progressive. Recently the video mode detection code was moved to the
**Syscall()** function which triggers the initialization of video modes
whenever the function **SetGsCrt()** is called. Moving the code allows
us to accurately detect a wider range of video modes supported by the
PS2.

<span style="text-decoration: underline;"> **Video modes (Before)**
</span>

1.  NTSC
2.  PAL
3.  Progressive

<span style="text-decoration: underline;"> **Video modes (Now)** </span>

1.  NTSC
2.  PAL
3.  VESA
4.  HDTV 480p
5.  HDTV 576p
6.  HDTV 720p
7.  HDTV 1080i
8.  HDTV 1080p

<span style="color: #ff3333;"> \[Bug Fix\] </span> **<span
style="text-decoration: underline;"> GSdx: Alpha test improvement
</span>** by [Gregory](https://github.com/gregory38)

A standard rasterization pipeline generates two pieces of information: a
color sample and a depth sample. The graphics pipeline allows doing some
tests on those samples to decide whether to keep or discard the
fragment. Taking a depth test as an example, if the depth of the current
sample is below the depth of the old sample it means the object is
behind it so you need to discard it. Older GPUs and the GS support
testing based on the alpha value of the color. Current GPUs don't
support this but you can easily emulate it in a shader. So far so good
but on the GS there is a catch (isn't there always!?) - you can either
discard the color OR the depth, not both. A modern GPU will discard
both. Gabest had implemented a 2 pass shader to handle it which worked
fine in most cases but some games were picky as usual. Gregory did some
work on the issue and managed to come up with a better solution that
works for those picky games too. For the full explanation of that please
look forward to a blog entry on the subject soon!

[<img src="/images/stories/frontend/progress_reports/q3-2016/burnout-before_s.png" title="Burnout before" width="353" height="247" alt="Burnout before" />](/images/stories/frontend/progress_reports/q3-2016/burnout-before.png)
[<img src="/images/stories/frontend/progress_reports/q3-2016/burnout-after_s.png" title="Burnout after" width="353" height="247" alt="Burnout after" />](/images/stories/frontend/progress_reports/q3-2016/burnout-after.png)

  
<span style="color: #ff3333;"> \[Bug Fix\] </span> **<span
style="text-decoration: underline;"> GSdx: Improved offset detection
</span>** by [FlatOut](https://github.com/FlatOutPS2)

Certain PS2 games offset the display rectangle by a very small value.
Previously for such games GSdx had applied these offsets when merging
the display rectangles. While this might look fine on a CRT television
it causes blurring issues on a monitor. The issue was fixed by applying
these minor offsets only when the frame memory has an offset.

[<img src="/images/stories/frontend/progress_reports/q3-2016/worms-before_s.png" title="Worms 3D before" width="353" height="265" alt="Worms 3D before" />](/images/stories/frontend/progress_reports/q3-2016/worms-before.png)
[<img src="/images/stories/frontend/progress_reports/q3-2016/worms-after_s.png" title="Worms 3D after" width="353" height="265" alt="Worms 3D after" />](/images/stories/frontend/progress_reports/q3-2016/worms-after.png)

<span style="color: #ff3333;"> \[Bug Fix\] </span> **<span
style="text-decoration: underline;"> GSdx: Proper custom resolution
scaling </span>** by [ssakash](https://github.com/ssakash)

Previously texture cache code for custom resolution scaling was full of
hacks to workaround framebuffer size limitations. Custom resolution
scaling/buffer management code has now been reworked to avoid many
issues. Here's a list of recent improvements made on custom resolution
scaling:

-   Add proper rounding when unscaling texture size. (Fixes
    crashes/glitches on ICO and Dragonball Z: Budokai Tenkaichi 3)
-   Remove scaling hack which limited scaling size based on the scissor
    value.
-   Ignore frame memory offsets when calculating dimension values of
    display rectangle.
-   Improve scaling of framebuffer size on custom resolution.
-   Port half-pixel offset hack to custom resolution. (Fixes blurring
    issues on games when upscaled)

**<span style="text-decoration: underline;"> Dragon Ball Z : Budokai
Tenkaichi 3 </span>**

[<img src="/images/stories/frontend/progress_reports/q3-2016/dbz-before_s.png" title="DBZ: Budokai Tenkaichi 3 before" width="353" height="353" alt="DBZ: Budokai Tenkaichi 3 before" />](/images/stories/frontend/progress_reports/q3-2016/dbz-before.png)
[<img src="/images/stories/frontend/progress_reports/q3-2016/dbz-after_s.png" title="DBZ: Budokai Tenkaichi 3 after" width="353" height="353" alt="DBZ: Budokai Tenkaichi 3 after" />](/images/stories/frontend/progress_reports/q3-2016/dbz-after.png)

<span style="text-decoration: underline;"> **ICO** </span>

[<img src="/images/stories/frontend/progress_reports/q3-2016/ico-before_s.jpg" title="ICO before (with half-pixel offset)" width="353" height="353" alt="ICO before (with half-pixel offset)" />](/images/stories/frontend/progress_reports/q3-2016/ico-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q3-2016/ico-after_s.jpg" title="ICO after (with half-pixel offset)" width="353" height="353" alt="ICO after (with half-pixel offset)" />](/images/stories/frontend/progress_reports/q3-2016/ico-after.jpg)

Lastly is something that doesn't really fall under any specific
category. There have always been rumors that PCSX2's code is completely
awful/bad/broken/insert your favorite negative adjective here.
Personally we disagree, but if you think so PCSX2 is open source so feel
free to help us improve it.

That said recently Gregory decided to run some analyses on the code to
improve the situation. This isn't something we haven't done before but
it's a good opportunity to highlight it. Currently PCSX2 can be compiled
with 4 compilers: Visual Studio, ICC, GCC and Clang and each compiler
has it's own set of warnings.

As a Linux developer Gregory mostly works with GCC. At this point only
14 warnings remain in that compiler while the situation with Visual
Studio is good too. Clang reports a lot of warnings (570) but please
note that only 51 of them are worth investigating. ICC doesn't report
any unique warnings that the other compilers don't reveal.

PCSX2 was also profiled with several external tools like Coverity. PCSX2
is a very old project which contains old code so it doesn't use a lot of
new hyped language features to solve limitations that we don't have in
the first place. However there is always room for improvement. By
analyzing and profiling the code with these tools and addressing the
issues found we can greatly improve the overall robustness of the
program.

If you want some in depth information regarding the results of the
profiling and the steps we are taking to improve the situation then
please look forward to a blog post on the subject that will be coming
soon!

That's all of the notable changes for Q3!

Please look forward to our next progress report. We might have something
special for you...

[<img src="/images/stories/frontend/progress_reports/q3-2016/teaser_s.png" title="Teaser" width="353" height="257" alt="Teaser" />](/images/stories/frontend/progress_reports/q3-2016/teaser.png)

</div>

</div>
