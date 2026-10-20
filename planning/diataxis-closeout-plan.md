# Diataxis closeout and release preparation plan

Updated: 20 October 2026. Current delivery baseline: main `58966b5dd`, after #172 and the Flatly alert correction.
Status: agreed editorial/correction scope and final reassessment delivered in merged [PR #161](https://github.com/dieghernan/chulapa/pull/161). Release 2.2.0 is prepared but unpublished. Current-main Pages/CI and #172 Worker lineage are recorded below.
See the [final reassessment](diataxis-final-reassessment-2026-10-16.md) for current scores; earlier tables remain historical.
This is the current execution plan. Keep historical audits, scores, synthetic
reviews and raw evaluations unchanged; update this plan with actual delivery
status and links after each bounded PR. Documentation is written in English.

## Current handoff after #172 and Flatly correction

The editorial/correction program is closed. #163 prepared 2.2.0 without publishing;
#164 merged chatbot context/citation/answer checks; #166 merged the optional
Light/Dark/Auto selector and its review fixes. #168 adds shared recovery for
Google Fonts import failures while rejecting incomplete/unverified essential CSS.
#170 adds the bounded default-layout/keyboard/microformats correction.
#172 and subsequent commits improve GitDev/skin contrast while preserving
original primary colors; the latest commit corrects Flatly alert text/links.
The current source is `58966b5ddf1f8bd9059c8ea7e466c5ba4a700884`.

[Current candidate evidence](release-candidate-after170-2026-10-19.md) records
exact-source Pages/regression success and the rebuilt artifact validation.
Worker context changed in #172 and was deployed from `c1edaae46`, run
39427985494, version `003c283d-7144-4aae-badc-4e4a24e7706d`. The later Flatly
commit does not change Worker files; it does not imply a new Worker deployment.
Older candidate hashes/checks remain historical. Deployment/tests do not establish
live answer accuracy or remove the recorded Netlify/proxy limitations.

Next steps:

1. Review and approve the revised 2.2.0 release scope/notes including #164/#166/#168/#170/#172 and the latest Flatly correction;
   the 16 October approval covers the original draft only. A new local candidate
   is recorded for this baseline; it still contains unreleased markers and must
   not be uploaded as the final release artifact.
2. On separate publication authorization, finalize release metadata/date, build
   and verify the exact final artifact, then publish the approved tag/gem/release.
   CI has already verified installed-gem compatibility on this baseline with
   Jekyll 3/4; later source changes require checks appropriate to those changes.
3. If prioritized, address the two documented chatbot limitations (content TOC
   recipes and guide discovery) in a separate bounded task. Do not reopen #164
   or require the full catalog/human research to close this editorial program.

No publication, live inference or manual deployment is authorized by this status
update. Earlier delivery rows below are dated delivery observations: their
unverified-deployment wording is superseded for the current cumulative source
by the exact current-source evidence, not retroactively for each historical revision.

## Current state

| Work | Status and remaining boundary |
| --- | --- |
| #147 proportionate review and appearance navigation | Merged; all applicable head checks passed. Three findings corrected/replied to; threads resolved. Its branch is deleted. No remaining change can be appended to that merged PR. |
| #149 content and publishing navigation | Merged; head checks passed. Branch deleted. Merge/check success alone does not verify deployed chatbot answers. |
| #151 second-tutorial chatbot coverage and evaluation preparation | Merged with applicable head checks passing. Exact source, prerequisites, complete page example and menu/publishing constraints added; reviewed budget is 47,000 bytes. Actual deployed context and live evaluation remain separately unverified here. |
| #150 search topic navigation | Closed by merged #152; all applicable head checks passed. See the [delivery record](search-topic-navigation-delivery-2026-10-16.md). Actual Pages/Worker deployment remains separately unverified here. |
| Installation, migration and starters | Merged #153 with applicable head checks passed; seven badges and six widgets. See the [delivery record](installation-topic-navigation-delivery-2026-10-16.md). Deployment separately unverified here. |
| Navigation, identity and branding | Merged #155; applicable head checks passed, branch deleted. Seven guides and eight affected appearance pages reviewed. See the [delivery record](identity-topic-navigation-delivery-2026-10-16.md). Deployment separately unverified. |
| Comments and analytics | Merged #156 with applicable head checks passed; corrected thread resolved and branch deleted. See the [delivery record](comments-analytics-topic-delivery-2026-10-16.md). Deployment separately unverified. |
| Hooks, mappings, feeds and metadata tasks | Merged #157; applicable head checks passed, branch deleted. Seven guides and affected installation/publication/navigation recommendations reviewed. See the [delivery record](extension-topic-navigation-delivery-2026-10-16.md). Merged #157; deployment separately unverified. |
| General reference and accessibility | Merged #158, head checks passed and branch deleted. Eight pages reviewed: seven badge groups, five widgets; FAQ retains direct question navigation. See the [delivery record](reference-navigation-closeout-2026-10-16.md). Merged #158; deployment separately unverified. |
| #154 cloud-entry dates | Closed by merged #159; head checks passed including Jekyll 3/4 and browser; branch deleted. See the [delivery record](cloud-date-fix-2026-10-16.md). |
| #125 comment adapters | Closed by merged #160; all applicable head checks passed, including Jekyll 3/4, installation and browser; branch deleted. See the [delivery record](comment-adapters-fix-2026-10-16.md). |
| #163 release preparation | Merged; 2.2.0 remains unreleased. Final artifact/publication requires a separate instruction. |
| #164 chatbot corrections | Merged; revision-specific live evidence exists. Final changes have local/CI checks, not inherited live-answer passes. Current cumulative context includes #172 and was deployed by [Worker run 39427985494](https://github.com/dieghernan/chulapa/actions/runs/39427985494) for `c1edaae46`; see the [current candidate evidence](release-candidate-after170-2026-10-19.md). |
| #172 skin contrast and Flatly follow-up | Merged/current main; exact-source Pages/regressions passed. Current candidate and separate #172 Worker deployment are recorded in the candidate report. |
| #170 default semantics | Merged; exact-main Pages/regressions succeeded. That revision's gem/unchanged #168 Worker lineage remain historical; the current candidate report records the newer baseline. |
| #168 font-failure recovery | Merged; exact-main CI/Pages/Worker succeeded. New candidate validation and CSS-upgrade constraints are recorded in the current candidate report. |
| #166 appearance selector | Merged with all review threads resolved; exact-main regression and Pages/Worker results verified. Netlify preview failure remains known. |
| Broader navigation/integration draft | Archived outside the repo before restoring a clean main; its old local branch was deleted. Use relevant hunks selectively in future groups, not whole stale context/index files. It is not a delivered PR. |

Human interviews and observed tasks are optional research. Tests, successful
deployments and synthetic editorial reviews are not human usability evidence.
The final source-based reassessment uses the unchanged editorial rubric and
separate page scores, with no all-page average. No measured findability gain,
human usability or generally accurate chatbot claim is established. Revision-specific
live chatbot observations are recorded under #164 and must retain their scope.

## 1. Completed preparation PR #151

- [x] Reconcile #147 with GitHub; verify its fixes, replies, checks and threads.
- [x] Preserve previous context facts and add the missing second tutorial source,
  constraints and complete page specimen from existing guide 59.
- [x] Review the context budget for this tutorial addition and update its UTF-8
  boundary tests/documentation. Do not treat it as a navigation-budget increase.
- [x] Reuse three existing evaluation cases and add only the missing focused
  second-tutorial case. Check unique IDs, source paths and example fidelity.
- [x] Run `npm test`: 40 passed. Check UTF-8 and `git diff --check`.
- [x] Open [PR #151](https://github.com/dieghernan/chulapa/pull/151).
- [x] Verify the reviewed head and applicable CI.
- [x] Merge #151 after the user's explicit instruction. Deployment status remains
  separately unverified here; no live evaluation has been performed.

No new public page, Diataxis type label or extraction was needed. `llms.txt`
already lists the second tutorial; runtime context changes are selective. Verify
actual Pages/Worker workflow results and context revision separately rather than
inferring publication from the merge or build alone.

## 2. Completed search navigation under #150

Read the [issue assessment](search-topic-navigation-issue-150-2026-10-16.md) and
[issue #150](https://github.com/dieghernan/chulapa/issues/150) before editing.

- [x] Scope PR #152 to guides 12, 34, 35, 36, 37 and 65 only.
- [x] Choose search topic metadata using existing options; inspect actual cards,
  including visibility guidance. Provider guides are alternatives, not a course.
- [x] Keep guide bodies/examples, inline task/reference links and provider limits.
  Keep local search, sitemap, robots and external indexing distinctions intact.
- [x] Validate docs build, card/topic destinations and fragments, 320/1280 px
  reflow and keyboard activation. Two relevant cards are better than filler.
- [x] Review index/`llms.txt`/selective context and navigation evaluation cases.
  Do not increase the byte budget for this navigation change. Run chatbot tests
  when context/cases change; live inference requires separate authorization.
- [x] Record local implementation and checks in the [delivery record](search-topic-navigation-delivery-2026-10-16.md).
- [x] Complete PR #152 review/CI and merge after the user's instruction; #150 is closed and its acceptance checklist updated.
- [ ] Verify actual Pages/Worker deployment separately; do not infer it from merge.

No Global settings activation, new configuration option, ranking/template/search
change or unrelated page was included. All six required sources, including guide
65, are in the merged delivery; the earlier broader draft remains archived.

## 3. Final editorial navigation review

The installation/migration/starter group is merged in #153. Navigation, identity
and branding are merged in #155; see the [page decisions](identity-topic-navigation-delivery-2026-10-16.md).
Comments and analytics are merged in #156. Hooks, mappings, feeds and metadata tasks are merged in #157. The final reference/accessibility group is merged in #158. The editorial closeout is delivered; #154/#125 are resolved by #159/#160. Use the archived draft
only as reference; do not apply stale context/index support files.

At the historical #149 baseline (`fb265a74c`), 25 of 69 Docs pages had visible
topic badges. Merged #152 adds six (31), and #153 adds seven (38). #155 adds seven (45), and #156 adds seven (52). #157 adds seven (59). #158 adds seven (66). The FAQ and tutorials 00/59 deliberately retain direct navigation without topic badges. All eight final reference/accessibility pages have an explicit disposition. Reviewing a
page does not require enabling badges/cards on it.
This inventory concerns metadata coverage, not a new Diataxis quality score.

| Review group | Existing page IDs | Completion rule |
| --- | --- | --- |
| Installation, migration and starters | 01, 07, 08, 09, 20, 21, 55 | Merged #153: badges on seven pages, cards on six; 01 retains its directory and body/version facts. |
| Navigation, identity and branding | 10, 11, 14, 52, 53, 54, 60 | Reviewed in #155: badges/cards, with two candidates on icons/publisher and affected appearance review. Merged #155; #154 tracked separately. |
| Comments and analytics | 13, 18, 19, 38, 39, 40, 41 | Merged #156; applicable head checks passed, corrected thread resolved, branch deleted. Preserve provider/migration warnings, known #125 workarounds and retired-service constraints; do not pad small groups. |
| Hooks, mappings, feeds and metadata tasks | 44, 45, 46, 56, 57, 62, 63 | Merged #157; deployment separately unverified. Preserve complete examples and exact reference/task links; distinguish task and lookup contracts. |
| General reference and accessibility | 02, 04, 05, 06, 48, 99_highlighting, 99_markdown-cheatsheet, 99_variable-dict | Merged #158; deployment separately unverified. Seven badge groups; five widgets; FAQ unchanged and 02/04 retain direct reference navigation. Keep lookup depth, useful FAQ routes and accessibility boundaries. A mixed intention requires a concrete defect before any extraction. |

- [x] For each group, record reviewed pages, intended audience/task, tag/card
  decision and verification. Split PRs by coherent outcome, not a page quota.
- [x] Capture verified behavior defects as issues with source, reproduction,
  expected/actual result and release impact. Avoid duplicating #125/#150.
- [x] Do not extract pages, add type badges, retag every page or revise old scores
  solely to claim completion. Essential inline links remain authoritative.
- [x] Record an editorial disposition for every group and track concrete defects.
  Final editorial delivery is merged in #158; this does not establish
  human usability or live chatbot accuracy.

## 4. Completed defect work and separate release handoff

The final reference PR #158 and #154 rendering fix #159 are merged. #125 is also fixed in merged #160. The agreed editorial/correction scope is
complete, including the final assessment/status PR #161. Perform release checks separately. Do not expand the
editorial scope without a concrete defect. Live chatbot evaluation and optional
human interviews remain separate from editorial closeout.

- [x] Resolve or explicitly triage [#154](https://github.com/dieghernan/chulapa/issues/154)
  before release: merged #159 prevents build dates being presented on
  undated Docs. Respect existing hidden-date intent, preserve real blog dates,
  review Microformats2 output and validate tag/category aliases with Jekyll 3/4.
  This is separate from navigation metadata and #125 adapter migration.

- [x] Fix [#125](https://github.com/dieghernan/chulapa/issues/125) in a separate
  runtime PR: stable distinct Cactus IDs without forbidden characters, explicit
  thread-mapping/migration advice and Welcomments URLs respecting `baseurl`.
- [x] Check Jekyll 3/4, empty/project baseurl, root and slash/underscore/hyphen/
  percent path cases; retain other form fields and existing data. Update guides,
  development changelog and selective chatbot facts/cases together.
- [x] State separately whether real provider posting/migration was tested: neither
  live posting nor migration was performed in this task.
  Passing offline fixtures do not establish live service behavior.
- [x] Resolve the two captured defects (#154/#125). Freeze the agreed editorial
  scope; accept README/home product/catalog mixtures and defer optional research.
  New concrete release defects may still be tracked during release validation.
- [x] Prepare candidate release notes and verify installation of the local 2.2.0
  candidate gem with Jekyll 3.10.0 and 4.4.1, including the complete documentation.
  Reconcile development versus released guidance without claiming publication.
  Pages and Worker rollout verified for merged #162 (`a0d9aca065`), separately
  from the local candidate. See the [release preparation record](release-preparation-2026-10-16.md)
  and [draft notes](release-2.2.0-notes.md). Final version metadata, final-artifact
  validation and publication remain pending approval. No PWA readiness is inferred.
- [x] Select 2.2.0 for the added features; the user approved this version and
  release notes on 16 October 2026, authorizing a preparation PR only.
- [ ] Publish only after a separate explicit release instruction. Finalize
  release metadata and validate the final artifact before publication.

## 5. Separate chatbot quality follow-up

The [four-case protocol](../docs/ai-chatbot/evaluation-plan-2026-10-16.md) is an
older proposal, not a claim that no live work has occurred. #164 subsequently
performed revision-specific live evaluations and corrections; see its
[closeout and limitations](../docs/ai-chatbot/evaluations/pr164-closeout-2026-10-18.md).
Preserve raw outputs and version identities. The historical evidence manifest
still points to an earlier manually deployed candidate; it is not the identity
of the newer #172 Pages-gated Worker deployment recorded above.

The deployed #172 Worker source has no new inference evaluation in this task. Known
content-TOC and guide-discovery fallbacks mean an answer can be unavailable;
containment is not successful task completion. If a follow-up is authorized,
select focused cases, verify the exact deployed revision, retain raw outputs and
review facts, complete examples and usable citations separately from availability
and request duration. Neither old passes nor deployment success transfer
accuracy to a newer artifact. Full-catalog/repeated-run evaluation and human
research remain optional, separately prioritized work.
