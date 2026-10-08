---
title: Installation
subtitle: How to use <span class="chulapa">Chulapa</span>
excerpt: Install <span class="chulapa">Chulapa</span> on your GitHub repo
show_toc: true
---

<span class="chulapa">Chulapa</span> is a Jekyll theme for GitHub Pages and other
Jekyll sites. There are
three ways to use <span class="chulapa">Chulapa</span>:

For a small site with editable sample content, choose a [blog, technical blog,
portfolio or project example](./00-start). For a ready-made repository with a
publishing workflow, use the GitHub template below.

## 1. Use our GitHub template

**Recommended if you are starting from scratch.**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

Sign in to GitHub and
[create a repository from the template](https://github.com/dieghernan/chulapa-101/generate)
to get an editable personal blog with three sample posts, About, year, category
and tag archives, Fuse.js search, RSS and a paginated home page. It uses the
predefined Gitdev skin and includes publishing workflows.

Choose **GitHub Actions** in your repository's **Settings > Pages**. Edit
`_config.yml` with your title, description, author, `repository`
(`username/repository`) and `url` (`https://username.github.io`). Commit your
changes to `main` or `master`; the Pages workflow supplies the deployment base
path and publishes the site. No local installation or personal access token is
required.

[Preview chulapa-101](https://dieghernan.github.io/chulapa-101/) and follow
[the start guide](./00-start#start-with-the-github-template) for the content
structure and editing steps. Replace the sample text, image and contact address
as you make the blog your own.

## 2. Remote theme method

**Recommended if you are migrating an existing site.**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

You can use the `jekyll-remote-theme` method. Just follow these steps:

1. Create a new GitHub repository or open an existing one.
2. Add this line to your `_config.yml`:

    ```yaml
    remote_theme: dieghernan/chulapa
    ... more config options
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

During the build, `jekyll-remote-theme` downloads the selected theme and makes
its files available to Jekyll, including these directories:

- `assets`
- `_layouts`
- `_includes`
- `_sass`

Local files at the same paths override the corresponding theme files. You must
merge updates to those files manually; other theme files continue to use the
selected remote version.

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
