# Retest of 20 older non-pass cases — 22 October 2026

The 20 oldest catalog cases with a logged non-pass status were selected; after
the 18 cases with evidence dated before 22 October, the two next-oldest
catalogued cases from 22 October were added. The six cases in the preceding
layout pass were excluded. Every selected case was sent once to the current
Worker and reviewed against its catalog criteria and current documentation.

Worker version: `5266df62-1349-482e-a687-101e675c7721` (100% traffic)
Deployment time: `2026-10-22T12:57:35.400125Z`
Response window: `2026-10-22T13:06:11.982Z` to `2026-10-22T13:11:39.447Z`

Raw responses: [JSONL](older-nonpass20-2026-10-22.jsonl). Machine-readable
findings: [review JSON](older-nonpass20-2026-10-22-review.json).

| Case | Previous status | HTTP | Review | Finding |
| --- | --- | ---: | --- | --- |
| `search-comments-4` | partial | 200 | partial | Gives `show_attrib: false` and correctly says the legacy word limit takes precedence; omits the recommendation to use shared `maxwords` and the separate Algolia logo setting. |
| `reference-edge-cases-3` | fail | 200 | pass | Provides both Sass variables under `chulapa-skin.vars`, quotes the font stack and gives applicable steps and sources. |
| `seo-1` | pending review | 200 | partial | Correctly explains the canonical URL syntax and that it does not redirect visitors; omits `sitemap: false` for excluding a duplicate URL from `jekyll-sitemap`. |
| `seo-2` | pending review | 200 | pass | Correctly separates browser/structured title, social title, visible title and description metadata. |
| `seo-3` | pending review | 200 | pass | Correctly maps `zh-Hant` to explicit `og_locale: zh_TW`, handles alternate locales and disclaims automatic translations or `hreflang`. |
| `seo-4` | pending review | 200 | pass | Correctly distinguishes `schema_image`, `og_image` and `header_img` and says there is no cropping or validation. |
| `navigation-1` | pending review | 200 | pass | Gives the tag thresholds, build-time random selection, singleton behavior and the date-footer option. |
| `navigation-2` | pending review | 200 | fail | Breadcrumb guidance is broadly correct, but it recommends `navbar.nav` rather than `project_links` for the requested GitHub header button and omits the required `label`. |
| `navigation-3` | pending review | 200 | partial | Correctly names `words_per_minute` and `paginator_maxnum` with defaults/clamping; omits that the latter only controls the window when pagination is otherwise enabled and cites an unrelated topics page. |
| `variables-unsupported` | unavailable | 200 | pass | Does not invent a temperature variable and clearly says the documentation has no such setting. |
| `starter-1` | partial | 200 | fail | Correctly notes portfolio cards do not filter, but confuses Chulapa 101's publishing workflow with the portfolio example and fails to state that the four examples have no deployment workflow. |
| `starter-2` | partial | 200 | partial | Identifies the template, sample counts, archives, search, RSS, pagination and absence of a profile selector; omits the Light/Dark/Auto selector, content/assets locations, optional hooks/custom CSS and publishing-workflow distinction. |
| `accessibility-1` | partial | 200 | pass | Correctly says the sidebar TOC is not modal, preserves Tab navigation without a focus trap, returns focus on Escape and makes no WCAG-certification claim. |
| `resources-1` | fail | 200 | partial | Correctly says the bundled font needs no external loading and does not invent Cactus behavior; omits the theme-local font paths/`baseurl` and the documented `show_comments: true` condition for Cactus resources. |
| `version-task-1` | partial | 200 | partial | Correctly says the marker is not an exact commit/override inventory and confirms v2.2.0 can be pinned; omits the resolved gem version check and broader limits of what a remote marker can establish. |
| `community-1` | pending review | 200 | pass | Clearly distinguishes `header_type: splash` from `hero` and gives a usable front matter example. |
| `community-2` | pending review | 200 | pass | Correctly distinguishes collection filtering from category selection and gives a `site.categories.music` Liquid/index-card example. |
| `community-3` | pending review | 200 | pass | Gives valid Markdown alert attributes and both HTML and Markdown button examples without requiring a theme change. |
| `community-4` | pending review | 200 | partial | Correctly covers `include_on_feed`, collection output and plugin collisions; incorrectly implies every post needs an explicit date, while Jekyll can resolve dates from post filenames. |
| `community-5` | pending review | 200 | partial | Includes dependency installation, theme/plugin configuration and the preview command; omits the remote-theme alternative and speculates about an "unknown include" without first asking for configuration/version details. |

**Totals:** 10 pass, 8 partial, 2 fail, 0 unavailable. All 20 requests
returned HTTP 200; the review labels reflect answer content, not transport.
These results apply only to Worker `5266df62-1349-482e-a687-101e675c7721`.
