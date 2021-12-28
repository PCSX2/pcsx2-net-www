<div class="single-article">

<div class="item-page clearfix">

<div style="text-align:center;">

</div>

Yes, there is a way to simulate Microsoft's
[VirtualAlloc](http://msdn.microsoft.com/en-us/library/aa366887.aspx)
behavior on Linux. Much searching of the internet did not reveal a
satisfactory answer; only hints that when combined with some applied
tests of my own yielded the following result:  

<div class="codeblock">

<div class="title">

Code:

</div>

<div class="body" dir="ltr">

`      // to RESERVE memory in Linux, use mmap with a private, anonymous, non-accessible mapping.            // The following line reserves 1gb of ram starting at 0x10000000.                  void* result = mmap((void*)0x10000000, 0x40000000, PROT_NONE, MAP_PRIVATE | MAP_ANON, -1, 0);                  // to COMMIT memory in Linux, use mprotect on the range of memory you'd like to commit, and            // grant the memory READ and/or WRITE access.            // The following line commits 1mb of the buffer.It will return -1 on out of memory errors.                  int result3 = mprotect((void*)0x10000000, 0x100000, PROT_READ | PROT_WRITE);     `

</div>

</div>

  
When using **mmap** , you can create a simple uncommitted reservation of
memory simply by specifying PROT\_NONE on any anonymous mapping (in the
world of mmap, anonymous means it has no associated file/pipe -- it's
just a memory block). This is sufficient for reserving a large
contiguous address range from being fragmented up by the likes of
malloc. Granting the memory read and/or write privileges tells Linux to
*commit* the memory (equivalent to VirtualAlloc with MEM\_COMMIT). If
there is not enough system memory to complete the call, it returns -1.  
  
Oddly enough, though, Linux makes it so that it isn't even necessary to
bother with the above solution, via a strange little hacky technique
called...  
  
<span style="font-size: 11pt;"> **Over-committing Memory** </span>  
  
This 'feature' is enabled by default in most modern Linux kernels
(anything 2.6 or newer). Basically all this means is that Linux will let
programs *commit* a lot more RAM than is actually available to the
operating system! Instead of performing a "strict contract" on commit
that says "oh yes we absolutely have this much ram available", Linux
looks at the ram and looks at the request, and makes some arbitrary
judgement call on if the program will actually use that much ram or not.
In other words, just because your call to malloc returned a valid
non-NULL pointer doesn't mean there's actually anywhere near that much
memory available to your app. It just means that Linux doesn't think
you're going to use that much.  
  
Instead, as a program references its allocated memory, Linux commits the
memory on-demand. Most of the time, programs that malloc huge amounts of
ram only use a wee bit of it, so that's fine. By using *overcommitted*
memory management, Linux avoids the dreaded "Low on virtual memory!"
error that can sometimes plague Windows. This is actually highly ideal
for apps like PCSX2 and the Java virtual machine, for example. Kudos!  
  
.. oh but things do get fun if apps over-step their bounds!  
  
Thanks to over-committing, Linux programs that run out of memory do not
get error codes or NULL pointers. Instead they will typically be KILLED
INSTANTLY by the kernel. They do not get out of memory errors, and they
don't even get SIGSEGV or anything else that can be handled or logged.
They just DIE -- because doing anything else would risk system
stability. So in the long run, its still a good idea to use the
Reserve/Commit management strategy even on Linux (mmap / mprotect as
described above); because your app will be more likely to get proper
out-of-memory errors instead of just causing itself (and possibly other
processes on the system) to die suddenly and without warning or error.  
  
Another positive for the the above mmap / mprotect example is that it
will also work *well* on Linux systems that have over-commit disabled,
since it basically does what over-commit does but without the hacky
"programs die instantly without error" part if the system runs out of
physical memory.  
  

<div
style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;">

[Post a Comment!](http://forums.pcsx2.net/thread-16826.html)

</div>

</div>

</div>
