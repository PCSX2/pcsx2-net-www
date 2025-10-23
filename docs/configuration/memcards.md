---
title: "Memory Cards"
date: 2024-03-20
description: "This page helps you create, use, and import data to memory cards."
draft: false
toc: true
sidebar_position: 3
---

This page helps you create, use, and import data to memory cards.

## General

When you first install PCSX2, it comes with two virtual memory cards that you can use right away. You can also create a new one and even delete any of the existing ones.

<Image src={require("./img/memcard.webp").default} />

### Memory Cards Types

There are two types of Memory Cards in PCSX2: File Memory Card and Folder Memory Cards.

<Image src={require("./img/memcard_create.webp").default} />

#### File Memory Card

File Memory Cards are the standard, most compatible memory card type. They are a single `.ps2` file and they store all the save data inside that file for that particular card. They are also available in multiple sizes: 8MB, 16MB, 32MB and 64MB. 8MB is the most compatible option. If you need a bigger card capacity, refer to Folder Memory Card.

#### Folder Memory Card

Folder Memory Cards are a little different from File Memory Cards. Instead of storing all the save data inside a single monolithic `.ps2` file, they store all saves data inside a folder on the host's file system.

The benefits of this are:

- Infinite Capacity
- Easier to copy the save data out of the card
- Easier to delete a specific save data on that card

Keep in mind that save data in a Folder Memory Card is isolated; this means that you can't manage your save data using the PS2 BIOS directly because the game's save data won't show up.

To be able to manage your save data through the BIOS, you must go into the BIOS's Browser menu and then do a disc change through `System -> Change Disc` and selecting the game that you want to manage the data with.

:::warning
Using Folder Memory Cards is not without caveats. Some games aren't compatible with Folder Memory Cards.
:::

<Image src={require("./img/memcard_folder.webp").default} />

## Importing Save Data

Most save files for PlayStation 2 games during the console's lifecycle were extracted from consoles using the various cheat devices which were sold at the time. Some examples are Action Replay Max, Code Breaker, and GameShark. However, because these companies were competing and did not want any other companies to be able to use saves extracted with their devices, the saves were repackaged into proprietary formats and encrypted. To use these save files on PCSX2, they must be decrypted and unpackaged by specialized software.

### What is MyMC?

MyMC is software designed to interact with PlayStation 2 memory card images (.ps2) as are used by PCSX2. It allows you to add, remove, and export save data.

Multiple versions of MyMC have been created over the years. The first release of MyMC was by Ross Ridge, who is responsible for documenting a substantial amount of information on PS2 memory cards. Subsequent updates have been made by other authors, porting the program to a native Python app, and adding support for newer container formats.

#### MyMC by Ross Ridge

Ross Ridge's original MyMC program works without issue on Windows 10 and newer and is a Windows-exclusive program. However, it predates the wide availability of PSV files – the format used to extract PS2 saves from a PS3 – and does not have support for these. For non-advanced users on Windows, this is probably the most straightforward version to run, as it is a basic Windows `.exe` file.

#### MyMC+ Python port by thestr4ng3r

A Python 3 native port was created by thestr4ng3r which made some adjustments and added some additional features, most notably PSV support. While this version is cross-platform and more feature-complete, we generally feel it has been obsoleted due to some compatibility issues it had with Python libraries such as wxPython, and it has been improved upon by a newer release. We generally recommend not using this version, but it is important to remember it as a stepping stone for the latest revision.

#### MyMC++ Python port by Adubbz

A second Python 3 native port is currently our recommended choice for advanced users. This version brings in the improvements from MyMC+ such as cross-platform support and PSV support, adds additional usability improvements, and reliably runs on the latest versions of Python 3. This version also adds support for adding save files to the .mc2 memory card format used by the MemCard PRO2.

### Using MyMC

#### Prerequisites

