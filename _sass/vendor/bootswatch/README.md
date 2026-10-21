# Bootswatch sources

Unmodified Sass from thomaspark/bootswatch tag v4.6.2, commit
57980884525efb94836d88a5f59d5db9c5e8bbf0, distributed under the included MIT license.
Sketchy retains v4.5.0 at 2a3e1c5ff57f200164d123ae0bfeeb32b0045a20 with
its own retained MIT license (`LICENSE-4.5.0`).
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

## Existing Chulapa adaptations

Cyborg, Darkly, Flatly, Journal, Lux, Materia, Minty, Sketchy, Slate, Solar,
United and Yeti retain their reviewed Chulapa palettes, font URLs, component
adjustments and contrast corrections. Their differences from the pinned original
variables and component styles are explicit unified patches under
`_sass/chulapa/skins/bootswatch/`. The adjacent Sass is generated from those
originals plus the patches. Theme users need no build tools or new settings.

```sh
node test/generate_bootswatch.js
node test/generate_bootswatch.js --check
CHULAPA_CHROMIUM=/path/to/chromium node test/check_bootswatch_adaptations_browser.js
```

For an intentional adaptation, edit the patch against the concatenated original
`_variables.scss` and `_bootswatch.scss` (trailing whitespace/newlines at the end
of each file are trimmed before concatenation), then regenerate. The generator
checks source hashes and applies each hunk exactly; it does not use fuzzy matches.
Do not edit the generated Sass or retained upstream sources directly.

These older integrations keep component rules before Chulapa's final Bootstrap
import, matching their established cascade. Former inner Bootstrap imports now
load only functions, variables and mixins; the theme emits Bootstrap once.
Moving these component rules after Bootstrap would change the existing design.
The three original integrations above continue to defer their original rules.
Sketchy retains its 4.5.0 base and United keeps its existing subset of styles.
This change does not adopt Bootstrap 5 or add any new skins.

Independent legacy fixtures in `test/fixtures/bootswatch-legacy/` record the
implementations at `3278655`. Regression tests compare complete deduplicated CSS,
then compare rendered styles against the unmodified legacy CSS at 390/1280px,
with Autothemer off/on and normal, hover, focus, active and disabled states.
Configured palette colors are compared before and after the skin import against
the old implementation. Existing early theme-color resolution and Sketchy's
unconditional palette assignments are retained; this refactor does not change
which palette overrides each skin supports. Default accessibility corrections,
metadata, routes and PWA behavior are unchanged.
