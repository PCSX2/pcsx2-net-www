---
title: "Q3 2021 Progress Report"
date: 2021-12-27T23:33:07.017636
summary: "The last plugin has been merged, and much more!"
draft: false
tags:
  - "progress-report"
mainAuthor: RedDevilus
secondaryAuthors:
  - "lightningterror"
aliases:
  - "300-q3-2021-progress-report"
previewImage: "/blog/q3-2021-progress-report/img/FFX_correct_sws.jpg"
toc: true
---

## Core Improvements

{{< progress/github-link prNum="4436" title="Core/GS: Merge last plugin GSdx into the Core" authors="GovanifY" >}}

As we finally merge the last plugin namely the one responsible for the graphics settings (upscaling, blending, shaders) we can look back towards the past releases. Plugins were once a great source to decouple the core team and separate contributors so neither one wasn't blocked for doing improvements, however, these plugin creators diminished over the years until 2016 had not many advancements:

There was pretty much only ongoing work for USBqemu-wheel by jackun and CLR-DEV9 by TheLastRar, not only that the core team had better replacements over time and the last plugin creators also became de facto more a core contributor and residing in the discord group. While we do lose some other notable plugins that are highly requested like Nuvee for Lightguns, OnePad legacy which handled controller remapping but these are only temporary drawbacks as the pros outweigh the cons as you don't need to scour our website or GitHub for plugins and fewer clicks in the GUI.

It's also one of the reasons why Q2 2021 was on the meager side, it blocked a lot of contributors potential work or even would invalidate other PRs.

### DEV9

{{< progress/github-link prNum="4220" title="Add Internal DNS server" authors="TheLastRar" >}}

{{< progress/github-link prNum="4834" title="Auto Gateway Fix for winPcap backend" authors="TheLastRar" >}}

In this quarter TheLastRar has added a fix for the gateway which is the route outside your local network as it will now work manually or automatically. There is also the new internal DNS server if you know what the hosts file on your computer is, it's that. If you don't know you can compare it to a telephone book where it has your contacts with their names (URL/Websites) and their telephone number (IP addresses / Location) this is available in your ini folder.

### Counters

{{< progress/github-link prNum="4621" title="Reset Timer Count Regardless of Interrupt Enable" authors="F0bes" >}}

{{< progress/github-link prNum="4647" title="Correct H-Blank for 1080i mode" authors="refractionpcsx2" >}}

{{< progress/github-link prNum="4690" title="COP0 PCCR: Don't update counters if counting is disabled" authors="refractionpcsx2" >}}

- Gets rid of the spooky apparition in Grand Theft Auto 3 if you watch the intro.
- This is kind of just enabling the old code which was kind of correct, but the old code didn't ignore the time passed, so this also updates the last cycles.
> RedDevilus: "I've recently bought GTA 3 second-hand and did my regular testing phase when I heard talks about a cloned character, it was not triggered on my screen because I skipped the intro FMV. So if anyone says we only fix certain games or big bugs, you can look again. It was a minor bug that was actually a regression. Meanwhile, before the fix, I had my own methods of solving the issue but refraction wasn't happy with this brute-force approach"

{{< img cols="6" src="./img/github_red_gta3.webp">}}

{{< progress/github-link shas="9892624242fc548d836f0f664b440a31436c76bd" title=" Fix scanline count for double strike modes" authors="refractionpcsx2" >}}


### MTVU

{{< progress/github-link prNum="4503" title="Enable T-Bit to work with MTVU" authors="refractionpcsx2" >}}

{{< progress/github-link shas="98b19656c9f79c11c22a8ecc07521c42f9e256d1" title="VU: Fix address masking in MTVU" authors="refractionpcsx2" >}}


### VU

{{< progress/github-link prNum="4539" title="Improve sync with VU Kickstart, loosen without kickstart" authors="refractionpcsx2" >}}

This tightens the VU Sync with the EE when Kickstart is enabled to fix some SPS in PAL Ratchet games, also loosened it slightly when Kickstart is disabled to improve the speed of games that don't require it.

