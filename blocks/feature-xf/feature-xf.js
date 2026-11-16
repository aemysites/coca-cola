/**
 * feature-xf — featured-experience band (Adobe Target slot on the source, captured state
 * frozen): art-directed image, headline, lede, one CTA. Template-slotted (fixed composition).
 * Schema: stardust/eds-schema/us-en.json, section feature-xf.
 *
 * Authoring rows:
 *   1. desktop image (>= 1200px)
 *   2. mobile image (< 1200px) — a single image row is used at all widths
 *   3. <h2> headline, lede <p>, CTA <p> (<strong><a> = primary)
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

// The delivery pipeline carries an authored image title as data-title; restore the attribute.
function restoreTitles(root) {
  root.querySelectorAll('img[data-title]').forEach((img) => {
    if (!img.title) img.title = img.dataset.title;
  });
}

// Prime the block-scoped fallback face (see the CSS override) so it replaces the dead one.
function primeFallbackFace() {
  if (document.fonts && document.fonts.load) {
    document.fonts.load('16px tccc-unitytext-fallback').catch(() => {});
  }
}

export default function decorate(block) {
  primeFallbackFace();
  restoreTitles(block);
  if (block.querySelector(':scope > .feature-xf-media')) return;
  const pictures = [...block.querySelectorAll('picture')];
  const heading = block.querySelector('h1, h2, h3, h4, h5, h6');
  const paras = [...block.querySelectorAll('p')].filter((p) => !p.querySelector('picture'));
  const ctas = paras.filter((p) => p.querySelector('a'));
  const ledes = paras.filter((p) => !ctas.includes(p));
  const leftovers = [...block.querySelectorAll(':scope > div > div > *')]
    .filter((n) => !n.matches('picture, h1, h2, h3, h4, h5, h6, p') && !n.querySelector('picture'));

  const media = document.createElement('div');
  media.className = 'feature-xf-media';
  if (pictures.length > 1) {
    media.append(wrapNode(pictures[0], 'media-desktop'), wrapNode(pictures[1], 'media-mobile'));
    pictures.slice(2).forEach((p) => media.append(wrapNode(p, 'media-extra')));
  } else if (pictures.length) {
    media.append(wrapNode(pictures[0], 'media-all'));
  }

  const content = [media];
  if (heading) content.push(wrapNode(heading, 'headline'));
  ledes.forEach((p) => content.push(wrapNode(p, 'lede')));
  if (ctas.length) {
    const actions = document.createElement('div');
    actions.className = 'actions';
    actions.append(...ctas);
    content.push(actions);
  }
  leftovers.forEach((n) => content.push(n));
  block.replaceChildren(...content);
}
