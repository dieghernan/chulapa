---
layout: default
title: Cyborg
subtitle: Jet black and electric blue
excerpt: Cyborg, jet black and electric blue developed by Bootswatch.
date: 2025-02-21
last_modified_at: 2025-03-01
tags: [dark-skin, skin, bootstrap, bootswatch, header-splash]
categories: [skins]
skin: cyborg
og_image: ./assets/img/skinspreview/cyborg.png
skin_author: Bootswatch
---


Developed by [Bootswatch](https://bootswatch.com/), you can use it on your site. Just go to your `_config.yml` file and modify this lines

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
