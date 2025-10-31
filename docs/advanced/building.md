---
title: "Building PCSX2"
description: "This page helps you build PCSX2 locally on your machine."
draft: false
toc: true
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page helps you build PCSX2 locally on your machine.

## Building the Application

<Tabs queryString="os">
<TabItem value="windows" label="Windows" default>

To build PCSX2 on Windows, you will need the following applications:

<!-- MS has a handy list with names here https://docs.microsoft.com/en-us/visualstudio/install/workload-component-id-vs-build-tools?view=vs-2019 -->

- [Visual Studio Community](https://www.visualstudio.com/downloads/)
- [Git for Windows](https://git-scm.com/download/win)

:::note[Note – Visual Studio]

- Installing just the "Desktop development with C++" workload should be enough.
- Otherwise, select individually:
  - C++ Active Template Library (ATL) for v142 build tools (x86 & x64)
  - MSVC v142 - VS 2019 C++ x64/x86 build tools
  - Windows 10 SDK
    :::

Next, in order to obtain the necessary Qt dependencies:

1. Download the binaries [from here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/).
   - Tools / symbols are not required.
2. Extract into the main folder (where the `PCSX2_qt.sln` file is).
   - You should see a new `deps` folder after extraction.
3. Ensure you have opened the `*-qt` .sln file.

Optionally, widescreen and no-interlacing cheats are sourced from [a separate repository](https://github.com/PCSX2/pcsx2_patches). You might consider putting them in your working directory to ensure your development environment matches shipping builds:

1. Download both `.zip` files from [the releases page.](https://github.com/PCSX2/pcsx2_patches/releases/)
2. Place them (without extracting) in `bin/resources`.

</TabItem>
<TabItem value="macos" label="macOS">

:::note[Note – Xcode]
You will need to have Xcode installed to use our CI's build script.
:::

<Tabs queryString="cpu">
<TabItem value="silicon" label="Apple Silicon" default>

:::note[Note – Building on ARM]

- PCSX2 does not support building for ARM.
- On Apple Silicon, you will still need to make Intel builds and run them in Rosetta.
- Dependencies from Homebrew will not work.
  :::

You will need Intel versions of all the dependencies. The dependency build script will handle this for you (see Intel instructions). If you use MacPorts, install your packages with `+universal`. We do not link to any libraries from `qt6-qttools`, so you can skip the universal on that one (and it links with libclang, so we recommend skipping it unless you really want to sit around while MacPorts builds a universal build of Clang and LLVM).

Add the following extra flags to the CMake invocation listed in the Intel Mac section:

- `-DCMAKE_OSX_ARCHITECTURES=x86_64`
  - Tells CMake to do an Intel build.

</TabItem>
<TabItem value="intel" label="Intel Mac">

Build the dependencies using the CI's build script: `.github/workflows/scripts/macos/build-dependencies.sh deps` (this will build the dependencies into the directory `deps`). If you want to use a package manager, you can look at the install script to see the required dependencies.

You can set the environment variable `BUILD_FFMPEG=0` to tell the dependency build script to build all the dependencies except ffmpeg, allowing you to use your homebrew or macports-installed ffmpeg, which probably has more features enabled than the build script's.

Building on an Intel Mac should work similarly to building on Linux. Run CMake with `cmake /path/to/pcsx2/source -DCMAKE_PREFIX_PATH=/path/to/deps -DCMAKE_BUILD_TYPE=Release`, then `make`. The final `.app` will be in `pcsx2-qt/PCSX2.app` in the build directory. (The `CMAKE_PREFIX_PATH` is only needed if you used the CI's build script to install dependencies.)

Add `-DUSE_LINKED_FFMPEG=ON` for video capture support.

</TabItem>
</Tabs>

<details>
 <summary>Expand to see optional flags which may be useful for PCSX2 development</summary>

- `-DSKIP_POSTPROCESS_BUNDLE=ON`
  - Disables a post-build step that fixes up all the dependencies and shoves them into the app bundle for easy distribution.
  - Saves time on incremental builds.
- `-G Xcode`
  - Tells CMake to generate an Xcode project instead of makefiles.
  - Allows you to use Xcode to work on PCSX2.

</details>

</TabItem>
<TabItem value="linux" label="Linux">

:::info[Info – Build process]
The procedure outlined here closely mirrors the scripts used by the PCSX2 CI process. The following scripts provide more information behind the build process than what is stated here:

- [`linux_build_qt.yml`](https://github.com/PCSX2/pcsx2/blob/master/.github/workflows/linux_build_qt.yml)
- [Linux workflow script](https://github.com/PCSX2/pcsx2/tree/master/.github/workflows/scripts/linux)
  :::

Dependencies and their required versions change over time. In particular, PCSX2 no longer supports the GCC compiler in favor of Clang/LLVM.

<Tabs queryString="distro">
<TabItem value="debian" label="Debian" default>

The following package list is sufficient for building PCSX2 on Debian and its derivative distributions such as Ubuntu, Linux Mint, and Pop!\_OS:

```sh
build-essential clang cmake curl extra-cmake-modules git libasound2-dev libaio-dev libavcodec-dev libavformat-dev libavutil-dev libcurl4-openssl-dev libdbus-1-dev libdecor-0-dev libegl-dev libevdev-dev libfontconfig-dev libfreetype-dev libgtk-3-dev libgudev-1.0-dev libharfbuzz-dev libinput-dev libopengl-dev libpcap-dev libpipewire-0.3-dev libpulse-dev libssl-dev libswresample-dev libswscale-dev libudev-dev libwayland-dev libx11-dev libx11-xcb-dev libxcb1-dev libxcb-composite0-dev libxcb-cursor-dev libxcb-damage0-dev libxcb-glx0-dev libxcb-icccm4-dev libxcb-image0-dev libxcb-keysyms1-dev libxcb-present-dev libxcb-randr0-dev libxcb-render0-dev libxcb-render-util0-dev libxcb-shape0-dev libxcb-shm0-dev libxcb-sync-dev libxcb-util-dev libxcb-xfixes0-dev libxcb-xinput-dev libxcb-xkb-dev libxext-dev libxkbcommon-x11-dev libxrandr-dev lld llvm ninja-build pkg-config zlib1g-dev
```

</TabItem>
<TabItem value="fedora" label="Fedora">

On Fedora, you must build third-party dependencies using the script from the CI as instructed below. The following package list is sufficient for building PCSX2 as of 6 April 2024 with Fedora 39:

```sh
alsa-lib-devel brotli-devel clang cmake dbus-devel egl-wayland-devel extra-cmake-modules fontconfig-devel gcc-c++ gtk3-devel libaio-devel libcurl-devel libdecor-devel libevdev-devel libICE-devel libinput-devel libpcap-devel libSM-devel libX11-devel libXau-devel libxcb-devel libXcomposite-devel libXcursor-devel libXext-devel libXfixes-devel libXft-devel libXi-devel libxkbcommon-devel libxkbcommon-x11-devel libXpresent-devel libXrandr-devel libXrender-devel lld llvm make mesa-libEGL-devel mesa-libGL-devel ninja-build openssl-devel patch pcre2-devel perl-Digest-SHA pipewire-devel pulseaudio-libs-devel systemd-devel wayland-devel xcb-util-cursor-devel xcb-util-devel xcb-util-errors-devel xcb-util-image-devel xcb-util-keysyms-devel xcb-util-renderutil-devel xcb-util-wm-devel xcb-util-xrm-devel zlib-devel
```

</TabItem>
<TabItem value="arch" label="Arch">

On Arch, we recommend using the PKGBUILD file of the unofficial [`pcsx2-git` AUR package](https://aur.archlinux.org/cgit/aur.git/tree/PKGBUILD?h=pcsx2-git) maintained by WeirdBeard et al. as a reference. The packages listed under `depends` and `makedepends` are all required to build PCSX2, and the `optdepends` are optionally used for RetroAchievements, Wayland support, etc.

:::tip[Tip – Building dependencies]
On Arch, it is unlikely you will need to use the `build-dependencies-qt.sh` script discussed below, as by nature of being a rolling release distribution, your packages should always be up-to-date.
:::

</TabItem>
<TabItem value="nixos" label="NixOS">

```nix
{ pkgs ? import <nixpkgs> { } }:
pkgs.mkShell {
  buildInputs = with pkgs;
    with qt6;
    with xorg; [
      curl
      extra-cmake-modules
      ffmpeg
      libaio
      libbacktrace
      libpcap
      libwebp
      libXrandr
      lz4
      qtbase
      qtsvg
      qttools
      qtwayland
      SDL2
      shaderc
      soundtouch
      vulkan-headers
      wayland
      zstd
      clang
      lld
    ];

  nativeBuildInputs = with pkgs;
    with qt6; [
      cmake
      pkg-config
      strip-nondeterminism
      wrapQtAppsHook
      zip
    ];

  qtWrapperArgs = let
    libs = with pkgs;
      lib.makeLibraryPath
      ([ vulkan-loader shaderc ] ++ cubeb.passthru.backendLibs);
  in [ "--prefix LD_LIBRARY_PATH : ${libs}" ];

  shellHook = ''
    if [ ! -d "$(pwd)/pcsx2" ]; then
      echo "pcsx2 not cloned, cloning..."
      git clone git@github.com:PCSX2/pcsx2.git
    fi
    if [ ! -d "$(pwd)/pcsx2/build" ]; then
      echo "pcsx2 not configured, configuring..."
      cd pcsx2
      cmake -B build -DDISABLE_ADVANCE_SIMD=true -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_EXE_LINKER_FLAGS_INIT="-fuse-ld=lld" -DCMAKE_MODULE_LINKER_FLAGS_INIT="-fuse-ld" -DCMAKE_SHARED_LINKER_FLAGS_INIT="-fuse-ld=lld" -DCMAKE_PREFIX_PATH="$PWD/deps" -GNinja
      cd ..
    fi


    bashdir=$(mktemp -d)
    makeWrapper "$(type -p bash)" "$bashdir/bash" "''${qtWrapperArgs[@]}"
    export NIX_ENFORCE_PURITY=0
    exec "$bashdir/bash"
  '';
}
```

</TabItem>
</Tabs>

First, clone and then enter the repository:

```sh
git clone --recursive https://github.com/PCSX2/pcsx2.git
cd pcsx2
```

PCSX2 depends on multiple third-party libraries, which should be built for your development environment. We provide a convenience script, `build-dependencies-qt.sh`, for building these dependencies, which is also used by our CI runners for release builds.

This script will build the dependencies in the `deps` directory of your PCSX2 Git tree. You can also specify an alternative location, but be sure to adjust `CMAKE_PREFIX_PATH` in the next step.

```sh
.github/workflows/scripts/linux/build-dependencies-qt.sh deps
```

Prepare the build with CMake:

```sh
cmake -B build -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_EXE_LINKER_FLAGS_INIT="-fuse-ld=lld" -DCMAKE_MODULE_LINKER_FLAGS_INIT="-fuse-ld" -DCMAKE_SHARED_LINKER_FLAGS_INIT="-fuse-ld=lld" -DCMAKE_PREFIX_PATH="$PWD/deps" -GNinja
```

<details>
 <summary>Expand to see optional, commonly used CMake flags</summary>

- `-DCMAKE_BUILD_TYPE=Release|Devel|Debug`

  - `Release` – Fastest build but lacks debug/crash information.
  - `Devel` – Adds detailed trace logging abilities but lacks debug/crash information.
  - `Debug` – Slowest build (no compiler optimizations) but has debug/crash information.

- `-DCMAKE_CXX_COMPILER_LAUNCHER=ccache`

  - Uses ccache to speed up the build process.

- `-DCMAKE_INTERPROCEDURAL_OPTIMIZATION=ON`
  - Turns on [link-time optimization](https://en.wikipedia.org/wiki/Interprocedural_optimization#WPO_and_LTO).
  - Provides a noticeable performance improvement.

</details>

Next, execute the build process:

```sh
ninja -C build
```

Finally, PCSX2 can be launched from the build directory:

```sh
build/bin/pcsx2-qt
```

</TabItem>
</Tabs>

## Building GammaRay

[GammaRay](https://github.com/KDAB/GammaRay) is a free and open-source debugging tool that lets you inspect the internal state of Qt applications. After building or downloading PCSX2's dependencies, you may find it useful to build GammRay alongside PCSX2 with one of the provided scripts if you're working on the UI. This is entirely optional.

<Tabs queryString="os">
<TabItem value="windows" label="Windows" default>
```sh
.github\workflows\scripts\windows\build-gammaray.bat
gammaray\bin\gammaray.exe bin\pcsx2-qtx64-avx2.exe
```

</TabItem>
<TabItem value="linux" label="Linux">
```sh
.github/workflows/scripts/linux/build-gammaray.sh deps gammaray
./gammaray/bin/gammaray build/bin/pcsx2-qt
```
</TabItem>
</Tabs>
