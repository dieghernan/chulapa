---
layout: null
---
/* Demo for docs. Don't use this script on production */
{% assign maxwords = 500  %}
var store = [
{%- assign indexlunr = site.pages | concat: site.documents |  where_exp:'doc','doc.include_on_search != false' -%}
  {%- for doc in indexlunr -%}
    {%- assign descfallback = doc.content |
                              markdownify |  newline_to_br |
                              replace:"<br />", ",.," |
                              replace:"{{", ",.," |
                              replace:"{%", ",.," |
                              split: ",.," | first -%}
    {%- assign ogdesc = doc.excerpt | default: descfallback | strip_html | strip_newlines  -%}
    {
    "title": {{ doc.title | strip | jsonify }},
    "subtitle": {{ doc.subtitle | strip | jsonify }},
    "excerpt": {{ ogdesc | strip | jsonify }},
    "content": {{ doc.content | newline_to_br |
                  replace: "<br />", " " |
                  replace: "</p>", " " |
                  replace: "</h1>", " " |
                  replace: "</h2>", " " |
                  replace: "</h3>", " " |
                  replace: "</h4>", " " |
                  replace: "</h5>", " " |
                  replace: "</h6>", " " |
                  strip_html | strip_newlines | truncatewords: maxwords | strip | jsonify }},
      "categories": {{ doc.categories | jsonify }},
      "date": {{ doc.date | date: "%Y-%m-%d" | jsonify }},
      "tags": {{ doc.tags | jsonify }},
      "url": {{ doc.url | absolute_url | jsonify }},
      "img": {{ doc.og_image | default: doc.header_img | absolute_url | jsonify }}
    }{%- unless forloop.last -%},{%- endunless -%}
    {%- endfor -%}
]