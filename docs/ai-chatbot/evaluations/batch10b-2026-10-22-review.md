# Second ten-question live evaluation — 22 October 2026

Ten questions distinct from the earlier batch were sent in three batches of
4 + 4 + 2, using the runner's cooldowns. Before the run, the Cloudflare
dashboard displayed 81.13/10k neurons used today; its figure may lag.

Source commit: `d68277ec2461f813cbe0acf61a5901cf3d1906f5`  
Worker version: `47cc2e30-ad86-4f26-964c-8fce98939b3c` (100%)  
Worker script ETag: `7b5c40a58903cfe379d20cc0b2eb6ed705ef7da814dd8405d60dc50acabb7748`

Raw responses: [JSONL](batch10b-2026-10-22.jsonl). Per-case machine-readable
findings: [review JSON](batch10b-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `layouts-include-cache-1` | 200 | partial | Core cache warning and component names are right; misses hierarchy/cache details and uses LaTeX arrows. |
| `configuration-1` | 200 | pass | Correct Spanish `url` origin and `/blog` baseurl. |
| `configuration-4` | 200 | fail | Says a configured legacy `analytics_id` may cause issues; both analytics IDs independently load their snippets. |
| `search-comments-3` | 200 | partial | Secret-handling advice is right, and code puts the public key under `algolia`; contradictory prose gives the wrong nesting. |
| `theming-2` | 200 | fail | Places `autothemer` under `vars`, so the shown configuration does not enable it. |
| `theming-4` | 200 | pass | Correctly separates loading a font stylesheet from applying the font-family variables. |
| `snippets-2` | 200 | pass | Correct `video_res` and `nolazy` behavior and distinction from metadata thumbnail. |
| `faq-3` | 200 | partial | Correct custom-head/baseurl direction, but imprecise “in configuration” wording and no copyable link example. |
| `provider-lunr-task-1` | 200 | partial | Correct provider switch, but omits the search-page/permalink setup and other migration checks. |
| `person-publisher-task-1` | 200 | fail | Incorrectly says `Person` is the default/fallback type; the documented default/fallback is `Organization`. |

**Totals:** 3 pass, 4 partial, 3 fail, 0 unavailable; all ten returned HTTP 200.
The wrong Autothemer nesting, analytics behavior and publisher default are
material factual errors despite successful HTTP responses.

These are ten observations of the identified Worker, not a general accuracy,
repeatability, latency or human-usability result. No retries were made.
