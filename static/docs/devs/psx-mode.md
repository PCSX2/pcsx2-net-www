# PSX mode

This page documents the development of PSX backward compatibility in PCSX2.

## How the hardware does it (early consoles)

- IOP reconfigures from being a sub processor to being the main CPU. Clock speed is reduced from 36.864Mhz to  	33.8688Mhz. Sound sample rate decreases from 48Khz to 41.1Khz.
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

## Some Device naming and explanation

### psx-spx

Martin Korth's excellent documentation of PSX hardware [here](https://problemkaputt.de/psx-spx.htm).

### SIO

- SIO0 is the PS1 Controllers & MC interface. It is an SPI port.
- SIO1 is the PS1 Serial port on the back of the early PS1 models. It is a UART Serial port.
- SIO2 is the PS2 Controllers & MC port(s). It is SPI and similar to SIO0, but more complex, with separate channels for each controller & MC and supporting higher speeds.

### SBUS, SSBUS, SSBUSC

The SSBUSC can be controlled to some extent (unlike the SBUS). See psx-spx Memory Control (the address & delay registers for different devices) and SSBUSC in fps2bios. The SSBUS is what connects the IOP peripherals to the IOP bus interface (SSBUSC), which interfaces to the IOP's System Bus, which connects (through some buffers and other (address/data multiplexing hardware most likely) to the SBUS. When I say IOP System Bus, I mean the internal bus, while when I say SBUS (or PS1 System Bus), I am referring to the bus that connects the IOP & EE.
The SBUS is an extension to the IOP's System Bus (and that is what it stands for anyway). On the PS1 it connects IOP to GPU and on the PS2 IOP and EE. Rightfully, the PGIF is an EE hardware that emulates the PS1 GPU registers, so that accessing them through the SBUS (like on the PS1) would work the same as on a PS1. The SBUS on a PS2 corresponds to the System Bus (not the internal, the external one) of a PS1.

## PCSX2 implementation ToDo's

### PGIF

> It would be best if test code was run on a real PS2 in PS1 mode, so that the real way the PGIF operates can be known. It is important, because it could give information that could help fix all issues with the PGIF (because it isn't that complex anyway). Fixing PGIF issues from this point onward, solely based on tests in pcsx2 could be very time-consuming, so I think that the next point on the TODO list should be hardware tests on the PS2.

### PGIF ring buffer size hack

> Using a small (the real) FIFO size of 0x20, disturbs MDEC video (and other stuff),
because the MDEC does DMA instantly, while this emulation drains the FIFO only when the PS1DRV gets data from it, which depends on IOP-EE sync, among other things.
The reason it works on real hardware, is that the MDEC DMA would run in the pauses of GPU DMA.
Thus the GPU DMA would never get data, MDEC hasn't written to RAM yet (too early).

\#define PGIF_DAT_RB_SZ 0x20000

This huge buffer has the side effect of making PGIF slower. It causes the video output to run slower than the music, for example. It should be fixed before attempting to solve the other video timing problems.

### SIO

> SIO0 changes for the initial psxmode patch might not affect PS2 titles but yet, SI02 seems far to connected to SIO0.
The 2 devices should be separated completely. SIO1 could eventually provide PSX game debug prints.

### IOP DMA

> A hack for DMA3 (CD-ROM DMA) currently solves an issue where MDEC DMAs would transfer data that isn't yet streamed from CD. Similar DMA race conditions exist on other DMA channels so an improved IOP DMA handler is required. It could work by introducing "transfer completed" delays like in other parts of the emulator. Additionally, it could look at the DMA priority bits (todo: which register / bit field?).
