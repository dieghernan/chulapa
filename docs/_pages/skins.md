---
title: <span class="chulapa">Chulapa</span> skins
subtitle: A preview of the different skins you would have with this theme
header_type       : "hero"
header_img : "./assets/img/site/chulapa-madrid.jpg"
permalink: /skins
---

<span class="chulapa">Chulapa</span> includes predefined skins from [Bootswatch](https://bootswatch.com/), [Tophat](https://themesguide.github.io/top-hat/dist/) and other contributors. Select a preview for installation instructions and a demonstration of the skin.

Preview the documentation site's [current theme](https://dieghernan.github.io/chulapa/skins/current).

{% assign alldocs = site.documents | where_exp: "item", "item.collection == 'skins'" | sort: "date" | reverse %}

{% assign total = 0 %}
{% assign valid_skin = '' | split: ',' %}
  {% for post in alldocs %}
     {% if post.skin %}
      {% assign total = total | plus: 1 %}
      {% assign doc = alldocs | where_exp: "item", "item.id == post.id" %}
      {% assign valid_skin = valid_skin | concat: doc %}
     {% endif %}
  {% endfor %}

<p class="lead"><strong>{{ total }}</strong> skins available!</p>

<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 mx-auto">
{% for post in valid_skin -%}
  <div class="col mb-3">
  <div class="card h-100 border">
  <a href="{{- post.url | absolute_url -}}">
 <img class="card-img-top" src="{{- post.og_image | replace: ".png", ".webp" | absolute_url -}}" alt="{{ post.skin }}"></a>
     <div class="card-body text-center border-top">
      {%- if post.skin_author -%}
      <p class="card-text text-right"><span class="font-weight-bold lead">{{ post.title }}</span><br><span class="small font-weight-light font-italic text-secondary"> by {{ post.skin_author}}{% if post.skin_adapter %}; adapted for <span class="chulapa">Chulapa</span> by {{ post.skin_adapter }}{% endif %}</span></p>
      {%- endif -%}
    </div>
    <div class="card-footer text-center bg-transparent border-top-0">
    <a href="{{- post.url | absolute_url -}}" class="btn btn-primary btn-sm">Preview</a>
    </div>
  </div>
</div>
{%- endfor -%}
</div>
