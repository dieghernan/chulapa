---
layout: default
title: Minco
subtitle: Unique and stylish with a readable font
excerpt: Minco, unique and stylish with a readable font.
date: 2025-02-11
last_modified_at: 2025-02-16
tags: [skin, tophat, bootstrap, header-splash]
categories: [skins]
skin: minco
og_image: ./assets/img/skinspreview/minco.png
skin_author: Tophat Themes
---


Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  minco
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
