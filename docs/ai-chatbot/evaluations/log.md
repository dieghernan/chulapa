# Consolidated live evaluation log

This index consolidates the recorded live question batches and focused
regression runs through 22 October 2026. Each outcome belongs only to the
Worker/source identified in its linked review. A pass on one version is not
carried forward to another, and overlapping runs must not be added into a
coverage or accuracy score.

`Pass`, `partial`, `fail` and `unavailable` are manual case-review labels.
Unavailable includes rejected or failed requests with no answer to review; it
is not a pass. HTTP 200 confirms transport only, not answer quality. Raw JSONL
and detailed per-case evidence remain in the linked records.

## Reviewed batches

| Date | Batch | Reviewed outcome | Main findings | Detailed record |
| --- | --- | --- | --- | --- |
| 2026-10-08 | Baseline, revision and final targeted runs | 86 requests across 61 distinct questions; no common pass/partial/fail score was recorded. Seven correction cases were repeated in the final run. | Initial answers exposed gaps in configuration, search, theming, layouts and examples. The final seven targeted answers fixed their specific known errors; source-link precision remained imperfect. | [Campaign review](review-2026-10-08.md); raw [baseline](baseline-2026-10-08.jsonl), [revision](revised-2026-10-08.jsonl) and [final retest](final-2026-10-08.jsonl). |
| 2026-10-08 | Focused context checks | Variables: 4 initial + 4 revised requests (3 HTTP 200, 1 HTTP 429); Mermaid: 3 one-question checks; starter/accessibility: 5 requests. | Corrected variable inventory, Mermaid source/fallback guidance and starter instructions. The unavailable 429 answer was not evaluated. | [Evaluation notes](../evaluation.md#variables-dictionary-update-october-8-2026); raw [variables](variables-2026-10-08.jsonl), [revised variables](variables-revised-2026-10-08.jsonl), [Mermaid runs](mermaid-2026-10-08.jsonl), [Mermaid final](mermaid-final-2026-10-08.jsonl), [starter](starters-2026-10-08.jsonl) and [starter/accessibility](starter-template-2026-10-08.jsonl). |
| 2026-10-12 | Layout and include-cache checks | 2 requests; both returned HTTP 200 and were reviewed. | Singleton recommendation behavior and safe include caching were correctly explained; the cache answer omitted some implementation details. | [Raw answers](liquid-cache-2026-10-12.jsonl); [evaluation notes](../evaluation.md#include-caching-and-layout-context-deployment-october-12-2026). |
| 2026-10-16 | Release five-case baseline | 5 requests; all HTTP 200. Review was per dimension rather than a single case-level score. | Core questions surfaced inaccurate `fileurl`/`relative_url` advice and a version-check citation mismatch; other answers had actionable omissions. | [Review](review-release-220-five-cases-2026-10-16.md); [raw answers](release-220-five-cases-2026-10-16.jsonl). |
| 2026-10-16 | Correction retest of the same five cases | 5 requests; all HTTP 200. Per-dimension review; no aggregate score. | The file path, version-check and menu-insertion answers improved. A first-site answer still risked confusing the home-page heading with the sample post. | [Review](review-answer-corrections-retest-2026-10-16.md); [raw answers](answer-corrections-retest-2026-10-16.jsonl). |
| 2026-10-16 | Full catalog on the earlier source | 56 of 155 planned cases reviewed: 22 pass, 16 partial, 18 fail; all 56 requests returned HTTP 200. The run was stopped at the user's request. | Material errors included layout hierarchy/cache advice, invented markup/configuration and misleading verification instructions. This is historical evidence for that source only. | [Per-case review and run status](full-catalog-review-notes-2026-10-16.json); [raw answers](full-catalog-2026-10-16.jsonl). |
| 2026-10-16 | Candidate layout regressions | Several short runs across changing candidates; 18 requests are recorded in the campaign notes. On the later identified source, four selected cases passed their core factual checks. | Iteration exposed false denials of layout inheritance and cache guidance; fixes were confirmed only for the cases actually rerun on the later source. Do not pool the earlier candidate outcomes. | [Iteration history](layout-regression-iterations-2026-10-16.md); [coverage plan](pending-batches-2026-10-16.md). |
| 2026-10-16 | Installation corrections | 1 follow-up request, HTTP 200; per-dimension result: facts pass, actionability partial, sources pass. | Corrected the home-title file instruction; the sample-post workflow and public result check remained incomplete. | [Review](review-installation-files-retest-2026-10-16.md); [raw answer](installation-files-retest-2026-10-16.jsonl). |
| 2026-10-18 | Additional catalog batch of 5 | 3 pass, 1 partial, 1 fail; 0 unavailable. All 5 returned HTTP 200. | Incorrect TOC setting placement was a material error; the video example was valid but missed the requested playback check. | [Review](additional5-2026-10-18.md); [raw answers](additional5-worktree-981dd71ee196-20261018.jsonl). |
| 2026-10-18 | Additional catalog batch of 10 | 8 pass, 2 partial, 0 fail, 0 unavailable. All 10 returned HTTP 200. | Main issues: incomplete footer icon class and contradictory Autothemer prose despite correct YAML. | [Review](additional10-2026-10-18.md); [raw answers](additional10-worktree-981dd71ee196-20261018.jsonl). |
| 2026-10-18 | Additional catalog batch of 13 | 8 pass, 3 partial, 1 fail, 1 unavailable. Twelve HTTP 200 and one HTTP 503. The Worker changed between requests 8 and 9, so this is a mixed-version batch. | The older runtime invented a missing alert include; the unavailable answer was not reviewed. Version attribution is documented and results must remain split by runtime. | [Review and deployment boundary](additional13-2026-10-18.md); [raw responses](additional13-worktree-981dd71ee196-20261018.jsonl), [first eight](additional13-first8-worktree-981dd71ee196-20261018.jsonl) and [last five](additional13-last5-cd95fb43-20261018.jsonl). The aggregate and split files contain the same requests; do not count them twice. |
| 2026-10-18 | Additional catalog batch of 20 | 12 pass, 8 partial, 0 fail, 0 unavailable. All 20 returned HTTP 200. | Main omissions/errors concerned feed wrappers, heading hierarchy, layout override paths and inconsistent Algolia key nesting. | [Review](additional20-2026-10-18.md); [raw answers](additional20-worktree-981dd71ee196-20261018.jsonl). |
| 2026-10-18 | PR 164 task-correction runs | Four overlapping candidate runs: `96a7feeaa` 9 pass/2 partial/1 fail; `640ce7555` 11 pass/2 partial/1 fail; `841b3925f` 2 pass/2 partial; `c3107102d` 2 pass/2 partial. | TOC syntax and search discovery remained problematic; inventory, citation and routing fixes were evaluated on specific revisions only. These overlapping results are not additive. | [Campaign review](pr164-task-corrections-2026-10-18.md), with [96a7feeaa](taskfix-96a7feeaa-review.json), [640ce7555](taskfix-640ce7555-review.json), [841b3925f](taskfix-841b3925f-review.json) and [c3107102d](taskfix-c3107102d-review.json) case records. |
| 2026-10-18 | Pre-commit candidate iterations | Separate candidate snapshots: `15a9ac182` 7 cases (5 pass/2 partial); `4419e056a24d` 3 (2 pass/1 partial); `4f9e05aec576` 7 (6 pass/1 partial); `981dd71ee196` 7 (7 pass). | Iteration-specific results; the later snapshot corrected core alert, skin and layout cases. These runs overlap and do not represent independent full-catalog coverage. | [15a9ac182 review](precommit-15a9ac182-20261018-review.json), [4419e056a24d review](precommit-worktree-4419e056a24d-review.json), [4f9e05aec576 review](precommit-worktree-4f9e05aec576-review.json) and [latest progress](precommit-progress-2026-10-18.md). |
| 2026-10-18 | Provider inventory probes | 8 requests across three revisions: `640ce7555` 1 pass/1 partial; `c3107102d` 2 pass; `ff5be537f` 4 pass. | A later English/Spanish inventory included all provider choices and the Cusdis hosting caveat. Earlier partial answers remain part of their own revision's record. | [640ce7555](inventory-640ce7555-review.json), [c3107102d](inventory-c3107102d-review.json) and [ff5be537f synonym review](inventory-synonyms-ff5be537f-review.json). |
| 2026-10-18 | Bounded task-validation checks | Two four-case catalog probes: 4 pass and 4 unavailable (HTTP 503 total). Provider inventory results are recorded separately above. | Guarded fallbacks prevented two known invalid task answers; their underlying model answers remain unavailable, not corrected or passed. | [Review and limits](pr164-bounded-validation-2026-10-18.md); [ff5be537f catalog](validation-ff5be537f-review.json) and [dd9e23b90 catalog](validation-dd9e23b90-review.json). |
| 2026-10-18 | Final pre-commit catalog regression | 7 catalog cases on one identified runtime passed their core factual/task checks; supplementary inventory findings are tracked separately. | Alert, skin and cache guidance improved; some presentation/precision issues remained. Not full-catalog validation. | [Latest outcome](precommit-progress-2026-10-18.md); [catalog review](precommit-worktree-981dd71ee196-review.json) and [supplementary review](precommit-worktree-981dd71ee196-supplement-review.json). |
| 2026-10-22 | Post-release focused sample | 2 requests; both HTTP 200 and reviewed for factual content and links. | Core release/version and starter facts were correct, with omissions; this small sample is not a broad release assessment. | [Review](postrelease-220-20261022-125de32d6-review.md); [raw answers](postrelease-220-20261022-125de32d6.jsonl). |
| 2026-10-22 | First catalog batch of 10 | 6 pass, 3 partial, 0 fail, 1 unavailable. Nine HTTP 200 and one HTTP 503. | One guide-discovery answer was unavailable; omissions remained in PhotoSwipe, content TOC and other multi-part tasks. | [Review](batch10-2026-10-22-review.md); raw [batch 1](batch10-01-2026-10-22.jsonl), [batch 2](batch10-02-2026-10-22.jsonl) and [batch 3](batch10-03-2026-10-22.jsonl). |
| 2026-10-22 | Second catalog batch of 10 | 3 pass, 4 partial, 3 fail, 0 unavailable. All 10 returned HTTP 200. | Material errors: Autothemer nesting, analytics-ID behavior and the publisher default. These corrections were subsequently made locally, not deployed in the Worker tested here. | [Review](batch10b-2026-10-22-review.md); [raw answers](batch10b-2026-10-22.jsonl). |
| 2026-10-22 | Third catalog batch of 20 | 6 pass, 7 partial, 7 fail, 0 unavailable. All 20 returned HTTP 200. | Invalid skin configuration examples, contradictory GoatCounter advice, incorrect search-script order and the first-post workflow were the most important errors. The tested Worker predates the local corrections. | [Review](batch20-2026-10-22-review.md); [raw answers](batch20-2026-10-22.jsonl). |
| 2026-10-22 | Fourth batch: 20 previously untested cases | 6 pass, 10 partial, 4 fail, 0 unavailable. All 20 returned HTTP 200. | Material errors: incorrect Welcomments template advice, incomplete cloud-index setup, an invented cloud-fragment recipe and invalid Light/Dark configuration. | [Review](untested20-2026-10-22-review.md); [raw answers](untested20-2026-10-22.jsonl). |
| 2026-10-22 | Post-deployment regression retest of 10 non-pass cases | 1 pass, 3 partial, 6 fail, 0 unavailable. All 10 returned HTTP 200. | GA4 guidance now correctly explains the independent legacy ID. Autothemer and Welcomments improved but still omit requested steps; publisher guidance still risks replacing existing fields. Six cases retain material errors. | [Review](retest10-postdeploy-2026-10-22-review.md); [raw answers](retest10-postdeploy-2026-10-22.jsonl). Worker `15036755-2e9b-4112-8c0a-01b9348d7c62` served 100% of traffic. |
| 2026-10-22 | Layout-focused post-deployment regression | 1 pass, 5 partial, 1 fail, 0 unavailable. All 7 returned HTTP 200. | The new-post workflow is corrected and cloud setup is substantially improved. Cloud fragment explanation remains materially inaccurate; other layout answers have narrower omissions. | [Review](layouts-postdeploy-2026-10-22-review.md); [raw answers](layouts-postdeploy-2026-10-22.jsonl). Worker `738414cb-3f77-4c67-a61f-25ca00f5c018` served 100% of traffic. |
| 2026-10-22 | Final layout-focused post-deployment pass | 1 pass, 5 partial, 0 fail, 0 unavailable. All 6 returned HTTP 200. | The include-caching answer now covers page-specific inputs and development-only refactoring. The feed, heading-label, microformat, cloud setup and demo-fragment answers improved but still omit requested details. | [Review](layouts-final-2026-10-22-review.md); [raw answers](layouts-final-2026-10-22.jsonl). Worker `5266df62-1349-482e-a687-101e675c7721` served 100% of traffic. |
| 2026-10-22 | Retest of 20 older non-pass cases | 10 pass, 8 partial, 2 fail, 0 unavailable. All 20 returned HTTP 200. | Social metadata, layout options, accessibility and community guidance improved. Navigation's GitHub-button advice and the portfolio starter workflow remain materially wrong; several other answers omit requested details. | [Review](older-nonpass20-2026-10-22-review.md); [raw answers](older-nonpass20-2026-10-22.jsonl). Worker `5266df62-1349-482e-a687-101e675c7721` served 100% of traffic. |
| 2026-10-22 | Previously untested batch 1 of 3 | 1 pass, 7 partial, 2 fail, 0 unavailable. All 10 returned HTTP 200. | Correct collection output advice; feed-selection and footnote return-link answers were inaccurate or incomplete. | [32-case review](untested32-2026-10-22-review.md#batch-1); [raw answers](untested-batch1-2026-10-22.jsonl). Worker `15036755-2e9b-4112-8c0a-01b9348d7c62` served 100% of traffic. |
| 2026-10-22 | Previously untested batch 2 of 3 | 2 pass, 7 partial, 1 fail, 0 unavailable. All 10 returned HTTP 200. | Installation and PhotoSwipe answers were sound; the carousel answer omitted keyboard/version guidance, and the migration mapping misstated local-search exclusion behavior. | [32-case review](untested32-2026-10-22-review.md#batch-2); [raw answers](untested-batch2-2026-10-22.jsonl). Worker `15036755-2e9b-4112-8c0a-01b9348d7c62` served 100% of traffic. |
| 2026-10-22 | Previously untested batch 3 of 3 | 2 pass, 6 partial, 4 fail, 0 unavailable. All 12 returned HTTP 200. | Search, site-details and SEO answers often missed required setup steps; YAML and sharing-image examples contained actionable errors. | [32-case review](untested32-2026-10-22-review.md#batch-3); [raw answers](untested-batch3-2026-10-22.jsonl). Worker `15036755-2e9b-4112-8c0a-01b9348d7c62` served 100% of traffic. |
| 2026-10-22 | Skin-context post-deployment retest | 0 pass, 4 partial, 0 fail, 1 unavailable. Four HTTP 200 and one HTTP 503. | Corrected configuration examples were mostly recovered, but Autothemer still omitted `skin: auto`; the floating-navigation answer added an unsupported search-page limit. The 503 answer was not retried. | [Review](skins-postdeploy-2026-10-22-review.md); [raw answers](skins-postdeploy-2026-10-22.jsonl). Worker `8b59f0a7-006b-45b4-a325-c84c43505ce5` served 100% of traffic. |
| 2026-10-22 | Historical pass retest (latest pass dated 16 October or earlier) | 7 pass, 0 partial, 1 fail, 0 unavailable. All eight returned HTTP 200. | Seven answers passed; one older pass regressed by recommending root-level `highlight: dracula` rather than `chulapa-skin.highlight`. | [Review](historical-pass8-2026-10-22-review.md); [raw answers](historical-pass8-2026-10-22.jsonl). Worker `8b59f0a7-006b-45b4-a325-c84c43505ce5` served 100% of traffic. |
| 2026-10-22 | Retest of ten 18 October pass cases | 5 pass, 5 partial, 0 fail, 0 unavailable. All 10 returned HTTP 200. | Search, theming catalog, localized dates, video metadata and custom hooks passed. Remaining omissions concern defaults YAML, Giscus prerequisites, skin-preservation checks and alert/list boundaries. | [Review](oct18-pass10-2026-10-22-review.md); [raw answers](oct18-pass10-2026-10-22.jsonl). Worker `8b59f0a7-006b-45b4-a325-c84c43505ce5` served 100% of traffic. |

## Updating this log

After each authorized live batch is complete and its answers have been manually
reviewed:

1. Add one dated row under **Reviewed batches**, linking the raw JSONL and the
   detailed review. Record the Worker/source revision where available.
2. Include exact request and case-review counts only when the review supports
   them. Keep unavailable answers separate from failures and passes.
3. If a batch spans deployments, split the findings by version or state the
   transition explicitly. Never transfer a result to another Worker revision.
4. Keep source JSONL and prior reviews immutable. When a runner splits or
   aggregates evidence, link the canonical record and note duplicate files so
   requests are not counted twice.
5. Do not calculate a grand accuracy percentage across overlapping cases,
   changing prompts or Worker versions.

The detailed history in [evaluation.md](../evaluation.md), [PR 164 records](pr164-closeout-2026-10-18.md)
and [candidate batch register](pending-batches-2026-10-16.md) provides deeper
implementation, revision and planning context; planned or interrupted cases
are not completed evaluation results.

## Latest status per tested catalog case

This table lists the latest known outcome for all 160 catalog cases, based on
the records available on 22 October 2026. The test date is taken from the latest
timestamped live response in the JSONL evidence (UTC); blank dates mean no
timestamped live response is recorded.
Statuses are tied to the Worker version shown; a result from an older Worker
does not describe the currently deployed one. Worker values are the first
eight characters of the version UUID. `pending review` means a raw response
exists but no case-level review is recorded. `unavailable` means the request
returned no answer to assess; it is not a pass or fail. Blank result and Worker
cells mean no live response for that case is present in the evaluation logs.

| Case | Latest result | Worker version | Latest test (UTC) |
| --- | --- | --- | --- |
| `accessibility-1` | pass | `5266df62…` | 2026-10-22 |
| `accessibility-task-reference-1` | partial | `47cc2e30…` | 2026-10-22 |
| `analytics-ga4-setup-1` | pass | `47cc2e30…` | 2026-10-22 |
| `analytics-goat-setup-1` | pass | `47cc2e30…` | 2026-10-22 |
| `appearance-auto-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `appearance-font-task-1` | pass | `47cc2e30…` | 2026-10-22 |
| `appearance-sass-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `appearance-skin-task-1` | partial | `8b59f0a7…` | 2026-10-22 |
| `assistant-session-history` | pass | `47cc2e30…` | 2026-10-22 |
| `beginner-image-1` | pass | `47cc2e30…` | 2026-10-22 |
| `beginner-post-1` | pass | `738414cb…` | 2026-10-22 |
| `beginner-publishing-1` | partial | `47cc2e30…` | 2026-10-22 |
| `bundled-font-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `canonical-article-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `carousel-accessibility-motion` | partial | `47cc2e30…` | 2026-10-22 |
| `cloud-demo-fragments` | partial | `5266df62…` | 2026-10-22 |
| `cloud-task-1` | partial | `5266df62…` | 2026-10-22 |
| `collection-filename-order` | pass | `47cc2e30…` | 2026-10-22 |
| `comments-cactus-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `comments-cusdis-task-1` | pass | `47cc2e30…` | 2026-10-22 |
| `comments-disqus-task-1` | pass | `47cc2e30…` | 2026-10-22 |
| `comments-giscus-setup-1` | partial | `8b59f0a7…` | 2026-10-22 |
| `comments-welcomments-task-1` | partial | `15036755…` | 2026-10-22 |
| `community-1` | pass | `5266df62…` | 2026-10-22 |
| `community-165` | partial | `8b59f0a7…` | 2026-10-22 |
| `community-2` | pass | `5266df62…` | 2026-10-22 |
| `community-3` | pass | `5266df62…` | 2026-10-22 |
| `community-4` | partial | `5266df62…` | 2026-10-22 |
| `community-5` | partial | `5266df62…` | 2026-10-22 |
| `config-author-profile-1` | pass | `65bb328b…` | 2026-10-18 |
| `configuration-1` | pass | `47cc2e30…` | 2026-10-22 |
| `configuration-2` | pass | `8b59f0a7…` | 2026-10-22 |
| `configuration-3` | pass | `65bb328b…` | 2026-10-18 |
| `configuration-4` | pass | `15036755…` | 2026-10-22 |
| `configuration-5` | pass | `65bb328b…` | 2026-10-18 |
| `configuration-6` | pass | `223eaf7d…` | 2026-10-18 |
| `content-image-1` | partial | `47cc2e30…` | 2026-10-22 |
| `content-page-1` | pass | `47cc2e30…` | 2026-10-22 |
| `content-post-1` | partial | `47cc2e30…` | 2026-10-22 |
| `content-toc-task-1` | partial | `d0e281c2…` | 2026-10-22 |
| `custom-head-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `custom-search-script-dependencies` | fail | `15036755…` | 2026-10-22 |
| `documentation-appearance-topics` | partial | `47cc2e30…` | 2026-10-22 |
| `documentation-content-publishing-topics` | partial | `15036755…` | 2026-10-22 |
| `documentation-identity-topics` | partial | `15036755…` | 2026-10-22 |
| `documentation-installation-topics` | partial | `15036755…` | 2026-10-22 |
| `documentation-search-topics` | unavailable | `d0e281c2…` | 2026-10-22 |
| `faq-1` | pass | `d0e281c2…` | 2026-10-22 |
| `faq-2` | pass | `8b59f0a7…` | 2026-10-22 |
| `faq-3` | partial | `47cc2e30…` | 2026-10-22 |
| `faq-4` | pass | `d0e281c2…` | 2026-10-22 |
| `faq-5` | pass | `223eaf7d…` | 2026-10-18 |
| `faq-6` | pass | `cd95fb43…` | 2026-10-18 |
| `favicon-task-1` | partial | `15036755…` | 2026-10-22 |
| `feed-coexistence-1` | partial | `15036755…` | 2026-10-22 |
| `feed-collection-output-1` | pass | `15036755…` | 2026-10-22 |
| `feed-selection-1` | fail | `15036755…` | 2026-10-22 |
| `footer-edit-existing-1` | partial | `15036755…` | 2026-10-22 |
| `format-alert-task-1` | partial | `8b59f0a7…` | 2026-10-22 |
| `format-caption-task-1` | partial | `15036755…` | 2026-10-22 |
| `format-footnote-task-1` | fail | `15036755…` | 2026-10-22 |
| `goatcounter-analytics` | fail | `47cc2e30…` | 2026-10-22 |
| `icon-task-1` | partial | `15036755…` | 2026-10-22 |
| `install-gem-task-1` | partial | `15036755…` | 2026-10-22 |
| `install-remote-task-1` | pass | `15036755…` | 2026-10-22 |
| `installation-1` | pass | `d0e281c2…` | 2026-10-22 |
| `installation-2` | pass | `d0e281c2…` | 2026-10-22 |
| `installation-3` | partial | `8b59f0a7…` | 2026-10-22 |
| `installation-4` | pass | `65bb328b…` | 2026-10-18 |
| `installation-5` | pass | `65bb328b…` | 2026-10-18 |
| `installation-6` | pass | `223eaf7d…` | 2026-10-18 |
| `javascript-resource-fallbacks` | partial | `47cc2e30…` | 2026-10-22 |
| `layouts-1` | partial | `8b59f0a7…` | 2026-10-22 |
| `layouts-2` | pass | `65bb328b…` | 2026-10-18 |
| `layouts-3` | pass | `64ee01ab…` | 2026-10-18 |
| `layouts-4` | pass | `65bb328b…` | 2026-10-18 |
| `layouts-5` | pass | `65bb328b…` | 2026-10-18 |
| `layouts-6` | pass | `65bb328b…` | 2026-10-18 |
| `layouts-7` | pass | `8b59f0a7…` | 2026-10-22 |
| `layouts-head-formatting-1` | pass | `65bb328b…` | 2026-10-18 |
| `layouts-include-cache-1` | pass | `5266df62…` | 2026-10-22 |
| `layouts-label-headings-1` | partial | `5266df62…` | 2026-10-22 |
| `layouts-microformats-1` | partial | `5266df62…` | 2026-10-22 |
| `layouts-microformats-feed-1` | partial | `5266df62…` | 2026-10-22 |
| `layouts-microformats-nested-feed-1` | pass | `65bb328b…` | 2026-10-18 |
| `layouts-random-singleton-1` | pass | `65bb328b…` | 2026-10-18 |
| `localized-date-task-1` | partial | `15036755…` | 2026-10-22 |
| `media-carousel-task-1` | partial | `15036755…` | 2026-10-22 |
| `media-diagram-task-1` | partial | `15036755…` | 2026-10-22 |
| `media-gallery-task-1` | partial | `15036755…` | 2026-10-22 |
| `media-photoswipe-task-1` | pass | `15036755…` | 2026-10-22 |
| `media-video-task-1` | partial | `15036755…` | 2026-10-22 |
| `mermaid-1` | pass | `8b59f0a7…` | 2026-10-22 |
| `migration-fields-lookup-1` | fail | `15036755…` | 2026-10-22 |
| `migration-theme-1` | partial | `47cc2e30…` | 2026-10-22 |
| `navigation-1` | pass | `5266df62…` | 2026-10-22 |
| `navigation-2` | fail | `5266df62…` | 2026-10-22 |
| `navigation-3` | partial | `5266df62…` | 2026-10-22 |
| `navigation-edit-existing-1` | pass | `47cc2e30…` | 2026-10-22 |
| `person-publisher-task-1` | partial | `15036755…` | 2026-10-22 |
| `photoswipe-gallery` | partial | `d0e281c2…` | 2026-10-22 |
| `provider-algolia-task-1` | partial | `15036755…` | 2026-10-22 |
| `provider-google-task-1` | fail | `15036755…` | 2026-10-22 |
| `provider-lunr-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `provider-simplesearch-task-1` | partial | `15036755…` | 2026-10-22 |
| `pwa-offline-status` | partial | `47cc2e30…` | 2026-10-22 |
| `reference-edge-cases-1` | pass | `cd95fb43…` | 2026-10-18 |
| `reference-edge-cases-2` | pass | `cd95fb43…` | 2026-10-18 |
| `reference-edge-cases-3` | pass | `5266df62…` | 2026-10-22 |
| `reference-edge-cases-4` | pass | `8b59f0a7…` | 2026-10-22 |
| `reference-edge-cases-5` | fail | `8b59f0a7…` | 2026-10-22 |
| `reference-edge-cases-6` | pass | `8b59f0a7…` | 2026-10-22 |
| `related-card-dates-1` | pass | `15036755…` | 2026-10-22 |
| `resources-1` | partial | `5266df62…` | 2026-10-22 |
| `search-comments-1` | pass | `8b59f0a7…` | 2026-10-22 |
| `search-comments-2` | pass | `65bb328b…` | 2026-10-18 |
| `search-comments-3` | partial | `47cc2e30…` | 2026-10-22 |
| `search-comments-4` | partial | `5266df62…` | 2026-10-22 |
| `search-comments-5` | pass | `65bb328b…` | 2026-10-18 |
| `search-comments-6` | pass | `223eaf7d…` | 2026-10-18 |
| `search-fusejs-setup-1` | partial | `15036755…` | 2026-10-22 |
| `search-no-navbar-links-1` | pass | `15036755…` | 2026-10-22 |
| `search-visibility-task-1` | fail | `15036755…` | 2026-10-22 |
| `second-photo-tutorial-1` | partial | `d0e281c2…` | 2026-10-22 |
| `semantic-html-accessibility` | fail | `47cc2e30…` | 2026-10-22 |
| `seo-1` | partial | `5266df62…` | 2026-10-22 |
| `seo-2` | pass | `5266df62…` | 2026-10-22 |
| `seo-3` | pass | `5266df62…` | 2026-10-22 |
| `seo-4` | pass | `5266df62…` | 2026-10-22 |
| `sharing-task-1` | fail | `15036755…` | 2026-10-22 |
| `sidebar-accessibility-focus` | partial | `47cc2e30…` | 2026-10-22 |
| `site-details-edit-1` | partial | `15036755…` | 2026-10-22 |
| `skin-font-failure-1` | partial | `8b59f0a7…` | 2026-10-22 |
| `skin-palette-contrast-1` | partial | `47cc2e30…` | 2026-10-22 |
| `skins-bootswatch-originals-1` | unavailable | `8b59f0a7…` | 2026-10-22 |
| `snippet-parameter-reference` | pass | `47cc2e30…` | 2026-10-22 |
| `snippets-1` | pass | `d0e281c2…` | 2026-10-22 |
| `snippets-2` | pass | `47cc2e30…` | 2026-10-22 |
| `snippets-3` | pass | `8b59f0a7…` | 2026-10-22 |
| `snippets-4` | pass | `d0e281c2…` | 2026-10-22 |
| `snippets-5` | pass | `65bb328b…` | 2026-10-18 |
| `snippets-6` | pass | `65bb328b…` | 2026-10-18 |
| `starter-1` | fail | `5266df62…` | 2026-10-22 |
| `starter-2` | partial | `5266df62…` | 2026-10-22 |
| `starter-demo-versus-site` | partial | `15036755…` | 2026-10-22 |
| `theme-selector-demo-1` | partial | `8b59f0a7…` | 2026-10-22 |
| `theming-1` | pass | `8b59f0a7…` | 2026-10-22 |
| `theming-2` | partial | `8b59f0a7…` | 2026-10-22 |
| `theming-3` | pass | `65bb328b…` | 2026-10-18 |
| `theming-4` | pass | `47cc2e30…` | 2026-10-22 |
| `theming-5` | pass | `65bb328b…` | 2026-10-18 |
| `theming-6` | pass | `65bb328b…` | 2026-10-18 |
| `toc-active-section` | pass | `47cc2e30…` | 2026-10-22 |
| `troubleshoot-publishing-task-1` | partial | `15036755…` | 2026-10-22 |
| `troubleshoot-yaml-task-1` | fail | `15036755…` | 2026-10-22 |
| `variables-1` | pass | `8b59f0a7…` | 2026-10-22 |
| `variables-2` | pass | `8b59f0a7…` | 2026-10-22 |
| `variables-3` | pass | `8b59f0a7…` | 2026-10-22 |
| `variables-unsupported` | pass | `5266df62…` | 2026-10-22 |
| `version-task-1` | partial | `5266df62…` | 2026-10-22 |
