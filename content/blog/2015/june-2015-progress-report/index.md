---
title: "June 2015 Progress Report"
date: 2015-07-26T00:00:00
summary: "As promised in last month's update, welcome to PCSX2's very first monthly progress report!"
draft: false
tags:
  - "progress-report"
mainAuthor: Blyss Sarania
aliases:
  - "/270-june-2015-progress-report"
  - "/270-june-2015-progress-report.html"
  - "/270-june-2015-progress-report.htm"
---

![](./img/6-2015-logo.jpg)

As promised in last month's update, welcome to PCSX2's very first
monthly progress report! Sorry that it's a bit later than I had said -
totally my fault! Let's start things off with a bang, shall we? A
question that often gets asked on the forum to a surprising degree is a
variation of the following: How can I get XYZ Snowblind engine game
working in hardware mode? the answer up until very recently was You
can't, use software mode and expect it to be ridiculously demanding. For
those of you unfamiliar with it, the Snowblind engine was used for games
like Baldur's Gate: Dark Alliance, Champions of Norrath, Champions:
Return to Arms, and a few miscellaneous others. The Snowblind engine
does some pretty crazy stuff on the PS2, like using 2x Super Sample Anti
Aliasing! Because of that, it's very demanding and even ultra powerful
rigs would have issues running these games in software mode. Running
them in hardware mode would result in only half the screen being visible
because of the way the engine achieves the 2x SSAA.

