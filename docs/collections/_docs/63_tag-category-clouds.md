---
title: Add tag and category indexes for your posts
subtitle: Connect article badges to grouped lists
tags: [docs, navigation]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide on an existing blog with tagged or categorized posts. The result
is a Tags page and a Categories page whose grouped lists link to your articles.
See the [tag demo](../demo/tags) and [category demo](../demo/category) for rendered
examples; their collection choices differ from this post-only setup.

## Create or update the index pages

In the starter, edit `_pages/tags.md` and `_pages/categories.md`. If a page already
exists, update its existing settings and keep unrelated front matter/content;
do not create a second file at the same public address. For a new page, use these
complete examples.

Tags page, `_pages/tags.md`:

```markdown
---
layout: cloudtag
title: Tags
permalink: /tags/
include_collection: posts
---

Browse posts by tag.
```

Categories page, `_pages/categories.md`:

```markdown
---
layout: cloudcategory
title: Categories
permalink: /categories/
include_collection: posts
---

Browse posts by category.
```

Without the starter's `_pages` setup, create `tags.md` and `categories.md` beside
`_config.yml` instead. Preserve existing public paths when adapting an established
site, and use those same paths in the next step.

## Connect the article badges

In `_config.yml`, edit the existing `defaults` entry whose scope has `path: ""`
and `type: posts`. Merge these fields into its `values`, keeping its layout,
header and other settings. Add this complete mapping only if none exists:

```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      cloudtag_url: /tags/
      cloudcategory_url: /categories/
      show_tags: true
      show_categories: true
```

Do not add a second `defaults` key. Explicit values on a post override defaults.
Use paths without the repository prefix: the theme adds `baseurl`.

Edit an existing post with the `default` layout, preserving its other settings,
and add tags/categories inside its front matter. For example:

```yaml
tags:
  - city walks
categories:
  - travel
```

For another existing collection, use its name without `_` in both the defaults
scope and `include_collection`. Its linked articles need `output: true` under
the existing collection configuration to be published. Ordinary standalone pages
are not part of these collection indexes. Full scope/alias details remain in the
[layout reference](./04-layouts#cloud-tags-and-categories).

## Publish and verify

Commit the page, configuration and post edits on the publishing branch. Wait for
**Actions** to succeed, then open the article. Follow its tag/category badges and
check that they reach the matching group, that the article is listed and that
its link opens the article. Check the group buttons on the index and a narrow
screen too. Add menu links with [Edit a menu link](./10-edit-menu) if wanted.

For missing badges, check `show_tags`/`show_categories`, actual post labels and
explicit front matter overrides. For a 404 or missing group, compare the public
permalink, badge URL, exact labels and collection scope. Both the page and badge
settings are needed; a menu link does not create the page. Use
[publishing checks](./42-unpublished-changes) for old output.

In the development version after v2.1.0, group fragments preserve tag/category
names and replace spaces with hyphens: `demo` links to `#demo`, and `demo topic`
to `#demo-topic`. This also fixes badge links for names containing `demo`, which
older versions rewrote only in the cloud index. Update any manually written
links to those older `dmo` fragments when upgrading.
