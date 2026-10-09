# Head formatting validation

Validated on 2026-10-09 for the development version.

- Head formatting fixtures passed for a home page, a page with explicit breadcrumbs and MathJax, a guest author with escaped text and a post with multiple images.
- Compared those four pages with main: head element attributes, titles, decoded JSON-LD and inline JavaScript lines match. Only whitespace and JSON punctuation placement differ.
- W3C Nu returned zero errors for all four complete pages. The post fixture has one advisory about its synthetic article lacking a heading.
- Head metadata, social metadata, article/locale metadata, article images, compression, Microformats and SEO checks passed. Chatbot tests passed (17 tests).

No CSS, controls or interactions changed. SEO validation focused on unchanged metadata and valid structured data. Existing compression settings are respected; readable blank-line compression now preserves head indentation while still clipping the body. Custom head includes retain their own whitespace. No YAML option was added.

The documentation, development changelog and chatbot context describe the new output formatting. The updated chatbot context has not been deployed.

## Search layout follow-up

The PR review identified that the standalone search layout still joined its
document opening through Liquid trims. Adding the search fixture reproduced
the failure before the correction. Language calculation now precedes the
doctype and the head include preserves surrounding newlines. The five
formatting fixtures pass; the complete search page returned zero messages
from W3C Nu. This completes the documented behavior without adding settings
or changing search controls or metadata.

## Standalone documents and HTML skill review

The six independent demo/widget documents now preserve the newline before the
head include. All eleven generated fixtures pass opening, head indentation,
JSON-LD parsing and analytics checks. Compression checks also pass.

The HTML skill review found existing Lunr/Fuse style blocks outside the head
and incorrect Google and simple search label associations. Attribution CSS now lives
in provider-specific stylesheets, the labels target their actual controls and
the notebook widget places its styles inside the head using Liquid capture.
No YAML setting was added. Regression checks cover labels, style placement
and the existence of the referenced search stylesheets.

W3C Nu accepted the original home, page, guest and search fixtures with no
messages; the classic navbar demo had one article-heading advisory. It detected
the search CSS and label issues above before correction. Subsequent requests,
including the simple search and notebook widget, returned HTTP 429, so official
validation of the corrected documents remains incomplete. The existing style
rules and script ordering are preserved; no interactive visual audit was run.

The development changelog records the search fixes. Configuration and usage
remain unchanged, so no additional documentation or chatbot context update
was needed.

## Scheduled W3C retry

On 2026-10-09 at 07:58 UTC, regenerated all eleven fixtures; local formatting,
label association, stylesheet placement and JSON-LD checks passed. The first
W3C Nu submission (the post fixture) returned HTTP 429. Stopped immediately
without submitting the remaining ten pages. No new validator findings were
available, and official validation of the corrected documents remains pending.
