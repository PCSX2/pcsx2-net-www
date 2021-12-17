::: {.single-article}
::: {.item-page .clearfix}
::: {style="text-align:center;"}
:::

One of the first things I sought to do when I first started contributing
to PCSX2 was to improve the emulator\'s overall stability and error
handling; and to this day it\'s still one of my top priorities.\
\
My method of doing so was initially seen as controversial: I merged in
drk\|\|Raziel\'s VTLB code (which was C++), converted the rest of the
PCSX2 codebase to C++, and started replacing the (lack of?) error code
return values with modern C++ exception handling. The initial reaction
from the public (and some PCSX2 team members) was either distrust or
panic. Chants of *\"C++ is slow!\"* or *\"Exception handling is slow!\"*
frequented the PCSX2 revision comments.\
\
And admittedly, for some tasks and in some specific scenarios, C++ and
it\'s exception handling are slow. But, of course, the key is to avoid
those scenarios\... which as it turns out is really quite easy. Better
yet, clever use of C++ and its exceptions can actually be a *speedup* .
How is that possible? I\'ll explain!\
\
Typically in traditional error handling models, you check the return
code of a function for errors, like so:

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      if( DoSomethingSpecial() == SPECIAL_FAIL )            {            // Handle error.            }     `
:::
:::

\
This is simple, short, and quite fast compared to the overhead of
entering a C++ **try/catch** block. But let\'s consider a more practical
everyday example:

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      int DoSomethingSpecial()            {            if( DoSomethingElse() == SPECIAL_FAIL ) return SPECIAL_FAIL;                  // Do stuff based on DoSomethingElse's success            Console::WriteLn( "Success!" );                  return SPECIAL_WIN;            }                  void LoopOfCode()            {            do            {            // code [...]            } while( DoSomethingSpecial() != SPECIAL_FAIL )            }     `
:::
:::

\
The above code snippet must perform no less than *two conditional checks
per loop* just to propagate the error code up the chain of function
calls, and this isn\'t even handling the possibility of a function
returning more than one error code yet! This is a situation where C++
Exception Handling can come to our rescue:

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      void DoSomethingSpecial()            {            DoSomethingElse();                  // Do stuff based on DoSomethingElse's success            Console::WriteLn( "Success!" );            }                  void LoopOfCode()            {            try            {            while( true )            {            DoSomethingSpecial();            };            } catch( Exception:: SpecialFail&& )            {            }            }     `
:::
:::

\
The above C++ snippet performs the exact same operation, except now *no
conditionals are needed* . We\'ve traded off the two conditionals per
loop for the entry/exit code for the **try/catch** block. But the block
is outside the loop, so it will be run only once. Conditional checks are
one of the slower operations on almost any CPU design, which means if
the loop is a busy one which spins frequently this C++ code will
certainly be a *significant* speedup over the plain jane C version. And
that\'s just with one return code. Adding multiple exception handlers
doesn\'t impact performance at all, so in a case where there are
multiple return codes the C++ exception handling approach shines even
brighter.\
\
\... thus dies the age-old rumor that C++ is slower than C. IT\'s all in
how you wield your sword. Or\... well\... programming language.\
\
*Edit:* I should add that the basic theory of optimization I\'m using
here is what I call \"optimizing for the common case.\" It\'s a process
of speeding up the code that\'s being run more frequently (which in our
example above is a typically error-free running loop) by offloading the
logic to an area of the code that\'s run much less frequently (the
exception handler\'s entry/exit overhead). It\'s one of the most
powerful optimization techniques any programmer can employ.\
\

::: {style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;"}
[Post a Comment!](http://forums.pcsx2.net/thread-9816.html)
:::
:::
:::
