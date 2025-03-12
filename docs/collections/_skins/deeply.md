---
layout: default
title: Deeply
subtitle: A dark background theme with bold contrasting colors
excerpt: Deeply, a dark background theme with bold contrasting colors developed by Tophat Themes.
date: 2015-03-04
last_modified_at: 2018-02-08
header_img: https://images.unsplash.com/photo-1512618831669-521d4b375f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80
tags: [dark-skin, skin, bootstrap, tophat, header-splash, image]
categories: [skins]
skin: deeply
og_image: ./assets/img/skinspreview/deeply.png
skin_author: Tophat Themes
---


Developed by [Tophat Themes](https://themesguide.github.io/top-hat/dist/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  deeply
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
