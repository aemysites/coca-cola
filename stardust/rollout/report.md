# Rollout report — coca-cola.com (US) replica on AEM Edge Delivery (2026-11-18)

| | |
|---|---|
| Pages | 2/2 verified on https://main--43eb1ed9--aemcoder.aem.live (`/`, `/us/en`), 0 failed, 0 pending |
| Templates | 1 (landing — Home page), archetype us-en, sibling index |
| Blocks | 3 converted (carousel ×3 variants, campaign-card ×2, brands-list) + header/footer |
| Fidelity (published origin) | 1440: 2.64 % Δh 0 · 360: 6.03 % Δh 0 · clip 0 · content 0 missing — both pages |
| Quality | optimize health 98/100; open P1 0 · P2 0 · P3 1 (shared meta description, verbatim source content); 1 source-parity row |
| Dynamics | 8/8 parity checks pass; tags/analytics/consent carried in the martech contract, every part disabled |
| Links | 61 hrefs, 0 broken; 27 out-of-scope source pages linked to coca-cola.com |
| Redirects | `/us/en/` → `/us/en` (mirrors the source 301) |

## To deliver (owner decisions)
- Turn on martech contract parts (stardust/martech-contract.json, stardust/martech-handoff.md): CMP domain, tag manager, analytics ids.
- Header contract: 7 visual findings recorded at the foundation unit await an owner decision.
- Licensed TCCC-UnityText: the metric-matched substitute Anek Latin Expanded ships; the brand family stays first in the stack for a licensed drop-in.
- Sign Up / Log In point to the source account pages until an auth backend exists on the new host.
