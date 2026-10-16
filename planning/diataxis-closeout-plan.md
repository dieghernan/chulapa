# Diataxis closeout and release preparation plan

Updated: 16 October 2026. Current delivery baseline: main `a7af9ac81`, after merged #152.
Current delivery: [PR #153](https://github.com/dieghernan/chulapa/pull/153), installation/migration/starters; review, CI and merge pending.
This is the current execution plan. Keep historical audits, scores, synthetic
reviews and raw evaluations unchanged; update this plan with actual delivery
status and links after each bounded PR. Documentation is written in English.

## Current state

| Work | Status and remaining boundary |
| --- | --- |
| #147 proportionate review and appearance navigation | Merged; all applicable head checks passed. Three findings corrected/replied to; threads resolved. Its branch is deleted. No remaining change can be appended to that merged PR. |
| #149 content and publishing navigation | Merged; head checks passed. Branch deleted. Merge/check success alone does not verify deployed chatbot answers. |
| #151 second-tutorial chatbot coverage and evaluation preparation | Merged with applicable head checks passing. Exact source, prerequisites, complete page example and menu/publishing constraints added; reviewed budget is 47,000 bytes. Actual deployed context and live evaluation remain separately unverified here. |
| #150 search topic navigation | Closed by merged #152; all applicable head checks passed. See the [delivery record](search-topic-navigation-delivery-2026-10-16.md). Actual Pages/Worker deployment remains separately unverified here. |
| Installation, migration and starters | Seven pages reviewed and metadata prepared on the current branch; Installation keeps its method directory without a related widget. See the [delivery record](installation-topic-navigation-delivery-2026-10-16.md). PR/CI/merge pending. |
| #125 comment adapters | Open runtime defects: Cactus identifiers and Welcomments project-site permalinks. Existing workarounds and migration warnings remain necessary. |
| Broader navigation/integration draft | Archived outside the repo before restoring a clean main; its old local branch was deleted. Use relevant hunks selectively in future groups, not whole stale context/index files. It is not a delivered PR. |

Human interviews and observed tasks are optional research. Tests, successful
deployments and synthetic editorial reviews are not human usability evidence.
No new site-wide purity score, measured findability gain or chatbot accuracy
claim is established by this plan.

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

## 3. Finish the remaining editorial navigation review

The installation/migration/starter group is reviewed and implemented on this
branch, with the [page decisions and checks](installation-topic-navigation-delivery-2026-10-16.md).
After its PR review/merge, continue with navigation, identity and branding. Use
the local archived draft only as reference; do not apply stale support files.

At the historical #149 baseline (`fb265a74c`), 25 of 69 Docs pages had visible
topic badges. Merged #152 adds six, for 31. This branch adds seven, for 38 if
accepted. Of the remaining 31, tutorials 00/59 intentionally keep explicit
progression; the other 29 belong to the four pending groups below. Reviewing a
page does not require enabling badges/cards on it.
This inventory concerns metadata coverage, not a new Diataxis quality score.

| Review group | Existing page IDs | Completion rule |
| --- | --- | --- |
| Installation, migration and starters | 01, 07, 08, 09, 20, 21, 55 | Reviewed on this branch: badges on seven pages, cards on six; 01 retains its directory. PR/merge pending; no lost body/version facts. |
| Navigation, identity and branding | 10, 11, 14, 52, 53, 54, 60 | Useful topic routes and actual related cards where justified; preserve direct menu/footer/appearance instructions. |
| Comments and analytics | 13, 18, 19, 38, 39, 40, 41 | Preserve provider/migration warnings, known #125 workarounds and retired-service constraints; do not pad small groups. |
| Hooks, mappings, feeds and metadata tasks | 44, 45, 46, 56, 57, 62, 63 | Preserve complete examples and exact reference/task links; distinguish task and lookup contracts. |
| General reference and accessibility | 02, 04, 05, 06, 48, 99_highlighting, 99_markdown-cheatsheet, 99_variable-dict | Decide badges/cards page by page. Keep lookup depth, useful FAQ routes and accessibility boundaries. A mixed intention requires a concrete defect before any extraction. |

- [ ] For each group, record reviewed pages, intended audience/task, tag/card
  decision and verification. Split PRs by coherent outcome, not a page quota.
- [ ] Capture verified behavior defects as issues with source, reproduction,
  expected/actual result and release impact. Avoid duplicating #125/#150.
- [ ] Do not extract pages, add type badges, retag every page or revise old scores
  solely to claim completion. Essential inline links remain authoritative.
- [ ] Mark the review complete when every group has an explicit disposition and
  concrete defects are tracked, not when every possible improvement is built.

## 4. Resolve release-relevant defects and freeze scope

- [ ] Fix [#125](https://github.com/dieghernan/chulapa/issues/125) in a separate
  runtime PR: stable distinct Cactus IDs without forbidden characters, explicit
  thread-mapping/migration advice and Welcomments URLs respecting `baseurl`.
- [ ] Check Jekyll 3/4, empty/project baseurl, root and slash/underscore/hyphen/
  percent path cases; retain other form fields and existing data. Update guides,
  development changelog and selective chatbot facts/cases together.
- [ ] State separately whether real provider posting/migration was tested.
  Passing offline fixtures do not establish live service behavior.
- [ ] Triage newly captured defects. Resolve release blockers; explicitly defer
  optional improvements. Freeze feature/editorial scope before final checks.
- [ ] Review release notes, installation from the packaged gem and supported
  Jekyll versions. Reconcile development versus released feature guidance and
  verify Pages/Worker rollout separately. Do not infer PWA readiness from a score.
- [ ] Decide release numbering from the final feature set; 2.2.0 is a candidate
  because of added features, not an approved version in this plan. Publish only
  after a separate explicit release instruction.

## 5. Optional, separately authorized live chatbot evaluation

Use the [four-case protocol](../docs/ai-chatbot/evaluation-plan-2026-10-16.md):
`installation-1`, `second-photo-tutorial-1`, `photoswipe-gallery`, `snippets-1`.

- [ ] Verify the reviewed context is actually deployed and exact source routes
  are published; then obtain authorization for quota-consuming requests.
- [ ] Run the existing selected-case tool once with a fresh run name. Preserve
  raw responses/statuses and review facts, complete examples and exact citations.
- [ ] Record `durationMs` separately as client request/response elapsed time,
  not model-only latency or human completion time. Classify availability failures
  separately; four samples do not establish p90 or a performance guarantee.
- [ ] Add a dated result review without changing historical JSONL or inventing
  human participants, answer success or latency improvements.

This live review is not performed now. Optional participant research remains
independent of editorial completion and of technical answer verification.
