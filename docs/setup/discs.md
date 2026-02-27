---
date: 2025-09-25
description: "This page helps you create a backup of your physical game disc."
draft: false
sidebar_position: 3
title: "Dumping Discs"
toc: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { BsWindows, BsApple } from "react-icons/bs";
import { FaLinux } from "react-icons/fa";
import { SiDebian, SiFedora, SiArchlinux, SiSuse, SiNixos, SiFlathub } from "react-icons/si";

This page helps you create a backup of your physical game disc.

## General Information

Although you can play games on PCSX2 directly from your disc, there are major advantages[^advantages] to dumping them and using those backup files instead. PlayStation 2 game discs are unencrypted DVDs and CDs[^format] which can be dumped quickly using a standard [optical disc drive](https://en.wikipedia.org/wiki/Optical_disc_drive) that supports DVD and CD media.[^odd] The dumping process is straightforward for all skill levels and does not harm optical media.

:::tip[Tip – Bad dumps]

- Game dumps that aren't identical copies of the original game are called "bad dumps".
- These can cause issues such as freezing on loading screens.
- If you have trouble with your game disc, consider selecting a lower [drive speed](https://en.wikipedia.org/wiki/Optical_storage_media_writing_and_reading_speed).
- Lower drive speeds take much more time but raise the likelihood of a "good dump" (exact copy).
- Once PCSX2 is installed, you can [easily verify that your game was successfully dumped.](../troubleshooting/general#game-are-stuck-on-black-screen-or-does-not-load-correctly)
  :::

## Creating Disc Dumps

:::note[Note – CD dumps]

- macOS and Linux users dumping CDs (blue discs) rather than DVDs (silver discs) will need to select guides marked `[CD]` or `[DVD/CD]`.[^bin-cue]
- All Windows instructions apply to both DVDs and CDs.
  :::

<Tabs queryString="os">
<TabItem value="windows" label={<span className="tab_header_with_icon"><BsWindows />Windows</span>} default>

Disc dumping on Windows can be done using graphical tools like Media Preservation Frontend (MPF) and ImgBurn.

<Tabs queryString="tool">
<TabItem value="mpf" label="MPF" default>

Media Preservation Frontend (MPF) is a streamlined, free and open-source graphical tool aimed at preserving optical media.

:::tip[Tip – Downloading MPF]

- [Download the Windows x64 UI version of MPF](https://github.com/SabreTools/MPF/releases) – named `MPF.UI_[a.b.c]_net[x.y]_windows_win-x64_release.zip`.
- Extract MPF from the `.zip` archive.
  <Image
  src={require("./img/discs/windows/mpf_download.webp").default}
  alt="A package download page on GitHub. Highlighted is the package MPF.UI_3.3.3_net9.0-windows_win-x64_release.zip, used as an example."
  />
  :::

Once you've placed the game into an optical drive and opened MPF:

1. Click `Scan for Discs`.
   - This should automatically populate MPF with information about your disc.
   - If it fails to populate, you can enter the information manually instead:
     - Under "System/Media Type", select "Sony PlayStation 2".
     - Select whether your game disc is on a CD-ROM or DVD-ROM.
     - Under "Drive Letter", select the letter corresponding to your optical drive.
2. (Optional) Under "Output Path", specify a destination folder and file name for the dump.
   - The default destination is a folder called `ISO` in the same folder as `MPF.exe`.
   - The default file name is the disc volume name with an extension.
3. Click `Start Dumping` once the Status reads "ready to dump".
4. A command line window will open and begin running the utility [Redumper](https://github.com/superg/redumper).
5. Wait for the dumping process to complete.
6. Click `OK` on the message stating: "It is now safe to eject the disc."
7. Click `Cancel` on the "Disc Information" window.

Your game will be in the destination folder you specified, and you can safely remove the game disc from the optical drive.

<details>
  <summary>Expand to see a step-by-step visual guide</summary>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Image
    src={require("./img/discs/windows/mpf_landing.webp").default}
    alt="The window shown when first opening MPF. There is a button labeled Scan for Discs under the Controls section of the UI (step 1). The user has already clicked this button, and all of the fields have been automatically filled out. Near the top-right of the window, there is a Browse button to the right of the Output Path field (step 2; optional). Directly to the left of the Scan for Discs button is a button labeled Start Dumping (step 3). Parameters for the disc dumping process are System / Media Type, Output Path, Drive Letter, Drive Speed, and Dumping Program. All of these fields are automatically translated into command line parameters. A status reads: DVD-ROM ready to dump. At the bottom of the window, there is a log output and buttons to clear and save the log output."
    />

The Redumper command line will look something like this (steps 4 and 5):

```shell-session
arguments: disc --drive=E:\ --speed=16 --retries=20 --image-path=ISO\GRANTURISMO3 --image-name=GRANTURISMO3

drive path: E:\
drive: Slimtype - eNAU508 5 (revision level: 8L03, vendor specific: 2010/12/08 15:31)
drive configuration: GENERIC (read offset: +6, C2 shift: 0, pre-gap start: +0, read method: BE, sector order: DATA_C2_SUB)
drive read speed: 22160 KB

current profile: DVD-ROM
disc type: DVD

image path: ISO\GRANTURISMO3
image name: GRANTURISMO3

*** DUMP

disc structure:
  layer 0 { embossed }
    data { LBA: [196608 .. 1437695], length: 1241088, hLBA: [0x030000 .. 0x15EFFF] }
    book type: DVD-ROM
    part version: 1
    disc size: 120mm
    maximum rate: 10.08 mbps
    layers count: 1
    track path: parallel
    linear density: 0.267 um/bit
    track density: 0.74 um/track
    BCA: no

| [ 32%] sector:  399936/1241088, errors: { SCSI: 0 }
```

    <Image
    src={require("./img/discs/windows/mpf_eject.webp").default}
    alt="Above the MPF window is a message titled Eject, which reads: It is now safe to eject the disc. There is a button labeled OK at the bottom right of the message (step 6)."
    />
    <Image
    src={require("./img/discs/windows/mpf_media_information.webp").default}
    alt="A window named Media Information has a cancel button at the bottom-center (step 7). It lists metadata about the disc dump: Title, Alternative Title, Foreign Title (Non-Latin), Alternative Foreign Title, Disc Number / Letter, Disc Title, Disc Title (non-Latin), Category, Region, Languages, Language Selection Via, Serial, Barcode, Version, Edition, and Edition (non-Latin)."
    />

  </div>
</details>

</TabItem>
<TabItem value="imgburn" label="ImgBurn">

ImgBurn is a freeware graphical utility for burning and dumping discs.

:::caution[Caution – Adware]

- We recommend downloading ImgBurn using [Ninite](https://ninite.com/imgburn).
- The version from the official site **installs adware called [OpenCandy](https://en.wikipedia.org/wiki/OpenCandy)** if not manually unchecked during the install.
  :::

Once you've placed your game into an optical drive and opened ImgBurn:

1. Click `Create image file from disc`.
2. Click the icon of a folder with a magnifying glass to specify a destination folder and file name for the dump.
3. Click the icon of a physical disc pointing to a disc file at the bottom of the window.
4. Wait for the dumping process to complete.

Your game will be in the destination folder you specified, and you can safely remove the game disc from the optical drive.

<details>
  <summary>Expand to see a step-by-step visual guide</summary>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Image
    src={require("./img/discs/windows/imgburn_landing.webp").default}
    alt="ImgBurn asks, What would you like to do? Of six options in a 3-by-2 grid, the one in the second row, first column, called Create image file from disc, is highlighted (step 1)."
    />
    <Image
    src={require("./img/discs/windows/imgburn_settings.webp").default}
    alt="Near the middle of the ImgBurn Window is a folder icon with a magnifying glass, representing a search function for the destination folder (step 2). At the bottom of the window is a clickable icon of a disc pointing to a disc file, which starts the disc dumping process (step 3). The source drive is displayed at the top left of the window. Metadata about the dump and a few settings occupy the right side of the window."
    />
    <Image
    src={require("./img/discs/windows/imgburn_dump.webp").default}
    alt="ImgBurn shows the progression of the disc dump, represented by a green progress bar at the bottom of the window. It is currently at 16% progression and has a red, square-shaped Stop button near the bottom right. Metadata about the dumping process is displayed in the upper two-thirds of the screen."
    />
  </div>
</details>

</TabItem>
</Tabs>
</TabItem>
<TabItem value="macos" label={<span className="tab_header_with_icon"><BsApple />macOS</span>}>

Disc dumping on macOS can be done graphically using the built-in [Disk Utility](https://support.apple.com/guide/disk-utility/welcome/mac) application or in Terminal using shell commands like `dd` and `cdrdao`.

<Tabs queryString="tool">
<TabItem value="disk-utility" label="Disk Utility [DVD]" default>

macOS' Disk Utility is a preinstalled graphical utility designed to manage storage drives.

:::caution[Caution – Data loss]

- Disk Utility is a powerful tool which can cause permanent data loss if misused.
- If you're unfamiliar with Disk Utility, please follow these instructions carefully.
  :::

Once you've placed your game disc into an optical drive and opened Disk Utility:

1. In Disk Utility's left-hand sidebar, click on your PS2 disc listed under your optical drive.
2. Click `File` > `New Image` > `Image from "[volume label]"`
3. Choose a name for the dump in the "Save As" field.
4. Specify a destination folder for the dump in the "Where" field.
5. Under "Format", select "DVD/CD master".
6. Click `Save`.
   - If macOS warns "diskimages-helper wants to make changes", enter your password.
7. Wait for the dumping process to complete.
8. Click `Done`. You can now safely remove the game disc from the optical drive.
9. Rename the dump file from `[dump-name].cdr` to `[dump-name].iso`.

:::info[Info – `.cdr` files]

- The `.cdr` file Disk Utility creates is identical to your PS2 game disc.
- `.cdr` is a macOS-exclusive file extension which PCSX2 does not support.
  :::

<details>
  <summary>Expand to see a step-by-step visual guide</summary>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Image
    src={require("./img/discs/macos/disk_utility_sidebar.webp").default}
    alt="The landing page of Disk Utility. Selected in the left-hand sidebar under the External drives is an optical disc drive which is currently labeled GRANTURISMO4 (step 1). To the right of this is information about the GRANTURISMO4 disc, such as mount point, size, and drive device name."
    />
    <Image
    src={require("./img/discs/macos/image_from_volumename.webp").default}
    alt="The app menu in the upper right of macOS shows Disk Utility open. Under the File menu, the option New Image is opened to a submenu. Within this submenu, the item Image from GRANTURISMO4 is highlighted as an example (step 2)."
    />
    <Image
    src={require("./img/discs/macos/disk_utility_parameters.webp").default}
    alt="A Disk Utility window has fields which can be filled out to provide parameters for a disc dump. From top to bottom, they are: Save As, which contains the file name GRANTURISMO4 (step 3); a Tags field, which is left blank; a Where field, whose selection is the Documents folder (step 4); a Format field, whose selection is DVD/CD master (step 5), and an Encryption field which is set to none. At the bottom-right of the window, there is a Cancel button on the left and, highlighted, a Save button on the right (step 6)."
    />
    <Image
    src={require("./img/discs/macos/disk_utility_operation_successful.webp").default}
    alt="A Disk Utility window provides a status on the creation of a disk image. The process is done, indicated by a full, blue progress bar and the words Operation successful (step 7). Beneath that are details of the image creation process, which can be hidden. Because the operation is finished, there is a Done button at the bottom-right of the window (step 8)."
    />
  </div>
</details>

</TabItem>
<TabItem value="dd" label="'dd' [DVD]">

`dd` is a preinstalled shell command which can copy the contents of your game disc into a file on your computer.

:::danger[Danger – Data loss]

- `dd` is a powerful tool which can easily cause permanent data loss if misused.
- Do not use `dd` without a basic understanding of the macOS shell.
  :::

Once you've placed your game disc into an optical drive and opened Terminal:

1. Run `drutil status`. The "Name" is the path to your DVD drive used in the next step.
2. Run `dd` with the following syntax:
   ```bash
   dd if=[path-to-dvd-drive] of=[path-to-dump].iso status=progress
   ```
3. Wait for the dumping process to complete.

Your game will be in the destination folder you specified, and you can safely remove the game disc from the optical drive.

:::info[Info – `dd` failure]
If your disc is too damaged to read, `dd` will output:

```shell-session
dd: reading '[path-to-drive]': Input/output error
```

:::

<details>
  <summary>Expand to see an example in the command line</summary>
```shell-session
% drutil status
Vendor   Product           Rev
HL-DT-ST DVDRAM GUD0N      FY02

          Type: DVD-ROM                Name: /dev/disk8
      Sessions: 1                    Tracks: 1

Overwritable: 00:00:00 blocks: 0 / 0.00MB / 0.00MiB
Space Free: 00:00:00 blocks: 0 / 0.00MB / 0.00MiB
Space Used: 326:06:30 blocks: 1467488 / 3.00GB / 2.80GiB
Writability:
Book Type: DVD-ROM (v1)

````

```shell-session
% dd if=/dev/disk8 of=./SSX3.iso status=progress
2998321664 bytes (3.0 GB, 2.79 GiB) transferred, 208 s, 14.4 MB/s
5668800+0 records in
5668800+0 records output
3005415424 bytes (3.0 GB, 2.8 GiB) transferred, 208.533 s, 14.4 MB/s
````

</details>

</TabItem>
<TabItem value="cdrdao" label="'cdrdao' [CD]">

`cdrdao` is a free and open-source command line utility which can dump data from CD-ROMs.

:::tip[Tip – Installing `cdrdao`]

- [MacPorts install command](https://ports.macports.org/port/cdrdao/)
- [Homebrew install command](https://formulae.brew.sh/formula/cdrdao)

:::

Once you've placed your game disc into an optical drive and opened Terminal:

1. Run `cdrdao` with the following syntax:
   ```bash
   cdrdao read-cd --read-raw --datafile [dump-name].bin [dump-name].toc
   ```
   :::info[Info – Command breakdown]
   - Reads a CD as 2352-byte blocks (`--read-raw`) from your CD drive using a generic driver.
   - Creates separate `.bin` and `.toc` files which you name by replacing "[dump-name]".
     :::
2. Wait for the dumping process to complete.

The game files will be in the directory where you had Terminal open, and you can safely remove the game disc from the optical drive.

<details>
  <summary>Expand to see an example in the command line</summary>

```shell-session
% cdrdao read-cd --read-raw --datafile Strawberry_Shortcake.bin Strawberry_Shortcake.toc
IOService:/AppleARMPE/arm-io@10F00000/AppleH15IO/usb-drd0@2280000/AppleT8122USBXHCI@00000000/usb-drd0-port-hs@00100000/USB2.0 Hub             @00100000/AppleUSB20Hub@00100000/AppleUSB20HubPort@00110000/MT1887 @00110000/6238--Storage@0/IOUSBMassStorageInterfaceNub/IOUSBMassStorageDriverNub/IOUSBMassStorageDriver/IOSCSILogicalUnitNub@0/IOSCSIPeripheralDeviceType05/IODVDServices: HL-DT-ST DVDRAM AP70NS50    Rev: 1.01
Using driver: Generic SCSI-3/MMC - Version 2.0 (options 0x0000)

Reading toc and track data...

Track   Mode    Flags  Start                Length
------------------------------------------------------------
 1      DATA    4      00:00:00(     0)     50:59:00(229425)
Leadout DATA    4      50:59:00(229425)

PQ sub-channel reading (data track) is supported, data format is BCD.
Raw P-W sub-channel reading (data track) is supported.
Cooked R-W sub-channel reading (data track) is supported.
Copying data track 1 (MODE2_RAW): start 00:00:00, length 50:59:00 to "Strawberry_Shortcake.bin"...
Reading of toc and track data finished successfully.
```

</details>

:::tip[Tip – `.toc` and `.cue` files]

- PCSX2 [does not currently support](https://github.com/PCSX2/pcsx2/issues/4880) reading `.toc` or `.cue` files.
- If you want, you can still convert your `.toc` file to `.cue` by running:

```bash
toc2cue [dump-name].toc [dump-name].cue
```

:::

</TabItem>
</Tabs>
</TabItem>
<TabItem value="linux" label={<span className="tab_header_with_icon"><FaLinux />Linux</span>}>

Disc dumping on Linux can be done using graphical tools like K3b and Brasero or shell commands like `dd` and `cdrdao`.

<Tabs queryString="tool">
<TabItem value="k3b" label="K3b [DVD]" default>

K3b is a free and open-source graphical utility for authoring optical media.

:::tip[Tip – Installing k3b]

<Tabs queryString="distro">
<TabItem value="debian" label={<span className="tab_header_with_icon"><SiDebian />Debian</span>} default>
```bash
sudo apt install k3b
```
</TabItem>
<TabItem value="fedora" label={<span className="tab_header_with_icon"><SiFedora />Fedora</span>}>
```bash
sudo dnf install k3b
```
</TabItem>
<TabItem value="arch" label={<span className="tab_header_with_icon"><SiArchlinux />Arch</span>}>
```bash
sudo pacman -S k3b
```
</TabItem>
<TabItem value="suse" label={<span className="tab_header_with_icon"><SiSuse />SUSE</span>}>
```bash
sudo zypper install k3b
```
</TabItem>
<TabItem value="nixos" label={<span className="tab_header_with_icon"><SiNixos />NixOS</span>}>
```bash
programs.k3b.enable = true;
```
</TabItem>
</Tabs>

Many distros also have a graphical package manager.
:::

Once you've placed your game disc into an optical drive and opened K3b:

1. Click `Copy Medium...`.
2. Make sure your disc is selected as the "Source Medium".
3. Enable the "Only create image" option.
4. Click the "Image" tab.
5. (Optional) Specify a destination folder and name for the dump.
6. Click `Start`.
7. Wait for the dumping process to complete.

Your game will be in the destination folder you specified, and you can safely remove the game disc from the optical drive.

<details>
  <summary>Expand to see a step-by-step visual guide</summary>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Image
      src={require("./img/discs/linux/k3b_landing.webp").default}
      alt="The landing page for the application K3b. A file manager is shown in the top, and near the bottom-right, there is a functionality called Copy Medium..., which is used for the disc dumping process (step 1)."
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Image
        src={require("./img/discs/linux/k3b_options_tab.webp").default}
        alt="The K3b window called Disc Copy on the default tab called Options. At the top of the window, the Source Medium selection is the disc with volume label SSX3 (step 2). Near the bottom of the window, the setting Only create image is checked (step 3). Directly to the right of the Options tab is the Image tab (step 4)."
        />
        <Image
        src={require("./img/discs/linux/k3b_image_tab.webp").default}
        alt="The K3b window called Disc Copy on the tab called Image, where the user can select an output path for the disc dump (step 5). There is a Start button on the bottom-right (step 6)."
        />
      </div>
    <Image
    src={require("./img/discs/linux/k3b_creating_image.webp").default}
    alt="A small window in K3b called Creating Image which shows the directory being written into, the sector size, an estimated time remaining and elapsed time, and two progress bars for the source medium and overall progress (step 7). There is a cancel button in the bottom-right of the window."
    />
  </div>
</details>

</TabItem>
<TabItem value="brasero" label="Brasero [DVD/CD]">

Brasero is a GNOME-exclusive graphical utility for burning and dumping discs.

:::note[Note – Compatibility]
This method will only work on the GNOME desktop environment.
:::

:::tip[Tip – Installing Brasero]

<Tabs queryString="distro">
<TabItem value="debian" label={<span className="tab_header_with_icon"><SiDebian />Debian</span>} default>
```bash
sudo apt install brasero
```
</TabItem>
<TabItem value="fedora" label={<span className="tab_header_with_icon"><SiFedora />Fedora</span>}>
```bash
sudo dnf install brasero
```
</TabItem>
<TabItem value="arch" label={<span className="tab_header_with_icon"><SiArchlinux />Arch</span>}>
```bash
sudo pacman -S brasero
```
</TabItem>
<TabItem value="suse" label={<span className="tab_header_with_icon"><SiSuse />SUSE</span>}>
```bash
sudo zypper install brasero
```
</TabItem>
<TabItem value="nixos" label={<span className="tab_header_with_icon"><SiNixos />NixOS</span>}>
- [MyNixOS page](https://mynixos.com/nixpkgs/package/brasero)
</TabItem>
<TabItem value="flathub" label={<span className="tab_header_with_icon"><SiFlathub />Flathub</span>}>
```bash
flatpak install org.gnome.Brasero
```
</TabItem>
</Tabs>

Many distros also have a graphical package manager.
:::

Once you've placed your game disc into an optical drive and opened Brasero:

1. Click `Disc copy`.
2. Under "Select disc to copy", make sure your disc is selected.
3. Under "Select a disc to write to", select "Image File".
4. (Optional) Click `Properties` to specify a destination folder and file name.
   - (Optional) If burning a CD, under "Disc image type:", select ".cue" rather than ".toc".
5. Click `Create Image`.
6. Wait for the dumping process to complete.

Your game will be in the destination folder you specified, and you can safely remove the game disc from the optical drive.

<details>
  <summary>Expand to see a step-by-step visual guide</summary>
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Image
    src={require("./img/discs/linux/brasero_landing.webp").default}
    alt="A Brasero window shows five options under Create a new project: Audio project, Data project, Video project, Disc copy, and Burn image. Disc copy is highlighted (step 1). To the right of that menu is a list of Recent projects, which reads: No recently used project."
    />
    <Image
    src={require("./img/discs/linux/brasero_copy_cd-dvd.webp").default}
    alt="A window titled Copy CD/DVD has a field at the top named Select disc to copy (step 2). In the example, this is SSX3: 3.0 GB. Beneath that is the field named Select a disc to write to (step 3). In the example, this is Image File: /home/username/Games/Emulation/PlayStation 2/SSX3.iso. Directly to the right of this field is a button labeled Properties (step 4). At the bottom-right of the window are a button labeled Cancel (left) and a button labeled Create Image (right; step 5)."
    />
    <Image
    src={require("./img/discs/linux/brasero_creating_image.webp").default}
    alt="A window titled Creating Image shows the progress of a DVD dump. The titlebar shows the process is 93% done in the example. Under the words Creating image is a thin blue progress bar, beneath which are the words Copying disc on the left and 2687 MiB of 2866 MiB on the right (step 6). Beneath that is an estimated drive speed measured both in KiB/s and constant angular velocity. At the bottom-right of the window is a button labeled Cancel."
    />
  </div>
</details>

</TabItem>
<TabItem value="dd" label="'dd' [DVD]">

`dd` is a preinstalled shell command which can copy the contents of your game disc into a file on your computer.

:::danger[Danger – Data loss]

- `dd` is a powerful tool which can easily cause permanent data loss if misused.
- Do not use `dd` without a basic understanding of the Linux shell.
  :::

Once you've placed your game disc into an optical drive and opened a terminal:

1. To find the path to your DVD drive, run the command `lsblk -f`. This path is usually `/dev/sr0`.
2. Run `dd` with the following syntax:
   ```bash
   dd if=[path-to-drive] of=[path-to-dump].iso status=progress
   ```
3. Wait for the dumping process to complete.

Your game will be in the destination folder you specified, and you can safely remove the game disc from the optical drive.

:::info[Info – `dd` failure]
If your disc is too damaged to read, `dd` will output:

```shell-session
dd: reading '[path-to-drive]': Input/output error
```

:::

<details>
  <summary>Expand to see an example in the command line</summary>

```shell-session
$ lsblk -f
NAME        FSTYPE FSVER LABEL       UUID                                 FSAVAIL FSUSE% MOUNTPOINTS
sda
└─sda1      btrfs        Storage SSD bd4a6ea1-480f-431d-aed7-4d54d612d591
sdb
└─sdb1      btrfs        Storage 2TB 295ab133-77cf-4abc-8ea6-6cac56574c61
sdc
└─sdc1      btrfs        Storage 8TB 0deb9e78-21e1-489a-9bd4-f41b813f712d    3.4T    53% /storage
╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
║ sr0       udf    1.02  SSX3        3830373032333f32                                              ║
╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
nvme0n1
├─nvme0n1p1 vfat   FAT32             B002-7D2F                               1.2G    41% /efi
├─nvme0n1p2 btrfs        endeavouros d419f6e4-5350-4a78-87dd-c18f7a665936    337G    62% /var/log
│                                                                                        /var/cache
│                                                                                        /home
│                                                                                        /
└─nvme0n1p3 swap   1     swap        530b0337-1845-4e1a-8690-8b85c75a0c1e                [SWAP]
```

The line we care about is the one with the _SSX 3_ game disc in `/dev/sr0` (outlined).

```shell-session
$ dd if=/dev/sr0 of=./SSX3.iso status=progress
2998321664 bytes (3.0 GB, 2.79 GiB) copied, 208 s, 14.4 MB/s
5668800+0 records in
5668800+0 records output
3005415424 bytes (3.0 GB, 2.8 GiB) copied, 208.533 s, 14.4 MB/s
```

</details>

</TabItem>
<TabItem value="cdrdao" label="'cdrdao' [CD]">

`cdrdao` is a free and open-source command line utility which can dump data from CD-ROMs.

:::tip[Tip – Installing `cdrdao`]

<Tabs queryString="distro">
<TabItem value="debian" label="Debian" default>
```bash
sudo apt install cdrdao
```
</TabItem>
<TabItem value="fedora" label="Fedora">
```bash
sudo dnf install cdrdao
```
</TabItem>
<TabItem value="arch" label="Arch">
```bash
sudo pacman -S cdrdao
```
</TabItem>
<TabItem value="suse" label="SUSE">
```bash
sudo zypper install cdrdao
```
</TabItem>
<TabItem value="nixos" label="NixOS">
- [MyNixOS page](https://mynixos.com/nixpkgs/package/cdrdao)
</TabItem>
</Tabs>

:::

Once you've placed your game disc into an optical drive and opened a terminal:

1. Run `cdrdao` with the following syntax:
   ```bash
   cdrdao read-cd --read-raw --datafile [dump-name].bin [dump-name].toc
   ```
   :::info[Info – Command breakdown]
   - Reads a CD as 2352-byte blocks (`--read-raw`) from your CD drive using a generic driver.
   - Creates separate `.bin` and `.toc` files which you name by replacing "[dump-name]".
     :::
2. Wait for the dumping process to complete.

Your game will be in the destination folder you specified, and you can safely remove the game disc from the optical drive.

<details>
  <summary>Expand to see an example in the command line</summary>

```shell-session
$ cdrdao read-cd --read-raw --datafile Strawberry_Shortcake.bin Strawberry_Shortcake.toc
/dev/sr0: HL-DT-ST BD-RE  WH16NS40      Rev: 1.05
Using driver: Generic SCSI-3/MMC - Version 2.0 (options 0x0000)

Reading toc and track data...

Track   Mode    Flags  Start                Length
------------------------------------------------------------
 1      DATA    4      00:00:00( 0)         50:59:00(229425)
Leadout DATA    4      50:59:00(229425)

PQ sub-channel reading (data track) is supported, data format is BCD.
Raw P-W sub-channel reading (data track) is supported.
Cooked R-W sub-channel reading (data track) is supported.
Copying data track 1 (MODE2_RAW): start 00:00:00, length 50:59:00 to "Strawberry_Shortcake.bin"...
Reading of toc and track data finished successfully.
```

</details>

:::tip[Tip – `.toc` and `.cue` files]

- PCSX2 [does not currently support](https://github.com/PCSX2/pcsx2/issues/4880) reading `.toc` or `.cue` files.
- If you want, you can still convert your `.toc` file to `.cue` by running:

```bash
toc2cue [dump-name].toc [dump-name].cue
```

:::

</TabItem>
</Tabs>
</TabItem>
</Tabs>

## Footnotes

[^advantages]: Advantages of dumping include no noise from the optical drive, no need for your computer to be connected to an optical drive while playing, no need to physically swap between discs or for them to be physically present, and the ability to curate a games library within PCSX2.

[^format]: This is typically ISO 9660 with UDF 1.02 for DVDs and simply ISO 9660 for CDs.

[^odd]: If you do not own an optical disc drive, the easiest option is to purchase or borrow an external optical drive which connects via USB (typically 15–30 USD). Larger PlayStation 2 games use a dual-layer [DVD-9](https://en.wikipedia.org/wiki/DVD#Capacity) format, which most optical drives manufactured in the last 25 years support.

[^bin-cue]: DVDs are burned to `.iso` files, but because `.iso` files only store one audio track and because CDs use a different size for [data sectors](https://en.wikipedia.org/wiki/Disk_sector), some CD-based games break if they are dumped in this format. Instead, CDs should be dumped to separate `.bin` and `.cue`/`.toc` files. A `.bin` file is the binary, while the `.cue`/`.toc` is a small plaintext file containing audio track metadata. PCSX2 [does not currently support](https://github.com/PCSX2/pcsx2/issues/4880) reading `.cue`/`.toc` files.
