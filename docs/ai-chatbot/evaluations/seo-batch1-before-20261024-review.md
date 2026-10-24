# SEO batch 1: before changes — 24 October 2026

Worker `810c8961-e548-43e5-adb7-0a7e2501d65e`, 100% traffic. Five requests, all HTTP 200; manual review: 0 pass, 2 partial, 3 fail. No AI Search calls.

[Raw responses](seo-batch1-before-20261024.jsonl). [Structured review](seo-batch1-before-20261024-review.json).

| Case | Result | Finding |
| --- | --- | --- |
| `seo-1` | fail | Core canonical/sitemap distinction is correct, but falsely applies GoatCounter cross-domain tracking restrictions to canonical metadata. |
| `person-publisher-task-1` | partial | Correct Person/image/guest separation; omits Organization default, avatar fallback and home/post URL checks; adds unrequested name/URL/image overrides. |
| `canonical-article-task-1` | partial | Correct canonical and sitemap settings/no redirect; adds layout override and omits preservation/published metadata, feed and sitemap checks. |
| `sharing-task-1` | fail | Unquoted Liquid in YAML is invalid; adds header_img and layout/title overrides contrary to the task, and omits alt metadata/source checks. |
| `search-visibility-task-1` | fail | Omits include_on_search: false for local engines, Algolia reupload and published checks; does not complete the requested local exclusion. |
