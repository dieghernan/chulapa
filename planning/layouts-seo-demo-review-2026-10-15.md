# Layouts, Global settings and demo consolidation

Date: 15 October 2026. Baseline: main after #141.
Delivery: [PR #142](https://github.com/dieghernan/chulapa/pull/142).
Status: implementation in review; no new Diátaxis scores or observed user results.

## Source/destination decisions

| Area | Procedure | Reference retained | Live result / source |
| --- | --- | --- | --- |
| Tag/category groups | [Grouped indexes](../docs/collections/_docs/63_tag-category-clouds.md): matching page/badge paths, scope, preserved defaults and verification. | Layout names, scope, compatibility aliases and examples stay in Layouts. | Existing tag/category demos keep exact front matter, group IDs and article links; duplicated two-step setup is replaced with a task link and actual selection specimen. |
| Post preview and article illustrations | [Sharing metadata](../docs/collections/_docs/64_post-sharing.md): upload/select real file, edit metadata, inspect published source/image URLs. | Description/title/image types, precise fallbacks, multi-image examples and Open Graph/JSON-LD distinctions stay in Layouts. | Existing Welcome post with its actual header/schema image and source. No separate pretend metadata demo or duplicated walkthrough. |
| Auxiliary page indexing | [Search visibility](../docs/collections/_docs/65_search-visibility.md): independent crawler/sitemap/local-search settings and checks. | Defaults, precedence, indexing controls and Algolia distinction remain in Reference. | The real documentation search page and its source; the guide explicitly distinguishes a configuration example from live crawler removal evidence. |
| Ordered cards | No additional guide. | Filename-order mapping, defaults, ascending switch and post-sort limit stay as lookup specimens. | Existing demo index actually uses ascending `path`; the reference now states that accurately rather than calling its field `name`. |
| Search-page setup | Existing provider guides remain canonical. | Layout shell, matching permalink and navbar/provider constraints remain R; wording no longer introduces another setup sequence. | Existing provider search demos and their complete sources remain linked. |
| Defaults and custom card include | No guide per option. | Mapping/include specimens stay in R with the existing precedence/constraints; imperative setup phrasing is removed. | Existing card index and source remain examples. |

Global settings now links sharing/indexing procedures directly and retains its
field/provider lookup. No field catalog, fallback rule or development-version
boundary is deliberately removed. The existing canonical/publisher/date task
links and section destinations remain intact.

The cloud demos now show their result and real configuration instead of teaching
the same setup independently. No demo URL, layout, collection scope or sample
content data is changed. `cloudcategory2` remains explicitly identified as the
compatibility alias actually used by that demo.

## Validation

- Full local Jekyll 4 documentation build.
- Actual guide YAML tested on Jekyll 3.10 and 4.4 with empty and `/project`
  baseurl: post badge destinations/group IDs/article links; sharing title,
  description, image alt and BlogPosting illustration; unchanged visible title
  and no body image inserted by metadata; existing local image file.
- Same fixtures exercise actual jekyll-sitemap output and all three real local
  search stores (Lunr, Fuse.js, Simple-Jekyll-Search), with included-post positive
  controls and an excluded auxiliary page that remains published.
- All 40 chatbot tests pass. Three editorial evaluation cases added; no live
  model evaluation or external Algolia/Google indexing check performed.
- Scan of 156 generated HTML pages: 3,461 links targeting documentation resolve.
- Five guide/reference pages and the two cloud demos checked at 320 and 1280 px.
  Actual cloud group IDs/article links and demo front matter match the baseline.
- Context source changes preserve selective facts; 44,997 UTF-8 bytes under the
  unchanged 45,000-byte guard. No full walkthrough is copied into the context.
  Context is not deployed until the PR is merged and its Worker workflow succeeds.

These checks do not establish novice success, full accessibility conformance,
external preview/crawler behavior, live model accuracy or response time. No
reusable runtime/API, manifest, service worker or offline behavior changes.

## Remaining work

This delivery addresses the agreed Layouts/SEO/demo block and joint reference
routing review. The small FAQ recipes remain an editorial follow-up, as do
observed beginner/expert tasks and focused live chatbot factual/citation/latency
checks. Do not replace those evidence gaps with another round of tiny option
pages or claim this implementation rescores the #140 snapshot automatically.
