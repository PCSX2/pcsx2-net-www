---
title: "Memory Cards"
date: 2024-03-20
summary: "This guides shows you how to import save data to your virtual memory card"
draft: false
toc: true
sidebar_position: 4
---

This section shows you how to import save data to your virtual memory card

## General

Most save files for PlayStation 2 games during the console's lifecycle were extracted from consoles using the various cheat devices which were sold at the time. Some examples are Action Replay Max, Code Breaker, and GameShark. However, because these companies were competing and did not want any other companies to be able to use saves extracted with their devices, the saves were repackaged into proprietary formats and encrypted. To use these save files on PCSX2, they must be decrypted and unpackaged by specialized software.

## What is MyMC?

MyMC is software designed to interact with PlayStation 2 memory card images (.ps2) as was used by PCSX2. It allows you to add, remove, as well as export save data.

Multiple versions of MyMC have been created over the years. The first release of MyMC was by Ross Ridge, who is responsible for documenting a substantial amount of information on PS2 memory cards. Subsequent updates have been made by other authors, porting the program to a native Python app, and adding support for newer container formats.

### MyMC by Ross Ridge

Ross Ridge's original MyMC program works without issue on Windows 10 and newer and is a Windows-exclusive program. However, it predates the wide availability of PSV files – the format used to extract PS2 saves from a PS3 – and does not have support for these. For non-advanced users on Windows, this is probably the most straightforward version to run, as it is a basic Windows `.exe` file.

### MyMC+ Python port by thestr4ng3r

A Python 3 native port was created by thestr4ng3r which made some adjustments and added some additional features, most notably PSV support. While this version is cross-platform and more feature-complete, we generally feel it has been obsoleted due to some compatibility issues it had with Python libraries such as wxPython, and it has been improved upon by a newer release. We generally recommend not using this version, but it is important to remember it as a stepping stone for the latest revision.

### MyMC++ Python port by Adubbz

A second Python 3 native port is currently our recommended choice for users who understand how to follow more detailed setup instructions. This version brings in the improvements from MyMC+ such as cross-platform support and PSV support, adds additional usability improvements, and reliably runs on the latest versions of Python 3. This version also adds support for adding save files to the .mc2 memory card format used by the MemCard PRO2.

## Using MyMC

### Prerequisites

[The Windows Visual C++ 2008 Runtime (x86) is required](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist#visual-studio-2008-vc-90-sp1-no-longer-supported)

:::info
The x64 version will not work; you must install the x86 version if you do not have it already.
:::

### Download MyMC

MyMC is a portable program and does not "install". [You can find the original MyMC here](http://www.csclub.uwaterloo.ca:11068/mymc/)

Download the `mymc-alpha-2.7.zip` file and extract it to a folder of your choice. Launch MyMC by running `mymc-gui.exe`.

## Using MyMC++

### Prerequisites

Windows and MacOS users will need to install the [latest version of Python from here.](https://www.python.org/downloads/)

:::caution
While going through the installer, make sure to check the box to add Python to your PATH. You may need to reboot your PC after installing to ensure your PATH variable is set properly; more on this later.

<Image src={require("./img/memcard_python_path.webp").default} />
:::

:::tip
Most Linux distributions come bundled with Python 3 already installed. If your distribution does not include Python 3, you should try first to install it using your distribution's package manager.

It is also recommended that you use `pipx` to install MyMC++ as recent Python version have implemented externally managed environment, which forces you to first manually setup a virtual environment before you can start installing MyMC++. `pipx` will handle all of the process automatically.
:::

### Download MyMC++

Once Python 3 is installed, you can use its package management command `pip` to automatically download and install MyMC++ for you. Open a command shell and run the following command:

:::caution
When running this command, do not run the `python` command or enter this into a Python shell. Enter this command directly into your operating system's command shell. For Windows users, enter this directly into Command Prompt or Powershell. For Linux and MacOS users, enter this directly into your terminal.
:::

```sh
pip install mymcplusplus[gui]
```

If the above command fails saying that `pip` is an unrecognized command, you have not properly added Python to your PATH variable. Try rebooting first. If the command still fails, look up a guide for how to add Python to your operating system's PATH variable.

Once `pip` finishes running, you can then run the following command from your operating system's command shell to launch MyMC++:

Windows users can optionally type this command into their start menu, and Windows will suggest launching the program there. On any operating system, you can also create a shortcut and set this command as the target. Either of these methods will avoid needing to open a command shell to launch MyMC++.

```sh
mymcplusplus
```

## Opening a memory card

When launched, all versions of MyMC will prompt you to select a memory card. Browse your computer to find the memory card file you want to modify.

If you do not know where to find your memory cards, you can use `Tools > Open Data Directory` or `Settings > Memory Cards > Browse` in PCSX2 to quickly jump to the folder which contains them. The default folder name is `memcards`, and your individual memory card files will have `.ps2` file extensions.

<Image src={require("./img/data_directory.webp").default} />

After opening, MyMC will populate a table with each game entry in your memory card. Some games which use multiple directory entries will show up as multiple rows; this is the same as how these games will show multiple files when viewed in your PS2 BIOS.

<Image src={require("./img/mymcplusplus.webp").default} />

## Adding save files

To import a save file, click the button which shows an arrow pointing into a memory card. A browser window will pop open and have you navigate to the save file you wish to add. The browser will be filtered to only supported file types such as `.max` (Action Replay Max) and `.cbs` (Code Breaker) among others. Select your save file to import. Once you confirm the selection in the browser, the save file is immediately added to the memory card; you do not need to save the memory card.

:::info
If your save file is not showing, you can try to switch the filter from Supported Types to All Files. However, if you select an unsupported file type, it will produce an error.
:::

## Removing save files

You can remove a save file from your memory card by selecting it in the table, then hitting `File > Delete`.

:::warning
This action is permanent and applies immediately. It cannot be undone.
:::

## Exporting save files

You can export a save file to `.psu` or `.max` formats. The use of this function is to make a copy of your save file separate from your memory card, which you or someone else could then import into another memory card. Select the save file you wish to export in the table, then hit the icon with an arrow leaving the memory card. You will be prompted to give a name to the exported file.

:::info
Exporting does not remove the save file from your memory card.
:::
