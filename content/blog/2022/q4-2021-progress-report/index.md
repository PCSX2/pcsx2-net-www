---
title: "Q4 2021 Progress Report"
date: 2022-05-10T00:00:00
summary: "On track with the marriage of speed and accuracy."
draft: false
tags:
  - "progress-report"
mainAuthor: RedDevilus
secondaryAuthors:
  - "TellowKrinkle"
toc: true
---
## Introduction

*Watches the date and notices something*. Yes, my dear readers (or glancers) Q1 2022 should've been published 2 months ago and this is the predecessor to that. Sorry for the delay but there have been several reasons to this almost half year delay. Ranging from the way progress reports are handled:
- Publish on private forum thread who has access
- Needing it to be HTML without a working preview
- Having multiple middlemen to check, update and publish on preview site
- Finally go mad at how inefficient the process was that 80% of the time was spent on making sure that all the Pull Requests are listed and pointed correctly instead of actual writing

Ok, moving on to better news is the the fantastic work from everybody involved in making sure that PCSX2 doesn't cave into a lesser program. In case you didn't notice we have a new site that bring PCSX2 from 2002 to 2022 and seeing that amazing animation on the homepage.

So all around we will improve all aspects of the emulator and have better progress reports that cater to the technical-, light-hearted- or the changelog- oriented people. There are also a ton of pictures in this edition of the progress report and I'm sure that quite a few of you readers are waiting on the new look of the Qt GUI but that will still take awhile to see in fruition to the public.

Here is a glimpse of what to expect:

{{< img cols="colWidth" src="./img/Pic56-QtGlimpse.png">}}

Happy Reading!

## Core Improvements

### CDVD

{{< progress/github-link prNums="4839" title="CDVD: Implement correct SpindleCtrl handling" authors="refractionpcsx2" >}}

Fixes some more videos not playing like Digital Devil Saga and fixes texture issues on Shadowman.

{{< progress/github-link prNums="4853" title="CDVD: Fix possible uncaught exception in CheckDiskTypeFS" authors="stenzek" >}}

{{< progress/github-link prNums="4860" title="CDVD: Implement Disc Swapping" authors="refractionpcsx2" >}}

Disc-Swapping has always been a highly requested feature as you have games that have 2 discs to make 1 game where it request please insert disc 2. 

Others that use it as more as an addendum to unlocking more items or a game like Alter Echo which requests to put the original disc back in and correctly reads it. Surprisingly the SingStar series might handle this the best as it can swap songs via disc-swapping and sure there is a button to do disc-swapping but it correctly handles without it.

Though there are quite some games that do not like being ejected while you are playing and okay for some games you can play a bit further because it's stored in memory but when it seeks for new data you are killing the game.

{{< progress/github-link prNums="4871" title="CDVD: Time reads by sectors per second instead of bytes + Some rotational latency" authors="refractionpcsx2" >}}

Another refinement on how the disc emulation handles reading and latencies which again improves the timing which the PS2 so desires.

{{< progress/github-link prNums="4881" title="CDVD: Simulate 1 sector read ahead" authors="refractionpcsx2" >}}

Queues 1 sector from a future read as ready which fixes Star Ocean 3 stuttering and Winning Eleven 8 crashing.

{{< progress/github-link prNums="4913" title="CDVD: Reset VM on sceCdPowerOff writes" authors="F0bes" >}}

Instead of forcefully 'pulling the cord' when you reset or press on a real console once, it will send a signal to reset. So it acts more like how the console worked, though if you see any difference is something else.

{{< progress/github-link prNums="4927" title="CDVD: Buffer up to 16 sectors" authors="refractionpcsx2" >}}

Buffers up to 16 sectors on a DVD from its current position.

Documentation from developers shows that the DVD drive will always read 16 sectors as a minimum, so this means if it reads in advance, it can buffer up a bunch of sectors to be read off quickly by the DMA.

{{< progress/github-link prNums="4992" title="CDVD: set the correct RTC year when input recording" authors="xTVaser" >}}

Changes how the date is handled for input recording as some games like Metal Gear Solid 3 is sensitive about the date for time-based events. The only comparison I can think of is like the internal battery failure message in Pokemon games if this wasn't done correctly.

{{< progress/github-link prNums="5056" title="CDVD: Adjust DMA timing based on PS1 timings." authors="refractionpcsx2" >}}

The DMA controller that directly accesses the memory with less needing to ask the CPU (EE) wasn't entirely correct but surprisingly didn't break a lot of games but did fix Spongebob Lights, Camera, Pants.

{{< progress/github-link prNums="5142" title="CDVD: Fix some read timing logic" authors="refractionpcsx2" >}}

This will refine the technique for receiving instruction and sending them so that the timing of certain events are handled correctly on time. For example a game like Pro Yakyuu Spirits 5 which does CD Standby and expects it to not be reading.

{{< progress/github-link prNums="5174" title="CDVD: Some Error handling, Status+Ready Flag changes and fix CdStop" authors="refractionpcsx2" >}}

Making sure that the CD/DVD emulation works correctly, there were additions to how the disc sectors were interpreted and handled by expanding the amount of details that it got sent and receive. It fixes certain games spinning eternally in a black screen or seem to just freeze on the spot ranging from Spyro to Aberenbou Princes to Evergrace and more.

{{< progress/github-link prNums="5182" title="CDVD: Check file actually opened before proceeding" authors="stenzek" >}}

### VU

{{< progress/github-link prNums="4901" title="COP2: Simplify reg allocation" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4907" title="Fix unparenthesized macro input" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4910" title="microVU: Use uncached reg when clamping for FMAC instructions" authors="stenzek" >}}

This was causing broken lighting in 64-bit mode, due to the larger number of registers available. Ft gets loaded and cached, but then the FMAC instructions clamp it in all modes except none, which disturbs the cached value (mismatched with the VU state). Jak happens to rely on this value not being clamped, so it was "okay" in 8-register mode because it had to be reloaded.

{{< progress/github-link prNums="4917" title="Savestates: Add missing things from Savestates" authors="refractionpcsx2" >}}

Makes savestates more robust by giving more information so as to lessen the chance of breaking the game.

