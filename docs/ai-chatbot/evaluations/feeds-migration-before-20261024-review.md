# Feeds and migration: baseline — 24 October 2026

Worker `ac010481-bedc-448a-94be-7512e5825e92`, verified 100% traffic before queries. Six HTTP 200 answers: 1 pass, 4 partial, 1 fail. No retries or AI Search requests.

[Raw responses](feeds-migration-before-20261024.jsonl).

| Case | Result | Finding |
| --- | --- | --- |
| `migration-theme-1` | partial | Correct backup/pin/dependencies/URLs/override advice; omits layout: default plus header_type: post, enabling both plugins, explicit override precedence, preservation of /feed.xml and integration checklist. |
| `migration-fields-lookup-1` | partial | Correct reference link and local/Algolia exclusions, but omits requested toc/comments mappings and front-matter precedence; adds unrelated sitemap/crawler editing instructions. |
| `feed-coexistence-1` | partial | Correct collision warning and independent plugin selection; omits preserving subscriber URL and built-in head advertisement, and adds an unrequested posts-default recipe. |
| `feed-selection-1` | fail | Claims no single-post exclusion is documented and directs to plugin logic; wrongly proposes an ordinary Contact page for feed inclusion instead of rejecting standalone non-collection pages. |
| `feed-collection-output-1` | partial | Correct output:true diagnosis; omits explicit existing collections mapping, preservation and rebuild/open-article verification. |
| `community-4` | pass | Correct include_on_feed:true/date diagnosis and independent plugin/collision warning; no recommendation to overwrite the built-in feed. |
