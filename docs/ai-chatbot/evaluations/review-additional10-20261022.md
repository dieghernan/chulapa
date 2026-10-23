# Additional ten cases — 22 October 2026

## Scope and evidence

Reviewed the latest saved HTTP 200 Worker answer for each of ten additional
catalog cases against its current expectation and repository documentation.
This is a historical-answer review, not a new live A/B run. Chrome's Workers
AI usage panel showed **11.02k/10k neurons used today**, an exceeded-limit
notice and a reset at 00:00 UTC (02:00 Madrid on 23 October).
No new inference requests were sent. Historical release wording is assessed
against today's expectations, not described as an error at its original date.

Sources: [layout retests](layouts-final-2026-10-22.jsonl),
[earlier layout answers](precommit-worktree-981dd71ee196-layouts.jsonl),
[author-profile answer](additional20-worktree-981dd71ee196-20261018.jsonl),
[migration answer](batch10-03-2026-10-22.jsonl) and
[dependency answer](oct18-pass10-2026-10-22.jsonl).

## Review

“Covered” means the local public-documentation source contains the core
answer. It does not establish successful AI Search retrieval (A), insufficient
retrieval (B) or redundancy in a live answer (D). C candidates identify
specific missing source details and still require checking the indexed copy.

| Case | Saved Worker answer against current expectation | Documentation finding and context recommendation |
| --- | --- | --- |
| `layouts-random-singleton-1` | Partial: one card and build-time sampling are correct; the October 18 answer calls the change unreleased rather than v2.2.0. | Covered by `04_layouts.md`, related/random options. Retain the short release boundary until retested. |
| `layouts-include-cache-1` | Partial: rejects blanket caching and explains hierarchy; omits fixed-footer/cloud reuse and implies a specific comment caching prescription. | C candidate: the current advanced section documents caller-assigning helpers but no longer explains the full caching constraints or shared renderers. Retain actionable caching cautions; internal renderer names need not become beginner guidance. |
| `layouts-head-formatting-1` | Partial: explains existing compression and custom snippets but uses historical unreleased wording and omits the fixed-footer indentation detail. | C candidate: “Generated head and footer formatting” now redirects to hooks without explaining the behavior in the case. Keep context until deciding whether this internal-formatting question belongs in the supported public-answer scope. |
| `layouts-microformats-nested-feed-1` | Partial: correctly preserves inheritance without a flag; historical release wording differs from the current expectation. | Core inheritance is covered by `04_layouts.md`; exact multi-level and release details are less explicit. Keep the compact context until a targeted retrieval check. |
| `layouts-microformats-feed-1` | Partial: lists layouts and manual wrapper requirement; omits paginated-feed and repeated-cloud-entry details. | C candidate: the current list microformats subsection only says lists include machine-readable information without configuration; advanced structure mentions inherited h-feed but not the full expected inventory. Retain context pending a scope decision or a concise advanced reference. |
| `config-author-profile-1` | Partial against the full rubric: answers the actual URL/guest questions correctly but omits article:author, h-card and version details. | Core URL and guest isolation facts are covered by `02_config.md` and `04_layouts.md`. Do not classify missing peripheral facts as a wrong answer to the user's narrower question. Keep context pending live retrieval. |
| `layouts-label-headings-1` | Pass: explains user-supplied heading levels and gives a complete h2/class h5 example. | Covered explicitly by `04_layouts.md` options. Candidate for D only after AI Search retrieves and uses that passage. |
| `layouts-microformats-1` | Partial: minimal, dates and guest isolation are correct; omits default/landingpage comparison and relative URL resolution. | C candidate for the exact dt-published/dt-updated details, absent from current prose; minimal and guest behavior are documented. Keep the context summary and verify source scope before migrating it. |
| `installation-2` | Pass on its stated rubric: removes the conflicting theme and merges required gems/plugins while preserving settings. | Covered by `20_remote-theme.md`. No new documentation needed; evaluate retrieval before removing context. |
| `installation-3` | Core answer passes: install, enable, bundle install and restart. Contains an irrelevant instruction about not discussing skins/fonts/palettes. | Covered explicitly by `20_remote-theme.md`. The stray instruction is a generation/prompt leakage issue; it does not justify duplicating documentation. |

## Next live comparison

Run from `docs/ai-chatbot` after quota resets, choosing new names if these
outputs already exist:

```powershell
$caseIds = 'layouts-random-singleton-1,layouts-include-cache-1,layouts-head-formatting-1,layouts-microformats-nested-feed-1,layouts-microformats-feed-1,config-author-profile-1,layouts-label-headings-1,layouts-microformats-1,installation-2,installation-3'
node evaluate-live.mjs chatbot-additional10-20261023 $caseIds
npm run evaluate:ai-search -- ai-search-additional10-20261023 $caseIds
```

Do not replace historical evidence or assign A/B/D from this static review.
Compare the generation request's own context chunks as well as the separate
Search output. No context, public guide, production Worker or index was changed.
