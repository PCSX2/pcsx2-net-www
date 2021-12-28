<div class="single-article">

<div class="item-page clearfix">

## [Q...1? 2017 progress report](/283-q1-2017-progress-report.html)

<div style="text-align:center;">

</div>

<img src="/images/stories/frontend/progress_reports/q1-2017/progress-rep-q1-2017.jpg" width="563" height="104" alt="Progress report q1 2017" />

The wait is over! (if there were people still waiting on us
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />
) The Q1 2017 progress report is here, albeit we are late once more.
Don't blame us, blame all these wonderful fixes you will find below:

<span style="font-size: xx-large;"> <span style="font-weight: bold;">
<span style="text-decoration: underline;"> Core </span> </span>
</span>  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [Core: VIF
unpack speed optimization](https://github.com/PCSX2/pcsx2/pull/1706)
</span> by [Gregory](https://github.com/gregory38)  
  
The PlayStation 2 Vector Interface Unit (VIF) is a pathway between the
main memory and the Graphics synthesizer, one of its main functions is
to unpack scalar data into vector data (i.e. converting 3 32-bits
scalars into 3 128-bit vectors).  
  
PCSX2 uses dynamic recompilation to emulate the VIF unpacking functions.
The recompiled code is cached using a hash map to prevent unnecessary
code recompilation. Recently, the code was profiled to identify
potential bottlenecks. This identified an issue in the hash map lookup
code.  
  
Each hash map entry has 16 contiguous bytes, consisting of a 12 byte key
that holds the unpacking parameters and a 4 byte value that contains the
recompiled code address. The hash map key was built with 1/2/4 byte
store operations and was subsequently read back during the hash lookup
with a 16-byte vector read operation. This prevented store to load
forwarding, where a load operation can avoid accessing data through
memory and can obtain data from a previous store operation instead, and
caused the CPU to stall unnecessarily since all the store operations had
to be completed before the vector readback operation could execute.  
  
The hash map key generation and lookup code was rewritten to enable
store to load forwarding and to improve portability. This provides a
2-3X improvement on the hash lookup speed and translates to a small FPS
increase.

<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [VU0: Fix CFC2
transfers from TPC register](https://github.com/PCSX2/pcsx2/pull/1835)
</span> by [volodymyrkutsenko](https://github.com/volodymyrkutsenko)

  
The CFC2 instruction is used to transfer 32-bit integer data from the
COP2 control registers to the General Purpose Registers (GPRs) of the
Emotion Engine. It was recently noticed that a special behavior occurs
when the CFC2 instruction transfers data from the TPC register, which
contains the Program Counter (PC) the VU0 micro subroutine was stopped
at.  
  
The following code sequence is present in some games,

<div class="codeblock">

<div class="title">

Code:

</div>

<div class="body" dir="ltr">

`      cfc2 t4, TPC            ctc2 t4, CMSAR0            callmsr     `

</div>

</div>

  
On this following sequence of code,

-   The CFC2 instruction transfers the TPC data to the t4 register.
-   The CTC2 instruction subsequently transfers the data to the CMSAR0
    register, which holds the starting address of the VU0 micro
    subroutine divided by 8.
-   The VCALLMSR instruction then starts the micro subroutine at the
    address specified by the CMSAR0 register.

  
This sequence did not work on PCSX2 because the CMSAR0 register requires
an address divided by 8, yet the address transferred from the TPC
register to the CMSAR0 register was not divided by 8. This sequence,
however, worked perfectly fine on the PS2.  
  
Apparently, the address that the CFC2 instruction transfers from the TPC
register has already been divided by 8. This was verified with homebrew
tests. Accounting for this behavior fixes the graphical glitches in
"Street Fighter EX 3" and "R: Racing Evolution". We are sincerely sorry
for fixing this long standing bug plaguing Street Fighter EX3, which
started with [missing
skirts](http://forums.pcsx2.net/attachment.php?aid=51971) , developed to
[skirts levitating showing
panties](https://cloud.githubusercontent.com/assets/7338867/21550619/b0bd2abc-cdd1-11e6-9a36-ee852c0c8226.png)
and concluded in correct emulation
<img src="https://pcsx2.net/images/stories/frontend/smilies/sad.gif" class="yvSmiley" width="20" height="20" alt="Sad" />  
  
[<img src="/images/stories/frontend/progress_reports/q1-2017/sfex-before-s.png" title="Street Fighter EX 3" width="353" height="199" alt="Street Fighter EX 3" />](/images/stories/frontend/progress_reports/q1-2017/sfex-before.png)
[<img src="/images/stories/frontend/progress_reports/q1-2017/sfex-after-s.png" title="Street Fighter EX 3" width="353" height="199" alt="Street Fighter EX 3" />](/images/stories/frontend/progress_reports/q1-2017/sfex-after.png)  
  
<span style="text-decoration: underline;"> <span
style="font-weight: bold;"> <span style="font-size: x-large;"> GSdx
</span> </span> </span>  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
[GSdx: OSD Manager](https://github.com/PCSX2/pcsx2/pull/1431) </span>
</span> by [Maxxus](https://github.com/JasonBrownDeveloper) and
[FlatOut](https://github.com/FlatOutPS2)  
  
It may surprise many that for such a comprehensive PS2 emulator we did
not display On-screen Display (OSD) messages relating to information
such as save/load states or frame-rate information.  
  
Maxxus started work in July 2016 maintaining committed all the way to
the final merge of this feature early January working through design
options, fonts, compatibility and stamping out bugs.  
  
As Maxxus is a Linux only user, the OSD did not yet have a UI on
Windows. FlatOut later added this along with some minor improvements.
Another consequence of Maxxus not being a Windows user is that the OSD
is currently not available for the Direct3D renderers. Only the OpenGL
renderers are supported for now.  
  
The OSD consists of 2 functions, the "Log" and the "Monitor". The "Log",
enabled by default, prints the console log messages returned by several
keys(F1-F3 Save States, F4/Tab Framelimiter) on screen. And "Monitor",
disabled by default, prints the current Framerate and EE/GS/VU
percentages on screen. The OSD settings can be configured in the <span
style="font-weight: bold;"> OSD Configuration </span> dialog located on
the GSdx plugin settings.  
  
Here are some screenshots of the new OSD log and OSD monitor feature in
action:  
  
[<img src="/images/stories/frontend/progress_reports/q1-2017/KH-OSD2-s.png" title="Kingdom Hearts 2 OSD" width="353" height="205" alt="Kingdom Hearts 2 OSD" />](/images/stories/frontend/progress_reports/q1-2017/KH-OSD2.png)
[<img src="/images/stories/frontend/progress_reports/q1-2017/OSD_monitor-s.jpg" title="OSD" width="353" height="199" alt="OSD" />](/images/stories/frontend/progress_reports/q1-2017/OSD_monitor.jpg)  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
[GSdx: Texture cache speed
optimization](https://github.com/PCSX2/pcsx2/pull/1766) </span> </span>
by [Gregory](https://github.com/gregory38)  
  
Textures are stored in the GS memory, which is split into 512 pages. For
each memory page, the GSdx texture cache manages a list of addresses of
textures present on the page.  
  
Textures may span across multiple pages, which makes efficient list
management difficult. When a texture is added to the cache, only the
lists of pages affected by the textures must be updated, but when a
texture is removed from the cache, all of the lists may need to be
searched to remove all references to the texture, which can be quite
slow.  
  
The texture cache was modified so that the page indices and addresses of
list elements related to a texture are stored with the texture data.
Although this requires more memory, it also makes it unnecessary to
search through all the lists to remove all references to the texture
data, which speeds up texture deletion.

<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [Windows Skylake
CPU slow software renderer
fix](https://github.com/PCSX2/pcsx2/pull/1741) </span> by
[turtleli](https://github.com/turtleli)

  
After switching to using Visual Studio 2015 on the buildbot to compile
PCSX2, some Windows Skylake users started reporting significant
performance issues when using the software renderer. Although it was
diagnosed as a threading issue, the issue was left unfixed for a long
time since the cause was unknown and none of the developers could
reproduce the issue.  
  
It turns out the performance issue was caused by excessive cacheline
contention. For each worker thread, there were two atomic variables
present on the same cacheline that were shared by both the GS and worker
threads. Both the GS and worker threads would access and modify at least
one of the variables on this cacheline, which resulted in false sharing
and caused terrible performance.  
  
The software renderer threading behavior was improved by removing some
unnecessary atomic operations. As a side effect, it eliminated one of
the variables involved in the false sharing and fixed the Windows
Skylake CPU issue.

<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [Software
renderer thread synchronization
fix](https://github.com/PCSX2/pcsx2/pull/1855) </span> by
[Gregory](https://github.com/gregory38)

  
The software renderer workload can be divided between multiple threads.
This workload division should not cause rendering issues. However, on
the game <span style="font-weight: bold;"> "Blood Will Tell" </span> ,
random graphical glitches were present when multiple threads were used,
which indicated that there was a race condition in the code.  
  
Finding out why a race condition occurs can be difficult. The nature of
the bug, however, provided a hint to where the issue laid - it only
affected a grayscale post-processing effect, which is a complex channel
shuffle effect. Noticing this, Gregory analyzed the related draw calls
and discovered that thread synchronization was performed when a frame
buffer was used as a texture, but not the other way round. This led to a
race condition where a draw call could write to a texture before it is
read by the previous draw call.  
  
The thread synchronization logic was updated to account for this
scenario, which fixed the graphical glitches.  
  
[<img src="/images/stories/frontend/progress_reports/q1-2017/blood_will_tell_before-s.png" title="Blood Will Tell" width="353" height="265" alt="Blood Will Tell" />](/images/stories/frontend/progress_reports/q1-2017/blood_will_tell_before.png)
[<img src="/images/stories/frontend/progress_reports/q1-2017/blood_will_tell_after-s.png" title="Blood Will Tell" width="353" height="265" alt="Blood Will Tell" />](/images/stories/frontend/progress_reports/q1-2017/blood_will_tell_after.png)  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [Improved
software renderer float
handling](https://github.com/PCSX2/pcsx2/pull/1843) </span> by
[Gregory](https://github.com/gregory38)

  
Two fixes have recently been made to the software renderer's float
handling mechanism, improving its accuracy.  
  
The first fix replaced the reciprocal instructions in the rasterizer
with division instructions. Although a division instruction is much
slower than a reciprocal instruction, it also has a much higher
precision, which helps avoid accuracy issues. This fixed the texture
sampling issues which were observed in <span style="font-weight: bold;">
Xenosaga Episode 1 </span> and <span style="font-weight: bold;"> Jak 3
</span> .  
  
The second fix reworked the STQ texture coordinate handling to avoid
floating point underflow/overflow issues. Before the fix, the texture
coordinates were always calculated as (S width (1 / Q), T height (1 /
Q)). However, the STQ values are sometimes near/equal to the maximum
floating point value, which could cause zero (1 / Q), infinity (S width,
T height), and NaN (0 infinity) to be generated. Now, whenever huge STQ
values are detected, the code calculates the texture coordinates as
((S/Q) width, (T/Q) height), which is slower but avoids the
underflow/overflow issues. This fixed the major texture issues in <span
style="font-weight: bold;"> Galerians: Ash </span> and <span
style="font-weight: bold;"> Let's make a J-League Pro Soccer Club '04
</span> .  
  
[<img src="/images/stories/frontend/progress_reports/q1-2017/jak3-before-s.png" title="Jak 3" width="353" height="265" alt="Jak 3" />](/images/stories/frontend/progress_reports/q1-2017/jak3-before.png)
[<img src="/images/stories/frontend/progress_reports/q1-2017/jak3-after-s.png" title="Jak 3" width="353" height="265" alt="Jak 3" />](/images/stories/frontend/progress_reports/q1-2017/jak3-after.png)
[<img src="/images/stories/frontend/progress_reports/q1-2017/gash_before_s.jpg" title="Galerians Ash" width="353" height="185" alt="Galerians Ash" />](/images/stories/frontend/progress_reports/q1-2017/gash_before.jpg)
[<img src="/images/stories/frontend/progress_reports/q1-2017/gash_after_s.jpg" title="Galerians Ash" width="353" height="185" alt="Galerians Ash" />](/images/stories/frontend/progress_reports/q1-2017/gash_after.jpg)  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
[GSdx: Removal of SSSE3 and AVX
configurations](https://github.com/PCSX2/pcsx2/pull/1790) </span>
</span>  
  
The use of instruction sets available on newer CPUs can significantly
boost performance at the cost of compatibility with older CPUs. For this
reason, 5 different builds of GSdx (SSE2, SSSE3, SSE4.1, AVX, AVX2) were
provided to maximize performance on newer CPUs, yet retain compatibility
with older CPUs. This, however, confused new users, who didn't know what
version of the plugin they should select.  
  
The software renderer JIT was recently updated so that, except for the
AVX2 build, it will detect and generate code using instruction sets up
to AVX at runtime, depending on what the CPU supports. This change
provided an opportunity to reduce the number of GSdx builds. Since the
hardware renderer performance of the SSSE3 and AVX builds were no better
than the SSE2 and SSE4.1 builds respectively, the decision was made to
drop the SSSE3 and AVX builds.  
  
This leaves us with 3 remaining GSdx builds:

-   SSE2 - compatible with almost all CPUs.
-   SSE4.1 - compatible with most CPUs (requires Intel Penryn / AMD
    Bulldozer or newer). Faster hardware renderer performance.
-   AVX2 - least compatible (requires Intel Haswell / AMD Ryzen or
    newer). Fastest hardware and software renderer performance.

  
<span style="color: #9970f9;"> \[Upstream\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [Blacklist AMD
driver](https://github.com/PCSX2/pcsx2/commit/26993380b16487649c2ae5f81741e7918ad1604c)
</span> by [Gregory](https://github.com/gregory38)  
  
The OpenGL renderer uses both separate shader objects and dual source
blending. This combination, however, causes rendering issues with AMD
drivers on Windows.  
  
Eventually a new driver was released by AMD and that fixed the broken
rendering. Unfortunately, the driver introduced a new regression which
could cause the system to crash. One of the succeeding drivers managed
to fix the crash issue, though however, it introduced the rendering
issue back once again.  
  
To avoid having to deal with this, separate shader objects will now be
disabled when the OpenGL renderer is used with a closed source AMD
driver, regardless of the operating system. We're hoping future AMD
drivers will be better, but we've been waiting for quite a long time.  
  
  
<span style="text-decoration: underline;"> <span
style="font-weight: bold;"> <span style="font-size: x-large;"> LilyPad
</span> </span> </span>  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
[LilyPad: neGcon controller
support](https://github.com/PCSX2/pcsx2/pull/1751) </span> </span> by
[FlatOut](https://github.com/FlatOutPS2)  
  
LilyPad now supports the neGcon analog controller, which can be used for
several PS1 and even PS2 titles like the Ridge Racer and Ace Combat
series.  
  
The key advantage of supporting this controller is that it allows for
analog controls in PS1 games that were released before the introduction
of the DualShock controller, and its analog throttle and brake buttons
are ideal for use in combination with a steering wheel controller.  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
[LilyPad: UI Changes](https://github.com/PCSX2/pcsx2/pull/1831) </span>
</span> by [FlatOut](https://github.com/FlatOutPS2)  
  
Several new options have been added to the LilyPad user interface. The
most notable is the addition of a <span style="font-weight: bold;">
Quick Setup </span> button on the Pad tabs. This button allows for
quickly setting up all the default pad buttons one after the other
without having to click on and assign each button individually. A text
box next to this option has also been added to give visual feedback of
the binding process, showing which button to press and if the binding
has finished.  
  
Another new option is <span style="font-weight: bold;"> Exclude Input
</span> . This option allows for deactivating a specific input on your
device, so that it will be ignored when trying to bind other inputs.
This can be helpful when binding controls for a device with an input
that's difficult to center like an accelerator, or just always active
like a faulty button or analog stick.  
  
The <span style="font-weight: bold;"> L3 Toggles Turbo </span> hack,
which triggered Turbo mode (200% speed) in PCSX2, has been removed. It
has been replaced by a new Turbo button in the Special Inputs section of
the Pad tabs. This new Turbo button still fulfills the same function as
the old Turbo hack, but it can be assigned to any input the user desires
instead of just the L3 button which the hack used.  
  
Last but not least is the introduction of a <span
style="font-weight: bold;"> Restore Defaults </span> button on the
general tab. This option makes it possible to reset all current LilyPad
setings and bindings to those of the default Lilypad settings file
without having to go to the inis folder and manually removing the
file.  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
[LilyPad: Core improvements](https://github.com/PCSX2/pcsx2/pull/1831)
</span> </span> by [FlatOut](https://github.com/FlatOutPS2)  
  
Detection of analog and pressure sensitive controls has been improved.
Previously, some games like Driving Emotion Type-S didn't enable analog
and/or pressure sensitive mode because a check for analog support only
returned the correct values when the controller was already in analog
mode, making the affected games believe only digital controls were
available.  
  
The <span style="font-weight: bold;"> Use analog mode if possible
</span> option has been extended to work for PS2 games and PS1 games
running in PCSX2.  
  
Additionally a warning will now be printed in the PCSX2 console log if
no controls are bound to an active device, and when a device has
subsequently been connected or setup.  
  
And finally a long standing bug that blocked the F4 button (hotkey for
disabling framelimiter) has been traced to LilyPad. A function that
checked if the alt button was being held down did not get reset if the
alt button was still being held down while the process lost focus. The
issue was usually triggered by using alt-tab to focus on another
application. The bug has now been resolved, which means the F4 button
will no longer suddenly stop working.

We are very happy we had new people contributing once more, with more
submitting new pull requests these days too! Thanks to all our senior
members for patiently reviewing and tutoring the new contributors,
helping them understand how PCSX2 works and how to efficiently implement
their code. As usual, thanks to all the people who worked for this
report, with ssakash taking the lead and newcomer Akasha efficiently
helping getting the job done (the rest of you don't flame me for not
getting mentioned
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />
)  
  
Till next time! (we won't be on time
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />
)

</div>

</div>
