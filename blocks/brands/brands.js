/**
 * brands — brand logo grid; each tile is an image link. Reconstructive: one row per brand.
 * The section head (<h2>) and trailing CTA are default content in the section.
 * Schema: stardust/eds-schema/us-en.json, section brands (6 tiles).
 *
 * Authoring rows (one per brand):
 *   logo image | link <p> (link text = brand name, read by screen readers; href = the tile's)
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

// Card-as-link (EW6): read the href, move the name <p>, unwrap the inner anchor.
function buildTile(row) {
  const picture = row.querySelector('picture');
  const linkP = [...row.querySelectorAll('p')]
    .find((p) => p.querySelector('a') && !p.querySelector('picture'));
  const link = linkP ? linkP.querySelector('a') : null;
  const tile = document.createElement(link ? 'a' : 'div');
  tile.className = 'brand-tile';
  if (link) tile.href = link.getAttribute('href');
  if (picture) tile.append(wrapNode(picture, 'brand-logo'));
  if (linkP) {
    const name = wrapNode(linkP, 'brand-name');
    link.replaceWith(...link.childNodes);
    tile.append(name);
  }
  [...row.querySelectorAll(':scope > div > *')].forEach((node) => {
    if (node.tagName === 'P' && node.querySelector('picture') && !node.textContent.trim()) return;
    tile.append(wrapNode(node, 'brand-name'));
  });
  return tile;
}

// The delivery pipeline carries an authored image title as data-title; restore the attribute.
function restoreTitles(root) {
  root.querySelectorAll('img[data-title]').forEach((img) => {
    if (!img.title) img.title = img.dataset.title;
  });
}

export default function decorate(block) {
  restoreTitles(block);
  if (block.querySelector(':scope > .brands-grid')) return;
  const grid = document.createElement('div');
  grid.className = 'brands-grid';
  [...block.children].forEach((row) => grid.append(buildTile(row)));
  block.replaceChildren(grid);
}
