# Automatic skin text contrast — draft

The YIQ threshold can choose unreadable text, notably on Minty's pastel
backgrounds and Electro's warning/danger colors. Preserve each palette and
its preferred YIQ text when it meets WCAG 4.5:1, otherwise try the other
configured text color, then black/white. Translucent backgrounds retain the
legacy choice because their backdrop is unknown.

## Implemented

- Guard `color-yiq()` centrally; callers include buttons, badges and selected
  form states. Retain legacy Sass syntax for the SassC/Jekyll 3 toolchain.
- Independently check all eight base colors across 42 skins and the auto
  generator, plus all 256 grayscale luminances and fallback cases.
- Document unreleased behavior and add a chatbot evaluation case.

## Remaining before marking ready

- Inspect rendered buttons/badges at desktop and narrow widths, including
  hover, active, disabled and focus states. Automated base-color checks are
  not evidence for these states or a whole-page accessibility audit.
- Audit skin-specific CSS overrides (for example Navi's white primary card
  text) that bypass `color-yiq()` and other manually assigned component text.
- Verify legacy SassC and Jekyll builds; Ruby is unavailable in this workspace.
- Measure full-site Sass build time: contrast calculations add compilation
  work, particularly in skins which import Bootstrap themselves.

No URLs, metadata, manifests, service workers or runtime scripts change;
SEO and PWA behavior is unaffected. The chatbot context is updated locally,
not deployed. llms.txt already links the custom-skin guide; no new page or
link is needed. No new YAML settings are introduced.
