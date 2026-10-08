---
layout: default
title: Focal
subtitle: Stay focus
excerpt: Focal, stay focus developed by dieghernan.
date: 2025-02-20
last_modified_at: 2025-02-24
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: focal
og_image: ./assets/img/skinspreview/focal.png
skin_author: dieghernan
---

Developed by [dieghernan](https://github.com/dieghernan/), you can use it on your site. Just go to your `_config.yml` file and modify these settings:

```yaml
chulapa-skin:
  skin       :  focal
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
