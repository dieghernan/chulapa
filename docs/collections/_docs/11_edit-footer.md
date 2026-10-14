---
title: Edit footer links
subtitle: Update the contact, social or feed links below your pages
excerpt: Change footer labels and destinations, then verify the links on your published site.
show_toc: false
tags: [docs, navigation]
show_related: true
---

Use this guide for an existing site with a contact address, social profile or feed
you want visitors to open from the footer.

## Edit the links

1. In your repository's **Code** tab, open `_config.yml` and click the pencil.
   Find the existing `footer` section and its `links` list.
2. Edit a matching entry, or add an entry for a new destination. Keep other links
   and any existing `copyright` value. Do not add a second `footer` section.
3. Set a descriptive `label` and the destination `url`. Keep the entry's existing
   Font Awesome `icon`, or choose one using the [icon reference](./02-config#font-awesome).
   Use the complete icon class value, such as `fas fa-envelope` for email.

For example, this list adds an email contact and the built-in Atom feed:

```yaml
footer:
  links:
    - label: Email me
      icon: fas fa-envelope
      url: hello@example.org
    - label: Subscribe to the feed
      icon: fas fa-rss
      url: /atom.xml
```

Replace the email address with your own. Email destinations use the plain address,
without `mailto:`. A social link uses its full profile URL, such as
`https://github.com/your-account`. A site-relative feed path is `/atom.xml` even
when the website lives under a repository path; the theme adds the site's `baseurl`.

The example shows only the links. Merge your changes into the existing list and
preserve the other settings. To use a different feed, keep its actual published
path; see [feed compatibility](./05-faq#use-jekyll-feed-instead-of-chulapas-feeds).

## Publish and check

Save with **Commit changes** on your publishing branch and wait for **Actions**
to finish. Open the published website and scroll to the footer.
Check every edited link: email should open your mail application, a profile should
open the intended account, and a feed should return the feed document. A working
feed link does not subscribe the visitor automatically.

If changes do not appear, follow [the publishing checks](./05-faq#why-can-i-not-see-my-changes).
For the full option list and copyright behavior, use the [footer reference](./02-config#footer).
