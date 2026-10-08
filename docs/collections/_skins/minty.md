---
layout: default
title: Minty
subtitle: A fresh feel
excerpt: Minty, a fresh feel developed by Bootswatch.
date: 2015-03-05
last_modified_at: 2018-02-09
tags: [skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: minty
og_image: ./assets/img/skinspreview/minty.png
skin_author: Bootswatch
---

Developed by [Bootswatch](https://bootswatch.com/). To use this skin, update the following settings in `_config.yml`:

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
{: .alert .alert-info .p-3 .mx-2 .mb-3}

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
