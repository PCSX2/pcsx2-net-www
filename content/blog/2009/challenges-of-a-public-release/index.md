---
title: "Challenges Of A Public Release"
date: 2009-02-03T00:00:00
summary: "Without a doubt, creating a public release of PCSX2 is an exhausting affair"
draft: false
tags:
  - devblog
mainAuthor: Jake Stine
aliases:
  - "/developer-blog/217-challenges-of-a-public-release"
  - "/developer-blog/217-challenges-of-a-public-release.html"
  - "/developer-blog/217-challenges-of-a-public-release.htm"
---

Without a doubt, creating a public release of Pcsx2 is an exhausting
affair. We just got finished posting the latest and greatest in 0.9.6, and while it's
nice having everything done and over with for now, it sure feels like
there should have been a better way.

This time around we tried to make use of our GoogleCode Svn in "smart"
fashion, and created a branch for the Release Candidate. The jury's
still out on if this proved to be successful or not. Several
ground-breaking fixes were submitted shortly *after* the RC branch was
made, so we had to merge all of that stuff in. Furthermore, I got
carried away and experimented with partial merges, without fully
understanding the advantages of reverse merges, so I had to undo several
of my own merging errors. And just to add salt to the wound, TortoiseSvn
had a bug that would frequently "forget" line breaks; merging all code
changes into one super-long line. -\_-

So in the end, the merges required a lot of brain power, a lot of time,
and may have led to some small mistakes. These were all things we were
hoping the RC branch would help reduce, so it was a bit of a fail on
that account.

The other stress tester when doing an official release is the updating
of the compatibility list, which is both a lot of work for our dedicated
testers and has the nasty side-effect of making us devs completely and
totally aware of just how many games actually emulate worse now, instead
of better. So each day was a mad dash to do regression testing on each
new set of titles that came in as no longer being playable. This was
made even more challenging by the fact that most of the regressions
ended up being pretty old, dating back to the pre-Playground days
(meaning they were attributed to 0.9.5 Svn revisions). We only managed
to get a few of the riddles solved.

So yeah, it's true -- the overall "playable" number of games is lower in
0.9.6 compared to 0.9.4, due to many semi-obscure titles which are
unable make it past the intro in 0.9.6. But on the other hand, games
that are playable tend be much more accurately emulated now, and are
certainly much faster. And 0.9.6 also runs a couple dozen games that
0.9.4 could not (most of which are big titles many folks have looked
forward to for some time). In the meantime, though, you might want to
keep that old 0.9.4 copy around for some of those titles that need it.
