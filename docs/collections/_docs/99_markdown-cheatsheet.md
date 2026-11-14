---
title: Markdown cheatsheet
subtitle: Syntax specimens and rendered output
excerpt: Reference examples for Markdown formatting and kramdown extensions.
permalink: /docs/markdown-cheatsheet
show_toc: true
h_max: 3
tags: [docs, content, writing]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use these examples in a Markdown post or page. [Create a post](./15-create-post)
shows a complete file with its front matter.

## Markdown notation

The sample site uses kramdown with the GFM parser. See the
[Markdown Guide](https://www.markdownguide.org/basic-syntax/) for a fuller
syntax reference.

## Markdown cheatsheet

```markdown
## A section

Use **bold**, _italic_, ~~strikethrough~~ and `inline code`.

- [Link to another page](./01-install)
- A second list item

> A short quotation.
```

Use **bold**, _italic_, ~~strikethrough~~ and `inline code`.

- [Link to another page](./01-install)
- A second list item

> A short quotation.

For images, see [Add an image](./17-add-image). For fenced code, see
[Syntax highlighting](./syntax-highlighting).

## kramdown extensions

Follow the guides for [footnotes](./51-add-footnote), [alert boxes](./49-add-alert)
and [image captions](./50-add-caption). The
[kramdown reference](https://kramdown.gettalong.org/quickref.html) covers more
extensions. Some require the Kramdown input parser.

## Table of contents syntax

Insert these two lines in the Markdown body where the list should appear:

```markdown
* Contents
{:toc}
```

Use `1.` instead of `*` for a numbered list. Add `{:.no_toc}` on the line
after a heading to omit it from both the content index and the theme's TOC.
For heading levels and troubleshooting, see
[Add a table of contents inside an article](./58-content-toc).
