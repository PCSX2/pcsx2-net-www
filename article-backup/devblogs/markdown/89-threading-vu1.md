::: {.single-article}
::: {.item-page .clearfix}
Well if you\'ve kept up with [pcsx2\'s
SVN](http://code.google.com/p/pcsx2/source/list) , you\'ll notice we
[recently added](http://code.google.com/p/pcsx2/source/detail?r=4865) a
MTVU (Multi-Threaded microVU1) option, which runs VU1 on its own
thread.\
\
Getting pcsx2 to use more cores is something many people have asked for,
and they wondered why we werent doing it. Some users would go as far as
to flame us pcsx2 coders saying we didnt have the skills to do it or
would say some other nonsense.

In reality, there are plenty of reasons why its taken so long for us to
code something like MTVU. The key reason is that emulation in general
does not lend itself well to threading components. If you want to be
safe and accurate at a hardware emulation level, you generally take the
approach of running the core CPU of the system (the EE-core in ps2s
case), and then based off the cycles you ran the CPU for, you time the
execution of all the other processing units in the system (DMAC (GIF,
VIF, SIF, ), VU0/VU1, IPU, IOP, etc).\
\
If you try to naively thread the components in the above model, youll
have 2 huge problems which may not be apparent to non-emu coders. One
problem is that threading the components (say GIF and VU1) at the same
time, will lead to very bad syncing errors if the GIF and VU1 need to
communicate with each other (and they do). The other problem is that
just running a component on a thread is actually going to be a slow-down
unless the thread is doing a lot of work without having to sync with
other components. As an example, both Jake Stine (Air) and I have in the
past experimented with naively threading VU1, and in addition to getting
unstable graphics and crashes, our attempts also ran slower.\
\
So now you may be wondering, If threading has all those problems how can
you get a speedup? Well we had to be smart about it, and figure out a
way to make threading work based on the properties of the hardware. One
thing we know is that for a component to even be worth-while to thread,
it needs to have relatively low interaction with other components (which
will limit the amount of syncing needed with other components; and
therefore increase the thread throughput), and it also needs to be a
component that is used frequently and is computationally expensive to
emulate (or else theres no point in threading it). Luckily the GS fit
that bill very well (which gave us MTGS), and to a lesser extent VU1
does (giving us MTVU).\
\
![](/images/stories/frontend/devblog/PS2_Flow_Diagram.png)\
(Some key components in the ps2; these arent drawn to any relative
scale)\
\
In the above diagram, I have drawn some of the key components which must
be considered when threading VU1 and the GS. The dark arrows show common
data paths where data is transferred frequently between the components
in games. The white arrow heads show data paths that are possible in
games, but are rarely used due to various reasons. There are some more
data paths and more components to the ps2, but theyre excluded for
simplicity (the actual grouping of the components in the ps2 also is a
bit different, but drawing them that way would complicate the diagram).\
\
Just so youre not left in the dark Ill briefly explain what the above
components are used for. The EE-core is the main CPU of the ps2 and
mostly handles game logic; using the GIF FIFO and Path 3, games
generally send image data (textures) to the GS (the gpu of the ps2). VU1
(Vector Unit 1) is used for coordinate, matrix, and vector calculations
games need to do for 3d graphics; when its done calculating it sends the
processed data over to the GS via GIFs Path 1. The VIF1 unit is in
charge of sending micro-programs to VU1, unpacking compressed data to
VU1s data memory, signaling VU1 to start executing its micro-program,
and it also can send data to the GS via GIFs Path 2. The GIF Unit is in
charge of managing the Path 1/2/3 transfers that are being sent to the
GS, and it does this according to path priority (Path 1 &gt; Path 2 &gt;
Path 3) and some other specific rules.\
\
If you notice in the diagram, the GS (Graphics Synthesizer) has data
coming into it frequently, and rarely ever needs to send data back to
other components. When threading the GS, what we essentially do is
buffer GIF transfers that are being sent to the GS, and then once we
have enough buffered data we kick-start the MTGS thread and have it
start processing the GIF packets we previously buffered. While its
processing this buffered data, the EE main thread is still running and
more GIF transfers are being buffered so that MTGS can process them when
it gets the chance\
\
The key to making something like this work from an emulation standpoint
is that the main emulation thread thinks that nothing is being threaded
at all; it sends data to the GIF Unit like normal, and this gets
processed according to the timing information from the EE core. However
that GIF transfer data is being buffered which allows the MTGS thread to
process the buffered data in parallel with the main emulation thread. If
you notice though this design means that the MTGS thread is actually
running behind the main emulation thread in terms of the data its
processing, because the buffered data is old data that the main
emulation thread has generated. The only time this can be a problem, is
if the main emulation thread ever needs to read back data from the MTGS
thread. In this case what needs to happen is the main emulation thread
needs to stall and wait until the MTGS thread is done processing. Once
that is done, the MTGS thread should have up-to-date status information,
and the main emulation thread can read back the appropriate data from
the MTGS thread. This syncing is slow and if emulation needs to do it a
lot it eliminates the speedup from threading (and can even be a big
slowdown), however as noted in the above diagram, the GS rarely ever
needs to transfer data back; so that means threading the GS is almost
always a speedup for us.\
\
Now that we understand the basics of how the MTGS thread works, we can
move onto MTVU. Since the GS was already the best candidate for
threading in a ps2 emulator, it meant that threading any other component
would be even more of a challenge. From analyzing pcsx2s activity and
design, the next component that made sense to thread was VU1. It is
relatively isolated compared to the other components, and it takes a lot
of computation power to emulate. However, there are some big problems
which must be solved to get a fast and working threaded VU1.\
\
One of the problems deals with what was talked about in the beginning of
this article, how typical emulation runs the different components based
off the cycles of the main CPU. With the typical emulation approach we
would run the EE for say 2048 cycles, and then we would run VU1 for its
equivalent amount of cycles which would be 1024 vu cycles (VU1 runs at
half the clock speed of the EE). This approach would be very problematic
for us with threading, because it would mean VU1 doesnt run long enough
for threading to be a speedup. However we are very fortunate because on
the PS2 games cant be as cycle-critical as they are with older systems.
Any well coded ps2 game has to have thread safe code and account for
possible timing inconsistencies (if the game doesnt do this, then it
likely wont be stable on the real console, or between minor variations
of the console). This means we can generally get away with running VU1
programs disregarding EE timing completely, and pcsx2 has actually been
using this approach for VU1 for years now (because even in a
non-threaded design its faster to emulate this way). Instead of running
VU1 for X amount of cycles based off EE cycles, we have code it so that
VU1 executes its complete micro-program till its finished. This is great
news for threading VU1 because it means that we can run VU1 on a thread
regardless of any EE timing and it wont be a problem. It also means that
since VU1 has been running in its entirety this whole time, from the EEs
point of view it has always seen that VU1s status is finished (because
it never gets a chance to read the status as executing). This means that
you can actually queue multiple VU1 programs, and run them at a later
time as far as the EE is concerned, because it doesnt really care about
VU1s status. This is even more good news for threading since it means
more through-put for the VU1 thread if it can be queuing and
sequentially executing multiple VU1 programs (as opposed to running only
one VU1 program while the EE waits on it to finish).\
\
There is another big problem with VU1 threading however: the VU1
processor works closely with the GIF Unit, and the GIF Unit is timed and
executed according to the main emulation thread. So that means sending
data to the GIF Unit from the VU1 thread would be at totally incorrect
times with respect to core emulation timing. Now our solution for this
is a bit tricky. What we end up doing is assume every VU1 program will
send data to the GIF Unit. So immediately when the main emulation thread
finds out it needs to execute a VU1 program, it sends a fake GIF
transfer packet to pcsx2s GIF Unit (and immediately after starts
executing the VU1 program on the MTVU thread). The GIF Unit then acts
like normal on the main emulation thread with its path arbitration and
eventually uploads this fake GIF packet to the MTGS thread. The MTGS
thread acts like normal telling the GS plugin to process real Path
2/Path 3 GIF packets until it reaches the fake Path 1 packet. When it
does this, the MTGS thread asks the MTVU thread if at least 1 VU1
program has finished since the uploading of the fake GIF packet. If it
hasnt, then the MTGS thread stalls until the MTVU thread can finish a
VU1 program. If the MTVU thread has already finished a VU1 program, it
signals the MTGS thread and then the MTGS thread wakes up and starts
talking to pcsx2s GIF Unit. At this point the GIF Unit should have a
Path 1 packet pending which the MTGS thread can process, because while
the MTGS thread was waiting, the MTVU thread had been communicating with
the GIF Unit and uploading real Path 1 packet data asynchronously to a
buffer. When the MTVU thread finishes the VU1 program, just before it
signals the MTGS thread that its done, it talks to the GIF Unit and
tells it that all the Path 1 data that was just transferred to it should
be considered a full Path 1 packet (and if no data was written to it,
consider it a full Path 1 packet with size = 0). So going back to the
MTGS thread, at this point it requests a full Path 1 packet from the GIF
Unit, and the GIF Unit gives it one of the Path 1 packets that the MTVU
thread has finished. Then the MTGS thread tells the GS plugin to process
this Path 1 packet, and the cycle just continues over and over every
time a VU1 program is run.\
\
The only flaw in the above solution for GIF processing is that in
reality pcsx2 needs to do some additional processing of GIF packet data
on the main emulation thread to check if certain privileged GS registers
are being written to (SIGNAL/FINISH/LABEL). With the approach described
above, we first send fake GIF packet data that the GIF Unit processes
instead of the real one; but if the game was really supposed to send a
GIF packet which writes to the GSs SIGNAL/FINISH/LABEL registers, then
we dont know about it and were out of luck. The game in this case will
likely hang. There is no 100% reliable solution to this problem that
still allows a fast threaded VU1, because in order to know for sure that
those privileged registers will not be written, you need to execute the
VU1 program and find out that it is not sending a GIF packet which
writes to them. The best you can do is predict what the VU1 program will
do based off what it did last time, but this is still not fully
reliable, and a lot more complicated, it also will have a lot more
overhead compared to the way were currently threading VU1, so in my
opinion its not worth it. The good news is that its very rare for a game
to write to the privileged registers from VU1s GIF Path 1 (they usually
do it from Path 2/Path 3), so that means that MTVU should be very
compatible, however due to this potential problem, MTVU has to remain a
speedhack instead of adding it as a normal option.\
\
The third big problem with VU1 emulation is the communication with VIF1.
The VIF1 if you remember is in charge of sending new micro-programs to
VU1 and decompressing data onto VU1 memory. In addition to this it has
commands to tell VU1 to start executing, and it has commands to wait on
VU1 to finish executing. All this VIF1 - VU communication screams
problems for a threaded VU1 design. However we have a clever solution
for this too. What we essentially do is duplicate VIF1, we have one
instance on the main emulation thread, and we have another instance on
the MTVU thread. Whenever VIF1 is told to do something on the main
emulation thread, it runs like normal until it reaches a command which
interacts with VU1. If the command is to wait on VU1, it just ignores
it, because remember pcsx2 already has been used to VU1 running in its
entirety, so VU1 is always complete when VIF1 has a command to wait on
it; so theres no need to wait on VU1. If the command is to transfer data
to VU1s memory, things get a tad more complex. What we do is write the
command in the MTVU threads internal ring buffer. The MTVU thread is
essentially just a ring buffer with queued commands which get processed
in-order. The VIF1 writes a command in MTVUs ring buffer to say upload
1024 bytes of data to VU1 micro-memory, and then the 1024 bytes of data
is also written to the ring buffer. Next VIF1 can send a command that
says execute VU1 with PC address = 0x1000, and this command gets written
to MTVUs ring buffer as well. Finally MTVU decides its time to start
executing commands in its ring buffer, and it sees the VIF1 command that
writes 1024 bytes to VU1 micro-memory, and it executes this command on
the MTVU thread. Then it sees the command to start VU1 executing at
address 0x1000, and it starts executing the microVU1 recompiler with PC
= 0x1000. This is the basics of how it works, the reason I said we have
to duplicate VIF1 between the main emulation thread, and the MTVU
thread, is that some VIF1 commands like VIF Unpack rely on status
information from VIF1s registers. To get this working on the MTVU thread
we need a separate state of VIF1 registers and status information,
because the VIF1s status on the main emulation thread would be different
by the time the commands are executed on the MTVU thread. Essentially
from this description, you can see that the MTVU thread not only threads
VU1, but also threads VIF1 command too. This is another speedup since
VIF1 Unpacks are very computationally expensive (and thats why we even
have a VIF Unpack recompiler).\
\
The remaining problems of VU1 threading are handling the cases where the
EE or other processors like VU0 ever need to read back from VU1. This
happens very rarely, but in this situation all we need to do is call a
Wait on VU1 Thread function immediately before trying to read from VU1
memory. If it happened often it would ruin any chance of speedups
threading VU1 had, but luckily it rarely happens. The EE actually works
very closely with VU0 as opposed to VU1, and so threading VU0 would not
be a speedup because the EE would end up reading back from it too much.
The good thing is that VU0 is rarely a bottleneck in games; this is
evident because you can usually run VU0 interpreters and get a minimal
speed-hit (if you try to run vu1 interpreters on the other hand, your
speed will usually crawl to \~2fps).\
\
By now you should hopefully have a better understanding of how pcsx2s
VU1 and GS threading basically works, but you may still have questions
on why its taken so long for us to do it. Well as shown above there were
a lot of problems with threading VU1 which needed to be solved, and we
werent sure about the best ways to handle them. Another huge reason is
pcsx2 was not in a good state to make VU1 threading a reality until
recently. We didnt have a centralized GIF Unit like the ps2 does;
instead we had code that was all over the place and running the GIF
paths without proper scheduling. The new GIF Unit rewrite solved this
problem for us. Another problem was that Super VU1, the old VU1
recompiler, was not thread safe (it combines stuff for VU0 and VU1
emulation together), so a new thread safe recompiler was needed, which
was one of the goals for the microVU recompiler I wrote. Another problem
was the sloppiness of a lot of old pcsx2 code which had needless inter
dependencies between various other code modules; we needed to isolate
the related code with code refactoring and rewrites to clearly separate
the code and make it thread safe. We also needed a thread-safe code
emitter which allowed us to run multiple dynamic-recompilers in
parallel; we solved this by a code emitter rewrite and using thread
local storage for the emitters global data. Lastly we needed someone who
knew about all these various components and was bored enough to try
making something like this work ![Very
Happy](https://pcsx2.net/images/stories/frontend/smilies/biggrin.gif){.yvSmiley
width="20" height="20"}

**[Post a Comment!](http://forums.pcsx2.net/thread-23686.html)**
:::
:::
