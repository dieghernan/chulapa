---
layout: default
title: <span class="chulapa">Chulapa</span><small style="font-size:50%; color:#687864;"> skin</small>
subtitle: Get lost in Madrid
excerpt: Chulapa, get lost in Madrid developed by dieghernan.
date: 2019-05-15
last_modified_at: 2019-11-09
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: chulapa
og_image: ./assets/img/skinspreview/chulapa.png
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  chulapa
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


