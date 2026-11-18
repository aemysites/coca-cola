# EDS conversion log — Coca-Cola US

## Publish decision (2026-11-18)
Decided by the run brief: **publish**. Every delivered page, the redirects sheet and the chrome documents (nav, footer
and their locale variants) go live on the aem.live origin (`deploy-batch.mjs` without `--no-publish`, or
`POST https://admin.hlx.page/live/…`). Recorded once; not re-asked.

## Target
- DA org `aemcoder`, repo `43eb1ed9`, branch `main`; preview `https://main--43eb1ed9--aemcoder.aem.page/`,
  live `https://main--43eb1ed9--aemcoder.aem.live/`.

## Block plan and decode tiers (rollout B-block, 2026-11-18)
| block | source (prototype) | instances | decode tier | why |
|---|---|---|---|---|
| `carousel` (variants `hero`, `promos`, `secondary`) | `section.carousel.carousel--*` | 3 on us-en | reconstructive | repeat group of slides/cards; one row per slide, decorate rebuilds track + dots/arrows (no autoplay, as source) |
| `campaign-card` (variants `content-right`, `content-left`) | `article.campaign-card` | 2 on us-en | template-slotted | fixed composition: image + eyebrow/heading/body/CTA slots |
| `brands-list` | `ul.brands-list` | 1 on us-en | reconstructive | repeat group of logo links; one row per brand |
| `header` (chrome, /nav doc) | `header.site-header` | site | template-slotted | per stardust/chrome/header-contract.json: 3 hover/click menus at desktop, drawer at mobile |
| `footer` (chrome, /footer doc) | `footer.site-footer` | site | template-slotted | fixed columns + legal + social |
Default content (not blocks): page title h1, section titles h2, section CTAs (button links).
Representative-first: every block converts once on `us-en`; `index` (root document) reuses all three.

## C0 foundation + landing blocks — local, awaiting DA token (2026-11-18)
- **Runtime contract** `stardust/runtime-contract.json`: vanilla EDS, `a.button.primary|secondary|accent` in
  `p.button-wrapper`, formatted-only buttonization, CSP with Trusted Types (no `innerHTML` in blocks).
- **Foundation**: `styles/styles.css` rebuilt from canon.css tokens (global border-box reset, body gate and header
  reservation kept; `--nav-height` 72px / 80px at 1200px; `main` padding 40/56, sections 24px gutter → 1120px cap);
  `styles/fonts.css` = Anek Latin Expanded 400/700 (OFL, `fonts/OFL.txt`) + icomoon; metric fallback
  `anek-fallback` (fontTools: size-adjust 138.19%, ascent 65.13%, descent 14.47%). TCCC-UnityText stays first in
  `--font-brand` and is never rehosted. Roboto fonts and the boilerplate `favicon.ico` removed;
  `favicon.png` (captured) + one `head.html` icon link.
- **Note on icomoon**: the source's icon font ships self-hosted under `fonts/` as the gated prototype does; the
  stardust/.gitignore comment lists it with the licensed faces — owner to confirm it may be rehosted.
- **Chrome**: header/footer blocks template-slotted from `/nav` + `/footer` (classified by content); behaviour
  ported from the gated prototype (hover/click submenus, outside-click + Escape close, drawer + scroll lock below
  1200, footer accordions). Sign Up / Log In are authored links (interim; `localize-links` made them
  `/us/en#signUp`, `/us/en#login`); the source's hidden account button is not rebuilt (display:none on source).
- **Blocks**: `carousel` (hero/promos/secondary; one row per slide; mobile + desktop image per slide for art
  direction; hero position word `top|bottom`, `@ew-exempt`), `campaign-card` (content-right/-left),
  `brands-list` (linked logos). Loop clones are presentational (alt="", stripped indices). No autoplay.
  Unused boilerplate demo blocks `hero`, `cards`, `columns` removed.
- **Content**: `content/us/en.html` and `content/index.html` (root document, same content — sibling of the
  landing template; its migrate render + gate row stay pending until C-archetype), `content/nav.html`,
  `content/footer.html` (both `Robots: noindex`). Out-of-scope links absolute to www.coca-cola.com.
- **Media**: 29 editorial images authored as `https://content.da.live/aemcoder/43eb1ed9/media/us-en/<file>`;
  upload manifest `stardust/deploy/media-manifest-us-en.json` (dry-run URLs match). Harness used a planned
  ledger under `.work/` only — the real `stardust/deploy/media-ledger.json` is written by the upload.
- **Local gates**: lint pass; block-roundtrip --ew 0 🔴 (EW 41/44, 3 exempt); ew-probe 0 drift;
  qa-gate PASS (with a harness schema copy giving the three carousels unique names — qa-gate pairs
  same-named schema sections with the first block); delivery-lint 0/0/0 on all four docs; davids-model 0 🔴.
  IMG COUNT 🟡 on carousel/campaign-card = the second (art-direction) image, hidden per breakpoint.
- **Lint wiring**: `stardust` added to `.eslintignore` (captured tag JS + tool copies are not runtime);
  `lint:breakpoints` added to `npm run lint`; `no-descending-specificity` disabled in the three CSS files that
  keep the prototype's cascade order.
- **Blocked on**: DA token — media upload, PUT/preview/publish, then the published-origin gates.

## Redirects (2026-11-18)
No redirects sheet is published: the run delivers exactly `/` and `/us/en`, both as pages at their source paths, so
there is no moved URL to map. The source root answers `302 → /us/en`; the plan delivers `/` as its own page
(`index`, a landing sibling), so a `/` row would shadow a delivered document and is deliberately absent.
`/` answers 200 on aem.page and aem.live. Chrome `/nav` and `/footer` carry `robots: noindex`.
Update (E-full-site): one row added — `/us/en/` → `/us/en`, mirroring the source's own 301 for the trailing-slash
form (the migrated tree stores `/us/en` as a folder index, so verify and the published checks request `/us/en/`).
Sheet `/redirects.json` PUT to DA, previewed and published live; `/us/en/` answers 301 → `/us/en` on aem.page and aem.live.
