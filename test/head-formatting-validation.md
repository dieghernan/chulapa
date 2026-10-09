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
