---
layout: base
title: some title
other: other thing 
---

# One
{{ page }}

# A
{% for item in site.github %}
-  {{ item }} - {{ item | inspect }}
{% endfor %}

# C
{% for item in site %}
-  {{ item }} - {{ item | inspect }}
{% endfor %}
