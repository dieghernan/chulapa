# Skin palette contrast review

## Identity-preserving compromise

The original 42 skins, the three Bootswatch additions and the auto defaults preserve their original global primary palette values exactly; reviewed solid-button fills can differ as documented below. Strong darkening of secondary/warning/info colors is reverted as well: Minty retains its pastel green and pink, Focal its salmon, Hootstrap its yellow, and Sketchy/Materia/Yeti their original warning colors. Palette changes are limited to small adjustments and existing YIQ thresholds. Linked badge states also select text for their actual darkened background. The shared YIQ function is unchanged.

29 of 46 palettes now meet WCAG AA 4.5:1 on all eight base semantic pairs, compared with five originally. 30 base pairs remain below 4.5:1 across 17 palettes (including auto and the three original Bootswatch additions), and are explicitly retained for identity. This is not an all-palette accessibility certification.

The original primary values are pinned in `test/skin-contrast-identity.json`. No new YAML settings, color-selection helpers or automatic fallback logic. The none skin still leaves palette assignments unset for autothemer. Custom primary values and overrides need their own review.

## Local button follow-up (not published)

The base-palette table below still describes the unchanged automatic YIQ result;
it is not the result of the explicit button-label styling. No global palette or YIQ threshold is changed in this follow-up.
Thirty approved button-specific fills now cover Navi, all three Butterfly
variants, Hootstrap Primary and the remaining failing solid buttons in original
dieghernan skins. Listen retains dark labels; Chulapa Success uses lighter
interaction fills to retain its original dark label and pastel resting fill. Filled buttons recover 93 original
light labels across 33 skins, including Navi Primary/Success and Minty’s pastel
variants. Hover, keyboard focus, active, disabled, class-based focus/active and
open dropdowns retain those labels. Accepted filled-button contrast limitations
remain explicit; restoring the original appearance does not establish WCAG AA.

For 139 outline variants across 38 skins, only the resting/focus label and border
are adjusted to meet 4.5:1 against the current skin background. Filled hover/active
backgrounds and their existing labels are preserved. Light/Dark outline variants
are excluded because they are intended for alternate backgrounds. Custom colors
and placement on other backgrounds still need review. Corrections use explicit
skin colors and a small CSS partial, without a new contrast algorithm or YAML.
Lux Secondary also retains a readable label on its existing gray interaction fill;
Materia Secondary no longer forces pale outline labels through `!important`.

### Button changes by skin

| Skin | Original light labels restored | Outlines adjusted |
|---|---|---|
| academia | success, info | success, info, warning |
| auto | info | primary, secondary, success, info, warning |
| butterfly-dark | primary, danger | — |
| butterfly-dim | primary, success, danger | — |
| butterfly | secondary, danger | primary, secondary, info, warning, danger |
| chulapa | — | primary, success, warning |
| cyborg | primary, success, warning, dark | secondary, info, danger |
| darkly | success, info, warning, danger | primary, secondary, danger |
| deeply | primary, danger | secondary, success |
| electro | warning, danger | secondary, info, warning, danger |
| flatly | secondary, success, info, warning, dark | secondary, success, info, warning |
| focal | success, info, warning | primary, success, info, warning |
| gitdev-dark | — | primary |
| gitdev | — | — |
| graymor | info, warning | info, warning |
| hootstrap | — | primary, secondary, success, info, warning |
| journal | primary, success, danger | primary, secondary, success, warning, danger |
| listen | — | secondary, danger |
| lux | success, info, warning, danger | secondary, success, info, warning, danger |
| lymcha | — | secondary, success, info, warning, danger |
| materia | primary, success | primary, secondary, success, warning |
| media | — | warning |
| mickie | primary, danger | primary, secondary, warning, danger |
| minco | warning, danger | secondary, info, warning, danger |
| minty | primary, secondary, success, info, warning, danger | primary, secondary, success, info, warning, danger |
| monotone | — | — |
| navi | primary, success | primary, success, warning |
| none | success, info | primary, success, info, warning |
| pear | primary, success, info | primary, success, info, warning, danger |
| preptor | info, danger | secondary, success, info, warning, danger |
| skeeblu | primary, success | primary, secondary, success, info, warning, danger |
| sketchy | success, info, warning | success, info, warning |
| slate | success, info, warning, danger | primary, secondary |
| solar | primary, secondary, success, info | info, warning, danger |
| sunset | — | secondary, info, warning |
| towards | success | success, info, warning |
| twitter-dim | primary, secondary, success, warning | info, danger |
| twitter-lights-out | primary, success, warning | — |
| twitter | primary, success, warning | primary, success, warning |
| united | primary, secondary, success, info, warning | primary, secondary, success, info, warning |
| universal | — | primary, success, info, warning |
| wandoo | primary | primary, secondary, warning |
| yeti | success, info, warning | primary, secondary, success, info, warning |

