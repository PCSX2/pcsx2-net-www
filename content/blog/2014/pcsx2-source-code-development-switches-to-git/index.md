---
title: "PCSX2 Source Code Development Switches To Git"
date: 2014-03-28T00:00:00
summary: "We just moved the PCSX2 version control system from SVN over to GIT"
draft: false
tags:
  - devblog
mainAuthor: bositman
aliases:
  - "/256-pcsx2-source-switches-to-git"
  - "/256-pcsx2-source-switches-to-git.html"
  - "/256-pcsx2-source-switches-to-git.htm"
---


Hey everyone,

We just moved the PCSX2 version control system from SVN over to GIT.
The new official source code repository is hosted on GitHub.
You can find the source code [here](https://github.com/PCSX2/pcsx2) .
And the new issue tracker [here](https://github.com/PCSX2/pcsx2/issues)
.

Git is more contributor friendly than SVN. The process of sending
patches to a team member for eventual review has been streamlined.
Now people can just fork the master repository, add their changes and
open a pull request if they think it's good. The devs can then merge
the request and the code is live.

This change is a pretty big operation, so please excuse (and report) any
issues you find while we're transferring
😉

Keep in mind the build bot will take some time to update to the new
source code repository, whenever Orphis can get around to it so until
then, be patient!
