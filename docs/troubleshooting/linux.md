---
title: "Linux"
summary: "Known Linux-specific issues for PCSX2"
draft: false
toc: true
sidebar_position: 5
---

Here are some known Linux-specific issue that can occur.

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

:::tip
This is no longer relevant since PCSX2 v2.1.72 we've now switched to `go-appimage` which supports `libfuse3`.
:::
