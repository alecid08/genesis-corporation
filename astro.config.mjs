import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://alecid08.github.io',
  base: '/genesis-corporation',
  vite: {
    plugins: [tailwindcss()],
  },
});