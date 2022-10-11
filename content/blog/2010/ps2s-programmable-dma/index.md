---
title: "PS2's Programmable DMA"
date: 2010-08-31T00:00:00
summary: "For those who don't know, DMA stands for Direct Memory Access, and it refers to logic circuits in a computer that allow for the automated transfer of system memory to and from peripherals"
draft: false
tags:
  - devblog
mainAuthor: Jake Stine
aliases:
  - "/developer-blog/194-ps2s-programmable-dma"
  - "/developer-blog/194-ps2s-programmable-dma.html"
  - "/developer-blog/194-ps2s-programmable-dma.htm"
---

For those who don't know, DMA stands for ***Direct Memory Access*** ,
and it refers to logic circuits in a computer that allow for the
automated transfer of system memory to and from *peripherals* . DMAs are
beneficial because they are simple circuits that do work in parallel to
the CPU -- while a DMA transfers data, the CPU is free to do other
work.that requires more complex computations and logic. The end result
is better utilization of the computer's maximum memory transfer
bandwidth and computational/logical ability.


Traditionally DMAs are pretty simple. The Playstation 2's EmotionEngine,
however, has an 'intelligent' programmable DMA controller (DMAC). Neatly
translated, it means that the DMAC can do a lot more than just move raw
data from place to place. It supports several modes of operation and has
a number of special features to take advantage of the unique multi-core
design of the EE. Furthermore, the EE's DMAC is much more tightly
integrated with its memory bus than traditional DMAs, allowing it to
transfer data with exceptional efficiency. These two features combined
make the EE's DMAC a *key component* to PS2 games developers -- in quite
a few games, the DMAC actually does *more raw work* than the EE Core CPU
(R5900).

**How The Real Thing Works**

While emulating the actual hardware of the DMAC isn't usually needed, it
can still be helpful to understand exactly how the PS2's real DMAC works
at a hardware level. The EE DMAC operates at 147mhz (1/2th the EE's core
clock speed), and transfers 128 bits (16 bytes) of memory per cycle;
meaning that the theoretical maximum transfer rate of the DMAC is 2.4
GB/s (147mhz \* 16 bytes). It's a nice number, but is technically
unattainable even in ideal conditions. Further explanation will make it
clear why.

The DMAC connects the PS2's 32 MB of Main Memory (RAM) to various
peripheral interfaces, such as VIF (VPU), SIF (IOP), GIF (GS), and IPU
(mpeg decoder). VIF, GIF, and IPU are all part of the Emotion Engine and
operate at 147mhz, same as the DMAC itself. Thus each of those
interfaces can send/receive data at roughly 2.4GB/s. SIF is limited by
the IOP's own DMA controller and memry bus, which operates at 1/8th the
speed of the EE's DMAC, or about 154MB/s.

**Peripheral FIFOs**

Each peripheral (VIF, GIF, SIF, IPU, etc) has a 128 or 256 byte FIFO.
The FIFO helps mitigate occasional latency differences between Main
Memory/SPRAM and the peripheral (some peripherals, in particular the
GIF, can incur cycle stalls depending on data sent to them). Thanks to
the FIFOs, data can be *burst* to/from memory in 128-byte blocks, which
helps maximize data transfer rates since the EE's memory bus was built
to operate most efficiently in those conditions. However, the maximum
bandwidth of Main Memory (32MB) in ideal conditions is only \~1.2GB/s
(half of the DMAC), and has additional memory bank related latencies,
reducing its effective transfer rates even further. If DMA transfers are
only done to/from Main Memory, the DMAC will only be able to come within
about 40% of its theoretical maximum throughput.

**Enter the Scratchpad!**

The Scratchpad (SPRAM) is 16KB of memory integrated directly into the
EmotionEngine. Because it is directly integrated on-die, it has no
read/write latencies and can *always* be accessed at the maximum
transfer rate of 2.4gb/s. The integrated nature of the SPRAM means it
has to be small in order to fit -- and its lack of size is what limits
its usefulness.

So in order to utilize the bandwidth potential of the EE DMAC, a PS2
programmer must find ways to use a combination of Main Memory and
Scratchpad transfers in parallel: When main memory stalls due to
inherent latencies, the DMAC will automatically busy itself with a
pending SPRAM transfer. Likewise, while the DMAC is transferring to/from
SPRAM, the EE's Main Memory becomes available to the CPU, which further
improves the system's CPU throughput.

**The Scratchpad's MemoryFIFO (MFIFO)**

The MemoryFIFO function of the EE DMAC performs and managed two
simultaneous DMA transfers, as follows:

-   Scratchpad -&gt; Main Memory (RAM)
-   Main Memory (RAM) -&gt; Peripheral (VIF1 or GIF)


As the buffer in memory is filled by Scratchpad, it is simultaneously
drained by the attached peripheral, either VIF1 or GIF. On the surface,
the MFIFO can appear to be somewhat silly, since the DMAC already has
the ability to transfer direcly from SPRAM -&gt; Peripheral. Adding a
stop in Main Memory might seem like a waste of the DMAC's bandwidth
capacity, but in some situations the 'extra work' can result in a
general improvement in overall transfer speeds.

The PS2 engineers introduced the MFIFO for two reasons:

1. The scratchpad is too small. MFIFO can be used by the EE core as a
place to "empty" the scratchpad after its completed a set of data
processing. While the data in the MFIFO awaits the DMAC to transfer it,
the EE is free to load new raw data into Scratchpad for processing.

2. The GIF has additional bandwidth constraints since it has direct
connections to three **PATHs** : the the VU1 co-processor (GIF PATH1),
VIF1 FIFO (GIF PATH2), and the DMAC's GIF channel (GIF PATH3). When
transfers are active on any one of the paths, the other two paths must
idle/stall until the current path's transfer completes; meaning that
DMAC transfers to both GIF and VIF1 channels can have unexpectedly long
stalls.

So by using MFIFO, the EE core can mitigate the unpredictable GIF/VIF1
stalls while it works on entirely new sets of data in parallel. If a GIF
transfer via DMA is stalled because of other PATH1 or PATH2 transfers,
the DMAC can busy itself with other transfers in meantime, such as
SPRAM-&gt;memory or memory-&gt;SPRAM. These transfers are nearly 'free'
in a sense, since the DMAC would have been idle regardless -- but thanks
to the MFIFO concept, the SPRAM itself will be free for use by the EE
Core to continue processing data. Thus while the DMAC's overall
productivity isn't affected, the EE's overall computational ability
improves.

I'll talk a bit more on actual emulation details of the PS2's
programmable DMA controller in future blogs, so this is *To Be
Continued...*
