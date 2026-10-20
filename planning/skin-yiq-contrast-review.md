# Skin palette contrast review

## Identity-preserving compromise

All 42 skins and the auto defaults preserve their original primary background colors exactly. Strong darkening of secondary/warning/info colors is reverted as well: Minty retains its pastel green and pink, Focal its salmon, Hootstrap its yellow, and Sketchy/Materia/Yeti their original warning colors. Only small remaining palette adjustments and existing YIQ thresholds are changed. The shared YIQ function is unchanged.

33 of 43 palettes now meet WCAG AA 4.5:1 on all eight base semantic pairs, compared with five originally. Eleven pairs remain below 4.5:1 across ten palettes (including auto), and are explicitly retained for identity. This is not an all-palette accessibility certification.

The original primary values are pinned in `test/skin-contrast-identity.json`. No new YAML settings, color-selection helpers or automatic fallback logic. The none skin still leaves palette assignments unset for autothemer. Custom primary values and overrides need their own review.

## Updated summary

| Skin | Passing base pairs, before → after | Minimum after | Remaining limitations | Small palette changes | YIQ threshold, before → after |
|---|---|---|---|---|---|
| academia | 6/8 → 8/8 | 4.53:1 | None on base palette | success, info | 150 → 128 |
| auto | 4/8 → 7/8 | 3.72:1 | primary (3.72:1) | secondary, success, info | 150 → 128 |
| butterfly-dark | 5/8 → 7/8 | 4.19:1 | primary (4.19:1) | success, danger | 150 → 110 |
| butterfly-dim | 5/8 → 8/8 | 4.54:1 | None on base palette | success, danger | 150 → 120 |
| butterfly | 4/8 → 7/8 | 4.09:1 | primary (4.09:1) | success, danger | 150 → 109 |
| chulapa | 7/8 → 8/8 | 4.56:1 | None on base palette | danger | 150 → 128 |
| cyborg | 4/8 → 8/8 | 5.16:1 | None on base palette | None | 175 → 130 |
| darkly | 4/8 → 8/8 | 4.57:1 | None on base palette | success, danger | 175 → 128 |
| deeply | 5/8 → 8/8 | 4.57:1 | None on base palette | info, danger | 150 → 127 |
| electro | 6/8 → 8/8 | 7.11:1 | None on base palette | None | 150 → 140 |
| flatly | 2/8 → 8/8 | 4.58:1 | None on base palette | info, danger, dark | 175 → 130 |
| focal | 4/8 → 8/8 | 4.56:1 | None on base palette | success, info, danger | 150 → 128 |
| gitdev-dark | 8/8 → 8/8 | 6.61:1 | None on base palette | None | 150 → 150 |
| gitdev | 8/8 → 8/8 | 4.69:1 | None on base palette | None | 150 → 150 |
| graymor | 5/8 → 8/8 | 4.56:1 | None on base palette | secondary, info | 150 → 130 |
| hootstrap | 7/8 → 7/8 | 4.45:1 | primary (4.45:1) | None | 150 → 150 |
| journal | 5/8 → 8/8 | 5.07:1 | None on base palette | success | 150 → 128 |
| listen | 6/8 → 8/8 | 4.57:1 | None on base palette | secondary, danger | 130 → 130 |
| lux | 4/8 → 8/8 | 4.65:1 | None on base palette | info, danger | 185 → 128 |
| lymcha | 8/8 → 8/8 | 5.61:1 | None on base palette | None | 150 → 150 |
| materia | 5/8 → 8/8 | 4.64:1 | None on base palette | None | 170 → 125 |
| media | 7/8 → 8/8 | 4.53:1 | None on base palette | danger | 150 → 150 |
| mickie | 5/8 → 8/8 | 4.58:1 | None on base palette | info, danger | 150 → 128 |
| minco | 6/8 → 8/8 | 4.55:1 | None on base palette | warning, danger | 150 → 128 |
| minty | 2/8 → 8/8 | 5.92:1 | None on base palette | None | 220 → 150 |
| monotone | 8/8 → 8/8 | 5.74:1 | None on base palette | None | 150 → 150 |
| navi | 6/8 → 7/8 | 4.03:1 | primary (4.03:1) | None | 150 → 105 |
| none | 5/8 → 7/8 | 3.98:1 | primary (3.98:1) | success, info | 150 → 128 |
| pear | 5/8 → 8/8 | 4.53:1 | None on base palette | secondary, success, info | 150 → 128 |
| preptor | 6/8 → 8/8 | 4.55:1 | None on base palette | danger | 150 → 128 |
| skeeblu | 5/8 → 8/8 | 4.55:1 | None on base palette | danger | 150 → 130 |
| sketchy | 5/8 → 8/8 | 4.53:1 | None on base palette | success, info | 200 → 128 |
| slate | 3/8 → 8/8 | 4.56:1 | None on base palette | secondary, danger | 170 → 140 |
| solar | 4/8 → 8/8 | 4.55:1 | None on base palette | success, info | 150 → 128 |
| sunset | 7/8 → 8/8 | 4.55:1 | None on base palette | danger | 150 → 150 |
| towards | 7/8 → 8/8 | 4.61:1 | None on base palette | None | 150 → 130 |
| twitter-dim | 3/8 → 8/8 | 4.56:1 | None on base palette | secondary, success, danger | 150 → 127 |
| twitter-lights-out | 3/8 → 8/8 | 4.55:1 | None on base palette | secondary, success, danger | 150 → 127 |
| twitter | 3/8 → 8/8 | 4.55:1 | None on base palette | secondary, success, danger | 150 → 127 |
| united | 2/8 → 7/8 | 4.23:1 | primary (4.23:1) | info, danger | 200 → 122 |
| universal | 6/8 → 6/8 | 3.04:1 | primary (3.99:1), info (3.04:1) | None | 150 → 150 |
| wandoo | 6/8 → 7/8 | 4.25:1 | primary (4.25:1) | info | 150 → 113 |
| yeti | 3/8 → 7/8 | 3.85:1 | primary (3.85:1) | danger | 200 → 130 |

