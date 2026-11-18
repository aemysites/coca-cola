migrate plan
============

In scope: 2 pages (stardust/.labs/site-plan.json — only these two)
  Path A  (approved)            1 page:  us-en  (landing archetype, gated 1440 1.36% / 360 3.61%)
  Path A' (template-applied)    1 page:  index  (landing sibling of us-en; source / 302 → /us/en,
                                          _signals.duplicateOf us-en; rendered AFTER the archetype
                                          is live + gated at the published origin, § 1 order #126)
  Path B  (unique)              0 pages

Skipped:  0 stale, 0 unscoped (27 uncaptured first-level links stay pointed at www.coca-cola.com)

Preconditions:
  dynamic-features.md            present (24 rows dispositioned)
  gated archetype (landing)      us-en PASS at 1440 + 360 (stardust/replica/progress.json)

DESIGN.md sha:    fe65ccc
DESIGN.json sha:  ce315ba
Canon shas:       css:3847b7c (stardust/prototypes/canon.css; chrome inside us-en-proposed.html)

Output:           stardust/migrated/  +  per-page _meta.json sidecars
Idempotent skip:  enabled (run with --force to override)
Confirmation:     skipped (2 pages, hands-off)

Units: plan → render landing (us-en) → [index after C-archetype] → assets → report
