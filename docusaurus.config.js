// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fynix prompt library',
  tagline: 'Comprehensive Prompts for Fynix Ai coding Assistant',
  favicon: 'img/fynix-logo-svg.ico',

  // Set the production url of your site here
  url: 'https://your-docusaurus-site.example.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Home',
        logo: {
          alt: 'Home Logo',
          src: 'img/fynix-logo-svg.svg',
          className: 'logo-theme', //added logo theme class
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Fynix Prompt Library',
          },

          {
            href: 'https://github.com/Fynix-ai/fynix-prompt-library.git',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Product',
            items: [
              { label: 'Features', href: 'https://fynix.ai/#features' },
              { label: 'Pricing', href: 'https://fynix.ai/#pricing' },
              { label: 'Docs', to: '/docs/intro' }, // If docs exist
            ],
          },
          {
            title: 'Community',
            items: [
              { label: 'Discord', href: 'https://discord.gg/ZCmWCe8qUW' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/company/fynixai/' },
              { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61569122695656' },
              { label: 'Reddit', href: 'https://www.reddit.com/user/fynix_ai/' },
            ],
          },
          {
            title: 'Social',
            items: [
              { label: 'X (Twitter)', href: 'https://x.com/fynix_ai' },
              { label: 'Instagram', href: 'https://www.instagram.com/fynix_ai/' },
            ],
          },
        ],
        logo: {
          alt: 'Fynix Logo',
          src: 'img/fynix-logo-svg.svg',
          href: 'https://fynix.ai', // Link the logo to the website
          width: 100,
          height: 'auto',
        },
        copyright: `Copyright © ${new Date().getFullYear()} Fynix AI. All rights reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },

      // Added support for custom text sizes through CSS variables
      stylesheets: [
        {
          href: './src/css/custom.css',
          type: 'text/css',
        },
      ],
    }),
};

export default config;