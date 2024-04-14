---
title: "Controllers"
date: 2024-03-20
summary: "Controller Setup Guide"
draft: false
toc: true
sidebar_position: 2
---

This section will help guide you with controller setup and button mapping.

## General

To access the controller configuration, go to `Settings > Controllers`.

Here you will be able to select which Input Sources to use, as well as enabling mouse pointer source and enabling multitap.

<Image src={require("./img/controller_global.webp").default} />

## Input source

There are 3 available Input Sources to choose from.

### SDL (Recommended)

The preferred Input Source. SDL are cross-platform and should work for most people across all other supported operating systems, only use XInput or DInput if your controller is having problem with SDL.

#### SDL Raw Input

For controllers which are either unresponsive or are sending incorrect inputs, automatic mapping will not work. This is typically caused by third party manufacturers who steal a device ID from another controller, but then scramble the arrangement of the inputs.

This can typically be corrected by enabling SDL Raw Input. After enabling SDL Raw Input, you must manually map your controls - the Automatic Mapping button will not work properly.

If mappings continue to be unresponsive or incorrect, consider disabling SDL Input Source, and use Dinput Input Source instead.

#### DualShock 4 / DualSense Enhanced Mode

_For official DualShock 4 and DualSense controllers only._ This option enables additional features which allow control over LEDs and ensure vibration motors will function properly. We recommend all DualShock 4 or DualSense users to enable this option.

Once enabled, LEDs can be controlled using the lightbulb icon to the right of the SDL section.

:::tip
If you do not have one of these controllers, leave this setting disabled; there is no benefit to turning it on.
:::

### XInput

A newer Input Source for Windows only, which replaces DInput.
But it's not backwards compatible, you need to have an XInput compatible device to use it.
There's not much real need to use XInput, unless you're using DS3's through DsHidMini for pressure sensitivity.
Otherwise, use SDL.

### DInput

An older input source for Windows only, and only supports small subset of older or cheap knock-off controllers.
Only use if you are having issues with SDL or XInput.

## Mapping the buttons

To start mapping your controller, you can first check if your controller is available for automatic mapping by clicking on the "Automatic Mapping" button on the top right. If automatic mapping is not available, you will have to map the buttons to your controller manually.

:::caution
Automatic Mapping is not available for controllers using the DInput source.

If SDL Raw Input is enabled, Automatic Mapping will continue to use the standard mapping, not the raw inputs. Controllers which have issues requiring SDL Raw Input should be mapped manually instead.

Some third party controllers may fail to map using Automatic Mapping, even with SDL Input Source enabled. These controllers must be mapped manually.
:::

<Image src={require("./img/controller_dualshock.webp").default} />

## Testing your input mapping

:::info
PCSX2 currently doesn't have any way to test your inputs directly from the UI.
:::

