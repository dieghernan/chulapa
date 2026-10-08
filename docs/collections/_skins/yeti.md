---
layout: default
title: Yeti
subtitle: A friendly foundation
excerpt: Yeti, a friendly foundation developed by Bootswatch.
date: 2025-03-05
last_modified_at: 2025-03-11
tags: [skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: yeti
og_image: ./assets/img/skinspreview/yeti.png
skin_author: Bootswatch
---

Developed by [Bootswatch](https://bootswatch.com/), you can use it on your site. Just go to your `_config.yml` file and modify these settings:

```yaml
chulapa-skin:
  skin       :  {{ page.skin }}
  autothemer  :  # Set to true to derive undefined colors
  vars        :    
    ...
```

Autothemer fills in colors that the skin and `vars` have not defined. It does
not override existing values, so its visible effect depends on the skin. Use
`vars` to override specific colors. See the [autothemer guide]({{ "/docs/03-theming#autothemer" | relative_url }}).

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
