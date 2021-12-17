# Contributing

* Be patient!
  * Your contribution will gladly be reviewed, but free time is an expensive resource.
* Discuss your future contribution with us before coding it!
  * Let's avoid duplicate work! Besides, the specification could be clarified this way.

## QA / Portability

* Port core thread to std::thread (current code is based on pthread, so low priority) 
* C11 aligned_alloc (mostly done, but doesn't work with asan and GCC4.9)
* C++11 alignof/alignas syntax
* Replace volatile/lock-free queue with real C++ atomic (mostly done, remains a couple of volatile in core)
* [C++11 auto port](https://clang.llvm.org/extra/clang-modernize.html).
* [Clean header include](https://github.com/include-what-you-use/include-what-you-use). Investigate.
* Address sanitizer (GCC or Clang) and other sanitizers.
* Valgrind (not sure it can run PCSX2, maybe limit the scope to plugins)
* Reformat the core/plugin to a constant style with clang-format (on-going by greg)

## GUI

* Check Linux chapter. Various improvements are actually cross-platform! ;)

## Linux

You're welcome to the [Linux contribution thread](https://forums.pcsx2.net/Thread-Areas-of-interest-for-new-linux-developers) to have full details. Here is a handy list of features need implementation. Feel free to propose new ones.

### House keeping and general compilation

* Clean up warnings
  1. Same as GCC flags but without the need of complete test.
* Clean up GCC flags
  1. Put default global flags in cmake/BuildParameters.cmake
* Speed comparison Clang/GCC
* Add missing/update copyright headers
* LTO support
* PGO support
* clang-tidy (./build.sh --clang-tidy)

### Core

* Support XZ compressed ISOs

### GSdx

* Implement DirectX features on OpenGL (and vice versa, if applicable)(video recording, port OSD from OGL, etc.) 
* Gameplay recording (so far, framebuffer is dumped every frame)

### zzogl (plugin is kinds of dropped)

* Reduce OpenGL requirement to 3.3 with OpenGL 4 extension
* Use multibind
* Fix EGL
* Port GLSL to window
* Drop old GLSL backend (and much later Nvidia CG)

### Debian package

* Needs a refresh to the latest standard
* Clean Debian/copyright => debmake -k

## Very long term features

Those features will require a lot of work, and an organized long-term effort.
* PS2 ROM re-implementation (wrongly named HLE BIOS)
* 64-bit port (32-bit yields better performance for the moment)
* Android X86 port
* Linux ARM port
* MacOS support
