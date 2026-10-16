---
title: Set a post's sharing text and images
subtitle: Prepare metadata without changing the visible article
---

Use this guide for an existing post when you want a specific description and
image in its sharing metadata. The theme supplies the tags; do not paste another
Open Graph or JSON-LD block into a custom head hook.

## Upload the image and edit the post

Upload your photograph to `assets/img/article.jpg`, or use the actual path of
an image already in your repository. Keep its exact filename and capitalization.
In the post's existing front matter, add or update these fields, preserving the
post title, date, permalink and other settings:

```yaml
description: A short account of an evening walk through Madrid.
og_title: An evening walk in Madrid
og_image: /assets/img/article.jpg
og_image_alt: A street in Madrid at night
schema_image: /assets/img/article.jpg
```

Replace the text and image path with your own. `description` supplies metadata
text and `og_title` supplies the sharing title; they do not replace the article's
visible heading. `og_image` supplies its social image and `schema_image` supplies
the illustration URLs in a post's `BlogPosting` structured data. A regular page's
structured data does not become an article merely by setting `schema_image`.

These fields do not insert a photograph into the article body. Use
[Add an image](./17-add-image) for visible content. Keep `header_img` only if you
also want a header image. If you have several existing article illustrations,
the [image reference](./04-layouts#article-images) accepts a list; the theme does
not generate crops or inspect dimensions. Supply width/height/type only when
known and accurate, using the [social image fields](./04-layouts#seo-metadata).

## Publish and inspect the metadata

Commit the image and post edits, wait for **Actions** to succeed and open the
published post. Inspect its HTML source: check `og:title`, the description,
`og:image` and its alt text. In the `BlogPosting` JSON-LD script, check the `image`
array. Open each generated image URL and confirm it loads, including the
repository path on project sites. Check the visible article heading is unchanged.

The [Welcome post]({{ '/blog/20200515_welcome' | relative_url }}) is a live example
with an explicit article image and a header photograph. Its
[source](https://github.com/dieghernan/chulapa/blob/main/docs/collections/_posts/2020-05-15-welcome.md)
shows the actual values; the field reference keeps the complete fallback rules.

If sharing still shows old data, first check the published source and image URL,
then refresh the preview using the sharing service's tools when available.
Services can cache previews and choose different crops or text. Correct metadata
does not guarantee a particular preview or search result. Use
[publishing checks](./42-unpublished-changes) if the source itself is old.
