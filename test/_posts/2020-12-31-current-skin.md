---
header_type: "hero"
header_img : "https://picsum.photos/id/1018/2000/2000"
title: Current skin
subtitle: Showing al the different Bootstrap components available
last_modified_at: 2021-02-03
tags: [skin, bootstrap, current-theme, header-hero, image]
categories: [skins]
---


This is a demo page showing the different components of Bootstrap and how they look on this site under the current configuration.




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
