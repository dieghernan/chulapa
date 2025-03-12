---
layout: default
title: Materia
subtitle: Flat and modern
excerpt: Materia, material is the metaphor developed by Bootswatch.
date: 2025-02-24
last_modified_at: 2025-03-04
tags: [skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: materia
og_image: ./assets/img/skinspreview/materia.png
skin_author: Bootswatch
---


Developed by [Bootswatch](https://bootswatch.com/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

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
