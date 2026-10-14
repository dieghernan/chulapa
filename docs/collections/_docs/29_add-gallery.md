---
title: Add a photo gallery
subtitle: Group uploaded photographs in a masonry gallery
---

Use this guide for an existing post or page that uses a theme layout and can
already display an image. To upload a single photograph first, see
[Add an image](./17-add-image).

## Group the photographs

Upload your photographs into `assets/img/gallery/` in your repository. In
`_config.yml`, append this entry to the existing `defaults` list; keep all other
entries. If `defaults` already exists, append only the `- scope` entry below,
not a second `defaults:` key. If the list does not exist, add the complete block:

```yaml
defaults:
  - scope:
      path: "assets/img/gallery"
    values:
      image_col: gallery
```

Use filenames such as `01-coast.jpg` and `02-harbour.jpg` to choose an order.

## Insert the gallery

In the Markdown body of your post or page, add:

{% raw %}
```liquid
{% include_cached snippets/masonry.html internal="gallery" index_sort="basename" index_sort_asc=true %}
```
{% endraw %}

The group name must match `image_col`. These parameters belong in the include
call, not in the settings block at the top of the page.

Gallery snippets generate generic image descriptions. For photographs that need
individual descriptions, use [image markup with descriptive alternative text](./17-add-image)
and accompanying captions instead.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for **Actions** to
succeed, then open the site from **Settings > Pages**. Check the published page,
not only GitHub's file preview. For a local preview, restart Jekyll after changing
`_config.yml`. If the result is missing, use [the publishing checks](./05-faq#why-can-i-not-see-my-changes).

Check that every photograph appears in filename order and that the gallery fits
a narrow screen. If it is empty, check the uploaded folder, `defaults` path and
group name. If your files use a different folder, adapt that path in `defaults`.

To open images in a viewer, follow [Enable PhotoSwipe](./31-photoswipe).
For external image lists, sorting, limits and a runnable specimen, see
[the gallery reference](./04-layouts#masonry-gallery).
