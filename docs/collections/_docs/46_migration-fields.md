---
title: Migration field mappings
subtitle: Legacy patterns, supported fields and integration constraints
---

Lookup for an existing Jekyll site's migration. The entries below are common
patterns to review, not automatic conversions or guarantees about another
theme's behavior. The procedure and publication checklist are in
[Migrating from another Jekyll theme](./07-migration).

## Layouts and page front matter

Explicit page values take precedence over configuration defaults. The mappings
for ordinary posts and pages use the built-in `default` layout.

| Existing setting or purpose | Field or combination in <span class="chulapa">Chulapa</span> | Constraint or reference |
| --- | --- | --- |
| `layout: post` for an article | `layout: default`, `header_type: post` | [Layout reference](./04-layouts#default). |
| `layout: page` for a regular page | `layout: default`, `header_type: base` | Standalone page addresses still follow their configured permalink. |
| `image` or `cover` for a header photograph | `header_img` with a suitable `header_type` | The old field is not translated; [header options](./04-layouts#options) specify the supported types. |
| `toc: true` | `show_toc: true` | [TOC options](./04-layouts#options). |
| Page `comments: true` | `show_comments: true` | Also needs the site provider and a comment-capable layout. |
| Page `search: false` | `include_on_search: false` | Local Lunr/Fuse/Simple-Jekyll-Search indexes only; not an Algolia exclusion or Google crawler directive. |
| Post or collection document in built-in feeds | `include_on_feed: true` | Requires a resolved date; set collection dates explicitly for Jekyll 3/4 consistency and `output: true` to publish linked collection articles. Standalone pages are not selected. [Feed constraints](./56-publish-feeds). |

Standard fields such as `title`, `date`, `categories`, `tags` and intended
`permalink` values remain relevant. Old theme-specific include names and CSS
classes have no automatic mapping; supported alternatives are in the
[layout and snippet reference](./04-layouts).

Front matter specimen for an ordinary dated article:

```yaml
---
layout: default
header_type: post
title: A migrated article
date: 2024-01-02
show_date: true
include_on_feed: true
---
```

## Site configuration and integrations

| Purpose | Fields or output | Constraint or reference |
| --- | --- | --- |
| Site author stored as a plain string | `author` mapping with `name` | Other profile fields are in [Site author](./02-config#site-author); guest page authors have their own mapping. |
| Appearance | `chulapa-skin.skin` | Exact supported skin name; fonts/color overrides remain separate. [Theming reference](./03-theming). |
| Navbar | `navbar.nav` entries: `title`, `url`, optional `child` | One dropdown level; old links are not imported. [Navbar](./02-config#navbar). |
| Footer | `footer.links` entries: `label`, `icon`, `url`; `footer.copyright` | Old links/copyright are not translated. [Footer](./02-config#footer). |
| Search | `search.provider`, `search.landing_page`; page `layout: search`, matching `permalink` | Default path `/search`; provider selection creates neither page nor hosted index. [Search reference](./02-config#search-engines). |
| Comments | `comments.provider`, provider identifiers; page/default `show_comments` | No automatic provider migration; existing discussion IDs and URLs affect matching. Current Cactus/Welcomments limitations and local corrections are in [Comments](./02-config#comments). |
| Existing subscriber addresses | `/atom.xml`, `/rss.xml`, optional jekyll-feed `/feed.xml` | Built-in feeds select dated posts/collection documents with `include_on_feed: true`; collection output must publish linked articles. jekyll-feed's default path can coexist; two generators must not write the same path. |
| Google Analytics 4 | `gtag_id` | Existing measurement ID; duplicate custom tracking scripts can count twice. [GA reference](./02-config#google-analytics). |
| GoatCounter | `goatcounter` | Requires main after v2.1.0; [version and production constraints](./02-config#goatcounter-analytics). |

Site-author and skin specimen (independent of page front matter):

```yaml
author:
  name: "Ana"
chulapa-skin:
  skin: journal
```

## Local overrides and release boundary

Local files matching theme paths in `_layouts`, `_includes` or assets override
theme files, for both remote and gem themes. Supported insertion points and
custom CSS are cataloged in [Custom hooks](./45-custom-hooks). Changing a parent
layout does not translate obsolete include names or CSS classes in content.

A remote theme pinned to `@v2.1.0` does not include Mermaid, PhotoSwipe or
GoatCounter, or later accessibility/resource-loading fixes. Each feature's
reference states its availability. The migration procedure's pin and the
actual installed version determine which documented features are available.
