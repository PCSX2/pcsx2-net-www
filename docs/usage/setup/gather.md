---
title: "Gathering Files"
date: 2023-08-02
summary: "Steps on how to gather required files for you to be able to use PCSX2"
draft: false
toc: true
sidebar_position: 2
---

:::caution
In order for PCSX2 to function properly, both a legitimate BIOS and copies of games must be obtained from **your own** PlayStation 2 console and original PlayStation 2 discs respectively.
:::

## How to dump your PS2 BIOS

The following explains the recommended ways to accomplish both of these tasks.

Dumping your PS2 BIOS is conceptually a two-step process:

1. Modify the operation of your PS2 so that it can run any program.
2. Then you can run a "BIOS dumper" utility program on your PS2 that reads its BIOS and writes it to a USB drive.

There is a generally useful program, uLaunchELF, that lets you browse memory cards, DVDs, and USB drives connected to a PS2 and run programs from them. So for most of the approaches below, you use uLaunchELF to then run the BIOS dumper.

### Popular approaches to modify PS2 operation

1. FreeMcBoot Memory Card
   - Works for all but the newest (9xxxx serial number with a date code larger than 8B) slim PS2s. Can be found online for ~10 USD.
2. Fortuna Memory Card
   - Works for all slim models. Can also be found for ~10 USD.
3. FreeDVDBoot
   - Works for many slim models, and some phat models. Slight effort, but free.
   - You will require a blank DVD for this method to work!
4. Disc swap exploits
   - Technical in nature, involves hardware tampering. Guides can be found quickly by Googling.
5. Mod chips
   - Extremely technical, requires soldering skills. DO NOT ATTEMPT unless you are an electronics pro.
     :::caution
     Due to how modchips operate, it is possible for your BIOS dump to be incomplete or even corrupted while they are active.
     To guarantee a proper BIOS dump, first use your modchip to install FMCB or Fortuna. Then disable your modchip\* and use one of the aforementioned exploits to launch biosdrain.  
      \*Refer to your modchips documentation to see what button combination disables your modchip.
     :::

### Downloading the BIOS dumper utility

Our recommended BIOS dumper utility is [biosdrain](https://github.com/F0bes/biosdrain). Therefore the instructions below will be for this tool.

<Image cols={9} src={require("./img/biosdrain.webp").default} />

- The download for the latest stable biosdrain is [here](https://github.com/f0bes/biosdrain/releases/latest/download/biosdrain.elf).

### Option 1: Starting a PS2 with FreeMcBoot

- Plug the FreeMcBoot memory card into memory card port 1
- Turn on your PS2 with no disc inside.
- Select uLaunchELF from the menu.

### Option 2: Starting a PS2 with FreeDVDBoot

- Download the ISO which matches your console from [FreeDVDBoot's GitHub Repo](https://github.com/CTurt/FreeDVDBoot/tree/master/PREBUILT%20ISOs)
- Burn the ISO to a DVD.
  - The most generally reliable media is a **DVD-R** disc, burned at a slow speed (4X speed should be fine).
- Insert the burned FreeDVDBoot disc, then reset/turn on your PS2. uLaunchELF should open.

### Dumping the BIOS

There are two options available when dumping the BIOS.
biosdrain supports USB and HOST through PS2link. If your console does not have networking support, please refer to the USB method, otherwise you can use the ps2client method.

- USB

  - Take the biosdrain.elf file that was downloaded above, and transfer it to a FAT32 formatted, with MBR Disk type (not GPT) USB flash drive.

  :::note
  Please note that some incompatibilities between certain USB drives and PS2 USB drivers have been reported throughout the years. If your USB drive is not detected by uLaunchELF (`mass:` is empty) please try another one, preferably USB 2.0.
  :::

  - Insert your USB flash drive into your PS2.
  - In uLaunchELF, navigate to the device named `mass:` and open it.
    <Image cols={9} src={require("./img/ule.webp").default} />
  - Locate and run `biosdrain.elf`.
  - You will know that it is finished when biosdrain says `Finished Everything`. Please be patient, as USB on the PS2 is SLOW!
  - Once the final message appears, you can now plug the USB drive back into your computer. You will know that the dump was successful if you see files ending in `.rom0`,`.rom1`,`.nvm`, etc, prefixed by your console model ID in your USB drive.

- PS2client / XLINK & PS2link
  - When using XLINK, simply execute the `biosdrain.elf` with the user interface.
  - When using PS2client, cd into the directory where you have `biosdrain.elf`, and simply run `ps2client execee host:biosdrain.elf`
  - biosdrain will automatically detect that the `host` device is present and will dump your BIOS contents to the root directory of `host` **(Usually where you have the biosdrain.elf file)**.
  - You will know that it is finished when biosdrain says `Finished Everything`, either on screen or in your console log.

## Dumping PS2 Discs via ImgBurn

PlayStation 2 game discs are unencrypted DVDs and CDs. This means they can be dumped quickly using a standard optical drive that supports DVD and CD optical media and the ImgBurn software. Dumping discs does not harm optical media directly.

### Where to get ImgBurn

- Via [Ninite](https://ninite.com/imgburn) (Recommended, safe and fast):
- Via [ImgBurn](http://www.imgburn.com/index.php?act=download) themselves (Not recommended, comes with adware in the installer that must be manually unchecked during the install):

### How it works

- Install and run ImgBurn
- Put your game disc into an optical drive
- Create an image file from a disc inside ImgBurn (highlighted in screenshot below)

<Image cols={6} src={require("./img/imgburn.webp").default} />

## Alternative: Dumping PlayStation 2 discs with Media Preservation Frontend (more advanced)

This is a GUI for several applications aimed at preserving optical media. It can be a bit more involved for non-PlayStation disc dumping, but for PS1 and PS2 its fairly simple.

### Where to get MPF

[MPF's GitHub repo](https://github.com/SabreTools/MPF)

This tool is currently only available on Windows, but Linux support may be added in the future. It should be noted the command-line tools that are used for the backend of this tool are all free, open-source and available on all major operating systems.

### How to use it

- Extract and run MPF
- Put your game disc into an optical drive
- Select PS2 for system/media type
- Select whether it is a CD-ROM PS2 game or DVD-ROM PS2 game
- Select output file name and directory
- Select the appropriate drive letter for the drive with the optical media in it
- Select "Start dumping"

One quick note, the lower the drive speed of the optical drive the more likely you are to get a good dump of the disc. The fastest drive speed will take much less time, but may be incomplete, corrupted, or inaccurate. It could also be perfectly fine, so depending on your drive and your media, try different things and see what works best for you.

<Image cols={6} src={require("./img/MPF.webp").default} />