## Approved AA fills for solid buttons (local)

The approved AA proposal is applied to all ten proposed Navi/Butterfly buttons.
Hootstrap Primary follows with a minimal adjustment from `#528078` to `#517e77`
(white-text contrast 4.45 → 4.56:1). This affects solid buttons and their states;
original global primary colors, links, badges, cards and outline fills are retained.
All eight normal solid-button variants in these five palettes now reach 4.5:1.
Additional original dieghernan skins are covered by the next follow-up; external/default exceptions remain documented. Unreleased; no deployment.

| Skin | Button | Approved fill | White-text contrast, normal |
|---|---|---|---|
| navi | primary | `#3e6ee7` | 4.58:1 |
| navi | success | `#00883b` | 4.58:1 |
| butterfly | primary | `#0e75da` | 4.59:1 |
| butterfly | secondary | `#75757c` | 4.57:1 |
| butterfly | danger | `#d34044` | 4.58:1 |
| butterfly-dark | primary | `#0e74e2` | 4.55:1 |
| butterfly-dark | danger | `#d34044` | 4.58:1 |
| butterfly-dim | primary | `#1b75d7` | 4.59:1 |
| butterfly-dim | success | `#008900` | 4.59:1 |
| butterfly-dim | danger | `#d34044` | 4.58:1 |
| hootstrap | primary | `#517e77` | 4.56:1 |

## Original dieghernan skins: complete solid-button coverage (local)

Scope follows `skin_author: dieghernan` in the skin catalog: 16 original skins.
Universal is an adaptation of Bootstrapious and is excluded from this additional
permission. Existing earlier approved changes to external skins remain intact.
All eight solid-button variants are checked at normal, hover, keyboard focus and
active states on both 390px and 1280px viewports (1,024 authored-state checks).
This covers button text, not whole-skin or whole-page WCAG conformance.

Nineteen additional fills across seven skins are adjusted to at least 4.55:1 with
white labels. Listen Primary/Success/Info retain their bright backgrounds and
use dark labels consistently, including interaction states. Chulapa Success keeps
its pastel resting fill and dark text; hover/focus/active fills become lighter,
so the dark text remains readable. Neither change alters shared YIQ behavior.
Global palette accents, body/navigation links, badges and cards remain unchanged.

| Skin | Button | Previous fill | AA fill | White-text contrast |
|---|---|---|---|---|
| academia | success | `#28a745` | `#208738` | 4.58:1 |
| academia | info | `#20a6bb` | `#198192` | 4.57:1 |
| focal | success | `#26a65b` | `#1f864a` | 4.60:1 |
| focal | info | `#00acc1` | `#008292` | 4.56:1 |
| focal | warning | `#f9690e` | `#c4530b` | 4.58:1 |
| pear | primary | `#1abc9c` | `#12856f` | 4.56:1 |
| pear | success | `#28a745` | `#208738` | 4.58:1 |
| pear | info | `#20a6bb` | `#198192` | 4.57:1 |
| towards | success | `#00d084` | `#008756` | 4.57:1 |
| twitter-dim | secondary | `#788995` | `#697883` | 4.55:1 |
| twitter-dim | primary | `#1d9bf0` | `#177bbe` | 4.55:1 |
| twitter-dim | success | `#00ba7c` | `#00875a` | 4.55:1 |
| twitter-dim | warning | `#ff7a00` | `#bc5a00` | 4.56:1 |
| twitter-lights-out | primary | `#1d9bf0` | `#177bbe` | 4.55:1 |
| twitter-lights-out | success | `#00ba7c` | `#00875a` | 4.55:1 |
| twitter-lights-out | warning | `#ff7a00` | `#bc5a00` | 4.56:1 |
| twitter | primary | `#1d9bf0` | `#177bbe` | 4.55:1 |
| twitter | success | `#00ba7c` | `#00875a` | 4.55:1 |
| twitter | warning | `#ff7a00` | `#bc5a00` | 4.56:1 |

