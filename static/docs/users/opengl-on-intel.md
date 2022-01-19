# OpenGL on Intel GPUs

Due to an inefficient driver OpenGL will perform poorly on Intel GPUs on Windows. The driver lacks performance optimizations, and several mandatory extensions are not supported as well as lagging behind in OpenGL version support.

Intel doesn't seem to care much about providing fully working drivers. Even Kaby Lake doesn't support OpenGL 4.5.

There is a PCSX2 discussion thread regarding the mentioned issues [here](https://github.com/PCSX2/pcsx2/issues/1716).

Linux doesn't suffer from the same issues. Sandy Bridge and above have most, if not all of their functions and extensions working.

***

## List of issues:

* **OpenGL support.**
Currently the support on Windows is very lacking. As a result many OpenGL functions and extensions will not work. [List of supported OpenGL versions on Intel GPUs by generation](https://www.intel.com/content/www/us/en/support/graphics-drivers/000005524.html)

* **OpenGL support on PCSX2**:

| Generation        | Software | Hardware |
| ----------------- | -------- | -------- |
| Below Ivy Bridge  | No       | No       |
| Ivy Bridge OpenGL | Yes      | No       |
| Haswell and above | Yes      | Yes      |

***

## QA:

* **Q Why am I not able to run OpenGL?**
    * A1: Check your generation. Anything below Ivy Bridge won't run on Windows. Ivy Bridge only supports Software rendering on OpenGL.
    * A2: Alternatively if you're stuck on an unsupported generation you can use Mesa3D for Windows. You can download the zip package from [here](https://fdossena.com/?p=mesa/index.frag) and place the opengl32.dll in your PCSX2 install directory.

* **Q Why are my graphics corrupted?**
* A: Set Blending Unit Accuracy to "None". Intel GPUs don't support GL_ARB_texture_barrier hence you will not be able to use the feature.

* **Q How is performance?**
* A: Performance should be better on OpenGL compared to Direct3D even with the missing functions and extensions.

***

## Possible workaround on Windows:

There is Mesa llvmpipe for Intel GPUs for Windows that is available [here](https://github.com/pal1000/mesa-dist-win) but expect very slow performance. Multithreaded optimizations are needed.

Sandy Bridge and up are supported.
