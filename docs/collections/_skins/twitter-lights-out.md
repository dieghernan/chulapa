---
layout: default
title: Twitter Lights Out
subtitle: Lights off, dream on
excerpt: Twitter Lights Out, lights off dream on developed by dieghernan.
date: 2020-04-20
last_modified_at: 2020-07-10
tags: [dark-skin, skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: twitter-lights-out
og_image: ./assets/img/skinspreview/twitter-lights-out.png
skin_author: dieghernan
---

Developed by [dieghernan](https://github.com/dieghernan/). To use this skin, update the following settings in `_config.yml`:

```yaml
chulapa-skin:
  skin       :  twitter-lights-out
  autothemer  :  # Set to true to derive undefined colors
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
