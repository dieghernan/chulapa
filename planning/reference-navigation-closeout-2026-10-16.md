# Final reference and accessibility navigation review

Date: 16 October 2026. Baseline: main `23f38525d`, after merged #157.
Branch: `codex/docs-reference-closeout`.
Delivery: [PR #158](https://github.com/dieghernan/chulapa/pull/158).
Status: merged #158; all applicable head checks passed, no unresolved threads and branch deleted. Editorial closeout delivered; actual Pages/Worker rollout separately unverified.

## Page decisions

| Page | Reader purpose and disposition |
| --- | --- |
| 02 config | Site-wide field lookup. Show existing analytics/navigation badges; keep direct task/reference links and no related widget. Do not expand its topics to every option. |
| 04 layouts | Layout/snippet/metadata lookup. Show existing content badge; retain its detailed index and exact task links, with no related widget. |
| 05 FAQ | Question-based routing across unrelated tasks. Keep unchanged, without tags/cards that imply a single topic. Existing tutorial, task and reference links remain authoritative. |
| 06 accessibility | Practical checks on the reader's own site. Add docs/accessibility badges and one card to the behavior reference. |
| 48 accessibility reference | Expected behavior, limits and development-version boundaries. Add docs/accessibility badges and one card to the practical guide; no compliance or offline promise. |
| 99 highlighting | Style identifiers and rendered specimens. Add docs/appearance/code-highlighting badges and cards connecting appearance lookup and editing. Preserve the selector and its scripts. |
| 99 Markdown | Formatting syntax and output lookup. Add docs/content/writing badges and cards; preserve specimens, parser caveats and article/TOC task links. |
| 99 variables | Selected Sass variables, value types and constraints. Add docs/appearance/colors/fonts badges and cards; preserve precedence, types and exact editing links. |

Seven badge groups and five widgets added. The FAQ and both tutorials deliberately
retain direct navigation without badges: 66 of 69 Docs pages now have badges.
This inventory is not a quality score or evidence of human findability. All eight
reviewed bodies, titles, examples, links and version caveats remain unchanged.
No public Diataxis labels, extraction, new option or template/ranking change.

Update the topics index and `llms.txt` coverage summaries to include accessibility
and syntax/variable references while retaining partial coverage and direct routes.
The selective chatbot summary follows those index facts; the existing byte budget
and configuration advice are unchanged. Existing topic, accessibility and syntax/
configuration evaluation cases remain applicable; no duplicate cases are added.

## Rendered recommendations and affected pages

Actual selections agree at 320 and 1280 CSS pixels. Include all enabled appearance
and content/writing pages whose candidate pool may change:

| Guide | Related documentation |
| --- | --- |
| 02-config | No related widget; retain precise reference/index links. |
| 03-theming | Adapt a Sass skin; How skins and overrides interact; Variables dictionary |
| 04-layouts | No related widget; retain precise reference/index links. |
| 06-accessibility-performance | Accessibility and resource-loading reference |
| 15-create-post | Create a page and link it from the menu; Add a Mermaid diagram; Markdown cheatsheet |
| 16-create-page | Create and publish a post; Add a Mermaid diagram; Markdown cheatsheet |
| 17-add-image | Add a photo gallery; Add a caption below an image; Enable PhotoSwipe on a gallery |
| 22-choose-skin | Theming Chulapa; Adapt a Sass skin; How skins and overrides interact |
| 23-change-color | Theming Chulapa; Variables dictionary; Enable Autothemer |
| 24-change-fonts | Theming Chulapa; Variables dictionary; Use the Chulapa font |
| 25-code-highlighting | Theming Chulapa; Syntax highlighting reference; Adapt a Sass skin |
| 26-appearance-precedence | Theming Chulapa; Choose a skin; Variables dictionary |
| 27-autothemer | Theming Chulapa; Variables dictionary; How skins and overrides interact |
| 28-custom-skin | Theming Chulapa; Choose a skin; Variables dictionary |
| 29-add-gallery | Add a manual slideshow; Enable PhotoSwipe on a gallery; Add an image to a post or page |
| 30-add-carousel | Add a photo gallery; Enable PhotoSwipe on a gallery; Add an image to a post or page |
| 31-photoswipe | Add a photo gallery; Add a manual slideshow; Add an image to a post or page |
| 32-embed-video | Add an image to a post or page; Add a caption below an image; Enable PhotoSwipe on a gallery |
| 33-add-diagram | Create and publish a post; Markdown cheatsheet; Display an article date in another language |
| 48-accessibility-reference | Accessibility and performance |
| 49-add-alert | Create and publish a post; Markdown cheatsheet; Display an article date in another language |
| 50-add-caption | Add an image to a post or page; Enable PhotoSwipe on a gallery; Add a manual slideshow |
| 51-add-footnote | Create and publish a post; Markdown cheatsheet; Display an article date in another language |
| 53-chulapa-font | Theming Chulapa; Variables dictionary; Adapt a Sass skin |
| 58-content-toc | Create and publish a post; Markdown cheatsheet; Display an article date in another language |
| 61-localize-date | Create and publish a post; Markdown cheatsheet; Add a table of contents inside an article |
| markdown-cheatsheet | Create and publish a post; Display an article date in another language; Add a table of contents inside an article |
| syntax-highlighting | Theming Chulapa; Adapt a Sass skin; Change code highlighting |
| variable-dictionary | Theming Chulapa; Change a color; Use the Chulapa font |

## Verification

- Jekyll documentation build passed; chatbot `npm test`: 40 passed.
- 29 pages at 320/1280 (58 checks): no horizontal document overflow; Docs-only
  non-self cards, at most three and without dates; 02/04 have no cards and the
  accessibility pair has one each. Mobile/desktop screenshots inspected.
- 39 distinct card/topic destinations and fragments resolve in generated HTML.
- Related card and accessibility badge focus and Enter activation checked;
  Docs/blog topic lists remain separate. The eight bodies and historical audit
  suffix are unchanged. UTF-8 and existing 47,000-byte context budget checked.
- Correct five mojibake apostrophes in the prior extension delivery table;
  recommendation facts and its historical verification record remain intact.

The accessibility review covers card reflow and native link activation, not WCAG
certification or all site controls. No changed page title, canonical route,
indexing control or social description; topic metadata and internal navigation
expand as intended. No manifest/service worker changes. The theme has no built-in
service worker; the favicon manifest alone establishes neither installability
nor offline support. No live provider requests, chatbot inference or manual
Worker deployment, and no human usability or chatbot accuracy claim.

## Editorial closeout and next steps

All agreed editorial groups now have explicit dispositions. Final closeout is
subject to this PR's review/CI/merge. Preserve historical evaluations; optional
human interviews do not block the editorial decision. Freeze this editorial
scope unless a concrete defect is found. Next: separate rendering fix for #154,
then adapter/migration work for #125, followed by release checks. Live chatbot
evaluation remains a separately authorized task with quality and latency apart.
