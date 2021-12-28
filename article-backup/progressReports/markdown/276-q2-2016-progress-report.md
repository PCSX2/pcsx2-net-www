<div class="single-article">

<div class="item-page clearfix">

## [Q2 2016 progress report](/276-q2-2016-progress-report.html)

<div style="text-align:center;">

</div>

<img src="/images/stories/frontend/progress_reports/q2-2016/progress-rep-q2-2016.jpg" width="563" height="104" alt="Progress report q2 2016" />

------------------------------------------------------------------------

Hey everyone and welcome to another spectacular PCSX2 progress report!
As you may have read in the last report we have moved from doing reports
monthly to quarterly in order to better focus our manpower. Today's
report is our first quarterly report and as such there are quite a lot
of improvements and changes to go over. Before we do that however we
need to ask for <span style="font-weight: bold;"> your </span> help!  
  
As you probably know PCSX2 is cross platform and runs on Windows and
Linux. Because of this we need testers for each of those platforms in
order to be effective at developing for them. Currently we have a very
problematic lack of testers on Linux. We would like to take this
opportunity to invite those of you with Linux experience to help the
project out and become a Linux tester! Ideally you should be completely
comfortable working in Linux (whatever flavor you choose as long as
PCSX2 is compatible with it!) and you should have or be willing to
develop the knowledge to debug various issues with the emulator in that
environment. If this sounds like you and you want to help us out then
please head over to [**our forum thread
here**](http://forums.pcsx2.net/Thread-Q2-2016-progress-report) and let
us know!  
  
With that out of the way let's jump right in to the PCSX2 progress
report for Q2 2016! Strap yourself in for the ride because here we go!

<span style="color: #00bfff;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
OnePAD: Updated GUI </span> </span> by
[kust2708](https://github.com/kust2708)  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/onepad_old_s.png" title="Onepad before" width="353" height="198" alt="onepad" />](/images/stories/frontend/progress_reports/q2-2016/onepad_old.png)
[<img src="/images/stories/frontend/progress_reports/q2-2016/onepad_new_s.png" title="Onepad after" width="353" height="198" alt="gundam" />](/images/stories/frontend/progress_reports/q2-2016/onepad_new.png)  
OnePAD is the default pad plugin for PCSX2 on Linux. Recently kust2708
updated OnePAD's UI to make it a bit nicer and more user friendly.
Instead of the drab gray buttons laid out in a sort of Dual Shock
arrangement users can now much more intuitively configure their
controllers with a nice Dual Shock 2 graphic.  
  
  
<span style="color: #00bfff;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
Core: Automatic aspect ratio switch during FMV playback </span> </span>
by [FlatOut](https://github.com/FlatOutPS2)  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/auto-aspect-ratio-switch.png" title="auto aspect ratio switch" width="837" height="601" alt="auto aspect ratio switch" />](/images/stories/frontend/progress_reports/q2-2016/auto-aspect-ratio-switch.png)  
  
Most games with a widescreen option (through either in-game setting or
widescreen patch) have FMVs that are fixed to the original 4:3 aspect
ratio. Those videos will appear horizontally stretched when playing a
game in widescreen. This new option automatically switches PCSX2's
aspect ratio to 4:3 when an FMV begins and back to widescreen when it
ends, so both the in-game part and the FMV's are displayed correctly.  
  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
CDVDgigaherz: Fixed dual layer DVD reading </span> </span> by
[turtleli](https://github.com/turtleli)  
  
Dual layer DVDs have never worked properly with CDVDgigaherz and it
turns out that there were quite a few issues:

-   DVD layer information sector addresses were not converted from big
    endian to little endian.
-   Windows filesystem drivers prevented layer 1 sectors from being read
    due to boundary checks.
-   Dual layer DVDs were reported to PCSX2 as having multiple tracks,
    when all single session DVDs only have one track.
-   Generation of the Table of Contents was skipped.
-   The layer break address was off by one.
-   PTP DVDs were wrongly recognized as OTP DVDs.

These issues are now fixed so dual layer DVDs should now be playable
with CDVDgigaherz. A list of games affected by this change can be found
[on
Wikipedia](https://en.wikipedia.org/wiki/List_of_PlayStation_2_DVD-9_games)
.  
  
  
<span style="color: #00bfff;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
CDVD: Improved ISO layer break detection algorithm </span> </span> by
[turtleli](https://github.com/turtleli)  
  
When using large DVD ISOs (&gt;4.3GB e.g. dual layer DVDs) a brute force
approach was used to detect the layer break address. The algorithm would
start from the middle of the ISO and search outwards until the layer
break was found.  
  
This approach wasn't optimal due to the following reasons:

-   PCSX2 would appear to be unresponsive while it searches for the
    layer break address the first time the ISO is booted.
-   The layer break address needs to be cached to speed up subsequent
    loads.
-   If there is no layer break, the entire DVD would be searched each
    time the ISO is booted - this could take a few minutes.

Doing it this way was unnecessary. The DVD layer 0 Primary Volume
Descriptor contains the total number of sectors on layer 0 of the DVD.
For a single layer DVD this is equal to the total DVD sector count. For
a dual layer DVD, however, this sector count is equal to the first
logical sector number on layer 1. Using this knowledge a much faster and
simpler layer break search algorithm was implemented.  
  
  
<span style="color: #00bfff;"> \[Enhancement\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSDX: Fast texture invalidation </span> </span> by
[Gregory](https://github.com/gregory38)  
  
Not too long ago the half screen issue caused by the texture cache was
fixed for Snowblind engine games. However even with this fix the games
were still too demanding even for beastly machines. In order to figure
out why, a GS dump was profiled. The profile revealed that a single loop
in the texture cache management code was very busy. The loop in question
was responsible for computing the block invalidation of certain special
textures. They are special because the width of the buffer which
contains them is smaller than the width of the texture in texels. As a
result, when a block is invalidated all the repeating blocks must also
be invalidated. The texture then becomes like a Swiss cheese full of
holes which requires uploading lots of small textures to fill. Doing it
this way is very efficient at reducing the usage of PCIe bandwidth but
unfortunately it requires too much CPU time.  
  
In order to resolve this issue, we skip the block invalidation and
completely invalidate the whole texture instead. This avoids the busy
loop we discussed above. The texture is then uploaded in one go instead
of many small uploads which greatly reduces the driver overhead. As a
trade-off it increases the PCIe bandwidth requirement by 20-30%. However
at this point PCIe is up to the third generation (and soon the fourth)
so a good deal of bandwidth is available. Benchmarks show that this
change produces a nice speedup - however some scenes were <span
style="font-style: italic;"> still </span> too slow.  
  
Further profiling revealed that the game reads the render target a lot.
This is slow because you need to flush the full GPU pipeline first.
Nothing can be done about this part unfortunately. But next you need to
transfer the GPU data to the CPU. Before we were transferring the full
framebuffer which is millions of pixels. However the game only needs
data for a few hundred of them. Gregory updated the code to transfer
only the useful pixels.  
  
These two improvements combined provided a major speed boost for
Snowblind engine games. They are almost two times faster now! If you
have a good processor with an Nvidia GPU then you should be able to
enjoy them in full upscaled glory now!

|           **Game**           | **1.4.0 Release** | **1.5.0 w/FTI** |
|:----------------------------:|:-----------------:|:---------------:|
| Baldur's Gate: Dark Alliance |        30         |       80        |
|     Champions of Norrath     |        52         |       105       |

<span style="color: #3a90dc;"> <span style="font-size: large;"> Speed
Impact of Fast Texture Invalidation </span> </span>

  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSDX: Improved detection of Framebuffer size </span> </span> by
[ssakash](https://github.com/ssakash)  
  
Previously the height of the framebuffer was calculated using guesswork
based on the width of the framebuffer. This method was obviously wrong
and it caused some conflicts when scaling the buffer for upscaled
resolutions. This was fixed by using the height of the output circuit as
a base for the framebuffer height.  
  
Here are some comparison screenshots showing the issues fixed by this
change:  
  
  
<span style="font-weight: bold;"> <span
style="text-decoration: underline;"> Crash Nitro Kart </span> </span>  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/CNK-before_s.png" title="Crash Nitro Kart Before" width="353" height="265" alt="Crash Nitro Kart Before" />](/images/stories/frontend/progress_reports/q2-2016/CNK-before.png)
[<img src="/images/stories/frontend/progress_reports/q2-2016/CNK-after_s.png" title="Crash Nitro Kart after" width="353" height="265" alt="Crash Nitro Kart after" />](/images/stories/frontend/progress_reports/q2-2016/CNK-after.png)  
<span style="font-weight: bold;"> <span
style="text-decoration: underline;"> Richard Burns Rally </span>
</span>  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/RBR-before_s.png" title="Richard Burns Rally Before" width="353" height="265" alt="Richard Burns Rally Before" />](/images/stories/frontend/progress_reports/q2-2016/RBR-before.png)
[<img src="/images/stories/frontend/progress_reports/q2-2016/RBR-after_s.png" title="Richard Burns Rally after" width="353" height="265" alt="Richard Burns Rally after" />](/images/stories/frontend/progress_reports/q2-2016/RBR-after.png)  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSDX: Enable reading of Depth Buffer </span> </span> by
[Gregory](https://github.com/gregory38)  
  
There are certain scenarios where the Core (EE) reads the depth buffer
to free the GS memory <span style="font-weight: bold;"> (4 MB) </span>
and do some effects. During this time the buffer is saved in the EE
memory <span style="font-weight: bold;"> (32 MB) </span> and is restored
after the completion of said effects.  
  
<span style="font-weight: bold;"> Gregory </span> has emulated this
behavior by converting the GPU depth buffer to GS format and by sending
it to the EE when it wants to read the depth buffer. This implementation
has finally fixed the lens flare issue on Kingdom Hearts II and also
some depth related issues on ICO and Nocturne.  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/kingdom-hearts2-before_s.jpg" title="Kingdom Hearts 2 Before" width="353" height="199" alt="Kingdom Hearts 2 Before" />](/images/stories/frontend/progress_reports/q2-2016/kingdom-hearts2-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q2-2016/kingdom-hearts2-after_s.jpg" title="Kingdom Hearts 2 after" width="353" height="199" alt="Kingdom Hearts 2 after" />](/images/stories/frontend/progress_reports/q2-2016/kingdom-hearts2-after.jpg)  
[<img src="/images/stories/frontend/progress_reports/q2-2016/ICO-before_s.png" title="ICO before" width="353" height="265" alt="ICO Before" />](/images/stories/frontend/progress_reports/q2-2016/ICO-before.png)
[<img src="/images/stories/frontend/progress_reports/q2-2016/ICO-after_s.png" title="ICO after" width="353" height="265" alt="ICO after" />](/images/stories/frontend/progress_reports/q2-2016/ICO-after.png)  
  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
GSDX: Improved PCRTC merge circuit emulation </span> </span> by
[turtleli](https://github.com/turtleli) and
[ssakash](https://github.com/ssakash)  
  
In some cases the GS is configured to use two side by side display
rectangles for rendering. The rectangles are merged by the GS's merge
circuit and the resulting image is sent to the TV.  
  
The horizontal position of the display rectangles, however, was ignored
when emulating the merge circuit, which caused image overlap issues
where only half the image was displayed. The display rectangles'
horizontal position is now taken into account, which fixes the image
overlap issues and makes split screen mode in Time Crisis 2 and 3
playable.  
  
<span style="text-decoration: underline;"> Time Crisis 2 </span> <span
style="font-weight: bold;"> (before) </span> <span
style="font-weight: bold;"> ( <span style="color: #66cc33;"> 320 X 224
</span> ) </span>  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/timecrisis-before.png" title="Time Crisis 2 Before" width="320" height="224" alt="Time Crisis 2 Before" />](/images/stories/frontend/progress_reports/q2-2016/timecrisis-before.png)  
  
<span style="text-decoration: underline;"> Time Crisis 2 </span> <span
style="font-weight: bold;"> (now) </span> <span
style="font-weight: bold;"> ( <span style="color: #66cc33;"> 640 X 224
</span> ) </span>  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/timecrisis-after.png" title="Time Crisis 2 after" width="640" height="224" alt="Time Crisis 2 after" />](/images/stories/frontend/progress_reports/q2-2016/timecrisis-after.png)  
  
  
<span style="color: #ff3333;"> \[Bug-Fix\] </span> <span
style="font-weight: bold;"> <span style="text-decoration: underline;">
VIF: Timing fix for MSCALF, MSCNT instructions </span> </span> by
[Refraction](https://github.com/refractionpcsx2)  
  
Previously the <span style="font-weight: bold;"> MSCALF </span> and
<span style="font-weight: bold;"> MSCNT </span> instructions were
delayed along with the <span style="font-weight: bold;"> MSCAL </span>
instruction, these instructions trigger the execution of the micro
instructions in VU1. This was done in order to fix the graphics on the
Snowblind Engine games such as Baldur's Gate: Dark Alliance and
Champions of Norrath; However, delaying this seemed to cause quite a few
shadow problems on games like Downhill Domination, Twisted Metal and
potentially other games.  
  
Refraction fixed these issues by reworking the code to only allow delays
for the <span style="font-weight: bold;"> MSCAL </span> instruction.  
  
[<img src="/images/stories/frontend/progress_reports/q2-2016/Downhil-Before_s.jpg" title="DownHill Domination before" width="353" height="265" alt="DownHill Domination before" />](/images/stories/frontend/progress_reports/q2-2016/Downhil-Before.jpg)
[<img src="/images/stories/frontend/progress_reports/q2-2016/Downhil-after_s.jpg" title="DownHill Domination after" width="353" height="265" alt="DownHill Domination after" />](/images/stories/frontend/progress_reports/q2-2016/Downhil-after.jpg)  
[<img src="/images/stories/frontend/progress_reports/q2-2016/twisted-metal-before_s.png" title="Twisted Metal before" width="353" height="247" alt="Twisted Metal before" />](/images/stories/frontend/progress_reports/q2-2016/twisted-metal-before.png)
[<img src="/images/stories/frontend/progress_reports/q2-2016/twisted-metal-after_s.png" title="Twisted Metal after" width="353" height="247" alt="Twisted Metal after" />](/images/stories/frontend/progress_reports/q2-2016/twisted-metal-after.png)

As usual, there were even more additions and developments while this
report was being written but they will be included in our next quarterly
report. Thanks to everyone who worked on this, ssakash, refraction,
gregory, dogen, Nobbs66, FlatOut, turtleli and a special thanks to Blyss
Sarania, the whole team is by his side through the rough times he is
going through.

</div>

</div>
