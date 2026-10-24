# Feeds and migration: final validation — 24 October 2026

Worker `253c4a59-bd7d-4336-b3f3-c407f11f81e0`, verified 100% traffic before queries. Six HTTP 200 answers: 1 pass, 5 partial, 0 fail, 0 unavailable.

[Raw answers](feeds-migration-final-20261024.jsonl). [Deployed artifact](feeds-migration-final-deployment-20261024.json).

| Case | Result | Finding |
| --- | --- | --- |
| `migration-theme-1` | partial | Fixes unsupported layout: post; gives default/header_type:post YAML, plugin install/enablement, override precedence and preserved /feed.xml. Omits explicit url/baseurl/permalink preservation, adapting rather than deleting overrides, and parts of the broader integration/version/checklist rubric. |
| `migration-fields-lookup-1` | partial | Correct requested toc/comments/search mappings and independent Algolia/Google behavior with reference link. Omits front-matter precedence/nonautomatic conversion caveat and still emits unrequested LaTeX arrows. |
| `feed-coexistence-1` | partial | Correct unsafe collision warning, preserved /feed.xml dependency/plugin/address and independent include_on_feed semantics; removes unrelated defaults recipe. Still omits standard head advertisement of built-in feeds. |
| `feed-selection-1` | partial | Correct posts defaults, per-post false override and rejection of ordinary standalone pages; includes collection publication and reader/baseurl checks. Omits resolved-date/explicit collection-date requirements, preserving existing defaults and following article links; wording incorrectly implies opening an article participates in publication. |
| `feed-collection-output-1` | partial | Correct output:true inside existing collections mapping, independent feed selection and rebuild/direct article check; does not explicitly preserve other collection settings as required by existing rubric. |
| `community-4` | pass | Correct true/date eligibility and per-post false override diagnosis; no conflicting plugin replacement; published feed/baseurl/reader checks. |

## Interpretation and limits

Baseline six: 1 pass, 4 partial, 1 fail. First post-change six: 1 pass, 4 partial,
1 fail (feed selection improved, migration introduced a different layout error).
Final six: 1 pass, 5 partial, 0 fail. The final sample fixes the unsupported
layout, single-post exclusion and ordinary-page feed advice. Full rubric
coverage is still incomplete; no section-wide or repeatability claim is made.
The opening-an-article wording remains imprecise and should be corrected in a
future response-quality pass. Legacy arrows remain raw LaTeX in saved answers;
no browser claim is made about their rendering.

Two SEO controls were tested on the intermediate Worker, both partial with
previous core fixes intact. They were not repeated on the final deployment;
their evidence remains tied to the intermediate version.

Total: 20 Worker inference requests across three rounds, zero retries and zero
AI Search requests. Model, output budget, bindings, rate limit, plan and
compatibility date are unchanged. Per-answer neuron usage is unavailable.
105 local tests and both deployment dry-runs passed. Existing guides already
contain the facts; README/context updated, no public guide or llms.txt change.
No theme UI, accessibility semantics, rendered SEO or PWA behavior changed.
