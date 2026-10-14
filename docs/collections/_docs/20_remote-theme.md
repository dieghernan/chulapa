---
title: Install using a remote theme
subtitle: Add the theme to an existing Jekyll site
excerpt: Configure a pinned remote theme, install its dependencies and verify your published site.
---

Use this guide when you already have a working Jekyll site, a `Gemfile` and
Bundler available. For your first website, use [the browser tutorial](./00-start).
If you are replacing another theme, follow the [migration checklist](./07-migration)
to review content and old customizations as well.

## Update your theme and dependencies

Work in a branch or save a backup. In `_config.yml`, remove the old `theme` entry
and replace any existing `remote_theme` entry with:

```yaml
remote_theme: dieghernan/chulapa@v2.1.0
```

This pins the released version. Use `dieghernan/chulapa` without the tag only
when you want development updates from `main`. Features marked **v2.1.1-dev**
are not included in v2.1.0.

In your existing `Gemfile`, add missing dependencies from the following list.
Edit entries already present instead of declaring the same gem twice. Keep
your existing Jekyll version, source, groups and other dependencies.

```ruby
gem "jekyll-remote-theme"
gem "jekyll-include-cache"
gem "jekyll-github-metadata"
gem "jekyll-paginate"
gem "jekyll-sitemap"
gem "kramdown-parser-gfm"
```

A remote theme downloads theme files; it does not install their Ruby dependencies.
The [personal-blog Gemfile](https://github.com/dieghernan/chulapa/blob/main/examples/personal-blog/Gemfile)
is a complete Jekyll 4 example for a new local setup. Merge its dependencies with
your own file rather than replacing a working site's configuration.

In `_config.yml`, enable the following plugins in the existing list. Add the list
once if absent, and retain other plugins your site needs:

```yaml
plugins:
  - jekyll-remote-theme
  - jekyll-include-cache
```

From the directory containing your `Gemfile`, run:

```sh
bundle install
bundle exec jekyll serve
```

Open the local address printed by Jekyll. Check the home page and an existing
post or page. Restart the preview after changing `_config.yml`.

Local layouts, includes and matching assets override the theme. Review old
copies if the design or behavior has not changed; downloading a new theme
version does not replace them. See [local override guidance](./04-layouts#javascript-assets-and-local-overrides).
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Publish and check

For a site that already publishes successfully, retain its workflow and check
that its build installs the dependencies from your `Gemfile`.

For a new GitHub Actions publishing setup, choose **Settings > Pages > GitHub
Actions** and add a workflow under `.github/workflows/`. Use the
[template workflow](https://github.com/dieghernan/chulapa-101/blob/main/.github/workflows/build-chulapa-gh-pages.yml)
as a starting point; adapt its branch, source directory and build settings to
your repository. You do not need to copy the theme's files into your site.

Commit to your publishing branch. Wait for the publishing run in **Actions**
to succeed, then open the website address in **Settings > Pages**. On your
published home page and a representative article, check the design, images,
menu links and repository paths, including on a narrow screen.

For other hosts, use your existing deployment process after verifying the local
build. If Jekyll reports an unknown `include_cached` tag, check that
`jekyll-include-cache` is installed and enabled, then restart the build.
Use [Global settings](./02-config) to look up configuration fields.
