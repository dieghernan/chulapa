---
layout: default
title: Hootstrap
subtitle: It’s a hootin, hollarin ho-down y’all!
excerpt: Hootstrap, it’s a hootin, hollarin ho-down y’all! developed by Themes.guide
date: 2015-03-04
last_modified_at: 2018-02-08
tags: [skin, bootstrap, themes-guide, header-splash]
categories: [skins]
skin: hootstrap 
og_image: ./assets/img/skinspreview/hootstrap.png
---


Developed by [Themes.guide](http://themes.guide/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  hootstrap 
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
