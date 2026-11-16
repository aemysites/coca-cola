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
| google-tag-manager-2 | Google Tag Manager | `https://www.googletagmanager.com/gtm.js?id=GTM-NCZ3RJJ&gtm=4e6bb1` | — | false |

Also seen, not routed (loaded by the tag manager or inline on the source — confirm each still fires): analytics: Adobe Experience Platform Web SDK · analytics: Google Analytics / Ads · marketing: ad / retargeting pixel.

## Rewrite before go-live

These read the old URLs or DOM and will not match the migrated pages:
- Google Tag Manager rule __cvt_MRQN8 #3619 — selectors `div.header__top-sign-up-button button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[29] → resource.tags[24]
- Google Tag Manager rule __flc #3780 — selectors `div.header__login-section .header__log-in-button .cmp-button, div.header__login-section--mobile .header__log-in-button .cmp-button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[36] → resource.tags[33]
- Google Tag Manager rule __gaawe Click #4069 — selectors `div.header__login-section .header__log-in-button .cmp-button, div.header__login-section--mobile .header__log-in-button .cmp-button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[36] → resource.tags[52]
- Google Tag Manager rule __flc #3780 — selectors `div.header__login-section .header__sign-up-button .cmp-button, div.header__login-section--mobile .header__sign-up-button .cmp-button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[37] → resource.tags[33]
- Google Tag Manager rule __gaawe Click #4071 — selectors `div.header__login-section .header__sign-up-button .cmp-button, div.header__login-section--mobile .header__sign-up-button .cmp-button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[37] → resource.tags[53]
- Google Tag Manager rule __flc #4009 — selectors `div.header__login-section .header__log-in-button .cmp-button, div.header__login-section--mobile .header__log-in-button .cmp-button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[43] → resource.tags[43]
- Google Tag Manager rule __flc #4009 — selectors `div.header__login-section .header__sign-up-button .cmp-button, div.header__login-section--mobile .header__sign-up-button .cmp-button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[44] → resource.tags[43]
- Google Tag Manager rule __gaawe Click #4062 — selectors `div.swe_post_image.swe_post_image_cover` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[52] → resource.tags[51]
- Google Tag Manager rule __gaawe Click #4074 — selectors `div.button--secondary.button--icon a.cmp-button` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[53] → resource.tags[54]
- Google Tag Manager rule __gaawe #4500 — selectors `[class$="button--social-media"] *` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[65] → resource.tags[75]
- Google Tag Manager rule __gaawe #4500 — selectors `[class*="cmp-experiencefragment--social-share"] a` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[66] → resource.tags[75]
- Google Tag Manager rule __gaawe whatsapp_authentication #4692 — paths `_cn auth_source=whatsapp` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[68] → resource.tags[77]
- Google Tag Manager data element dom:script[src*=cookielaw][data-domain-script] — selectors `script[src*=cookielaw][data-domain-script]` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.macros[13]
- Google Tag Manager data element dom:meta[name="basicAuthProtected"] — selectors `meta[name="basicAuthProtected"]` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.macros[26]
- Google Tag Manager data element dom:body — selectors `body` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.macros[35]
- Google Tag Manager data element dom:head>title — selectors `head>title` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.macros[101]

## Data layer

The source pages expose `adobeDataLayer`, `dataLayer`; keep the same global names.
Google Tag Manager (read by the model, not parsed) rules fire on data-layer pushes; the migrated pages must push the same events: `gtm.click` (8) · `onexp_form_submit` (7) · `auth_complete` (6) · `komotion` (6) · `experience_event` (5) · `session_10s_elapsed|session_30s_elapsed` (5) · `onexp_form_start` (4) · `promo_result|promo_view_repushed` (3) · `gtm.linkClick` (3) · `play_spotify` (2) · `^promo_` (2) · `OneTrustLoaded` (2) · `target_conversion` (2) · `push_notifications_click_CTA` (2) · `push_notifications_subscribed` (2) · `joq_event` (2) · `^((?!^map_view$).)*map_.*` (2) · `quiz` (2) · `ttd_dom_ready` (2) · `onexp_user_onboarding` (2) · `OneTrustGroupsUpdated` (2) · `target_impression` (1) · `onexp_form_view` (1) · `user_referral` (1) · `data_collection_form_submit|data_collection_form_view` (1) · `cmp_show|cmp_hide` (1) · `get_user_profile` (1) · `authentication_context|OneTrustGroupsUpdated|promo_participation` (1) · `recaptcha_assessment_token_received` (1) · `user_signin|user_signup` (1).
Data elements read these data-layer paths: `dataLayer variable`, `DOM element (data-domain-script)`, `DOM element (content)`, `DOM element (ID)`, `DOM element (text)`.
Ask the owner for the tagging plan (solution design reference): each event, its payload and the interaction that pushes it. With it, add each push in the block that owns the interaction.

