::: {.single-article}
::: {.item-page .clearfix}
## [Linux news](/266-linux-news.html) {#linux-news .contentheading}

::: {style="text-align:center;"}
:::

Hello guys, here are some news on the Linux front. Yes I know, I ought
to do that more regularly
😛

In short progress is slow but steady
😊

* A port to wxWidget 3.0 was done recently, mostly because Debian will
drop wxWidget 2.8 . It is enabled by default but wx2.8 is still there,
you can restore is with the -DWX28_API=TRUE build option.

-   Most of regressions were fixed so it will work as bad as before
    😉 No I'm kidding, it actually works better on
    my PC. Feel free to test it.
-   Unfortunately Windows is still blocked to wx2.8, [ contributions are
    welcome (first step is to add a wx3.0 library build)
    ]{style="color: #1e90ff;"}
-   Some wxWidget libraries depend on GTK3. PCSX2 code was updated to
    support GTK3 but wxWidget is not as stable as expected.
    Nevertheless, you can enable GTK3 with the -DGTK3_API=TRUE build
    option (debug build only).


* Better support of cross-building (thanks to Micove). Cmake used to
select wrong libraries between lib32/lib64/lib/...

-   You need to use this new option on 64 bits machines
    -DCMAKE_TOOLCHAIN_FILE=cmake/linux-compiler-i386-multilib.cmake
-   Note: build.sh will do it by default, so just build.sh


* Support of AVX

-   code is now compiled with -march=native to support all optimizations
    of your CPU. It can be disabled with the -DISABLE_ADVANCE_SIMD=TRUE
    build option (for example distribution or inside VM)
-   Note: GSdx (Linux) needs a couple of updates to support SSE4x. [
    Again contributions are welcome ]{style="color: #1e90ff;"} , check
    this issue <https://github.com/PCSX2/pcsx2/issues/438>


* New (nearly) playable game: Bouken Jidai Katsugeki Goemon

-   Full support of MMU with the interpreter, and a dedicated game-fix
    for the recompiler
-   No more TLB misses! (full story will be posted in
    [http://pcsx2.net/developer-blog.html](/developer-blog.html) in
    coming weeks).
-   Crashes are reported on GSdx windows not sure on Linux.


* Finally, Ubuntu PPA is up to date with the latest feature. However,
Ubuntu 12.04 support is discontinued!

------------------------------------------------------------------------


Ongoing work (aka the plan for the next months):

* port lilypad to Linux

-   It will bring Force Feedback, MultiTap and it might work better in
    several games.
-   I'm close to have keyboard support [ but help would be appreciated
    to build a full GUI. Please contact us if you are interested.
    ]{style="color: #1e90ff;"}

* port GSdx to openGL 4.5

-   A long time ago, I planned to update the code to support
    GL_ARB_direct_state_access. It was postponed because no official
    driver supported it.

------------------------------------------------------------------------


Last but not least, thanks to all contributors. Even the smallest
patches are a big help.

-   [linux](/component/tags/tag/linux.html){.label .label-info}
:::
:::
