# Optional skin selector for issue #165

## Behavior and scope

The Light/Dark/Auto dropdown follows the icon/text UI on dieghernan.github.io.
It is shared by classic, floating and dual navigation, including empty menus.
`chulapa-skin-dark` is the only new setting: the existing mapping can describe
only one compiled skin, so a second mapping is necessary for the alternate skin.
Dark highlighting inherits the normal highlighter when omitted, then `default`.
Other skin settings remain independent. Existing sites process no new selector
includes and load no selector script/styles or alternate stylesheets unless the
mapping is enabled. The optional Sass assets are packaged but not requested by
disabled sites.

The head selects parser-blocking stylesheets before the first paint. Later
switches keep the previous pair until both replacement sheets load and retain
the custom stylesheet's cascade precedence. Storage failures leave current-page
switching usable. Choices use the prototype's `chulapa-theme` origin-wide key.
Alternate main CSS lives in `assets/css/dark/` so its Sass imports cannot resolve
to the documentation's skin preview entrypoints, which contain Jekyll front matter.

## Local validation on 18 October 2026

- All 33 Ruby regression checks passed on Jekyll 4.4.1.
- Compiled fixtures cover all navigation styles, empty menus, unique IDs,
  accessible names, independent Sass overrides, dark highlighter inheritance,
  root/subdirectory URLs and disabled output.
- Actual Edge/Chromium browser checks passed at 1280px and 375px for all three
  navigation styles with/without links, plus root URLs and disabled mode.
  Coverage includes Light/Dark/Auto, system preference changes, saved dark mode
  without light stylesheet requests, delayed dark CSS at first paint, cross-tab
  updates, keyboard/dropdown/Escape focus, CSS failure, blocked storage and no JS.
- Visually inspected the reference and the local dark dropdown on desktop/mobile.
  Theme-aware active-control colors preserve the icon/text UI and visible focus.
- Built the gem and passed installed-gem, pagination, sitemap and full
  documentation checks, including the enabled docs-site selector.
- All 80 local chatbot tests passed, including focused context retrieval.
- Git whitespace checks passed. Jekyll 3 compatibility remains covered by the
  existing PR CI matrix rather than a local Jekyll 3 installation.

## Documentation, accessibility, SEO and PWA

Updated the skin task, theming reference, README, commented config example,
docs-site demo, development changelog and draft release notes. Updated llms.txt,
the selective chatbot context and community evaluation case. The reviewed context
library budget increases from 53,000 to 54,000 bytes for the new setting and its
constraints; the per-request selected-context limit remains 18,000 bytes.
The context has not been deployed and no live inference evaluation was run.

Follow-up hardening preserves `window.chulapaSetThemeMode()` for custom controls.
The API validates modes, persists preferences and updates selectors without
rereading storage. Browser coverage verifies a single initialization read,
invalid requests, missing toggle/icon/label nodes, missing stylesheet links and
stylesheet removal while a replacement is loading. Requests without the managed
pair are ignored; changes made by custom scripts during loading are retained.
The API is absent on disabled sites. The expanded browser suite and all 80
chatbot tests passed locally. The theming reference and selective context cover
the API; existing llms.txt links already point to these guides.

Controls use native named buttons, a named group, pressed states and existing
Bootstrap keyboard behavior. Floating navigation retains its existing Escape
focus restoration. No animation is added. Metadata, canonical URLs and indexing
behavior are unchanged and existing metadata/routing checks pass. The docs site
has a favicon manifest but the theme adds no service worker or offline cache.
External widgets/comments, fixed custom colors and existing rendered diagrams
do not automatically change theme. No PWA installability or WCAG certification
is claimed.
