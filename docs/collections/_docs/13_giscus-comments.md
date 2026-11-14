---
title: Enable giscus comments on a post
subtitle: Connect GitHub Discussions and verify one published article
excerpt: Add the giscus embed, select the provider and enable comments on an existing post.
show_toc: false
tags: [docs, comments]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use this guide for an existing post using `layout: default` and a GitHub repository
you can configure for giscus. You need a public repository with Discussions enabled
and the giscus app installed, as described by [giscus setup](https://giscus.app/).
People posting comments through giscus sign in with GitHub.

## Connect giscus

1. Open [giscus setup](https://giscus.app/), select your repository and discussion
   category, and choose how pages map to discussions. Copy the generated embed
   script with your actual repository and category identifiers.
2. In your site repository, create or edit `_includes/custom/giscus.html`. Paste
   that generated script into the file and save it. The template includes this
   file with a comment only; it needs your embed before comments can appear.
3. In `_config.yml`, edit the existing `comments` section, or add it once:

   ```yaml
   comments:
     provider: giscus
   ```

   Preserve unrelated settings and do not add a second `comments` section.
4. Open the post and set this entry between its existing `---` lines:

   ```yaml
   show_comments: true
   ```

   Keep its title, layout, date and other settings. Do not replace the whole
   front matter block. A provider selection alone does not enable the page.
5. Save all changes to your publishing branch, wait for **Actions** to finish,
   then open the article on your public website.

If you already have giscus discussions, keep their repository, category and page
mapping choices unless you intend to change thread matching. Switching providers
does not migrate comments between services.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Verify the comments area

Scroll below the article and check that the giscus interface loads. Sign in and,
if appropriate, leave a test comment; confirm it appears in the selected repository's
Discussions. On other posts, comments remain controlled by their own front matter
or existing defaults.

If nothing appears, check the embed file, `comments.provider`, the post's
`show_comments` value and its layout. Check giscus's setup checks for app access,
Discussions/category settings and domain restrictions. Browser blockers or a
Content Security Policy can also stop the external embed from loading.

To enable more pages, set `show_comments: true` on those pages or merge it into
an existing appropriate [front matter default](./04-layouts#a-note-on-defaults).
For another existing service, use [Disqus](./38-disqus-comments),
[Cactus](./39-cactus-comments), [Welcomments](./40-welcomments-comments) or
[self-hosted Cusdis](./41-cusdis-comments). Exact identifiers and constraints
remain in [the comments reference](./02-config#comments).
