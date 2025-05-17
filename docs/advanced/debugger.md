---
title: "Debugger"
description: "Inspect and modify the state of the program running in the virtual machine."
sidebar_position: 2
---

You can inspect and modify the state of the program running in the virtual machine using the debugger window. This can be useful for developing patches, fixing bugs, and reverse engineering games.

This functionality is intended for developers. If you just want to use PCSX2 to play games you can safely ignore it.

## Overview

To open the debugger, make sure `Tools -> Show Advanced Settings` is ticked, and then use the `Debug -> Open Debugger` option from the main menu bar.

At the top of the debugger window, you should see a list of tabs. These are layouts, which are used to rearrange elements of the user interface (dock windows) to suit different purposes. By default, you should see two layouts: `R5900` and `R3000`. The former can be used to debug the MIPS 5900 core contained within the virtual PS2's Emotion Engine CPU, which is probably what you want to do most of the time. The latter is for debugging the MIPS R3000 core (the Input/Output processor).

## Layouts

_Since v2.3.213._

You can create your own layouts by clicking the `+` button to the right of the layout tabs, and then you can cutomize them by adding/removing dock windows using a `Windows` menu. To move dock windows, you must unlock the layout using the toggle button in the top right corner of the debugger window. If you accidentally make a mess and want to restore the original layouts, you can use the `Layouts -> Reset Default Layouts` option or the `Layouts -> Reset All Layouts` option.

Each layout has a target associated with it, which specifies the processor the layout will be used to debug. Dock windows will inherit the target from the layout that contains them by default, however this can be overriden for a given dock window by right-clicking on its tab and selecting `Set Target`.

It is possible to open multiple dock windows of the same type using the `Windows -> Add Another...` menu. You will then get options to select which dock window you want to use in various context menus. When responding to a click, the dock window marked as primary will always be used. You can make a given dock window the primary one by right-clicking on its tab and checking the `Primary` checkbox.

## Disassembly

This window decodes instructions from memory and displays them as assembly.

Both the R5900 and R3000 use variants of the MIPS instruction set. If you are unfamiliar with this language you can search online for tutorials on MIPS assembly.

### Function Stubbing

The `Stub (NOP) Function` option will replace the first two instructions in a function with a set of instructions that will return from the function with producing additional side effects (a `jr ra` followed by a `nop`). The `Restore Function` option will restore these instructions to their original state.

This can be useful for determining the purpose of a given function. For example, if you think you've found the function that makes the player character take damage, you can stub it out and test ingame to see if you can still take damage.

## Registers

Registers are small areas of memory used to store values that are currently being operated on by the processor. You can view and modify their contents using the `Registers` dock window.

The following sets of registers are displayed for the MIPS R5900 processor:

| Tab Name | Description                               |
| -------- | ----------------------------------------- |
| GPR      | General Purpose Registers                 |
| CP0      | System Control Processor (COP0) registers |
| FPR      | Floating Point unit Registers             |
| FCR      | Floating point unit Control Registers     |
| VU0f     | Vector Unit 0 Floating point registers    |
| VU0i     | Vector Unit 0 Integer registers           |
| GS       | Graphics Synthesizer registers            |

For the MIPS R3000, only the general purpose registers are currently shown.

## Memory Search

This allows you to search for addresses in memory based on their content. For example, to find where the number of hit points for the player character is stored in memory, you could enter the current value into the `Value` field and click `Search`. Since this would likely return many results, you could then take damage in the game, enter the new value into the `Value` field and click `Filter Search` to narrow down your results.

## Analysis Options

The analysis options screens let you configure the analysis passes PCSX2 runs on the program runnning in the virtual machine. The version of this screen in the regular settings dialog will save your changes globally, while the version in the per-game settings dialog will only save your changes for that particular game, and the analysis options dialog won't save your changes at all.

### Clear Existing Symbols

During an analysis run, symbols will be generated. This pass will remove symbols generated during previous runs.

### Import Symbols

Symbols provide information that can be used to relate the contents of a compiled object file to the original source code. The simplest types of symbol tables map names to addresses so that functions and other objects can be found in a compiled object file and in memory, but others can include a lot more information such as data type definitions.

By default, PCSX2 will try to import symbols from the game's bootable ELF file. You can also choose to import symbols from external files, and can even specify a [condition expression](#expressions) to determine if a given file should be loaded. For example, if the game you're working on loads code at runtime, you can configure PCSX2 to load the correct symbols for that code when an analysis run is started.

#### Supported Formats

The following symbol table formats are supported:

