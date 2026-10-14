# Chulapa documentation: a strict Diátaxis transformation plan

Date: 14 October 2026. Baseline: `main` after PR #106.
Status: strategic audit and proposed implementation, not a rewrite of the public documentation.
Language: English.

## Implementation tracking

Updated: 14 October 2026. The diagnosis and inventory below describe the baseline
after PR #106, not a continuously rescored view of the current documentation.
Completed work is recorded here without rewriting that historical assessment.

| Delivery | Status | Result and remaining boundary |
| --- | --- | --- |
| [#107](https://github.com/dieghernan/chulapa/pull/107) — audit and packaging guard | Merged | Established the strict framework and baseline inventory; excluded internal material from the gem. |
| [#108](https://github.com/dieghernan/chulapa/pull/108) — first publication | Merged and deployed | Focused the browser tutorial; extracted starter Reference and How-To pages; preserved legacy heading targets. Retargeted chatbot sources and gated Worker deployment on successful Pages publication for the same commit. |
| [#109](https://github.com/dieghernan/chulapa/pull/109) — menu and footer tasks | In review; not deployed | Extracts two How-To guides, keeps configuration reference anchors, and updates chatbot sources/evaluation cases. This is a partial separation, not a claim that Global settings is pure Reference. |
| Search and comments | Next proposed delivery; not started | Extract task guides from Global settings while preserving exact provider settings, defaults, version constraints and corresponding chatbot coverage. Scope each guide to a concrete outcome. |
| Remaining Global settings and Layouts | Pending | Continue separating task procedures, exhaustive reference and conceptual explanation. Keep the existing technical depth and source compatibility. |

For every subsequent delivery, record its PR, merge/deployment status, affected
source links and remaining mixed content. Do not mark an open PR as implemented
or rescore all pages after a small extraction. Reassess purity against the same
rubric when a page's full transformation is ready for review.

The deployment-order safeguard is now implemented by #108; the later rollout
section describes the original proposal. Its two-release sequence remains an
alternative when a change cannot use the exact-commit Pages gate. Live chatbot
answer verification remains distinct from passing tests or a successful deployment.

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
