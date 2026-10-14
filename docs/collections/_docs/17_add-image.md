---
title: Add an image to a post or page
subtitle: Upload a photograph and display it in your content
excerpt: Upload an image, use a repository-safe path and check the published result.
tags: [docs, content]
show_related: true
---

Use this guide when you already have a post or page to edit in a published site.
For several images, use the [gallery guide](./29-add-gallery)
or [slideshow guide](./30-add-carousel) instead.

## Upload the file

Resize a large photograph before uploading it so visitors do not have to download
the full original. In your repository's **Code** tab, open `assets/img/`, choose
**Add file > Upload files**, select your image and save with **Commit changes**
on your publishing branch. If that folder does not exist, use GitHub's upload
page to drag a local `assets` folder containing `img/river.jpg` into the repository
root. Preserve any existing files.

Use a simple filename such as `river.jpg`, without spaces. Keep the exact spelling,
including uppercase and lowercase letters.

## Insert it into the content

Open the post or page file and click the pencil. In the article text, below the
settings block between `---` lines, insert:

{% raw %}
```liquid
![A riverside path beneath green trees]({{ '/assets/img/river.jpg' | relative_url }})
```
{% endraw %}

Replace the path with your uploaded file's path. Keep `relative_url`: it adds
the site's repository path when needed. Do not add that prefix yourself.
Replace the text in square brackets with a useful description of your image;
readers who cannot see the photograph use that description.

Save the post or page with **Commit changes** on the same publishing branch.

## Publish and check

Wait for the latest run in **Actions** to succeed. Open the published article
from your website, rather than relying on GitHub's file preview. Check that the
image loads and fits the content on a narrow screen.

If it is missing, compare the uploaded filename, extension and capitalization
with the link. Verify both the image upload and article edit were saved, then
follow [the publishing checks](./05-faq#why-can-i-not-see-my-changes).
For captions, see [the caption example](./05-faq#add-a-caption).
For video, use [Embed a video](./32-embed-video).
