---
title: "Linux Setup"
date: 2023-08-02
summary: "Steps on how to gather required files for you to be able to use PCSX2"
draft: false
toc: true
sidebar_position: 4
---

- Head over to the [download page](https://pcsx2.net/downloads) and grab the latest Nightly AppImage build.
- You will likely have to make the AppImage file executable. There are a few ways to do this:
  - Right-click on the AppImage, choose properties, then find the option to mark as executable.
    - This will varies from distros distros (Below is an example for KDE Plasma).
      <Image cols={8} src={require("./img/executable.webp").default} />
  - Or in a terminal, run `chmod +x <path-to-AppImage-file>`
    <Image cols={8} src={require("./img/chmod.webp").default} />
- You should be able to open the file like any other application.
