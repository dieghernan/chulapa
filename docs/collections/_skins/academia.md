---
layout: default
title: Academia
subtitle: It purifies, it fixes, and it dignifies
excerpt: Academia, It purifies, it fixes, and it dignifies developed by dieghernan.
date: 2021-03-20
last_modified_at: 2021-04-28
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: academia
og_image: ./assets/img/skinspreview/academia.png
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  academia 
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
