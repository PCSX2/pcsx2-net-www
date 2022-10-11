---
title: "Introduction To Dynamic Recompilation"
date: 2010-03-13T00:00:00
summary: "his blog post is an introduction to dynamic recompilers (dynarecs), and hopes to provide some insight on how they work and why pcsx2 uses them to speed up emulation"
draft: false
tags:
  - devblog
mainAuthor: cottonvibes
aliases:
  - "/developer-blog/200-introduction-to-dynamic-recompilation"
  - "/developer-blog/200-introduction-to-dynamic-recompilation.html"
  - "/developer-blog/200-introduction-to-dynamic-recompilation.htm"
---


This blog post is an introduction to dynamic recompilers (dynarecs), and
hopes to provide some insight on how they work and why pcsx2 uses them
to speed up emulation.
It is probably easier to read on our forums, because some of the code
didn't wrap nicely on our main blog page....
( [Click here to view blog post in
forum](http://forums.pcsx2.net/thread-13453-post-101560.html) )

To first understand why dynarecs are useful, you must first be familiar
with a basic interpreter emulator.

Assume we are emulating a very simple processor. Processors have
instruction sets which are a set of different instructions they can
compute.
Lets assume the processor we are emulating is a made-up chip I'll call
SL3 (super lame 3), and has only these 3 instructions (and each
instruction has fixed width of 4 bytes):

MOV dest\_reg, src1\_reg // Move source register to destination
register
ADD dest\_reg, src1\_reg, src2\_reg // Add source1 and source2
registers, and store the result in destination register
BR relative\_address // Branch (jump) to relative address (PC +=
relative\_address \* 4)

Processors generally have what we call registers which can hold data,
and the processor's instructions perform the operations on these
registers.
For our example, we will assume that our SL3 processor has 8 registers,
and the size of these registers is 32 bits (so each register holds 32
bits of data).

Now to program for this processor, we can have the following code:

<!-- TODO - legacy -->

<div class="codeblock">

<div class="title">

Code:

</div>

<div class="body" dir="ltr">

`      MOV reg1, reg0            ADD reg4, reg2, reg3            BR 5     `

</div>

</div>


What this code does is:
1) It moves register 0 to register 1 (so now register 1 holds a copy of
register 0's data).
2) It adds register 2 and register 3 together, and stores the result in
register 4.
3) It branches 5 instructions further away (so now it jumps to some code
that is further down (not shown in above example))

So that is how we can program for the SL3 processor in assembly code.
But how do we emulate it?

To actually emulate this processor we can use an ***interpreter*** . An
interpreter simply fetches each *instruction opcode* and executes them
accordingly (e.g. by calling emulated methods for each different
instruction). The rest of the emulator (emulating other
processors/peripherals of our system) can then get updated sometime in
between instructions or after a group of cpu instructions are run.
Interpreters are a simple and complete way to emulate a system.

