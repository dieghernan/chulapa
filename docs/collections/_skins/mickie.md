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


Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  mickie
  autothemer  :  # Autotheming may not have any effect
  vars        :    
    ...
```


While `autothemer` does not override the skin, it may not be fully functional. You can modify the theme defaults via `vars`.




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
