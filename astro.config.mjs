import { defineConfig } from 'astro/config';

// DOMAINE EN DUR — vérifier à chaque clone (voir kit de reprise §1, piège connu).
export default defineConfig({
  site: 'https://acheter-argent.fr',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
