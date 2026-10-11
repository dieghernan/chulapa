# Closed issue regression coverage

Reviewed on 2026-10-11 against all 10 closed issues carrying the `bug` label.
Issue #39 is included separately because it reports a feed problem but was
resolved as configuration. This table records the reported failure and the
behavior checked, rather than treating a successful site build as coverage.

| Issue | Regression coverage | Checked behavior |
| --- | --- | --- |
| [#86](https://github.com/dieghernan/chulapa/issues/86) — Microformats metadata | [check_microformats.rb](check_microformats.rb), [check_microformats_feeds.rb](check_microformats_feeds.rb) | Updated entries retain publication dates; minimal/custom layouts do not declare accidental entries; author profile URLs and guest isolation survive root/subdirectory builds. |
| [#81](https://github.com/dieghernan/chulapa/issues/81) — Canonical URLs and descriptions | [check_seo_fixes.rb](check_seo_fixes.rb), [check_social_metadata.rb](check_social_metadata.rb) | Preserve filenames containing `index.html`; normalize terminal index files; align canonical/OG/JSON-LD/feed URLs; handle explicit overrides, long descriptions, entities and empty title components. Packaging checks separately cover sitemap and pagination. |
| [#72](https://github.com/dieghernan/chulapa/issues/72) — Microdata and media | [check_microdata.rb](check_microdata.rb), [check_article_images.rb](check_article_images.rb), [check_video_examples.rb](check_video_examples.rb) | Extract actual microdata values and scope boundaries; verify provider/media URLs, missing/escaped metadata, multiple article images and deferred playback metadata. |
| [#66](https://github.com/dieghernan/chulapa/issues/66) — Twitter/X profile paths | [check_head_metadata.rb](check_head_metadata.rb) | Accept profile queries/fragments/trailing slashes; reject status/root/auxiliary paths and deceptive domains; continue after rejected links; isolate guest authors. |
| [#50](https://github.com/dieghernan/chulapa/issues/50) — Missing Vimeo ID | [check_microdata.rb](check_microdata.rb) | Vimeo embed URL equals `https://player.vimeo.com/video/123?dnt=true`, including the ID, in root and subdirectory builds. |
| [#45](https://github.com/dieghernan/chulapa/issues/45) — Minimal layout JavaScript exception | [check_chulapa_script.js](check_chulapa_script.js) | A missing `maincontent` element causes no exception and tooltips still initialize; empty and populated main content work too. |
| [#41](https://github.com/dieghernan/chulapa/issues/41) — SCSS footer colors | [check_skin_variables.rb](check_skin_variables.rb) | Compile two distinct custom palettes; footer link color uses `footer-chulapa-link-color`, hover/focus use `footer-chulapa-hover-color`. The issue's FAB-navbar hover color was confirmed intentional in its closing comments, not changed as a bug fix. |
| [#36](https://github.com/dieghernan/chulapa/issues/36) — Missing related component | [check_related_ranking.rb](check_related_ranking.rb) | Render related/random recommendations and verify eligible documents, ranking, ties and full-pool sampling. Closing comments identify this as the same grouping compatibility problem as #29. |
| [#29](https://github.com/dieghernan/chulapa/issues/29) — Cloud grouping on Jekyll 4 | [check_cloud_performance.rb](check_cloud_performance.rb), [check_liquid_indexes.rb](check_liquid_indexes.rb) | Nonempty tag/category names and correct counts; ordering, collection selection, duplicates and empty results. Distinct tag/category labels, counts and memberships detect accidental field substitution. Run on both Jekyll 3 and 4. |
| [#19](https://github.com/dieghernan/chulapa/issues/19) — Collection card theming | [check_skin_variables.rb](check_skin_variables.rb) | Render cards with their theme classes and compile distinct card backgrounds, text colors and configured index-card borders. |
| [#39](https://github.com/dieghernan/chulapa/issues/39) — Empty Atom feed (configuration) | [check_feed_selection.rb](check_feed_selection.rb) | Atom/RSS inclusion is opt-in; post defaults work, explicit opt-out wins, dates order entries, genuinely absent Liquid dates are excluded, content and baseurl are retained. Jekyll may derive a collection date from file metadata; an omitted YAML date is not necessarily a nil document date. |

The theme regression workflow runs these self-contained tests automatically.
[check_theme_installation.rb](check_theme_installation.rb) runs in separate CI
jobs on both Jekyll versions with a freshly built gem and installation-only
bundles. A local theme path dependency cannot verify that a fixture used the
installed gem. [check_navigation_browser.js](check_navigation_browser.js) also
checks actual keyboard/focus/resize behavior in Chromium. See [README.md](README.md)
for local commands and the broader accessibility review.

Compiled CSS assertions check variable wiring; JavaScript assertions check
interaction state. They do not establish visual contrast, responsive layout,
screen reader behavior, or external search eligibility. Browser checks remain
documented separately.
