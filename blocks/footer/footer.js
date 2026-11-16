import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Footer: template-slotted chrome of the coca-cola.com replica.
 * Authored /footer sections are sorted by content (never by index): logo picture, link columns
 * (heading + list), social list, app badges (linked images), legal line; anything else is kept
 * in the legal area. Below 1200px each column is an accordion (click, Enter, Space).
 */

const desktop = window.matchMedia('(width >= 1200px)');
const SOCIAL = {
  'x.com': 'i-x',
  'twitter.com': 'i-x',
  'instagram.com': 'i-instagram',
  'youtube.com': 'i-youtube',
  'facebook.com': 'i-facebook',
};

function el(tag, attrs = {}) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
  return node;
}

function socialIcon(a) {
  try {
    const host = new URL(a.href).hostname.replace(/^www\./, '');
    const key = Object.keys(SOCIAL).find((h) => host === h || host.endsWith(`.${h}`));
    return key ? SOCIAL[key] : null;
  } catch {
    return null;
  }
}

function buildColumns(wrapper, nav) {
  let col = null;
  [...wrapper.children].forEach((child) => {
    if (/^H[1-6]$/.test(child.tagName)) {
      col = el('div', { class: 'footer-col' });
      const head = el('div', { class: 'footer-col-head' });
      child.setAttribute('role', 'button');
      child.setAttribute('tabindex', '0');
      child.setAttribute('aria-expanded', 'false');
      head.append(child);
      col.append(head);
      nav.append(col);
    } else {
      if (!col) {
        col = el('div', { class: 'footer-col' });
        nav.append(col);
      }
      col.append(child);
    }
  });
}

function decorateSocial(list) {
  list.querySelectorAll('a').forEach((a) => {
    const icon = socialIcon(a);
    if (!icon) return;
    a.setAttribute('aria-label', a.textContent.trim());
    const label = el('span', { class: 'sr-only' });
    label.append(...a.childNodes);
    a.append(el('span', { class: `icon ${icon}`, 'aria-hidden': 'true' }), label);
  });
}

function bindAccordion(nav) {
  nav.querySelectorAll('.footer-col-head > *').forEach((heading) => {
    const col = heading.closest('.footer-col');
    const toggle = (e) => {
      if (desktop.matches) return;
      if (e) e.preventDefault();
      const open = !col.classList.contains('is-open');
      col.classList.toggle('is-open', open);
      heading.setAttribute('aria-expanded', String(open));
    };
    heading.addEventListener('click', () => toggle());
    heading.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') toggle(e);
    });
  });
}

export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  if (!fragment) return;

  const inner = el('div', { class: 'site-footer-inner' });
  const logo = el('div', { class: 'site-footer-logo' });
  const body = el('div', { class: 'footer-body' });
  const nav = el('nav', { class: 'footer-nav', 'aria-label': 'Footer' });
  const social = el('div', { class: 'footer-social' });
  const apps = el('div', { class: 'footer-apps' });
  const legal = el('div', { class: 'footer-legal' });

  fragment.querySelectorAll('.section > div').forEach((wrapper) => {
    if (!wrapper.children.length) return;
    const hasHeading = wrapper.querySelector('h1, h2, h3, h4, h5, h6');
    const links = [...wrapper.querySelectorAll('a')];
    const linkedImages = links.filter((a) => a.querySelector('picture, img'));
    if (hasHeading && wrapper.querySelector('ul')) {
      buildColumns(wrapper, nav);
    } else if (wrapper.querySelector('ul') && links.some(socialIcon)) {
      decorateSocial(wrapper);
      social.append(...wrapper.childNodes);
    } else if (linkedImages.length) {
      apps.append(...wrapper.childNodes);
    } else if (wrapper.querySelector('picture, img') && !links.length && !logo.children.length) {
      logo.append(...wrapper.childNodes);
    } else {
      legal.append(...wrapper.childNodes);
    }
  });

  body.append(nav, el('hr', { class: 'footer-rule-mobile' }), social);
  inner.append(logo, el('hr'), body, apps, el('hr', { class: 'footer-rule-desktop' }), legal);
  bindAccordion(nav);
  inner.querySelectorAll('a[title]:not([aria-label])').forEach((a) => {
    if (!/^https?:/.test(a.title)) a.setAttribute('aria-label', a.title);
  });

  block.textContent = '';
  block.append(inner);
}
