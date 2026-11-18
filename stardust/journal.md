# Journal — Coca-Cola US replica

## Extract — two in-scope pages captured live, one template (2026-11-18)

- Flow: replica, hands-off. Scope fixed by site-plan: `https://www.coca-cola.com/us/en` (us-en) and
  `https://www.coca-cola.com/` (index). The root redirects to /us/en, so `index` is a byte-for-byte duplicate of `us-en`
  (`_signals.duplicateOf`). One page type: `landing` (archetype us-en).
- Ran linearly rather than with the first-page-first two-track opening: with two pages there is nothing for a
  site-scope track to do in parallel.
- Crawler defect: the consent prune in `crawl.mjs` removes `[class*=cookie][class*=banner]`, and this site puts
  `cookie-banner-v2` on `<body>`, so the whole document vanished (`document.body` null). The project copy now skips
  body/html/main ancestors. Upstream fix needed.
- Consent: OneTrust (`#onetrust-accept-btn-handler`).
- Fonts: everything renders in TCCC-UnityText (licensed Coca-Cola face; the declared Noto-regional / Noto-latin do not
  load). The source serves no CORS header, so it can't be hot-linked either. Files kept as evidence only (gitignored).
- Container cap 1120px (cap-probe). Header contract recorded: 3 menus at 1440, 1 drawer at 390.
- Capture gaps: 27 first-level /us/en targets uncaptured — out of scope for this run by the fixed site plan
  (scope debt, not widened).

## Preserve direction — spec promoted verbatim, register empty, dynamics triaged (2026-11-18)

- Full-prep branch: `current/PRODUCT.md`, `DESIGN.md`, `DESIGN.json` promoted verbatim to the root
  (`DESIGN.json` added to `.hlxignore`). `stardust/direction.md` records PRESERVE mode; the inconsistency register is
  empty (pure replica). The licensed-font substitution is recorded as a forced font-policy substitution, not a
  register item.
- No `--target-breakpoints`: source breakpoints kept.
- Dynamics: detect on /us/en → 24 findings; plan with `--target-origin`, `--martech`, `--chrome` → 26 rows, curated to
  24 in `stardust/dynamic-features.md` (OneTrust iframe and the Web SDK interact call merged). Self: header menus +
  drawer, data-layer globals. Owner batch: tags/analytics/consent (carried, disabled), sign-in backend (interim:
  source sign-in links). Nothing decided-out.
- Martech: OneTrust domain script found; GTM-NBWPCZW + GTM-NCZ3RJJ routes; Adobe Web SDK seen (orgId/datastream not
  found). `stardust/martech-contract.json` has every part `enabled: false`. GTM rules were not parsed into
  `tagNotes` (library saved under `stardust/martech/tags/`); the owner's tagging plan supersedes.

## Recreate — home archetype re-authored and gated at 1440 + 360 (2026-11-18)

- `stardust/prototypes/us-en-proposed.html` + `canon.css`, `us-en.css`, `us-en.js`; clean semantic re-authoring from the
  capture, values lifted from theme.css. Substitute face Anek Latin Expanded (OFL, self-hosted) chosen by measured wraps
  (26/28 live wraps matched across 50+ open candidates), stack `TCCC-UnityText, "Anek Latin Expanded", …`.
- Gate, final (iter5, `--full`): 1440 pixel 1.36 % Δh 0; 360 pixel 3.61 % Δh 0; content-diff 0 🔴 / 0 nothing-lost;
  clip 0; overflow ok; chrome parity quiet; header/footer crops ≤ 1.34 %; cap-probe PASS at 2560.
- 360 had failed at 10.48 % / Δh −36 from one font-caused wrap ("More from Coca‑Cola®"); the third fix iteration added
  6px inline padding on section titles (font-metric compensation, licensed face would wrap identically).
- Live-carousel loop clones accepted (`stardust/replica/accepted.json`, presentational clones per recreation rule).
  Survey popup on the source dismissed with `--dismiss '[aria-label="Close survey"],.flag-container .close-button'`.
- Motion: no autoplay on the source; implemented dots, header hover/click menus, button hover rings, image fade-in,
  mobile drawer + footer accordions. motion-compare 14 match / 0 missing / 0 extra.
