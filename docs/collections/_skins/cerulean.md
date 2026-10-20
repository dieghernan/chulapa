---
layout: default
title: Cerulean
subtitle: A calm blue sky
excerpt: Cerulean, a calm blue sky, developed by Bootswatch.
date: 2026-10-20
last_modified_at: 2026-10-20
tags: [skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: cerulean
og_image: ./assets/img/skinspreview/cerulean.png
skin_author: Bootswatch
---

Developed by [Bootswatch](https://bootswatch.com/cerulean/). Added in **2.2.0
(unreleased)** using the original [Bootswatch 4.6.2 Sass](https://github.com/thomaspark/bootswatch/tree/v4.6.2/dist/cerulean).
Original colors, typography and component styles are retained, including their
contrast limitations. This skin has not received the button palette adjustments
used by some other bundled skins.

Set the skin in `_config.yml`, keeping your other settings:

```yaml
chulapa-skin:
  skin: cerulean
```

Restart your local preview after changing `_config.yml`. If you already use
`vars`, those overrides still apply. Autothemer fills undefined colors only; see
the [autothemer guide]({{ "/docs/27-autothemer" | relative_url }}). Check text,
links and keyboard focus against the actual backgrounds on your site.

{% if page.show_bottomnavs -%}
{% include components/navbeforeafter.html -%}
{% endif -%}
{% if page.show_categories -%}
{% include components/categories.html-%}
{% endif -%}
{% if page.show_tags -%}
{% include components/tags.html-%}
{% endif -%}

{% include snippets/bootstrapdemo.html %}