- Google Tag Manager rule __gaawe gam_authentication #3039 — listens for `auth_complete` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[2] → resource.tags[2]
- Google Tag Manager rule __gaawe #3282 — listens for `auth_complete` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[2] → resource.tags[7]
- Google Tag Manager rule __cvt_MRQN8 #3752 — listens for `auth_complete` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[2] → resource.tags[30]
- Google Tag Manager rule __cvt_5RM3Q custom #3755 — listens for `auth_complete` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[2] → resource.tags[31]
- Google Tag Manager rule __gaawe spotify_play #3206 — listens for `play_spotify` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[8] → resource.tags[6]
- Google Tag Manager rule __cvt_7164284_3243 #4027 — listens for `play_spotify` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[8] → resource.tags[47]
- Google Tag Manager rule __cvt_7164284_3243 #3369 — listens for `^promo_` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[10] → resource.tags[9]
- Google Tag Manager rule __gaawe #3701 — listens for `^promo_` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[10] → resource.tags[28]
- Google Tag Manager rule __cvt_7164284_3243 #3410 — listens for `experience_event` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[14] → resource.tags[14]
- Google Tag Manager rule __gaawe experience_event #3586 — listens for `experience_event` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[14] → resource.tags[20]
- Google Tag Manager rule __cvt_5RM3Q custom #3612 — listens for `experience_event` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[14] → resource.tags[23]
- Google Tag Manager rule __cvt_MRQN8 #3627 — listens for `experience_event` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[14] → resource.tags[25]
- Google Tag Manager rule __cvt_7164284_4220 #3819 — listens for `experience_event` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[14] → resource.tags[34]
- Google Tag Manager rule __gaawe gam_user_known #3427 — listens for `OneTrustLoaded` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[15] → resource.tags[15]
- Google Tag Manager rule __gaawe gam_user_known #3427 — listens for `OneTrustLoaded` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[16] → resource.tags[15]
- Google Tag Manager rule __cvt_7164284_3243 #3452 — listens for `target_conversion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[17] → resource.tags[16]
- Google Tag Manager rule __gaawe #3457 — listens for `target_conversion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[17] → resource.tags[17]
- Google Tag Manager rule __gaawe #3457 — listens for `target_impression` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[18] → resource.tags[17]
- Google Tag Manager rule __gaawe #3567 — listens for `push_notifications_click_CTA` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[20] → resource.tags[19]
- Google Tag Manager rule __cvt_7164284_3243 #4345 — listens for `push_notifications_click_CTA` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[20] → resource.tags[65]
- Google Tag Manager rule __gaawe #3567 — listens for `push_notifications_subscribed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[21] → resource.tags[19]
- Google Tag Manager rule __cvt_7164284_3243 #4345 — listens for `push_notifications_subscribed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[21] → resource.tags[65]
- Google Tag Manager rule __cvt_5RM3Q custom #3612 — listens for `joq_event` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[24] → resource.tags[23]
- Google Tag Manager rule __cvt_MRQN8 #3627 — listens for `joq_event` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[24] → resource.tags[25]
- Google Tag Manager rule __cvt_5RM3Q custom #3612 — listens for `onexp_form_submit` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[25] → resource.tags[23]
- Google Tag Manager rule __cvt_MRQN8 #3627 — listens for `onexp_form_submit` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[25] → resource.tags[25]
- Google Tag Manager rule __cvt_7164284_4220 #3819 — listens for `onexp_form_submit` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[25] → resource.tags[34]
- Google Tag Manager rule __cvt_5RM3Q custom #3612 — listens for `session_10s_elapsed|session_30s_elapsed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[26] → resource.tags[23]
- Google Tag Manager rule __cvt_MRQN8 #3627 — listens for `session_10s_elapsed|session_30s_elapsed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[26] → resource.tags[25]
- Google Tag Manager rule __cvt_7164284_4220 #3819 — listens for `session_10s_elapsed|session_30s_elapsed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[26] → resource.tags[34]
- Google Tag Manager rule __gaawe #4414 — listens for `session_10s_elapsed|session_30s_elapsed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[26] → resource.tags[71]
- Google Tag Manager rule __cvt_7164284_3243 #4438 — listens for `session_10s_elapsed|session_30s_elapsed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[26] → resource.tags[74]
- Google Tag Manager rule __cvt_5RM3Q custom #3612 — listens for `promo_result|promo_view_repushed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[27] → resource.tags[23]
- Google Tag Manager rule __cvt_MRQN8 #3627 — listens for `promo_result|promo_view_repushed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[27] → resource.tags[25]
- Google Tag Manager rule __cvt_7164284_4220 #3819 — listens for `promo_result|promo_view_repushed` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[27] → resource.tags[34]
- Google Tag Manager rule __cvt_5RM3Q custom #3612 — listens for `komotion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[28] → resource.tags[23]
- Google Tag Manager rule __cvt_MRQN8 #3627 — listens for `komotion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[28] → resource.tags[25]
- Google Tag Manager rule __cvt_7164284_4220 #3819 — listens for `komotion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[28] → resource.tags[34]
- Google Tag Manager rule __flc #3960 — listens for `komotion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[28] → resource.tags[39]
- Google Tag Manager rule __gaawe #4420 — listens for `komotion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[28] → resource.tags[72]
- Google Tag Manager rule __cvt_7164284_3243 #4424 — listens for `komotion` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[28] → resource.tags[73]
- Google Tag Manager rule __cvt_MRQN8 #3619 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[29] → resource.tags[24]
- Google Tag Manager rule __cvt_MRQN8 #3627 — listens for `onexp_form_view` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[30] → resource.tags[25]
- Google Tag Manager rule __gaawe #3673 — listens for `user_referral` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[31] → resource.tags[26]
- Google Tag Manager rule __gaawe #3700 — listens for `^((?!^map_view$).)*map_.*` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[32] → resource.tags[27]
- Google Tag Manager rule __cvt_7164284_3243 #4005 — listens for `^((?!^map_view$).)*map_.*` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[32] → resource.tags[41]
- Google Tag Manager rule __gaawe #3777 — listens for `data_collection_form_submit|data_collection_form_view` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[34] → resource.tags[32]
- Google Tag Manager rule __flc #3780 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[36] → resource.tags[33]
- Google Tag Manager rule __gaawe Click #4069 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[36] → resource.tags[52]
- Google Tag Manager rule __flc #3780 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[37] → resource.tags[33]
- Google Tag Manager rule __gaawe Click #4071 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[37] → resource.tags[53]
- Google Tag Manager rule __gaawe quiz #3969 — listens for `quiz` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[41] → resource.tags[40]
- Google Tag Manager rule __cvt_7164284_3243 #4021 — listens for `quiz` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[41] → resource.tags[46]
- Google Tag Manager rule __flc #4009 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[43] → resource.tags[43]
- Google Tag Manager rule __flc #4009 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[44] → resource.tags[43]
- Google Tag Manager rule __cvt_7164284_3243 #4016 — listens for `onexp_form_start` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[46] → resource.tags[45]
- Google Tag Manager rule __gaawe #4285 — listens for `onexp_form_start` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[46] → resource.tags[61]
- Google Tag Manager rule __gaawe #4286 — listens for `onexp_form_start` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[46] → resource.tags[62]
- Google Tag Manager rule __gaawe #4287 — listens for `onexp_form_start` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[46] → resource.tags[63]
- Google Tag Manager rule __cvt_7164284_3243 #4016 — listens for `onexp_form_submit` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[47] → resource.tags[45]
- Google Tag Manager rule __gaawe #4285 — listens for `onexp_form_submit` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[47] → resource.tags[61]
- Google Tag Manager rule __gaawe #4286 — listens for `onexp_form_submit` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[47] → resource.tags[62]
- Google Tag Manager rule __gaawe #4287 — listens for `onexp_form_submit` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[47] → resource.tags[63]
- Google Tag Manager rule __gaawe Click #4052 — listens for `cmp_show|cmp_hide` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[51] → resource.tags[50]
- Google Tag Manager rule __gaawe Click #4062 — listens for `gtm.click` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[52] → resource.tags[51]
- Google Tag Manager rule __gaawe Click #4074 — listens for `gtm.linkClick` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[53] → resource.tags[54]
- Google Tag Manager rule __gaawe get_user_profile #4121 — listens for `get_user_profile` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[54] → resource.tags[55]
- Google Tag Manager rule __cvt_7164284_4134 #4140 — listens for `authentication_context|OneTrustGroupsUpdated|promo_participation` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[56] → resource.tags[57]
- Google Tag Manager rule __gaawe recaptcha #4144 — listens for `recaptcha_assessment_token_received` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[57] → resource.tags[58]
- Google Tag Manager rule __cvt_7164284_4220 #4221 — listens for `ttd_dom_ready` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[58] → resource.tags[59]
- Google Tag Manager rule __cvt_7164284_4220 #4224 — listens for `ttd_dom_ready` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[58] → resource.tags[60]
- Google Tag Manager rule __gaawe #4354 — listens for `onexp_user_onboarding` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[63] → resource.tags[66]
- Google Tag Manager rule __cvt_7164284_3243 #4356 — listens for `onexp_user_onboarding` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[63] → resource.tags[67]
- Google Tag Manager rule __gaawe #4500 — listens for `gtm.linkClick` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[65] → resource.tags[75]
- Google Tag Manager rule __gaawe #4500 — listens for `gtm.linkClick` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[66] → resource.tags[75]
- Google Tag Manager rule __gaawe whatsapp_authentication #4692 — listens for `auth_complete` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[68] → resource.tags[77]
- Google Tag Manager rule __html #4649 — listens for `OneTrustGroupsUpdated` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[75] → resource.tags[246]
- Google Tag Manager rule __html #4673 — listens for `OneTrustGroupsUpdated` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[75] → resource.tags[247]
- Google Tag Manager rule __html #3682 — listens for `user_signin|user_signup` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[82] → resource.tags[237]
- Google Tag Manager rule __html #3863 — listens for `auth_complete` — read by the model at stardust/martech/tags/www.googletagmanager.com-gtm-GTM-NBWPCZW.js resource.rules[84] → resource.tags[241]

