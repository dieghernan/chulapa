---
layout: indexcategory
title: '<span class="chulapa">Chulapa</span> demos'
subtitle: All demos in one place
header_type: "hero"
header_img: "https://images.unsplash.com/photo-1545290614-5ceedf604139?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=60"
permalink: /demo
include_collection: demo
index_sort: path
index_sort_asc: true
index_items: 100
og_image: /assets/img/site/banner-demos.png
---

[Choose a starter example](./docs/08-starter-examples) to see a blog, technical blog,
portfolio or project configuration. Each starter demo shows its YAML header.

This is an example of how to create an index for a specific collection, in this
case `demo`.

The following front matter selects the `demo` collection, orders it by file
name ascending so the numbered demos appear first, and raises the default
limit of 10 cards to 100:

```yaml
---
layout: indexcategory
title: "Demos"
subtitle: All demos in one place
permalink: /demo
include_collection: demo
index_sort: path
index_sort_asc: true
index_items: 100
og_image: /assets/img/site/banner-demos.png
---
```
