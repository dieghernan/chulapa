---
title: Create and publish a post
subtitle: Add an article to an existing site
excerpt: Create a dated Markdown post, publish it and check that readers can find it.
tags: [docs, content, writing, publishing]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use this guide when your site is already published. For a first website, follow
[the browser tutorial](./00-start) instead.

## Create the file

In your repository's **Code** tab, choose **Add file > Create new file**.
Name it `_posts/YYYY-MM-DD-my-first-post.md`, replacing `YYYY-MM-DD` with today's
date or an earlier date, such as `2026-10-13`. A future date normally keeps the
post unpublished. Use a new filename so you do not replace an existing article.

Paste this complete example:

```markdown
---
layout: default
header_type: post
title: "My first post"
show_date: true
---

Welcome to my blog!

## A place I visited

This is where my story begins. I can write **bold text** or add
[a link](https://example.org/).
```

Replace the title and article text. Keep both `---` lines: they enclose the
page settings, also called **front matter**. Use `##` for article sections;
the layout already displays the main title.

To edit a sample post instead, open its existing file and click the pencil.
Preserve settings you are not changing. The [Markdown cheatsheet](./markdown-cheatsheet)
covers lists, tables and code; [Add an image](./17-add-image) covers photographs.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
In the <span class="chulapa">Chulapa</span> 101 blog or personal-blog starter,
follow the new article from the home-page post list. Check its title, date,
sections and links.

Other site designs need a post index or a link to the published article. Post
addresses depend on your site's `permalink` setting; the file path under `_posts`
is not its public address. Use your existing post index or generated site to
find that address, then [add a menu link](./10-edit-menu) if needed.

If the article is missing, check its filename and date, then follow
[the publishing checks](./42-unpublished-changes).
For optional page settings, use [the layout reference](./04-layouts).