( [Click here to see a C++ code example of a simple
interpreter](http://forums.pcsx2.net/thread-13453-post-102002.html#pid102002)
)

Using interpreters we constantly have to be fetching and executing
instructions one-by-one. There is a lot of overhead in this, and minimal
room for optimization since most special case optimizations will have
the overhead of checking for them (so it will for example add extra
if-statements and conditionals... reducing the gain from the
optimization). But there's a faster way to do processor emulation which
doesn't have these draw-backs... using dynamic recompilation!

The basic idea of dynamic recompilation is to translate emulated
instructions once, cache the emitted translated instructions, and then
run the emitted native instructions as much times as needed.

Since the instructions you read are not changing (lets leave out
self-modifying code for this example), you can translate the emulated
instructions into native cpu instructions (in our case x86-32 asm
instructions) and then cache the translated instructions into 'blocks'
of code, then just execute these blocks of native code instead of having
to do the translation over and over again whenever the code needs to be
read again.

So for instance remember our above SL3 program:

<div class="codeblock">

<div class="title">

Code:

</div>

<div class="body" dir="ltr">

`      MOV reg1, reg0            ADD reg4, reg2, reg3            BR 5     `

</div>

</div>


Lets assume this code is part of some function and gets called 100's of
times a second (this could sound crazy, but games/applications commonly
call the same code hundreds or thousands of times a second).

Now our runCPU() interpreter function above will have to translate every
instruction before it can actually compute the result.

That is, it needs to fetch the opcode of every instruction, call the
emulated function based on the opcode number, then actually compute the
instruction result.
But dynarecs allow us to skip the "fetch opcode" and the "call the
emulated function" part, by only doing this once, and then caching the
translated code into native asm blocks.

To make a good dynarec, we first need a code emitter.
An emitter is a series of functions we call that write native asm to
some memory block we give it.
So we use an x86-32 emitter to write native x86-32 asm code to blocks of
memory, and then later we can execute these blocks as if they were
normal c++ generated functions!

PCSX2 has a very cool emitter that looks very similar to x86-32
assembly, except the instructions have an 'x' before them.
So for example:
mov eax, ecx;
is
xMOV(eax, ecx);
with the pcsx2 emitter.

Now the idea behind the dynarec we are going to write now, is that we
will end blocks whenever a branch instruction is detected (which will
jump to other blocks).

The code for actually recompiling these blocks looks something like
this:

<div class="codeblock">

<div class="title">

Code:

</div>

<div class="body" dir="ltr">

`      // This is our emulated MOV instruction            void MOV() {            u8 dest = fetch(); // Get destination register number            u8 reg1 = fetch(); // Get source 1 register number                  xMOV(eax, ptr[&amp;cpuRegs[reg1]]); // Move reg1's data to eax            xMOV(ptr[&amp;cpuRegs[dest]], eax); // Move eax to dest register                  fetch(); // This fetch is needed because every instruction in our SL3 processor is 4 bytes            }                  // This is our emulated ADD instruction            void ADD() {            u8 dest = fetch(); // Get destination register number            u8 reg1 = fetch(); // Get source 1 register number            u8 reg2 = fetch(); // Get source 2 register number                  xMOV(eax, ptr[&amp;cpuRegs[reg1]]); // Move reg1's data to eax            xADD(eax, ptr[&amp;cpuRegs[reg2]]); // Add eax with reg2's data            xMOV(ptr[&amp;cpuRegs[dest]], eax); // Move eax to dest register            }                  // This is our emulated BR (jump) instruction            void BR() {            s8 addr = fetch(); // Gets a number by which we will increment (or decrement if negative) PC by            PC = (PC - 2) + (addr * 4);                  // Get a pointer to a block of x86-32 compiled code            // that was recompiled by the recompileSL3() function            u8* block_pointer = getBlock(PC);                  xJMP(block_pointer); // Jump to the pointer returned by getBlock()            }                  // This goes through instructions and recompiles them            // It recompiles instructions until it reaches a BR() instruction.            u8* recompileSL3(u32 startPC) {            u8* startPtr = xGetPtr(); // Gets pointer to where the emitter is currently pointing to (the start pointer of the block)            PC = startPC; // Set PC to the start PC of this block            bool do_recompile = true;            while (do_recompile) {            u8 opcode = fetch();            switch (opcode) {            case 0: MOV(); break;            case 1: ADD(); break;            case 2: // We stop recompiling on branches            BR();            do_recompile = false;            break;            }            }            return startPtr; // Returns the pointer to where our block of x86 generated code starts at            }                  // This holds all the pointers to our blocks that were recompiled based on            // starting PC address. We will assume that the instruction memory for            // this processor is 16kb, which means that it can hold at-most 1024*16 bytes            // worth of instructions. And therefor we we have at-most 1024*16 block pointers.            static u8* blockArray[1024*16];                  // This returns a pointer to our recompiled block            // If it hasn't been compiled, it'll recompile the block and then return that pointer.            // We use __fastcall because it lets us pass the startPC parameter in the ecx register            // instead of having to use the x86 stack...            u8* __fastcall getBlock(u32 startPC) {            if (blockArray[startPC] == null) {            blockArray[startPC] = recompileSL3(startPC);            }            return blockArray[startPC];            }                  // Basic cpu emulator using dynamic recompilation            void runCPU() {            // This sets our emitter to start emitting instructions to rec_cache            // which is a large block of memory where we can write lots of            // x86 asm instructions to...            x86setPtr(rec_cache);                  __asm {            pushad; // Save all our registers            mov ecx, PC; // Move PC parameter into ecx register (for __fastcall)            call getBlock; // Call the getBlock function            jmp eax; // The block to jump to is returned in eax            }            }     `

</div>

</div>


Note the above code doesn't have any logic to successfully exit once it
starts executing recompiled blocks... I left this stuff out in order to
not complicate things... so assume that somehow execution ends and we
can get back to running the other parts of the emulator...
Also note we need to restore registers when we exit execution, and we
also need to set rec\_cache to the new x86 emitter address (so it can
continue where it left off instead of writing over already recompiled
memory blocks).
( [Click here for a more complete sl3 recompiler code with cycle
counting and exit
logic](http://forums.pcsx2.net/Thread-blog-Introduction-to-Dynamic-Recompilation?pid=102471#pid102471)
)

Now how does this work?
Well we basically call runCPU() which calls the getBlock() function with
the original PC value.
getBlock() then checks if we have already recompiled a block with that
start PC value, which we havn't yet, so it will go on to call
recompileSL3() and give it the startPC value.
recompileSL3() will loop through the opcodes, fetching them and then
calling the appropriate emulated functions which will write to memory
x86-32 asm instructions computing the correct results.
recompileSL3() will continue looping until it reaches a BR() instruction
(which will recursively call getBlock() until all the addresses have
been recompiled and no more recompilation needs to happen).

Once everything has been recompiled we jump to the starting block's
execution address, and that's how we actually run the execution.
The code that ends up being executed after we recompiled is only the
emitted code, which were the functions prefixed with 'x' (xMOV, xADD,
etc...).
Notice that that's a lot of code omitted as we don't have to fetch
anything anymore, but instead just run a series of fast generated asm
functions...
This means that although we have a lot of extra overhead on the actual
recompilation, we end up generating some really fast code, that could be
called 1000's of times a second, therefor making the initial overhead
well worth it!

We can also perform many optimizations while recompiling such as
regalloc, constant propagation, optimized asm generation for special
opcode cases, etc... (we didn't do this stuff in our example to avoid
complexities).


Hopefully this article has helped you gain a bit of understanding on how
dynamic recompilation works, and why we use it in pcsx2 to gain a lot
more speed over interpreters!
Also note that dynarecs can be used for more than processor emulation,
we also used dynamic recompilation in pcsx2 to cache asm optimized
unpack routines that the ps2's vif does.

I should also add that currently pcsx2 has the following dynarecs:
EE recompiler (for MIPS R5900 ee-core processor)
IOP recompiler (for MIPS R3000A i/o processor)
microVU recompiler (for VU0/VU1, and COP2 instructions)
Super VU recompiler (can be used instead of microVU for VU0/VU1)
newVIF unpack recompiler (recompiles vif unpack routines)
r3000air (not yet finished, but should one day supersede the IOP
recompiler)
