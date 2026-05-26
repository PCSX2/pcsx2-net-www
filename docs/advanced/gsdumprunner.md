---
title: "GS Dump Runner"
description: "This page helps you understand and use the GS dump runner."
draft: false
toc: true
sidebar_position: 6
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The GS dump runner is designed to automatically run and compare a large number of GS dumps and output any differences found with pictures.

The GS dump runner is available on Windows, macOS, and Linux. Use the tab for your platform to see the build instructions that match your system.

Before you build it, make sure you have the PCSX2 dependencies set up for your platform. The main build guide explains how to get or build the `deps` directory, and you will need those dependencies whether you build with Visual Studio or CMake.

## Building the runner

<Tabs queryString="os">
<TabItem value="windows" label="Windows" default>

On Windows, you can build `pcsx2-gsrunner` in Visual Studio or with CMake.

If you want to use CMake, configure PCSX2 with the dependencies directory and enable the gsrunner target:

```sh
cmake -S . -B build -DENABLE_GSRUNNER=ON -DCMAKE_PREFIX_PATH=path/to/deps
cmake --build build --config Release --target pcsx2-gsrunner
```

If you prefer Visual Studio, generate the solution with CMake first, open it in Visual Studio, and build the `pcsx2-gsrunner` target from Solution Explorer.

Use the Windows runner executable when you run the scripts, for example `pcsx2-gsrunnerx64-avx2.exe`.

</TabItem>
<TabItem value="macos" label="macOS">

Configure PCSX2 with CMake, point it at the dependencies directory, and enable the gsrunner target:

```sh
cmake -S . -B build -DENABLE_GSRUNNER=ON -DCMAKE_PREFIX_PATH="$PWD/deps" -GNinja
cmake --build build --target pcsx2-gsrunner
```

Use the macOS runner binary when you run the scripts, for example `pcsx2-gsrunner`.

</TabItem>
<TabItem value="linux" label="Linux">

Configure PCSX2 with CMake, point it at the dependencies directory, and enable the gsrunner target:

```sh
cmake -S . -B build -DENABLE_GSRUNNER=ON -DCMAKE_PREFIX_PATH="$PWD/deps" -GNinja
cmake --build build --target pcsx2-gsrunner
```

Use the Linux runner binary when you run the scripts, for example `pcsx2-gsrunner`.

</TabItem>
</Tabs>

To use the runner:

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
python test_run_dumps.py -runner path\to\baseline-build\pcsx2-gsrunner -dumpdir path\to\results\baseline -gsdir path\to\gs\dumps -renderer vulkan
```

:::info
Renderer options are 'auto', 'dx11', 'dx12', 'gl', 'vulkan' or 'sw'
:::

Run the python script again to generate a test set:

```sh
python test_run_dumps.py -runner path\to\modified-build\pcsx2-gsrunner -dumpdir path\to\results\modified -gsdir path\to\gs\dumps -renderer vulkan
```

:::info
Renderer options are 'auto', 'dx11', 'dx12', 'gl', 'vulkan' or 'sw'
:::

Now, you can compare them:

```sh
python test_check_dumps.py -baselinedir path\to\results\baseline\pcsx2-gsrunner -testdir path\to\results\modified changes.html
```

It will log any different frames to both the terminal, as well as the HTML file you specify.
