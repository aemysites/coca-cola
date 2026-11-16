# Learnings — coca-cola.com replica (2026-11-16)

- **Leaf vs folder-index paths.** migrate.mjs maps every extensionless URL to `<path>/index.html`
  (trailing-slash default) and rollout `verify.mjs` then fetches `<path>/`; the archetype was
  delivered as the leaf document `/us/en` (the source canonical — `/us/en/` 301s to `/us/en`), so
  verify read 404 until the migrated file moved to `us/en.html`. Decide leaf vs folder at migrate
  time from the source's own redirect, before deploy.
- **Root that redirects.** The source root `/` redirects to `/us/en`; with `/` in the fixed site
  plan it was delivered as a root `index` document from the archetype's encoded body (identical
  capture), not as a redirects-sheet row.
- **aem.live edge after a code push.** Admin cache purges returned 200 but the aem.live edge kept
  serving the previous block JS/CSS (Age climbing toward max-age 7200); gate code changes on
  aem.page and let the edge expire.
- **Out-of-scope links.** A 2-page scope leaves 27 internal targets undelivered; repointing them to
  the source host (never a 404) is a one-pass rewrite over the content and chrome documents.
- **Token source.** The DA/admin token arrives as a file (`--token-file "$ADOBE_IMS_TOKEN_FILE"`),
  not as `DA_TOKEN` in the environment.
