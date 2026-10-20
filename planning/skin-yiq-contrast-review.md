# Skin palette contrast review

Bundled palettes now pass WCAG AA 4.5:1 for normal text on all eight base semantic backgrounds with the original `color-yiq()` function. The function is unchanged; this PR adjusts palette constants and skin thresholds only. No new configuration options.

The `none` skin still leaves palette assignments unset so autothemer can fill them; its base blue/green/cyan defaults are tuned in Bootstrap variables. Autothemer keeps its existing mixing rules with tuned seed colors. Custom primary colors and custom overrides are not covered by the default-palette result.

## Updated summary

| Skin | Passing base colors, before → after | Minimum ratio after | Palette changes | YIQ threshold, before → after |
|---|---|---|---|---|
| academia | 6/8 → 8/8 | 4.53:1 | success, info | 150 → 128 |
| auto | 4/8 → 8/8 | 4.71:1 | primary, secondary, success, info, warning, danger, light, dark | 150 → 128 |
| butterfly-dark | 5/8 → 8/8 | 4.55:1 | primary, success, danger | 150 → 128 |
| butterfly-dim | 5/8 → 8/8 | 4.57:1 | primary, success, danger | 150 → 128 |
| butterfly | 4/8 → 8/8 | 4.57:1 | primary, success, danger | 150 → 128 |
| chulapa | 7/8 → 8/8 | 4.56:1 | danger | 150 → 128 |
| cyborg | 4/8 → 8/8 | 4.59:1 | primary | 175 → 130 |
| darkly | 4/8 → 8/8 | 4.57:1 | success, danger | 175 → 128 |
| deeply | 5/8 → 8/8 | 4.57:1 | primary, info, danger | 150 → 128 |
| electro | 6/8 → 8/8 | 7.11:1 | None | 150 → 140 |
| flatly | 2/8 → 8/8 | 4.58:1 | info, danger, dark | 175 → 130 |
| focal | 4/8 → 8/8 | 4.56:1 | primary, success, info, danger | 150 → 128 |
| gitdev-dark | 8/8 → 8/8 | 6.61:1 | None | 150 → 150 |
| gitdev | 8/8 → 8/8 | 4.69:1 | None | 150 → 150 |
| graymor | 5/8 → 8/8 | 4.56:1 | secondary, info | 150 → 130 |
| hootstrap | 7/8 → 8/8 | 4.56:1 | primary, secondary | 150 → 150 |
| journal | 5/8 → 8/8 | 5.07:1 | success | 150 → 128 |
| listen | 6/8 → 8/8 | 4.57:1 | secondary, danger | 130 → 130 |
| lux | 4/8 → 8/8 | 4.65:1 | info, danger | 185 → 128 |
| lymcha | 8/8 → 8/8 | 5.61:1 | None | 150 → 150 |
| materia | 5/8 → 8/8 | 4.56:1 | primary, warning | 170 → 128 |
| media | 7/8 → 8/8 | 4.53:1 | danger | 150 → 150 |
| mickie | 5/8 → 8/8 | 4.55:1 | primary, info, danger | 150 → 128 |
| minco | 6/8 → 8/8 | 4.55:1 | warning, danger | 150 → 128 |
| minty | 2/8 → 8/8 | 4.55:1 | primary, secondary | 220 → 150 |
| monotone | 8/8 → 8/8 | 5.74:1 | None | 150 → 150 |
| navi | 6/8 → 8/8 | 4.58:1 | primary, success | 150 → 130 |
| none | 5/8 → 8/8 | 4.53:1 | primary, success, info | 150 → 128 |
| pear | 5/8 → 8/8 | 4.53:1 | secondary, success, info | 150 → 128 |
| preptor | 6/8 → 8/8 | 4.55:1 | danger | 150 → 128 |
| skeeblu | 5/8 → 8/8 | 4.55:1 | danger | 150 → 130 |
| sketchy | 5/8 → 8/8 | 4.53:1 | success, info, warning | 200 → 128 |
| slate | 3/8 → 8/8 | 4.56:1 | secondary, danger | 170 → 140 |
| solar | 4/8 → 8/8 | 4.55:1 | primary, secondary, success, info | 150 → 128 |
| sunset | 7/8 → 8/8 | 4.55:1 | danger | 150 → 150 |
| towards | 7/8 → 8/8 | 4.61:1 | None | 150 → 130 |
| twitter-dim | 3/8 → 8/8 | 4.56:1 | primary, secondary, success, danger | 150 → 128 |
| twitter-lights-out | 3/8 → 8/8 | 4.55:1 | primary, secondary, success, danger | 150 → 128 |
| twitter | 3/8 → 8/8 | 4.55:1 | primary, secondary, success, danger | 150 → 128 |
| united | 2/8 → 8/8 | 4.56:1 | primary, secondary, info, danger | 200 → 128 |
| universal | 6/8 → 8/8 | 4.53:1 | primary, info | 150 → 128 |
| wandoo | 6/8 → 8/8 | 4.57:1 | primary, info | 150 → 128 |
| yeti | 3/8 → 8/8 | 4.56:1 | primary, info, warning, danger | 200 → 130 |

