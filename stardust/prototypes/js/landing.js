/* us-en landing — header menus (header-contract), mobile drawer, footer accordion, carousels. */
(() => {
  const header = document.getElementById('site-header');
  const desktop = window.matchMedia('(min-width: 1200px)');

  // Desktop nav: Discover / Impact / Shop toggle a submenu (click), one open at a time.
  const subs = [...header.querySelectorAll('.site-nav .has-submenu')];
  const closeAll = (except) => subs.forEach((li) => {
    if (li === except) return;
    li.classList.remove('sublist-is-open');
    li.firstElementChild.setAttribute('aria-expanded', 'false');
  });
  subs.forEach((li) => {
    const a = li.firstElementChild;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const open = !li.classList.contains('sublist-is-open');
      closeAll(li);
      li.classList.toggle('sublist-is-open', open);
      a.setAttribute('aria-expanded', String(open));
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.site-nav')) closeAll(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeAll(); setDrawer(false); } });

  // Mobile drawer (Menu button).
  const menuBtn = header.querySelector('.menu-btn');
  const setDrawer = (open) => {
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  };
  menuBtn.addEventListener('click', () => setDrawer(!header.classList.contains('is-open')));
  desktop.addEventListener('change', () => setDrawer(false));

  // Footer accordion (mobile only; desktop columns are always open).
  document.querySelectorAll('.footer-col__toggle').forEach((h) => {
    const toggle = () => {
      if (desktop.matches) return;
      const col = h.closest('.footer-col');
      const open = !col.classList.contains('is-open');
      col.classList.toggle('is-open', open);
      h.setAttribute('aria-expanded', String(open));
    };
    h.addEventListener('click', toggle);
    h.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  // Carousels: Splide-style loop — 2 x perPage presentational clones each side (built per viewport
  // at load, as the source does), real slide 1 at rest; dots move one slide pitch.
  document.querySelectorAll('[data-carousel]').forEach((car) => {
    const list = car.querySelector('.carousel__list');
    const track = car.querySelector('.carousel__track');
    const real = [...list.children];
    const dots = [...car.querySelectorAll('.carousel__dot')];
    const perPage = desktop.matches ? Number(car.dataset.perPage || 1) : 1;
    const n = Math.min(2 * perPage, 99);
    const mk = (el) => {
      const c = el.cloneNode(true);
      c.classList.add('carousel__slide--clone');
      c.removeAttribute('id');
      c.querySelectorAll('a').forEach((x) => x.setAttribute('tabindex', '-1'));
      return c;
    };
    const before = [];
    for (let k = 0; k < n; k += 1) before.unshift(mk(real[(real.length - 1 - (k % real.length))]));
    const after = [];
    for (let k = 0; k < n; k += 1) after.push(mk(real[k % real.length]));
    list.prepend(...before);
    list.append(...after);
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
        sl.classList.toggle('is-prev', k === at - 1);
        sl.classList.toggle('is-next', k === at + 1);
        sl.classList.toggle('is-visible', k >= at && k < at + perPage);
      });
    };
    go(0, false);
    dots.forEach((d, k) => d.addEventListener('click', () => go(k)));
    window.addEventListener('resize', () => go(index, false));
    track.dataset.ready = 'true';
  });
})();
