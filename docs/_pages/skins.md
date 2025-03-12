---
title: <span class="chulapa">Chulapa</span> Skins
subtitle: A preview of the different skins you would have with this theme
header_type       : "hero"
header_img : "./assets/img/site/chulapa-madrid.jpg"
permalink: /skins
---

<span class="chulapa">Chulapa</span> includes a wide collection of predefined skins, developed by different providers as [Bootswatch](https://bootswatch.com/) and [Tophat](https://themesguide.github.io/top-hat/dist/). Click on the preview to learn more and instructions on how to install it, it's easy and fast!

Additionally, you can have a preview of the current theme [here](https://dieghernan.github.io/chulapa/skins/current).


{% assign alldocs = site.documents | where_exp: "item", "item.collection == 'skins'" | sort: "date" | reverse %}

<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 mx-auto">
{% for post in alldocs -%} 
  {%- if post.skin -%}
  <div class="col mb-3">
  <div class="card h-100 border-light">
  <a href="{{- post.url | absolute_url -}}">
 <img class="card-img-top" src="{{- post.og_image | replace: ".png", ".webp" | absolute_url  -}}" alt="{{ post.skin }}"></a>
     <div class="card-body text-center">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text">{{ post.subtitle}}</p>
      <p><a href="{{- post.url | absolute_url -}}" class="btn btn-primary btn-sm">Preview</a></p>
    </div>
  </div>
  </div>
 {%- endif -%}
{%- endfor -%}
</div>