## Remaining palette adjustments

Hex values are rounded; Sass preserves fractional channels in generated colors. All primary values are unchanged.

| Skin | Color | Before | After |
|---|---|---|---|
| academia | success | `#28a745` | `#38ae53` |
| academia | info | `#17a2b8` | `#20a6bb` |
| auto | secondary | `#5c7691` | `#59738e` |
| auto | success | `#1e9c74` | `#38b38c` |
| auto | info | `#1198ca` | `#29aaca` |
| butterfly-dark | success | `#00a400` | `#008900` |
| butterfly-dark | danger | `#fa383e` | `#fa4c51` |
| butterfly-dim | success | `#00a400` | `#008900` |
| butterfly-dim | danger | `#fa383e` | `#fa4c51` |
| butterfly | success | `#00a400` | `#008900` |
| butterfly | danger | `#fa383e` | `#fa4c51` |
| chulapa | danger | `#f13c20` | `#dc371d` |
| darkly | success | `#00bc8c` | `#04bd8e` |
| darkly | danger | `#e74c3c` | `#e95a4b` |
| deeply | info | `#0f81c7` | `#0e7bbe` |
| deeply | danger | `#ff304f` | `#ff4661` |
| flatly | info | `#3498db` | `#3598db` |
| flatly | danger | `#e74c3c` | `#d04536` |
| flatly | dark | `#7b8a8b` | `#808f90` |
| focal | success | `#26a65b` | `#34ac65` |
| focal | info | `#00acc1` | `#0aafc4` |
| focal | danger | `#ff0000` | `#ed0000` |
| graymor | secondary | `#6f7f8c` | `#687884` |
| graymor | info | `#5c8f94` | `#639498` |
| journal | success | `#22b24c` | `#2ab552` |
| listen | secondary | `#7c7c7c` | `#757575` |
| listen | danger | `#ed2c3f` | `#e12a3c` |
| lux | info | `#1f9bcf` | `#279ed1` |
| lux | danger | `#d9534f` | `#db5a56` |
| media | danger | `#cc5454` | `#c35050` |
| mickie | info | `#3f81c7` | `#3b78ba` |
| mickie | danger | `#ff444f` | `#ff4953` |
| minco | warning | `#fc3c3c` | `#fc4c4c` |
| minco | danger | `#ff4057` | `#ff475d` |
| none | success | `#28a745` | `#38ae53` |
| none | info | `#17a2b8` | `#20a6bb` |
| pear | secondary | `#6c757d` | `#656e75` |
| pear | success | `#28a745` | `#38ae53` |
| pear | info | `#17a2b8` | `#20a6bb` |
| preptor | danger | `#fa4659` | `#fa4a5c` |
| skeeblu | danger | `#e8286b` | `#df2667` |
| sketchy | success | `#28a745` | `#38ae53` |
| sketchy | info | `#17a2b8` | `#20a6bb` |
| slate | secondary | `#7a8288` | `#6f777c` |
| slate | danger | `#ee5f5b` | `#ef6662` |
| solar | success | `#2aa198` | `#30a49b` |
| solar | info | `#268bd2` | `#3894d6` |
| sunset | danger | `#f2460d` | `#d83e0c` |
| twitter-dim | secondary | `#788995` | `#66747f` |
| twitter-dim | success | `#00ba7c` | `#09bd81` |
| twitter-dim | danger | `#f91880` | `#e21674` |
| twitter-lights-out | secondary | `#788995` | `#697883` |
| twitter-lights-out | success | `#00ba7c` | `#09bd81` |
| twitter-lights-out | danger | `#f91880` | `#e21674` |
| twitter | secondary | `#788995` | `#697883` |
| twitter | success | `#00ba7c` | `#09bd81` |
| twitter | danger | `#f91880` | `#e21674` |
| united | info | `#17a2b8` | `#20a6bb` |
| united | danger | `#df382c` | `#db372b` |
| wandoo | info | `#0f81c7` | `#0e7bbe` |
| yeti | danger | `#f04124` | `#d93b21` |

