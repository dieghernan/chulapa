# Skin-context post-deployment retest — 22 October 2026

Five selected skin and theming cases were sent once after deploying the updated
context. Four requests returned HTTP 200; one returned HTTP 503 and the guarded
unsupported-source fallback. No retry was made.

Worker version: `8b59f0a7-006b-45b4-a325-c84c43505ce5` (100% traffic)
Deployment time: `2026-10-22T13:28:23.982679Z`
Response window: `2026-10-22T13:29:19.920Z` to `2026-10-22T13:30:52.063Z`

Raw responses: [JSONL](skins-postdeploy-2026-10-22.jsonl). Machine-readable
findings: [review JSON](skins-postdeploy-2026-10-22-review.json).

| Case | HTTP | Review | Finding |
| --- | ---: | --- | --- |
| `theming-2` | 200 | partial | Correct Autothemer nesting and quoted purple primary, but omits `skin: auto`, which the case requires to select the generated-palette skin. |
| `skin-font-failure-1` | 200 | partial | Correctly retains font imports, describes Google Fonts fallback and requires complete skin/highlighter CSS. Omits the v2.1.0 boundary and incomplete-essential-CSS behavior; adds unnecessary font-family setup advice. |
| `theme-selector-demo-1` | 200 | partial | Correctly says the demo is illustrative and supplies independent top-level mappings with the v2.2.0 limit. Omits merge/preserve guidance and inaccurately qualifies floating navigation as working on search pages. |
| `skins-bootswatch-originals-1` | 503 | unavailable | The request received the fixed unsupported-source fallback, not a model answer. No retry was made. |
| `community-165` | 200 | partial | Correctly states the version limit and shows separate light/dark mappings. Floating navigation is imprecisely restricted to search pages, and other requested compatibility details are omitted. |

**Totals:** 0 pass, 4 partial, 0 fail, 1 unavailable. These results apply only
to Worker `8b59f0a7`; the unavailable request is not an accuracy result.
