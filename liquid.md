---
layout: default
subtitle: Liquid 
---


{{ site.navbar.brand }}

{{ site.navbar.brand.title }}
{{ site.navbar.brand.url }}

{%- assign brand = site.navbar.brand.title | default: site.title | default: site.github.repository_name  -%}
{%- if site.navbar.brand.url  -%}
  {%- assign brandurl = site.navbar.brand.url  -%}
  url
{%- else -%}
  {%- assign brandurl = site.url | append: site.baseurl -%}
  default
{%- endif -%}

{{ brand }}
{{ brandurl }}

{%- assign thispageurl = page.url | replace: ".html", ""  -%}

{% for item in site.navbar %}
  {% if item.child[0] %}
- {{ item.title }}
   - {{ item }}
{% assign childurljoin  =  item.child | map: 'url' | join: ',' %}
    {% if childurljoin contains thispageurl %}
    - a
    {% endif %}
  {% else %}
    {% if item.url contains "http" %}
- <a href="{{ item.url }}">{{ item.title }}</a>
    {% else %}
- <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
    {% endif %}
  {% endif %}
{% endfor%}


Themer

{% for var in site.chufont %}
  {% if var[1] %}
   ${{ var[0] }}: {{ var[1] }};
  {% endif %}
{% endfor%}


{% assign skin = site.data.skinners[site.chulapa-skin.theme] %}

{{ skin.name }}
{{ skin.author }}
{{ skin.url }}


 @import "pygments/{{- site.chulapa-skin.highlight | default: "github" -}}";


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




{{ site.chulapa-skin.vars }}


{% for var in site.chulapa-skin.vars %}
{% if var[1] %}
${{ var[0] }}: {{ var[1] }};
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
