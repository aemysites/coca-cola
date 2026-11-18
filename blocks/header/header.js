import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * header — the coca-cola.com/us/en chrome, template-slotted from the authored /nav document.
 *
 * /nav sections (classified by content, not by index):
 *   brand  — the logo image, linked to the home page (<a><img></a>, or <img> + a link)
 *   nav    — one <ul>: a link per top-level item; an item with a nested <ul> is a submenu
 *            (its label is the text before the nested list)
 *   tools  — the account links: Sign Up (primary, <strong>) then Log In
 * Behaviour (stardust/chrome/header-contract.json, gated prototype us-en.js):
 *   desktop (>= 1200px) — submenus open on hover, click toggles, outside click / Escape close;
 *   below — Menu toggles a full-height drawer with scroll lock, submenus become accordions.
 * @ew-exempt all — chrome fragment; /nav is edited as its own document
 */

const isDesktop = window.matchMedia('(width >= 1200px)');

function stripInstrumentation(el) {
  el.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  el.removeAttribute('data-prose-index');
  return el;
}

// decorateButtons() stamps title = text on every paragraph link; keep only authored titles,
// and expose an authored title that differs from the label as the accessible name.
function normalizeLink(a) {
  const label = a.textContent.trim();
  if (a.title && a.title.trim() === label) a.removeAttribute('title');
  if (a.title && !a.hasAttribute('aria-label')) a.setAttribute('aria-label', a.title);
}

// the pipeline wraps a list item's leading content in a <p> on live (#98) — unwrap it
function unwrapParagraphs(li) {
  li.querySelectorAll(':scope > p').forEach((p) => p.replaceWith(...p.childNodes));
}

function closeSubmenus(nav, except) {
  nav.querySelectorAll('li.has-submenu').forEach((li) => {
    if (li === except) return;
    li.classList.remove('sublist-is-open');
    li.querySelector('.site-nav-trigger')?.setAttribute('aria-expanded', 'false');
  });
}

function buildBrand(section) {
  const logo = document.createElement('div');
  logo.className = 'site-header-logo';
  if (!section) return logo;
  const media = section.querySelector('picture, img');
  const link = media ? media.closest('a') : section.querySelector('a');
  if (link) {
    if (media && !link.contains(media)) link.prepend(media);
    logo.append(link);
  } else if (media) {
    logo.append(media);
  }
  return logo;
}

function buildNavList(section) {
  const list = section ? section.querySelector('ul') : null;
  if (!list) return document.createElement('ul');
  list.className = 'site-nav-list';
  [...list.children].forEach((li) => {
    unwrapParagraphs(li);
    const sub = li.querySelector(':scope > ul');
    if (!sub) return;
    li.classList.add('has-submenu');
    sub.className = 'submenu';
    sub.querySelectorAll(':scope > li').forEach(unwrapParagraphs);
    // the label: an authored link becomes the trigger; bare text is moved into one
    let trigger = li.querySelector(':scope > a');
    if (!trigger) {
      trigger = document.createElement('a');
      trigger.href = '#';
      const lead = [...li.childNodes].filter((n) => n !== sub && !sub.contains(n));
      trigger.append(...lead);
      li.prepend(trigger);
    }
    trigger.classList.add('site-nav-trigger');
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-expanded', 'false');
  });
  list.querySelectorAll('a').forEach(normalizeLink);
  return list;
}

// account CTAs: the source renders them as labelled buttons (aria-label = the label);
// the authored link keeps its target, the button follows it on click
function plainLink(a, className) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = className;
  btn.setAttribute('aria-label', a.getAttribute('aria-label') || a.title || a.textContent.trim());
  btn.append(...a.childNodes);
  const href = a.getAttribute('href');
  if (href) btn.addEventListener('click', () => { window.location.href = href; });
  return btn;
}

