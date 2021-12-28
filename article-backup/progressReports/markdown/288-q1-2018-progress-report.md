<div class="single-article">

<div class="item-page clearfix">

## [Q1 2018 progress report](/288-q1-2018-progress-report.html)

<div style="text-align:center;">

</div>

<img src="/images/stories/frontend/progress_reports/q1-2018/progrepq12018.jpg" width="563" height="104" alt="Progress report q1 2018" />

What sorcery is this, we are on time with the progress report
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />

We bring to you another progress report like usual. Enjoy!

Written by
[lightningterror](https://forums.pcsx2.net/User-lightningterror) and
[CK1](https://forums.pcsx2.net/User-CK1)

<span style="color: #00ccff;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [GSdx-TC:
Performance improvement by using custom
container](https://github.com/PCSX2/pcsx2/pull/1944) </span> by
[AlessandroVetere](https://github.com/AlessandroVetere)

A massive improvement on GSdx was done in Q2 2017 that we forgot to
mention which improves the performance on both hardware and software
mode around 1-15% give or take depending on the game and configuration.
It's a bit technical so all we can say is that it improves performance
but if anyone wishes to read the more technical stuff then it's best to
checkout the Pull Request on GitHub.

<span style="color: #00ccff;"> \[Enhancement\] </span> [<span
style="text-decoration: underline;"> **GSdx-TC: Load size calculation in
target update** </span>](https://github.com/PCSX2/pcsx2/pull/2122) by
[ssakash](https://github.com/ssakash)

Akash also updated the texture cache that fixed/improved a few issues as
well as solved a couple of regressions. These changes should help with
improving emulation accuracy on native and upscaled resolutions.

-   Fix the load size calculation in target update.
-   Add an optional macro (ENABLE\_ACCURATE\_BUFFER\_EMULATION) for
    enabling more accurate emulation of the buffer size.
-   Fixed a regression that caused many games to crash with custom
    resolutions (Gran Turismo series, Silent Hill series, Persona
    series, Metal Gear Solid series and others as well).
-   Fixed a regression on Beyond Good And Evil that exhibited FMV
    flickering.

<span style="color: #00ccff;"> \[Enhancement\] </span> <span
style="text-decoration: underline;"> [**GSdx: Texture Shuffle port to
Direct3D**](https://github.com/PCSX2/pcsx2/pull/2347) </span> by
[lightningterror](https://github.com/lightningterror)

Previously texture shuffle only worked if CRC hack level was below full
since it was in beta stage. lightningterror did the testing, adjusted
the code and properly ported it without relying on the CRC hack level.
This will fix glitchy graphics (green/brown vertical lines sometimes) on
games that make use of the same effect.  
The Godfather, Urban Chaos, 50 Cent Bulletproof, Metal Gear solid
series,God of War series, Final Fight Streetwise,The Suffering Ties that
Bind,Sengoku Basara and many others.

  
Note that texture shuffle is only supported by Direct3D10/11, however a
partial port has been done for Direct3D9 as well. Direct3D 9 will skip
some of the bad draw calls but the screen may still look a bit glitchy
on some games. I guess better than nothing
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />

Here are some example comparisons on Direct3D11.

1.Sengoku Basara.

2.50 Cent Bulletproof.

3\. The Suffering Ties that Bind.

[![d3d fixes before
after](/images/stories/frontend/progress_reports/q1-2018/d3d-fixes-before-after.jpg)](/images/stories/frontend/progress_reports/q1-2018/d3d-fixes-before-after.jpg)

<span style="color: #00ccff;"> \[Enhancement\] </span> <span
style="text-decoration: underline;"> [**GSdx: Channel Shuffle
improvements on Direct3D**](https://github.com/PCSX2/pcsx2/pull/2347)
</span> by [lightningterror](https://github.com/lightningterror)

A small adjustment has been made in the channel shuffle detection on
Direct3D, a lot of games should see an improvement where the top left
corner issue has been resolved /improved.

Metal Gear Solid series, Urban Chaos, Stolen and possibly other games
that use the effect are resolved/improved.  
Direct3D still misses the proper shaders to emulate the effect and need
to be ported from OpenGL one day but it's a nice improvement for users
that don't use OpenGL.

It's worth keeping in mind just like before the channel shuffle effect
only skips the bad draw calls so it kinda works like a CRC hack just
somewhat better since it only skips the channel shuffle draw calls and
not any other post processing effects.

<span style="color: #00ccff;"> \[Enhancement\] </span> <span
style="text-decoration: underline;"> **GSdx: CRC hacks adjustments**
</span>

People usually say that PCSX2 uses a lot of hacks so we are gonna
highlight some changes to CRC hacks
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />

-   List of purged CRC hacks:
    -   Gran Turismo Concept - All hacks removed.
        [\#2335](https://github.com/PCSX2/pcsx2/pull/2335)
    -   Gran Turismo 3 A spec - All hacks removed.
        [\#2335](https://github.com/PCSX2/pcsx2/pull/2335)
    -   Gran Turismo 4 - All hacks removed.
        [\#2304](https://github.com/PCSX2/pcsx2/pull/2304)
    -   Tourist Trophy - All hacks removed.
        [\#2304](https://github.com/PCSX2/pcsx2/pull/2304)
    -   God Of War 1 - One hack removed.
        [\#2350](https://github.com/PCSX2/pcsx2/pull/2350)
    -   God Of War 2 - One hack removed.
        [\#2350](https://github.com/PCSX2/pcsx2/pull/2350)
    -   SSX 3 - All hacks removed.
        [\#2259](https://github.com/PCSX2/pcsx2/pull/2259)
    -   Tekken 5 - One hack removed.
        [\#2205](https://github.com/PCSX2/pcsx2/pull/2205)
    -   Final Fight Streetwise - One hack removed.
        [\#2343](https://github.com/PCSX2/pcsx2/pull/2343)
    -   The Simpsons Game - One hack removed.
        [\#2149](https://github.com/PCSX2/pcsx2/pull/2149)
    -   Sengoku Basara - All hacks removed.
        [\#2357](https://github.com/PCSX2/pcsx2/pull/2357)
    -   Naruto - Narutimate Hero 3 - One hack removed.
        [\#2361](https://github.com/PCSX2/pcsx2/pull/2361)
    -   Naruto Shippuuden: Narutimate Accel - One hack removed.
        [\#2361](https://github.com/PCSX2/pcsx2/pull/2361)

And since we are mentioning removed we will also mention added CRC
hacks. Not much right ?

-   List of added CRC hacks:
    -   Final Fight Streetwise - One hack added.
        [\#2343](https://github.com/PCSX2/pcsx2/pull/2343)

There have been more changes such as moving some CRC hacks to Aggressive
state that can be used as speedhacks, some moved to Direct3D only but
the list will be quite big if we include everything, all the other
changes can be viewed on GitHub.

The CRC hack code was also cleaned up a bit, many games
(prequels/sequels) shared code, which has now been merged making it more
compact, readable and cleaner.

<span style="color: #00ccff;"> \[Enhancement\] </span> <span
style="text-decoration: underline;"> [**PCSX2-Counters: Fix Hblank
calculation for DVD video
modes**](https://github.com/PCSX2/pcsx2/pull/2239) </span> by
[ssakash](https://github.com/ssakash)

Previously, the DVD variant NTSC/PAL modes used the horizontal blanking
interval calculation algorithm used by digital video modes, which
shouldn't be used and also the rounding error check was neglected. Added
the DVD variant modes to the list in analog video mode finder
subroutine. This should impact timing/vertical synchronization in PSX
games significantly.

So far the only affected PSX title isLego Rock Raiders' which has the
graphic corruptions resolved.

<span style="color: #00ccff;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> GUI Changes and
Enhancements </span>

[Add configurable Cheats folder to Components
Selectors](https://github.com/PCSX2/pcsx2/pull/2272) by
[lightningterror](https://github.com/lightningterror)

-   Add GUI option to Plugins Components Selectors to change the default
    "Cheats" folder location. Similar to savestates/logs/..etc..

[Display the video mode on
titlebar](https://github.com/PCSX2/pcsx2/pull/2237) option by
[ssakash](https://github.com/ssakash)

-   Display current video mode at the title bar. (Useful for debugging
    purposes and for user feedback at cases when video mode is being
    changed)

<span style="color: #00ccff;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> Other
Enhancements </span>

-   [XPad andUSBqemu have been moved to Legacy
    solution/plugins](https://github.com/PCSX2/pcsx2/pull/2295) by
    [FlatOut](https://github.com/FlatOutPS2)
    -   No need to keep old legacy and outdated plugins in the main
        branch anyway. They also won't be included in the 1.6 release.
        If people want to use them they can be found on the website.

<!-- -->

-   The PCSX2 code has gone through a lot of cleanup by
    [turtleli](https://github.com/turtleli) , fixing warnings, fixing a
    lot of annoying bugs and just making things more tidy in general.

<!-- -->

-   SPUX-2 Also received some clean up by
    [FlatOut](https://github.com/FlatOutps2) and
    [MrCK1.](https://github.com/mrck1)

<!-- -->

-   A lot of specific game CRC ID's have been added as well. These are
    usually needed for CRC hacks to function properly as well as
    automatic mipmapping detection for games that require it.

<!-- -->

-   Many fixes and patches were added to the GameDB to fix various
    issues such as the broken graphics in Spongebob: Creature from the
    Krusty Krab.  
    Here is an example how the game looks right now:

[<img src="/images/stories/frontend/progress_reports/q1-2018/sbb-before-s.jpg" title="Spongebob before" width="353" height="199" alt="Spongebob before" />](/images/stories/frontend/progress_reports/q1-2018/sbb-before.jpg)
[<img src="/images/stories/frontend/progress_reports/q1-2018/sbb-after-s.jpg" title="Spongebob after" width="353" height="197" alt="Spongebob after" />](/images/stories/frontend/progress_reports/q1-2018/sbb-after.jpg)

There are other additions that haven't been mentioned as well but those
can be viewed on GitHub and these are just the highlights we thought
would be worth mentioning.

Best regards from the PCSX2 Team.

</div>

</div>
