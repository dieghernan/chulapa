---
layout: default
title: Wandoo
subtitle: A pleasant theme with red primary color
excerpt: Wandoo, a pleasant theme with red primary color developed by Tophat Themes.
date: 2020-03-07
last_modified_at: 2020-06-08
tags: [skin, bootstrap, tophat, header-splash]
categories: [skins]
skin: wandoo
og_image: ./assets/img/skinspreview/wandoo.png
skin_author: Tophat Themes
---

Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/). To use this skin, update the following settings in `_config.yml`:

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
