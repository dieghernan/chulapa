---
title: Enable Lunr.js search
subtitle: Configure local search on an existing site
tags: [docs, search, local-search]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use `search.provider: lunr` in `_config.yml` to enable Lunr.js. The index
is built with your site. See the [Lunr.js demo](../demo/search_lunr).

## Configure the provider and page

Follow [Enable local search](./12-fusejs-search#configure-the-search-page).
Use `provider: lunr` in that example and keep your existing search URL.

## Publish and verify

Follow [Check a result](./12-fusejs-search#check-a-result) to test the
published index. See the [search reference](./02-config#search-engines)
for word limits and attribution.
