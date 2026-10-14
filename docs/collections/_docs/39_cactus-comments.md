---
title: Connect Cactus comments
subtitle: Enable an already registered Cactus site on one post
---

Use this guide after registering your site with [Cactus](https://cactus.chat/).
Have its registered site name ready. This adapter uses the Cactus-hosted Matrix
service; there is no theme setting for selecting an arbitrary Matrix homeserver.

## Select Cactus

In `_config.yml`, edit the existing `comments` section, or add it once if absent.
Replace the example site name and preserve unrelated settings:

```yaml
comments:
  provider: cactus
  cactus_shortname: "YOUR_REGISTERED_SITE_NAME"
```

Keep the theme's Cactus integration; do not add another embed to the post.

## Enable one post

Open an existing post using `layout: default`. Add or update this value between
its existing `---` lines, preserving the title, date, layout and other settings:

```yaml
show_comments: true
```

Selecting a provider alone does not enable comments on the page. Save all changes
on the publishing branch, wait for **Actions** to succeed and open the article
on your public website.

## Verify the discussion

Scroll below the article and check that the comment interface loads. If
appropriate, submit a test comment through the provider's interface and verify
that it belongs to this article. Check an existing thread when upgrading;
keep the registered site name and established page addresses to preserve matching.
Changing providers does not migrate comments.

If the area is missing, check the registered site name, `show_comments`, layout
and publishing run. Check external script/network failures and any Content
Security Policy or browser blocker before changing the setup.

In `main` after v2.1.0 (v2.1.1-dev), Cactus scripts and styles load only on
pages with `show_comments: true`. That loading improvement is not in v2.1.0;
the provider configuration above is supported by that release.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

For more posts, set `show_comments: true` individually or merge it into an
appropriate existing [front matter default](./04-layouts#a-note-on-defaults).
Other providers and exact fields are in [the comments reference](./02-config#comments).
