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
For field-by-field lookup, use the separate [migration mappings](./46-migration-fields).

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

Use [the layout and front matter mappings](./46-migration-fields#layouts-and-page-front-matter)
to identify the fields your old theme used. Check the relevant entries rather
than renaming every setting indiscriminately; conversions are not automatic.

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

Adapt each existing integration, preserving the addresses and identifiers you
recorded. Use the relevant task guide; the complete
[field mappings and constraints](./46-migration-fields#site-configuration-and-integrations)
remain separate.

- [Update author details](./14-site-details), then [choose a skin](./22-choose-skin).
  Replace an old plain-string `author` with a mapping; use an exact skin name.
- [Rebuild menu links](./10-edit-menu) and [footer links](./11-edit-footer).
  Open every destination in the preview; old links are not imported.
- Reuse the existing search URL. For local search, follow [Fuse.js setup](./12-fusejs-search);
  other [provider guides](./02-config#search-engines) cover the alternatives.
  Keep the page permalink matched to `search.landing_page`, without repeating `baseurl`.
- Reconnect the existing [comment provider](./02-config#comments) and enable the
  intended posts. Verify an old thread and preserve its identifiers; switching
  providers does not migrate conversations. Apply the documented local
  corrections if using Cactus or Welcomments on an affected site.
- Open existing subscriber feed URLs. Keep `jekyll-feed` for an established
  `/feed.xml` if needed, and avoid duplicate outputs using [the feed guidance](./57-jekyll-feed).
- Keep the [Google Analytics ID](./19-google-analytics) and remove duplicate custom
  tracking scripts. [GoatCounter](./18-goatcounter) is not in the pinned v2.1.0 release.

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
