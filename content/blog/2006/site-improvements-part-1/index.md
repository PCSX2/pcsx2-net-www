---
title: "Site Improvements Part 1"
date: 2006-09-29T00:00:00
summary: "Since the launch of the new site last year, several improvements have been made to the site. Some of you may have noticed that the site is looking a bit different since yesterday"
draft: false
tags:
  - devblog
mainAuthor: Falcon4ever
aliases:
  - "/developer-blog/229-site-improvements-part-1"
  - "/developer-blog/229-site-improvements-part-1.html"
  - "/developer-blog/229-site-improvements-part-1.htm"
---

Since the launch of the new site last year, several improvements have
been made to the site. Some of you may have noticed that the site is
looking a bit different since yesterday.

The site now contains several navigation panels to look up old news.
Another (maybe) less noticeable improvement has been made to the page
caching engine. Over the past year, PCSX2.net has been using a custom
written cache engine. Whilst this had been functioning well enough for
sometime now, it still had a few nasty bugs which where hard to trace,
leading to glitches such as *Page 1 of 0* .

Also due to a demand for a cleaner (and easier to maintain) code, we
have been looking into several template engines. Thus the engine used to
cache pages has be switched.

For the current version of the portal, we're using the *Smarty* template
engine. More information on how smarty works will follow in a later blog
article.

The pcsx2.net community is pretty large (including Windows and Linux
users) it's no surprise that users are using different kinds of
browsers. To be compatible with most recent browsers, most pages are
XHTML 1.1 compatible (the compat page is the only exception at the
moment), because of this standard, PCSX2.net should be viewable in
Firefox 1.5.x, IE6, IE7 beta, Opera 8.x and Opera 9.x.

An interesting result of this high browser compatibility, is that
PCSX2.net can be browsed on SONY's PSP unit! To give you an impression
on how this looks, here are a few shots:

**\[News page\]** and **\[Screenshots page\]**

![](./img/site-impr1s.jpg)
![](./img/site-impr2s.jpg)


**\[Compat page - using the search!\]** and **\[Contact page\]**

![](./img/site-impr3s.jpg)
![](./img/site-impr4s.jpg)

The upcoming weeks a new function will be added to the compat page. To
give you a small hint:

![](./img/site-impr5.gif)