[The Windows Visual C++ 2008 Runtime (x86) is required](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist#visual-studio-2008-vc-90-sp1-no-longer-supported)

:::info
The x64 version will not work; you must install the x86 version if you do not have it already.
:::

#### Download MyMC

MyMC is a portable program and does not "install". [You can find the original MyMC here](http://www.csclub.uwaterloo.ca:11068/mymc/)

Download the `mymc-alpha-2.7.zip` file and extract it to a folder of your choice. Launch MyMC by running `mymc-gui.exe`.

### Using MyMC++

#### Prerequisites

Windows and MacOS users will need to install the [latest version of Python from here.](https://www.python.org/downloads/)

:::caution
While going through the installer, make sure to check the box to add Python to your PATH. You may need to reboot your PC after installing to ensure your PATH variable is set properly; more on this later.

<Image src={require("./img/memcard_python_path.webp").default} />
:::

:::tip
Most Linux distributions come bundled with Python 3 already installed. If your distribution does not include Python 3, you should try first to install it using your distribution's package manager.
:::

#### Download MyMC++

Once Python 3 is installed, you can use its package management command `pip` to automatically download and install MyMC++ for you. Open a command shell and run the following command:

```sh
pip install mymcplusplus[gui]
```

:::caution
When running this command, do not run the `python` command or enter this into a Python shell. Enter this command directly into your operating system's command shell. For Windows users, enter this directly into Command Prompt or Powershell. For Linux and MacOS users, enter this directly into your terminal.
:::

:::tip
It is recommended that you use `pipx` to install MyMC++ as recent python versions have implemented externally managed environments, which forces you to first manually setup a virtual environment before you can start installing MyMC++. `pipx` will handle all of the process automatically.
:::

If the above command fails saying that `pip` is an unrecognized command, you have not properly added Python to your PATH variable. Try rebooting first. If the command still fails, look up a guide for how to add Python to your operating system's PATH variable.

Once `pip` finishes running, you can then run the following command from your operating system's command shell to launch MyMC++:

```sh
mymcplusplus
```

Windows users can optionally type this command into their start menu, and Windows will suggest launching the program there. On any operating system, you can also create a shortcut and set this command as the target. Either of these methods will avoid needing to open a command shell to launch MyMC++.

### Opening a memory card

When launched, all versions of MyMC will prompt you to select a memory card. Browse your computer to find the memory card file you want to modify.

If you do not know where to find your memory cards, you can use `Tools > Open Data Directory` or `Settings > Memory Cards > Browse` in PCSX2 to quickly jump to the folder which contains them. The default folder name is `memcards`, and your individual memory card files will have `.ps2` file extensions.

<Image src={require("./img/data_directory.webp").default} />

After opening, MyMC will populate a table with each game entry in your memory card. Some games which use multiple directory entries will show up as multiple rows; this is the same as how these games will show multiple files when viewed in your PS2 BIOS.

<Image src={require("./img/mymcplusplus.webp").default} />

### Adding save files

To import a save file, click the button which shows an arrow pointing into a memory card. A browser window will pop open and have you navigate to the save file you wish to add. The browser will be filtered to only supported file types such as `.max` (Action Replay Max) and `.cbs` (Code Breaker) among others. Select your save file to import. Once you confirm the selection in the browser, the save file is immediately added to the memory card; you do not need to save the memory card.

:::info
If your save file is not showing, you can try to switch the filter from Supported Types to All Files. However, if you select an unsupported file type, it will produce an error.
:::

### Removing save files

You can remove a save file from your memory card by selecting it in the table, then hitting `File > Delete`.

:::warning
This action is permanent and applies immediately. It cannot be undone.
:::

### Exporting save files

You can export a save file to `.psu` or `.max` formats. The use of this function is to make a copy of your save file separate from your memory card, which you or someone else could then import into another memory card. Select the save file you wish to export in the table, then hit the icon with an arrow leaving the memory card. You will be prompted to give a name to the exported file.

:::info
Exporting does not remove the save file from your memory card.
:::
