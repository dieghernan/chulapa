---
title: Connect Disqus comments
subtitle: Enable an existing Disqus site on one post
---

Use this guide if you already have a site registered with [Disqus](https://disqus.com/).
Have its **shortname** ready: the identifier in
`https://YOUR_SHORTNAME.disqus.com/admin/`, not the site's display name.

## Select Disqus

In `_config.yml`, edit the existing `comments` section, or add it once if absent.
Replace the example shortname and preserve unrelated settings:

```yaml
comments:
  provider: disqus
  disqus_shortname: "YOUR_SHORTNAME"
```

Do not paste a second embed script into your post; the theme supplies it.

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

Scroll below the published article and check that the Disqus interface loads.
If appropriate, post a test comment and confirm it is associated with that
article in your Disqus administration panel.

If you had comments before switching themes, check an existing discussion as
well. The theme supplies the page URL and identifier automatically; identical
URLs alone do not guarantee identical identifiers across themes. Preserve your
shortname and established URLs, and check Disqus's migration tools if threads
are mismatched. Switching providers does not transfer comments.

If no interface appears, check the shortname, `show_comments`, layout and
publishing run. Browser blockers or a Content Security Policy may block the
external embed; inspect failed requests before changing your policy.

For more posts, set `show_comments: true` individually or merge it into an
appropriate existing [front matter default](./04-layouts#a-note-on-defaults).
Other providers and exact fields are in [the comments reference](./02-config#comments).
