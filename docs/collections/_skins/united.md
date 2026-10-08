---
layout: default
title: United
subtitle: Ubuntu orange and unique font
excerpt: United, ubuntu orange and unique font developed by Bootswatch.
date: 2025-03-04
last_modified_at: 2025-03-10
tags: [skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: united
og_image: ./assets/img/skinspreview/united.png
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
