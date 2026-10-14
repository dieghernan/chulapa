---
title: Add or change a menu link
subtitle: Make an existing page reachable from your navbar
excerpt: Edit a menu label or destination without replacing your site's other navigation settings.
show_toc: false
tags: [docs, navigation]
show_related: true
related_label: "<h2>Related documentation</h2>"
---

Use this guide when your site is already published and you have a page to link to.
If the page does not exist yet, [create it first](./16-create-page).
A menu entry does not create a page.

## Edit the link

1. Open the page on your website and note its path. For the starter's About page,
   use `/about/`. For a site at `https://ana.github.io/my-blog/about/`, the menu
   value is still `/about/`: the theme adds the site's `baseurl`.
2. In your repository's **Code** tab, open `_config.yml` and click the pencil.
   Find the existing `navbar` section and its `nav` list.
3. Change the matching entry's `title` or `url`. If it is a new destination, add
   one entry to that list. Keep other links and the existing `brand`, `style`
   and `expand` settings. Do not add a second `navbar` section.

For example, the `nav` list for Home and About is:

```yaml
navbar:
  nav:
    - title: Home
      url: /
    - title: About
      url: /about/
```

This example shows the link list, not a replacement for your complete `navbar`
section. Match the indentation of your existing entries and change the example
label and path for your page.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the run in
**Actions** to succeed, then open your website from **Settings > Pages**.
Open the menu on a narrow screen and follow the edited link. Check that it opens
the intended page, including on a site with a repository path.

If it opens a missing page, check the page's published address and its `permalink`.
If the old link remains, follow [the publishing checks](./05-faq#why-can-i-not-see-my-changes).
For dropdown links and navbar style options, consult the [navbar reference](./02-config#navbar).
