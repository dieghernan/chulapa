---
title: Gallery
subtitle: An example 
permalink: /gallery
---

This is an example on how to use the `masonry` snippet.

## External images

You can use it with external images, just assign all the values separated by `,`:

{% raw %}
```
{% assign externalgallery = "
https://picsum.photos/seed/1/600/325,
https://picsum.photos/seed/2/600/1200,
https://picsum.photos/seed/3/800/900,
https://picsum.photos/seed/4/500/1300,
https://picsum.photos/seed/5/750/325,
https://picsum.photos/seed/6/600" %}

{% include_cached snippets/masonry.html external=externalgallery %}
```
{% endraw %}

That would produce this results:

{% assign externalgallery = "
https://picsum.photos/seed/1/600/325,
https://picsum.photos/seed/2/600/1200,
https://picsum.photos/seed/3/800/900,
https://picsum.photos/seed/4/500/1300,
https://picsum.photos/seed/5/750/325,
https://picsum.photos/seed/6/600" %}

{% include_cached snippets/masonry.html external=externalgallery %}

## Intenal gallery

An example of internal gallery


{% include_cached snippets/masonry.html internal="gallery" %}




