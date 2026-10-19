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
  delayed dark CSS at first paint, cross-tab
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
blank optional configuration fields in both sites, development changelog and draft release notes. Updated llms.txt,
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
chatbot tests passed locally. API details remain in implementation code and this
validation note; public guides and chatbot context focus on configuring and
using the selector. Existing llms.txt links already point to these guides.

## PR review corrections

- Initial failures of either dark stylesheet now restore the complete light
  pair without changing the saved mode. Browser tests cover each file with
  saved Dark and Auto-dark preferences, then retry successfully on reload.
- Interactive failures retain the requested mode, especially Auto, rather than
  rewriting storage. A system-driven dark failure followed by later light/dark
  changes recovers without user intervention.
- Both configuration files contain blank optional fields. No mode is configured
  for the docs deployment, which avoids conflicts with skin preview overrides.
  Blank mappings use the disabled path, including no selector includes, scripts,
  selector CSS, API or alternate stylesheet requests. This is covered by compiled
  fixtures and browser checks alongside the absent-mapping case.

Expanded browser checks, highlighter fallback checks, classic-navbar parity,
head formatting and all 80 chatbot tests passed locally. The source guidance
and selective context now describe blank settings and preserved choices after
loading failures. Existing llms.txt links remain applicable; the chatbot context
has not been deployed.

The rebuilt gem and full documentation installation check also passed with the
docs selector disabled. A separate HTML-semantics rerun hit Windows `Errno::EINVAL`
while rewriting temporary fixture files on two attempts; this is not recorded as
a pass for this revision. The existing Linux PR matrix runs that check as well.
The Linux workflow subsequently passed all jobs for `ab953355d`, including
HTML semantics on both Jekyll versions.

## CSP fallback

Ordinary light stylesheet links now remain in the enabled HTML independently of
inline-script execution. If CSP blocks the controller, the light appearance and
highlighting remain available and the selector stays hidden. With scripts
allowed, dark preferences replace those links with parser-blocking dark links
before body content is painted. This deliberately permits light CSS requests
on dark page loads as the cost of a dependable static fallback; the previous
no-light-request optimization is no longer claimed. The delayed dark first-paint
test remains, and browser coverage explicitly sends a CSP response header that
blocks inline scripts while JavaScript stays enabled.

Compiled fixtures, the expanded browser suite (all navigation styles and root
URLs, CSP, delayed dark first paint, failure recovery and disabled/blank options)
and all 80 chatbot tests passed locally for this correction. Public guidance and
selective context describe the light fallback in user terms. Existing llms.txt
links remain sufficient; context deployment remains pending. No metadata, URL,
manifest or service-worker changes were introduced.

Controls use native named buttons, a named group, pressed states and existing
Bootstrap keyboard behavior. Floating navigation retains its existing Escape
focus restoration. No animation is added. Metadata, canonical URLs and indexing
behavior are unchanged and existing metadata/routing checks pass. The docs site
has a favicon manifest but the theme adds no service worker or offline cache.
External widgets/comments, fixed custom colors and existing rendered diagrams
do not automatically change theme. No PWA installability or WCAG certification
is claimed.

## Review follow-up: browser theme color

The controller now keeps `meta[name="theme-color"]` aligned with the active
skin's explicit `vars.primary`, including the saved initial appearance,
successful interactive/Auto switches and initial CSS-failure recovery. Failed
interactive loads retain the current appearance and its metadata. If the active
skin has no explicit primary override, remove the previous skin's color hint;
when needed, create the hint on switching back. Static Light metadata remains
available without script execution. No new setting is introduced.

Verified in this follow-up: compiled Jekyll fixtures and the Chromium browser
suite pass, including classic/floating/dual navigation, root/project paths,
375/1280 px, saved preferences, Auto, both initial CSS failures and interactive
failure recovery. Added light-only and dark-only primary fixtures check metadata
creation/removal and reloads. The documentation build also passes. The 80 chatbot tests pass; selective context is
53,983/54,000 UTF-8 bytes without increasing the budget. The skin guide explains
the browser hint and unspecified-color behavior; existing llms.txt links suffice.
No live inference or Worker deployment. These checks verify metadata in the DOM,
not actual OS/mobile browser chrome or installed-app appearance. No canonical,
indexing, manifest, service-worker or offline-cache changes.

## Review follow-up: custom metadata and skin attribution

Theme-color updates now target only the theme-owned metadata marker. Tags
provided by custom head hooks, including media-specific tags, are never selected,
removed or overwritten by the controller. Light-only/dark-only primary browser
fixtures include a custom hook tag and check its value and media after switching
and reloading, alongside the managed hint's creation/removal behavior.

Move the existing attribution mapping unchanged into a skin-parameterized
include. The footer renders credits for both distinct configured built-in skins,
including providers such as Bootswatch, and emits only one credit for identical
skins. Unknown/custom names retain the existing no-built-in-credit behavior;
no new configuration or attribution catalog is added. Compiled fixtures assert
GitDev/Darkly provider credits, both selected skins, disabled behavior and
deduplication. Footer screenshots at 375/1280 px show readable credits with no
horizontal document overflow. The public skin guide and selective chatbot
summary describe both corrections; context is 53,987/54,000 UTF-8 bytes, with no
budget increase. Compiled fixtures and the full Chromium selector suite pass,
including custom metadata and light-only/dark-only colors. All 80 chatbot tests
and the documentation build pass. No
live inference, deployment, canonical/indexing, manifest or cache changes.

## Review follow-up: null-only dark variables

Reproduced the previous Liquid predicate treating `vars: { primary: null }`
as enabled. A shared include now computes activation for every navbar, the
controller, head and all selector stylesheet entry points. Null/empty/whitespace
variable values do not activate the feature; meaningful Sass values such as
`false` and `0` still do. Skin/highlighter names and enabled Autothemer also
activate it. Dark Sass generation skips blank overrides using the same value
normalization, including when meaningful settings coexist with empty fields.

Verification: nine focused activation cases pass; compiled selector fixtures
cover null maps with empty menus on classic/floating/dual, whitespace-only maps,
and mixed meaningful/blank variables. The complete Chromium selector suite
passes, including zero controller/selector/alternate-CSS requests for all new
disabled cases. Head-formatting and classic-navbar parity
checks pass. No new YAML option, public advice or context fact changes: guide 22,
llms.txt and selective chatbot context already state the all-blank-disabled rule.
No additional chatbot test/live inference/deployment was needed for this fix.
Jekyll 3 compatibility remains for the remote CI matrix; local fixtures use 4.4.1.
No SEO URLs, color metadata policy, manifest or offline behavior is changed.
