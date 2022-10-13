---
title: "MSVC 2008 Optimizer Fail"
date: 2010-09-14T00:00:00
summary: "Over the past two years I have become dearly intimate with Microsoft's Visual C++ 2008 compiler, and the methods it uses for optimizing code"
draft: false
tags:
  - devblog
mainAuthor: Jake Stine
aliases:
  - "/developer-blog/193-msvc-2008-optimizer-fail"
  - "/developer-blog/193-msvc-2008-optimizer-fail.html"
  - "/developer-blog/193-msvc-2008-optimizer-fail.htm"
---

Over the past two years I have become dearly intimate with Microsoft's
Visual C++ 2008 compiler, and the methods it uses for optimizing code.
Now generally speaking MSVC 2008 does well -- very well -- especially
for everyday "not-so-clever" code. Its global optimization feature (aka
Linktime Code Generation, or LTCG) is also a tremendous advantage over
GCC -- though GCC is in the process of (finally!) adding LTCG to their
own C/C++ compiler. MSVC does have a few very annoying failings as an
optimizer, though. **The most glaring of which has to do with**
***templated code*** and ***inlined functions*** .

<span style="font-size: 11pt;"> **Disclaimer:** </span> This analysis is
for Visual C++ 2008 only. I have not yet analyzed MSVC 2010's code
generation. Some of these glitches may be improved or different (or
worse even) in 2010. I'll post an update if/when I compile information
it in the future.

*Edit/Update: This bug only appears to manifest itself when the input
parameters are 1st or 2nd generation propagated constants (which is hard
to explain if you don't know what that means). So chances of hitting
this bug are not actually all that common, but still plausible in many
coding scenarios.*


<span style="font-size: 12pt;"> **Inline Functions** </span>

Inline functions are the simpler sort, so I'll cover those first. Here's
a simple example of some code that will be optimized away in certain
situations.

```cpp
static bool g_global = false;
__forceinline void DoSomething( void* dest, size_t size )
{
    if (dest &amp;&amp; size)  memset(dest,0,size);
}

void main()
{
    [... code ...]

    // dest and size are known constants, so the compiler will inline the above
    // function and eliminate all its code -- ie, this line will be effectively ignored.
    DoSomething( NULL, 0 );

    [... code ...]
}
```


The problem is that even though the DoSomething() call is effectively
*ignored* , Visual C++ will still generate code that assumes the
function is modifying global memory. Why? Because the compiler's initial
analysis of the function doesn't take into consideration the fact that
it is being called/inlined with constants as parameters. That means the
calling function ( *void main()* in this case)will have to flush/reload
any global variables that may have otherwise been able to remain in
registers.

This problem becomes worse the longer a function grows, because every
new piece of code int he function can introduce additional optimization
dependencies. For example, if a function contains SSE instructions and
128-bit stack operations, it may require mandatory stack-frame
alignment, *even if the actual SSE code portions are optimized away* .

<span style="font-size: 12pt;"> **Templates** </span>

For those who do not know, C++ (and C99) has a feature called
templating; which is at its core a type-safe and debug-friendly
replacement for macros. PCSX2 uses templates extensively to generate
function call dispatches for various customizable features of the PS2. A
common technique in templates is to use switch statements to simplify
code:

```cpp
template&lt; uint value > void Dispatch()
{
    [.. setup code ..]

    switch(value)
    {
    case 1: [.. do stuff ..] break;
    case 2: [.. do stuff ..] break;
    case 3: [.. do stuff ..] break;
    }

    [.. cleanup code..]
}
```


In the above example, we've created a function that executes one of four
possible actions. The only thing that changes between each action is the
interior -- all actions share the same basic setup/cleanup code. Instead
of using separate functions and/or macros to do four separate instances
of the setup and cleanup code, we're able to merge everything into a
single template function. The compiler will automatically optimize the
function to use *only* the selected path. If *'value'* is 1, it runs
switch case 1. If it is 0, the entire switch is disregarded, etc.

The problem is the same as with the inlined function above: Visual C++'s
optimizer bases a lot of its optimization on the **whole function
anyway** , so dead code that isn't even part of a particular template
can adversely impact MSVC's code generation strategy. If only one of the
switch cases modifies global memory, any call to any other case will
still result in the compiler flushing global registers. Fortunately this
particular optimization is minor, and losing it has barely any
noticeable impact on performance on modern CPUs.

<span style="font-size: 12pt;"> **Sparse Switches and Binary Irony**
</span>

A second and more serious optimization failure occurs in
templated/inlined functions, however; if the function happens to use
*sparse* switches. A sparse switch is one where the values are not
contigious. Example:

```cpp
switch(value)
{
    case 0x0: if(toggle) { code; } break;
    case 0x100: if(toggle) { code; } break;
    case 0x101: if(toggle) { code; } break;
    case 0x102: if(toggle) { code; } break;
    case 0x520: if(toggle) { code; } break;
    case 0x521: if(toggle) { code; } break;
    case 0x522: if(toggle) { code; } break;
    case 0x733: if(toggle) { code; } break;
}
```


In this example, MSVC's optimizer will employ the use of a *binary
search* to dispatch the switch. Rather than compare each value
individually (8 compares), it will divide the switch into halves or
quarters. The resulting optimized code typically finds the right case in
two compares, with a worst case of 3-5 compares typically (a vast
improvement over an individual linear search, which has a median of 4
compares and worst case of 8 compares). This a great and wonderful
optimization and is often times *faster* than using function lookup
tables.

... but it actually *backfires* if the **toggle** value is a known
constant (such as a template parameter). The optimization method of the
switch statement is made by MSVC 2008 *before* it eliminates unused
code. So even if you explicitly assign a **value** of 0x101, MSVC 2008
will include its clever binary partition logic! The resulting
pseudo-code generated by the MSVC optimizer ends up looking something
like this:

```cpp
if(value >= 0x520) return;
if(value &lt; 0x100) return;

return; // which is the result of case 0x101 with toggle==false;
```


The explicit checks for equality are optimized out, as are all unused
cases -- just the umbrella binary search logic remains, and all it does
is return from the function without doing anything. So what should be a
null function ends up having 2 pointless compares; ironically caused by
a clever and highly effective optimization strategy in any other normal
situation.
