<div class="single-article">

<div class="item-page clearfix">

<div style="text-align:center;">

</div>

One problem that has plagued PCSX2 since as long as most anyone can
remember is it's general inflexibility and instability when flipping
between windowed and fullscreen modes. This was something we really
sought to address as we re-write the user interface in 0.9.7.  
  
In 0.9.6 the situation was grim: The flip never really worked right in
DX9 -- there's an "escape hack" that completely shuts down the emulator
just to flip out of fullscreen mode. Hitting alt-enter is usually less
forgiving (the plugin handles it, and doesn't allow PCSX2 to completely
shut everything down and restart). In DX10 things were better: alt-enter
typically works a couple times, but do it too often, or get an unlucky
flip, and it'll still result in lost or corrupted video and possibly a
crash depending on video drivers and (lack of) luck.  
  
In 0.9.7 we've completely re-done our approach to fullscreen. Instead of
using what Microsoft DirectX calls **Exclusive Mode** (you can read
about the programmer-centric details of it
[here](http://msdn.microsoft.com/en-us/library/ee417025.aspx) ), we're
taking a more modern approach and using a special type of maximized
desktop window instead. Like anything there's some advantages and
disadvantages to this new approach:  
  
<span style="font-size: 12pt;"> **Advantages of the new fullscreen
method:** </span>

-   Works perfectly in DX9 and DX10 alike.
-   No more risk of visual corruption or crashes, and no need to
    shutdown the emulator to avoid them.
-   Much faster and seamless flips.
-   Works with any GS plugin, regardless of how the GS plugin is
    implemented.
-   Always uses your LCD display's optimal resolution (assuming you have
    it set in the desktop as such, and you should).
-   Integrates better with your desktop -- Alt-Tab, TaskBar, popup
    errors, etc. are much less prone to being... annoying. (pulling up a
    strategy guide in a browser window, for example!)
-   Super-easy to implement, from a programming perspective!

  
<span style="font-size: 12pt;"> **Disadvantages:** </span>

-   A slight bit of extra window management overhead.
-   Always uses your desktop resolution on CRT displays (this is an
    advantage for anyone with an LCD display, but can be a disadvantage
    for people with CRT displays, depending on your setup .. however few
    of you are left)

  
The performance benefit of exclusive fullscreen is mostly related to
Aero under Vista/Windows7. in which case the performance is sometimes
*better* in a window over exclusive mode (this depending on video
card/drivers/etc).  
  
The thing that really sold us on it though is the fact that overhead of
the non-exclusive fullscreen mode is minimal on modern GPUs. The only
real advantage of using exclusive fullscreen is that it bypasses Aero
and increases the "multimedia priority" of the app. If you already have
Aero disabled, then neither of those apply anyway. And looking toward
the future: the next generation of GPUs will reduce that overhead of
Aero even further to the point where even that will likely not make a
significant impact on performance. So the idea of a seamlessly working
fullscreen flip for all DirectX incarnations on all incarnations of
Windows over a rather iffy, unstable, and fragile fullscreen flip that
*might* be 2-3% faster on legacy hardware ended up being a no-brainer.  
  
We're still leaving the door open for adding optional support for
exclusive mode fullscreen, since there could still be some use to it for
special scenarios like CRT displays and TV projection; though there's no
timetable for the implementation of the option -- and it would depend on
the GS plugin to support it properly otherwise it'll still be the
corruption/crash bomb that it's always been up to now.  
  

<div
style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;">

[Post a Comment!](http://forums.pcsx2.net/thread-12669.html)

</div>

</div>

</div>
