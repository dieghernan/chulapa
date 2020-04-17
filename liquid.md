---
layout: base
title: some title
other: other thing 
---

# One
{{ page }}

# A
{% for item in site.github %}
-  {{ item }}
{% endfor %}

