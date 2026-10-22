---
title: Add a manual slideshow
subtitle: Display an image group with previous and next controls
tags: [docs, content, media, images, galleries]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an existing post or page. First upload and group photographs
following [Add a photo gallery](./29-add-gallery#group-the-photographs). Keep the
same `image_col: gallery` group; a custom layout must load Bootstrap's scripts
for slideshow controls to work.

**Version requirement:** this recipe's filename ordering and keyboard-operable
buttons and indicators require v2.2.0 or later. In v2.1.0, the sort field is
not applied correctly,
indicators cannot receive keyboard focus and previous/next links do not activate
with Space.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Insert a carousel

Add this to the Markdown body of your page, replacing a masonry include if you
want to display the same photographs only once:

{% raw %}
```liquid
{% include_cached snippets/carousel.html internal="gallery" index_sort="basename" index_sort_asc=true interval=0 controls=true indicators=true %}
```
{% endraw %}

This starts with manual navigation. Pass `0` without quotes to stop automatic
cycling; pass `true` without quotes for the controls and slide indicators.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for **Actions** to
succeed, then open the site from **Settings > Pages**. Check the published page,
not only GitHub's file preview. For a local preview, restart Jekyll after changing
`_config.yml`. If the result is missing, use [the publishing checks](./42-unpublished-changes).

Check the previous/next buttons and indicators on a narrow screen. Use Tab to
reach each control and Enter or Space to activate it. An empty slideshow usually
means the folder or `image_col` group does not match the include.

For optional automatic cycling, timing and control colors, see
[the carousel reference](./04-layouts#bootstrap-carousel). For a zoomable viewer,
follow [Enable PhotoSwipe](./31-photoswipe).
