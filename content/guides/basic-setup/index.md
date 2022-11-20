---
title: "PCSX2 Basic Setup Guide"
date: 2022-03-26
summary: "Everything you need to know to setup the emulator, dump your own legitimate BIOS and games, and get help if something isn't working."
draft: false
mainAuthor: Vaser
toc: true
aliases:
  - "/getting-started"
  - "/getting-started.htm"
  - "/getting-started.html"
  - "/config-guide/guide-translations"
  - "/config-guide/guide-translations.htm"
  - "/config-guide/guide-translations.html"
  - "/download/releases/tools"
  - "/download/releases/tools.htm"
  - "/download/releases/tools.html"
---

This article details everything you should need to get started using PCSX2.

If this article does not help solve your problem, reach out in the Discord or the forums for help.

## Requirements to use Nightly PCSX2 builds

### System Requirements

#### Minimum

- Operating system
  - Windows 10 21H2 (1809 or later) (64-bit)
  - Ubuntu 20.04/Debian or newer, Arch Linux, or other distro (64-bit)
- CPU
  - Supports SSE4.1
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 1600
    - Note: Recommended single thread performance is based on moderately complex games. Games that pushed the PS2 hardware to its limits will struggle on CPUs at this level. Some release titles and 2D games which underutilized the PS2 hardware may run on CPUs rated as low as 1200.
      - A quick reference for CPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:CPU_intensive_games), [Forum](https://forums.pcsx2.net/Thread-LIST-The-Most-CPU-Intensive-Games)
      - And CPU **light** games: [Forum](https://forums.pcsx2.net/Thread-LIST-Games-that-don-t-need-a-strong-CPU-to-emulate)
  - Two physical cores, with hyperthreading
- GPU
  - Direct3D10 support
  - OpenGL 3.x support
  - Vulkan 1.1 support
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 3000 (GeForce GTX 750)
    - Note: Recommended GPU is based on 3x internal, ~1080p resolution requirements. Higher resolutions will require stronger cards; 6x internal, ~4K resolution will require a [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 12000 (GeForce GTX 1070 Ti).
      - Just like CPU requirements, this is also highly game dependent. A quick reference for GPU **intensive games**: [Wiki](https://wiki.pcsx2.net/Category:GPU_intensive_games)
  - 2 GB video memory
- RAM
  - 4 GB

#### Recommended

- Operating system
  - Windows 10 21H2 (1809 or later) (64-bit)
  - Ubuntu 22.04/Debian or newer, Arch Linux, or other distro (64-bit)
- CPU
  - Supports AVX2
  - [PassMark single thread performance](https://www.cpubenchmark.net/singleThread.html) rating near or greater than 2100
  - Four physical cores, with or without hyperthreading
- GPU
  - Direct3D11 support
  - OpenGL 4.6 support
  - Vulkan 1.3 support
  - [PassMark G3D Mark](https://www.videocardbenchmark.net/high_end_gpus.html) rating around 6000 (GeForce GTX 1050 Ti)
  - 4 GB video memory
- RAM
  - 8 GB

### Required software

- You need the [Visual C++ 2019 x86 Redistributables](https://support.microsoft.com/en-us/help/2977003/) to run PCSX2.

### Version deprecation notes

- Windows XP and Direct3D9 support was dropped after stable release 1.4.0.
- Windows 7, Windows 8.0, and Windows 8.1 support was dropped after stable release 1.6.0.
- 32-bit support was dropped after stable release 1.6.0.

## Downloading and configuring PCSX2

1. Download the version suited for you from our [Downloads](/downloads) Section (for beginners, the full installer of the latest stable release is recommended)
2. Get the BIOS file from your PlayStation 2 console. This is not included with PCSX2 since it breaks copyright law, so you have to obtain it from your console. [See below for how to do this](#how-to-dump-your-ps2-bios).
3. Configure the emulator using the provided instructions in the stable release download.  Alternatively these can be found [here in the GitHub repository](https://github.com/PCSX2/pcsx2/blob/1.6.x/pcsx2/Docs/Configuration_Guide/Configuration_Guide.md)
   1. Translated versions of this guide are available, but your milage may vary as many are not for the latest stable version.  [See below for links to these](#translated-configuration-guides)
4. Launch your game using the ISO file that you have dumped yourself.  [See below for how to do this](#dumping-ps2-discs-via-imgburn)

### Translated configuration guides

Below are links to translated versions of the guide to configure PCSX2 at various stable release versions.

If you wish to apply for a new translation or to update an existing one, visit the [guide translation applications](https://forums.pcsx2.net/Thread-Program-and-Guide-translation-applications)

- Arabic - 0.9.6
  - By [Squall](https://forums.pcsx2.net/User-Squall)
  - [Guide Here](https://forums.pcsx2.net/Thread-%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A-%D9%84%D8%B6%D8%A8%D8%B7-%D8%A7%D9%84%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D8%AC-%D9%81%D9%8A-%D8%A7%D9%84%D8%A5%D8%B5%D8%AF%D8%A7%D8%B1-0-9-6)
- Bulgarian - 0.9.6
  - By [SonicXPS2](https://forums.pcsx2.net/User-SonicXPS2)
  - [Guide Here](https://forums.pcsx2.net/Thread-%D0%9E%D1%84%D0%B8%D1%86%D0%B8%D0%B0%D0%BB%D0%BD%D0%BE-%D0%B1%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D1%81%D0%BA%D0%BE-PCSX2-0-9-6-%D1%80%D1%8A%D0%BA%D0%BE%D0%B2%D0%BE%D0%B4%D1%81%D1%82%D0%B2%D0%BE-%D0%B7%D0%B0-%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0)
- Simplified Chinese - 0.9.6
  - By [luopojianghu](https://forums.pcsx2.net/User-luopojianghu)
  - [Guide Here](https://forums.pcsx2.net/thread-2303.html)
- Traditional Chinese - 1.2.1
  - By [pcsx2fan](https://forums.pcsx2.net/User-pcsx2fan)
  - [Guide Here](https://forums.pcsx2.net/Thread-PCSX2-1-2-1-%E5%AE%98%E6%96%B9%E6%AD%A3%E9%AB%94%E4%B8%AD%E6%96%87%E6%8C%87%E5%8D%97)
- Croatian - 0.9.6
  - By [vborovic](https://forums.pcsx2.net/User-vborovic)
  - [Guide Here](https://forums.pcsx2.net/Thread-Slu%C5%BEbeni-vodi%C4%8D-na-hrvatskom-jeziku)
- Czech - 1.0.0
  - By [Tsbook](https://forums.pcsx2.net/User-Tsbook)
  - [Guide Here](https://forums.pcsx2.net/Thread-Ofici%C3%A1ln%C3%AD-%C4%8Desk%C3%BD-pr%C5%AFvodce-pro-PCSX2-1-0-0)
- Dutch - 0.9.6
  - By [ChronicNL](https://forums.pcsx2.net/User-ChronicNL)
  - [Guide Here](https://forums.pcsx2.net/thread-18217.html)
- French - 1.2.1
  - By [PlaysGames11](https://forums.pcsx2.net/User-PlaysGames11)
  - [Guide Here](https://forums.pcsx2.net/Thread-Guide-de-Configuration-Officiel-PCSX-v1-2-1)
- German - 0.9.7
  - By [Mayonezo](https://forums.pcsx2.net/User-Mayonezo)
  - [Guide Here](https://forums.pcsx2.net/Thread-Offizieller-deutscher-Ratgeber-v0-9-7)
- Greek - 0.9.6
  - By [DarkDante](https://forums.pcsx2.net/User-DarkDante)
  - [Guide Here](https://forums.pcsx2.net/Thread-%CE%95%CF%80%CE%AF%CF%83%CE%B7%CE%BC%CE%BF%CF%82-%CE%95%CE%BB%CE%BB%CE%B7%CE%BD%CE%B9%CE%BA%CF%8C%CF%82-%CE%9F%CE%B4%CE%B7%CE%B3%CF%8C%CF%82-PCSX2)
- Hungarian - 1.2.1
  - By [bmate](https://forums.pcsx2.net/User-bmate)
  - [Guide Here](https://forums.pcsx2.net/Thread-A-hivatalos-magyar-haszn%C3%A1lati-%C3%BAtmutat%C3%B3-v1-2-1)
- Indonesian - 0.9.7
  - By [ikazu](https://forums.pcsx2.net/User-ikazu)
  - [Guide Here](https://forums.pcsx2.net/Thread-Petunjuk-Konfigurasi-PCSX2-v-0-9-7)
- Italian - 1.2.1
  - By [IL CARTOLAiO](https://forums.pcsx2.net/User-IL-CARTOLAiO)
  - [Guide Here](https://forums.pcsx2.net/Thread-Guida-italiana-ufficiale-v1-2-1)
- Japanese - 0.9.8
  - By [DeltaHF](https://forums.pcsx2.net/User-DeltaHF)
  - [Guide Here](https://forums.pcsx2.net/Thread-PCSX2-v0-9-8-%E5%85%AC%E5%BC%8F%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%82%AC%E3%82%A4%E3%83%89)
- Malaysian - 1.0.0
  - By [Ice Queen Zero](https://forums.pcsx2.net/User-Ice-Queen-Zero)
  - [Guide Here](https://forums.pcsx2.net/Thread-Panduan-Rasmi-Konfigurasi-PCSX2-v1-0-0)
- Persian - 1.0.0
  - By [ノーティーイヌ](https://forums.pcsx2.net/User-%E3%83%8E%E3%83%BC%E3%83%86%E3%82%A3%E3%83%BC%E3%82%A4%E3%83%8C)
  - [Guide Here](https://forums.pcsx2.net/Thread-Persian-PCSX2-Configuration-Guide-v1-0-0)
- Polish - 0.9.8
  - By [miseru99](https://forums.pcsx2.net/User-miseru99)
  - [Guide Here](https://forums.pcsx2.net/Thread-Oficjalny-Polski-Poradnik-oparty-na-wersji-0-9-8-0-9-9)
- Portuguese (European) - 0.9.7
  - By [Pauinho](https://forums.pcsx2.net/User-Pauinho)
  - [Guide Here](https://forums.pcsx2.net/Thread-Guia-oficial-de-configura%C3%A7%C3%A3o-do-PCSX2-v0-9-7-Portugu%C3%AAs-Portugal)
- Portuguese (Brazilian) - 1.2.1
  - By [josephg](https://forums.pcsx2.net/User-josephg)
  - [Guide Here](https://forums.pcsx2.net/Thread-Guia-Oficial-de-Configura%C3%A7%C3%A3o-do-PCSX2-v1-2-1-Portugu%C3%AAs-Brasil)
- Russian - 0.9.7
  - By [El_Diablos](https://forums.pcsx2.net/User-El-Diablos)
  - [Guide Here](https://forums.pcsx2.net/Thread-%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-PCSX2-v0-9-7)
- Slovakian - 0.9.7
  - By [hellrider881](https://forums.pcsx2.net/User-hellrider881)
  - [Guide Here](https://forums.pcsx2.net/Thread-Slovensk%C3%BD-manu%C3%A1l-k-PCSX2-0-9-7)
- Spanish - 1.2.1
  - By [McCuñao](https://forums.pcsx2.net/User-McCu%C3%B1ao)
  - [Guide Here](https://forums.pcsx2.net/Thread-Gu%C3%ADa-oficial-de-configuraci%C3%B3n-de-PCSX2-1-2-1)
- Swedish - 0.9.7
  - By [SeeK](https://forums.pcsx2.net/User-SeeK)
  - [Guide Here](https://forums.pcsx2.net/Thread-Officiell-Svensk-PCSX2-konfigurationsguide-v0-9-7)
- Thai - 0.9.8
  - By [xyteton](https://forums.pcsx2.net/User-xyteton)
  - [Guide Here](https://forums.pcsx2.net/Thread-%D0%9D%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B0-PCSX2-v0-9-7)
- Turkish - 0.9.7
  - By [PyramidHead](https://forums.pcsx2.net/User-PyramidHead)
  - [Guide Here](https://forums.pcsx2.net/Thread-PCSX2-T%C3%BCrk%C3%A7e-Kullanma-K%C4%B1lavuzu-v0-9-7-G%C3%BCncel-s%C3%BCr%C3%BCm)
- Vietnamese - 0.9.7
  - By [climhz](https://forums.pcsx2.net/User-climhz)
  - [Guide Here](https://forums.pcsx2.net/Thread-H%C6%B0%E1%BB%9Bng-d%E1%BA%ABn-c%E1%BA%A5u-h%C3%ACnh-PCSX2-0-9-7)

### Still have problems?

If your game is not working, there are a few things you can do:
- Check the [compatibility page](/compat) to see if the game has been tested to run properly
- Consult the [wiki page](https://wiki.pcsx2.net) for the game for similar information
- Check the [GitHub issues page](https://github.com/PCSX2/pcsx2/issues) to see if there are any reported issues

#### It works but it's slow?

This is the most common problem users experience. PCSX2 is a very hardware intensive program, especially on your processor.

It is highly recommended you read the first post of this thread: [Will PCSX2 run fast on my computer?](https://forums.pcsx2.net/Thread-Sticky-Will-PCSX2-run-fast-on-my-computer) and if you still have questions reply to the thread or in the Discord, there are many helpful members who will answer.

#### Reach out for help

If none of the above suggestions help you solve your problem, consider reaching out in either the Discord or the forum.

## How to dump your PS2 BIOS

In order for PCSX2 to function properly, both a legitimate BIOS and copies of games must be obtained from **your own** PlayStation 2 console and original PlayStation 2 discs respectively.  The following explains the recommended ways to accomplish both of these tasks.

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

Our recommended BIOS dumper utility is [biosdrain](https://github.com/F0bes/biosdrain). Therefore the instructions below will be for this tool.

- The download for the latest stable biosdrain is  [here](https://github.com/f0bes/biosdrain/releases/latest/download/biosdrain.elf).

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

There are two options available when dumping the BIOS.
biosdrain supports USB and HOST through PS2link. If your console does not have networking support, please refer to the USB method, otherwise you can use the ps2client method.

- USB
  - Take the biosdrain.elf file that was downloaded above, and transfer it to a FAT32 formatted USB flash drive.
    - Please note that some incompatibilities between certain USB drives and PS2 USB drivers have been reported throughout the years. If your USB drive is not detected by uLaunchELF (`mass:` is empty) please try another one, preferably USB 2.0.

  - Insert your USB flash drive into your PS2.
  - In uLaunchELF, navigate to the device named `mass:` and open it.
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

- Via Ninite (Recommended, safe and fast):
  - <https://ninite.com/imgburn>
- Via ImgBurn themselves (Not recommended, comes with adware in the installer that must be manually unchecked during the install):
  - <http://www.imgburn.com/index.php?act=download>

### How it works

- Install and run ImgBurn
- Put your game disc into an optical drive
- Create an image file from a disc inside ImgBurn (highlighted in screenshot below)

{{< img cols="6" src="./img/imgburn.webp">}}

## Alternative: Dumping PlayStation 2 discs with Media Preservation Frontend (more advanced)

This is a GUI for several applications aimed at preserving optical media. It can be a bit more involved for non-PlayStation disc dumping, but for PS1 and PS2 its fairly simple.

### Where to get MPF

On GitHub: <https://github.com/SabreTools/MPF>

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

{{< img cols="6" src="./img/MPF.webp">}}
