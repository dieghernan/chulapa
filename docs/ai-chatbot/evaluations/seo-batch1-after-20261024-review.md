# SEO batch 1: first validation — 24 October 2026

Worker `87bf899e-cfd1-47e7-b20c-523fa693a92b`, 100% traffic. Five requests, all HTTP 200: 0 pass, 4 partial, 1 fail.

[Raw responses](seo-batch1-after-20261024.jsonl).

| Case | Result | Finding |
| --- | --- | --- |
| `seo-1` | fail | Cross-domain error removed, but now incorrectly says sitemap:false excludes the original URL; must exclude the copy actual URL. |
| `person-publisher-task-1` | partial | Adds avatar fallback and home/post URL checks; still inserts name/URL override examples and omits Organization default/version/search limits. |
| `canonical-article-task-1` | partial | Valid minimal canonical/sitemap fields and copy-URL check; omits preserved permalink/content, JSON-LD/feed checks and adds unrelated crawler advice. |
| `sharing-task-1` | partial | Fixes invalid Liquid and visible header changes; includes five metadata fields. Omits upload/image URL check and describes incorrect og:image/alt tag plus bare width/height names. |
| `search-visibility-task-1` | partial | Now includes all three front-matter controls and separate Algolia reupload/checks; omits jekyll-sitemap dependency, public/noindex access limits and delayed removal. |
