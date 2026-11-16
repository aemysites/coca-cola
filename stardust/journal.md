# Journal

## Extract — 2 pages captured live, root redirects to /us/en (2026-11-16)

- Scope: `--prep --dynamics --pages https://www.coca-cola.com/us/en,https://www.coca-cola.com/`, hands-off, flow `replica` (stamped in `stardust/state.json`). Breakpoints 1440 and 360.
- Access: plain curl gets a CloudFront 403 "Request blocked" (non-browser UA). Playwright Chrome without stealth (`STARDUST_STEALTH=0`) gets 200, so no evasion was used.
- `https://www.coca-cola.com/` redirects to `/us/en`. Slug `index` is a duplicate of `us-en` (`duplicateOf`). Both are typed `landing`, and `us-en` is the archetype.
- Crawler fixes in the project copy `stardust/scripts/extract/crawl.mjs`:
  1. The consent-prune step removed `<body>`, because body matched `[class*=cookie][class*=banner]`/`[id*=consent]`. It now skips body/html and anything containing main/h1.
  2. Scroll now steps by 2/3 of the viewport. The 3-jump scroll left lazy card images blank.
- Vision check: us-en was recaptured (`--wait slow` plus the stepped scroll) and all imagery is present. index is ok.
- Overlays: OneTrust consent (Allow All, dismissed), a floating cookie-settings button, and a third-party "Just One Question" sports poll popup that appears on scroll. Sign Up and Login are header dialogs.
- Content rotates between loads (hero slides, promo cards, a "Spin the Holiday Wheel" block in one census load). The pixel gate will need to account for this.
- Platform: AEM Sites Core Components (cmp-teaser, splide carousels, experience-fragment header/footer). The content root is `main.container.responsivegrid`, and the shell max-width is 1120px.
- Brand: TCCC-UnityText 400/700 plus the icomoon icon font. The UI is monochrome on #eeeeee. Brand red #ea0000 appears as a token only.
- Header contract: `stardust/chrome/header-contract.json` (1440: 3 menu controls, 9 states; 390: 1 drawer, 8 states).
- Capture gap: 27 first-level `/us/en/*` targets were linked but not captured. This is scope debt by design.
- Dynamics reach: 0 same-site data endpoints, no forms or search, 2 hydrated pages. Third parties: OneTrust, GTM, rum.hlx.page.

## Dynamics — 13 rows triaged, martech carried over with every part off (2026-11-16)

- Detect (`stardust/scripts/dynamics/dynamics-detect.mjs --from-state --reach`) probed `/us/en` once. `index` is the same page, and Playwright got a 200 with no challenge. Result: 23 findings. The plan (`--target-origin https://main--e4399cea--aemcoder.aem.page --chrome --martech`) drafted 25 rows. `POST /ee/or2/v1/interact` returns 404 on the target, so it is host-bound.
- Curated into 13 rows in `stardust/dynamic-features.md` and `dynamic-features-plan.md`:
  - Chrome menus, drawer and filter popup: rebuild-native/self.
  - OneTrust, GTM, Web SDK, GA/Ads, ad pixels and data layers: embed-passthrough, scaffolded-awaiting-owner.
  - Sign-in/sign-up, reCAPTCHA and `CQ`: static-snapshot (undecided, revisit at rollout).
  - rum.hlx.page: native in EDS.
  - The draft's `decided-out` for sign-in was replaced, because a hands-off assumption cannot write decided-out.
  - Named assumptions: A-1 to A-5.
