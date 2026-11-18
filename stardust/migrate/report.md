migrate complete
================

   1 migrated         us-en (/us/en → us/en/index.html)
   0 unchanged
   0 failed
   0 stale skipped
   1 deferred         index (Path A′ sibling of landing — renders after C-archetype: us-en live + gated
                      at the published origin, handoff-contract § 1 #126)

Render branches:
  Path A   1   approved-from-prototype (us-en, landing archetype)
  Path A'  0   (index pending)
  Path B   0

Pages with non-trivial decisions: 1
  us-en   out-of-scope-links-repointed: 30 /us/en/* links → https://www.coca-cola.com/<path> (scope debt)
          font-preload-dropped: 2 crossorigin preloads removed (file:// portability); @font-face unchanged
          4 dynamic-dependency deviations (tags off per martech contract, sign-in interim,
          chrome menus rebuilt native, settings objects not shipped)

Broken internal links: 0 (the 30 not-in-inventory links point at the source origin, not the tree)
Bespoke slots crossing promotion threshold: 0
Missing assets: 0

Gates on us-en sidecar: content-count, content-fidelity, delivery-lint (0 P0 · 0 P1 · 1 P2),
  pixel-gate-1440 1.35% / pixel-gate-360 3.61% (prototype regime — published-origin rows in C-deliver)

Output:  stardust/migrated/  (1 page, 42 bundled assets, 18 MB) — self-contained; portability audits 6/6

Next: rollout A-inventory → B-block → B2-dynamic → C-deliver (C0 foundation, then C-archetype us-en,
      then index sibling render + delivery as the root document)
