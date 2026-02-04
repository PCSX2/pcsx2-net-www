---
title: "Building PCSX2"
description: "This page helps you build PCSX2 locally on your machine."
draft: false
toc: true
sidebar_position: 1
---

This page helps you build PCSX2 locally on your machine.

## Building on Windows

### Required Dependencies for Qt

If you are developing against the `pcsx2-qt` solution, you will need to do the following:

- Download the binaries [from here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/)
  - tools / symbols are not required
- Extract into the main folder (where the `PCSX2_qt.sln` file is); you should see a new `deps` folder after extraction
- Ensure you have opened the `*-qt` .sln file.

### Required Build Applications

<!-- MS has a handy list with names here https://docs.microsoft.com/en-us/visualstudio/install/workload-component-id-vs-build-tools?view=vs-2019 -->

- [Visual Studio Community](https://www.visualstudio.com/downloads/)
  - Installing just the "Desktop development with C++" workload should be enough, otherwise select individually:
    - C++ ATL for v142 build tools (x86 & x64)
    - MSVC v142 - VS 2019 C++ x64/x86 build tools
    - Windows 10 SDK
- [Git for Windows](https://git-scm.com/download/win)

### Other Requirements

Widescreen and No-Interlacing cheats are sourced from [a separate repository](https://github.com/PCSX2/pcsx2_patches). You might consider putting them in your working directory to ensure your development environment matches shipping builds:

- Download the `.zip` file from here: https://github.com/PCSX2/pcsx2_patches/releases/
- Put it (without extracting) in `bin/resources`.

## Building On Linux

This guide demonstrates how to build PCSX2 in Linux environments. Note that the steps provided below may vary depending on the distribution - such variances are not officially supported by the PCSX2 team.

Note that the procedure defined herein closely mirrors the scripts used by the PCSX2 CI process. These scripts provide more information behind the build process than what is stated here.

- https://github.com/PCSX2/pcsx2/blob/master/.github/workflows/linux_build_qt.yml
- https://github.com/PCSX2/pcsx2/tree/master/.github/workflows/scripts/linux

### Dependencies

Note that dependencies tend to change over time, along with their required versions. In particular, PCSX2 no longer supports the gcc compiler, as it has transitioned to clang/llvm due to the many benefits the latter compiler offers, including superior efficiency and speed.

#### Ubuntu Package List

```sh
build-essential clang cmake curl extra-cmake-modules git libasound2-dev libaio-dev libavcodec-dev libavformat-dev libavutil-dev libcurl4-openssl-dev libdbus-1-dev libdecor-0-dev libegl-dev libevdev-dev libfontconfig-dev libfreetype-dev libgtk-3-dev libgudev-1.0-dev libharfbuzz-dev libinput-dev libopengl-dev libpcap-dev libpipewire-0.3-dev libpulse-dev libssl-dev libswresample-dev libswscale-dev libudev-dev libwayland-dev libx11-dev libx11-xcb-dev libxcb1-dev libxcb-composite0-dev libxcb-cursor-dev libxcb-damage0-dev libxcb-glx0-dev libxcb-icccm4-dev libxcb-image0-dev libxcb-keysyms1-dev libxcb-present-dev libxcb-randr0-dev libxcb-render0-dev libxcb-render-util0-dev libxcb-shape0-dev libxcb-shm0-dev libxcb-sync-dev libxcb-util-dev libxcb-xfixes0-dev libxcb-xinput-dev libxcb-xkb-dev libxext-dev libxkbcommon-x11-dev libxrandr-dev lld llvm ninja-build pkg-config zlib1g-dev
```

#### Fedora Package List

The following package list is sufficient for building PCSX2 as of 2024/04/06 with Fedora 39. You must build the third-party dependencies using the script from the CI, as instructed below.

```sh
alsa-lib-devel brotli-devel clang cmake dbus-devel egl-wayland-devel extra-cmake-modules fontconfig-devel gcc-c++ gtk3-devel libaio-devel libcurl-devel libdecor-devel libevdev-devel libICE-devel libinput-devel libpcap-devel libSM-devel libX11-devel libXau-devel libxcb-devel libXcomposite-devel libXcursor-devel libXext-devel libXfixes-devel libXft-devel libXi-devel libxkbcommon-devel libxkbcommon-x11-devel libXpresent-devel libXrandr-devel libXrender-devel lld llvm make mesa-libEGL-devel mesa-libGL-devel ninja-build openssl-devel patch pcre2-devel perl-Digest-SHA pipewire-devel pulseaudio-libs-devel systemd-devel wayland-devel xcb-util-cursor-devel xcb-util-devel xcb-util-errors-devel xcb-util-image-devel xcb-util-keysyms-devel xcb-util-renderutil-devel xcb-util-wm-devel xcb-util-xrm-devel zlib-devel
```

#### Arch Package List

```sh
sudo pacman -S --needed base-devel clang lld llvm cmake ninja extra-cmake-modules git ffmpeg kddockwidgets libpcap libwebp qt6-base qt6-tools sdl3 shaderc vulkan-headers alsa-lib libpulse libxi libxrandr glib2-devel
```

#### NixOS nix-shell

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

### Build procedure

#### Clone repository

```sh
git clone --recursive https://github.com/PCSX2/pcsx2.git
cd pcsx2
```

#### Build Dependencies

PCSX2 depends on multiple third-party libraries, which should be built for your development environment. We provide a convenience script for building these dependencies, which is also used by our CI runners for release builds.

This will build the dependencies to your PCSX2 Git tree, in the `deps` directory. You can also specify an alternative location, but be sure to adjust `CMAKE_PREFIX_PATH` in the next step.

```sh
.github/workflows/scripts/linux/build-dependencies-qt.sh deps
```

#### Prepare build with CMake

```sh
cmake -B build -DCMAKE_C_COMPILER=clang -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_EXE_LINKER_FLAGS_INIT="-fuse-ld=lld" -DCMAKE_MODULE_LINKER_FLAGS_INIT="-fuse-ld" -DCMAKE_SHARED_LINKER_FLAGS_INIT="-fuse-ld=lld" -DCMAKE_PREFIX_PATH="$PWD/deps" -GNinja
```

Note the following optional CMake flags that are commonly used:

- `-DCMAKE_BUILD_TYPE=Release|Devel|Debug`
  - `Release`: Fastest build, but lacks debug/crash information
  - `Devel`: Adds detailed trace logging abilities, but lacks debug/crash information
  - `Debug`: Slowest build as there are no compiler optimizations, but offers debug/crash information

- `-DCMAKE_CXX_COMPILER_LAUNCHER=ccache`
  - Uses ccache to speed up the build process

- `-DCMAKE_INTERPROCEDURAL_OPTIMIZATION=ON`
  - Turns on link time optimization, which provides a noticeable performance improvement.

#### Execute build

```sh
ninja -C build
```

#### Running PCSX2

PCSX2 can be launched from the build directory:

```sh
build/bin/pcsx2-qt
```

## Building on MacOS

### Building on an Intel Mac

Build the dependencies using the CI's build script: `.github/workflows/scripts/macos/build-dependencies.sh deps` (this will build the dependencies into the directory `deps`). If you want to use a package manager, you can look at the install script to see the required dependencies.

:::caution
You will need to have Xcode installed to use our CI's build script.
:::

You can set the environment variable `BUILD_FFMPEG=0` to tell the dependency build script to build all the dependencies except ffmpeg, allowing you to use your homebrew or macports-installed ffmpeg, which probably has more features enabled than the build script's.

Building on an Intel Mac should work similarly to building on Linux. Run cmake with `cmake /path/to/pcsx2/source -DCMAKE_PREFIX_PATH=/path/to/deps -DCMAKE_BUILD_TYPE=Release`, then `make`. The final `.app` will be in `pcsx2-qt/PCSX2.app` in the build directory. (The `CMAKE_PREFIX_PATH` is only needed if you used the CI's build script to install dependencies.)

Add `-DUSE_LINKED_FFMPEG=ON` for video capture support.

### Building on an ARM (Apple Silicon) Mac

:::warning
PCSX2 does not support building for ARM. You will need to make Intel builds even on Apple Silicon and run them in Rosetta.
:::

You will need Intel versions of all the dependencies. **Dependencies from Homebrew will not work.** The dependency build script will handle this for you (see Intel instructions). If you use MacPorts, install your packages with `+universal`. Note that we don't link to any libraries from `qt6-qttools`, so you can skip the universal on that one (and it links with libclang, so I'd recommend skipping it unless you really want to sit around while MacPorts builds a universal build of clang and llvm).

Add the following extra flags to the cmake invocation listed in the Intel Mac section:

- `-DCMAKE_OSX_ARCHITECTURES=x86_64`. This tells cmake to do an Intel build even though you're on an ARM Mac.

### Building for development

The following extra cmake flags may be useful when building for working on PCSX2:

- `-DSKIP_POSTPROCESS_BUNDLE=ON`. This disables a post-build step that fixes up all the dependencies and shoves them into the app bundle for easy distribution. Saves time on incremental builds.
- `-G Xcode`. Tells cmake to generate an Xcode project instead of makefiles. Allows you to use Xcode to work on PCSX2.

## Building GammaRay

[GammaRay](https://github.com/KDAB/GammaRay) is a debugging tool that lets you inspect the internal state of Qt applications. If you're working on the UI you may find it useful to build it alongside PCSX2 with one of the provided scripts, after building or downloading PCSX2's dependencies. This is entirely optional.

Windows:

```sh
.github\workflows\scripts\windows\build-gammaray.bat
gammaray\bin\gammaray.exe bin\pcsx2-qtx64-avx2.exe
```

Linux:

```sh
.github/workflows/scripts/linux/build-gammaray.sh deps gammaray
./gammaray/bin/gammaray build/bin/pcsx2-qt
```