- Register R-01 (deferred): Simply holiday image carries the soccer card's alt text — kept as live.
- us-en approved (hands-off). Prototype table rows written for 1440 and 360 (both PASS).

## Source fidelity gate — landing archetype passed at both widths (2026-11-18)

- us-en: 1440 1.36 % / Δh 0, 360 3.61 % / Δh 0, cap-probe PASS, clip 0. Iterations 3/3 per width.

## Plan — migrate plan: 2 pages, archetype first (2026-11-18)

- Scope from stardust/.labs/site-plan.json: `us-en` (Path A, approved landing archetype) and `index` (Path A′ sibling of landing; the source root 302s to /us/en, `_signals.duplicateOf: us-en`).
- Preconditions: dynamic-features.md present; landing archetype gated PASS at 1440 (1.36%) and 360 (3.61%).
- Order: `index` renders only after the archetype is live and gated at the published origin (contract § 1, #126). Plan at stardust/migrate/plan.md; unit ledger stardust/migrate/progress.json.

## Render — us-en archetype placed in stardust/migrated (2026-11-18)

- `migrate.mjs render us-en --canon-css stardust/prototypes/canon.css` → Path A, `us/en/index.html`: 13 sections, 41 assets bundled, 0 refused.
- The 30 not-in-inventory `/us/en/*` links (rewritten by the driver to local `index.html` paths, flagged `data-broken-link`) were repointed to `https://www.coca-cola.com/<path>` per scope (decision `out-of-scope-links-repointed`); a re-render needs the same post-step.
- Sidecar: modules carousel, campaign-card, brands-list; variants carousel--hero/--promos/--secondary, campaign-card--content-right/--left; 4 dynamic-dependency deviations (tags off per martech contract, sign-in interim, chrome menus rebuilt native, settings objects not shipped).
- Content-count: content-diff capture→migrated (1440, generic) looks-same 🔴 0 · nothing-lost 🟡 0. gate-evidence filled 5 gates (pixel numbers are prototype-regime; published-origin rows come in C-deliver). `index` render deferred to after C-archetype.

## Assets — sitewide bundle finalised, portability audits pass (2026-11-18)

- `logo.svg` copied to stardust/migrated/assets/ and recorded in `state.json.migrate.bundledAssets[]` (42). Favicon present; fonts: Anek Latin Expanded 400/700 + icomoon bundled, TCCC-UnityText (licensed) deliberately not rehosted.
- `stardust/migrated/robots.txt` + `sitemap.xml` (1 url: /us/en on main--43eb1ed9--aemcoder.aem.live, priority 1.0; `/` joins when index renders). No `--clean`.
- Portability: 4 greps empty, pagemap-audit OK. file-protocol-audit needs a root index.html (index is deferred) — run on a staged copy with a stub root linking us/en; first run flagged the 2 `crossorigin` font preloads (CORS fails under file://); preloads dropped from the migrated page (decision `font-preload-dropped`, @font-face still loads) → OK, 2 pages.

## State and report — us-en migrated, index deferred (2026-11-18)

- `state.mjs advance us-en --to migrated` (migratedPath stardust/migrated/us/en/index.html); `index` stays `extracted` until its sibling render after C-archetype.
- `state.json.migrate`: selfContained true, 42 bundled assets, 0 missing, 0 cleaned; sitewide assets logo.svg, robots.txt, sitemap.xml.
- Report: stardust/migrate/report.md (1 migrated, 0 failed, 1 deferred; decisions: out-of-scope links → source, font preloads dropped; 4 dynamic-dependency deviations).

## A-inventory — 2 pages, 1 template (us-en), index content-pending (2026-11-18)

- `inventory.mjs --site-url https://www.coca-cola.com --state stardust/state.json` (archetypes-only mode): `us-en` pending (blocks carousel, campaign-card, brands-list), `index` (`/`) content-pending.
- First run grouped `index` under a separate `landing` template (the roster sibling is keyed by `representative` or by `type` = archetype slug). Set `representative: "us-en"` on the index row in state.json (the script's documented hook; no page added) → 1 template `us-en` with 2 pages.
- rollout.json site: da aemcoder/43eb1ed9 ref main; liveHost main--43eb1ed9--aemcoder.aem.live.

## B-block — 3 distinct blocks, all converted on us-en (2026-11-18)

- `blocks.mjs`: 3 module blocks (carousel, campaign-card, brands-list), 6 instances → 3 conversions; chrome header/footer handled in C0.
- `plan.mjs`: rep `us-en` converts all three; sibling `index` reuses them (stardust/rollout/plan.json).
- Decode tiers recorded in stardust/eds-conversion-log.md (carousel + brands-list reconstructive; campaign-card + chrome template-slotted).

## B2-dynamic — inventory re-verified against fresh source evidence (2026-11-18)

- Fresh `dynamics-detect.mjs --urls https://www.coca-cola.com/us/en` (→ stardust/.work/dynamics/fresh): 25 findings vs 24 at extract; 0 gone, 1 new: `dsum-sec.casalemedia.com` (ad-tech host fired by the tag manager).
- Added row 25 to stardust/dynamic-features.md (consent-gated-tags, embed-passthrough, interim, needs-business-decision — same as its siblings; martech stays off) and to the owner batch's unknown-hosts item.
- `dynamics-plan.mjs --target-origin <preview> --migrated stardust/migrated --martech --chrome`: 27 rows · self 6 · owner batch 19 · host-bound 1 (Adobe Web SDK interact — merged into martech, off) · "delivered" 1 (www.facebook.com matched the footer social link, not the pixel — curated row unchanged). Chrome rows (menu, drawer) rebuild-native in C0. Pre-import gate: every row dispositioned → C unblocked.

## C-deliver — C0 foundation authored locally, deploy awaits DA token (2026-11-18)

- No DA token (no .env, no DA_TOKEN): all local work done, nothing PUT. Unit `foundation` recorded `pending` in stardust/rollout/progress.json ("code ready; deploy awaits DA token"); C-deliver stays open (no end line).
- Foundation: styles.css/fonts.css (Anek Latin Expanded + icomoon, metric fallback; TCCC-UnityText first, never rehosted), favicon.png, header/footer blocks per the header contract, /nav + /footer docs, martech-scaffold (scripts/martech.js wired, no CMP, 0 routes), runtime-contract.json, breakpoint lint wired. Frozen: foundation-freeze.json (17 files).
- Also authored (as the only agent): carousel, campaign-card, brands-list blocks; content/us/en.html and content/index.html.
- Local gates: npm run lint pass; block-roundtrip --ew 0 🔴 at 1440/360 (EW 41/44, 3 declared exempt); ew-probe 0 drift; qa-gate PASS; delivery-lint 0/0/0 ×4; davids-model 0 🔴; harness landmark geometry equals the prototype at 1440 and 390 (after fixing a mobile-image leak in the secondary cards at desktop).
- Media: 29 images planned at content.da.live/aemcoder/43eb1ed9/media/us-en/ (manifest stardust/deploy/media-manifest-us-en.json).
- Note: the B2 dynamics-plan run re-stamped stardust/martech-contract.json provenance (content unchanged, every part still disabled).

## C-deliver — published-origin roster gate passes, C-deliver closed (2026-11-18)

- gate-all had failed only on `font-not-loaded:anek-fallback`: aem.live still served a cached styles.css (max-age 7200) from before the queued Liberation Sans fallback fix; admin code re-sync and cache purge did not shorten it, so the run waited out the TTL (fresh at 10:15 UTC).
- Re-run with `--state stardust/rollout/gate-state.json --skip-existing --recapture-eds`: 2/2 PASS at 1440 (2.64%) and 360 (6.03%), Δh 0, clip 0, content 0 missing, every face loaded. update-coverage --gate on both tables, 0 flips.
- Unit `final`: foundation-freeze check unchanged (17 files); the one foundation request was already applied. Header contract's 7 visual findings remain an owner decision (unit foundation).

## D-site — served sitemap matches, root answers, no redirects needed (2026-11-18)

- assemble.mjs: sitemap 2 urls, robots.txt; `--verify-origin` aem.live → served 2 = assembled 2, 0 extra, 0 missing.
- `/` 200 on aem.page and aem.live; /nav and /footer published with robots noindex.
- No redirects sheet: both delivered pages keep their source paths; source root's 302 → /us/en is superseded by the delivered `index` page (decision in eds-conversion-log.md).

## D2-dynamic — parity replayed on aem.live, 8/8 checks pass (2026-11-18)

- stardust/dynamics/parity.json: 26 features from dynamic-features.md (25 rows + carousels/page errors). Chrome menu, drawer and modal trigger rebuilt native (done); 17 tag rows + 3 data-layer objects `scaffolded-awaiting-owner` in the martech contract (every part disabled); form-protection and sign-in `interim` with the owner decision named.
- dynamics-check --origin aem.live: 8 PASS / 0 FAIL — header nav 13 links on both pages, Menu drawer button, 3 carousels, 0 uncaught errors on / and /us/en, martech gate: no tag host requested. Report stardust/qa/dynamics-report.md.
- No listing or search on the in-scope pages: no query index needed. D3 multilingual not applicable (one locale in scope).

## E-full-site — both pages verified on aem.live (2026-11-18)

- verify.mjs first run: us-en 404 at `/us/en/` (folder-index public URL) while the document serves at `/us/en`. The source answers `/us/en/` with 301 → `/us/en`; the same row was published as the redirects sheet (DA PUT, preview, live). Re-run: 2/2 verified, 0 failed.
- Gate tables re-applied (1440 + 360): 0 flips; both rows `verified` with gate pass.

## E2-link-audit — 61 hrefs, 0 broken, out-of-scope targets repointed to source (2026-11-18)

- localize-links --check: PASS, 0 links still localizable. Delivered pages + /nav + /footer on aem.live: 61 unique hrefs — 3 root-relative (all 200), 27 source-site targets outside the fixed 2-page scope (all 200 on the source; decision in direction.md), 31 external (other brand/company domains, app stores, social).

## F-optimize — health 88, 0 open P1 (2026-11-18)

- optimize.mjs over aem.live (2 pages + site): open P1 0 · P2 2 (no JSON-LD on / and /us/en) · P3 1 (shared meta description); 1 source-parity row (shared title, as on the source). Gate PASS. Scorecard stardust/rollout/optimize/scorecard.json.

## G-aem — source JSON-LD restored in head.html (2026-11-18)

- autofix-aem dry-run: 2 candidates, both manual (eds-jsonld on / and /us/en). The source capture carries one site-wide `WebSite` JSON-LD on both pages; the delivery had dropped it — a content-preservation gap, not an improvement. Added verbatim to head.html (a data block: the strict CSP does not apply). Foundation re-frozen after C-final with this one change.
- npm run lint not runnable in this checkout (no node_modules; eslint/stylelint cover JS/CSS only, head.html is neither). Code ships with the checkpoint push; H-report re-runs optimize on aem.live to confirm the P2 pair closes.

## H-report — 2/2 verified, health 98 after the JSON-LD sync (2026-11-18)

- Code sync carried head.html; optimize re-run on aem.live: health 98/100, P2 jsonld ×2 fixed, open P1 0 · P2 0 · P3 1 (shared meta description — verbatim source content, kept).
- stardust/rollout/report.md (summary + owner decisions), stardust/learnings.md (3 entries).

## I-dashboard — dashboard built, rollout complete (2026-11-18)

- dashboard.mjs → stardust/rollout/dashboard/index.html + data.json: 2 identified · 2 prototyped · 2 deployed (verified); "optimised 0" because the one open P3 (shared meta description, verbatim source content) touches both pages.

## Handoff — both pages delivered and live, run complete (2026-11-18)

- migrate → deploy → rollout A–I done; `/` and `/us/en` published on aem.live, verified, published-origin gate PASS at 1440 (2.64 %) and 360 (6.03 %), health 98, open P1 0. done-check: complete, 0 gaps.
- Martech carried over with every part disabled (stardust/martech-contract.json, martech-handoff.md, scripts/martech.js); owner decisions listed in stardust/rollout/report.md.
