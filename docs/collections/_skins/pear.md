---
layout: default
title: Pear
subtitle: A juicy and fresh skin on nice greens
excerpt: Pear, a juicy and fresh skin on nice greens developed by dieghernan.
date: 2020-07-22
last_modified_at: 2020-07-24
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: pear
og_image: ./assets/img/skinspreview/pear.png
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  pear
  autothemer  :  # Autotheming may not have any effect
  vars        :    
    ...
```



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


