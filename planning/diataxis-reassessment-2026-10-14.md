# Diátaxis reassessment after PR #117

Date: 14 October 2026. Language: English.
Reviewed snapshot: [`0249232ad`](https://github.com/dieghernan/chulapa/tree/0249232adfc2753037397930a06c14845279592a), `main` after #117.

This is a second editorial assessment of merged user-facing documentation. It
supersedes neither the [historical inventory](diataxis-inventory.md) nor its
scores. The [implementation plan](documentation-adoption-audit.md) records the
revised priorities. No public documentation or chatbot context is changed by
this reassessment.

## Scope and method

Reviewed all **25 pages** in `docs/collections/_docs`, the documentation directory,
README and site homepage: **28 surfaces**. The comparison contains **14 baseline
surfaces** and **14 new pages** created after #106. Demos, skins, example READMEs,
other service pages and contributor/developer material have not been rescored.
Their historical inventory entries are not current ratings.

Apply the original [strict rubric](documentation-adoption-audit.md#strict-classification-rules):
10 = one intention; 8–9 = limited competing content; 6–7 = a substantial second
intention; 4–5 = multiple intentions and frequent switches; 1–3 = several types
dominate without a coherent contract. Every substantive secondary type is a
design defect, even at 9/10. A prerequisite, safety constraint, short definition,
compatibility limit or link does not alone introduce a second type. A minimal
copyable example can belong to Reference; an independent configuration procedure
belongs to How-To Guides. A task guide for an existing site is not a Tutorial
merely because it provides an example to copy.

T = Tutorials; H = How-To Guides; R = Reference; E = Explanation. Directory
surfaces use the historical inventory's boundary Reference classification.
The source page, not its title or intended destination, determines its type.
Scores are editorial judgements, not official Diátaxis metrics; adjacent scores
are not precise quantitative differences.

This review inspected source content, headings and the extraction relationships.
It did not repeat a full supported-option/snippet reconciliation, link crawl,
provider integration test or novice study. Previous implementation checks remain
evidence for those deliveries, not new checks performed by this assessment.
Coverage observations below identify scope and outstanding verification; they
are independent of purity. A 10 is not a completeness or usability certificate.

## Existing pages: before and now

The baseline is `main` after #106. Changes explain the new editorial judgement;
unchanged scores are deliberate where the same competing intentions remain.

| Page / source | Dominant now | Secondary now | Baseline → now | Evidence and remaining design defect | Coverage / limitation, separate from purity |
| --- | --- | --- | --- | --- | --- |
| [Start](../docs/collections/_docs/00_start.md) | T | — | 3 → **10** | Five browser steps end at a published title/article. Optional follow-ups are links; earlier task destinations live in a compatibility disclosure, not appended recipes. | One Chulapa 101 scenario. No measured five-minute promise or observed completion rate. A second learning exercise is missing. |
| [Installation](../docs/collections/_docs/01_install.md) | R, directory | — | 5 → **10** | #117 replaced competing installation procedures with a method table and short links. Its role changed from mixed H to a navigation surface; assess its two extracted H guides separately below. | Covers template, remote, gem and migration routes; is intentionally not a standalone installation procedure. |
| [Global settings](../docs/collections/_docs/02_config.md) | R | H | 3 → **6** | Identity, menu/footer and analytics procedures were extracted. Search still progresses from provider setup to Algolia keys/index upload/workflow; publisher and integration blocks mix choosing/configuring with field lookup. A substantial second intention remains. Concise metadata definitions are supporting facts, not a separate E essay. | Existing fields/defaults/version constraints retained by deliveries; full API coverage was not independently reconciled here. |
| [Theming](../docs/collections/_docs/03_theming.md) | H | R, E | 5 → **5** | Skin/color/font/highlighting recipes still share a page with Variables, palette precedence and a Codeply step-by-step exercise. Labels do not separate those intentions. | Real appearance tasks remain available. The coverage and freshness of the full Sass surface were not retested. |
| [Layouts and snippets](../docs/collections/_docs/04_layouts.md) | R | H, E | 2 → **5** | Post/page/image creation is now linked out, removing the initial learning/tutorial stretch. Internal masonry setup still precedes parameter catalogs; carousel, video, Mermaid and customization procedures interrupt lookup, with rationale/behavior discussions. | Technical depth remains; no claim that all signatures/defaults were revalidated in this review. Highest remaining mixed-reference priority. |
| [FAQ](../docs/collections/_docs/05_faq.md) | H | R, E | 5 → **5** | Some duplicated tasks now link to guides. Custom hook placement, favicon procedures, version checks and feed behavior still combine task recipes, reference and rationale. Shorter answers do not remove that mix. | Useful symptom entry points; preserve question anchors when extracting canonical procedures. |
| [Accessibility and performance](../docs/collections/_docs/06_accessibility-performance.md) | H | E, R | 5 → **5** | Keyboard/content checks share the page with PWA/offline explanation, resource-loading behavior and review-coverage facts. | Site checks are useful but do not certify accessibility, performance or installability. |
| [Migration](../docs/collections/_docs/07_migration.md) | H | R, E | 6 → **6** | A concrete migration/checklist remains interrupted by front-matter mappings and local-override/version relationships. These still need separate lookup/concept destinations. | Broad migration path; no claim to map every third-party theme or validate every provider account. |
| [Highlighting](../docs/collections/_docs/99_highlighting.md) | R | H | 8 → **8** | Rendered style specimens still start with selecting a style, copying config and restarting Jekyll. Limited procedure remains in the catalog. | Visual catalog, not a complete appearance guide. |
| [Markdown cheatsheet](../docs/collections/_docs/99_markdown-cheatsheet.md) | R | E, H | 5 → **5** | Syntax examples coexist with “What's Markdown?”, kramdown background and TOC instructions. | Parser caveats remain; no independent completeness check against upstream syntax. |
| [Variables dictionary](../docs/collections/_docs/99_variable-dict.md) | R | H | 8 → **8** | Tables are systematic, but opening configuration/enablement examples and save/publish instructions still compete with lookup. | Explicitly a selection, not every Sass variable. Do not mistake the score for exhaustive coverage. |
| [Docs directory](../docs/_pages/docs.md) | R, directory | E | 10 → **9** | Four intent groups improve finding tasks, but the inline “How publishing fits together” explanation adds limited competing conceptual content. Extract that paragraph to E and leave a link. | All four navigation groups exist; the E group currently lacks an independent conceptual page. A lower purity score does not mean worse navigation. |
| [README](../README.md) | E | H, R | 4 → **4** | Product orientation still includes create/enable/edit instructions, a starter table and the feature catalog. New destinations alone do not change its content types. | Repository orientation retained; review badges/version statements separately from purity. |
| [Homepage](../docs/index.html) | E | R | 7 → **7** | Product orientation and first-site CTA coexist with starter and feature catalogs. No substantive H sequence to classify as a third type. | Marketing/entry surface; score is not an adoption or conversion measurement. |

## New pages: independent assessment

A dash in the baseline means no corresponding source page existed in the #106
inventory. The content may have been extracted from an older mixed page; these
are not fourteen newly invented features. Check both the source page and its new
destination rather than crediting the split twice as a single numeric gain.

| Page / source | Dominant | Secondary | Baseline → now | Evidence for purity | Coverage / limitation, separate from purity |
| --- | --- | --- | --- | --- | --- |
| [Starter examples](../docs/collections/_docs/08_starter-examples.md) | R | — | — → **10** | Contents/source/preview table and constraints; setup is a link rather than a procedure. | Four repository examples; explicitly distinguishes Chulapa 101 and missing workflows. |
| [Run a starter](../docs/collections/_docs/09_run-starter.md) | H | — | — → **10** | Assumes Jekyll knowledge; copy/configure, preview, publish and check one selected example. | Existing Jekyll users; not a beginner lesson on Ruby or each hosting provider. |
| [Menu link](../docs/collections/_docs/10_edit-menu.md) | H | — | — → **10** | Existing page, edit existing navbar, publish and follow the link. Dropdown/style catalogs remain elsewhere. | Basic link task; advanced dropdown/style lookup is delegated. |
| [Footer links](../docs/collections/_docs/11_edit-footer.md) | H | — | — → **10** | Change contact/social/feed destinations and verify them without a parameter catalog. | Link editing; general footer configuration remains Reference. |
| [Fuse.js](../docs/collections/_docs/12_fusejs-search.md) | H | — | — → **10** | One provider, matching search page/path, publish and test a query. | Fuse.js only; no claim to cover Algolia or Google account setup. |
| [Giscus](../docs/collections/_docs/13_giscus-comments.md) | H | — | — → **10** | Provider prerequisites, generated hook, enable one post and verify. Version/placement constraints support the task. | Giscus only; account permissions and live service behavior need provider checks. |
| [Site identity](../docs/collections/_docs/14_site-details.md) | H | — | — → **10** | Update existing identity fields and separate home heading, preserve addresses and verify. | Narrow identity task; author overrides and custom copyright are preserved rather than rewritten. |
| [Create a post](../docs/collections/_docs/15_create-post.md) | H | — | — → **10** | Existing-site authoring task; filename/content template followed by publication/listing checks. Not an ecosystem learning lesson. | Ordinary post; custom indexes and permalinks still require site-specific lookup. |
| [Create a page](../docs/collections/_docs/16_create-page.md) | H | — | — → **10** | Create/edit a standalone page, give it a path, link it and verify publication. | Starter/root locations and one menu task; no general collections tutorial. |
| [Add an image](../docs/collections/_docs/17_add-image.md) | H | — | — → **10** | Upload, insert a repository-safe path with alt text, publish and check. Galleries are links. | One image in existing content; no responsive-source/galleries catalog. |
| [GoatCounter](../docs/collections/_docs/18_goatcounter.md) | H | — | — → **10** | Configure one endpoint, production publishing and missing-visit checks. No provider comparison or option catalog. | Requires main after v2.1.0 and a GoatCounter site. Live reporting is not verified by this review. |
| [GA4](../docs/collections/_docs/19_google-analytics.md) | H | — | — → **10** | Existing stream, measurement ID, avoid duplicates, publish and check Realtime. | Assumes an existing GA4 property; not an account-creation or consent-system guide. |
| [Remote theme](../docs/collections/_docs/20_remote-theme.md) | H | — | — → **10** | Existing working site, explicit theme/dependency/plugin edits, preview, deployment and checks. Version/override constraints support the task. | Existing Ruby/Jekyll/Bundler setup; not all hosts. Actual pinned-theme fixture was verified in #117, not repeated here. |
| [Theme gem](../docs/collections/_docs/21_gem-theme.md) | H | — | — → **10** | Existing-site install/switch, preview, publish and bounded update procedure. | Released gem path; does not supply unreleased features or teach Bundler. |

## Findings without a composite score

- The first-site tutorial now has one learning contract; it is not the place for
  optional integrations, local environment setup or provider comparisons.
- The new task pages consistently isolate an existing user's task. Their 10s
  follow the unchanged one-intention rule, not a claim of universal coverage.
- Global settings and Layouts improved after extraction but remain unfinished.
  In particular, shortening them does not turn their remaining recipes into R.
- Theming, FAQ, migration and accessibility still need substantive splitting.
  No score increase is awarded for new links, shorter prose or a better TOC alone.
- Reference/catalog surfaces retain procedural material, and the directory has
  acquired limited E content. A source can become easier to navigate while its
  purity stays unchanged or decreases.
- Independent Explanation pages and a second novice Tutorial remain missing.
  Do not move technical internals into E merely to fill that quadrant.

Do not publish an all-page average. New page counts and changed roles make it
misleading: newly separated H guides cannot be treated as independent equal
improvements to a fixed baseline denominator. There are fourteen new sources
here (thirteen H guides and one R catalog), while old mixed sources also remain.
For tracking use the fixed before/after table, each extraction's source/destination
pair, remaining defects and independent coverage/usability evidence.

## Revised implementation order

| Priority / delivery | Why next | Intended result and preserved depth | Completion evidence | Effort |
| --- | --- | --- | --- | --- |
| P1. Separate appearance tasks and precedence explanation | Theming still switches among H/R/E; a coherent bounded split can supply a useful missing E destination. | H for skin/color/font/highlighting tasks; R for identifiers/variable constraints; E for skin/vars/Autothemer precedence. Preserve current URL/anchors and all limitations. | Each destination passes its type contract; old links resolve; examples build; chatbot facts/sources stay aligned. | 1–2 working days |
| P1. Extract media procedures from Layouts | Largest remaining mixed reference; authors have to scan parameter catalogs to add media. | Separate gallery, carousel, video and diagram H guides; keep signatures/defaults/version constraints in R and runnable demos. Do not remove advanced facts. | Reconcile moved parameters, versions and anchors; build examples; check relevant responsive/keyboard behavior. | 2–3 working days |
| P1. Finish Global settings provider/task separation | Remaining search/provider setup still interrupts lookup. | H for supported provider tasks that need full procedures; R for fields/constraints; preserve deprecated-provider cautions and indexing-key boundaries. | Explicit source/destination review; no vanished field/default/version warning; focused chatbot cases. | 1–2 working days |
| P2. Extract FAQ and migration reference material | Symptom tasks and mappings still have competing sources. | Canonical H recovery procedures; R mappings/hooks; retain old question anchors as links. | No duplicate canonical recipes; preserved symptom entry points and migration checks. | 1–2 working days |
| P2. Extract user-facing explanations and accessibility constraints | Conceptual material remains embedded, including the directory paragraph. | E publishing flow/override relationships; H site checks; R supported constraints. E must answer a reader's decision, not document internals. | Independent E destinations, directory links instead of essays, preserved practical checks. | 1–2 working days |
| P2. Add a second novice exercise and observe users | High purity alone does not establish successful learning. | One supplied photo-story Tutorial; timed first-site and expert-lookup tasks with observed help/failure notes. | Visible result and few decisions; report completion/time with sample size and limitations. | 1–2 days writing plus recruitment/session time |
| P3. Clean catalog/entry-point mixtures | Highlighting/dictionary/Markdown and README/home still mix intentions. | Move independent setup out of catalogs and route README/home readers without erasing product context. | Review against the same rubric; avoid turning marketing into a manual. | 1–2 working days |

Effort estimates are editorial planning ranges, not commitments. Deliver each
bounded extraction separately; verify links, examples and affected chatbot
sources before merge, then verify Pages/Worker deployment independently. Keep
related-card candidate sets under review when tags or pages change. Contributor
reorganization stays deferred. Do not add tracking or claim adoption gains as a
side effect of rescoring; the existing metric plan still requires observations.
