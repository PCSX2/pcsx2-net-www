NOTE: Only 32-bit architectures are supported, or distributions that allow the installation of 32-bit packages under a 64-bit architecture.

## Index

1. [Introduction](#introduction)
2. [CMake Build System](#cmake-build-system)
3. [Debugging](#debugging)
4. [Fedora](#fedora)
5. [OpenSUSE Tumbleweed](#opensuse-tumbleweed)
6. [Ubuntu PPA](#ubuntu-ppa)
7. [Arch Linux](#arch-linux)
8. [Ubuntu 20.04 - 64bit](#how-to-compile-pcsx2-in-2021-ubuntu-2004-64bit)
9. [Fedora](#how-to-compile-pcsx2-in-2021-fedora)
10. [Gentoo](#how-to-compile-pcsx2-in-2020-gentoo--derivatives)

## Introduction

This is intended to give you an idea of how to compile PCSX2 from Git in Linux. Some of the steps may be different on some versions of Linux, and this is not generally supported by the PCSX2 team. If you have issues following this guide, I'd recommend going through this thread for help: https://forums.pcsx2.net/Thread-Linux-Compile-Guide-and-Support

## CMake Build System

### Debian/Ubuntu build dependencies

#### Enable 32-bit libraries

`sudo dpkg --add-architecture i386`

#### Build system

`sudo apt install cmake gcc-multilib g++-multilib`
 
#### 32-bit libraries

`sudo apt install libaio-dev:i386 libbz2-dev:i386 libcggl:i386 libegl1-mesa-dev:i386 libglew-dev:i386 libgles2-mesa-dev:i386 libgtk2.0-dev:i386 libjpeg-dev:i386 libsdl1.2-dev:i386 libwxgtk3.0-gtk3-dev:i386 nvidia-cg-toolkit zlib1g-dev:i386 libsdl2-dev:i386 libjack-jackd2-dev:i386 libportaudiocpp0:i386 portaudio19-dev:i386 liblzma-dev:i386 libsoundtouch-dev:i386 libxml2-dev:i386 libpcap0.8-dev:i386`

### Arch Linux build dependencies

#### Build system

`gcc-multilib`, `cmake` 

#### 32-bit libraries

Add or uncomment the following lines in `/etc/pacman.conf`:
```
[Multilib]
Include = /etc/pacman.d/mirrorlist
```
Refresh package list:
```
pacman -Syu
```

`lib32-libaio` `lib32-libpng` `lib32-portaudio` `lib32-sdl2` `lib32-soundtouch` `lib32-wxgtk3` `lib32-libx11` `lib32-xz` `lib32-libsamplerate` 

### Using CMake

#### Basic mode: straightforward compilation

Run the `build.sh` script.
You can view the available options with `build.sh -help`

#### Expert mode: CMake build parameters

Basic parameters:
- Use Release/Development/Debug : `-DCMAKE_BUILD_TYPE=Release|Devel|Debug`
  - `Release`: Best in speed, but provides little or no debug/crash info.
  - `Devel`: Adds detailed trace logging abilities, but still lacks debug/crash info.
  - `Debug`: No compiler optimizations. Very good for debug/crash info but also very slow.
- Follow XDG standard : `-DXDG_STD=TRUE`
- Build all plugins (not much use): `-DEXTRA_PLUGINS=TRUE`

Expert parameters (not supported, the best is to use the default options):
- Tune C flags : `-DUSER_CMAKE_C_FLAGS:STRING="cflags"`
- Tune C++ flags : `-DUSER_CMAKE_CXX_FLAGS:STRING="cxxflags"`
- Tune linker flags : `-DUSER_CMAKE_LD_FLAGS:STRING="ldflags"`

Expert debugging parameters (typical developer-only option):
- Build GS replayer: `-DBUILD_REPLAY_LOADERS=TRUE`
- Use Address Sanitizer: `-DUSE_ASAN=TRUE`

Experimental parameters (not supported, the best is to use the default options):
- zzogl: Use GLSL for shading instead of Nvidia CG : `-DGLSL_API=TRUE`
- zzogl: Use EGL instead of GLX : `-DEGL_API=TRUE`
- GSdx: Use OpenGL ES3.1 instead of pure openGL : `-DGLES_API=TRUE` 
- Use SDL1.2 (use if wxWidgets is linked against SDL1) : `-DSDL2_API=FALSE`
- Use GTK3 (wxWidgets must be built with GTK3 support) : `-DGTK3_API=TRUE`
- Use Clang (works) : `-DUSE_CLANG=TRUE`
- 64-bit support (nothing work): `-D64BIT_BUILD_DONT_WORK=TRUE`

Expert options for package creation:
- Enable package mode : follow the FHS for distribution `-DPACKAGE_MODE=TRUE`
- Plugin install path in package mode : `-DPLUGIN_DIR="/usr/lib/pcsx2"`
- GameDB install path in package mode : `-DGAMEINDEX_DIR="/usr/share/games/pcsx2"`
- Documentation install path in package mode : `-DDOC_DIR="/usr/share/doc/pcsx2"`
- GLSL shader install directory : `-DGLSL_SHADER_DIR="/usr/share/games/pcsx2"`
- Update po (translation file) : `-DCMAKE_BUILD_PO=TRUE`
- Rebuild shader : `-DREBUILD_SHADER=TRUE`
- Disable AVX: `-DDISABLE_ADVANCE_SIMD=TRUE`
- Enable/disable the stipping : `-DCMAKE_BUILD_STRIP=TRUE|FALSE`
  - `TRUE`: Remove debugging information.
  - `FALSE`: Keep symbols. Better for debug. (recommended since it should not have any impact on speed) 

### Running CMake to generate the makefile:

It is advised to use a build method that places build files outside the PCSX2 sources directory, as it makes it easier to delete all CMake build files:
```
mkdir build && cd build
cmake .. <other options>
```

#### Do the compilation:

```
make 
```

#### Install files:

```
make install 
```

### Reporting CMake bugs

Not all distributions and configurations were tested. In case you encounter a CMake bug that is really a CMake issue, you can report it. Please provide the following information:

1. Linux distribution, the current kernel version, and architecture (32-bit or 64-bit)
2. The CMake commands. For example: `cmake CMakeLists.txt`
3. **All** of CMake's output. Something like this is good:

```
-- The C compiler identification is GNU
-- The CXX compiler identification is GNU
-- Check for working C compiler: /usr/bin/gcc
-- Check for working C compiler: /usr/bin/gcc -- works
-- Detecting C compiler ABI info
-- Detecting C compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++
-- Check for working CXX compiler: /usr/bin/c++ -- works
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Found GTK2_GTK: /usr/lib/libgtk-x11-2.0.so
-- Looking for XOpenDisplay in /usr/lib/libX11.so;/usr/lib/libXext.so
-- Looking for XOpenDisplay in /usr/lib/libX11.so;/usr/lib/libXext.so - found
-- Looking for gethostbyname
-- Looking for gethostbyname - found
-- Looking for connect
-- Looking for connect - found
-- Looking for remove
-- Looking for remove - found
-- Looking for shmat
-- Looking for shmat - found
-- Looking for IceConnectionNumber in ICE
-- Looking for IceConnectionNumber in ICE - found
-- Found X11: /usr/lib/libX11.so
-- Found ALSA: /usr/lib/libasound.so
-- Found BZip2: /usr/lib/libbz2.so
-- Looking for BZ2_bzCompressInit in /usr/lib/libbz2.so
-- Looking for BZ2_bzCompressInit in /usr/lib/libbz2.so - found
-- Looking for include files CMAKE_HAVE_PTHREAD_H
-- Looking for include files CMAKE_HAVE_PTHREAD_H - found
-- Looking for pthread_create in pthreads
-- Looking for pthread_create in pthreads - not found
-- Looking for pthread_create in pthread
-- Looking for pthread_create in pthread - found
-- Found Threads: TRUE
-- Found wxWidgets: TRUE
-- Found ZLIB: /usr/lib/libz.so
-- Found Cg: /usr/lib/libCg.so;/usr/lib/libCgGL.so
-- Found PortAudio: /usr/lib/libportaudio.so
-- Found SoundTouch: /usr/lib/libSoundTouch.so
-- Configuring done
-- Generating done
-- Build files have been written to: /mnt/playstation/emulateur/package/pcsx2.snapshot-4810
```

## Debugging

It can be helpful to run PCSX2 under [GDB](https://www.gnu.org/software/gdb/) in order to set breakpoints and debug crashes.

To enable debugging with symbol names:
- Run `build.sh` with the `--debug` option (not `--devel` or `--release`).
- Ensure the `--strip` option is not enabled.
- Consider enabling other `build.sh` flags as described above if they are useful for your debugging.

The built executable can then be debugged using `gdb ./bin/PCSX2`. Make sure you configure your plugin paths correctly within the PCSX2 GUI if you're making changes to plugins!

### Segmentation Faults

Segmentation faults (`SIGSEGV`) are [expected](https://github.com/PCSX2/pcsx2/issues/1806#issuecomment-278268282) when running recompiled code such as a game in PCSX2. When a segmentation fault occurs, use `bt`  and check if the backtrace contains `recExecute`. If it does then continue execution using `c`.

Additionally, segfault printing can be disabled entirely in GDB using the command `handle SIGSEGV noprint`.

## Fedora

Just Add Rpmfusion non-free repo:
https://rpmfusion.org/Configuration

Then install PCSX2 by terminal command:
```
sudo dnf install pcsx2
```

## OpenSUSE Tumbleweed

Just add the `Emulators` repo and install pcsx2
```
sudo su - # (become root)
zypper ar http://download.opensuse.org/repositories/Emulators/openSUSE_Tumbleweed/Emulators.repo
zypper ref
zypper in pcsx2
```

## Ubuntu PPA

With multiarch functionality, you can install a 32-bit PPA on a 64-bit Ubuntu. You need at least Ubuntu 12.04 (Precise) to do this.

#### Add the x86 architecture to your package manager (x64 installs of 12.04 or newer only)

In a terminal, type:
````
sudo dpkg --add-architecture i386
````

#### Add the multiverse package repository

Uncomment lines looking like this, where trusty is replaced by your Ubuntu version
````
deb http://us.archive.ubuntu.com/ubuntu/ trusty multiverse
deb-src http://us.archive.ubuntu.com/ubuntu/ trusty multiverse
deb http://us.archive.ubuntu.com/ubuntu/ trusty-updates multiverse
deb-src http://us.archive.ubuntu.com/ubuntu/ trusty-updates multiverse
````

#### Add the PCSX2 PPA to your software sources

In a terminal, type:  
```
sudo add-apt-repository ppa:gregory-hainaut/pcsx2.official.ppa
sudo apt-get update
```

##### Daily Builds

We also have a PPA with the daily builds of `pcsx2-unstable` if
you prefer the bleeding edge.
```
sudo add-apt-repository ppa:pcsx2-team/pcsx2-daily
sudo apt-get update
```

#### Install the package on your system

To install the latest stable release:
```
sudo apt-get install pcsx2
```
To install a newer, development version:
```
sudo apt-get install pcsx2-unstable
```

## Arch Linux

NOTE: for 64-bit architectures, [multilib](https://wiki.archlinux.org/index.php/multilib) must be enabled in order to install PCSX2. 

### PCSX2 Stable

Open a terminal, and type:
```
sudo pacman -S pcsx2
```

### PCSX2 Unstable

Add or uncomment the following lines in `/etc/pacman.conf`:
```
[multilib]
Include = /etc/pacman.d/mirrorlist
```
Refresh the package list and update:
```
pacman -Syu
```

Clone the AUR package, then cd to the correct folder, make and install the package:
```
git clone https://aur.archlinux.org/pcsx2-git.git
cd pcsx2-git
makepkg -csi
```
This will build the package, automatically installing all dependencies. It will then prompt for your password to install the package with pacman. 


## How to compile PCSX2 in 2021 (Ubuntu 20.04) (64bit)

<!---   I've wasted more time than I'd like to admit searching for this   -->
```
sudo apt remove gcc-9 g++-9

sudo apt install cmake g++-10-multilib libaio-dev libasound2-dev libcairo2-dev libegl-dev \
        libegl1-mesa-dev libgdk-pixbuf2.0-dev libgirepository-1.0-1 libgl-dev libgl1-mesa-dev \
        libgl1-mesa-dri libgles-dev libgles-dev libgles2-mesa-dev libglib2.0-dev libglu1-mesa-dev \
        libglu1-mesa libglvnd-dev libglx-dev libglx-mesa0 libglx0 libgtk-3-dev libgtk2.0-dev \
        libharfbuzz-dev libllvm10 liblzma-dev libpango1.0-dev libpcap0.8-dev libpulse-dev \
        libsdl2-dev libsamplerate0-dev libsoundtouch-dev libwxgtk3.0-gtk3-0v5 libwxgtk3.0-gtk3-dev \
        libx11-xcb-dev libxext-dev libxft-dev libxml2-dev portaudio19-dev zlib1g-dev

sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-10 10
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-10 10
sudo update-alternatives --install /usr/bin/cc  cc  /usr/bin/gcc 30
sudo update-alternatives --install /usr/bin/c++ c++ /usr/bin/g++ 30

git clone https://github.com/PCSX2/pcsx2.git
mkdir pcsx2/build && cd pcsx2/build
git submodule init
git submodule update

cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_REPLAY_LOADERS=TRUE -DCMAKE_BUILD_PO=FALSE -DGTK3_API=TRUE -DDISABLE_SETCAP=TRUE ..

make -j$(nproc)
make install
cd ../bin
```

## How to compile PCSX2 in 2021 (Fedora)

See [the latest instructions on the PCSX2 wiki](https://wiki.pcsx2.net/PCSX2_Documentation/Compiling_on_Linux).

## How to compile PCSX2 in 2020 (Gentoo & Derivatives):

```
sudo emerge -av net-libs/libpcap x11-libs/wxGTK media-libs/libsoundtouch dev-libs/libaio \
media-libs/libsdl2 app-arch/lzma net-libs/libpcap dev-libs/libxml2

git clone https://github.com/PCSX2/pcsx2.git
mkdir pcsx2/build && cd pcsx2/build

cmake -DCMAKE_BUILD_TYPE=Release -DBUILD_REPLAY_LOADERS=TRUE -DCMAKE_BUILD_PO=FALSE -DGTK3_API=TRUE \
	-DwxWidgets_CONFIG_EXECUTABLE="/usr/lib64/wx/config/gtk3-unicode-3.0-gtk3" \
	-DPACKAGE_MODE=TRUE -DCMAKE_INSTALL_PREFIX=/usr ..

make -j$(nproc)
make install
cd ../bin
```
