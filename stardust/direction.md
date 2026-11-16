---
_provenance:
  writtenBy: stardust:replica
  writtenAt: 2026-11-16T06:39:31Z
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
current/DESIGN.json → DESIGN.json (at 2026-11-16T06:39:31Z).

Permitted deltas: ONLY the entries of stardust/replica/inconsistency-register.md
(1 entry, deferred — font licensing handover; no design delta — pure replica).

Fidelity: ia verbatim · design verbatim · content verbatim.

Hands-off: activated 2026-11-16T06:39:31Z by the `--hands-off` invocation (replica). Scope is fixed by
stardust/.labs/site-plan.json: 2 pages (https://www.coca-cola.com/us/en, https://www.coca-cola.com/ —
the latter redirects to /us/en). No volume cap applies beyond that plan. Gate breakpoints 1440, 360.
Publish decision: publish (owner decision recorded in stardust/eds-conversion-log.md).
Martech: owner asks to carry analytics, tags and consent over, every contract part disabled.

## Decision D-root — the site root `/` (2026-11-16, migrate plan, hands-off)

Evidence: state row `index` (https://www.coca-cola.com/) has `finalUrl` https://www.coca-cola.com/us/en,
`redirectsTo` / `duplicateOf` us-en; its capture carries `canonical` → /us/en. `migrate.mjs pagemap`:
`index  /  → index.html`, `us-en  /us/en → us/en/index.html`, 0 collisions.

Decision: `index` is a CAPTURED row, so it is delivered (rollout § E2: duplicateOf shells are in scope,
never repointed). It is delivered as the root `index` document (DA path `/index`, served at `/`), a
sibling-tier clone of the archetype us-en (`--archetype index=us-en`), canonical kept pointing at
/us/en as on the source. It renders only after us-en is live and gated on the published origin
(C-archetype); until then it is the pending migrate unit `landing`.

Consequence for D-site: the redirect branch (source root redirects → sheet rows `/` and `/index.html`
→ /us/en) is NOT used for `/` — a `/` row would shadow the delivered root document. The sheet may
still carry `/index.html` → `/` (old inbound URL). Required check either way:
`curl -sIL https://main--e4399cea--aemcoder.aem.page/` ends in 200. Fallback, only if the root
document cannot be delivered: sheet rows `/` and `/index.html` → `/us/en`, recorded as an amendment here.

## Link scope decision — out-of-scope targets repointed to the source (2026-11-16)

The site plan is fixed at 2 pages (`/`, `/us/en`). The 27 internal targets the pages, nav and footer
link to (e.g. `/us/en/brands/*`, `/us/en/offerings/*`, `/us/en/legal/*`, `/us/en/sitemap`) are
outside the declared scope — SCOPE EXTENSION, so they are repointed to
`https://www.coca-cola.com<path>` (never a 404 on the new origin). Delivering any of them later
re-localizes the link (`localize-links.mjs --source-host www.coca-cola.com`).
