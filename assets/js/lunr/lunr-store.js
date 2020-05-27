---
layout: null
---
//Taken from minimal-mistakes: https://github.com/mmistakes/minimal-mistakes/

var store = [
  {%- for c in site.collections -%}
    {%- assign docs = c.docs | where_exp:'doc','doc.search != false' -%}
    {%- for doc in docs -%}
        {%- assign teaser = doc.header_img | default: site.og_image -%}
      {
        "title": {{ doc.title | jsonify }},
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
            strip_html | strip_newlines | truncatewords: 50 | jsonify }},
        "categories": {{ doc.categories | jsonify }},
        "tags": {{ doc.tags | jsonify }},
        "url": {{ doc.url | absolute_url | jsonify }},
        "img": {{ teaser | absolute_url | jsonify }}
      }{%- unless forloop.last -%},{%- endunless -%} 
    {%- endfor -%}
  {%- endfor -%}]
