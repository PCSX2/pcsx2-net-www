# Utilizing pressure sensitive buttons of the DualShock 3 in PCSX2

Some games like [Mad Maestro!](https://en.wikipedia.org/wiki/Mad_Maestro!) or the [Metal Gear Solid 3](https://en.wikipedia.org/wiki/Metal_Gear_Solid_3:_Snake_Eater) titles utilize the PlayStation 2's pressure sensitive buttons missing on many 3rd party gamepads. To play them with your DualShock 3 appropriately the ScpToolkit includes a modified [LilyPad](https://wiki.pcsx2.net/index.php/LilyPad) plugin and a custom XInput proxy DLL, allowing the analog values of the button states to be reflected within the emulator.

## Installation

Assuming you already got [ScpToolkit v1.3](https://github.com/nefarius/ScpToolkit/releases/tag/v1.3.5689.40377) in place, the installation of the modification is pretty straight forward.
Otherwise download and unpack it somewhere apart, then run ScpDriver installer and follow instructions.

### Manual steps

1. Browse to your ScpToolkit installation folder, then to the sub-folder `Win32`
1. Copy `XInput1_3.dll` to the root of your PCSX2 installation folder (e.g. `C:\Program Files (x86)\PCSX2 1.6.0`)

## Configuration

Launch PCSX2. You should be greeted by the initial configuration wizard:

![](https://nefarius.at/wp-content/uploads/2013/12/20-10-_2015_00-05-40.png)

Make sure the `LilyPad SCP` plugin is selected under PAD and hit `Configure...`:

![](https://nefarius.at/wp-content/uploads/2013/12/20-10-_2015_00-05-56.png)

Under `Game Device APIs` untick `XInput` and tick `DualShock 3`, then only the Keyboard and the DualShock 3 should be visible in the device list:

![](https://nefarius.at/wp-content/uploads/2013/12/20-10-_2015_00-06-36.png)

You can now start mapping the buttons on your DualShock 3 to the desired Pad:

![](https://nefarius.at/wp-content/uploads/2013/12/20-10-_2015_00-09-37.png)

¡ this guide may also apply to some DS2 adapter. Untested ¡

### Notes

* Any Linux support is blocked by [this](https://bugzilla.kernel.org/show_bug.cgi?id=195643)
* Credits to [@nefarius](https://github.com/nefarius) whose guide I shamelessly adopted
