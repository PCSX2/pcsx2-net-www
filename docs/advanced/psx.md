---
title: "PSX Mode"
summary: "About PCSX2's PSX Mode"
draft: false
toc: true
sidebar_position: 4
---

## Can PCSX2 run PSX games?

:::caution
PCSX2 can run some PSX (PS1) games but this feature is **highly experimental and not intended for general use**. Expect plenty of visual bugs, hangs and low compatibility in general.

- We **DO NOT** accept Github issues for PSX games.
- We **DO NOT** provide support for PSX games.
- PSX mode is provided **AS-IS** for the purposes of research and testing.

Instead, please consider using one of the many PSX emulators that already exist. We recommend [DuckStation](https://github.com/stenzek/duckstation/releases/tag/latest).
:::

---

This page documents the development of PSX backward compatibility in PCSX2.

## How the hardware does it (early consoles)

- IOP reconfigures from being a sub processor to being the main CPU. Clock speed is reduced from 36.864Mhz to 33.8688Mhz. Sound sample rate decreases from 48Khz to 41.1Khz.
- EE (and GS) reconfigure to being a sub device to the new CPU, emulating the PSX GPU. IOP talks to this GPU via the PGIF device which is actual hardware on the EE.
- IOP sends data to PGIF using DMA channel 2 and the EE+GS combo takes that data to draw graphics.
- To PSX software, it looks like it was talking to a regular PSX GPU while the EE+GS GPU emulation outputs visuals using PS2 hardware.
- Important: Unlike real PSX consoles, the PS2 implementation does not properly switch video modes (PAL / NTSC).
  All the settings that make up a valid PAL / NTSC mode are set only once, when ps1driver starts up, and they get set according to the console region (though this can be tricked on real hardware).
  Once the console is in PSX mode, software can still cause a 'mode change', but this will not affect the real GS video timings. In effect, it only changes the image position offsets. (Modchips for real hardware offer settings like a 'Y-Fix' to shift the image up and down to counteract this behaviour, though they do nothing to fix choppy scrolling, etc.)
- IOP's bus uses a different configuration, accessing controllers and Memory Cards via SIO0 instad of SIO2, for example.
- SPU2 memory is (somehow? via SSBUSC?) limited to 512KB, down from 2MB. Several SPU2 registers are remapped (via SSBUSC?) because they didn't exist in the old SPU. An example is the register for the Reverb(Effect) End Address. It is configurable in SPU2 mode but fixed to 0x7FFFF in SPU mode. In SPU mode, the EEA register doesn't exist.

## How the hardware does it (later 'slim' consoles)

- Beginning with consumer hardware (SCPH-7500x), IOP is emulated on a PPC processor (IBM PPC 405GP) with the DECKARD emulator.
- The BIOS versions belonging to these consoles start at v2.20.
- The PGIF implementation doesn't support this configuration yet. So BIOS versions < 2.20 must be used for now.

## Some device naming and explanation

### psx-spx

Martin Korth's excellent documentation of PSX hardware [here](https://problemkaputt.de/psx-spx.htm).

### SIO

- SIO0 is the PS1 Controllers & MC interface. It is an SPI port.
- SIO1 is the PS1 Serial port on the back of the early PS1 models. It is a UART Serial port.
- SIO2 is the PS2 Controllers & MC port(s). It is SPI and similar to SIO0, but more complex, with separate channels for each controller & MC and supporting higher speeds.

### SBUS, SSBUS, SSBUSC

The SSBUSC can be controlled to some extent (unlike the SBUS). See psx-spx Memory Control (the address & delay registers for different devices) and SSBUSC in fps2bios. The SSBUS is what connects the IOP peripherals to the IOP bus interface (SSBUSC), which interfaces to the IOP's System Bus, which connects through some buffers and other (address/data multiplexing hardware most likely) to the SBUS. When I say IOP System Bus, I mean the internal bus, while when I say SBUS (or PS1 System Bus), I am referring to the bus that connects the IOP & EE.
The SBUS is an extension to the IOP's System Bus (and that is what it stands for anyway). On the PS1 it connects IOP to GPU and on the PS2 IOP and EE. Rightfully, the PGIF is an EE hardware that emulates the PS1 GPU registers, so that accessing them through the SBUS (like on the PS1) would work the same as on a PS1. The SBUS on a PS2 corresponds to the System Bus (not the internal, the external one) of a PS1.
