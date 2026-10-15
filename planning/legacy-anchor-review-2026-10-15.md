# Legacy documentation anchor review

Date: 15 October 2026. Baseline: main after PR #139.
Scope: current user-facing documentation, active repository links and chatbot
source URLs. This is a compatibility/content cleanup, not a Diátaxis rescore.

## Decisions

Retire old fragments when their only purpose is compatibility routing or an
incidental generated ID. Keep useful real section access and IDs used by current
scripts, accessible relationships or live examples. Update deliberate active
references to canonical destinations before retiring their targets.

| Page | Decision |
| --- | --- |
| Start | Remove the old-version details block and superseded step aliases; current tutorial steps and next tasks remain. |
| Installation | Keep the method table, preview and version caveats; remove three duplicate routing sections. With no sections to index, disable this page's TOC. |
| Global settings | Remove the old Theming heading and put the appearance-reference link in the introduction instead of under Footer. |
| Theming | Remove color/tool routing-only headings and keep direct color/Sass task links; full Sunset and Codeply material remains in the existing Sass guide. |
| Layouts | Remove three redundant authoring headings; the introductory links already point to the canonical post/page/image tasks. |
| FAQ | Remove fake footnote IDs and duplicate favicon subheadings. Keep actual questions, including the meaningful bundled-font destination. |
| Migration | Remove the superseded front-matter heading alias; the current layouts/front-matter section remains. |
| Markdown/variables | Use current descriptive heading IDs rather than old explicit aliases. Retain live TOC, footnotes and attribute specimens. |
| Docs directory | Remove the duplicate publishing-explanation heading; its Explanation entry links directly to the existing page. |

Active links migrated: FAQ design choice to `/docs/22-choose-skin`, starter
publication to `/docs/20-remote-theme#publish-and-check`, and the content-TOC
guide's syntax reference to `/docs/markdown-cheatsheet#table-of-contents-syntax`.
No public page URL or existing page redirect is removed.

## Retired fragment inventory

The rendered comparison identifies 35 retired aliases/routing/generated targets.
Two additional IDs (`toc`, `sidetoc`) disappear from Installation because the
now-sectionless method directory no longer renders its TOC controls. They are
not broken references or retired controls elsewhere on the site.

- `00-start`: `2-change-the-name-and-author`, `3-open-your-published-website`, `5-add-a-photograph`, `6-choose-a-design`, `choose-a-starting-point`, `explore-minimal-examples`, `make-it-your-own`, `preview-locally`, `publish-and-extend`.
- `01-install`: `1-use-our-github-template`, `2-remote-theme-method`, `3-gem-based-method-`.
- `02-config`: `theming`.
- `03-theming`: `1-on-the-tool`, `change-one-color`, `step-2`, `step-by-step-example`, `tool`, `using-autothemer-on-codeply`.
- `04-layouts`: `add-an-image`, `create-a-page`, `create-a-post`.
- `05-faq`: `a-domain-root-icon`, `b-explicit-icon-links`, `fn:1`, `fnref:1`.
- `07-migration`: `3-adapt-front-matter`.
- `docs-directory`: `how-publishing-fits-together`.
- `markdown-cheatsheet`: `create-a-table-of-contents`, `markdown-toc-create-a-table-of-contents`, `markdown-toc-whats-kramdown`, `markdown-toc-whats-markdown`, `whats-kramdown`, `whats-markdown`.
- `variable-dictionary`: `theming`.

## Verification and boundaries

- Full local Jekyll 4 documentation build.
- Scan of 153 generated HTML pages: 3,375 links targeting the documentation
  resolve, including current fragments. This is not a crawl of external sites.
- All 94 documentation URLs in the selective chatbot context resolve against
  the build. No context or evaluation facts changed; no model/Worker deployment
  is needed for this branch. Existing llms.txt entries remain applicable.
- Eleven changed documentation pages checked in Chromium at 320 and 1280 px
  for responsive reflow, brand formatting and alert spacing.
- Retain preview-control IDs, the actual Sass procedure's `step-2`, the FAQ font
  destination and live Markdown example/footnote IDs. Unchanged page URLs,
  metadata templates and current section links retain the site's routing.
- Unknown external bookmarks using retired fragments may stop at the page
  rather than the old section. Repository searches do not establish no external
  use. Historical audit and live-evaluation records are intentionally unchanged.
- No reusable theme, manifest, service worker or offline behavior changes.
  This is not a full accessibility certification, SEO ranking result or PWA audit.

Reassessment follows this cleanup; historical scores and counts remain snapshots.
Observed novice/expert usability evidence remains pending.