{{< progress/github-link prNum="4694" title="Optimise entering VU JITs" authors="refractionpcsx2" >}}

This is a pretty huge performance uplift on multiple games, it's one of the hugest gains (with the exception being the frametimes tolerance PR) of the dev build cycle.

Keep in mind the Speed percentage for the title bar on top of the viewport (also referred to as the emulation window) are the emulator frames called VPS, or in full Vsync per second in essence, how much the emulator refreshes but not the game itself which would be the Internal Frames or real FPS. It could be 60 VPS and 60 FPS (like Final Fantasy X pause screen) or 60 VPS with 20 FPS or other combinations like SOCOM II menus are 33-34 FPS even though it reports 60 VPS so you can feel the differences.

Another side note is that for normal PC games the internal resolution = viewport but in PCSX2 case, it's separated in Graphics Settings for upscaling and in General Settings where GS Window is, is the location of how big your viewport (window size) would be.

Here is an example of 3 tested games:
{{< img cols="6" src="./img/3chart_VU_JITs.webp">}}
- Ratchet: +12.36%
- Tekken: +19.8%
- My Street: +1.91%

{{< progress/github-link shas="93e5f86e243161cceaefdfd02216d509632414ac" title="Mask start addresses" authors="refractionpcsx2" >}}

{{< progress/github-link shas="ddb300027cad1fab71286665614ddcc461cbb93f" title="Improve sync during interlock and Scratchpad VU mem writes" authors="refractionpcsx2" >}}

{{< progress/github-link shas="b919de9dd181f5b2b9984b01768c6d5720404e2e" title="Adjust sync timing for VU Kickstart - Fixes Crash Twinsanity" authors="refractionpcsx2" >}}

{{< progress/github-link shas="154ed57633503ff7ab8f99254a874bae0d2392bf" title="Remove the need to pass VU struct to XGKick function" authors="refractionpcsx2" >}}


### microVU

{{< progress/github-link prNum="4487" title="Consolidate I-bit hacks into one generic one" authors="refractionpcsx2" >}}

{{< progress/github-link prNum="4703" title="Skip VU1 instructions on VU0" authors="F0bes" >}}

{{< progress/github-link prNum="4719" title="Combine mVU0cacheReserve and mVU1cacheReserve" authors="lightningterror" >}}

{{< progress/github-link prNum="4767" title="Replace XGKick hack with synced XGKick option" authors="refractionpcsx2" >}}

{{< progress/github-link shas="8f82cd11b9e8e8d9ccc30be91a7b99be47e13e1b" title="Avoid half-completed program loading null block" authors="refractionpcsx2" >}}

{{< progress/github-link prNum="4668" title="Don't emit add reg, 0 in a few instructions #4668" authors="stenzek" >}}


### GIF

{{< progress/github-link prNum="4619" title="Reimplement GIF FIFO to enable only when it is needed" authors="refractionpcsx2" >}}


### VIF

{{< progress/github-link prNum="4726" title="VU int improve" authors="refractionpcsx2" >}}

Our interpreters were frankly inaccurate and slow, this Pull Request has improved the accuracy in turn fixing a lot of visuals on uncountable games. Most people won't notice this change but it can help in comparing between the speedy recompilers if there is a bug hiding in plain sight.

{{< progress/github-link shas="97bfe08c04a6bc45f4f77c95078095c62f4a370b" title="Only enable reverse FIFO hack if VIF1 is still active" authors="refractionpcsx2" >}}


### SPU2

{{< progress/github-link prNum="4530" title="Delete broken/unused alsa backend" authors="Ziemas" >}}

{{< progress/github-link prNum="4574" title="Minor cleanup" authors="MrCK1" >}}

{{< progress/github-link prNum="4581" title="Remove NEVER_SKIP_VOICES" authors="Ziemas" >}}

{{< progress/github-link prNum="4582" title="remove unused variable" authors="Mrlinkwii" >}}

{{< progress/github-link prNum="4591" title="Remove user options for disabling reverb and de-alias filter" authors="MrCK1" >}}

