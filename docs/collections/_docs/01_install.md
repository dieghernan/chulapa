---
title: Installation
subtitle: How to use <span class="chulapa">Chulapa</span>
excerpt: Install <span class="chulapa">Chulapa</span> on your Github repo
show_toc: true
---

<span class="chulapa">Chulapa</span> was developed in and for GitHub. There are
three ways to use <span class="chulapa">Chulapa</span>:

## 1. Use our GitHub template

**Recommended if you are starting from scratch**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

Create a GitHub account, click [this link](https://github.com/dieghernan/chulapa-101/generate)
and quickstart your site!

## 2. Remote theme method

**Recommended if you are migrating a site.**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

You can use the `jekyll-remote-theme` method. Just follow these steps:

1. Create a new GitHub repository or go to an existing one.
2. Add this line to your `_config.yml`:

    ```yaml
    remote_theme: dieghernan/chulapa
    ... more config options
    ```

3. Remove any other `remote_theme` entry and the `theme` entry from
   `_config.yml`. Add `jekyll-remote-theme` and `jekyll-include-cache` to your
   Gemfile and `_config.yml` plugins list, then run `bundle install`.
   <span class="chulapa">Chulapa</span> requires `jekyll-include-cache` for its `include_cached` tags.

An unpinned remote theme follows the repository default branch. To select a
release, append its tag, for example `remote_theme: dieghernan/chulapa@v2.0.1`.
Development features may be available on the default branch before they are
published in the gem.

<div class="alert alert-warning p-3 mx-2" markdown="1">
**Don't forget to deploy your site:**

- On your GitHub repo, go to *Settings > Pages*.
- Select *Source > GitHub Actions* and set the corresponding action. See an
  example in <https://github.com/dieghernan/chulapa-101/blob/main/.github/workflows/build-chulapa-gh-pages.yml>
</div>

By using `jekyll-remote-theme`, your repo will have remote access to the content
of these folders:

- `assets`
- `_layouts`
- `_includes`
- `_sass`

Note that making copies of theme files will prevent you from receiving any theme
updates on those files.

Please read the rest of the docs for further adjustments.

## 3. Gem-based method <i class="fa-solid fa-gem fa-xs"></i>

With Gem-based themes, directories such as the `assets`, `_layouts`, `_includes`
and `_sass` are stored in the theme's gem, hidden from your immediate view. This
allows for easier installation and updating as you don't have to manage any of
the theme files.

To install as a Gem-based theme:

1. Add the following to your `Gemfile`:

    ```ruby
    gem "chulapa-jekyll"
    ```

2. Fetch and update bundled gems by running the following [Bundler](https://bundler.io/)
   command:

    ```bash
    bundle
    ```

3. Set the `theme` in your project's Jekyll `_config.yml` file:

    ```yaml
    theme: chulapa-jekyll
    ```

Enable `jekyll-include-cache` in your `_config.yml` plugins list. Remove any
`remote_theme` entry when using the gem. To update only the theme and its
dependencies, run `bundle update chulapa-jekyll`.

To preview your site locally, run `bundle exec jekyll serve` from your site
directory. Restart Jekyll after editing `_config.yml` to reload its settings.
