# Focused evaluation proposal for extracted guides

Date: 16 October 2026. Baseline: main `fb265a74c`, after merged PR #149.
Status: four-case proposal with second-tutorial context prepared offline.
No live requests, Worker deployment or answer-quality results. Existing evaluations remain historical snapshots.

## PR reconciliation and scope

PR #147 was merged on 16 October 2026 at 09:41:44 UTC, before this request.
Its head was `2fa658110`; its branch has since been deleted. Its three findings
were fixed in that commit and already had replies; the remaining open review
threads were marked resolved after checking the fixes. All applicable head
checks passed; neutral Netlify rule reports are not failures. The automated
review summary records no remaining findings on the corrected head.

A new commit cannot be added to that merged PR. This follow-up uses a separate
branch, retaining the unrelated in-progress navigation changes in their checkout.
No new merge is performed. The completed synthetic editorial review is not a
human study, and this proposal does not change historical scores or outcomes.
Human interviews remain optional and do not block editorial completion.

## Four representative cases

| Existing catalog ID | Purpose and expected evidence | Canonical source |
| --- | --- | --- |
| `installation-1` (core) | First publication: recommend the browser template, GitHub Actions publishing and a saved title/article change; distinguish commit, build and public result. No Ruby install or personal token prerequisite. The rubric supplements the existing case rather than pretending a model answered it. | [First tutorial](../collections/_docs/00_start.md), `/docs/00-start` |
| `second-photo-tutorial-1` (new focused extra case) | Second tutorial: published starter prerequisite, existing Madrid photograph, `_pages/photo-walk.md`, `/photo-walk/`, preserve the menu and check public page/image/menu. Added because the three catalogs had no focused case for this supplied exercise. | [Second tutorial](../collections/_docs/59_photo-page-tutorial.md), `/docs/59-photo-page-tutorial` |
| `photoswipe-gallery` (extra) | Advanced lookup: exact boolean include parameter `photoswipe`, default `false`, enabled with unquoted `photoswipe=true`; not page YAML or a plugin. Requires development after v2.1.0; absent from the v2.1.0 gem/pin. Check one complete existing-gallery include and source/fallback constraints. | [Task](../collections/_docs/31_photoswipe.md), `/docs/31-photoswipe`; [Reference](../collections/_docs/04_layouts.md), `/docs/04-layouts#photoswipe-lightbox` |
| `snippets-1` (core) | Complete code and routing control: local MP4 uses `snippets/video.html` with `fileurl`; preserve existing page settings, use a complete Liquid include and cite the extracted video guide. Do not confuse local files with hosted provider/id arguments. | [Video guide](../collections/_docs/32_embed-video.md), `/docs/32-embed-video` |

The selection is four cases total, not four successful answers. Reuse the
questions in the catalogs; do not redesign the runner or expand the batch into
an exhaustive benchmark. The runner selects by ID in catalog order, not argument
order. Duplicate or unknown IDs must be caught by the offline check first.

## Context preparation and remaining execution gate

The initial offline review found no `/docs/59-photo-page-tutorial`, `My photo
walk` or fixed Madrid-photo scenario in selective context. That initial finding
was source-coverage evidence, not a failed model answer. Implementation now adds
that exact URL, published-starter/image prerequisites, a complete page example,
menu insertion constraints and publish/result checks from the existing tutorial.
The case expectation no longer describes the local context as missing.

The previous context remains intact: this addition adds 934 bytes in the Windows
checkout (45,871 to 46,805 bytes). Explicitly review the editorial budget at
47,000 UTF-8 bytes, update both multibyte boundary tests and budget documentation.
This increase pays for actual second-tutorial facts and a complete example; it
is not for the navigation metadata proposed in issue #150, which retains its
no-budget-increase constraint. No model output/token limit changes.

The local coverage gap is resolved. The full four-case live batch is still
pending authorization and verification of the same reviewed context deployed
through the existing Pages gate. No deployment is performed here. First verify
source publication and exact Worker/context revision. Prior proxy failures do
not establish current reachability; no quota-consuming probe is authorized by
this preparation. Any old deployed context may still lack this tutorial.

## Quality review, separate from latency

For every retained answer, record pass, partial or fail for each dimension:

- Facts: correct setting names, defaults, prerequisites and version limitations;
  no invented capability or automatic conversation/hosting behavior.