{{< progress/github-link prNum="4648" title="Remove Waveout backend from Windows" authors="Mrlinkwii" >}}

{{< progress/github-link prNum="4699" title="Adjust DMA timings for IRQ's and small packets" authors="refractionpcsx2" >}}

{{< progress/github-link prNum="4700" title="Don't initialise sound buffer if it's not open" authors="refractionpcsx2" >}}

{{< progress/github-link prNum="4774" title="Disallow KeyOn within 2T of last KeyOn" authors="refractionpcsx2" >}}

{{< progress/github-link prNum="4803" title="PortAudio: Remove DirectSound backend" authors="CookiePLMonster" >}}

Perhaps an oversight as we removed DirectSound module but it was still listed as a Host API for PortAudio, reason for removal is it tends to break audio samples to even refuse to work at all. In the future, it would be nice to have Cubeb as an audio module.

{{< progress/github-link shas="06d6001b0cc869c955ab18b110a0d3d963849ad1" title=" Add rogue BIOS loop point which Megaman X7 relies on" authors="refractionpcsx2,Ziemas" >}}


### USB

{{< progress/github-link prNum="4571" title="Freeze mode enum for keyboardmania" authors="Ziemas" >}}


### CDVD

{{< progress/github-link prNum="4578" title="CHD: Fix parent search on windows" authors="Ziemas" >}}

{{< progress/github-link prNum="4645" title="Fix CdlReadS for PS1 games with CDDA" authors="kozarovv" >}}

{{< progress/github-link prNum="4646" title="Implement SCMD 0x27" authors="kozarovv" >}}

- Implement SCMD 0x27 to allow PS1 games to boot on SCPH-50009 and DTL-H50009 bios.
- According to krat0s, this command should return PS1 Disc Serial.
- Disc Serial is later used by ps1drv itself to find matching game config.

Note: While DTL consoles are known to use region-free PS1 bios, SCPH-50009 uses Asia/Japan PS1 bios, and region lock applies here.

For the observant people if you have looked at our compatibility rating you may have noticed that we had 0 games for several months until we detected that the Chinese entries and BIOS were different in code and very few exist in our proximity. Now we are up to 2 entries (actually 1 but the forum compatibility needs an update).

{{< progress/github-link prNum="4702" title="Fix up Pause and some Status behavior" authors="refractionpcsx2" >}}

Correctly sets the CDVD Status after a Pause command and corrects how the CDVD Status is handled during N-Commands. Also adjusted game fixes as necessary for known fixed games. Some games refused to boot as PCSX2 ignored the correct way to handle them.

### IPU

{{< progress/github-link prNum="4526" title="IPU: Fix SETTH threshold masks" authors="kozarovv" >}}

- According to available sources, it's 8:0 for transparency, and 24:16 for translucency.
- Currently, PCSX2 is masking bits 8 and 24 making them always 0.

In essence, IPU handles FMV/cutscenes and this PR improves some issues with them.

Hype Time Quest: Before &gt; After

{{< img-cmp before="./img/Hype-Time-Quest-befores.jpg" after="./img/Hype-Time-Quest-afters.jpg">}}

{{< progress/github-link prNum="4613" title="IPU: Store thresholds for color conversions in u16, bump savestate version" authors="kozarovv" >}}


### Debuggers

{{< progress/github-link prNum="4638" title="Debugger: Add option to display VU0F registers as floats" authors="F0bes" >}}

{{< progress/github-link prNum="4644" title="Debugger: Fix vmulai and vmaddai disassembly" authors="JayFoxRox" >}}

{{< progress/github-link prNum="4671" title="Debugger: Purge 64 / 32 bit register view options" authors="F0bes" >}}

Remove the option to view &gt; 32 bit registers as 32 bit or 64 bit and instead display the entire register value.
{{< progress/github-link prNum="4741" title="Debugger: CtrlRegisterList: Fix warning and screw up" authors="F0bes" >}}


### Misc core

{{< progress/github-link prNum="4742" title="Emitter: Use 64-bit operations on x64" authors="TellowKrinkle" >}}