Remaining solid-button exceptions belong to other authors or the `auto`/`none` defaults.
The selective chatbot context still needs no change: configuration and its
identity/custom-color review caveats remain accurate; the public guide contains
the narrower button-specific behavior. No new guide page or llms.txt link.

## Original Bootswatch additions (local, 2.2.0 unreleased)

Cerulean, Litera and Pulse preserve Bootswatch v4.6.2 source palettes, typography
and component rules from commit `57980884525efb94836d88a5f59d5db9c5e8bbf0`.
Their unmodified Sass and MIT license are retained in `_sass/vendor/bootswatch`.
Entrypoints defer original component rules until after the theme's single
Bootstrap import; Cerulean's original global helper declarations remain at top
level. Custom `vars` still apply. No AA recoloring is applied to these three.

The dedicated browser check compares 2,160 original component/state/viewport
combinations against a reference compiled directly from the upstream source,
with autothemer both off and on, including paragraph typography, headings, buttons, alerts, badges, forms,
progress bars and navigation. Source hashes and exact wrapper contents are
verified. These are fidelity checks, not WCAG passes. Cerulean's gradients are
preserved as CSS images; base ratios below do not assess every gradient pixel.

| Added skin | Failing normal solid buttons | Recorded ratio floors |
|---|---|---|
| cerulean | primary, success, warning | primary 2.76:1, success 2.84:1, warning 3.88:1 |
| litera | primary, secondary, success, info, warning, danger | primary 3.71:1, secondary 2.07:1, success 2.58:1, info 3.04:1, warning 1.94:1, danger 3.96:1 |
| pulse | success, info, warning, danger | success 2.59:1, info 3.09:1, warning 2.11:1, danger 3.63:1 |

Catalog pages, standalone preview stylesheets and PNG/WebP images are included.
The existing color guide and catalog document unreleased availability and
original contrast limitations. Chatbot catalog/context and one evaluation case
are updated in this change; no deployment. llms.txt already links the catalog and guide,
so no additional guide entry is required. No navigation behavior, URLs of existing
pages, metadata machinery, manifest or service-worker behavior is changed.
Full Jekyll 3/4 builds cannot run locally without Ruby; CI keeps its build matrix.

## Updated summary

