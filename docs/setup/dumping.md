---
title: "Dumping Discs"
summary: "Steps on how to dump your PS2 discs"
draft: false
toc: true
sidebar_position: 3
---

This section will help you make a backup of your physical game disc to be used on PCSX2.

:::info
PlayStation 2 game discs are unencrypted DVDs and CDs. This means they can be dumped quickly using disc ripping software and a standard optical drive that supports DVD and CD optical media. Dumping discs does not harm optical media directly.
:::

:::tip
The lower the drive speed of the optical drive the more likely you are to get a good dump of the disc. The fastest drive speed will take much less time, but may be incomplete, corrupted, or inaccurate. It could also be perfectly fine, so depending on your drive and your media, try different things and see what works best for you.
:::

## Dumping disc on Windows

### Using ImgBurn

#### Where to get ImgBurn

- We recommend getting ImgBurn via [Ninite](https://ninite.com/imgburn) because the download from the official site **comes with adware in the installer that must be manually unchecked during the install**.

#### How to use it

- Install and run ImgBurn
- Put your game disc into an optical drive
- Choose the "Create an image file from disc" option inside ImgBurn (highlighted in screenshot below)

<Image src={require("./img/imgburn_main.webp").default} />

On the disc dumping screen:

1. Determine the location of the resulting ISO
2. Press to start the disc dumping process

<Image src={require("./img/imgburn_setting.webp").default} />

Wait for the dumping process to complete. Depending on the game size, this will take some time.

<Image src={require("./img/imgburn_dump.webp").default} />

### Alternative: Using MPF (more advanced)

Media Preservation Frontend (MPF) is a GUI for several applications aimed at preserving optical media. It can be a bit more involved for non-PlayStation disc dumping, but it's fairly simple for PS1 and PS2.

#### Where to get MPF

[MPF's GitHub repo](https://github.com/SabreTools/MPF)

This tool is currently only available on Windows, but Linux support may be added in the future. The command-line tools that are used for the backend of this tool are all free, open-source, and available on all major operating systems.

#### How to use it

- Extract and run MPF
- Put your game disc into an optical drive
- Select PS2 for system/media type
- Select whether it is a CD-ROM PS2 game or DVD-ROM PS2 game
- Select output file name and directory
- Select the appropriate drive letter for the drive with the optical media in it
- Select "Start dumping"

<Image src={require("./img/MPF.webp").default} />

## Dumping disc on Linux

### Using K3b

- You will need to install K3b first. This process will vary by distro, but here are a few examples:
  - Ubuntu: `sudo apt install k3b`
  - Fedora: `sudo dnf install k3b`
  - Arch Linux: `sudo pacman -S k3b`
  - Many distros have a graphical package manager as well.
- Put your game disc into an optical drive
- Open K3b
- Click on Copy Medium.
  <Image src={require("./img/k3b.webp").default} />
- Make sure your disc is selected and enable the "Only create image" option
  <Image src={require("./img/k3b_source.webp").default} />
- Go to the Image tab and determine the destination folder for the dump
  <Image src={require("./img/k3b_name.webp").default} />
- Click on Start and wait for the dumping process to complete. Depending on the game size, this will take some time

<Image src={require("./img/k3b_dumping.webp").default} />

### Using DD (more advanced)

:::caution
DD can cause data loss if not used carefully.
You will also need a basic understanding of the Linux terminal.
:::

#### Figuring out the DVD drive location

You will need to figure out the location of your DVD drive first. We will use `lsblk` for that:

- Open a terminal and run the `lsblk -f` command.
- This will show the list of all drives that are recognized by Linux:
  <Image src={require("./img/lsblk.webp").default} />

:::tip
CD and DVD drives on Linux are usually located either in `/dev/cdrom0` or `/dev/sr0` respectively.  
:::

We have now identified the location of our DVD drive, in our example it is in `/dev/sr0`

#### Dumping the disc

- Run `dd` with the following Syntax:

```bash
dd if=[DRIVE_NAME] of=./[IMAGE_NAME].iso status=progress

WHERE:
[DRIVE_NAME] = DVD Drive location (/dev/sr0).
[IMAGE_NAME] = The name for the ISO.

NOTE: DO NOT include the brackets
```

- An example of a complete command:

```bash
dd if=/dev/sr0 of=./GT3.iso status=progress
```

- This will dump the disc into the current directory

Now wait until the dumping process is completed.

<Image src={require("./img/dd_dump.webp").default} />