{{< progress/github-link prNum="4636" title="HostFS: Add remove file functionality" authors="fjtrujy" >}}

{{< progress/github-link prNum="4642" title="PGIF: Code refactoring/cleanup" authors="kozarovv" >}}

Playing PS1 games has been a passion for some but we don't recommend it in its current state. However, we made some big improvements but it's better to use a dedicated PS1 emulator like DuckStation.

Here are some example comparisons of the improvements we witnessed:

Resident Evil: Before &gt; After
{{< img-cmp-slider before="./img/RE-befores.jpg" after="./img/RE-afters.jpg">}}

Street Fighter EX Plus Alpha: Before &gt; After
{{< img-cmp-slider before="./img/SF-EX-befores.webp" after="./img/SF-EX-afters.jpg">}}

{{< progress/github-link prNum="4676" title="IOPBios: Fix OOB read when IRQ line is invalid" authors="F0bes" >}}

{{< progress/github-link prNum="4739" title="EE JIT: Implement SDR/SDL, LDR/LDL instructions" authors="refractionpcsx2" >}}

This has a very huge performance lift, though this is the best-case scenario if it uses these instructions.So don't expect games to reflect such large performance increases like these charts would initially suggest.

{{< img cols="6" src="./img/Ref_SDL_SDRs.webp">}}

Above were refraction's results from the homebrew ELF, located here: SDL/SDR LDL/LDR Homebrew ELF

Below are the results of RedDevilus on the same homebrew which taxed the registers.

{{< img cols="6" src="./img/red_SDL_SDR.webp">}}

{{< progress/github-link shas="627f216bf770c4ff1b7f2f9c4f2c3b3f293680ce" title=" Core: Reset game CRC when rebooting. Avoids previous games patches being loaded" authors="refractionpcsx2" >}}

An oddity was discovered where patches meant for one game were accidentally injected into another which effectively broke games. Oops!

{{< progress/github-link prNum="4667" title="iR5900: Use a signed multiply for MULT1 const prop" authors="stenzek" >}}

{{< progress/github-link prNum="4748" title="R5900: Fix LWL did not sign extending in interpreter" authors="stenzek" >}}

{{< progress/github-link prNum="4548" title="IOP Interpreter: Warn on branches to zero" authors="F0bes" >}}

{{< progress/github-link prNum="4523" title="Misc: Replace ATL with WIL" authors="CookiePLMonster" >}}

While this may seem an innocent library API change (how it interprets everything from instructions to clicks)

Definition of WIL: The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.

> Silent: 'I used their CoInitializeEx that explodes loudly on failure, so regressions = quietly ignored errors in the code started showing up spectacularlyATL-&gt;WIL refactor itself isn't that interesting, if anything those regressions wereas they were issues that were always around but quietly ignored instead of manifesting themselves in an obvious way.'

So as you can refer from Silent's statement, it led to a domino effect in that lots of things seemed to break from audio to wherever, as seems consistent with PCSX2 how did this even work in the first place to then see old bugs float to the surface hiding in wait. Every day PCSX2 becomes less hacky and has a more sane codebase. You can imagine the chaos and the confusion it brought to many when trying to comprehend it all not only in terms of the PS2 but how PCSX2 has implemented it.


## GS Improvements

### Misc GS

{{< progress/github-link prNum="4508" title="GS-hw: Enable pabe bit only when sw blending is enabled" authors="lightningterror" >}}

{{< progress/github-link prNum="4615" title="GS: Manage draw rectangle in GS instead of wx" authors="stenzek" >}}

{{< progress/github-link prNum="4632" title="GS-d3d11: Cleanup fxaa and external shader" authors="lightningterror" >}}

{{< progress/github-link prNum="4633" title="GS-d3d11: Minor Blend changes" authors="lightningterror" >}}

{{< progress/github-link prNum="4664" title="GS-GUI: Add 7x Multiplier" authors="RedDevilus" >}}

{{< progress/github-link prNum="4682" title="GS-GUI: Enable Software Edge Anti-Aliasing by default" authors="RedDevilus" >}}