- Martech: plain `spec-martech.mjs --urls` got the CloudFront 403 and found nothing. I fed it the browser-captured `stardust/current/pages/us-en.html` instead, through a throwaway signals.jsonl and spec config (`stardust/.work/spec`). Output went to `stardust/martech`: OneTrust (3 geo rule sets, 5 categories), GTM-NBWPCZW library saved, plus GTM-NCZ3RJJ loaded at runtime. Launch was not found, and the consent model is `owner-decision`. GTM rules and variables were read into the contract `tagNotes` (80 rules, 110 data elements, each cited).
- Contract `stardust/martech-contract.json`: `consent.cmp`, both GTM routes and `aemMartech` are `enabled: false`, and `target` is null. Hand-off: `stardust/martech-handoff.md`.
- `martech-scaffold.mjs` wrote `scripts/martech.js` and hooked it in three places: `loadEager()` in `scripts/scripts.js`, `scripts/consented.js` (`loadTags()`), and `scripts/consent-check.js` (`hasConsent()` delegates). `head.html` is unchanged because the model is not google-consent-mode, and `aem.js` is untouched. A re-run reports "unchanged".
- After deploy, verify with `node stardust/scripts/dynamics/dynamics-check.mjs --origin https://main--e4399cea--aemcoder.aem.page`. The martech checks come from the contract, and `stardust/dynamics/parity.json` is still to be written (Phase 5).

## Preserve direction — verbatim promotion, one deferred register entry, dynamics triaged (2026-11-16)

- Promoted stardust/current/{PRODUCT,DESIGN}.md + DESIGN.json verbatim to the project root; direction.md records preserve mode + hands-off activation.
- Register: R-01 (proprietary TCCC-UnityText self-hosted, licence handover) — deferred, no design delta. Pure replica otherwise.
- Publish decision recorded in stardust/eds-conversion-log.md.
- Dynamics: 13 curated rows; martech (OneTrust, 2 GTM containers, Adobe Web SDK, GA4/ads pixels, data layers) carried over with every contract part disabled; scripts/martech.js scaffolded.

## Recreate — us-en landing archetype re-authored as clean HTML/CSS (2026-11-16)

- Prototype: `stardust/prototypes/us-en-proposed.html` + shared `css/canon.css` (fonts, tokens, buttons, header, footer), per-archetype `css/landing.css`, shared motion layer `css/motion.css` + `js/motion.js`, behaviour `js/landing.js`. Mobile-first on the source steps (1200); breakpoint-lint clean.
- Content verbatim from the live page as measured (measure.mjs live runs saved under `stardust/replica/measure/`). The live page now serves an Adobe Target slot after the h1 (Holiday Wheel "Your Shot at Alaska Starts Now" + football/hockey cards + "View All Promos & Offers") where the extract DOM had a 3-slide hero carousel; the captured state was replicated and logged as captureState.
- Values lifted from theme.css / computed styles: type ramp 38/48·32/40·24/32 desktop, 32/40·28/36·20/28 mobile, -1.5px heading tracking, 16px card radius, 0 8px 16px rgba(0,0,0,.12) shadow, pill buttons, #eee canvas, 1120 container (1280 header), 120/56 section rhythm.
- Fonts (R-01): TCCC-UnityText regular/bold self-hosted from the capture, stack mirrors live (`Noto-regional, Noto-latin, TCCC-UnityText`) then Arimo/Liberation Sans; icomoon icon font copied verbatim for arrow/caret/menu/social glyphs.
- Images hotlinked from the live `/content/dam` renditions (browser 200; curl 403) — rehost at deploy.
- Granularity parity: Splide loop clones mirrored per viewport (2 x perPage each side), hidden "Promos & Offers" h2, hidden Account buttons, img/link titles carried over.

## Source-fidelity gate — us-en passes at 1440 and 360 in 3 iterations (2026-11-16)

