# Inconsistency register — Coca-Cola US

Empty — pure replica. No audit was requested and no user items were supplied (`--register` absent). Any
inconsistency found during recreation is appended here (usually `deferred`), never silently fixed.

## R-01 — Features "Mix Up the Holiday Spirit" image carries the soccer card's alt text

- **Evidence:** captured page `stardust/current/pages/us-en.html` — `.teaser.campaign-card.content-on-right` (Simply holiday card) `<img src="/content/dam/onexp/us/en/campaign-cards/simply-holidays-us-campaign-dt.png" alt="Coca-Cola soccer campaign banner featuring a woman drinking from a glass bottle amidst a cheering stadium crowd.">` — byte-identical to the alt of the following soccer card (`soccer-always-on-campaign-dt.png`); the image shows Simply juice bottles with a holiday bow (`stardust/replica/gates/us-en-1440/live.png`, y≈1978–2530).
- **Finding:** authoring defect — the alt text describes a different image (copy-paste from the soccer campaign card); screen-reader users hear the wrong content.
- **Minimal change:** replace that one alt with a description of the Simply holiday image (author-supplied copy); no other change.
- **Status:** deferred (replicated verbatim in `stardust/prototypes/us-en-proposed.html`)
- **Where:** landing (us-en) — Features, first campaign card
