import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Kakarot ZK-EVM",
  tagline: "Efficient and Secure EVM Provability. Everywhere.",
  favicon: "img/favicon.svg",

  // Set the production url of your site here
  url: "https://docs.kakarot.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "kkrt-labs", // Usually your GitHub org/user name.
  projectName: "kakarot-docs", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/kkrt-labs/kakarot-docs/edit/main",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/kkrt-docs.png",
    navbar: {
      logo: {
        alt: "Kakarot ZK-EVM",
        src: "img/logo.svg",
        style: {
          width: "128px",
        },
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/kkrt-labs/kakarot",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Testnet",
              to: "/survival-guide",
            },
            {
              label: "Introduction",
              to: "/",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Discord",
              href: "https://discord.gg/kakarotzkevm",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/kakarotzkevm",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/orgs/kkrt-labs/repositories",
            },
          ],
        },
      ],
      copyright: `Copyright © ${
        new Date().getFullYear()
      } Kakarot ZK-EVM, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.nightOwlLight,
      darkTheme: prismThemes.oneDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
