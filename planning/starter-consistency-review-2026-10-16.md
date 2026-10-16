# Starter consistency after PR #142

Date: 16 October 2026. Baseline: `7701fb0b0`, main after merged
[PR #142](https://github.com/dieghernan/chulapa/pull/142).
Scope: one starter documentation block, not all remaining Diátaxis work.
Status: implementation ready for review; no new purity/adoption score.

## Initial review and selected delivery

| Surface | Current evidence | Decision |
| --- | --- | --- |
| `examples/`, four starter demos, guides 08/09 | Four identical README setup/publishing sequences compete with guide 09. Demos retain complete home/config specimens but omit the article front matter enabling the technical features; they are annotated documentation pages, not standalone starter sites. Project "Getting started" is fictional project copy. | Centralize preparation/preview/publication in existing guide 09. Keep complete sources/config specimens and visible samples, add actual blog article settings, label project copy and demo versus standalone behavior. Guide 08 retains contents/dependencies/limitations lookup. |
| Classic-navbar demo versus `_includes/navbar.html` | Demo has its own classic navbar markup, anchor dropdown toggles and private CDN dependency tags. Current component uses native dropdown buttons, aria-current and configurable expansion. | Next implementation block: establish source/output parity, reuse current component where feasible without a new public setting; test keyboard, mobile/desktop, active links, expansion and scripts. No navbar implementation change in this PR. |
| FAQ versus Global settings/Layout reference | FAQ still repeats short post/page, skin and skin-preview editing recipes despite existing guides 15/16/22. Reference now routes cloud/sharing/indexing/search tasks after #142; remaining mapping and option specimens are useful lookup, not automatically new tasks. | Separate final routing review. Retain precise defaults/fallbacks/snippet examples; replace demonstrated duplicate FAQ procedures with question-oriented links. No new option-per-page extraction proposed. |

No theme API, layouts, dependency declarations or example configuration/content
files are changed. Individual example READMEs identify contents and link guide
09 rather than maintaining their own installation sequence. No public URLs or
headings are retired. README entry links and demo destinations remain active.
The historical reassessments and scores remain untouched.

## Source and version reconciliation

- Four Gemfiles are identical: Jekyll `~> 4.4` with remote-theme, include-cache,
  GitHub metadata, paginate, sitemap, GFM parser, WEBrick, Windows timezone data
  and `ostruct`. Each configured plugin has an explicit gem dependency.
- All four demos' full `_config.yml` specimens and home front matter match their
  source files. Both blog demos retain article bodies and now show exact article
  front matter. Portfolio illustrative cards still link to their real source;
  copied starter cards link to generated projects. No invented filtering/sidebar.
- Examples use unpinned `dieghernan/chulapa`; development after v2.1.0 is required
  for Mermaid. The technical demo states the caveat beside its example; guide
  09 retains pinning advice and adds feature-specific verification/requirements.
- `llms.txt` now calls the demos annotated demonstrations, not standalone live
  previews. Context clarifies the same distinction, project placeholder copy and
  canonical setup guide; 44,968 UTF-8 bytes versus 44,988 at baseline. One focused
  evaluation case added. Existing starter cases in the three evaluation catalogs
  were reviewed; no new unsupported profile selector or automatic workflow.

## Validation

- `bundle install --local` resolves all four supplied Gemfiles using the cached
  gem set. No fresh-download, Windows or remote-host publishing claim.
- Each example built with Jekyll 4.4 and the current local theme at root and
  `/project`: eight builds. Actual configs/content used; remote-theme loading
  disabled only to select this checkout. Checked home canonical URLs, expected
  card counts and generated article/project destinations; technical article has
  Mermaid source/module and MathJax. This does not test downloading the remote
  theme or executing GitHub Actions in a new user's repository.
- Full local documentation build; 3,050 generated documentation links/fragments
  resolve. Exact displayed YAML compared with examples; all dependency lists and
  configured plugin dependencies reconciled.
- Six public pages previewed in Chromium at 320/1280 px without document-level
  horizontal overflow. Technical diagram renders and equation typesets; samples
  and code remain available. Long specimens scroll inside their code blocks.
- All 40 chatbot tests pass. They establish build/runtime properties, not answer
  accuracy, citation choice, response time or deployment. Context not manually
  deployed; proposed changes await merge and the normal Worker workflow.
- URLs/canonicals and live-example content preserved. No controls or interactions,
  metadata policy, manifest, service worker or cache behavior changes. Content
  checks do not establish full accessibility or offline/PWA readiness.

## Separate evidence protocol — still pending

No participants were recruited and no observed success/time improvements or live
chatbot measurements are reported. Do not substitute these technical checks for
this work. The following protocol is ready for a separately scheduled study:

1. Record consent, exact documentation/deployed-Worker revision, prior experience,
   device/browser, task start/end and assistance. Do not collect secrets or publish
   a participant's private repository content. Use new consenting participants;
   exploratory novice/expert samples are not population conversion estimates.
2. First publication: novice starts at guide 00 and uses the browser template;
   success is their chosen title and edited article visible at the public URL.
   Separate editing time from Actions/deployment waiting; log wrong turns and help.
3. Second tutorial: guide 59 after a working first site; success is the specified
   illustrated page reachable from the menu with descriptive alt text. Record
   completion, failures, assistance and post-task 1–7 ease plus reason.
4. Advanced lookup: experienced user finds an exact option/default/version in
   Global settings/Layout reference (for example `index_sort`, descending default,
   `index_sort_asc` and post-sort `index_items`). Record source/fragment, correctness,
   navigation path and time, without forcing a tutorial first.
5. Chatbot: use existing first-publication, photo/tutorial, advanced-option and
   extracted-guide cases plus `starter-1` and `starter-demo-versus-site`. For each
   answer record deployed revision, raw question/answer, status and end-to-end
   latency. Review facts, complete code, version limits and exact citation targets
   against docs. Repeat comparable requests under stated network/rate-limit
   conditions; report failures and samples separately, not a speed guarantee.
   Confirm the deployed context before treating results as tests of this PR.

Live evaluation was not executed for this starter editorial delivery; the new
context is not deployed and no human sessions were available. Exactness, links
and latency on the extracted guides, first publication, second tutorial and
advanced lookup remain open evidence tasks. This plan adds no fabricated results
and does not rescore the historical Diátaxis snapshots.

## Review correction: project demo button

The initial preview did not verify the header button's navigation target.
`absolute_url` resolves a fragment-only project link against the site root, so
this nested demo now uses `/demo/starter-project#getting-started` in its actual
front matter. The complete home-page source specimen remains unchanged: its
standalone `index.md` is at the site root. The demo explains that distinction.
Jekyll builds with empty and `/project` baseurl confirm exact generated button
URLs and one matching heading for both the demo and standalone home page. No
shared header behavior, public API or chatbot fact changes; no context update
or new live evaluation is needed for this correction.
