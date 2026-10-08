---
layout: default
title: Electro
subtitle: The intense, saturated blue theme with rounded buttons
excerpt: Electro, the intense, saturated blue theme with rounded buttons.
date: 2025-02-14
last_modified_at: 2025-02-20
tags: [skin, tophat, bootstrap, header-splash]
categories: [skins]
skin: electro
og_image: ./assets/img/skinspreview/electro.png
skin_author: Tophat Themes
---

Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/). To use this skin, update the following settings in `_config.yml`:

```yaml
chulapa-skin:
  skin       :  electro
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
