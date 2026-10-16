# Chulapa documentation: a strict Diátaxis transformation plan

Date: 14 October 2026. Baseline: `main` after PR #106.
Status: historical audit, current implementation tracking and a dated reassessment; public documentation changes are tracked by PR.
Language: English.

## Implementation tracking

Updated: 16 October 2026. The delivery table and active implementation order
track the current work. The diagnosis and inventory below describe the baseline
after PR #106, not a continuously rescored view of the current documentation.
Historical scores are unchanged. Older deployment observations are retained as
recorded; merge status alone does not establish a deployment or answer quality.

| Delivery | Status | Result and remaining boundary |
| --- | --- | --- |
| [#107](https://github.com/dieghernan/chulapa/pull/107) — audit and packaging guard | Merged | Established the strict framework and baseline inventory; excluded internal material from the gem. |
| [#108](https://github.com/dieghernan/chulapa/pull/108) — first publication | Merged and deployed | Focused the browser tutorial; extracted starter Reference and How-To pages; preserved legacy heading targets. Retargeted chatbot sources and gated Worker deployment on successful Pages publication for the same commit. |
| [#109](https://github.com/dieghernan/chulapa/pull/109) — menu and footer tasks | Merged and deployed | Extracted two How-To guides, kept configuration reference anchors, and updated chatbot sources/evaluation cases. This is a partial separation, not a claim that Global settings is pure Reference. |
| [#110](https://github.com/dieghernan/chulapa/pull/110) — search and comments | Merged and deployed | Extracted Fuse.js setup and giscus-on-one-post How-To guides, preserving provider reference fields and updating chatbot source/evaluation coverage. Other providers remain in the reference; their procedures are not claimed as extracted. |
| [#111](https://github.com/dieghernan/chulapa/pull/111) — site identity task | Merged and deployed | Extracts editing site name, description and author into a How-To, with a separate home-page heading check. Preserves reference anchors and adds ordered Docs navigation and chatbot coverage. |
| [#112](https://github.com/dieghernan/chulapa/pull/112) — documentation navigation | Merged and deployed | Replaces the long Docs dropdown with six entry points and organizes the index by Diátaxis intent. Existing mixed pages still require extraction; public destinations are preserved. |
| [#113](https://github.com/dieghernan/chulapa/pull/113) — documentation reading paths | Merged and deployed | Disables filename-ordered previous/next navigation only for the Docs collection, using the existing setting. Readers use the Diátaxis directory, breadcrumbs, search and task links. |
| [#114](https://github.com/dieghernan/chulapa/pull/114) — content authoring | Merged and deployed | Extracts post, standalone-page and image tasks from Layouts; preserves legacy anchors and updates task links, chatbot sources and focused evaluation cases. The remaining layout/snippet catalog is still mixed. |
| [#115](https://github.com/dieghernan/chulapa/pull/115) — analytics tasks | Merged and deployed | Extracts GoatCounter and GA4 setup into separate How-To Guides, retains settings/constraints and legacy reference anchors, and updates selective chatbot sources and cases. |
| [#116](https://github.com/dieghernan/chulapa/pull/116) — related documentation | Merged and deployed | Tags content, navigation and analytics guides plus their references; enables related cards only on eight How-To Guides. Topic-based links supplement the directory without imposing a sequence. |
| [#117](https://github.com/dieghernan/chulapa/pull/117) — installation methods | Merged and deployed | Makes Installation a short method directory; extracts remote-theme and gem setup into independent How-To Guides while preserving legacy anchors and updating chatbot sources/cases. |
| [#118](https://github.com/dieghernan/chulapa/pull/118) — dated reassessment | Merged; internal planning only | Re-scores 28 merged user-facing surfaces after #117 using the original rubric; preserves baseline scores and revises the active implementation order. |
| [#120](https://github.com/dieghernan/chulapa/pull/120) — appearance separation | Merged; Pages and context published with #121 | Extracts six appearance tasks and one precedence Explanation; preserves legacy anchors and Sunset/Codeply guidance and updates reference, task links and chatbot sources/cases. |
| [#121](https://github.com/dieghernan/chulapa/pull/121) — context compaction | Merged; Pages and Worker deployment succeeded | Reduces selective context by 29%, preserves source URLs and adds a reviewed byte budget. Live answer and latency comparison remains blocked by endpoint access. |
| [#122](https://github.com/dieghernan/chulapa/pull/122) — media extraction | Merged; Pages and Worker deployment succeeded | Five How-To Guides separate galleries, carousels, PhotoSwipe, YouTube and Mermaid setup from snippet Reference. Legacy anchors and parameters remain; other Layouts mixtures still require work. |
| [#123](https://github.com/dieghernan/chulapa/pull/123) — search-provider extraction | Merged; Pages and Worker deployment succeeded | Four How-To Guides separate Lunr, Simple-Jekyll-Search, Google and Algolia setup from configuration Reference. Comments-provider procedures remain pending; legacy anchors and settings are preserved. |
| [#124](https://github.com/dieghernan/chulapa/pull/124) — comment-provider extraction | Merged; Pages and Worker deployment succeeded | Four How-To Guides connect existing Disqus, Cactus, Welcomments and self-hosted Cusdis services; retain provider constraints and old reference destinations. Documents tested local corrections for Welcomments project-site URLs and Cactus conversation IDs, with migration cautions; runtime fixes remain follow-ups. No automatic migration or live service validation is claimed. |
| [#126](https://github.com/dieghernan/chulapa/pull/126) — FAQ routing and custom hooks | Merged; Pages and Worker deployment succeeded | Extracts two troubleshooting How-To Guides, a head-hook task and a separate hook Reference; preserves FAQ anchors and routes existing guides directly to the tasks. Remaining formatting recipes and migration field mappings are still mixed/pending. |
| [#127](https://github.com/dieghernan/chulapa/pull/127) — migration mappings | Merged; Pages and Worker deployment succeeded | Extracts a field-mapping Reference, keeps the migration sequence/checklist and legacy anchors, and replaces repeated integration recipes with canonical task links. FAQ formatting mixtures remain pending. |
| [#128](https://github.com/dieghernan/chulapa/pull/128) — publishing Explanation and accessibility separation | Merged; Pages and Worker deployment succeeded | Extracts publishing concepts from the directory; separates the existing accessibility How-To from behavior/coverage Reference. Preserves old anchors and does not claim site compliance or offline capability. |
| [#129](https://github.com/dieghernan/chulapa/pull/129) — article formatting | Merged; Pages, chatbot and search deployments verified | Extracts alert/caption/footnote How-To Guides and routes the FAQ while preserving old headings and example fragment IDs. Favicons, font/icon, version and feed material remain pending. |
| [#130 — Favicon and bundled font](https://github.com/dieghernan/chulapa/pull/130) | Merged; Pages and Worker deployment succeeded | Extracts two site-customization How-To Guides, preserving domain-root/project-path and font/ligature guidance plus old FAQ anchors. Icon, version and feed material remain pending. |
| [#131](https://github.com/dieghernan/chulapa/pull/131) — icons and version checks | Merged; Pages and Worker deployment succeeded | Extracts two FAQ tasks, preserving old anchors and version-marker limitations. Feed compatibility remains pending. |
| [#132](https://github.com/dieghernan/chulapa/pull/132) — subscription feeds | Merged; Pages and Worker deployment succeeded | Separates built-in feed publication and existing jekyll-feed coexistence into task guides; preserves FAQ anchors. Remaining Markdown/catalog mixtures are not claimed complete. |
| [#133](https://github.com/dieghernan/chulapa/pull/133) — highlighting and variable catalogs | Merged; Pages and Worker deployment succeeded | Makes lookup purpose explicit and routes setup/publication to existing How-To Guides. Preserves style identifiers, code specimens, variable tables and public URLs. Markdown and README/home separation remain pending. |
| [#134](https://github.com/dieghernan/chulapa/pull/134) — Markdown reference and content TOC | Merged; Pages and Worker deployment succeeded | Extracts content-index setup into a How-To Guide, retains syntax specimens and parser constraints, and preserves legacy anchors. README/home and learning evidence remain pending. |
| [#135](https://github.com/dieghernan/chulapa/pull/135) — README and home routing | Merged; Pages deployed; chatbot unchanged | Routes beginners, migrating users and experienced readers to canonical destinations; removes duplicated setup from README and a retired PageSpeed link from home. Learning evidence and remaining mixed reference sections are still pending. |
| [#136](https://github.com/dieghernan/chulapa/pull/136) — second publishing tutorial | Merged; Pages deployed; chatbot unchanged | Adds a controlled photo-page/menu exercise after first publication. Technical validation is distinct from observed novice usability; no human study or completion metric is claimed. |
| [#137](https://github.com/dieghernan/chulapa/pull/137) — personal publisher | Merged; Pages and Worker deployment succeeded | Separates personal-site metadata setup from publisher field Reference; confirms v2.1.0 support and retains article-author independence. Remaining reference mixtures and human learning evidence stay pending. |
| [#138](https://github.com/dieghernan/chulapa/pull/138) — date localization | Merged; Pages and Worker deployment succeeded | Separates localized-date insertion from snippet parameter/language Reference, retaining source/output specimens and the public section anchor. Remaining reference mixtures and human learning evidence stay pending. FOSSA license status was pending at merge; repository checks passed. |
| [#139](https://github.com/dieghernan/chulapa/pull/139) — republished article | Merged; deployment pending verification | Separates canonical/sitemap setup from metadata Reference and preserves the copied page address. Remaining reference mixtures and human learning evidence stay pending. |
| [#140](https://github.com/dieghernan/chulapa/pull/140) — legacy anchor review | Merged; Pages deployed; chatbot unchanged | Retires compatibility-only blocks, routing headings and old aliases; migrates active links and preserves functional IDs. Reassessment follows this cleanup; human learning evidence remains pending. |
| [#141](https://github.com/dieghernan/chulapa/pull/141) — reassessment after #140 | Merged; internal planning | Reviews 69 user-facing surfaces using the unchanged rubric, preserves earlier snapshots and prioritizes remaining Layouts/FAQ mixtures plus human learning evidence. |
| [#142](https://github.com/dieghernan/chulapa/pull/142) — Layouts/SEO/demo consolidation | Merged; deployment not reverified in this update | Delivers cloud-index, sharing and search-visibility task guides; retains sorting/default/custom-include specimens in Reference; simplifies cloud, Mermaid, PhotoSwipe and search demos. Includes reviewed cloud-fragment/sidebar fixes. See [delivery record](layouts-seo-demo-review-2026-10-15.md). |
| [#143](https://github.com/dieghernan/chulapa/pull/143) — starter consistency | Merged; deployment not reverified in this update | Centralizes setup/publication in guide 09, preserves complete samples and distinguishes annotated demos from standalone sites. Corrects the nested project demo button. See [source review and evidence protocol](starter-consistency-review-2026-10-16.md). |
| [#144](https://github.com/dieghernan/chulapa/pull/144) — classic-navbar parity | Open; implementation proposed, not merged | Shares actual classic markup and dependencies between theme and demo; adds parity and interaction checks. See [bounded review](classic-navbar-review-2026-10-16.md). Do not count this as delivered until merged. |
| Final FAQ/Reference routing review | Pending; next implementation after #144 | Remove demonstrated duplicate FAQ recipes in favor of existing guides; review Global settings/Layout boundaries together while retaining defaults, fallbacks and useful specimens. Do not re-extract cloud/sharing/indexing tasks delivered in #142. |
| Visible Diátaxis labels versus purpose-oriented introductions | Proposal pending after the routing review | Compare four existing Docs pages, one per type, before any implementation. Treat usefulness as a hypothesis; no mass labels, new YAML or claim that a label resolves substantive mixtures. |
| Human tasks and live chatbot evidence | Pending; independent evidence work | First publication, second tutorial, advanced lookup and chatbot fact/citation/latency checks remain unmeasured. Use the [prepared protocol](starter-consistency-review-2026-10-16.md#separate-evidence-protocol--still-pending); tests and deployment are not participant or answer-quality results. |

For every subsequent delivery, record its PR, merge/deployment status, affected
source links and remaining mixed content. Do not mark an open PR as implemented.
Keep baseline scores unchanged; publish dated reassessments with explicit scope,
snapshot, the same rubric and evidence. A new score does not make a still-mixed
page complete.

The deployment-order safeguard is now implemented by #108; the later rollout
section describes the original proposal. Its two-release sequence remains an
alternative when a change cannot use the exact-commit Pages gate. Live chatbot
answer verification remains distinct from passing tests or a successful deployment.

## Latest reassessment

The [15 October reassessment after #140](diataxis-reassessment-2026-10-15-after-140.md)
reviews 69 surfaces. Across the same 28 previously assessed surfaces, 11 improve
and 17 remain unchanged; the 41 added pages are assessed independently. No global
average, user-success claim or live chatbot accuracy result is inferred.

That reassessment's priorities are historical input, not the current task queue.
#142 delivered the cloud/sharing/indexing procedures and joint reference/demo
routing review; #143 delivered starter consistency. Use the
[active implementation order](#active-implementation-order) and delivery table
above for current work. Global settings has one Reference intention; do not keep
splitting it because an older assessment called it mixed. README/home retain
product/catalog mixtures. Human observations, live chatbot review and findability
remain separate evidence gaps.

The dated review below and its scores remain the #117 historical snapshot.

## Current adoption review

Reviewed against `main` after #117, 14 October 2026. The separate
[dated reassessment](diataxis-reassessment-2026-10-14.md) scores 28 merged user-facing
surfaces using the original strict rubric and records evidence, remaining mixtures
and coverage limitations. The baseline inventory/diagnosis below remains historical.
No new novice usability study or measured adoption result is claimed.

Across the 14 comparable baseline surfaces, four purity scores increase, nine
remain unchanged and the directory drops from 10 to 9 because it now includes
limited conceptual material. Fourteen new pages are assessed independently
(thirteen How-To Guides and one Reference catalog). There is no all-page average.

| Area | Current result | Remaining design defect or gap |
| --- | --- | --- |
| Tutorials | #108 focused the first-site browser tutorial on publication and moved the starter catalog/setup elsewhere. | A second guided exercise and observed completion data are still missing. |
| How-To Guides | Separate guides cover starter setup, menu/footer links, Fuse.js, giscus, site identity, post/page/image creation, analytics and remote/gem installation. | Several integration and appearance procedures remain embedded in reference pages. |
| Reference | The starter catalog is separate; extracted tasks link back to option catalogs. #117 made Installation a method directory with separate H guides. | Global settings, Layouts and Theming remain mixed. Partial extraction does not make them complete. |
| Explanation | #112 added a short publishing explanation to the documentation directory. | Standalone explanations of publishing, skins/overrides and metadata remain proposed, not delivered. |
| Navigation | #112 shortened the Docs dropdown and grouped the directory by the four Diátaxis intentions. | Grouping the directory does not transform the mixed pages it links to. Filename-ordered previous/next navigation was disabled for Docs by #113; independent tasks no longer imply a course sequence. |
| Chatbot | Task sources and focused evaluation cases accompany the extracted guides; deployment waits for the matching Pages publication. | Passing unit tests and deployment do not establish live answer accuracy. Navigation-only changes need no new context facts or evaluation cases. |

### Reading-path policy

PR #113 disabled `show_bottomnavs` in the documentation site's
`docs` collection defaults. It does not change the reusable theme's defaults,
post/demo navigation, page URLs or the supported option.

Tutorials may have an explicit learning sequence when their steps require one.
Independent How-To Guides and Reference pages are not chapters in a course.
Use the documentation directory, existing Docs breadcrumb, search and relevant
in-content links to choose the next task. Do not restore a collection-wide
filename sequence merely because its names can be reordered. A future tutorial
series needs an intentional path, separately scoped and reviewed; #113
did not add a new navigation API or implement such a series.

### Fragment compatibility policy

PR #134 relaxed compatibility for incidental example/index IDs. The subsequent
legacy-anchor review also removes the blanket requirement to retain old public
section fragments: age alone is not sufficient justification.

Review each legacy destination for useful current content and deliberate links.
Keep useful section access or migrate active docs/README/demo/chatbot references
to the canonical guide. Retire compatibility-only blocks, empty routing headings
and artificial example anchors once active references are updated. Preserve IDs
used by scripts, accessible relationships and current interactive examples.

Validate current link/fragment integrity and behavior, not equality with a past
set of rendered IDs. Historical delivery counts remain evidence of those checks,
not perpetual compatibility promises. Unknown external bookmarks may lose their
section target; repository searches cannot establish that no external use exists.
Perform this review before the next dated Diátaxis reassessment. The
[15 October review](legacy-anchor-review-2026-10-15.md) records decisions,
retired targets, migrated links and technical validation; it does not rescore
the documentation.

### Related-documentation policy

PR #116 uses the existing `tags`, `show_related` and `related_label`
fields, without changing the theme's recommendation algorithm. Eight How-To
Guides show cards; the broad reference pages are candidates, not recommendation
surfaces. Start, the index and other Docs pages have no related cards.

| Topic | Guides showing cards | Reference candidate | Expected cards per guide |
| --- | --- | --- | --- |
| Analytics | GoatCounter; GA4 | Global settings | Reference plus the other guide: 2. |
| Identity and navigation | Change site details; edit menu; edit footer | Global settings | Reference plus both other guides: 3. |
| Content | Create post; create page; add image | Layouts and snippets | Reference plus both other guides: 3. |

Each group shares `docs` plus its topic tag. Global settings belongs to both
analytics and navigation. Sharing only `docs` does not qualify a document, so
these groups do not recommend unrelated tasks to one another.

This is a topic-based navigation aid, not a tutorial sequence or a Diátaxis type
classification. The widget requires two shared tags within a collection, or three
across collections, and ranks by match count then date. It cannot distinguish a
prerequisite from an alternative or link to a reference subsection. Keep direct
task/reference links and version caveats in the guides. Check the actual rendered
candidate sets when adding or editing a guide; do not add generic shared tags to
all Docs just to make the widget produce results. The content and identity/navigation groups fill the
three-card limit: adding another guide will require reviewing which links are
omitted. The cards are supplementary: retain essential links in the guide text.
Docs explicitly sets `show_date: false`; related/random cards respect that setting
so undated documentation does not display the fallback build date. Existing post-only tag listings remain unchanged.

### Active implementation order

Updated: 16 October 2026, checked against PR merge status. #142 and #143 are
merged; #144 is open. This is the current queue; the original Phase 5 roadmap
and dated reassessments below remain historical.

1. **Classic-navbar parity — #144 in review.** Review the shared component/demo
   implementation and its root/project, expansion, keyboard and responsive
   evidence. Keep it separate from FAQ edits; do not mark it delivered yet.
2. **Final FAQ/Reference routing — next bounded PR after #144.** Reconcile FAQ,
   Global settings and Layouts against existing guides. Short post/page and skin
   editing recipes remain candidates for routing links; precise option/default,
   fallback and snippet specimens stay in Reference. Add a guide only for a
   demonstrated independent task. Check current docs/demo/README/chatbot links
   before retiring any heading; age alone is not a preservation requirement.
3. **Diátaxis type-signposting proposal — after the routing review.** Compare
   explicit labels with reader-purpose introductions on four Docs pages, one
   per type. First inspect titles/subtitles and substantive mixtures; propose
   examples without editing templates or labeling every page. Any benefit remains
   unmeasured until tested. Do not introduce new YAML just for badges.
4. **User and chatbot evidence — separately scheduled, still pending.** Observe
   first publication, the second tutorial and advanced-option lookup; review live
   chatbot answers for facts, complete examples, exact citations and latency.
   The [starter review protocol](starter-consistency-review-2026-10-16.md#separate-evidence-protocol--still-pending)
   defines records and completion criteria. No participants or live results are
   claimed; passing tests and successful deployments cannot close these tasks.

Completed foundations include appearance/media/provider extraction, migration
and FAQ task guides, publishing/override explanations, the second tutorial,
catalog/entry-point cleanup, #142's Layouts/SEO/demo block and #143's starters.
Do not repeat those extractions. Contributor reorganization remains deferred.

Do not enable related cards globally or add types as matching tags. Recheck the
actual candidate sets whenever content/tag changes affect them. Each extraction
needs source/destination review, working current fragment links and focused example checks;
review chatbot facts, citations and deployment needs separately. Contributor
reorganization stays deferred. Proposed priorities are not implemented features.

## Executive diagnosis

Chulapa already has the information needed to publish a site, configure integrations
and customize the theme. Its main defect is the **combination of different reader
intentions on the same page**. Technical accuracy does not make that design sound.

Start mixes a first-site tutorial with independent customization tasks and a
Jekyll-oriented setup guide. Global settings and Layouts mix instructions with
large reference catalogs and conceptual material. Readers must continually decide
whether they are learning, doing, looking something up or understanding a design.

The proposed architecture has exactly four documentation destinations:
**Tutorials, How-To Guides, Reference and Explanation**. Experience levels are
secondary audience labels, not an alternative hierarchy. Contributor documentation is a supporting inventory only,
not the target of this user-facing transformation. Its own reorganization is deferred.

Preserve technical depth, option names, defaults, version limitations and existing
URLs/anchors. Preserve their destinations, not the mixed pages as a permanent design.
Move content into pages with one purpose; turn legacy addresses into compatibility
entry points only after checking the migration of their links and anchors.

## Scope, evidence and scoring method

**Primary scope:** documentation that helps site owners publish, write, configure,
customize and troubleshoot Chulapa. The contributor, release, automation and test
records in the companion inventory are supporting evidence, not additional work
required before improving the user journey. Do not add their material to the user
navbar or the chatbot solely because it appears in the audit.

Sources: the current [documentation index](../docs/_pages/docs.md),
[homepage](../docs/index.html), [README](../README.md), the eleven documentation
guides, all demo and skin page sources, supporting public pages, starter READMEs,
and contributor/developer documentation. See the separate
[page-by-page inventory](diataxis-inventory.md) for source locations and scores.
The starter's [README](https://github.com/dieghernan/chulapa-101#readme) and
[publishing workflow](https://github.com/dieghernan/chulapa-101/blob/main/.github/workflows/build-chulapa-gh-pages.yml)
were checked to ground the proposed tutorial in the supported browser workflow.

This is a source/content audit and a simulated reader journey. No novice usability
sessions, conversion baseline or timed deployment experiment have been performed.
Drop-off severity and impact are hypotheses to test, not observed user behavior.
Public paths are shown without the site's `/chulapa` prefix in the inventory;
repository-only documents have source paths instead of invented public URLs.

### Strict classification rules

| Type | Reader intention | Admission rule | Content to remove from that page |
| --- | --- | --- | --- |
| Tutorials | Learn through a guided successful experience. | One controlled scenario, visible milestones, few choices, stated completion. | Provider comparisons, option catalogs, optional customization branches and independent recipes. |
| How-To Guides | Complete a known task or solve a specific problem. | State prerequisites, give direct steps, verify the result. | Teaching a general ecosystem, theory, exhaustive parameters and unrelated tasks. |
| Reference | Look up exact facts. | Systematic fields, syntax, defaults, allowed values, constraints and compatibility. | Narrative walkthroughs, setup sequences and design essays. |
| Explanation | Understand reasons, relationships and trade-offs. | Explain why/how concepts relate, independently of completing a task. | Imperative setup steps and exhaustive option tables. |

A short prerequisite, safety constraint, link or minimal factual definition does
not by itself constitute a second document type. A substantive procedural sequence,
learning journey, conceptual discussion or option catalog does. Showing both
Tutorial, How-To and Reference on one page is always a design defect in this audit.
Labels, a TOC and an “advanced” heading do not repair that defect.

Purity is an editorial diagnostic, not an official Diátaxis metric or a measured
quality score. Apply the same rubric to every page:

- **10:** one clear intention; no substantive competing type.
- **8–9:** one intention; limited competing content that should be extracted.
- **6–7:** substantial second intention; clear split required.
- **4–5:** multiple intentions and frequent changes of reading mode.
- **1–3:** three or four intentions dominate different stretches; no coherent contract.

High purity does not imply completeness, accuracy, usability or freshness. A sparse
contribution page can be pure but still fail to enable a contribution. Historical
records and catalogs are classified as Reference for this inventory; they are not
tutorial candidates. Navigation/service pages are boundary surfaces, not lessons.

## Phase 1 — Diátaxis inventory

### Core guides and entry points

The inventory records the current page, not the type implied by its title.
T = Tutorials; H = How-To Guides; R = Reference; E = Explanation.

| Page / public path | Dominant | Secondary | Purity | Evidence and defect |
| --- | --- | --- | --- | --- |
| Start /docs/00-start | T | H, R | 3/10 | Guided first publication expands into photo/skin recipes, a starter comparison table and a local setup sequence. The learning contract does not end at first success. |
| Installation /docs/01-install | H | R, E | 5/10 | Several setup procedures share method-selection rationale, dependency/version facts and local-override explanations. It is not a single beginner tutorial. |
| Global settings /docs/02-config | R | H, E | 3/10 | Option/default catalogs coexist with identity editing, navigation/search/comments setup and SEO explanation. |
| Theming /docs/03-theming | H | R, E | 5/10 | Skin/color/font tasks, variable guidance and Autothemer relationships coexist. Multiple procedures need separate task contracts. |
| Layouts and snippets /docs/04-layouts | R | T, H, E | 2/10 | Post/page creation, media recipes, layout/snippet parameter catalogs and metadata/architecture explanations share one document. |
| FAQ /docs/05-faq | H | R, E | 5/10 | Troubleshooting, content recipes, custom-hook reference and version reasoning compete in a question list. |
| Accessibility and performance /docs/06-accessibility-performance | H | E, R | 5/10 | A reader checklist expands into resource/offline explanations and a coverage/compatibility record. |
| Migration /docs/07-migration | H | R, E | 6/10 | A migration procedure embeds a cross-theme equivalence table and override/version background. Useful facts, but still mixed under strict Diátaxis. |
| Highlighting /docs/syntax-highlighting | R | H | 8/10 | A visual catalog includes instructions to apply the selection. Keep specimens in Reference; move the saving procedure to a how-to. |
| Markdown cheatsheet /docs/markdown-cheatsheet | R | E, H | 5/10 | Syntax lookup, introduction to Markdown/kramdown and TOC instructions are different intentions. |
| Variables dictionary /docs/variable-dictionary | R | H | 8/10 | The option catalog opens with configuration steps. Move the procedure; retain syntax examples and constraints. |
| README / repository | E | H, R | 4/10 | Product orientation, setup methods and feature/support catalogs compete before a reader chooses an intention. |
| Homepage / | E | R | 7/10 | Product orientation includes feature/example catalogs and technical installation alternatives. Use it to route readers; do not make it a fifth documentation quadrant. |
| Documentation index /docs | R | — | 10/10 | A directory, not a lesson. Purity is high; intent-based findability is still weak because it lists mixed documents. |

### Section-level allocation for the five highest-priority pages

| Current source section | Its actual intention | Destination after transformation |
| --- | --- | --- |
| Start: create copy, identity edits, first saved sample and public URL | T | Publish your first site from the browser. |
| Start: upload an image / choose a skin | H | Add an image / change a skin. A later controlled learning exercise belongs in a separate tutorial. |
| Start: compare minimal examples | R | Starter catalog; an E comparison explains when to choose each. |
| Start: copy example, preview locally, publish it | H | Run a starter locally / publish an existing Jekyll site. |
| Installation: GitHub template pointer | R navigation | Tutorial entry link, not a duplicate tutorial. |
| Installation: remote theme and gem steps | H | Separate task pages for each installation method. |
| Installation: supported versions/dependencies | R | Compatibility and dependency reference, linked beside affected steps. |
| Installation: how theme updates and overrides relate | E | Theme inheritance and local overrides. |
| Global settings: identity/menu/footer editing | H | Change site details / edit navigation / edit footer links. |
| Global settings: complete settings/defaults/provider identifiers | R | Site configuration reference. |
| Global settings: search/comments/analytics activation | H | Separate recipes by outcome; one provider per recipe where setup differs. |
| Global settings: metadata roles and collection/default concepts | E | Metadata concepts / content organization; exact fields remain in R. |
| Theming: skin/color/fonts/highlighting/Autothemer procedures | H | Separate tasks; reuse their examples without duplicating full tables. |
| Theming: option names/types and variable catalog links | R | Theme configuration and variable reference. |
| Theming: how generated colors, skins and overrides interact | E | How skins and customization work. |
| Layouts: controlled creation of a first post/page | T | A focused learning exercise with a supplied scenario and visible result. |
| Layouts: media, guest-author, TOC and customization recipes | H | One guide per outcome or tightly related procedure. |
| Layouts: complete layouts, page flags and snippet arguments | R | Layout, front matter, snippet and SEO field references. |
| Layouts: layout layering, metadata roles and generated-output trade-offs | E | Architecture or metadata explanations, only where they help users/contributors understand decisions. |

These are content moves, not instructions to erase safety caveats from procedures.
A compatibility warning stays next to the step it constrains and links to full R/E
material. Do not classify every inline example as a tutorial: reference examples
illustrate facts, while a tutorial controls a learning sequence.

## Phase 2 — Mixing defects and their effects

| Page / mixture | Why the design fails | Beginner impact | Experienced-reader impact | Required repair |
| --- | --- | --- | --- | --- |
| Start: T + H + R | The end of learning is indistinguishable from optional tasks and alternative setups. | Keeps reading into tools and choices that are not prerequisites. | Must scan a beginner journey to locate local-example setup. | Retain one tutorial; extract independent tasks and catalog. |
| Installation: H + R + E | Three methods resemble sequential stages; selection and execution share the same surface. | May install tools unnecessarily or follow multiple methods. | Version facts are dispersed through prose. | Separate method how-tos, compatibility R and method-choice E. |
| Global settings: R + H + E | Task order and parameter taxonomy have incompatible structures. | Treats optional settings as a form to complete. | Searches procedural paragraphs for an exact field/default. | Make this URL a stable reference destination; extract task pages and concepts. |
| Theming: H + R + E | Choosing one appearance, editing variables and understanding color generation are different goals. | Prematurely faces Sass, variables and external tools. | Repeated task preambles slow lookup. | Extract task guides and E; centralize exact settings in R. |
| Layouts: R + T + H + E | A single page cannot simultaneously teach an initial edit and exhaustively describe every layout/snippet. | Faces unfamiliar front matter/SEO options immediately after a simple example. | Long navigation and duplicated facts obscure constraints. | Split all four intentions; keep old anchors mapped to their replacements. |
| FAQ: H + R + E | A question-shaped heading does not make a parameter list a how-to. | Cannot distinguish urgent recovery from advanced customization. | Unclear canonical source for hook/version facts. | Keep an H troubleshooting directory; move reference facts and explanations out. |
| Migration: H + R + E | A comparison catalog interrupts the action sequence. | Stops migration to interpret potentially irrelevant mappings. | No stable field-mapping lookup independent of the procedure. | Keep H sequence/checklist; move mappings to R, rationale to E. |
| Supporting scope only — developer READMEs: H + R + E | Build instructions, design, deployment configuration and results are interleaved. | New contributors cannot identify their minimum first change. | Historical outcomes can be mistaken for current guarantees. | Separate contributor tutorial, task runbooks, configuration R, design E and dated records. |

A good table, warning or code example can be factually right and misplaced. The
previous approach of adding “Getting started / Advanced reference” links is a
transitional aid, not the end state. The new migration guide must be held to the
same rule as older pages; it receives no exception for being recent.

## Phase 3 — Simulated beginner journey

Persona: no Jekyll, GitHub Pages, Ruby or YAML knowledge; can edit text in a browser;
wants a public personal blog. This is a cognitive walkthrough, not a user study.

| Journey and encounter | Decision/concept introduced too early | Failure or likely abandonment | Severity | Correction effort |
| --- | --- | --- | --- | --- |
| Homepage → four starters, skins and installation pitch | Which starter, remote theme or gem? | Chooses a source example without a publishing workflow. | High | Low: label alternatives and route first-time readers to one tutorial. |
| README → features and Installation | What is a theme, YAML, Ruby gem? | Assumes software installation is required. | High | Low: a direct tutorial CTA before technical alternatives. |
| Start → identity edits | Title, description, author, repository, URL before seeing anything. | Makes an indentation error or postpones starting. | High | Medium: reduce edits to necessary title/URL identity, defer the rest. |
| GitHub editor → Commit changes | Is this publishing, saving, or submitting a PR? | Saves to a non-publishing branch or does not save. | High | Low: explain the immediate action and expected screen. |
| Actions → pending/failed/latest execution | Build logs, workflow, branch. | Reads an unrelated older run or cannot recover from a failure. | High | Medium: show three symptoms with a direct recovery guide. |
| First publication → photos/skins/local examples continue | Liquid, front matter, Ruby and Bundler. | Believes successful publication is incomplete. | Medium | Medium: end T at public success; link to optional H destinations. |
| New page → menu lives elsewhere | File address versus visible menu link. | Page exists but appears missing. | High | Medium: a complete create-and-link H task. |
| Global settings → SEO/providers/options | Which service, which fields, do I need all of this? | Configures search already enabled by the starter or copies unrelated YAML. | Medium | High: extract tasks and leave a systematic R page. |
| Layouts → parameter catalog | Which layout/flag is required to write an article? | Copies unnecessary settings and loses the editing task. | High | High: split T/H/R/E. |

### Proposed introductory copy

> **A ready-made design for your first blog.**
> Chulapa gives your stories, photographs and projects a website design. Start with
> a working example, change its title and an article in your browser, then open your
> public website. You only need a GitHub account to follow the tutorial.
>
> **Publish my first site** · **See the example blog**
>
> GitHub stores the files, GitHub Pages publishes the site, Jekyll turns your files
> into web pages, and Chulapa supplies the design. The starter connects these for you.
>
> Already using Jekyll? **Migrate a site** or **Browse Reference**.

This is landing-page orientation. Put the longer ecosystem explanation in E, not
inside the tutorial. Apply the documentation's theme-name span when implementing
this copy publicly; resolve CTA labels to real links.

### Draft tutorial: “Publish your first site in under 5 minutes”

Treat five minutes as a hypothesis, not a current promise. Until timed tests support
it, publish this as **“Publish your first site from your browser.”** Measure editing
and GitHub deployment wait separately. Account creation is an explicit prerequisite,
not silently excluded when reporting end-to-end results.

**Scenario:** publish a personal blog called “My first blog” with an article called
“Hello, this is my website.” Use the supplied starter throughout; offer no alternative
install methods, providers or skins inside the exercise.

**Before starting:** sign in to GitHub, preferably on a desktop browser. This exercise
creates a public repository; do not upload private information. No local software is
required. A repository is the folder containing your site's files on GitHub.

1. **Create your copy.** Open the
   [starter template](https://github.com/dieghernan/chulapa-101/generate), name your
   repository `my-blog`, select Public and create it. Expected: your own file list.
2. **Enable publishing.** In your copy, open **Settings > Pages** and select
   **GitHub Actions** as Source. The starter already includes its workflow: do not
   create another. Expected: Pages is ready to publish your saved changes.
3. **Name the site.** Open `_config.yml` in Code and click the pencil. Replace the
   existing `title`, `repository` and `url` values; do not replace the file or add
   duplicate sections. For GitHub user `ana` and repository `my-blog`:

   ```yaml
   title: "My first blog"
   repository: ana/my-blog
   url: "https://ana.github.io"
   ```

   Substitute your username and repository name. Keep other settings and spacing.
   Click **Commit changes** to save a version on the default publishing branch
   (`main` or `master` in the starter). Expected: the edited file is saved.
4. **Edit the supplied article.** In `_posts/`, open a sample article. Change its
   `title` between the two `---` lines to `"Hello, this is my website"`. Keep the
   filename and other initial settings. Below the second `---`, replace the body
   with `Today I am publishing my first story.` Save with **Commit changes** on
   the default branch. Expected: the saved source contains your own words.
5. **See the public result.** In **Actions**, wait for the publishing run for the
   latest change to succeed. Open the URL shown in **Settings > Pages** and check
   the site title and edited article. Expected: both appear on the public site,
   not in GitHub's file editor. The exercise ends here.

A short recovery link beside step 5 should open the separate H guide for no run,
pending, failed, or successful-but-stale publication. Do not insert a general
troubleshooting decision tree into the tutorial. A known safe recovery action may
be included only when it restores this exact exercise.

No Ruby, Bundler, terminal, layout or collection lesson precedes success. The title
and identity/URL edits are necessary in today's starter; omit advanced configuration,
not required values. Author, description, About cleanup, images and skins belong in
subsequent task guides. Link to a “before sharing” H checklist after completion.

## Phase 4 — Target Diátaxis architecture

All headings below are proposed destinations. They do not claim these new public
URLs already exist. Keep audience tags such as first-time author, Jekyll user and
contributor alongside the document, not as the primary navigation hierarchy.

```text
Documentation
├── Tutorials
│   ├── Publish your first site from your browser [first-time author]
│   ├── Create a short photo story [first-time author; controlled second exercise]
├── How-To Guides
│   ├── Content
│   │   ├── Edit an existing article
│   │   ├── Publish a new article
│   │   ├── Add an image with alternative text
│   │   ├── Create a page and add it to the menu
│   │   └── Replace sample content before sharing
│   ├── Site tasks
│   │   ├── Change site details, menu or footer [separate task guides]
│   │   ├── Change a skin or one color [separate task guides]
│   │   ├── Change fonts or code highlighting [separate task guides]
│   │   ├── Enable search [provider-specific tasks as needed]
│   │   ├── Enable comments [provider-specific tasks as needed]
│   │   ├── Add analytics
│   │   ├── Set a sharing image and description
│   │   └── Check mobile, keyboard and content accessibility
│   ├── Installation and maintenance
│   │   ├── Migrate an existing Jekyll site
│   │   ├── Install a remote theme / install the gem [separate tasks]
│   │   ├── Run an existing site locally
│   │   ├── Publish an existing site with GitHub Actions
│   │   ├── Update the theme and review local overrides
│   │   ├── Recover from a publication or content problem [symptom guides]
│   │   └── Keep an existing feed URL
│   ├── Advanced tasks
│   │   ├── Configure a collection or paginated index [separate tasks]
│   │   ├── Add a gallery, video, TOC, formula or diagram [separate tasks]
│   │   └── Add custom CSS, head tags or scripts [separate tasks]
├── Reference
│   ├── Compatibility, releases and runtime dependencies
│   ├── Site configuration: every supported field and default
│   ├── Page/front matter fields and precedence rules
│   ├── Layout catalog and supported content
│   ├── Snippet signatures and parameters
│   ├── Skin variables, fonts and highlighting identifiers
│   ├── Metadata/SEO fields and constraints
│   ├── Migration field mappings
│   ├── Markdown and kramdown syntax
│   ├── Starter, skin and rendered example catalogs
│   ├── Custom hooks
│   └── Changelog and licenses
└── Explanation
    ├── How GitHub, Pages, Jekyll and Chulapa fit together
    ├── What happens between saving and publishing
    ├── Choosing an installation method
    ├── How skins, variables and local overrides interact
    ├── Organizing posts, pages and collections
    ├── How search, comments and feeds differ
    ├── Metadata and search visibility: roles and limitations
    └── Performance, resource loading and offline limitations
```

Do not add a speculative “API” page: the real interfaces are configuration,
front matter, includes and extension hooks. Keep the existing one-level navbar
capability; use the documentation index for this full tree. No new theme settings
or JavaScript navigation system are needed to describe the four intentions.

### Strict split versus compatibility

The current repository instructions require preserving existing public pages,
URLs and heading anchors. Preserve them while planning extraction:

- Create a destination with exactly one intention before moving any content.
- Keep an old address as a short compatibility directory; link former headings
  to their new documents and preserve fragment targets. A redirect alone cannot
  reliably remap many old fragments to different pages.
- For an existing page chosen to remain Reference, remove substantive procedures
  only after their H/T replacements are complete and linked.
- Mark any temporary mixed page as unresolved migration debt. Do not call it pure
  because the new sections have labels or links.
- Check links from navbar, examples, README, `llms.txt`, search and chatbot context.
  Do not delete advanced detail to raise a purity score.

## Phase 5 — Transformation roadmap and prioritization

This is the original #106-baseline roadmap. See [Active implementation order](#active-implementation-order)
and the [dated reassessment](diataxis-reassessment-2026-10-14.md#revised-implementation-order)
for current priorities; do not interpret completed historical proposals as pending.

Effort estimates are working days, excluding review/recruitment waiting time.
Impact is expected benefit, not an observed conversion lift. Order prioritizes a
coherent first tutorial, then task/reference separation, then maintenance.

### Delivery stage 1 — Quick wins

| Priority / task | Problem resolved and expected impact | Effort | Completion evidence |
| --- | --- | --- | --- |
| P0. Publish one tutorial contract and route first-time readers to it. | Prevents beginner method selection and premature installation; high impact. | 0.5–1 day | One CTA, scenario, prerequisites and visible public success. |
| P0. Extract photo/skin/local-example tasks from the learning sequence. | Removes T/H/R mixing in Start; high impact. | 1 day | Tutorial has no optional branches or catalog; extracted material remains accessible. |
| P0. Give saving, publishing and visiting distinct wording and milestones. | Reduces uncertainty at the first irreversible-looking action; high impact. | 0.5 day | Each instruction names a control, expected result and relevant recovery link. |
| P1. Reframe Installation as a method directory while retaining old anchors. | Prevents interpreting methods 1/2/3 as a single sequence; medium/high impact. | 0.5 day | Each method links to its own H guide; no duplicate beginner tutorial. |
| P1. Record baseline novice and expert lookup tasks. | Replaces assumptions with evidence before a wider split; high impact. | 1–2 days | Timed sessions with failure/help notes and exact success criteria. |

### Delivery stage 2 — Reorganization: split, merge, move

| Source | Split | Merge / canonical destination | Move and compatibility | Effort |
| --- | --- | --- | --- | --- |
| Start + repeated starter instructions | One T; separate H for later edits/local setup; R starter catalog. | One browser tutorial, linked by README/Installation rather than duplicated. | Retain /00-start and its previous heading targets through compatibility links. | 1 day after stage 1 |
| Global settings | H task recipes; R field/default catalog; E metadata/content models. | Merge repeated option definitions from FAQ into R; procedures into their matching H only. | Keep /02-config as R; former task headings point to complete H guides. | 2–3 days |
| Layouts | T first-content exercise, H media/customization, R layouts/snippets/front matter, E architecture. | Merge duplicate gallery/diagram setup text into canonical H; keep runnable specimens in R. | Maintain /04-layouts anchors; create explicit parameter/reference destinations. | 3–4 days |
| Theming + variable dictionary + skins | H appearance tasks, R identifiers/variables/specimens, E color-generation model. | One R definition per variable; no copying full settings lists into skin H guides. | Keep preview URLs; replace setup prose with H links. | 1–2 days |
| FAQ + Migration | H symptom/migration procedures; R mappings/hooks; E version/override reasoning. | Merge repeated troubleshooting answers with the relevant H guide. | Preserve old questions/anchors as links; keep migration checklist in its H. | 1–2 days |
| Accessibility and performance | H site checks, R constraints, E resource/offline reasoning. | One current user checklist; keep test records in the supporting inventory. | Historical results remain outside the user learning path. | 1 day |

Preserve safety constraints, prerequisites and version caveats with the relevant
procedure. Do not merge a tutorial and a how-to merely because both create a post:
one teaches through a supplied scenario; the other helps an existing author do work.

### Delivery stage 3 — Optimization

| Task | Problem resolved / benefit | Effort | Completion evidence |
| --- | --- | --- | --- |
| Novice tutorials and expert lookup tests | Splitting could improve purity without improving real use. | 1–2 days | Comparable tasks show where people succeed, struggle or need help. |
| Templates and content review gates per quadrant | Mixed pages return as features are added. | 1 day | PR checklist names type, reader intent, prerequisites, excluded material and canonical links. |
| Reference completeness and link checks | Extraction loses defaults, anchors or version warnings. | 1–2 days | Option/snippet inventory reconciled, old fragments checked and examples built. |
| Contributor documentation reorganization — deferred | Separate audience, outside this user-documentation roadmap. | Not estimated here | A separately scoped task, not a dependency of user-facing improvements. |
| Aggregate analytics and query taxonomy | Teams prioritize by anecdotes alone. | 1–2 days | Clearly defined, privacy-aware measures with documented observation limits. |
| Release maintenance workflow | Starter, guides and chatbot drift independently. | 0.5 day initially; per release thereafter | Named owner reviews each tutorial and affected H/R/E pages; context updates are deployed only when authorized. |

## Phase 6 — Recommended new documents

“New” means a new single-purpose destination. Much of the material already exists
and should be extracted, not rewritten into a second competing source.

| Title | Type | Objective and audience | Suggested outline |
| --- | --- | --- | --- |
| Publish your first site from your browser | T | Teach first-time authors through a controlled successful publication. | Prerequisites → copy → enable Pages → title/identity → edit sample → save → public result. |
| Create a short photo story | T | Give newly published authors a second guided learning result. | Supplied scenario → upload one image → edit one story → descriptive alt → publish → verify. No catalog of media options. |
| Recover a missing or failed publication | H | Restore an existing site's publishing task. | Preconditions → identify symptom → no run / pending / failed / stale → verify → escalation details. |
| Create a page and link it from the menu | H | Help an author complete a real standalone-page task. | Existing site prerequisite → create file → set address → add nav link → save → open on mobile. |
| Enable Fuse.js search / enable giscus comments | H, separate pages | Help site owners enable a chosen integration without comparing all providers mid-task. | Preconditions/account if required → exact files → configure → publish → verify → provider-specific failure. |
| Site configuration reference | R | Provide exact supported options to intermediate/advanced users. | Field group → name/type → default → valid values → constraints → version → links to H/E. |
| Layout, front matter and snippet reference | R, separate catalogs | Preserve exhaustive technical interfaces for advanced users. | Identifier/signature → inputs → behavior → limits → compatibility → minimal illustrative example. |
| Migration field mappings | R | Translate known legacy patterns without interrupting the migration procedure. | Mapping table → scope/assumptions → unsupported automatic conversions → field-reference links. |
| From saved files to a public website | E | Explain the system to curious beginners after first success. | GitHub/files → commit → build/publish → public URL → waiting and visibility. No numbered setup procedure. |
| How skins and overrides interact | E | Explain customization choices to intermediate users. | Skin versus layout → variables → precedence → local copies → upgrade trade-offs. |
| Make your first documentation contribution — deferred | T | Separate contributor scope; not required for user adoption. | Validate and plan in a separate contributor-documentation task. |
| Chatbot architecture and limitations — deferred | E | Maintainer material, separate from the user documentation. | Keep the current operational sources; do not add architecture to the user learning path or chatbot context. |

Do not label existing demos as tutorials simply because they show a result. A demo
is an illustrative R artifact unless it actually guides a learning sequence.
A short introductory concept page is E; a long glossary is R and is not a prerequisite
to publishing. Do not invent a missing migration guide: it already exists and needs
strict separation, not another overlapping guide.

## Phase 7 — Quality and adoption metrics

### Operational definitions

| Metric | Definition | Collection method and limits |
| --- | --- | --- |
| Time to first success | Tutorial opened → personal title and article visible at public URL. Report editing and deployment waiting separately; median and p90. | Timed observed sessions first. Documentation analytics cannot observe completion on another person's repository/site by themselves. |
| Tutorial completion rate | Participants reaching the stated result / participants starting the exercise; report assisted and unassisted separately. | Moderated or consented task studies; define start before collecting. A click to GitHub is not completion. |
| Perceived difficulty | One post-task 1–7 ease question, plus a short reason. | Voluntary response; record sample size and selection bias. Compare the same task and population. |
| Navigation depth | Intervening documentation pages before the correct task/reference destination; also record wrong turns. | Click-path studies; aggregate analytics are supplemental and may not identify a whole session. |
| Search use and success | Searches per task, repeated/rephrased queries, successful result selection, no-result queries. | Observe task sessions. Production query tracking needs explicit implementation/policy; do not assume the existing search/chat retains queries. |
| Abandonment ratio | Participants who stop without success / starters; classify by step/reason. | Observed or opt-in sessions. An outbound template click or idle tab is not reliable abandonment evidence. |
| Reference lookup success | Correct option/default/version found without completing a tutorial. | Experienced-user lookup tasks, time/error/help measures. Protect this while reducing beginner friction. |
| Purity defects | Documents with substantive secondary types and unresolved mixed sections. | Editorial rubric from this audit. Track counts by quadrant; do not optimize the score by deleting facts. |
| Completeness and compatibility | Retained option/snippet definitions and working old URLs/fragments. | Source inventories, builds and link checks, with version-specific examples. |

### Measurement plan and proposed thresholds

1. Baseline pilot: five first-time users and two experienced Jekyll users. This is exploratory, not a statistically representative conversion estimate.
2. Repeat comparable tasks with new participants after the first split. Pilot goal:
   at least four of five novices finish the tutorial unaided; experts still find
   exact defaults. Contributor testing belongs to a separate project. These are
   proposed acceptance goals, not claims about current performance.
3. Publish a time claim only after a larger timed sample supports it under stated
   conditions. If GitHub waiting time breaks five minutes, change the claim rather
   than hiding the waiting time from the definition of success.
4. Review the most visited pages, symptom questions and failed lookups over the
   following 2–4 weeks. Set improvement targets after observing a baseline.

The docs configuration includes GoatCounter and GA4. Review their available
aggregate reports before adding tracking; never sum both as unique users. Proposed
`start_tutorial`, `open_template`, `open_help` or voluntary success events are not
implemented features. Cross-domain progress is not available merely because a
page-view counter exists. Do not send repository content, credentials, draft posts
or full questions to analytics. Start usability work without waiting for instrumentation.

## Chatbot continuity: a release requirement for every user-documentation split

The chatbot is a user-facing entry point into the documentation. A cleaner page
architecture must not make its instructions less complete or its citations unusable.
Diátaxis constrains public document intent; it does **not** require four chatbots,
four runtime contexts, or splitting a useful answer into disconnected fragments.

### Verified current behavior

- [build.mjs](../docs/ai-chatbot/build.mjs) embeds the manually maintained
  [ai-context.md](../docs/ai-chatbot/ai-context.md) into generated Worker content.
  The assistant does not crawl updated guides to discover new content or URLs.
- The [Worker prompt](../docs/ai-chatbot/worker.mjs) requires source URLs to be
  copied exactly from context, without invented or appended anchors. Moving a
  fact or heading therefore requires reviewing the corresponding context citation.
- [deploy-chatbot.yml](../.github/workflows/deploy-chatbot.yml) runs on main pushes
  touching `docs/ai-chatbot/**` or the workflow itself, and supports manual dispatch.
  It runs `npm test` before deployment. Changing only documentation pages does not
  update the assistant's knowledge.
- Pages and chatbot deployment are separate workflows, with no Pages-completion
  dependency in the current chatbot workflow. Merging both changes together can
  expose new chatbot citations before their destination pages are live.
- Unit tests and bundled-context equality checks establish build/runtime properties;
  they do not establish answer quality or that a generated citation reaches the
  intended new section. These need focused checks and reviewed answers.

### Preserve facts, change source structure deliberately

| Documentation change | Context treatment | Required verification |
| --- | --- | --- |
| Copy edit or new navigation grouping; facts and source destinations unchanged | Do not rewrite or enlarge the context by default. Record that it was reviewed. | Existing citations still reach the same supported advice. |
| Extract a task/reference while keeping the old page and advice temporarily | Keep the current context until new pages are live; then change source pointers selectively. | Both the old compatibility destination and the new canonical one work. |
| Rename a heading or retire an old source fragment | Preserve an alias/compatibility entry and update exact source URLs after publication. | Resolve the complete path plus fragment, not merely HTTP 200. |
| Correct a setting, default, prerequisite or version constraint | Update the affected fact/example and its evaluation case together. | New answer is correct; previously supported adjacent questions still work. |
| Split a long source into four Diátaxis destinations | Keep the selective factual summary, linking task questions to H, first steps to T, exact options to R, and reasons to E. | No lost prerequisites, defaults, version caveats or complete example. No wholesale copying of four pages. |

For each extraction, maintain a change ledger: old URL/fragment → new destination,
reader task, retained facts, affected `Source:` lines, affected evaluation IDs,
publication status and rollback destination. Inspect existing cases in
`evaluation-cases.json`, `evaluation-extra-cases.json` and
`evaluation-community-cases.json` rather than assuming source
filenames are the only dependencies. Keep context concise; audit source coverage
and bundled context size when changing it, without imposing an invented model limit.

### Safe rollout with the current workflows

1. **Publish additive destinations first.** Build the split documentation while
   retaining existing pages, anchors and advice as temporary compatibility material.
   This deliberately mixed transition is migration debt, not a pure final design.
   Do not change context citations to unpublished URLs in this first release.
2. **Verify the Pages deployment.** Check the actual deployed destination, relevant
   heading, content and version caveat. A preview URL does not prove the production
   URL that the chatbot will cite is ready.
3. **Update the context in a subsequent release.** Change only affected facts,
   examples and exact citations; retain the information needed for a complete
   practical answer even when the public sources now belong to separate quadrants.
   Run `npm test` in `docs/ai-chatbot` and inspect context/bundle consistency.
4. **Review focused answers.** Use the existing evaluation tools/cases for affected
   questions within authorized live-evaluation scope. Compare factual accuracy,
   runnable code, prerequisites, version caveats and citations with the baseline.
   A successful HTTP response or passing unit tests is not sufficient.
5. **Confirm Worker deployment and compatibility.** Verify the main-push chatbot
   run and sampled deployed answers. Then retire duplicated legacy prose only
   when both documentation and context point to stable replacements. Keep old
   external links/fragment entry points discoverable.

Representative questions: first browser publication; image paths with `baseurl`;
page creation plus menu link; search provider plus required search page; comments
provider plus per-page opt-in; migration feeds/overrides; pinned v2.1.0 versus main;
exact layout/snippet parameters; and why a customization overrides the theme.
Use existing evaluation cases where available and add only missing focused cases.

**Release gate:** no missing factual coverage, no unsupported feature/version claim,
no broken or misleading source fragment, and no regression in the reviewed affected
answers. Assign an owner to the source/context ledger before extraction begins.
If the gate fails, retain the old source/context and fix the new destinations.
If a deployed context regresses, restore the last reviewed context through the
normal tested deployment path; keep its cited documentation available. Do not roll
back already-correct theme behavior merely to repair an editorial change.

No workflow, context, evaluation case or deployed chatbot is changed by this audit
PR. The two-release sequence is achievable with today's workflows; adding a formal
Pages-dependent deployment gate would be a separate implementation, not an existing
capability. The extra release/verification cost is part of each extraction task.

## Editorial acceptance and implementation boundaries

Each future document must declare its reader intention, one Diátaxis type,
prerequisites and a completion/lookup/understanding contract appropriate to that type.
A review must reject substantive T/H/R/E mixing even if every fact is technically right.

- T: an observable supplied exercise, no optional/provider-choice branches.
- H: a real task with verification, no general conceptual lesson or parameter catalog.
- R: complete systematic facts, no imperative setup sequence.
- E: coherent conceptual reasoning, no task checklist or exhaustive interface catalog.

Before completing any extraction, reconcile the full configuration/header/snippet
inventory. Preserve defaults and caveats, keep old fragment targets discoverable,
render examples with supported Jekyll versions as appropriate, and update public
entry points plus `llms.txt` and selective chatbot context when actionable facts or
sources change. A Pages deployment does not deploy chatbot context by itself.

Check mobile reflow, keyboard navigation, headings and accessible link/alert names
for any implemented navigation/content changes. A source audit is not an accessibility
certification. Keep SEO URLs, canonical relationships and internal links intact.
The docs site's favicon manifest does not establish offline PWA support; this plan
requires no new service worker, cache or theme configuration API.

This plan and its inventory live outside the published `docs/` source and theme
package selection. They change no supported product behavior and need no new public
`llms.txt` entry, chatbot context update or deployment. The public documentation is
unchanged in this PR. Implementing the roadmap is a subsequent scoped task.
