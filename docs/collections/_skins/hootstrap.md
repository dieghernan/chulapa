---
layout: default
title: Hootstrap
subtitle: It’s a hootin, hollarin ho-down y’all!
excerpt: Hootstrap, it’s a hootin, hollarin ho-down y’all! developed by Themes.guide
date: 2015-03-04
last_modified_at: 2018-02-08
tags: [skin, bootstrap, themes-guide, header-splash]
categories: [skins]
skin: hootstrap
og_image: ./assets/img/skinspreview/hootstrap.png
skin_author: Themes.guide
---

Developed by [Themes.guide](http://themes.guide/), you can use it on your site. Just go to your `_config.yml` file and modify these settings:

```yaml
chulapa-skin:
  skin       :  hootstrap
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
