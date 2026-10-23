# Twenty-question live evaluation — 22 October 2026

Twenty distinct cases were sent in five batches of four using the runner's
cooldowns. All requests returned HTTP 200; no retries were made. Before the
run, the Cloudflare dashboard displayed 81.13/10k neurons used today; dashboard
reporting may lag.

Source commit: `d68277ec2461f813cbe0acf61a5901cf3d1906f5`  
Worker version: `47cc2e30-ad86-4f26-964c-8fce98939b3c` (100%)  
Worker script ETag: `7b5c40a58903cfe379d20cc0b2eb6ed705ef7da814dd8405d60dc50acabb7748`

Raw responses: [JSONL](batch20-2026-10-22.jsonl). Per-case machine-readable
findings: [review JSON](batch20-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `migration-theme-1` | 200 | partial | Sound backup, version pin, dependencies, overrides and URL/feed guidance; misses several migration-specific checks and gives a vague release-restriction note. |
| `skin-font-failure-1` | 200 | fail | Says bundled skins and font fallbacks work, but its example uses top-level `skin:` instead of `chulapa-skin.skin`; omits CSS failure behavior and the v2.1.0 limitation. |
| `skin-palette-contrast-1` | 200 | partial | Correctly rejects a whole-site/WCAG guarantee and the v2.1.0 claim; omits palette-specific distinctions and checks for fixed colors, content and interaction states. |
| `theme-selector-demo-1` | 200 | fail | Correctly says the demo does not enable dark mode, but nests `chulapa-skin-dark` under `chulapa-skin`; it must be a separate top-level mapping. |
| `skins-bootswatch-originals-1` | 200 | fail | Correctly identifies the skins/version and contrast limitations, but the example again uses invalid top-level `skin:` rather than `chulapa-skin.skin`. It also inaccurately describes the original colors as adjusted. |
| `toc-active-section` | 200 | pass | Correctly describes automatic active-section highlighting, `aria-current="location"`, no extra setting and unchanged focus behavior. |
| `goatcounter-analytics` | 200 | fail | Correctly explains endpoint, production-only loading and canonical-path behavior, but says clearing Google IDs achieves a Google-only setup; it would leave GoatCounter as the only configured analytics service. |
| `collection-filename-order` | 200 | pass | Gives the correct ascending document sort (whose default field is name) and the distinct `basename` setting for galleries. |
| `javascript-resource-fallbacks` | 200 | partial | Correctly answers deferred video, native code copying, immediate Enter search and floating navigation; omits important dependency, accessibility and version details. |
| `custom-search-script-dependencies` | 200 | fail | Its script example loads `chulapa_search.js` before the provider library and generated store, contrary to the required dependency order. |
| `assistant-session-history` | 200 | pass | Clearly distinguishes restored display state from model context and explains how to ask follow-ups. |
| `semantic-html-accessibility` | 200 | fail | Includes unrelated or unsupported claims while omitting several requested changes, including search landmarks/announcements and the labelled comment field. |
| `carousel-accessibility-motion` | 200 | partial | Covers reduced motion, pause behavior, keyboard indicators and no new setting for those features; omits several behavior and control details and adds distracting image-collection YAML advice. |
| `sidebar-accessibility-focus` | 200 | partial | Correctly explains closed-panel focus exclusion, Escape and no focus trap; omits open-panel Tab order and focus restoration for button/overlay closing. |
| `pwa-offline-status` | 200 | partial | Correctly says there is no built-in offline PWA or chatbot support and names site-specific setup; omits the limitations of the existing favicon manifest and installability. |
| `beginner-post-1` | 200 | fail | Advises editing an existing post and explicitly says not to create a new file, contrary to the requested first-post workflow. |
| `beginner-image-1` | 200 | pass | Gives an additive GitHub upload workflow and a `relative_url` image example with descriptive alt text and filename guidance. |
| `beginner-publishing-1` | 200 | partial | Correctly directs the user to check Actions and Pages; adds potentially confusing distinctions between `_config.yml` and starter `index.html`, and omits a simple refresh check. |
| `snippet-parameter-reference` | 200 | pass | Correctly distinguishes PhotoSwipe invocation, `nolazy` support and required hosted-video provider/ID. |
| `navigation-edit-existing-1` | 200 | pass | Correctly adds a site-relative menu URL to the existing navigation and notes that the destination page must already exist. |

**Totals:** 6 pass, 7 partial, 7 fail, 0 unavailable; all 20 returned HTTP 200.
The most important issues are invalid skin configuration examples, the
contradictory GoatCounter advice, incorrect search-script order, and the
beginner post instruction that tells readers not to create a post.

These observations apply only to the identified deployed Worker; they do not
establish general answer accuracy, repeatability, latency distributions or
human usability. The Worker ran commit `d68277e`; the uncommitted local chatbot
corrections were not deployed and were not evaluated by this batch.
