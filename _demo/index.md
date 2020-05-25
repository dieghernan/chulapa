---
title: "Demos"
subtitle: All demos in one place
permalink: /demo
show_bottomnavs: 
---

An index of the demo collections:

## Index of demos
{% for demo in  site.demo %}
{% unless demo.url == "/demo" %}
<article>
	<h3 class="chulapa-links-hover-only"><a href="{{ demo.url | absolute_url | remove: ".html" }}">{{ demo.title }}</a></h3 >
	{%- if demo.subtitle -%}
		<h4>{{ demo.subtitle }}</h4>
  {%- endif -%}
	<p>{{ demo.content |markdownify | strip_html | strip_newlines | strip |  truncatewords: 30 }}
		<a href="{{ demo.url | absolute_url | remove: ".html"  }}">[more]</a>
	</p>
</article>
{% endunless %}
{% endfor %}

Defaults yaml:

```yaml
---
defaults:
  -
    scope:
      path: ""
    values:
      layout: "default"
      header_type: "base"
  -
    scope:
      path: ""
      type: "demo"
    values:
      layout: "default"
      header_type: "hero"
      show_bottomnavs: true
      show_sociallinks: true
---
```