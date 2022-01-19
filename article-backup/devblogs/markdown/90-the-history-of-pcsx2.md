<div class="single-article">

<div class="item-page clearfix">

Some forum members had shown quite an interest in the history of the
emulator, so i thought, why not? I'll write a history of the emulator to
the best of my knowledge for everybody to look at! Hopefully those who
have been here longer (like bositman) can fill you in a bit more on what
happened. My apologies for any inaccuracies, I didn't join the team
until version 0.8.0 (January 2005)! So, here goes.....

  
Around the middle of 2001 (Roughly) the PCSX2 project started with just
2 people, Linuzappz and Shadow, who formally coded the PS1 emulator
named PCSX.� Having finished that project to a point they deemed
successful, they decided to embark on a new project which at the time,
was completely unheard of, a Playstation 2 emulator, so PCSX2 was
born.  
  
They were later followed by other coders such as auMatt, Loser, florin
and Saqib, who at the time was known as asadr. This small band of coders
with a big dream, little documentation and lackluster hardware (at the
time, it was good gear!) managed to forge something together which
vaguely simulated a playstation 2, but only to the lengths of running
simple homebrew software, which had its doors opened by this small
achievement.� Not content with the fact they had developed a homebrew
emulator, the guys wanted some genuine PS2 software to run, so they
picked a few simple games (such as Bust-a-move) and got to work.  
  
Many revisions later and lots of plugin development, they managed to get
some games to show loading screens and some even ingame footage, this
was a massive achievement for the group, proving to the world that this
proof of concept emulator was a reality, showing the world that it was
possible.  
  
To show a true emulation image of a system such as the PS2, there is one
behemoth which must be conquered to give it that feel which the
playstation 2 has, the PS2's own BIOS file.� This was an extremely
complex, tricky bit of software to emulate.� From what i've been told,
this took days of solid coding, hacking and debugging and reading of
Assembly language to achieve, however when they did eventually get it to
run it was extremely distorted, graphically incorrect and extremely
slow. Being a feat such as this, it didn't matter how it looked, they'd
done it! With the BIOS in place, it allowed the developers to open the
doors on PS2 gaming, providing correct BIOS functionality, system
configuration and setup provided by the BIOS, some of which is
imperative for PS2 games to run.  
  
From this point on, the team spent a lot of time implementing missing
parts of the emulator and replacing hacks with correct emulation once
those areas were understood, slowly improving the compatibility and
speed of the emulator, including the implementation of the first
Recompiler into PCSX2 (may have been earlier, but it was before me!)
which was coded and developed by Goldfinger, this provided a huge leap
in speed from the age old Interpreter which is slow by design.  
  
Through time several developers have come and gone. I (Refraction)
joined the team around version 0.8.0 (January 2005) after submitting
some MFIFO fixes which helped improve the emulation of Final Fantasy X.�
Later we had Zerofrog join the team, who is responsible for ZeroGS,
ZeroSPU2 and the rewrite of the last incarnation of the VU and EE
Recompilers which gave us the huge speed boost many will remember in
v0.9.1 (June 2006).  
  
During the summer of 2007, GiGaHeRz finally managed to crack one area of
the emulator nobody had dare attempt before, he managed to get Netplay
to happen! Myself, GiGaHeRz, CKemu, Saqib and Falcon4ever found
ourselves logging in to Monster Hunter for a general meet up and
drinking session in the virtual world. This was an amazing event for
us,� it was also very fun talking to other players with the conversation
generally going like "Hey, I'm playing this on my PS3
<img src="https://pcsx2.net/images/stories/frontend/smilies/smile.gif" class="yvSmiley" width="20" height="20" alt="Smile" />
That's cool, we are playing this on our PC's using PCSX2" "oooh! that's
awesome! can we tag along with you guys?", it was very pant wetting for
us and other players alike. Unfortunately, almost by sheer coincidence,
many online servers shut down merely weeks after we announced we had
netplay, I see no conspiracies, really
<img src="https://pcsx2.net/images/stories/frontend/smilies/tongue.gif" class="yvSmiley" width="20" height="20" alt="Razz" />  
  
By 2008, Zerofrog had left the team to further his real life career at
bigger companies and didn't have any more time for the team, myself and
asadr (Saqib) were the only remaining developers and with such big
pressures upon the two remaining developers, moral and willingness to
code the emulator dropped off significantly, leaving myself and saqib
just committing small changes to the emulator to keep things afloat, we
we're not going to let it die on us now!  
  
After the release of 0.9.4, GSDX went under major improvements from our
very own Gabest to improve the overall speed of the popular GS plugin
GSDX. He added support for DirectX 10, which solved the issue of
clipping surfaces (Due to limitations with DirectX 9) and improved the
caching methods of the plugin itself to bring the performance up.�
Additionally, he rewrote the entire software renderer to be faster
overall, but also to allow extra threads, so running the graphics plugin
in software mode on an i7, across several threads, showed little
difference in performance to hardware mode! The graphics plugin
continues to grow in strength with a lot of support from the other team
members and the community providing information on current issues to be
resolved.  
  
In February 2009, we enlisted the help of a group of enthusiastic coders
who had been hosting the project PCSX2 Playground, we recognized the big
potential for these guys to be on the team in recognition of the amazing
work they were doing. This expanded the team greatly, bringing in
developers such as Jake.Stine (Air), arcum, cottonvibes and rama, ever
since the emulator has been booming with improvements and advanced the
state of the emulator immensely! Since then we have had developers such
as pseudonym and gregory.hainaut join the team, both of whom have
provided an excellent amount of work in their fields of expertise.  
  
Here we are today, potentially months away from the release of PCSX2
0.9.8, which is showing the highest compatibility the emulator has ever
shown, with nearly 59% of games being playable on the emulator
(regardless of speed) and a further 22% of games getting to the ingame
content, this is a whopping 81% compatibility! which is a huge feat when
you look back to how the emulator was in the early days. We are ever
closer to releasing what can be consider the near-on perfect Playstation
2 emulator, but before we can get there, many big challenges await us.�
Only time will tell.......  
  
Of course a mention is needed for the many beta testers and plugin
developers who have done their part to improve device emulation and root
out the errors and problems for the devs to look into: Bositman,
Prafull, CKemu, Falcon4ever, ChaosCode, Nachbrenner (Patch hacker
extraordinaire), Crushtest, Neeve (VU/EE floating point accuracy
improvements), RPGWizard, Chickenliver (Lilypad), Rebel\_X (Twinpad),
Luigi\_\_(Megapad) and many many more, we appreciate everything you have
done for the emulator, if i forgot your name, it's due to memory laps!
we appreciate what you have done too!

**[Post a Comment!](http://forums.pcsx2.net/thread-18664.html)**

</div>

</div>