- Actionability: identifies the existing file and scope of edits, preserves
  unrelated settings and gives the required publish/check action. For first
  publication, includes changing the home heading and sample article, or clearly
  routes the reader to the supplied exercise rather than inventing a new one.
- Examples: if code is needed, require a complete small YAML/Markdown/Liquid
  block appropriate to the question, without ellipses or literal escaped newlines.
  The second tutorial may use one complete page specimen and describe the menu
  insertion with its canonical guide; do not demand the entire tutorial inside
  the Worker's concise-answer limit.
- Sources: compare URLs with the exact reviewed context; resolve the public
  route and any fragment and confirm the destination supports the associated
  instruction. HTTP 200 alone is not citation accuracy. Existing broad Reference
  links can be useful supplements, not substitutes for a requested task guide.
- Boundaries: missing context must be acknowledged; no claims of observed human
  task completion, guaranteed publishing time or unsupported release features.

A wrong default/version, destructive replacement instruction, fabricated source
or incomplete required example is a material failure even with HTTP 200. Record
omissions and supporting quotations individually, not just an overall score.
An editorial review of answers establishes only observations about those answers;
it is neither a human usability result nor population-level chatbot accuracy.

## Reuse the existing runner after authorization

Run from `docs/ai-chatbot/`, only after coverage/deployment checks and explicit
permission for quota-consuming requests. The following command is a proposal,
not an instruction to execute it during this task:

```sh
node evaluate-live.mjs diataxis-guides-2026-10-16 installation-1,second-photo-tutorial-1,photoswipe-gallery,snippets-1
```

Use a fresh run name if the file already exists: the runner appends JSONL. It
sends independent requests to the existing `/api/chat` endpoint and saves raw
questions, expected criteria, status, response, timestamp, `cfRay` and `durationMs`
under `evaluations/`. Do not edit old JSONL or historical review files. Four IDs
mean four planned requests, with the runner's existing cooldown/backoff behavior.
No automatic retries beyond that mechanism, repeated batches or extra model
requests are authorized by this proposal.

`durationMs` is elapsed client request/JSON-response time, including network and
Worker/model processing. It excludes the runner's pre-request cooldown. It is
not time to first token, pure model inference latency or a person's completion
time. Report each case's status and duration next to, but separately from, its
quality assessment. Label 429, 503, timeout, proxy or access failures as
availability failures with their elapsed time; do not score a missing answer as
quality evidence. Four samples do not support p90, a performance guarantee or a
claim of latency improvement. Compare another revision only with a separately
authorized matched-case run and its model/prompt/context/network conditions.

After an authorized run, add a dated review under `evaluations/` linking the raw
JSONL and exact source/context/Worker revisions. Include per-dimension findings,
syntax/source checks and unresolved questions. No results are populated now.

## Validation boundary for this proposal

Check catalog JSON, unique IDs, four exact selections, source files, the known
missing-context route and local proposal links offline. Run existing chatbot
unit/build tests without sending inference requests. These checks validate the
proposal artifacts and runtime regressions, not factual model answers.

No public page, labels, extraction, theme behavior, accessibility, SEO or PWA
change is introduced. `llms.txt` already contains the second tutorial, so its
entry remains unchanged. Selective runtime context is updated locally; Worker
deployment is pending. This internal plan is excluded from the published site.

Recorded offline checks on this branch: all 152 catalog records parse with unique
IDs, each selected ID resolves exactly once, local source/proposal links exist,
and the initial missing second-tutorial URL was confirmed. The implementation
follow-up verifies the new source, facts and complete example against the guide.
`npm test` passes all 40 tests; `git diff --check` and UTF-8 checks pass.
These are preparation checks, with no live answer or latency measurements.

Implementation update: second-tutorial context now includes its exact source and
complete page specimen, which matches guide 59 after removing blank lines. All
previous context is retained unchanged; no fact compaction or deletion was used.
The 46,805-byte Windows checkout fits the reviewed 47,000-byte limit. Both UTF-8
boundary tests and all 40 chatbot tests pass. The [execution checklist](../../planning/diataxis-closeout-plan.md)
and [issue #150 assessment](../../planning/search-topic-navigation-issue-150-2026-10-16.md)
record the agreed follow-up. These are offline checks, not live model results.
