<!-- stardust:provenance writtenBy=stardust:extract mode=prep sources=_computed-styles.json,assets/css/theme.css,pages/us-en.json -->
---
name: Coca-Cola US — current state
colors:
  background: "#eeeeee"
  surface: "#ffffff"
  text: "#000000"
  primary: "#000000"
  on-primary: "#ffffff"
  muted: "#6c6c6c"
  border: "#d5d5d5"
typography:
  family: "Noto-regional, Noto-latin, TCCC-UnityText, sans-serif"
  h1: { size: 38px, weight: 700, lineHeight: 48px, tracking: -1.5px }
  h2: { size: 32px, weight: 700, lineHeight: 40px, tracking: -1.5px }
  h3: { size: 24px, weight: 700, lineHeight: 32px, tracking: -1.5px }
  body: { size: 16px, weight: 400 }
rounded: { card: 16px, pill: 8000px }
components:
  button-primary: { bg: "#000000", fg: "#ffffff", radius: pill, hover: "inset 4px #6c6c6c ring" }
  button-inverse: { bg: "#ffffff", fg: "#000000", radius: pill, hover: "inset 4px #a5a5a5 ring" }
  card: { bg: "#ffffff", radius: 16px, shadow: "0 8px 16px rgba(0,0,0,.12)" }
---

# Coca-Cola US — current design (descriptive)

**Overview.** A monochrome shell (black text, white cards on a light-grey #eeeeee page, a black footer) that lets the
campaign photography and brand logos carry all the colour. Everything is set in one typeface — the licensed
TCCC-UnityText (the declared Noto-regional / Noto-latin names do not load on the US locale) — at 700 for headings with
tight -1.5px tracking.

**Colour.** Black and white do all the work; #6c6c6c and #d5d5d5 appear on hover rings and hairlines. Red and other
brand colours come only from imagery.

**Type.** 38/48 page H1 and hero titles, 32/40 section titles, 24/32 card titles, 16px body and buttons, 12px small
header buttons.

**Shape.** 16px radius on hero and cards, full-pill buttons (8000px), a soft `0 8px 16px rgba(0,0,0,.12)` card shadow.

**Components.** Hero carousel (Splide, looped, image cards with text on top), card carousels with pagination dots,
two campaign cards (image + text card side by side), a brands logo grid of white tiles, pill buttons, sticky header
with three dropdown menus, black footer with three link columns and social icons.
