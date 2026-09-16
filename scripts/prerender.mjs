/**
 * Writes the home page's markup into dist/index.html, so the first paint needs
 * only the HTML and the stylesheet rather than a full React render.
 *
 * Every other route is served from dist/app.html, an untouched copy of the
 * shell: putting the home markup in the SPA fallback would make those routes
 * flash the home page before React replaced it.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const templatePath = resolve(root, 'dist/index.html');
const template = readFileSync(templatePath, 'utf8');

const ROOT_DIV = '<div id="root"></div>';
if (!template.includes(ROOT_DIV)) {
  throw new Error('prerender: no empty #root in dist/index.html');
}

// The shell first, before index.html gains any markup.
writeFileSync(resolve(root, 'dist/app.html'), template);

// A bare Windows path is not a valid ESM specifier, so it goes in as a URL.
const { render } = await import(pathToFileURL(resolve(root, 'dist-ssr/entry-server.js')).href);
const html = render('/');
if (!html.includes('hero__title')) {
  throw new Error('prerender: the home page rendered without its hero');
}

writeFileSync(templatePath, template.replace(ROOT_DIV, `<div id="root">${html}</div>`));
console.log(`prerender: home page written, ${Math.round(html.length / 1024)} kB of markup`);
