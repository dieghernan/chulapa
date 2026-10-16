# Appearance documentation navigation pilot

Extension of PR #147, 16 October 2026. Public deployment pending merge.

## Scope and selection

Enable existing tags, tag badges and related cards on appearance Reference 03
and guides 22 through 28. No blog posts, theme templates or algorithms change.
Use shared `docs` and `appearance` tags because the existing selector requires
two shared tags within the collection; add skins, colors, fonts and
code-highlighting subtopics to rank closer matches. Existing inline task links
remain the primary precise routes. Tie order follows the current date-based
selector; these are automatic suggestions, not a prescribed learning sequence.

Badge links use the existing cloudtag layout at `/docs/tags`, restricted to the
docs collection. The blog tag index excludes documentation. The docs index links
the new partial topic index, which explicitly states its coverage is partial.
All front matter uses supported options; no new configuration mechanism.

## Verification

- All 54 checked documentation card/tag destinations and fragments resolve.
- Full Jekyll 4.4 build from `docs/` succeeded using its configured remote theme.
- Edge headless rendering of all eight pages at 320 and 1280 pixels: three
  related cards on each, tag links present and no document horizontal overflow.
- Desktop/mobile screenshots of guide 23 inspected: cards form a row on desktop
  and stack on mobile; titles and descriptions remain readable, without dates.
- Guide 23 recommends appearance Reference, Autothemer and precedence; guide 27
  recommends Reference, precedence and color editing. All observed cards stay
  within the appearance pilot. Fonts/highlighting have two close matches and a
  broader skin guide as their third result; relevance is useful but not curated.
- UTF-8 decoding and new mojibake marker checks pass. Guide bodies are unchanged,
  accounting for Git line-ending normalization. `git diff --check` passes.

Existing native links, headings and styles are reused. This is a bounded reflow
review, not an accessibility certification. Canonical guide URLs and metadata
are unchanged; the topic index adds an internal public route. No manifest,
service worker, caching or offline behavior changes or PWA-readiness claim.

`llms.txt` adds the partial topic index. The selective chatbot context and
appearance/related evaluation cases were reviewed: no theme facts, settings,
canonical advice or existing citations change, so context, tests and Worker
deployment are unnecessary. No changelog entry: this is a documentation-only
navigation pilot, with no reusable-theme behavior change.
