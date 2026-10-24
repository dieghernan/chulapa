# Reconciled response status by section — 24 October 2026

Offline reconciliation of 167 catalog IDs against timestamped Worker evidence
and its recorded reviews. No new requests, deployment or factual regrading.
AI Search is excluded. This supersedes the older 160-case section summary for
backlog selection; historical reviews and rubric audits remain intact.

Last assessed answers: **95 pass, 64 partial, 5 fail, 3 with no assessed answer**.
Latest attempts include **9 unavailable responses**, overlapping these groups.
These mixed-version counts are an evidence inventory, not overall accuracy or
a claim about current production. Unknown versions remain unknown.

[Consolidated case table](log.md#latest-status-per-tested-catalog-case),
[per-case provenance](status-reconciliation-20261024.json) and
[change notes](status-reconciliation-20261024.md).

| Section | Cases | Pass | Partial | Fail | No assessed answer | Latest request unavailable |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `accessibility` | 5 | 1 | 3 | 1 | 0 | 0 |
| `analytics` | 4 | 4 | 0 | 0 | 0 | 0 |
| `autothemer` | 3 | 1 | 2 | 0 | 0 | 0 |
| `chatbot` | 2 | 2 | 0 | 0 | 0 | 0 |
| `collections` | 7 | 5 | 2 | 0 | 0 | 2 |
| `comments` | 7 | 6 | 1 | 0 | 0 | 0 |
| `configuration` | 3 | 2 | 1 | 0 | 0 | 0 |
| `content` | 5 | 3 | 2 | 0 | 0 | 0 |
| `custom-hooks` | 2 | 1 | 1 | 0 | 0 | 0 |
| `documentation` | 5 | 0 | 4 | 0 | 1 | 1 |
| `favicons` | 2 | 0 | 2 | 0 | 0 | 0 |
| `feeds` | 7 | 2 | 3 | 0 | 2 | 2 |
| `fonts` | 4 | 3 | 1 | 0 | 0 | 0 |
| `footer` | 2 | 1 | 1 | 0 | 0 | 0 |
| `formatting` | 7 | 4 | 2 | 1 | 0 | 1 |
| `galleries` | 7 | 3 | 4 | 0 | 0 | 0 |
| `highlighting` | 1 | 0 | 0 | 1 | 0 | 1 |
| `html-output` | 1 | 1 | 0 | 0 | 0 | 0 |
| `icons` | 2 | 1 | 1 | 0 | 0 | 0 |
| `include-cache` | 1 | 1 | 0 | 0 | 0 | 0 |
| `installation` | 11 | 4 | 7 | 0 | 0 | 0 |
| `layouts` | 4 | 3 | 1 | 0 | 0 | 0 |
| `localization` | 2 | 1 | 1 | 0 | 0 | 0 |
| `math` | 1 | 1 | 0 | 0 | 0 | 0 |
| `mermaid` | 2 | 1 | 1 | 0 | 0 | 0 |
| `microformats` | 3 | 1 | 2 | 0 | 0 | 0 |
| `migration` | 4 | 2 | 2 | 0 | 0 | 0 |
| `navbar` | 2 | 2 | 0 | 0 | 0 | 0 |
| `navigation` | 4 | 3 | 1 | 0 | 0 | 0 |
| `publishing` | 2 | 0 | 2 | 0 | 0 | 0 |
| `pwa` | 1 | 0 | 1 | 0 | 0 | 0 |
| `recommendations` | 3 | 3 | 0 | 0 | 0 | 0 |
| `resources` | 2 | 0 | 2 | 0 | 0 | 0 |
| `search` | 11 | 8 | 2 | 1 | 0 | 0 |
| `seo` | 11 | 8 | 2 | 1 | 0 | 0 |
| `skins` | 9 | 4 | 5 | 0 | 0 | 1 |
| `snippets` | 1 | 1 | 0 | 0 | 0 | 0 |
| `toc` | 4 | 2 | 2 | 0 | 0 | 1 |
| `variables` | 5 | 5 | 0 | 0 | 0 | 0 |
| `version` | 3 | 2 | 1 | 0 | 0 | 0 |
| `video` | 4 | 3 | 1 | 0 | 0 | 0 |
| `yaml` | 1 | 0 | 1 | 0 | 0 | 0 |

## Last assessed failures

| Case | Section | Review | Latest request HTTP |
| --- | --- | --- | --- |
| `reference-edge-cases-5` | highlighting | [historical-pass8-2026-10-22-review.json](historical-pass8-2026-10-22-review.json) | 503 |
| `mixed-person-ga4-1` | seo | [mixed-topics-batch10-review-20261024.md](mixed-topics-batch10-review-20261024.md) | 200 |
| `semantic-html-accessibility` | accessibility | [log.md#retest-of-ten-previous-chatbot-failures--22-october-2026](log.md#retest-of-ten-previous-chatbot-failures--22-october-2026) | 200 |
| `provider-algolia-task-1` | search | [mixed-topics-batch10-review-20261024.md](mixed-topics-batch10-review-20261024.md) | 200 |
| `format-footnote-task-1` | formatting | [untested32-2026-10-22-review.json](untested32-2026-10-22-review.json) | 503 |

Highlighting and footnotes have subsequent 503 attempts; their older failed
answers remain available for diagnosis. GA4 and Algolia failures belong to
1686b41b. The semantic-accessibility retest did not record a Worker version.
Task-scope audit qualifications remain separate: optional omissions and
presentation-only issues are not new live failures or reasons to force retries.
