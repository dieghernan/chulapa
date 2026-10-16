---
title: Create a page and link it from the menu
subtitle: Publish a standalone page on an existing site
excerpt: Add a Contact page, give it a public address and make it reachable from your navbar.
tags: [docs, content, writing, publishing]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use this guide when your site is already published and you want a page such as
Contact or About. Unlike a post, its filename does not need a date.

## Create or edit the page

In your repository's **Code** tab, choose **Add file > Create new file**.
For the <span class="chulapa">Chulapa</span> 101 template, name the file
`_pages/contact.md`. If it already exists, edit it instead of creating another
page at the same address. You can also edit the starter's `_pages/about.md`.

For a new Contact page, paste:

```markdown
---
layout: default
header_type: base
title: "Contact"
permalink: /contact/
---

You can email me at [hello@example.org](mailto:hello@example.org).
```

Replace the sample email address and text. Keep both `---` lines around the
page settings, also called **front matter**. `permalink` sets the page's public
path. Keep `/contact/` for this example and choose an unused path for other pages.
When editing an existing page, preserve its address unless you intend to change
links that already point to it.

For a site without the starter's `_pages` setup, create `contact.md` beside
`_config.yml` instead. You do not need a new collection or layout.

## Add the menu link

Save the page with **Commit changes** on your publishing branch. Follow
[Add or change a menu link](./10-edit-menu) to add a Contact entry with
`url: /contact/` to your existing navbar list. Keep other links and settings.
For a site under `/my-blog`, use `/contact/`, not `/my-blog/contact/`:
the theme adds the repository path.

## Publish and check

Wait for the latest run in **Actions** to succeed. Open your website from
**Settings > Pages**, then follow Contact from the menu, including on a narrow
screen. Check the heading, text and email destination. Creating the file alone
does not add it to the menu.

If the page returns 404, check that the file was saved and the menu path matches
its `permalink`. Check for another file producing the same path, then use
[the publishing checks](./42-unpublished-changes).
For optional page settings, consult [the layout reference](./04-layouts).
