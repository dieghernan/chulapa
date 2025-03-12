---
layout: default
title: Twitter Dim
subtitle: A skin for night owls
excerpt: Twitter Dim, a skin for night owls developed by dieghernan.
date: 2020-03-20
last_modified_at: 2020-07-01
tags: [dark-skin, skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: twitter-dim
og_image: ./assets/img/skinspreview/twitter-dim.png
skin_author: dieghernan
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  twitter-dim
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