{{< progress/github-link prNums="5048" title="microVU: Preserve XGKick cycles in delay slot" authors="refractionpcsx2" >}}

Preserve XGKick cycles calculated when there is a memory write in a delay slot, also added handling for xgkick sync on single instructions.

Previously there was no handling on single instructions (evil blocks) so that's sorted. The other problem was if there was a mem write in a branch delay slot, it would add the xgkick cycles it needed to run, then erase them! causing the sync to go out, this resolves it.

### SPU2

{{< progress/github-link prNums="5027" title="SPU: Fix videos in Stolen" authors="Ziemas" >}}

{{< progress/github-link prNums="5183" title="SPU2: Add Cubeb backend, remove Portaudio and SDL2 backends" authors="stenzek" >}}

The current stable (1.6 as of writing) had multiple back-ends namely Xaudio2, DirectSound, PortAudio, WaveOut. DirectSound was being a buggy mess to maintain, WaveOut wasn't much better, PortAudio was fine and Xaudio2 was de facto standard on the Windows side. Now Cubeb replaces PortAudio as its successor and keep Xaudio2 as a back-up. Keep in mind in Cubeb the latency slider states 100ms in the GUI but isn't exactly true as it automatically uses a very low latency automatically based on your system:

Best Case:

(Cubeb) Minimum latency: 10.00 ms (480 audio frames)

Worst Case:

(Cubeb) Minimum latency: 25.00 ms (1200 audio frames)

If it's above 25.00 ms you either have a computer issue like corrupt drivers or your computer is far too weak.

Xaudio2 can't handle the same low latency that Cubeb has without bad skipping and warping even on better systems. I hope you guys like the sound. How timeskipping actually works is that you see the first video frame and the sound comes after the targeted sound latency, which for years essentialy means 0.1 seconds delays.

{{< progress/github-link prNums="5238" title="Rename ConfigSoundtouch.cpp to ConfigSoundTouch.cpp" authors="xantares" >}}

### PAD

{{< progress/github-link prNums="4809" title="GUI(linux): Abort 'set all buttons' & fixed window size" authors="JosephLees" >}}

{{< progress/github-link prNums="4985" title="Create a shared pad header, get rid of the originals, and do some cleanup." authors="arcum42" >}}

### USB

{{< progress/github-link prNums="5032" title="USB: Gametrak/RealPlay" authors="Florin9doi" >}}

