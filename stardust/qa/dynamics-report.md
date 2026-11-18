# Dynamics parity check — https://main--43eb1ed9--aemcoder.aem.live — 2026-11-18T10:21:25.777Z

Replayed 8 checks over 27 features · pass 8 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| modal trigger aria-haspopup (chrome only) → button:content | M | done | dom-count | PASS | 13 × header nav a (min 13) |  |
| modal trigger aria-haspopup (chrome only) → button:content | M | done | dom-count | PASS | 13 × header nav a (min 13) |  |
| header drawer: Menu (chrome only) | M | done | dom-count | PASS | 1 × header .site-header-menu[aria-expanded] (min 1) |  |
| header menu: Discover, Impact, Shop (chrome only) | M | done | dom-count | PASS | 13 × header nav a (min 13) |  |
| header menu: Discover, Impact, Shop (chrome only) | M | done | dom-count | PASS | 13 × header nav a (min 13) |  |
| carousels (hero 8, promos 6, secondary 12 slides) + page errors | M | done | dom-count | PASS | 3 × main .carousel (min 3) |  |
| carousels (hero 8, promos 6, secondary 12 slides) + page errors | M | done | no-page-errors | PASS | none on 2 page(s) |  |
| martech: consent + tag routing | T | scaffolded-off | martech | PASS | no tag host requested (3 gated · 0 cross-site host(s) blocked) |  |

## Features without checks

- CMS / app settings object dataLayer (A) — scaffolded-awaiting-owner · owner: the data layer object is created by the tag stack, which ships disabled in the martech contract
- CMS / app settings object adobeDataLayer (A) — scaffolded-awaiting-owner · owner: the data layer object is created by the tag stack, which ships disabled in the martech contract
- CMS / app settings object CQ (A) — scaffolded-awaiting-owner · owner: the data layer object is created by the tag stack, which ships disabled in the martech contract
- form protection: captcha / antibot (F) — interim · owner: no form on the in-scope pages; captcha only loads through the tag stack
- consent: OneTrust (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host cdn.global.gcds.coke.com (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host rum.hlx.page (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- tag manager: Google Tag Manager (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- marketing: ad / retargeting pixel (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- analytics: Adobe Experience Platform Web SDK (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- analytics: Adobe Analytics / Experience Cloud ID (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host simage2.pubmatic.com (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- analytics: Google Analytics / Ads (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host x.bidswitch.net (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host login-ds.dotomi.com (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- analytics: Adobe Analytics / Experience Cloud ID (first-party subdomain — needs a CNAME on the new host) (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host adservice.google.com (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host aimfar.solution.weborama.fr (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host analytics-ipv6.tiktokw.us (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- unknown third-party host www.facebook.com (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
- sign-in / account links (X) — interim · owner: auth backend on the new host — Sign Up / Log In buttons link to the source account pages
- unknown third-party host dsum-sec.casalemedia.com (T) — scaffolded-awaiting-owner · owner: turn the part on in stardust/martech-contract.json (which tags run on the new host, property ids, CMP domain); every part ships disabled
