---
title: "Nightly Build Setup"
date: 2022-10-31
summary: "Steps on how to use the nightly PCSX2 builds (aka dev builds)"
draft: false
mainAuthor: Vaser
toc: true
---

## Windows

- Extract the `.7z` file wherever you'd like. It's recommend to avoid `Program Files` however!
  - You can get 7zip from https://www.7-zip.org/download.html

![](https://i.imgur.com/ipstXO5.png)

- Run the `pcsx2[-avx2].exe` file

![](https://i.imgur.com/QA5oBiL.png)

## Linux (AppImage)

- You will likely have to make the AppImage file executable. There are a few ways to do this:
  - Right-click and make it executable
  - In a terminal, run `chmod +x <path-to-AppImage-file>`
- You should be able to open the file like any other application.

### libfuse2

If you see an error such as the following:

```bash
...
dlopen(): error loading libfuse.so.2
...
```

Then you need to install `libfuse2` in order to the run the AppImage in your environment. Recent versions of Ubuntu (22.04+) have switched to libfuse3, which is not backwards compatible.

```bash
sudo apt install libfuse2
```

## Still not Working?

Reach out in the respective help channel in the [Discord](https://discord.com/invite/TCz3t9k)

## Compiling from Source

If you'd prefer to compile from source, see the following articles:

- [Windows](https://github.com/PCSX2/pcsx2/wiki/Setting-up-the-PCSX2-repository-on-Windows)
- [Linux](https://github.com/PCSX2/pcsx2/wiki/Installing-on-Linux)
