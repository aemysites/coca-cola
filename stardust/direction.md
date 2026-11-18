---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-11-18T07:06:21Z
  againstInput: https://www.coca-cola.com/us/en
  readArtifacts:
    - stardust/current/PRODUCT.md
    - stardust/current/DESIGN.md
    - stardust/current/DESIGN.json
---

# Direction — preserve mode (same-design migration)

Mode: PRESERVE. The target spec is the captured current state of https://www.coca-cola.com/us/en,
promoted verbatim (no direct invocation, no creative decisions).

Promoted: current/PRODUCT.md → PRODUCT.md · current/DESIGN.md → DESIGN.md ·
current/DESIGN.json → DESIGN.json (at 2026-11-18T07:06:21Z). Provenance: verbatim `--prep` promotion.

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(empty — pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

Forced substitution (font policy, not a register item): TCCC-UnityText is a licensed Coca-Cola face the source
serves without CORS; it is never rehosted. The delivered stack keeps `TCCC-UnityText` first so a licensed drop-in
wins, followed by a metric-matched substitute chosen in Phase 3. Surfaced to the owner in the handoff.

## Link audit decision — out-of-scope internal targets repointed to the source (2026-11-18)

The run's page scope is fixed at 2 pages (`/`, `/us/en`; stardust/.labs/site-plan.json). Every other internal
target linked from the pages and the chrome is SCOPE EXTENSION, so it stays an absolute link to
https://www.coca-cola.com — 27 unique targets, all answering 200 on the source at audit time (e.g. /us/en/brands/*,
/us/en/offerings/*, /us/en/about-us/faq). No captured page is repointed; the 3 root-relative links resolve 200 on aem.live.
