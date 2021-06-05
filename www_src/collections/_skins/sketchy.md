---
layout: default
title: Sketchy
subtitle: A hand-drawn look for mockups and mirth
excerpt: Sketchy, a hand-drawn look for mockups and mirth developed by Bootswatch.
date: 2015-03-06
last_modified_at: 2018-03-01
tags: [skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: sketchy
og_image: ./assets/img/skinspreview/sketchy.png
---


Developed by [Bootswatch](https://bootswatch.com/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

```yaml
chulapa-skin: 
  skin       :  sketchy
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
