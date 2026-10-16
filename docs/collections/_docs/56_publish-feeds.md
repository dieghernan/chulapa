---
title: Publish posts in the built-in feeds
subtitle: Include articles and share a subscription address
tags: [docs, feeds]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide on an existing site to let readers subscribe in a feed reader.
The theme supplies Atom at `/atom.xml` and RSS 2.0 at `/rss.xml`; you do not need
to install `jekyll-feed` for these addresses.

## Include your posts

In `_config.yml`, find the existing `defaults` list. For an existing scope with
`path: ""` and `type: posts`, add `include_on_feed: true` under its `values`,
preserving the other values. If that scope is missing, append the following
list item under `defaults`. Create the complete section only if it is absent:

```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      include_on_feed: true
```

Use the YAML boolean `true`, without quotes. An explicit value in a post's front
matter takes precedence over the default. To keep a particular post out, set
`include_on_feed: false` in its existing front matter.

The built-in feeds select posts and collection documents with
`include_on_feed: true` and a date. Posts get their date from the filename;
for a collection document, first ensure its existing entry under `collections`
in `_config.yml` has `output: true` so its article URL is published. Preserve
the other collection settings. Then set `date` explicitly in its front matter to control
its publication date and ordering. Jekyll 4 can infer a date when none is set;
do not rely on that behavior across Jekyll versions. An ordinary
standalone page outside a collection is not selected just by adding these
settings. See the [field reference](./04-layouts#advanced-page-settings).

## Publish and share the address

Commit to the publishing branch, wait for **Actions** to succeed and open
`/atom.xml` on your published site, including its repository path if it has one:
for example, `https://example.github.io/my-blog/atom.xml`. Check `/rss.xml` too.
Open the feed in a feed reader and confirm that a recent, published post appears
and its link opens the expected article. A browser may display XML or download
the file; that alone is not a failure.

Follow [Edit footer links](./11-edit-footer) to add a labelled subscription link
using `url: /atom.xml` or `url: /rss.xml`. Keep other footer links and omit the
repository prefix in this setting; the theme adds `baseurl`.

If a post is missing, check its explicit `include_on_feed` value and date, any
more-specific defaults, and whether the publishing build included it. Use
[Find missing changes](./42-unpublished-changes) before changing feed addresses.
If a collection entry appears but its article returns 404, check that the
collection has `output: true`, rebuild, and open that article URL directly.
Opting a document into the feed does not enable collection output.
If a feed returns 404, check the URL, latest deployment and any local file that
overrides the theme's feed asset.

Already have subscribers at `/feed.xml`? Keep that address working; use
[Keep a jekyll-feed subscription address](./57-jekyll-feed) instead of silently
switching readers to another URL.
