---
title: "Linux"
date: 2023-08-02
summary: "Known Linux-specific issues for PCSX2"
draft: false
toc: true
sidebar_position: 4
---

Here are some known Linux-specific issue that can happen to PCSX2

### libfuse2

If you see an error when opening the AppImage such as the following:

```bash
...
dlopen(): error loading libfuse.so.2
...
```

Then you need to install `libfuse2` in order to the run the AppImage in your environment. Recent versions of Ubuntu (22.04+) have switched to libfuse3, which is not backwards compatible.

```bash
sudo apt install libfuse2
```
