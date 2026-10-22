# Final layout-focused post-deployment pass — 22 October 2026

One final pass covered the six selected layout/cloud cases that were still
non-pass. All six requests returned HTTP 200 and were reviewed against their
catalog criteria and current documentation.

Worker version: `5266df62-1349-482e-a687-101e675c7721` (100% traffic)  
Deployment time: `2026-10-22T12:57:35.400125Z`  
Response window: `2026-10-22T12:59:41.044Z` to `2026-10-22T13:00:52.141Z`

Raw responses: [JSONL](layouts-final-2026-10-22.jsonl). Machine-readable
findings: [review JSON](layouts-final-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `layouts-include-cache-1` | 200 | pass | Rejects blanket replacement, distinguishes ordinary includes from cached includes, preserves page-specific comment inputs, explains hierarchy and development-only component refactoring. |
| `layouts-microformats-feed-1` | 200 | partial | Correctly lists the four layouts, aliases, custom wrapper requirement and no new YAML; omits `simplelist`, the v2.1.0 limitation, pagination and repeated cloud entries. |
| `layouts-label-headings-1` | 200 | partial | Gives correct heading hierarchy and `h5` visual-class guidance, but omits that `related_label` and `random_label` render supplied HTML unchanged. |
| `layouts-microformats-1` | 200 | partial | Correctly explains `minimal`, updated dates and guest-author URL inheritance; omits `default`/`landingpage` behavior and relative URL resolution through `url`/`baseurl`. |
| `cloud-task-1` | 200 | partial | Gives the basic cloud layouts, post defaults, `include_collection` and baseurl guidance; omits preserving existing defaults, collection output, link verification and the v2.1.0/date-separator caveats. |
| `cloud-demo-fragments` | 200 | partial | Correctly explains the asymmetric `#demo`/`#dmo` issue and manual link update without suggesting a YAML change; omits the upgraded `#demo-topic` fragment. |

**Totals:** 1 pass, 5 partial, 0 fail, 0 unavailable. The cloud-fragment
answer no longer contains the previous material error, but still does not
answer the full demo-topic question. All findings apply only to this Worker
version; HTTP 200 confirms transport, not answer quality.
