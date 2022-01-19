::: {.single-article}
::: {.item-page .clearfix}
## [Gamepad support for Linux!](/133-gamepad-support-for-linux.html) {#gamepad-support-for-linux .contentheading}

::: {style="text-align:center;"}
:::

It\'s about time Linux users had a proper pad plugin! ZeroPAD now
supports gamepads including analog axes\... which some games are
impossible to play without! So if you are a Linux user and are dying to
play pcsx2 with a gamepad, please update the sourceforge svn or download
the zeropad plugin sources below. If you are downloading, just unzip
into your previous zeropad folder and \'make install\'. For people
having problems, post your questions in the forums.\
\
you can grab the source from [here](/download/releases/linux.html)\
\
**EDIT**\
For those people having trouble compiling, completely delete the old
zeropad directory and re-update. Then run \'sh build.sh all\' from the
root pcsx2 dir. Or if you want to do it manually, execute the following
commands in the zeropad folder:\
aclocal\
automake -a\
autoconf\
./configure \--prefix=\`pwd\`/../../../bin/plugins\
make clean\
make install
:::
:::
