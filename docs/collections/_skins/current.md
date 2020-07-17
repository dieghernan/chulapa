---
layout: default
header_type       : "hero"
header_img : "./assets/img/gallery/florian-wehde-WBGjg0DsO_g-unsplash.jpg"
title: Current skin
subtitle: Showing al the different Bootstrap components available
date: 2015-03-03
last_modified_at: 2018-02-07
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
