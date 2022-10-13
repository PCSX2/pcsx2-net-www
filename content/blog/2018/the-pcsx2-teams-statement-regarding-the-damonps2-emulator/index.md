---
title: "The PCSX2 Team's Statement Regarding The \"DamonPS2\" Emulator"
date: 2018-01-11T00:00:00
summary: "Hello all! We hope you had a Happy New Year. The PCSX2 team hopes to continue making further progress throughout 2018 and into 2019! However, today we are writing to both you and the emulation/open-source community on a more serious matter."
draft: false
tags:
  - devblog
mainAuthor: bositman
aliases:
  - "/286-the-pcsx2-team-s-statement-regarding-the-damonps2-emulator"
  - "/286-the-pcsx2-team-s-statement-regarding-the-damonps2-emulator.html"
  - "/286-the-pcsx2-team-s-statement-regarding-the-damonps2-emulator.htm"
---


Hello all! We hope you had a Happy New Year. The PCSX2 team hopes to
continue making further progress throughout 2018 and into 2019! However,
today we are writing to both you and the emulation/open-source community
on a more serious matter.

**Introduction and Background Information**
You may have heard from various sources that a second PS2 emulator for
Android was seen on the Google Play Store called DamonPS2. Initially, we
were very happy to learn that a new developer had taken the initiative
to begin work on a new PS2 emulator for a mobile platform; a daunting
task in itself that we applaud them for. After further investigation
however, we learned that there were rather striking resemblances to
PCSX2 contained in the new emulator.

The first piece of evidence that we learned was that the [GameIndex.dbf file distributed with the emulator](./img/gameindex.dbf.jpg)
(screenshot) contained
[patches](./img/patches.jpg) that were
specific to PCSX2, and furthermore would not work elsewhere. We were
also able to find matching CDVD strings using a text editor, such as the
[message returned](./img/message-returned2.jpg) by
the PCSX2 console when an PSX/PSone disc is inserted. Further evidence
included a [matching file structure](./img/file-structure.webp) and
graphical output that [mirrors GSdx](./img/gsdx.jpg).

In response to this evidence, we contacted the developer to notify them
about their violation of the GNU General Public License which PCSX2 is
protected under, since by all evidence they are using PCSX2 code without
releasing the source code and we gave them a time frame in which to
correct this issue. We hoped the issue could be resolved amicably for
both projects. However the developer would go on to claim that they did
not steal the PCSX2 source code, yet they offered us an extortionate sum
of money to stay silent, which as you can assert we did not accept. In
addition, they said that they would become open-source once the emulator
reached 80 million downloads (not very realistic...). In their final
email to us (which we did not respond back to) the developers wanted to
further "bargain" by setting up a licensing scheme; which we would not
accept under any circumstances regardless.

**Final Actions and Closing Comments**
As a result of the circumstances and the time frame lapsing, the PCSX2
Team submitted a DMCA takedown for the "DamonPS2" app on the Google
Play Store. The developer took down the emulator before the DMCA had a
chance to go through as they would have been notified about the DMCA and
probably wanted to avoid being banned from the Google Play Store, citing
some reason to their users about the description being bad, something
which we've never seen Google remove an app for. We will monitor the
situation and see what happens when the developer returns the app to the
store.

To further clarify any confusion you may have about this matter, our
actions were not done for any sort of personal/reputable gain or out of
spite. The PCSX2 team has always encouraged new developments to take
place whether it be inside a pull request or outside of the repository
as we've seen here. Ultimately, the developer's failure to comply with
the GNU General Public License in a reasonable time-frame left the team
with no choice but to take the appropriate actions. We would like to
take this moment to send our sincerest thanks to the community for their
wonderful support over the past 15 years!

**-The PCSX2 team**
