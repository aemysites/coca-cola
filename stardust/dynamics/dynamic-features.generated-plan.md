<!-- stardust provenance: skill=stardust:dynamics · phase=plan draft · 2026-11-18T07:07:06.796Z · input stardust/current/_dynamics.json (1 pages, 26 findings) · target probe https://main--43eb1ed9--aemcoder.aem.page -->
# Dynamic features — draft inventory (curate into `stardust/dynamic-features.md`)

One row per detected finding. Merge duplicates, drop noise, keep every axis honest. Columns: disposition = what we do · target = the delivery form (widget where no authored rows remain) · reproducibility = what it needs · status = where it stands (reference/triage.md).

| # | id | class | feature | pages | disposition | target | reproducibility | status | pattern | decision needed | notes |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-first-party-api-post-ee-or2-v1-interact | A | first-party API POST /ee/or2/v1/interact | 1/1 | data-fed | block | needs-business-decision | pending | off-origin-data | which tier for the target host; consumer on the migrated pages? | **dead on target (404)** |
| 2 | a-cms-app-settings-object-datalayer | A | CMS / app settings object dataLayer | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 3 | a-cms-app-settings-object-adobedatalayer | A | CMS / app settings object adobeDataLayer | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 4 | a-cms-app-settings-object-cq | A | CMS / app settings object CQ | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 5 | f-form-protection-captcha-antibot | F | form protection: captcha / antibot | 1/1 | rebuild-native | block | needs-backend | pending | forms | production backend (vendor form id + field mapping) |  |
| 6 | m-modal-trigger-aria-haspopup-chrome-only-button-content | M | modal trigger aria-haspopup (chrome only) → button:content | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |
| 7 | t-consent-onetrust | T | consent: OneTrust | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | CMP domain script reuse on the new host |  |
| 8 | t-unknown-third-party-host-cdn-global-gcds-coke-com | T | unknown third-party host cdn.global.gcds.coke.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 9 | t-unknown-third-party-host-rum-hlx-page | T | unknown third-party host rum.hlx.page | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 10 | t-tag-manager-google-tag-manager | T | tag manager: Google Tag Manager | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 11 | t-marketing-ad-retargeting-pixel | T | marketing: ad / retargeting pixel | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 12 | t-analytics-adobe-experience-platform-web-sdk | T | analytics: Adobe Experience Platform Web SDK | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 13 | t-analytics-adobe-analytics-experience-cloud-id | T | analytics: Adobe Analytics / Experience Cloud ID | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 14 | t-unknown-third-party-host-simage2-pubmatic-com | T | unknown third-party host simage2.pubmatic.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 15 | t-analytics-google-analytics-ads | T | analytics: Google Analytics / Ads | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 16 | t-unknown-third-party-host-x-bidswitch-net | T | unknown third-party host x.bidswitch.net | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 17 | t-unknown-third-party-host-login-ds-dotomi-com | T | unknown third-party host login-ds.dotomi.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 18 | t-analytics-adobe-analytics-experience-cloud-id-first-party- | T | analytics: Adobe Analytics / Experience Cloud ID (first-party subdomain — needs a CNAME on the new host) | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 19 | t-unknown-third-party-host-adservice-google-com | T | unknown third-party host adservice.google.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 20 | t-unknown-third-party-host-aimfar-solution-weborama-fr | T | unknown third-party host aimfar.solution.weborama.fr | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 21 | t-unknown-third-party-host-analytics-ipv6-tiktokw-us | T | unknown third-party host analytics-ipv6.tiktokw.us | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 22 | t-unknown-third-party-host-www-facebook-com | T | unknown third-party host www.facebook.com | 1/1 | embed-passthrough | embed | needs-business-decision | pending | consent-gated-tags | which tags run on the new host; property ids |  |
| 23 | v-iframe-without-src-runtime-injected-embed | V | iframe without src (runtime-injected embed) | 1/1 | embed-passthrough | embed | needs-human-capture | pending | embed-passthrough | resolve the runtime src from a rendered capture |  |
| 24 | x-sign-in-account-links | X | sign-in / account links | 1/1 | decided-out | — | needs-backend | pending | decided-out | auth / commerce on the new host? |  |
| 25 | chrome-drawer | M | header drawer: Menu (chrome only) | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |
| 26 | chrome-menu | M | header menu: Discover, Impact, Shop (chrome only) | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) |  |

## Triage

- **Ships autonomously (reproducibility `self`):** 6 row(s) — read-settings, chrome-interaction.
- **One owner decision batch:** 19 row(s) — which tier for the target host; consumer on the migrated pages? · production backend (vendor form id + field mapping) · CMP domain script reuse on the new host · which tags run on the new host; property ids · resolve the runtime src from a rendered capture.
- **Already delivered by the capture pipeline:** 0 row(s) — no work.
- **Host-bound on the target:** 1 of 1 probed API paths — the off-origin data work.
- **Martech:** OneTrust · 0/2 route(s) enabled by the owner — `stardust/martech-handoff.md`.

## Phases

- **tags** — 16
- **detect** — 3
- **interactive** — 3
- **off-origin data** — 1
- **forms** — 1
- **embeds** — 1
- **register** — 1