| Skin | Passing base pairs, before → after | Minimum after | Remaining limitations | Small palette changes | YIQ threshold, before → after |
|---|---|---|---|---|---|
| academia | 6/8 → 8/8 | 4.53:1 | None on base palette | info | 150 → 117 |
| auto | 4/8 → 4/8 | 3.24:1 | primary (3.72:1), secondary (4.41:1), success (3.24:1), info (3.98:1) | None | 150 → 117 |
| butterfly-dark | 5/8 → 7/8 | 4.19:1 | primary (4.19:1) | success, danger | 150 → 110 |
| butterfly-dim | 5/8 → 8/8 | 4.54:1 | None on base palette | danger | 150 → 96 |
| butterfly | 4/8 → 7/8 | 3.78:1 | primary (3.78:1) | success, danger | 150 → 117 |
| chulapa | 7/8 → 8/8 | 4.56:1 | None on base palette | danger | 150 → 117 |
| cyborg | 4/8 → 8/8 | 5.16:1 | None on base palette | None | 175 → 130 |
| darkly | 4/8 → 7/8 | 4.16:1 | danger (4.16:1) | success | 175 → 120 |
| deeply | 5/8 → 8/8 | 4.57:1 | None on base palette | info, danger | 150 → 127 |
| electro | 6/8 → 8/8 | 7.11:1 | None on base palette | None | 150 → 140 |
| flatly | 2/8 → 7/8 | 4.30:1 | dark (4.30:1) | info, danger | 175 → 130 |
| focal | 4/8 → 8/8 | 4.56:1 | None on base palette | danger | 150 → 119 |
| gitdev-dark | 8/8 → 8/8 | 6.61:1 | None on base palette | None | 150 → 139 |
| gitdev | 8/8 → 8/8 | 4.69:1 | None on base palette | None | 150 → 150 |
| graymor | 5/8 → 8/8 | 4.56:1 | None on base palette | secondary, info | 150 → 130 |
| hootstrap | 7/8 → 7/8 | 4.45:1 | primary (4.45:1) | None | 150 → 150 |
| journal | 5/8 → 8/8 | 5.07:1 | None on base palette | None | 150 → 123 |
| listen | 6/8 → 8/8 | 4.57:1 | None on base palette | secondary, danger | 130 → 130 |
| lux | 4/8 → 8/8 | 4.65:1 | None on base palette | info, danger | 185 → 128 |
| lymcha | 8/8 → 8/8 | 5.61:1 | None on base palette | None | 150 → 116 |
| materia | 5/8 → 8/8 | 4.64:1 | None on base palette | None | 170 → 125 |
| media | 7/8 → 8/8 | 4.53:1 | None on base palette | danger | 150 → 150 |
| mickie | 5/8 → 8/8 | 4.58:1 | None on base palette | info, danger | 150 → 128 |
| minco | 6/8 → 8/8 | 4.55:1 | None on base palette | warning, danger | 150 → 128 |
| minty | 2/8 → 8/8 | 5.92:1 | None on base palette | None | 220 → 150 |
| monotone | 8/8 → 8/8 | 5.74:1 | None on base palette | None | 150 → 150 |
| navi | 6/8 → 7/8 | 4.03:1 | primary (4.03:1) | None | 150 → 105 |
| none | 5/8 → 7/8 | 3.98:1 | primary (3.98:1) | info | 150 → 117 |
| pear | 5/8 → 8/8 | 4.53:1 | None on base palette | secondary, info | 150 → 117 |
| preptor | 6/8 → 8/8 | 4.55:1 | None on base palette | danger | 150 → 128 |
| skeeblu | 5/8 → 8/8 | 4.55:1 | None on base palette | danger | 150 → 130 |
| sketchy | 5/8 → 8/8 | 4.53:1 | None on base palette | info | 200 → 117 |
| slate | 3/8 → 8/8 | 4.56:1 | None on base palette | secondary, danger | 170 → 140 |
| solar | 4/8 → 7/8 | 4.08:1 | info (4.08:1) | None | 150 → 116 |
| sunset | 7/8 → 8/8 | 4.55:1 | None on base palette | danger | 150 → 146 |
| towards | 7/8 → 8/8 | 4.61:1 | None on base palette | None | 150 → 130 |
| twitter-dim | 3/8 → 7/8 | 4.27:1 | secondary (4.27:1) | danger | 150 → 123 |
| twitter-lights-out | 3/8 → 8/8 | 4.55:1 | None on base palette | secondary, danger | 150 → 123 |
| twitter | 3/8 → 8/8 | 4.55:1 | None on base palette | secondary, danger | 150 → 123 |
| united | 2/8 → 7/8 | 4.23:1 | primary (4.23:1) | info, danger | 200 → 122 |
| universal | 6/8 → 6/8 | 3.04:1 | primary (3.99:1), info (3.04:1) | None | 150 → 150 |
| wandoo | 6/8 → 7/8 | 4.25:1 | primary (4.25:1) | info | 150 → 113 |
| yeti | 3/8 → 7/8 | 3.85:1 | primary (3.85:1) | danger | 200 → 130 |
| cerulean | 5/8 → 5/8 | 2.77:1 | primary (2.77:1), success (2.84:1), warning (3.88:1) | None; original Bootswatch | 150 → 150 |
| litera | 2/8 → 2/8 | 1.95:1 | primary (3.71:1), secondary (2.07:1), success (2.59:1), info (3.04:1), warning (1.95:1), danger (3.96:1) | None; original Bootswatch | 190 → 190 |
| pulse | 5/8 → 5/8 | 2.59:1 | success (2.59:1), info (3.09:1), danger (3.63:1) | None; original Bootswatch | 150 → 150 |

