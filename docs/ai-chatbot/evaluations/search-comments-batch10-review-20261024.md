# Search and comments: ten-question review — 24 October 2026

Worker `09e75972-8ede-4630-ba6e-c5a504bc709c`, confirmed at 100% traffic before
the run. Source deployment: [navigation manifest](navigation-toc-deployment-20261024.json).
Local checkout: `63cc495d304b26dac84936f6f42720d5ab8e90a2`; its review fixes
are not deployed and cannot be credited for these answers.

[Raw evidence](search-comments-batch10-20261024.jsonl): 10 requests, all HTTP 200,
no retries, no AI Search. Manual task-scoped assessment: 5 pass, 3 partial,
2 fail, 0 unavailable. Captured catalog expectations remain unchanged; optional
setup inventories and version histories are not mandatory for narrower questions.

| Case | Result | Finding |
| --- | --- | --- |
| `search-comments-4` | partial | Correct attribution switch and legacy precedence, but does not answer whether lunr_maxwords is recommended or direct users to shared maxwords. Algolia logo is optional for this question. |
| `custom-search-script-dependencies` | fail | Misses chulapa_search.js, provider/store ordering and chulapa_navigation.js. Claims a title/layout requirement explains the missing global; changing the title does not fix an old adapter's dependency. |
| `search-fusejs-setup-1` | fail | Repeats /my-blog in landing_page and permalink, contrary to documented baseurl handling. Also invents a posts-and-About-only index restriction. |
| `comments-giscus-setup-1` | partial | Correct embed path, provider, per-post flag and publication check; omits public repository, enabled Discussions and installed app, all relevant prerequisites when comments are absent. |
| `provider-lunr-task-1` | pass | Changes provider, retains a matching search page and gives build/index and result checks. Exhaustive account and baseurl reminders are unnecessary without a path change. |
| `provider-simplesearch-task-1` | pass | Directly answers account question and supplies provider plus matching page setup. Extra Fuse source is unnecessary but does not invalidate the answer. |
| `provider-google-task-1` | pass | Correctly denies build-time upload and distinguishes external indexing/local exclusions. Full installation recipe is not asked; noindex advice is valid but unnecessary. |
| `provider-algolia-task-1` | partial | Correct upload command, private environment key, plugin group and files_to_exclude. Omits bundle install before invoking the newly added plugin; should explicitly preserve existing algolia settings/exclusion entries. Command must run from the actual site's directory. |
| `comments-cactus-task-1` | pass | Correctly says this adapter has no homeserver option and links the provider guide. Wording about being hosted on Matrix is imprecise; this is an adapter restriction, not a claim that all Cactus deployments forbid self-hosting. Full setup/version migration is unasked. |
| `comments-welcomments-task-1` | pass | Answers both questions: ID is insufficient, provider/per-post flag and delivered data/rebuild are needed, and theme templates should be kept. Unasked version-specific form repair is not required. |

Compared with the current documentation under `docs/collections/_docs/`:
`02_config.md`, `04_layouts.md`, `12_fusejs-search.md`, `13_giscus-comments.md`,
`34_lunr-search.md`, `35_simplesearch-search.md`, `36_google-search.md`,
`37_algolia-search.md`, `39_cactus-comments.md` and `40_welcomments-comments.md`.

## Next context adjustments

1. Route ChulapaSearch/FAB/custom search dependency questions to the existing
   layout/dependency reference. These facts already exist; avoid copying them
   into unrelated sections. Check selection on the deployed source before
   attributing the error solely to missing retrieval.
2. Give a complete /find example with baseurl /my-blog: landing_page and
   permalink both /find; only the public address includes /my-blog. State that
   local search is not restricted to posts and About pages.
3. Make the shared maxwords recommendation actionable, including removal of
   obsolete provider overrides when switching to it.
4. Keep Giscus prerequisites next to its setup recipe and make Algolia's
   dependency-installation, site-directory and existing-setting preservation
   steps explicit.

These are candidates, not validated improvements. No context/code edits,
deployment or second inference round were performed in this batch. No theme
accessibility, SEO metadata or PWA behavior changed; public docs, llms.txt and
ai-context.md remain unchanged because this task records evaluation evidence.
