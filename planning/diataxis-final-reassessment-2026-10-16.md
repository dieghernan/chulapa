# Final Diátaxis editorial reassessment and closeout

Date: 16 October 2026. Reviewed snapshot: main after merged #160,
[`8dbcd89ad`](https://github.com/dieghernan/chulapa/tree/8dbcd89ad0b94cb3389cd56ececba2b84790d1dc).
Status: closure proposed for review. Internal editorial judgement, not a user study.

## Scope, method and unchanged rubric

Reassess the 69 surfaces from the [after-#140 snapshot](diataxis-reassessment-2026-10-15-after-140.md)
and separately score guides 63–65 added in #142: 69 Docs pages plus the Docs
directory, README and homepage, or 72 surfaces. Demos, skins, external provider
material and contributor documentation remain outside the scored inventory.
The topic index is a navigation aid, not a newly scored lesson/reference surface.

Use the same rubric: 10 means one intention; 8–9 limited competing content;
6–7 a substantial second intention; 4–5 multiple intentions with frequent
switches; 1–3 several types without a coherent contract. T = Tutorial, H = How-To,
R = Reference, E = Explanation. Directories retain the original boundary R
classification. Definitions, prerequisites, short specimens, version/safety
constraints and links do not alone establish a competing intention.

This is a source-based delta reassessment, not a new independent blind review of
every line. Compare current sources and changes since #140 with the previous
inventory; revisit substantive content/contracts and carry forward unchanged
judgements with their rationale. Review Layouts/FAQ against #142/#145's actual
source/destination changes, and new guides against their complete task contracts.
No score is computed from headings, tag counts, tests or agent agreement. Scores
are editorial judgements, not official Diátaxis metrics or precise measurements.
Any substantive competing intention remains a design defect. A 10 says nothing by itself about exhaustive coverage, correctness or usability.

## Comparable score changes

| Surface | After #117 | After #140 | Final | Evidence and boundary |
| --- | --- | --- | --- | --- |
| Layouts | 5 | 7 | 10 | #142 extracts cloud/sharing/indexing procedures; #145 removes remaining procedural framing. Option/include/sorting specimens stay R. See [source](../docs/collections/_docs/04_layouts.md), [#142 decisions](layouts-seo-demo-review-2026-10-15.md) and [#145 decisions](faq-reference-review-2026-10-16.md). |
| FAQ | 5 | 8 | 10 | Duplicate editing recipes now route to complete task guides. Question directory and brief compatibility distinctions serve R. See [source](../docs/collections/_docs/05_faq.md) and #145 decisions above. |
| Other 67 comparable surfaces | Not comparable as a group | Unchanged | Unchanged | Full inventory below. Topic badges/cards and runtime fixes do not by themselves increase intention purity. |
| Three new guides 63–65 | Not present | Not present | 10 each | New task pages assessed independently; not counted as comparable gains. |

Against #140: two improve, 67 remain unchanged and none decrease across the same
69 surfaces. Against #117's fixed 28 surfaces: 13 improve and 15 remain unchanged.
Do not average the expanded inventory: adding narrow task pages changes the
denominator. README/home remain E/R at 7 rather than being exempted to earn 10.
Their product/catalog mix is intentional and does not justify more extraction.

## Original baseline comparison

Keep the original 14-surface denominator from #106; extracted pages are not
counted as gains here. Previous snapshots record the intermediate scores.
The purpose of this table is traceability, not a project average.

| Original surface | After #106 | Final |
| --- | --- | --- |
| [Start](../docs/collections/_docs/00_start.md) | 3 | 10 |
| [Installation](../docs/collections/_docs/01_install.md) | 5 | 10 |
| [Global settings](../docs/collections/_docs/02_config.md) | 3 | 10 |
| [Theming](../docs/collections/_docs/03_theming.md) | 5 | 10 |
| [Layouts and snippets](../docs/collections/_docs/04_layouts.md) | 2 | 10 |
| [FAQ](../docs/collections/_docs/05_faq.md) | 5 | 10 |
| [Accessibility and performance](../docs/collections/_docs/06_accessibility-performance.md) | 5 | 10 |
| [Migration](../docs/collections/_docs/07_migration.md) | 6 | 10 |
| [Highlighting](../docs/collections/_docs/99_highlighting.md) | 8 | 10 |
| [Markdown cheatsheet](../docs/collections/_docs/99_markdown-cheatsheet.md) | 5 | 10 |
| [Variables dictionary](../docs/collections/_docs/99_variable-dict.md) | 8 | 10 |
| [Docs directory](../docs/_pages/docs.md) | 10 | 10 |
| [README](../README.md) | 4 | 7 |
| [Homepage](../docs/index.html) | 7 | 7 |

## Complete current Docs score table

The after-#140 column preserves its prior score; a dash marks a later addition.
Evidence for unchanged pages carries forward their prior source judgement,
checked against the current delta. Source links resolve in this checkout.

| Page and source | Dominant | Secondary | After #140 | Final | Evidence / remaining boundary |
| --- | --- | --- | --- | --- | --- |
| [Publish your first site with Chulapa](../docs/collections/_docs/00_start.md) ([URL](https://dieghernan.github.io/chulapa/docs/00-start)) | T | — | 10 | 10 | One fixed browser exercise ends at a published site/title/article. Old-version routing no longer interrupts it; optional next tasks are links. |
| [Installation](../docs/collections/_docs/01_install.md) ([URL](https://dieghernan.github.io/chulapa/docs/01-install)) | R | — | 10 | 10 | Alternative-method directory, preview and release constraints; all installation sequences are links. |
| [Global settings](../docs/collections/_docs/02_config.md) ([URL](https://dieghernan.github.io/chulapa/docs/02-config)) | R | — | 10 | 10 | Identity/navigation/provider/publisher field contracts and defaults; setup sequences now live in H guides. Short definitions and compatibility limits support lookup. |
| [Theming Chulapa](../docs/collections/_docs/03_theming.md) ([URL](https://dieghernan.github.io/chulapa/docs/03-theming)) | R | — | 10 | 10 | Appearance inputs, defaults and constraints; Sass sandbox and save/publish steps have separate H destinations and precedence has an E destination. |
| [Layouts and snippets](../docs/collections/_docs/04_layouts.md) ([URL](https://dieghernan.github.io/chulapa/docs/04-layouts)) | R | — | 7 | 10 | Cloud setup, sharing and search visibility moved to guides 63–65 in #142; #145 removed procedural framing. Retained option/default/include specimens and version limits serve R; no independent publishing workflow remains. |
| [Frequently asked questions](../docs/collections/_docs/05_faq.md) ([URL](https://dieghernan.github.io/chulapa/docs/05-faq)) | R | — | 8 | 10 | Question directory after #145: post/image/design recipes route to canonical guides; parser, preview and feed caveats qualify routing rather than introducing independent workflows. |
| [Accessibility and performance](../docs/collections/_docs/06_accessibility-performance.md) ([URL](https://dieghernan.github.io/chulapa/docs/06-accessibility-performance)) | H | — | 10 | 10 | Site inspection and correction sequence; expected behavior, version limits and review scope are linked to R. Safety/offline cautions constrain the task. |
| [Migrating from another Jekyll theme](../docs/collections/_docs/07_migration.md) ([URL](https://dieghernan.github.io/chulapa/docs/07-migration)) | H | — | 10 | 10 | Existing-site migration sequence, checklist and troubleshooting. Field mappings are separate R; override/version cautions support the migration task. |
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
| [Choose a skin](../docs/collections/_docs/22_choose-skin.md) ([URL](https://dieghernan.github.io/chulapa/docs/22-choose-skin)) | H | — | 10 | 10 | Existing-site task: Choose a skin. Task sections include “Set the skin name; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Change a color](../docs/collections/_docs/23_change-color.md) ([URL](https://dieghernan.github.io/chulapa/docs/23-change-color)) | H | — | 10 | 10 | Existing-site task: Change a color. Task sections include “Edit the color; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Change the fonts](../docs/collections/_docs/24_change-fonts.md) ([URL](https://dieghernan.github.io/chulapa/docs/24-change-fonts)) | H | — | 10 | 10 | Existing-site task: Change the fonts. Task sections include “Load and apply the fonts; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Change code highlighting](../docs/collections/_docs/25_code-highlighting.md) ([URL](https://dieghernan.github.io/chulapa/docs/25-code-highlighting)) | H | — | 10 | 10 | Existing-site task: Change code highlighting. Task sections include “Select the style; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [How skins and overrides interact](../docs/collections/_docs/26_appearance-precedence.md) ([URL](https://dieghernan.github.io/chulapa/docs/26-appearance-precedence)) | E | — | 10 | 10 | Explains skin/vars/generated-color precedence and customization trade-offs; task procedures are links. |
| [Enable Autothemer](../docs/collections/_docs/27_autothemer.md) ([URL](https://dieghernan.github.io/chulapa/docs/27-autothemer)) | H | — | 10 | 10 | Existing-site task: Enable Autothemer. Task sections include “Enable palette generation; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Adapt a Sass skin](../docs/collections/_docs/28_custom-skin.md) ([URL](https://dieghernan.github.io/chulapa/docs/28-custom-skin)) | H | — | 10 | 10 | Existing-site task: Adapt a Sass skin. Task sections include “Preview the assignments; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a photo gallery](../docs/collections/_docs/29_add-gallery.md) ([URL](https://dieghernan.github.io/chulapa/docs/29-add-gallery)) | H | — | 10 | 10 | Existing-site task: Add a photo gallery. Task sections include “Group the photographs; Insert the gallery”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a manual slideshow](../docs/collections/_docs/30_add-carousel.md) ([URL](https://dieghernan.github.io/chulapa/docs/30-add-carousel)) | H | — | 10 | 10 | Existing-site task: Add a manual slideshow. Task sections include “Insert a carousel; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable PhotoSwipe on a gallery](../docs/collections/_docs/31_photoswipe.md) ([URL](https://dieghernan.github.io/chulapa/docs/31-photoswipe)) | H | — | 10 | 10 | Existing-site task: Enable PhotoSwipe on a gallery. Task sections include “Enable the viewer; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Embed a video](../docs/collections/_docs/32_embed-video.md) ([URL](https://dieghernan.github.io/chulapa/docs/32-embed-video)) | H | — | 10 | 10 | Existing-site task: Embed a video. Task sections include “Add the player; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a Mermaid diagram](../docs/collections/_docs/33_add-diagram.md) ([URL](https://dieghernan.github.io/chulapa/docs/33-add-diagram)) | H | — | 10 | 10 | Existing-site task: Add a Mermaid diagram. Task sections include “Enable and insert the diagram; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Lunr.js search](../docs/collections/_docs/34_lunr-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/34-lunr-search)) | H | — | 10 | 10 | Existing-site task: Enable Lunr.js search. Task sections include “Configure the provider and page; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Simple-Jekyll-Search search](../docs/collections/_docs/35_simplesearch-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/35-simplesearch-search)) | H | — | 10 | 10 | Existing-site task: Enable Simple-Jekyll-Search search. Task sections include “Configure the provider and page; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Enable Google Custom Search](../docs/collections/_docs/36_google-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/36-google-search)) | H | — | 10 | 10 | Existing-site task: Enable Google Custom Search. Task sections include “Connect the engine; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect Algolia search and upload its index](../docs/collections/_docs/37_algolia-search.md) ([URL](https://dieghernan.github.io/chulapa/docs/37-algolia-search)) | H | — | 10 | 10 | Existing-site task: Connect Algolia search and upload its index. Task sections include “Configure browser search; Upload the index”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect Disqus comments](../docs/collections/_docs/38_disqus-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/38-disqus-comments)) | H | — | 10 | 10 | Existing-site task: Connect Disqus comments. Task sections include “Select Disqus; Enable one post”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Connect Cactus comments](../docs/collections/_docs/39_cactus-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/39-cactus-comments)) | H | — | 10 | 10 | Existing-service connection task; #160 updates ID/migration and legacy-version constraints without introducing a second intention. Offline correctness is separate from live provider success. |
| [Connect Welcomments](../docs/collections/_docs/40_welcomments-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/40-welcomments-comments)) | H | — | 10 | 10 | Existing-service setup and verification; #160 keeps template/baseurl/legacy constraints within the task. Saved data/provider delivery remain explicit prerequisites. |
| [Connect an existing self-hosted Cusdis service](../docs/collections/_docs/41_cusdis-comments.md) ([URL](https://dieghernan.github.io/chulapa/docs/41-cusdis-comments)) | H | — | 10 | 10 | Existing-site task: Connect an existing self-hosted Cusdis service. Task sections include “Connect the host; Enable one post”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Find changes missing from your website](../docs/collections/_docs/42_unpublished-changes.md) ([URL](https://dieghernan.github.io/chulapa/docs/42-unpublished-changes)) | H | — | 10 | 10 | Existing-site task: Find changes missing from your website. Task sections include “Check the saved edit and branch; Check the publishing run”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Fix a YAML configuration error](../docs/collections/_docs/43_yaml-errors.md) ([URL](https://dieghernan.github.io/chulapa/docs/43-yaml-errors)) | H | — | 10 | 10 | Existing-site task: Fix a YAML configuration error. Task sections include “Locate the failed edit; Correct the formatting”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add custom HTML to the page head](../docs/collections/_docs/44_custom-head.md) ([URL](https://dieghernan.github.io/chulapa/docs/44-custom-head)) | H | — | 10 | 10 | Existing-site task: Add custom HTML to the page head. Task sections include “Edit the head hook; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Custom hooks reference](../docs/collections/_docs/45_custom-hooks.md) ([URL](https://dieghernan.github.io/chulapa/docs/45-custom-hooks)) | R | — | 10 | 10 | Supported file paths, insertion order, scope and constraints; no independent editing sequence. |
| [Migration field mappings](../docs/collections/_docs/46_migration-fields.md) ([URL](https://dieghernan.github.io/chulapa/docs/46-migration-fields)) | R | — | 10 | 10 | Migration field equivalences, syntax specimens and release/override constraints; the migration procedure is elsewhere. |
| [How publishing fits together](../docs/collections/_docs/47_publishing-explained.md) ([URL](https://dieghernan.github.io/chulapa/docs/47-publishing-explained)) | E | — | 10 | 10 | Explains source/build/hosting relationships and why saving differs from publication; no publishing recipe. |
| [Accessibility and resource-loading reference](../docs/collections/_docs/48_accessibility-reference.md) ([URL](https://dieghernan.github.io/chulapa/docs/48-accessibility-reference)) | R | — | 10 | 10 | Behavior/version/scope lookup for keyboard, motion, resources and offline limitations; site-checking steps are linked out. |
| [Add an information or warning box](../docs/collections/_docs/49_add-alert.md) ([URL](https://dieghernan.github.io/chulapa/docs/49-add-alert)) | H | — | 10 | 10 | Existing-site task: Add an information or warning box. Task sections include “Insert the message; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a caption below an image](../docs/collections/_docs/50_add-caption.md) ([URL](https://dieghernan.github.io/chulapa/docs/50-add-caption)) | H | — | 10 | 10 | Existing-site task: Add a caption below an image. Task sections include “Add the caption paragraph; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a footnote to an article](../docs/collections/_docs/51_add-footnote.md) ([URL](https://dieghernan.github.io/chulapa/docs/51-add-footnote)) | H | — | 10 | 10 | Existing-site task: Add a footnote to an article. Task sections include “Add a matching reference and definition; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a favicon](../docs/collections/_docs/52_add-favicon.md) ([URL](https://dieghernan.github.io/chulapa/docs/52-add-favicon)) | H | — | 10 | 10 | Existing-site task: Add a favicon. Task sections include “Upload an icon; Link the icon from the head”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Use the Chulapa font](../docs/collections/_docs/53_chulapa-font.md) ([URL](https://dieghernan.github.io/chulapa/docs/53-chulapa-font)) | H | — | 10 | 10 | Existing-site task: Use the Chulapa font. Task sections include “Apply it to headings; Apply it to selected text instead”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a Font Awesome icon to an article](../docs/collections/_docs/54_add-icon.md) ([URL](https://dieghernan.github.io/chulapa/docs/54-add-icon)) | H | — | 10 | 10 | Existing-site task: Add a Font Awesome icon to an article. Task sections include “Insert the icon; Publish and check”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Check which theme version your site uses](../docs/collections/_docs/55_check-theme-version.md) ([URL](https://dieghernan.github.io/chulapa/docs/55-check-theme-version)) | H | — | 10 | 10 | Existing-site task: Check which theme version your site uses. Task sections include “Check the selected theme; Compare with the published website”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Publish posts in the built-in feeds](../docs/collections/_docs/56_publish-feeds.md) ([URL](https://dieghernan.github.io/chulapa/docs/56-publish-feeds)) | H | — | 10 | 10 | Existing-site task: Publish posts in the built-in feeds. Task sections include “Include your posts; Publish and share the address”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Keep a jekyll-feed subscription address](../docs/collections/_docs/57_jekyll-feed.md) ([URL](https://dieghernan.github.io/chulapa/docs/57-jekyll-feed)) | H | — | 10 | 10 | Existing-site task: Keep a jekyll-feed subscription address. Task sections include “Check the plugin and its address; Publish and verify”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add a table of contents inside an article](../docs/collections/_docs/58_content-toc.md) ([URL](https://dieghernan.github.io/chulapa/docs/58-content-toc)) | H | — | 10 | 10 | Existing-site task: Add a table of contents inside an article. Task sections include “Insert the marker; Limit the heading levels when needed”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Publish an illustrated page and add it to the menu](../docs/collections/_docs/59_photo-page-tutorial.md) ([URL](https://dieghernan.github.io/chulapa/docs/59-photo-page-tutorial)) | T | — | 10 | 10 | A controlled second browser exercise on the published starter: supplied file/content/menu entry, sequential visible checks and fixed outcome. |
| [Identify a personal site's publisher](../docs/collections/_docs/60_person-publisher.md) ([URL](https://dieghernan.github.io/chulapa/docs/60-person-publisher)) | H | — | 10 | 10 | Existing-site task: Identify a personal site's publisher. Task sections include “Edit the publisher; Publish and inspect the result”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Display an article date in another language](../docs/collections/_docs/61_localize-date.md) ([URL](https://dieghernan.github.io/chulapa/docs/61-localize-date)) | H | — | 10 | 10 | Existing-site task: Display an article date in another language. Task sections include “Insert the date; Use the site language when appropriate”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Point a republished article to its original URL](../docs/collections/_docs/62_canonical-article.md) ([URL](https://dieghernan.github.io/chulapa/docs/62-canonical-article)) | H | — | 10 | 10 | Existing-site task: Point a republished article to its original URL. Task sections include “Identify the original article; Exclude the copy from a generated sitemap when applicable”; constraints/examples support this task, not an independent catalog or conceptual essay. |
| [Add tag and category indexes for your posts](../docs/collections/_docs/63_tag-category-clouds.md) | H | — | — | 10 | Existing-blog task: matching index/badge paths, scoped defaults and published checks. Alias/version/date constraints support this task. |
| [Set a post’s sharing text and images](../docs/collections/_docs/64_post-sharing.md) | H | — | — | 10 | Existing-post task: choose/upload the image, preserve front matter and inspect sharing metadata. Field fallbacks are linked to R. |
| [Keep an auxiliary page out of search results](../docs/collections/_docs/65_search-visibility.md) | H | — | — | 10 | Existing-page task: independent robots/sitemap/local-search settings and published checks. Public access and Algolia constraints prevent false privacy/indexing promises. |
| [Syntax highlighting reference](../docs/collections/_docs/99_highlighting.md) ([URL](https://dieghernan.github.io/chulapa/docs/syntax-highlighting)) | R | — | 10 | 10 | Interactive style identifiers and language specimens; applying/saving a style is delegated to H. Current preview controls remain functional. |
| [Markdown cheatsheet](../docs/collections/_docs/99_markdown-cheatsheet.md) ([URL](https://dieghernan.github.io/chulapa/docs/markdown-cheatsheet)) | R | — | 10 | 10 | Notation/output specimens and parser constraints; content-index setup is a separate H guide. Short definitions are reference context, not an E essay. |
| [Variables dictionary](../docs/collections/_docs/99_variable-dict.md) ([URL](https://dieghernan.github.io/chulapa/docs/variable-dictionary)) | R | — | 10 | 10 | Variable identifiers, value syntax and constraints; mapping specimens are lookup, not independent save/publish procedures. |

## Entry surfaces and non-score evidence

| Surface | Dominant | Secondary | After #140 | Final | Reason |
| --- | --- | --- | --- | --- | --- |
| [Docs directory](../docs/_pages/docs.md) | R | — | 10 | 10 | Intent-based directory; task links expanded without adding an independent workflow. |
| [README](../README.md) | E | R | 7 | 7 | Product purpose and feature/starter catalogs still coexist. Useful product orientation remains. |
| [Homepage](../docs/index.html) | E | R | 7 | 7 | Product introduction and example/feature catalog remain mixed under the unchanged strict rubric. |

| Dimension | Current evidence | What is not established |
| --- | --- | --- |
| Editorial intention | Source reassessment above; both tutorials retain a controlled exercise and advanced references retain fields/specimens. | Observed novice/expert task success. |
| Navigation | #149/#152–#158 records reviewed cards/badges, exact links, narrow/wide layouts and keyboard activation. 66 of 69 Docs pages have badges; FAQ/tutorials deliberately retain direct routes. | Measured findability improvement or a new numerical navigation score. |
| Technical defects | #154 closed by #159; #125 closed by #160. Their reviewed heads passed Jekyll 3/4 and applicable CI. | Live provider posting, Matrix migration or universal compatibility. |
| Human usability | Not measured here; participant interviews remain optional. Agent opening reviews are editorial evidence only. | Human completion rates, abandonment, satisfaction or accessibility certification. |
| Chatbot accuracy/examples/citations | Four-case protocol prepared; selective context and focused cases maintained. | No new live answer scores; passing tests/HTTP/deployments are not answer-quality evidence. |
| Chatbot latency | No new live samples in this closeout. | No response-time improvement, percentile or model-only latency claim. |
| Deployment/release | Merge/CI status verified separately from publication. | Latest Pages/Worker rollout and release readiness are not inferred from merge. |

## Formatting review and remaining boundaries

Review the 69 Docs pages and three entry surfaces for visible theme-name markup
and alert semantics using docs/AGENTS.md. Existing visible Chulapa mentions use
the brand span, including the intentional font-feature specimen. Accessible
badge/alt text, code, URLs, identifiers and plain metadata remain plain text.
No missing visible brand span requires a change in this scope.

Remove alert styling from routine sharing guidance, the optional custom-skin
alternative, ordinary Open Graph type lookup and a search-page example pointer.
Retain info alerts for useful version/parser/TOC/preview distinctions and warning
alerts for secrets, broken publishing, conflicting output, public exposure and
thread-mapping risks. Preserve alert examples as examples. No advice, code,
source URL, heading or option changes are needed for these formatting edits.

All agreed editorial groups have dispositions, and both captured runtime bugs
are fixed. Close the editorial/correction plan after this PR review/merge; keep
scope frozen unless a concrete defect appears. Do not add public type labels or
extract pages to chase a score. Remaining product/catalog mixtures are explicitly
accepted; no blocker from optional human research or unperformed live evaluation.
Release checks, actual deployment verification and optional live chatbot review
remain separate tasks under the [execution plan](diataxis-closeout-plan.md).

## Validation for this closeout

Validate 69 unique Docs rows plus three entry surfaces, previous-score fidelity,
report/source links, UTF-8 and historical snapshot preservation. Check packaging
excludes planning files. Public edits affect only alert presentation: build and
inspect the affected pages at narrow/wide widths; preserve fenced specimens.
No runtime change, model call, provider submission or manual Worker deployment.
Historical technical/browser results above are attributed to their deliveries,
not claimed as rerun here. Actual checks run for this PR are recorded below.


### Checks performed

- Inventory: 69 unique Docs source rows plus three entry surfaces; exact match
  with the current collection. Previous scores carried forward faithfully; only
  Layouts and FAQ improve among the 69 comparable surfaces. Original 14-surface
  baseline comparison retained separately.
- 136 local report/source links resolve. Historical inventories/reassessments and
  the audit suffix beginning at Executive diagnosis are unchanged.
- All fenced specimens in the three publicly edited pages are unchanged.
- Jekyll documentation build passed. Six page/viewport checks at 320/1280 confirm
  four routine paragraphs render without alert styling and no document overflow;
  mobile/desktop screenshots inspected. Existing warnings remain in source.
- UTF-8 and git diff whitespace checks passed; planning/agent files remain outside
  gem selection. These edits do not alter public titles, URLs, metadata, controls,
  manifest or service worker. Alert styling changes no advice or examples.
- Selective chatbot context/cases and llms.txt were reviewed: no facts or source
  routes change, so no context expansion, new case or chatbot test run is needed.
  No deployment is performed or inferred; no live evaluation consumes quota.
