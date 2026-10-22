# Layout-focused post-deployment regression — 22 October 2026

Seven selected cases were sent after deploying the updated chatbot context.
All requests returned HTTP 200 and were reviewed against their catalog
criteria and current documentation.

Worker version: `738414cb-3f77-4c67-a61f-25ca00f5c018` (100% traffic)  
Deployment time: `2026-10-22T12:45:19Z`  
Response window: `2026-10-22T12:46:08Z` to `2026-10-22T12:47:29Z`

Raw responses: [JSONL](layouts-postdeploy-2026-10-22.jsonl). Machine-readable
findings: [review JSON](layouts-postdeploy-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `layouts-include-cache-1` | 200 | partial | Correctly rejects blanket caching and explains caller-dependent includes, hierarchy and shared components. Omits comments' page-specific inputs and needs a clearer development-version caveat. |
| `layouts-microformats-feed-1` | 200 | partial | Correct layouts/aliases, custom wrapper requirement and no new YAML; omits `simplelist`, v2.1.0 caveat, pagination example and repeated cloud entries. |
| `layouts-label-headings-1` | 200 | partial | Correct heading hierarchy and visual `h5` class, but fails to explain the `related_label` HTML setting and cites an unrelated localization anchor. |
| `layouts-microformats-1` | 200 | partial | Correct `h-entry` behavior, dates and guest-author distinction; omits relative URL resolution through `url`/`baseurl`. |
| `beginner-post-1` | 200 | pass | Provides the GitHub new-file workflow, dated `_posts/` path, complete example, publish steps and live verification. |
| `cloud-task-1` | 200 | partial | Core page/defaults recipe is now present, including `include_collection` and collection output. Omits baseurl guidance, preserving existing defaults, verification steps and the v2.2.0 undated-entry caveat. |
| `cloud-demo-fragments` | 200 | fail | Still describes the old asymmetry incorrectly and suggests unrelated defaults YAML as remediation. Correct fragments appear, but the explanation and proposed change are materially misleading. |

**Totals:** 1 pass, 5 partial, 1 fail, 0 unavailable. The beginner-post
workflow is corrected; cloud setup improved substantially. The remaining
fragment error and layout omissions are observations on this Worker only.
HTTP 200 confirms transport, not answer quality.
