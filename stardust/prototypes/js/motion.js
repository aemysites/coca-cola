/* Shared motion layer — image fade-in as observed on live (loaded + visible classes). */
(() => {
  document.documentElement.classList.add('js');
  const imgs = [...document.querySelectorAll('main.container img')];
  const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0 }) : null;
  const watch = (img) => {
    img.classList.add('fade');
    const done = () => img.classList.add('loaded');
    if (img.complete && img.naturalWidth) done(); else img.addEventListener('load', done, { once: true });
    img.addEventListener('error', () => img.classList.add('loaded', 'visible'), { once: true });
    if (io) io.observe(img); else img.classList.add('visible');
  };
  imgs.forEach(watch);
  // Carousel clones are created by landing.js after this runs — watch them as they appear.
  new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((n) => {
    if (n.nodeType === 1) n.querySelectorAll('img').forEach((img) => { img.classList.remove('loaded', 'visible'); watch(img); });
  }))).observe(document.querySelector('main.container'), { childList: true, subtree: true });
})();
