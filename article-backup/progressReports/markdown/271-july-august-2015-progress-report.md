<div class="single-article">

<div class="item-page clearfix">

## [July-August 2015 progress report](/271-july-august-2015-progress-report.html)

<div style="text-align:center;">

</div>

<img src="/images/stories/frontend/progress_reports/7-8-2015/7-8-2015-logo.jpg" title="6-2015 progress report" width="562" height="104" alt="6-2015 progress report" />

Hello everyone! Welcome to PCSX2's July-August 2015 progress report!
Since we were late again (
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />
) we'll include the first half of August in this report as well. So sit
back, buckle up and hold on as we go over the changes that happened in
the months of July and August! First we will go over some more magic in
the realm of GSdx.

This was given a brief mention last month, but I wanted to go over it in
a little more detail because it is so important. Along with all the
changes you've read about in GSdx lately (if you've been following our
reports), [GSdx was bumped to version
1.0](https://github.com/PCSX2/pcsx2/pull/628) . In the OpenGL backend
this negated the need for many game specific hacks. The hacks are still
present however, as they are still needed for the Direct3D backends.
Once someone ports some of the new changes over to Direct3D they will be
able to be removed entirely. The hacks in question skip many different
types of effects that were broken until Gregory worked his magic things
like fog, shadows, special shading, brightness, coloring and so on. With
the new accurate options, not only are those hacks no longer needed but
the effects in question now render correctly. You can take a look back
at our two previous reports for some screenshot examples of that. I'd
like to give a big shout out to Gregory for his massive improvements to
GSdx lately. It was very recently that the OpenGL backend was far
inferior to the Direct3D ones, but that isn't the case anymore. The
accuracy of GSdx OpenGL has improved by leaps and bounds lately and it
is now far more accurate than the Direct3D backends.  
  
In more exciting news, the creator of GSdx,
[Gabest](https://github.com/gabest11) has showed up once more and
already begun fixing bugs or speeding up things, we hope he'll stick
around more this time. Welcome back!
<img src="https://pcsx2.net/images/stories/frontend/smilies/biggrin.gif" class="yvSmiley" width="20" height="20" alt="Very Happy" />  
  
Speaking of that, there were a few more improvements in July/August so
lets take a look at those!  
  
<span style="font-weight: bold;"> <span style="font-size: x-large;">
GSdx: </span> </span>  
  
<span style="text-decoration: underline;"> Blending unit accuracy
options </span> by [ssakash](https://github.com/ssakash) &
[Gregory](https://github.com/gregory38)  
  
With the added accurate options in the OpenGL renderer, we had to group
and clarify them in the GUI. A new dropdown was added with 6 accurate
blending options from None to Ultra (note that Full and Ultra have
insane CPU requirements!), so our users can choose which to use
depending on the game and the power of their PCs  
  
  
Relevant commit:  
[Gsdx-gui: Accurate blending unit for
Windows](https://github.com/PCSX2/pcsx2/commit/68833e10d142734d5bccad6f5b71a32e84a83a76)

------------------------------------------------------------------------

  
<span style="text-decoration: underline;"> Implement an ultra accurate
blending feature in high accurate blending with a small performance hit
</span> by [Gregory](https://github.com/gregory38)  
  
Some users noticed that the ultra accurate blending mode was needed to
properly emulate the distance fog in God of War but it was really too
slow (and never meant to be used anyway). After debugging, it was found
that God of War uses a blending with the alpha of the destination to
emulate the fog. Very few draw calls use the alpha of the destination so
they are now incorporated in the high accurate blending level with a
small performance hit.  
  
Relevant commit:  
[Gsdx-ogl: extend cclip blending level with destination alpha
blending](https://github.com/PCSX2/pcsx2/commit/a0edcb58af8c725ef778ac343c9c72ebb8040217)

------------------------------------------------------------------------

  
<span style="text-decoration: underline;"> HDR colclip </span> by
[Gregory](https://github.com/gregory38)  
  
HDR (AKA High Dynamic range rendering) is useful for calculations done
on a larger dynamic range, which is more accurate to be used on these
scenarios since the PS2 also made use of HDR rendering. HDR allows to
represent a wider range of colors so the shading algorithms have
accurate color information for all the objects which is quite useful
since it's needed for accurate reproduction of some lightning and bloom
effects.  
  
Note: Dynamic range is the ratio between the smallest and largest signal
values.  
  
The previously discussed accurate blending algorithm has been made a lot
more efficient by replacing it with a new high dynamic range rendering
based algorithm.  
  
Let's take a look at the improvements made on the algorithm by comparing
it to the GS in a scenario of blending two fragments of color 20 and 255
on a target of color 250. Notice that the new algorithm gives us the
result using 2 passes, that's why it is also more CPU demanding than the
old code.

|  **Formula**  |   **Equation**   | **Result** |
|:-------------:|:----------------:|:----------:|
| (Cd+Cs) % 256 | (250 + 20) % 256 |     14     |
| (Cd+Cs) % 256 | (14 + 255) % 256 |     13     |

<span style="color: #fc670b;"> <span style="font-size: large;"> Graphics
Synthesizer </span> </span>

|            **Formula**             |   **Equation**    |       **Result**       |
|:----------------------------------:|:-----------------:|:----------------------:|
|     for Cs &lt; 128 : Cd + Cs      |    (250 + 20)     | 255 (saturated result) |
| for Cs &gt; 128 : Cd - (256 - CS ) | (255 - (256-255)) |          254           |

<span style="font-size: large;"> Older Algorithmn (Direct3D)  
</span>

  
Where the old algorithm would only work in cases of no overflow of
operations, the new one will be even better since the first pass could
go beyond the minimum and maximum limits. (no overflow)

|      **Formula**       |    **Equation Pass 1**    | **Equation Pass 2** | **Result** |
|:----------------------:|:-------------------------:|:-------------------:|:----------:|
| Cd + Cs =&gt; Cd % 256 |     250+20 =&gt; 270      |      270 % 256      |     14     |
| Cd + Cs =&gt; Cd % 256 | 14+255 (pass 1) =&gt; 269 |      269 % 256      |     13     |

<span style="color: #1d41cb;"> <span style="font-size: large;"> New HDR
based algorithm </span> </span>

  
As you can see, the new HDR based algorithm produces accurate results
compared to the GS in comparison to the older algorithm.

Check out the fog like effects in God of War 1 which are now emulated
correctly in OpenGL with blending accuracy set to high:  
  
[<img src="/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-broken1-s.jpg" title="Gow HDR" width="353" height="199" alt="Gow HDR" />](/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-broken1.jpg)
[<img src="/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-fixed1-s.jpg" title="Gow HDR" width="353" height="199" alt="Gow HDR" />](/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-fixed1.jpg)
[<img src="/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-broken2-s.jpg" title="Gow HDR" width="353" height="199" alt="Gow HDR" />](/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-broken2.jpg)
[<img src="/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-fixed2-s.jpg" title="Gow HDR" width="353" height="199" alt="Gow HDR" />](/images/stories/frontend/progress_reports/7-8-2015/gow1-hdr-fixed2.jpg)  
  
Relevant PR:  
[Hdr colclip](https://github.com/PCSX2/pcsx2/pull/688)

------------------------------------------------------------------------

  
<span style="text-decoration: underline;"> Software renderer fixes
</span> by [Gregory](https://github.com/gregory38) &
[Gabest](https://github.com/gabest11) :

-   Silent Hill outputs a nan in Q to emulate the flashlight - an
    unsupported NaN (not a number) on the projection value (Q). The
    issue was fixed by Gregory using an isnan test to find out when this
    is used. Gabest pitched in and decreased the speed impact by using
    inlined ASM. Fixes the long standing Silent Hill 3 flashlight effect
    issue.
-   Wrong data mask for DATE operation on pseudo 16 bits RT: Fixes
    shadow colors on Haunting Ground
-   Fix texture addressing outside the limits (only for OCL and SW
    mode), done by extending the cached texture size to the upper limits
    of the region clamp values: Fixes Lupin the 3rd
-   Texture size reduction: Fixes Horzes, Stolen and likely all games
    that generate an out-of-memory error.

Haunting Ground shadow coloring is now fixed under the OpenGL software
renderer:  
  
[<img src="/images/stories/frontend/progress_reports/7-8-2015/haunting-ground-broken-s.jpg" title="Haunting Ground" width="353" height="199" alt="Haunting Ground" />](/images/stories/frontend/progress_reports/7-8-2015/haunting-ground-broken.jpg)
[<img src="/images/stories/frontend/progress_reports/7-8-2015/haunting-ground-fixed-s.jpg" title="Haunting Ground" width="353" height="199" alt="Haunting Ground" />](/images/stories/frontend/progress_reports/7-8-2015/haunting-ground-fixed.jpg)

Silent Hill 3 flashlight working properly under the OpenGL software
renderer:  
  
[<img src="/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-broken-s.jpg" title="Silent Hill 3" width="353" height="199" alt="Silent Hill 3" />](/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-broken.jpg)
[<img src="/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-fixed-s.jpg" title="Silent Hill 3" width="353" height="199" alt="Silent Hill 3" />](/images/stories/frontend/progress_reports/7-8-2015/silent-hill3-fixed.jpg)  
  
Relevant commits:  
[Gsdx: simplified isnan test, it compiles to an inline sse instruction
and a flag test, silent hill dump still looks
fine.](https://github.com/PCSX2/pcsx2/commit/85117ecbddc50b4fcb36293559ddfbdfa73f1f00)  
[Gsdx-Ogl: rare corner case when both texture shuffle and date are
enabled](https://github.com/PCSX2/pcsx2/commit/744f9ebc097982e5dd6387e8e02826ecf9335452)  
[Lupin 3 fix, texture addressing outside the limits, only for sw and
opencl
yet](https://github.com/PCSX2/pcsx2/commit/42f51591df66c3b82d353dc6bb6aad7e14d1127d)  
[Gsdx: texture size reduction in sw mode, fixes Stolen, less memory
usage in
general](https://github.com/PCSX2/pcsx2/commit/49b3acea72a4c2a37811a4616cb2d940355b6952)

------------------------------------------------------------------------

  
<span style="text-decoration: underline;"> GSdx: Post-processing updates
</span> by [Asmodean](https://github.com/Asmodean-)  
  
Our resident post processing effect guru Asmodean made his comeback,
providing a new version of his awesome effects suite for GSdx and fixing
its compatibility with the new and improved OpenGL renderer. Changelog
is
[here](http://forums.pcsx2.net/Thread-Custom-Shaders-for-GSdx?pid=441430#pid441430)
.  
  
Relevant PR:  
[GSdx: Post-processing
updates](https://github.com/PCSX2/pcsx2/pull/739)  
  
  
<span style="font-weight: bold;"> <span style="font-size: x-large;"> New
feature: </span> </span>  
  
<span style="text-decoration: underline;"> Folder memory cards </span>
by [AdmiralCurtiss](https://github.com/AdmiralCurtiss)  
  
This huge PR was finally merged after much debate, testing and
improvements! The new system basically bypasses the traditional 8mb
memory card file system and creates a folder, where each game freely
creates its save files without the 8mb file limitation.  
This means that users can switch to this system and:

-   Never worry again about their memcards getting filled and having to
    use many different files
-   Easily share single game saves instead of whole memory cards by
    simply zipping the folder of the game
-   Easily backup and delete game saves without going into the PS2 bios
    or running the game
-   Convert your old memory cards to a folder using the built-in convert
    feature

AdmiralCurtiss quickly nailed out some bugs that emerged after the
merge, making this feature pretty much stable and safe for everyday
usage. Hopefully we will be able to extend this feature to even
automatically convert GameFAQ saves (.cbs, .max etc) and use them
without much hassle
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />  
  
A big thanks to him for putting up with our worries about the new system
and the hard work he put into this! You can use the new feature from the
memory card configuration, create a new memory card and select Folder
(experimental). The convert feature is also in the memory card menu
<img src="https://pcsx2.net/images/stories/frontend/smilies/wink.gif" class="yvSmiley" width="20" height="20" alt="Wink" />

[<img src="/images/stories/frontend/progress_reports/7-8-2015/folder-memcards-s.jpg" title="Folder memory cards" width="550" height="300" alt="Folder memory cards" />](/images/stories/frontend/progress_reports/7-8-2015/folder-memcards.jpg)  
  
Relevant PR: [Memory Card as folder instead of a big raw
file](https://github.com/PCSX2/pcsx2/pull/359%2026%20Nov%202014)  
  
  
<span style="font-weight: bold;"> <span style="font-size: x-large;">
GUI: </span> </span>  
  
<span style="text-decoration: underline;"> Upgrade to wxWidgets 3 for
Windows-GUI fixes </span> by [turtleli](https://github.com/turtleli) &
[micove](https://github.com/micove)  
  
PCSX2 has been using wxWidgets for its GUI since Jake Stine's redesign
some years back, which was then at version 2.8. Since then, wxWidgets
has been updated to version 3 (on November 2013!) but no active
developer dared to attempt an update due to various customizations done
by Jake. Until recently that is! Gregory started by updating the Linux
side of PCSX2 to the new version and turteli made it happen for Windows
too. The few bugs that emerged got quickly squashed by turteli and
micove
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />  
  
Relevant PR and commits:  
[Windows: switch to wxWidgets
3.0](https://github.com/PCSX2/pcsx2/pull/657)  
[Fix Unicode issues in SPU2-X with
PortAudio.](https://github.com/PCSX2/pcsx2/commit/0e533e1630a0bd34619a0b57f8d162455b96a056)  
[wxWidgets 3.0 fixes](https://github.com/PCSX2/pcsx2/pull/741)  
  
  
<span style="font-weight: bold;"> <span style="font-size: x-large;">
Onepad (Linux): </span> </span>  
  
<span style="text-decoration: underline;"> Dual Shock 3 support for
OnePad in Linux </span> by
[JasonBrownDeveloper](https://github.com/JasonBrownDeveloper)  
  
A long standing issue with DS3 controller axis detection in Linux
prevented people from using them with the OnePad plugin, but no longer
thanks to JasonBrownDeveloper
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />  
  
Relevant PR: [Minimum code needed to get Dualshock 3 working with onepad
on recent linux and evdev
releases](https://github.com/PCSX2/pcsx2/pull/667)

Thanks to all the GIT contributions during these 1,5 months and to all
the active testers who encourage development to continue! The next
progress report will probably come at the end of September since
vacations will happen and we're never on time anyway!

</div>

</div>
