---
title: "Q3 2021 Progress Report"
date: 2021-12-27T23:33:07.017636
summary: ""
draft: true
tags:
  - "progress-report"
mainAuthor: RedDevilus
secondaryAuthors:
  - "lightningterror"
aliases:
  - "300-q3-2021-progress-report"
toc: true
---

## Core Improvements

{{< progress/pull-request prNum="4436" title="Core/GS: Merge last plugin GSdx into the Core" author="GovanifY" >}}

As we finally merge the last plugin namely the one responsible for the graphics settings (upscaling, blending, shaders) we can look back towards the past releases. Plugins were once a great source to decouple the core team and separate contributors so neither one wasn't blocked for doing improvements, however, these plugin creators diminished over the years until 2016 had not many advancements:

There was pretty much only ongoing work for USBqemu-wheel by jackun and CLR-DEV9 by TheLastRar, not only that the core team had better replacements over time and the last plugin creators also became de facto more a core contributor and residing in the discord group. While we do lose some other notable plugins that are highly requested like Nuvee for Lightguns, OnePad legacy which handled controller remapping but these are only temporary drawbacks as the pros outweigh the cons as you don't need to scourge our website or GitHub for plugins and fewer clicks in the GUI.

It's also one of the reasons why Q2 2021 was on the meager side, it blocked a lot of contributors potential work or even would invalidate other PRs.

### DEV9

{{< progress/pull-request prNum="4220" title="Add Internal DNS server" author="TheLastRar" >}}

{{< progress/pull-request prNum="4834" title="Auto Gateway Fix for winPcap backend" author="TheLastRar" >}}

In this quarter TheLastRar has added a fix for the gateway which is the route outside your local network as it will now work manually or automatically. There is also the new internal DNS server if you know what the hosts file on your computer is, it's that. If you don't know you can compare it to a telephone book where it has your contacts with their names (URL/Websites) and their telephone number (IP addresses / Location) this is available in your ini folder.

### Counters

{{< progress/pull-request prNum="4621" title="Reset Timer Count Regardless of Interrupt Enable" author="F0bes" >}}

