// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hyperdigital.nz',

  // Canonical URLs use trailing slashes (matches Cloudflare Pages' directory
  // serving). 'always' makes the dev server 404 any slash-less internal link,
  // so inconsistent hrefs get caught before they ship. On-demand routes
  // (/api/*) only match WITH the trailing slash under this setting — keep
  // fetch/action URLs in sync.
  trailingSlash: 'always',

  integrations: [
    sitemap({
      // Keep noindex utility pages out of the sitemap: /thank-you fires the Google
      // Ads conversion, /links-in-bio is the links-in-bio page for social profiles.
      // /links is a leftover duplicate of /links-in-bio: the _redirects 301 already
      // shadows it in production; delete src/pages/links.astro when convenient.
      filter: (page) =>
        !page.includes('/thank-you') &&
        !page.endsWith('/links-in-bio/') &&
        !page.endsWith('/links/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});