---
title: Installation
subtitle: How to use <span class="chulapa">Chulapa</span>
excerpt: Install <span class="chulapa">Chulapa</span> on your GitHub repo
show_toc: true
---

<span class="chulapa">Chulapa</span> gives your Jekyll website its design.
If this is your first site, use the template: it already includes the files
and automatic publishing you need. The other methods are for an existing
Jekyll site or for readers comfortable installing tools on their computer.

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
{: .alert .alert-info .p-3 .mx-2 .mb-3}

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
   <span class="chulapa">Chulapa</span> requires `jekyll-include-cache` for its
   `include_cached` tags. For local or custom builds, also install the runtime
   dependencies declared in the theme's
   [gemspec](https://github.com/dieghernan/chulapa/blob/main/chulapa-jekyll.gemspec).
   A remote theme does not install these dependencies for you.

An unpinned remote theme follows the repository default branch. To select a
release, append its tag, for example `remote_theme: dieghernan/chulapa@v2.1.0`.
Development features may be available on the default branch before they are
published in the gem.

<div class="alert alert-warning p-3 mx-2" markdown="1">
**Don't forget to deploy your site:**

- On your GitHub repo, go to *Settings > Pages*.
- Select *Source > GitHub Actions* and set the corresponding action. See an
  example in <https://github.com/dieghernan/chulapa-101/blob/main/.github/workflows/build-chulapa-gh-pages.yml>
</div>

You do not need to copy the theme's files into your site. If you have local
layouts, includes or assets with the same paths as theme files, your copies
take precedence. Review those customizations when upgrading; theme updates
will not replace them.

Continue with [global settings](./02-config) to configure your site.

## 3. Gem-based method <i class="fa-solid fa-gem fa-xs"></i>

With gem-based themes, directories such as `assets`, `_layouts`, `_includes`
and `_sass` are stored in the theme's gem rather than your site directory.
This makes installation and updates easier because you do not have to manage
the theme files directly.

To install as a gem-based theme:

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


Local layouts, includes and assets continue to override the theme after an
update. Review those files together when adopting v2.1.1-dev, especially copied
search pages and navbar scripts. See [JavaScript assets and local overrides](./04-layouts#javascript-assets-and-local-overrides)
for the shared search helper and navigation dependencies.
