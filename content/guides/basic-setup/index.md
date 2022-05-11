---
title: "PCSX2 Basic Setup Guide"
date: 2022-03-26
summary: "How to dump your BIOS and game files from your own Playstation 2 console and game discs"
draft: false
mainAuthor: Vaser
toc: true
---

In order for PCSX2 to function properly, both a legitimate BIOS and copies of games must be obtained from **your own** Playstation 2 console and original Playstation 2 discs respectively.  The following explains the recommended ways to accomplish both of these tasks.

If you require further help, please visit our forums or ask in our Discord's help channels.

## How to dump your PS2 BIOS

Dumping your PS2 BIOS is conceptually a two-step process:

1. Modify the operation of your PS2 so that it can run any program.
2. Then you can run a "BIOS dumper" utility program on your PS2 that reads its BIOS and writes it to a USB drive.

There is a generally useful program, uLaunchELF, that lets you browse memory cards, DVDs, and USB drives connected to a PS2 and run programs from them. So for most of the approaches below, you use uLaunchELF to then run the BIOS dumper.

### Popular approaches to modify PS2 operation

1. FreeMcBoot Memory Card
    - Works for all but the newest (9xxxx serial number with a date code larger than 8B) slim PS2s. Can be found online for ~10 USD.
2. FreeDVDBoot
    - Works for many slim models, and some phat models. Slight effort, but free.
    - You will require a blank DVD for this method to work!
3. Disc swap exploits
    - Technical in nature, involves hardware tampering. Guides can be found quickly by Googling.
4. Mod chips
    - Extremely technical, requires soldering skills. DO NOT ATTEMPT unless you are an electronics pro.

### Downloading the BIOS dumper utility

Hosted by the PCSX2 Project:

- [Binary Version](https://github.com/PCSX2/tools/releases/download/bios-dumper%2Fv2/PS2dumperV2_bin.7z) (Recommended)
  - After downloading, extract the files to a USB flash drive.
    - Your mileage may vary here. All PS2 models can read and write to USB flash drives formatted with a FAT32 file system. Some people report USB 3.0 drives being usable while others claim they are not.  For this reason it appears to be more dependent on the drive rather than the USB version so we cannot provide an exhaustive list for success. If you really want to increase the odds of recognising it does seems that it doesn't have a limit on the size of the USB flash drive but you have the most luck with SanDisk or PNY models though other brand models can also actually work.
- [ISO Version](https://github.com/PCSX2/tools/releases/download/bios-dumper%2Fv2/PS2dumperV2_iso.7z) (You will have to burn a DVD with the image)

### Option 1: Starting a PS2 with FreeMcBoot

- Plug the FreeMcBoot memory card into memory card port 1
- Turn on your PS2 with no disc inside.
- Select uLaunchELF from the menu.

### Option 2: Starting a PS2 with FreeDVDBoot

- Download the ISO which matches your console from <https://github.com/CTurt/FreeDVDBoot/tree/master/PREBUILT%20ISOs>
- Burn the ISO to a DVD.
  - The most generally reliable media is a **DVD-R** disc, burned at a slow speed (4X speed should be fine).
- Insert the burned FreeDVDBoot disc, then reset/turn on your PS2. uLaunchELF should open.

### Dumping the BIOS

- Insert your USB flash drive with the BIOS dumper (binary version) on it into your PS2.
- In uLaunchELF, navigate to the device named `mass:` and open it.
- Locate and run `DUMPBIOS-MASS.ELF`.
  - this will print some useful information about the BIOS, then print `Dumping BIOS Completed OK`... ending with `Dumping NVM Completed OK`

You can remove your USB flash drive from your PS2 after the last `Dumping` message and inspect its contents on your PC; if it has files ending in `.BIN`, `.NVM`, `ROM1`, and more all named after your PS2's serial number, then your PS2's BIOS was dumped successfully!

## Dumping PS2 Discs via ImgBurn

PS2 game discs are unencrypted DVDs and CDs. So, they can be dumped quickly using a standard DVD drive and the ImgBurn software. Dumping does not harm PS2 game discs.

### Where to get ImgBurn

- Via Ninite (Recommended, safe and fast):
  - <https://ninite.com/imgburn>
- Via ImgBurn themselves (Not recommended, comes with adware in the installer that must be manually unchecked during the install):
  - <http://www.imgburn.com/index.php?act=download>

### How it works

- Install ImgBurn
- Put your PS2 game disc into a DVD drive
- Create an image file from a disc inside ImgBurn (highlighted in screenshot below)

{{< img src="./img/imgburn.webp" cols=6 >}}
