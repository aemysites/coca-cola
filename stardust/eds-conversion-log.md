# EDS conversion log

## Publish decision (2026-11-16)

Decision: **publish** — made by the owner for this run (hands-off invocation). Every delivered page,
the redirects sheet and the chrome documents (nav, footer and their locale variants) go live on the
aem.live origin (deploy-batch.mjs without --no-publish, or the admin live endpoint).

## C0 foundation (2026-11-16)

- Runtime contract: `stardust/runtime-contract.json` (vanilla-eds, `p.button-wrapper`, formatted-only buttonization, empty-section collapse; desktop `(width >= 1200px)`).
- Fonts: TCCC-UnityText 400/700 + icomoon self-hosted under `fonts/`, declared in `styles/fonts.css`. FONT LICENSING ALERT: proprietary (The Coca-Cola Company) — `fonts/LICENSING.md`, banner in `styles/styles.css`, register R-01 (deferred). Fallback `tccc-unitytext-fallback` (local Arial, size-adjust 121.09 %, measured on a latin sample vs Liberation Sans). The prototype's undeclared `Noto-regional` / `Noto-latin` stack heads were dropped (never shipped, never render on latin text).
- Chrome decode tier: template-slotted. Header slots brand / nav list / tools by content; bar Sign Up = the authored CTA `<p>`, drawer Sign Up = presentational clone (stripInstrumentation, EW4). Footer sorts sections by content (logo, heading+list columns, social list, linked app badges, legal). Chrome images rehosted to DA `media/chrome/` (source CDN 403 to curl → in-page fetch, tier chrome).
- EDS host mapping: the block wrapper class lands on the `<header>` / `<footer>` element itself, so grounds sit on `header` and `footer .footer`.
- Lint: `npm run lint` clean (eslint, stylelint, breakpoint-lint wired as `lint:breakpoints`); `stardust/` added to `.eslintignore` (tooling, not runtime); `content/` added to `.hlxignore`.

## C-archetype landing — us-en (2026-11-16)

- Content: `content/us/en.html` (DA `/us/en`), body fragment from the gated prototype via
  `stardust/scripts/deploy/encode-landing.py` (lxml, XPath; reused by the `index` sibling).
  Metadata: Title, Description, og:type, Image (og image rehosted). Images: 22 rehosted to
  DA `media/us-en/` (source CDN 403 to curl; in-page fetch, tier chrome).
- Blocks (names locked from plan.json): `feature-xf` (template-slotted; rows desktop image /
  mobile image / h2+lede+CTA — D1 🟡 justified: art-directed Target slot, fixed composition),
  `teaser-block`, `carousel` (+ `wide` variant), `features`, `brands` — reconstructive, one row
  per unit. Section heads (h2) and trailing CTAs are default content in the section (foundation
  styles them); the teaser head is hidden as on the source.
- Card-as-link (EW6) in teaser-block / carousel / brands; brands link text is the brand name,
  screen-reader only (source tiles are image-only).
- Carousel loop clones: presentational per ai-readability (#100) — no text, alt="", no href,
  stripped indices; they keep role + "Slide n of m" aria-label + image title. Consequence:
  content-diff reports the live clones' duplicated headings (20 at 1440, 8 at 360) as MISSING
  HEADING 🔴 — duplicates of headings present once; content-presence MISSING/HIDDEN 0.
- Pipeline quirk: authored img `title` is delivered as `data-title`; blocks restore it.
- Scoped override: fallback face `tccc-unitytext-fallback` re-declared in feature-xf/carousel
  CSS with Liberation Sans/Arimo sources (foundation request filed).
- Round-trip gate is measured against a clone-free view of the prototype
  (`stardust/.work/archetype-landing/proto-noclone.html`): proto clones carry text by design.

## D-site (2026-11-16)

- Root: the source root `https://www.coca-cola.com/` redirects to `/us/en`; it is a captured,
  in-scope page in the site plan, so it is delivered as the root `index` document (`/` 200 on
  aem.page and aem.live). No `/` row in a redirects sheet (it would shadow the document).
- Redirects: none — both source URLs map 1:1 to delivered paths; no redirects sheet published.
- Chrome documents `/nav`, `/footer` carry `Robots | noindex`. Served sitemap 2 = assembled 2.
