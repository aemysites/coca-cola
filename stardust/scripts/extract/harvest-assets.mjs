// Project helper (stardust extract Phase 3): one live navigation that network-intercepts
// stylesheets + font files, then saves the header logo. Usage: node harvest-assets.mjs <url> <outDir>
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const [url, out = 'stardust/current'] = process.argv.slice(2);
if (!url) { console.error('usage: node harvest-assets.mjs <url> [outDir]'); process.exit(2); }
for (const d of ['assets/fonts', 'assets/css']) await mkdir(path.join(out, d), { recursive: true });
const b = await chromium.launch({ channel: 'chrome' });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const seen = new Map(); const css = []; const fonts = []; const pend = [];
ctx.on('response', (r) => pend.push((async () => {
  const u = r.url(); if (seen.has(u)) return; const ct = (r.headers()['content-type'] || '');
  const isFont = /\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u) || ct.startsWith('font/');
  const isCss = r.request().resourceType() === 'stylesheet' || ct.includes('text/css');
  if (!isFont && !isCss) return; seen.set(u, 1);
  let body; try { body = await r.body(); } catch { return; }
  const base = path.basename(new URL(u).pathname) || 'index';
  const h = crypto.createHash('sha1').update(u).digest('hex').slice(0, 6);
  const name = isFont ? base : `${h}-${base.endsWith('.css') ? base : base + '.css'}`;
  const rel = path.join('assets', isFont ? 'fonts' : 'css', name);
  await writeFile(path.join(out, rel), body);
  (isFont ? fonts : css).push({ url: u, localPath: rel, bytes: body.length, status: r.status(), contentType: ct });
})()));
const p = await ctx.newPage();
const resp = await p.goto(url, { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
await p.locator('#onetrust-accept-btn-handler').click({ timeout: 5000 }).catch(() => {});
for (let i = 0; i < 30; i += 1) { await p.mouse.wheel(0, 600); await p.waitForTimeout(200); }
await p.waitForTimeout(1500);
const logo = await p.evaluate(() => {
  const hdr = document.querySelector('header'); const img = hdr && hdr.querySelector('img[alt*="logo" i], img[src*="logo" i], img');
  const svg = hdr && hdr.querySelector('svg');
  return { img: img ? { src: img.currentSrc || img.src, alt: img.alt, w: img.naturalWidth, h: img.naturalHeight } : null, svg: svg ? svg.outerHTML.slice(0, 200000) : null };
});
if (logo.img) {
  const r = await p.request.get(logo.img.src).catch(() => null);
  if (r && r.ok()) { const ext = /svg/.test(r.headers()['content-type'] || '') ? 'svg' : (path.extname(new URL(logo.img.src).pathname).slice(1) || 'png');
    await writeFile(path.join(out, `assets/logo.${ext}`), await r.body()); logo.file = `assets/logo.${ext}`; }
}
await Promise.allSettled(pend);
await writeFile(path.join(out, 'assets/_harvest.json'), JSON.stringify({ _provenance: { renderedBy: 'playwright', fetchedAt: new Date().toISOString(), url, httpStatus: resp?.status() }, logo: { ...logo, svg: logo.svg ? `${logo.svg.length} chars` : null }, css, fonts }, null, 2));
console.log(`status ${resp?.status()} css ${css.length} fonts ${fonts.length} logo ${logo.file || 'none'}`);
await b.close();
