/**
 * teaser-block — promo teaser grid of content cards (card-as-link). Reconstructive: one row
 * per card. The section head (<h2>) and the trailing CTA are default content in the section.
 * Schema: stardust/eds-schema/us-en.json, section teaser-block (2 x content-card).
 *
 * Authoring rows (one per card):
 *   image | <h3> title, body <p>, link <p> (the link text is the arrow label, its href the card's)
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

// Card-as-link (EW6): read the href, move the label <p>, unwrap the inner anchor.
function buildCard(row) {
  const picture = row.querySelector('picture');
  const linkP = [...row.querySelectorAll('p')].reverse()
    .find((p) => p.querySelector('a') && !p.querySelector('picture'));
  const link = linkP ? linkP.querySelector('a') : null;
  const card = document.createElement(link ? 'a' : 'div');
  card.className = 'content-card';
  if (link) card.href = link.getAttribute('href');

  const media = document.createElement('div');
  media.className = 'content-card-media';
  if (picture) media.append(picture);

  const body = document.createElement('div');
  body.className = 'content-card-body';
  const text = document.createElement('div');
  text.className = 'card-text';
  [...row.querySelectorAll(':scope > div > *')].forEach((node) => {
    if (node === linkP || node === picture) return;
    if (node.tagName === 'P' && node.querySelector('picture') && !node.textContent.trim()) return;
    text.append(node);
  });
  body.append(text);
  if (linkP) {
    const arrow = wrapNode(linkP, 'has-arrow');
    link.replaceWith(...link.childNodes);
    body.append(arrow);
  }
  card.append(media, body);
  return card;
}

// The delivery pipeline carries an authored image title as data-title; restore the attribute.
function restoreTitles(root) {
  root.querySelectorAll('img[data-title]').forEach((img) => {
    if (!img.title) img.title = img.dataset.title;
  });
}

export default function decorate(block) {
  restoreTitles(block);
  if (block.querySelector(':scope > .teaser-grid')) return;
  const grid = document.createElement('div');
  grid.className = 'teaser-grid';
  [...block.children].forEach((row) => grid.append(buildCard(row)));
  block.replaceChildren(grid);
}
