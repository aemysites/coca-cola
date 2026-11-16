# Font licensing — REQUIRED BEFORE GOING LIVE

The replica self-hosts the source site's brand faces for fidelity (deploy step 4, principle 2).
They are proprietary. Confirm a webfont / embedding license for the served domains before
treating `aem.live` as production. Tracked as inconsistency-register entry R-01 (deferred).

| File | Family | Foundry / owner | Source | Status |
|---|---|---|---|---|
| `tccc-unitytext-regular.woff2` | TCCC-UnityText 400 | The Coca-Cola Company (proprietary) | coca-cola.com onexp-theme | UNCONFIRMED |
| `tccc-unitytext-bold.woff2` | TCCC-UnityText 700 | The Coca-Cola Company (proprietary) | coca-cola.com onexp-theme | UNCONFIRMED |
| `icomoon.woff` | icomoon (icon font) | The Coca-Cola Company theme build (proprietary) | coca-cola.com onexp-theme | UNCONFIRMED |

## Remove path (if the license cannot be confirmed)

1. Delete the three files above and their `@font-face` rules in `styles/fonts.css`.
2. Text falls back to `tccc-unitytext-fallback` (local Arial, metric-matched in
   `styles/styles.css`), then Arimo / Liberation Sans / sans-serif.
3. The icomoon glyphs (nav chevrons, menu, footer accordion, social icons, arrow links) would
   disappear: replace them with SVG icons under `/icons/` before removing `icomoon.woff`.
