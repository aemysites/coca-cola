# Learnings

- 2026-11-18 · rollout C-deliver · A foundation CSS fix can pass on aem.page and fail on aem.live for up to max-age=7200: the published-origin gate read a cached styles.css (fallback face `local("Arial")` only, dead on a Linux runner). Admin code re-sync and cache purge did not shorten it here; a `?query` fetch proved the fresh file. Ship font-fallback `local()` lists with the Linux metric twin (Liberation Sans) from C0.
- 2026-11-18 · rollout E-full-site · A migrated folder index (`us/en/index.html`) makes verify/done-check request `/us/en/` while DA serves `/us/en`; a redirects row mirroring the source's own 301 closes it.
- 2026-11-18 · rollout G-aem · optimize's jsonld P2 was a dropped source block (site-wide `WebSite` JSON-LD), not an improvement: check the capture before treating a finding as new work.
