// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const themes = require("prism-react-renderer").themes;
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;
const redirects = require("./redirects");

function tailwindPlugin(context, options) {
  return {
    name: "tailwind-plugin",
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer"),
      ];
      return postcssOptions;
    },
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "PCSX2",
  tagline: "An Open-Source PS2 Emulator",
  url: "https://pcsx2.net",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.webp",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "PCSX2", // Usually your GitHub org/user name.
  projectName: "pcsx2-net-www", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  future: {
    experimental_faster: {
      swcJsLoader: true,
      swcJsMinimizer: true,
      swcHtmlMinimizer: true,
      lightningCssMinimizer: true,
      rspackBundler: true,
      mdxCrossCompilerCache: true,
    },
  },
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/fonts/Inter/static/Inter-Bold.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/fonts/Inter/static/Inter-Medium.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/fonts/Inter/static/Inter-Regular.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/fonts/Roboto_Mono/static/RobotoMono-Bold.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "preload",
        href: "/fonts/Roboto_Mono/static/RobotoMono-Regular.ttf",
        as: "font",
        type: "font/ttf",
        crossorigin: "anonymous",
      },
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateAuthor: true,
          editUrl: "https://github.com/PCSX2/pcsx2-net-www/tree/main/",
        },
        blog: {
          onUntruncatedBlogPosts: "ignore",
          path: "blog",
          blogSidebarCount: 0,
          showReadingTime: true,
          editUrl: "https://github.com/PCSX2/pcsx2-net-www/tree/main/",
          feedOptions: {
            type: "all",
            copyright: `Copyright © ${new Date().getFullYear()} PCSX2`,
            limit: 3,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      announcementBar: {
        id: "announcementBar-2", // Increment on change
        content: `<a class="no-underline font-medium" href="/blog/2025/pcsx2-2.6/">The 2.6 Stable Release is out! Checkout the Progress Report Here!</a>`,
        backgroundColor: "#4765c8",
        textColor: "#fafbfc",
        isCloseable: true,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "TR9JNR7TSP",
        // Public API key: it is safe to commit it
        apiKey: "a63d89935faca83290750981be9a313c",
        indexName: "pcsx2",
        // Optional: see doc section below
        contextualSearch: true,
        // Optional: Algolia search parameters
        searchParameters: {},
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",
        //... other Algolia params
      },
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: "img/logo.webp",
      metadata: [
        { name: "twitter:card", content: "summary" },
        { name: "darkreader-lock" },
      ],
      navbar: {
        title: "PCSX2",
        logo: {
          alt: "PCSX2 Logo",
          src: "img/logo.webp",
        },
        items: [
          { to: "/downloads", label: "Download", position: "left" },
          { to: "/compat", label: "Compatibility", position: "left" },
          {
            label: "Docs",
            to: "/docs",
            position: "left",
            items: [
              {
                label: "Setup Guide",
                to: "/docs/category/setup",
              },
              {
                label: "Configuration Options",
                to: "/docs/category/configuration",
              },
              {
                label: "Troubleshooting Steps",
                to: "/docs/category/troubleshooting",
              },
              {
                label: "Advanced Features",
                to: "/docs/category/advanced",
              },
              {
                label: "Contributing Guidelines",
                to: "/docs/category/contributing",
              },
            ],
          },
          {
            to: "/blog",
            label: "Blog",
            position: "left",
          },
          {
            to: "https://github.com/sponsors/PCSX2",
            label: "Donate",
            position: "right",
          },
          {
            type: "search",
            position: "right",
          },
          {
            label: "Links",
            position: "right",
            items: [
              {
                to: "https://forums.pcsx2.net/",
                label: "Forums",
                target: "_blank",
              },
              {
                to: "https://wiki.pcsx2.net/",
                label: "Wiki",
                target: "_blank",
              },
              {
                href: "https://pcsx2.net/discord",
                className: "header-discord-link",
                "aria-label": "Discord",
                target: "_blank",
                label: "Discord",
              },
              {
                href: "https://github.com/PCSX2/pcsx2",
                className: "header-github-link",
                "aria-label": "GitHub",
                target: "_blank",
                label: "GitHub",
              },
              {
                href: "https://mastodon.social/@PCSX2",
                className: "header-mastodon-link",
                "aria-label": "Mastodon",
                target: "_blank",
                label: "Mastodon",
              },
              {
                href: "https://www.youtube.com/user/PCSX2team",
                className: "header-youtube-link",
                "aria-label": "YouTube",
                target: "_blank",
                label: "YouTube",
              },
              {
                href: "https://pcsx2.net/blog/rss.xml",
                className: "header-rss-link",
                "aria-label": "RSS",
                target: "_blank",
                label: "RSS Feed",
              },
            ],
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Links",
            items: [
              {
                label: "Downloads",
                to: "/downloads",
              },
              {
                label: "Compatibility",
                to: "/compat",
              },
              {
                label: "Documentation",
                to: "/docs",
              },
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "Wiki",
                href: "https://wiki.pcsx2.net/",
              },
              {
                label: "Status",
                href: "https://stats.uptimerobot.com/LWxk2iJ25F",
              },
            ],
          },
          {
            title: "Contribute",
            items: [
              {
                label: "Donate",
                href: "https://github.com/sponsors/PCSX2",
              },
              {
                label: "GitHub",
                href: "https://github.com/PCSX2/pcsx2",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://pcsx2.net/discord",
              },
              {
                label: "Forums",
                href: "https://forums.pcsx2.net/",
              },
              {
                label: "Mastodon",
                href: "https://mastodon.social/@PCSX2",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/user/PCSX2team",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Privacy",
                to: "/privacy",
              },
              {
                label: "Trademark & Copyright",
                to: "/intellectualproperty",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PCSX2.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash", "powershell", "shell-session"],
      },
    }),
  plugins: [
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: redirects,
      },
    ],
    () => ({
      name: "custom-webpack-config",
      configureWebpack: () => {
        return {
          module: {
            rules: [
              {
                test: /\.yaml$/,
                use: [
                  {
                    loader: "file-loader",
                    options: { name: "assets/files/[name]-[hash].[ext]" },
                  },
                ],
              },
            ],
          },
        };
      },
    }),
    tailwindPlugin,
  ],
};

module.exports = config;
