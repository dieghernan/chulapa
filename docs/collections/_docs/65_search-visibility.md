---
title: Keep an auxiliary page out of search results
subtitle: Configure external indexing, sitemap entries and local search separately
---

Use this guide for a published auxiliary page, such as a search-results page,
that should remain directly accessible without appearing in indexes. These
settings are independent; choose the ones that match your publishing setup.

**Excluding a page is not access control.** Its public URL still works. These
settings do not make private information safe to publish.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Edit the existing page

Inside the page's current front matter, add or update these fields while keeping
its title, layout and permalink:

```yaml
robots: "noindex, follow"
sitemap: false
include_on_search: false
```

`robots` asks external crawlers not to index the page. Crawlers need to access
it to read the instruction; do not block it in `robots.txt` and assume they can
still read `noindex`. Removal from existing search results is not immediate.

`sitemap: false` excludes it from `jekyll-sitemap` if that plugin generates your
sitemap. It does not itself prevent external indexing. `include_on_search: false`
excludes it from the built-in Lunr, Fuse.js and Simple-Jekyll-Search indexes.

For Algolia, configure its [files_to_exclude](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/options.md#files_to_exclude)
for the source file and upload the updated index using the
[Algolia guide](./37-algolia-search). The local-search flag is not an Algolia
exclusion. Google Custom Search uses external indexing rather than these local
index files. Other sitemap/index tools need their own configuration.

## Publish and verify

Commit on the publishing branch, wait for **Actions** to succeed and open the
page directly. Check its content still loads and its HTML source contains the
`noindex, follow` robots value. With `jekyll-sitemap`, check the page's actual URL
is absent from the published `sitemap.xml`.

For local search, search for a distinctive phrase from the page after rebuilding
and check that the page no longer appears. For Algolia, verify the updated
uploaded records separately. The documentation's [Search page]({{ '/search.html' | relative_url }})
uses these three fields; its
[source](https://github.com/dieghernan/chulapa/blob/main/docs/_pages/search.md)
is a real configuration example, not evidence of immediate removal by a crawler.

If the result is unexpected, check explicit front matter and more-specific
configuration defaults, the actual search provider and the latest publishing
run. Use the [field constraints](./04-layouts#search-crawler-directives) and
[publishing checks](./42-unpublished-changes). Do not assume tags, archives,
error pages or pagination are automatically excluded by their layout or path.
