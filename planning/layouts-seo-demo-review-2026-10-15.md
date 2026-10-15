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

## Demo overlap follow-up

Resumed from remote commit `ba401d8`; the Mermaid and PhotoSwipe follow-up was
not committed there. The four search demos already described their custom HTML,
but did not link their provider guides.

- Mermaid retains both live diagrams, their exact sources, `accTitle` and
  `accDescr`, front matter and development-after-v2.1.0 caveat. Remove the repeated
  YAML specimen and "Write your own" procedure; link the existing diagram guide
  and reference, and shorten the rendering explanation.
- PhotoSwipe links the existing viewer/gallery/carousel guides and keeps its
  reference, interaction advice and limitations. Both displayed Liquid snippets
  now exactly match their executed includes, including ascending basename order,
  limits, interval, controls and indicators. Executed includes are unchanged.
- Fuse.js, Lunr, Simple-Jekyll-Search and Google demos link their respective
  guides and explicitly distinguish their custom HTML/front matter from the
  normal `layout: search` and `search.provider` setup. Search implementation and
  front matter are unchanged.

Follow-up validation:

- Full Jekyll 4.4 documentation build with the current local theme.
- Mermaid and PhotoSwipe Ruby layout checks pass for root/subdirectory URLs;
  both JavaScript test files pass.
- Source comparison confirms unchanged diagram/accessibility sources, executed
  gallery parameters and search implementation. Generated HTML retains two
  diagram blocks and two galleries; both displayed snippets match. All ten
  documentation links/fragments on the six affected pages resolve.
- Chromium previews at 320 and 1280 px: both diagrams render as SVG; all six
  pages fit the viewport, with long code specimens scrolling inside their blocks.
  Both galleries open, accept ArrowRight, close with Escape and restore focus to
  the original link at both widths. Site assets were served from the local build;
  Mermaid and PhotoSwipe loaded from their CDN. Touch gestures were not tested.
- Existing Google demo shows its search input; its external branding image did
  not load in this environment. No external search-provider result checks or
  full accessibility audit are claimed. Existing metadata, URLs, manifest and
  service-worker behavior are unchanged; offline/PWA behavior was not tested.
- Reviewed `llms.txt`, chatbot context and relevant evaluation cases: existing
  guide links and facts remain accurate. No update or chatbot deployment is
  needed for this editorial follow-up; no new chatbot tests were run.
- Before the follow-up, PR #142 was open at `ba401d8`, its regression workflow
  passed, and the recorded Codex review had no findings on `dfd4921`.

## Remaining work

This delivery addresses the agreed Layouts/SEO/demo block and joint reference
routing review. The small FAQ recipes remain an editorial follow-up, as do
observed beginner/expert tasks and focused live chatbot factual/citation/latency
checks. Do not replace those evidence gaps with another round of tiny option
pages or claim this implementation rescores the #140 snapshot automatically.

## Review comments addressed

- Privacy/access-control notice uses `alert-warning`, following docs/AGENTS.md.
- Remove the asymmetric `demo` to `dmo` rewrite from cloud buttons and group IDs.
  Badges and groups now agree; documentation and development changelog describe
  the correction and migration of manually written old fragments. This is a
  reusable theme fix, superseding the no-runtime-change scope above.
- Regression fixture tests actual tag/category badge targets, group names and
  cloud buttons for `demo`, `demonstration`, `demo topic` and `dmo`, at root and
  `/preview`. Existing index/gallery and include-cache checks pass on Jekyll 4.4.
- Full local documentation build passes. Generated warning class and cloud
  button destinations checked; Chromium previews at 320/1280 px fit the viewport.
- Selective chatbot context updated for the changed fragment behavior, with one
  focused evaluation case. All 40 chatbot tests pass; context is 44,988 UTF-8
  bytes. No live model evaluation or manual Worker deployment performed.
- `llms.txt` retains the existing grouped-index guide entry; no new source page
  or routing change needs a new entry. Accessibility improves through matching
  fragment destinations and consistent warning treatment. No metadata,
  manifest/service-worker/offline behavior changes; no full audit claimed.
