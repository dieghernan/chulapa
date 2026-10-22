# Twenty previously untested cases — 22 October 2026

Twenty IDs with no earlier raw JSONL record were selected from the 52
catalog cases previously never tested. The run used five batches of four with
the evaluator cooldown. All 20 requests returned HTTP 200; no retries were
made. Before the run, the Cloudflare dashboard displayed 81.13/10k neurons used
today; dashboard reporting may lag.

Source commit: `d68277ec2461f813cbe0acf61a5901cf3d1906f5`  
Worker version: `47cc2e30-ad86-4f26-964c-8fce98939b3c` (100%)  
Worker script ETag: `7b5c40a58903cfe379d20cc0b2eb6ed705ef7da814dd8405d60dc50acabb7748`

Raw responses: [JSONL](untested20-2026-10-22.jsonl). Per-case machine-readable
findings: [review JSON](untested20-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `content-post-1` | 200 | partial | Gives the right GitHub workflow, dated `_posts/` filename, front matter and publishing check; omits that the public URL follows the permalink rather than the source filename. |
| `content-page-1` | 200 | pass | Gives valid page front matter, an additive `/contact/` menu item without `baseurl`, and explains that the file and menu entry are separate. |
| `content-image-1` | 200 | partial | Correct upload location, descriptive alt text, `relative_url` and filename check; omits commit/publishing-branch and Actions steps. |
| `analytics-goat-setup-1` | 200 | pass | Correctly requires v2.2.0, a full public HTTPS endpoint, cleared Google IDs for GoatCounter-only use, and production publishing; no `baseurl` is added to the endpoint. |
| `analytics-ga4-setup-1` | 200 | pass | Correctly configures the GA4 `gtag_id`, clears legacy `analytics_id`, avoids duplicate custom snippets, explains local preview behavior and recommends Realtime verification. |
| `appearance-font-task-1` | 200 | pass | Correctly distinguishes loading a font stylesheet from applying body/heading families through `chulapa-skin.vars`, with fallbacks and relevant sources. |
| `appearance-auto-task-1` | 200 | partial | Correctly says Autothemer fills undefined colors and that `skin: auto` is independent; omits the `none`/`autothemer: true` behavior and that assigned colors remain unchanged. |
| `appearance-sass-task-1` | 200 | partial | Gives valid custom-skin and `vars` approaches, `!default`, Codeply and import cautions; omits some preview-to-Sass and post-change contrast/mobile verification details. |
| `comments-disqus-task-1` | 200 | pass | Correct provider and shortname, page-level `show_comments`, preservation of unrelated configuration and relevant published verification. |
| `comments-cactus-task-1` | 200 | partial | Correctly rejects arbitrary Matrix homeservers and gives the Cactus provider setup; omits the v2.1.0 identifier correction, thread-matching risk and v2.2.0 resource-loading distinction. |
| `comments-welcomments-task-1` | 200 | fail | Tells the user to keep provider templates and says only the data files need delivering, contradicting the guide to review the generated PR, retain Chulapa-customized templates and verify the service-side repository integration. |
| `comments-cusdis-task-1` | 200 | pass | Does not invent a new hosted account; accurately distinguishes the unavailable original hosted service from an existing self-hosted setup and gives its required fields and page flag. |
| `custom-head-task-1` | 200 | partial | Uses a supported head hook and a valid meta element, but chooses the before-CSS hook instead of the documented `custom_head.html` destination and omits the explicit published-source check. |
| `accessibility-task-reference-1` | 200 | partial | Correctly rejects accessibility/PWA guarantees and built-in offline support; omits practical checks for actual content, color, keyboard/mobile behavior, assistive technology and network-dependent features. |
| `bundled-font-task-1` | 200 | partial | Gives the correct bundled-font setting and a usable ligature example; omits local-preview/rebuild guidance and the v2.1.0 versus v2.2.0 asset-loading limitation. |
| `canonical-article-task-1` | 200 | partial | Correctly distinguishes canonical metadata from redirects and includes `sitemap: false`; allows a site-relative canonical where the criterion calls for the original absolute URL and does not qualify sitemap exclusion by plugin. |
| `cloud-task-1` | 200 | fail | The example is not a working page/defaults recipe: it omits the matching index page layout/permalink and the post defaults that connect badges to those pages. It does not explain `output: true` for another collection. |
| `cloud-demo-fragments` | 200 | fail | Misstates the cause as a collection rename and invents an `include_cached components/indexcards.html` recipe; the documented v2.2.0 fix makes both fragments use `#demo` and topic spaces use hyphens. |
| `documentation-appearance-topics` | 200 | partial | Correctly links the topic index and says related/random cards are optional; omits the limited topic coverage, the complete `/docs` destination and distinction from blog tags. |
| `community-165` | 200 | fail | The YAML example replaces `chulapa-skin` with a scalar and therefore does not preserve the existing skin mapping; the dark mapping should remain a separate top-level setting. |

**Totals:** 6 pass, 10 partial, 4 fail, 0 unavailable; all 20 returned HTTP 200.
The material failures are the Welcomments template advice, the nonfunctional
cloud-index recipe, the invented cloud-fragment solution and the invalid
light/dark skin configuration.

These observations apply only to the identified Worker and these phrasings.
They do not establish general accuracy, repeatability, latency distributions
or human usability. The Worker ran commit `d68277e`; local chatbot corrections
not deployed in that version were not tested here.
