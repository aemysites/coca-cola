# Dynamic features — www.coca-cola.com (replica, 2 pages)

Scope: `us-en` (archetype, `landing`) and `index` (redirects to `/us/en`, duplicate). Detector run on `/us/en` at 1440, settle 5000 ms; reach from the extract `--dynamics` rollup (2/2 pages). Target probe: `https://main--e4399cea--aemcoder.aem.page`. Draft: `stardust/dynamics/dynamic-features.generated-plan.md` (25 rows), curated here into 13 rows (14 after the rollout B2 re-verification below). Run mode: **hands-off**. Every non-`self` row ships its interim tier. The owner decision is recorded below as a named assumption (`A-n`). No hands-off assumption writes `decided-out`.

## Listings contract

None. There are no listing blocks, no search form (`pagesWithSearchForm: 0`) and no same-site data endpoints (`pagesWithSameSiteData: 0`) on the scoped pages. No `helix-query.yaml` is needed for this scope.

## Features

| # | id | feature | class | reach | disposition | target | reproducibility | status | pattern | decision / owner | evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | chrome-menu | Header menus: Discover, Impact, Shop (1440) | M | 2/2 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) | `stardust/chrome/header-contract.json` |
| 2 | chrome-drawer | Header drawer: Menu (360/390) | M | 2/2 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) | header contract, 390 drawer |
| 3 | m-modal-trigger-aria-haspopup-chrome-only-button-content | aria-haspopup "Filter Icon" button (chrome only) | M | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none | button:content "Filter Icon" |
| 4 | x-sign-in-account-links | Sign Up / Log In header dialogs (`#login`) | X | 2/2 | static-snapshot | widget | needs-backend | interim | chrome-interaction | **A-1**: auth on the new host. Undecided, revisit at rollout. Interim: the controls render per the header contract with no auth backend. | `https://www.coca-cola.com/us/en#login` |
| 5 | t-consent-onetrust | OneTrust CMP (domain script `0c78f894-…bfdfd`, 3 geo rule sets, 5 categories), including its internal `onetrust-text-resize` iframe (merged from `v-iframe-without-src-runtime-injected-embed`) | T | 2/2 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | **A-2**: reuse the CMP domain script on the new host. `consent.cmp.enabled: false` | cdn.cookielaw.org, geolocation.onetrust.com, privacyportal.onetrust.com |
| 6 | t-tag-manager-google-tag-manager | Google Tag Manager GTM-NBWPCZW (+ runtime-loaded GTM-NCZ3RJJ) | T | 2/2 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | **A-3**: which containers run on the new host. Routes `google-tag-manager-1/2` are `enabled: false`. Rewrite sheet in `martech-handoff.md` | www.googletagmanager.com |
| 7 | t-analytics-adobe-experience-platform-web-sdk | Adobe Web SDK / Adobe Analytics / ECID, including the first-party edge call `POST /ee/or2/v1/interact` (merged from `a-first-party-api-…-interact`, **404 on target**: host-bound) and the `smetrics.coca-cola.com` CNAME | T | 2/2 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | **A-4**: Web SDK datastream/orgId and edge/collector CNAMEs on the new host. `aemMartech.enabled: false`, config ids null (Launch not found; Web SDK is loaded via GTM) | cdn1.adoberesources.net, adobedc.demdex.net, dpm.demdex.net, smetrics.coca-cola.com, /ee/or2/v1/interact |
| 8 | t-analytics-google-analytics-ads | Google Analytics 4 / Ads (via GTM: 33 `__gaawe` tags, `__googtag`, `__flc`) | T | 2/2 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | covered by **A-3** (rides the GTM route) | analytics.google.com, adservice.google.com |
| 9 | t-marketing-ad-retargeting-pixel | Ad / retargeting pixels and ID syncs (merged: adsrvr, facebook, bing, pubmatic, bidswitch, casalemedia, dotomi, weborama, tiktok) | T | 2/2 | embed-passthrough | embed | needs-business-decision | scaffolded-awaiting-owner | consent-gated-tags | covered by **A-3** (GTM-injected; none is loaded directly by the page) | js.adsrvr.org, connect.facebook.net, bat.bing.com, www.facebook.com, simage2.pubmatic.com, dsum-sec.casalemedia.com, login-ds.dotomi.com, aimfar.solution.weborama.fr, analytics-ipv6.tiktokw.us, x.bidswitch.net (B2 re-detect) |
| 10 | a-cms-app-settings-object-datalayer | Data layers `dataLayer` and `adobeDataLayer` (merged) | A | 2/2 | embed-passthrough | runtime | needs-business-decision | scaffolded-awaiting-owner | read-settings | **A-5**: the tagging plan. The migrated pages must push the same events (GTM rules listen on `auth_complete`, `promo_click_cta`, …). Interim: the pages push nothing beyond what the tag managers push themselves | globals on 2/2 pages; 110 GTM data-layer/DOM variables in the contract `tagNotes` |
| 11 | a-cms-app-settings-object-cq | AEM Sites `CQ` runtime object | A | 2/2 | static-snapshot | content | self | interim | read-settings | none. Reason: source-CMS runtime global with no consumer on the migrated pages. Nothing ships | global `CQ` |
| 12 | f-form-protection-captcha-antibot | reCAPTCHA v3 / Enterprise site keys (meta), used by the sign-up/login dialogs | F | 2/2 | static-snapshot | — | needs-backend | interim | forms | **A-1** (tied to auth). Reason: there is no form on the scoped pages. Undecided, revisit at rollout | www.google.com, www.gstatic.com; meta `xtndRecaptchaSiteKeyV3`, `recaptchaEnterpriseSiteKey` |
| 13 | t-unknown-third-party-host-rum-hlx-page | rum.hlx.page (Operational Telemetry / RUM) | T | 2/2 | rebuild-native | runtime | self | delivered-by-platform | — | none. EDS `scripts/aem.js` emits RUM natively | rum.hlx.page |
| 14 | a-unknown-third-party-host-dataplane-rum-us-east-1-amazonaws | AWS CloudWatch RUM app monitor `e663ab94-8a97-4236-90ca-2ad1b864147a`, loaded by the page's own clientlib `clientlib-cwr` (`AwsRum` / `cwr(` in the capture); merged: `a-unknown-third-party-host-sts-us-east-1-amazonaws-com` and `x-auth-identity-provider` (its `cognito-identity` call is the RUM guest identity pool, not user auth) | T | 2/2 | embed-passthrough | runtime | needs-business-decision | interim | — | **A-6**: keep the source's CloudWatch RUM monitor on the new host. Interim: not loaded; row 13 (EDS RUM) gives operational telemetry | dataplane.rum.us-east-1.amazonaws.com, sts.us-east-1.amazonaws.com, cognito-identity.us-east-1.amazonaws.com, /etc.clientlibs/cep/clientlibs/clientlib-cwr…min.js |

