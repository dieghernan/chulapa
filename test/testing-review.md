# Test coverage review

Reviewed on October 12, 2026 against the working theme and documentation chatbot.

## Assessment

The suite gives strong regression protection for metadata, feed selection,
Liquid indexes, recommendation eligibility, cache isolation and installation.
It combines real Jekyll builds with focused JavaScript tests and generated-page
browser checks. A passing suite does not establish complete branch coverage,
HTML conformance or accessibility for arbitrary site content.

## Gaps addressed

| Gap | Regression protection added |
| --- | --- |
| DOM class stubs could not verify clipboard feedback or cleanup | Stateful classes and controlled timers in [check_chulapa_script.js](check_chulapa_script.js#L201) verify success/failure labels, colors and restoration without waiting a second. |
| Code preparation could interfere with Mermaid or existing highlighted blocks | [check_chulapa_script.js](check_chulapa_script.js#L77) covers missing heading IDs, plain `pre` blocks, distinct copy targets and all three Mermaid markers with rendering enabled and disabled. |
| Mermaid tests covered parsing failures but not rendering failures or font readiness | [check_mermaid.mjs](check_mermaid.mjs#L87) verifies source preservation, continued rendering of later diagrams and waiting for fonts. Expected warnings are scoped to each test. |
| Chatbot recovery did not cover request timeouts or transport/JSON failures | [widget.test.mjs](../docs/ai-chatbot/widget.test.mjs#L179) verifies abort, preserved failed questions, restored controls, timer cleanup and no spurious answer. Timers are advanced explicitly. |
| CI browser coverage omitted some skins, narrow reflow, actual dropdown keys and no-JavaScript navigation | [check_navigation_browser.js](check_navigation_browser.js#L55) now exercises six skins at 320, 390 and 1280 px, real Bootstrap dropdown interaction and static fallback links. |
| HTML4 parsing could repair invalid markup silently; footer indentation and navigation names were not checked | [check_html_semantics.rb](check_html_semantics.rb#L54) rejects HTML5 parser errors and checks landmarks, headings, IDs, ARIA references, alt attributes and generated head/footer indentation. |
| Footer comment checks silently repaired an unclosed Cactus container | [check_footer_comments.rb](check_footer_comments.rb#L16) now rejects HTML5 fragment errors for all four built-in providers. The missing Cactus closing `div` is fixed. |
| The installation-only bundle lacked Windows timezone data for the documentation build | [installation/Gemfile](installation/Gemfile) now includes `tzinfo-data` on Windows. The dependency is confined to the test bundle. |

The HTML check exposed unnamed sidebar and footer navigation. Both now have
accessible names, and footer links use a native `nav`. Fixed footer content uses
two spaces per nesting level in the generated document. Blank-line compression
preserves the head and theme footer; the remaining body keeps its existing
compression behavior. Explicit full compression remains supported.

The missing Cactus closing tag is also checked in complete browser fixtures and
in the installed-gem fixture at root and subdirectory URLs. This prevents the
fix from being verified only against an isolated include.

## Remaining priorities

1. Search behavior needs dedicated regressions. The existing
   [highlighting security check](check_highlighting_security.js#L22) exercises
   documentation skin selectors, not the search `highlight` functions in
   [Lunr](../assets/js/lunr/lunr-search.js#L10) and
   [Fuse](../assets/js/fusejs/fusejs-search.js#L10). Add known input/output cases
   for unsorted and overlapping ranges, HTML attributes, empty results and
   non-ASCII queries, followed by tests of actual result rendering.
2. [Deferred YouTube playback](../assets/js/ch_ytdefer/ch_ytdefer.js#L8) is covered
   by generated metadata checks, but player setup and clicks are not executed
   by the current suite. Test multiple videos, missing configuration and API
   availability using a stub at the YouTube API boundary.
3. [404 suggestions](../assets/js/better404/better404.js#L61) need execution tests
   for empty/invalid sitemap responses, failed requests and subdirectory URLs.
4. The browser runner uses Chromium. Firefox/WebKit, screen readers, real
   comment providers and production CDN behavior remain outside these checks.
   Fonts and icons are blocked during offline browser tests, so those runs do
   not validate their appearance. Embedded comment integrations and custom
   includes retain their own formatting.
5. HTML5 parsing is a structural check, not a full conformance validator. Keep
   a separate HTML validator review for content models and advisory messages;
   see the earlier [head validation record](head-formatting-validation.md).

Some Liquid performance tests deliberately instrument filters to establish
cache reuse and sampling-pool sizes. Keep their output assertions alongside
the instrumentation. The isolated ranking check in
[check_related_ranking.rb](check_related_ranking.rb#L25) slices template source
and repeats the same ranking logic under two component names; its surrounding
full-component tests provide better refactoring protection. Consolidating that
source-level check is a lower-priority maintenance improvement.

## Documentation

The layout guide, accessibility guide, development changelog, chatbot context
and formatting evaluation case describe the changes. `llms.txt` already links
the affected guides; no new page or entry is needed. The updated chatbot context
has not been deployed, and no live inference evaluation was run.

## Validation

| Check | Result |
| --- | --- |
| Ruby regression runner | All 26 scripts passed with Jekyll 3.10.0 and 4.4.1. Compression, HTML semantics and footer checks were rerun after their final changes. |
| Theme JavaScript | All 31 tests passed, up from 19. |
| Documentation chatbot | All 33 tests passed, up from 29, including the current bundled context. |
| Generated browser fixtures | All eight fixture variants built; complete Cactus pages passed HTML5 parsing. |
| Browser navigation | Passed in Microsoft Edge through Playwright's Chromium API, with six skins at 320/390/1280 px, dual/classic navigation and seven no-JavaScript variants. |
| Installed gem | Root/subdirectory Cactus markup, locale, pagination, sitemap and complete documentation builds passed on Jekyll 3 and 4. |
| Patch whitespace | `git diff --check` passed. |
