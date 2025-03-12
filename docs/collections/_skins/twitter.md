---
layout: default
title: Twitter
subtitle: Fly high with a light skin
excerpt: Twitter, fly high with a light skin developed by dieghernan.
date: 2020-02-14
last_modified_at: 2020-06-03
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: twitter
og_image: ./assets/img/skinspreview/twitter.png
skin_author: dieghernan
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  twitter
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


