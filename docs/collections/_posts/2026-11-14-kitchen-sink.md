---
layout: default
title: Kitchen Sink
subtitle: Bootstrap and Chulapa components in one demo
permalink: /demo/15-kitchen-sink
date: 2026-11-14
excerpt: Explore post navigation, citations, diagrams and Bootstrap components in a single article.
description: An interactive demonstration of post settings and Bootstrap components.
locale: en
categories: [demo]
tags: [layout-default, header-post, social-links, tags, categories, mermaid, diagrams, markdown]
header_type: post
header_img: /assets/img/site/banner-demos.png
og_image: /assets/img/site/banner-demos.png
og_image_alt: Chulapa demo banner
project_links:
  - url: https://github.com/dieghernan/chulapa
    icon: fab fa-github
    label: View on GitHub
show_date: true
show_author: true
show_sociallinks: true
show_breadcrumb: true
breadcrumb_list:
  - label: Home
    url: /
  - label: Demos
    url: /demo
show_toc: true
show_sidetoc: true
h_min: 2
h_max: 3
show_categories: true
show_tags: true
cloudcategory_url: /demo/category
cloudtag_url: /demo/tags
show_bottomnavs: true
show_related: true
related_label: '<h2 class="h5">Related demos</h2>'
show_random: true
random_label: '<h2 class="h5">More demos</h2>'
show_comments: true
include_on_search: true
include_on_feed: false
mathjax: true
mermaid: true
citation: true
series:
  - id: component-demos
    order: 1
---

This post combines the article header, author card, sharing links and both
tables of contents. See its
[front matter on GitHub](https://github.com/dieghernan/chulapa/blob/main/docs/collections/_posts/2026-11-14-kitchen-sink.md)
for the settings used here.

## Series navigation

Open **Series index** to see the full list, or select **Next** to continue to
the diagram demo. See [Series navigation](../docs/04-layouts#series-navigation)
for setup.

{% include snippets/series-chapters.html %}

## Diagrams, equations and code

```mermaid
flowchart LR
    accTitle: Publishing workflow
    accDescr: Draft a post, preview it, then publish it.
    Draft --> Preview --> Publish
```

The sum of the first \(n\) positive integers is:

$$
\sum_{k=1}^{n} k = \frac{n(n+1)}{2}
$$

```yaml
layout: default
show_toc: true
mermaid: true
```

## Bootstrap components

{% include snippets/bootstrapdemo.html %}

### Content components

> Use an information alert for a detail that helps readers complete a task.
{: .alert .alert-info .p-3}

<figure>
  <img class="img-fluid" src="{{ '/assets/img/site/chulapa-madrid.jpg' | relative_url }}" alt="Chulapa lettering in Madrid" loading="lazy">
  <figcaption>Chulapa lettering in Madrid.</figcaption>
</figure>
