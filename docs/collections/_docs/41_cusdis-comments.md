---
title: Connect an existing self-hosted Cusdis service
subtitle: Configure the host and application ID for one post
tags: [docs, comments]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use this guide only if you already operate a working self-hosted Cusdis service
and have its host URL and application ID.

**Compatibility:** [Cusdis](https://github.com/djyde/cusdis) is deprecated and
archived; its original hosted service is unavailable. This guide connects an
existing deployment, not a new hosted account. For another supported provider,
see [giscus](./13-giscus-comments) or [the comments reference](./02-config#comments).
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Connect the host

In `_config.yml`, edit the existing `comments` section, or add it once if absent.
Replace the example URL and ID with values from your service's embed code:

```yaml
comments:
  provider: cusdis
  cusdis_host: "https://comments.example.com"
  cusdis_app_id: "YOUR_APPLICATION_ID"
```

Use the host's HTTPS base URL, not a script URL. Preserve unrelated settings.
Keep your existing application ID and page addresses when reconnecting old
threads. Do not add a second Cusdis embed script; the theme supplies its adapter.

## Enable one post

Open an existing post using `layout: default`. Add or update this value between
its existing `---` lines, preserving the title, date, layout and other settings:

```yaml
show_comments: true
```

Selecting a provider alone does not enable comments on the page. Save all changes
on the publishing branch, wait for **Actions** to succeed and open the article
on your public website.

## Verify the connection

Check that the comment interface loads from your host below the article. If
appropriate, submit a test comment and verify it in your service. Check existing
threads too; the theme supplies page identifiers automatically, so a change of
theme or provider may require service-side thread matching. Comments do not
migrate automatically between providers.

If it does not load, verify the host and app ID, `show_comments`, layout and site
build. Check failed requests to your host, HTTPS/mixed-content errors, browser
blockers and any Content Security Policy. Omitting `cusdis_host` uses the old
`https://cusdis.com` default; it does not select your self-hosted service.

For more posts, set `show_comments: true` individually or merge it into an
appropriate existing [front matter default](./04-layouts#a-note-on-defaults).
Other providers and exact fields are in [the comments reference](./02-config#comments).
