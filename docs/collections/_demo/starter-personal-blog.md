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

[Get the complete example](https://github.com/dieghernan/chulapa/tree/main/examples/personal-blog)
or follow the [start guide](../docs/00-start).
Copy the example's files into your own repository and replace the sample content.
The complete example includes a Gemfile and configuration; this demo displays
its home-page source.

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
