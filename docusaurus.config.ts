import fs from 'node:fs';
import path from 'node:path';
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// === Versioning ===
// The version map is derived from versions.json, which `docusaurus docs:version`
// writes newest-first. Cutting the next release therefore needs only the snapshot
// plus that file — no edit here, and no version hard-coded in this config.
//
//   the newest release -> /docs/*        labelled "vX.Y (latest)"
//   an older release   -> /docs/X.Y/*    labelled "vX.Y"
//   the docs/ folder   -> /docs/dev/*    labelled "dev", synced from rossoctl/rossoctl
//
// docs/ is NOT committed here: scripts/sync-docs.sh mirrors it from
// rossoctl/rossoctl on every build, so "dev" always matches that repo 1:1.
const versionsFile = path.join(__dirname, 'versions.json');
const releasedVersions: string[] = fs.existsSync(versionsFile)
  ? JSON.parse(fs.readFileSync(versionsFile, 'utf8'))
  : [];
const LATEST_VERSION = releasedVersions[0];

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'rossoctl',
  tagline:
    'A framework-neutral, scalable, secure platform for deploying, securing, and governing AI agents.',
  favicon: 'img/favicon.svg',

  // Note: the `future.v4`/`experimental_faster` (Rspack) bundler is intentionally
  // NOT enabled — it requires the extra @docusaurus/faster native package. The
  // default webpack bundler keeps this setup minimal and portable. Re-add
  // `@docusaurus/faster` + `future: { experimental_faster: true }` if build
  // speed becomes a concern.

  // Published to GitHub Pages at the custom domain https://www.rossoctl.dev
  // (HTTPS enforced; the domain lives in static/CNAME). A custom domain serves
  // at the root, so baseUrl is '/'. Netlify PR previews also serve at the root;
  // DEPLOY_PRIME_URL sets the preview's canonical url.
  url: process.env.DEPLOY_PRIME_URL || 'https://www.rossoctl.dev',
  baseUrl: '/',
  organizationName: 'rossoctl', // GitHub org that owns the repo
  projectName: '.github', // repo name

  // Relaxed to 'warn' so the docs synced from rossoctl/rossoctl:docs/ (which
  // still contain some cross-repo relative links) don't fail the Pages build.
  // Tighten to 'throw' once the upstream docs links are cleaned up.
  onBrokenLinks: 'warn',

  markdown: {
    // 'detect' = .md files render as (lenient) CommonMark, .mdx as MDX. Lets the
    // synced upstream GitHub-flavored .md render without MDX parse errors on bare
    // '<', '{', or raw HTML. Our own .mdx pages keep MDX powers.
    format: 'detect',
    mermaid: true, // render ```mermaid fenced blocks as diagrams (used by the docs)
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        // === TEMPORARY: docs hidden until ready for public launch ===
        // The docs aren't ready to go public yet; the landing page and other
        // pages ship first. `docs: false` stops Docusaurus from generating any
        // /docs/* routes at all, so they're unreachable by direct URL, search,
        // and sitemap — not merely hidden from the navbar. Doc authoring
        // continues upstream in rossoctl/rossoctl:docs/.
        // TO RESTORE: delete `docs: false` and uncomment the block below.
        // docs: false,
        docs: {
          // Read docs from a local docs/ folder that mirrors the source of
          // truth 1:1. This folder is NOT committed — scripts/sync-docs.sh syncs
          // it from rossoctl/rossoctl:docs/ at build time. routeBasePath keeps
          // the public URLs at /docs/* and the navbar label is "Docs".
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          // "Edit this page" points at the source of truth upstream.
          editUrl: 'https://github.com/rossoctl/rossoctl/tree/main/docs/',
          // Versioning: the current (un-versioned) docs are the in-progress
          // "dev" docs, shown in the header version dropdown. No released
          // versions exist yet. When the first is cut
          // (`npm run docusaurus docs:version 0.7`), it becomes the default
          // "latest" and "dev" stays as the work-in-progress version.
          exclude: [
            // Internal working notes — not part of the published site.
            'superpowers/**',
            'authbridge/**',
            'automation-health.md',
          ],
          ...(LATEST_VERSION
            ? {
                // The newest release is the default at /docs.
                lastVersion: LATEST_VERSION,
                versions: {
                  // Released versions first, then the unreleased "dev" version —
                  // this object order is the version dropdown order.
                  ...Object.fromEntries(
                    releasedVersions.map((v) => [
                      v,
                      {
                        label: v === LATEST_VERSION ? `v${v} (latest)` : `v${v}`,
                        path: v === LATEST_VERSION ? '' : v,
                        badge: true,
                      },
                    ]),
                  ),
                  current: {label: 'dev', path: 'dev', banner: 'unreleased'},
                },
              }
            : {
                // Before the first version is cut, docs/ is the only version.
                versions: {current: {label: 'dev'}},
              }),
        },
        // Blog is an EXTERNAL Medium link (see navbar) — no local blog.
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Offline, build-time full-text search. No external service.
    [require.resolve('docusaurus-lunr-search'), {languages: ['en']}],
    // Dedicated docs instance for the Contributing section, so /contributing
    // renders with the SAME layout as docs (breadcrumb, content position,
    // typography) instead of a bespoke standalone page. Same pattern llm-d
    // uses for its Community section.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'contributing',
        routeBasePath: 'contributing',
        sidebarPath: './sidebarsContributing.ts',
        editUrl: 'https://github.com/Ibrahim2595/rossoctl-website/tree/main/',
      },
    ],
    // "Ecosystem Guide" — a faithful recreation of rossoctl/ecosystem-guide,
    // rebranded to rossoctl. This instance IS the site landing experience:
    // routeBasePath '/' serves it at the site root, and welcome.md (slug '/')
    // is the homepage, reproducing the upstream Welcome/README page inside the
    // normal docs layout (left sidebar + content), NOT a custom hero. The
    // sidebar groups mirror that repo's mkdocs.yml nav. Pages: About,
    // Onboarding, Key Dates, Content, Resources.
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ecosystem',
        path: 'ecosystem',
        routeBasePath: '/',
        sidebarPath: './sidebarsEcosystem.ts',
        editUrl:
          'https://github.com/rossoctl/ecosystem-guide/tree/main/content/',
      },
    ],
  ],

  // Enables Mermaid diagram rendering (paired with markdown.mermaid: true).
  themes: ['@docusaurus/theme-mermaid'],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'rossoctl',
      logo: {
        alt: 'rossoctl',
        src: 'img/logo.svg',
        // clicking the logo/title goes to '/', the landing page
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          // Single "Contributing" page rendered from the contributing docs
          // instance (docs layout + breadcrumbs). Content mirrors rossoctl's
          // CONTRIBUTING.md.
          type: 'docSidebar',
          sidebarId: 'contributingSidebar',
          docsPluginId: 'contributing',
          position: 'left',
          label: 'Contributing',
        },
        {
          // EXTERNAL blog — opens in a new tab.
          href: 'https://medium.com/rossoctl-the-agentic-platform',
          label: 'Blog',
          position: 'left',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          // EXTERNAL YouTube channel (demos + talks) — opens in a new tab.
          href: 'https://www.youtube.com/@Rossoctl',
          label: 'Videos',
          position: 'left',
          target: '_blank',
          rel: 'noopener noreferrer',
        },
        {
          // Docs version selector. Lists the released versions newest-first, then
          // the unreleased "dev" version, matching the order in the preset above.
          type: 'docsVersionDropdown',
          position: 'left',
          dropdownActiveClassDisabled: true,
          versions: [...releasedVersions, 'current'],
        },
        {
          // Live GitHub star count (icon + "N stars"), fetched client-side.
          // See src/components/GitHubStars + theme/NavbarItem/ComponentTypes.
          type: 'custom-gitHubStars',
          position: 'right',
          repo: 'rossoctl/rossoctl',
        },
        {
          // Slack icon + small "Join Slack" label (see .header-slack-link in custom.css).
          href: 'https://ibm.biz/rossoctl-slack',
          position: 'right',
          className: 'header-slack-link',
          label: 'Join Slack',
          'aria-label': 'Slack community',
        },
      ],
    },
    footer: {
      style: 'dark',
      logo: {
        alt: 'rossoctl',
        src: 'img/logo.svg',
        width: 22,
        height: 22,
      },
      // Design footer: brand + a left-aligned row of doc links, no copyright.
      // (The mock's "Intro to llm-d" is an llm-d template leftover — replaced
      // with rossoctl-appropriate doc links.)
      links: [
        {
          items: [
            // === TEMPORARY: docs footer links hidden until docs go public. ===
            // TO RESTORE: uncomment these four links.
            // {label: 'Documentation', to: '/docs/category/getting-started'},
            // {label: 'Quickstart', to: '/docs/overview/quickstart'},
            // {label: 'Architecture', to: '/docs/concepts/architecture'},
            // {label: 'Guides', to: '/docs/category/guides'},
            {label: 'Contributing', to: '/contributing'},
          ],
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'yaml', 'json', 'go'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
