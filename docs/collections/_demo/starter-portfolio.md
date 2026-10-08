---
title: My portfolio starter
subtitle: Selected projects and the work behind them
header_type: base
show_toc: true
show_related: false
show_random: false
show_comments: false
categories: [starter]
tags: [starter, portfolio]
---

[Get the complete example](https://github.com/dieghernan/chulapa/tree/main/examples/portfolio)
or follow the [start guide](../docs/00-start).
Copy the example's files into your own repository and replace the sample content.
The complete example includes a Gemfile and configuration; this demo displays
its home-page source.

## Home-page header

```yaml
---
layout: indexcategory
title: Selected work
subtitle: Projects, process and results
header_type: hero
include_collection: projects
index_sort: title
index_sort_asc: true
index_items: 12
---
```

## Home-page content

Introduce yourself and the kind of work you do. Each card opens a project.

## Sample projects

<div class="row">
  <div class="col-md-6 mb-3"><article class="card h-100"><div class="card-body">
    <h3 class="h4">Field notes</h3><p>A visual identity and editorial design project.</p>
    <a href="https://github.com/dieghernan/chulapa/blob/main/examples/portfolio/_projects/field-notes.md">Read the project source</a>
  </div></article></div>
  <div class="col-md-6 mb-3"><article class="card h-100"><div class="card-body">
    <h3 class="h4">Site redesign</h3><p>A website redesign focused on navigation and clear content.</p>
    <a href="https://github.com/dieghernan/chulapa/blob/main/examples/portfolio/_projects/site-redesign.md">Read the project source</a>
  </div></article></div>
</div>

The complete example generates these cards from its `_projects` collection.
The cards above illustrate the sample content and link to its Markdown source.

## Site configuration

```yaml
# Edit title, description, repository, url and baseurl before publishing.
remote_theme: dieghernan/chulapa
# The default branch includes development features. Append @TAG to pin a release.
title: My portfolio
description: Selected projects and the work behind them
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
  skin: lux
navbar:
  brand:
    title: My portfolio
  nav:
    - title: Home
      url: /
collections:
  projects:
    output: true
    permalink: /projects/:name/
defaults:
  - scope:
      path: ""
      type: projects
    values:
      layout: default
      header_type: hero
```
