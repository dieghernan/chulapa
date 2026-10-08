---
layout: default
title: Mickie
subtitle: Like a precocious child that doesn't go away
excerpt: Mickie, like a precocious child that doesn't go away.
date: 2025-02-16
last_modified_at: 2025-02-23
tags: [skin, tophat, bootstrap, header-splash]
categories: [skins]
skin: mickie
og_image: ./assets/img/skinspreview/mickie.png
header_img: https://images.unsplash.com/photo-1495977958109-d0a07c767f0e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2b819fca66b1fedb4965a8693121df7d&auto=format&fit=crop&w=1600&q=80
skin_author: Tophat Themes
---

Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/). To use this skin, update the following settings in `_config.yml`:

```yaml
chulapa-skin:
  skin       :  mickie
  autothemer  :  # Set to true to derive undefined colors
  vars        :    
    ...
```

Autothemer fills in colors that the skin and `vars` have not defined. It does
not override existing values, so its visible effect depends on the skin. Use
`vars` to override specific colors. See the [autothemer guide]({{ "/docs/03-theming#autothemer" | relative_url }}).
{: .alert .alert-info .p-3 .mx-2 .mb-3}

{% if page.show_bottomnavs -%}
{% include components/navbeforeafter.html -%}
{% endif -%}
{% if page.show_categories -%}
{% include components/categories.html-%}
{% endif -%}
{% if page.show_tags -%}
{% include components/tags.html-%}
{% endif -%}

{% include snippets/bootstrapdemo.html  %}
