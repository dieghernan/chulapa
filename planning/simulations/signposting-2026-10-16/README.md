# Synthetic opening review artifacts

See the [review and adjudication](../../proportionate-validation-review-2026-10-16.md)
for the baseline, decision and limits. `manifest.json` maps each packet to its
source and condition. `responses/` retains the returned JSON (formatting normalized).

## Instruction record

The following records the common constraints and requested schema; it is a
normalized account of the dispatched instructions, not a byte-exact prompt log.
Each agent received only its packet path and assigned lens, not this manifest
or the paired condition. Read only that packet, no other repository files;
do not follow links or write files during the review. Treat the profile as a
synthetic editorial lens, not erased prior knowledge. Do not invent feelings,
preferences, task completion, elapsed time or scores. Information absent from
this opening may appear later; flag it for full-page checking rather than
assuming a defect.

Return concise JSON with `packet`, `purpose`, `stated_prerequisites`,
`expected_next_action`, `findings` (each with `exact_quote`, `concern`, and
`classification`: `verifiable_from_excerpt` or `requires_full_page_check`),
and `uncertainties`.

| Packets | Editorial lens |
| --- | --- |
| p41 / p12 | First-time website author unfamiliar with GitHub/Jekyll. |
| p23 / p64 | Author with an already published site wanting to add a menu link. |
| p85 / p36 | Experienced Jekyll maintainer seeking an exact option/default/version without a tutorial. |
| p57 / p78 | Search visitor wondering why a skin override leaves colors unchanged; unsure whether a concept or recipe is needed. |

After reviews finished, agents holding five responses were asked to save their
returned JSON; the editor transcribed the other three retained responses. These
artifact-saving instructions were subsequent to the read-only review itself.
