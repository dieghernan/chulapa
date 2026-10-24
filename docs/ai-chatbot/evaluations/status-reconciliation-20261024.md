# Historical status reconciliation — 24 October 2026

Reconciled all 167 catalog cases against the timestamped Worker JSONL files,
structured batch reviews and later prose assessments. AI Search, deployment-only
records and planned queries are excluded. Identical timestamped copies are one
response, not additional requests. No new inference or factual regrading occurred.

The [snapshot](status-reconciliation-20261024.json) records every case's previous
row, last assessed response with answer hash and review, latest request and
recorded Worker version. Unknown versions are explicit. The
[case table](log.md#latest-status-per-tested-catalog-case) and
[section summary](section-status-reconciled-20261024.md) now use this inventory.

## Nine corrected status rows

These apply already recorded reviews to the appropriate newer saved answer;
they are not improvements produced by this reconciliation.

| Case | Previously consolidated | Reconciled last assessment | Evidence |
| --- | --- | --- | --- |
| `provider-lunr-task-1` | partial | pass | [24 October review](search-comments-batch10-review-20261024.md) |
| `provider-simplesearch-task-1` | partial | pass | [24 October review](search-comments-batch10-review-20261024.md) |
| `provider-google-task-1` | fail | pass | [24 October review](search-comments-batch10-review-20261024.md) |
| `comments-cactus-task-1` | partial | pass | [24 October review](search-comments-batch10-review-20261024.md) |
| `comments-welcomments-task-1` | partial | pass | [24 October review](search-comments-batch10-review-20261024.md) |
| `goatcounter-analytics` | fail | pass | [22 October Worker retest](log.md#retest-of-ten-previous-chatbot-failures--22-october-2026) |
| `skins-bootswatch-originals-1` | unavailable | pass | [22 October Worker retest](log.md#retest-of-ten-previous-chatbot-failures--22-october-2026) |
| `starter-1` | fail | partial | [22 October Worker retest](log.md#retest-of-ten-previous-chatbot-failures--22-october-2026) |
| `troubleshoot-yaml-task-1` | fail | partial | [22 October Worker retest](log.md#retest-of-ten-previous-chatbot-failures--22-october-2026) |

The first five responses belong to Worker 09e75972. The older paired endpoint
retest did not record its Worker version; it must not inherit versions from the
superseded failed responses. Dates and unknown-version attribution are also
corrected for `theming-2`, `skin-font-failure-1`, `theme-selector-demo-1` and
`semantic-html-accessibility`, without assigning them new pass labels.

## Quality and availability are separate

Latest requests contain nine unavailable responses. Six have an earlier assessed
answer: `layouts-3` (pass), `reference-edge-cases-5` (fail),
`format-footnote-task-1` (fail), `cloud-task-1` (partial), `cloud-demo-fragments`
(partial) and `community-165` (partial). Their answer dates/versions describe the
earlier answer; the latest request/date is shown independently. The newer
untagged 503s do not inherit an older version.

`documentation-search-topics` and both public-feed subscription cases have no
assessed answer. A saved unreviewed response, if present, is not a factual pass
or fail. The subscription 503s belong to 1686b41b; the older unavailable batch
did not record its Worker version.

The [task-scope audit](task-scope-audit-20261024.md) still qualifies feed
coexistence, collection output, publisher and sharing omissions as optional and
migration lookup as presentation-only. The Autothemer correction still rejects
requiring `skin: auto` merely to enable autothemer. These rubric qualifications
are preserved as notes, not silently converted into fresh live passes. The
latest selector-demo prose supports the core behavior but supplies no explicit
new pass grade; its historical partial is retained.

## Backlog after reconciliation

Last assessed answers: **95 pass, 64 partial, 5 fail; 3 cases with no assessed
answer**. Nine latest requests are unavailable, overlapping those categories.
These are mixed-version inventory counts, not an aggregate accuracy score.

The five remaining assessed failures are syntax-highlighting configuration,
semantic accessibility, footnote return links, combined Person/GA4 configuration
and Algolia indexing. Highlighting and footnotes also have later unavailable
attempts. Prioritize actual incorrect advice and requested-task gaps within the
64 partials; do not retest every optional omission.

Historical raw responses, source manifests, review files and labels were not
modified. The previous section summary is retained with a supersession link.
No context, prompt, public documentation, llms.txt, theme accessibility, SEO
metadata or PWA behavior changed. No runtime build, deployment or live queries
were needed; structural checks verify case coverage and response hashes.
