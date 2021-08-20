---
layout: default
title: Lymcha
subtitle: Like a sunny summer day in Northern Italy
excerpt: Lymcha, like a sunny summer day in Northern Italy developed by Tophat Themes.
date: 2020-03-07
last_modified_at: 2020-06-08
tags: [skin, bootstrap, tophat, header-splash]
categories: [skins]
skin: lymcha
og_image: ./assets/img/skinspreview/lymcha.png
---


Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  {{ page.skin }}
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
