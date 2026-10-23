# Retest of eight older pass cases — 22 October 2026

The eight cases whose latest logged pass was dated 16 October or earlier were
sent once to the current Worker and manually reviewed against their catalog
criteria. All eight requests returned HTTP 200.

Worker version: `8b59f0a7-006b-45b4-a325-c84c43505ce5` (100% traffic)
Deployment time: `2026-10-22T13:28:23.982679Z`
Response window: `2026-10-22T13:31:39.699Z` to `2026-10-22T13:33:08.982Z`

Raw responses: [JSONL](historical-pass8-2026-10-22.jsonl). Machine-readable
findings: [review JSON](historical-pass8-2026-10-22-review.json).

| Case | Previous latest pass | HTTP | Review | Finding |
| --- | --- | ---: | --- | --- |
| `reference-edge-cases-4` | 2026-10-16 | 200 | pass | Correct variables and nesting; notes that syntax highlighting can override the code-block background. |
| `reference-edge-cases-5` | 2026-10-16 | 200 | fail | The YAML example puts `highlight: dracula` at the root instead of under `chulapa-skin`, so the recommended configuration is invalid. |
| `reference-edge-cases-6` | 2026-10-16 | 200 | pass | Correctly distinguishes noindex from privacy, does not claim to read the RSS feed and acknowledges the unsupported cart request. |
| `layouts-7` | 2026-10-08 | 200 | pass | Correctly describes landingpage options and hides its header with `header_type: none`. |
| `variables-1` | 2026-10-08 | 200 | pass | Correct variable names/nesting, quoted colors, preservation guidance and restart instruction. |
| `variables-2` | 2026-10-08 | 200 | pass | Correctly explains the calculated helper and explicit-primary behavior. |
| `variables-3` | 2026-10-08 | 200 | pass | Correctly identifies the three toggler variables and Sass `url(...)` usage. |
| `mermaid-1` | 2026-10-08 | 200 | pass | Correct enablement, v2.1.0 boundary, no-plugin detail and CDN-failure behavior. |

**Totals:** 7 pass, 0 partial, 1 fail, 0 unavailable. These results apply only
to Worker `8b59f0a7`; the old `reference-edge-cases-5` pass does not carry
forward after this retest.
