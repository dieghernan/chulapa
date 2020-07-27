---
layout: null
---
/*
Copyright (c) 2013-2020 Michael Rose and contributors
MIT License
From minimal-mistakes: https://github.com/mmistakes/minimal-mistakes/
*/
{%- if site.search.provider =="lunr" -%}
{% assign maxwords = site.search.lunr_maxwords | default: "30"  %}
var store = [
  {%- assign indexlunr = site.pages | concat: site.documents |  where_exp:'doc','doc.include_on_search != false' -%}
  {%- for doc in indexlunr -%}
      {
        "title": {{ doc.title | jsonify }},
        "subtitle": {{ doc.subtitle | jsonify }},
        "excerpt":
            {{ doc.content | newline_to_br |
              replace:"<br />", " " |
              replace:"</p>", " " |
              replace:"</h1>", " " |
              replace:"</h2>", " " |
              replace:"</h3>", " " |
              replace:"</h4>", " " |
              replace:"</h5>", " " |
              replace:"</h6>", " "|
            strip_html | strip_newlines | truncatewords: maxwords | jsonify }},
        "categories": {{ doc.categories | jsonify }},
        "date": {{ doc.date | date: "%Y-%m-%d" | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | absolute_url | jsonify }},
        "img": {{ doc.og_image | default: doc.header_img | absolute_url | jsonify }}
      }{%- unless forloop.last -%},{%- endunless -%} 
  {%- endfor -%}]
{%- endif -%}