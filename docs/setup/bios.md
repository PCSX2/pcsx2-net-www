---
date: 2025-09-25
description: "This page helps you dump the BIOS files PCSX2 requires to run."
draft: false
sidebar_position: 2
title: "Dumping BIOS"
toc: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { BiSolidCard } from "react-icons/bi";
import { BsWindows, BsApple, BsUsbSymbol } from "react-icons/bs";
import { FaLinux, FaCompactDisc, FaTerminal, FaNetworkWired } from "react-icons/fa";
import { SiKde, SiGnome, SiDebian, SiFedora, SiArchlinux, SiSuse, SiNixos } from "react-icons/si";

This page helps you dump the BIOS files from your PlayStation 2 console.

These files are proprietary software and must therefore be dumped from your own console. PCSX2 cannot play games without a BIOS, and no open-source alternative exists. However, thanks to the hard work of the homebrew community, dumping the BIOS today is a one-time, streamlined process.

:::tip[Tip – Support]

- This guide assumes minimal technical knowledge.
- The PCSX2 project is happy to help with clarification where we can.
- Please reach out on our [Discord server](https://pcsx2.net/discord) or on our [forum](https://forums.pcsx2.net/) with any questions.
  :::

## Overview

Dumping your PlayStation 2 BIOS is conceptually a two-step process:

1. Modify the operation of your PS2 so that it can run any program.
2. Run a BIOS dumper utility program on your PS2 that reads its BIOS and writes it to an external device such as a USB drive.

## Modifying Your PS2

First, you will need to modify your PlayStation 2 device's operation so that it can run a BIOS dumping program. Below are several methods to accomplish this, among which we most heavily recommend FreeMcBoot or FreeDVDBoot. These two are software modifications ("softmods") which live on a PS2 memory card and DVD, respectively, and do not permanently alter your PlayStation 2 console. Fortuna is a similar softmod to FreeMcBoot, but it is somewhat harder to find and use.

|               | FreeMcBoot                                                      | Fortuna                                                       | FreeDVDBoot                          | Disc swap exploit                                                                 | Modchip                                                                 |
| :------------ | :-------------------------------------------------------------- | :------------------------------------------------------------ | :----------------------------------- | :-------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| Skill         | Very low                                                        | Low                                                           | Low                                  | Advanced[^disc_swap]                                                              | Expert[^modchip]                                                        |
| Price         | ~15 USD                                                         | ~15 USD                                                       | Free                                 | PS2 game disc                                                                     | ~10–60 USD                                                              |
| Compatibility | All fat models and all but the newest slim models[^newest-slim] | All slim models                                               | Many slim models and some fat models | Unknown                                                                           | Unknown                                                                 |
| Materials     | FreeMcBoot memory card[^FreeMcBoot]                             | Fortuna memory card[^tuna]                                    | Blank DVD                            | Swap tool (find and refer to a guide), PS2 game disc, blank DVD, various software | Modchip, documentation, wires, various tools, soldering iron            |
| Risk          | Minimal                                                         | Minimal                                                       | Minimal                              | Moderate                                                                          | High                                                                    |
| Recommended?  | Yes                                                             | For slim models that don't work with FreeMcBoot[^newest-slim] | Yes                                  | No                                                                                | Only for experienced solderers who want to do more than dump their BIOS |

:::caution[Caution – Modchip dump corruption]

- An active modchip may cause an incomplete or corrupted BIOS dump.
- To guarantee an accurate BIOS dump:
  1. Use your modchip to install FreeMcBoot or Fortuna.
  2. Disable your modchip and use uLaunchELF to launch biosdrain as described below.
- Refer to your modchip's documentation to see what button combination disables your modchip.
  :::

### Downloading biosdrain

:::info[Info – biosdrain download]
The download for the latest stable release of biosdrain is [here](https://github.com/f0bes/biosdrain/releases/latest/download/biosdrain.elf).
:::

The BIOS dumper utility we recommend is [biosdrain](https://github.com/F0bes/biosdrain). It will run on your PS2 during the dumping process but does not in any way alter your PS2. The instructions below assume you're using this tool.

<Image
src={require("./img/bios/biosdrain.webp").default}
alt="A mostly black screen reads biosdrain - revision v2.1.1 in the upper-right. The biosdrain logo in the bottom-right features the text {BIOSDRAIN} and has a picture of the Bongo Cat meme."
/>

### Starting uLaunchELF

FreeMcBoot and FreeDVDBoot bundle a generally useful homebrew program, uLaunchELF,[^wLaunchELF] that lets you browse memory cards, DVDs, and USB drives connected to your PS2 and run programs from them.

<Tabs queryString="softmod">
  <TabItem value="freemcboot" label={<span className="tab_header_with_icon"><BiSolidCard />Using FreeMcBoot</span>} default>

1. Insert the FreeMcBoot memory card into Memory Card Slot 1.
2. Make sure the disc tray is empty.
3. Turn on your PS2.
4. Select uLaunchELF from the menu.

 </TabItem>
 <TabItem value="freedvdboot" label={<span className="tab_header_with_icon"><FaCompactDisc />Using FreeDVDBoot</span>}>

1. Download the ISO which corresponds to your PS2 model from [FreeDVDBoot's GitHub repository](https://github.com/CTurt/FreeDVDBoot/tree/master/PREBUILT%20ISOs).
2. Burn the ISO to a DVD.
   - The most generally reliable media is a DVD-R disc burned at a slow speed (e.g. 4X speed).
3. Make sure your PS2's language is set to English.
4. Place the burned FreeDVDBoot disc into your PS2.
5. Reset/turn on your PS2.
6. uLaunchELF should open.

 </TabItem>
</Tabs>

## Dumping the BIOS

### Creating the BIOS Dump

biosdrain supports dumping both to a USB flash drive and via HOST through ps2link. We recommend USB for most users. If your console does not have networking support, you cannot use the ps2link method.

<Tabs queryString="medium">
 <TabItem value="usb" label={<span className="tab_header_with_icon"><BsUsbSymbol />USB Flash Drive</span>} default>

:::note[Note – USB issues]

- Some incompatibilities exist between certain USB drives and PS2 USB drivers.
  - If your USB drive is not detected by uLaunchELF (`mass:` is empty) please try another flash drive, preferably USB 2.0.
- USB transfer on the PlayStation 2 is _slow_. Please be patient.
  :::

To use the USB method, you will need a USB flash drive which is partitioned as [master boot record](https://en.wikipedia.org/wiki/Master_boot_record) (MBR) and formatted with a [FAT32](https://en.wikipedia.org/wiki/File_Allocation_Table) filesystem.

<details>
<summary>Expand to see a guide on formatting your flash drive</summary>
<Tabs queryString="os">
<TabItem value="windows" label={<span className="tab_header_with_icon"><BsWindows />Windows</span>} default>
On Windows, we recommend the free and open-source tool Rufus.

:::danger[Danger – Data loss]
Rufus is a powerful tool which can easily cause permanent data loss if misused.

- Formatting a flash drive _permanently wipes_ all of its data.
- Make absolutely sure that you do not format another drive by accident.
- Do not format a flash drive if it contains any data you want to keep.
  :::

1. [Download Rufus](https://rufus.ie/en/), preferably the latest 'Portable' version.
2. Plug your USB flash drive into your computer.
3. Open Rufus.
4. Make sure the drive selected under "Device" is the USB flash drive you wish to format.
5. Under "Boot selection", select the option "Non bootable".
6. Make sure "Partition scheme" is set to "MBR".
7. Make sure "File system" is set to "FAT32 (Default)" or "Large FAT32 (Default)".
8. Click `Start`.
9. Wait for the process to finish.

You can now exit Rufus and proceed.

<Image
src={require("./img/bios/rufus.webp").default}
alt="A Rufus window after formatting a USB flash drive. The Drive Properties section begins with a Device field which is filled with the selection USB Flash Drive (D:) [256 GB]. Beneath that, the Boot selection is Non bootable. Beneath that, the partition scheme is MBR, and the Target system is BIOS or UEFI. Beneath that is a Show advanced drive properties dropdown which is hidden. Beneath that is the Format Options section header. Beneath that is the Volume label, which is named USB Flash Drive. Beneath that, the File system selection is Large FAT32 (Default), and the Cluster size is 32 kilobytes (Default). Beneath that is a Show advanced format options dropdown which is hidden. Beneath that is a green status bar which says READY. Beneath that is a globe icon, an information icon, a slider bar icon, and a notebook icon. To the right of those icons are a Start button and a Close button. At the bottom, Rufus says 1 device found and shows a format time of 00:00:04."
/>

</TabItem>
<TabItem value="macos" label={<span className="tab_header_with_icon"><BsApple />macOS</span>}>

On macOS, we recommend the built-in Disk Utility application.

:::danger[Danger – Data loss]

Disk Utility is a powerful tool which can easily cause permanent data loss if misused.

- Formatting a drive _permanently wipes_ all of its data.
- Make absolutely sure that you do not format another drive by accident.
- Do not format a flash drive if it contains any data you want to keep.
  :::

1. Plug your USB flash drive into your computer.
2. Open Disk Utility.
3. At the top of the window, click `View` > `Show All Devices`.
4. In the left-hand tab, under "External", select the flash drive you wish to format.
5. At the top of the window, click `Erase`.
6. Under "Format", select "MS-DOS (FAT)".
7. Under "Scheme", select "Master Boot Record".
8. Click `Erase`.
9. Wait for `Erasing "[DRIVE]" and creating "[NEW VOLUME]"`.
10. Click `Done`.

You can now exit Disk Utility and proceed.

<Image
src={require("./img/bios/disk_utility_format.webp").default}
alt="A window in Disk Utility asking if the user wishes to erase their flash drive. It advises that data will be deleted but may still be accessible with recovery tools, that you must keep the device connected until the erase completes, and that you cannot undo this action. Three fields are available to the user: Name (filled in the example with USB), Format (with the selection MS-DOS (FAT)), and Scheme (with the selection Master Boot Record). At the bottom-right of the window are a Cancel button on the left and an Erase button on the right."
/>

</TabItem>
<TabItem value="linux" label={<span className="tab_header_with_icon"><FaLinux />Linux</span>}>
On Linux, we recommend KDE Partition Manager or GNOME Disks.

:::note[Note – Command line]

- This process is also possible through the command line using tools like `fdisk`.
- We categorically recommend against formatting in the command line for non-advanced users.
  :::

<Tabs queryString="partition-tool">
<TabItem value="kde" label={<span className="tab_header_with_icon"><SiKde />KDE Partition Manager</span>} default>
KDE Partition Manager is an application built into KDE Plasma for managing storage devices.

:::danger[Danger – Data loss]

KDE Partition Manager is a powerful tool which can easily cause permanent data loss if misused.

- Formatting a drive _permanently wipes_ all of its data.
- Make absolutely sure that you do not format another drive by accident.
- Do not format a flash drive if it contains any data you want to keep.
  :::

:::tip[Tip – Installing KDE Partition Manager]
<Tabs queryString="distro">
<TabItem value="debian" label={<span className="tab_header_with_icon"><SiDebian />Debian</span>} default>

```bash
sudo apt install partitionmanager
```

</TabItem>
<TabItem value="fedora" label={<span className="tab_header_with_icon"><SiFedora />Fedora</span>}>
```bash
sudo dnf install partitionmanager
```
</TabItem>
<TabItem value="arch" label={<span className="tab_header_with_icon"><SiArchlinux />Arch</span>}>
```bash
sudo pacman -S partitionmanager
```
</TabItem>
<TabItem value="suse" label={<span className="tab_header_with_icon"><SiSuse />SUSE</span>}>
```bash
sudo zypper install partitionmanager
```
</TabItem>
<TabItem value="nixos" label={<span className="tab_header_with_icon"><SiNixos />NixOS</span>}>
- [MyNixOS page](https://mynixos.com/nixpkgs/package/kdePackages.partitionmanager)
</TabItem>
</Tabs>

Many distros also have a graphical package manager.
:::

1. If not on KDE, install KDE Partition Manager.
2. Open KDE Partition Manager.
3. Authenticate with your password.
4. In the left-hand tab, locate your USB flash drive and right-click it.
5. Click `New Partition Table`.
6. Choose "MS-Dos".
7. Click `Create New Partition Table`.
8. In the table on the right, there will be an unallocated partition of "unknown" type.
9. Right-click this partition row and click `New` in the menu.
10. Under "File system", select "FAT32".
11. Click `OK`.
12. In the upper-left corner of the window, click `Apply`.
13. Review the operations and click `Apply Pending Operations`.
14. Wait for the process to finish and click `OK`.

You can now exit KDE Partition Manager and proceed.

<Image
src={require("./img/bios/kde_partition_manager.webp").default}
alt="A window titled Apply Pending Operations is opened which asks, Do you really want to apply the pending operations listed below? and warns, This will permanently modify your disks. Two lines read, first, Create a new partition table (type: msdos) on /dev/sdd, and, second, Create a new partition (239.01 GiB, fat32) on /dev/sdd. At the bottom is an Apply Pending Operations button on the left and a Cancel button on the right."
/>
</TabItem>
<TabItem value="gnome" label={<span className="tab_header_with_icon"><SiGnome />GNOME Disks</span>}>
GNOME Disks is an application built into GNOME for managing storage devices.

:::danger[Danger – Data loss]

GNOME Disks is a powerful tool which can easily cause permanent data loss if misused.

- Formatting a drive _permanently wipes_ all of its data.
- Make absolutely sure that you do not format another drive by accident.
- Do not format a flash drive if it contains any data you want to keep.
  :::

:::tip[Tip – Installing GNOME Disks]

<Tabs queryString="distro">
<TabItem value="debian" label={<span className="tab_header_with_icon"><SiDebian />Debian</span>} default>
```bash
sudo apt install gnome-disk-utility
```
</TabItem>
<TabItem value="fedora" label={<span className="tab_header_with_icon"><SiFedora />Fedora</span>}>
```bash
sudo dnf install gnome-disk-utility
```
</TabItem>
<TabItem value="arch" label={<span className="tab_header_with_icon"><SiArchlinux />Arch</span>}>
```bash
sudo pacman -S gnome-disk-utility
```
</TabItem>
<TabItem value="suse" label={<span className="tab_header_with_icon"><SiSuse />SUSE</span>}>
```bash
sudo zypper install gnome-disk-utility
```
</TabItem>
<TabItem value="nixos" label={<span className="tab_header_with_icon"><SiNixos />NixOS</span>}>
- [MyNixOS page](https://mynixos.com/nixpkgs/package/gnome-disk-utility)
</TabItem>
</Tabs>

Many distros also have a graphical package manager.
:::

1. If not on GNOME, install GNOME Disks.
2. Open Disks.
3. In the left-hand tab, locate your USB flash drive and click it.
4. Click the triple-dot menu in the upper-right of the window.
5. Click `Format Disk...`.
6. Make sure "Partitioning" is set to "MBR / DOS".
7. Click `Format...`.
8. At the bottom left of the volume "Free Space", click the plus icon ('+').
9. Click `Next`.
10. Select "For use with all systems and devices (FAT)".
11. Click `Create`.
12. Wait for the process to finish.

You can now exit GNOME Disks and proceed.

</TabItem>
</Tabs>
</TabItem>
</Tabs>
</details>

1. Transfer the `biosdrain.elf` file to your formatted USB flash drive.
2. Insert your USB flash drive into your PS2.
3. In uLaunchELF, navigate to the device named `mass:` and open it.
4. Locate and run `biosdrain.elf`.
5. When biosdrain says "Finished Everything", the dumping process is finished.
6. You can now plug the USB drive back into your computer.

You should see files prefixed by your console model ID and ending in `.rom0`,`.rom1`,`.nvm`, etc., on your USB drive.

<Image
src={require("./img/bios/uLaunchELF.webp").default}
alt="A LaunchELF v4.43a screen displaying file paths. The row for mass:/ is highlighted in red. The bottom of the screen features PlayStation 2 buttons corresponding to options. The circle button is used for OK."
/>

</TabItem>
<TabItem value="ps2client" label={<span className="tab_header_with_icon"><FaTerminal />ps2client & ps2link</span>}>

1. `cd` into the directory where you have `biosdrain.elf`.
2. Run the command:
   ```bash
   ps2client execee host:biosdrain.elf
   ```
3. biosdrain will automatically detect that the `host` device is present and dump your BIOS contents to the root directory of `host`.
   - The root of `host` is usually where you have the biosdrain.elf file.
4. When biosdrain says "Finished Everything", the dumping process is finished.

You should see files prefixed by your console model ID and ending in `.rom0`,`.rom1`,`.nvm`, etc., in the root directory of `host`.

</TabItem>
<TabItem value="xlink" label={<span className="tab_header_with_icon"><FaNetworkWired />XLink & ps2link</span>}>

1. Execute the `biosdrain.elf` with the user interface.
2. biosdrain will automatically detect that the `host` device is present and dump your BIOS contents to the root directory of `host`.
   - The root of `host` is usually where you have the biosdrain.elf file.
3. When biosdrain says "Finished Everything", the dumping process is finished.

You should see files prefixed by your console model ID and ending in `.rom0`,`.rom1`,`.nvm`, etc., in the root directory of `host`.
</TabItem>
</Tabs>

### Checking the BIOS Dump

Once you've finished dumping your PS2's BIOS, you're done and ready to use it for PCSX2. However, if you wish to first verify the integrity of the dump, the ReDump project maintains [a data file](https://redump.org/datfile/ps2-bios/) containing [hashes](https://en.wikipedia.org/wiki/Hash_function) for every PS2 BIOS version. To compute the SHA1 hash of the BIOS file you dumped:

<Tabs queryString="os">
<TabItem value="windows" label={<span className="tab_header_with_icon"><BsWindows />Windows</span>} default>
On Windows, [use Get-FileHash in PowerShell](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-filehash?view=powershell-7.5):
  ```powershell
  Get-FileHash [path-to-file] -Algorithm SHA1
  ```
</TabItem>
<TabItem value="macos" label={<span className="tab_header_with_icon"><BsApple />macOS</span>}>
On macOS, [use shasum in Terminal](https://linux.die.net/man/1/shasum):
  ```bash
  shasum [path-to-file]
  ```
</TabItem>
<TabItem value="linux" label={<span className="tab_header_with_icon"><FaLinux />Linux</span>}>
On Linux, [use sha1sum in the shell](https://www.man7.org/linux/man-pages/man1/sha1sum.1.html):
  ```bash
  sha1sum [path-to-file]
  ```
:::info[Info – Graphical hashing]
Some file managers such as Dolphin (KDE) provide built-in support for hashing, while some like Files (GNOME) require an extension. 
:::
</TabItem>
</Tabs>
## Footnotes

[^disc_swap]: For more information on disc swap, see [this section](https://www.psdevwiki.com/ps2/index.php?title=Vulnerabilities#PS2_Disc_Swap_Trick) on the PS2 Dev Wiki.

[^modchip]: For more information on modchips, we recommend [this article](https://altarofgaming.com/playstation-2-modchips/) by FreeckyCake on _Altar of Gaming_ and [this catalogue](https://www.psdevwiki.com/ps2/Modchips) on the PS2 Dev Wiki.

[^newest-slim]: 9xxxx serial number with a date code larger than 8B

[^FreeMcBoot]: Memory cards with FreeMcBoot preinstalled are sold on a variety of digital storefronts.

[^tuna]: Memory cards with Fortuna preinstalled can also be found on digital storefronts, but they are rarer than FreeMcBoot. A modern, open-source version of Fortuna, [OpenTuna](https://github.com/ps2homebrew/opentuna-installer), is not typically bundled with memory cards sold by online retailers.

[^wLaunchELF]: The modern continuation of uLaunchELF, [wLaunchELF](https://github.com/ps2homebrew/wLaunchELF), is sometimes bundled with modern versions of FreeMcBoot like 1.966. It is not bundled with FreeDVDBoot, which still includes uLaunchELF. This guide treats uLaunchELF and wLaunchELF interchangeably.
