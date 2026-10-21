# Dark companion pilot — 2026-10-21

The initial three-skin study below is retained as history. The follow-up section
records the later batches and stricter artifact verification; the generated
summary and comparison directory now cover all thirteen skins.

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
[test instructions](../test/README.md#experimental-dark-companion-batches).
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

## Initial validation completed

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

## Second batch and review follow-up — 2026-10-21

The second batch adds **Academia, Pear, Lux, Minty and Sketchy**. The catalog has
no declared dark companions for these sources. Together they exercise own skins,
a green accent, monochrome contrast, pastel colors and hand-drawn shapes. The
original exclusion list remains unchanged. These five are additional studies,
not catalog entries or production options.

| Source | Narrow panes (390px each) | Wider panes (640px each) |
| --- | --- | --- |
| Academia | [Comparison](dark-skin-pilot-2026-10-21/academia-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/academia-comparison-640.png) |
| Pear | [Comparison](dark-skin-pilot-2026-10-21/pear-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/pear-comparison-640.png) |
| Lux | [Comparison](dark-skin-pilot-2026-10-21/lux-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/lux-comparison-640.png) |
| Minty | [Comparison](dark-skin-pilot-2026-10-21/minty-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/minty-comparison-640.png) |
| Sketchy | [Comparison](dark-skin-pilot-2026-10-21/sketchy-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/sketchy-comparison-640.png) |

The PR review correctly identified that checking Sass alone could accept stale
committed screenshots and summary data. A shared publication function now
derives every committed PNG and `summary.json` from the current render run.
Normal generation writes them; full `--check` compares them byte-for-byte and
rejects missing or unexpected artifacts. The fast `--sass-only --check` remains
explicitly limited to Sass. A focused negative regression rejects screenshot,
summary and measurement drift without changing Sass.

Heading, card-header and table-cell text are now included in the contrast sample; shared
dark heading colors and outline specificity accommodate the additional skins.
The original light rendering remains untouched. Existing reviewed solid-button
fills are retained (Pear demonstrates that a visible fill can differ from the
underlying palette token); all eight effective fills are compared between modes.
Sketchy assigns a white navbar surface unconditionally, so the shared dark
surface is made authoritative after importing the original source. Its original
white table cells also need shared dark cell surfaces; the visual review caught
this independently of the earlier measurements. Measurements now wait for actual
CSS transitions to finish, and captures disable animations for reproducibility.
Screenshot comparisons require
the recorded browser/font environment; a different browser or system-font stack
requires reviewed regeneration rather than silently accepting drift.

Netlify's preview on the initial commit failed because the account quota was
exhausted, as confirmed by the maintainer. No retry or manual deployment is part
of this task; a local check cannot establish a successful hosted preview.

### Follow-up validation

- All eight generated stylesheets compile with Dart Sass 1.100.0 and Ruby Sass
  3.7.4. These are stylesheet checks, not complete Jekyll builds.
- Chromium 151: 82 text/state measurements per dark companion, 656 total; none
  below 4.5:1. The five new minimums are Academia 4.53, Pear 4.53, Lux 4.57,
  Minty 4.77 and Sketchy 4.52. Original light issues remain recorded unchanged.
- All 23 Tab stops are reached in order in each of the 16 documents. No
  horizontal overflow at 390/1280px. Original body/heading font families, card
  radius and all eight effective solid-button fills match between modes.
- Inspected the five new 390/640px comparison pairs and 1280px dark captures;
  the final Sketchy comparison confirms the formerly white table cells are dark
  and readable. Captures finish finite animations to avoid timing noise.
- Original preview CSS is byte-for-byte unchanged against main `4efd1e3e9` for
  all eight light sources. The fast Sass drift check and artifact negative
  regression pass; the negative regression is wired into the JavaScript CI job.
- The generator rejects rendering into the committed artifact directory. Workflow
  YAML parses, JavaScript syntax and diff whitespace checks pass, and the gem's
  file selection excludes the pilot tooling, fixtures and review artifacts.
- Full browser `--check` passes from a separate temporary output directory:
  all eight Sass files, all 16 comparison PNGs and the generated summary match
  their committed counterparts; no artifact drift is accepted.

No public documentation or chatbot context facts change: the expanded studies
remain outside the public catalog and configuration. Context deployment and live
chatbot evaluation are unrelated to this experiment and were not performed.

## Third batch — 2026-10-21

This batch adds **Journal, Pulse, United, Yeti and Hootstrap**, all light sources
without a declared dark companion in the catalog. It covers four further
Bootswatch designs and a second TopHat integration. Existing light/dark families
and previously generated companions remain excluded from selection. The public
catalog and all original source skins are unchanged.

| Source | Narrow panes (390px each) | Wider panes (640px each) |
| --- | --- | --- |
| Journal | [Comparison](dark-skin-pilot-2026-10-21/journal-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/journal-comparison-640.png) |
| Pulse | [Comparison](dark-skin-pilot-2026-10-21/pulse-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/pulse-comparison-640.png) |
| United | [Comparison](dark-skin-pilot-2026-10-21/united-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/united-comparison-640.png) |
| Yeti | [Comparison](dark-skin-pilot-2026-10-21/yeti-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/yeti-comparison-640.png) |
| Hootstrap | [Comparison](dark-skin-pilot-2026-10-21/hootstrap-comparison-390.png) | [Comparison](dark-skin-pilot-2026-10-21/hootstrap-comparison-640.png) |

Yeti forces alert fills, labels and links with `!important` in its original
integration. The shared experimental alert rules now use sufficient specificity
and priority to keep the chosen dark alert treatment authoritative. This change
applies only inside generated prototypes; it does not patch vendor sources or
the public skin. Journal also assigns black footer text unconditionally; the
shared dark footer text is reasserted after the source import, just as the
navbar surface already is. The preliminary check covers all effective button fills and
text states, followed by full browser checks and visual review.

The PR discussion was checked again: the existing artifact-check thread is
resolved, and the review of `f9259295b` reported no new findings. No new unresolved
code comment was visible when this batch started. The Netlify quota limitation
remains unchanged; no manual deploy or retry is part of the work.

### Third-batch validation

- All thirteen prototypes compile with Dart Sass 1.100.0 and Ruby Sass 3.7.4;
  these remain stylesheet compilations, not full Jekyll builds.
- All thirteen dark samples pass 82 text/state measurements each (1,066 total).
  New minimums: Journal 4.59, Pulse 4.75, United 4.57, Yeti 4.57, Hootstrap 4.56.
- Each of 26 light/dark documents reaches all 23 Tab stops in order and has no
  horizontal overflow at 390/1280px. All eight effective button fills, font
  families and card radius match their light originals.
- Visually inspected all five new 390/640px light/dark comparison pairs and
  individual 1280px dark captures. Journal's footer and Yeti's alert now retain
  readable text on their dark surfaces.
- Original preview CSS remains byte-for-byte unchanged against main `4efd1e3e9`
  for all thirteen light sources. Fast Sass drift checks and artifact negative
  regression pass. JavaScript syntax and diff whitespace checks pass; the
  experiment remains excluded from the gem's packaged files.
- Full `--check` passes from a separate temporary directory: all thirteen Sass
  files, 26 comparison PNGs and the generated summary match byte-for-byte.

The earlier component-study limitations still apply. No public skin catalog,
configuration, `llms.txt`, chatbot context, SEO or PWA behavior is changed. No
chatbot tests, live evaluation, context deployment or manual site deployment is
part of this batch.
