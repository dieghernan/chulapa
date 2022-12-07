---
layout: default
title: Universal
subtitle: Clean & Stylish
excerpt: Universal, clean and stylish by Bootstrapious.
header_img: /assets/img/site/texture-bw.png
date: 2022-03-07
last_modified_at: 2022-11-23
tags: [skin, bootstrap, dieghernan, header-splash,image]
categories: [skins]
skin: universal
og_image: ./assets/img/skinspreview/universal.png
---


Developed by [Bootstrapious](https://bootstrapious.com/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

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
