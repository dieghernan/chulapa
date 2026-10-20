# Bootswatch sources

Unmodified Sass from thomaspark/bootswatch tag v4.6.2, commit
57980884525efb94836d88a5f59d5db9c5e8bbf0, distributed under the included MIT license.
Source: https://github.com/thomaspark/bootswatch/tree/v4.6.2/dist

Cerulean, Litera and Pulse keep their original variables and component styles.
The skin entrypoints import the original variables and wrap the component styles
in `chulapa-bootswatch` so Chulapa can emit them after its single Bootstrap import.
Cerulean's original helper declarations remain at top level because Sass forbids
nested mixin definitions. No original palette or component rule is adjusted. Empty button-correction maps
and Bootstrap’s original 150 YIQ fallback (Litera retains its explicit 190)
keep optional autothemer imports from applying unrelated palette corrections.
`source.json` records source hashes; the integration check validates both original
files and the deferred wrappers, and compares rendered components against a
reference compiled directly from these sources on the theme's Bootstrap base.
