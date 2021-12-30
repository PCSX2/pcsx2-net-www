# OpenGL on AMD GPUs

Due to a buggy driver OpenGL will perform poorly on AMD GPUs. The driver lacks performance optimizations and several extensions are currently broken.

The issues have been reported on the AMD support forum for a year now, but any fixes AMD has released so far have either introduced new bugs or reintroduced old bugs.

There is a PCSX2 discussion thread regarding the mentioned issues [here](https://github.com/PCSX2/pcsx2/issues/1552).
***

## List of issues:

* ~~*SSO (Separate Shader Objects Extension) is broken on AMD drivers*.~~ **Confirmed fixed as of driver release 18.11.1**

~~It causes garbled graphics every time the extension is enabled. It was momentarily fixed in 16.7.3, but it was reverted in 17.2.1 to fix the BSOD issue below. A (hopefully temporary) [workaround](https://github.com/PCSX2/pcsx2/commit/26993380b16487649c2ae5f81741e7918ad1604c) to address the issue has been added to PCSX2. Link to issue on AMD support forum is [here](https://community.amd.com/thread/194895).~~

* ~~*Dual Source Blending is broken on AMD drivers.*~~ **Confirmed fixed as of driver release 18.11.1**

~~You can use 17.1.2 atioglxx.dll and `override_GL_ARB_separate_shader_objects=1` gsdx.ini option to restore old behaviour in newer PCSX2 build. But be wary this causes BSODs and crashes in the display driver on Windows when Blending Unit Accuracy is set to *None* (so keep it at least to the default "Basic" level). Link to issue on AMD support forum is [here](https://community.amd.com/thread/205702).~~

* **OpenGL runs 10-70% slower compared to Direct3D.**
This is an optimization issue on AMD's side. There is no workaround for this issue. People will need to wait for a proper working driver. Link to issue on AMD support forum is [here.](https://community.amd.com/thread/206176)
***

## Help:

To avoid the worst of the bugs make sure you do the following:
* Use the most recent AMD drivers.
* Use the latest PCSX2 development build, as it will have the latest fixes/workarounds in place to improve the situation.

Stick to the default GSdx plugin settings. The "Allow 8-Bit Textures" option can improve the framerate, but this depends on the game, and can also cause graphical regressions in a few games.

***

## QA:

* **Q: Can I still run OpenGL with all the present issues?**
    * A: Yes, but expect slower performance caused by the sum of aforementioned bugs and workarounds.

* **Q: My PC/display driver keeps crashing. What can I do?**
    * A: Make sure to keep Blending Unit Accuracy set to at least the default "Basic" level.

* **Q: Why do the graphics look buggy / garbage displays?**
    * A1: Make sure you are using the latest PCSX2 dev builds that have the garbage display workaround, also make sure that you are using Crimson drivers since old Catalyst drivers are not supported.

* **Q: Fine, but all of the above is Windows only. What about Linux?**
    * A: The same roughly applies to closed drivers (both fglrx and AMDGPU-PRO). Open ones are the *best* current setup for an AMD card over OpenGL as of now.
