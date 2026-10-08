---
layout: default
title: Towards
subtitle: Data Science is great
excerpt: Towards,
excerpt:  developed by dieghernan.
date: 2021-02-14
last_modified_at: 2022-06-03
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: towards
og_image: ./assets/img/skinspreview/towards.png
skin_author: dieghernan
---

Developed by [dieghernan](https://github.com/dieghernan/). To use this skin, update the following settings in `_config.yml`:

```yaml
chulapa-skin:
  skin       :  towards
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
