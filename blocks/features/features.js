/**
 * features — campaign cards: a content panel (heading, lede, CTA) beside an art-directed image,
 * alternating sides from the second card on. Reconstructive: one row per card. The section head
 * (<h2>) is default content in the section. Schema: stardust/eds-schema/us-en.json, features.
 *
 * Authoring rows (one per card):
 *   <h3> title, lede <p>, CTA <p> (<em><a> = secondary) | desktop image (>= 1200px) | mobile image
 *   one image alone is used at all widths
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

function buildCard(row, i) {
  const card = document.createElement('div');
  card.className = 'campaign-card';
  if (i % 2 === 1) card.classList.add('campaign-card-right');
  const pictures = [...row.querySelectorAll('picture')];
  const content = document.createElement('div');
  content.className = 'campaign-card-content';
  const actions = document.createElement('div');
  actions.className = 'actions';
  [...row.querySelectorAll(':scope > div > *')].forEach((node) => {
    if (node.tagName === 'PICTURE' || (node.querySelector('picture') && !node.textContent.trim())) {
      return;
    }
    if (/^H[1-6]$/.test(node.tagName)) content.append(wrapNode(node, 'headline'));
    else if (node.tagName === 'P' && node.querySelector('a')) actions.append(node);
    else if (node.tagName === 'P') content.append(wrapNode(node, 'lede'));
    else content.append(node);
  });
  if (actions.children.length) content.append(actions);

  const media = document.createElement('div');
  media.className = 'campaign-card-media';
  if (pictures.length > 1) {
    media.append(wrapNode(pictures[0], 'media-desktop'), wrapNode(pictures[1], 'media-mobile'));
    pictures.slice(2).forEach((p) => media.append(wrapNode(p, 'media-extra')));
  } else if (pictures.length) {
    media.append(wrapNode(pictures[0], 'media-all'));
  }
  card.append(content, media);
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
  if (block.querySelector(':scope > .campaign-card')) return;
  const cards = [...block.children].map((row, i) => buildCard(row, i));
  block.replaceChildren(...cards);
}
