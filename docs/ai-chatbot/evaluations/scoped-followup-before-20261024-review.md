# Essential follow-up baseline — 24 October 2026

Six fresh HTTP 200 answers on Worker `253c4a59-bd7d-4336-b3f3-c407f11f81e0`, verified 100% traffic. Task-scoped rubric: 2 pass, 4 partial, 0 fail. Counts must not be presented as a direct quality improvement over the earlier broader rubrics.

[Raw answers](scoped-followup-before-20261024.jsonl).

| Case | Result | Finding |
| --- | --- | --- |
| `migration-theme-1` | partial | Correct pin/plugins/layout/override/feed workflow, but omits explicit preservation of url/baseurl/permalink and adapting useful override files. |
| `seo-1` | pass | Correct canonical/no redirect and copy-only sitemap behavior; no unsupported original-target inclusion claim in this run. |
| `seo-2` | partial | Correct title/description keys. Added verification omits the actual rendered browser title and instead includes an irrelevant og:image check. |
| `feed-selection-1` | partial | Correct true/false/date and standalone-page rejection. Does not clearly merge/preserve existing defaults or verify article URLs; prior opening-as-publication error is absent. |
| `canonical-article-task-1` | pass | Correct existing-front-matter merge, no redirect, jekyll-sitemap prerequisite and published canonical/copy exclusion checks under scoped rubric. |
| `search-visibility-task-1` | partial | Correct independent controls and Algolia reupload/checks; still omits jekyll-sitemap prerequisite. |

Only the four still-partial cases will be repeated after correction; the two passes remain tied to this version. No AI Search requests or retries.
