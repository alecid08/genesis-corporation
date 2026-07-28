import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://ladetec.com',
  output: 'server',
  adapter: cloudflare({
    imageService: 'compile',
  }),
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});