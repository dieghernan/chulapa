# Final 2.2.0 preparation — 21 October 2026

## Scope and publication status

The maintainer authorized steps 1–4: settle scope, update notes and metadata,
build the final gem and validate it. PR #171 was reviewed and merged as
`4f51bdaf1`; #177 remains excluded. Work is local on
`codex/release-2.2.0-final`. The maintainer subsequently authorized committing,
pushing and opening the preparation PR; publication remains separate.
No tag, RubyGems upload, GitHub release, manual deployment or live inference.

The files are staged for publication in wording only: version data and the HTML
marker target v2.2.0; CHANGELOG uses the proposed date 2026-10-21. This record does
not establish that v2.2.0 is published. If publication happens later, update the
date, rebuild and reverify the artifact. Do not invent a next development version.

## Final artifact

File: `chulapa-jekyll-2.2.0.gem` (ignored local build output).
SHA256: `8180b09f720ef92bcc6d4f55ac94d6397a45b3f11281a0b3159b7924009d3d5f`.
All 450 extracted package files match their working source bytes. Package
selection includes pinned vendor sources/licenses and excludes documentation,
planning, tests, examples and AGENTS.md. No skin/runtime code was changed for
this preparation; the head include changes only the version comment.

## Checks

- Gem build succeeds; the existing unspecified Ruby minimum warning remains.
- Final artifact installed-gem validation on Jekyll 3.10.0: passed.
- Final artifact installed-gem validation on Jekyll 4.4.1: passed.
- Selector fixture generation passes; Chrome passes all seven enabled
  navigation/root cases, covering desktop/mobile, Light/Dark/Auto, persistence,
  initial load, tabs, keyboard, CSS failures and no-JavaScript fallback.
- Light and dark fixture screenshots inspected at 390px and 1280px; no horizontal
  overflow. External fonts/icons were blocked in these local captures; they do
  not establish live external-resource availability or every skin's contrast.
- Chatbot: all 80 local tests pass. Context is 53,865 bytes of the 54,000-byte
  budget. Active evaluation expectations and retrieval assertions target 2.2.0;
  historical evaluation results are unchanged. No answer-quality claim follows.
- Changed JSON catalogs parse; stale candidate labels checked in active public
  documentation; whitespace validation passes.

Installed-gem commands run from `test/`, setting `BUNDLE_GEMFILE` to
`installation/Gemfile` or `jekyll3/Gemfile`, then running
`bundle exec ruby check_theme_installation.rb`. These cover package boundaries,
root/project pagination, canonical/OG URLs, sitemap, structured data and complete
documentation builds. Both completed successfully on the final artifact hash.
Existing Sass deprecation warnings remain on Jekyll 4. Final logs use `chulapa-release-verified-install4.log` and
`chulapa-release-verified-install3.log` in the local temporary directory.

## Documentation, accessibility, SEO and PWA

Updated README, installation/migration/version guides, affected feature guides,
demos, skin catalog, examples, llms.txt and selective chatbot context to target
2.2.0. Retained v2.1.0 compatibility warnings. Release notes include changes
through #176 and the upgrade requirements for CSS pairs and comment mappings.
No new page or public URL is introduced.

Known accessibility limitation retained: the optional selector toggle removes
its keyboard focus outline and shadow. This is explicit in release notes, the
accessibility reference and chatbot context. Sites needing visible focus must
supply a local CSS override or leave the optional selector disabled. Browser
keyboard-operation passes are not visible-focus certification for that control.
Other skin/component contrast exceptions remain; no WCAG certification.

SEO: no metadata-generation or routing implementation changes; installed-gem
checks exercise canonical URLs, OG URLs, sitemap and JSON-LD at root/baseurl.
The docs favicon manifest has 192px/384px icons and standalone display, but no
explicit start_url/scope or 512px icon. No service worker or offline cache is
present; no installability/offline claim or new caching strategy. HTTPS and
live network-dependent integrations were not tested in this local preparation.

## Remaining publication steps

Review the preparation PR and known focus limitation, verify CI for that source,
then separately publish
the tag, exact gem and GitHub release. Updated context remains undeployed;
verify matching Pages and Worker rollout after publication. Existing Netlify
preview failures are not claimed resolved. Old artifact hashes are historical.
