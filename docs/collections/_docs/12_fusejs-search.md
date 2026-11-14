---
title: Enable local search
subtitle: Add a search page to an existing site
excerpt: Configure Fuse.js, Lunr.js or Simple-Jekyll-Search and verify the published index.
show_toc: false
tags: [docs, search, local-search]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Choose Fuse.js, Lunr.js or Simple-Jekyll-Search to search your site without
an account, API key or extra Jekyll plugin. The personal-blog template
already uses Fuse.js. Reuse its search page if you switch providers.

## Configure the search page

1. In `_config.yml`, edit the existing `search` section, or add it once if absent:

   ```yaml
   search:
     provider: fusejs
     landing_page: /search
   ```

   Use `lunr` for Lunr.js or `simplesearch` for Simple-Jekyll-Search.
   Keep any other search settings. If your current search has an established
   address, use that path for `landing_page` and for the page below.
2. Find your existing search page and edit it. If there is none, create `search.md`
   at the site root, alongside `_config.yml`, with this complete content:

   ```yaml
   ---
   layout: search
   title: Search
   permalink: /search
   ---
   ```

   Keep only one page at this output address. The page's `permalink` must match
   `search.landing_page`. For a site under `/my-blog`, use `/search` in both
   settings; the theme adds the site's `baseurl`.
3. Save your changes on the publishing branch. Wait for **Actions** to finish,
   then open the search address directly. For a site at
   `https://ana.github.io/my-blog`, open `https://ana.github.io/my-blog/search`
   (or your chosen landing path).

Create the search page separately from the provider settings. The classic
navbar and the desktop form of `dual` show a Search link when the provider is
configured and the navbar has `navbar.nav` or an enabled theme selector.
If that link is absent, use the direct address above or [configure your menu](./10-edit-menu).
The `search` layout supplies its own interface; extra page-body text is not displayed.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Check a result

Search for a distinctive word from a published article's title. Follow the result
and check that it opens the correct article, including on a repository-based site.
Clear the search field and check that the results clear.

If the search page is missing, check its published address and the two matching
settings above. If a document is absent from results, check its date, publishing
status and any `include_on_search: false` in its front matter or defaults. Content
changes enter the search index during the next site build; republish after edits.

For word limits and attribution, see the [search reference](./02-config#search-engines).
Try the demos for [Fuse.js](../demo/search_fusejs), [Lunr.js](../demo/search_lunr)
or [Simple-Jekyll-Search](../demo/search_simple). For hosted providers, see
[Google Custom Search](./36-google-search) or [Algolia](./37-algolia-search).

In **2.2.1 (development)**, Fuse.js is updated to 7.5.0. Its corrected relevance
scores can change result ordering and the number of results shown. The standard
search layout handles the update automatically. If you copied a Fuse.js search
page or adapter into your site, update it from the current
[demo source](https://github.com/dieghernan/chulapa/blob/main/docs/_pages/demo_searchfusejs.html)
and [adapter](https://github.com/dieghernan/chulapa/blob/main/assets/js/fusejs/fusejs-search.js):
the adapter must load with `type="module"` and imports Fuse.js itself. Remove
the old separate `fuse.min.js` script tag. Serve the page through Jekyll or your
published site; opening the HTML directly with `file://` does not support this
module loading.
