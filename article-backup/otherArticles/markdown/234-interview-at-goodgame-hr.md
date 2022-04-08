::: {.single-article}
::: {.item-page .clearfix}
## [Interview at GoodGame.hr](/234-interview-at-goodgame-hr.html) {#interview-at-goodgame.hr .contentheading}

::: {style="text-align:center;"}
:::

Some days ago we were contacted by a Croatian gaming site
[goodgame.hr](http://www.goodgame.hr) and were asked to give an
interview about PCSX2
😊 We were happy to answer all the questions and
help make PCSX2 known to even more people, so here it is:

*1.Hello. Can you tell us something about yourself before we get on with
the interview?*

I'm 'bositman', I've been with the PCSX2 team since 2003 and I am
responsible for the site, forum, configuration guide, user support,
documentation and testing.


*2.Can you briefly tell us about development of PCSX2 emulator till this
day?*

PCSX2 has advanced immensely in the past 2 years. With the 0.9.8 release
the compatibility and speed of the emulator got dramatically increased,
to the point that almost every modern system can handle most games. With
the latest addition of the MTVU speed hack (multi-threaded VU, runs the
VU1 unit in a separate thread, taking advantage of a third core, since
EE and GS already run in separate threads) many users got some nice
~15% speed up on their quad cores
😊


*3.How much people are working on this project? When has it all
started?*

Unfortunately currently the development team has been reduced in size
since cottonvibes and Jake Stine both found demanding jobs and had to
leave the project. Still, rama, pseudonym, refraction, gregory, arcum,
avih and Gabest (with a big comeback!) are working on PCSX2 these days.
It all started back in 2001 with shadow (A.K.A. expert, the current team
leader of JPCSP) and linuzappz both founders of the PCSX(1) project.
They started from the PCSX(1) source since the two systems share some
parts. I joined the team around 2003 assisting in testing and without
any particular knowledge of the PS2 or computer science. 10 (!!) years
later, here we are
😊

*4.Is it hard to work on the emulator development and what are the most
common problems you face?*

It can be very frustrating at times. I recall times where the documents
the coders were basing their code on were wrong or inaccurate, while we
were looking for the bug in our code implementation. Other times, you
fix something but something else that was relying on it and was also
buggy works worse after the fix, instead of better.
Things are so intertwined it is often impossible to know the result of a
bug fix or an improvement, even if the code is clearly better than
before.

*5.Where there any differences between developing PCSX2 and PCSX?*

The PS2 is a whole world different than the PS1 in terms of complexity,
I know that much. The SPU unit and some part of the R5900 CPU are very
close to the PS1 but that's where my knowledge ends. You'll have to
ask shadow or linuzappz for more info about that!

*6.Considering the amount of information and options regarding the
PCSX2, average user can be frightened over complicity of using PCSX2.
Some other emulators are far simpler with no additional adjustments
regarding graphics. Is PCSX2 more complicated because its better?*

No, that's not the reason. We offer so many options to give the user
more freedom to tweak the emulator as he likes. This way power users can
achieve more things, rather than if we had only a couple of simple
options.
We also have the configuration guide I've created which has been
translated by PCSX2 fans in 25 different languages (great job guys!)
which can be found in our website and forum. Avih recently made a quick
start guide for those who are bored of reading the big one and just want
to play fast.
Additionally, we introduced the preset system in the 0.9.8 release,
which is a slider that changes settings from safest and most compatible
to fastest and less compatible for some fast and easy tweaking without
the need of knowing what the options do.
We understand that the new users might be scared by the dozens of
options PCSX2 has, but since 0.9.8 the emulator comes configured with
the most compatible settings. All you have to do is install it, choose
your game and run it. Most games work great with the pre configured
settings we have
😊

*7.Do you think that you reached the limit in emulator development or
are there more things to add in PCSX2?*

There are tons of things that can still be added in PCSX2. Netplay and
USB emulation are two things that come in mind which are in very early
development stages. Of course compatibility and speed are still being
improved daily in small (or sometimes big) steps.

*8.How much money do you make on developing PCSX2? Is there any profit?
If not, why do you do it?*

The team doesn't get paid for developing PCSX2. We use the google ads
on our site and any donations from fans to pay for the server costs and
if there is any more left we use it to upgrade the developer's systems
so they can more easily integrate new technologies.

*9.Personally, on my configuration (Core 2 Duo 2.66, Nvidia GeForce
9600GT, 2 GB Ram) Ive noticed that RPG games are more pleasant to play
on normal graphic adjustments and with speed hacks enabled. Other games
are too slow, glitchy or unplayable at all. Which configuration is
optimal for PCSX2?*

This is one of the most frequent questions we get
😊 The truth is, there is no 'golden
configuration' for everything and this is why we have so many options
in PCSX2. The best configuration for the system you mentioned in your
question might be the worst for an older PC. The same goes for various
games, a good configuration for game X might not even work with game Y.
But to give you a general idea, a configuration that works with most
games and at nice speeds is the default one with all speed hacks marked
as [recommended] enabled. Of course there are games which are glitch,
very slow or simply not working for which you cant do anything but hope
the next version of PCSX2 takes care of those bugs for you
😊

*10.What is your attitude towards new HD editions of different games?
Maybe they would not be developed if they haven't seen the graphic
improvement on your PCSX2?*

If you ask me, the HD remakes of PS2 games on the PS3 look worse than
the initial PS2 game upscaled with PCSX2 at x3 or x4 its original
resolution. Still, I'm sure that even if everyone knew and could play
their games in HD using PCSX2, Sony would still release these HD remakes
since it's very easy money for them with minimal costs.
In addition, some HD remakes add more detail instead of just increasing
the resolution, something PCSX2 will never be able to do
😊

*11.What percentage of games is compatible with the PCSX2?*

According to our compatibility list and if we project that percentage to
the total of PS2 games, it should be around 70% playable games, huge
number in my opinion
😊

*12.What is SONY's official attitude towards PCSX2?*

Sony has not bothered us and we haven't bothered them either
😛 They certainly know we exist, but we never had
any legal problem with them, which was expected.
Even if Sony hated us, the PCSX2 team has been very careful to not
infringe any copyright of Sony since PCSX2 is provided for free, the
whole program was created with reverse engineering, no BIOS files are
provided with it which is a Sony copyright and there is no support for
piracy in our help forum.
So in the end, everyone is happy
😊

*13.Do you think that there is anything illegal with your emulator? Lets
face it, many users dont have original games but they download illegally
the games and then play it on the computer. How does PCSX2 deal with
these situations?*

As I explained in the previous question, there is nothing illegal with
PCSX2. Yes I agree there are many people who use PCSX2 with illegally
downloaded games and BIOS files, but this is out of our control. We
provide the program, if you use it legally or not is up to the user who
is responsible for his actions. The PCSX2 team gives no support for
anyone who is found to have pirated games or BIOS files, which is all we
can do.
No one thinks of the other side though, which in my opinion is very
common too. There are many people who own a PS2 console and because of
the features PCSX2 offers them (increased resolution, texture filtering,
save states, infinite memcards, usage of any pad-keyboard-mouse, cheats
etc) buy old PS2 games just to play them on the emulator which otherwise
they would not, thus increasing Sony sales.

*14.Considering the small number of people who know how emulators are
being developed, can you describe the process to us? How much time takes
between two versions? Do you have strict schedule? Offices? Secretary?
😊*

I can't tell you about the coding process since this was not my role on
the team, but I can tell you about the release process. We make a new
release when we feel that the changes from the previous versions are big
enough to warrant it and when it is stable enough for people to use.
There is no strict schedule but there is hours and hours and hours (you
get the drift
😛 ) of testing so we make sure that the release
will be stable and of high standards. This is usually achieved by
releasing internally to testers only some Release Candidate versions and
debugging them until they are stable. All the documentation and the
configuration guide are updated. We also have a room of hot, half naked
secretaries where the team members get their massage and...oh wait I'm
not supposed to tell you that!!

*15.When will the next version go out?*

I hate to do it but I'll have to use the cliche "When it's ready".
As I described above, a release will be made when the team believes
there have been significant improvements over the previous version, the
program is stable and has been tested with lots of games to make sure.
Using our release scheme (odd numbers like 0.9.7 and 0.9.9 are
beta-unstable releases while even numbers like 0.9.8 or...1.0.0(!!!
we're not sure about that yet!
😛 ) are stable releases) the next one (0.9.9) will
be beta-SVN only.

*16.Is it realistic to expect a PlayStation 3 emulator in a near
future?*

If you ask me, no it isn't. It is possible some development might start
in the near future (just like PCSX2 started back at 2001) but keep in
mind PCSX2 could run games decently at around 2007, 6 years after it
started! Now imagine how much time a PS3 emulator would need to start
running games properly (if it ever happens) considering the PS3 is more
complex and MUCH more powerful than the PS2....
Still, never say never
😊 I'd just like to warn people to NOT believe
some youtube videos or websites advertising working PS3 emulators
because they are all fake and virus infested (we recently found one of
these sites posted in our forum). It will take years before that will
happen for real
😊

Thank you for your time and thank you for getting to know the GG public
with all the details of PCSX2 emulator
😊
Thank you for giving us the chance to talk about PCSX2 and let more
people know of it
😊

You can check out the posted article here (although it's obviously in
Croatian
😛 ):
[http://www.goodgame.hr/vijesti/gg-interv...m-intervju](http://www.goodgame.hr/vijesti/gg-interviewpcsx-2-team-intervju)
:::
:::
