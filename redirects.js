const redirects = [
  {
    to: "/docs/category/setup",
    from: [
      "/guides/basic-setup",
      "/getting-started",
      "/config-guide/guide-translations",
      "/download/releases/tools",
    ],
  },
  {
    to: "/docs/setup/discs",
    from: "/docs/setup/dumping",
  },
  {
    to: "/docs/category/configuration",
    from: ["/docs/category/post-installation", "/docs/category/config"],
  },
  {
    to: "/docs/configuration/general",
    from: "/docs/post/general",
  },
  {
    to: "/docs/configuration/controllers",
    from: "/docs/post/controllers",
  },
  {
    to: "/docs/configuration/memcards",
    from: "/docs/post/memcards",
  },
  {
    to: "/docs/advanced/cli",
    from: "/docs/post/cli",
  },
  {
    to: "https://discord.com/invite/TCz3t9k",
    from: "/discord",
  },
  {
    to: "/blog/2021/aethersx2-brings-pcsx2-to-mobile",
    from: "/301-aethersx2-pcsx2-mobile",
  },
  {
    to: "/blog/2021/q1-2021-progress-report",
    from: "/298-q1-2021-progress-report",
  },
  {
    to: "/blog/2021/q2-2021-progress-report",
    from: "/299-q2-2021-progress-report",
  },
  {
    to: "/blog/2021/q3-2021-progress-report",
    from: "/300-q3-2021-progress-report",
  },
  {
    to: "/blog/2020/pcsx2-1-6-0-is-out",
    from: "/293-pcsx2-1-6-0-is-out",
  },
  {
    to: "/blog/2020/q3-2019-to-q1-2020",
    from: "/292-progress-report-q3-2019-to-q1-2020",
  },
  {
    to: "/blog/2020/q3-2020-progress-report",
    from: "/296-q3-2020-progress-report",
  },
  {
    to: "/blog/2020/whats-new-in-1-6",
    from: "/294-1-6-0-what-s-new",
  },
  {
    to: "/blog/2019/from-q2-2018-to-q2-2019",
    from: "/290-2018-2019-progress-report",
  },
  {
    to: "/blog/2019/merry-christmas-and-a-happy-new-year-to-everyone-from-the-pcsx2-team",
    from: "/291-merry-xmas-happy-new-year-2020",
  },
  {
    to: "/blog/2018/merry-christmas-from-the-pcsx2-team",
    from: "/289-merry-xmas-2018",
  },
  {
    to: "/blog/2018/q1-2018-progress-report",
    from: "/288-q1-2018-progress-report",
  },
  {
    to: "/blog/2018/q3-q4-2017-progress-report",
    from: "/285-q3-q4-2017-progress-report",
  },
  {
    to: "/blog/2018/the-pcsx2-teams-statement-regarding-the-damonps2-emulator",
    from: "/286-the-pcsx2-team-s-statement-regarding-the-damonps2-emulator",
  },
  {
    to: "/blog/2017/happy-new-year-from-the-pcsx2-team",
    from: "/280-happy-new-year-2017",
  },
  {
    to: "/blog/2017/q1-2017-progress-report",
    from: "/283-q1-2017-progress-report",
  },
  {
    to: "/blog/2017/q2-2017-progress-report",
    from: "/284-q2-2017-progress-report",
  },
  {
    to: "/blog/2017/q4-2016-progress-report",
    from: "/281-q4-2016-progress-report",
  },
  {
    to: "/blog/2017/qa-picking-our-noes",
    from: "/developer-blog/282-q-a-picking-our-noes",
  },
  {
    to: "/blog/2016/year-end-report-released-1-4-0",
    from: "/273-1-4-0-release-end-2015-report",
  },
  {
    to: "/blog/2016/alpha-testing-gs-world",
    from: "/developer-blog/279-alpha-testing-gs-world",
  },
  {
    to: "/blog/2016/channel-shuffle-effect",
    from: "/developer-blog/277-channel-shuffle-effect",
  },
  {
    to: "/blog/2016/january-february-2016-progress-report",
    from: "/274-jan-feb-2016-progress-report",
  },
  {
    to: "/blog/2016/new-website-launched",
    from: "/275-new-website-launched",
  },
  {
    to: "/blog/2016/q2-2016-progress-report",
    from: "/276-q2-2016-progress-report",
  },
  {
    to: "/blog/2016/q3-2016-progress-report",
    from: "/278-q3-2016-progress-report",
  },
  {
    to: "/blog/2015/explanation-hacks-needed-for-upscaling-glitches",
    from: "/developer-blog/267-explanation-hacks-needed-for-upscaling-glitches",
  },
  {
    to: "/blog/2015/explanation-impossible-blend",
    from: "/developer-blog/268-explanation-impossible-blend",
  },
  {
    to: "/blog/2015/july-august-2015-progress-report",
    from: "/271-july-august-2015-progress-report",
  },
  {
    to: "/blog/2015/june-2015-progress-report",
    from: "/270-june-2015-progress-report",
  },
  {
    to: "/blog/2015/linux-news",
    from: "/266-linux-news",
  },
  {
    to: "/blog/2015/major-gsdx-progress-and-monthly-progress-reports",
    from: "/269-major-gsdx-progress-monthly-reports",
  },
  {
    to: "/blog/2015/mmu-mini-series-part2-4",
    from: "/developer-blog/265-mmu-mini-series-part2-4",
  },
  {
    to: "/blog/2015/september-2015-progress-report",
    from: "/272-september-2015-progress-report",
  },
  {
    to: "/blog/2014/bug-fix-release-1-2-1-out",
    from: "/254-1-2-1-release",
  },
  {
    to: "/blog/2014/config-guide-1-2-1",
    from: "/257-config-guide-1-2-1-dev9ghz-compat-list",
  },
  {
    to: "/blog/2014/contriibute-to-pcsx2-wiki",
    from: "/developer-blog/262-contriibute-to-pcsx2-wiki",
  },
  {
    to: "/blog/2014/first-60-fps-video-and-some-website-news",
    from: "/261-first-60-fps-video-website-news",
  },
  {
    to: "/blog/2014/merry-christmas-from-the-pcsx2-team",
    from: "/264-merry-xmas-2014",
  },
  {
    to: "/blog/2014/mmu-mini-series",
    from: "/developer-blog/263-mmu-mini-series",
  },
  {
    to: "/blog/2014/pcsx2-development-picks-up-speed",
    from: "/260-pcsx2-development-picks-up-speed",
  },
  {
    to: "/blog/2014/pcsx2-drops-avg-toolbar",
    from: "/258-pcsx2-drops-avg-toolbar",
  },
  {
    to: "/blog/2014/pcsx2-source-code-development-switches-to-git",
    from: "/256-pcsx2-source-switches-to-git",
  },
  {
    to: "/blog/2013/frontends-cheating-editors-and-more",
    from: "/249-frontends-cheating-game-editors",
  },
  {
    to: "/blog/2013/merry-christmas-2013",
    from: "/251-merry-christmas-2013",
  },
  {
    to: "/blog/2013/pcsx2-partners-with-avg",
    from: "/252-pcsx2-partners-with-avg",
  },
  {
    to: "/blog/2012/interview-at-goodgame-hr",
    from: "/234-interview-at-goodgame-hr",
  },
  {
    to: "/blog/2012/merry-christmas-from-the-pcsx2-team",
    from: "/246-merry-xmas-2012",
  },
  {
    to: "/blog/2012/pcsx2-1.0-released",
    from: "/244-pcsx2-1-0-released",
  },
  {
    to: "/blog/2012/pcsx2-mac-updates",
    from: "/242-pcsx2-mac-updates",
  },
  {
    to: "/blog/2012/pcsx2-net-revamped",
    from: "/241-pcsx2-net-revamped",
  },
  {
    to: "/blog/2011/a-farewell-from-cottonvibes",
    from: "/77-a-farewell-from-cottonvibes",
  },
  {
    to: "/blog/2011/air-the-latest-pcsx2-retiree",
    from: "/87-air-the-latest-pcsx2-retiree",
  },
  {
    to: "/blog/2011/merry-christmas",
    from: "/76-merry-christmas",
  },
  {
    to: "/blog/2011/news-and-updates",
    from: "/78-news-and-updates",
  },
  {
    to: "/blog/2011/path-masking-geometry-syncing",
    from: "/88-path-masking-geometry-syncing",
  },
  {
    to: "/blog/2011/pcsx2-on-youtube-and-vimeo",
    from: "/79-pcsx2-on-youtube-and-vimeo",
  },
  {
    to: "/blog/2011/svn-snapshots",
    from: "/83-svn-snapshots-build-bot",
  },
  {
    to: "/blog/2011/threading-vu1",
    from: "/developer-blog/89-threading-vu1",
  },
  {
    to: "/blog/2010/a-new-kind-of-fullscreen",
    from: "/developer-blog/201-a-new-kind-of-fullscreen",
  },
  {
    to: "/blog/2010/advanced-memory-management",
    from: "/developer-blog/196-advanced-memory-management",
  },
  {
    to: "/blog/2010/benchmarking-multithreaded-pcsx2",
    from: "/developer-blog/91-benchmarking-multithreaded-pcsx2",
  },
  {
    to: "/blog/2010/facebook-twitter-and-exposure",
    from: "/108-facebook-twitter-and-exposure",
  },
  {
    to: "/blog/2010/happy-new-year",
    from: "/102-happy-new-year",
  },
  {
    to: "/blog/2010/introduction-to-dynamic-recompilation",
    from: "/developer-blog/200-introduction-to-dynamic-recompilation",
  },
  {
    to: "/blog/2010/msvc-2008-optimizer-fail",
    from: "/developer-blog/193-msvc-2008-optimizer-fail",
  },
  {
    to: "/blog/2010/new-pcsx2-0-9-7-beta",
    from: "/106-new-pcsx2-0-9-7-beta-r3878",
  },
  {
    to: "/blog/2010/pcsx2-plugins-update-for-windows",
    from: "/107-pcsx2-plugins-update-for-windows",
  },
  {
    to: "/blog/2010/ps2s-programmable-dma",
    from: "/developer-blog/194-ps2s-programmable-dma",
  },
  {
    to: "/blog/2010/spu2-is-more-than-just-sound",
    from: "/developer-blog/199-spu2-is-more-than-just-sound",
  },
  {
    to: "/blog/2010/the-history-of-pcsx2",
    from: "/developer-blog/90-the-history-of-pcsx2",
  },
  {
    to: "/blog/2010/the-return-of-the-commandline",
    from: "/developer-blog/198-the-return-of-the-commandline",
  },
  {
    to: "/blog/2010/updated-plugins-on-the-beta-downloads-page",
    from: "/111-updated-plugins-on-the-beta-downloads-page",
  },
  {
    to: "/blog/2010/virtualalloc-on-linux",
    from: "/developer-blog/195-virtualalloc-on-linux",
  },
  {
    to: "/blog/2010/configuration-guide-for-v0-9-7-and-new-videos",
    from: "/104-configuration-guide-for-v0-9-7-and-new-videos",
  },
  {
    to: "/blog/2010/pcsx2-0-9-7-sneak-peek",
    from: "/112-pcsx2-0-9-7-sneak-peek",
  },
  {
    to: "/blog/2014/linux-pcsx2-1-2-2-release",
    from: "/255-linux-pcsx2-1-2-2",
  },
  {
    to: "/blog/2014/pcsx2-1-2-0-released",
    from: "/253-pcsx2-1-2-0-released",
  },
  {
    to: "/blog/2013/official-pcsx2-1-0-0-configuration-guide-video",
    from: "/247-official-pcsx2-configuration-guide-video",
  },
  {
    to: "/blog/2011/pcsx2-0-9-8",
    from: "/85-pcsx2-0-9-8",
  },
  {
    to: "/blog/2011/pcsx2-mac-0-9-6-snow-leopard",
    from: "/101-pcsx2-mac-0-9-6-snow-leopard",
  },
  {
    to: "/blog/2011/spu2-x-1-5",
    from: "/82-spu2-x-1-5",
  },
  {
    to: "/blog/2011/spu2-x-2-0",
    from: "/81-spu2-x-2-0",
  },
  {
    to: "/blog/2010/pcsx2-0-9-7-beta-released",
    from: "/109-pcsx2-0-9-7-beta-released",
  },
  {
    to: "/blog/2009/a-moment-of-zen",
    from: "/developer-blog/214-a-moment-of-zen",
  },
  {
    to: "/blog/2009/c-exceptions-can-be-an-optimization",
    from: "/developer-blog/210-c-exceptions-can-be-an-optimization",
  },
  {
    to: "/blog/2009/challenges-of-a-public-release",
    from: "/developer-blog/217-challenges-of-a-public-release",
  },
  {
    to: "/blog/2009/events-plenty",
    from: "/developer-blog/216-events-plenty",
  },
  {
    to: "/blog/2009/global-visitor-stats",
    from: "/developer-blog/202-global-visitor-stats",
  },
  {
    to: "/blog/2009/logo-design-contest-closed",
    from: "/119-logo-design-contest-closed",
  },
  {
    to: "/blog/2009/logo-design-winners",
    from: "/117-logo-design-winners",
  },
  {
    to: "/blog/2009/measuring-the-benefits-of-wxwidgets",
    from: "/developer-blog/213-measuring-the-benefits-of-wxwidgets",
  },
  {
    to: "/blog/2009/new-versioning-release-pattern",
    from: "/developer-blog/207-new-versioning-release-pattern",
  },
  {
    to: "/blog/2009/pcsx2-0-9-6-released",
    from: "/121-pcsx2-0-9-6-released",
  },
  {
    to: "/blog/2009/pcsx2-logo-design-contest",
    from: "/120-pcsx2-logo-design-contest",
  },
  {
    to: "/blog/2009/pcsx2-mac-release-update",
    from: "/113-pcsx2-mac-release-update",
  },
  {
    to: "/blog/2009/pcsx2-pg-and-official-pcsx2-teams-merge",
    from: "/122-pcsx2-pg-and-official-pcsx2-teams-merge",
  },
  {
    to: "/blog/2009/progress-flood",
    from: "/116-progress-flood",
  },
  {
    to: "/blog/2009/ps2-vu-vector-unit-documentation-part-1",
    from: "/developer-blog/208-ps2-vu-vector-unit-documentation-part-1",
  },
  {
    to: "/blog/2009/recompilers-all-dems-buzzwords",
    from: "/developer-blog/215-recompilers-all-dems-buzzwords",
  },
  {
    to: "/blog/2009/so-maybe-it-s-about-time-we-explained-vtlb",
    from: "/developer-blog/218-so-maybe-it-s-about-time-we-explained-vtlb",
  },
  {
    to: "/blog/2009/svn-comments-are-re-enabled",
    from: "/developer-blog/206-svn-comments-are-re-enabled",
  },
  {
    to: "/blog/2009/the-devblogs-now-allow-user-comments",
    from: "/developer-blog/211-the-devblogs-now-allow-user-comments",
  },
  {
    to: "/blog/2009/the-pros-and-cons-of-googlecode",
    from: "/developer-blog/212-the-pros-and-cons-of-googlecode",
  },
  {
    to: "/blog/2009/thread-counting",
    from: "/developer-blog/204-thread-counting",
  },
  {
    to: "/blog/2009/thread-synchronization",
    from: "/developer-blog/205-thread-syncronization",
  },
  {
    to: "/blog/2009/whats-clamping-why-do-we-need-it",
    from: "/developer-blog/209-whats-clamping-why-do-we-need-it",
  },
  {
    to: "/blog/2008/ipu-updated",
    from: "/130-ipu-updated",
  },
  {
    to: "/blog/2008/pcsx2-playground-v1-0-0395-and-new-forums",
    from: "/123-pcsx2-playground-v1-0-0395-and-new-forums",
  },
  {
    to: "/blog/2008/plugin-update-galore",
    from: "/125-plugin-update-galore",
  },
  {
    to: "/blog/2008/spu2ghz-1-8",
    from: "/128-spu2ghz-1-8",
  },
  {
    to: "/blog/2008/spu2ghz-beta-1-9",
    from: "/126-spu2ghz-beta-1-9",
  },
  {
    to: "/blog/2008/the-amusement-continues",
    from: "/developer-blog/219-the-amusement-continues",
  },
  {
    to: "/blog/2007/vm-fix-probably-0-9-2",
    from: "/141-0-9-2-vm-fix-probably",
  },
  {
    to: "/blog/2007/2-new-plugins-for-download",
    from: "/143-2-new-plugins-for-download",
  },
  {
    to: "/blog/2007/and-the-sources-follow",
    from: "/149-and-the-sources-follow",
  },
  {
    to: "/blog/2007/bios-dumper-v2-0",
    from: "/145-bios-dumper-v2-0",
  },
  {
    to: "/blog/2007/bositman-wooooooooo",
    from: "/developer-blog/221-bositman-wooooooooo",
  },
  {
    to: "/blog/2007/erm-what-just-happened",
    from: "/developer-blog/222-erm-what-just-happened",
  },
  {
    to: "/blog/2007/gamepad-support-for-linux",
    from: "/133-gamepad-support-for-linux",
  },
  {
    to: "/blog/2007/graphics-synthesizer-gpus-and-dual-cores",
    from: "/developer-blog/230-graphics-synthesizer-gpus-and-dual-cores",
  },
  {
    to: "/blog/2007/gsdx9-lives",
    from: "/137-gsdx9-lives",
  },
  {
    to: "/blog/2007/live-public-betas",
    from: "/134-live-public-betas",
  },
  {
    to: "/blog/2007/merry-christmas-and-spu2ghz-release",
    from: "/132-merry-christmas-and-spu2ghz-release",
  },
  {
    to: "/blog/2007/next-destination-pcsx2-net",
    from: "/developer-blog/220-next-destination-pcsx2-net",
  },
  {
    to: "/blog/2007/pcsx2-0-9-4-has-arrived",
    from: "/136-pcsx2-0-9-4-has-arrived",
  },
  {
    to: "/blog/2007/pcsx2-magazine-appearance",
    from: "/144-pcsx2-magazine-appearance",
  },
  {
    to: "/blog/2007/pcsx2-optimization",
    from: "/developer-blog/225-pcsx2-optimization",
  },
  {
    to: "/blog/2007/pcsx2-video-crazy",
    from: "/developer-blog/224-pcsx2-video-crazy",
  },
  {
    to: "/blog/2007/refraction-path-3",
    from: "/148-refraction-path-3",
  },
  {
    to: "/blog/2007/release-fixes-and-stuff",
    from: "/135-release-fixes-and-stuff",
  },
  {
    to: "/blog/2007/some-testing",
    from: "/139-some-testing",
  },
  {
    to: "/blog/2007/the-penguin-returns-0-9-3-linux-release",
    from: "/150-the-penguin-returns-0-9-3-linux-release",
  },
  {
    to: "/blog/2007/we-re-busy-k",
    from: "/147-we-re-busy-k",
  },
  {
    to: "/blog/2007/work-in-progress",
    from: "/152-work-in-progress",
  },
  {
    to: "/blog/2007/zero-eater",
    from: "/146-zero-eater",
  },
  {
    to: "/blog/2007/dynasty-warriors-and-fullmetal-alchemist-videos-on-0-9-4",
    from: "/142-dynasty-warriors-and-fullmetal-alchemist-videos-on-0-9-4",
  },
  {
    to: "/blog/2007/the-pressure-is-on",
    from: "/151-the-pressure-is-on",
  },
  {
    to: "/blog/2007/pcsx2-team-unstoppable",
    from: "/138-pcsx2-team-unstoppable",
  },
  {
    to: "/blog/2006/100k-visitors-present-for-you",
    from: "/170-100-000-visitors-present-for-you",
  },
  {
    to: "/blog/2006/a-little-fix-here-alittle-fix-there",
    from: "/159-a-little-fix-here-alittle-fix-there-vvvroom",
  },
  {
    to: "/blog/2006/final-fantasy-x-and-beyond",
    from: "/179-final-fantasy-x-and-beyond",
  },
  {
    to: "/blog/2006/finally",
    from: "/161-finally",
  },
  {
    to: "/blog/2006/finally-not-a-fantasy",
    from: "/181-finally-not-a-fantasy",
  },
  {
    to: "/blog/2006/fix-fusion",
    from: "/166-fix-fusion",
  },
  {
    to: "/blog/2006/good-news-for-0-9-2",
    from: "/163-good-news-for-0-9-2",
  },
  {
    to: "/blog/2006/guide-updates",
    from: "/182-guide-updates",
  },
  {
    to: "/blog/2006/hot-shots-contest",
    from: "/171-hot-shots-contest",
  },
  {
    to: "/blog/2006/interview-refraction",
    from: "/169-interview-refraction",
  },
  {
    to: "/blog/2006/introducing-devblogs",
    from: "/developer-blog/233-introducing-devblogs",
  },
  {
    to: "/blog/2006/kosmos-escapes-zerogs-0-95",
    from: "/164-kosmos-escapes-zerogs-0-95",
  },
  {
    to: "/blog/2006/kosmos-zerogs-just-evolved",
    from: "/165-kosmos-zerogs-just-evolved",
  },
  {
    to: "/blog/2006/level-up-erm-speed-up",
    from: "/168-level-up-erm-speed-up",
  },
  {
    to: "/blog/2006/new-configuration-guide-and-translations",
    from: "/154-new-configuration-guide-and-translations",
  },
  {
    to: "/blog/2006/nightmare-on-floating-point-street",
    from: "/developer-blog/232-nightmare-on-floating-point-street",
  },
  {
    to: "/blog/2006/pcsx2-0-9",
    from: "/173-pcsx2-0-9",
  },
  {
    to: "/blog/2006/pcsx2-0-9-1-release",
    from: "/167-pcsx2-0-9-1-release",
  },
  {
    to: "/blog/2006/pcsx2-0-9-2-the-revenge",
    from: "/156-pcsx2-0-9-2-the-revenge",
  },
  {
    to: "/blog/2006/pcsx2-64bit-recompilation",
    from: "/developer-blog/228-pcsx2-64bit-recompilation",
  },
  {
    to: "/blog/2006/pcsx2-new-site-new-features",
    from: "/172-pcsx2-new-site-new-features",
  },
  {
    to: "/blog/2006/pcsx2-productions-present",
    from: "/155-pcsx2-productions-present",
  },
  {
    to: "/blog/2006/pcsx2-rocked-the-expo-at-fast-nu",
    from: "/174-pcsx2-rocked-the-expo-at-fast-nu",
  },
  {
    to: "/blog/2006/saqib-time",
    from: "/developer-blog/227-saqib-time",
  },
  {
    to: "/blog/2006/site-improvements-part-1",
    from: "/developer-blog/229-site-improvements-part-1",
  },
  {
    to: "/blog/2006/site-improvements-part-2",
    from: "/developer-blog/226-site-improvements-part-2",
  },
  {
    to: "/blog/2006/software-expo-misc",
    from: "/175-software-expo-misc",
  },
  {
    to: "/blog/2006/sound-everywhere",
    from: "/160-sound-everywhere",
  },
  {
    to: "/blog/2006/ssspsx-pad-v1-7-released",
    from: "/162-ssspsx-pad-v1-7-released",
  },
  {
    to: "/blog/2006/the-81fc0-is-over",
    from: "/157-the-81fc0-is-over",
  },
  {
    to: "/blog/2006/touche-toupee",
    from: "/158-touche-toupee",
  },
  {
    to: "/blog/2006/virtual-memory",
    from: "/developer-blog/231-virtual-memory",
  },
  {
    to: "/blog/2006/merry-christmas",
    from: "/153-merry-christmas-2006",
  },
  {
    to: "/blog/2005/biohazard-4",
    from: "/185-biohazard-4",
  },
  {
    to: "/blog/2005/gran-turismo-4-ingame",
    from: "/191-gran-turismo-4-ingame",
  },
  {
    to: "/blog/2005/happy-birthday",
    from: "/183-happy-birthday",
  },
  {
    to: "/blog/2005/merry-christmas",
    from: "/184-merry-christmas-2005",
  },
  {
    to: "/blog/2005/pcsx2-site-re-launch",
    from: "/192-pcsx2-site-re-launch",
  },
  {
    to: "/blog/2005/sad-news",
    from: "/187-sad-news",
  },
  {
    to: "/blog/2005/video-playback",
    from: "/188-video-playback",
  },
  {
    to: "/blog/2005/video-special",
    from: "/189-video-special",
  },
];

module.exports = redirects;
