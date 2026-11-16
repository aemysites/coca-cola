---
name: Coca-Cola US (current state)
description: The Coca‑Cola® Official Site for Drinks & Experiences — grey-ground AEM portal, black/white UI chrome, colour carried by photography.
colors:
  ink: "#000000"
  white: "#ffffff"
  page-grey: "#eeeeee"
  coke-red: "#ea0000"
  muted-grey: "#6c6c6c"
  border-subtle: "#d5d5d5"
  disabled-grey: "#bdbdbd"
typography:
  display:
    fontFamily: "TCCC-UnityText, sans-serif"
    fontSize: "38px"
    fontWeight: 700
    lineHeight: "48px"
    letterSpacing: "-1.5px"
  headline:
    fontFamily: "TCCC-UnityText, sans-serif"
    fontSize: "32px"
    fontWeight: 700
    lineHeight: "40px"
    letterSpacing: "-1.5px"
  title:
    fontFamily: "TCCC-UnityText, sans-serif"
    fontSize: "24px"
    fontWeight: 700
    lineHeight: "32px"
    letterSpacing: "-1.5px"
  body:
    fontFamily: "TCCC-UnityText, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
    letterSpacing: "0px"
  action:
    fontFamily: "TCCC-UnityText, sans-serif"
    fontSize: "16px"
    fontWeight: 700
rounded:
  sm: "8px"
  card: "16px"
  lg: "30px"
  pill: "8000px"
spacing:
  paragraph-s: "4px"
  paragraph-m: "8px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.action}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
  page:
    backgroundColor: "{colors.page-grey}"
    textColor: "{colors.ink}"
---

<!-- stardust:provenance writtenBy=stardust:extract writtenAt=2026-11-16 readArtifacts=stardust/current/_brand-extraction.json,stardust/current/_computed-styles.json,stardust/current/pages/us-en.json synthesizedInputs=none -->

# Design System: Coca-Cola US (current state)

Descriptive snapshot of https://www.coca-cola.com/us/en as captured 2026-11-16 (1440 and 360). `https://www.coca-cola.com/` redirects to `/us/en`, so every value below comes from one rendered page. Values cite `_computed-styles.json` (census) and `pages/us-en.json#customProps` (`:root` tokens).

## Overview

An AEM Sites (Core Components) portal on a light grey ground (`#eeeeee`). The UI chrome is strictly monochrome: black type, white cards, black pill buttons. Colour arrives almost entirely through promo art and photography (red Big Wins banners, product shots, brand logo tiles). Brand red `#ea0000` exists as a token (`--color-accent-regular`, `--color-icon-brand-primary-regular`) but no measured UI surface computes to it. Most of the page is carousels (splide): a hero teaser carousel, a promo card carousel, and a secondary card carousel. Hero slides and promo cards rotate between loads.

## Colors

- **Ink `#000000`**: all text, headings, primary pill buttons, footer background.
- **Card White `#ffffff`**: card surfaces, header bar, text on dark.
- **Page Grey `#eeeeee`**: page background (largest painted area).
- **Coca-Cola Red `#ea0000`**: token only, carried by imagery and logos.
- **Muted Grey `#6c6c6c`**, **Border `#d5d5d5`**, **Disabled `#bdbdbd`**: secondary text, hover rings, carousel dots.

## Typography

One proprietary family, **TCCC-UnityText** (400 and 700, self-hosted woff2), declared behind `Noto-regional, Noto-latin` (which never load for en-US). Headings are bold with `-1.5px` tracking.

| Level | 1440 | 360 |
|---|---|---|
| h1 | 38/48 | 32/40 |
| h2 (section) | 32/40 | 28/36 |
| h3 (card) | 24/32 | 20/28 |
| body | 16/24 | 16/24 |

Scale is ad hoc (no constant ratio). The `icomoon` icon font supplies social icons, arrows, menu and profile glyphs.

## Layout

Centered content column inside full-width grey sections; cards in 2-up carousels at desktop, single-card swipe at 360. Footer is a full-bleed black band with three link columns plus social icons. Content shell caps at **1120px** (`max-width` on `main.container.responsivegrid`, holds 100% of the text; probe 2560). Three section modules cap narrower (768, 672, 576px). Full model: `DESIGN.json` `extensions.breakpoints`.

## Elevation & Depth

One shadow: `rgba(0,0,0,0.12) 0 8px 16px` on every card and brand tile. No gradients.

## Shapes

Cards 16px radius; buttons are full pills (`8000px`); a few 30px and asymmetric bottom-rounded (`0 0 24px 24px`) panels in the hero.

## Components

- **Primary pill button**: black fill, white bold 16px label; hover adds an inset ring (`inset 0 0 0 4px #6c6c6c`).
- **Outlined pill button**: white fill, black border and label (brands "View All").
- **Content card**: white card, image on top, h3 title, body text, underlined bold link with an arrow glyph.
- **Campaign card**: wide image and text split, alternating image side (Features).
- **Brand tile**: white rounded square holding a brand logo, 3x2 grid.
- **Header**: white bar with the company wordmark, nav (Brands, Discover, Impact, Shop, Promos & Offers) with hover submenus, a grey Sign Up pill.

## Do's and Don'ts

- Do keep the UI monochrome and let imagery carry colour.
- Do use pill buttons and 16px cards with the single soft shadow.
- Don't paint UI surfaces Coca-Cola red. The live site doesn't.
- Don't add a second typeface.
