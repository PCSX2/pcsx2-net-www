// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/okaidia');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PCSX2',
  tagline: 'An Open-Source PS2 Emulator',
  url: 'https://pcsx2.net',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.webp',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'PCSX2', // Usually your GitHub org/user name.
  projectName: 'pcsx2-net-www', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto+Mono:wght@400;700&display=swap',
    "https://fonts.googleapis.com/icon?family=Material+Icons"
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "docs",
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/PCSX2/pcsx2-net-www/tree/master/'
        },
        blog: {
          path: 'blog',
          blogSidebarCount: 0,
          showReadingTime: true,
          editUrl:
            'https://github.com/PCSX2/pcsx2-net-www/tree/master/',
            feedOptions: {
              type: 'all',
              copyright: `Copyright © ${new Date().getFullYear()} PCSX2.`,
            }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // TODO - Algolia Integration
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      image: 'img/logo.png',
      navbar: {
        title: 'PCSX2',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.webp',
        },
        items: [
          {to: '/downloads', label: 'Download', position: 'left'},
          {to: '/compat', label: 'Compatibility', position: 'left'},
          {type: 'doc',docId: 'intro',label: 'Documentation', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left', items: [
            {
              label: "Progress Reports",
              to: "/blog/tags/progress-report"
            },
            {
              label: "Developer Blogs",
              to: "/blog/tags/dev-blog"
            }
          ]},
          {to: 'https://github.com/sponsors/PCSX2', label: 'Donate', position: 'right'},
          // {
          //   type: 'search',
          //   position: 'right',
          // },
          {to: 'https://forums.pcsx2.net/', label: 'Forums', position: 'right'},
          {to: 'https://wiki.pcsx2.net/', label: 'Wiki', position: 'right'},
          {
            href: 'https://discord.com/invite/TCz3t9k',
            position: 'right',
            className: 'header-discord-link',
            'aria-label': 'PCSX2 Discord Server',
            target: "_blank"
          },
          {
            href: 'https://github.com/PCSX2/pcsx2',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'PCSX2 GitHub repository',
            target: "_blank"
          },
          {
            href: 'https://twitter.com/PCSX2',
            position: 'right',
            className: 'header-twitter-link',
            'aria-label': 'PCSX2 Twitter',
            target: "_blank"
          },
          {
            href: 'https://www.youtube.com/user/PCSX2team',
            position: 'right',
            className: 'header-youtube-link',
            'aria-label': 'PCSX2 YouTube channel',
            target: "_blank"
          }
        ],
      },
      footer: {
        links: [
          {
            title: 'Links',
            items: [
              {
                label: 'Downloads',
                to: "/downloads"
              },
              {
                label: 'Compatibility',
                to: "/compat"
              },
              {
                label: 'Documentation',
                to: "/docs"
              },
              {
                label: 'Blog',
                to: "/blog"
              },
              {
                label: "Wiki",
                href: "https://forums.pcsx2.net/"
              }
            ],
          },
          {
            title: 'Contribute',
            items: [
              {
                label: 'Donate',
                href: "https://github.com/sponsors/PCSX2"
              },
              {
                label: 'GitHub',
                href: 'https://github.com/PCSX2/pcsx2',
              }
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/TCz3t9k',
              },
              {
                label: 'Forums',
                href: 'https://forums.pcsx2.net/',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/PCSX2',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/user/PCSX2team',
              }
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy',
                to: '/privacy',
              }
            ],
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PCSX2. All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    })
};

module.exports = config;