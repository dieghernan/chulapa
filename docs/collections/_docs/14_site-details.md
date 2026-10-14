---
title: Change your site's name and author
subtitle: Update the identity of an already published site
excerpt: Edit your site title, description and author without changing its public address or other configuration.
show_toc: false
tags: [docs, navigation]
show_related: true
---

Use this guide when your site is already published and you want to replace its
sample name, description or author. For a first publication, use
[the browser tutorial](./00-start).

## Update the existing site settings

In your repository's **Code** tab, open `_config.yml` and click the pencil.
Find the existing `title`, `description` and `author.name` entries and change their
values. For example:

```yaml
title: "Ana's blog"
description: "Travel stories and photographs"
author:
  name: "Ana"
```

Replace the example with your own details. Edit the existing entries instead of
pasting a second section or replacing the whole file. Preserve other author fields,
such as `url`, `avatar`, `location` and `links`, and keep their indentation.

Leave `url`, `baseurl`, `repository` and post addresses unchanged for this task.
They identify your site's location, not its display name. The template supplies
the publishing path automatically. For a different hosting setup, consult the
[site settings reference](./02-config#a-site-settingsseo).

Save with **Commit changes** on your publishing branch.

## Match the home-page heading

In the <span class="chulapa">Chulapa</span> 101 template, open the existing
[`index.html`](https://github.com/dieghernan/chulapa-101/blob/main/index.html) file
and change its `title` between the opening `---` lines:

```yaml
title: "Ana's blog"
```

Keep its filename, layout, other settings and content, then save. If your site uses
a different home-page source, edit that existing file rather than adding or
renaming an index. The page title supplies the visible heading separately from
the site title.

## Publish and check

Wait for the latest run in **Actions** to succeed, then open the address in
**Settings > Pages**. Check your browser tab's title and the home-page heading.

Check the author on a page that displays the site's author, or in the automatic
footer attribution. A page with its own `author` keeps that author; a custom
`footer.copyright` is not rewritten when you change `author.name`.
For those fields, use the [author reference](./02-config#site-author) and
[footer reference](./02-config#footer).

The site description is metadata, not a replacement for the visible text of your
pages. A page's own description or excerpt can take precedence; see the
[description rules](./04-layouts#seo-metadata) when checking a shared-page preview.

If the old values remain, follow [the publishing checks](./05-faq#why-can-i-not-see-my-changes).
For local preview, restart Jekyll after editing `_config.yml`.
