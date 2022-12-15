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


{% for post in alldocs -%} 
  {%- if post.skin -%}
  <div class="my-2">
  <a href="{{- post.url | absolute_url -}}">
 <img class="w-100 rounded border" src="{{- "./assets/img/skinspreview/" | append: post.skin | append: ".webp" | absolute_url  -}}" alt="{{ post.skin }}"></a>
 </div>
 {%- endif -%}
{%- endfor -%}