## Exact palette values

Hex values below are rounded for readability; Sass preserves fractional channels in generated colors. Materia also changes its independent `gray-500` badge background from `#bbb` to `#757575` so its fixed white text passes.

| Skin | Color | Before | After |
|---|---|---|---|
| academia | success | `#28a745` | `#38ae53` |
| academia | info | `#17a2b8` | `#20a6bb` |
| auto | primary | `#007bff` | `#006bdf` |
| auto | secondary | `#5c7691` | `#597089` |
| auto | success | `#1e9c74` | `#38af84` |
| auto | info | `#1198ca` | `#29a6c2` |
| auto | warning | `#bfb045` | `#bfac3d` |
| auto | danger | `#a54774` | `#a5436c` |
| auto | light | `#bfdeff` | `#bfdaf7` |
| auto | dark | `#001f40` | `#001b38` |
| butterfly-dark | primary | `#1083fe` | `#0e74e2` |
| butterfly-dark | success | `#00a400` | `#008900` |
| butterfly-dark | danger | `#fa383e` | `#fa4c51` |
| butterfly-dim | primary | `#208bfe` | `#1b75d7` |
| butterfly-dim | success | `#00a400` | `#008900` |
| butterfly-dim | danger | `#fa383e` | `#fa4c51` |
| butterfly | primary | `#1083f3` | `#0e75da` |
| butterfly | success | `#00a400` | `#008900` |
| butterfly | danger | `#fa383e` | `#fa4c51` |
| chulapa | danger | `#f13c20` | `#dc371d` |
| cyborg | primary | `#2a9fd6` | `#217da9` |
| darkly | success | `#00bc8c` | `#04bd8e` |
| darkly | danger | `#e74c3c` | `#e95a4b` |
| deeply | primary | `#ff550b` | `#ff560c` |
| deeply | info | `#0f81c7` | `#0e7bbe` |
| deeply | danger | `#ff304f` | `#ff4661` |
| flatly | info | `#3498db` | `#3598db` |
| flatly | danger | `#e74c3c` | `#d04536` |
| flatly | dark | `#7b8a8b` | `#808f90` |
| focal | primary | `#ff9285` | `#aa6259` |
| focal | success | `#26a65b` | `#34ac65` |
| focal | info | `#00acc1` | `#0aafc4` |
| focal | danger | `#ff0000` | `#ed0000` |
| graymor | secondary | `#6f7f8c` | `#687884` |
| graymor | info | `#5c8f94` | `#639498` |
| hootstrap | primary | `#528078` | `#517e77` |
| hootstrap | secondary | `#eed75a` | `#837632` |
| journal | success | `#22b24c` | `#2ab552` |
| listen | secondary | `#7c7c7c` | `#757575` |
| listen | danger | `#ed2c3f` | `#e12a3c` |
| lux | info | `#1f9bcf` | `#279ed1` |
| lux | danger | `#d9534f` | `#db5a56` |
| materia | primary | `#2196f3` | `#1b79c5` |
| materia | warning | `#ff9800` | `#aa6600` |
| media | danger | `#cc5454` | `#c35050` |
| mickie | primary | `#f6648c` | `#c14f6e` |
| mickie | info | `#3f81c7` | `#3b78ba` |
| mickie | danger | `#ff444f` | `#ff4953` |
| minco | warning | `#fc3c3c` | `#fc4c4c` |
| minco | danger | `#ff4057` | `#ff475d` |
| minty | primary | `#78c2ad` | `#4f7f72` |
| minty | secondary | `#f3969a` | `#a36567` |
| navi | primary | `#457aff` | `#3e6ee7` |
| navi | success | `#00a648` | `#00883b` |
| none | primary | `#007bff` | `#0072eb` |
| none | success | `#28a745` | `#38ae53` |
| none | info | `#17a2b8` | `#20a6bb` |
| pear | secondary | `#6c757d` | `#656e75` |
| pear | success | `#28a745` | `#38ae53` |
| pear | info | `#17a2b8` | `#20a6bb` |
| preptor | danger | `#fa4659` | `#fa4a5c` |
| skeeblu | danger | `#e8286b` | `#df2667` |
| sketchy | success | `#28a745` | `#38ae53` |
| sketchy | info | `#17a2b8` | `#20a6bb` |
| sketchy | warning | `#ffc107` | `#947004` |
| slate | secondary | `#7a8288` | `#6f777c` |
| slate | danger | `#ee5f5b` | `#ef6662` |
| solar | primary | `#b58900` | `#957000` |
| solar | secondary | `#839496` | `#6b787a` |
| solar | success | `#2aa198` | `#30a49b` |
| solar | info | `#268bd2` | `#3894d6` |
| sunset | danger | `#f2460d` | `#d83e0c` |
| twitter-dim | primary | `#1d9bf0` | `#1677b9` |
| twitter-dim | secondary | `#788995` | `#66747f` |
| twitter-dim | success | `#00ba7c` | `#09bd81` |
| twitter-dim | danger | `#f91880` | `#e21674` |
| twitter-lights-out | primary | `#1d9bf0` | `#177bbe` |
| twitter-lights-out | secondary | `#788995` | `#697883` |
| twitter-lights-out | success | `#00ba7c` | `#09bd81` |
| twitter-lights-out | danger | `#f91880` | `#e21674` |
| twitter | primary | `#1d9bf0` | `#177bbe` |
| twitter | secondary | `#788995` | `#697883` |
| twitter | success | `#00ba7c` | `#09bd81` |
| twitter | danger | `#f91880` | `#e21674` |
| united | primary | `#e95420` | `#cd4a1c` |
| united | secondary | `#aea79f` | `#7a7570` |
| united | info | `#17a2b8` | `#20a6bb` |
| united | danger | `#df382c` | `#db372b` |
| universal | primary | `#986dbd` | `#a27cc4` |
| universal | info | `#17a2b8` | `#20a6bb` |
| wandoo | primary | `#ff304f` | `#ff4661` |
| wandoo | info | `#0f81c7` | `#0e7bbe` |
| yeti | primary | `#008cba` | `#007fa9` |
| yeti | info | `#5bc0de` | `#3c7e92` |
| yeti | warning | `#e99002` | `#a76701` |
| yeti | danger | `#f04124` | `#d93b21` |

## Validation and scope

- `node test/check_skin_contrast.js`: 43 palettes × eight colors pass an independent WCAG calculation.
- `node test/check_skin_contrast_browser.js`: 86 skin/viewport combinations (390px and 1280px); rendered base buttons, badges and skin-defined colored cards pass 4.5:1, including fixed text overrides.
- Inspected the complete palette galleries at both viewport sizes. Colors retain their hue families; Minty, Focal and several warning backgrounds are visibly darker where fixed white text requires it.
- Chatbot suite: 80 tests pass. Context and one evaluation case updated locally, not deployed. llms.txt already links the changed color guide; no new guide or link needed.
- Legacy SassC/Jekyll execution remains unverified: Ruby is not installed. The change uses existing variable, mix and YIQ mechanisms without new Sass functions.
- Scope is base backgrounds and text. Interaction states, gradients across their full area, transparency, outlines, alerts, navigation and full-page accessibility are not certified by these checks.
- No URL, metadata, manifest, service-worker or runtime-script changes: SEO and PWA behavior is unaffected.
