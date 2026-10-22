# Post-deployment regression retest — 22 October 2026

Ten previously non-pass cases were sent to the newly deployed Worker. All ten
returned HTTP 200 and were reviewed against the catalog criteria and current
documentation. The dashboard showed 81.13/10k Workers AI neurons used today
before this run; dashboard reporting may lag.

Worker version: `15036755-2e9b-4112-8c0a-01b9348d7c62` (100% traffic)  
Deployment time: `2026-10-22T11:56:23Z`  
Response window: `2026-10-22T12:04:04Z` to `2026-10-22T12:06:37Z`

Raw responses: [JSONL](retest10-postdeploy-2026-10-22.jsonl). Machine-readable
findings: [review JSON](retest10-postdeploy-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `configuration-4` | 200 | pass | Correctly identifies `gtag_id`, explains that `analytics_id` is the independent retired Universal Analytics setting and both configured IDs load their own snippets without conflict. Includes a valid GA4-only example, Realtime verification and relevant sources. |
| `theming-2` | 200 | partial | Gives a usable `skin: auto` approach and correctly locates the optional `autothemer` setting as a sibling of `vars`, but omits `autothemer: true` from the requested YAML and adds unrelated include-cache advice. |
| `skin-font-failure-1` | 200 | fail | The skin-switch example uses unsupported top-level `skin: journal` rather than `chulapa-skin.skin`. It does not explain the documented behavior when essential generated CSS is incomplete or distinguish v2.2.0 from v2.1.0. |
| `theme-selector-demo-1` | 200 | fail | Correctly says the demo alone does not enable switching, but gives `chulapa-skin: Light` as a scalar instead of preserving the existing mapping. The example is not valid for the documented configuration. |
| `custom-search-script-dependencies` | 200 | fail | Does not give the required dependency order (provider library and generated store before `chulapa_search.js`). Its prose lists the adapter first and therefore fails the requested search fix. |
| `comments-welcomments-task-1` | 200 | partial | Correctly says to keep the theme templates, use `provider: welcomments`, enable comments on the page and deliver `_data/welcomments/`. It omits reviewing the generated PR, checking local template overrides and verifying a rebuild displays the delivered data. |
| `person-publisher-task-1` | 200 | partial | Correctly sets `type: Person`, says guest authors remain independent, and explains that Person uses `image` rather than `logo`. The replacement-shaped mapping does not tell the reader to preserve other existing publisher fields. |
| `cloud-task-1` | 200 | fail | Still omits the matching cloud index pages/permalinks and post defaults linking badges to those pages. It misuses `include_collection` as a way to scope posts and provides no complete working setup. |
| `cloud-demo-fragments` | 200 | fail | Incorrectly claims the demo collection was renamed to `dmo`; the documented fix keeps `#demo` consistent and hyphenates topic fragments. It cites an unrelated archive anchor. |
| `community-165` | 200 | fail | The YAML uses a scalar for `chulapa-skin` and nests `chulapa-skin-dark` inside it. The dark mapping must be a separate top-level section while preserving the existing skin mapping. |

**Totals:** 1 pass, 3 partial, 6 fail, 0 unavailable. These ten observations
apply only to this Worker version and do not establish general answer accuracy.
The responses were judged on content; HTTP 200 alone is not a pass.
