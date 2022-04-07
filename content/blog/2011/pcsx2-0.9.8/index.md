---
title: "PCSX2 0.9.8"
date: 2011-05-01T00:00:00
summary: "It has been 2 years since our last stable release and today we (finally) bring you the newest stable release: 0.9.8!"
draft: false
tags:
  - "progress-report"
mainAuthor: rama
aliases:
  - "/85-pcsx2-0-9-8"
  - "/85-pcsx2-0-9-8.html"
  - "/85-pcsx2-0-9-8.htm"
---

It has been 2 years since our last stable release and today we (finally) bring you the newest stable release: 0.9.8!
😊
There has been a massive amount of extensive changes to the emulator as
a whole, so let's go over some of the biggest ones!

**Note: Norton Antivirus is reporting 0.9.8 as a virus! This is a false
positive, you are totally safe!**
**( [Virustotal report
here](http://www.virustotal.com/file-scan/report.html?id=fe6efa4e21068f4e391184718baf5d88d03995b4fad56b97dab22873dcdd9cd3-1304289866)
)**

We have a completely new GUI made with
[url=http://www.wxwidgets.org/]wxWidgets[/url] to make the whole
user experience simpler and more user friendly, whilst providing us with
a platform in which we can easily add new features. For this we have to
give our thanks to Air (Jake Stine) who recently left the team, who
worked on this for many months (in what was pretty much a solo effort)
to make it the best GUI we have ever had.
The entire team is eternally grateful for all of his efforts and we wish
him best of luck with his new tasks!

This new GUI brings with it a much improved Linux support, as this is a
completely cross platform user interface. Code changes will effect
Windows and Linux in the same way, making maintenance for us much easier
and finally giving Linux users a nice and consistent frontend.

Complementing the new GUI is a new Memory Card manager, providing the
flexibility to use customly named or downloaded cards with sizes of 8 to
64 megabytes. Now you can fit even more saves on one card!

Host file system and ELF loading support has been improved too.
Now you Homebrewers can work with a more feature complete virtual PS2 to
test your tools!

Patches and compatibility hacks are now automatically applied by
default.
With this you don't have to sit there for ages playing around to find
that 1 option that fixes your game; If we know about it, we've already
set it!

Aside from the shiny parts of the emulator which you guys see and use,
we have many internal changes to improve our overall compatibility, the
most notable ones being a new VU recompiler called microVU, which is an
effort to bring higher compatibility over the older SuperVU recompiler.

We also have a new VIF Unpack recompiler which is more accurate and
safer than the previous asm implementation.

The other big change is within the SPU2-X sound plugin, which has been
worked on thoroughly to improve the sound generation, provide different
audio output options and filtering, but also internal changes to improve
the compatibility with games such as Burnout 3 which had never booted on
any previous version of PCSX2!

In all we now have around 65% of all tested games marked as playable,
and at least 85% get "ingame".
This means that over 1500 of the tested games are fully playable!

I could be here rattling off the new changes all day, but i know you
guys are waiting to get going!! Here is a summary rundown of the most
notable changes within the emulator, we hope you enjoy using it as much
as we did making it!

GUI:

-   New, threaded GUI using [wxWidgets](http://www.wxwidgets.org/) .
-   New menus, for improved usability and faster configuration.
-   Convenient Memory Card editor.
-   On the fly pause and resume, perfectly stable, safe and fast.
-   On the fly setting switching and even plugin switching.
-   Powerful new configuration that is more user friendly with its first
    time wizard, reset to default buttons and a global presets system.
-   A plethora of new options that make playing games more fun!
-   All options have tooltips explaining what each of them do.
-   Comes translated, with many languages to select from.
-   Compatible with Aero Glass and Windows eye candy.
-   Looks and works great on Linux, too!

Core:

-   Entire emulation core has been overhauled. Many components are
    rewritten.
-   Countless code generation and runtime execution bugs fixed.
-   Added microVU, an improved VU0/VU1/COP2 recompiler.
-   New VIF recompiler
-   Multi-threaded GS rewrite: Faster and more stable than in 0.9.6.
-   Better BIOS splash screen skip method, better ELF support, host fs
    support.
-   New Game database detects the game you run, displays compatibility
    info, and auto applies special game fixes/patches if needed.

Plugins:

-   GSdx is faster, more stable and has more configuration options than
    ever before.
-   SPU2-X is the preferred SPU2 plugin now.

It has matured into almost completely emulating all the SPU2 quirks,
making many more games work!
(And it sounds nice, too
😊 )

Don't forget to spread the news! This will be our biggest release
EVER!

[Official Facebook
Group](http://www.facebook.com/group.php?gid=98483509559)

[Facebook Like
Page](http://www.facebook.com/#!/pages/Pcsx2-098/145051045565631) (For
mass viralnesses)

[Reddit](http://www.reddit.com/r/gaming/comments/h1eh6/ps2_emulator_pcsx2_updated_to_098_improvements/)
(Thanks HCRikki)

[Discuss on the
forums](http://forums.pcsx2.net/Thread-PCSX2-0-9-8--21539)