This option helps several games on Software renderer but it won't help on a Hardware Renderer as it's not implemented at this time.
Some examples where AA is useful to fix issues:

Final Fantasy X: Before &gt; After - [#983](https://github.com/PCSX2/pcsx2/issues/983)

Look at the weird line on the tree (bottom left) and the black triangle that is right of Tidus.

{{< img-cmp-slider before="./img/FFX_blue_wrong_SWs.jpg" after="./img/FFX_blue_correct_SWs.jpg">}}

Final Fantasy X: Before &gt; After - [#3341](https://github.com/PCSX2/pcsx2/issues/3341)

Look at the blue triangle below Tidus.

{{< img-cmp-slider before="./img/ffx_wrong_sws.jpg" after="./img/FFX_correct_sws.jpg">}}

Doko Demo Issho - Toro to Ippai, Toro to Kyuujitsu: Before &gt; After - [#4674](https://github.com/PCSX2/pcsx2/issues/4674)

Look at the eyes of these weird cat characters.

{{< img-cmp-slider before="./img/toro_wrong_SWs.jpg" after="./img/toro_correct_SWs.jpg">}}

Football 2002: Before &gt; After

Look at the number 4 on the orange shirt.

{{< img-cmp-slider before="./img/Football_2002_wrong_sws.jpg" after="./img/Football_2002_correct_SWs.jpg">}}

Syphon Filter - Dark Mirror: Before &gt; After

Look at the shadows of the character, a harder one to see than the other comparisons.

{{< img-cmp-slider before="./img/Syphon_dark_mirror_wrong_sws.jpg" after="./img/Syphon_dark_mirror_correct_SWs.jpg">}}

These are just a few examples, of course there are more.

{{< progress/github-link prNum="4706" title="GS: Update tooltip to remove reference to DirectX" authors="Mrlinkwii" >}}

{{< progress/github-link prNum="4789" title="GS-GUI: Add tooltip for Dithering" authors="RedDevilus" >}}

{{< progress/github-link prNum="4811" title="GS: Test for th for tex0 flush" authors="tadanokojin" >}}

{{< img-cmp before="./img/VampireNightBrokenBulletss.jpg" after="./img/vampire_fixeds.jpg">}}

## Misc Improvements
### GUI

{{< progress/github-link prNum="4512" title="Re-order config settings" authors="RedDevilus" >}}

It will look closer to the layout of 1.6 stable release, help with muscle memory and visual cues.
{{< progress/github-link prNum="4532" title="Set missing icons and update titles" authors="Florin9doi" >}}

{{< progress/github-link prNum="4620" title="Rehaul BIOS / Folder Selector" authors="RedDevilus" >}}

BIOS and folder tabs are now together in General Settings (Used to be called Emulation Settings)
This will make it easier to find settings with fewer clicks, although there is a height issue that forces you to scroll for the time being.

{{< img cols="6" src="./img/rehaul_BIOSs.webp">}}

{{< progress/github-link prNum="4640" title="AppMain: Fix no$ symbol loading for elfs" authors="F0bes" >}}

{{< progress/github-link prNum="4663" title="Misc: Fix lastpath updating when using the --elf cmdline arg" authors="F0bes" >}}

{{< progress/github-link prNum="4675" title="WX: Make position validation multi-monitor aware" authors="tadanokojin" >}}

{{< progress/github-link prNum="4750" title="Config: Normalize limiter values before saving" authors="tadanokojin" >}}

{{< progress/github-link prNum="4756" title="Stdio console on mac" authors="tellowkrinkle" >}}

{{< progress/github-link prNum="4791" title="Select a bios by default" authors="F0bes" >}}

This will automatically click on the first BIOS in the list if you haven't selected one, affecting First-time Wizard and in General Settings. It's nice for the User Experience and it hopefully grows on you when using dev builds.

{{< img cols="6" src="./img/BIOSs.webp">}}

{{< progress/github-link prNum="4798" title="Fix crash on assertion in newer wx" authors="tellowkrinkle" >}}

{{< progress/github-link prNum="4838" title="Make 'Synchronized MTGS' UI settings exclusive to debug/devel" authors="Mrlinkwii" >}}

The setting below has been quite the staple in releases and it has actually no business in here as its only purpose is debug and not the greatest at that.

{{< progress/github-link prNum="4844" title="Move Vu overflow flag checks to a Gamefix + reorganise panel" authors="refractionpcsx2" >}}


### GitHub/CI

{{< progress/github-link prNum="4509" title="Update PR labelers to match GS merge" authors="lightningterror" >}}

{{< progress/github-link prNum="4522" title="Split AVX2 and non-AVX2 windows builds" authors="xTVaser" >}}

At the start of this report was the last GS merge, it has produced one minor annoyance. We couldn't keep all 3 GS plugins, we removed SSE2 plugin (which frankly was bad anyway) then there was SSE4 and AVX2.

What is PCSX2-AVX2?

PCSX2 uses SIMD instructions to process graphics. The following are the SIMD instruction sets PCSX2 supports:
- AVX2: Newest and fastest. Recommended for CPUs released in the last 8-10 years.
- SSE4: Older, still fast. Recommended for older CPUs which do not support AVX2.
- SSE2: Oldest, and slowest. Recommended only if your CPU is too old for SSE4.

Which one do I pick?
- 1.6.0: PCSX2 will choose the appropriate plugin for you automatically.
- 1.7.0: Try pcsx2-avx2.exe. If the program fails to start, then use pcsx2.exe.

So in essence, if you have a 4th gen intel or higher with exception the Pentiums you are probably fine or AMD Ryzen series. In the future this will turn back into a single exe where it's default SSE4 with a checker to enable AVX2 if you support it.

{{< progress/github-link prNum="4529" title="Remove dashes from build names" authors="tellowkrinkle" >}}

{{< progress/github-link prNum="4840" title="Bump macos version to 11" authors="lightningterror" >}}

{{< progress/github-link prNum="4657" title="GitHub: Switch to new issue forms" authors="xTVaser" >}}


### Other misc

{{< progress/github-link prNum="4501" title="macOS: Fix async file reader error handling" authors="tellowkrinkle" >}}

{{< progress/github-link prNum="4527" title="KeyboardQueue: Remove a Windows-specific critsec" authors="CookiePLMonster" >}}

{{< progress/github-link prNum="4554" title="3rdparty: add jpgd project" authors="tadanokojin" >}}

{{< progress/github-link prNum="4566" title="Misc: Don't update homebrew when not necessary" authors="tellowkrinkle" >}}

{{< progress/github-link prNum="4570" title="Dependencies: Update GHC 1.5.4 to 1.5.8" authors="RedDevilus" >}}

{{< progress/github-link prNum="4592" title="Dependencies: Update OpenGL dependencies" authors="RedDevilus" >}}

{{< progress/github-link prNum="4651" title="Misc: Add StartupWMClass to desktop file" authors="GiantEnemyCrab" >}}

{{< progress/github-link prNum="4670" title="Add Linux distro information to program log" authors="Mrlinkwii" >}}

{{< progress/github-link prNum="4701" title="App: Add Windows exe version information" authors="refractionpcsx2" >}}


### GameDB Improvements

As always there are many GameDB changes per quarter, since there are too many to even list we will just link the date range for merged pull requests, not counting directly pushed commits to master. List can be found at [GameDB Q3 2021](https://github.com/PCSX2/pcsx2/pulls?q=is%3Apr+is%3Aclosed+merged%3A2021-07-01..2021-09-30+base%3Amaster+sort%3Aupdated-desc+label%3AGameDB).

[#4556](https://github.com/PCSX2/pcsx2/pull/4556) Noteworthy changes include patches for unplayable games which makes the games playable from [this](https://forums.pcsx2.net/Thread-Fixing-unplayable-games) thread. [RedDevilus](https://github.com/RedDevilus) took the patches and opened a pull request adding the patches to the GameDB.

Thank you all, see you in our next coverage, cheers.
