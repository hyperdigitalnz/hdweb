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
      // Keep the noindex /thank-you utility page (fires the Google Ads conversion)
      // out of the sitemap.
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});