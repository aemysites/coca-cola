import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * footer — the coca-cola.com/us/en footer, template-slotted from the authored /footer document.
 *
 * /footer content (classified by content, not by section index):
 *   logo     — a lone image
 *   columns  — each heading followed by its <ul> of links (Help / Shop & Visit / Legal)
 *   social   — a <ul> of links to x.com, instagram, youtube, facebook (label = visually hidden
 *              text; an authored link title becomes its aria-label)
 *   apps     — paragraphs holding linked store-badge images
 *   legal    — the remaining paragraph(s) (© line)
 * Below 1200px each column heading toggles its list (accordion), as on the source.
 * @ew-exempt all — chrome fragment; /footer is edited as its own document
 */

const SOCIAL = [
  ['x.com', 'x'], ['twitter.com', 'x'], ['instagram.com', 'instagram'],
  ['youtube.com', 'youtube'], ['facebook.com', 'facebook'],
];

const div = (className) => {
  const el = document.createElement('div');
  el.className = className;
  return el;
};

const rule = (className) => {
  const hr = document.createElement('hr');
  hr.className = className;
  return hr;
};

function socialKind(a) {
  let host = '';
  try {
    host = new URL(a.href).hostname;
  } catch {
    return null;
  }
  const hit = SOCIAL.find(([h]) => host === h || host.endsWith(`.${h}`));
  return hit ? hit[1] : null;
}

function cleanTitle(a) {
  const label = a.textContent.trim();
  if (!a.title) return;
  if (a.title.trim() === label) a.removeAttribute('title');
  // a worded title (not a URL) is the source's aria-label too
  else if (!/^https?:/.test(a.title)) a.setAttribute('aria-label', a.title);
}

function buildSocial(list) {
  const box = div('site-footer-social');
  [...list.querySelectorAll('a')].forEach((a) => {
    const kind = socialKind(a);
    if (a.title) a.setAttribute('aria-label', a.title);
    a.removeAttribute('title');
    a.className = `social-btn social-btn-${kind}`;
    const hidden = document.createElement('span');
    hidden.className = 'visually-hidden';
    hidden.append(...a.childNodes);
    const icon = document.createElement('span');
    icon.className = `social-btn-icon social-btn-icon-${kind}`;
    icon.setAttribute('aria-hidden', 'true');
    a.append(icon, hidden);
    box.append(a);
  });
  return box;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);
  const nodes = [];
  if (fragment) {
    fragment.querySelectorAll('.default-content-wrapper').forEach((w) => nodes.push(...w.children));
    if (!nodes.length) nodes.push(...fragment.querySelectorAll(':scope > div > *'));
  }

  const logo = div('site-footer-logo');
  const nav = document.createElement('nav');
  nav.className = 'site-footer-nav';
  let social = div('site-footer-social');
  const apps = div('site-footer-apps');
  const legal = div('site-footer-legal');

  let col = null;
  nodes.forEach((el) => {
    const links = [...el.querySelectorAll('a')];
    const media = el.matches('picture, img') ? el : el.querySelector('picture, img');
    if (/^H[1-6]$/.test(el.tagName)) {
      col = div('footer-col');
      col.append(el);
      nav.append(col);
    } else if (el.tagName === 'UL' && links.length && links.every(socialKind)) {
      social = buildSocial(el);
      col = null;
    } else if (el.tagName === 'UL' && col) {
      el.querySelectorAll('a').forEach(cleanTitle);
      col.append(el);
      col = null;
    } else if (media && !links.length && !logo.children.length) {
      logo.append(media);
    } else if (media && links.length) {
      links.forEach((a) => {
        cleanTitle(a);
        apps.append(a);
      });
    } else if (el.textContent.trim()) {
      links.forEach(cleanTitle);
      legal.append(el);
    }
  });

  const inner = div('site-footer-inner');
  inner.append(
    logo,
    rule('site-footer-rule'),
    nav,
    rule('site-footer-rule site-footer-rule-subtle site-footer-rule-mobile'),
    social,
    rule('site-footer-rule site-footer-rule-desktop'),
    apps,
    legal,
  );
  const frame = div('site-footer-frame');
  frame.append(inner);
  const root = div('site-footer');
  root.append(frame);
  block.replaceChildren(root);

  nav.querySelectorAll('.footer-col').forEach((c) => {
    const head = c.querySelector('h1, h2, h3, h4, h5, h6');
    head.addEventListener('click', () => c.classList.toggle('is-open'));
  });
}