## Remaining palette adjustments

Hex values are rounded; Sass preserves fractional channels in generated colors. All primary values are unchanged.

| Skin | Color | Before | After |
|---|---|---|---|
| academia | info | `#17a2b8` | `#20a6bb` |
| butterfly-dark | success | `#00a400` | `#008900` |
| butterfly-dark | danger | `#fa383e` | `#fa4c51` |
| butterfly-dim | danger | `#fa383e` | `#fa4c51` |
| butterfly | success | `#00a400` | `#008900` |
| butterfly | danger | `#fa383e` | `#fa4c51` |
| chulapa | danger | `#f13c20` | `#dc371d` |
| darkly | success | `#00bc8c` | `#04bd8e` |
| deeply | info | `#0f81c7` | `#0e7bbe` |
| deeply | danger | `#ff304f` | `#ff4661` |
| flatly | info | `#3498db` | `#3598db` |
| flatly | danger | `#e74c3c` | `#d04536` |
| focal | danger | `#ff0000` | `#ed0000` |
| graymor | secondary | `#6f7f8c` | `#687884` |
| graymor | info | `#5c8f94` | `#639498` |
| listen | secondary | `#7c7c7c` | `#757575` |
| listen | danger | `#ed2c3f` | `#e12a3c` |
| lux | info | `#1f9bcf` | `#279ed1` |
| lux | danger | `#d9534f` | `#db5a56` |
| media | danger | `#cc5454` | `#c35050` |
| mickie | info | `#3f81c7` | `#3b78ba` |
| mickie | danger | `#ff444f` | `#ff4953` |
| minco | warning | `#fc3c3c` | `#fc4c4c` |
| minco | danger | `#ff4057` | `#ff475d` |
| none | info | `#17a2b8` | `#20a6bb` |
| pear | secondary | `#6c757d` | `#656e75` |
| pear | info | `#17a2b8` | `#20a6bb` |
| preptor | danger | `#fa4659` | `#fa4a5c` |
| skeeblu | danger | `#e8286b` | `#df2667` |
| sketchy | info | `#17a2b8` | `#20a6bb` |
| slate | secondary | `#7a8288` | `#6f777c` |
| slate | danger | `#ee5f5b` | `#ef6662` |
| sunset | danger | `#f2460d` | `#d83e0c` |
| twitter-dim | danger | `#f91880` | `#e21674` |
| twitter-lights-out | secondary | `#788995` | `#697883` |
| twitter-lights-out | danger | `#f91880` | `#e21674` |
| twitter | secondary | `#788995` | `#697883` |
| twitter | danger | `#f91880` | `#e21674` |
| united | info | `#17a2b8` | `#20a6bb` |
| united | danger | `#df382c` | `#db372b` |
| wandoo | info | `#0f81c7` | `#0e7bbe` |
| yeti | danger | `#f04124` | `#d93b21` |

## PR review: dark link regression

The review correctly identified that darkening Twitter Dim and Butterfly Dim primary colors made page links, navbar accents and footer links less readable. Restoring the original primary colors restores those normal link contrasts (5.50:1 and 4.95:1 respectively). Their hover/focus accents are kept bright rather than darkened by shared dark defaults. Body links on Cyborg and Wandoo are also covered by focused regression checks.

## Semantic foreground and interaction regressions

All five review findings are addressed without changing any primary color:

- Twitter Dim/Butterfly Dim link accents retain the original bright colors, including readable hover/focus states.
- Butterfly Dim restores `success: #00a400`; `.text-success` reaches 5.05:1 and threshold 96 keeps the green background readable with dark text.
- Twitter Dim restores `secondary: #788995`; `.text-secondary` and the resting outline button recover 4.56:1 on `#15202b`.
- Focal restores its original success/info tones and uses threshold 119; success-button hover/focus recover 4.54:1 and active reaches 5.16:1.

