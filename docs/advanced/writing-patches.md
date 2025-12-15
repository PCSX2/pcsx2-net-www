---
title: "Writing Patches"
description: "This page helps you write game patches and cheats."
sidebar_position: 3
---

The patching system allows you to develop and run game patches and cheats, which are text files containing commands that the emulator execute to modify a game as it's running. PCSX2 supports three types of patch files, which are listed below:

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Loaded From</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Patch</td>
      <td>`patches` folder and built-in `patches.zip` file</td>
      <td>
        Quality of life improvements such as widescreen support and no interlacing patches.
        
        The patches bundled with releases of PCSX2 are sourced from the [pcsx2_patches](https://github.com/PCSX2/pcsx2_patches) repository on GitHub.
      </td>
    </tr>
    <tr>
      <td>Cheat</td>
      <td>`cheats` folder</td>
      <td>Patches intended to alter gameplay, and other miscellaneous user-provided patches.</td>
    </tr>
    <tr>
      <td>GameDB Patch</td>
      <td>Built-in `GameIndex.yaml` file</td>
      <td>Essential compatibility patches. Enabled by default.</td>
    </tr>
  </tbody>
</table>

Patch files should be named according to the serial number (product code) of the game being patched, and the hash of the executable file being patched, which is colloquially referred to as its CRC. For example a patch file for the original PAL release of Ratchet & Clank should be named `SCES-50916_6A8F18B9.pnach`. You can generate a cheat or patch file for the currently running game using the `Tools -> Edit Cheats...` or `Tools -> Edit Patches...` menu items within the main window respectively.

Patches can be enabled/disabled from the `Patches` page of the game properties window.

Cheats can be enabled/disabled from the `Cheats` page of the game properties window, and will only be applied if the `Enable Cheats` setting is enabled. This setting can be enabled globally from the `Emulation` page of the settings window, or on a per-game basis from the `Cheats` page of the game properties window.

GameDB patches will only be applied if the `Enable Compatibility Patches` setting is enabled, which it is by default. It can be disabled from the `Advanced` page of the settings window.

## Pnach Files

Patches and cheats both share the same file format, which is called the Pnach format. GameDB patches use a variant of this format that allows for patch commands to be embedded in the afformentioned `GameIndex.yaml` file.

A `.pnach` file is shown below as an example:

```
gametitle=Ratchet & Clank (PAL-M5) (SCES-50916)

[Winter Wonderland]
description=Give the fog a light blue tint.
author=Alice
patch=1,EE,0015F444,byte,9A // red
patch=1,EE,0015F445,byte,EC // green
patch=1,EE,0015F446,byte,F5 // blue

[Cheats\Infinite Health]
description=Don't let Ratchet drop below 8 HP.
author=Bob
patch=1,EE,001415F8,word,00000008

[Cheats\Locked and Loaded]
description=Give Ratchet 1,000,000,000 bolts.
author=Eve
patch=1,EE,0015ED98,word,3B9ACA00
```

Patches are separated into groups that can be enabled/disabled independently in the UI. Each line beginning and ending with a pair of square brackets starts a new group. For example, the example file above contains three groups: `Winter Wonderland`, `Cheats\Infinite Health` and `Cheats\Locked and Loaded`.

Groups can be organized into a tree. For example, the subgroups in the above example `Infinite Health` and `Locked and Loaded` are both children of the `Cheats` group. This hierarchy will be reflected in the UI.

The `patch=` lines are what actually modify the game's memory. They are described in detail below.

The `description=` and `author=` lines specify text that will be shown in the UI. An end-of-line comment can be created using two consecutive forward slashes.

Prior to v1.7.4546, patch files were not split into groups and so all patch commands were permanently enabled. Modern versions of PCSX2 still support files in this legacy format.

## Patches

This command writes the specified value at the specified address in memory, and is probably the command that you will use most frequently. It offers multiple options for when it should be applied, different data types, and extended PS2rd compatible codes that allow for advanced features such as patches that are applied conditionally based on an existing value in memory.

### Syntax

Patch commands are written in the following format:

```
patch=<place>,<cpu>,<address>,<type>,<data>
```

Each of the parameters that make up the command are described below:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`<place>`</td>
      <td>
        The point in time when the patch should be applied. Possible values are:
        <ul>
          <li>`0`: Only on game startup, when the entry point is being executed for the first time.</li>
          <li>`1`: Every frame, during vertical synchronization.</li>
          <li>`2`: On game startup and every frame (since v1.7.618). This differs from 1 as if the patch isn't applied on game startup it won't take effect for code executed before the first vertical synchronization operation.</li>
          <li>`3`: On game startup, and immediately after the patch is enabled (since v2.5.385).</li>
        </ul>
        Older versions of PCSX2 had bugs that altered how this parameter was interpreted. For more information, see the [Errata](#errata) section below.
      </td>
    </tr>
    <tr>
      <td>`<cpu>`</td>
      <td>
        The processor corresponding to the address space that should be accessed. Possible values are:
        <ul>
          <li>`EE`: The Emotion Engine (the main CPU). This option is used for the vast majority of patches.</li>
          <li>`IOP`: The Input Output Processor.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>`<address>`</td>
      <td>
        The address in memory where `<data>` should be written, except in the case that `<type>` is equal to `extended` (see [PS2rd Codes](#ps2rd-codes)). It is interpreted as a hexadecimal number.
      </td>
    </tr>
    <tr>
      <td>`<type>`</td>
      <td>
        The data type of `<data>`. Possible values are:
        <ul>
          <li>`byte`: A single byte.</li>
          <li>`short`: Two bytes.</li>
          <li>`word`: Four bytes.</li>
          <li>`double`: Eight bytes.</li>
          <li>`extended`: Interpret the `<address>` and `<data>` parameters as [PS2rd codes](#ps2rd-codes).</li>
          <li>`beshort`: Two bytes, to be stored in big-endian order in memory (since v1.7.4534).</li>
          <li>`beword`: Four bytes, to be stored in big-endian order in memory (since v1.7.4534).</li>
          <li>`bedouble`: Eight bytes, to be stored in big-endian order in memory (since v1.7.4534).</li>
          <li>`bytes`: A variable-length array of bytes (since v1.7.4551).</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>`<data>`</td>
      <td>
        The data that should be written into memory at `<address>`, except in the case that `<type>` is equal to `extended` (see [PS2rd Codes](#ps2rd-codes)). It is interpreted as a hexadecimal number.
      </td>
    </tr>
  </tbody>
</table>

### PS2rd Codes

PCSX2 has partial support for [PS2rd codes](https://github.com/mlafeldt/ps2rd/blob/master/Documentation/code_types.txt). If the `<type>` parameter of a patch command is set to `extended`, the most signficant nibble (leftmost hexadecimal digit) of the `<address>` field will be interpreted as a type code used to perform an action according to the table below:

<table>
  <thead>
    <tr>
      <th>Address Parameter(s)</th>
      <th>Data Parameter(s)</th>
      <th>Description</th>
      <th>Psuedocode</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`0aaaaaaa`</td>
      <td>`000000vv`</td>
      <td rowspan="3">
        Write the value `v` into memory at address `a`. The size of the value `v` is determined by the most significant nibble (leftmost hexadecimal digit) of the address parameter according to the following table:
        <ul>
           <li>`0`: 8 bits</li>
           <li>`1`: 16 bits</li>
           <li>`2`: 32 bits</li>
         </ul>
      </td>
      <td rowspan="3">
        ```
        Write(a, sizeof(v), v);
        ```
      </td>
    </tr>
    <tr>
      <td>`1aaaaaaa`</td>
      <td>`0000vvvv`</td>
    </tr>
    <tr>
      <td>`2aaaaaaa`</td>
      <td>`vvvvvvvv`</td>
    </tr>
    <tr>
      <td>`300000vv`</td>
      <td>`0aaaaaaa`</td>
      <td rowspan="6">
         Increment or decrement the value in memory at address `a` by `v`. The operation performed and the size of the value is determined by the third most significant nibble (third leftmost hexadecimal digit) of the address parameter, which shall be called `s`. Possible values for `s` are:
         <ul>
           <li>`0`: 8-bit increment</li>
           <li>`1`: 8-bit decrement</li>
           <li>`2`: 16-bit increment</li>
           <li>`3`: 16-bit decrement</li>
           <li>`4`: 32-bit increment</li>
           <li>`5`: 32-bit decrement</li>
         </ul>
      </td>
      <td rowspan="6">
      ```
      temp = Read(a, sizeof(v));
      switch (s % 2)
      {
        case 0: temp = temp + v; break;
        case 1: temp = temp - v; break;
      }
      Write(a, sizeof(v), temp);
      ```
      </td>
    </tr>
    <tr>
      <td>`301000vv`</td>
      <td>`0aaaaaaa`</td>
    </tr>
    <tr>
      <td>`3020vvvv`</td>
      <td>`0aaaaaaa`</td>
    </tr>
    <tr>
      <td>`3030vvvv`</td>
      <td>`0aaaaaaa`</td>
    </tr>
    <tr>
      <td>`30400000`<br/>`vvvvvvvv`</td>
      <td>`0aaaaaaa`<br/>`00000000`</td>
    </tr>
    <tr>
      <td>`30500000`<br/>`vvvvvvvv`</td>
      <td>`0aaaaaaa`<br/>`00000000`</td>
    </tr>
    <tr>
      <td>
        `4aaaaaaa`<br/>`vvvvvvvv`
      </td>
      <td>
        `nnnnssss`<br/>`iiiiiiii`
      </td>
      <td>
        Set `n` 4 byte values in memory with addresses starting at `a` with a stride of `s` to values starting at `v` with a difference of `i` between writes.
      </td>
      <td>
        ```
        for (iter = 0; iter < n; iter++)
        {
          Write(a + iter * s * 4, 32, v + iter * i);
        }
        ```
      </td>
    </tr>
    <tr>
      <td>
        `5sssssss`<br/>`0ddddddd`
      </td>
      <td>
        `nnnnnnnn`<br/>`00000000`
      </td>
      <td>
        Copy `n` bytes of memory from address `s` to address `d`.
      </td>
      <td>
        ```
        for (iter = 0; iter < n; iter++)
        {
          Write(d + iter, 8, Read(s + iter, 8));
        }
        ```
      </td>
    </tr>
    <tr>
      <td>
        `6aaaaaaa`<br/>`000snnnn`<br/>`tttttttt`[1]<br/>...<br/>`tttttttt`[n-2]
      </td>
      <td>
        `vvvvvvvv`<br/>`tttttttt`[0]<br/>`tttttttt`[2]<br/>...<br/>`iiiiiiii`
      </td>
      <td>
        Follow a chain of `max(n, 1)` pointers and write the value `v` into memory at offset `i` relative to the address stored in the last pointer. The first pointer is read from address `a`, and subsequent pointers are read from the addresses stored in the previous pointers plus offsets from the array `t`. Note that `i` can be stored in either an address parameter or a data parameter depending on whether `n` is even or odd. The size of the value `v` is determined by `s`. Possible values for `s` are:
        <ul>
          <li>`0`: 8 bits</li>
          <li>`1`: 16 bits</li>
          <li>`2`: 32 bits</li>
        </ul>
      </td>
      <td>
        ```
        pointer = Read(a, 32);
        if (pointer != 0)
        {
          for (iter = 0; iter < n - 1; iter++)
          {
            pointer = Read(pointer + t[iter], 32);
          }
          if (pointer != 0)
          {
            Write(pointer + i, sizeof(v), v);
          }
        }
        ```
      </td>
    </tr>
    <tr>
      <td>
        `7aaaaaaa`
      </td>
      <td>
        `00x0vvvv`
      </td>
      <td>
        Overwrite the value stored in memory at address `a` with the result of applying a bitwise operation to `v` and said value stored in memory. The operation to apply and the size of the value is determined by `x`. Possible values for `x` are:
        <ul>
          <li>`0`: 8-bit OR</li>
          <li>`1`: 16-bit OR</li>
          <li>`2`: 8-bit AND</li>
          <li>`3`: 16-bit AND</li>
          <li>`4`: 8-bit XOR</li>
          <li>`5`: 16-bit XOR</li>
        </ul>
      </td>
      <td>
        ```
        temp = Read(a, sizeof(v));
        switch (x)
        {
          case 0: case 1: temp = temp | v; break;
          case 2: case 3: temp = temp & v; break;
          case 4: case 5: temp = temp ^ v; break;
        }
        Write(a, sizeof(v), temp);
        ```
      </td>
    </tr>
    <tr>
      <td>
        `9aaaaaaa`
      </td>
      <td>
        `vvvvvvvv`
      </td>
      <td>
        **Not supported.**
      </td>
      <td></td>
    </tr>
    <tr>
      <td>
        `Caaaaaaa`
      </td>
      <td>
        `vvvvvvvv`
      </td>
      <td>
        **Not supported.**
      </td>
      <td></td>
    </tr>
    <tr>
      <td>
        `Daaaaaaa`
      </td>
      <td>
        `nntsvvvv`
      </td>
      <td rowspan="2">
        Read a value from address `a` and compare it to the value `v`. If the comparison is false, skip the next `n` patch commands. The operator to use for the comparison is determined by `t`. Possible values for `t` are:
        <ul>
          <li>`0`: Equal</li>
          <li>`1`: Not equal</li>
          <li>`2`: Less than</li>
          <li>`3`: Greater than</li>
          <li>`4`: NAND</li>
          <li>`5`: AND</li>
          <li>`6`: NOR</li>
          <li>`7`: OR</li>
        </ul>
        The sizes of the value read from memory and the value `v` are determined by `s`. Possible values for `s` are:
        <ul>
          <li>`0`: 16-bit</li>
          <li>`1`: 8-bit</li>
        </ul>
        Do not mix conditional codes and patch commands that are not of type `extended`.
      </td>
      <td rowspan="2">
      ```
      temp = Read(a, sizeof(v));
      switch (t)
      {
        case 0: condition = temp == v; break;
        case 1: condition = temp != v; break;
        case 2: condition = temp < v; break;
        case 3: condition = temp > v; break;
        case 4: condition = !(temp & v); break;
        case 5: condition = temp & v; break;
        case 6: condition = !(temp | v); break;
        case 7: condition = temp | v; break;
      }
      if (!condition)
      {
        SkipPatchCommands(n);
      }
      ```
      </td>
    </tr>
    <tr>
      <td>
        `E0nnvvvv`
      </td>
      <td>
        `taaaaaaa`
      </td>
    </tr>
  </tbody>
</table>

In the case where multiple address and data parameters are present for a given row in the table above, multiple `patch` commands must be written on consecutive lines. Lower case letters are used to denote variables, while upper case letters and numbers are used to denote literals. The maximum valid value for any of the addresses in the above table is `1ffffff`. If parameter values are provided that do not match one of the patterns in the above table, the behaviour is undefined.

The psuedocode in the above table makes use of the following functions:

<ul>
  <li>
    `Read(address, size)` which reads `size` bits from memory at `address` and returns the result.
  </li>
  <li>
    `Write(address, size, value)` which writes `size` bits from `value` to memory at `address`.
  </li>
  <li>
    `SkipPatchCommands(n)` which skips (prevents the execution of) the next `n` patch commands.
  </li>
</ul>

### Examples

<table>
  <thead>
    <tr>
      <th>Pnach Code</th>
      <th>Description</th>
      <th>Example Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        ```
        patch=1,EE,00100000,word,12345678
        ```
      </td>
      <td>
        Write the 32-bit value 0x12345678 into EE memory at address 0x100000 every frame in little-endian order.
      </td>
      <td>
        Replacing an instruction in memory.
      </td>
    </tr>
    <tr>
      <td>
        ```
        patch=1,EE,00100000,beword,78563412
        ```
      </td>
      <td>
        Write the 32-bit value 0x78563412 into EE memory at address 0x100000 every frame in big-endian order. This is equivalent to the last example.
      </td>
      <td>
        You want the order the bytes are written in the pnach file to match the order in which they appear in a hex editor.
      </td>
    </tr>
    <tr>
      <td>
        ```
        patch=1,EE,00100000,bytes,48656C6C6F20576F726C642100
        ```
      </td>
      <td>
        Write the null-terminated ASCII string "Hello World!" into EE memory at address 0x100000 every frame.
      </td>
      <td>
        Writing a string into memory all at once.
      </td>
    </tr>
    <tr>
      <td>
        ```
        patch=1,EE,30400000,extended,00100000
        patch=1,EE,00000002,extended,00000000
        ```
      </td>
      <td>
        Add 2 to the 32-bit value at address 0x100000 in EE memory every frame.
      </td>
      <td>
        Rapidly increasing the amount of in-game currency the player has.
      </td>
    </tr>
    <tr>
      <td>
        ```
        patch=1,EE,60100000,extended,12345678
        patch=1,EE,00020003,extended,00000004
        patch=1,EE,00000008,extended,0000000c
        ```
      </td>
      <td>
        <p>
        Follows a chain of pointers starting at 0x100000 and writes the value 0x12345678 into EE memory.<br/>
        </p>
        <p>
          In the following example the value will end up being written at 0x10003c:
          ```
          00100000: 00100010 00000000 00000000 00000000
          00100010: 00000000 00100020 00000000 00000000
          00100020: 00000000 00000000 00100030 00000000
          00100030: 00000000 00000000 00000000 12345678
          ```
        </p>
      </td>
      <td>
        Patch data that moves around in memory (e.g. data allocated on the heap).
      </td>
    </tr>
    <tr>
      <td>
        ```
        patch=1,EE,D0100000,extended,0201ABCD
        // start of condition body
        patch=1,EE,10100010,extended,00001234
        patch=1,EE,10100020,extended,00001234
        // end of condition body
        patch=1,EE,10100030,extended,00001234
        ```
      </td>
      <td>
        Write the 16-bit value 0x1234 at addresses 0x100010 and 0x100020 if the 16-bit value at address 0x100000 is equal to 0xABCD. Write the same value at address 10100030 unconditionally.
      </td>
      <td>
        Conditionally applying patches depending on which level is currently loaded.
      </td>
    </tr>
  </tbody>
</table>

## Dynamic Patches

Some games load code at runtime, so patching at a fixed address using the `patch` command may not always be viable. In these cases, as long as you are strictly patching code rather than data, you can use the `dpatch` command instead. This command allows the patching system to determine the address to patch dynamically by scanning for patterns of instructions. If the recompiler is enabled the patch will only be applied when the instruction at offset 0 (see below) is being recompiled. This means that you should ensure the instruction at offset 0 is executed before the instructions you wish to patch are executed. If the recompiler is disabled, `dpatch` commands will not be run at all.

Be careful when choosing instructions to match on. If the instruction contains an address (or part of an address) stored as an immediate operand, it may prevent the `dpatch` command from working when the code is loaded at a different address.

### Syntax

Dynamic patch commands are written in the following format:

```
dpatch=<type>,<pattern count>,<replacement count>,<pattern 1>,...,<pattern N>,<replacement 1>,...,<replacement N>
```

Each of the parameters that make up the command are described below:

<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`<type>`</td>
      <td>
        Currently must be set to `0`.
      </td>
    </tr>
    <tr>
      <td>`<pattern count>`</td>
      <td>
        The number of instructions to match.
      </td>
    </tr>
    <tr>
      <td>`<replacement count>`</td>
      <td>
        The number of instructions to replace.
      </td>
    </tr>
    <tr>
      <td>`<pattern>`</td>
      <td>
        An offset and value pair in the following format: `<offset>,<value>`. For the replacements to be applied, the 32-bit value in memory at the given offset from the instruction currently being recompiled (executed for the first time) must be equal to the value provided in the pattern. Offsets should be a multiple of 4.
      </td>
    </tr>
    <tr>
      <td>`<replacement>`</td>
      <td>
        An offset and value pair in the following format: `<offset>,<value>`. If all the patterns match, the value will be written into EE memory at the given offset from the instruction currently being recompiled (executed for the first time). Offsets should be a multiple of 4.
      </td>
    </tr>
  </tbody>
</table>

### Example

<table>
  <thead>
    <tr>
      <th>Pnach Code</th>
      <th>Description</th>
      <th>Example Use Case</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        ```
        dpatch=0,2,1,0,0040F809,4,0200202D,0,00000000
        ```
      </td>
      <td>
        Replace all `jalr v0` instructions that are immediately followed by a `daddu a0,s0,zero` instruction with `nop` instructions. Note that for a real patch you would probably want to match a longer sequence of instructions to avoid false positives.
      </td>
      <td>
        Patch sequences of instructions that appear at multiple different addresses in memory.
      </td>
    </tr>
  </tbody>
</table>

## Widescreen Patches

Patches that add support for widescreen are written in the following format:

```
[Widescreen 16:9]
gsaspectratio=16:9
patch=1,EE,00100000,word,12345678
```

The group name must be equal to `Widescreen 16:9` for widescreen patches to be automatically applied when the global `Apply Widescreen Patches` setting is enabled.

Possible values for `gsaspectratio`:

<ul>
  <li>`Stretch`</li>
  <li>`Auto 4:3/3:2`</li>
  <li>`4:3`</li>
  <li>`16:9`</li>
  <li>`10:7`</li>
</ul>

## No-Interlacing Patches

Patches that disable interlacing are written in the following format:

```
[No-Interlacing]
gsinterlacemode=1
patch=1,EE,00100000,word,12345678
```

The group name must be equal to `No-Interlacing` for no interlacing patches to be automatically applied by the global `Apply No-Interlacing Patches` setting is enabled.

Possible values for `gsinterlacemode` are:

<ul>
  <li>`0`: Automatic</li>
  <li>`1`: Off</li>
  <li>`2`: WeaveTFF</li>
  <li>`3`: WeaveBFF</li>
  <li>`4`: BobTFF</li>
  <li>`5`: BobBFF</li>
  <li>`6`: BlendTFF</li>
  <li>`7`: BlendBFF</li>
  <li>`8`: AdaptiveTFF</li>
  <li>`9`: AdaptiveBFF</li>
</ul>

## Errata

Some older versions of PCSX2 are affected by the following issues:

<table>
  <thead>
    <tr>
      <th>Affected Versions</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>v2.3.96 to v2.5.384</td>
      <td>
        Patches with a `<place>` value of `0` would be applied when they were enabled instead of just being applied during startup. This would cause guest memory corruption for patches that can only run on startup, such as those for executable unpackers.
      </td>
    </tr>
    <tr>
      <td>v1.7.4587 to v2.3.95</td>
      <td>
        Patches with a `<place>` value of `2` would not run on startup, and would hence behave identically to patches with a `<place>` value of `1`.
      </td>
    </tr>
  </tbody>
</table>