## GSdx: Hardware rendering Snowblind Game fix
- by [Gregory](https://github.com/gregory38) & [Refraction](https://github.com/refractionpcsx2)

However the situation has changed drastically thanks to Gregory.
Snowblind engine games are now supported in hardware mode! Now these
popular games can be enjoyed in HD resolutions and without owning a
super computer! It is important to note however that they are still
relatively demanding, just not quite as much as before.

Aside from that, June has once again seen a host of GSdx improvements!
Most of these improvements have been on the accuracy side of things this
time, with Gregory taking on the GS and Refraction taking on the VU.
There is quite a lot to cover, so let's get started!

## GSdx: Usage of programmable blending instead of fixed blending 
- by [Gregory](https://github.com/gregory38)

To understand the following issues and their solutions, you must
understand the difference between Fixed function and Shader based
function.

With Fixed function programming, as the name suggests, the functionality
is fixed and hence it's not very flexible to work with when trying to
emulate the GS, which is not at all similar to a normal GPU.

Here's an example comparing clamping behavior of a normal GPU and the
GS:

Channel colors are coded in the 0-255 luminance range. There are four
channels - red, green, blue, alpha. Also it's important to remember that
the output of the blending unit can be out of the valid range. Normally
this is no problem - a GPU will clamp it. But things get a little
different in the case of the GS which also wraps it.




| **Blending unit (Output)** | **Result** |
| :------------------------: | :--------: |
|            -10             |     0      |
|            300             |    255     |

<span style="color: #ffd700;"> <span style="font-size: large;"> Standard
GPU </span> </span>

| **Blending unit (Output)** | **Result** |
| :------------------------: | :--------: |
|            -10             |    246     |
|            300             |     44     |

<span style="color: #ff4500;"> <span style="font-size: large;"> Graphics
Synthesizer </span> </span>


In order to remedy this discrepancy between GS and standard GPU behavior
we are using a shader that emulates the blending in a proper way with
respect to the GS, instead of the fixed function unit of the GPU.
However, wrapping is only one difference between the GS and GPU - there
are still a lot more differences. Here is a graphical breakdown of the
difference between the GS and a GPU in this regard:

**Note:** Standard GPU behavior is a bit more complex, the diagram is
only made to showcase how PCSX2 deals with some of the differences
between the GS and a GPU.

{{< img cols="6" src="./img/gpu-gs-chart.png">}}

{{< img cols="6" src="./img/gpu-gs-chart2.png">}}

Since we have already seen examples of accurate blending in our previous
developer blogs and accurate color clipping was explained just now, all
that's left is the accurate framebuffer mask.

The standard GPU blending unit allows masking the shader output only
channel by channel. The problem is that as the image shows, the GS can
do it bit by bit. Yes, that means it's possible to write only the most
significant bit of the channel on the GS. Again this issue can be solved
by using a shader to emulate this feature instead of doing it on the
fixed function unit of the GPU. Accurate frame buffer mask is just a
feature for handling bit masking instead of channel masking. It's
important to note that the new features which use shaders in place of
the fixed function unit do so at the expense of some speed. High end
machines should have no problems, but people with weaker machines may
experience some slowdown when using a lot of the accurate options.

Now let's take a look at how some of the games look with a shader that
properly emulates blending \[Accurate options enabled\] compared to
normal GPU Blending \[Accurate options disabled\].

{{< img-cmp-slider before="./img/fbmask_broken.jpg" after="./img/fbmask_fixed.jpg">}}

{{< img-cmp-slider before="./img/castlevania_broken.jpg" after="./img/castlevania_fixed.jpg">}}

{{< img-cmp-slider before="./img/moh_broken.jpg" after="./img/moh_fixed.jpg">}}

{{< img-cmp-slider before="./img/nemo_broken.jpg" after="./img/nemo_fixed.jpg">}}

{{< img-cmp-slider before="./img/fifa_street_broken.jpg" after="./img/fifa_street_fixed.jpg">}}

{{< img-cmp-slider before="./img/hulk_broken.jpg" after="./img/hulk_fixed.jpg">}}

Lastly, it should be noted that accurate date isn't the same as the
other accurate options. Accurate date implements an even more accurate
algorithm to compute GS destination alpha testing.

The only drawback of the current situation is that there are lots of
settings for the user to tweak in order to check which accurate option
helps with which game. This will be changing in the future, since
Gregory is currently working on a branch merging all the separate
options into a single one called "Blending Unit Accuracy" with different
modes with respect to it's accuracy and impact on performance.


## Log message and Title bar for showcasing Renderer change
- by [Turtleli](https://github.com/turtleli) & [ssakash](https://github.com/ssakash)

{{< img cols="6" src="./img/gsdx_renderer_displ.webp">}}

{{< img cols="6" src="./img/gsdx_console_displ.webp">}}


The following feature had been requested a few times but was very low
priority, since the setting could easily be identified by taking a look
at the <span style="font-style: italic;"> GSdx Plugin settings </span> .
But this wasn't actually as simple a case as it could have been. There
is a Shortcut key (F9) for toggling the mode of a specific renderer from
software to hardware mode. Using said shortcut key and changing the
renderer in the plugin settings can lead to a lot of confusion and
keeping track of what's what can get messy. Because of that the title
bar status was added by Turtleli and the console message was added by
ssakash.

Relevant PR:

-   [TitleBar](https://github.com/PCSX2/pcsx2/pull/606)
-   [Console Message](https://github.com/PCSX2/pcsx2/pull/617)



## Stuart Little 3: VIF-MFIFO Stall Issue & Dev9ghz: Unique MAC
- by [Refraction](https://github.com/refractionpcsx2)

This issue was a regression which happened sometime between 1.0.0 and
1.2.1. The issue was quickly fixed by Refraction.

The issue was actually caused by a VIF interrupt firing on a "Wait for
GS Paths" instruction before the flushing was complete which caused the
emulator to hang. The condition check has been made a lot more stable
now so such issues should never happen again.

In some unrelated work, there was an issue while using the Dev9ghz
plugin where users were being kicked from online servers because of
having similar MAC address. This was fixed by generating a unique MAC
based on the host's MAC address.

Relevant commit:

-   [VIF-MFIFO: Fix for stalls on wait instructions, fixes Stuart Little
    3](https://github.com/PCSX2/pcsx2/commit/c753f0d206d0da7a59d4bd771fffc52fbd0a6d94)
-   [dev9ghzdrk: Make the MAC truely
    unique](https://github.com/PCSX2/pcsx2/commit/819133ee45834548bd5e4f248c0234584cb0ebb5)


## Dev9ghz: Improvement in Log file handling
- by [TheLastRar](https://github.com/TheLastRar)

Previously the Dev9ghz plugin used the system registry for saving
settings. This has now been replaced by usage of an .ini file like all
the modern plugins. Furthermore, the plugin looks in the registry for
old settings and if it finds them, they are imported into an .ini file
and then deleted from the registry.

There were also instances of crashing when the ethernet adapter was not
selected, this was fixed by TheLastRar by using a conditional
statement.

Relevant PR:

-   [Fix Ethernet adapter
    crash](https://github.com/PCSX2/pcsx2/pull/654) .
-   [INI files for saving
    settings](https://github.com/PCSX2/pcsx2/pull/607) .


## Custom Patches to fix game crashes/hangs
- by [prafull](http://forums.pcsx2.net/User-prafull)

The number of PS2 games playable with PCSX2 has vastly increased over
the years but there are still some games which crash/hang at the Intro
scenes/Menus/Ingame and as a result are considered "Unplayable" in the
game database. Accurate debugging to find the conflict takes time, but
of course developers intend to fix them properly in the future. In the
mean time some of these unplayable games are now playable in PCSX2 using
custom patches. Such a custom patch might not seem like an ideal
solution from a developer's perspective, but it will surely be good news
for users who were waiting to play these games.

Games that have become playable with patches this month include:

-   Spongebob Squarepants - The Movie
-   Neo Contra
-   World Rally Championship 3
-   The Incredibles
-   The Incredibles - Rise of the Underminer
-   Dead or Alive 2 Hardcore
-   NHL 2K8


These new patches have been merged into the GameDB so that every user
can make use of them by enabling "Automatic Gamefixes" option when
playing the game. This option is enabled by default. The patch is
applied by matching the game's serial with the list present in our
database. Thanks to Prafull for spending countless of nights fixing
these games. You can check the progress on the patches
[here](http://forums.pcsx2.net/Thread-Fixing-unplayable-games).

Lastly, a brief mention of something exciting. Along with these changes,
GSdx was bumped to version 1.0. On the OGL side of things, this negated
the need for a lot of game specific hacks. Once someone ports those
changes to the DX backend, those hacks can be removed entirely! Exciting
stuff!

Thanks to all the GIT contributions during the month of June and to all
the active testers who encourage development to continue!