{{< progress/pull-request prNum="4647" title="Correct H-Blank for 1080i mode" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4690" title="COP0 PCCR: Don't update counters if counting is disabled" author="refractionpcsx2" >}}

- Gets rid of the spooky apparition in Grand Theft Auto 3 if you watch the intro.
- This is kind of just enabling the old code which was kind of correct, but the old code didn't ignore the time passed, so this also updates the last cycles.
> RedDevilus: "I've recently bought GTA 3 second-hand and did my regular testing phase when I heard talks about a cloned character, it was not triggered on my screen because I skipped the intro FMV. So if anyone says we only fix certain games or big bugs, you can look again. It was a minor bug that was actually a regression. Meanwhile, before the fix, I had my own methods of solving the issue but refraction wasn't happy with this brute-force approach"

{{< img cols="6" src="./github_red_gta3.webp" center="true">}}

{{< progress/commit sha="6c76bd" title=" Fix scanline count for double strike modes" author="refractionpcsx2" >}}


### MTVU

{{< progress/pull-request prNum="4503" title="Enable T-Bit to work with MTVU" author="refractionpcsx2" >}}

{{< progress/commit sha="e256d1" title="VU: Fix address masking in MTVU" author="refractionpcsx2" >}}


### VU

{{< progress/pull-request prNum="4539" title="Improve sync with VU Kickstart, loosen without kickstart" author="refractionpcsx2" >}}

This tightens the VU Sync with the EE when Kickstart is enabled to fix some SPS in PAL Ratchet games, also loosened it slightly when Kickstart is disabled to improve the speed of games that don't require it.

{{< progress/pull-request prNum="4694" title="Optimise entering VU JITs" author="refractionpcsx2" >}}

This is a pretty huge performance uplift on multiple games, it's one of the hugest gains (with the exception being the frametimes tolerance PR) of the dev build cycle.

Keep in mind the Speed percentage for the title bar on top of the viewport (also referred to as the emulation window) are the emulator frames called VPS, or in full Vsync per second in essence, how much the emulator refreshes but not the game itself which would be the Internal Frames or real FPS. It could be 60 VPS and 60 FPS (like Final Fantasy X pause screen) or 60 VPS with 20 FPS or other combinations like SOCOM II menus are 33-34 FPS even though it reports 60 VPS so you can feel the differences.

Another side note is that for normal PC games the internal resolution = viewport but in PCSX2 case, it's separated in Graphics Settings for upscaling and in General Settings where GS Window is, is the location of how big your viewport (window size) would be.

Here is an example of 3 tested games:
{{< img cols="6" src="./3chart_VU_JITs.webp">}}
- Ratchet: +12.36%
- Tekken: +19.8%
- My Street: +1.91%

{{< progress/commit sha="2414ac" title="Mask start addresses" author="refractionpcsx2" >}}

{{< progress/commit sha="cbb93f" title="Improve sync during interlock and Scratchpad VU mem writes" author="refractionpcsx2" >}}

{{< progress/commit sha="404e2e" title="Adjust sync timing for VU Kickstart - Fixes Crash Twinsanity" author="refractionpcsx2" >}}

{{< progress/commit sha="2392bf" title="Remove the need to pass VU struct to XGKick function" author="refractionpcsx2" >}}


### microVU

{{< progress/pull-request prNum="4487" title="Consolidate I-bit hacks into one generic one" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4703" title="Skip VU1 instructions on VU0" author="F0bes" >}}

{{< progress/pull-request prNum="4719" title="Combine mVU0cacheReserve and mVU1cacheReserve" author="lightningterror" >}}

{{< progress/pull-request prNum="4767" title="Replace XGKick hack with synced XGKick option" author="refractionpcsx2" >}}

{{< progress/commit sha="e13e1b" title="Avoid half-completed program loading null block" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4668" title="Don't emit add reg, 0 in a few instructions #4668" author="stenzek" >}}


### GIF

{{< progress/pull-request prNum="4619" title="Reimplement GIF FIFO to enable only when it is needed" author="refractionpcsx2" >}}


### VIF

{{< progress/pull-request prNum="4726" title="VU int improve" author="refractionpcsx2" >}}

Our interpreters were frankly inaccurate and slow, this Pull Request has improved the accuracy in turn fixing a lot of visuals on uncountable games. Most people won't notice this change but it can help in comparing between the speedy recompilers if there is a bug hiding in plain sight.

{{< progress/commit sha="4a370b" title="Only enable reverse FIFO hack if VIF1 is still active" author="refractionpcsx2" >}}


### SPU2

{{< progress/pull-request prNum="4530" title="Delete broken/unused alsa backend" author="Ziemas" >}}

{{< progress/pull-request prNum="4574" title="Minor cleanup" author="MrCK1" >}}

{{< progress/pull-request prNum="4581" title="Remove NEVER_SKIP_VOICES" author="Ziemas" >}}

{{< progress/pull-request prNum="4582" title="remove unused variable" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4591" title="Remove user options for disabling reverb and de-alias filter" author="MrCK1" >}}

{{< progress/pull-request prNum="4648" title="Remove Waveout backend from Windows" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4699" title="Adjust DMA timings for IRQ's and small packets" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4700" title="Don't initialise sound buffer if it's not open" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4774" title="Disallow KeyOn within 2T of last KeyOn" author="refractionpcsx2" >}}

{{< progress/pull-request prNum="4803" title="PortAudio: Remove DirectSound backend" author="CookiePLMonster" >}}

Perhaps an oversight as we removed DirectSound module but it was still listed as a Host API for PortAudio, reason for removal is it tends to break audio samples to even refuse to work at all. In the future, it would be nice to have Cubeb as an audio module.

{{< progress/commit sha="849ad1" title=" Add rogue BIOS loop point which Megaman X7 relies on" author="refractionpcsx2](https://github.com/refractionpcsx2) and [Ziemas" >}}


### USB

{{< progress/pull-request prNum="4571" title="Freeze mode enum for keyboardmania" author="Ziemas" >}}


### CDVD

{{< progress/pull-request prNum="4578" title="CHD: Fix parent search on windows" author="Ziemas" >}}

{{< progress/pull-request prNum="4645" title="Fix CdlReadS for PS1 games with CDDA" author="kozarovv" >}}

{{< progress/pull-request prNum="4646" title="Implement SCMD 0x27" author="kozarovv" >}}

- Implement SCMD 0x27 to allow PS1 games to boot on SCPH-50009 and DTL-H50009 bios.
- According to krat0s, this command should return PS1 Disc Serial.
- Disc Serial is later used by ps1drv itself to find matching game config.

Note: While DTL consoles are known to use region-free PS1 bios, SCPH-50009 uses Asia/Japan PS1 bios, and region lock applies here.

For the observant people if you have looked at our compatibility rating you may have noticed that we had 0 games for several months until we detected that the Chinese entries and BIOS were different in code and very few exist in our proximity. Now we are up to 2 entries (actually 1 but the forum compatibility needs an update).

{{< progress/pull-request prNum="4702" title="Fix up Pause and some Status behavior" author="refractionpcsx2" >}}

Correctly sets the CDVD Status after a Pause command and corrects how the CDVD Status is handled during N-Commands. Also adjusted game fixes as necessary for known fixed games. Some games refused to boot as PCSX2 ignored the correct way to handle them.

### IPU

{{< progress/pull-request prNum="4526" title="IPU: Fix SETTH threshold masks" author="kozarovv" >}}

- According to available sources, it's 8:0 for transparency, and 24:16 for translucency.
- Currently, PCSX2 is masking bits 8 and 24 making them always 0.

In essence, IPU handles FMV/cutscenes and this PR improves some issues with them.

Hype Time Quest: Before &gt; After

{{< img-cmp before="./Hype-Time-Quest-befores.jpg" after="./Hype-Time-Quest-afters.jpg">}}

{{< progress/pull-request prNum="4613" title="IPU: Store thresholds for color conversions in u16, bump savestate version" author="kozarovv" >}}


### Debuggers

{{< progress/pull-request prNum="4638" title="Debugger: Add option to display VU0F registers as floats" author="F0bes" >}}

{{< progress/pull-request prNum="4644" title="Debugger: Fix vmulai and vmaddai disassembly" author="JayFoxRox" >}}

{{< progress/pull-request prNum="4671" title="Debugger: Purge 64 / 32 bit register view options" author="F0bes" >}}

Remove the option to view &gt; 32 bit registers as 32 bit or 64 bit and instead display the entire register value.
{{< progress/pull-request prNum="4741" title="Debugger: CtrlRegisterList: Fix warning and screw up" author="F0bes" >}}


### Misc core

{{< progress/pull-request prNum="4742" title="Emitter: Use 64-bit operations on x64" author="TellowKrinkle" >}}

{{< progress/pull-request prNum="4636" title="HostFS: Add remove file functionality" author="fjtrujy" >}}

{{< progress/pull-request prNum="4642" title="PGIF: Code refactoring/cleanup" author="kozarovv" >}}

Playing PS1 games has been a passion for some but we don't recommend it in its current state. However, we made some big improvements but it's better to use a dedicated PS1 emulator like DuckStation.

Here are some example comparisons of the improvements we witnessed:

Resident Evil: Before &gt; After
{{< img-cmp-slider before="./RE-befores.jpg" after="./RE-afters.jpg">}}

Street Fighter EX Plus Alpha: Before &gt; After
{{< img-cmp-slider before="./SF-EX-befores.webp" after="./SF-EX-afters.jpg">}}

{{< progress/pull-request prNum="4676" title="IOPBios: Fix OOB read when IRQ line is invalid" author="F0bes" >}}

{{< progress/pull-request prNum="4739" title="EE JIT: Implement SDR/SDL, LDR/LDL instructions" author="refractionpcsx2" >}}

This has a very huge performance lift, though this is the best-case scenario if it uses these instructions.So don't expect games to reflect such large performance increases like these charts would initially suggest.

{{< img cols="6" src="./Ref_SDL_SDRs.webp">}}

Above were refraction's results from the homebrew ELF, located here: SDL/SDR LDL/LDR Homebrew ELF

Below are the results of RedDevilus on the same homebrew which taxed the registers.

{{< img cols="6" src="./red_SDL_SDR.webp">}}

{{< progress/commit sha="3680ce" title=" Core: Reset game CRC when rebooting. Avoids previous games patches being loaded" author="refractionpcsx2" >}}

An oddity was discovered where patches meant for one game were accidentally injected into another which effectively broke games. Oops!

{{< progress/pull-request prNum="4667" title="iR5900: Use a signed multiply for MULT1 const prop" author="stenzek" >}}

{{< progress/pull-request prNum="4748" title="R5900: Fix LWL did not sign extending in interpreter" author="stenzek" >}}

{{< progress/pull-request prNum="4548" title="IOP Interpreter: Warn on branches to zero" author="F0bes" >}}

{{< progress/pull-request prNum="4523" title="Misc: Replace ATL with WIL" author="CookiePLMonster" >}}

While this may seem an innocent library API change (how it interprets everything from instructions to clicks)

Definition of WIL: The Windows Implementation Libraries (WIL) is a header-only C++ library created to make life easier for developers on Windows through readable type-safe C++ interfaces for common Windows coding patterns.

> Silent: 'I used their CoInitializeEx that explodes loudly on failure, so regressions = quietly ignored errors in the code started showing up spectacularlyATL-&gt;WIL refactor itself isn't that interesting, if anything those regressions wereas they were issues that were always around but quietly ignored instead of manifesting themselves in an obvious way.'

So as you can refer from Silent's statement, it led to a domino effect in that lots of things seemed to break from audio to wherever, as seems consistent with PCSX2 how did this even work in the first place to then see old bugs float to the surface hiding in wait. Every day PCSX2 becomes less hacky and has a more sane codebase. You can imagine the chaos and the confusion it brought to many when trying to comprehend it all not only in terms of the PS2 but how PCSX2 has implemented it.


## GS Improvements

### Misc GS

{{< progress/pull-request prNum="4508" title="GS-hw: Enable pabe bit only when sw blending is enabled" author="lightningterror" >}}

{{< progress/pull-request prNum="4615" title="GS: Manage draw rectangle in GS instead of wx" author="stenzek" >}}

{{< progress/pull-request prNum="4632" title="GS-d3d11: Cleanup fxaa and external shader" author="lightningterror" >}}

{{< progress/pull-request prNum="4633" title="GS-d3d11: Minor Blend changes" author="lightningterror" >}}

{{< progress/pull-request prNum="4664" title="GS-GUI: Add 7x Multiplier" author="RedDevilus" >}}

{{< progress/pull-request prNum="4682" title="GS-GUI: Enable Software Edge Anti-Aliasing by default" author="RedDevilus" >}}

This option helps several games on Software renderer but it won't help on a Hardware Renderer as it's not implemented at this time.
Some examples where AA is useful to fix issues:

Final Fantasy X: Before &gt; After - [#983](https://github.com/PCSX2/pcsx2/issues/983)

Look at the weird line on the tree (bottom left) and the black triangle that is right of Tidus.

{{< img-cmp-slider before="./FFX_blue_wrong_SWs.jpg" after="./FFX_blue_correct_SWs.jpg">}}

Final Fantasy X: Before &gt; After - [#3341](https://github.com/PCSX2/pcsx2/issues/3341)

Look at the blue triangle below Tidus.

{{< img-cmp-slider before="./ffx_wrong_sws.jpg" after="./FFX_correct_sws.jpg">}}

Doko Demo Issho - Toro to Ippai, Toro to Kyuujitsu: Before &gt; After - [#4674](https://github.com/PCSX2/pcsx2/issues/4674)

Look at the eyes of these weird cat characters.

{{< img-cmp-slider before="./toro_wrong_SWs.jpg" after="./toro_correct_SWs.jpg">}}

Football 2002: Before &gt; After

Look at the number 4 on the orange shirt.

{{< img-cmp-slider before="./Football_2002_wrong_sws.jpg" after="./Football_2002_correct_SWs.jpg">}}

Syphon Filter - Dark Mirror: Before &gt; After

Look at the shadows of the character, a harder one to see than the other comparisons.

{{< img-cmp-slider before="./Syphon_dark_mirror_wrong_sws.jpg" after="./Syphon_dark_mirror_correct_SWs.jpg">}}

These are just a few examples, of course there are more.

{{< progress/pull-request prNum="4706" title="GS: Update tooltip to remove reference to DirectX" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4789" title="GS-GUI: Add tooltip for Dithering" author="RedDevilus" >}}

{{< progress/pull-request prNum="4811" title="GS: Test for th for tex0 flush" author="tadanokojin" >}}

{{< img-cmp before="./VampireNightBrokenBulletss.jpg" after="./vampire_fixeds.jpg">}}

## Misc Improvements
### GUI

{{< progress/pull-request prNum="4512" title="Re-order config settings" author="RedDevilus" >}}

It will look closer to the layout of 1.6 stable release, help with muscle memory and visual cues.
{{< progress/pull-request prNum="4532" title="Set missing icons and update titles" author="Florin9doi" >}}

{{< progress/pull-request prNum="4620" title="Rehaul BIOS / Folder Selector" author="RedDevilus" >}}

BIOS and folder tabs are now together in General Settings (Used to be called Emulation Settings)
This will make it easier to find settings with fewer clicks, although there is a height issue that forces you to scroll for the time being.

{{< img cols="6" src="./rehaul_BIOSs.webp">}}

{{< progress/pull-request prNum="4640" title="AppMain: Fix no$ symbol loading for elfs" author="F0bes" >}}

{{< progress/pull-request prNum="4663" title="Misc: Fix lastpath updating when using the --elf cmdline arg" author="F0bes" >}}

{{< progress/pull-request prNum="4675" title="WX: Make position validation multi-monitor aware" author="tadanokojin" >}}

{{< progress/pull-request prNum="4750" title="Config: Normalize limiter values before saving" author="tadanokojin" >}}

{{< progress/pull-request prNum="4756" title="Stdio console on mac" author="tellowkrinkle" >}}

{{< progress/pull-request prNum="4791" title="Select a bios by default" author="F0bes" >}}

This will automatically click on the first BIOS in the list if you haven't selected one, affecting First-time Wizard and in General Settings. It's nice for the User Experience and it hopefully grows on you when using dev builds.

{{< img cols="6" src="./BIOSs.webp">}}

{{< progress/pull-request prNum="4798" title="Fix crash on assertion in newer wx" author="tellowkrinkle" >}}

{{< progress/pull-request prNum="4838" title="Make 'Synchronized MTGS' UI settings exclusive to debug/devel" author="Mrlinkwii" >}}

The setting below has been quite the staple in releases and it has actually no business in here as its only purpose is debug and not the greatest at that.

{{< progress/pull-request prNum="4844" title="Move Vu overflow flag checks to a Gamefix + reorganise panel" author="refractionpcsx2" >}}


### GitHub/CI

{{< progress/pull-request prNum="4509" title="Update PR labelers to match GS merge" author="lightningterror" >}}

{{< progress/pull-request prNum="4522" title="Split AVX2 and non-AVX2 windows builds" author="xTVaser" >}}

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

{{< progress/pull-request prNum="4529" title="Remove dashes from build names" author="tellowkrinkle" >}}

{{< progress/pull-request prNum="4840" title="Bump macos version to 11" author="lightningterror" >}}

{{< progress/pull-request prNum="4657" title="GitHub: Switch to new issue forms" author="xTVaser" >}}


### Other misc

{{< progress/pull-request prNum="4501" title="macOS: Fix async file reader error handling" author="tellowkrinkle" >}}

{{< progress/pull-request prNum="4527" title="KeyboardQueue: Remove a Windows-specific critsec" author="CookiePLMonster" >}}

{{< progress/pull-request prNum="4554" title="3rdparty: add jpgd project" author="tadanokojin" >}}

{{< progress/pull-request prNum="4566" title="Misc: Don't update homebrew when not necessary" author="tellowkrinkle" >}}

{{< progress/pull-request prNum="4570" title="Dependencies: Update GHC 1.5.4 to 1.5.8" author="RedDevilus" >}}

{{< progress/pull-request prNum="4592" title="Dependencies: Update OpenGL dependencies" author="RedDevilus" >}}

{{< progress/pull-request prNum="4651" title="Misc: Add StartupWMClass to desktop file" author="GiantEnemyCrab" >}}

{{< progress/pull-request prNum="4670" title="Add Linux distro information to program log" author="Mrlinkwii" >}}

{{< progress/pull-request prNum="4701" title="App: Add Windows exe version information" author="refractionpcsx2" >}}


### GameDB Improvements

As always there are many GameDB changes per quarter, since there are too many to even list we will just link the date range for merged pull requests, not counting directly pushed commits to master. List can be found at [GameDB Q3 2021](https://github.com/PCSX2/pcsx2/pulls?q=is%3Apr+is%3Aclosed+merged%3A2021-07-01..2021-09-30+base%3Amaster+sort%3Aupdated-desc+label%3AGameDB).

[#4556](https://github.com/PCSX2/pcsx2/pull/4556) Noteworthy changes include patches for unplayable games which makes the games playable from [this](https://forums.pcsx2.net/Thread-Fixing-unplayable-games) thread. [RedDevilus](https://github.com/RedDevilus) took the patches and opened a pull request adding the patches to the GameDB.

Thank you all, see you in our next coverage, cheers.
