---
layout: default
title: Butterfly Dark
subtitle: Night, night
excerpt: Butterfly Dark, night,night.
date: 2025-03-02
last_modified_at: 2025-03-08
tags: [dark-skin, skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: butterfly-dark
og_image: ./assets/img/skinspreview/butterfly-dark.png
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin        :  {{ page.skin }}
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
