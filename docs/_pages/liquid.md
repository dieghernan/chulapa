---
layout: minimal
title: Playground
subtitle: Liquid 
permalink: /liquid
show_author : true
include_on_search: false
test: demo
---


{% include snippets/video.html id="xsr67x" provider="dailymotion" %}


{%- assign alldocs = site.documents -%}


{% assign grouptag =  alldocs | map: 'tags' | join: ','  | split: ','  | group_by: tag | sort: 'size' | reverse %}

{{ grouptag | inspect }}



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