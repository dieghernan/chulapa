---
title: "Demos"
subtitle: All demos in one place
permalink: /demo
---

An index of the demo collections:

## Index of demos
{% for demo in  site.demo %}
<article>
	<h3><a href="{{ demo.url }}">{{ demo.title }}</a></h3 >
	{%- if demo.subtitle -%}
		<h4>{{ demo.subtitle }}</h4>
  {%- endif -%}
	<p>{{ demo.content |markdownify | strip_html | strip_newlines | strip |  truncatewords: 30 }}
		<a href="{{ demo.url }}">[more]</a>
	</p>
</article>
{% endfor %}