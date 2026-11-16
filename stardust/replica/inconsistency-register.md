# Inconsistency register — www.coca-cola.com replica

Everything not listed here is frozen; any design delta found by the gate is a defect, not an improvement.

## R-01 — Proprietary brand face TCCC-UnityText self-hosted from the source

- **Evidence:** stardust/current/assets/fonts/tccc-unitytext-{regular,bold}.woff2 — the only text face on the page (stardust/current/_computed-styles.json); intercepted from the live site's own font requests.
- **Finding:** TCCC-UnityText is a private brand typeface; its web licence for the new host is unverified. Not a design inconsistency — a licensing handover item.
- **Minimal change:** none in this run. The faces ship as-is (fonts policy: brand family first, metric fallback Arimo/Liberation Sans after it); the owner confirms the licence or swaps the files later without a code change.
- **Status:** deferred
- **Where:** all page types, all text
