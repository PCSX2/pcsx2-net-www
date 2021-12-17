::: {.single-article}
::: {.item-page .clearfix}
::: {style="text-align:center;"}
:::

One of the major changes planned for the next release of PCSX2 is a
complete overhaul of the gui/frontend, switching from the current
\"native\" Windows/Linux interfaces to a single unified interface
that\'s (more or less) the same for both platforms. To make such a grand
vision possible we needed the help of a third party gui tooolkit, from
which there were several to choose from. After much consideration we
settled on [wxWidgets](http://www.wxwidgets.org) , which is the same
toolkit used by a few other notable emulators, such as
[Dolphin](http://www.dolphin-emulator.com/) .\
\
So what *are* the benefits of the new PCSX2 interface in development?\
\
[ **1. A vastly improved Linux interface.** ]{style="font-size: 12pt;"}\
\
\... and not just in terms of what you see, but how the emulator
cooperates with the operating system as a whole. wxWidgets provides
dozens of very useful cross-platform tools that are much more
well-suited to Linux functionality than the current PCSX2 codebase. The
new interface will have a smarter plugin loader, and multilingual
support as well. It will also be easier to install and run as a user
other than root.\
\
[ **2. Windows XP/Vista Themed appearances will finally work!**
]{style="font-size: 12pt;"}\
\
Until now, PCSX2 used the old Win95 ASCII-based Common Controls
libraries, and this forced Windows to disable themes support when
rendering the PCSX2 interface. Buttons were plain and unshaded, and
dialog boxes such as the File and Folder pickers were small, ugly, and
lacking in features. All of this will be fixed in the next release.\
\
[ **3. More complete internationalization support.**
]{style="font-size: 12pt;"}\
\
Translations of the PCSX2 interface will be easier to make and maintain,
and shouldn\'t become broken or obsolete from program updates, which was
a persistent problem in the older PCSX2 interface design. In addition,
PCSX2 will be fully Unicode compliant on both Windows and Linux
platforms, which should help resolve various oddball problems the
emulator may have encountered on non-English operating systems.\
\
[ **4. A more responsive multithreaded interface which will remain fully
accessible even while games are running!** ]{style="font-size: 12pt;"}\
\
The new interface will run on its own thread separate from the
emulator\'s EE/MTGS threads, allowing it to remain open and accessible
in the background, without the need to shut down the GS window. This
should improve the stability of \"pausing\" emulation, and also opens
the door for expanding on interface integration; such as binding popup
menus, toolbars, status bars, or other useful things to the GS window.\
\
Furthermore, if a game deadlocks the system, the interface will usually
remain responsive even as the rest of the emulator freezes up (which
might not be much of a feature for end users, but is quite handy for us
developers).\
\
[ **5. The Teaser Image!** ]{style="font-size: 12pt;"}\
\
And here\'s a sneak peek at the current GUI-Work-in-Progress:\
\
\... yeah it\'s not a whole lot to see yet \-- I might post some more as
development progresses.

------------------------------------------------------------------------

**From a coder\'s perspective:**\
\
In all the wxWidgets experience so far has been a decent one. There are
a few annoyances, but those tend to be more the fault of cross-platform
considerations (some things are not supported well under Linux, or vice
versa), or more commonly due to limitations and design flaws in the C++
language itself rather than of wxWidgets (in particular, C/C++ make it
especially difficult to work with unicode strings in a \'nice\' way).
For the most part wx tries to model itself in the image of the .NET
Framework and Java Framework API designs, which are good designs to
follow.\
\

::: {style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;"}
[Post a
Comment!](http://forums.pcsx2.net/Thread-blog-Measuring-the-Benefits-of-wxWidgets)
:::
:::
:::
