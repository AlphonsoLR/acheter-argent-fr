// Génère public sitemap.xml après le build. DOMAINE EN DUR — vérifier à chaque clone.
import { writeFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const SITE = 'https://acheter-argent.fr';

const staticPages = [
  '/', '/a-propos/', '/guide-achat/', '/rachat-de-bijoux/',
  '/faq/', '/actualites/', '/contact/', '/mentions-legales/',
  '/politique-de-confidentialite/', '/cgv/',
];

const urls = new Set(staticPages);

const newsDir = path.join(root, 'src', 'content', 'actualites');
try {
  for (const file of readdirSync(newsDir)) {
    if (!file.endsWith('.md')) continue;
    urls.add(`/actualites/${file.replace(/\.md$/, '')}/`);
  }
} catch {
  // pas de contenu au moment de l'appel — ignoré
}

const body = [...urls]
  .sort()
  .map((u) => `  <url><loc>${SITE}${u}</loc></url>`)
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(path.join(root, 'dist', 'sitemap.xml'), xml, 'utf-8');
console.log(`sitemap.xml généré avec ${urls.size} URLs.`);
