---
title: "PCSX2 Basic Setup Guide"
date: 2022-03-26
summary: "How to dump your BIOS and game files from your own Playstation 2 console and game discs"
draft: false
mainAuthor: Vaser
toc: true
---

In order for PCSX2 to function properly, both a legitimate BIOS and copies of games must be obtained from **your own** Playstation 2 console and original Playstation 2 discs respectively.  The following explains the recommended ways to accomplish both of these tasks.

## How to dump your PS2 BIOS

Dumping your PS2 BIOS requires a mod to your PS2 to allow arbitrary code execution.

**Popular options:**

1. FreeMcBoot Memory Card
    - Works for all but the newest (9xxxx serial number with a date code larger than 8B) slim PS2s. Can be found online for ~10 USD. Minimal effort.
2. FreeDVDBoot
    - Works for many slim models, and some phat models. Slight effort, but free.
3. Disc swap exploits
    - Technical in nature, involves hardware tampering. Guides can be found quickly by Googling.
4. Mod chips
    - Extremely technical, requires soldering skills. DO NOT ATTEMPT unless you are an electronics pro.

### Downloading the dumper utility

Hosted by the PCSX2 Project:
- [Binary Version](https://github.com/PCSX2/tools/releases/download/bios-dumper%2Fv2/PS2dumperV2_bin.7z) (Recommended)
- [ISO Version](https://github.com/PCSX2/tools/releases/download/bios-dumper%2Fv2/PS2dumperV2_iso.7z) (You will have to burn a DVD with the image)

### Option 1: Starting a PS2 with FreeMcBoot

- Plug the FreeMcBoot memory card into memory card port 1
- Turn on the PS2 with no disc inside.
- Select uLaunchELF from the menu.

### Option 2: Starting a PS2 with FreeDVDBoot

- Download the ISO which matches your console: https://github.com/CTurt/FreeDVDBoot/tree/master/PREBUILT%20ISOs
- Burn the ISO to a DVD.
- Insert the burned FreeDVDBoot disc, then reset/turn on the PS2. uLaunchELF should open.

### Dumping the BIOS

- Insert your USB flash drive with the BIOS dumper (binary version) on it.
- Navigate uLaunchELF to the device named mass: and open it.
- Locate and run `DUMPBIOS-MASS.ELF`.

If you have a `.bin`, `.nvm`, `.mec` and more files named after your PS2's serial number, your PS2 BIOS is dumped successfully.

## Dumping PS2 Discs via ImgBurn

PS2 game discs are unencrypted DVDs and CDs. So, they can be dumped quickly using a standard DVD drive and the ImgBurn software. Dumping does not harm PS2 game discs.

### Where to get ImgBurn
- Via Ninite (Recommended, safe and fast):
  - https://ninite.com/imgburn
- Via ImgBurn themselves (Not recommended, comes with adware in the installer that must be manually unchecked during the install):
  - http://www.imgburn.com/index.php?act=download

### How it works
- Install ImgBurn
- Put your PS2 game disc into a DVD drive
- Create an image file from a disc inside ImgBurn (highlighted in screenshot below)

{{< img src="./img/imgburn.webp" cols=6 >}}

