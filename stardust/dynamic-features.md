# Dynamic features — Coca-Cola US (www.coca-cola.com/us/en)

## Listings contract
none — no listing blocks on the in-scope pages (the card carousels are authored rows).

## Features
| # | id | feature | class | reach | disposition | target | reproducibility | status | pattern | decision / owner | evidence |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | a-cms-app-settings-object-datalayer | CMS / app settings object dataLayer | A | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 2 | a-cms-app-settings-object-adobedatalayer | CMS / app settings object adobeDataLayer | A | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 3 | a-cms-app-settings-object-cq | CMS / app settings object CQ | A | 1/1 | static-snapshot | content | self | pending | read-settings | — (keys name endpoints, ids, vendors) |  |
| 4 | f-form-protection-captcha-antibot | form protection: captcha / antibot | F | 1/1 | embed-passthrough | embed | needs-backend | interim | forms | no form on the in-scope pages; reCAPTCHA hosts load via the tag stack — rides the martech contract (off) | www.google.com, www.gstatic.com |
| 5 | m-modal-trigger-aria-haspopup-chrome-only-button-content | modal trigger aria-haspopup (chrome only) → button:content | M | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) | Filter Icon |
| 6 | t-consent-onetrust | consent: OneTrust | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | CMP domain script reuse on the new host — carried in stardust/martech-contract.json, disabled until the owner enables it | cdn.cookielaw.org, geolocation.onetrust.com, privacyportal.onetrust.com |
| 7 | t-unknown-third-party-host-cdn-global-gcds-coke-com | unknown third-party host cdn.global.gcds.coke.com | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | cdn.global.gcds.coke.com |
| 8 | t-unknown-third-party-host-rum-hlx-page | unknown third-party host rum.hlx.page | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | rum.hlx.page |
| 9 | t-tag-manager-google-tag-manager | tag manager: Google Tag Manager | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | www.googletagmanager.com |
| 10 | t-marketing-ad-retargeting-pixel | marketing: ad / retargeting pixel | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | js.adsrvr.org, bat.bing.com, analytics.tiktok.com, ad.doubleclick.net |
| 11 | t-analytics-adobe-experience-platform-web-sdk | analytics: Adobe Experience Platform Web SDK | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | cdn1.adoberesources.net |
| 12 | t-analytics-adobe-analytics-experience-cloud-id | analytics: Adobe Analytics / Experience Cloud ID | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | adobedc.demdex.net, dpm.demdex.net |
| 13 | t-unknown-third-party-host-simage2-pubmatic-com | unknown third-party host simage2.pubmatic.com | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | simage2.pubmatic.com |
| 14 | t-analytics-google-analytics-ads | analytics: Google Analytics / Ads | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | analytics.google.com |
| 15 | t-unknown-third-party-host-x-bidswitch-net | unknown third-party host x.bidswitch.net | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | x.bidswitch.net |
| 16 | t-unknown-third-party-host-login-ds-dotomi-com | unknown third-party host login-ds.dotomi.com | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | login-ds.dotomi.com |
| 17 | t-analytics-adobe-analytics-experience-cloud-id-first-party- | analytics: Adobe Analytics / Experience Cloud ID (first-party subdomain — needs a CNAME on the new host) | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | smetrics.coca-cola.com |
| 18 | t-unknown-third-party-host-adservice-google-com | unknown third-party host adservice.google.com | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | adservice.google.com |
| 19 | t-unknown-third-party-host-aimfar-solution-weborama-fr | unknown third-party host aimfar.solution.weborama.fr | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | aimfar.solution.weborama.fr |
| 20 | t-unknown-third-party-host-analytics-ipv6-tiktokw-us | unknown third-party host analytics-ipv6.tiktokw.us | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | analytics-ipv6.tiktokw.us |
| 21 | t-unknown-third-party-host-www-facebook-com | unknown third-party host www.facebook.com | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; property ids — carried in stardust/martech-contract.json, disabled until the owner enables it | www.facebook.com |
| 22 | x-sign-in-account-links | sign-in / account links | X | 1/1 | rebuild-native | runtime | needs-backend | interim | decided-out | auth backend on the new host (owner) — interim: Sign Up / Log In buttons rendered as on the source, linking to the source sign-in | https://www.coca-cola.com/us/en#login |
| 23 | chrome-drawer | header drawer: Menu (chrome only) | M | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) | 390 click/key |
| 24 | chrome-menu | header menu: Discover, Impact, Shop (chrome only) | M | 1/1 | rebuild-native | runtime | self | pending | chrome-interaction | none (the header contract is the spec) | 1440 hover/click/key |
| 25 | t-unknown-third-party-host-dsum-sec-casalemedia-com | unknown third-party host dsum-sec.casalemedia.com | T | 1/1 | embed-passthrough | embed | needs-business-decision | interim | consent-gated-tags | which tags run on the new host; fired by the tag manager — carried with stardust/martech-contract.json, disabled until the owner enables it | dsum-sec.casalemedia.com (B2 fresh detect 2026-11-18) |

Merged rows:
- `a-first-party-api-post-ee-or2-v1-interact` → merged into martech: Adobe Web SDK edge call (alloy interact) — ships with the martech contract, off
- `v-iframe-without-src-runtime-injected-embed` → merged into t-consent-onetrust: OneTrust text-resize iframe — part of the CMP

## Decision batch
One message to the owner:

1. **Tags, analytics and consent** — OneTrust (domain script 0c78f894…), GTM-NBWPCZW and GTM-NCZ3RJJ, Adobe Web SDK, Google Analytics/Ads, ad and retargeting pixels. All carried over in `stardust/martech-contract.json`, **disabled**. Turning each part on (and confirming production hosts) is the owner's call — `stardust/martech-handoff.md`.
2. **Sign up / log in** — which authentication backend serves the new host. Interim: the buttons render as on the source and link to the source sign-in.
3. **Unknown third-party hosts** (cdn.global.gcds.coke.com, pubmatic, bidswitch, login.ds.dotdigital, aimfar, ipify, facebook, casalemedia) — confirm which still fire via the tag manager.

## Register (decided-out)
| feature | reason | production statement |
|---|---|---|
| — | none: no owner statement, and hands-off never writes decided-out | — |
