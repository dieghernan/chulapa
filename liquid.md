---
layout: base
title: some title
other: other thing 
---

{{ site.static_files }}

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

{{ site | inspect }}
