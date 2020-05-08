---
layout: base
title: some title
other: other thing 
---

{% for item in site.static_files %}
-  {{ item }} - {{ item.path }}
{% endfor %}


{{ site.ext-css }}

{% for item in site.ext-css %}
- {{ item.name }} {{ item.url }}
{% endfor %}

{{ site.ext-css2 | default: 'empty' }}

{% for item in site.ext-css2 %}
- {{ item.name | default: "empty name" }} {{ item.url | default: "empty url" }}
{% endfor %}

{{ site.chulapa-theme }}

{% assign: cols = site.chulapa-theme.col %}

{{ cols.main  }}

{{ site.chulapa-theme.col.main }}
# One
{{ page }}

{% assign image_files = site.static_files %}
{% for myimage in image_files %}
  {{ myimage.name }}
{% endfor %}

# A
{% for item in site.github %}
-  {{ item }} - {{ item | inspect }}
{% endfor %}

# C
{% for item in site %}
-  {{ item }} - {{ item[0] }}
{% endfor %}

# D

{{ site.github | inspect }}
