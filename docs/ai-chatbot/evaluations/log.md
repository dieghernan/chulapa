# Consolidated live evaluation log

## Mixed-topic PR review fixes — 24 October 2026

Addressed [provider inventories](https://github.com/dieghernan/chulapa/pull/182#discussion_r4366373627),
[RSS subscription URLs](https://github.com/dieghernan/chulapa/pull/182#discussion_r4366343475)
and [metadata with navigation](https://github.com/dieghernan/chulapa/pull/182#discussion_r4366343476).
Inventories/comparisons now populate the allowed focused scope as well as scores;
explicit metadata keys and subscription/link intent retain their source sections.
English/Spanish regressions and the complete local build/test suite pass:
117 tests, zero failures. Context facts and byte budgets are unchanged.

No live requests or deployment in this review round; current production remains
dfb48928. README updated. Public docs, llms.txt and ai-context.md need no changes
because this fixes retrieval of existing facts. No theme accessibility, SEO
metadata or PWA behavior changes.

Proposed next ten-question batch (not executed): three previous partials
(search-comments-4, comments-giscus-setup-1, provider-algolia-task-1), plus TOC with
comment inventory, TOC with seo_title, Person publisher with GA4, RSS in navbar,
English subscription link, Spanish subscription link and gem-based migration.
Record new mixed-case expectations before querying; retain all historical labels.

## Search dependencies: focused validation and closeout — 24 October 2026

Worker `dfb48928-319f-4cfe-ba33-e2b77822f968`, confirmed 100% traffic.
[One raw answer](search-dependency-focus-after-20261024.jsonl): HTTP 200, pass.
It names the shared helper/provider/store before the adapter, identifies the
single common-script include for navigation and cites the exact JavaScript
reference without changing the user's layout or URL. No version-specific
installation or exhaustive upgrade inventory was asked.

Both original failed tasks now have successful samples: Fuse on fd7168ad and
dependencies on dfb48928. Do not transfer the earlier Fuse result to this latest
deployment. Three follow-up requests total, no automatic retries or AI Search;
the ten-question baseline remains separate. 114 tests passed after the final
selector change; the first deployment also passed Wrangler dry-run.
[Final artifact manifest](search-dependency-deployment-20261024.json).

README and selective context updated; public guides and llms.txt need no edits
because their documented facts were already correct. No theme accessibility,
SEO metadata or PWA behavior changes. Existing model/output and context budgets
are unchanged. Earlier review fixes in #182 are also deployed, but their live
regressions were not rerun. The three partial tasks remain for the next batch.

## Search paths and dependencies: first validation — 24 October 2026

Worker `fd7168ad-bc0b-412f-a224-7fb0840622e0`, confirmed 100% traffic.
[Two raw answers](search-paths-dependencies-after-20261024.jsonl): two HTTP 200,
one pass (Fuse paths) and one partial (custom dependency troubleshooting).
Fuse now uses /find for both settings and correctly describes the local index.
The dependency answer names the shared helper/provider/store and navigation
script, but omits load ordering and invents an unrequested /find page example.
Its JavaScript source label also points at the generic search reference.

Added a focused dependency scope to retain the existing layout reference while
excluding generic setup examples unless configuration is explicitly requested.
114 tests pass after this adjustment. Library remains 56,998/57,000 bytes;
per-request cap remains 18,000 bytes. Only the partial case needs another query.
Fuse's pass belongs to fd7168ad, not to a subsequent deployment.

## Search and comments: ten-question review — 24 October 2026

Seven search and three comments questions on Worker
`09e75972-8ede-4630-ba6e-c5a504bc709c` (100% traffic): **5 pass, 3 partial,
2 fail, 0 unavailable**. Ten HTTP 200 responses; no retries or AI Search calls.
Review uses the actual task rather than requiring unasked setup/version details.
No historical answer labels were rewritten.

[Raw answers](search-comments-batch10-20261024.jsonl) and
[case-level review and proposed adjustments](search-comments-batch10-review-20261024.md).
Primary blockers are repeated baseurl in Fuse paths and missing custom-search
JavaScript dependency guidance. Partial answers concern maxwords recommendation,
Giscus prerequisites and Algolia installation/preservation steps. Review fixes
at local revision `63cc495d3` are not deployed; these results cannot validate them.
No code/context edits, deployment or second query round in this batch.

## PR review corrections: local validation — 24 October 2026

Ran one complete `npm test` round after authorization: build succeeded with
56,995/57,000 source-context bytes and all 112 tests passed, with no failures or
skips. This includes the new mixed-topic, feed coexistence/selection, custom-field
migration and gem-installation regressions for comments on #182 and #183.

Changes are being committed and pushed to the existing #182 branch. No live
queries or Worker deployment were performed; historical model-answer assessments
and deployed behavior are unchanged. These internal selection changes do not
alter theme accessibility, SEO metadata or PWA behavior.

## PR review corrections: local, awaiting validation — 24 October 2026

Addressed selector comments from PRs #182 and #183 locally: preserve explicitly
requested secondary topics in focused SEO/workflow/navigation questions, retain
both built-in feed selection and plugin coexistence recipes when requested,
avoid treating custom-field mentions as mapping-only lookups and include gem
installation for explicitly requested gem migrations. Replaced the URL-substring
test assertion flagged by CodeQL with an exact section-title assertion.

Prepared regression cases without running them. No tests, live queries, build,
commit, push or deployment were performed, as requested. Historical assessments
and the deployed Worker version remain unchanged; these edits have no new live
results. Public theme documentation, llms.txt and ai-context.md need no changes
because the supported settings and source facts are unchanged.

Review references: [#182 comments](https://github.com/dieghernan/chulapa/pull/182/files)
and [#183 comments](https://github.com/dieghernan/chulapa/pull/183/files).

## Navigation and TOC: validation and single-PR closeout — 24 October 2026

Four HTTP 200 answers on `09e75972-8ede-4630-ba6e-c5a504bc709c`:
**1 pass, 3 partial, 0 fail, 0 unavailable**. Header fields now use page front
matter with breadcrumb_list and complete icon classes; reading/pagination has
the correct source, clamp and non-enablement rule; the previously rejected
content TOC now delivers valid syntax. Remaining issues are task-specific
header verification, existing kramdown/parser preservation/site-wide scope,
and fuller open-panel keyboard explanation. No complete-resolution claim.

[Review](navigation-toc-after-20261024-review.md),
[structured review](navigation-toc-after-20261024-review.json),
[raw answers](navigation-toc-after-20261024.jsonl) and
[artifact hashes](navigation-toc-deployment-20261024.json).
Eight Worker requests in this navigation batch, no retries or AI Search.
This task's rubric follow-up plus navigation used 18 Worker requests; their
counts are not combined into an accuracy measure across criteria/versions.
108 tests passed; all three final YAML examples parsed and all four answers
passed source-URL/recipe guards. Deployed artifact hashes match; Wrangler
reconfirmed the same final version at 100% after review.
All work is consolidated into PR #182; #183 was integrated
only into its head branch, not main. Public guides/llms.txt already cover these
facts; internal README/evaluation policy updated, no theme UI/SEO/PWA changes.

## Navigation and TOC: deployment and PR consolidation — 24 October 2026

Deployed `09e75972-8ede-4630-ba6e-c5a504bc709c` after 108 tests, header
YAML parsing and Wrangler dry-run passed. Added a complete page-front-matter
breadcrumb/project_links recipe and accurate option/config sources. Focused
navigation selection separates header, reading/pagination, article TOC and
sidebar keyboard questions; prompt preserves version/Tab/Escape semantics and
permits the small separate code fragments required by a compound task.

[Artifact/version manifest](navigation-toc-deployment-20261024.json).
Context is 56,995 bytes within the unchanged 57,000 budget; selection cap/model/
output budget/bindings are unchanged. Existing guides already document the
facts; no theme behavior, public guide/llms.txt or UI/SEO/PWA changes. No AI
Search requests. Live four-case validation follows separately.

At the user's request all work is consolidated into PR #182. Pushing commit
d636dc099 into its head branch caused GitHub to mark stacked PR #183 merged
into fix/chatbot-case-sections; this did not merge anything into main. PR #182
is the only open PR for this work. Historical PR/evaluation records are retained.

## Navigation and TOC: baseline — 24 October 2026

Four requests on closeout Worker `09b4517c-3705-4009-a1bf-af30be43b5b5`:
**0 pass, 2 partial, 1 fail, 1 unavailable**. Header guidance misplaces
project_links in _config.yml and omits breadcrumb_list. Pagination points to
the wrong guide. Sidebar focus advice is correct at its core but misses the
release boundary. Content TOC returns a task-validation 503 fallback; no answer
was delivered, so no factual assessment or quota-exhaustion claim is made.
[Review](navigation-toc-before-20261024-review.md),
[raw](navigation-toc-before-20261024.jsonl) and
[structured review](navigation-toc-before-20261024-review.json).
No retry or AI Search calls. Work is isolated on fix/chatbot-navigation-toc;
feeds/migration and rubric audit are now in stacked PR #183, based on #182.

## Essential follow-up: validation and closeout — 24 October 2026

Four HTTP 200 answers on `09b4517c-3705-4009-a1bf-af30be43b5b5` under
the audited rubric: **2 pass, 2 partial, 0 fail**. Browser-title verification
and the sitemap-plugin prerequisite now pass; migration URL preservation is
explicit, but override/preview instructions remain incomplete. Feed selection
still omits date/defaults preservation despite correct include/exclude advice.
[Review](scoped-followup-after-20261024-review.md),
[raw](scoped-followup-after-20261024.jsonl) and
[structured review](scoped-followup-after-20261024-review.json).

Only four were repeated; two baseline canonical passes remain tied to the
prior Worker. Ten Worker requests in this scoped follow-up, no retries or
AI Search. 106 local tests passed. Historical broad-rubric records remain
unchanged; no changed-rubric or cross-version aggregate accuracy claim.
Source context stays within 57,000 bytes; no further inference is scheduled
for cosmetic or unasked background details. Public docs/llms.txt already
contain the facts; internal evaluation policy is documented in evaluation.md.

## Essential follow-up: deployment — 24 October 2026

Deployed `09b4517c-3705-4009-a1bf-af30be43b5b5` after 106 tests and a
Wrangler dry-run passed. Clarified rendered HTML title inspection and that
opening article URLs only verifies publication; prompt prioritizes migration
URL/override preservation, merging defaults, dates/link checks and the sitemap
plugin prerequisite. Consolidated duplicate context wording: 56,955 bytes,
within the existing 57,000 budget. No selection/output-budget/model changes.
[Artifact manifest](scoped-followup-deployment-20261024.json).
Only four still-partial cases are repeated. Existing public guides already
contain these facts; internal evaluation.md records the rubric policy, with no
public guide/llms.txt, theme UI/SEO/PWA or AI Search changes.

## Essential follow-up: scoped baseline — 24 October 2026

Six fresh HTTP 200 answers on `253c4a59-bd7d-4336-b3f3-c407f11f81e0`
under the audited task-scoped rubrics: **2 pass, 4 partial, 0 fail**. Canonical
cases now complete their actual task; four still miss essential migration URL
preservation, title verification, defaults preservation/link checks or the
sitemap prerequisite. Only these four will receive another live request.
[Review](scoped-followup-before-20261024-review.md),
[raw](scoped-followup-before-20261024.jsonl) and
[structured review](scoped-followup-before-20261024-review.json).
No AI Search queries or retries. Counts are not directly comparable to earlier
broader rubrics; the audit itself is not evidence of generation improvement.

## Task-scope rubric audit — 24 October 2026

Reviewed 11 partial cases against their actual questions and current guides.
Six retain essential-error/prerequisite follow-up; four complete the asked task
but were penalized for optional background, and one has a presentation-only
LaTeX issue. Updated catalog expectations with explicit task boundaries and
accuracy guards. Prior expectations, reasons and exact evidence versions/hashes
are recorded in the [audit](task-scope-audit-20261024.md) and
[audit JSON](task-scope-audit-20261024.json). Historical raw answers, reviews,
labels and counts are unchanged; no new live passes are claimed by this audit.
No inference, deployment, public guide or llms.txt change in this step.

## Feeds and migration: final validation — 24 October 2026

Six HTTP 200 answers on `253c4a59-bd7d-4336-b3f3-c407f11f81e0`:
**1 pass, 5 partial, 0 fail, 0 unavailable**. Baseline was 1 pass/4 partial/1 fail;
the intermediate round retained those six-case totals but introduced a different
layout error. Final answers now correctly use default/header_type: post,
exclude a single post with false, reject ordinary pages for built-in feeds and
separate output:true publication from feed selection. Coexistence no longer
adds an unrequested defaults recipe. Missing head-link/date/preservation details,
LaTeX arrows and imprecise opening-versus-publishing wording remain partial.

[Review](feeds-migration-final-20261024-review.md),
[structured review](feeds-migration-final-20261024-review.json),
[raw answers](feeds-migration-final-20261024.jsonl) and
[artifact/version manifest](feeds-migration-final-deployment-20261024.json).
Latest-status rows update six cases to this version and two SEO controls to the
intermediate version, preserving their earlier evidence. Total: 20 Worker
queries, zero retries and no AI Search calls. No measured neuron-savings claim.
105 local tests passed; all four final YAML examples parsed, all six answer
source-URL checks passed and artifact hashes match the deployment manifest.
Wrangler reconfirmed the same final version at 100% after review.
No public guide/llms.txt or theme UI/SEO/PWA change is
needed. Sections remain partially resolved; no further live queries in this batch.

## Feeds and migration: layout/coexistence deployment — 24 October 2026

Deployed `253c4a59-bd7d-4336-b3f3-c407f11f81e0` after 105 local tests
and Wrangler dry-run passed. Migration explicitly rejects the old layout: post
and supplies default/header_type: post YAML. Plugin coexistence now has a
separate section without a defaults recipe; ordinary feed selection keeps date,
false override and output rules. Both feed sections remain available for whole
migration; mapping examples use plain prose instead of arrow notation.

[Artifact/version manifest](feeds-migration-final-deployment-20261024.json).
Library is 56,996 bytes within the already reviewed 57,000 budget. Per-query
cap and inference settings are unchanged. README documents the section split.
No AI Search requests or public theme changes. Six-case live validation follows;
the two earlier SEO controls remain evidence only for their recorded version.

## Feeds and migration: first validation — 24 October 2026

Eight HTTP 200 responses on `98c97e53-138a-4460-922f-b5487c2a3c82`:
**1 pass, 6 partial, 1 fail**. The original six yield 1 pass/4 partial/1 fail;
two SEO controls remain partial without reintroducing invalid image YAML or
incorrect canonical exclusion. Feed selection now correctly excludes a post
with false and rejects ordinary pages. Full migration introduces a different
error: it treats layout: post as a built-in layout adding header_type. The
coexistence answer still omits subscriber/head-link details and adds a recipe.
These results do not establish overall quality improvement for the six.

[Review](feeds-migration-after-20261024-review.md),
[structured review](feeds-migration-after-20261024-review.json) and
[raw answers](feeds-migration-after-20261024.jsonl).
No retries or AI Search requests. A second focused correction will address the
layout claim and isolate plugin coexistence from the posts-default recipe.

## Feeds and migration: context deployment — 24 October 2026

Deployed `98c97e53-138a-4460-922f-b5487c2a3c82` after 104 local tests
and Wrangler dry-run passed. Added explicit single-post false override,
standalone-page/date/collection-output constraints, built-in head advertisement
and a separate migration-field reference with toc/comments/search mappings.
Feed/mapping queries now select focused sections; mixed canonical/feed,
Spanish, public RSS and inherited h-feed cases have offline regression coverage.

[Deployed artifact manifest](feeds-migration-deployment-20261024.json).
Reviewed source-library budget grows by 1,000 bytes to 57,000 (actual 56,987),
including consolidation of a repeated feed warning. The per-query cap stays
18,000; six selected contexts are 2,638–6,079 bytes. This does not establish
measured neuron savings. Model, output budget, bindings, limiter and compatibility
date are unchanged. README records selection/budget changes. Existing public
guides already document these facts; no public guide/llms.txt or theme
accessibility, generated SEO or PWA changes are needed. Live validation follows
separately, with two SEO controls. No AI Search calls or paid fallback.

## Feeds and migration: baseline — 24 October 2026

Six cases, including collection-output regression control, were sent to Worker
`ac010481-bedc-448a-94be-7512e5825e92` (100% traffic verified before queries).
All returned HTTP 200: **1 pass, 4 partial, 1 fail**. Feed selection still
incorrectly proposes a standalone page and denies the documented per-post
false flag. Migration field lookup omits toc/comments mappings; coexistence
and full migration answers omit required constraints. Collection-output advice
is correct at its core but misses preservation and validation steps.

[Review](feeds-migration-before-20261024-review.md),
[structured review](feeds-migration-before-20261024-review.json) and
[raw answers](feeds-migration-before-20261024.jsonl).
No retries, AI Search queries or deployment in this round. Work continues on
`fix/chatbot-feeds-migration`, based on the first SEO batch; PR #182 is unchanged.

## SEO batch 1: final validation — 24 October 2026

Validated `ac010481-bedc-448a-94be-7512e5825e92` (100% traffic): seven
HTTP 200 answers, **1 pass, 6 partial, 0 fail, 0 unavailable**. The five original
fail/partial cases are now all partial (previous baseline: 3 fail, 2 partial).
Two regression cases yielded one pass and one partial. Valid image YAML,
unchanged visible content, correct copy exclusion and local/Algolia controls
are observed improvements; the original-target sitemap overclaim, HTML title
inspection advice and remaining caveats prevent declaring SEO complete.

[Case review](seo-batch1-final-20261024-review.md),
[structured review](seo-batch1-final-20261024-review.json),
[raw answers](seo-batch1-final-20261024.jsonl) and
[deployed artifact hashes](seo-batch1-final-deployment-20261024.json).
Latest-status rows below are updated only for these seven cases; older evidence
is retained. Total for this SEO batch: 17 Worker inference requests across three
rounds, no retries or AI Search calls. Per-answer neuron use is unavailable.
101 local tests passed. All seven final YAML examples parsed with Ruby/Psych;
source-URL checks passed for all seven answers and artifact hashes match the
deployment manifest. Wrangler reconfirmed the same version at 100% after review.
Public docs/llms.txt already cover the facts; theme
accessibility, generated SEO and PWA behavior did not change. No further queries
were made to turn remaining partial answers into unsupported success claims.

## SEO batch 1: focused-context deployment — 24 October 2026

Deployed `ac010481-bedc-448a-94be-7512e5825e92` to 100% traffic after
101 local tests and Wrangler dry-run passed. Clarified that sitemap exclusion
targets the copy, supplied a type-only publisher edit and corrected exact social
metadata names. Focused SEO selection now removes irrelevant tutorials,
analytics and media sections; combined analytics/feed and documentation-discovery
questions keep broader selection. English/Spanish and combined-scope regressions
are covered locally. Five task contexts now contain 3,002–6,203 UTF-8 bytes;
this does not independently establish neuron savings.

[Artifact/version manifest](seo-batch1-final-deployment-20261024.json).
Library is 55,983 bytes under the reviewed 56,000 budget; per-query cap stays
18,000. Model, bindings, rate limit and compatibility date are unchanged.
README describes selection behavior. Public guides already contain the facts;
no llms.txt or theme UI/SEO/PWA change is needed. No AI Search requests.
Live validation follows separately, including two previously passing SEO cases.

## SEO batch 1: first validation — 24 October 2026

Five post-deployment requests on `87bf899e-cfd1-47e7-b20c-523fa693a92b`
returned HTTP 200: **0 pass, 4 partial, 1 fail**. Social-image YAML and local
search exclusion improved. Canonical explanation now wrongly calls the original
URL the sitemap exclusion target; the copy must be excluded. Other answers
still omit rubric details; metadata guidance invents an `og:image/alt` tag.
Do not treat these partial responses as completed corrections.

[Review](seo-batch1-after-20261024-review.md),
[structured review](seo-batch1-after-20261024-review.json) and
[raw responses](seo-batch1-after-20261024.jsonl).
No retries or AI Search requests. Next correction stays within this SEO batch.

## SEO batch 1: context deployment — 24 October 2026

Deployed Worker `87bf899e-cfd1-47e7-b20c-523fa693a92b` to 100% traffic
with Wrangler 4.150.0, retaining existing variables, AI binding, rate limiter,
model and compatibility date. Added plain-path social-image YAML, independent
crawler/sitemap/local/Algolia controls, publisher avatar/check guidance and an
explicit canonical-versus-GoatCounter boundary. Prompt reinforces these rules.

All 100 local tests and Wrangler dry-run passed. Reviewed library budget grows
from 54,000 to 56,000 UTF-8 bytes (actual 55,992); selected context remains capped
at 18,000 bytes per request. The [artifact manifest](seo-batch1-deployment-20261024.json)
records source hashes and deployed version. README documents the budget change.
The existing public guides already contain these facts, so no public guide or
llms.txt update is needed. Theme accessibility, rendered SEO and PWA behavior
are unchanged. Live answer validation is recorded separately; deployment alone
is not answer-quality evidence. No AI Search calls or configuration changes.

## SEO batch 1: baseline — 24 October 2026

Reevaluated the five SEO cases previously marked fail/partial on Worker
`810c8961-e548-43e5-adb7-0a7e2501d65e` (100% traffic, verified before
queries). All five requests returned HTTP 200; manual review found **0 pass,
2 partial and 3 fail**. Canonical guidance incorrectly borrowed GoatCounter's
cross-domain rule, social-image YAML was invalid and changed visible content,
and search visibility omitted the local exclusion flag. Publisher/canonical
recipes omitted preservation and verification details.

[Review](seo-batch1-before-20261024-review.md),
[structured review](seo-batch1-before-20261024-review.json) and
[raw responses](seo-batch1-before-20261024.jsonl).
No retries, deployment or AI Search requests in this round. These observations
apply to the recorded version, not all SEO answers.

## Response status by section — 24 October 2026

Added a [section-level evidence summary](section-status-2026-10-24.md) using the
corrected catalog sections, the per-case historical table and later explicit
retests/manual reassessments. Unavailable retries are tracked separately from
answer quality. Worker and AI Search results remain separate. This is a backlog
inventory across historical revisions, not a current-runtime accuracy measure.
No live requests, deployment or public documentation/context changes were made.

## Catalog section review — 24 October 2026

Reviewed the functional `section` of all 160 questions in the three evaluation
catalogs and corrected 109 assignments. Replaced source-based groups (`faq`,
`community`, `reference-edge-cases`) and mixed groups (`search-comments`) with
functional topics. Filled missing sections and normalized capitalization.
Split broad appearance, layout and configuration groups into areas such as
`seo`, `layouts`, `include-cache`, `microformats`, `toc`, `navbar`, `footer`,
`skins`, `autothemer`, `fonts`, `analytics`, `search` and `comments`.

Use `section` as the primary subject of the requested task, rather than the
source page or case-ID prefix. Cross-topic cases keep one primary section:
search visibility spanning crawlers and indexes belongs to `seo`, snippet
parameter comparisons to `snippets`, and guide-discovery questions to
`documentation`. Community provenance remains in the catalog filename and
source URL. IDs, questions, expected answers and historical evidence are
unchanged; historical section labels in recorded runs are not rewritten.

All 99 chatbot tests passed. A comparison against HEAD confirmed that only
section fields changed in the catalogs. This is catalog maintenance, not an
answer-quality correction or reevaluation. No live inference or deployment
was performed. Public documentation, llms.txt and ai-context.md need no changes
because supported behavior and advice are unchanged. Accessibility, SEO output
and PWA behavior are unaffected.

## Autothemer review correction — 23 October 2026

Addressed PR review comment
[preserve the current skin](https://github.com/dieghernan/chulapa/pull/179#discussion_r4361606971).
Removed `skin: auto` from the generic context example and aligned `theming-2`
with the existing published guides: preserve the current skin unless a skin
change is requested. The independent `skin: auto` generator is not required
to enable the later `autothemer` step. Added a context-selection regression
requiring a complete purple-primary example without a skin replacement.

The earlier C assessment for `theming-2` reflects its then-incorrect rubric;
it is not evidence that the public guide needed to mandate `skin: auto`.
Historical API evidence is unchanged. No new live inference was made for this
correction, and its Worker deployment is pending the corrected PR publication.

## Final integration checks — 23 October 2026

Cloudflare confirms 69 completed documents, 0 queued, 0 running and 0 errors
after the hardened synchronization run. Local checks passed: 12 sync tests,
99 chatbot tests, 52 theme JavaScript tests, workflow validation with
actionlint and the 69-document offline extraction check. Changed files were
checked against the local API token without exposing it; JSONL evidence parses.

The broader JavaScript check exposed an inherited package-scope regression:
root `type: module` made existing CommonJS tests fail before running. Removed
that setting; indexing scripts already use `.mjs` and retain ES module semantics.
No production backend migration or additional live inference was performed.

## Five versus ten context chunks — 23 October 2026

Ran exactly two chat-completions requests for `configuration-4`, with
`max_num_results` 5 and 10, similarity cache disabled per request, the same
explicit current instance system prompt and pinned
`@cf/meta/llama-3.3-70b-instruct-fp8-fast` model. No separate Search calls or
retries were made. Evidence:
[paired context-limit check](ai-search-context-5-vs-10-2026-10-23T15-59-48-463Z.jsonl).

Both requests returned HTTP 200, the same three source chunks and identical
answers, with finish reason `stop`. Each reported 1,771 prompt tokens,
124 completion tokens, 1,895 total tokens, zero cached prompt tokens and
72.6243 neurons. Summed reported usage was 145.2486 neurons; response cache
headers were not recorded, so these numbers are reported usage rather than
independently verified billing. Reranking/thresholding returned fewer than
either requested maximum: this pair cannot establish savings from a five-chunk
limit and does not justify changing the instance default.

The answer correctly places `gtag_id` in `_config.yml`, identifies `G-` IDs,
leaves `analytics_id` empty for GA4-only use and explains the independent
Universal Analytics snippet. It gives a complete small configuration example
but omits source citations. No production configuration was changed.

## Hardened index sync live check — 23 October 2026

Ran `node --env-file=.env scripts/sync-ai-search.mjs docs/_site/docs` against
the populated `chulapa-ai-search` instance with the hardened sync script.
Local tree/sitemap validation and strict remote pagination completed before
uploads. The command exited successfully with 69 uploads, 1 redirect/noindex
skipped and 0 stale deletions. No duplicate-key 409 occurred and `--prune`
was not enabled. This confirms the upload path on this instance at this time;
the 409 and deletion failure paths remain covered by offline tests, not by
destructive live testing.

The immediate Cloudflare status was 69 queued, 0 running, 0 completed and
0 errors. Upload acceptance does not establish completed ingestion or answer
quality; no chat-generation request was sent. No Git push was made.

## Local context deployment and index upload — 23 October 2026

At the user's request, deployed the local Worker with the unpinned Chulapa 101
and Algolia example-action guidance, without pushing Git changes. Wrangler
4.150.0 dry-run succeeded; deployment version is
`4577d411-8e64-4001-938d-1d1ab64df64b`. The widget endpoint returned HTTP 200.
The preceding local suite passed all 99 tests. No answer-quality inference
was made as part of this deployment check.

Built local documentation with production Jekyll and `/chulapa` baseurl,
verified the two edited guides in generated HTML and ran the existing AI Search
sync script. It reported 69 uploads, 1 redirect skipped and 0 stale deletions.
Initial ingestion status showed 40 queued, 29 running and 0 errors; uploading
alone does not establish that all updated chunks are searchable yet.
Follow-up confirmed `00-start.html` and `37-algolia-search.html` completed
without errors. The last overall check showed 68 completed, 1 running,
0 queued and 0 errors; full-corpus completion remains pending.

Public Pages and GitHub workflows have not been updated remotely. Until the
local documentation changes are published, chatbot/index content can be ahead
of the public guides. The Worker still uses its existing manual context
backend; this was a content update, not an AI Search backend migration.

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
the records available on 22 October 2026, with subsequent dated batch reviews
updating only the cases they actually evaluated. The test date is taken from the latest
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
| `canonical-article-task-1` | pass | `253c4a59…` | 2026-10-24 |
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
| `community-4` | pass | `253c4a59…` | 2026-10-24 |
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
| `content-toc-task-1` | partial | `09e75972…` | 2026-10-24 |
| `custom-head-task-1` | partial | `47cc2e30…` | 2026-10-22 |
| `custom-search-script-dependencies` | pass | `dfb48928…` | 2026-10-24 |
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
| `feed-coexistence-1` | partial | `253c4a59…` | 2026-10-24 |
| `feed-collection-output-1` | partial | `253c4a59…` | 2026-10-24 |
| `feed-selection-1` | partial | `09b4517c…` | 2026-10-24 |
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
| `migration-fields-lookup-1` | partial | `253c4a59…` | 2026-10-24 |
| `migration-theme-1` | partial | `09b4517c…` | 2026-10-24 |
| `navigation-1` | pass | `5266df62…` | 2026-10-22 |
| `navigation-2` | partial | `09e75972…` | 2026-10-24 |
| `navigation-3` | pass | `09e75972…` | 2026-10-24 |
| `navigation-edit-existing-1` | pass | `47cc2e30…` | 2026-10-22 |
| `person-publisher-task-1` | partial | `ac010481…` | 2026-10-24 |
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
| `search-fusejs-setup-1` | pass | `fd7168ad…` | 2026-10-24 |
| `search-no-navbar-links-1` | pass | `15036755…` | 2026-10-22 |
| `search-visibility-task-1` | pass | `09b4517c…` | 2026-10-24 |
| `second-photo-tutorial-1` | partial | `d0e281c2…` | 2026-10-22 |
| `semantic-html-accessibility` | fail | `47cc2e30…` | 2026-10-22 |
| `seo-1` | pass | `253c4a59…` | 2026-10-24 |
| `seo-2` | pass | `09b4517c…` | 2026-10-24 |
| `seo-3` | pass | `ac010481…` | 2026-10-24 |
| `seo-4` | pass | `5266df62…` | 2026-10-22 |
| `sharing-task-1` | partial | `98c97e53…` | 2026-10-24 |
| `sidebar-accessibility-focus` | partial | `09e75972…` | 2026-10-24 |
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

## AI Search comparison — 22 October 2026

Evaluated the same catalog cases with the current Worker baseline and the
Cloudflare AI Search instance `chulapa-ai-search` / `default`. No Worker or
index changes were made. Search retrieval and chat generation each returned
HTTP 200 for all 9 AI Search cases; the first 3 were also sent to the current
Worker, all HTTP 200. These are single observations, not accuracy or
performance guarantees.

Evidence: [AI Search three-case smoke](ai-search-smoke.jsonl),
[matching current-Worker baseline](chatbot-baseline-smoke.jsonl) and
[six additional #179 correction cases](ai-search-pr179-corrections.jsonl).
The AI Search REST responses wrapped results in `{success, result}` for search;
chat returned model output and `usage`. The 3-case AI Search smoke reported
18,955 total chat tokens, 566.587 neurons and 6,683 ms combined measured
search-plus-chat request time. The matching Worker responses exposed no usage
field and took 11,927 ms combined. These small sequential runs are not
comparable latency benchmarks; the Worker does not provide token data here.
The six additional AI Search-only cases reported 38,129 chat tokens and
1,250.884 neurons; they have no matching new Worker run.

| Case | Current Worker baseline | AI Search |
| --- | --- | --- |
| `theming-2` | Correct sibling nesting in the YAML, but contradictory prose says `primary` belongs inside `vars`; no `skin: auto`. | Uses `skin: none`; retrieved docs also contain the separate `skin: auto` guidance. Clarify the intended recipe rather than deciding from this run. |
| `skin-font-failure-1` | Gives a nested `chulapa-skin.skin` example and mentions complete CSS/fallbacks, but omits some release and failure details. | Similar partial answer; the retrieval chunks omit `22-choose-skin.html`, despite citing it. |
| `theme-selector-demo-1` | Correctly denies activation, supplies a valid independent Light/Dark mapping and v2.2.0 limit. | Correctly denies activation and links the guide, but does not show the configuration or version limit. |

### #179 case assessment

`A` means the published source was retrieved with the needed information;
`B` means the answer exists in published docs but key chunks were not
retrieved; `C` means the published guidance is ambiguous or incomplete and
should be clarified in the docs; `D` means the specific manual context
correction duplicates explicit, retrieved documentation. These labels assess
the source/retrieval, not answer quality: generation can still omit or
contradict retrieved facts.

| Case | Class | Retrieval and generation observation |
| --- | --- | --- |
| `theming-2` | C | Retrieved `27-autothemer.html` and `03-theming.html`; generated `skin: none`, while the case expects `skin: auto`. The public guide recommends `none` for an unassigned palette and separately describes `auto`; clarify when to use each and align the case before treating either answer as wrong. |
| `configuration-3` | A | `60-person-publisher.html` ranked first (0.756). The answer covered Person, image/URL and guest authors, but omitted the Organization default and preserving an existing mapping. |
| `configuration-4` | A | `19-google-analytics.html` ranked first (0.785). The answer correctly distinguished `gtag_id` and retired `analytics_id` but incorrectly warned that configuring both may create a duplicate-script issue; the documentation says the snippets load independently. This is a generation error, not a missing-source result. |
| `accessibility-1` | A | `48-accessibility-reference.html` ranked first (0.630); answer correctly retained TOC Tab navigation, rejected modal/focus-trap behavior and WCAG certification. |
| `beginner-post-1` | A | Starter and post guides ranked in the top results; answer gave the GitHub file workflow and a complete post example. |
| `beginner-image-1` | A | `17-add-image.html` ranked first (0.704); answer included upload instructions, descriptive alt text and `relative_url`. |
| `person-publisher-task-1` | A | `60-person-publisher.html` ranked first (0.626); answer covered ignored logo, image and independent guest authors. |
| `skin-font-failure-1` | B | Retrieved `24-change-fonts.html`, but not `22-choose-skin.html`, which contains the full failure/recovery behavior. The answer cited that unreturned page and omitted the v2.1.0 boundary and incomplete-CSS fallback details. |
| `theme-selector-demo-1` | D | `22-choose-skin.html` ranked first and explicitly says the component demo is illustrative. The answer correctly denied that the demo enables dark mode; its specific context reminder is redundant, though the answer omitted the guide's merge/preserve instructions. |

### Context recommendation

Keep `ai-context.md` for now; do not remove it based on these one-shot results.
Clarify the `skin: auto` versus `skin: none` distinction in the published
Autothemer guide and align `theming-2`. Keep the short font-failure summary
until retrieval reliably includes the selector guide for that question; do not
duplicate the full guide in context. The demo-selector reminder is a candidate
for eventual removal because the public guide already states it and retrieval
found it. Person, GA4, accessibility and beginner instructions are also
available in retrieved public pages, but the GA4 generation error and omissions
in other answers warrant repeated evaluation before removing their compact
guardrails. No public Chulapa guide, `ai-context.md` or index content was
changed in this run.

## Retest of ten previous chatbot failures — 22 October 2026

Selected ten distinct catalog questions that had prior manual `fail`
assessments, spanning skins, analytics, custom search, accessibility,
navigation, starter projects, Google search, YAML, social metadata and search
visibility. The prior labels came from several Worker versions, so they are
historical failure evidence, not claims about one identical runtime.

The same questions were then sent to the live chatbot endpoint and to AI Search
retrieval plus chat. All 10 chatbot requests and all 20 AI Search phase requests
returned HTTP 200. The live baseline JSONL records status, Cloudflare Ray and
duration, but not a Worker version; attribute it only to the endpoint response
at this run time. No retries were made.

Evidence: [live chatbot responses](chatbot-failure10-20261022.jsonl) and
[AI Search retrieval and generation](ai-search-failure10-20261022.jsonl).
Manual outcome counts against each case's current expected answer:

| System | Pass | Partial | Fail | Measured duration | Usage |
| --- | ---: | ---: | ---: | ---: | --- |
| Live chatbot | 2 | 4 | 4 | 49,125 ms across 10 requests | No token usage in response |
| AI Search | 1 | 6 | 3 | 117,335 ms across 20 Search + chat requests | 58,283 chat tokens; 1,910.725 neurons |

The elapsed totals are not a latency comparison: AI Search makes two API
requests per question, runs sequentially, and includes cooling pauses between
batches. Neuron/token use is not comparable to the Worker response because
the latter exposes no usage data.

| Case | Prior failure | Live chatbot retest | AI Search retest | Retrieval / main observation |
| --- | --- | --- | --- | --- |
| `skins-bootswatch-originals-1` | Invalid skin-setting example and inaccurate palette claim. | **Pass** — correctly describes the original Bootswatch palette and contrast limitation. | **Pass** — correctly says the original palettes remain unchanged. | `23-change-color.html` ranked first (0.574); the source supported both answers. |
| `goatcounter-analytics` | Incorrect advice about switching to Google-only analytics. | **Pass** — clarifies the services are independent and that GoatCounter is not automatic replacement. | **Partial** — says leaving `gtag_id` empty gives GoatCounter-only, but fails to account for `analytics_id` also loading independently. | Retrieved `18-goatcounter.html` (0.712) and `19-google-analytics.html` (0.621); generation still omitted a required distinction. |
| `custom-search-script-dependencies` | Wrong script load order. | **Partial** — names adapter, provider/store and FAB dependency, but does not state the required load order. | **Partial** — identifies the current search page/provider setup and FAB style, but omits the provider/store-before-adapter sequence. | Search-provider guides ranked first; `04-layouts.html`, which documents shared script dependencies and custom shells, was not among the top retrieved chunks. |
| `semantic-html-accessibility` | Unsupported claims and missing requested search/Welcomments details. | **Fail** — repeats unsupported accessibility assertions and omits required provider limits. | **Fail** — switches to unrelated font/video guidance and does not answer the requested semantic changes. | The accessibility reference was only rank 8; the answer did not use it to cover the question. |
| `navigation-2` | Recommended navbar configuration instead of the page-header button. | **Fail** — still recommends `navbar.nav` rather than `project_links`. | **Fail** — gives a valid `project_links` button, but incorrectly proposes a table of contents as breadcrumbs. | `04-layouts.html` was retrieved at rank 2; generation contradicted the source for breadcrumbs. |
| `starter-1` | Confused starter deployment capabilities. | **Partial** — states there is no included workflow and no filtering, but blurs the portfolio example with the Chulapa 101 workflow. | **Partial** — correctly identifies the project collection, two projects, no filtering and no included workflow, but does not recommend Chulapa 101 as the ready-publishing path. | `08-starter-examples.html` was retrieved; most core facts were present. |
| `provider-google-task-1` | Omitted actionable Google CSE setup. | **Partial** — correctly says rebuilds do not upload to Google and names `google_cse_id`, but omits `search.provider: google` and the matching search page. | **Fail** — incorrectly suggests a Jekyll Algolia plugin as a separate way to upload an index to Google; omits the Google provider setup. | `36-google-search.html` ranked first (0.726); this was a generation error despite relevant retrieval. |
| `troubleshoot-yaml-task-1` | Answered with unrelated skin instructions. | **Partial** — rejects replacing the config and mentions duplicate mappings/field placement, but lacks a focused check of the failed file/line and nearby edit. | **Partial** — correctly distinguishes valid YAML syntax from invalid theme settings and links the YAML guide, but remains generic and omits the failed line/edit workflow. | `43-yaml-errors.html` ranked first (0.665); substantial source content was retrieved but incompletely applied. |
| `sharing-task-1` | Invalid Liquid-in-YAML and unwanted visible header image. | **Fail** — repeats unquoted Liquid expressions and adds `header_img` despite the requested constraint. | **Partial** — uses appropriate social/article metadata fields, avoids `header_img` and advises uploading/checking the image, but omits `og_image_alt` and some URL/baseurl checks. | `64-post-sharing.html` ranked first (0.718), followed by the image guide; retrieval was strong. |
| `search-visibility-task-1` | Omitted the local-search exclusion. | **Fail** — omits `include_on_search: false`. | **Partial** — includes independent `robots`, sitemap, local-search and Algolia exclusions, but omits verification/re-upload details and some indexing limitations. | `65-search-visibility.html` ranked first (0.796); retrieval found the right documentation. |

### Follow-up

The live retest shows some prior errors have improved, but 8 of these 10
answers remain partial or incorrect. AI Search resolved the skin example and
included the local-search exclusion setting, though its answer omitted
verification and indexing limitations; it still failed or partially answered
9 of 10.
The primary next improvements are better retrieval coverage for custom
JavaScript dependencies/accessibility and stronger generation checks for
answering only from retrieved sources, preserving configuration distinctions,
and avoiding invalid or out-of-scope examples. Keep the existing chatbot
baseline and do not migrate the production Worker based on this single batch.

## Additional ten historical failures — chatbot unavailable, 22 October 2026

A second set of ten distinct cases with prior chatbot failures was submitted
to the live chatbot endpoint. All ten requests returned HTTP 503 with
`{"error":"AI is unavailable. Please use site search."}`. These are
unavailable responses, not answer-quality failures, and cannot be compared
with AI Search answer quality. A separate partial AI Search evidence file
exists for `layouts-3`: retrieval returned HTTP 200 and generation HTTP 429.
It contains no usable answer and does not establish results for the other
nine questions. See [partial AI Search evidence](ai-search-failure10b-20261022.jsonl).

Evidence: [chatbot responses](chatbot-failure10b-20261022.jsonl).

| Case | Chatbot result |
| --- | --- |
| `comments-welcomments-task-1` | Unavailable (503) |
| `cloud-task-1` | Unavailable (503) |
| `cloud-demo-fragments` | Unavailable (503) |
| `community-165` | Unavailable (503) |
| `feed-selection-1` | Unavailable (503) |
| `migration-fields-lookup-1` | Unavailable (503) |
| `format-footnote-task-1` | Unavailable (503) |
| `layouts-3` | Unavailable (503) |
| `reference-edge-cases-5` | Unavailable (503) |
| `documentation-search-topics` | Unavailable (503) |

All requests returned the same service-level error, including those after the
first response; this establishes that the chatbot was unavailable during this
run, but does not establish whether its cause was quota exhaustion, a
temporary upstream issue or another service condition. The last known dashboard
usage from the earlier run is not a live balance. Further paired evaluation
should wait until both services are available.

## Evaluator verification and migration follow-up — 22 October 2026

See the [additional ten-case historical review](review-additional10-20261022.md)
for layout, author and installation findings. A live Chrome check confirmed
11.02k/10k daily neurons used and an exceeded-limit notice, resetting at
00:00 UTC. Further live inference was deferred; no fresh answer-quality
results are claimed for those ten cases.

Reused the existing three-case paired smoke evidence rather than repeating
quota-consuming requests after the recorded 503/429 responses. Verified the
current namespace-scoped endpoints and messages payload against Cloudflare's
REST documentation. New runs retain generation finish reasons and total
returned chunk counts before clipping. Historical evidence is unchanged.

The nine-case A/B/C/D table above covers the initial correction sample, not
every change in #179. The PR also changes layout scope, cloud setup,
related/random headings, inherited microformats and include caching. Those
corrections remain unclassified pending focused retrieval and generation
checks; do not treat absence from the table as evidence of redundancy.

Before migrating the Worker:

1. Clarify the Autothemer recipe in published docs and align its evaluation
   expectation, then sync through the existing indexing workflow.
2. Repeat the affected cases with both services available, including the
   remaining layout/cloud/microformat corrections. Inspect the chat request's
   own context chunks: its retrieval can differ from the separate Search call.
3. Record the source revision, instance settings, model and index state with
   the next run. Add comparable baseline usage instrumentation only in a
   separately scoped Worker change; the current baseline cannot establish cost.
4. Resolve generation errors and source omissions before choosing migration
   criteria. Then prepare an isolated Worker integration preserving validation,
   source-link restrictions, rate limiting and failure handling.

Only internal evaluation tooling and records changed. Public theme behavior,
accessibility, SEO and PWA behavior are unaffected; no browser audit or public
guide/llms.txt update is needed. The context remains intact and no Worker was
deployed.

## AI Search configuration tuning — 23 October 2026

Enabled `@cf/baai/bge-reranker-base` reranking and configured a concise Chulapa
generation prompt requiring retrieved evidence, version distinctions, correct
configuration scope and complete examples. The prompt treats retrieved text as
reference data and prohibits invented citations. Saved the prior settings and
applied values in [configuration snapshot](ai-search-tuning-20261023.json).
Read-back through the API confirmed both settings. Index methods, chunk size,
overlap, query rewriting and instance caching were retained.

Ran `evaluate-ai-search-tuning.mjs` with caching disabled per request and a
pinned `@cf/meta/llama-3.3-70b-instruct-fp8-fast` generation model. The first
case, `configuration-4`, returned Search HTTP 200 and chat HTTP 429. The runner
stopped without sending the remaining two cases. Evidence is saved in
[partial tuning smoke](ai-search-tuned-20261023.jsonl).

The first retrieved source was `19-google-analytics.html`, with vector score
0.785 and reranking score 0.995. These scores measure different stages and are
not comparable quality percentages. A chunk from `07-migration.html` moved
from vector rank 9 into the third returned position. Reranking is operational,
but no generated answer was available: no answer-quality improvement is
claimed. The HTTP 429 alone does not establish its cause.

All nine evaluator unit tests passed. Public documentation, llms.txt,
ai-context.md, production Worker and the indexed documents were unchanged;
the experiment does not change public accessibility, SEO or PWA behavior.
