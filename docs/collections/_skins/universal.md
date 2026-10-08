---
layout: default
title: Universal
subtitle: Clean & Stylish
excerpt: Universal, clean and stylish by Bootstrapious.
header_img: /assets/img/site/texture-bw.png
date: 2022-03-07
last_modified_at: 2022-11-23
tags: [skin, bootstrap, dieghernan, header-splash,image]
categories: [skins]
skin: universal
og_image: ./assets/img/skinspreview/universal.png
skin_author: Bootstrapious
skin_adapter: dieghernan
---

<!-- FIXME: Restore the Bootstrapious attribution link when its site has a valid TLS certificate. -->

The original design is by Bootstrapious. The <span class="chulapa">Chulapa</span> skin was adapted by
[dieghernan](https://github.com/dieghernan/). To use it on your site, update
these settings in `_config.yml`:

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
