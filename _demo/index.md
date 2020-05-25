---
title: "Demos"
subtitle: All demos in one place
permalink: /demo
show_bottomnavs: 
---



<div id="disqus_thread"></div>
<script>

/**
*  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
*  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
/*
var disqus_config = function () {
this.page.url = "https://dieghernan.github.io/jt/demo";  // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = "AAFFGG"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};
*/
(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');
s.src = 'https://chulapa.disqus.com/embed.js';
s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
                


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