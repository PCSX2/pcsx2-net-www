---
title: "Miscellaneous"
description: "This page contains various other advanced tips and features."
draft: false
toc: true
sidebar_position: 7
---

## Using GDB with Linux AppImages (32 bit and 64 bit)

This guide is useful if for example you'd like to debug a 32 bit crash but cannot build a 32 bit PCSX2.

1. **Put your AppImage into a directory by itself**

   We'll call the AppImage `PCSX2.AppImage` and then navigate your terminal to this directory..

2. **Extract the contents of the AppImage**

   You can do this by doing `./PCSX2.AppImage --appimage-extract`

   A new directory called `squashfs-root` should have been created.

3. **Run the AppImage normally**

   `./PCSX2.AppImage`

4. **Get the PID of the current PCSX2 instance**

   You can do `pidof PCSX2`.

   If there is more than one pid that shows up, you have more than one PCSX2 running!

   We'll call your running pid `<PID>`

5. **Attach GDB (during a fault or when PCSX2 is running normally, doesn't matter)**

   :::note
   You might need to run gdb with `sudo`
   :::

   `gdb squashfs-root/usr/bin/PCSX2 -p <PID>`

   `set sysroot ./squashfs-root`

   `set solib-search-path ./squashfs-root/usr/lib`

   The last two commands are due to the fact that the AppImage runs in a sanboxed area.
   It points gdb to where PCSX2 is going to look for libraries for example.

The commands in-order are listed below:

```sh
./PCSX2.AppImage --appimage-extract

./PCSX2.AppImage

pidof PCSX2

gdb squashfs-root/usr/bin/PCSX2 -p <PID>

set sysroot ./squashfs-root

set solib-search-path ./squashfs-root/usr/lib
```

You now have GDB set up and connected to your PCSX2

## Viewing Windows Minidumps on Other Platform

If you're on Windows, the best way to view crash dumps is to open them in Visual Studio. Therefore, you can ignore these instructions if you are on Windows.

:::warning
You will need the user's crash dump (.dmp) file, and the symbols (.pdb) and executable (.exe) of PCSX2 that is the _exact_ version the user was using when the crash dump was generated.
:::

### Dependencies

First off, you will need the `cargo` package manager for rust. Optionally you can build the dependencies from source, but it's much simpler relying on cargo.

Install the crates [dump_syms](https://crates.io/crates/dump_syms) and [minidump-stackwalk](https://crates.io/crates/minidump-stackwalk)

```bash
cargo install dump_syms minidump-stackwalk
```

Depending on your system, you may need to add the cargo bin directory to `$PATH`, please consult your system specific documentation on how to do this.

### Generating the Symbols

`minidump-stackwalk` doesn't support pdb files. This is where `dump_syms` come in handy.

`dump_syms` will take all available information from the executable and PDB file and convert it into a format `minidump-stackwalk` can interpret. `dump_syms` emits the symbols to STDOUT, so pipe that to a brand new file.

```bash
dump_syms pcsx2-qt.exe pcsx2-qt.pdb > dumped_symbols.txt
```

### Reading the minidump

```sh
minidump-stackwalk pcsx2-qt.dmp --symbols-path dumped_symbols.txt
```

:::tip
You can optionally pass `--features=unstable-all` if you'd like to see if `minidump-stackwalk` can provide more information.
:::

The output will be the stack trace of the minidump. if you are lucky, then the thread list will show what thread has crashed, and then you can find the cause from the stack trace. **Usually the first call(s) will be in the kernel**, don't write off the call stack though, it's very important to go back until you find the first call stack that is in our code!

In the example given below, we can find that an assertion was called (#6) in the startVM function (#7). Because of our debugging information, it even tells us the exact lines in code where this happened.

```sh
Thread 3 EmuThread (crashed) - tid: 48404
 0  KERNELBASE.dll + 0x3b699
     rax = 0x0000000000000020    rdx = 0x000000b3e64fa739
     rcx = 0x000001c5245e0000    rbx = 0x000000b3e64fb5c0
     rsi = 0x000000000000b201    rdi = 0xffffffffffffffff
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb3e0
      r8 = 0x000000b300000000     r9 = 0x000000b3e64fa820
     r10 = 0x000000007ffe0385    r11 = 0x0000000200000100
     r12 = 0x000001c5246c0c01    r13 = 0x00007ff73245108e
     r14 = 0x0000000000001290    r15 = 0x000000000000b254
     rip = 0x00007ffd74eeb699
    Found by: given as instruction pointer in context
 1  KERNELBASE.dll + 0x3b698
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb418
     rip = 0x00007ffd74eeb699
    Found by: stack scanning
 2  pcsx2-qt.exe!<unknown in pcsx2-qt.pdb> + 0x18951c
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb440
     rip = 0x00007ff73245108e
    Found by: stack scanning
 3  pcsx2-qt.exe!<unknown in pcsx2-qt.pdb> + 0x1352c7
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb458
     rip = 0x00007ff7323fce39
    Found by: stack scanning
 4  pcsx2-qt.exe!WriteMinidump(HINSTANCE__*, void*, void*, unsigned long, unsigned long, _EXCEPTION_POINTERS*, _MINIDUMP_TYPE) [CrashHandler.cpp : 59 + 0x17]
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb468
     rip = 0x00007ff73214f5d2
    Found by: stack scanning
 5  pcsx2-qt.exe!WriteMinidumpAndCallstack(_EXCEPTION_POINTERS*) [CrashHandler.cpp : 124 + 0x3c]
     rsi = 0x0000000000000000    rdi = 0x00000000000012a8
     rbp = 0x000000000000bd14    rsp = 0x000000b3e64fb540
     rip = 0x00007ff73214f308
    Found by: call frame info
 6  pcsx2-qt.exe!pxOnAssertFail(char const*, int, char const*, char const*) [Assertions.cpp : 109 + 0x6]
     rbx = 0x00007ff7323fdfc1    rsi = 0x0000000000001248
     rdi = 0x00007ff7324202b8    rbp = 0x00000000000000f1
     rsp = 0x000000b3e64fc210    r12 = 0x000000000000006b
     r13 = 0x0000000000000000    r14 = 0x00007ff7323fc125
     r15 = 0x000000b3e64fc280    rip = 0x00007ff732150d40
    Found by: call frame info
 7  pcsx2-qt.exe!EmuThread::startVM(std::shared_ptr<VMBootParameters>) [QtHost.cpp : 241 + 0x1e]
     rbx = 0x000001c638e0bd20    rsi = 0x000000b3e64fc680
     rdi = 0x000001c52891b2f0    rbp = 0x000000b3e64fc759
     rsp = 0x000000b3e64fc4d0    r12 = 0x000001c638e0bd20
     r13 = 0x0000000000000000    r14 = 0x000001c52891b2f0
     r15 = 0x000001c52891b2f0    rip = 0x00007ff731e3e04e
    Found by: call frame info
 8  pcsx2-qt.exe!EmuThread::qt_static_metacall(QObject*, QMetaObject::Call, int, void**) [moc_QtHost.cpp : 591 + 0x1f]
     rbx = 0x000001c638e0bd20    rsi = 0x000001c52891b2f0
     rdi = 0x000001c638e0bd20    rbp = 0x000000b3e64fc759
     rsp = 0x000000b3e64fc600    r12 = 0x000001c638e0bd20
     r13 = 0x0000000000000000    r14 = 0x000001c52891b2f0
     r15 = 0x000001c52891b2f0    rip = 0x00007ff731df86fa
    Found by: call frame info
 9  Qt6Core.dll + 0xe7b98
     rbx = 0x000001c638e0bd20    rsi = 0x000001c52891b2f0
     rbp = 0x000000b3e64fc759    rsp = 0x000000b3e64fc6a0
     r12 = 0x000001c638e0bd20    r13 = 0x0000000000000000
     r14 = 0x000001c52891b2f0    r15 = 0x000001c52891b2f0
     rip = 0x00007ffd2eb27b99
    Found by: call frame info
```

Here is the exact same crash, without debugging information.

```sh
Thread 3 EmuThread (crashed) - tid: 48404
0  KERNELBASE.dll + 0x3b699
     rax = 0x0000000000000020    rdx = 0x000000b3e64fa739
     rcx = 0x000001c5245e0000    rbx = 0x000000b3e64fb5c0
     rsi = 0x000000000000b201    rdi = 0xffffffffffffffff
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb3e0
      r8 = 0x000000b300000000     r9 = 0x000000b3e64fa820
     r10 = 0x000000007ffe0385    r11 = 0x0000000200000100
     r12 = 0x000001c5246c0c01    r13 = 0x00007ff73245108e
     r14 = 0x0000000000001290    r15 = 0x000000000000b254
     rip = 0x00007ffd74eeb699
    Found by: given as instruction pointer in context
 1  KERNELBASE.dll + 0x3b698
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb418
     rip = 0x00007ffd74eeb699
    Found by: stack scanning
 2  pcsx2-qt.exe + 0xc6108d
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb440
     rip = 0x00007ff73245108e
    Found by: stack scanning
 3  pcsx2-qt.exe + 0xc0ce38
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb458
     rip = 0x00007ff7323fce39
    Found by: stack scanning
 4  pcsx2-qt.exe + 0x95f5d1
     rbp = 0x000000b3e64fb520    rsp = 0x000000b3e64fb468
     rip = 0x00007ff73214f5d2
    Found by: stack scanning
 5  KERNELBASE.dll + 0x67eab
     rsp = 0x000000b3e64fb470    rip = 0x00007ffd74f17eac
    Found by: stack scanning
 6  pcsx2-qt.exe + 0x95f5d1
     rsp = 0x000000b3e64fb4a0    rip = 0x00007ff73214f5d2
    Found by: stack scanning
 7  pcsx2-qt.exe + 0xc0ce38
     rsp = 0x000000b3e64fb4b0    rip = 0x00007ff7323fce39
    Found by: stack scanning
 8  pcsx2-qt.exe + 0x95f637
     rsp = 0x000000b3e64fb4c0    rip = 0x00007ff73214f638
    Found by: stack scanning
 9  dbgcore.dll + 0x6c3f
     rsp = 0x000000b3e64fb4d0    rip = 0x00007ffd526d6c40
    Found by: stack scanning
```
