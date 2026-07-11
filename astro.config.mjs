// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import cloudflare from '@astrojs/cloudflare';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hyperdigital.nz',

  integrations: [
    sitemap({
      // Keep noindex utility pages out of the sitemap: /thank-you fires the Google
      // Ads conversion, /links is the links-in-bio page for social profiles.
      filter: (page) => !page.includes('/thank-you') && !page.endsWith('/links-in-bio/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});