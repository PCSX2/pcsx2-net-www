---
title: "GS Dump Runner"
description: "This page helps you understand and use the GS dump runner on Windows."
draft: false
toc: true
sidebar_position: 5
---

The GS dump runner is designed to automatically run and compare a large number of GS dumps and output any differences found with pictures.

`pcsx2-gsrunner` does not build by default. You need to right click in the solution explorer in VS, and select Build.

:::note
The GS dump runner is only available for Windows at the moment.
:::

To use:

:::tip
You can add `-parallel 4` as a parameter for it to run multiple dumps at once (recommended).
Optionally, you can replace 4 with the number you want to do at once, but this is the recommended value.
:::

Hardware hacks can be enabled using the `-renderhacks` parameter, followed by one of the below options:

```ini
- af    = AutoFlush
- cpufb = CPU Framebuffer Conversion
- dds   = Disable Depth Support
- dpi   = Disable Partial Invalidation
- dsf   = Disable Safe Features
- tinrt = Texture in Render Target
- plf   = Preload Frame Data
```

You can string them together like `afcpufbddsdpidsftinrtplf` or separate with commas/colons and it will split them out.

Run the python script to generate a baseline:

```sh
python test_run_dumps.py -runner path\to\baseline-build\pcsx2-gsrunnerx64-avx2.exe -dumpdir path\to\results\baseline -gsdir path\to\gs\dumps -renderer vulkan
```

:::info
Renderer options are 'auto', 'dx11', 'dx12', 'gl', 'vulkan' or 'sw'
:::

Run the python script again to generate a test set:

```sh
python test_run_dumps.py -runner path\to\modified-build\pcsx2-gsrunnerx64-avx2.exe -dumpdir path\to\results\modified -gsdir path\to\gs\dumps -renderer vulkan
```

:::info
Renderer options are 'auto', 'dx11', 'dx12', 'gl', 'vulkan' or 'sw'
:::

Now, you can compare them:

```sh
python test_check_dumps.py -baselinedir path\to\results\baseline -testdir path\to\results\modified changes.html
```

It will log any different frames to both the terminal, as well as the HTML file you specify.
