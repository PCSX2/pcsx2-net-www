<div class="single-article">

<div class="item-page clearfix">

## [Q4 2016 progress report](/281-q4-2016-progress-report.html)

<div style="text-align:center;">

</div>

<img src="/images/stories/frontend/progress_reports/q4-2016/progress-rep-q4-2016.jpg" width="563" height="104" alt="Progress report q4 2016" />

Finally the Q4 2016 progress report! Yes we know it's a bit late but you
will find it was worth the wait! On to the changes:

<span style="color: #ff00bf;"> \[Portability\] </span> **<span
style="text-decoration: underline;"> cdvdgigaherz: Linux port </span>**
by [turtleli](https://github.com/turtleli)  
  
cdvdGigaherz was originally a Windows only CD/DVD disk reading plugin.
However, by using portable code to replace as much of the Windows
specific code as possible and adding a Linux disk reading backend and
GUI, cdvdGigaherz now works on Linux.  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
PSX mode compatibility </span> </span> by
[Rama](https://github.com/ramapcsx2) and
[Pseudonym](https://github.com/sudonim1)  
  
Previously, PCSX2 had always failed to play PSX games due to
unimplemented devices that are necessary for backward compatibility.
<span style="font-weight: bold;"> Rama </span> had then decided to reach
out to other developers to fix the problem. He found someone on the
assemblergames.com forums that just so happened to be an expert on PS2's
IOP sub bus hardware: <span style="font-weight: bold;"> wisi </span> !
Wisi implemented the missing PGIF device, added the required hardware
hooks and with that PCSX2 was finally able to boot into PSX mode!  
  
However, most of the PSX games still suffered from bad audio and the
source of the issue was the SPU2 plugin. It was assumed that in the
backward compatibility mode of the SPU2, the hardware provides a mapping
window into SPU2 RAM, which wasn't properly handled by the plugin. <span
style="font-weight: bold;"> Pseudonym </span> then fixed all the issues
related to the mapping management and SPU2-X started providing much
better results. At this time, he also redid the reverb algorithm (which
is shared between PSX and PS2 modes) and improved it significantly
towards an exact replica of the original. The following waveform
comparison shows that there are still some unsolved problems with the
pulse response, but the delay and feedback are spot on! It sounds much
better than the older implementation and benefits PSX and PS2 games
alike.  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/spu2x-reverb-s.jpg" title="SPU2-X reverb" width="793" height="251" alt="SPU2-X reverb" />](/images/stories/frontend/progress_reports/q4-2016/spu2x-reverb.jpg)  
  
Here are some screenshots of Tekken 3, Ridge Racer and Driver running
under PCSX2's brand new PSX mode:  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/tekken3-ps1-s.jpg" title="Tekken 3" width="353" height="218" alt="Tekken 3" />](/images/stories/frontend/progress_reports/q4-2016/tekken3-ps1.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/driver-ps1-s.jpg" title="Driver" width="353" height="177" alt="Driver" />](/images/stories/frontend/progress_reports/q4-2016/driver-ps1.jpg)  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/ridgeracer-ps1-s.jpg" title="Ridge Racer" width="353" height="265" alt="Ridge Racer" />](/images/stories/frontend/progress_reports/q4-2016/ridgeracer-ps1.jpg)  
  
<span style="font-weight: bold;"> Note </span> :

-   PSX backward compatibility is still in its nascent state, so bug
    reports related to it will be dismissed, until the emulation has
    matured enough.
-   Also quite interesting: None of the PSX emulators used for
    comparison produces reverb waveforms that look anything like the
    original hardware!

  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
PSX mode: Proper video mode initialization </span> </span> by
[ssakash](https://github.com/ssakash)  
  
PCSX2 initializes the video modes based on the parameters of the <span
style="font-weight: bold;"> SetGsCrt() </span> function call, however,
only PS2 games made use of this SYSCALL and PSX games didn't, this left
all the PSX games in an uninitialized video mode state making them
susceptible to various timing issues.  
  
<span style="font-weight: bold;"> ssakash </span> fixed this issue by
initializing the video mode based on the color subcarrier frequency
(CMOD) when the video mode is at an uninitialized state, this change
finally made PAL PSX games to output at their proper vertical
frequency.  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> **<span
style="text-decoration: underline;"> LilyPad: Add separate bindings for
each pad type </span>** by [FlatOut](https://github.com/FlatOutPS2)  
  
Before this update, all pad types (DualShock 2, Guitar, Pop'n Music
controller) shared the same button configuration. But your ideal setup
for the DualShock 2 might not be the same as your preferred Guitar
setup, so you had to change the button configuration or load another
LilyPad configuration each time you wanted to play a game with the one
of the other pad types. This has now been resolved by giving each of the
pad types their own individual configuration.  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> **<span
style="text-decoration: underline;"> LilyPad: Add PlayStation Mouse
support </span>** by [FlatOut](https://github.com/FlatOutPS2)  
  
The PlayStation Mouse has been added as a new pad type. This mouse can
be used on a number of PS1 titles such as Myst and Sim City 2000. There
are no known PS2 titles that support it, but thanks to PCSX2's new PSX
backward compatibility, you can now use it with PCSX2.  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> **<span
style="text-decoration: underline;"> LilyPad: Updated user interface
</span>** by [FlatOut](https://github.com/FlatOutPS2)  
  
The LilyPad user interface has been updated by removing some of the
buttons below the diagnostics and input bindings lists and incorporating
those into the corresponding list as right-click options. The
functionality is also still available by keyboard input. The input
configurations on the Pad tabs have been moved to a separate page - like
the force feedback configuration - to clearly separate the configuration
options from the available bindings.  
  
Additionally, several informational tooltips have been added to better
explain how the LilyPad options work, which should help setting up
LilyPad just the way you want it.  
  
Three new options have been added to the Pad tabs. A device select
option that hides bindings and disables binding new inputs from all
non-selected devices on the bindings list. This also avoids input
conflict issues when one controller is recognized as several devices
through different APIs.  
  
A skip deadzone option has been added to the input configuration page.
With the normal dead zone, if the control input value is below the given
threshold value, the input is just ignored. However, some controllers
benefit from shortening the input range by skipping a deadzone. This
allows most of the movement of the input to be used and it will require
less movement before your input is picked up by a game.  
  
The third new option is a "configure on bind" checkbox. With this
enabled you'll be sent straight to the input configuration for each
input you bind.  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/lilypad-before-s.jpg" title="Lilypad UI" width="353" height="298" alt="Lilypad UI" />](/images/stories/frontend/progress_reports/q4-2016/lilypad-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/lilypad-after-s.jpg" title="Lilypad UI" width="353" height="298" alt="Lilypad UI" />](/images/stories/frontend/progress_reports/q4-2016/lilypad-after.jpg)  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSdx: Hardware mipmapping support </span> </span> by [Gregory  
](https://github.com/gregory38)  
Previously, all the hardware renderers suffered from mipmapping issues
due to various unimplemented functions. For example, whenever mipmapping
is performed, it is necessary to set the base pointer address and the
buffer width of the textures of two (or) more mimpap levels, even this
basic function was not emulated before as there wasn't much priority on
getting mipmapping to work on hardware renderers.  
  
The main reasons were that only some few games (around 10-30) had
mipmapping related issues which is quite a small amount of games in
comparison to the whole PS2 library and there was also a possibility
that mipmapping could influence the performance negatively, so none of
the developers were planning on tackling it, as at that time, there were
far more severe bugs related to the CLUT, Texture cache, display
rectangle setup and Z buffer which were more prioritized.  
  
Most of the end users didn't really understand our priorities and there
were lots of negative posts related to not implementing hardware
mipmapping and it grew out of control as we kept releasing our progress
reports. There were even some rumours spreading that hardware mipmapping
is impossible without a rewrite of texture cache. To shut them all up,
**Gregory** took all the responsibility in his hands and finally added
support for hardware mipmapping!  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/ratchet-before1-s.jpg" title="Ratchet and Clank" width="353" height="309" alt="Ratchet and Clank" />](/images/stories/frontend/progress_reports/q4-2016/ratchet-before1.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/ratchet-after1-s.jpg" title="Ratchet and Clank" width="353" height="309" alt="Ratchet and Clank" />](/images/stories/frontend/progress_reports/q4-2016/ratchet-after1.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/ratchet-before2-s.jpg" title="Ratchet and Clank" width="353" height="309" alt="Ratchet and Clank" />](/images/stories/frontend/progress_reports/q4-2016/ratchet-before2.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/ratchet-after2-s.jpg" title="Ratchet and Clank" width="353" height="309" alt="Ratchet and Clank" />](/images/stories/frontend/progress_reports/q4-2016/ratchet-after2.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/ace-before-s.jpg" title="Ace Combat 4" width="353" height="309" alt="Ace Combat 4" />](/images/stories/frontend/progress_reports/q4-2016/ace-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/ace-after-s.jpg" title="Ace Combat 4" width="353" height="309" alt="Ace Combat 4" />](/images/stories/frontend/progress_reports/q4-2016/ace-after.jpg)
**  
  
Note:** The current implementation of hardware mipmapping isn't totally
accurate, the current implementation replaces the pointer of the base
layer with the LOD min layer, assuming that it contains valid data.
While the current hardware mipmapping implementation isn't really ideal,
it fixes issues with most of the games (Ratchet & Clank, Ace Combat,
Legacy of Kain) even with increase in performance in certain
scenarios!  
  
Unfortunately, there are still a few games requiring full mipmapping
support which will be quite hard to tackle without compromising on
performance.  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSdx-TextureCache: Proper scaling of all textures </span> </span> by
[Gregory](https://github.com/gregory38) and
[ssakash](https://github.com/ssakash)  
  
On games like Devil May Cry, a few textures weren't being scaled
properly, which lead to graphical glitches on the upper left part of the
screen at upscaled resolutions. Eventually we had found out that in
certain rare cases when the Texture-cache target was created, the
scaling of the textures was omitted.  
  
<span style="font-weight: bold;"> Gregory </span> fixed the issue by
properly scaling the textures at such cases with respect to the integral
scaling value, <span style="font-weight: bold;"> ssakash </span> later
generalized the scaling equation to also make it work on custom
resolutions.  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/dmc-before-s.jpg" title="Devil May Cry" width="353" height="198" alt="Devil May Cry" />](/images/stories/frontend/progress_reports/q4-2016/dmc-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/dmc-after-s.jpg" title="Devil May Cry" width="353" height="198" alt="Devil May Cry" />](/images/stories/frontend/progress_reports/q4-2016/dmc-after.jpg)  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSdx: Handling illegal 8 bits pixel storage format </span> </span> by
[Gregory](https://github.com/gregory38)  
  
The Graphics Synthesizer supports 3 different color formats for the
frame buffer,

-   32 bits (RGBA8): 3 color channels of 8 bits + 1 alpha channel of 8
    bits. <span style="font-weight: bold;"> (PSMCT32) </span>
-   24 bits (RGB8): 3 color channels of 8 bits. <span
    style="font-weight: bold;"> (PSMCT24) </span>
-   16 bits (RGB5A1): 3 color channels of 5 bits + alpha channel of 1
    bit. <span style="font-weight: bold;"> (PSMCT16, PSMCT16S) </span>

  
However, some games seem to use an illegal format at the FRAME register,
a format known as <span style="font-weight: bold;"> PSMT8H </span> . The
valid and sane hypothesis was that the core is sending some garbage
values to GSdx, so skipping the draw call might fix it. However, that
wasn't the case. A developer was indeed crazy enough to send such an
insane value!  
  
<span style="font-weight: bold;"> Gregory </span> had [resolved the
issue](https://github.com/PCSX2/pcsx2/commit/9b93c073390de7c5f88e944bc9d26f9cf17ba9ee)
by replacing the illegal format with a valid 32 bit format and channel
masking in the FBMSK bitfield of FRAME register.  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/berserk-before-s.jpg" title="Berserk" width="353" height="283" alt="Berserk" />](/images/stories/frontend/progress_reports/q4-2016/berserk-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/berserk-after-s.jpg" title="Berserk" width="353" height="283" alt="Berserk" />](/images/stories/frontend/progress_reports/q4-2016/berserk-after.jpg)  
  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSdx-PCRTC: Feedback write support </span> </span> by
[Gregory](https://github.com/gregory38)  
  
The graphics synthesizer contains a dedicated hardware to handle the
presentation of the framebuffer to the output circuit, the hardware can
merge two contexts of framebuffer together based on various parameters,
however there's also an alternative way to write back data in the frame
buffer.  
  
Using the feedback write circuit, we can write a specific rectangular
area in the output image to an arbitrary position in a local buffer at
an arbitrary sampling rate dependent on the status of feedback write
setting registers. The data can be a raw copy, but <span
style="font-weight: bold;"> RGB-&gt;YCbCr </span> conversions could also
be requested based on the feedback write setting.  
  
**Gregory** has now implemented feedback write support on the OpenGL
hardware and software renderer which fixes issues with various games
along with the infamous Xenosaga I dream scenes which make use of
feedback write circuit, the DirectX port for the fix is yet to be done
as there aren't really any active DX developers on our team at the
moment.  
  
[<img src="/images/stories/frontend/progress_reports/q4-2016/xenosaga-before-s.jpg" title="Xenosaga" width="353" height="198" alt="Xenosaga" />](/images/stories/frontend/progress_reports/q4-2016/xenosaga-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q4-2016/xenosaga-after-s.jpg" title="Xenosaga" width="353" height="198" alt="Xenosaga" />](/images/stories/frontend/progress_reports/q4-2016/xenosaga-after.jpg)  
<span style="font-weight: bold;"> Xenosaga makes use of the feedback
write mechanism to convert the color to a luminance greyscale. </span>

And that was it for this quarter's progress report! There were several
other changes that haven't made it in this report since as you can see
it's already pretty huge, but we believe we covered everything important
for our users.  
  
We could use some extra help preparing and writing these reports, so if
anyone is interested, has time and is up to the task please inform us by
posting
<a href="http://forums.pcsx2.net/Thread-Q4-2016-progress-report" class="mycode_url">HERE</a>
in our forum.  
  
As always, check out our progress over the
<a href="https://github.com/PCSX2/pcsx2" class="mycode_url">Github repository</a>
, help us by
<a href="http://forums.pcsx2.net/Forum-Bug-reporting" class="mycode_url">reporting issues</a>
or by
<a href="https://github.com/PCSX2/pcsx2/pulls" class="mycode_url">sending pull requests</a>
, even if your code still needs work. Our coders and contributors will
be more than happy to help you help us with your changes, improvements
and bug fixes to our code!  
  
As usual a big thank you to all people who contributed to this report,
bug squad members and coders alike you know who you are!  
Till next time, keep playing.
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />

</div>

</div>
