---
title: Migrating from another Jekyll theme
subtitle: Keep your content and URLs while switching themes
excerpt: Move an existing Jekyll site to <span class="chulapa">Chulapa</span> with a pinned remote theme and a practical migration checklist.
show_toc: true
tags: [docs, installation, theme-updates]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Keep your posts, pages and images. This guide assumes your site already builds
with Jekyll and has a `_config.yml` and `Gemfile`.

**Before switching themes:** save a backup or create a migration branch. Theme-specific
settings and layouts are not converted automatically; check the preview before publishing.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

Follow steps 1–5, then use the [migration checklist](#migration-checklist).
For field-by-field lookup, use the [migration mappings](#layouts-and-page-front-matter) below.

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
remote_theme: dieghernan/chulapa@v2.2.0
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

Pin `@v2.2.0` for the features described here. Omitting the tag follows
development updates. Mermaid, PhotoSwipe and GoatCounter are absent from v2.1.0.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## 3. Adapt layouts and front matter

Review `_config.yml` defaults as well as the settings between `---` lines in
posts and pages. Explicit page values override defaults: an old `layout: post`
will still need changing even if you set a new post default.

### Layouts and page front matter

| Existing setting or purpose | Field or combination in <span class="chulapa">Chulapa</span> | Constraint or reference |
| --- | --- | --- |
| `layout: post` for an article | `layout: default`, `header_type: post` | [Layout reference](./04-layouts#default). |
| `layout: page` for a regular page | `layout: default`, `header_type: base` | Standalone page addresses still follow their configured permalink. |
| `image` or `cover` for a header photograph | `header_img` with a suitable `header_type` | The old field is not translated; [header options](./04-layouts#options) specify the supported types. |
| `toc: true` | `show_toc: true` | [TOC options](./04-layouts#options). |
| Page `comments: true` | `show_comments: true` | Also needs the site provider and a comment-capable layout. |
| Page `search: false` | `include_on_search: false` | Local Lunr/Fuse/Simple-Jekyll-Search indexes only; not an Algolia exclusion or Google crawler directive. |
| Post or collection document in built-in feeds | `include_on_feed: true` | Requires a resolved date; set collection dates explicitly for Jekyll 3/4 consistency and `output: true` to publish linked collection articles. Standalone pages are not selected. [Feed constraints](./56-publish-feeds). |

Keep `title`, `date`, `categories`, `tags` and existing public permalinks.
Replace obsolete includes and classes using the
[layout and snippet reference](./04-layouts#a-layouts) and [demos](../demo).

## 4. Reconnect navigation and integrations

Translate old settings in `_config.yml`, preserving unrelated settings,
existing addresses and provider identifiers. In the preview, follow the
edited menu and footer links, test search and open an old comment thread.

### Site configuration and integrations

| Purpose | Fields or output | Constraint or reference |
| --- | --- | --- |
| Site author stored as a plain string | `author` mapping with `name` | Other profile fields are in [Site author](./02-config#site-author); guest page authors have their own mapping. |
| Appearance | `chulapa-skin.skin` | Exact supported skin name; fonts/color overrides remain separate. [Theming reference](./03-theming). |
| Navbar | `navbar.nav` entries: `title`, `url`, optional `child` | One dropdown level; old links are not imported. [Navbar](./02-config#navbar). |
| Footer | `footer.links` entries: `label`, `icon`, `url`; `footer.copyright` | Old links/copyright are not translated. [Footer](./02-config#footer). |
| Search | `search.provider`, `search.landing_page`; page `layout: search`, matching `permalink` | Default path `/search`; provider selection creates neither page nor hosted index. [Search reference](./02-config#search-engines). |
| Comments | `comments.provider`, provider identifiers; page/default `show_comments` | No automatic provider migration; existing discussion IDs and URLs affect matching. Cactus ID migration, corrected Welcomments URLs in v2.2.0 and legacy local corrections are in [Comments](./02-config#comments). |
| Existing subscriber addresses | `/atom.xml`, `/rss.xml`, optional jekyll-feed `/feed.xml` | Built-in feeds select dated posts/collection documents with `include_on_feed: true`; collection output must publish linked articles. jekyll-feed's default path can coexist; two generators must not write the same path. |
| Google Analytics 4 | `gtag_id` | Existing measurement ID; duplicate custom tracking scripts can count twice. [GA reference](./02-config#google-analytics). |
| GoatCounter | `goatcounter` | Requires v2.2.0; [version and production constraints](./02-config#goatcounter-analytics). |

For setup steps, see [local search](./12-fusejs-search),
[comment providers](./02-config#comments) and
[preserving a feed URL](./57-jekyll-feed).

### Local overrides and release boundary

Local layouts, includes and assets can override either installation method.
Keep useful overrides and adapt them using [Custom hooks](./45-custom-hooks).
A version pin limits available features. Mermaid, PhotoSwipe and GoatCounter
require v2.2.0 or later.

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
3. Keep the `@v2.2.0` pin in `_config.yml`. Merge the migration when the preview
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
| Search opens a missing page or returns no results | Check `search.provider`, create the search page and match its permalink to `search.landing_page`. For local providers check `include_on_search`; Algolia needs its uploaded index and uses `files_to_exclude` for exclusions. Check the chosen [provider guide](./02-config#search-engines). |
| Readers' feed URL stops working, or posts are missing | Preserve the existing feed URL. Keep `jekyll-feed` for `/feed.xml` if needed; built-in feeds require dates and `include_on_feed: true`. Avoid duplicate output paths. |

## Migration checklist

- [ ] Save a backup or migration branch and record important URLs.
- [ ] Review local layouts, includes and assets for old theme overrides.
- [ ] Set `remote_theme: dieghernan/chulapa@v2.2.0`; remove conflicting theme settings.
- [ ] Install and enable both remote-theme and include-cache plugins.
- [ ] Translate layouts and front matter, including `_config.yml` defaults.
- [ ] Replace old theme-specific includes and classes used in content.
- [ ] Adapt author details and skin; rebuild navbar/footer links and check destinations.
- [ ] Test search and an existing comment thread, if enabled.
- [ ] Open the feed URLs used by your readers and check recent posts.
- [ ] Check analytics configuration and remove duplicate tracking snippets.
- [ ] Preview on mobile and with a keyboard; verify images, URLs and metadata.
- [ ] Publish, check the build result and repeat the key checks on the live site.
