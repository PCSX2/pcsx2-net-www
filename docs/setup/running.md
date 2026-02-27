---
date: 2025-09-25
description: "This page helps you download and run PCSX2."
draft: false
sidebar_position: 4
title: "Running PCSX2"
toc: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { AiFillPicture } from "react-icons/ai";
import { BsWindows, BsApple } from "react-icons/bs";
import { FaLinux, FaArchive } from "react-icons/fa";
import { FaGear, FaTerminal } from "react-icons/fa6";
import { MdInstallDesktop } from "react-icons/md";
import { SiFlathub, SiKdeplasma, SiGnome, SiCinnamon } from "react-icons/si";

This page helps you download and run PCSX2. PCSX2 is offered both as a Stable build which is updated every several months and as a Nightly build which is updated continually as PCSX2 is developed.

:::info[Info – Stable and nightly builds]
Use the Stable build if you:

- Do not want to be prompted for updates.
- Use an operating system which is rarely updated.
- Want minimal risk of [regressions](https://en.wikipedia.org/wiki/Software_regression).

Use the Nightly build if you:

- Want improvements as soon as they're released.
- Need to ask the team for support.
- Wish to contribute to PCSX2.
  :::

## Downloading and Running

<Tabs queryString="os">
<TabItem value="windows" label={<span className="tab_header_with_icon"><BsWindows />Windows</span>} default>

PCSX2 on Windows can be used either as an installation (Stable only) or as a portable program (Stable and Nightly). The installer is more streamlined, while the portable version gives you more flexibility.

:::note[Note – Visual C++]
PCSX2 on Windows requires that you have the [latest x64 Visual C++ runtime](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?#latest-microsoft-visual-c-redistributable-version) installed.
:::

<Tabs queryString="format">
<TabItem value="installer" label={<span className="tab_header_with_icon"><MdInstallDesktop />Installer</span>} default>
- Download the latest PCSX2 build for Windows from the [Download page](https://pcsx2.net/downloads).
- Double-click the `.exe` file which you downloaded.
- Windows will ask if you want to run this program. Click "Yes".
- Follow the instructions in the setup wizard, and you are ready to play!
  <Image
  src={require("./img/running/wizard_windows.webp").default}
  alt="The first page of the PCSX2 setup wizard on Windows 11, headlined, Welcome to PCSX2!. The options shown are Language, Theme, and Enable Automatic Updates."
  />

:::tip[Tip – Uninstalling]
If you need to uninstall PCSX2, follow [this guide from Microsoft](https://support.microsoft.com/en-us/windows/uninstall-or-remove-apps-and-programs-in-windows-4b55f974-2cc6-2d2b-d092-5905080eaf98) for uninstalling programs.
:::

</TabItem>
<TabItem value="portable" label={<span className="tab_header_with_icon"><FaArchive />Portable</span>}>

- Download the latest PCSX2 build for Windows from the [Download page](https://pcsx2.net/downloads).
  - The portable version will be called "Download".
- Use [7-Zip](https://www.7-zip.org/download.html) to extract the `.7z` archive.
  - Install 7-Zip.
  - Right-click on the archive.
  - Find the entry for 7-Zip.
  - Click `Extract to "[archive name]\"` to extract PCSX2 into its own folder.
    <Image
    src={require("./img/running/7-zip_extract.webp").default}
    alt="The 7-Zip submenu in the Windows 11 right-click menu. Highlighted is the option Extract to pcsx2-v2.4.0-windows-x64-Qt\."
    />
- Double-click the `pcsx2-qt` executable file to open PCSX2.
  <Image
  src={require("./img/running/pcsx2-qt-exe.webp").default}
  alt="Windows File Explorer opened to the extracted contents of a PCSX2 download. The application file named pcsx2-qt is highlighted."
  />
- Windows will ask if you want to run this program. Click "Yes".
- Follow the setup wizard, and you are ready to play!
  <Image
  src={require("./img/running/wizard_windows.webp").default}
  alt="The first page of the PCSX2 setup wizard on Windows 11, headlined, Welcome to PCSX2!. The options shown are Language, Theme, and Enable Automatic Updates."
  />

:::tip[Tip – Portability and extraction]

- If you want PCSX2 to save its data files to this extracted folder instead of the default (`Documents`), create a blank file in the folder named `portable.ini` or `portable.txt`.
- On Windows 11 version 23H2 or later, you can extract 7-Zip archives natively without installing 7-Zip by clicking `Extract All...`.
  :::

</TabItem>
</Tabs>

:::note[Note – FFmpeg libraries]

- PCSX2 requires additional [FFmpeg](https://en.wikipedia.org/wiki/FFmpeg) libraries if you wish to use its built-in video capture.
  - Download the FFmpeg Windows files [here](https://github.com/PCSX2/pcsx2-windows-dependencies/releases/tag/FFMPEG).
  - Extract the contents of the `.7z` file.
  - Place the extracted `.dll` files in the same folder as the PCSX2 `.exe` file.

<details>
  <summary>Expand to see FFmpeg compatibility with your PCSX2 version</summary>
  | FFmpeg Version | Compatible PCSX2 Versions | Direct Download  |
  | :--------------| :--------------------------|:-----------------:|
  | v8.0           | ≥ v2.5.142                 | <a href="https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-8.0.7z">📁</a> |
  | v7.0.2         | v2.1.138 – v2.5.141        | <a href="https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-7.0.2.7z">📁</a>
  | v6.0.7         | v1.7.4585 – v2.1.137       | <a href="https://github.com/PCSX2/pcsx2-windows-dependencies/releases/download/FFMPEG/ffmpeglibs-6.0.7.7z">📁</a>
</details>
        :::

</TabItem>
<TabItem value="macos" label={<span className="tab_header_with_icon"><BsApple />macOS</span>}>

PCSX2 on macOS is distributed as an application bundle.

- Download the latest PCSX2 build for macOS from the [Download page](https://pcsx2.net/downloads).
- In Finder, double-click the `.tar.xz` archive you downloaded to extract the bundle.
- Drag the extracted bundle into the `Applications` folder.
  <Image
  src={require("./img/running/finder_applications_folder_macos.webp").default}
  alt="The macOS file manager Finder is opened to the Downloads folder, which contains a PCSX2 application bundle. An arrow points from the PCSX2 application bundle in the Downloads folder to the Applications folder in the left-hand sidebar, indicating the former should be dragged and dropped into the latter. The right-hand side of the window shows information about the application bundle, including its version and size."
  />
- Open PCSX2 through the `Applications` folder, Launchpad, or Terminal.
  - If macOS prompts you to [install Rosetta](https://support.apple.com/en-us/102527), click `Install`.
- Follow the instructions in the setup wizard, and you are ready to play!
  <Image
  src={require("./img/running/wizard_macos.webp").default}
  alt="The first page of the PCSX2 setup wizard on macOS 15, headlined, Welcome to PCSX2!. The options shown are Language, Theme, and Enable Automatic Updates."
  />

:::tip[Tip – Application name]
PCSX2's application name will change to reflect version updates. If you don't want the name to change during updates, rename the application to remove the version number.
:::

</TabItem>
<TabItem value="linux" label={<span className="tab_header_with_icon"><FaLinux />Linux</span>}>

PCSX2 on Linux is officially supported through an AppImage version and a Flatpak version.

<Tabs queryString="format">
<TabItem value="appimage" label={<span className="tab_header_with_icon"><FaGear />AppImage</span>} default>

- Download the latest PCSX2 AppImage build from the [Download page](https://pcsx2.net/downloads).
- You may need to make the AppImage file executable.
  - To do this in the shell, run:
    ```bash
    chmod +x [path-to-AppImage-file]
    ```
  - Doing this graphically in your file manager varies by distro, but generally:
    - Right-click on the AppImage.
    - Click `Properties`.
    - Find and check a box marking the file as executable.
    <details>
      <summary>Expand to see examples in different file managers</summary>
      <Tabs queryString="environment">
      <TabItem value="kde" label={<span className="tab_header_with_icon"><SiKdeplasma />KDE – Dolphin</span>} default>
        <Image
        src={require("./img/running/mark_executable_kde.webp").default}
        alt="The KDE properties window for PCSX2.AppImage. The option Allow executing file as program is toggled on."
        />
      </TabItem>
      <TabItem value="gnome" label={<span className="tab_header_with_icon"><SiGnome />GNOME – Files</span>}>
        <Image
        src={require("./img/running/mark_executable_gnome.webp").default}
        alt="The GNOME properties window for PCSX2.AppImage. The option Executable as Program is toggled on."
        />
      </TabItem>
      <TabItem value="cinnamon" label={<span className="tab_header_with_icon"><SiCinnamon />Cinnamon – Nemo</span>}>
        <Image
        src={require("./img/running/mark_executable_cinnamon.webp").default}
        alt="The Cinnamon properties window for PCSX2.AppImage. The option Allow executing file as program is toggled on."
        />
      </TabItem>
      </Tabs>
    </details>
- Open the AppImage by double-clicking it or by executing it through the terminal.
- Follow the instructions in the setup wizard, and you are ready to play!
  <Image
  src={require("./img/running/wizard_linux.webp").default}
  alt="The first page of the PCSX2 setup wizard on KDE Plasma 6, headlined, Welcome to PCSX2!. The options shown are Language, Theme, and Enable Automatic Updates."
  />

</TabItem>
<TabItem value="flatpak" label={<span className="tab_header_with_icon"><SiFlathub />Flatpak</span>}>

PCSX2 is available on [Flathub](https://flathub.org/apps/net.pcsx2.PCSX2)! You can install PCSX2 from Flathub through one of several compatible graphical package managers or through the shell.

:::caution[Caution – Flatpak issues]

- Due to limitations of the [Portal API](https://docs.flatpak.org/en/latest/portal-api-reference.html) for sandboxing, the Flatpak version sometimes has bugs not present in the AppImage version.
- These issues are usually related to accessing files.
  :::

<Tabs queryString="interface">
<TabItem value="graphical" label={<span className="tab_header_with_icon"><AiFillPicture />Graphical</span>} default>

Many distributions and desktop environments have a graphical package manager which can install and update Flatpak applications. [These include](https://flatpak.org/setup/):

- KDE Plasma's Discover
- GNOME Software
- Linux Mint's Software Manager
- Manjaro's pamac
- Pop!\_OS' Repoman
- elementary OS' AppCenter
- Bazaar (e.g. on Bazzite)

Once you've installed PCSX2 using one of these, it should be in your list of applications. Open PCSX2, follow the setup wizard, and you are ready to play! You can use this package manager to keep PCSX2 updated in the future.

<Image
src={require("./img/running/wizard_linux.webp").default}
alt="The first page of the PCSX2 setup wizard on KDE Plasma 6, headlined, Welcome to PCSX2!. The options shown are Language, Theme, and Enable Automatic Updates."
/>

</TabItem>
<TabItem value="shell" label={<span className="tab_header_with_icon"><FaTerminal />Shell</span>}>

In the terminal:

1.  a. For the Stable branch, run:
    ```bash
    flatpak install net.pcsx2.PCSX2
    ```
    b. For the Nightly branch, run:
    ```bash
    flatpak install https://flathub.org/beta-repo/appstream/net.pcsx2.PCSX2.flatpakref
    ```
2.  Flatpak will ask if you would like to proceed. Type `y` and press `Enter`.
3.  To start PCSX2, run:
    ```bash
    flatpak run net.pcsx2.PCSX2
    ```
4.  Follow the setup wizard, and you are ready to play!
    <Image
    src={require("./img/running/wizard_linux.webp").default}
    alt="The first page of the PCSX2 setup wizard on KDE Plasma 6, headlined, Welcome to PCSX2!. The options shown are Language, Theme, and Enable Automatic Updates."
    />

<details>
 <summary>Expand to see an example in the command line</summary>
 <p>Stable branch:</p>
  ```shell-session
  $ flatpak install net.pcsx2.PCSX2
  Looking for matches…
  
  net.pcsx2.PCSX2 permissions:
      ipc       network       fallback-x11       pulseaudio
      wayland   x11           devices            file access [1]
      dbus access [2]
  
      [1] xdg-config/kdeglobals:ro
      [2] com.canonical.AppMenu.Registrar, org.freedesktop.ScreenSaver,
          org.kde.KGlobalSettings, org.kde.kconfig.notify, org.kde.kdeconnect
  
          ID                     Branch         Op          Remote          Download
   1. [✓] net.pcsx2.PCSX2        stable         i           flathub         31.6 MB / 38.4 MB
  
  Proceed with these changes to the system installation? [Y/n]: y
  
  Installing… ████████████████████ 100%  31.6 MB/s
  Installation complete.
  
  $ flatpak run net.pcsx2.PCSX2
  [    0.1094] Loaded translation file for language en-US
  [    0.1103] PCSX2 v2.4.0
  [    0.1103] Savestate version: 0x9a540000
  
  ...
  ```
  <p>Nightly branch:</p>
  ```shell-session
  $ flatpak install https://flathub.org/beta-repo/appstream/net.pcsx2.PCSX2.flatpakref
  
  net.pcsx2.PCSX2 permissions:
      ipc       network       fallback-x11       pulseaudio
      wayland   x11           devices            file access [1]
      dbus access [2]
  
      [1] xdg-config/kdeglobals:ro
      [2] com.canonical.AppMenu.Registrar, org.freedesktop.ScreenSaver,
          org.kde.KGlobalSettings, org.kde.kconfig.notify, org.kde.kdeconnect
  
          ID                     Branch         Op          Remote          Download
   1. [✓] net.pcsx2.PCSX2        beta           i           flathub-beta    37.3 MB / 46.5 MB
  
  Proceed with these changes to the system installation? [Y/n]: y
  
  Installing… ████████████████████ 100%  18.7 MB/s
  Installation complete.
  
  $ flatpak run net.pcsx2.PCSX2
  [    0.1332] Loaded translation file for language en-US
  [    0.1342] PCSX2 v2.5.162
  [    0.1343] Savestate version: 0x9a540000
  
  ...
  ```
</details>
</TabItem>
</Tabs>

:::tip[Tip – Flatpak download]

- The Flatpak version is also available for [direct download](https://pcsx2.net/downloads).
- To install it, download the Flatpak file and, in the shell, run:
  ```bash
  flatpak install [path-to-Flatpak-file]
  ```
- Installing directly from Flathub instead as described above is recommended for most Flatpak users.
  :::

</TabItem>
</Tabs>
</TabItem>
</Tabs>

## Building From Source

PCSX2 can also be built from source on your computer. This option is not recommended for novice users.

- [Building on Windows](../advanced/building.md#building-on-windows)
- [Building on macOS](../advanced/building.md#building-on-macos)
- [Build on Linux](../advanced/building.md#building-on-linux)
