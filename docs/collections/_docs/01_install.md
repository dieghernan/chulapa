---
title: Installation
subtitle: How to use <span class="chulapa">Chulapa</span>
excerpt: Install <span class="chulapa">Chulapa</span> on your GitHub repo
show_toc: true
---

For a new site, use the <span class="chulapa">Chulapa</span> template to publish
from your browser. Use the other methods to add the theme to an existing Jekyll site.

## 1. Use our GitHub template

**Recommended for your first website.**

[Follow the start guide](./00-start#start-with-the-github-template) to create
and publish a blog in your browser, edit a post and add a photograph.
You only need a GitHub account. The template includes sample articles,
an About page, search and a ready-made design.

[Preview the template](https://dieghernan.github.io/chulapa-101/)
before you begin.

## 2. Remote theme method

**Recommended if you are migrating an existing site.**

This method downloads the theme when your site is built. It assumes you already
have a Jekyll site with a `_config.yml` and `Gemfile` (the file listing its Ruby
dependencies). Back up your site before switching themes.

1. Create a new GitHub repository or open an existing one.
2. Add this line to your `_config.yml`:

    ```yaml
    remote_theme: dieghernan/chulapa
    ```

3. Remove any other `remote_theme` entry and the `theme` entry from
   `_config.yml`. Add `jekyll-remote-theme` and `jekyll-include-cache` to your
   `Gemfile` and the `plugins` list in `_config.yml`, then run `bundle install`.
   For a complete example, use the
   [personal-blog Gemfile](https://github.com/dieghernan/chulapa/blob/main/examples/personal-blog/Gemfile)
   as a reference and merge its dependencies with your existing file.
   Keep any plugins your site already uses; the remote theme does not install
   dependencies for you.

**Choose your version.** Without a version tag, the remote theme receives
development updates. Use `remote_theme: dieghernan/chulapa@v2.1.0` to keep
that release. Features marked v2.1.1-dev are not included in v2.1.0.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

**Publish your site:**

- In your GitHub repository, open **Settings > Pages** and choose
  **GitHub Actions** as the source.
- Add a publishing workflow under `.github/workflows/`. Use the
  [template workflow](https://github.com/dieghernan/chulapa-101/blob/main/.github/workflows/build-chulapa-gh-pages.yml)
  as a starting point and check that its build settings match your site.
- Save your changes, check the publishing run in **Actions**, then open the
  website address shown in **Settings > Pages**.

You do not need to copy the theme's files into your site.

**Check your custom files when updating.** Local layouts, includes and assets
with the same paths as theme files take precedence. Theme updates will not
replace those copies, so review them to receive the corresponding improvements.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

Continue with [global settings](./02-config) to configure your site.

## 3. Gem-based method <i class="fa-solid fa-gem fa-xs"></i>

To install the theme in your existing Jekyll site:

1. Add the following to your `Gemfile`:

    ```ruby
    gem "chulapa-jekyll"
    ```

2. Install the bundled gems by running the following [Bundler](https://bundler.io/)
   command:

    ```bash
    bundle
    ```

3. Set the `theme` in your project's Jekyll `_config.yml` file:

    ```yaml
    theme: chulapa-jekyll
    ```

Enable `jekyll-include-cache` in the `plugins` list in `_config.yml`. Remove any
`remote_theme` entry when using the gem. To update only the theme and its
dependencies, run `bundle update chulapa-jekyll`.

To preview your site locally, run `bundle exec jekyll serve` from your site
directory. Restart Jekyll after editing `_config.yml` to reload its settings.

**Check your custom files when updating.** Your local layouts, includes and
assets still take precedence after a theme update. Review any copied files; see
[local overrides](./04-layouts#javascript-assets-and-local-overrides) for upgrade guidance.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}
