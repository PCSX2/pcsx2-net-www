---
title: "Major Gsdx Progress And Monthly Progress Reports!"
date: 2015-06-11T00:00:00
summary: "Hello everyone! I know our news updates have been few and far between as of late, but that's going to change starting now!"
draft: false
tags:
  - progress-report
mainAuthor: Blyss Sarania
aliases:
  - "/269-major-gsdx-progress-monthly-reports"
  - "/269-major-gsdx-progress-monthly-reports.html"
  - "/269-major-gsdx-progress-monthly-reports.htm"
---

Hello everyone! I know our news updates have been few and far between as
of late, but that's going to change starting now! Several really nice
new features have been added by GSdx master Gregory lately. He has been
working at breakneck pace and making amazing progress. This update will
cover those as well as a few notable improvements by some of the other
devs and some changes to how we are doing things going forward. The most
visible of those changes for you guys is that we will now be writing
monthly progress reports! Sometime around the end of each
month/beginning of the next we will be posting a news update which
covers all the major changes that have taken place during that month.
For now, let's take a look at what has been happening in the world of
PCSX2 since the last update!

The first and most noticeable changes are a couple of new GSdx hardware
hacks Align sprite and Round sprite. Yes, hacks are generally not the
best way to accomplish things in an emulator. However, the problems that
these hacks solve were not solvable in any other way. PS2 games were
never meant to be upscaled and because of that when we do several
problems occur in many games. Some of these problems are unavoidable and
require workarounds to fix.

The first one that we will take a look at is the Align sprite hack. For
years, anyone who has played certain Namco games in PCSX2 was stuck
either using native resolution or using very specific X resolutions, the
largest being 1200. The reason was that if you upscaled in any other way
you would end up with these nasty black vertical lines in the image. The
reasons behind that are complicated, but can be summed up by saying It's
simply the result of how the game engine does things. However, thanks to
Gregory we don't have to deal with this issue any more! Now games like
Soul Calibur II and III, Tekken, and Ace Combat can be upscaled as much
as you want without issues. Simply enable the Align sprite hack in GSdx
hardware hacks and voil! No more black lines! Games known to be
corrected by it include:

- Tekken series
- Soul Calibur series
- Street Fighter
- Death by Degrees
- Ace Combat series

Here is a screenshot comparison showing Tekken 5:

Without/Without Align Sprite:

{{< img-cmp before="./img/Tekken-5-Without-Align-Hack.png)" after="./img/Tekken-5-With-Align-Hack.png">}}

The second hack is the Round sprite hack. As above, this hack solves an
upscaling problem that was not solvable in any other way. In many games
that use a lot of sprites, upscaling produces noticeable glitches in the
sprites. A very good example of that is the character portraits in Artonelico games. Before, when you upscaled you would wind up with little
boxes around the characters faces. Many other games would have lines or
other errors in their sprites when at any resolution aside from native.
This again comes down to the fact that PS2 games were never meant to be
upscaled. However, Gregory was up to the task and very quickly produced
the Round sprite hack which solves all of these problems. If you have a
game with many sprites and those sprites have issues with upscaling then
it's very likely the Round sprite hack will solve that for you. Games
known to be corrected by it include:

- Artonelico series
- Atelier series
- Ace Combat Series

Here is a comparison screenshot showing Artonelico - Melody of Elemia:

Without/Without Round Sprite:

{{< img-cmp before="./img/ATon-no-round-sprite.jpg" after="./img/ATon-round-sprite.jpg">}}

For an in depth explanation of both of these new hacks, please read the
developer blog post
[here](/content/blog/2015/explanation-hacks-needed-for-upscaling-glitches/index.md).

Now we come to something that is not a hack. Many of you who played
certain games have encountered an error in the log such as Impossible
blend for D3D: (Cd - Cs) \* 7 &gt;&gt; 7 + Cd and while it produces no
issue in playing the game, it does mean some effects are not being
rendered or are being rendered incorrectly. A good example of this is
Grand Theft Auto: San Andreas. This game was practically unplayable in
hardware mode due to the graphical issues arising from the impossible
blend. The reason we have this issue is that some of the things that the
PS2 hardware can do are not very easy or even possible to do on PC
hardware. Gregory however decided to tackle the problem. He realized
that there are some features in OpenGL which would allow the impossible
blend to be emulated correctly and efficiently. In no time at all he had
quite literally made the impossible be possible! Currently the issue is
fixed only in OpenGL, however Gregory and Refraction are working on
fixing it in DirectX 11 as well. Games known to be improved by the
correct blending are:

