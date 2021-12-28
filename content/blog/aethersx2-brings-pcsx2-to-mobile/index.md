---
title: "AetherSX2 brings PCSX2 to mobile"
date: 2021-11-24T00:00:00.0
summary: "As you have probably seen by now, there is a new Android emulator in town called AetherSX2, which shows to have very promising performance and compatibility"
draft: false
tags:
  - "devblog"
mainAuthor: bositman
aliases:
  - "301-aethersx2-pcsx2-mobile"
previewImage: "/blog/aethersx2-brings-pcsx2-to-mobile/AetherSX2sm.jpg"
---

An exciting bit of news! As you have probably seen by now, there is a new Android emulator in town called AetherSX2, which shows to have very promising performance and compatibility. While the latter is due to it being based on an LGPL licensed emulator for PC (that's us!), the former is due to the clever work of the developer Tahlreth.

As you can expect, at first we were very skeptical about this, due to the whole situation with DamonPS2 that you may remember; a new Android emulator appearing needed to be approached with caution. But instead of being met with hostility, the developer was very forthcoming and friendly, and was more than willing to discuss the remaining barriers, and the path to overcome them.

Since there have also been several people concerned about the licensing behind PCSX2, we decided to try and explain the situation and how it pertains to the GPL and LGPL license.

PCSX2's core code is LGPLv3 licensed, which is compatible with the GPLv3 license, and all the plugin code which has been merged during the 1.7 dev cycle was relicensed to LGPL with authorisation from the authors, too. However, there's also 3 bits of GPL code used in the project that remain:
- Some debugger code from PPSSPP
- The FreeType library which is used for our OSD
- libmpeg2 which is used for video decoding

The existence of these 3rd party GPL parts means that PCSX2 as a combined works needs to comply to the GPLv3 license but our source code that we own remains LGPL.&nbsp; By distributing the code when requested we comply with the GPLv3 license. See the GNU FAQ [here](https://www.gnu.org/licenses/gpl-faq.html.en#IfLibraryIsGPL) and [here](https://www.gnu.org/licenses/gpl-faq.html.en#AllCompatibility). If these mentioned libraries are removed, the entire project would become purely LGPL licensed.

These concerns of course extended out to this new emulator, and we had to reach out about it to Tahlreth. After a good discussion with him about these issues, we have been assured that it will no longer be a problem by the time the emulator releases. Right now the only piece of GPL code they need to contend with is libmpeg2, which can be replaced with FFmpeg, which is under the LGPL license; this is something we planned on doing in the future, since libmpeg2 is over a decade old. As for the aforementioned debugger and Freetype code, they no longer exist. Aether has its own OSD and no debugger, meaning the emulator will be entirely LGPL.

In addition, the developer very kindly let us see an early alpha of the emulator, and it runs better than most of us expected! We are really looking forward to recommending it to all those wanting PCSX2 on Android, as this is probably the best it's gonna get.

For final words, we'd like to warn the community about false information and fake software. So far, even we have caught numerous fake APKs, (ongoing) impersonation attempts, faked/stolen videos, brigading, and misinformation regarding AetherSX2. We want to emphasize that it is currently in closed beta, and is only available for select people. While there is currently no version available to the public, the emulator is going to be free once released, collect no data, and is not planned to be distributed outside of the Google Play Store.

For your own safety, be sure NOT to:

- Download or install any APKs that are shared through youtube links or other sources, as likely contain viruses or copies of different emulators
- Pay attention to people claiming to be a developer other than /u/Tahlreth on Reddit
- Believe anybody is affiliated with AetherSX2 unless confirmed by /u/Tahlreth
- Trust any social media outlet except the official subreddit /r/AetherSX2, unless trusted news sources report on it, Tahlreth (at time of posting) has no other social presence such as Discord

Please wait for follow-up announcements and information from Tahlreth directly on [/r/AetherSX2](https://www.reddit.com/r/AetherSX2/).

![](./AetherSX2sm.jpg)
