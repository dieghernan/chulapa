---
layout: default
title: some title
other: other thing 
---

Themer

{% if site.chulapa-skin.autothemer %}
@import "skins/auto";
{% endif %}

{% assign nufonts = site.chufont | split: "," %}


$font-family-sans-serif:{%- for font in nufonts -%}  "{{ font }}" , {%- endfor -%} -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;





{% if site.chufont %}

$font-family-sans-serif: "{{ site.chufont }}", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;



{% else %}

$font-family-sans-serif:      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji" !default;

{% endif %} 




{{ site.chulapa-skin.cols }}


{% for cols in site.chulapa-skin.cols %}
{% if cols[1] %}
${{ cols[0] }}: {{ cols[1] }};
{% endif %}
{% endfor%}

Test1

    {%- for font in site.googlefonts -%}
   Aa{{ font.url }}bb

    {%- endfor -%}

End test
Test2

{{ site.chulapa-skin.cols }}

    {%- for font in site.googlefonts2 -%}
   Aa{{ font.url }}bb

    {%- endfor -%}

End test


Test2

    {%- for font in site.googlefonts2 -%}
    Bb{{ font.url }}bb

    {%- endfor -%}

End test


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

{% assign: cols = site.chulapa-theme.cols %}

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
