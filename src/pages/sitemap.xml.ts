// Plan du site pour les moteurs de recherche : /sitemap.xml
// Liste automatiquement toutes les pages de src/pages (sauf la page 404).
import type { APIRoute } from 'astro';

// Toutes les pages .astro du dossier (une nouvelle page apparaît ici sans rien modifier)
const pages = Object.keys(import.meta.glob('./*.astro'))
  .map((f) => f.replace('./', '').replace('.astro', ''))
  .filter((nom) => nom !== '404')
  .map((nom) => (nom === 'index' ? '/' : `/${nom}/`))
  .sort();

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href ?? 'https://www.sanso-concept.ch/').replace(/\/$/, '');
  const urls = pages.map((p) => `  <url><loc>${base}${p}</loc></url>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
