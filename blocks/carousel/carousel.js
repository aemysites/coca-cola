/**
 * carousel — content-card carousel (Splide-equivalent loop, held on slide 1 at rest; dots move
 * one slide pitch). Reconstructive: one row per slide. Section head and trailing CTA are default
 * content in the section. Schema: stardust/eds-schema/us-en.json, sections promos / more.
 *
 * Authoring rows (one per slide):
 *   image | <h3> title, body <p>, link <p> (the link text is the arrow label, its href the card's)
 *
 * @variants block: wide (default none) — wide = full-bleed below 1200px, three per page above
 * Loop clones are presentational: no text, alt="", no href, no editor indices (EW4, #100);
 * they keep the slide role/aria-label and image title the source's clones carry.
 */

const desktop = window.matchMedia('(width >= 1200px)');

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

function stripInstrumentation(el) {
  el.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  el.removeAttribute('data-prose-index');
  return el;
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

// Presentational loop clone: same boxes and imagery, no words, no link, no editor indices;
// the slide's role + aria-label stay (attributes, not rendered words — as the source's clones).
function makeClone(slide) {
  const clone = stripInstrumentation(slide.cloneNode(true));
  clone.classList.add('carousel-slide-clone');
  clone.setAttribute('aria-hidden', 'true');
  clone.querySelectorAll('a').forEach((a) => {
    a.removeAttribute('href');
    a.setAttribute('tabindex', '-1');
  });
  clone.querySelectorAll('img').forEach((img) => img.setAttribute('alt', ''));
  clone.querySelectorAll('.card-text, .has-arrow').forEach((n) => {
    n.querySelectorAll('h1, h2, h3, h4, h5, h6, p, ul, ol').forEach((t) => {
      t.textContent = '';
    });
  });
  return clone;
}

function buildDots(count, label) {
  const dots = document.createElement('ul');
  dots.className = 'carousel-dots';
  dots.setAttribute('role', 'tablist');
  dots.setAttribute('aria-label', label);
  for (let i = 0; i < count; i += 1) {
    const li = document.createElement('li');
    li.setAttribute('role', 'presentation');
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-selected', String(i === 0));
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    li.append(dot);
    dots.append(li);
  }
  return dots;
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
  if (block.querySelector(':scope > .carousel-track')) return;
  const rows = [...block.children];
  const perPageDesktop = block.classList.contains('wide') ? 3 : 2;
  block.setAttribute('aria-roledescription', 'carousel');

  const track = document.createElement('div');
  track.className = 'carousel-track';
  const list = document.createElement('div');
  list.className = 'carousel-list';
  const real = rows.map((row, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Slide ${i + 1} of ${rows.length}`);
    slide.append(buildCard(row));
    return slide;
  });
  list.append(...real);
  track.append(list);
  const dotList = buildDots(real.length, 'Choose a slide to display');
  block.replaceChildren(track, dotList);
  if (!real.length) return;

  const perPage = desktop.matches ? perPageDesktop : 1;
  const n = 2 * perPage;
  const before = [];
  for (let k = 0; k < n; k += 1) {
    before.unshift(makeClone(real[real.length - 1 - (k % real.length)]));
  }
  const after = [];
  for (let k = 0; k < n; k += 1) after.push(makeClone(real[k % real.length]));
  list.prepend(...before);
  list.append(...after);

  const dots = [...dotList.querySelectorAll('.carousel-dot')];
  let index = 0;
  const offset = (i) => real[i].offsetLeft - list.firstElementChild.offsetLeft;
  const go = (i, animate = true) => {
    index = (i + real.length) % real.length;
    list.style.transition = animate ? '' : 'none';
    list.style.transform = `translateX(${-offset(index)}px)`;
    dots.forEach((d, k) => {
      d.setAttribute('aria-selected', String(k === index));
      d.classList.toggle('is-active', k === index);
    });
    const all = [...list.children];
    const at = all.indexOf(real[index]);
    all.forEach((sl, k) => {
      sl.classList.toggle('is-active', k === at);
      sl.classList.toggle('is-visible', k >= at && k < at + perPage);
    });
  };
  go(0, false);
  dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
  window.addEventListener('resize', () => go(index, false));
  if ('ResizeObserver' in window) new ResizeObserver(() => go(index, false)).observe(track);
  track.dataset.ready = 'true';
}
