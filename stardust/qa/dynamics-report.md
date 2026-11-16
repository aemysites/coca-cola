# Dynamics parity check — https://main--e4399cea--aemcoder.aem.page — 2026-11-16T08:31:20.718Z

Replayed 8 checks over 9 features · pass 8 · fail 0. Flows, not presence.

| feature | class | status | check | result | detail | third-party requests |
|---|---|---|---|---|---|---|
| Header menus: Discover, Impact, Shop | M | done | dom-count | PASS | 3 × header .site-nav li.has-submenu (min 3) |  |
| Header menus: Discover, Impact, Shop | M | done | dom-count | PASS | 3 × header .site-nav li.has-submenu (min 3) |  |
| Header drawer: Menu (mobile) | M | done | dom-count | PASS | 1 × header button.menu-btn[aria-controls] (min 1) |  |
| Sign Up / Log In header dialogs | X | interim | dom-count | PASS | 2 × header a[role=button][aria-label='Sign Up'] (min 1) |  |
| OneTrust CMP, GTM, Adobe Web SDK, GA4/Ads, ad pixels, data layers, AWS CloudWatch RUM (rows 5–10, 14) | T | scaffolded-awaiting-owner | martech | PASS | no tag host requested (0 gated · 0 cross-site host(s) blocked) |  |
| OneTrust CMP, GTM, Adobe Web SDK, GA4/Ads, ad pixels, data layers, AWS CloudWatch RUM (rows 5–10, 14) | T | scaffolded-awaiting-owner | martech | PASS | no tag host requested (0 gated · 0 cross-site host(s) blocked) |  |
| Operational telemetry (RUM) | T | done | no-page-errors | PASS | none on 2 page(s) |  |
| martech: consent + tag routing | T | scaffolded-off | martech | PASS | no tag host requested (3 gated · 0 cross-site host(s) blocked) |  |

## Features without checks

- aria-haspopup Filter Icon button (chrome only) (M) — interim
- AEM Sites CQ runtime object (A) — interim
- reCAPTCHA site keys for sign-up/login (F) — interim · owner: A-1 (tied to auth)