- 1440: pixel 1.08%, Δh 1px, content-diff 0 🔴 / 0 nothing-lost 🟡, chrome-parity quiet, header crop 100.00%, footer crop 99.71%, clip-probe Clipped 0, overflow ok.
- 360: pixel 1.09%, Δh 0px, content-diff 0 🔴 / 0 🟡, chrome-parity quiet, header crop 100.00%, footer crop 99.63%, Clipped 0, overflow ok.
- Cap-probe: PASS at 2560 (0 of 5 rows failed). Prototype table (gate-all --stage prototype): 1440 1.08% PASS, 360 1.09% PASS.
- Iteration path: iter1 49.7%/50.5% (image height attrs overriding aspect-ratio, carousel clones missing, chrome root backgrounds/fonts) → iter2 1.09%/4.50% (360 hot band = third-party "Just One Question" poll popup in the live capture) → iter3 re-took the 360 live capture with `--dismiss` on the popup's X → 1.09%/1.10%.
- Interaction parity: motion-observe live + build, motion-compare 12 parity / 2 missing (zero-duration scale; `loaded` set on img instead of picture) / 0 extra. Implemented only fired behaviours: image fade-in, carousel dot paging, nav submenu toggle, button hover shadows; mobile drawer + footer accordions per header contract. Pixel after motion layer unchanged (1.08% / 1.09%).
- Visual-diff advisories justified (font first-family reading, off-screen loop clones, wrapper box count). Approved hands-off; record in `stardust/replica/progress.json` types.landing.

## Migrate plan — archetype us-en rendered, index deferred to sibling tier (2026-11-16)

- Unit ledger `stardust/migrate/progress.json`: `plan` done; `landing` (render, slug index) and `report` pending.
- `migrate.mjs render us-en --canon-css stardust/prototypes/css/canon.css` (no stardust/canon/; canon.css lives under prototypes/css) → `stardust/migrated/us/en/index.html` + `_meta.json` (branch A, tier archetype, 8 assets, 7 sections, 0 refused).
- Modules declared: feature-xf, teaser-block, carousel, features, brands; variant carousel--wide (the "More from" carousel). h1 section is default content.
- 31 broken internal links = the 27 uncaptured /us/en targets already listed in `site.captureGaps` (some repeated); resolved at E2, not here.
- index: captured duplicateOf us-en, page map `/ → index.html`; delivered as the root document after C-archetype. Decision D-root in direction.md (no `/` redirect row; `/` must answer 200).

## A-inventory — 2 pages, archetypes-only coverage (2026-11-16)

- `inventory.mjs --site-url https://www.coca-cola.com/us/en --state stardust/state.json` → coverage/pages.json (2 rows: us-en pending, index content-pending at `/`), coverage/templates.json, rollout.json.
- rollout.json site: da.org aemcoder, site e4399cea, ref main, liveHost main--e4399cea--aemcoder.aem.live (kept across a re-run).
- Templates read 2 (`us-en` = archetype grouped under its slug with 5 blocks; `landing` = index keyed by its state `type`, 0 blocks). Transient: once index renders as a sibling (`template: us-en`) and inventory re-runs, it joins `us-en` — one real template.

## B-block — 5 distinct blocks, all converted on us-en (2026-11-16)

- `blocks.mjs` → coverage/blocks.json: 5 module blocks (feature-xf, teaser-block, carousel, features, brands), 0 chrome/fragment, 0 widget. Header/footer are C0 foundation, not dedup rows.
- `plan.mjs` → plan.json: us-en is the representative and converts all 5; index (content-pending, transient template `landing`) has empty convert/reuse lists and will reuse all 5 once it renders as a us-en sibling and inventory/blocks/plan re-run.

## B2-dynamic — curated surface re-verified against fresh evidence, 14 rows (2026-11-16)

- Fresh detect on /us/en and / (200 both, STARDUST_STEALTH=0, no challenge) → 26 findings; plan with `--target-origin https://main--e4399cea--aemcoder.aem.page --migrated --chrome` → 28 draft rows in stardust/.work/dynamics/plan/ (curated draft in stardust/dynamics/ left as is).
- 24 rows unchanged; `/ee/or2/v1/interact` still host-bound. bidswitch merged into row 9; AWS CloudWatch RUM (clientlib-cwr + sts + cognito guest identity, misread by the detector as an auth IdP) added as row 14 with assumption A-6 (interim: not loaded).
- facebook `delivered-by-capture` is a false positive (footer social link). Martech rows and martech-contract.json untouched — all parts `enabled: false` per owner decision. No listings, no helix-query.yaml. Gate open for C.

