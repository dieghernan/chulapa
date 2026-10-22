# Post-release verification — 22 October 2026

## Published release and installation

GitHub tag `v2.2.0` resolves to `4de2222da465f6492604fff99140c1b6f7d82b74`.
GitHub release published 21 October 2026 at 18:19 UTC; RubyGems publication
followed at 18:21 UTC. Downloaded RubyGems artifact SHA256 matches the final
validated candidate:
`8180b09f720ef92bcc6d4f55ac94d6397a45b3f11281a0b3159b7924009d3d5f`.
That downloaded gem installs in isolation as `chulapa-jekyll-2.2.0`, with the
expected HTML release marker. The existing Jekyll 3/4 installed-gem evidence
applies to these same artifact bytes; the released gem was not rebuilt.

## Delivered follow-up

Both repositories were fetched and fast-forwarded on main before editing.
`chulapa-101` commit `e3a4c508fff1d48571796ba7cb0f89532ba03242` pins the remote
theme to v2.2.0 and updates obsolete version, skin and workflow descriptions.
Existing Butterfly/Butterfly Dim settings are preserved. No new YAML option.
A real remote-theme build with `/chulapa-101` succeeds. JSON-LD parses; canonical,
sitemap, selector and paired light/dark main/highlighter CSS are present.
Pages run [39726760700](https://github.com/dieghernan/chulapa-101/actions/runs/39726760700)
succeeds for that exact commit. Live homepage returns HTTP 200 and the v2.2.0
marker. Live Chrome light/dark captures at 390px and 1280px show no horizontal
overflow; representative screenshots were visually inspected.

Chulapa source `125de32d67047b92725ea2040038e981ba623f7c` removes all four pending
publication notices, updates the first-site guide, llms.txt, chatbot context and
the affected evaluation expectations. All 86 chatbot tests pass locally and in
CI. Matching Pages run
[39726789476](https://github.com/dieghernan/chulapa/actions/runs/39726789476)
and Worker run
[39726789342](https://github.com/dieghernan/chulapa/actions/runs/39726789342)
succeed. Worker logs identify source above and version
`fcb9e885-6684-4460-9cbd-3345702337e7` after the matching-Pages gate.
Four public installation/migration/starter/remote-theme guides return HTTP 200
without pending notices; public llms.txt identifies the published release.
Widget GET returns HTTP 200. HEAD is not supported by the widget route and is
not an availability check. A later evidence-only commit does not change this
context or Worker runtime; its workflows are separate from this exact-source
verification. Full browser/Jekyll regression CI was still running when this
record was written; it is not claimed completed here.

## Focused live answer review

Raw evidence: [two requests](postrelease-220-20261022-125de32d6.jsonl).
Both requests returned HTTP 200; answers were read for factual content and links.

- `version-task-1`: correctly says v2.2.0 is published, recommends @v2.2.0 and
  distinguishes the HTML marker from exact commits/local overrides. Links point
  to the version and remote-theme guides. It does not mention Gemfile.lock in
  the short next-steps list; this is not a complete troubleshooting walkthrough.
- `starter-2`: correctly identifies the pinned version, Butterfly/Butterfly Dim,
  three posts, content locations, pagination and separate minimal examples.
  Links point to the first-site and starter-example guides. It omits optional
  hooks and an explicit description of the color-mode control. The instruction
  to edit existing posts belongs to the first-site tutorial, not a restriction
  on creating future posts. Treat this as correct core facts with omissions,
  not complete coverage of every expected detail.

These observations establish the two sampled release/template answers only.
Known content-TOC and guide-discovery limitations were not re-evaluated. No
broad accuracy or usability claim follows from deployments or these samples.

## Accessibility, SEO and PWA limits

This follow-up changes documentation and pins an already configured theme.
No control, style, page URL or metadata implementation changes. Selector visible
focus and skin contrast limitations remain documented; switching/reflow checks
are not WCAG certification. Starter canonical and JSON-LD checks passed.
The starter homepage has no manifest link. Documentation has a favicon manifest;
neither site gains a service worker/offline cache from this release. No PWA
installability/offline claim. External comment posting/migration and other live
integrations were not exercised. No tag was moved and no new gem was uploaded.
