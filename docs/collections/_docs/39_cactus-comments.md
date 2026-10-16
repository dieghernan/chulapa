---
title: Connect Cactus comments
subtitle: Enable an already registered Cactus site on one post
tags: [docs, comments]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use this guide after registering your site with [Cactus](https://cactus.chat/).
Have its registered site name ready. This adapter uses the Cactus-hosted Matrix
service; there is no theme setting for selecting an arbitrary Matrix homeserver.

**Adapter limitation:** the current theme passes page URLs containing `/` to
Cactus, whose [client requirements](https://cactus.chat/docs/client/introduction/)
exclude `/` and `_` from conversation IDs. Configure the local correction below
before relying on this integration, including on v2.1.0.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Select Cactus

In `_config.yml`, edit the existing `comments` section, or add it once if absent.
Replace the example site name and preserve unrelated settings:

```yaml
comments:
  provider: cactus
  cactus_shortname: "YOUR_REGISTERED_SITE_NAME"
```

Keep the theme's Cactus integration; do not add another embed to the post.

## Correct the conversation identifier

Copy `_includes/components/cactus.html` from your installed theme version into
the same path in your repository. The [development source](https://github.com/dieghernan/chulapa/blob/main/_includes/components/cactus.html)
shows the file's structure. Preserve the rest of the file and replace only its
`commentSectionId` line with:

{% raw %}
```liquid
    commentSectionId: "{{ include.pageurl | url_encode | replace: '_', '%5F' }}"
```
{% endraw %}

This encodes `/` and `_` without collapsing distinct paths such as `/a/b/` and
`/a-b/` into one conversation ID. The same page URL always produces the same ID.
Keep the local file under review when upgrading the theme.

**Existing conversations:** changing an ID can disconnect an old thread. Record
the IDs used by your existing integration and check their matching before
publishing this override. If they differ, arrange migration with the provider
or retain the existing valid mapping in your local adapter. Changing the theme's
identifier does not move Matrix conversations automatically.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

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
keep the registered site name, established page addresses and verified conversation
ID mapping.
Changing providers does not migrate comments.

If the area is missing, check the registered site name, `show_comments`, layout
and publishing run. Check external script/network failures and any Content
Security Policy or browser blocker before changing the setup.

In `main` after v2.1.0 (v2.1.1-dev), Cactus scripts and styles load only on
pages with `show_comments: true`. That loading improvement is not in v2.1.0;
the identifier correction above is still required for this guide on that release.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

For more posts, set `show_comments: true` individually or merge it into an
appropriate existing [front matter default](./04-layouts#a-note-on-defaults).
Other providers and exact fields are in [the comments reference](./02-config#comments).