## PR review: dark link regression

The review correctly identified that darkening Twitter Dim and Butterfly Dim primary colors made page links, navbar accents and footer links less readable. Restoring the original primary colors restores those normal link contrasts (5.50:1 and 4.95:1 respectively). Their hover/focus accents are kept bright rather than darkened by shared dark defaults. Body links on Cyborg and Wandoo are also covered by focused regression checks.

## Fixed-text component limitations

The following rendered base pairs remain below 4.5:1. They are recorded as limitations rather than successes; fixed white text on the original bright backgrounds is a frequent cause. Their test floors prevent further degradation. They do not invalidate the narrower base-YIQ counts above, which measure automatic text selection only.

| Skin | Component | Recorded minimum ratio |
|---|---|---|
| auto | `btn btn-primary` | 3.72:1 |
| auto | `badge badge-primary` | 3.72:1 |
| butterfly-dark | `btn btn-primary` | 4.18:1 |
| butterfly-dark | `badge badge-primary` | 4.18:1 |
| butterfly-dark | `card bg-primary` | 3.68:1 |
| butterfly-dim | `card bg-primary` | 3.39:1 |
| butterfly | `btn btn-primary` | 4.08:1 |
| butterfly | `badge badge-primary` | 4.08:1 |
| butterfly | `card bg-primary` | 3.77:1 |
| cyborg | `card bg-primary` | 2.98:1 |
| focal | `card bg-primary` | 2.16:1 |
| hootstrap | `btn btn-primary` | 4.45:1 |
| hootstrap | `badge badge-primary` | 4.45:1 |
| hootstrap | `card bg-primary` | 4.45:1 |
| hootstrap | `card bg-secondary` | 1.44:1 |
| materia | `card bg-primary` | 3.12:1 |
| materia | `badge badge-secondary` | 1.91:1 |
| materia | `btn btn-warning` | 2.15:1 |
| materia | `badge badge-warning` | 2.15:1 |
| mickie | `card bg-primary` | 2.94:1 |
| minty | `card bg-primary` | 2.07:1 |
| minty | `card bg-secondary` | 2.17:1 |
| navi | `btn btn-primary` | 4.02:1 |
| navi | `badge badge-primary` | 4.02:1 |
| navi | `card bg-primary` | 3.83:1 |
| none | `btn btn-primary` | 3.97:1 |
| none | `badge badge-primary` | 3.97:1 |
| sketchy | `badge badge-warning` | 1.63:1 |
| solar | `card bg-primary` | 3.20:1 |
| solar | `card bg-secondary` | 3.16:1 |
| twitter-dim | `card bg-primary` | 2.84:1 |
| twitter-lights-out | `card bg-primary` | 3.00:1 |
| twitter | `card bg-primary` | 3.00:1 |
| united | `btn btn-primary` | 4.22:1 |
| united | `badge badge-primary` | 4.22:1 |
| united | `card bg-primary` | 3.64:1 |
| united | `card bg-secondary` | 2.37:1 |
| universal | `btn btn-primary` | 3.99:1 |
| universal | `badge badge-primary` | 3.99:1 |
| universal | `btn btn-info` | 3.04:1 |
| universal | `badge badge-info` | 3.04:1 |
| wandoo | `btn btn-primary` | 4.25:1 |
| wandoo | `badge badge-primary` | 4.25:1 |
| yeti | `btn btn-primary` | 3.84:1 |
| yeti | `badge badge-primary` | 3.84:1 |
| yeti | `card bg-primary` | 3.84:1 |
| yeti | `badge badge-info` | 2.09:1 |
| yeti | `badge badge-warning` | 2.48:1 |

## Validation and scope

- `node test/check_skin_contrast.js`: all 43 original primary colors preserved; eleven known base exceptions checked against their recorded original contrast; all other base pairs reach 4.5:1.
- `node test/check_skin_contrast_browser.js`: 86 skin/viewport combinations (390px and 1280px); base components checked with 48 documented component exceptions per viewport, not counted as WCAG passes. Body/navigation/footer links on Twitter Dim and Butterfly Dim pass 4.5:1 in normal, hover and focus states; Cyborg/Wandoo body links pass the same focused checks.
- Complete palette galleries visually inspected at both widths, including the restored primary colors and bright/pastel backgrounds.
- Chatbot suite: 80 tests pass. Color guide, changelog, context and evaluation reflect the compromise. Context updated locally, not deployed. llms.txt already links the changed color guide; no new guide/link needed.
- Legacy SassC/Jekyll execution remains unverified because Ruby is unavailable. Only existing variables, mixes, lighten and YIQ mechanisms are used.
- No whole-page accessibility certification: other interaction states, gradients across their full area, transparency, outlines, alerts and custom colors remain outside this review.
- No URL, metadata, manifest, service-worker or runtime-script changes; SEO and PWA behavior is unaffected.
