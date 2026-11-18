/**
 * campaign-card — the "Features" teaser: a large image with an overlapping white card.
 * Template-slotted decode: authored nodes are moved into the prototype's fixed slots.
 *
 * Variants (block class): content-right (default) | content-left — which side the card sits on
 * at desktop width.
 * Authoring (one row, cells or a single flattened cell):
 *   image — the mobile image, then optionally the desktop (>= 1200px) image
 *   copy  — <h3> title, body <p>, CTA <em><a> (outline button)
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

const mediaOf = (el) => (el.matches('picture, img') ? el : el.querySelector('picture, img'));

function cellNodes(cell) {
  let kids = [...cell.children];
  if (kids.length === 1 && kids[0].tagName === 'P' && kids[0].querySelector('picture, img')
    && kids[0].childNodes.length > 1) {
    kids = [...kids[0].childNodes].map((n) => {
      if (n.nodeType === 1) return n;
      // HARNESS-ONLY fallback (EW5): a bare text node; DA cells always carry a <p>
      if (n.textContent.trim()) {
        const p = document.createElement('p');
        p.append(n);
        return p;
      }
      return null;
    }).filter(Boolean);
  }
  if (!kids.length && cell.textContent.trim()) {
    // HARNESS-ONLY fallback (EW5): bare text in a cell — move the text nodes into a <p>
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    kids = [p];
  }
  return kids;
}

function observeReveal(el) {
  if (!el || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    io.unobserve(e.target);
  }));
  el.classList.add('reveal');
  const img = el.querySelector('img');
  const mark = () => el.classList.add('loaded');
  if (img && img.complete) mark();
  else if (img) img.addEventListener('load', mark, { once: true });
  io.observe(el);
}

export default function decorate(block) {
  const nodes = [...block.querySelectorAll(':scope > div > div')].flatMap(cellNodes);
  if (!nodes.length) return;
  if (!block.classList.contains('content-left')) block.classList.add('content-right');

  const media = [];
  let heading = null;
  const texts = [];
  const ctas = [];
  const rest = [];
  nodes.forEach((el) => {
    const m = mediaOf(el);
    if (m && !el.querySelector('a') && !el.textContent.trim()) media.push(m);
    else if (/^H[1-6]$/.test(el.tagName) && !heading) heading = el;
    else if (el.querySelector('a')) ctas.push(el);
    else if (el.tagName === 'P') texts.push(el);
    else rest.push(el);
  });

  const mediaBox = document.createElement('div');
  mediaBox.className = 'campaign-card-media';
  if (media.length > 1) {
    mediaBox.append(wrapNode(media[0], 'media-mobile'), wrapNode(media[1], 'media-desktop'));
  } else if (media.length) {
    mediaBox.append(wrapNode(media[0], 'media-all'));
  }

  const content = document.createElement('div');
  content.className = 'campaign-card-content';
  if (heading) content.append(wrapNode(heading, 'campaign-card-title'));
  texts.forEach((p) => content.append(wrapNode(p, 'campaign-card-text')));
  rest.forEach((el) => content.append(el));
  if (ctas.length) {
    const box = document.createElement('div');
    box.className = 'campaign-card-cta';
    ctas.forEach((c) => box.append(c.closest('p') || c));
    content.append(box);
  }

  block.replaceChildren(mediaBox, content);
  observeReveal(mediaBox);
}
