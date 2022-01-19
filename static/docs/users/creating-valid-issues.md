# Creating Valid Issues

Since GitHub has a very nice issue feature with labeling and tracking, we really want to use it in our advantage to keep track of PCSX2 issues and as a nice knowledge base.

Unfortunately, most people just want their games fixed and simply post some image of the problem or some vague description, which are both completely useless to the developers.

You must make sure that **all speed hacks are off** (default settings with balanced preset is fine) and always check that your testing system is stable (for example not overheating, no unstable overclock, etc.)

Here are some links so you can easily find older versions to test:
* Current GIT builds: https://buildbot.orphis.net/pcsx2/index.php?m=fulllist
* Old legacy SVN builds: https://buildbot.orphis.net/pcsx2svn/index.php?m=fulllist
* Old PCSX2 stable releases: https://pcsx2.net/download/releases/archive-download.html

So here are 2 example issues for you, so you can copy/paste this template and use it on your own issue. One is for a core problem and another for a graphics problem.

***

Core issue:

Issue title: Disc swapping issues (Dynasty Warriors XL-Samurai Warriors XL series)

-PCSX2 version: 1.3.0 GIT 25-6-2014

-PCSX2 options: Defaults, no settings modifications affect the issue

-Plugins used: GSdx, SPU2-X, LilyPad, Linuz ISO/Gigaherz CDVD, the rest are null plugins

-Plugin settings: Defaults, no settings modifications affect the issue

-Description: The XL games of the series have an 'import from original' feature, which prompts you to eject the XL disc and insert the original disc to load additional content. While the actual disc swap seems to work, the game never imports the data saying 'The wrong disc has been inserted'

-How to replicate: Use any Dynasty Warriors 3/4/5 XL/ Samurai Warriors 1/2 XL game and select 'Import' in the menu, and disc swap to the original disc.

-Last known version to work: Never worked

-PC specifications:
CPU: Intel Core i5 2500K @ 4.3Ghz
GPU: Gigabyte Geforce GTX660 Windforce OC 2GB
OS: Windows 7 SP1 (32-bit or 64-bit)

- Other comments: Some forum member discovered a way to import the data by merging the 2 discs in one ISO which partially works here:
https://forums.pcsx2.net/Thread-Dynasty-Warriors-XL-problem-SOLVED
In general it looks like the ELF of the switched disc isn't detected properly.

***

Graphics issue:

Issue title:  Rule of Rose NTSC - SLUS-21448 - Black videos in GSdx hardware renderers

-PCSX2 version: 1.3.0 GIT 25-6-2014

-PCSX2 options: Defaults, no settings modifications affect the issue

-Plugins used: GSdx, SPU2-X, LilyPad, Linuz ISO/Gigaherz CDVD, the rest are null plugins

-Plugin settings: Tested GSdx DX9/11 hardware and software renderers. The issue is fixed with a DX9/11 software renderer of GSdx

-Description: The game's videos appear black, with sound playing normally. The issue is fixed with a DX9/11 software renderer of GSdx

-How to replicate: Boot the game and after the logos the intro video will play, displaying the issue

-Last known version to work: Unknown, probably never worked

-PC specifications:
CPU: Intel Core i5 2500K @ 4.3Ghz
GPU: Gigabyte Geforce GTX660 Windforce OC 2GB
OS: Windows 7 SP1 (32-bit or64-bit)

-Other comments: It's the usual GSdx hardware issue with videos, which occurs in lots of games.
