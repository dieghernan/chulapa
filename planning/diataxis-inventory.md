# Page-by-page Diátaxis inventory

Companion to the [strict transformation plan](documentation-adoption-audit.md).
Baseline: `main` after PR #106, 14 October 2026. Language: English.

This is the historical baseline inventory, not the current implementation status.
See [Implementation tracking](documentation-adoption-audit.md#implementation-tracking)
for merged work, the open delivery and the next proposed scope. Baseline scores
are intentionally unchanged.

The inventory covers tracked authored Markdown documentation, including hidden
`.github` release records, issue templates and agent policies, demos, skins, README files, developer records,
the homepage, six HTML demo pages and `llms.txt` are represented individually below.
Source paths link to the actual files. Public paths are route patterns from front
matter/configuration; the deployment prefix `/chulapa` is omitted. Blog records use
source paths because their public routes also depend on date/title configuration.
This inventory does not claim a live URL crawl or a beginner usability experiment.

Categories and scores describe reader intention and competing content, not technical
correctness. Every substantive secondary type is a design defect, including those
scored 8–9. A 10/10 specimen, directory or historical matrix is structurally pure;
that does not establish that it teaches, is complete, is current or is usable.
Shared scores for skin pages reflect their shared specimen-plus-setup structure,
not independent user-test results. See the plan for the scoring rubric and section
extraction decisions. Internal policies and legal/operational surfaces are boundary
Reference records; they do not become beginner lessons.


Inventory total: **137 source documents/surfaces** (113 primary; 24 supporting).

## Primary inventory: user-facing documentation and examples

| Source / page | URL or section | Dominant type | Secondary types | Purity | Evidence / action |
| --- | --- | --- | --- | --- | --- |
| [CHANGELOG.md](../CHANGELOG.md) | Repository source | Reference | — | 10/10 | Dated change record; retain historical/version scope. |
| [README.md](../README.md) | Repository source | Explanation | How-To Guides; Reference | 4/10 | Orientation mixes setup procedures and feature catalogs; route to quadrants. |
| [docs/_pages/404.md](../docs/_pages/404.md) | /404.html | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/archive.md](../docs/_pages/archive.md) | /archive | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/categories.md](../docs/_pages/categories.md) | /categories | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/contribute.md](../docs/_pages/contribute.md) | /contribute | How-To Guides | Reference | 8/10 | Contribution/reporting actions mix contribution-area catalog; first-contribution tutorial is missing. |
| [docs/_pages/demo.md](../docs/_pages/demo.md) | /demo | Reference | How-To Guides | 8/10 | Demo directory includes an index-layout construction example. |
| [docs/_pages/demo_archive.md](../docs/_pages/demo_archive.md) | /demo/archive | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/demo_category.md](../docs/_pages/demo_category.md) | /demo/category | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/demo_classicnavbar.html](../docs/_pages/demo_classicnavbar.html) | /demo/classic-navbar | Reference | — | 10/10 | Rendered layout/search specimen with illustrative front matter; link procedures separately. |
| [docs/_pages/demo_minimalheader.html](../docs/_pages/demo_minimalheader.html) | /demo/minimal-header | Reference | — | 10/10 | Rendered layout/search specimen with illustrative front matter; link procedures separately. |
| [docs/_pages/demo_searchfusejs.html](../docs/_pages/demo_searchfusejs.html) | /demo/search_fusejs | Reference | — | 10/10 | Rendered layout/search specimen with illustrative front matter; link procedures separately. |
| [docs/_pages/demo_searchgoogle.html](../docs/_pages/demo_searchgoogle.html) | /demo/search_google | Reference | — | 10/10 | Rendered layout/search specimen with illustrative front matter; link procedures separately. |
| [docs/_pages/demo_searchlunr.html](../docs/_pages/demo_searchlunr.html) | /demo/search_lunr | Reference | — | 10/10 | Rendered layout/search specimen with illustrative front matter; link procedures separately. |
| [docs/_pages/demo_searchsimple.html](../docs/_pages/demo_searchsimple.html) | /demo/search_simple | Reference | — | 10/10 | Rendered layout/search specimen with illustrative front matter; link procedures separately. |
| [docs/_pages/demo_tags.md](../docs/_pages/demo_tags.md) | /demo/tags | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/docs.md](../docs/_pages/docs.md) | /docs | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/license.md](../docs/_pages/license.md) | /license | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/pagespeed.md](../docs/_pages/pagespeed.md) | /pagespeed | Reference | Explanation | 8/10 | Recorded/dynamic performance results mix performance positioning; not proof for arbitrary sites. |
| [docs/_pages/search.md](../docs/_pages/search.md) | /search.html | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/_pages/showcase.md](../docs/_pages/showcase.md) | /showcase | Reference | How-To Guides | 9/10 | Site catalog includes submission instructions. |
| [docs/_pages/skins.md](../docs/_pages/skins.md) | /skins | Reference | How-To Guides | 9/10 | Skin directory includes a selection/application prompt. |
| [docs/_pages/tags.md](../docs/_pages/tags.md) | /tags | Reference | — | 10/10 | Navigation/service surface or rendered list specimen; no learning contract. Its score is structural, not a usability rating. |
| [docs/collections/_demo/01_plainpage.md](../docs/collections/_demo/01_plainpage.md) | /demo/01-plainpage | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/02_plainpage_img.md](../docs/collections/_demo/02_plainpage_img.md) | /demo/02-plainpage-img | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/03_postheader.md](../docs/collections/_demo/03_postheader.md) | /demo/03-postheader | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/04_heroproject.md](../docs/collections/_demo/04_heroproject.md) | /demo/04-heroproject | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/05_landinghero.md](../docs/collections/_demo/05_landinghero.md) | /demo/05-landinghero | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/06_guestauthor.md](../docs/collections/_demo/06_guestauthor.md) | /demo/06-guestauthor | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/07_guestauthor_no_avatar.md](../docs/collections/_demo/07_guestauthor_no_avatar.md) | /demo/07-guestauthor-no-avatar | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/08_minimal.md](../docs/collections/_demo/08_minimal.md) | /demo/08-minimal | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/09_image_header.md](../docs/collections/_demo/09_image_header.md) | /demo/09-image-header | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/10_plainpage_notags.md](../docs/collections/_demo/10_plainpage_notags.md) | /demo/10-plainpage-notags | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/11_related.md](../docs/collections/_demo/11_related.md) | /demo/11-related | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/12_related random.md](<../docs/collections/_demo/12_related random.md>) | /demo/12-related-random | Reference | Explanation | 8/10 | Visual/front-matter specimen includes behavioral explanation; move substantive reasoning to Explanation. |
| [docs/collections/_demo/13_mermaid.md](../docs/collections/_demo/13_mermaid.md) | /demo/13-mermaid | Reference | How-To Guides | 7/10 | Runnable feature specimen includes enablement instructions; separate task from specimen. |
| [docs/collections/_demo/14_photoswipe.md](../docs/collections/_demo/14_photoswipe.md) | /demo/14-photoswipe | Reference | How-To Guides | 7/10 | Runnable feature specimen includes enablement instructions; separate task from specimen. |
| [docs/collections/_demo/starter-personal-blog.md](../docs/collections/_demo/starter-personal-blog.md) | /demo/starter-personal-blog | Reference | How-To Guides | 7/10 | Rendered starter specimen embeds copy/configure instructions; link to a separate task guide. |
| [docs/collections/_demo/starter-portfolio.md](../docs/collections/_demo/starter-portfolio.md) | /demo/starter-portfolio | Reference | How-To Guides | 7/10 | Rendered starter specimen embeds copy/configure instructions; link to a separate task guide. |
| [docs/collections/_demo/starter-project.md](../docs/collections/_demo/starter-project.md) | /demo/starter-project | Reference | How-To Guides | 7/10 | Rendered starter specimen embeds copy/configure instructions; link to a separate task guide. |
| [docs/collections/_demo/starter-technical-blog.md](../docs/collections/_demo/starter-technical-blog.md) | /demo/starter-technical-blog | Reference | How-To Guides | 7/10 | Rendered starter specimen embeds copy/configure instructions; link to a separate task guide. |
| [docs/collections/_docs/00_start.md](../docs/collections/_docs/00_start.md) | /docs/00-start | Tutorials | How-To Guides; Reference | 3/10 | Guided publication, independent image/skin tasks, starter catalog and local setup share one page. |
| [docs/collections/_docs/01_install.md](../docs/collections/_docs/01_install.md) | /docs/01-install | How-To Guides | Reference; Explanation | 5/10 | Multiple installation procedures mix compatibility facts and method/override rationale. |
| [docs/collections/_docs/02_config.md](../docs/collections/_docs/02_config.md) | /docs/02-config | Reference | How-To Guides; Explanation | 3/10 | Field/default catalogs alternate with identity, navigation and integration procedures and metadata concepts. |
| [docs/collections/_docs/03_theming.md](../docs/collections/_docs/03_theming.md) | /docs/03-theming | How-To Guides | Reference; Explanation | 5/10 | Skin/color/font/Autothemer tasks mix variable constraints and customization relationships. |
| [docs/collections/_docs/04_layouts.md](../docs/collections/_docs/04_layouts.md) | /docs/04-layouts | Reference | Tutorials; How-To Guides; Explanation | 2/10 | Initial learning examples, media recipes, interface catalogs and design reasoning need separate destinations. |
| [docs/collections/_docs/05_faq.md](../docs/collections/_docs/05_faq.md) | /docs/05-faq | How-To Guides | Reference; Explanation | 5/10 | Recovery and editing tasks share hook/version reference and conceptual background. |
| [docs/collections/_docs/06_accessibility-performance.md](../docs/collections/_docs/06_accessibility-performance.md) | /docs/06-accessibility-performance | How-To Guides | Explanation; Reference | 5/10 | Reader checks mix loading/offline explanation and coverage/compatibility facts. |
| [docs/collections/_docs/07_migration.md](../docs/collections/_docs/07_migration.md) | /docs/07-migration | How-To Guides | Reference; Explanation | 6/10 | Migration sequence mixes field-mapping reference and inheritance/version reasoning. |
| [docs/collections/_docs/99_highlighting.md](../docs/collections/_docs/99_highlighting.md) | /docs/syntax-highlighting | Reference | How-To Guides | 8/10 | Rendered syntax catalog includes a procedure to apply a choice. |
| [docs/collections/_docs/99_markdown-cheatsheet.md](../docs/collections/_docs/99_markdown-cheatsheet.md) | /docs/markdown-cheatsheet | Reference | Explanation; How-To Guides | 5/10 | Syntax lookup mixes Markdown/kramdown introductions and TOC instructions. |
| [docs/collections/_docs/99_variable-dict.md](../docs/collections/_docs/99_variable-dict.md) | /docs/variable-dictionary | Reference | How-To Guides | 8/10 | Systematic variable definitions open with configuration instructions. |
| [docs/collections/_posts/2020-05-15-welcome.md](../docs/collections/_posts/2020-05-15-welcome.md) | Repository source | Explanation | Reference | 7/10 | Motivation and product background include capability descriptions; retain as dated article. |
| [docs/collections/_posts/2026-10-09-building-a-documentation-chatbot.md](../docs/collections/_posts/2026-10-09-building-a-documentation-chatbot.md) | Repository source | Explanation | How-To Guides; Reference | 5/10 | Announcement explains the assistant, gives usage directions and describes behavior/storage. |
| [docs/collections/_posts/2026-10-09-chulapa-v2-1-0.md](../docs/collections/_posts/2026-10-09-chulapa-v2-1-0.md) | Repository source | Explanation | How-To Guides; Reference | 4/10 | Release narrative mixes recipes, feature/version facts and upgrade directions. |
| [docs/collections/_skins/academia.md](../docs/collections/_skins/academia.md) | /skins/academia | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/butterfly-dark.md](../docs/collections/_skins/butterfly-dark.md) | /skins/butterfly-dark | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/butterfly-dim.md](../docs/collections/_skins/butterfly-dim.md) | /skins/butterfly-dim | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/butterfly.md](../docs/collections/_skins/butterfly.md) | /skins/butterfly | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/chulapa.md](../docs/collections/_skins/chulapa.md) | /skins/chulapa | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/current.md](../docs/collections/_skins/current.md) | /skins/current | Reference | — | 10/10 | Component specimen for the current configuration. |
| [docs/collections/_skins/cyborg.md](../docs/collections/_skins/cyborg.md) | /skins/cyborg | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/darkly.md](../docs/collections/_skins/darkly.md) | /skins/darkly | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/deeply.md](../docs/collections/_skins/deeply.md) | /skins/deeply | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/electro.md](../docs/collections/_skins/electro.md) | /skins/electro | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/flatly.md](../docs/collections/_skins/flatly.md) | /skins/flatly | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/focal.md](../docs/collections/_skins/focal.md) | /skins/focal | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/gitdev-dark.md](../docs/collections/_skins/gitdev-dark.md) | /skins/gitdev-dark | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/gitdev.md](../docs/collections/_skins/gitdev.md) | /skins/gitdev | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/graymor.md](../docs/collections/_skins/graymor.md) | /skins/graymor | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/hootstrap.md](../docs/collections/_skins/hootstrap.md) | /skins/hootstrap | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/journal.md](../docs/collections/_skins/journal.md) | /skins/journal | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/listen.md](../docs/collections/_skins/listen.md) | /skins/listen | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/lux.md](../docs/collections/_skins/lux.md) | /skins/lux | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/lymcha.md](../docs/collections/_skins/lymcha.md) | /skins/lymcha | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/materia.md](../docs/collections/_skins/materia.md) | /skins/materia | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/media.md](../docs/collections/_skins/media.md) | /skins/media | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/mickie.md](../docs/collections/_skins/mickie.md) | /skins/mickie | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/minco.md](../docs/collections/_skins/minco.md) | /skins/minco | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/minty.md](../docs/collections/_skins/minty.md) | /skins/minty | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/monotone.md](../docs/collections/_skins/monotone.md) | /skins/monotone | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/navi.md](../docs/collections/_skins/navi.md) | /skins/navi | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/pear.md](../docs/collections/_skins/pear.md) | /skins/pear | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/preptor.md](../docs/collections/_skins/preptor.md) | /skins/preptor | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/skeeblu.md](../docs/collections/_skins/skeeblu.md) | /skins/skeeblu | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/sketchy.md](../docs/collections/_skins/sketchy.md) | /skins/sketchy | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/slate.md](../docs/collections/_skins/slate.md) | /skins/slate | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/solar.md](../docs/collections/_skins/solar.md) | /skins/solar | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/sunset.md](../docs/collections/_skins/sunset.md) | /skins/sunset | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/towards.md](../docs/collections/_skins/towards.md) | /skins/towards | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/twitter-dim.md](../docs/collections/_skins/twitter-dim.md) | /skins/twitter-dim | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/twitter-lights-out.md](../docs/collections/_skins/twitter-lights-out.md) | /skins/twitter-lights-out | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/twitter.md](../docs/collections/_skins/twitter.md) | /skins/twitter | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/united.md](../docs/collections/_skins/united.md) | /skins/united | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/universal.md](../docs/collections/_skins/universal.md) | /skins/universal | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/wandoo.md](../docs/collections/_skins/wandoo.md) | /skins/wandoo | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/collections/_skins/yeti.md](../docs/collections/_skins/yeti.md) | /skins/yeti | Reference | How-To Guides | 6/10 | Skin/component specimen embeds configuration/Autothemer setup; move procedure to a canonical how-to. |
| [docs/blog/index.html](../docs/blog/index.html) | /blog/ | Reference | — | 10/10 | Documented runnable pagination/index specimen; user-facing reference linked from configuration and layouts. |
| [docs/index.html](../docs/index.html) | / | Explanation | Reference | 7/10 | Product orientation mixes feature/example catalogs and installation alternatives. |
| [docs/llms.txt](../docs/llms.txt) | /llms.txt | Reference | — | 10/10 | Selective machine-facing documentation directory with compatibility constraints. |
| [examples/README.md](../examples/README.md) | Repository source | Reference | How-To Guides | 8/10 | Starter catalog includes setup/publishing directions. |
| [examples/personal-blog/README.md](../examples/personal-blog/README.md) | Repository source | How-To Guides | Reference | 7/10 | Copy/run/publish procedure mixes structural/configuration facts; extract catalog facts. |
| [examples/personal-blog/_posts/2026-01-01-first-post.md](../examples/personal-blog/_posts/2026-01-01-first-post.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |
| [examples/personal-blog/index.md](../examples/personal-blog/index.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |
| [examples/portfolio/README.md](../examples/portfolio/README.md) | Repository source | How-To Guides | Reference | 7/10 | Copy/run/publish procedure mixes structural/configuration facts; extract catalog facts. |
| [examples/portfolio/_projects/field-notes.md](../examples/portfolio/_projects/field-notes.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |
| [examples/portfolio/_projects/site-redesign.md](../examples/portfolio/_projects/site-redesign.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |
| [examples/portfolio/index.md](../examples/portfolio/index.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |
| [examples/project/README.md](../examples/project/README.md) | Repository source | How-To Guides | Reference | 7/10 | Copy/run/publish procedure mixes structural/configuration facts; extract catalog facts. |
| [examples/project/index.md](../examples/project/index.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |
| [examples/technical-blog/README.md](../examples/technical-blog/README.md) | Repository source | How-To Guides | Reference | 7/10 | Copy/run/publish procedure mixes structural/configuration facts; extract catalog facts. |
| [examples/technical-blog/_posts/2026-01-01-first-post.md](../examples/technical-blog/_posts/2026-01-01-first-post.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |
| [examples/technical-blog/index.md](../examples/technical-blog/index.md) | Repository source | Reference | — | 10/10 | Runnable content specimen, not an authored tutorial; do not direct first-time users here as a complete publishing path. |

## Supporting inventory: maintainer, release, policy and test records

These records complete repository coverage. Their restructuring is deferred; they
are not prerequisites for the user-documentation transformation and should not be
added to the chatbot context simply because they appear here.

| Source / page | URL or section | Dominant type | Secondary types | Purity | Evidence / action |
| --- | --- | --- | --- | --- | --- |
| [.github/ISSUE_TEMPLATE/AOB.md](../.github/ISSUE_TEMPLATE/AOB.md) | Repository source | Reference | — | 10/10 | Issue submission form/schema; supporting contribution interface, not a learning document. |
| [.github/ISSUE_TEMPLATE/bug_report.md](../.github/ISSUE_TEMPLATE/bug_report.md) | Repository source | Reference | — | 10/10 | Issue submission form/schema; supporting contribution interface, not a learning document. |
| [.github/ISSUE_TEMPLATE/documentation.md](../.github/ISSUE_TEMPLATE/documentation.md) | Repository source | Reference | — | 10/10 | Issue submission form/schema; supporting contribution interface, not a learning document. |
| [.github/ISSUE_TEMPLATE/feature_request.md](../.github/ISSUE_TEMPLATE/feature_request.md) | Repository source | Reference | — | 10/10 | Issue submission form/schema; supporting contribution interface, not a learning document. |
| [.github/ISSUE_TEMPLATE/new_skin.md](../.github/ISSUE_TEMPLATE/new_skin.md) | Repository source | Reference | — | 10/10 | Issue submission form/schema; supporting contribution interface, not a learning document. |
| [.github/release-checklist.md](../.github/release-checklist.md) | Repository source | Reference | How-To Guides; Explanation | 6/10 | Dated release validation mixes actionable release procedures and rationale; supporting maintainer scope. |
| [.github/release-notes-v2.1.0.md](../.github/release-notes-v2.1.0.md) | Repository source | Reference | How-To Guides | 8/10 | Release facts include an installation procedure; preserve as a historical release record. |
| [.github/skills/html-style/SKILL.md](../.github/skills/html-style/SKILL.md) | Repository source | Reference | — | 10/10 | Internal normative agent/style policy; supporting scope, not a user guide. |
| [AGENTS.md](../AGENTS.md) | Repository source | Reference | — | 10/10 | Internal normative instructions, not a learner guide. |
| [_sass/highlight/README.md](../_sass/highlight/README.md) | Repository source | Reference | How-To Guides | 6/10 | Theme/source catalog mixes shell generation and non-Jekyll application procedures. |
| [docs/AGENTS.md](../docs/AGENTS.md) | Repository source | Reference | — | 10/10 | Internal editorial/publishing requirements; preserve policy constraints during transformation. |
| [docs/README.md](../docs/README.md) | Repository source | How-To Guides | Explanation; Reference | 6/10 | Local preview steps mix site/assistant architecture and configuration facts. |
| [docs/ai-chatbot/README.md](../docs/ai-chatbot/README.md) | Repository source | How-To Guides | Reference; Explanation | 3/10 | Build/deploy/embed/evaluate procedures mix configuration, architecture and results. |
| [docs/ai-chatbot/ai-context.md](../docs/ai-chatbot/ai-context.md) | Repository source | Reference | How-To Guides; Explanation | 3/10 | Machine-consumed mixed summary, not a public guide; organize source pointers by intention when upstream sources split. |
| [docs/ai-chatbot/evaluation.md](../docs/ai-chatbot/evaluation.md) | Repository source | Reference | How-To Guides; Explanation | 5/10 | Historical observations mix reproduction/update instructions and design reasoning. |
| [docs/ai-chatbot/evaluations/docs-accessibility-2026-10-13.md](../docs/ai-chatbot/evaluations/docs-accessibility-2026-10-13.md) | Repository source | Reference | Explanation | 8/10 | Dated evaluation findings with interpretation; preserve as an evidence record. |
| [docs/ai-chatbot/evaluations/review-2026-10-08.md](../docs/ai-chatbot/evaluations/review-2026-10-08.md) | Repository source | Reference | Explanation | 8/10 | Dated evaluation findings with interpretation; preserve as an evidence record. |
| [test/README.md](../test/README.md) | Repository source | How-To Guides | Reference; Explanation | 4/10 | Many runbooks share command/coverage catalogs and test-design discussion. |
| [test/accessibility-review.md](../test/accessibility-review.md) | Repository source | Reference | How-To Guides; Explanation | 6/10 | Dated findings and limits mix reproduction procedures and rationale; extract reusable runbooks. |
| [test/closed-issue-regressions.md](../test/closed-issue-regressions.md) | Repository source | Reference | — | 10/10 | Issue-to-check coverage matrix; retain issue/version/date scope. |
| [test/head-formatting-validation.md](../test/head-formatting-validation.md) | Repository source | Reference | How-To Guides; Explanation | 6/10 | Dated findings and limits mix reproduction procedures and rationale; extract reusable runbooks. |
| [test/microformats-validation.md](../test/microformats-validation.md) | Repository source | Reference | How-To Guides; Explanation | 6/10 | Dated findings and limits mix reproduction procedures and rationale; extract reusable runbooks. |
| [test/personal-site-validation.md](../test/personal-site-validation.md) | Repository source | Reference | Explanation | 8/10 | Dated assessment/results with interpretation; do not turn historical evidence into a current guarantee. |
| [test/testing-review.md](../test/testing-review.md) | Repository source | Reference | Explanation | 8/10 | Dated assessment/results with interpretation; do not turn historical evidence into a current guarantee. |
## Exclusions: fixture content and generated artifacts

The following test-site Markdown files are synthetic or sample fixture content,
not documentation addressed to users or contributors. They are listed to make the
scope reproducible, rather than assigning misleading tutorial/purity scores:

- `test/_cheatsheet/01_markdown-cheat-sheet.md`
- `test/_cheatsheet/02_kramdown-cheat-sheet.md`
- `test/_pages/404.md`
- `test/_pages/archive.md`
- `test/_pages/categories.md`
- `test/_pages/cheatsheet.md`
- `test/_pages/current_skin.md`
- `test/_pages/search.md`
- `test/_pages/tags.md`
- `test/_posts/2015-01-04-first-post.md`
- `test/_posts/2015-01-15-pirates.md`
- `test/_posts/2015-01-19-soccer.md`
- `test/_posts/2015-01-27-dear-diary.md`
- `test/_posts/2015-02-13-hamlet-monologue.md`
- `test/_posts/2015-02-20-test-markdown.md`
- `test/_posts/2015-02-26-flake-it-till-you-make-it.md`
- `test/_posts/2018-11-09-urban_art.md`
- `test/_posts/2019-05-02-dean-village.md`
- `test/_posts/2019-08-03-landing-page.md`
- `test/_posts/2019-11-27-acueduct-of-segovia.md`
- `test/_posts/2020-12-31-current-skin.md`
- `test/index.md`

Generated `_site` output, dependency trees, machine evaluation JSON/JSONL, test code,
stylesheets and configuration source are not additional authored documentation pages.
Their interfaces and examples are assessed through the corresponding Reference or
developer documents. This planning directory is the audit deliverable, not part of
the pre-existing documentation under audit. External GitHub wiki pages and third-party
documentation are outside this repository inventory; no completeness claim is made for them.
