# Ten-question live evaluation — 22 October 2026

Ten independent requests were sent in three batches (4 + 4 + 2) after the
deployed Worker and free daily allowance were checked. No retries were made.
Cloudflare showed 81.13/10k neurons used before the run and the same figure
afterward; dashboard reporting may lag.

Source commit: `1c939433130ef8bb9ffc4f45320ca333ccf06208`  
Worker version: `d0e281c2-1481-4e8f-b134-76019808b140` (100%)  
Worker script ETag: `7b5c40a58903cfe379d20cc0b2eb6ed705ef7da814dd8405d60dc50acabb7748`

Raw responses: [batch 1](batch10-01-2026-10-22.jsonl),
[batch 2](batch10-02-2026-10-22.jsonl) and
[batch 3](batch10-03-2026-10-22.jsonl). All ten cases are also summarized in
[the machine-readable review](batch10-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `installation-1` | 200 | pass | Correct Chulapa 101, GitHub Actions, identity, home/sample-post edits, baseurl and first-site source. |
| `snippets-1` | 200 | pass | Correct complete local-video include, baseurl behavior and playback check. |
| `photoswipe-gallery` | 200 | partial | Correct v2.2.0 and `photoswipe=true`; adds new gallery configuration unnecessarily for an existing gallery and omits default-off/loading/fallback details. |
| `second-photo-tutorial-1` | 200 | partial | Correct page, image and additive menu entry; omits the published-starter prerequisite and image `relative_url` detail. Its Settings > Pages navigation suggestion is imprecise. |
| `snippets-4` | 200 | pass | Correct image-group defaults, filename sorting, ascending order, no shuffle and version caveat. |
| `faq-4` | 200 | pass | Usable examples for alerts, image captions and footnotes with relevant source links. |
| `content-toc-task-1` | 200 | partial | Core syntax is present, but it omits that headings before the marker are included and does not tell readers to merge an existing `kramdown` mapping. |
| `documentation-search-topics` | 503 | unavailable | Bounded answer validation returned the fixed search fallback. The rejected model answer is unavailable; this is not an accuracy pass. |
| `installation-2` | 200 | pass | Correctly explains the v2.2.0 remote theme, plugin setup, preservation of migration settings and override review. |
| `faq-1` | 200 | pass | Correct version checks and clear limitation of the HTML marker for local overrides. |

**Totals:** 6 pass, 3 partial, 0 fail, 1 unavailable; 9 HTTP 200 and 1 HTTP 503.
The 503 confirms the guarded fallback path, not that the guide-discovery task was
completed. No retry was sent.

These ten observations apply only to the identified deployed source. They do not
establish general answer accuracy, repeated-run consistency, latency
distributions or human usability. No chatbot context or runtime changes were
made; the existing content-TOC and guide-discovery limitations remain follow-up
work.