A systematic comparison found 32 newly failing semantic-text/button-state pairs in the pre-fix palette revision `9dd17fd`, including repeats between hover and focus. Restore the implicated original tones and choose thresholds that preserve the previously passing states. The independent browser regression now checks all 2,898 originally AA-passing pairs across all 43 palettes at 390px and 1280px (5,796 checks), including semantic foregrounds and normal/hover/focus/active states of filled/outline buttons and linked badges. No originally passing pair in that matrix drops below 4.5:1. The fixture records only previously passing pairs, not a certification of excluded pairs or complete gradients.

The three contrast scripts are wired into the existing browser CI job. Local Chromium checks pass; remote CI status must be checked for the final commit. Netlify previews also fail on earlier unrelated PRs; their logs remain inaccessible from this workspace (proxy 403), so no cause or fix is claimed.

## Linked badge hover/focus contrast

The badge mixin previously darkened a linked badge's background by 10% on hover/focus while choosing text from its unchanged resting background. Select text with the same existing `color-yiq()` function using the actual darkened background instead. No palette values or YIQ algorithm are changed. GitDev Dark, Lymcha and Sunset thresholds are aligned with the newly evaluated backgrounds; Listen retains its established dark labels on three bright badge variants. All previously passing base colors and interaction pairs remain covered. No new configuration option is added.

Academia `.badge-info` reproduces the review failure at 3.29:1 before the fix and reaches 4.69:1 afterward, verified with real pointer hover and Tab focus at 390px and 1280px. The expanded baseline includes linked badges in all 43 palettes and all four CSS states, detecting 102 newly failing linked-badge state pairs before this correction. The full non-regression suite now guards 2,898 previously passing pairs at two viewport sizes (5,796 checks). This does not certify the excluded, previously failing pairs.

## Fixed-text component limitations

The following rendered base pairs remain below 4.5:1. They are recorded as limitations rather than successes; fixed white text on the original bright backgrounds is a frequent cause. The table records rounded-down test floors for the accepted local appearance, not WCAG passes. They do not invalidate the narrower base-YIQ counts above, which measure automatic text selection only.

