# Martech hand-off

Everything below is scaffolded **off**. To ship it, set `enabled: true` on `consent.cmp` and on each route in `stardust/martech-contract.json`, then re-run `deploy/scripts/martech-scaffold.mjs` and `dynamics/scripts/dynamics-check.mjs` to confirm the enabled tags load. Enabled tags load on `www.coca-cola.com` only; preview with `?martech=on` (add `&consent=accept` to grant every category).

## Consent

- **CMP:** OneTrust · `data-domain-script` = `0c78f894-f494-492b-8b21-a0bf3c6bfdfd`
- **Model `owner-decision`:** no evidence of consent gating inside the tag manager. Keep the source behaviour (route `category` null), or set a route `category` to a consent group id to load that tag manager only once the group is granted.
- **Google Consent Mode:** consent-mode calls in `tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js`. Check it with the owner before gating a route on a category.
- **Categories** (default rule set of 3 geo rule sets — the CMP applies them, nothing to port): `1` Necessary (always active) · `2` Analytics Cookies (inactive landingpage) · `4` Advertising  (inactive landingpage) · `3` Personalization  (inactive landingpage) · `5` Social Media Cookies (inactive landingpage)

## Routes

| id | vendor | src | CMP groups listing its host | enabled |
|---|---|---|---|---|
| google-tag-manager-1 | Google Tag Manager | `https://www.googletagmanager.com/gtm.js?id=GTM-NBWPCZW` | — | false |
| google-tag-manager-2 | Google Tag Manager | `https://www.googletagmanager.com/gtm.js?id=GTM-NCZ3RJJ&gtm=4e6bg2` | — | false |

Also seen, not routed (loaded by the tag manager or inline on the source — confirm each still fires): analytics: Adobe Experience Platform Web SDK · analytics: Google Analytics / Ads · marketing: ad / retargeting pixel.

## Rewrite before go-live

Nothing found (or no tag-manager library read).

## Data layer

The source pages expose `adobeDataLayer`, `dataLayer`; keep the same global names.
Rules in Google Tag Manager were not parsed. Read each library listed in `martech/tags.json` and record its rules and data elements in the contract's `tagNotes`, keyed by tag manager, each citing where it was read (`from`); until then their triggers and events come from the tagging plan.
Ask the owner for the tagging plan (solution design reference): each event, its payload and the interaction that pushes it. With it, add each push in the block that owns the interaction.

## Web SDK (aem-martech)

The source runs the Adobe Experience Platform Web SDK outside Launch. The `aem-martech` plugin can load it on the migrated site instead. It is off; the routes above stay the default.

- **orgId:** **not found — fill it in the contract** · **instance:** `alloy` · **edge domain:** **not found — fill it in the contract**
- **datastreamId:** **not found — fill it in the contract**
- **defaultConsent:** source unknown; the plugin defaults to `pending` and sends nothing until `updateUserConsent`. With `aemMartech.category` set, the scaffold starts the SDK `pending` whatever this value and grants `collect` once the CMP grants that group; without a category, this value applies as is. Launch rules that call `setConsent` on the source are not read — set the category to keep a consent gate.

To switch: (1) `git subtree add --squash --prefix plugins/martech https://github.com/adobe-rnd/aem-martech.git main`; (2) in Launch, set the Web SDK extension to the self-hosted build with the same instance name and publish — otherwise the SDK loads twice; (3) set `aemMartech.enabled` and leave the `adobe-launch` route disabled (the plugin loads `launchUrls`); (4) re-run the scaffold.