To test your controller input, grab this [PS2 Pad Tester ELF](https://github.com/PCSX2/tools/releases/download/tests%2Fpad/padtest_ps2.elf) file then drag and drop it into PCSX2's main window.

From here, you can test your mapping by pressing the buttons on your controller and see if the corresponding button on the pad tester responds to your controller input.

<Image src={require("./img/padtest.webp").default} />

## Setting up pressure sensitivity

:::caution
Only the original DualShock 3 OEM controllers are compatible with pressure sensitivity.
:::

:::info
“DsHidMini is a self-contained, low footprint and feature-rich user-mode driver for Microsoft Windows 10. It presents the controller as a configurable variety of fully standard-compliant HID devices to the system and all games built on common APIs like DirectInput, Raw Input and the low-level HID API. Optional XInput-emulation further increases the support in modern games built with only Xbox controllers in mind.”
:::

This allows you to take advantage DualShock 3's pressure sensitive face button on PCSX2.

### Windows

1. Install [DsHidMini](https://forums.pcsx2.net/Thread-DsHidMini-Windows-10-driver-for-the-DualShock-3)
2. Set DsHidMini to SXS mode
3. Drop DsHidMini's custom XInput DLL into the PCSX2 folder
4. Enable the XInput source in PCSX2
5. Use "Automatic Binding" button and select XInput

### Linux and Mac (Experimental)

The auto binding system doesn't fully support it, but the backend does.

- Bind all your keys, then close PCSX2 and edit the `PCSX2.ini` file to delete all the buttons and change all the axes from `-Axis##` or `+Axis##` to `FullAxis##`

:::caution
On Linux, [you may need to add udev rules to give PCSX2 access to the controller](https://wiki.rpcs3.net/index.php?title=Help:Controller_Configuration#On_Linux).
:::

## Multitap

Multitaps are physical devices sold separately for the Playstation 2. A multitap fills both a controller and memory card port, and expands those out to four controller and memory card slots each.

:::info
PCSX2 currently does not support multitapped memory cards.
:::

For games which support more than two players, a multitap is required to connect more than two controllers. Depending on which port you enable a multitap for, controllers labelled A-D will be added for that port.

For example, enabling multitap in port 1 will add controllers 1-A through 1-D. The A slot will always be the "original" controller port, with the B-D slots being the additional slots added.

The Playstation 2 SDK places no restrictions on how games use a multitap. Some games will ignore multitapped controllers if you do not multitap a specific port or use specific slots. You will need to refer to your game's manual to understand which port the game supports multitaps for, and in what order a game expects multitapped controllers to be added.

## Peripherals & Accessory

### Wheel compatibility

When setting up your wheel device, you must pick the PS2 wheel that closest matches your PC wheel. Failing to do so may result in broken or missing FFB (Force Feedback), or unresponsive steering.

1. Driving Force: 270 degree, no FFB
2. GT Force: 270 degree, FFB supported
3. Driving Force Pro: 900 degree, no FFB
4. Driving Force Pro (rev11.02): 900 degree, FFB supported

:::caution
Some games may not support FFB on certain wheel types, even if that wheel supports FFB. Even if this is the case, do not switch your emulated PS2 wheel to a type which does not match your PC wheel.
:::

### Buzz controller

#### Windows setup

PS2 Buzz controllers can be used on a PC but may need extra setup steps on Windows.

If your Buzz controllers do not appear in the list of available devices in PCSX2:

1. Hit Start, type Device Manager and hit enter.
2. Locate the Buzz controller. It is likely going to be in the Universal Serial Bus controllers section, named Standard USB HUB and have a yellow warning triangle on it.
3. Right click and go to Properties.
4. Click Update Driver, then Browse Computer for Driver Software, then Let me pick from drivers on my computer, then USB Input Device.
5. Click OK, and exit out of Device Manager.

Your Buzz controller should now be detected by PCSX2. You may need to close and reopen PCSX2 if it is not immediately available.

## Custom profile

### What is the purpose of a controller profile?

Custom profiles are intended for overriding your normal Shared mappings. You use profiles when you want a completely different controller setup for a specific game. For example, you may create a profile for games which use a guitar controller, rather than changing your mappings every time you play that one game. If you aren't trying to make a special setup for one specific game, don't use profiles.

### Why isn't my game recognizing my profile?

The Shared profile is what you start out with and is what all games default to, unless told otherwise. When creating a profile, the name prompt tells you to change the input profile in your per-game settings.

If you want to use a custom profile for a specific game, then you need to assign it to the game. You can find this option on the per-game setting's summary tab, Right click it in your games list, hit Properties, then select the appropriate item under Input Profile.

### I am trying to map multiple PC devices to a single PS2 controller

Profiles do not do this. To map multiple PC devices to a single PS2 controller, simply shift-click a mapping button. You will be given a screen with the ability to add a mapping from a second device (or more).

### I am trying to change my mappings between two layouts while I play the game

This is not and will not be a supported feature in PCSX2. Use external software to do this.

## Known Issues

### Steam input hijacking

Steam's built-in controller support can be useful, but unless carefully configured, will send random keyboard inputs to your PC by default.

Most common example of this is when you press the circle button, it pauses PCSX2 instead.

#### How can I fix this?

A few options work around this issue. We've ordered them from simplest first, to most complicated last:

1. Fully exit Steam (right click in the system tray, then Exit)
2. Disable controller support for your controller in Steam
3. Change the keyboard mappings for your controller in Steam
4. Change the hotkey mappings in PCSX2 to no longer include any of the keyboard keys that Steam is remapping your controller to

### Crashes due to EZFRD64.dll

Many third party/knock off controllers and adapters use a buggy driver known generally as "EZFRD64.dll". It will always be located under `C:\Windows\USB_Vibration`. Other variations of the DLL file exist as well, but will always be in the same folder. The driver corrupts both its own memory and that of any programs it tries to interact with. PCSX2 will crash whenever a controller using this driver is plugged in.

#### How do I fix this?

The only solution is to remove the buggy DLL files from your system. There are two ways you can go about this:

1. Simply delete the `C:\Windows\USB_Vibration` folder. Make sure PCSX2 is closed, and the controller is unplugged prior to doing so.
2. If you ran an installer for the controller drivers, try running the uninstaller. You'll probably find an entry for the controller in the "Uninstall a program" list in Control Panel.
