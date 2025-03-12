---
layout: default
title: Sunset
subtitle: Hungover on the beach at sunrise
excerpt: Sunset, hungover on the beach at sunrise developed by Tophat Themes.
header_img: https://images.unsplash.com/photo-1503756043224-101dab0dcb30?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4bd62d181f78bd2f85ab23a677acd6f4&auto=format&w=900&q=80
date: 2019-03-07
last_modified_at: 2020-06-08
tags: [skin, bootstrap, tophat, header-splash,image]
categories: [skins]
skin: sunset
og_image: ./assets/img/skinspreview/sunset.png
skin_author: Tophat Themes
---


Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  {{ page.skin }}
  autothemer  :  # Autotheming may not have any effect
  vars        :    
    ...
```


While `autothemer` does not override the skin, it may not be fully functional. You can modify the theme defaults via `vars`.




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
