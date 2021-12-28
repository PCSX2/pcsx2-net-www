<div class="single-article">

<div class="item-page clearfix">

<div style="text-align:center;">

</div>

One of the less obvious things that has plagued Pcsx2's compatibility
over the years is its event handling system. The system in place as of
0.9.6 is adequate for interpreter-based emulation but is not
well-equipped to handle the methods that a recompiler uses to manage cpu
cycle updates. This is something we aim to fix in the coming weeks.  
  
<span style="font-size: 13pt;"> **Cycle-based Timing Explained**
</span>  
  
All cpus have a cycle rate, which is typically the Mhz/Ghz values you're
most familiar with when talking about any cpu. An i7 clocked at 2.83ghz
has a 2.83ghz cycle rate. Now, the actual throughput of instructions can
vary greatly since each cycle of the cpu consists of several *stages*
and multiple piplines, each of which can have dependency stalls and has
varying rules for when such stalls occur. The cycle rate, however, is
always 2.83ghz. Because cycle rates are a known constant, they make a
good barometer for synchronizing the activities of a multi-processor
design like the Playstation 2.  
  
<span style="font-size: 13pt;"> **Why do Recompilers Complicate Event
Testing?** </span>  
  
Recompilers work as a significant speedup over interpreters by doing two
things:

-   Recompile the machine code of a emulated CPU (in our case MIPS
    instructions) into code native to the host machine (ix86
    instructions).
-   Prefetch and pre-decode emulated instructions, and inline them into
    blocks.

  
The thing recompilers are most well-known for -- recompiling to native
machine code -- is actually the less effective of the two things
recompilers do for speeding up emulation. The primary speedup typically
comes from the prefetching and inlining of instructions, which in
addition to eliminating the instruction fetch/decode stage (by far the
slowest part of any interpreter), also allows for cross-instruction
optimizations such as constant propagation and register caching/mapping.
In other words, a recompiler is effectively executing emulated
instructions in pre-compiled *bursts* . This is so important to
performance that a recompiler without block-level execution would hardly
be any faster than an interpreter.  
  
As part of the design of block-level execution, the recompiled code only
updates cpu cycle counts and tests for scheduled events at block
boundaries. Blocks typically span 5 to 35 cycles, but in some cases can
span a hundred cycles or more. When the subsequent Event Test is
performed, several scheduled events may be pending execution. This is
where problems can occur: The current event system implemented into
Pcsx2 executes all pending events in no particular order, leading to
events being executed out-of-order when multiple events time-out during
a single block. Typically most events don't have dependencies on each
other, or games don't use them in a way that execution order matters.
But sometimes they do, and in those cases behavior can be unpredictable,
or can cause the game to fail outright. To make matters worse, the
pending events typically don't know how late they are, and will
re-schedule subsequent events in increasingly belated fashion. The
current implementation of EE and IOP counters have tons of complicated
code meant to compensate for this limitation (both slow and were nearly
impossible to get right).  
  
The fix for this is to use an event system I'll call **decremental delta
time.** It has three advantages:

-   Makes it easy to execute events in scheduled order regardless of the
    amount of time which has passed since the last Event Test.
-   Maintains relative cycle scheduling at a high level so that none of
    the events being re-scheduled "lose time" due to belated
    block-boundary event testing.
-   Simplifies event handling on all levels, and provides significant
    speedups for event testing and event dispatching.

  
It's hard to know beforehand just how beneficial in-order execution of
events will be. I'm anticipating that it might actually fix a few
emulation problems on the IOP recompiler in particular, since it has a
slow cycle rate and also has a handful of events which can have
potential inter-dependencies. For that reason I'll be implementing the
system first into the IOP, and then when all the chinks in its armor are
worked free we'll port the EE side of the emulator over to it.  
  

<div
style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;">

[Post a Comment!](http://forums.pcsx2.net/thread-9759.html)

</div>

</div>

</div>
