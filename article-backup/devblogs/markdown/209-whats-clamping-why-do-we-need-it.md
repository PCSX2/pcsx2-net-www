::: {.single-article}
::: {.item-page .clearfix}
::: {style="text-align:center;"}
:::

In pcsx2\'s advanced options dialog (if you\'ve dared to look), you\'ve
might have noticed there\'s \"FPU Clamp Mode\" and \"VU Clamp Mode\"
settings. You may even have experimented with some of these modes and
found out they fix or break games.\
But what are they doing? And why so many options?\
\
Well first you have to know what a floating point number is. A float is
simply a representation of a rational number from a string of bits,
whose decimal point can change or \'float\'. (This isn\'t the exact
definition, but good enough for this conversation).\
\
Basically there\'s something called the \"The IEEE Standard for
Floating-Point Arithmetic\" (or IEEE 754), which defines floating point
representation; and most systems abide by those rules (of course not our
wonderful PS2).

\
There\'s 32-bit \"Single Precision Floats\" (commonly referred to as
\'float\'), 64-bit \"Double Precision Floats\" (commonly referred to as
\'double\'), and there\'s even 128-bit floats called Quads (most
processors don\'t support these natively).\
\
The one we\'re concerned about is the Single Precision Float, which is
32bits and has a format like this\
\
S x 1bit \| E x 8bits \| M x 23bits\
\
S = Sign Bit (0 = Positive Number; 1 = Negative Number)\
E = Exponent (Biased according to some formula)\
M = Mantissa (Normalized with a hidden bit)\
I\'m not going to go into detail on how this stuff works, but [wikipedia
is quite
helpful](http://en.wikipedia.org/wiki/IEEE_754-1985#Single-precision_32-bit)
![Very
Happy](https://pcsx2.net/images/stories/frontend/smilies/biggrin.gif){.yvSmiley
width="20" height="20"}\
\
Anyways what we need to know is that the IEEE 754 standard defines
values with the Exponent bits \"11111111\", as \"NaN\" values (short for
\"Not a Number\").\
\
To be more precise, there\'s also INF (infinity) values, qNaN (quiet
NaN), and sNaN (signaling NaN).\
Basically NaNs are given when the result of an operation is undefined.\
\
Like if you divide 1 / 0, you get a NaN result, because you can\'t
divide a number by 0.\
Or if you take the Square-Root of a negative number, you get a NaN
value.\
\
INF values are basically what it sounds like, its an attempt to
represent infinity.\
\
The tricky part is that now that you have a NaN or INF value, if you
ever try and do a calculation with them, you\'ll get a NaN or INF value
as the result.\
\
Example:\
NaN + 500 = NaN (generally the same NaN, since it propagates)\
INF - 19999999999 = INF\
\
This is how the IEEE 754 standard defined this stuff (I honestly don\'t
like it, but w/e)\
\
The ps2 however doesn\'t support NaN\'s and Infinities!\
So basically, the numbers in the range of INF/NaN on a IEEE 754 pc, are
just very-large numbers (or very small numbers if negative (if the sign
bit is 1)).\
\
For comparison of what your x86-32 CPU does VS the ps2 we have:\
\
**Your PC:**\
1/0 = NaN\
sqrt (-4) = NaN\
INF - 1000 = INF\
\
**The PS2:**\
1/0 = Greatest Positive Float Number (0x7ffffffff)\
sqrt (-4) = sqrt(abs(-4)) = 2\
INF - 1000 = Some Large Value - 100\
\
And there\'s many more combinations, but the point is that the results
are not the same between PC and the PS2.\
\
\
So how do we solve these problems?\
Well there\'s no \'fast\' way to emulate the ps2 behavior 100% correct
(this would require a software FPU, which will be **very-slow** ).\
\
What we do instead is use a combination of clamping, simulation, and
cleverness.\
\
The way clamping works is if a value is INF or NaN, we \'clamp\' it into
the closest value that\'s not a INF or NaN.\
Basically we force values into \'normal numbers\' so that it doesn\'t
mess up operations as much.\
\
This isn\'t 100% exact, but its generally \'good enough\' to fix many
problems with games.\
Let me give you a quick example of something clamping can solve:

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      int main() {            float value = INF;            do {            value = value / 2;            if (value <= 1){ print("Hello World"); break; }            } while (true);            }     `
:::
:::

\
If the above code was ran on the ps2, it will eventually print \"Hello
World\", because INF is treated as a regular large number, and will
continue to be divided by 2 until its less than 1.\
\
But if done on your x86-32 PC, it will never print \"Hello World\" but
continue to loop forever, because Infinity divided by 2 is still
Infinity!\
Ever seen games that just hang in pcsx2? Sometimes its caused by
situations like above.\
\
Clamping can solve this problem like this:

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      int main() {            float value = INF;            do {            value = clamp(value); // If value is NaN/INF, make value into a big normal number            value = value / 2;            if (value <= 1){ print("Hello World"); break; }            } while (true);            }     `
:::
:::

\
The clamping will convert the INF into a normal (ordered) number. Then
that normal number can be divided by 2 repetitively until its less than
1. Then it will eventually satisfy (value less or equal 1), and print
\"Hello World\".\
\
\
Sometimes clamping breaks games (because of a lot of reasons that will
take too long to explain), but the basic problem is:\
The ps2\'s floats have a larger range of valid-values than your PC\'s
floats. Therefore we have to make values \'as close as possible\' on the
PC to try and make games happy.\
\
Because its impossible to know if clamping will break or help a game in
some situations, we have different clamp modes in pcsx2\'s advanced
options.\
Also clamping is SLOW if done a lot, so different clamp modes are faster
than others (\'None\' is the fastest of course
![Razz](https://pcsx2.net/images/stories/frontend/smilies/tongue.gif){.yvSmiley
width="20" height="20"} )\
\
\
I also should mention that in earlier examples i said:\
sqrt(-4) = NaN; // on your PC\
sqrt(-4) = 2; // on the ps2\
\
In this case, we simulate the ps2\'s sqrt instruction by doing this

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      float ps2_sqrt(float value) {            value = clamp(value); // Clamp Value if NaN or Inf to an ordered/normal number            value = abs(value); // Make Positive            value = sqrt(value); // Get sqrt of now-positive value            return value;            }     `
:::
:::

\
so:\
ps2_sqrt(-4) = 2;\
\
\
Now this post is getting really large, and I tried to simplify things a
lot (which may have made things more confusing).\
Anyways I hope some of this info was useful/interesting
![Razz](https://pcsx2.net/images/stories/frontend/smilies/tongue.gif){.yvSmiley
width="20" height="20"}\
\

::: {style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;"}
[Post a Comment!](http://forums.pcsx2.net/thread-9825.html)
:::
:::
:::
