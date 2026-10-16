---
title: My journal starter
subtitle: Stories, places and everyday discoveries
header_type: base
show_toc: true
show_related: false
show_random: false
show_comments: false
categories: [starter]
tags: [starter, personal-blog]
---

This annotated example shows home-page source and sample content from
[personal-blog](https://github.com/dieghernan/chulapa/tree/main/examples/personal-blog).
It runs inside the documentation site, using this site's skin and configuration;
it is not the standalone example's home page. The full folder includes its own
`Gemfile` and `_config.yml`, with no publishing workflow.

For preparation, preview and publication, follow
[Run and publish a starter example](../docs/09-run-starter).

## Home-page header

```yaml
---
layout: indexcategory
title: My journal
subtitle: Stories, places and everyday discoveries
header_type: base
include_collection: posts
index_sort: date
index_items: 12
---
```

## Home-page content

A personal journal with recent stories.

## Sample story

Source: [`2026-01-01-first-post.md`](https://github.com/dieghernan/chulapa/blob/main/examples/personal-blog/_posts/2026-01-01-first-post.md).
Its settings enable the features illustrated below:

```yaml
---
title: A first story
layout: default
header_type: post
show_date: true
show_author: true
include_on_feed: true
---
```

Write a short introduction to your story here. This first paragraph becomes
its excerpt unless you provide an explicit `excerpt` in front matter.

## A place to begin

Replace this sample with your own text and photographs.

## Site configuration

```yaml
# Edit title, description, repository, url and baseurl before publishing.
remote_theme: dieghernan/chulapa
# The default branch includes development features. Append @TAG to pin a release.
title: My journal
description: Stories, places and everyday discoveries
repository: username/site
url: https://username.github.io
baseurl: /site
locale: en-US
plugins:
  - jekyll-remote-theme
  - jekyll-include-cache
  - jekyll-github-metadata
  - jekyll-paginate
  - jekyll-sitemap
exclude: [Gemfile, Gemfile.lock, README.md, vendor]
kramdown:
  input: GFM
chulapa-skin:
  skin: journal
navbar:
  brand:
    title: My journal
  nav:
    - title: Home
      url: /
defaults:
  - scope:
      path: ""
      type: posts
    values:
      layout: default
      header_type: post
      include_on_feed: true
      show_date: true
```
