<div class="single-article">

<div class="item-page clearfix">

<div style="text-align:center;">

</div>

It's the year 2009, and it's almost over at that; and as anyone reading
this blog well knows, multithreaded applications are the here-and-now
and future of desktop computing. It's the only way we can take advantage
of multicore CPUs. But multithreaded programming offers more than just
improved multicore performance. Using threaded programming is actually
very important to developing software that **behaves nicely** . By that
I mean software that refreshes its window contents quickly, responds to
your mouse clicks, and lets you cancel stuff.  
  
For that the best approach is usually threading, with the alternative
being something called "Cooperative multitasking" where by a program is
written such that it splits all tasks into neat little chunks. For
example, the two possible ways to implement loading an image (let's say
a png image):  
  
\* Load the image one scanline at a time, and then after each scanline
manually check for keyboard, mouse, or other input, and refresh the
screen.  
  
\* Load the image using a thread, and let the usual "global" windows
message handler dispatch keyboard, mouse, and refresh messages as
usual.  
  
The second approach has several advantages. For one, it needs fewer
temporary heap allocations (which are typically slow and fragment
memory). It is more responsive: windows messages will be handled in
parallel to the image loading, so you don't even need to "wait" until
the end of a scanline for user input to have its effect. It's also more
scalable: while the first system is able to load one image at a time
only in co-operative fashion (extending it to support multiple is
possible, but very difficult), the threaded approach can be scaled to
load dozens of images at once with no additional complications.  
  
The drawback is that thread synchronization and *especially* structured
error handling across threads tends to be much more complicated than
that of the linear cooperative model. If you don't have errors to
handle, or don't really *care* about handling errors, then threaded
tasking isn't so bad.  
  
Enter PCSX2, where everything ends up being damn complicated. Being a
perfectionist, I figured I'd design the new GUI completely on the
threaded model, doing away with cooperative design almost completely.
Such a design should help avoid any deadlocking scenarios and allow the
emu to recover from almost any error gracefully. Problem: The emulator
has a lot of inter-dependent parts and pieces that need to be
interlocked and synchronized, and all of them can throw out a variety of
errors -- which too I'd like to handle smartly; requesting extra user
input when appropriate (and not just throwing out annoying or vague
message boxes).  
  
Interlocking dependencies can be a nightmare. For example, if you start
a thread that loads an image, and then *block* on that thread until it
completes, you're worse off than if you wrote yourself a cooperative
image loader because now the whole program stalls waiting for the thread
to complete anyway. And like everything else, there are two ways to
handle this:  
  
(1) Use a "friendly" blocking mechanism that periodically polls the user
input and updates display. This is no better than cooperative
single-thread designs though, as it has slow response times and doesn't
scale well to multiple threads.  
  
(2) Build your entire GUI around "messages" and "callbacks" (sometimes
also called "signals"). This is the most flexible and user-friendly
option but can add a lot of "framework" to any codebase.  
  
I tried to use the first approach initially, because I was in a hurry to
get things working. But it's been problematic since day 1, so now I'm
redoing most things to use the second method instead.  
  
The second one is in fact the recommended design by Microsoft, and one
they've been using for almost everything in Windows ever since Win95.
It's one of the reasons the Win32 API feels "heavy" to a lot of
programmers, but as it turns out, it's not without good reason.  
  

<div
style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;">

[Post a Comment!](http://forums.pcsx2.net/thread-10758.html)

</div>

</div>

</div>
