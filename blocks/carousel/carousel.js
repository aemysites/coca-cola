/**
 * carousel — the source's Splide carousels (hero teasers, promo cards, "More from" cards).
 * Reconstructive decode: one slide per authored row (a single flattened cell is segmented on
 * its headings). Navigation is dot-only and never autoplays, as on the source.
 *
 * Variants (block class): hero | promos | secondary.
 * Authoring rows (one per slide):
 *   cell 1 — image: the mobile image, then optionally the desktop (>= 1200px) image
 *   cell 2 — hero:  <h2> title, body <p>, CTA <strong><a>
 *            cards: <h3> title, body <p>, a link whose label is the card CTA; the whole card
 *            links to that href (the inner anchor is unwrapped, EW6)
 *   cell 3 — hero only, optional: where the copy sits on the slide
 * @variants cell 3: top | bottom (default bottom)
 * @ew-exempt metadata — the cell 3 position word is never displayed
 */

const POSITIONS = ['top', 'bottom'];

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

const isHeading = (el) => /^H[1-6]$/.test(el.tagName);
const mediaOf = (el) => (el.matches('picture, img') ? el : el.querySelector('picture, img'));

// every authored element of a cell; a media-led cell folded into one <p> by wrapTextNodes
// (#104) is expanded back into its children
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

// group authored nodes into slides: one per row, or heading-segmented for a flattened cell
function collectSlides(block) {
  const rows = [...block.children];
  const perRow = rows.map((row) => [...row.children].flatMap(cellNodes));
  const headed = perRow.filter((nodes) => nodes.some(isHeading));
  if (headed.length >= 2 || rows.length > 1) return perRow.filter((nodes) => nodes.length);
  const slides = [];
  let current = [];
  let pending = [];
  perRow.flat().forEach((el) => {
    if (isHeading(el)) {
      if (current.some(isHeading)) slides.push(current);
      current = [...pending, el];
      pending = [];
    } else if (mediaOf(el) && current.some(isHeading) && current.some((n) => n.tagName === 'P')) {
      pending.push(el);
    } else {
      current.push(el);
    }
  });
  if (current.length) slides.push([...current, ...pending]);
  return slides;
}

function classify(nodes) {
  const out = {
    media: [], heading: null, texts: [], ctas: [], position: null, rest: [],
  };
  nodes.forEach((el) => {
    const media = mediaOf(el);
    const word = el.textContent.trim().toLowerCase();
    if (media && !el.querySelector('a') && !el.textContent.trim()) {
      out.media.push(media);
    } else if (isHeading(el) && !out.heading) {
      out.heading = el;
    } else if (el.tagName === 'P' && !media && POSITIONS.includes(word)) {
      out.position = el;
    } else if (el.querySelector('a') || el.tagName === 'A') {
      out.ctas.push(el);
    } else if (el.tagName === 'P' && !media) {
      out.texts.push(el);
    } else {
      out.rest.push(el);
    }
  });
  return out;
}

// mobile image first, desktop (>= 1200px) second; a single image serves both
function buildMedia(media, className) {
  const box = document.createElement('div');
  box.className = className;
  if (media.length > 1) {
    box.append(wrapNode(media[0], 'media-mobile'), wrapNode(media[1], 'media-desktop'));
    media.slice(2).forEach((m) => box.append(wrapNode(m, 'media-extra')));
  } else if (media.length) {
    box.append(wrapNode(media[0], 'media-all'));
  }
  return box;
}

function buildHeroSlide(parts) {
  const position = parts.position && POSITIONS.includes(parts.position.textContent.trim()
    .toLowerCase()) ? parts.position.textContent.trim().toLowerCase() : 'bottom';
  if (parts.position) parts.position.remove();
  const card = document.createElement('div');
  card.className = `hero-card hero-card-${position}`;
  card.append(buildMedia(parts.media, 'hero-card-media'));
  const content = document.createElement('div');
  content.className = 'hero-card-content';
  if (parts.heading) content.append(wrapNode(parts.heading, 'hero-card-title'));
  parts.texts.forEach((p) => content.append(wrapNode(p, 'hero-card-text')));
  if (parts.ctas.length) {
    const box = document.createElement('div');
    box.className = 'hero-card-cta';
    parts.ctas.forEach((c) => box.append(c.closest('p') || c));
    content.append(box);
  }
  parts.rest.forEach((el) => content.append(el));
  card.append(content);
  return card;
}

