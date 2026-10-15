---
title: Enable PhotoSwipe on a gallery
subtitle: Open gallery images in a zoomable viewer
---

Use this guide for an existing [gallery](./29-add-gallery) or
[carousel](./30-add-carousel).

**Version requirement:** PhotoSwipe is available on `main` after v2.1.0
(v2.1.1-dev), not in the v2.1.0 gem or a remote theme pinned to that release.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Enable the viewer

In the Markdown body of your page, find its existing gallery include and add
`photoswipe=true`, preserving the other parameters. For example:

{% raw %}
```liquid
{% include_cached snippets/masonry.html internal="gallery" photoswipe=true %}
```
{% endraw %}

For a carousel, add the same parameter to its existing include:

{% raw %}
```liquid
{% include_cached snippets/carousel.html internal="gallery" photoswipe=true controls=true interval=0 %}
```
{% endraw %}

Use the boolean `true` without quotes. This is an include parameter, not a page
or site YAML setting. If your site has a Content Security Policy, allow scripts
and styles from `https://cdn.jsdelivr.net`.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for **Actions** to
succeed, then open the site from **Settings > Pages**. Check the published page,
not only GitHub's file preview. For a local preview, restart Jekyll after changing
`_config.yml`. If the result is missing, use [the publishing checks](./42-unpublished-changes).

Open an image, try the viewer's controls and press Escape to close it. Check that
keyboard focus returns to the image. Also try swiping on a touch device when
available. If the viewer cannot load, the image link opens the original file.

Try the [live PhotoSwipe demo](../demo/14-photoswipe). For supported image sources,
loading behavior and accessibility constraints, see
[the PhotoSwipe reference](./04-layouts#photoswipe-lightbox).
