::: {.single-article}
::: {.item-page .clearfix}
## [New PCSX2 0.9.7 beta (r3878)!](/106-new-pcsx2-0-9-7-beta-r3878.html) {#new-pcsx2-0.9.7-beta-r3878 .contentheading}

Hey people,\
today we make the second 0.9.7 beta release available: PCSX2 0.9.7
(r3878)!\
\
The 0.9.7 series is marked as unstable/beta, meaning it still has some
known bugs\
and unimplemented features but it is fully supported by the PCSX2 team.\
We\'ve spent the last months on various aspects of the emulator, adding
to the awesome progress seen in beta 1.\
This release has been compiled with extensive optimizations, so you can
expect a small speedup over r3113
😊\
\
Here\'s some of the changes:

-   Gui work: threading, layout and stability have been improved.
-   Some of the reported .ini writing issues should be fixed now.
-   Game database: bug fixes, more entries, compatibility hints for
    pcsx2.
-   Automated patching enabled now: known fixes/settings for some games
    can be enabled automatically.
-   Emulation fixes to microVU.
-   VIF/GIF work: Slightly faster and more compatible.
-   Much work on GIFPath ordering issues. many games with previously
    flickering textures should work better.
-   IPU retooled and optimized: A bit faster, a bit more compatible and
    much more sane (no more coroutines).
-   Removed hazardous MMX/XMMregister freeze/restore. Speedup and
    stability is improved.
-   Savestates are now free of memory leaks.
-   Disk swapping works on a few games now (not all yet though).
-   New \"fast CDVD\" speedhack. Load levels as fast as possible!
-   Console logging is now configurable to be as verbose as in developer
    builds.
-   Commandline support.
-   A lot of other small tweaks and additions.

\
We again provide 3 versions. A full installer, a web installer and a
binary package.\
\
Windows:\
Full installer \[12.0mb\]:
[Download](/download/viewcategory/35-pcsx2-v0-9-7-beta.html)\
Web installer \[2.87mb\]:
[Download](/download/viewcategory/35-pcsx2-v0-9-7-beta.html)\
Binaries \[2.92mb / 7zip\]:
[Download](/download/viewcategory/35-pcsx2-v0-9-7-beta.html)\
\
*(NOTE: Full installer includes Microsoft Visual C++ Redistributables,
which is ideal for offline installs of PCSX2. Web installer optionally
fetches the Redists from Microsoft.com, if your computer doesn\'t
already have them installed.)*\
\
Linux binary:\
[Download](/download/viewcategory/35-pcsx2-v0-9-7-beta.html)\
There\'s also a launchpad version for Debian / Ubuntu x86 available
[here](https://launchpad.net/%7Egregory-hainaut/+archive/pcsx2.official.ppa)
.\
\
Sourcecode:\
Archive \[6.82mb / 7zip\]:
[Download](/download/viewcategory/35-pcsx2-v0-9-7-beta.html)
:::
:::
