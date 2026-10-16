---
title: Enable Google Custom Search
subtitle: Connect an existing Google search engine to your site
tags: [docs, search, hosted-search]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide if you already have a Google Custom Search engine configured for
your site's public address. Obtain its engine ID from your
[search engine settings](https://programmablesearchengine.google.com/).
For search without a service account or external indexing, use
[Fuse.js](./12-fusejs-search) instead.

## Connect the engine

In `_config.yml`, edit the existing `search` section and `google_cse_id`, or add
them once if absent. Replace the example engine ID with yours:

```yaml
search:
  provider: google
  landing_page: /search
google_cse_id: "YOUR_SEARCH_ENGINE_ID"
```

Keep other settings and the established search address if there is one. Reuse
its existing page; if absent, create `search.md` next to `_config.yml`:

```yaml
---
layout: search
title: Search
permalink: /search
---
```

The page's `permalink` must match `search.landing_page`. Do not add the site's
`baseurl` to those values, and do not create a second page at the same address.
No extra Google embed script belongs in the page; the theme provides it.

## Publish and verify

Commit to the publishing branch, wait for **Actions** to succeed and open the
published search address. Search for a distinctive title from a public page
already indexed by Google; follow a result and check its destination.

If the interface fails to load, check the engine ID and browser/network blockers.
If results are missing or cover the wrong sites, check the engine's configured
site scope and Google's indexing. A successful Jekyll build does not upload an
index to Google; `include_on_search` controls the local providers, not Google's
crawler. If the Search menu link is missing, visit the address directly or
[configure your menu](./10-edit-menu).

For field names, defaults and other providers, use
[the search reference](./02-config#search-engines).
