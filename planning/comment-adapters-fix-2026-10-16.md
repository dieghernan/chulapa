# Cactus and Welcomments adapter fixes

Date: 16 October 2026. Baseline: main `0646ee1ca`, after merged #159.
Branch: `codex/fix-comment-adapters`. Issue: #125. [PR #160](https://github.com/dieghernan/chulapa/pull/160) open; CI/review pending.

## Behavior and migration

Cactus now derives IDs with `include.pageurl | url_encode | replace: '_', '%5F'`.
Eight hardcoded path cases cover root, slash, hyphen, underscore, literal percent
sequences, spaces and plus signs. IDs are repeatable, distinct and free of slash
and underscore; baseurl does not enter this mapping. Confirmed the current client
requirements in https://cactus.chat/docs/client/introduction/ on 16 October 2026.

Existing custom mappings must be reviewed before upgrading. Record old IDs,
compare matching on published articles and arrange provider migration or retain
an existing valid local mapping when necessary. Local adapters override the fixed
theme. Do not encode an already corrected override a second time. No automatic
Matrix migration, new homeserver option or new YAML switch is provided.

Welcomments submits `page.url | absolute_url | escape`, including the project
baseurl while preserving website/reply/slug fields, endpoint, labels and saved
comment rendering. Existing customized local forms override the corrected theme;
review their permalink field without replacing other provider templates/data.

Both fixes are development changes after v2.1.0, absent from that release. Legacy
local corrections remain documented for v2.1.0. Update guides 02/39/40/46,
llms.txt, development changelog, selective context and the two existing evaluation
expectations together. Context budget remains 47,000 bytes. No live inference or
manual Worker deployment; actual deployed answers remain unverified.

## Validation and limits

- New provider-template regression passes locally on Jekyll 3.10 and 4.4. Each
  adapter independently fails its regression when restored to the old version.
- Existing footer provider/cache/gating regression passes on both versions.
- New test checks repeatable distinct Cactus IDs, root/project Welcomments URLs,
  all form field names, required comment semantics, saved author/comment data and
  endpoint. The automatic runner discovers it in the existing Jekyll 3/4 matrix.
- Browser: four baseurl/viewport combinations at 320/1280, no document overflow;
  keyboard field focus, saved comments and FormData checked without submission.
  Local fixture uses existing theme styles; external requests are blocked.
- Documentation build and 40 chatbot tests passed. Docs use the configured remote
  theme; local adapter correctness is established by the separate fixtures.
- UTF-8, JSON and existing context budget checked. Historical evaluations remain
  unchanged. No live Cactus/Welcomments posting, provider migration or human
  usability result is claimed.

Only ID generation and a hidden input value change. Existing controls, visible
layout and accessible labels remain intact. Canonical metadata, indexing and
page routes are unchanged; form destination data now matches baseurl. No PWA
manifest/service worker/caching strategy changes; external comments need network.
These checks do not establish WCAG certification, offline support or real provider
availability. Relevant existing HTML/cache checks are run separately.

## Plan status

#159 merged with Jekyll 3/4 and browser CI passing; #154 closed and its acceptance
checklist reconciled. Editorial closeout is delivered. #125 remains open pending
this PR's review/CI/merge. Next: freeze scope, review final release notes/version,
packaged installation and compatibility checks, then verify actual deployment
separately. Release publication still requires an explicit instruction.