| Skin | Component | Recorded contrast floor |
|---|---|---|
| auto | `badge badge-info` | 3.97:1 |
| auto | `badge badge-primary` | 3.72:1 |
| auto | `badge badge-secondary` | 4.40:1 |
| auto | `badge badge-success` | 3.24:1 |
| auto | `btn btn-info` | 3.08:1 |
| auto | `btn btn-primary` | 3.72:1 |
| auto | `btn btn-secondary` | 4.40:1 |
| auto | `btn btn-success` | 3.24:1 |
| butterfly-dark | `badge badge-primary` | 4.18:1 |
| butterfly-dark | `card bg-primary` | 3.68:1 |
| butterfly-dim | `card bg-primary` | 3.39:1 |
| butterfly | `badge badge-primary` | 3.77:1 |
| butterfly | `card bg-primary` | 3.77:1 |
| cerulean | `badge badge-primary` | 2.76:1 |
| cerulean | `badge badge-success` | 2.84:1 |
| cerulean | `badge badge-warning` | 3.88:1 |
| cerulean | `btn btn-primary` | 2.76:1 |
| cerulean | `btn btn-success` | 2.84:1 |
| cerulean | `btn btn-warning` | 3.88:1 |
| cyborg | `btn btn-dark` | 2.20:1 |
| cyborg | `btn btn-primary` | 2.98:1 |
| cyborg | `btn btn-success` | 2.55:1 |
| cyborg | `btn btn-warning` | 2.39:1 |
| cyborg | `card bg-primary` | 2.98:1 |
| darkly | `badge badge-danger` | 4.16:1 |
| darkly | `btn btn-danger` | 3.82:1 |
| darkly | `btn btn-info` | 3.15:1 |
| darkly | `btn btn-success` | 2.42:1 |
| darkly | `btn btn-warning` | 2.19:1 |
| deeply | `btn btn-danger` | 3.33:1 |
| deeply | `btn btn-primary` | 3.20:1 |
| electro | `btn btn-danger` | 1.44:1 |
| electro | `btn btn-warning` | 1.44:1 |
| flatly | `badge badge-dark` | 4.29:1 |
| flatly | `btn btn-dark` | 3.58:1 |
| flatly | `btn btn-info` | 3.15:1 |
| flatly | `btn btn-secondary` | 2.55:1 |
| flatly | `btn btn-success` | 2.41:1 |
| flatly | `btn btn-warning` | 2.19:1 |
| focal | `card bg-primary` | 2.16:1 |
| graymor | `btn btn-info` | 3.37:1 |
| graymor | `btn btn-warning` | 2.93:1 |
| hootstrap | `badge badge-primary` | 4.45:1 |
| hootstrap | `card bg-primary` | 4.45:1 |
| hootstrap | `card bg-secondary` | 1.44:1 |
| journal | `btn btn-danger` | 2.73:1 |
| journal | `btn btn-primary` | 3.13:1 |
| journal | `btn btn-success` | 2.78:1 |
| litera | `badge badge-danger` | 3.96:1 |
| litera | `badge badge-info` | 3.04:1 |
| litera | `badge badge-primary` | 3.71:1 |
| litera | `badge badge-secondary` | 2.07:1 |
| litera | `badge badge-success` | 2.58:1 |
| litera | `badge badge-warning` | 1.94:1 |
| litera | `btn btn-danger` | 3.96:1 |
| litera | `btn btn-info` | 3.04:1 |
| litera | `btn btn-primary` | 3.71:1 |
| litera | `btn btn-secondary` | 2.07:1 |
| litera | `btn btn-success` | 2.58:1 |
| litera | `btn btn-warning` | 1.94:1 |
| lux | `btn btn-danger` | 3.74:1 |
| lux | `btn btn-info` | 3.04:1 |
| lux | `btn btn-success` | 2.33:1 |
| lux | `btn btn-warning` | 1.94:1 |
| materia | `badge badge-secondary` | 1.91:1 |
| materia | `badge badge-warning` | 2.15:1 |
| materia | `btn btn-primary` | 3.12:1 |
| materia | `btn btn-success` | 2.77:1 |
| materia | `btn btn-warning` | 2.15:1 |
| materia | `card bg-primary` | 3.12:1 |
| mickie | `btn btn-danger` | 3.31:1 |
| mickie | `btn btn-primary` | 2.94:1 |
| mickie | `card bg-primary` | 2.94:1 |
| minco | `btn btn-danger` | 3.32:1 |
| minco | `btn btn-warning` | 3.34:1 |
| minty | `btn btn-danger` | 2.60:1 |
| minty | `btn btn-info` | 2.01:1 |
| minty | `btn btn-primary` | 2.07:1 |
| minty | `btn btn-secondary` | 2.17:1 |
| minty | `btn btn-success` | 1.99:1 |
| minty | `btn btn-warning` | 1.47:1 |
| minty | `card bg-primary` | 2.07:1 |
| minty | `card bg-secondary` | 2.17:1 |
| navi | `badge badge-primary` | 4.02:1 |
| navi | `card bg-primary` | 3.83:1 |
| none | `badge badge-primary` | 3.97:1 |
| none | `btn btn-info` | 2.90:1 |
| none | `btn btn-primary` | 3.97:1 |
| none | `btn btn-success` | 3.13:1 |
| preptor | `btn btn-danger` | 3.38:1 |
| preptor | `btn btn-info` | 2.24:1 |
| pulse | `badge badge-danger` | 3.63:1 |
| pulse | `badge badge-info` | 3.09:1 |
| pulse | `badge badge-secondary` | 2.73:1 |
| pulse | `badge badge-success` | 2.59:1 |
| pulse | `badge badge-warning` | 2.11:1 |
| pulse | `btn btn-danger` | 3.63:1 |
| pulse | `btn btn-info` | 3.09:1 |
| pulse | `btn btn-success` | 2.59:1 |
| pulse | `btn btn-warning` | 2.11:1 |
| skeeblu | `btn btn-primary` | 2.74:1 |
| skeeblu | `btn btn-success` | 2.41:1 |
| sketchy | `badge badge-warning` | 1.63:1 |
| sketchy | `btn btn-info` | 2.90:1 |
| sketchy | `btn btn-success` | 3.13:1 |
| sketchy | `btn btn-warning` | 1.63:1 |
| slate | `btn btn-danger` | 3.11:1 |
| slate | `btn btn-info` | 2.09:1 |
| slate | `btn btn-success` | 2.18:1 |
| slate | `btn btn-warning` | 2.27:1 |
| solar | `badge badge-info` | 4.07:1 |
| solar | `btn btn-info` | 3.68:1 |
| solar | `btn btn-primary` | 3.20:1 |
| solar | `btn btn-secondary` | 3.16:1 |
| solar | `btn btn-success` | 3.15:1 |
| solar | `card bg-primary` | 3.20:1 |
| solar | `card bg-secondary` | 3.16:1 |
| twitter-dim | `badge badge-secondary` | 4.26:1 |
| twitter-dim | `card bg-primary` | 2.84:1 |
| twitter-dim | `card bg-secondary` | 3.42:1 |
| twitter-lights-out | `card bg-primary` | 3.00:1 |
| twitter | `card bg-primary` | 3.00:1 |
| united | `badge badge-primary` | 4.22:1 |
| united | `btn btn-info` | 2.90:1 |
| united | `btn btn-primary` | 3.64:1 |
| united | `btn btn-secondary` | 2.37:1 |
| united | `btn btn-success` | 2.69:1 |
| united | `btn btn-warning` | 1.82:1 |
| united | `card bg-primary` | 3.64:1 |
| united | `card bg-secondary` | 2.37:1 |
| universal | `badge badge-info` | 3.04:1 |
| universal | `badge badge-primary` | 3.99:1 |
| universal | `btn btn-info` | 3.04:1 |
| universal | `btn btn-primary` | 3.99:1 |
| wandoo | `badge badge-primary` | 4.25:1 |
| wandoo | `btn btn-primary` | 3.62:1 |
| yeti | `badge badge-info` | 2.09:1 |
| yeti | `badge badge-primary` | 3.84:1 |
| yeti | `badge badge-warning` | 2.48:1 |
| yeti | `btn btn-info` | 2.09:1 |
| yeti | `btn btn-primary` | 3.84:1 |
| yeti | `btn btn-success` | 2.85:1 |
| yeti | `btn btn-warning` | 2.48:1 |
| yeti | `card bg-primary` | 3.84:1 |

