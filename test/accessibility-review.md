# Accessibility and performance review

Reviewed October 8, 2026, against the working tree following `a1ea9977a`.
The changes and tests are local development work, not a released gem.

## Scope and method

Six skins: `chulapa`, `navi`, `journal`, `gitdev`, `lux` and `flatly`.
Four representative fixtures: default article with lateral TOC, landing page
with inline TOC, custom minimal page and collection card index. Each is checked
at 320, 390 and 1280 px widths: 72 browser audits in Microsoft Edge
154.0.4258.62, using axe-core and rendered CSS.

Browser checks exercise Enter, Space, Escape, skip navigation, heading
permalinks, sidebar open/close and Tab traversal, reduced motion, the dual
navbar breakpoint and navigation with JavaScript disabled. Generated HTML
checks verify font URLs and Cactus resources. Screenshots were inspected for
mobile navigation and TOC, desktop cards, a mobile landing page and a desktop
minimal page.

The reference criteria include [keyboard operation](https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html),
[visible focus](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html),
[contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
and [bypassing repeated blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks.html).
The automated runner selects WCAG A/AA rules through WCAG 2.1; it does not
establish complete WCAG 2.2 conformance.

## Findings addressed

| Finding | Evidence and change |
| --- | --- |
| Floating navigation unavailable to keyboard users | The trigger was a label for a `display: none` checkbox. It is now a named button with expanded state, Enter/Space activation and Escape closing. Closed menu links are inert and visually hidden. A static menu is available without JavaScript. |
| Invisible focused permalinks | Heading links had zero opacity except on hover. They are now revealed on focus. Keyboard controls also receive a visible outline. |
| No way to bypass the navbar | Minimal-derived pages now have a first-stop skip link and a target before their content. Custom minimal content does not require a new wrapper. |
| Unnamed card image links | Background-image anchors had no text or accessible name. They now use the project/article title. |
| Low text link contrast | Against white, original Chulapa links measured 1.56:1, Navi 3.83:1, Journal 3.13:1 and Flatly 2.41:1. Their text link colors were darkened without changing the accent palette. Journal footer links were also darkened. |
| Prose links distinguished only by color | Gitdev and Lux fixtures failed axe's link-in-text rule. Prose paragraph and list links are now underlined, with navigation links excluded. |
| Low card subtitle contrast and heading structure | Subtitles measured 3.89:1 in Chulapa, 4.47:1 in Journal, 2.86:1 in Lux and 2.55:1 in Flatly. They now use body text color and paragraph semantics with heading-size styling. Card titles are level-two headings with their previous visual size. |
| Unconditional motion | Theme navigation and icon transitions now respect `prefers-reduced-motion`. |
| External request for a bundled font | Both font preload and CSS now use the installed theme asset with `baseurl`, removing the jsDelivr dependency for this font. |
| Cactus loaded on pages without comments | Its script and stylesheet are now omitted when `show_comments` is false: two external requests removed from those pages. |

## Results and limits

The 72 fixture audits report no violations for the selected automated WCAG
rules. Layout checks find no page-level horizontal overflow at the tested
widths. Keyboard, reduced-motion, dual-resize and no-JavaScript checks pass.
The lateral TOC retains its existing open/close and Tab behavior, without a
focus trap or modal conversion.

Existing header, Font Awesome kit, HTML compression, head metadata and social
metadata regression checks also pass. The four starter examples build at root
and subdirectory URLs, and the complete documentation build passes. All 17
local chatbot tests pass with the updated guidance. The new context has not
been deployed or evaluated live in this task.

The broader best-practice scan identifies repeated unnamed navigation landmarks
when both the lateral TOC and footer navigation are present. This is recorded
for a future semantics-only review; the sidebar interaction was deliberately
preserved. Axe also marks some contrast checks incomplete. Background imagery,
custom content and integrations need manual checks beyond these fixtures.

Resource changes are established from generated HTML and asset URLs, not from
production timing measurements. They remove a font CDN dependency and avoid
Cactus requests on disabled pages. They do not establish a PageSpeed score,
faster Core Web Vitals or the performance of third-party services. Google
Fonts, Font Awesome and Bootstrap dependencies remain external.

One performance finding remains for a separate Sass change: Journal, Lux and
Flatly import Bootstrap within their skin files, then `assets/css/main.scss`
imports it again. In these expanded-CSS fixtures, gzipped main stylesheets
measure approximately 65–70 KB for those skins versus 38 KB for Navi/Gitdev.
This is evidence of duplicate framework CSS, not a forecast of production
timing gains. Removing the first import needs checks of each skin's variable
dependencies and configuration overrides before changing the compilation order.

This review does not cover every skin, all search/comment providers, carousel
operation, screen readers on physical devices or every custom widget. Those
remain candidates for focused follow-up reviews. This is not WCAG certification.

## Reproduction

See [test/README.md](README.md#accessibility-browser-checks) for fixture build
and browser commands. The runner writes `accessibility-results.json` outside
the repository, including automated violations and incomplete checks.
