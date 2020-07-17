---
layout: minimal
title: Playground
subtitle: Liquid 
permalink: /liquid
show_author : true
test: demo
---


{% assign cols = page.test | split: "," %}



{% for col  in cols %}
{% if forloop.first %}
{%- assign alldocs = site.documents | where_exp: "item", "item.collection == col" -%}
{% else %}
{% assign docloop = site.documents | where_exp: "item", "item.collection == col" %}
{%- assign alldocs = alldocs | concat: docloop %}
{% endif %}
{% endfor %}

{% for doc in alldocs %}
- {{ doc.title }}
{% endfor %}