## Tag-manager notes (read by the model, not parsed)

**Google Tag Manager:**
- [object Object]
- [object Object]

Confirm everything read by the model against the owner's tagging plan.

## Web SDK (aem-martech)

The source runs the Adobe Experience Platform Web SDK outside Launch. The `aem-martech` plugin can load it on the migrated site instead. It is off; the routes above stay the default.

- **orgId:** **not found — fill it in the contract** · **instance:** `alloy` · **edge domain:** **not found — fill it in the contract**
- **datastreamId:** **not found — fill it in the contract**
- **defaultConsent:** source unknown; the plugin defaults to `pending` and sends nothing until `updateUserConsent`. With `aemMartech.category` set, the scaffold starts the SDK `pending` whatever this value and grants `collect` once the CMP grants that group; without a category, this value applies as is. Launch rules that call `setConsent` on the source are not read — set the category to keep a consent gate.

To switch: (1) `git subtree add --squash --prefix plugins/martech https://github.com/adobe-rnd/aem-martech.git main`; (2) in Launch, set the Web SDK extension to the self-hosted build with the same instance name and publish — otherwise the SDK loads twice; (3) set `aemMartech.enabled` and leave the `adobe-launch` route disabled (the plugin loads `launchUrls`); (4) re-run the scaffold.
