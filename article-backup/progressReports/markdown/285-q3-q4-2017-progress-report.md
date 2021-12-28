<div class="single-article">

<div class="item-page clearfix">

## [Happy New Year - Q3 & Q4 2017 progress report](/285-q3-q4-2017-progress-report.html)

<div style="text-align:center;">

</div>

<img src="/images/stories/frontend/progress_reports/q3-q4-2017/progress-rep-q3-q4-2017.jpg" width="563" height="104" alt="progress rep q3 q4 2017" />

Written by [CK1](https://forums.pcsx2.net/User-CK1) and
[lightningterror](https://forums.pcsx2.net/User-lightningterror)

Happy New Year to everyone from the PCSX2 team, we wish you the best for
the new year, with lots of PCSX2 gaming playing your favorite classics
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />
Onto the news!

A bit later than expected , here is the Q3 & Q4 2017 progress report.

Of course there are other changes not mentioned in the report as well so
progress is still moving along
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />

Here are the highlighted changes that we hope will strike your fancy
<img src="https://pcsx2.net/images/stories/frontend/smilies/biggrin.gif" class="yvSmiley" width="20" height="20" alt="Very Happy" />

  
  

<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> [PSX:Memory card
support](https://github.com/PCSX2/pcsx2/pull/2067) </span> by
[RedPanda4552](https://github.com/RedPanda4552)  
  
OriginallyPSX memory card creation was not possible through the emulator
and games could not see when a memory card was inserted. In addition, a
hack has been added that allows PCSX2 to "view" PSX memory cards as a
Pocketstation to fix compatibility with certain PSX games such as Final
Fantasy VIII. More details on that addition can be found
[here](https://github.com/PCSX2/pcsx2/pull/2208) !  
  
This change adds/enhances the following additions:

-   Adds a checkbox to the memory card creation screen allowing PSX
    cards to be created, as well as the logic for writing in tothe empty
    card.
-   Modifying the existing preprocessor based SIO interrupts to instead
    work based on the running game's type (PSX/PS2). This allows PS2
    games to skip the delays as they were before, but for PSX games to
    use the delays, which are necessary for memory card interaction.

  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> GSdx
Enhancements </span>  
  
[Extend "Preload Frame Data" support to
Direct3D](https://github.com/PCSX2/pcsx2/pull/2145) by
[lightningterror](https://github.com/lightningterror) - This hack allows
for the "Preload Frame Data" (that is currently present in the OpenGL
renderer) to be used in D3D renderers. It is used to fix various effects
that are currently broken or not rendered properly in D3D renderers.  
  
["Frame Buffer Conversion"](https://github.com/PCSX2/pcsx2/pull/2086)
hack by [lightningterror](https://github.com/lightningterror) - This
hack enables 4-bit and 8-bit textures to be converted on the CPU instead
of the GPU. It will fix glitches in games that use these types of
textures.  
  
["Automatic" Mipmapping](https://github.com/PCSX2/pcsx2/pull/2099)
option by [lightningterror](https://github.com/lightningterror) - This
option enables automatic mipmapping on the hardware render if a game is
pre configured to use mipmapping in the code.  
  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> GUI Changes and
Enhancements </span>  
  
["Always ask when booting"](https://github.com/PCSX2/pcsx2/pull/1934)
option by [ssakash](https://github.com/ssakash) -When enabled, this
option opens the file explorer to directly select the ISO at each boot
instance instead of relying on the Recent ISO list.  
  
["Adaptive Vsync"](https://github.com/PCSX2/pcsx2/pull/2000) support by
[gregory38](https://github.com/gregory38) - Adaptive Vsync support and
GUI optionhave been added to PCSX2 for OpenGL render to further help
with screen tearing.  
  
[Restore "Defaults" button to GS
panel](https://github.com/PCSX2/pcsx2/pull/2003) by
[ssakash](https://github.com/ssakash) -Added Restore Defaults button to
the GS panel of Emulation settings dialog.  
  
["Clear ISO list"](https://github.com/PCSX2/pcsx2/pull/2080) option by
[RedPanda4552](https://github.com/RedPanda4552) -This option will clear
the cached ISOs (Recent ISO list) that were used in the past. Should
help with reducing clutter on large lists.  
  
<span style="color: #018ddd;"> \[Enhancement\] </span> <span
style="font-weight: bold; text-decoration: underline;"> Translation
Updates </span>  
  
We are always seeking new translations for the PCSX2 GUI in your
favorite languages! The table
[here](https://github.com/PCSX2/pcsx2/wiki/PCSX2-Version-Guide-for-Translations)
will show you the most up to date information on the translation
statuses of languages that are currently included with PCSX2. If you see
your language missing or would like to update a translation, feel free
to get started
[here](https://forums.pcsx2.net/Thread-Program-and-Guide-translation-applications)
!  
  
[Danish Translation](https://github.com/PCSX2/pcsx2/pull/1966) by
[rffontenelle](https://github.com/rffontenelle) and
[Jakob5566](https://forums.pcsx2.net/User-Jakob5566) - A brand new
Danish GUI translated has been added! I don't have anything witty to say
in Danish, sorry.
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />  
  
[Italian Translation](https://github.com/PCSX2/pcsx2/pull/2155) by
[Leucos8](https://github.com/Leucos8) - The Italian GUI translation has
been updated for accuracy.  
  
[Spanish Translation](https://github.com/PCSX2/pcsx2/pull/2127) by
[IlDucci](https://github.com/IlDucci) - The Spanish GUI translation has
been updated for accuracy.  
  
[Portuguese (Brazil)
Translation](https://github.com/PCSX2/pcsx2/pull/2209) by
[altiereslima](https://github.com/altiereslima) - The Portuguese
(Brazil) GUI translation has been updated for accuracy.  
  
[German Translation](https://github.com/PCSX2/pcsx2/pull/2209) by
[FiLeonard](https://github.com/FiLeonard) - The German GUI translation
has been updated for accuracy.  
  
[Czech Translation](https://github.com/PCSX2/pcsx2/pull/1989) by
[frantisekz](https://github.com/frantisekz) - The Czech GUI translation
has been updated for accuracy.  
  
[French Translation](https://github.com/PCSX2/pcsx2/pull/2119) by
[atomic83GitHub](https://github.com/atomic83GitHub) - The French GUI
translation has been updated for accuracy.  
  
[Norwegian Translation](https://github.com/PCSX2/pcsx2/pull/1850) by
[DandelionSprout](https://github.com/DandelionSprout) - The Norwegian
GUI translation has been updated for accuracy.  
  
[Swedish Translation](https://github.com/PCSX2/pcsx2/pull/2140) by
[pgert](https://github.com/pgert) - The Swedish GUI translation has been
updated for accuracy.  
  
[Turkish Translation](https://github.com/PCSX2/pcsx2/pull/2029) by
[PyramidHead](https://forums.pcsx2.net/User-PyramidHead) - The Turkish
GUI translation has been updated for accuracy.

Expect some more news about pcsx2.net from Bositman in a couple of days,
even though he said it would be before this progress report
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />

</div>

</div>
