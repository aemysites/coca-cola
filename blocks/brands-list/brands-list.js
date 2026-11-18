/**
 * brands-list — "Explore Our Brands": a grid of linked brand logos.
 * Reconstructive decode: one tile per authored row (or per linked image in a flattened cell).
 *
 * Authoring (one row per brand): the brand logo image, linked to the brand page
 * (<a><img alt></a>); an image followed by a separate link is accepted too.
 */

function observeReveal(els) {
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    io.unobserve(e.target);
  }));
  els.forEach((el) => {
    el.classList.add('reveal');
    const img = el.querySelector('img');
    const mark = () => el.classList.add('loaded');
    if (img && img.complete) mark();
    else if (img) img.addEventListener('load', mark, { once: true });
    io.observe(el);
  });
}

export default function decorate(block) {
  const rows = [...block.children];
  // a unit = one row, or one linked image inside a flattened row
  const units = rows.flatMap((row) => {
    const linked = [...row.querySelectorAll('a')].filter((a) => a.querySelector('picture, img'));
    return linked.length > 1 ? linked : [row];
  });

  const list = document.createElement('ul');
  units.forEach((unit) => {
    const media = unit.matches('a') ? unit.querySelector('picture, img')
      : unit.querySelector('picture, img');
    const link = unit.matches('a') ? unit : unit.querySelector('a');
    if (!media && !link) return;
    const li = document.createElement('li');
    if (link && media && link.contains(media)) {
      li.append(link);
    } else if (link) {
      // image + separate link: the link becomes the tile, the image moves into it
      const tile = document.createElement('a');
      tile.href = link.href;
      if (media) tile.append(media);
      li.append(tile);
      link.closest('p')?.remove();
    } else {
      li.append(media);
    }
    list.append(li);
  });

  block.replaceChildren(list);
  list.querySelectorAll('a').forEach((a) => {
    if (a.title && a.title.trim() === a.textContent.trim()) a.removeAttribute('title');
  });
  observeReveal([...list.querySelectorAll('a')]);
}
