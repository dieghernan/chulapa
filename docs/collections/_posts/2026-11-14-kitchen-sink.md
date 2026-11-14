---
layout: default
title: Kitchen Sink
subtitle: 'Post features and media in <span class="chulapa">Chulapa</span>'
permalink: /demo/15-kitchen-sink
date: 2026-11-14
last_modified_at: 2026-11-14
excerpt: Try three tables of contents, a guest author card, series navigation, citations, diagrams, equations, galleries and video.
description: A demo of Chulapa post features, including tables of contents, guest authorship, citations, Mermaid, MathJax, PhotoSwipe and video.
locale: en
categories: [demo]
tags: [layout-default, header-post, social-links, tags, categories, mermaid, diagrams, markdown, math, galleries, photoswipe, video]
header_type: post
header_img: /assets/img/site/banner-demos.png
og_image: /assets/img/site/banner-demos.png
og_image_alt: Chulapa demo banner
schema_image: /assets/img/site/banner-demos.png
project_links:
  - url: https://github.com/dieghernan/chulapa
    icon: fab fa-github
    label: View on GitHub
author:
  name: Alex Rivera
  url: /demo/15-kitchen-sink#guest-author
  location: Madrid, Spain
  links:
    - url: "#guest-author"
      icon: fas fa-user
      label: About the guest author
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
citation:
  type: article-journal
  id: rivera-2026-kitchen-sink-demo
  title: "The Kitchen Sink experiment (fictional example)"
  author:
    - name:
        given: Alex
        family: Rivera
    - name:
        literal: Kitchen Sink Research Group
  issued: "2026-11-14"
  container-title: Journal of Imaginary Web Studies
  container-title-short: J. Imag. Web Stud.
  collection-title: Demonstration Articles
  volume: 4
  issue: 2
  page: "15–21"
  page-first: "15"
  page-last: "21"
  doi: "10.0000/chulapa.kitchen-sink-demo"
  url: https://example.invalid/kitchen-sink-demo
  pdf-url: https://example.invalid/kitchen-sink-demo.pdf
  available-date: "2026-11-12"
  abstract: This fictional article illustrates citation metadata for a web publishing demo.
  abstract-url: https://example.invalid/kitchen-sink-demo#abstract
  keyword: "web publishing, citations, demonstration"
  language: en
  isbn: "0000000000000"
  issn: "0000-0000"
  eissn: "0000-0001"
  pmid: "00000000"
google-scholar: false
series:
  - id: component-demos
    order: 1
---

Jump to an example from the table of contents above or open the sidebar using
the button on the left edge of the page. At the end of the post, open the
BibTeX citation, follow a related demo or leave a comment. See the
[front matter on GitHub](https://github.com/dieghernan/chulapa/blob/main/docs/collections/_posts/2026-11-14-kitchen-sink.md)
for the settings used here.

## Tables of contents

Choose **Carousel** in the in-page or sidebar index, then scroll to **Video**
to see the current section update. The expandable index below is generated
by [kramdown]({{ '/docs/58-content-toc' | relative_url }}) from the same article.

<details class="demo-kramdown-toc" markdown="1">
<summary>Open the kramdown table of contents</summary>

* Contents
{:toc}

</details>

## Guest author

Alex Rivera is a fictional guest author. Open the profile link in the author
card to jump back here. The [example citation](#chulapa-citation-label)
credits Alex and a fictional research group. The journal, identifiers
and links are sample data.

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

## Image galleries

### Masonry gallery

Select an image to open PhotoSwipe. Use the arrow keys to browse and press
Escape to return to the gallery.

{% include_cached snippets/masonry.html internal="gallery" index_sort="basename" index_sort_asc=true index_items=3 photoswipe=true %}

### Carousel

Use the previous and next controls to change slides, or open a slide to zoom
in with PhotoSwipe.

{% include_cached snippets/carousel.html internal="gallery" index_sort="basename" index_sort_asc=true index_items=3 interval=0 controls=true indicators=true photoswipe=true %}

## Video

This aerial clip shows a lagoon from above.

{% include snippets/video.html fileurl="/assets/mp4/sample.mp4" name="Aerial lagoon sample" %}
