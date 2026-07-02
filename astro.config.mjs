import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alecid08.github.io/genesis-corporation',
  base: '/genesis-corporation',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});