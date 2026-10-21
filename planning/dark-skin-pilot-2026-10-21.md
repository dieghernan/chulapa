# Dark companion pilot — 2026-10-21

## Scope and selection

A three-family feasibility study from main `4efd1e3e9`, not an expansion of the
published skin catalog. The selected light sources are Chulapa (own), Litera
(Bootswatch) and Minco (TopHat). There are no named dark companions for these
sources in the current catalog. The test manifest records the reviewed choices;
it does not claim to discover all visually related skins automatically.

Existing families are excluded, including differently named counterparts:

| Light | Existing dark choices | Evidence |
| --- | --- | --- |
| GitDev | GitDev Dark | [Catalog](../docs/collections/_skins/gitdev-dark.md) |
| Butterfly | Butterfly Dim, Butterfly Dark | [Catalog](../docs/collections/_skins/butterfly-dark.md) |
| Twitter | Twitter Dim, Twitter Lights Out | [Catalog](../docs/collections/_skins/twitter-lights-out.md) |
| Flatly | Darkly | [“Flatly in night mode”](../docs/collections/_skins/darkly.md) |

## Implementation and review

The generator creates standalone experimental Sass stylesheets under
`test/fixtures/dark-skin-pilot/`. Each imports its original skin and the theme
once. Original fonts, primary fills and card radii remain unchanged. Surface,
link, outline and control-label treatment is derived rather than maintained as
three copied skins. Labels choose black or white at a 4.5:1 text contrast target;
outline labels are lifted against the dark body; alerts use dark tinted fills.
Button hover/active backgrounds use shared Bootstrap-style darkening. These
experimental state choices are intentional differences, subject to review.

The original preview generator's font pipeline is shared through a callable
helper. It retains pinned sources, fonts, offline HTML embedding and CLI behavior.
Original source imports retain the theme integrations and vendor licensing.

Light is on the left and experimental dark on the right in every comparison:

| Source | Narrow panes (390px each) | Wider panes (640px each) |
| --- | --- | --- |
| Chulapa | [Comparison](dark-skin-pilot-2026-10-21/chulapa-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/chulapa-comparison-640.png) |
| Litera | [Comparison](dark-skin-pilot-2026-10-21/litera-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/litera-comparison-640.png) |
| Minco | [Comparison](dark-skin-pilot-2026-10-21/minco-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/minco-comparison-640.png) |

Regeneration produces standalone interactive HTML, full-page individual captures
at 390/1280px, comparison sheets and a detailed `report.json`. See
[test instructions](../test/README.md#experimental-dark-companions-three-skin-pilot).
Full embedded-font HTML and detailed state measurements are generated locally,
not committed; the compact [summary](dark-skin-pilot-2026-10-21/summary.json)
records this run's results without duplicating those large artifacts.

## Boundaries and next decision

This is a component study: navbar, text, links, eight filled and outline button
variants, an info alert, input, table, card and footer. It is not a full-site
accessibility audit. Contrast measurements use computed foreground/background
colors after transitions; they do not certify focus indicators, border contrast,
images, gradients, disabled controls or every possible component combination.
The original light palettes are recorded without changing their existing issues.

Before promotion, review the visual identity of each companion and check real
layouts, dropdowns, collapsed navigation, galleries, code highlighting, all
alert variants, custom palettes and optional Autothemer settings. No catalog
entry, public skin option, automatic light/dark switch or release promise is
added here. These standalone prototype files are not drop-in catalog skins.

Production CSS, YAML configuration, layout behavior, metadata, URLs, manifest
and service-worker behavior are unchanged. The study pages are local artifacts;
no deployment or live PWA test is involved. Public documentation, `llms.txt` and
the chatbot context need no update for an unshipped experiment. No chatbot tests
or answer-quality claims are part of this pilot.

## Validation completed

- Generated Sass and regenerated with `--check`, including browser measurements;
  the fast `--sass-only --check` also passes without drift.
- All three standalone prototypes compile with Dart Sass 1.100.0 and Ruby Sass
  3.7.4. These are stylesheet compilations, not complete Jekyll builds.
- Chromium 151: 77 sampled text/state measurements per mode, 231 across the
  three dark companions; none below 4.5:1. Light-source exceptions are recorded
  in the summary, not corrected by this study.
- Sequential Tab traversal reaches all sample links, buttons and the input in
  document order in all six documents. This is a keyboard smoke check, not a
  full focus-visibility or assistive-technology audit.
- No horizontal overflow at 390/1280px in any sample; loaded font faces have no
  errors. Primary fill, body/heading font families and card radius match each
  original. Comparison screenshots (390/640px panes) and the three individual 1280px
  dark captures were visually inspected; 390px individual captures are also generated.
- Existing preview `prepareCSS()` output is byte-for-byte unchanged versus main
  for all three source skins after extracting the shared font helper.
- JavaScript syntax checks and `git diff --check` pass. Gem file selection
  excludes the experimental fixtures, tooling and planning artifacts.

The result supports further visual review of this approach, not automatic
conversion of every light skin or a claim that these companions are release-ready.
