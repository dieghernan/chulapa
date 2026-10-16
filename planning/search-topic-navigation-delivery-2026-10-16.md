# Search topic navigation delivery

Date: 16 October 2026. Baseline: main `db48e2d7c`, after merged #151.
Issue: [#150](https://github.com/dieghernan/chulapa/issues/150).
Delivery: [PR #152](https://github.com/dieghernan/chulapa/pull/152).
Branch: `codex/docs-search-topic-navigation`.
Status: implemented and locally validated; PR review, CI, merge and deployment
pending. Issue closure occurs only with the accepted implementation merge.

## Scope and topic choices

Only existing guides 12, 34-37 and 65 receive metadata. Every guide uses `docs`
and `search`, enabling matches through the existing two-shared-tag selector.
Fuse.js, Lunr and Simple-Jekyll-Search also use `local-search`; Google and Algolia
use `hosted-search`. Visibility guide 65 uses both subtopics because it explains
local index exclusions and hosted/external indexing constraints. It consequently
appears among all five provider guides' three cards. No extra tag was added just
to pad a group, and no cards were activated on the Global settings Reference.

Guide bodies, code examples, public URLs, titles, subtitles, provider restrictions
and exact inline links are unchanged. Provider cards are alternatives rather
than ordered setup. The topic index explicitly explains that distinction and
retains partial coverage. The existing guide keeps robots, sitemap, local search,
Algolia exclusions and public accessibility distinct; tags change none of them.

## Rendered card selection

Actual built selections, identical at 320 and 1280 CSS pixels:

| Guide | Selected related documentation |
| --- | --- |
| 12-fusejs-search | Enable Lunr.js search; Keep an auxiliary page out of search results; Enable Simple-Jekyll-Search search |
| 34-lunr-search | Enable Fuse.js search; Keep an auxiliary page out of search results; Enable Simple-Jekyll-Search search |
| 35-simplesearch-search | Enable Fuse.js search; Keep an auxiliary page out of search results; Enable Lunr.js search |
| 36-google-search | Connect Algolia search and upload its index; Keep an auxiliary page out of search results; Enable Fuse.js search |
| 37-algolia-search | Enable Google Custom Search; Keep an auxiliary page out of search results; Enable Fuse.js search |
| 65-search-visibility | Enable Fuse.js search; Connect Algolia search and upload its index; Enable Google Custom Search |

The visibility guide shows one local provider plus the two hosted alternatives;
its unchanged inline links retain the complete field and publishing destinations.
The three-card limit is supplementary; essential links remain in the guide text.
Equal-score ordering retains the existing date-based behavior. This inspection
establishes selected destinations, not measured usefulness to human readers.

## Verification

- Full Jekyll 4.4 docs build passes using the configured remote theme.
- All 40 chatbot unit/build tests pass. The catalogs parse with unique IDs;
  one focused `documentation-search-topics` case adds coverage expectations.
- Edge headless checks all six guides at 320 and 1280 px: three non-self Docs
  cards per page, topic badges present, no card dates and no document overflow.
- Desktop/mobile screenshots of Fuse.js and visibility inspected: readable card
  titles/descriptions, desktop row and mobile stack; existing styles are reused.
- Focused related link and search badge activate with Enter; the badge reaches
  `/docs/tags#search`. Local/hosted/search topic groups are present.
- Docs topic entries all point to Docs; blog topic entries exclude Docs.
- All 37 checked card/topic links and fragments resolve. Guide bodies match
  baseline after Git newline normalization. UTF-8/new mojibake and
  `git diff --check` checks pass.

The index description, `llms.txt` and selective context now mention search topics,
provider alternatives and visibility. Context is 46,895/47,000 bytes in this
Windows checkout; no budget increase, runtime/renderer change or new option.
The existing search-visibility case remains accurate. Historical evaluations,
scores, public type labels and tutorial progression are unchanged. No new public
page or extraction, theme template, recommendation ranking or search behavior.

Accessibility review is bounded to affected native-link keyboard operation and
responsive reflow, not a full audit or assistive-technology certification. Guide
SEO fields/canonical URLs are unchanged. No manifest, service worker, caching or
offline changes; no PWA-readiness claim. This is documentation navigation, so no
theme changelog entry is needed.

No live provider/model requests, Worker deployment or new human study. Passing
tests/builds/browser checks does not establish chatbot precision or human task
success. Context rollout is pending an approved merge and actual verification of
the existing Pages-gated Worker workflow. The broader integration working changes
remain outside this branch. Next: installation/migration/starter review from the
[execution plan](diataxis-closeout-plan.md), with #125 kept as separate runtime work.