## Foundation — C0 authored, pushed, nav/footer live (2026-11-16)

- Code: styles.css (canon tokens, reset, buttons, 1120px shell cap, default-content heads, edit-mode CTA repaint), fonts.css + fonts/ (TCCC-UnityText 400/700, icomoon; licensing alert fonts/LICENSING.md, R-01), favicon.png (+ one head.html link; boilerplate favicon.ico and roboto fonts removed), header/footer blocks per header contract, runtime-contract.json, lint:breakpoints. Commits 7586ee9 + f784349 on main.
- Content: content/nav.html + content/footer.html (Robots noindex), chrome images in DA media/chrome/ (4, via in-page fetch — source CDN 403s curl). PUT 201 → preview 200 → live 200; .plain.html 200 on page + live, 0 about:error, imgs 1 / 3; robots noindex served.
- Behaviour on the preview origin (1440 / 390): submenu hover + click open, Escape closes; drawer opens with scroll lock, submenu expands inside it; footer accordion opens at 390, columns open at 1440; 0 page errors. Header heights 80 / 72 = --nav-height.
- Not run here (coordinator's foundation-first gate): pixel / crop-compare / chrome parity, foundation-freeze.

## Archetype delivery — us-en landing live on preview + aem.live, gate row PASS at 1440/360 (2026-11-16)

C-archetype unit `archetype-landing`. Converted the gated prototype into five blocks (feature-xf,
teaser-block, carousel(+wide), features, brands) plus default-content heads/CTAs, rehosted 22
images to DA media, deployed `/us/en` (PUT → preview → live). Structural asserts green (qa-gate
on preview PASS 28/0/0, block-roundtrip 0 🔴, EW 50/50, ai-readability 100). Published gates:
gate.sh 1440 pub2 1.08 % Δh 1 px, 360 pub1 0.95 % Δh 0; gate-all 1440 1.08 % / 360 2.87 %, clip 0,
MISSING+HIDDEN 0; crops header/footer 0.00/0.27 % (1440), 0.00/0.37 % (360). Two fix rounds:
image titles (pipeline data-title) + clone labels; fallback-face override (fonts row). Residuals:
content-diff 🔴 = live clone duplicate headings (text-less clones by the #100 rule) + header
chrome (filed). Three foundation requests filed. dynamics-check PASS.

## Cluster landing — root `/` delivered from the us-en encoder, gate row PASS (2026-11-16)

Render unit `landing`: `index` rendered from the us-en prototype verbatim (source root redirects to
/us/en; captured content identical), modules and duplicateOf decision recorded on the sidecar.
Cluster unit `cluster-landing`: `content/index.html` = the archetype's encoded body (same blocks,
same media), delivery-lint 0/0/0, David's model PASS; PUT → preview → live on `/index`; `/` answers
200 on aem.page and aem.live. gate-all `--only index`: 1440 1.08 % Δh 1, 360 2.87 % Δh 0, clip 0,
MISSING/HIDDEN 0 — PASS both widths. No foundation requests.

## C-final — foundation requests applied once, C-deliver closed (2026-11-16)

Unit `gate-all`: roster run `--skip-existing` on the published origin — 2/2 PASS at 1440 (1.08 % /
1.08 %) and 360 (2.87 % / 2.87 %), coverage updated from both summaries. Unit `final`: the three
queued requests applied once — fallback face `src` gains Liberation Sans / Arimo in
`styles/styles.css` (scoped overrides removed from feature-xf and carousel), root `/favicon.ico`,
header/footer link titles → aria-label, in-page Sign Up / Log In CTAs role=button + aria-label,
hidden Account button (source: zero box while signed out). Lint clean, foundation re-frozen.
Re-gate on preview (new code): 1440 1.08 / 1.08 %, 360 2.86 / 2.99 %, all PASS. The aem.live edge
kept the previous code copies after the admin cache purge (Age rising, max-age 7200); they expire
by themselves — the published pages already passed on the earlier code.

## D-site — sitemap served 2 = assembled 2, root 200 (2026-11-16)

assemble.mjs wrote the expected set (2 urls) and robots.txt; `--verify-origin` on aem.live matches
(extra 0, missing 0). `/` answers 200 as the delivered root document; no redirects needed (1:1
paths); nav/footer carry noindex.

## D2-dynamic — parity replayed, 8/8 on preview, martech gated (2026-11-16)

Wrote `stardust/dynamics/parity.json` from the 14 curated rows (martech rows 5–10, 14 grouped under
the contract check). dynamics-check on aem.page 8/8 PASS; on aem.live 7/8 — the Sign Up role/label
row reads the pre-C-final header code still held by the aem.live edge (Age < max-age 7200 after an
admin purge); re-checked at E-full-site. Martech: no tag host requested with every part disabled.

## E-full-site — 2/2 verified on aem.live, gate re-run PASS (2026-11-16)

verify.mjs first read us-en as 404 (migrated tree held `us/en/index.html` → folder-index URL
`/us/en/`, while the delivered and source-canonical document is `/us/en`): moved to
`stardust/migrated/us/en.html` + sidecar, state/pageMap updated, inventory re-run. Broken internal
links: 27 out-of-scope targets repointed to the source host (direction.md § Link scope decision);
index, us/en, nav, footer re-deployed and published. verify 2/2 verified. gate-all (eds re-shot):
1440 1.11 % / 1.11 %, 360 2.99 % / 3.00 %, all PASS; coverage updated. No restoreAtDelivery motion.

## E2-link-audit — 59 hrefs, 0 broken internal, 27 repointed targets 200 (2026-11-16)

Hrefs collected from the served `/index`, `/us/en`, `/nav`, `/footer`: 59 unique. Internal
root-relative: `/us/en` (200). Repointed source targets: 27/27 answer 200 on www.coca-cola.com.
28 genuinely external (store, social, app stores, partners) left as authored. No `.html` hrefs, no
trailing-slash leaves; decision recorded in direction.md § Link scope decision.

## F-optimize — health 83, 0 P1 (2026-11-16)

optimize.mjs on aem.live: 2 pages + site checks, health 83/100, open P1 0 · P2 3 · P3 1, source
parity 0. P2 JSON-LD missing (the source carries none either) and P2/P3 duplicate title/description
(the source root redirects to /us/en, so both captured pages share them) — kept as captured: replica
ships no unregistered improvements.

## G-aem — nothing auto-applicable (2026-11-16)

autofix-aem dry run: 3 candidates, 0 applicable, 3 manual (JSON-LD ×2, title disambiguation) — all
source-parity findings from F, left as captured. No re-deploy needed.

## H-report — 2/2 pages verified, 5 blocks, health 83 (2026-11-16)

Pages 2 total · 2 verified · 0 failed · 0 pending. Templates 1 (landing; archetype us-en, root
`/` delivered from it). Blocks 5 (feature-xf, teaser-block, carousel +wide, features, brands) plus
header/footer. Quality: gate 1440 1.11 % / 360 ≤ 3.00 % on both pages, clip 0, MISSING/HIDDEN 0;
optimize health 83, P1 0. To deliver: none in scope. Martech carried, every part disabled.
Learnings in `stardust/learnings.md`; migrate report unit recorded.

## I-dashboard — dashboard written (2026-11-16)

`stardust/rollout/dashboard/index.html` + `data.json`: 2 pages identified, prototyped, deployed.

## Handoff — both pages live on aem.live, rollout A–I ended, done-check complete (2026-11-16)

migrate (plan, render landing, report) → C-deliver (foundation, archetype-landing, cluster-landing,
gate-all, final) → D-site, D2-dynamic, E-full-site, E2-link-audit, F-optimize, G-aem, H-report,
I-dashboard. `/` and `/us/en` published and verified; published-origin gate PASS at 1440 and 360.
Martech contract, handoff and scripts/martech.js committed with every part disabled. Runner
done-check: complete, no gaps.
