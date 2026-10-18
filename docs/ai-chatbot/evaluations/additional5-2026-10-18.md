# Additional five-question evaluation: 18 October 2026

Runtime worktree-981dd71ee196 (source committed in 5c1b3ae6f), Worker 65bb328b-a4ed-4828-9218-9c36553b2306. Two groups of four and one independent questions, without inference retries or runtime changes. All five returned HTTP 200; factual review found three passes, one partial answer and one failure.

| Case | Outcome | Evidence |
| --- | --- | --- |
| [layouts-3](additional5-worktree-981dd71ee196-20261018.jsonl#L1) | fail | Uses root-level show_sidetoc and kramdown.toc_levels instead of page front matter show_sidetoc, h_min: 2 and h_max: 5. The sidebar reads page flags and h_min/h_max, so the requested sidebar/range is not configured. |
| [layouts-4](additional5-worktree-981dd71ee196-20261018.jsonl#L2) | pass | Correct archive front matter, include_collection: posts,demo and include_missdates: true. |
| [layouts-5](additional5-worktree-981dd71ee196-20261018.jsonl#L3) | pass | Correct cloudtag page, matching permalink/cloudtag_url, show_tags defaults for posts and collection restriction. |
| [layouts-6](additional5-worktree-981dd71ee196-20261018.jsonl#L4) | pass | Correct indexcategory, date descending and index_items: 5; correctly restricts bottom navigation to page.previous/next. |
| [snippets-1](additional5-worktree-981dd71ee196-20261018.jsonl#L5) | partial | Correct complete Liquid include and root-relative fileurl without duplicate baseurl handling, with canonical video source. Omits the requested public playback verification. |

## Pending corrections and limits

The sidebar answer needs page front matter `show_sidetoc: true`, `h_min: 2` and `h_max: 5`. `_layouts/default.html` checks `page.show_sidetoc`; `_includes/components/sidetoc.html` reads the heading bounds. `kramdown.toc_levels` configures a separate Markdown TOC. Correct the existing guidance/retrieval and repeat this case after a deployment; it remains a recorded failure. The video answer needs an explicit check that the published MP4 plays, especially under a project baseurl. No browser playback was attempted.

Coverage on this deployed runtime is 42 reviewed cases out of 155: 30 pass, 11 partial and one fail, with 113 unrun. The supplementary provider comparison stays outside this denominator. Local provider inventory routing corrections remain undeployed and untested live. These records do not establish human usability, repeated-run consistency, provider integration or live URL reachability. No public documentation facts changed, so ai-context.md and llms.txt need no update for this record/routing change. No UI, metadata or PWA behavior changed.
