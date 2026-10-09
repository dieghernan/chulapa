# Microformats validation

Validation performed on 2026-10-08 for issue [#86](https://github.com/dieghernan/chulapa/issues/86).

Generate the fixtures with `bundle exec ruby test/check_microformats.rb`.
Set `MICROFORMATS_OUTPUT` to a temporary directory to retain the generated HTML
under `root/` and `subdir/` for external validation. These fixtures contain
synthetic author details and example URLs.

## External services

The [Microformats validator list](https://microformats.org/wiki/validators)
recommends [pin13.net](https://pin13.net/mf2/). Its hosted PHP parser was checked
against [python.microformats.io](https://python.microformats.io/), which is listed
on [microformats.io](https://microformats.io/). Both services received the full
generated HTML through their snippet forms, with the fixture URL as the base URL.
No HTML was saved through pin13's optional save control.

The extracted properties matched across both parsers for all six cases below.
Comparison ignored HTML serialization and language annotations, and normalized
the equivalent timezone suffixes `+01:00` and `+0100`.

| Fixture | Result |
| --- | --- |
| `root/updated.html` | Original publication date and update date retained; title, content, canonical URL and site author extracted. |
| `subdir/guest.html` | Guest profile URL resolved under `/subdir/`; site author URL not inherited. |
| `root/guest-no-url.html` | Guest name extracted without an inherited profile URL. |
| `root/landing.html` | Both dates and entry properties retained. |
| `root/minimal.html` | No automatic entry extracted. |
| `root/own-entry.html` | Custom entry title, URL and content extracted without site navigation or footer. |

The same six complete documents were POSTed to
[W3C Nu HTML Checker](https://validator.w3.org/nu/?out=json), using
`Content-Type: text/html; charset=utf-8`. All returned zero errors.
The four default/landingpage fixtures returned an advisory that their article
lacks a heading: their synthetic content is a single paragraph, with the page
heading outside the article. The two minimal fixtures returned no messages.

Submitting the same HTML5 documents to the classic
`https://validator.w3.org/check` endpoint returned HTTP 307 redirects to
`https://validator.w3.org/nu/#textarea` for all six cases. The classic service
therefore directs these documents to the Nu checker used above. Its
[API documentation](https://validator.w3.org/docs/api.html) also recommends Nu
for modern HTML.

## Local checks

- Microformats regression checks: 13 fixtures with root and subdirectory URLs.
- SEO, microdata extraction and minimal header regression checks passed.
- Installed gem, pagination and documentation checks passed.
- Theme build passed; existing Sass deprecation warnings remain.
- Chatbot tests passed: 17 tests. No live AI evaluation or Worker deployment was performed.

## Rendered checks

Inspected default and landingpage fixtures at 375 and 1280 px wide. The entry
wrapper preserves the column layout, landing background, bottom footer and
struck-through publication date. No horizontal overflow occurred. The hidden
author profile link remains absent from the accessibility tree and Tab order.
The entry excludes the site navbar and footer. These focused checks do not
constitute a full accessibility audit.

## Follow-up template HTML validation

The published `https://dieghernan.github.io/202602_geobounds/` page returned
seven errors, two warnings and eight informational messages from Nu. The
dropdown naming error came from Chulapa's navbar. The five percentage image
widths were article content. The related heading was supplied through
`related_label`; the theme renders that HTML unchanged. Webmention, Pingback,
Bing verification and Ko-fi markup were not found in the reusable templates.

The navbar dropdown containers now use named `group` roles. Void-element
slashes were removed from the Google search, simple list and Welcomments
templates. Welcomments no longer emits a redundant JavaScript type or an empty
section without a heading. The no-JavaScript navigation style now belongs to
the document head. Related/random label examples use `h2` with a visual-size
class, preserving appearance while correcting their heading hierarchy.

`bundle exec ruby test/check_template_html.rb` passed. With
`TEMPLATE_HTML_OUTPUT` set, its complete generated classic, fab, dual and
Welcomments pages were POSTed to W3C Nu: all four returned zero messages.
Microformats, SEO and minimal header regressions also passed, as did the
17 chatbot tests. The classic dropdown was checked with Enter, ArrowDown and
Escape, including focus moving to its link and returning to its trigger.
The mobile dual navigation opens with Enter, and neither the 375 px nor
1280 px fixtures overflow horizontally.

These changes are local; the published geobounds article and its site-specific
configuration have not been changed or redeployed.

## Feed validation

Validation performed on 2026-10-09 for the development h-feed implementation.
`bundle exec ruby test/check_microformats_feeds.rb` passed 12 fixtures with
root and subdirectory URLs, covering the six built-in list layouts, a derived
archive layout, standalone and undated simple lists, an empty feed and two
pagination pages. Existing entry and SEO checks also passed.

The complete archive, indexcategory, cloudtag, cloudcategory and two pagination
HTML documents were submitted to both hosted parsers above for root and
subdirectory URLs (12 pages). Both extracted the feed title and canonical URL,
and agreed on entry titles, URLs and publication dates after normalizing
timezone offsets. Cloud groups intentionally repeat matching entries.

All six complete root documents returned zero messages from W3C Nu. List
heading levels now follow the document hierarchy while Bootstrap size classes
preserve their visual sizes. Feed content uses a div instead of an article;
the pagination results container likewise uses a div instead of an unnamed
section. Entry and feed classes add no styles or controls.

Archive, cloud and card views were inspected at 375 and 1280 px using the
existing compiled theme stylesheet. Headings retain their sizes and no
horizontal overflow occurs. Canonical and author metadata remain unchanged;
feeds exclude site navigation and footers. Chatbot tests passed (17 tests);
updated context has not been deployed.

## Nested layout follow-up

PR #88 review identified that two custom wrappers above a list layout caused
the page to become h-entry instead of h-feed. The new nested-archive fixture
reproduced this failure before the fix. Built-in list layouts now carry an
internal chulapa_microformats_feed marker that Jekyll merges through layout
inheritance. This internal YAML metadata is necessary because the merged
layout.layout value retains the outer wrapper name, hiding deeper ancestors;
no site or page configuration setting is introduced. It avoids a custom
plugin and preserves compatibility with normal Jekyll layout rendering.

Feed checks now cover 16 fixtures at root and subdirectory URLs, including two
custom wrappers above each of archive, indexcategory, cloudtag and
cloudcategory. Existing entry checks remain unchanged and pass.

Both hosted parsers agreed on feed identity and entry metadata for the eight
nested-layout pages at root and subdirectory URLs. The four complete root
documents returned zero messages from W3C Nu. SEO, cloud grouping and all
17 chatbot tests passed. The updated chatbot context has not been deployed.