Grand Theft Auto: San Andreas
Valkyrie Profile 2: Silmeria
Metal Gear Solid 3: Snake Eater
Haunting Ground (still has some other broken effects though)

Here is a screenshot comparison showing Metal Gear Solid 3: Snake
Eater:

Incorrect/Correct Blending:

{{< img-cmp before="./img/MGS-bad-blend.png" after="./img/MGS-good-blend.png">}}

For an in depth explanation of why we have "impossible" blends and how
Gregory fixed that, please read the developer blog post located
[here](/content/blog/2015/explanation-impossible-blend/index.md).

Next we will take a look at some of the changes happening in the OpenGL
realm lately. Gregory has been working very hard on this oft neglected
backend and it really shows. As a result of that hard work it is now on
par with the DirectX backend in most situations and even more accurate
in some games. A good example of that is the shadow rendering in Shadow
of the Colossus (pun not intended!).

{{< img-cmp before="./img/sotc_before.png" after="./img/sotc_after.png">}}

We can see from these images that it's the OpenGL backend that does it
best now. However the OpenGL backend is also known for being much slower
than our DirectX ones so even if it is on the same level accuracy wise
the only people who would really use it would be Linux users, since they
don't have a choice. Recognizing that issue, Gregory decided to pull out
all the stops. By utilizing a formerly unused OpenGL feature and taking
advantage of threaded optimization he was able to bring the OpenGL
backend quite literally up to speed. Here are some numbers that show
just how well they compare now (thanks go to Refraction for testing):

**Soul Calibur III**

Without MTVU:
- OGL+Texture Storage = 96fps
- DirectX11 = 92fps

With MTVU:
- OGL+Texture Storage = 114fps
- DirectX11= 112fps

**Grand Theft Auto: San Andreas**

Without MTVU:
- OGL+Texture Storage = 120fps
- DirectX11= 121fps

With MTVU:
- OGL+Texture Storage = 155fps
- DirectX11= 157fps

**Grandia III**

Without MTVU:
- OGL+Texture Storage = 94fps
- DirectX11= 94fps

With MTVU:
- OGL+Texture Storage = 123fps
- DirectX11= 122fps

As you can see the results are practically epic! The one unfortunate
caveat is this: It's currently only that fast on Nvidia graphics cards.
This is due to only Nvidia's drivers currently supporting the Threaded
optimization settings which needs to be on for this level of performance
to be achieved. If AMD/Intel drivers start supporting that then it will
work there too. Regardless, Gregory is always working on new ways to eek
extra performance out of the OpenGL backend so don't fret if you can't
make use of the current boost. Things will only get better as we go
on!

Next up is something that is useful to those of us with tons of PS2
games but who don't happen to have unlimited hard drive space compressed
ISO support. A while back, avih had added support for reading gzipped
ISOs which was well received due to many of us having lots of PS2 games.
Last month things got even better on that front when a coder by the name
of unknownbrackets added support for CSO to PCSX2. You may be familiar
with CSO files from using them with your PSP or PPSSPP they are
basically a type of compressed ISO file. In order to create CSO files
for PCSX2 you should use a program called
[maxcso](https://github.com/unknownbrackets/maxcso/releases) which can
handle files larger than 4GB. For creating gzip files you can use 7zip
(change the Archive format: in the compression dialog box to gzip). Once
you have your compressed file it can be loaded into PCSX2 via the normal
method. If you are using a gzip file then PCSX2 will create an index the
very first time you load the compressed game in order to speed up access
times to various parts of the archive. The amount of space saved is not
terribly huge per ISO but if you have many games then it can add up
quite quickly. This chart shows the file size of a few games for
uncompressed, gzip and CSO file types.

{{< img cols="6" src="./img/chart1.png">}}

As you can see, gzip results in slightly smaller files when using ultra
compression level. However it takes a lot longer to compress than CSO so
there is a bit of a trade off. Regardless of whether you choose gzip or
CSO, this feature is sure to be of good use to those of us with large
collections of games!

