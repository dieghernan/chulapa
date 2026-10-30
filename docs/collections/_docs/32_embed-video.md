---
title: Embed a video
subtitle: Add a named YouTube player to a post or page
tags: [docs, content, media]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an existing Markdown post or page that uses a theme layout.
Have the YouTube video's address and title ready.

**Version:** accessible player and play-button names derived from `name` and
the YouTube link shown when JavaScript is disabled require v2.2.0 or later.
In v2.1.0, `name` supplies video metadata but not those accessible names, and
the no-JavaScript link is absent. The basic embed works in both versions.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Add the player

In the body of your post or page, insert the following line. Replace the `id`
with the video identifier and `name` with its title. The identifier is the same
in these common address formats:

| YouTube address | Value for `id` |
| --- | --- |
| `https://www.youtube.com/watch?v=1hXYuWTWVww` | `1hXYuWTWVww` |
| `https://youtu.be/1hXYuWTWVww?si=example` | `1hXYuWTWVww` |
| `https://www.youtube.com/shorts/1hXYuWTWVww` | `1hXYuWTWVww` |

For a watch address use the value after `v=`; for Share or Shorts addresses use
the final path segment. Leave out query parameters such as `si` or `t`, and any
`#` fragment. For example:

{% raw %}
```liquid
{% include snippets/video.html provider="youtube" id="1hXYuWTWVww" name="Menorca - Isla Bonita" %}
```
{% endraw %}

Do not paste the entire watch URL into `id`. The player initially shows a
preview; a visitor activates it to load YouTube. If your Content Security Policy
restricts frames, allow `https://www.youtube-nocookie.com`.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for **Actions** to
succeed, then open the site from **Settings > Pages**. Check the published page,
not only GitHub's file preview. For a local preview, restart Jekyll after changing
`_config.yml`. If the result is missing, use [the publishing checks](./42-unpublished-changes).

Check the preview and activate it to play the video. Reach the preview with Tab
and activate it with Enter. Supply a nearby text summary or transcript and use
captioned media where needed; the theme does not create captions or transcripts.

If the preview image is unavailable, add `video_res="hqdefault"` to the include
and check again. If playback is blocked, check the video's embedding permissions
and browser or network restrictions.

For other supported providers, a hosted MP4, immediate iframe loading or video
metadata, use [the video reference](./04-layouts#video-support) and
[metadata fields](./04-layouts#optional-video-metadata). `thumbnail_url` describes
the video to search engines; it does not replace the visible preview.

In v2.2.1 (development), these includes also generate JSON-LD for the video,
using the same metadata and identity as the existing microdata. To check it,
view the published page's source and find `"@type": "VideoObject"` inside an
`application/ld+json` script. This does not guarantee video indexing or change
when the player loads; see [video structured data limitations](./04-layouts#video-structured-data-limitations).
