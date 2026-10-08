---
layout: default
title: Academia
subtitle: It purifies, it fixes, and it dignifies
excerpt: Academia, It purifies, it fixes, and it dignifies developed by dieghernan.
date: 2021-03-20
last_modified_at: 2021-04-28
tags: [skin, bootstrap, dieghernan, header-splash]
categories: [skins]
skin: academia
og_image: ./assets/img/skinspreview/academia.png
skin_author: dieghernan
---

Developed by [dieghernan](https://github.com/dieghernan/). To use this skin, update the following settings in `_config.yml`:

```yaml
chulapa-skin:
  skin       :  academia
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
