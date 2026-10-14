---
title: Connect Algolia search and upload its index
subtitle: Configure browser search and a separate indexing step
---

Use this guide if you already have an Algolia application/index and maintain
your site's Jekyll build workflow. Have the application ID, index name, public
search-only key and separate indexing key ready. For a simpler search without
an account or index-upload workflow, use [Fuse.js](./12-fusejs-search).

**Compatibility:** the theme's `jekyll-algolia` indexing plugin is deprecated
and no longer maintained by Algolia. Check its compatibility with your build
before adopting it; keep an existing working setup while testing changes.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Configure browser search

In `_config.yml`, edit the existing mappings, or add each once if absent.
Replace the three example values with your account's values:

```yaml
search:
  provider: algolia
  landing_page: /search
algolia:
  application_id: "YOUR_APPLICATION_ID"
  index_name: "YOUR_INDEX_NAME"
  search_only_api_key: "YOUR_PUBLIC_SEARCH_ONLY_KEY"
```

Preserve other settings, particularly existing Algolia exclusions and ranking.
Keep your current search address if different. Reuse the page at that address;
if absent, create `search.md` next to `_config.yml`:

```yaml
---
layout: search
title: Search
permalink: /search
---
```

Match `permalink` to `search.landing_page` without adding `baseurl`. Keep only
one output page at that address. Selecting Algolia does not create the page or
upload an index.

## Upload the index

In the site's `Gemfile`, add this gem inside the existing `:jekyll_plugins`
group if it is missing; preserve the other gems. If the group does not exist,
add the complete block:

```ruby
group :jekyll_plugins do
  gem "jekyll-algolia", "~> 1.0"
end
```

Run `bundle install` in the site directory and commit the updated `Gemfile` and
`Gemfile.lock`. In your existing GitHub Actions build workflow, after checkout,
Ruby setup and dependency installation, add this step. It assumes `_config.yml`
is at the repository root:

{% raw %}
```yaml
- name: Upload Algolia index
  run: bundle exec jekyll algolia
  env:
    ALGOLIA_API_KEY: ${{ secrets.ALGOLIA_API_KEY }}
```
{% endraw %}

In the repository's **Settings > Secrets and variables > Actions**, add the
indexing key as the repository secret `ALGOLIA_API_KEY`. If your site source is
in a subfolder, set the step's `working-directory` to the folder containing its
`Gemfile` and `_config.yml`, following your existing workflow.

**Keep the indexing key private.** Only the public search-only key belongs in
`_config.yml`. Never put the indexing key in a file or browser script. The
index-upload step sends site content to Algolia: review exclusions first.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

Use `algolia.files_to_exclude` for content that must stay out of this index;
`include_on_search: false` is not an Algolia exclusion. The sample's
`customRanking` merely uses that field for ranking. See the
[indexing option reference](./02-config#search-engines) and
[plugin options](https://github.com/algolia/jekyll-algolia/blob/main/docs-src/src/options.md).
An alternative workflow is the [Algolia Jekyll action](https://github.com/marketplace/actions/algolia-jekyll-action);
adapt its source directory and credentials to your site rather than running
both upload methods.

## Publish and verify

Commit to the publishing branch. Confirm that the publishing workflow and index
upload both succeed. In Algolia, verify that the expected index contains records
and that excluded content is absent. Open the published search page, search for
a distinctive article title and follow a result. Verify its public address,
including any repository path.

For no results, check that the uploaded index name/application match the browser
settings and that the key is search-only with access to that index. For stale
results, check the upload run after the latest content change. Browser/network
blockers can prevent hosted search from loading. A missing menu link is separate:
visit the search address directly or [configure your menu](./10-edit-menu).

For all fields and attribution requirements, see
[the search reference](./02-config#search-engines).
