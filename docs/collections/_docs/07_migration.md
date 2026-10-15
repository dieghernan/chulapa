---
title: Migrating from another Jekyll theme
subtitle: Keep your content and URLs while switching themes
excerpt: Move an existing Jekyll site to <span class="chulapa">Chulapa</span> with a pinned remote theme and a practical migration checklist.
show_toc: true
---

Keep your posts, pages and images. This guide assumes your site already builds
with Jekyll and has a `_config.yml` and `Gemfile`.

**Before switching themes:** save a backup or create a migration branch. Theme-specific
settings and layouts are not converted automatically; check the preview before publishing.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

**Getting started:** follow steps 1–5, then use the [migration checklist](#migration-checklist).
**Advanced reference:** use the [front matter mapping](#3-adapt-layouts-and-front-matter) and
linked settings to translate your existing configuration.

## 1. Prepare your site

Create a migration branch or backup. Record your home page, a post, a page,
search and feed URLs so you can check them after switching themes.
Keep your existing `url`, `baseurl`, `permalink` and custom domain settings
unless you intend to change your public addresses.

**Check local overrides first.** Files in `_layouts`, `_includes` and `assets`
with the same paths as theme files take precedence. Old copies can hide the new
design or keep loading old scripts. Review them individually; move obsolete
theme copies outside the site source, preserving your own content and customizations.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

Keep useful custom layouts and includes, then adapt their parent layouts, include
paths and CSS to the new theme. For site-wide additions, prefer the supported
[custom hooks reference](./45-custom-hooks)
over copying a complete theme layout.

## 2. Switch to a pinned remote theme

In `_config.yml`, remove the old `theme` and replace any existing `remote_theme`:

```yaml
remote_theme: dieghernan/chulapa@v2.1.0
```

Add these entries to your existing `plugins` list, keeping unrelated plugins:

```yaml
plugins:
  - jekyll-remote-theme
  - jekyll-include-cache
```

In your `Gemfile`, add these dependencies if missing:

```ruby
gem "jekyll-remote-theme"
gem "jekyll-include-cache"
```

Remove the old theme gem if nothing else uses it. Keep Jekyll and dependencies
needed by your content or publishing workflow. The
[personal-blog Gemfile](https://github.com/dieghernan/chulapa/blob/main/examples/personal-blog/Gemfile)
provides a dependency reference; merge it with your file rather than replacing it.
Run `bundle install`.

Pinning `@v2.1.0` keeps the migration on a released version. Omitting the tag
follows development updates. Features documented as v2.1.1-dev, including
Mermaid, PhotoSwipe and GoatCounter, are not in v2.1.0.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

<span id="3-adapt-front-matter"></span>

## 3. Adapt layouts and front matter

Review `_config.yml` defaults as well as the settings between `---` lines in
posts and pages. Explicit page values override defaults: an old `layout: post`
will still need changing even if you set a new post default.

Names vary between themes; these are common patterns to review, not automatic conversions:

| Existing setting or purpose | Use with <span class="chulapa">Chulapa</span> |
| --- | --- |
| `layout: post` for an article | `layout: default` with `header_type: post` |
| `layout: page` for a regular page | `layout: default` with `header_type: base` |
| `image` or `cover` for a header photograph | `header_img`; choose an appropriate `header_type` |
| `toc: true` for a table of contents | `show_toc: true`; see the [TOC example](./04-layouts#options) |
| `comments: true` on a page | `show_comments: true`, plus a configured site provider |
| `search: false` to exclude a page from the local index | `include_on_search: false` |
| Include a dated document in the built-in feeds | `include_on_feed: true` |

Keep standard fields such as `title`, `date`, `categories`, `tags` and intended
`permalink` values. Check old theme-specific includes and CSS classes in the
content; translate or replace them using the [layout and snippet reference](./04-layouts#a-layouts).
See [live demos]({{ '/demo' | relative_url }}) to choose a suitable layout.

For example, replace the old layout and header settings in an existing post's
front matter with these values, preserving its title, date and other content:

```yaml
layout: default
header_type: post
show_date: true
include_on_feed: true
```

## 4. Reconnect navigation and integrations

**Rebuild navbar and footer links manually:** links from your previous theme
are not imported automatically. Re-enter them in `navbar.nav` and `footer.links`,
then open every destination in the preview.

Edit existing sections in `_config.yml`; settings from the previous theme are
not translated automatically. Remove obsolete theme-specific settings once you
have translated them; keep unrelated Jekyll settings and plugins.

Start by adapting your author details and choosing a skin. For example, merge
these sections into `_config.yml`, replacing the sample name with your own:

```yaml
author:
  name: "Ana"
chulapa-skin:
  skin: journal
```

If your old `author` was a plain string, replace it with the mapping above.
Keep or translate any profile details using the [author reference](./02-config#site-author).
Use an exact name from the [skin previews]({{ '/skins' | relative_url }});
see [theming](./03-theming#skins) for fonts and color overrides.

| Feature | What to change and check |
| --- | --- |
| Navbar | Rebuild links under `navbar.nav` with `title` and `url`; use `child` for one level of dropdown links. Check every destination. [Navbar examples](./02-config#navbar). |
| Footer | Rebuild social and feed links to `footer.links` using `label`, `icon` and `url`. Set `footer.copyright` if needed. [Footer settings](./02-config#footer). |
| Search | Choose `search.provider`. Create a page with `layout: search` and a `permalink` matching `search.landing_page` (default `/search`). A provider setting alone does not create the page. [Search setup](./02-config#search-engines). |
| Comments | Set `comments.provider`, its required identifiers and `show_comments: true` on eligible pages or post defaults. Retain the provider's existing discussion identifiers and verify an old thread; changing themes does not migrate comments between services. [Provider setup](./02-config#comments). |
| Feeds | Built-in `/atom.xml` and `/rss.xml` include dated documents with `include_on_feed: true`. Keep `jekyll-feed` if you need an existing `/feed.xml` URL; its default output can coexist. Avoid two generators writing the same path. [Feed guidance](./05-faq#use-jekyll-feed-instead-of-chulapas-feeds). |
| Analytics | For Google Analytics 4, set `gtag_id` to your existing measurement ID. Remove duplicate tracking snippets from local includes. GoatCounter requires development after v2.1.0. [Analytics settings](./02-config#google-analytics). |

For a simple local search, merge this into `_config.yml`:

```yaml
search:
  provider: fusejs
  landing_page: /search
```

Create `search.md` at the site root, or adapt your existing search page:

```yaml
---
layout: search
title: Search
permalink: /search
---
```

Keep the old search URL if it is already in use, setting both `permalink` and
`search.landing_page` to that path.

## 5. Preview, then publish

Run `bundle exec jekyll serve`. Restart it after changing `_config.yml`.
Check representative pages against the URLs you recorded, including images
and links when your site uses a `baseurl`. Review titles, descriptions and
canonical URLs in the generated HTML.

Keep an existing publishing workflow if it installs the new dependencies and
builds your site successfully. If you need GitHub Actions publishing:

1. In your repository, open **Settings > Pages** and select **GitHub Actions**.
2. Add a workflow under `.github/workflows/`, using the
   [template workflow](https://github.com/dieghernan/chulapa-101/blob/main/.github/workflows/build-chulapa-gh-pages.yml)
   as a starting point. Adapt its branch and build settings to your repository.
3. Keep the `@v2.1.0` pin in `_config.yml`. Merge the migration when the preview
   is ready, then check the publishing run in **Actions**.
4. Open the address in **Settings > Pages** and repeat the checklist's live checks.
   Analytics may load only in production; verify it there.

## Common migration problems

| Problem | What to check or change |
| --- | --- |
| The old design is still visible | Review local `_layouts`, `_includes` and matching assets. Move obsolete theme copies outside the source; adapt useful customizations rather than deleting all custom files. Rebuild and refresh. |
| Jekyll reports an unknown `include_cached` tag | Install `jekyll-include-cache`, enable it under `plugins`, run `bundle install` and restart Jekyll. |
| A layout is missing, or an old include fails | Check explicit page front matter and configuration defaults for old layout names. Translate theme-specific includes; use `layout: default` for ordinary posts and pages. |
| CSS or images return 404 | Check `url`, `baseurl` and asset paths. Keep `url` as the domain and use `baseurl` for the site subpath. See [site settings](./02-config#a-site-settingsseo). |
| Search opens a missing page or returns no results | Check `search.provider`, create the search page and match its permalink to `search.landing_page`. Check `include_on_search`; Algolia also needs its uploaded index. |
| Readers' feed URL stops working, or posts are missing | Preserve the existing feed URL. Keep `jekyll-feed` for `/feed.xml` if needed; built-in feeds require dates and `include_on_feed: true`. Avoid duplicate output paths. |

## Migration checklist

- [ ] Save a backup or migration branch and record important URLs.
- [ ] Review local layouts, includes and assets for old theme overrides.
- [ ] Set `remote_theme: dieghernan/chulapa@v2.1.0`; remove conflicting theme settings.
- [ ] Install and enable both remote-theme and include-cache plugins.
- [ ] Translate layouts and front matter, including `_config.yml` defaults.
- [ ] Replace old theme-specific includes and classes used in content.
- [ ] Adapt author details and skin; rebuild navbar/footer links and check destinations.
- [ ] Test search and an existing comment thread, if enabled.
- [ ] Open the feed URLs used by your readers and check recent posts.
- [ ] Check analytics configuration and remove duplicate tracking snippets.
- [ ] Preview on mobile and with a keyboard; verify images, URLs and metadata.
- [ ] Publish, check the build result and repeat the key checks on the live site.
