# Diátaxis reassessment after PR #140

Date: 15 October 2026. Language: English.
Reviewed snapshot: [`adf9207c7`](https://github.com/dieghernan/chulapa/tree/adf9207c714155676b1c13d9297f558056f45e79),
main after #140. This report is internal planning, not published documentation.

## Scope and unchanged rubric

Review scope: all **66 Docs collection pages**, the documentation directory,
README and homepage: **69 surfaces**. This compares the same **28 surfaces**
assessed after #117 with **41 subsequently added pages** assessed independently.
Demos, skins, example READMEs, service pages, contributor material and external
provider documentation are outside the scored inventory. This is not a claim
to have scored every public page in the repository.

Keep the [original audit](documentation-adoption-audit.md#strict-classification-rules),
[historical inventory](diataxis-inventory.md), [previous reassessment](diataxis-reassessment-2026-10-14.md)
and [anchor-review record](legacy-anchor-review-2026-10-15.md) unchanged as snapshots.

Same strict rubric: **10** one intention; **8–9** limited competing content;
**6–7** a substantial second intention; **4–5** multiple intentions and frequent
switches; **1–3** several types without a coherent contract. Any substantive
secondary type remains a design defect. Prerequisites, brief definitions,
compatibility/safety constraints and links do not alone introduce another type.
A minimal YAML or Liquid specimen can be Reference; an independent editing and
publication procedure is How-To. A task for an existing site does not become a
Tutorial simply because it has steps or a copyable example.

T = Tutorials, H = How-To Guides, R = Reference, E = Explanation. Directories use
the original inventory's boundary R classification. Scores are editorial
judgements, not official Diátaxis metrics or precise measurements. Adjacent
scores should not be read as quantitative precision.

The assessment considers current source content, reader contract, actual
procedures versus specimens and extraction destinations. It is not an automated
heading classifier. Inventory formatting/count checks do not validate the
editorial judgement. A 10 establishes neither full option coverage nor factual
correctness, findability, accessibility, live integration success or usability.

## Comparable results

Across the same 28 previously assessed surfaces, **11 improve, 17 stay unchanged
and none decrease**. The 41 newer pages have no previous score and are not
counted as before/after gains. There is **no all-page average**: adding many
narrow guides would distort comparisons with a fixed historical denominator.

| Existing surface | After #117 | After #140 | Reason / remaining boundary |
| --- | --- | --- | --- |
| Start | 10 | 10 | Still one guided first success; removal of obsolete links improves focus without increasing purity above 10. |
| Installation | 10 | 10 | Method directory remains R; duplicate routing headings removed. |
| Global settings | 6 | 10 | Provider and publisher workflows extracted; remaining definitions, examples and compatibility limits are R. This does not certify exhaustive YAML coverage. |
| Theming | 5 | 10 | Configuration procedures and precedence explanation have canonical H/E destinations; the page is now lookup. |
| Layouts | 5 | 7 | Many procedures extracted; cloud/index/search/indexing/custom-card workflows still interrupt R. Still mixed and incomplete. |
| FAQ | 5 | 8 | Mostly a question directory; several short editing recipes remain. Still mixed. |
| Accessibility/performance | 5 | 10 | Practical checks separated from behavior/coverage Reference. No compliance claim. |
| Migration | 6 | 10 | Procedure/checklist separated from mapping Reference; constraints support the task. |
| Highlighting | 8 | 10 | Preview specimens retained, applying the choice moved to H. |
| Markdown | 5 | 10 | Syntax lookup retained; index-insertion procedure extracted, background reduced to definitions. |
| Variables | 8 | 10 | Lookup and specimens retained; editing and precedence reasoning routed to H/E. |
| Docs directory | 9 | 10 | Four intent groups; duplicated publishing explanation removed. Length/findability remains a separate concern. |
| README | 4 | 7 | Setup instructions replaced by routes; substantial product orientation and feature/example catalog still coexist. |
| Homepage | 7 | 7 | E product orientation plus R example/feature catalog persists; improved calls to action are not a purity gain. |
| Fourteen pages 08–21 | 10 each | 10 each | Existing task/reference contracts remain; assess coverage separately. |

README/home are intentionally product entry surfaces. Their E/R mix is recorded
under the same strict rubric, not silently exempted or reclassified to earn 10.
A lower purity score here does not alone justify removing useful product context.

## Complete Docs inventory

Each row is one actual source page. URLs identify the reviewed public route;
source links support review. The previous-score column refers only to #117.
All 41 new pages are listed, not averaged into a project score.

| Page and source | Dominant | Secondary | #117 | Now | Evidence / remaining design defect |
| --- | --- | --- | --- | --- | --- |
| [Publish your first site with Chulapa](../docs/collections/_docs/00_start.md) ([URL](https://dieghernan.github.io/chulapa/docs/00-start)) | T | — | 10 | 10 | One fixed browser exercise ends at a published site/title/article. Old-version routing no longer interrupts it; optional next tasks are links. |
| [Installation](../docs/collections/_docs/01_install.md) ([URL](https://dieghernan.github.io/chulapa/docs/01-install)) | R | — | 10 | 10 | Alternative-method directory, preview and release constraints; all installation sequences are links. |
| [Global settings](../docs/collections/_docs/02_config.md) ([URL](https://dieghernan.github.io/chulapa/docs/02-config)) | R | — | 6 | 10 | Identity/navigation/provider/publisher field contracts and defaults; setup sequences now live in H guides. Short definitions and compatibility limits support lookup. |
| [Theming Chulapa](../docs/collections/_docs/03_theming.md) ([URL](https://dieghernan.github.io/chulapa/docs/03-theming)) | R | — | 5 | 10 | Appearance inputs, defaults and constraints; Sass sandbox and save/publish steps have separate H destinations and precedence has an E destination. |
| [Layouts and snippets](../docs/collections/_docs/04_layouts.md) ([URL](https://dieghernan.github.io/chulapa/docs/04-layouts)) | R | H | 5 | 7 | Substantial remaining H: two-step cloud setup, filename-ordered index setup, duplicated search-page configuration, indexing scopes and custom post-card insertion. Source/parameter specimens alone are not defects. |
| [Frequently asked questions](../docs/collections/_docs/05_faq.md) ([URL](https://dieghernan.github.io/chulapa/docs/05-faq)) | R | H | 5 | 8 | Question/task directory now dominates; short article-creation, skin-change and preview/save instructions still compete with routing. These are limited H material, not independent E. |
| [Accessibility and performance](../docs/collections/_docs/06_accessibility-performance.md) ([URL](https://dieghernan.github.io/chulapa/docs/06-accessibility-performance)) | H | — | 5 | 10 | Site inspection and correction sequence; expected behavior, version limits and review scope are linked to R. Safety/offline cautions constrain the task. |
| [Migrating from another Jekyll theme](../docs/collections/_docs/07_migration.md) ([URL](https://dieghernan.github.io/chulapa/docs/07-migration)) | H | — | 6 | 10 | Existing-site migration sequence, checklist and troubleshooting. Field mappings are separate R; override/version cautions support the migration task. |
| [Starter examples reference](../docs/collections/_docs/08_starter-examples.md) ([URL](https://dieghernan.github.io/chulapa/docs/08-starter-examples)) | R | — | 10 | 10 | Source/preview/content catalog with constraints; setup is delegated to H, not reproduced. |
| [Run and publish a starter example](../docs/collections/_docs/09_run-starter.md) ([URL](https://dieghernan.github.io/chulapa/docs/09-run-starter)) | H | — | 10 | 10 | Existing-site task: Run and publish a starter example. Task sections include “Prepare your copy; Preview the site”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add or change a menu link](../docs/collections/_docs/10_edit-menu.md) ([URL](https://dieghernan.github.io/chulapa/docs/10-edit-menu)) | H | — | 10 | 10 | Existing-site task: Add or change a menu link. Task sections include “Edit the link; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Edit footer links](../docs/collections/_docs/11_edit-footer.md) ([URL](https://dieghernan.github.io/chulapa/docs/11-edit-footer)) | H | — | 10 | 10 | Existing-site task: Edit footer links. Task sections include “Edit the links; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Fuse.js search](../docs/collections/_docs/12_fusejs-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/12-fusejs-search)) | H | — | 10 | 10 | Existing-site task: Enable Fuse.js search. Task sections include “Configure the search page; Check a result”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable giscus comments on a post](../docs/collections/_docs/13_giscus-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/13-giscus-comments)) | H | — | 10 | 10 | Existing-site task: Enable giscus comments on a post. Task sections include “Connect giscus; Verify the comments area”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Change your site's name and author](../docs/collections/_docs/14_site-details.md) ([URL](https://dieghernan.github.io/chulapa/docs/14-site-details)) | H | — | 10 | 10 | Existing-site task: Change your site's name and author. Task sections include “Update the existing site settings; Match the home-page heading”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Create and publish a post](../docs/collections/_docs/15_create-post.md) ([URL](https://dieghernan.github.io/chulapa/docs/15-create-post)) | H | — | 10 | 10 | Existing-site task: Create and publish a post. Task sections include “Create the file; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Create a page and link it from the menu](../docs/collections/_docs/16_create-page.md) ([URL](https://dieghernan.github.io/chulapa/docs/16-create-page)) | H | — | 10 | 10 | Existing-site task: Create a page and link it from the menu. Task sections include “Create or edit the page; Add the menu link”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add an image to a post or page](../docs/collections/_docs/17_add-image.md) ([URL](https://dieghernan.github.io/chulapa/docs/17-add-image)) | H | — | 10 | 10 | Existing-site task: Add an image to a post or page. Task sections include “Upload the file; Insert it into the content”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable GoatCounter analytics](../docs/collections/_docs/18_goatcounter.md) ([URL](https://dieghernan.github.io/chulapa/docs/18-goatcounter)) | H | — | 10 | 10 | Existing-site task: Enable GoatCounter analytics. Task sections include “Set the counting address; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Google Analytics 4](../docs/collections/_docs/19_google-analytics.md) ([URL](https://dieghernan.github.io/chulapa/docs/19-google-analytics)) | H | — | 10 | 10 | Existing-site task: Enable Google Analytics 4. Task sections include “Set the measurement ID; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Install using a remote theme](../docs/collections/_docs/20_remote-theme.md) ([URL](https://dieghernan.github.io/chulapa/docs/20-remote-theme)) | H | — | 10 | 10 | Existing-site task: Install using a remote theme. Task sections include “Update your theme and dependencies; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Install using the theme gem](../docs/collections/_docs/21_gem-theme.md) ([URL](https://dieghernan.github.io/chulapa/docs/21-gem-theme)) | H | — | 10 | 10 | Existing-site task: Install using the theme gem. Task sections include “Configure the gem; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Choose a skin](../docs/collections/_docs/22_choose-skin.md) ([URL](https://dieghernan.github.io/chulapa/docs/22-choose-skin)) | H | — | — | 10 | Existing-site task: Choose a skin. Task sections include “Set the skin name; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Change a color](../docs/collections/_docs/23_change-color.md) ([URL](https://dieghernan.github.io/chulapa/docs/23-change-color)) | H | — | — | 10 | Existing-site task: Change a color. Task sections include “Edit the color; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Change the fonts](../docs/collections/_docs/24_change-fonts.md) ([URL](https://dieghernan.github.io/chulapa/docs/24-change-fonts)) | H | — | — | 10 | Existing-site task: Change the fonts. Task sections include “Load and apply the fonts; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Change code highlighting](../docs/collections/_docs/25_code-highlighting.md) ([URL](https://dieghernan.github.io/chulapa/docs/25-code-highlighting)) | H | — | — | 10 | Existing-site task: Change code highlighting. Task sections include “Select the style; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [How skins and overrides interact](../docs/collections/_docs/26_appearance-precedence.md) ([URL](https://dieghernan.github.io/chulapa/docs/26-appearance-precedence)) | E | — | — | 10 | Explains skin/vars/generated-color precedence and customization trade-offs; task procedures are links. |
| [Enable Autothemer](../docs/collections/_docs/27_autothemer.md) ([URL](https://dieghernan.github.io/chulapa/docs/27-autothemer)) | H | — | — | 10 | Existing-site task: Enable Autothemer. Task sections include “Enable palette generation; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Adapt a Sass skin](../docs/collections/_docs/28_custom-skin.md) ([URL](https://dieghernan.github.io/chulapa/docs/28-custom-skin)) | H | — | — | 10 | Existing-site task: Adapt a Sass skin. Task sections include “Preview the assignments; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a photo gallery](../docs/collections/_docs/29_add-gallery.md) ([URL](https://dieghernan.github.io/chulapa/docs/29-add-gallery)) | H | — | — | 10 | Existing-site task: Add a photo gallery. Task sections include “Group the photographs; Insert the gallery”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a manual slideshow](../docs/collections/_docs/30_add-carousel.md) ([URL](https://dieghernan.github.io/chulapa/docs/30-add-carousel)) | H | — | — | 10 | Existing-site task: Add a manual slideshow. Task sections include “Insert a carousel; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable PhotoSwipe on a gallery](../docs/collections/_docs/31_photoswipe.md) ([URL](https://dieghernan.github.io/chulapa/docs/31-photoswipe)) | H | — | — | 10 | Existing-site task: Enable PhotoSwipe on a gallery. Task sections include “Enable the viewer; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Embed a video](../docs/collections/_docs/32_embed-video.md) ([URL](https://dieghernan.github.io/chulapa/docs/32-embed-video)) | H | — | — | 10 | Existing-site task: Embed a video. Task sections include “Add the player; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a Mermaid diagram](../docs/collections/_docs/33_add-diagram.md) ([URL](https://dieghernan.github.io/chulapa/docs/33-add-diagram)) | H | — | — | 10 | Existing-site task: Add a Mermaid diagram. Task sections include “Enable and insert the diagram; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Lunr.js search](../docs/collections/_docs/34_lunr-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/34-lunr-search)) | H | — | — | 10 | Existing-site task: Enable Lunr.js search. Task sections include “Configure the provider and page; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Simple-Jekyll-Search search](../docs/collections/_docs/35_simplesearch-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/35-simplesearch-search)) | H | — | — | 10 | Existing-site task: Enable Simple-Jekyll-Search search. Task sections include “Configure the provider and page; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Google Custom Search](../docs/collections/_docs/36_google-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/36-google-search)) | H | — | — | 10 | Existing-site task: Enable Google Custom Search. Task sections include “Connect the engine; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect Algolia search and upload its index](../docs/collections/_docs/37_algolia-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/37-algolia-search)) | H | — | — | 10 | Existing-site task: Connect Algolia search and upload its index. Task sections include “Configure browser search; Upload the index”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect Disqus comments](../docs/collections/_docs/38_disqus-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/38-disqus-comments)) | H | — | — | 10 | Existing-site task: Connect Disqus comments. Task sections include “Select Disqus; Enable one post”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect Cactus comments](../docs/collections/_docs/39_cactus-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/39-cactus-comments)) | H | — | — | 10 | Existing-site task: Connect Cactus comments. Task sections include “Select Cactus; Correct the conversation identifier”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect Welcomments](../docs/collections/_docs/40_welcomments-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/40-welcomments-comments)) | H | — | — | 10 | Existing-site task: Connect Welcomments. Task sections include “Review the integration files; Select Welcomments”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect an existing self-hosted Cusdis service](../docs/collections/_docs/41_cusdis-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/41-cusdis-comments)) | H | — | — | 10 | Existing-site task: Connect an existing self-hosted Cusdis service. Task sections include “Connect the host; Enable one post”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Find changes missing from your website](../docs/collections/_docs/42_unpublished-changes.md) ([URL](https://dieghernan.github.io/chulapa/docs/42-unpublished-changes)) | H | — | — | 10 | Existing-site task: Find changes missing from your website. Task sections include “Check the saved edit and branch; Check the publishing run”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Fix a YAML configuration error](../docs/collections/_docs/43_yaml-errors.md) ([URL](https://dieghernan.github.io/chulapa/docs/43-yaml-errors)) | H | — | — | 10 | Existing-site task: Fix a YAML configuration error. Task sections include “Locate the failed edit; Correct the formatting”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add custom HTML to the page head](../docs/collections/_docs/44_custom-head.md) ([URL](https://dieghernan.github.io/chulapa/docs/44-custom-head)) | H | — | — | 10 | Existing-site task: Add custom HTML to the page head. Task sections include “Edit the head hook; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Custom hooks reference](../docs/collections/_docs/45_custom-hooks.md) ([URL](https://dieghernan.github.io/chulapa/docs/45-custom-hooks)) | R | — | — | 10 | Supported file paths, insertion order, scope and constraints; no independent editing sequence. |
| [Migration field mappings](../docs/collections/_docs/46_migration-fields.md) ([URL](https://dieghernan.github.io/chulapa/docs/46-migration-fields)) | R | — | — | 10 | Migration field equivalences, syntax specimens and release/override constraints; the migration procedure is elsewhere. |
| [How publishing fits together](../docs/collections/_docs/47_publishing-explained.md) ([URL](https://dieghernan.github.io/chulapa/docs/47-publishing-explained)) | E | — | — | 10 | Explains source/build/hosting relationships and why saving differs from publication; no publishing recipe. |
| [Accessibility and resource-loading reference](../docs/collections/_docs/48_accessibility-reference.md) ([URL](https://dieghernan.github.io/chulapa/docs/48-accessibility-reference)) | R | — | — | 10 | Behavior/version/scope lookup for keyboard, motion, resources and offline limitations; site-checking steps are linked out. |
| [Add an information or warning box](../docs/collections/_docs/49_add-alert.md) ([URL](https://dieghernan.github.io/chulapa/docs/49-add-alert)) | H | — | — | 10 | Existing-site task: Add an information or warning box. Task sections include “Insert the message; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a caption below an image](../docs/collections/_docs/50_add-caption.md) ([URL](https://dieghernan.github.io/chulapa/docs/50-add-caption)) | H | — | — | 10 | Existing-site task: Add a caption below an image. Task sections include “Add the caption paragraph; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a footnote to an article](../docs/collections/_docs/51_add-footnote.md) ([URL](https://dieghernan.github.io/chulapa/docs/51-add-footnote)) | H | — | — | 10 | Existing-site task: Add a footnote to an article. Task sections include “Add a matching reference and definition; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a favicon](../docs/collections/_docs/52_add-favicon.md) ([URL](https://dieghernan.github.io/chulapa/docs/52-add-favicon)) | H | — | — | 10 | Existing-site task: Add a favicon. Task sections include “Upload an icon; Link the icon from the head”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Use the Chulapa font](../docs/collections/_docs/53_chulapa-font.md) ([URL](https://dieghernan.github.io/chulapa/docs/53-chulapa-font)) | H | — | — | 10 | Existing-site task: Use the Chulapa font. Task sections include “Apply it to headings; Apply it to selected text instead”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a Font Awesome icon to an article](../docs/collections/_docs/54_add-icon.md) ([URL](https://dieghernan.github.io/chulapa/docs/54-add-icon)) | H | — | — | 10 | Existing-site task: Add a Font Awesome icon to an article. Task sections include “Insert the icon; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Check which theme version your site uses](../docs/collections/_docs/55_check-theme-version.md) ([URL](https://dieghernan.github.io/chulapa/docs/55-check-theme-version)) | H | — | — | 10 | Existing-site task: Check which theme version your site uses. Task sections include “Check the selected theme; Compare with the published website”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Publish posts in the built-in feeds](../docs/collections/_docs/56_publish-feeds.md) ([URL](https://dieghernan.github.io/chulapa/docs/56-publish-feeds)) | H | — | — | 10 | Existing-site task: Publish posts in the built-in feeds. Task sections include “Include your posts; Publish and share the address”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Keep a jekyll-feed subscription address](../docs/collections/_docs/57_jekyll-feed.md) ([URL](https://dieghernan.github.io/chulapa/docs/57-jekyll-feed)) | H | — | — | 10 | Existing-site task: Keep a jekyll-feed subscription address. Task sections include “Check the plugin and its address; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a table of contents inside an article](../docs/collections/_docs/58_content-toc.md) ([URL](https://dieghernan.github.io/chulapa/docs/58-content-toc)) | H | — | — | 10 | Existing-site task: Add a table of contents inside an article. Task sections include “Insert the marker; Limit the heading levels when needed”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Publish an illustrated page and add it to the menu](../docs/collections/_docs/59_photo-page-tutorial.md) ([URL](https://dieghernan.github.io/chulapa/docs/59-photo-page-tutorial)) | T | — | — | 10 | A controlled second browser exercise on the published starter: supplied file/content/menu entry, sequential visible checks and fixed outcome. |
| [Identify a personal site's publisher](../docs/collections/_docs/60_person-publisher.md) ([URL](https://dieghernan.github.io/chulapa/docs/60-person-publisher)) | H | — | — | 10 | Existing-site task: Identify a personal site's publisher. Task sections include “Edit the publisher; Publish and inspect the result”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Display an article date in another language](../docs/collections/_docs/61_localize-date.md) ([URL](https://dieghernan.github.io/chulapa/docs/61-localize-date)) | H | — | — | 10 | Existing-site task: Display an article date in another language. Task sections include “Insert the date; Use the site language when appropriate”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Point a republished article to its original URL](../docs/collections/_docs/62_canonical-article.md) ([URL](https://dieghernan.github.io/chulapa/docs/62-canonical-article)) | H | — | — | 10 | Existing-site task: Point a republished article to its original URL. Task sections include “Identify the original article; Exclude the copy from a generated sitemap when applicable”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Syntax highlighting reference](../docs/collections/_docs/99_highlighting.md) ([URL](https://dieghernan.github.io/chulapa/docs/syntax-highlighting)) | R | — | 8 | 10 | Interactive style identifiers and language specimens; applying/saving a style is delegated to H. Current preview controls remain functional. |
| [Markdown cheatsheet](../docs/collections/_docs/99_markdown-cheatsheet.md) ([URL](https://dieghernan.github.io/chulapa/docs/markdown-cheatsheet)) | R | — | 5 | 10 | Notation/output specimens and parser constraints; content-index setup is a separate H guide. Short definitions are reference context, not an E essay. |
| [Variables dictionary](../docs/collections/_docs/99_variable-dict.md) ([URL](https://dieghernan.github.io/chulapa/docs/variable-dictionary)) | R | — | 8 | 10 | Variable identifiers, value syntax and constraints; mapping specimens are lookup, not independent save/publish procedures. |

## Remaining entry surfaces

| Surface | Dominant | Secondary | #117 | Now | Evidence |
| --- | --- | --- | --- | --- | --- |
| [Docs directory](../docs/_pages/docs.md) | R | — | 9 | 10 | Intent-based links, no independent workflow or conceptual section. |
| [README](../README.md) | E | R | 4 | 7 | Product purpose plus substantial starter/feature catalogs; installation now routes to canonical tasks. |
| [Homepage](../docs/index.html) | E | R | 7 | 7 | Product orientation, calls to action and example/feature catalogs. |

## Priorities after the anchor cleanup

| Priority | Bounded delivery | Problem / benefit | Evidence needed | Effort |
| --- | --- | --- | --- | --- |
| 1 | Cloud/tag-category setup and filename-ordered indexes | The two-step cloud configuration and index setup still interrupt Layouts lookup. Extract task procedures; retain contracts and source/output specimens in R. | Actual collection fixtures, root/project URLs and current fragment links; distinguish dated collection documents from standalone pages. | Medium |
| 2 | Finish duplicated search/indexing/custom-card workflows | Search page configuration repeats provider H guides; crawler/default-scope and custom-card insertion contain independent tasks. Link existing guides before inventing new ones. | Explicit source/destination review; generated search/indexing behavior where advice changes. | Medium |
| 3 | Make FAQ routing consistent | Short post/skin editing recipes still compete with the question directory. Replace repeated instructions with useful symptom/task links. | Current question links and active chatbot sources; no empty anchor scaffolding. | Low |
| 4 | Review metadata paragraphs selectively | Article images, descriptions and social locales mix prose with specimens. Do not automatically extract each option: split only a genuinely independent task, preserving precise fallback/precedence lookup. | Show the competing workflow before proposing a new H page. | Low to medium |
| 5 | Observe novice and expert tasks | Two Tutorials now exist, but publication, abandonment and lookup success have not been measured. Technical fixtures are not participant observations. | Record consent, task, prior experience, sample size, elapsed time, assistance, failures and completion criterion. | Medium; requires participants |
| 6 | Review chatbot answers and navigation | Context is selective and close to its existing 45 KB guard. Deployment/tests do not prove factual answers, source choice or response time. Growing task lists may impair lookup despite type purity. | Focused factual/code/citation review and timed live samples if accessible; measure context size separately. Observe directory/search use before restructuring. | Medium |

No contributor-doc reorganization is proposed. Runtime bugs tracked in issue
[#125](https://github.com/dieghernan/chulapa/issues/125) remain separate work;
documenting local corrections does not establish that the adapters are fixed.

## Validation and limits of this delivery

This reassessment changes only internal planning. Public page content/URLs,
chatbot facts, evaluation cases, context size and deployment triggers are unchanged.
No full option/snippet reconciliation, link crawl, browser audit, integration
suite, live model evaluation or user study is newly performed for this assessment.

Prior deliveries record their technical validation; the anchor review records
its generated-site scan and responsive checks. They are historical evidence,
not checks rerun here. This delivery validates inventory coverage and local report
links, keeps prior snapshots intact, and verifies internal material stays outside
the gem file selection. No public build, Worker deployment or score-based claim
of adoption improvement is warranted by these internal edits.
