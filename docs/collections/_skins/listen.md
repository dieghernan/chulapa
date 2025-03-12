---
layout: default
title: Listen
subtitle: A dark theme on spot
excerpt: Listen, dark theme on spot.
date: 2025-02-27
last_modified_at: 2025-02-28
tags: [dark-skin, skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: listen
og_image: ./assets/img/skinspreview/listen.png
skin_author: dieghernan
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  listen 
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