// the source's account control (shown only to signed-in users)
function buildAccount() {
  const account = document.createElement('div');
  account.className = 'site-header-account';
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Account');
  const icon = document.createElement('span');
  icon.className = 'icon';
  icon.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  label.className = 'visually-hidden';
  label.textContent = 'Account';
  btn.append(icon, label);
  const menuBtn = document.createElement('button');
  menuBtn.type = 'button';
  menuBtn.setAttribute('aria-label', 'Account');
  menuBtn.hidden = true;
  account.append(btn, menuBtn);
  return account;
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);
  const sections = fragment ? [...fragment.children] : [];

  const brandSection = sections.find((s) => s.querySelector('picture, img'));
  const navSection = sections.find((s) => s !== brandSection && s.querySelector('ul'));
  const toolsSection = sections.find((s) => s !== brandSection && s !== navSection
    && s.querySelector('a'));
  const tools = toolsSection ? [...toolsSection.querySelectorAll('a')] : [];
  const [signup, login] = tools;

  const root = document.createElement('div');
  root.className = 'site-header';
  const frame = document.createElement('div');
  frame.className = 'site-header-frame';
  const wrap = document.createElement('div');
  wrap.className = 'site-header-wrap';
  const bar = document.createElement('div');
  bar.className = 'site-header-bar';

  const nav = document.createElement('nav');
  nav.className = 'site-nav';
  nav.id = 'site-nav';
  nav.append(buildNavList(navSection));

  const drawerActions = document.createElement('div');
  drawerActions.className = 'site-nav-mobile-actions';
  const actions = document.createElement('div');
  actions.className = 'site-header-actions';
  if (signup) {
    const copy = stripInstrumentation(signup.cloneNode(true));
    drawerActions.append(plainLink(copy, 'drawer-btn drawer-btn-signup'));
    actions.append(plainLink(signup, 'site-header-cta'));
  }
  actions.append(buildAccount());
  if (login) drawerActions.append(plainLink(login, 'drawer-btn drawer-btn-login'));
  tools.slice(2).forEach((a) => drawerActions.append(plainLink(a, 'drawer-btn drawer-btn-login')));
  nav.append(drawerActions);

  const menu = document.createElement('button');
  menu.type = 'button';
  menu.className = 'site-header-menu';
  menu.setAttribute('aria-label', 'Menu');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-controls', 'site-nav');
  const glyph = document.createElement('span');
  glyph.className = 'icon';
  glyph.setAttribute('aria-hidden', 'true');
  menu.append(glyph);
  actions.append(menu);

  bar.append(buildBrand(brandSection), nav, actions);
  wrap.append(bar);
  frame.append(wrap);
  root.append(frame);
  block.replaceChildren(root);

  // ---- behaviour ----
  const setDrawer = (open) => {
    root.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('is-locked', open);
    menu.setAttribute('aria-expanded', String(open));
  };
  menu.addEventListener('click', () => setDrawer(!root.classList.contains('is-open')));
  // the drawer sits before the button in the DOM: Tab from the open button enters it
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab' || e.shiftKey || !root.classList.contains('is-open')) return;
    const first = nav.querySelector('a[href], button');
    if (!first) return;
    e.preventDefault();
    first.focus();
  });

  nav.querySelectorAll('li.has-submenu').forEach((li) => {
    const trigger = li.querySelector('.site-nav-trigger');
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const open = !li.classList.contains('sublist-is-open');
      closeSubmenus(nav, li);
      li.classList.toggle('sublist-is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    });
  });
  // desktop menus open on hover (CSS); the trigger reports the open state like the source
  nav.querySelectorAll('li.has-submenu').forEach((li) => {
    const trigger = li.querySelector('.site-nav-trigger');
    li.addEventListener('mouseenter', () => {
      if (isDesktop.matches) trigger.setAttribute('aria-expanded', 'true');
    });
    li.addEventListener('mouseleave', () => {
      if (isDesktop.matches && !li.classList.contains('sublist-is-open')) trigger.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.site-nav-list > li.has-submenu')) closeSubmenus(nav);
  });
  document.addEventListener('keydown', (e) => {
    if (e.code !== 'Escape') return;
    const open = nav.querySelector('li.sublist-is-open .site-nav-trigger');
    closeSubmenus(nav);
    if (open && isDesktop.matches) open.focus();
  });
  isDesktop.addEventListener('change', () => {
    setDrawer(false);
    closeSubmenus(nav);
  });
}
