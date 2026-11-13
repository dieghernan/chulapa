---
title: Publish posts in the built-in feeds
subtitle: Include articles and share a subscription address
tags: [docs, feeds]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
series:
  - id: publishing
    order: 2
---

Use this guide on an existing site to let readers subscribe in a feed reader.
The theme supplies Atom at `/atom.xml` and RSS 2.0 at `/rss.xml`; you do not need
to install `jekyll-feed` for these addresses. In v2.2.1 development, it also
supplies JSON Feed 1.1 at `/feed.json`. Share `/subscribe/` to give readers a
browser preview with recent entries and links to all three feeds.

All three formats use the same entries. Atom and RSS include reading times.
RSS provides a short description and the full article through
`content:encoded`. JSON Feed includes the full article as HTML and uses
plain text for titles and summaries.

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

## Preserve author names and profiles

In v2.2.1 development, each feed entry uses its document's `author` mapping
when present, otherwise the site's `author` settings in `_config.yml`.
RSS preserves known names as `dc:creator`; it does not invent email addresses.
Atom uses the selected author's `url` before the first HTTP(S) URL in that
author's `links`. If neither exists, Atom omits the profile URI. A guest never
inherits the site author's name, URL or links. The Atom feed's own author uses
the site settings with the same URL fallback. Set `author.name` in a guest
article's front matter and add `author.url` if the guest has a profile.
Atom displays `Guest author` when the guest has no name and includes their
profile URL when available. For other entries, Atom displays `Unknown author`
if the site has no author name.
Site-relative profile URLs such as `/about/` use the site's `url` and `baseurl`.
Hiding the author card with `show_author: false` does not remove feed authors.

## Read excerpts and full articles in RSS

In v2.2.1 development, RSS includes the excerpt and full article when an
excerpt is available. If the excerpt is empty, RSS includes the full article
once.

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
