# Conservative default-layout semantics review

Date: 19 October 2026. Baseline: main `f82a9a796d5f50d3e91d90d6a76317f41b4df976`,
after merged #169. Status: implementation proposed in a new PR; not merged.

## Confirmed findings and minimal decisions

- Rendered Previous links have `tabindex="-1"` even when a previous post exists.
  Missing neighbors still generate anchors hidden by CSS. Available neighbors
  now use ordinary links; missing neighbors are noninteractive placeholders that
  retain the existing spacing. No navigation landmark is emitted when neither
  neighbor exists. First/middle/last post fixtures verify actual destinations.
- The page header is valid outside main/article, but Chromium exposes it as a
  banner at the document level. Put that existing header inside the single main
  with its body, keeping the full-width header and existing inner Bootstrap grid.
  The entry wrapper still associates `p-name` and `e-content` for microformats.
  The article remains the body column; no duplicated heading, ARIA label or
  move of main inside article is needed. The existing skip-link focus sentinel
  is immediately before this content and remains unchanged and operational.
- `article.e-content` formerly included the theme sidebar toggle, sidebar and
  integrated TOC. Move only the property to a body wrapper inside the same
  article; keep theme TOCs outside it, in their current visual positions.
  Authored lists and authored Markdown TOCs stay in the body and are preserved.
- Keep the `layout.chulapa_microformats_feed` distinction. All built-in default
  listing descendants (archive, indexcategory, cloudtag/cloudcategory and both
  aliases) remain feeds with dated child entries. No feed container gains an
  article or entry-content property.

## Boundaries retained

The existing sidebar already has `inert`/`aria-hidden`; do not change that
implementation. Browser checks exercise opening, following a heading link and
Escape from a sidebar control. Following a link can focus content outside the
nonmodal sidebar; Escape is tested with focus back inside its existing controls,
not assumed to be a global dismissal shortcut.

Landingpage inherits minimal rather than default and is outside this change;
minimal/custom entry wrappers also retain their contracts. Existing microformats
regressions cover them. Multiple header/footer elements were not treated as
intrinsically invalid: native browser roles were inspected. No new dependency,
option, theme JavaScript, JSON-LD, taxonomy or editorial content is introduced.
No personal-site customization is copied.

## Executed verification

- New real-Jekyll fixtures pass with 4.4.1 and 3.10.0: ordinary page, post
  first/middle/last neighbors, theme TOCs, authored Markdown TOC and all six
  built-in feed descendants. No HTML5 parser repairs or duplicate IDs.
- Existing HTML-semantics tests pass on both Jekyll versions (headings, main,
  native structure, IDs, navigation names and code whitespace).
- Existing microformats feed regressions pass on both versions, including
  multi-layer inheritance, aliases, empty feeds and pagination at root/subdir.
  Existing entry microformats tests also pass locally on Jekyll 4.
- Independent `mf2py 2.0.2` parses both versions' generated fixtures. Entry names
  and canonical URLs are retained; content contains both headings, paragraphs,
  source link, authored list and preformatted whitespace, without theme TOCs or
  controls. An authored `markdown-toc` remains. Six feeds retain names/URLs and
  all three dated child entries, without content/publication properties leaking
  to the container. Parser installed only in a temporary validation environment;
  no theme or project dependency manifest changes.
- Chromium at 375/1280 px: Tab reaches both available Previous/Next controls;
  first/middle/last counts are correct. Skip is the first stop and Enter focuses
  the unchanged sentinel. Sidebar inert/open/Escape behavior passes. Accessibility
  trees show one main and one contentinfo; the scoped page header is no longer
  a document banner. No overflow. Across eight before/after page/feed fixtures,
  title/body/first-heading positions and widths remain within one pixel.
- Desktop/mobile default screenshots inspected. The isolated browser uses local
  CSS/JS and blocks external resources; external icon/font rendering is not
  certified by these screenshots. No screen-reader session or full WCAG audit.
- Eight before/after fixtures retain identical document title, canonical,
  robots and JSON-LD nodes. No URL, manifest, service-worker or cache changes;
  there is no new offline/PWA capability.
- Documentation build passes with its configured remote theme. Changed runtime
  is exercised by the copied-source fixtures above, not inferred from that
  remote-theme build. Existing Sass deprecation warnings remain.

The Ruby regression is picked up by the existing Jekyll 3/4 runner; browser CI
also builds its fixtures and runs the new keyboard/role/responsive checks.
The real-parser script is an optional reproducible local check documented in
`test/README.md`; it does not add a product dependency.

## Documentation and release handoff

Update Layouts Reference, accessibility Reference and the unreleased changelog.
Existing llms.txt destinations remain appropriate. Selective chatbot context
still accurately describes default entry wrappers, listing feeds and sidebar
behavior; these structural corrections require no new user configuration or
recipe, so no context expansion, chatbot test or live inference is needed.
No Worker deployment or release publication.

This is an independent, demonstrated runtime correction, not renewed Diátaxis
extraction. If merged into the 2.2.0 scope, the candidate recorded after #168
becomes historical validation for its older runtime. Rebuild and validate the
next candidate before final publication; do not transfer its artifact hash.