Unclassified, from the extract journal: a third-party "Just One Question" sports poll popup appears on scroll. The detector did not record it as a finding. It is treated as GTM/tag-injected under **A-3** (`embed-passthrough`, off) and should be re-checked when GTM is enabled on preview.

## Decision batch

One message to the owner. Under hands-off, each item below is a **named assumption**: the interim tier ships and nothing is decided-out.

- **A-1 Auth / sign-up on the new host** (rows 4, 12): the Sign Up / Log In dialogs and their reCAPTCHA. Interim: the header UI renders per the contract with no backend wired.
- **A-2 Consent (OneTrust)** (row 5): reuse domain script `0c78f894-f494-492b-8b21-a0bf3c6bfdfd` on the new host (add the host to the OneTrust domain). Interim: CMP scaffolded off (`consent.cmp.enabled: false`).
- **A-3 Tag managers** (rows 6, 8, 9, poll popup): run GTM-NBWPCZW (and GTM-NCZ3RJJ) on the new host, and rewrite the selector/path rules listed in `stardust/martech-handoff.md` § Rewrite. Interim: both routes are off. The consent model is `owner-decision`, so routes stay ungated (category null) unless the owner sets a OneTrust group.
- **A-4 Adobe Web SDK / Analytics** (row 7): orgId, datastream, edge domain, and the `smetrics`/edge CNAMEs on the new host. Interim: `aemMartech` is off and the first-party `/ee/` path is host-bound (404 on target).
- **A-5 Tagging plan / data layer** (row 10): which `dataLayer`/`adobeDataLayer` events the new pages push. Interim: none.
- **A-6 AWS CloudWatch RUM** (row 14): keep app monitor `e663ab94-…` (Cognito guest pool + STS) on the new host, or rely on EDS RUM. Interim: not loaded. Added at rollout B2.

## Register (decided-out)

| feature | reason | production statement |
|---|---|---|
| — | none. Hands-off assumptions never write decided-out | — |

## B2 re-verification (rollout, 2026-11-16)

Fresh evidence: `dynamics-detect.mjs --urls https://www.coca-cola.com/us/en,https://www.coca-cola.com/ --reach stardust/current` (both 200, no bot wall; `stardust/.work/dynamics/fresh/_dynamics.json`, 26 findings) and `dynamics-plan.mjs --target-origin https://main--e4399cea--aemcoder.aem.page --migrated stardust/migrated --chrome` (28 draft rows, `stardust/.work/dynamics/plan/`; `--martech` deliberately not passed, it would rewrite the curated contract). Against the curated draft: 24 rows unchanged on every axis; `/ee/or2/v1/interact` still host-bound (404 on target).

- New `t-unknown-third-party-host-x-bidswitch-net` → merged into row 9 (ID sync, GTM-injected; `simage2.pubmatic.com` absent this run — ad rotation, kept).
- New `a-…-dataplane-rum-…`, `a-…-sts-…`, `x-auth-identity-provider` (cognito-identity) → one row 14, AWS CloudWatch RUM, assumption A-6. Not an auth provider: A-1 unchanged.
- `t-unknown-third-party-host-www-facebook-com` read `delivered-by-capture`: false positive — the token matches the footer social link `https://www.facebook.com/Coca-Cola/`, not the pixel. Row 9 stays `scaffolded-awaiting-owner`.
- Martech rows (5–10) unchanged: every contract part stays `enabled: false` (owner decision). Listings contract unchanged: none; no `helix-query.yaml`.
