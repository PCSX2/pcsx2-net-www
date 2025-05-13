---
title: "Command Line Options"
summary: "List of CLI Commands that are available for PCSX2"
draft: false
toc: true
sidebar_position: 4
---

This section list all the command line option that are available for PCSX2.

## General syntax

Usage: `pcsx2-qt.exe [parameters] [--] [boot filename]`

Parameter list:

```sh
  -help: Displays this information and exits.
  -version: Displays version information and exits.
  -batch: Enables batch mode (exits after shutting down).
  -nogui: Hides main window while running (implies batch mode).
  -portable: Force enable portable mode to store data in local PCSX2 path instead of the default configuration path.
  -elf <file>: Overrides the boot ELF with the specified filename.
  -gameargs <string>: passes the specified quoted space-delimited string of launch arguments.
  -disc <path>: Uses the specified host DVD drive as a source.
  -logfile <path>: Writes the application log to path instead of emulog.txt.
  -bios: Starts the BIOS (System Menu/OSDSYS).
  -fastboot: Force fast boot for provided filename.
  -slowboot: Force slow boot for provided filename.
  -state <index>: Loads specified save state by index.
  -statefile <filename>: Loads state from the specified filename.
  -fullscreen: Enters fullscreen mode immediately after starting.
  -nofullscreen: Prevents fullscreen mode from triggering if enabled.
  -bigpicture: Forces PCSX2 to use the Big Picture mode (useful for controller-only and couch play).
  -earlyconsolelog: Forces logging of early console messages to console.
  -testconfig: Initializes configuration and checks version, then exits.
  -setupwizard: Forces initial setup wizard to run.
  -debugger: Open debugger and break on entry point.
  -raintegration: Use RAIntegration instead of built-in achievement support.
  --: Signals that no more arguments will follow and the remaining
    parameters make up the filename. Use when the filename contains
    spaces or starts with a dash.
```

## Examples

### Launching a game from command line

```sh
D:\PCSX2\pcsx2-qt.exe -fullscreen -batch -- D:\Games\ROMs\PS2\Final Fantasy X.iso
```

The ISO file `Final Fantasy X.iso` will be launched in fullscreen automatically after PCSX2 is started.

### Automatically start PCSX2 in Big Picture mode

```sh
D:\PCSX2\pcsx2-qt.exe -fullscreen -bigpicture
```

This will automatically launch PCSX2 in Big Picture Mode.