function buildCardSlide(parts) {
  const ctaEl = parts.ctas[0];
  let link = null;
  if (ctaEl) link = ctaEl.matches('a') ? ctaEl : ctaEl.querySelector('a');
  const card = document.createElement(link ? 'a' : 'div');
  card.className = 'content-card';
  if (link) card.href = link.href;
  card.append(buildMedia(parts.media, 'content-card-media'));
  const body = document.createElement('div');
  body.className = 'content-card-body';
  if (parts.heading) body.append(wrapNode(parts.heading, 'content-card-title'));
  parts.texts.forEach((p) => body.append(wrapNode(p, 'content-card-text')));
  parts.rest.forEach((el) => body.append(el));
  if (ctaEl) {
    const box = document.createElement('div');
    box.className = 'content-card-cta';
    box.append(ctaEl);
    // EW6 — no nested anchors: the authored label stays, its link moves to the card
    ctaEl.querySelectorAll('a').forEach((a) => a.replaceWith(...a.childNodes));
    if (ctaEl.matches('a')) {
      const span = document.createElement('span');
      ctaEl.replaceWith(span);
      span.append(...ctaEl.childNodes);
    }
    ctaEl.classList?.remove('button-wrapper');
    body.append(box);
  }
  parts.ctas.slice(1).forEach((c) => body.append(c));
  card.append(body);
  return card;
}

// presentational loop clone: media only, no text, no link, no editor indices (EW4)
function buildClone(slide, hero) {
  const clone = document.createElement('div');
  clone.className = 'carousel-slide carousel-slide-clone';
  clone.setAttribute('aria-hidden', 'true');
  const source = slide.querySelector('.hero-card, .content-card');
  const card = document.createElement('div');
  card.className = hero ? source.className : 'content-card';
  const media = source.querySelector('.hero-card-media, .content-card-media');
  if (media) {
    const copy = stripInstrumentation(media.cloneNode(true));
    copy.querySelectorAll('img').forEach((img) => {
      img.alt = '';
      img.removeAttribute('title');
      img.loading = 'lazy';
      img.removeAttribute('fetchpriority');
    });
    card.append(copy);
  }
  if (!hero) {
    const body = document.createElement('div');
    body.className = 'content-card-body';
    card.append(body);
  }
  clone.append(card);
  return clone;
}

function observeReveal(block) {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    io.unobserve(e.target);
  }));
  block.querySelectorAll('.carousel-slide picture, .content-card-media').forEach((el) => {
    if (el.parentElement.closest('.reveal')) return;
    el.classList.add('reveal');
    const img = el.querySelector('img');
    const mark = () => el.classList.add('loaded');
    if (img && img.complete) mark();
    else if (img) img.addEventListener('load', mark, { once: true });
    io.observe(el);
  });
}

export default function decorate(block) {
  const hero = block.classList.contains('hero');
  const groups = collectSlides(block);
  if (!groups.length) return;

  const viewport = document.createElement('div');
  viewport.className = 'carousel-viewport';
  const track = document.createElement('div');
  track.className = 'carousel-track';
  viewport.append(track);

  const slides = groups.map((nodes, i) => {
    const parts = classify(nodes);
    const slide = document.createElement('div');
    slide.className = `carousel-slide${i === 0 ? ' is-active' : ''}`;
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-roledescription', 'slide');
    slide.setAttribute('aria-label', `Slide ${i + 1} of ${groups.length}`);
    slide.append(hero ? buildHeroSlide(parts) : buildCardSlide(parts));
    return slide;
  });
  track.append(buildClone(slides[slides.length - 1], hero), ...slides, buildClone(slides[0], hero));

  if (hero) {
    slides[0].querySelectorAll('img').forEach((img) => {
      img.loading = 'eager';
      img.setAttribute('fetchpriority', 'high');
    });
  }

  const dots = document.createElement('ul');
  dots.className = 'carousel-dots';
  dots.setAttribute('role', 'tablist');
  dots.setAttribute('aria-label', 'Choose a slide to display');
  const buttons = slides.map((s, i) => {
    const li = document.createElement('li');
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    if (i === 0) {
      b.className = 'is-active';
      b.setAttribute('aria-selected', 'true');
    } else {
      b.tabIndex = -1;
    }
    li.append(b);
    dots.append(li);
    return b;
  });

  block.setAttribute('aria-roledescription', 'carousel');
  block.replaceChildren(viewport, dots);

  let index = 0;
  const go = (i) => {
    index = (i + slides.length) % slides.length;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = slides[0].getBoundingClientRect().width + gap;
    track.classList.add('is-animating');
    track.style.transform = `translateX(${-(index + 1) * step}px)`;
    slides.forEach((s, n) => {
      s.classList.toggle('is-active', n === index);
      s.classList.toggle('is-visible', n === index);
      s.classList.toggle('is-prev', n === (index - 1 + slides.length) % slides.length);
      s.classList.toggle('is-next', n === (index + 1) % slides.length);
    });
    buttons.forEach((b, n) => {
      b.classList.toggle('is-active', n === index);
      b.setAttribute('aria-selected', n === index ? 'true' : 'false');
      b.tabIndex = n === index ? 0 : -1;
    });
  };
  buttons.forEach((b, n) => b.addEventListener('click', () => go(n)));
  window.addEventListener('resize', () => {
    if (!track.style.transform) return;
    track.classList.remove('is-animating');
    go(index);
  });

  observeReveal(block);
}
