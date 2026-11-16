import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Header: template-slotted chrome of the coca-cola.com replica.
 * Authored /nav: brand (logo link), nav list (nested lists = submenus), tools (CTA paragraphs).
 * Behaviour per stardust/chrome/header-contract.json: desktop submenus open on hover, click and
 * Enter/Space (one at a time, Escape / outside click / focus loss close); below 1200px a Menu
 * drawer with scroll lock. The header is static (no scroll state).
 * @ew-exempt the drawer copy of the first tools CTA is a presentational clone (EW4)
 */

const desktop = window.matchMedia('(width >= 1200px)');
const INSTRUMENTATION = ['data-prose-index', 'data-image-index', 'data-block-index'];

function stripInstrumentation(root) {
  [root, ...root.querySelectorAll('*')].forEach((node) => {
    INSTRUMENTATION.forEach((attr) => node.removeAttribute(attr));
  });
  return root;
}

function el(tag, attrs = {}) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
  return node;
}

/** Sorts the fragment's content wrappers into brand / nav / tools by content, not by index. */
function classify(fragment) {
  const wrappers = [...fragment.querySelectorAll('.section > div')];
  const slots = { brand: null, nav: null, tools: [] };
  wrappers.forEach((wrapper) => {
    if (!wrapper.children.length) return;
    if (!slots.brand && wrapper.querySelector('picture, img') && !wrapper.querySelector('ul')) {
      slots.brand = wrapper;
    } else if (!slots.nav && wrapper.querySelector('ul')) {
      slots.nav = wrapper;
    } else {
      slots.tools.push(wrapper);
    }
  });
  return slots;
}

/** Normalises one top-level item: unwraps the delivered <p>, builds the submenu trigger. */
function decorateItem(li, index) {
  [...li.children].forEach((child) => {
    if (child.tagName === 'P') child.replaceWith(...child.childNodes);
  });
  const sub = li.querySelector('ul');
  if (!sub) return null;
  li.classList.add('has-submenu');
  let trigger = [...li.children].find((child) => child.tagName === 'A');
  if (!trigger) {
    trigger = el('a', { href: '#' });
    const label = [...li.childNodes].filter((node) => node !== sub);
    trigger.append(...label);
    li.prepend(trigger);
  }
  sub.id = sub.id || `site-nav-submenu-${index}`;
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('aria-expanded', 'false');
  trigger.setAttribute('aria-controls', sub.id);
  return li;
}

export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  if (!fragment) return;

  const { brand, nav: navSource, tools } = classify(fragment);

  const root = el('div', { class: 'site-header', id: 'site-header' });
  const inner = el('div', { class: 'site-header-inner' });
  const logo = el('div', { class: 'site-header-logo' });
  const nav = el('nav', { class: 'site-nav', id: 'site-nav', 'aria-label': 'Main' });
  const drawerActions = el('div', { class: 'site-nav-actions' });
  const actions = el('div', { class: 'site-header-actions' });
  const signup = el('div', { class: 'site-header-signup' });

  if (brand) logo.append(...brand.childNodes);
  logo.querySelectorAll('img').forEach((img) => {
    img.loading = 'eager';
  });

  const list = navSource ? navSource.querySelector('ul') : null;
  if (list) {
    const leftovers = [...navSource.childNodes].filter((node) => node !== list);
    nav.append(list);
    if (leftovers.some((node) => node.nodeType === 1)) drawerActions.append(...leftovers);
  }
  const items = list ? [...list.querySelectorAll(':scope > li')] : [];
  const subs = items.map(decorateItem).filter(Boolean);

  // tools: the first CTA paragraph sits in the bar; the drawer shows a copy of it, then the rest
  const ctas = tools.flatMap((wrapper) => [...wrapper.children]);
  if (ctas.length) {
    const [first, ...rest] = ctas;
    signup.append(first);
    drawerActions.append(stripInstrumentation(first.cloneNode(true)), ...rest);
  }
  nav.append(drawerActions);

  const menuBtn = el('button', {
    class: 'menu-btn',
    type: 'button',
    'aria-label': 'Menu',
    'aria-expanded': 'false',
    'aria-controls': 'site-nav',
  });
  const menuIcon = el('span', { class: 'icon', 'aria-hidden': 'true' });
  const menuText = el('span', { class: 'menu-btn-text' });
  menuText.textContent = 'Menu';
  menuBtn.append(menuIcon, menuText);

  // source parity: the account control is present but hidden while signed out
  const accountBtn = el('button', {
    class: 'account-btn', type: 'button', 'aria-label': 'Account', hidden: '',
  });
  const accountText = el('span', { class: 'sr-only' });
  accountText.textContent = 'Account';
  accountBtn.append(el('span', { class: 'icon', 'aria-hidden': 'true' }), accountText);

  actions.append(signup, accountBtn, menuBtn);
  inner.append(logo, nav, actions);
  root.append(inner);
  // authored link titles name the link (source aria-label); in-page CTAs act as buttons
  root.querySelectorAll('a[title]:not([aria-label])').forEach((a) => {
    if (!/^https?:/.test(a.title)) a.setAttribute('aria-label', a.title);
  });
  root.querySelectorAll('.site-header-signup a[href^="#"], .site-nav-actions a[href^="#"]').forEach((a) => {
    a.setAttribute('role', 'button');
    a.setAttribute('aria-label', a.textContent.trim());
  });

  block.textContent = '';
  block.append(root);

  const trig = (li) => li.querySelector(':scope > a');
  const setSub = (li, open) => {
    li.classList.toggle('sublist-is-open', open);
    trig(li).setAttribute('aria-expanded', String(open));
  };
  const closeAll = (except) => subs.forEach((li) => {
    if (li !== except) setSub(li, false);
  });

  const setDrawer = (open) => {
    root.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflowY = open && !desktop.matches ? 'hidden' : '';
  };

  subs.forEach((li) => {
    const a = trig(li);
    const toggle = (e) => {
      e.preventDefault();
      // a pointer click lands after the hover already opened the panel: keep it open
      const hovered = li.dataset.hoverOpened === 'true';
      li.dataset.hoverOpened = 'false';
      const open = hovered || !li.classList.contains('sublist-is-open');
      closeAll(li);
      setSub(li, open);
    };
    a.addEventListener('click', toggle);
    a.addEventListener('keydown', (e) => {
      if (e.key === ' ') toggle(e);
    });
    li.addEventListener('mouseenter', () => {
      if (!desktop.matches) return;
      closeAll(li);
      li.dataset.hoverOpened = String(!li.classList.contains('sublist-is-open'));
      setSub(li, true);
    });
    li.addEventListener('mouseleave', () => {
      li.dataset.hoverOpened = 'false';
      if (desktop.matches) setSub(li, false);
    });
  });

  menuBtn.addEventListener('click', () => setDrawer(!root.classList.contains('is-open')));

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-nav')) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = subs.find((li) => li.classList.contains('sublist-is-open'));
    if (open) {
      closeAll();
      trig(open).focus();
    } else if (root.classList.contains('is-open')) {
      setDrawer(false);
      menuBtn.focus();
    }
  });
  root.addEventListener('focusout', (e) => {
    if (root.contains(e.relatedTarget)) return;
    closeAll();
    if (e.relatedTarget) setDrawer(false);
  });
  desktop.addEventListener('change', () => {
    closeAll();
    setDrawer(false);
  });
}
