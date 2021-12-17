::: {.single-article}
::: {.item-page .clearfix}
::: {style="text-align:center;"}
:::

One thing is for sure: The new 0.9.7 betas will use a *lot* more threads
than the current 0.9.6 releases. Now this doesn\'t necessarily mean the
emulator will take advantage of quad core CPUs better than 0.9.6, least
not in a gameplay sense. As I explained in my previous blog, threading
is as much a function of improving responsiveness and recoverability as
it is about sharing a workload across multi-core cpus, and so far most
of the threading implemented into 0.9.7 is the scalable/responsive
sort.\
\
One of the major changes in 0.9.7 will be the removal of what I call an
**\"aggressive spinwait\"** in the *EmotionEngine (EEcore)* emulation
unit. A spinwait is a simple loop that waits on a variable to change,
like so:\

::: {.codeblock}
::: {.title}
Code:
:::

::: {.body dir="ltr"}
`      volatile bool IsRunning = true;            StartThreadedAction();            while( IsRunning );            // When the above while() exits, the ThreadedAction is done.     `
:::
:::

\
This is a very simple threading design, but it\'s mostly drawbacks and
not many advantages. We\'ve continued to use it up to now in PCSX2\'s
EEcore because there wasn\'t much reason to do away with it; and with
the EEcore being the main orchestrator of everything in PCSX2 (gui
included!), having the high-resolution responsiveness of a spinwait made
some sense.\
\
On the current design in 0.9.6, the EEcore and the GUI share time on the
same thread, and when the GS thread is busy, the EEcore will split time
between waiting on the GS (via the spinwait) and processing GUI
messages. This transition from EEcore emulation to GUI message
processing was typically costly, but was necessary to handle input from
the user. In the new 0.9.7 design, the EEcore has its own thread
separate from the GUI. This allows us to remove the overhead of having
to switch to/from GUI processing code, but it came with a somewhat
unexpected drawback: the EEcore\'s aggressive spinwait is now suddenly
*very* aggressive when a game becomes GS-limited. In 0.9.6 the spinwait
breaks from time to time to splice in some gui messages and make time
for the GS to do its thing too. This kept everything pretty happy. But
with the splicing gone, the EEcore is allowed to run free, soaking up
tons of resources simply re-testing the same variable over and over.\
\
The full impact became obvious when we realized that setting 2 software
threads in GSdx caused PCSX2 to slow to a crawl (sub 1fps!) on dual core
systems. That\'s what happens when you have three threads using
spinwaits on a dual core system \-- they completely starved out
everything else, and to some extent each other as well. (yes, GSdx
software uses spinwaits also!)\
\
The primary solution is to get rid of the spinwait in the EEcore. In its
wake we\'ll put the EEcore to sleep and have it wake up only once the
MTGS ringbuffer has emptied to a satisfactory percentage. With the
EEcore asleep, the GSdx thread(s) will have full reign over all the
resources of the cpu; which will allow it to play \"catch up\" more
efficiently than it can even in 0.9.6. This model will be an obvious win
for both software rendering, and possibly DX11\'s multithreaded pipeline
in the future.\
\

::: {style="font-style: italic; font-size: 10pt; font-weight: bold; text-align: right;"}
[Post a Comment!](http://forums.pcsx2.net/thread-10880.html)
:::
:::
:::