| Section             | Description                                                                                                                                                  | Supported Since Version |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------- |
| `.symtab`/`.strtab` | Standard ELF symbol table. Contains information about functions and global variables.                                                                        |                         |
| `.mdebug`           | MIPS symbol table. Contains information about functions, global variables, data types, and more.                                                             | v2.1.113                |
| `.sndata`           | SNDLL symbol table. Contains information about functions and global variables. These can also be loaded from SNDLL files (which start with the bytes `SNR`). | v2.1.113                |

DWARF symbol tables are currently not supported.

#### `.sym` Files

In addition to symbol tables loaded from ELF files, PCSX2 can also load symbols from a simple text-based format.

One symbol should be defined per line, and all numbers are in hexadecimal. Functions and labels can be defined using the following syntax: `<address> <name>[:<size>]`. If the size is omitted, or is equal to 1, a label is defined, otherwise a function is defined.

The following data directives are supported:

| Directive               | Element Size |
| ----------------------- | ------------ |
| `<address> .asc:<size>` | 1 byte       |
| `<address> .byt:<size>` | 1 byte       |
| `<address> .wrd:<size>` | 2 bytes      |
| `<address> .dbl:<size>` | 4 bytes      |

Note that the sizes of the `.wrd` and `.dbl` directives don't match the MIPS definitions of the terms word and double (which are for 4 byte and 8 byte quantities respectively).

##### Example

```
00100000 label
00120000 function,100
00130000 .byt:100
00140000 .wrd:100
00150000 .dbl:100
00160000 .asc:100
```

### Scan For Functions

In the case that symbols are not provided in the game's executable, PCSX2 has to scan for functions itself. By default, it will scan the loadable segment from the game's boot executable that contains the game's entry point, which will work for most games. If this behaviour does not suit your needs, you can specify a custom address range and/or choose to scan from memory instead. The address range fields support [expressions](#expressions), and symbols loaded in the `Import Symbols` pass are available.

### Hash Functions

If the `Gray Out Symbols For Overwritten Functions` option is enabled, PCSX2 will maintain hashes for functions created in the previous passes, and will gray out symbols corresponding to functions that no longer match their original hashes. This is helpful for games that load code at runtime, so that you can tell when previously loaded symbols are no longer useful.

## Expressions

In various places throughout the debugger's UI you can specify an expression instead of just a fixed address. This includes all the go to dialogs, many of the fields in the breakpoint dialog, and many of the fields in the analysis options dialog.

Expressions can contain operators, hexadecimal integer literals, general purpose register names, symbols, and of course the operators themselves. They should contain no whitespace.

### Examples

| Expression | Result                                                          |
| ---------- | --------------------------------------------------------------- |
| 100        | The value 0x100 (256).                                          |
| v0         | The value stored in the register v0.                            |
| [v1]       | The value in memory at the address stored in the register v1.   |
| a0==10     | 1 if the a0 register contains the value 0x10 (16), 0 otherwise. |
| 1+1\*2     | The value 3.                                                    |
| (1+1)\*2   | The value 4.                                                    |

### Reference

#### Integer Literals

| Syntax       | Base             |
| ------------ | ---------------- |
| `<digits>o`  | Octal (8)        |
| `0o<digits>` | Octal (8)        |
| `<digits>`   | Hexadecimal (16) |
| `<digits>h`  | Hexadecimal (16) |
| `0x<digits>` | Hexadecimal (16) |

#### Infix Operators

These operators appear between their two operands e.g. `1+2`.

| Symbol | Operation                |
| ------ | ------------------------ |
| \*     | Integer multiplication   |
| /      | Integer division         |
| %      | Integer modulo           |
| +      | Integer addition         |
| -      | Integer subtraction      |
| \<\<   | Logical left shift       |
| >>     | Logical right shift      |
| >=     | Greater than or equal to |
| >      | Greater than             |
| \<=    | Less than or equal to    |
| \<     | Less than                |
| ==     | Equal                    |
| !=     | Not equal                |
| &      | Bitwise and              |
| ^      | Bitwise xor              |
| \|     | Bitwise or               |
| &&     | Logical and              |
| \|\|   | Logical or               |

#### Prefix Operators

These operators appear before their operand e.g. `!1`.

| Symbol | Operation     |
| ------ | ------------- |
| +      | Positive sign |
| -      | Negative sign |
| ~      | Bitwise not   |
| !      | Logical not   |

#### Other Operators

| Expression | Operation                                                       |
| ---------- | --------------------------------------------------------------- |
| `(a)`      | Grouping (order of operations)                                  |
| `a?b:c`    | Ternary if expression                                           |
| `[a]`      | 4 byte memory read from address `a`                             |
| `[a,n]`    | `n`-byte memory read from address `a` (`n` can be 1, 2, 4 or 8) |

where `a`, `b` and `c` are subexpressions.
