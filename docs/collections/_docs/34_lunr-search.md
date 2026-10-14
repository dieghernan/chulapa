---
title: Enable Lunr.js search
subtitle: Configure local search on an existing site
---

Use this guide for an existing site. No search-service account, API key or
additional Jekyll plugin is needed. The personal-blog template already uses
Fuse.js; follow these steps only if you want to replace that provider.

## Configure the provider and page

In `_config.yml`, edit the existing `search` section, or add it once if absent:

```yaml
search:
  provider: lunr
  landing_page: /search
```

Preserve other search settings. If your search page already has another address,
keep that path in `landing_page` and in the page below.

Edit the existing search page. If there is none, create `search.md` next to
`_config.yml` with this content:

```yaml
---
layout: search
title: Search
permalink: /search
---
```

Keep only one page at that address. `permalink` and `search.landing_page` must
match; do not prepend the site's `baseurl` to either value. The search layout
supplies the interface and does not display page-body text.

## Publish and verify

Save with **Commit changes** on the publishing branch. Wait for **Actions** to
succeed, then open your site's search address. For a site at
`https://ana.github.io/my-blog`, the default address is
`https://ana.github.io/my-blog/search`.

Search for a distinctive word from a published article's title, open a result
and verify its address. Clear the field and check that the results clear.
If a result is missing, check the document's publication status and date, and
any `include_on_search: false` in its settings or configuration defaults.
The index updates during a site build; publish again after content changes.

The classic navbar and desktop `dual` navbar show the Search link only when
`navbar.nav` is configured. If it is absent, use the direct address above or
[edit your menu](./10-edit-menu). If the page itself is missing, check the build
and matching paths; see [publishing checks](./05-faq#why-can-i-not-see-my-changes).

For word limits, attribution and legacy settings, use
[the search reference](./02-config#search-engines).
