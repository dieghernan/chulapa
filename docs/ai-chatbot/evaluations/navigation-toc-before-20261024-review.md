# Navigation and TOC baseline — 24 October 2026

Four requests: three HTTP 200 and one task-validation HTTP 503; 0 pass, 2 partial, 1 fail, 1 unavailable. Worker `09b4517c-3705-4009-a1bf-af30be43b5b5`. The validator rejection does not reveal which invalid recipe was generated and is not classified as quota exhaustion or an assessed wrong answer.

[Raw responses](navigation-toc-before-20261024.jsonl).

| Case | Result | Finding |
| --- | --- | --- |
| `navigation-2` | fail | Omits breadcrumb_list, places project_links in _config.yml rather than page front matter and gives an incomplete icon class; unrelated source labels. |
| `navigation-3` | partial | Correct root config fields and reading default/clamp, but cites first-site tutorial instead of configuration reference and omits paginator default/non-enablement distinction. |
| `sidebar-accessibility-focus` | partial | Correct closed exclusion, Escape/return focus and no trap; omits the v2.2.0 boundary and open-panel Tab explanation. |
| `content-toc-task-1` | unavailable | HTTP 503 task-validation fallback: response says answer could not be verified. No answer text was delivered to assess; this is not evidence of quota exhaustion. |
