---
title: Add a caption below an image
subtitle: Keep the visible caption separate from alternative text
tags: [docs, content, media, images]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an existing Markdown post or page with an uploaded image.
For uploading and checking the path, follow [Add an image](./17-add-image) first.
The example uses the sample site's kramdown Markdown parser.

## Add the caption paragraph

Below the settings block at the top of the article, use your image followed by
a separate paragraph and its attribute line:

{% raw %}
```liquid
![A riverside path beneath green trees]({{ '/assets/img/river.jpg' | relative_url }})

The riverside path in spring.
{: .caption}
```
{% endraw %}

Replace the path with your uploaded file and both descriptions with text about
your photograph. Keep `relative_url` for a repository-based site. The caption is
visible to readers; it does not replace the alternative text in square brackets.
Keep a blank line before the caption and no blank line between it and `{: .caption}`.

## Publish and verify

Commit on the publishing branch, wait for **Actions** to succeed and open the
article on your website. Check that the image loads and that the caption appears
below it with caption styling. Check it on a narrow screen.

For a missing image, follow [the image checks](./17-add-image#publish-and-check).
If the class text is visible or attaches to the wrong paragraph, check the blank
lines and your [Markdown parser](./markdown-cheatsheet). For a stale public page,
use [publishing checks](./42-unpublished-changes).
