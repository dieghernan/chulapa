---
layout: default
title: Skeeblu
subtitle: A big, blue sky and no clouds in sight
excerpt: Skeeblu, a big, blue sky and no clouds in sight.
date: 2025-02-20
last_modified_at: 2025-02-23
tags: [skin, tophat, dieghernan, header-splash]
categories: [skins]
skin: skeeblu
og_image: ./assets/img/skinspreview/skeeblu.png
---


Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  skeeblu
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
