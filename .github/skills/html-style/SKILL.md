---
name: html-style
description: Review or edit HTML and Jekyll/Liquid templates for readable generated markup, consistent syntax, semantics and accessibility. Use for HTML style work in Chulapa layouts, includes and examples.
---

# HTML style

Apply this concise adaptation of the
[W3Schools HTML style guide](https://www.w3schools.com/html/html5_syntax.asp).
Treat its conventions as style recommendations, not a replacement for HTML
conformance rules or the user's instructions.

Also draw on these references:

- [freeCodeCamp HTML best practices](https://www.freecodecamp.org/news/html-best-practices/): headings, captions and document structure.
- [rtCamp HTML best practices](https://rtcamp.com/handbook/developing-for-block-editor-and-site-editor/html-best-practices/): semantics, accessibility, maintainability and loading behavior.
- [hail2u HTML best practices](https://github.com/hail2u/html-best-practices): detailed markup and form conventions.
- [W3Schools semantic elements](https://www.w3schools.com/Html/html5_semantic_elements.asp): choosing elements according to meaning.

Resolve conflicting or outdated advice against the
[HTML Standard](https://html.spec.whatwg.org/multipage/). Do not turn tutorial
preferences into universal validation rules or guaranteed SEO improvements.

## HTML conventions

- Begin complete documents with an HTML doctype; retain explicit html, head and
  body elements, a language attribute, early UTF-8 declaration, useful title
  and responsive viewport metadata.
- Use lowercase element and attribute names, quoted attribute values and no
  spaces around attribute equals signs. Preserve case-sensitive IDs and paths.
- Close non-void elements explicitly. Void elements need no closing tag;
  trailing slashes are optional in HTML.
- Give images appropriate alternative text and known intrinsic dimensions.
- Use spaces for indentation, preferably two per nesting level. Keep readable
  line lengths, separate logical blocks and avoid unnecessary blank lines.
- Keep short comments compact; indent longer comments consistently.
- Link stylesheets without redundant CSS type declarations. Format longer CSS
  rules across lines with indented, semicolon-terminated declarations.
- Omit redundant type declarations on ordinary JavaScript scripts.
- Prefer lowercase filenames and conventional HTML, CSS and JavaScript
  extensions; match the hosting server's index filename and path casing.

## Semantics and accessibility

- Choose elements by meaning: main for primary content, nav for major navigation,
  article for self-contained content, section for a thematic group usually with
  a heading and aside for tangential content. Use header and footer in their
  appropriate document or section context; retain div for generic grouping.
- Give the page a clear primary heading and a logical heading hierarchy. Choose
  levels by structure, with CSS controlling appearance. A single h1 is a useful
  convention, not an unconditional HTML conformance requirement.
- Associate captions with figures using figure and figcaption. Captions do not
  replace image alternatives. Use time with a valid datetime when appropriate.
- Use strong for importance and em for stress emphasis; use CSS for purely visual
  styling. Do not ban b or i: both have defined meanings in modern HTML.
- Follow element content models, not CSS display categories. An anchor may wrap
  block content when its context permits, but must not contain nested links or
  interactive descendants.
- Prefer native links for navigation and buttons for actions. Preserve keyboard
  operation and meaningful accessible names; avoid redundant ARIA roles.
- Give form controls associated labels, appropriate input types and explicit
  button types. Placeholders do not replace labels. Group related controls with
  fieldset and legend where appropriate.
- Keep IDs unique. Native boolean attributes may omit values, but ARIA attributes
  such as aria-expanded require their defined string values.

## Maintainability and loading

- Avoid unnecessary wrappers and use meaningful classes while preserving existing
  Bootstrap conventions, JavaScript hooks and styling dependencies.
- Reuse existing metadata and structured data rather than emitting duplicates.
- Consider defer or async for suitable scripts only after checking execution
  dependencies. Preserve required ordering and initialization behavior.
- Lazy-load suitable offscreen images and iframes. Do not apply lazy loading
  indiscriminately to prominent content needed for the initial view.

## Chulapa and Liquid

Read root AGENTS.md and, when editing docs, docs/AGENTS.md. Apply changes only
within the requested scope; this skill does not authorize commits, pushes,
publishing or repository-wide reformatting.

- Match established indentation where changing it would create unrelated churn.
  Inspect generated HTML: tidy Liquid source alone does not establish tidy output.
- Calculate language before the doctype so Liquid trims cannot join it to html.
  Check standalone search as well as minimal and inherited layouts.
- Use whitespace trims around calculations deliberately. Preserve newlines
  across emitted tags and spaces separating inline words. See
  [Liquid whitespace control](https://shopify.github.io/liquid/basics/whitespace/).
- Preserve meaningful whitespace in preformatted content, scripts, styles and
  custom includes. Do not pretty-print their contents through global replacements.
- Respect existing compression settings. With blank-line compression, check
  head indentation separately from body clipping; also retain fully compressed
  and disabled-compression behavior.
- Keep JSON-LD valid and escaped through the existing serialization snippets.
  JSON-LD and module scripts require their meaningful type declarations.
- Use empty alt text for decorative images. Do not invent image dimensions or
  replace responsive sizing with arbitrary fixed sizes.
- Avoid cosmetic trailing-slash campaigns and unsolicited image-width changes.
  Use CSS for responsive sizing when that behavior is part of the task.
- Do not introduce YAML options, including internal layout metadata, unless
  strictly necessary and explicitly justified under AGENTS.md.

## Verification

Build representative pages covering affected conditionals and layout inheritance.
Compare titles, canonical URLs, meta attributes and decoded JSON-LD before and
after formatting changes. Run relevant existing regression checks rather than
adding tests that merely mirror source indentation.

For head changes, use test/check_head_formatting.rb and the affected metadata
checks. For compressor changes, use test/check_compress_html.rb. Validate full
generated documents with the [W3C Nu checker](https://validator.w3.org/nu/),
distinguishing errors, warnings and informational advice. For visual or
interaction changes, inspect rendered pages at relevant viewport sizes.
For semantic or control changes, also check landmarks, heading order, accessible
names, keyboard operation and visible focus in the rendered page.

Report changes and validation limits. Update affected docs and examples when
behavior changes; otherwise explain why documentation was unnecessary.
