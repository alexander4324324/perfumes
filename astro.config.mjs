// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Cambia esto por tu URL real de Vercel o tu dominio final una vez que
  // lo tengas. Es necesario para que las vistas previas (Open Graph) de
  // WhatsApp/Instagram muestren la imagen y el link completos y correctos.
  site: 'https://perfumes-omega.vercel.app',
  vite: {
    plugins: [tailwindcss()]
  }
});