This Pull Request made the last non-working game work (don't count games like Final Fantasy 11 which were online-only) and looks more like a current Linus Tech Videos about VR with all those wires than a PS2 accessory. I'll stick to my Black Nintendo Wii instead of this seemingly weird copy-cat.

{{< progress/github-link prNums="5184" title="USB: Sony DPP-MP1 printer emulation" authors="Florin9doi" >}}

Most users won't see any usage with this and that is fine but the goal of emulating the endless USB and PAD devices do scare me, here is a small subset of still needing to be emulated: https://github.com/PCSX2/pcsx2/issues/4763

### DEV9

{{< progress/github-link prNums="4421" title="Convert DEV9 config dialog to wxWidgets" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4933" title="DEV9: Fix Windows config saving/loading" authors="TheLastRar" >}}

{{< progress/github-link prNums="4940" title="DEV9: DNS Logger Crash fix" authors="TheLastRar" >}}

{{< progress/github-link prNums="4960" title="DEV9: Don't shadow return value of GetAdaptersAddresses (Pcap)" authors="TheLastRar" >}}

Shadowing dwStatus for the return value of GetAdaptersAddresses will prevent the return value of second call from being inspected in the following if statement.

If the user had a large amount of network adapters, this would prevent the code from getting the adapter information of a the selected pcap adaptor.

The equivalent TAP adapter code is already correct.

{{< progress/github-link prNums="5074" title="DEV9: Enable pcap non-blocking" authors="TheLastRar" >}}

### IPU

{{< progress/github-link prNums="5173" title="IPU: Overhaul DMA transfers" authors="refractionpcsx2" >}}

Changes how DMA Transfers are handled for example some games like them to be in a specific order.

Fixes https://github.com/PCSX2/pcsx2/issues/5168 (Top Trumps).

Fixes https://github.com/PCSX2/pcsx2/issues/4063 (Phase Paradox).
Improves the moving billboard quality in Test Drive (Master has corruption).

Fixes video hang in Eggo Mania/Egg Mania - Eggstreme Madess (patch no longer required).

Fixes Smackdown Shut Your Mouth Titantrons.

Fixes Gladiator - Sword of Vengeance videos (patch no longer required) Partial https://github.com/PCSX2/pcsx2/issues/3489.

Fixes https://github.com/PCSX2/pcsx2/issues/4360 (Flipnic UFO mission hang).

### Debugger

{{< progress/github-link prNums="4865" title="Debugger: Fix Goto in Disasm option for memory view" authors="F0bes" >}}

{{< progress/github-link prNums="4885" title="Debugger: Separate symbol maps for EE and IOP" authors="Ziemas" >}}

Adds a new member function to the DebugInterface for retrieving the symbol map for the CPU and uses this where relevant instead of accessing the map directly.

Previously there was only one symbol map, which doesn't make a whole lot of sense. This prepares for future work on IOP symbol detection.

{{< progress/github-link prNums="4926" title="Debugger: Support multi-line assembling" authors="F0bes" >}}

When multiple lines of opcodes are selected, the 'Assemble Opcode(s)' context menu and M-key shortcut will turn reassemble all of those opcodes.

{{< progress/github-link prNums="4974" title="Debugger: Initial memory search implementation" authors="F0bes" >}}

Now you can finally go into a search for specific memory address or string instead of scrolling just like in cheat engine.

{{< img cols="colWidth" src="./img/Pic59-DebuggerView.png">}}
- I think Fobes needs a hug for this secretive message.

{{< progress/github-link prNums="4983" title="Debugger: Make the register list DPI aware (Windows)" authors="F0bes" >}}

Fixes the debugger view for registers when having difference in DPI (anything different from 100%).

{{< img-cmp before="./img/Pic57-DebuggerRegisterBefore.png" after="./img/Pic58-DebuggerRegisterAfter.png">}}

{{< progress/github-link prNums="4997" title="Debugger: Reset breakpoint skip on savestate load" authors="F0bes" >}}

{{< progress/github-link prNums="5003" title="Debugger: Fix breakpoint edit window on linux" authors="F0bes" >}}

{{< progress/github-link prNums="5016" title="Debugger: Allow access to all of 0xBXXXXXXX" authors="F0bes" >}}

Not sure why certain memory was blocked from being modified, this will alleviate all memory restrictions.

{{< progress/github-link prNums="5031" title="Debugger: Make memory dialog transparent" authors="F0bes" >}}

{{< progress/github-link prNums="5050" title="Debugger: Format search hits with proper specifier" authors="F0bes" >}}

Make sure certain text doesn't hard-crash the search. (Print size_t with %zu instead of %d)

### Input Recording

{{< progress/github-link prNums="4945" title="input-rec: Use a constant RTC for power-on recordings" authors="xTVaser" >}}

Gives a specific date for input recording (speedrunning).

### Miscellanous Core

{{< progress/github-link prNums="4861" title="Config: Fix folder memory cards initial load" authors="stenzek" >}}

Folder memory cards weren't recognised as a memory card being plugged-in unless you opened the config dialog.

{{< progress/github-link prNums="4914" title="CI: Retain Workflow Artifacts permanently via Github Releases" authors="xTVaser" >}}

This pull request will bring permanent downloadable (pre)releases on GitHub itself instead of just using Orphis which will not make everything more central but makes it easier to tag commits that are made outside of a pull request and just force-pushed the changes to the project. *stares at certain people that have been naughty*.

If you want to see more details, Vaser has written an essay-like detail on it:

{{< img cols="colWidth" src="./img/Pic60-ArtifactsGitHub.png">}}


So it will precompile working versions of the nightlies/dev and future stable versions on GitHub forever instead of only temporary on GitHub or what was used in the past being AppVeyor (nickname: Slowveyor). 

The nice thing about actions is that it can do multiple builds in parallel for free and can also publish these now permanent builds which are again linked on pcsx2.net as GitHub requires you to have an account in addition to being logged in so you have enough options.

## GS Improvements

### GS

{{< progress/github-link prNums="3577" title="GS: Merge assembly files in GS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="3642" title="Convert GS Settings dialog to use wxwidgets" authors="arcum42" >}}

{{< progress/github-link prNums="3940" title="GSVertexTrace::FindMinMax improvements" authors="tellowkrinkle" >}}

This PR contains the following changes:
- Prevents clang from optimizing out our denormal-removal shuffles (10x faster than before for people who compile with clang!)
- Run divides on four elements at a time instead of two elements and two useless numbers
- Remove inaccurate stq
  - With the above division improvements, on processors with partially-pipelined division (Ivy    Bridge and later, Bulldozer and later), accurate stq is actually faster (according to both IACA of inaccurate vs accurate and LLVM MCA). On older CPUs expect performance to be about 2/3 of the old algorithm before taking into account improvements from not double-checking vertices.
  - There seems to be a check of accurate_stq when the OGL backend is deciding whether to use  geometry shaders to process sprites.

In the end, ignoring clang issues, GSVertexTrace::FindMinMax goes from taking about 3% of MTGS thread runtime to 1.5% on my computer. (Most of the time was spent doing OpenGL things so if you have a more efficient OpenGL driver it might make more of a difference for you)

{{< progress/github-link prNums="4094" title="GS-hw: fix Burnout games black sky." authors="iMineLink" >}}

Burnout games weren't emulated correctly due to the texture cache being the biggest pain in the GS side, which you can avoid by switching to the Software renderer and then switching to HW. The game downloaded the texture and then modified it to finally draw it on the CPU side.

Now no more shenanigans in having to switch or ignore the sky issue, there is another game that has a similar issue a shooter called 'Black' (A recurring theme that PS2 game title names fit with their badly emulated issues). Black hasn't been fixed yet, perhaps in the future. 

{{< img-cmp-slider before="./img/Pic5-BurnoutBefore.png" after="./img/Pic6-BurnoutAfter.png">}}

{{< progress/github-link prNums="4346" title="Spin before sleeping threads to reduce thread sleeps/wakes" authors="tellowkrinkle" >}}

"Drawing triangles is super easy to parallelize!  GPUs are super parallel, and it should be nice and easy to spread a software renderer across lots of CPU cores!" is probably what most people think.  And this is generally true, if you're trying to software render for a normal PC graphics API like OpenGL.  But we're emulating a GS.  That's okay though, it's still a just bunch of triangles, right?  PCSX2 has a software renderer, and it lets you set the number of cores it used, so we can see how well it scales.  And if you messed with that number, you'd generally find that going above 3 worker threads didn't help much.  In some games, like Hitman Blood Money, you'd get the best performance with 0 worker threads.  What?

The culprit is thread synchronization.  But why would you need to synchronize worker threads when drawing a bunch of triangles?  It turns out some PS2 games like to use the result of a previous draw as the texture for another draw.  Whenever a game does this, one thread could need pixels drawn on another thread, so we have to sync them all up.  PC games do this too, but they'll usually only do this a few times per frame, rendering an entire image before reading it.  When processing effects, PS2 games like to do this on small parts of images at a time, resulting in huge numbers of thread synchronizations.  Ratchet & Clank, which previously saw speed start to die off at around 3 worker threads, requires about 500 synchronizations to draw a single frame.  Hitman Blood Money, whose title screen's FPS previously ran in the single digits, sees a whopping 10,000 synchronizations in a single frame, or 600,000 per second!  Ouch!

So what went into one of these synchronizations?  Before this PR, the control thread would see the need for synchronization, go to the first worker thread, see that it was still running, and go to sleep.  When that worker thread finished its work, it would wake up the control thread, which would then go through the rest of the worker threads, checking that they were finished as well.  While this was happening, the worker threads would each see that they have no work to do, and go to sleep themselves.  Then, the control thread would decode the image they just rendered into the format worker threads can read, at which point it would submit the next piece of work for the worker threads to process, and go through and wake all the worker threads back up.

Sleeping and waking threads is pretty fast, but it's not *that* fast.  One round trip seems to take around 5-10 microseconds on most computers.  Which seems pretty fast, until you compare that to the average time one of the threads spends rendering a pixel: 5-10 *nanoseconds*.  So in the time all these threads spent going to sleep and waking up, a single thread could have rendered 1000 pixels!  Another way to look at it is how much time Hitman Blood Money spends watching its threads sleep and wake rendering a frame: 50-100ms.  That's like 10-20 fps, and we haven't even rendered anything!

So how do we solve this?  Well you could say "just sync less", and we are working on that (some of the more recent autoflush PRs have helped here), but that's not an especially easy solution.  The easy solution is "just don't go to sleep".  In the new implementation, threads keep spinning, staring at the status variable, for up to 50 microseconds before going to sleep.  Maybe not the best use of CPU time, but it brings the time for one round trip communication from 5-10 microseconds down to just 0.2 microseconds, or 200 nanoseconds, an over 10x improvement.  With this, using multiple threads manages to not be slower than 0 threads on even Hitman Blood Money, though it isn't much faster either.  For less sync-intensive games, the falloff point for increasing threads has increased and is now usually in the 4-5 thread area (assuming you have that many cores on your CPU), bringing PAL R&C3's FPS from having dips into the mid 30s to a smooth locked 50 on a Ryzen 5 5600X.

{{< progress/github-link prNums="4348" title="Replace cached GSOffset with live calculations" authors="tellowkrinkle" >}}

The way the PS2's GS stores images in memory is a bit special.  If you took a piece of memory and just read it like normal, your image would look like a scrambled mess.  The GS actually has a different scrambling for each of its image formats, often referred to as swizzles, which allowed devs to do more effects on the shader-free GS.  As a result, PCSX2 has to deal with a lot of different possible swizzles.

Calculating swizzled offsets for every pixel of an image every time you read it would be pretty slow, so GSOffset was created to work around this.  A GSOffset stored a list of memory offsets from the top left pixel in an image to each pixel on the left edge, and a list of offsets from a pixel on the left edge to each pixel not on the left edge.  This took up 16kb, but it allowed PCSX2 to go from some pixel coordinates to the memory address of that pixel with two table lookups and two additions.  Since a GSOffset was only valid for a specific combination of texture format, texture size, and texture starting address, a new GSOffset was generated for each unique combination of those a game used.

For most games, this worked fine.  But a few games, including MLB Power Pros, Remote Control Dandy SF, and Ultimate Spider-man, liked to throw garbage data at the GS register that describes the information for the current texture.  For for each piece of garbage data, PCSX2 would create a new 16kb GSOffset, filling up a 32-bit application's 4GB address space and running out of memory in just 40 seconds.  (Sure, 64-bit has access to more memory, but if it filled up 4GB in 40 seconds, even a computer with 64GB of ram wouldn't last long...)  So why not just clean up unused GSOffsets and free them?  GSOffset was clearly not made with this in mind.  It didn't provide anything to help with actually using its data, so any code that wanted to use it had to do all the calculations manually.  Some code pulled pointers from the GSOffset and threw them all over the place.  Cleaning all that up for liveness tracking would have been a pain, and the lack of nice methods for using its data was also annoying, so we instead opted for replacing GSOffset entirely with a new class that didn't require any runtime allocations (and therefore had nothing to track).

The new GSOffset takes advantage of the fact that the table of offsets from a pixel on the left edge to any other pixel doesn't actually depend on the texture size or starting address, only on the texture format.  One of these tables is created for each of the PS2's supported texture formats by the compiler, which is possible because there's a fairly small number of them.  The rest of the calculations (e.g. the left edge calculation) are done whenever they're needed, taking advantage of the fact that images are usually read left to right, top to bottom, so while a 512x512 texture has about 260 thousand pixels, reading it using the GSOffset would only run the slightly slower left edge pixel calculation 512 times.  In the end, this slightly slower calculation was offset by the reduction in time it took to look up and create GSOffsets, resulting in no performance regression from this change.

{{< progress/github-link prNums="4385" title="GS: Simulate scan mask (fix transparency in MGS2 & MGS3)" authors="Sergeanur" >}}

For what feels like forever, transparency didn't work correctly for Metal Gear Solid 3 and other games such as Gran Turismo 4. 
{{< img-cmp-slider before="./img/Pic1-MGS3Before.png" after="./img/Pic2-MGS3After.png">}} 
{{< img-cmp-slider before="./img/Pic3-GT4Before.png" after="./img/Pic4-GT4After.png">}}
{{< img-cmp-slider before="./img/Pic47-GTConcept2002TokyoGenevaBefore.png" after="./img/Pic48-GTConcept2002TokyoGenevaAfter.png">}}
{{< img-cmp-slider before="./img/Pic49-TouristTrophyBefore.png" after="./img/Pic50-TouristTrophyAfter.png">}}

{{< progress/github-link prNums="4757" title="Improved stats printout from sw renderer" authors="tellowkrinkle" >}}

If you want to printout your stats from the SW renderer, it doesn't look as readable as it was badly aligned and has no header.

{{< img-cmp before="./img/Pic61-SWPrintoutBefore.png" after="./img/Pic62-SWPrintoutAfter.png">}}

{{< progress/github-link prNums="4850" title="GS-hw: Don't write clamped depth test value to depth buffer when ZMSK is enabled." authors="lightningterror" >}}

Fixes broken shadows from Kingdom Hearts Re-Chain which produced lines.

{{< progress/github-link prNums="4859" title="GS: Cleanup ini ranges for some values." authors="lightningterror" >}}

{{< progress/github-link prNums="4863" title="GS: Fix OSD, Shade Boost slider values not showing." authors="lightningterror" >}}

{{< progress/github-link prNums="4887" title="gs-tc: propagate texture shuffle format on readback" authors="tadanokojin" >}}

Properly fixes the flashlight in the Silent Hill series:

{{< img-cmp before="./img/Pic19-SilentHillBefore.jpg" after="./img/Pic20-SilentHillAfter.png">}}

{{< progress/github-link prNums="4891" title="GS: Revert be7e1163b4f7e3fe19876462fb26cd082ffb3ab4" authors="lightningterror" >}}

This PR reverts an older commit from 2013 (1.2 era) which had wrong assumptions on texture region repeating and how the clamping is handled along with it.

{{< progress/github-link prNums="4906" title="GS: Use stream buffer for vertices/indices/uniforms" authors="stenzek" >}}

This will certainly help AMD GPUs on Windows but it does help NVIDIA GPU users too as the default behavior was to stall (essentialy wait and stop for new instructions) which caused bad performance.

These charts below lists 3 different systems that will give you an easier way to tell how much it could help: 

{{< progress/chart data="./charts/Chart1-4906.json" >}}
{{< progress/chart data="./charts/Chart2-4906.json" >}}
{{< progress/chart data="./charts/Chart3-4906.json" >}}

{{< progress/github-link prNums="4919" title="GS: gsstate (the old gsdx one) cleanup" authors="tadanokojin" >}}

{{< progress/github-link prNums="4941" title="GS: Use custom allocator for SW renderer" authors="tellowkrinkle" >}}

This new behavior improves the software renderer quite drastically in a good way and handles it more specifically in certain situations. I would even state that the sofware renderer has never been this fast even compared to the older stable versions as I always tried to play True Crime NYC and never got full speed in the software renderer and now it's handling it with ease.

{{< progress/github-link prNums="4952" title="GS: Further state cleanup + fixes for older dump compatibility" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4965" title="GS: Let draw happen even if invalid, log invalid draws" authors="refractionpcsx2" >}}

{{< img-cmp-slider before="./img/Pic45-StarOceanBefore.png" after="./img/Pic46-StarOceanAfter.png">}}

{{< progress/github-link prNums="4966" title="GS: Fix up CLUT offset handling in 32bit I8 mode" authors="refractionpcsx2" >}}

This pull request fixes several games with the wrong colors, which depended on the CLUT (Color Look-up table) which basically is a value corresponding to a color palette an example being the RGB values (255, 0, 0) which means full red color but if the game sees a different value it is going to produce another color.

A few examples but not limited to:

{{< img-cmp-slider before="./img/Pic9-HarleyBefore.jpg" after="./img/Pic10-HarleyAfter.jpg">}}
{{< img-cmp-slider before="./img/Pic11-RomanceBefore.jpg" after="./img/Pic12-RomanceAfter.jpg">}}
{{< img-cmp-slider before="./img/Pic13-SanAndreasBefore.jpg" after="./img/Pic14-SanAndreasAfter.jpg">}}}

{{< progress/github-link prNums="4969" title="GS: Don't propagate 24bit textures on download" authors="refractionpcsx2" >}}

{{< img-cmp before="./img/Pic43-ManaKhemiaBefore.png" after="./img/Pic44-ManaKhemiaAfter.png">}}

{{< progress/github-link prNums="4971" title="GS: Redo the Texture min/max opt" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4980" title="Miscellaneous fixes for macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4993" title="GS-ogl: Remove device, driver checks in GLLoader." authors="lightningterror" >}}

{{< progress/github-link prNums="5000" title="GS:SW: Fix fog on x64 avx2" authors="tellowkrinkle" >}}

Fixes a bug where 'f' would be incorrect for the blue channel when fogging was enabled on the rendering of a sprite on avx2 x64.

Like you see this purple grass on Hitman which everybody should agree isn't realistic and is a bug:

{{< img cols="colWidth" src="./img/Pic63-HitmanPurpleGrass.png">}}

{{< progress/github-link prNums="5006" title="GS: Only reload Auto MIPs on TEX base change" authors="refractionpcsx2" >}}

PCSX2 used to re-new the addresses for textures, but some games rely on re-using the old addresses for textures causing graphical issues due to using the wrong textures with mipmapping enabled.
* It has since been revisited that the draw wasn't being flushed if MTBA updated the MIPS and MTBA on it's own was doing things incorrectly at times.

{{< img-cmp-slider before="./img/Pic39-ParappaBefore.png" after="./img/Pic40-ParappaAfter.png">}}
{{< img-cmp-slider before="./img/Pic41-ApeEscapeBefore.png" after="./img/Pic42-ApeEscapeAfter.png">}}

{{< progress/github-link prNums="5013" title="GS: Fix Half Pixel Offset and Half Screen Fix config swap" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5024" title="GS SW: Handle flat prims without float conversion" authors="refractionpcsx2" >}}

Large floats are not handled very well in the software renderer due to the range being limited by signed integers but also some precision is lost by being single floats which only have a precision of 24bits. This PR makes it so flat triangles are treated like sprites and the Z values are passed as integer so no precision is lost, which fixes games which use flat triangles to draw UI/2D screens.

{{< img-cmp-slider before="./img/Pic7-EvangelionBefore.png" after="./img/Pic8-EvangelionAfter.png">}}

{{< progress/github-link prNums="5026" title="GS-gui: Change blending option from None to Minimum." authors="lightningterror" >}}

{{< progress/github-link prNums="5029" title="GS/OpenGL: Use shader+draw for CopyRectConv" authors="stenzek" >}}

{{< progress/chart data="./charts/Chart4-5029.json" >}}

{{< progress/github-link prNums="5035" title="GS: Improve FixedTEX0 accuracy" authors="refractionpcsx2" >}}

The calculation of how to handle texture sizes wasn't perfect and would cause graphical issues when upscaling such as Final Fantasy X.

{{< img-cmp before="./img/Pic37-FFXBefore.png" after="./img/Pic38-FFXAfter.png">}}

{{< progress/github-link prNums="5054" title="GS-hw: Adjust/minor optimization on SW blend shader a bit" authors="lightningterror" >}}

{{< progress/github-link prNums="5061" title="GS-hw: Improve how we handle AA1 draws" authors="lightningterror" >}}

In the last progress report (Q3 2021) there have been improvements to how Edge Anti-Aliasing works for the software renderer (lines and triangles type), this time the hardware renderer has also been improved for several games such as Doko Demo Issho series, FIFA 2002 and other unknown games. 

However it has only been fixed on the lines type but not the triangles type which is used a ton for a game like Final Fantasy X. Hopefully in the future we can get feature parity with the software renderer which handles both types correctly and while the issue on hardware renderer is about the same it will be look worse in the severity factor.

{{< img-cmp-slider before="./img/Pic33-DokoHWBefore.png" after="./img/Pic34-DokoHWAfter.png">}}
{{< img-cmp-slider before="./img/Pic35-FIFA2002HWBefore.jpg" after="./img/Pic36-FIFA2002HWAfter.jpg">}}

{{< progress/github-link prNums="5064" title="GS-d3d11: Properly set afix in EmulateBlending." authors="lightningterror" >}}

{{< progress/github-link prNums="5067" title="GS/OpenGL: Use CreateRenderTarget() for temp HDR target" authors="stenzek" >}}

{{< progress/github-link prNums="5072" title="GS-wx: Fix some gui interaction." authors="lightningterror" >}}

{{< progress/github-link prNums="5087" title="GS: Unify HW texture caches" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5088" title="GS-glsl/fx: Split color clamp/wrap in it's own function." authors="lightningterror" >}}

{{< progress/github-link prNums="5098" title="GS Debugger: Fix Length of dump." authors="lightningterror" >}}

{{< progress/github-link prNums="5103" title="GS-hw: Sample depth on green channel" authors="lightningterror" >}}

{{< img-cmp-slider before="./img/Pic21-HitmanBefore.png" after="./img/Pic22-HitmanAfter.png">}}
{{< img-cmp-slider before="./img/Pic23-ImpossibleBefore.png" after="./img/Pic24-ImpossibleAfter.png">}}

{{< progress/github-link prNums="5110" title="GS-hw: Try to use a mix of HW/SW blending in more situations." authors="lightningterror" >}}

This will improve the blending behavior on default settings. Blending affects many things such as the lighting, shadows and more.

{{< img-cmp-slider before="./img/Pic15-ColossusBefore.png" after="./img/Pic16-ColossusAfter.png">}}
{{< img-cmp-slider before="./img/Pic17-MGS2Before.png" after="./img/Pic18-MGS2After.png">}}

{{< progress/github-link prNums="5128" title="GS-ogl: Optimize fragment shader uniform buffer." authors="lightningterror" >}}

{{< progress/github-link prNums="5135" title="GS-hw: Optimize pabe (per pixel alpha blending)" authors="lightningterror" >}}

{{< progress/github-link prNums="5138" title="GS: Replace separate HW renderers with single shared renderer" authors="tellowkrinkle" >}}

In the past all the hardware renderers like OpenGL, Direct3D11 all had their own code locations which causes a lot of duplicated code and if someone made an improvement to one they shouldn't forget improving the other hardware renderers which causes code debt if they do.

Now they all will share more code with each other.

{{< progress/github-link prNums="5139" title="Fix broken resources" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5154" title="GS: Check CLUT dirty write on vertex kick" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5180" title="GS: Fix looping over pages of textures with massive strides" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5194" title="GS/OpenGL: Add a shader/program cache" authors="stenzek" >}}

{{< progress/github-link prNums="5196" title="GS: Move afix check to high blend level" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5197" title="GS-hw: Fix recent alpha max check." authors="lightningterror" >}}

{{< progress/github-link prNums="5198" title="GS: Unify constant buffers between renderers" authors="stenzek" >}}

{{< progress/github-link prNums="5208" title="GS: Add missing override specifier to a few files" authors="stenzek" >}}

{{< progress/github-link prNums="5213" title="GS-hw: Extend Blend mix to work when alpha is higher than 1." authors="lightningterror" >}}

{{< progress/github-link prNums="5223" title="GS-hw: Mirror anisotropic filtering behavior on Direct3D11 like OpenGL, and allow it to run on Nearest texture filtering" authors="lightningterror" >}}

## Misc Improvements

### GUI

{{< progress/github-link prNums="4451" title="Allow relative elf file paths on command line" authors="Ziemas" >}}

Instead of the absolute path C:/User/Documents/PCSX2/ELF/test.elf, you can do things like ELF/test.elf instead.

{{< progress/github-link prNums="4468" title="IPC: rename to pine" authors="GovanifY" >}}

IPC is a generic name for this function so PINE was chosen as it's replacement. Especially when it's already useful for RPCS3 and other potentially other emulators or programs.

{{< progress/github-link prNums="4747" title="Savestates: Small refactoring" authors="MrCK1" >}}
Talk1

{{< progress/github-link prNums="4867" title="WX: Fix GS hotkeys losing values after reboot" authors="stenzek" >}}

Makes sure that the hotkeys still retain their function after rebooting.

{{< progress/github-link prNums="4876" title="Fix memory card saving and trace log setting loading/saving" authors="stenzek" >}}

{{< progress/github-link prNums="4882" title="GUI: remove presets 4,5,6" authors="Mrlinkwii" >}}

Preset 4,5,6 (Preset 1 is bad too to be fair) were removed as they only brought specific improvements for specific hardware and it wasn't good in most cases anyway as it just did some random EE cyclerate and cycleskip. 

PCSX2 shouldn't obfuscate with mostly useless settings that will only appeal a minority.

Personally there should be only 3 modes for people:
- Preset 2 which are the default settings (good for weaker computers that don't have enough cores)
- Preset 3 which is just Preset 2 + MTVU  (it is free performance for the taking for good hardware)
- Custom global and custom per-game settings (any other situation that does not benefit the other two above ones)

{{< progress/github-link prNums="4883" title="GUI : remove EE Cycle Skipping 3" authors="Mrlinkwii" >}}

Since all these major timing changes, this isn't really useful and broke more often than not.
More often than not downclocking the EE Cyclerate will give better results for the more lower-end hardware.

Though even in it's current state Cycleskip 1 and 2 will have decent results for Shadow of The Collosus which didn't ran full speed on the real hardware aka the PlayStation 2.

{{< progress/github-link prNums="4888" title="Add the current profile to the status bar." authors="arcum42" >}}

The main window will now say what preset you are using.

{{< img cols="colWidth" src="./img/Pic51-PCSX2Preset.png">}}

{{< progress/github-link prNums="4896" title="GS Debugger: Show \"D3D11 HW\" only on windows." authors="lightningterror" >}}

{{< progress/github-link prNums="4905" title="Replace GSWnd with GL context wrappers, remove pDsp" authors="stenzek" >}}

This is preparation part 2 to bring in the new Qt GUI.

{{< progress/github-link prNums="4931" title="Core: Few more warnings fixup." authors="lightningterror" >}}

{{< progress/github-link prNums="4975" title="Add \"Clear missing files\" option to recent ISO list" authors="italodirenzo93" >}}

If you moved or renamed your ISOs, you either had to nuke the recently played list, ignore it or set it back how it was before. More granular control on how you want to handle latest games played.

{{< img cols="colWidth" src="./img/Pic52-RemoveMissingFiles.png">}}

{{< progress/github-link prNums="4986" title="PCSX2-GUI: Fix GUI inconsistencies" authors="RedDevilus" >}}

While not as exciting as a new fix for a game, increased performance on better compatibility this will make the text more aligned with the rest of the windows. Though it did have a meaningful change that the maximum audio latency is now 200 instead of 750. 

The default is still is still 100 ms (0.1 seconds of audio latency) and if you really need 750 ms (0.75 seconds of audio latency) then it's likely Pentium 4 or older and work badly or even at all on current PCSX2 versions.

Can you spot the differences?

{{< img cols="colWidth" src="./img/Pic53-DEV9GUI.png">}}
{{< img cols="colWidth" src="./img/Pic54-PADGUI.png">}}
{{< img cols="colWidth" src="./img/Pic55-SPU2GUI.png">}}


{{< progress/github-link prNums="4989" title="WX: Fix `pxExplore` on macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5030" title="GUI: Bring back F6 string (Aspect Ratio)" authors="RedDevilus" >}}

Doesn't need much explaining as it was gone by accident to show the keybinding for aspect ratio. Emulation development can have it fair share of regressions.

{{< progress/github-link prNums="5134" title="Rebase more de-wx-ifying from last month" authors="stenzek" >}}

{{< progress/github-link prNums="5220" title="GSDumpDialog: Cache length instead of querying every packet" authors="stenzek" >}}

### GameDB

{{< progress/github-link prNums="4768" title="GameDB: Typo Cleanup" authors="RedDevilus" >}}

{{< progress/github-link prNums="4868" title="GameDB :add 'SingStar ABBA' entry" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4869" title="GameDB: Add VU clamping to Monster Rancher 3" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4877" title="GameDB: Add missing entry" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4935" title="GameDB: Add 'VUKickstart' to 'Maken Shao' games " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="4981" title="GameDB: Add and fix SingStar Entries" authors="RedDevilus" >}}

{{< progress/github-link prNums="4984" title="GameDB: Add and fix Power Pros series" authors="Tokman5" >}}

{{< progress/github-link prNums="4991" title="GameDB: Add EE clamping to 'Shadow of Zorro' and 'Evil Twin - Cyprien's Chronicles'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5004" title="GameDB: Add nearest rounding to 'Hitman - Contracts' and various fixes " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5007" title="GameDB: Add 'GIFFIFOHack' to 'Gunfighter 2 - Legend of Jesse James'" authors="Mrlinkwii" >}}

{{< img-cmp-slider before="./img/Pic31-GunfighterBefore.png" after="./img/Pic32-GunfighterAfter.png">}}

{{< progress/github-link prNums="5020" title="GameDB: Add EE-Rounding and VU-Rounding to various entries" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5023" title="GameDB : Add various fixes for various games and remove not needed patches " authors="Mrlinkwii" >}}

{{< img-cmp-slider before="./img/Pic29-OnimushaBefore.png" after="./img/Pic30-OnimushaAfter.png">}}

{{< progress/github-link prNums="5049" title="GameDB : Add fixes for various games " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5057" title="Gamedb: Remove the patch for Virtua Fighter 4" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5058" title="GameDB: Purge patches for 'Knockout Kings 2002'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5060" title="GameDB: Fix Fuuraiki 2 patch" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5073" title="GameDB: Add fixes for 'Shadow Man - 2econd Coming' and 'Ghosthunter' games." authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5093" title="GameDB: Add 'VIFFIFOHack' to 'Men in Black II: Alien Escape'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5097" title="GameDB: Add 'VUKickstartHack' to 'Crash Twinsanity'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5106" title="GameDB: Add patches to the 'K-1 World' series games add EE clamping full to 'D1 Professional Drift Grand Prix Series'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5114" title="GameDB: Add EEclamping full to 'Shinobido Takumi'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5116" title="GameDB: Add VU clamping to 'MVP Baseball 2003'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5118" title="GameDB: Add EEtiminghack to 'MGS2' and change VU- and EE-rounding for 'Primal' and add missing entries " authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5145" title="GameDB: Add patches to the 'Netsu Chu!' series and  'Samurai 7' series" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5148" title="GameDB: Add EE-clamping to 'Chou Saisoku! Zokusha King B.U.'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5150" title="GameDB: Add EE-clamping to 'Dark cloud 2'" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5153" title="GameDB: Add patches to 2k games" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5158" title="Add \"Jikkyou Powerful Pro Yakyuu 2009\" to GameDB" authors="Tokman5" >}}

{{< progress/github-link prNums="5166" title="GameDB: Add more 2k games patches" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5172" title="GameDB: Add gamefixes to 'Titeuf Mega-compet' and patch 'Yamiyo ni Sasayaku - Tantei Sagara Kyouichirou' series" authors="Mrlinkwii" >}}

{{< img-cmp-slider before="./img/Pic27-TiteufBefore.png" after="./img/Pic28-TiteufAfter.png">}}

{{< progress/github-link prNums="5178" title="GameDB: Add EE Clamping to 'Digimon Battle Chronicle' and fixes to other games" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5185" title="GameDB: Change VU-clamping on \"Sled Storm\"" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5187" title=" GameDB: add VU-clamping to \"Ultimate Spider-Man\" and fixes to other games" authors="Mrlinkwii" >}}

The game had wrongly colored eye textures (yellow/blue) but is now correctly white:

{{< img-cmp before="./img/Pic25-UltimateBefore.png" after="./img/Pic26-UltimateAfter.png">}}

{{< progress/github-link prNums="5199" title="Merge the Qt branch: Part 1" authors="stenzek" >}}

The new GUI is moving along very well, but is not at feature parity as the current WX-Widgets GUI is. Please be patient when it will be released to you guys.

{{< progress/github-link prNums="5234" title="GameDB: Remove patches for  'Neo Contra' and add EE rounding and clamping" authors="Mrlinkwii" >}}

### Maintenance

{{< progress/github-link prNums="4140" title="Remove wxString ↔︎ std::string implicit conversions" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4709" title="GS Include Cleanup" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4786" title="Remove configuration coupling to GUI" authors="stenzek" >}}

{{< progress/github-link prNums="4818" title="Add partial LTO to CMake" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4822" title="EE: Fix JIT exits on 64-bit Windows" authors="stenzek" >}}

{{< progress/github-link prNums="4855" title="Fix some compile warnings spewed by MSVC x64" authors="stenzek" >}}

{{< progress/github-link prNums="4872" title="FreeBSD fixup" authors="tadanokojin" >}}

{{< progress/github-link prNums="4908" title="Remove 30-day artifact retention on windows builds" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4929" title="Remove GTK dependency on macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4938" title="Fix compilation with LTO on GCC" authors="Ziemas" >}}

{{< progress/github-link prNums="4970" title="actions: create automatic controller db updating workflow" authors="xTVaser" >}}

{{< progress/github-link prNums="4973" title="actions: cleanup discord embed links and add release body" authors="xTVaser" >}}

{{< progress/github-link prNums="4978" title="Create AppRun hook to handle variables" authors="qurious-pixel" >}}

{{< progress/github-link prNums="4982" title="GHActions: Don't shallow clone submodules" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="4994" title="actions: increase max linux build times as well until cache-hit rate is reliable" authors="xTVaser" >}}

{{< progress/github-link prNums="4999" title="CMake: Always default `CMAKE_BUILD_PO` off" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5010" title="Update libchdr" authors="orbea" >}}

{{< progress/github-link prNums="5033" title="Update the FAQ, as well as some general cleanup." authors="arcum42" >}}

{{< progress/github-link prNums="5039" title="3rd Party: Update rogue file to correct BSD license" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5040" title="Build: Remove old unused cheatscpp.h file" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5043" title="GitHub: Update and add new issue template for non-game related bug reports" authors="xTVaser" >}}

{{< progress/github-link prNums="5051" title="3rdparty: Upgrade soundtouch lib to 2.3.1" authors="MrCK1" >}}

{{< progress/github-link prNums="5052" title="3rdparty: Upgrade xbyak to 6.00" authors="MrCK1" >}}

{{< progress/github-link prNums="5059" title="actions: Only announce `pre-release` releases" authors="xTVaser" >}}

{{< progress/github-link prNums="5077" title="Fixes to CMake and version upgrade with CMake" authors="kenshen112" >}}

{{< progress/github-link prNums="5083" title="Bump mathieudutour/github-tag-action from 5.6 to 6.0" authors="dependabot" >}}

{{< progress/github-link prNums="5084" title="Bump actions/cache from 2.1.6 to 2.1.7" authors="dependabot" >}}

{{< progress/github-link prNums="5090" title="Readme : update links" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5091" title="GHActions: Fix Mac build" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5099" title="GameDB / Memcards - Replace `yaml-cpp` with `rapidyaml`" authors="xTVaser" >}}

{{< progress/github-link prNums="5100" title="Linux and Windows CMake Builds: Change output executable to lowercase" authors="F0bes" >}}

{{< progress/github-link prNums="5108" title="VS: Add some missing vcxproj filters" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5115" title="Only pass C++ flags to C++ files." authors="arcum42" >}}

{{< progress/github-link prNums="5132" title="Make native builds default on Linux when using build.sh. Remove unused switch." authors="arcum42" >}}

{{< progress/github-link prNums="5152" title="CMake: Remove gio dependency on macOS" authors="tellowkrinkle" >}}

{{< progress/github-link prNums="5161" title="VS: Fix location of shaders in project" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5215" title="FreeBSD: fix compilation" authors="shiorid" >}}

{{< progress/github-link prNums="5219" title="GHActions: Fix game controller db updater" authors="tellowkrinkle" >}}

### Other

{{< progress/github-link prNums="4843" title="PGIF: Remove force fifo clear on GP1 (00-01)" authors="null" >}}

{{< progress/github-link prNums="4856" title="Common/StringHelpers: Fix printing of 64-bit pointers" authors="stenzek" >}}

{{< progress/github-link prNums="4890" title="IOP Recompiler: Fix BIOS trace logging on 64bit" authors="Ziemas" >}}

{{< progress/github-link prNums="4900" title="Common: Fix AT&T mixup in FastJmp code" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4920" title="Config: Fix zoom/stretch options not updating on Apply" authors="stenzek" >}}

{{< progress/github-link prNums="4943" title="Misc: Fix more warnings." authors="lightningterror" >}}

{{< progress/github-link prNums="4972" title="EE JIT: Backup shift on LDR/L if rs==rt" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="4979" title="CI:Add build date to program log of nightly builds" authors="Mrlinkwii" >}}

{{< progress/github-link prNums="5001" title="pad-linux: Update to latest controller database" authors="github-actions" >}}

{{< progress/github-link prNums="5019" title="VSProps: Set MultiProcessorCompilation in CodeGen props" authors="stenzek" >}}

{{< progress/github-link prNums="5037" title="GIF: Modify fifo read behaviour" authors="refractionpcsx2" >}}

{{< progress/github-link prNums="5141" title="EERec: Remove zero-distance jmp in full fpu mode" authors="stenzek" >}}

{{< progress/github-link prNums="5164" title="Common: Fix GetWorkingDirectory on unix" authors="tellowkrinkle" >}}

## Metadata

See you in our next progress report that is the first quarterly of 2022.

Q4 2021:
(dev1838 to dev2185) (2021-10-01 - 2021-12-31)