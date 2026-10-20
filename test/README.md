# Test site

This directory contains a Jekyll demo site and regression checks for the theme.

## Preview the site

From the repository root:

```powershell
cd test
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000. Jekyll rebuilds the site when its source files
change; refresh the browser to see the result. Stop it with Ctrl+C. Restart
when changing the theme's own files outside `test`.

The Gemfile selects the root gemspec explicitly, avoiding old copies under
`_site`. If an existing lockfile still selects an old version, run
`bundle update chulapa-jekyll` once before starting the server.

On this Windows/Ruby 3.4 setup, `--livereload` fails because EventMachine's
native extension does not load. The normal server works without that option.
The test configuration already has an empty `baseurl`, so no CLI override is
needed.

## Regression checks

Run all self-contained Ruby checks (each in an isolated process):

```sh
cd test
bundle exec ruby run_regressions.rb
```

The HTML semantics check covers labelled comment fields, named collection
thumbnail links, current navbar destinations, search landmarks and statuses,
list headings and conditional author landmarks. Browser checks additionally
exercise native dropdown/carousel buttons with Enter and Space, dynamic search
headings, result-count updates and clearing. They also cover closed-sidebar
focus exclusion and Escape, 200% text at 320 CSS pixels, carousel pause/start
and preference changes, indicator keyboard access/targets and video names.

The runner discovers `check_*.rb` automatically. Packaging is a separate CI job
because it requires a freshly built gem and an installation-only bundle.
`check_pwa_assets.rb` renders the documentation head and verifies its manifest
and locally published PNG icons against configured HTTPS/baseurl URLs and
actual dimensions; this does not certify installability or offline support.
See [closed issue regression coverage](closed-issue-regressions.md) for the
mapping from reported bugs to focused checks.
See the [test coverage review](testing-review.md) for strengthened checks and
remaining priorities.

Run the checks from the repository root after `bundle install`:

```sh
bundle exec ruby test/check_microformats_feeds.rb
bundle exec ruby test/check_seo_fixes.rb
bundle exec ruby test/check_head_metadata.rb
bundle exec ruby test/check_head_formatting.rb
bundle exec ruby test/check_html_semantics.rb
bundle exec ruby test/check_fontawesome_kit.rb
bundle exec ruby test/check_skins_grid.rb
bundle exec ruby test/check_social_metadata.rb
bundle exec ruby test/check_article_metadata.rb
bundle exec ruby test/check_article_images.rb
bundle exec ruby test/check_microdata.rb
bundle exec ruby test/check_related_ranking.rb
bundle exec ruby test/check_cloud_performance.rb
bundle exec ruby test/check_include_cache.rb
bundle exec ruby test/check_cloud_dates.rb
bundle exec ruby test/check_footer_comments.rb
bundle exec ruby test/check_comment_adapters.rb
bundle exec ruby test/check_index_order.rb
bundle exec ruby test/check_liquid_indexes.rb
bundle exec ruby test/check_skin_variables.rb
bundle exec ruby test/check_feed_selection.rb
bundle exec ruby test/check_liquid_fallbacks.rb
bundle exec ruby test/check_compress_html.rb
bundle exec ruby test/check_video_examples.rb
node --test test/check_chulapa_script.js test/check_mermaid.mjs test/check_photoswipe.mjs test/check_highlighting_security.js
bundle exec ruby test/check_mermaid.rb
bundle exec ruby test/check_photoswipe.rb
bundle exec ruby test/check_goatcounter.rb
```

The Ruby checks build temporary fixtures or inspect theme sources to verify
metadata and video examples. The JavaScript check exercises the theme script.
They do not require deployment of the demo site.

The theme regression workflow runs all self-contained Ruby checks on every PR
and push to `main`, using both Jekyll 3 and 4, plus the JavaScript tests on Node 22.
Separate jobs install the built gem on both Jekyll versions and exercise real
keyboard navigation in Chromium. The skin-variable check covers two palettes
on `none`, Navi and GitDev Dark, with autothemer enabled and disabled. It verifies
both explicit overrides and an unset palette color that autothemer must derive.
`check_liquid_indexes.rb` builds real collections and static files with deliberately
different filename, title, date and numeric orders. It checks ascending and
descending settings, default/explicit/zero limits, collection selection, empty
results, cached gallery variants and root/subdirectory URLs. Random selections
are checked for membership, uniqueness and full-pool sampling without requiring
a particular draw. Inherited configuration and explicit `false` page overrides
are checked, as are carousel indicators, control targets and intervals.
It also verifies archive/cloud date order, tag/category counts, repeated
collections and empty results using real Jekyll documents. Tag and category
fixtures deliberately use different labels, counts and memberships so one field
cannot accidentally substitute for the other.
`check_include_cache.rb` verifies that cloud entries reuse Markdown and reading
time work across labels and fields, while retaining collection badge variants.
It also checks that fixed footer content renders once per build, comments stay
specific to each page and a subsequent site build refreshes URLs, skin credits
and copyright.
The cache checks also rebuild the same site after document edits and cover
locale and reading-speed changes. `check_footer_comments.rb` exercises real
Disqus, Cusdis, Cactus and Welcomments templates with distinct page inputs and
disabled comments; the cache fixture covers a custom Giscus include.
Recommendation checks cover empty and singleton pools with hashes and real
Jekyll documents, and avoid requiring a particular order for equal-date ties.
They also exclude cross-collection candidates with only two shared tags. Cache
checks vary the reading speed for the same document within one render and change
comment IDs and titles while retaining the same page URL, so incomplete cache
keys cannot hide behind distinct documents, URLs or build resets.
The JavaScript checks cover floating navigation state, Escape, focus restoration,
dropdown interaction and responsive closure, alongside clipboard, Mermaid and
highlighting regressions. These state checks do not replace browser layout or
screen reader audits.

`check_html_semantics.rb` inspects complete generated documents with an HTML5
parser rather than relying on an HTML4 parser's repaired tree. It covers seven
content layouts and search with five providers or no provider, three navbar styles and
root/subdirectory URLs. Checks include parser errors, main landmarks, page
headings, named navigation, unique IDs, resolved ARIA references, image alt
attributes, generated head/footer indentation and preserved code whitespace.
This is a focused regression check, not a complete HTML conformance validator.

To check packaging, install the built gem in a temporary directory and build
the test site and complete documentation site from that installation:

```sh
gem build chulapa-jekyll.gemspec
BUNDLE_GEMFILE=test/installation/Gemfile bundle install
cd test
BUNDLE_GEMFILE=installation/Gemfile bundle exec ruby check_theme_installation.rb
```

The built artifact is checked for leaked planning, documentation, test, example,
automation and agent-instruction files.

This also checks generated pagination, canonical URLs and sitemap entries in
root and subdirectory deployments. It does not install the theme globally.
The installation Gemfile intentionally omits the local theme dependency; use
`jekyll3/Gemfile` instead to check the installed gem with Jekyll 3.

## Liquid build benchmark

See the [personal site validation](personal-site-validation.md) for a comparison
using a real site with its customized homepage, local layout and custom includes.

From `test`, run `bundle exec ruby benchmark_liquid_build.rb`. Optional theme
directory arguments compare multiple checkouts with the same generated fixture.
The fixture has 100 documents with 20 tags and three categories each, plus 100
footer pages. Each theme gets a warm-up build and three measured complete builds;
the script reports individual times and their median. Include caches are cleared
by the plugin at every build, so warm-up does not preserve rendered includes.
This targets repeated index entries; it is not a prediction for every site.
On this Windows/Ruby 3.4 setup with Jekyll 4.4.1, a local comparison against
`c3cab02bf` measured medians of 2.23 s before and 1.03 s after the cache changes.
Build times depend on the machine, content and integrations.

## Browser navigation regressions

From the repository root, install the isolated test tools and build fixtures:

```sh
npm ci --prefix test/browser
test/browser/node_modules/.bin/playwright install chromium
cd test
bundle exec ruby build_accessibility_fixtures.rb /tmp/chulapa-navigation
cd ..
NODE_PATH="$PWD/test/browser/node_modules" node test/check_navigation_browser.js /tmp/chulapa-navigation
```

The runner uses Playwright's Chromium by default. Set
`CHULAPA_BROWSER_EXECUTABLE` to use a system browser. CI installs Chromium and
its OS dependencies with `playwright install --with-deps chromium`.

These checks cover seven skins at 320, 390 and 1280 px, FAB navigation, skip-link
focus, Tab, Escape, keyboard dropdown interaction, focus leaving the menu,
the sidebar's existing Tab behavior, dual-navbar resize
and classic-navbar keyboard controls. They serve actual generated HTML/CSS/JS
locally and fulfill the theme's jQuery, Popper and Bootstrap requests from pinned
npm copies, verifying the template's SRI hashes. Fonts, icons and other external
services are blocked; no CDN access is needed during the browser run. This is
separate from the broader axe/visual review below.
The same CI runner also verifies visible fallback links and keyboard navigation
without JavaScript or CDN access for all seven FAB skins and mobile dual navigation.

## Accessibility browser checks

Build isolated fixtures from the current theme:

```powershell
bundle exec ruby test/build_accessibility_fixtures.rb "$env:TEMP/chulapa-accessibility-site"
```

The builder checks font URLs, Cactus resource gating, generated comments HTML5
and card link names. The
browser runner additionally requires Playwright and axe-core. Install them in
a temporary directory so they are not theme dependencies:

```powershell
npm install --prefix "$env:TEMP/chulapa-browser-tools" --no-save --package-lock=false playwright axe-core
$env:NODE_PATH = "$env:TEMP/chulapa-browser-tools/node_modules"
node test/check_accessibility_browser.js "$env:TEMP/chulapa-accessibility-site"
Remove-Item Env:NODE_PATH
```

The runner uses installed Microsoft Edge by default. Set
`CHULAPA_BROWSER_CHANNEL=chrome` to use installed Chrome. It serves fixture
files directly through Playwright; external font and Bootstrap resources still
require network access. Results are written to `accessibility-results.json` in
the fixture directory. Automated checks do not replace screen reader and
real-content reviews. See [the review record](accessibility-review.md).

## Jekyll 3 compatibility

Build the gem from the repository root, then run these commands in PowerShell:

```powershell
cd test
$env:BUNDLE_GEMFILE = Join-Path $PWD 'jekyll3/Gemfile'
bundle install
bundle exec ruby check_seo_fixes.rb
bundle exec ruby check_head_metadata.rb
bundle exec ruby check_social_metadata.rb
bundle exec ruby check_article_metadata.rb
bundle exec ruby check_article_images.rb
bundle exec ruby check_microdata.rb
bundle exec ruby check_video_examples.rb
bundle exec ruby check_minimal_header.rb
bundle exec ruby check_theme_installation.rb
Remove-Item Env:BUNDLE_GEMFILE
```

Run from `test`: Jekyll 3 checks the current directory for layouts before the
fixture source. Running from the repository root can select the wrong layouts.
The compatibility bundle deliberately excludes the local theme dependency so
the installation check can select the temporary installed gem.

The navigation browser checks compare native dropdown typography, capitalization,
text shadows and borders with equivalent navbar links on every skin in the
published catalog, plus `auto` and `none`, including Chulapa, Gitdev, Lux,
Universal, Sketchy and Slate, in classic, floating and dual menus at 320, 390
and 1280 px. Direct custom `.nav-link` rules, including selectors
without a navbar prefix, must override the default button inheritance.

The navigation browser checks also cover synchronized active sections in the
in-page, sidebar and kramdown TOCs on seven skins at 320, 390 and 1280 px. They
verify scrolling in both directions, the short final section, the active
underline and preserved focus. JavaScript unit checks cover encoded IDs, broken
links, literal percent signs in IDs, differently filtered TOCs, collapsed headings,
resize/reflow and coalesced scroll events. Browser checks expand and collapse a
real details element containing a heading with a literal percent sign in its ID.

Browser TOC checks also retain an authored fragment link inside a heading label
and verify that it never receives current-location state alongside the item
representing the target section.

The browser matrix includes Sketchy and checks the computed active underline
in all three TOCs, including sidebar links with skin-specific decoration rules.

TOC tracking also follows visibility/style changes and Bootstrap tab classes in
equal-height panes without relying on scroll or resize. Unit tests verify that
TOC styling and unrelated mutations do not cause observer feedback loops.

Carousel browser checks also cover Font Awesome play/pause icons, clicks on the
icon itself, accessible action names and visible fallback symbols when icon CSS
or fonts fail. Font Awesome assets are served from the pinned test dependency.

PhotoSwipe regression coverage uses `check_photoswipe.rb` on Jekyll 3 and 4 for
opt-in include caching, supported layouts, original image links and subdirectory
URLs. `check_photoswipe.mjs` covers lazy loading, isolated groups, dimensions,
modified clicks, asset failure and carousel transitions. The browser job builds
those fixtures and runs `check_photoswipe_browser.js` with the pinned PhotoSwipe
package from `test/browser`: real keyboard/zoom/focus behavior, offscreen image
dimensions, carousel stability, touch swipe, root/subdirectory routing and
original-image fallback with JavaScript disabled or either CDN asset unavailable.

`check_goatcounter.rb` validates production-only opt-in, disabled defaults, hosted
and self-hosted endpoint escaping, shared layouts (including search), unchanged
Google tags and root/subdirectory configurations without sending analytics.


## JavaScript integration regressions

After installing `test/browser` dependencies, build and check the isolated sites:

```sh
cd test
bundle exec ruby build_javascript_fixtures.rb /tmp/chulapa-javascript
cd ..
NODE_PATH="$PWD/test/browser/node_modules" node test/check_javascript_browser.js /tmp/chulapa-javascript
```

The browser job runs these checks with pinned offline Lunr and Fuse.js libraries.
They exercise readable and minified entry points on actual Jekyll-built search
pages at root and subdirectory URLs, index reuse, immediate Enter/clear behavior,
two-character highlights, HTML/entity preservation and floating navigation on search pages. Additional checks cover
native copying without CDN dependencies, the legacy clipboard entry point,
keyboard YouTube activation without a player API, repeated activation, Cusdis
message-source/height validation and empty/unavailable sitemap fallbacks.
The fixture builder also copies the actual documentation's custom Lunr/Fuse
pages and 404. Checks verify helper-before-adapter ordering, one copy of common
JavaScript dependencies, functional search regardless of the site's selected
provider and FAB operation on these custom documents.
No live video playback, analytics or comment service requests are required.

## Light/dark selector

`check_theme_selector.rb` builds actual skins and checks selector markup, unique
IDs, independent overrides and root/subdirectory URLs on Jekyll 3 and 4. The
browser check covers classic/floating/dual menus with and without links, desktop
and mobile, keyboard/Escape focus, automatic device changes, persisted dark first
paint with delayed CSS, cross-tab synchronization, blocked storage, failed CSS,
CSP blocking inline scripts and the no-JavaScript fallback. CI runs both checks.
For a local run:

```sh
bundle exec ruby test/check_theme_selector.rb /tmp/chulapa-theme-selector
NODE_PATH=test/browser/node_modules node test/check_theme_selector_browser.js /tmp/chulapa-theme-selector
bundle exec ruby test/build_theme_font_fixtures.rb /tmp/chulapa-theme-fonts
NODE_PATH=test/browser/node_modules node test/check_theme_fonts_browser.js /tmp/chulapa-theme-selector /tmp/chulapa-theme-fonts
```

Use `CHULAPA_BROWSER_EXECUTABLE` to select a local Chromium/Edge executable.
External scripts use the existing test-only pinned copies. These checks do not
verify third-party comment widgets, offline support or every custom skin.

The font-recovery check serves actual CSS over local HTTP. It simulates font
responses separately, then repeats failures without interception through a local
CONNECT proxy that never forwards Internet traffic. It covers all named skins,
Dark/Auto startup and changes, actual GitDev catalog previews, reverse switches,
missing fonts/CSS, empty/truncated/wrong-marker sheets, unreadable CSSOM and
non-font imports. It verifies computed colors, active pairs, link errors,
accessible selection, preferences and Auto recovery. Font imports remain in CSS.

## Default content semantics

`check_default_content.rb` participates in the existing Jekyll 3/4 regression
runner. Set `DEFAULT_CONTENT_OUTPUT` to retain fixtures for the browser check:

```sh
DEFAULT_CONTENT_OUTPUT=/tmp/chulapa-default bundle exec ruby test/check_default_content.rb
NODE_PATH=test/browser/node_modules node test/check_default_content_browser.js /tmp/chulapa-default
```

The browser check uses the existing Playwright tools; CI runs it with the other
navigation checks. An optional second directory supplies before-change fixtures
for geometry comparison. `DEFAULT_CONTENT_SCREENSHOTS` names an existing output
directory for desktop/mobile screenshots.

For an independent Microformats2 parse, install `mf2py==2.0.2` in a disposable
Python environment and run `python test/check_default_microformats.py` with the
same fixture directory. This is a validation tool only, not a theme dependency.
The parser checks complete editorial content, exclusion of theme TOCs, retention
of authored Markdown TOCs, and the title/URL/date contracts of all six built-in
feed layouts, including aliases.

### Automatic skin contrast

```sh
npm ci --prefix test/browser
node test/check_skin_contrast.js
```

Compiles every skin and the autothemer defaults, checks automatic text against
all eight palette backgrounds with an independent WCAG calculation, and checks
each skin’s unchanged YIQ function output. Run the rendered component check
with Chromium installed:

```sh
CHULAPA_CHROMIUM=/usr/bin/chromium node test/check_skin_contrast_browser.js
```

It compiles theme CSS and checks base buttons, badges and skin-defined colored
cards at 390px and 1280px. It does not establish whole-page accessibility or
cover translucent backgrounds and interaction states.
