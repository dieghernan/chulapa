# Navigation and TOC validation — 24 October 2026

Four HTTP 200 answers on Worker `09e75972-8ede-4630-ba6e-c5a504bc709c`, verified 100% traffic: 1 pass, 3 partial, 0 fail, 0 unavailable.

[Raw answers](navigation-toc-after-20261024.jsonl). [Artifact manifest](navigation-toc-deployment-20261024.json).

| Case | Result | Finding |
| --- | --- | --- |
| `navigation-2` | partial | Correct page-front-matter breadcrumb_list/project_links recipe and full icon class; wrong config-root guidance is fixed. Added verification checks browser title rather than breadcrumb destinations and GitHub button. |
| `navigation-3` | pass | Correct _config.yml fields with 200/3 values, numbered-window clamp, non-enablement distinction, local restart and accurate configuration source. |
| `sidebar-accessibility-focus` | partial | Correct closed exclusion, v2.2.0 boundary, Escape/return focus and no modal trap. Captured full rubric still expects explicit open-panel Tab order and Escape from panel, not just trigger; core asked behavior is substantially answered. |
| `content-toc-task-1` | partial | Now delivers valid two-line TOC marker, exact no_toc exclusion and nested toc_levels YAML, separating theme controls. Omits merging existing kramdown/parser preservation, site-wide scope and heading-link checks; before/after-marker background is not treated as the practical blocker. |

The baseline had one failed answer, two partial answers and one undelivered
validator-rejected answer. The new sample fixes header option scope and source
selection, and delivers a valid content-TOC recipe. This is not evidence of
repeatability or complete resolution. Extra browser-title verification in a
header task is unrelated, and kramdown preservation remains an actionable gap.
Open-panel wording can be treated separately from the already answered core
sidebar questions; no fresh request was spent solely on that secondary detail.

Eight Worker requests in this navigation batch, including the baseline 503;
no automatic retries or AI Search requests. 108 local tests and Wrangler dry-run
passed. The source library stays within 57,000 bytes; output budget/model/bindings
are unchanged. Only context, selection and prompt changed; no theme controls,
keyboard interactions, UI/SEO/PWA behavior or public guide/llms.txt changes.
README records selection behavior. No browser audit or live rendering guarantee
is claimed for generated answers; exact source text was reviewed and YAML parsed.
