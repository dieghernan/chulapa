---
title: Add a table of contents inside an article
subtitle: Insert heading links into the Markdown content
tags: [docs, content, writing]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an existing post or page rendered with kramdown. It adds an
index of heading links where you place it in the article's text.

**The two TOCs have different settings.** This task uses Markdown's `{:toc}`
marker; the layout's automatic TOC uses `show_toc`, `h_min` and `h_max`. Both
exclude headings marked `.no_toc`. See the [layout options](./04-layouts#options).
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Insert the marker

Edit the article's `.md` file. Keep its existing front matter (the settings
between `---` lines). In the content below it, at the position where you want
the index to appear, add these two lines with a blank line above and below:

```markdown
* Contents
{:toc}
```

Keep the marker and attribute on separate lines. `Contents` is a placeholder
replaced by generated links; use `1. Contents` instead of `* Contents` for a
numbered list. The index covers eligible headings throughout the article,
including headings before the marker. Moving the marker does not limit its
scope; use heading exclusions or `toc_levels` to control the entries.

Keep real Markdown headings in the article, such as `## First section` and
`### Details`. To omit a particular heading from this content index, place the
attribute immediately below that heading:

```markdown
## Further reading
{:.no_toc}
```

The `.no_toc` class also excludes this heading from the theme's automatic TOC
when `show_toc` or `show_sidetoc` is enabled. It is not an exclusion for only
one of the two indexes.

## Limit the heading levels when needed

To list only levels 2 through 6, edit the existing `kramdown` mapping in
`_config.yml`, preserving its parser and other settings. Add or update
`toc_levels`; create the mapping only if it is missing:

```yaml
kramdown:
  toc_levels: 2..6
```

This setting affects kramdown content indexes across the site, not just this
article. It does not change the theme's automatic TOC. Skip this edit if your
current heading range already suits your articles.

## Publish and check

Commit the article and any configuration edit on the publishing branch. Wait
for **Actions** to succeed, then open the published article. For a local preview,
restart Jekyll after changing `_config.yml`.

Check that the placeholder became links, that selecting a link reaches its
heading, and that an excluded heading is absent. Check on a narrow screen too.
If the marker remains plain text, check the two-line syntax, blank lines and
whether it was placed inside a code fence. The GitHub file preview does not
establish the published result.

The sample site uses kramdown with the GFM parser. Other parser combinations
can differ; verify generated output before changing the site-wide parser. Use
[the Markdown syntax reference](./markdown-cheatsheet#table-of-contents-syntax)
for specimens and [publishing checks](./42-unpublished-changes) for old output.
