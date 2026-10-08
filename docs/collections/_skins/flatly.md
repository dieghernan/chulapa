---
layout: default
title: Flatly
subtitle: Flat and modern
excerpt: Flatly, flat and modern developed by Bootswatch.
date: 2025-02-23
last_modified_at: 2025-03-03
tags: [skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: flatly
og_image: ./assets/img/skinspreview/flatly.png
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
