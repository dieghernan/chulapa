---
layout: default
title: Media
subtitle: Read, write, learn, share
excerpt: Media, read, write, learn, share developed by dieghernan.
date: 2025-02-21
last_modified_at: 2025-02-22
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: media
og_image: ./assets/img/skinspreview/media.png
skin_author: dieghernan
---


Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  media 
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
