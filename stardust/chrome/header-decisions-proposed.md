# Header contract — findings proposed for a site-owner decision

chrome-compare (profile replica) on https://main--43eb1ed9--aemcoder.aem.page/us/en vs the contract
captured from https://www.coca-cola.com/us/en: behaviour, links and keyboard paths match; 7 open-state
crop findings remain. None can be cleared by code. An agent cannot sign a decision; a person adds
entries to stardust/chrome/header-decisions.json with `by`/`at` to accept them.

| finding | cause | proposed decision |
|---|---|---|
| panel-visual@1440 Discover/Impact/Shop [hover] (9.6 / 14.1 / 13.6 %) | licensed TCCC-UnityText is never rehosted; the OFL substitute Anek Latin Expanded sets the same labels ~20 px narrower, so the content-hugging panel is narrower. Same items, same order, same spacing (crops compared). | accept until the licensed font is dropped in (stack keeps TCCC-UnityText first) |
| panel-visual@390 Menu, Menu > Discover/Impact/Shop [click] (8.9–31.3 %) | the source capture is contaminated: the live site's timed "Just One Question" survey popup covers the drawer in every source crop, and the source crop box is the inner list (342 px) while the build's is the padded panel (390 px). Visual inspection of the crops: same items and buttons. | accept, or re-capture the contract once the survey is not served |
