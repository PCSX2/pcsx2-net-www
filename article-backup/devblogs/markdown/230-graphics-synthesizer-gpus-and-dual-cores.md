<div class="single-article">

<div class="item-page clearfix">

<div style="text-align:center;">

</div>

It was apparent early on the project that the GS plugin was going to be
a big bottleneck during 3D scenes. It isn't that the GS plugin itself
does a lot of computation on the CPU, but the fact that it needs to
communicate with the graphics card means that unnecessary stalls will
occur in the graphics driver as the GPU and CPU are synchronized. During
these stalls, the CPU basically goes to lunch until the GPU is ready.
Graphics drivers and libraries are aware of this and try as little as
possible to communicate with the graphics card. They usually cache
render state changes, shader changes, and texture changes up until
actual geometry is rendered. They also take advantage of FIFOs (first in
first out buffers). The CPU just writes to the FIFO and the GPU just
reads from it, this makes all the difference in terms of keeping the GPU
active while the CPU isn't and vise versa.  
  
The biggest challenge when designing games and hardcore applications
that need to use the GPU to its full potential is to make sure that
graphics driver stalls are minimal **at all costs** . What kills games
isn't sending geometry down the graphics pipeline, but it is when render
targets are switched, render targets are used as textures in the next
draw call, textures are locked, and when render targets are transferred
from GPU memory to CPU memory (in the last case, the CPU not only goes
to lunch, but has dinner also). GPU optimization talks usually appear in
every Game Developers Conference and there are many papers on them on
the net, so there is a lot more to the story than written here.  
  
All this means is that single-threaded applications really need to
design their GPU algorithms well to see fast frame rates. This
unfortunately is not possible with Pcsx2 and the GS plugin. The GS
plugin has to draw geometry in the same order as it was received. This
kills almost all caching techniques used by modern games because the GS
and PC GPUs have very different performance bottlenecks. In modern GPUs,
it is advantageous to group as much geometry as possible in one draw
call. The GS doesn't suffer from such bottlenecks. The GS also has two
different contexts which makes things twice as difficult. ZeroGS can
only do a limited amount of work-arounds before compatibility starts
dropping, so the only other option is to try to multithread the GS. Note
that using graphics libraries from multiple threads is not a trivial
task.  
  
Fortunately, the GS plugin is very unique in its nature. 99% of the
communication that happens between the GS plugin and the rest of the
systems components happens in the direction to the GS. The only times
the EE needs to synchronize with the GS is when it reads back the
FINISH/SIGNAL registers and part of the 4Mb GS memory. Register
readbacks are used frequently, so this suggests that tight
synchronization will be needed with the GS. The GS memory readbacks
aren't as frequent; however, they require some special considerations
with Virtual Memory and DMAs. The rest of the 99% of communication that
goes to the GS happens with a GS FIFO.  
  
When first started, Pcsx2 creates a GS thread and reserves special
memory for the GS FIFO. The GS plugin then creates the Direct3D
device/GL context **only for that thread** . Then when the game runs,
the EE copes all its GS packets to the FIFO and then notifies the GS
thread. The GS thread then checks if the FIFO has data, and then sends
it to the GS plugin. This sounds easier than it actually is because very
tight synchronization needs to happen to make sure no overwriting occurs
in the FIFO. The FINISH/SIGNAL register synchronization actually doesn't
happen across the EE and GS thread boundaries. Instead the EE thread
peeks at all the packets ahead of time and handles it in its own
routines.  
  
What makes the "Dual Core" option special is the notifies part of the
last explanation. The GS thread can either sleep waiting for a
notification from EE, which can be done by WaitForSingleObject and
SetEvent functions. Or it can continually check if the GS FIFO is empty
without ever stopping. The latter option kills single cores but goes
much faster on dual cores. The results of clicking on the MTGS and DC
options on dual cores are phenomenal. Usually frame rates go up or even
surpass 2x.  
  
Multithreading in games is going to be very big in the future. The times
have passed when there is one CPU that does everything and one GPU that
just renders. The biggest problem is which game processing to divide
into which thread, and how these threads will communicate with each
other. Many of these issues are still open and current game companies
are struggling with the added complication of concurrent execution.  
  
**Moral of the blog** - GPUs have become so powerful that people are
staring to do tasks like stereo vision and general purpose computation
with them. Learn how to use them. I recommend ***ShaderX3: Advanced
Rendering with DirectX and OpenGL*** by Wolfgang Engel and ***GPU Gems
2: Programming Techniques for High-Performance Graphics and
General-Purpose Computation*** by Matt Pharr, Randima Fernando, and the
20+ researchers that contributed to it.  
  

<div
style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;">

[Post a Comment!](http://forums.pcsx2.net/thread-9745.html)

</div>

</div>

</div>
