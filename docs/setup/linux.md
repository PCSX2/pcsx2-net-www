---
title: "Linux Setup"
date: 2024-03-20
summary: "Steps on how to install and run PCSX2 on Linux"
draft: false
toc: true
sidebar_position: 5
---

This section will help you through the process of setting up PCSX2 on Linux.

## AppImage

- Head over to the [download page](https://pcsx2.net/downloads) and grab the latest Nightly AppImage build.
- You will likely have to make the AppImage file executable. There are a few ways to do this:
  - Right-click on the AppImage, choose properties, then find the option to mark as executable.
    - This will varies from distros to distros (Below is an example for KDE Plasma).
      <Image src={require("./img/executable.webp").default} />
  - Or in a terminal, run `chmod +x <path-to-AppImage-file>`
    <Image src={require("./img/chmod.webp").default} />
- You should be able to open the file by double-clicking it or by running it through terminal.

## Flatpak

- PCSX2 is also available on [Flatpak](appstream:net.pcsx2.PCSX2)!
- In order to install PCSX2 from Flatpak using the command line, open the terminal and type `flatpak install net.pcsx2.PCSX2`.

  - Typing `flatpak install pcsx2` should find this same reference.
  - When asked if you want to proceed, type `Y` and press Enter.
  - PCSX2 is now installed on your machine!

  <Image src={require("./img/flatpakinstall.webp").default} />

- Some distributions and desktop environments have a visual software manager which can also install Flatpak applications.

  - These include:
    - KDE Plasma's Discover
    - GNOME Software
    - Linux Mint's Software Manager
    - Manjaro's pamac
    - Pop!\_OS' Repoman

- In order to update PCSX2 in the future, you can type `flatpak update`, which will update all of your out-of-date Flatpak applications.

  - If you want to exclusively update PCSX2, you can type `flatpak update net.pcsx2.PCSX2`.
  - You will be asked if you would like to proceed. Type `Y` and press Enter.

- That's all there is to it!

## Build from source (Advanced users)

:::tip
For more details on building from source for Linux (or even Windows), check out our [GitHub Wiki](https://github.com/PCSX2/pcsx2/wiki/10-Building-on-Linux).
:::
