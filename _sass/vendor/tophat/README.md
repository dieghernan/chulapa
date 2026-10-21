# TopHat source integration

Each `theme.scss` and `LICENSE` is a verbatim copy from
[ThemesGuide/top-hat](https://github.com/ThemesGuide/top-hat) at the commit in
`source.json`. The manifest records the original Bootstrap version, source path
and SHA-256. All twelve existing TopHat skins are covered. Chulapa's Hootstrap
maps to upstream Hollar; no skin identifiers change. No example layout CSS is
included.

Regenerate the integration files after updating a pinned original:

```sh
node test/generate_tophat.js
node test/generate_tophat.js --check
```

The adapter omits upstream Google Fonts imports (wrappers keep their existing
font URLs), the grid-disabling flag and the second Bootstrap import. Variables
become defaults, allowing retained Chulapa colors and predeclared site palette
variables. For Deeply, later dark-variable assignments keep their original order
after Bootstrap variables. Other skins resolve Bootstrap variables through the
normal Chulapa pipeline, as before. Original component styles run after the
single Bootstrap import.

Wrappers under `_sass/skins/` retain palette/font differences. Components,
Chulapa variables and reviewed contrast corrections live separately under
`_sass/chulapa/skins/`. Two existing typography choices are explicit: Minco uses
Bootstrap's body font rather than upstream Nunito; Mickie's responsive root
font-size rules remain omitted, as in the previous Chulapa implementation.
These adaptations do not modify the retained upstream files.

`test/fixtures/tophat-legacy/` records independent pre-migration implementations
from `0458afc` (Deeply) and `c698197` (the others). The regression compares all
compiled CSS except the relocated original Deeply navbar rule, then compares
rendered components at mobile/desktop widths with Autothemer off/on, including
hover, focus, active and disabled states. Custom palette overrides are checked
for every skin. Default appearance and accessibility corrections are unchanged;
this migration changes no HTML, metadata, routes or PWA behavior.
