<!-- stardust:provenance writtenBy=stardust:extract writtenAt=2026-11-16 readArtifacts=stardust/current/pages/us-en.json,stardust/current/pages/index.json,stardust/current/_brand-extraction.json synthesizedInputs=none -->

# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

_provenance: inferred. Basis: the nav, promo copy and CTAs on the captured home page._

US consumers of Coca-Cola beverages: fans entering promotions (Big Wins, Holiday Caravan, a year of drinks), sports fans (Soccer Central, football and hockey prizes), +one app users, and visitors planning World of Coca-Cola or Coca-Cola Store trips.

## Product Purpose

The US consumer front door for The Coca-Cola Company's drinks: it routes visitors to brand pages (Coca-Cola, Coke, Sprite, Fanta, smartwater, Minute Maid), promotions and sweepstakes ("Promos & Offers"), editorial features, the +one loyalty app and the online and physical stores. Hero line: "The Coca‑Cola® Official Site for Drinks & Experiences".

## Positioning

_provenance: inferred. Basis: the meta description and hero copy._

"Experience the official Coca‑Cola® site to find your favorite drink and discover…": an experience hub rather than a store. Commerce is linked out (coca-colastore.com, worldofcoca-cola.com).

## Capabilities and Constraints

- AEM Sites build (Core Components: teasers, splide carousels, experience-fragment header and footer); `main.container.responsivegrid` is the content root.
- Content rotates: hero slides and promo cards change between loads (personalisation or campaign rotation).
- OneTrust cookie consent (banner plus floating settings button); a third-party "Just One Question" survey overlay can appear while scrolling.
- Sign-up and login are header dialogs (`#signUp`, `#login`), not pages.
- Tags: Google Tag Manager (`dataLayer`), RUM (`rum.hlx.page`), reCAPTCHA styles loaded.

## Brand Commitments

- Register: **brand** (marketing/landing).
- Personality observed: upbeat, promotional, sport and holiday seasonal, with short exclamatory headlines ("YOU COULD WIN BIG THIS SEASON").
- Visual commitments: proprietary TCCC-UnityText type, monochrome UI with red carried by imagery, rounded white cards, pill buttons.
- Observed anti-references: no red UI chrome, no gradients, no dense text pages on the home page.

## Evidence on Hand

- `stardust/current/pages/us-en.json` and `.html` (rendered DOM), `pages/index.json` (redirect duplicate)
- `stardust/current/assets/screenshots/us-en.png`, `index.png` (1440 full page)
- `stardust/current/_computed-styles.json` (census at 1440 and 360)
- `stardust/current/_brand-extraction.json`, `DESIGN.md`, `DESIGN.json`
- `stardust/current/assets/fonts/` (TCCC-UnityText 400/700, icomoon), `assets/css/` (theme.css, clientlib-base), `assets/logo.svg`, `assets/favicon.png`
- `stardust/chrome/header-contract.json` (header behaviour contract)

## Product Principles

_provenance: inferred. Basis: the page structure._

1. Promotions first: the hero and the first section are promo entry points.
2. Brand and imagery carry the colour; the interface stays neutral.
3. Every card is one tap to a deeper page or partner property.

## Accessibility & Inclusion

Images carry descriptive alt text. The heading outline is clean (one h1, h2 sections, h3 cards). Carousels are splide with arrows and dots. The Sign Up pill renders grey on grey (`#6c6c6c` on `#bdbdbd`), a low-contrast spot.