## Validation and scope

- `node test/check_skin_contrast.js`: all 46 original primary colors preserved; 30 known base exceptions checked against their recorded original contrast; all other base pairs reach 4.5:1.
- `node test/check_skin_contrast_browser.js`: 92 skin/viewport combinations (390px and 1280px); base components checked with 144 documented component exceptions per viewport, not counted as WCAG passes. Body/navigation/footer links on Twitter Dim and Butterfly Dim pass 4.5:1 in normal, hover and focus states; Cyborg/Wandoo body links pass the same focused checks.
- Button follow-up: 1,488 restored-light-label state checks and 556 corrected outline normal/focus checks pass at 390px and 1280px, in addition to the 5,796 original passing-state checks. Reviewed filled backgrounds and intended normal labels are pinned across all 43 palettes. Updated galleries cover all 43 palettes; focused 390px captures for Navi and all three Butterfly variants were visually inspected.
- Earlier complete palette galleries were visually inspected at both widths, including restored primary colors and bright/pastel backgrounds.
- Chatbot suite: 80 tests pass. Color guide, changelog, context and evaluation reflect the compromise. Context updated locally, not deployed. llms.txt already links the changed color guide; no new guide/link needed.
- The selective chatbot context and llms.txt need no further change for these local button fixes: the existing guide link, identity/contrast caveat and custom-color review advice remain accurate; no new configuration or changed reader recipe. No chatbot deployment was performed.
- Legacy SassC/Jekyll execution remains unverified because Ruby is unavailable. Only existing variables, mixes, lighten and YIQ mechanisms are used.
- No whole-page accessibility certification: other interaction states, gradients across their full area, transparency, arbitrary component backgrounds and custom colors remain outside this review.
- No URL, metadata, manifest, service-worker or runtime-script changes; SEO and PWA behavior is unaffected.
