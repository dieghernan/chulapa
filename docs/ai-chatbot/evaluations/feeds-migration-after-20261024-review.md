# Feeds and migration: first validation — 24 October 2026

Worker `98c97e53-138a-4460-922f-b5487c2a3c82`, verified 100% traffic. Eight HTTP 200 answers: 1 pass, 6 partial, 1 fail. Batch six: 1 pass, 4 partial, 1 fail. Two SEO controls remain partial with their core corrections intact.

[Raw responses](feeds-migration-after-20261024.jsonl).

| Case | Result | Finding |
| --- | --- | --- |
| `migration-theme-1` | fail | Adds plugin enablement and local override precedence, but incorrectly recommends layout: post as a built-in layout automatically adding header_type; Chulapa requires default plus header_type: post. |
| `migration-fields-lookup-1` | partial | Now gives all three mappings and independent Algolia/Google behavior; omits explicit-front-matter precedence and nonautomatic conversion caveat, and renders arrows as unrequested LaTeX. |
| `feed-coexistence-1` | partial | Correct collision/plugin-boundary answer, but still adds a defaults recipe and omits preservation of subscriber URL and built-in head advertisement. |
| `feed-selection-1` | partial | Fixes false override and rejects ordinary standalone pages; valid defaults recipe. Omits preserving existing defaults, explicit collection dates/output and baseurl/entry-link checks. |
| `feed-collection-output-1` | partial | Correct existing collections mapping, output:true example and rebuild/live article check. Does not explicitly preserve other collection settings; second source is mislabeled as Subscription feeds. |
| `canonical-article-task-1` | partial | SEO control retains valid canonical/sitemap YAML, no redirect and copy exclusion checks; still omits jekyll-sitemap condition and some full-rubric preservation/pagination details. |
| `sharing-task-1` | partial | SEO control retains plain-path image YAML, no header/body mutation and exact source/baseurl checks; still omits full-rubric preview/cropping limits. |
| `community-4` | pass | Correct boolean/date diagnosis and no plugin replacement; includes published feed/baseurl/entry-link checks. |
