---
title: Enable Simple-Jekyll-Search search
subtitle: Configure local search on an existing site
tags: [docs, search, local-search]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use `search.provider: simplesearch` in `_config.yml` to enable
Simple-Jekyll-Search. See the [live demo](../demo/search_simple).

## Configure the provider and page

Follow [Enable local search](./12-fusejs-search#configure-the-search-page).
Use `provider: simplesearch` in that example and keep your existing search URL.

## Publish and verify

Follow [Check a result](./12-fusejs-search#check-a-result) to test the
published index. See the [search reference](./02-config#search-engines)
for word limits and attribution.
