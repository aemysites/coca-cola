# Dynamic features plan — Coca-Cola US

## Phase 1 — header behaviour (self)
Deliverable: header block rebuilds the three desktop dropdowns (Discover, Impact, Shop) and the mobile drawer per `stardust/chrome/header-contract.json`. Verification: `chrome-compare` exit 0 on the published origin. Effort: part of C0 foundation.

## Phase 2 — carousels (self)
Deliverable: hero carousel (looped, 3 slides) and card carousels with pagination dots and arrows, implemented as observed by motion-observe. Verification: motion-compare + published-origin gate.

## Phase 3 — martech (owner-gated)
Deliverable: `scripts/martech.js` from `stardust/martech-contract.json` via martech-scaffold.mjs, every part disabled; `dynamics-check.mjs` confirms nothing loads by default. Owner decision: enable CMP + routes.

## Phase 4 — sign-in (owner-gated)
Interim: Sign Up / Log In buttons link to the source sign-in. Owner decision: auth backend.
