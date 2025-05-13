---
title: "Linux Setup"
summary: "Steps on how to install and run PCSX2 on Linux"
draft: false
toc: true
sidebar_position: 5
---

This section will help you through the process of setting up PCSX2 on Linux.

:::tip
PCSX2 on Linux is officially supported with an AppImage and a Flatpak. PCSX2 is offered as both a Stable build (updated every several months) and as a Nightly build (updated as PCSX2 is developed).
:::

## AppImage

- Head over to the [download page](https://pcsx2.net/downloads) and grab the latest AppImage build.
- You will likely have to make the AppImage file executable. There are a few ways to do this:
  - Right-click on the AppImage, choose properties, then find the option to mark as executable.
    - This will vary between distros (below is an example for KDE Plasma).
      <Image src={require("./img/executable.webp").default} />
  - Or in a terminal, run `chmod +x <path-to-AppImage-file>`
    <Image src={require("./img/chmod.webp").default} />
- You should be able to open the file by double-clicking it or by running it through the terminal.
- Follow the setup wizard, and you are ready to play!

## Flatpak

- PCSX2 is available on [Flathub](appstream:net.pcsx2.PCSX2)!
- In order to install PCSX2 from Flathub using the command line, open the terminal and type `flatpak install net.pcsx2.PCSX2`.

  - Typing `flatpak install pcsx2` should find this same reference.
  - When asked if you want to proceed, type `Y` and press Enter.
  - PCSX2 is now installed on your machine!

  <Image src={require("./img/flatpakinstall.webp").default} />

- Some distributions and desktop environments have a graphical package manager which can also install Flatpak applications.

  - These include:
    - KDE Plasma's Discover
    - GNOME Software
    - Linux Mint's Software Manager
    - Manjaro's pamac
    - Pop!\_OS' Repoman

- In order to update PCSX2 in the future, you can type `flatpak update`, which will update all of your out-of-date Flatpak applications.

  - If you want to exclusively update PCSX2, you can type `flatpak update net.pcsx2.PCSX2`.
  - You will be asked if you would like to proceed. Type `Y` and press Enter.

- Follow the setup wizard, and you are ready to play!

:::note
The Flatpak is also available for [direct download](https://pcsx2.net/downloads). To install it, download the Flatpak file and type `flatpak install <path-to-Flatpak-file>` in the terminal. Downloading from Flathub as described previously is recommended for most Flatpak users.
:::

## Build from source (Advanced users)

:::tip
For details on building PCSX2 from source, check out the [Building PCSX2 page](../advanced/building.md#building-on-linux)
:::
