/* us-en.js — interaction parity only (observed on the live page by motion-observe):
 * carousel dot navigation (track transform .4s, dot width .2s), header submenus (hover via CSS,
 * click toggles .sublist-is-open, outside click closes), mobile drawer, mobile footer accordions.
 * Image reveal: live adds .loaded/.visible to each lazy picture as it enters the viewport and the
 * image fades in (opacity .4s) — mirrored with one IntersectionObserver.
 * No autoplay: the live carousels showed no idle mutations. */
(() => {
  // ---- image reveal (observed: opacity .4s on picture.loaded.visible > img) ----
  const media = [...document.querySelectorAll('main picture, main .content-card__media, main .brands-list a, main .campaign-card__media')]
    .filter((el, i, all) => !all.some((o) => o !== el && o.contains(el)));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }));
    media.forEach((el) => {
      el.classList.add('reveal');
      const img = el.querySelector('img');
      const mark = () => el.classList.add('loaded');
      if (img && img.complete) mark(); else if (img) img.addEventListener('load', mark, { once: true });
      io.observe(el);
    });
  }

  // ---- carousels ----
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-track]');
    const real = [...track.children].filter((s) => !s.classList.contains('carousel__slide--clone'));
    const dots = [...carousel.querySelectorAll('.carousel__dots button')];
    let index = 0;
    const go = (i) => {
      index = (i + real.length) % real.length;
      const first = real[0];
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = first.getBoundingClientRect().width + gap;
      track.classList.add('is-animating');
      track.style.transform = `translateX(${-(index + 1) * step}px)`;
      real.forEach((s, n) => {
        s.classList.toggle('is-active', n === index);
        s.classList.toggle('is-visible', n === index);
        s.classList.toggle('is-prev', n === (index - 1 + real.length) % real.length);
        s.classList.toggle('is-next', n === (index + 1) % real.length);
      });
      dots.forEach((d, n) => {
        d.classList.toggle('is-active', n === index);
        d.setAttribute('aria-selected', n === index ? 'true' : 'false');
        d.tabIndex = n === index ? 0 : -1;
      });
    };
    dots.forEach((d, n) => d.addEventListener('click', () => go(n)));
    window.addEventListener('resize', () => {
      if (!track.style.transform) return;
      track.classList.remove('is-animating');
      go(index);
    });
  });

  // ---- header: submenus + drawer ----
  const header = document.querySelector('.site-header');
  const items = [...header.querySelectorAll('.site-nav__list > li.has-submenu')];
  const closeAll = (except) => items.forEach((li) => {
    if (li === except) return;
    li.classList.remove('sublist-is-open');
    li.firstElementChild.setAttribute('aria-expanded', 'false');
  });
  items.forEach((li) => {
    const trigger = li.firstElementChild;
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const open = !li.classList.contains('sublist-is-open');
      closeAll(li);
      li.classList.toggle('sublist-is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.site-nav__list > li.has-submenu')) closeAll(); });

  const menu = header.querySelector('.site-header__menu');
  menu.addEventListener('click', () => {
    const open = !header.classList.contains('is-open');
    header.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('is-locked', open);
    menu.setAttribute('aria-expanded', String(open));
  });

  // ---- footer accordions (below the desktop step; CSS keeps them open at ≥1200) ----
  document.querySelectorAll('.footer-col h4').forEach((h) => {
    h.addEventListener('click', () => h.parentElement.classList.toggle('is-open'));
  });
})();
