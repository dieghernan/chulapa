---
title: Installation
subtitle: How to use <span class="chulapa">Chulapa</span>
excerpt: Install Chulapa on your Github repo
show_toc: true
---

<span class="chulapa">Chulapa</span> was developed in and for Github. There are
three tested possible ways to use <span class="chulapa">Chulapa</span>:

## 1. Use our Github Template

**Recommended if you are starting from scratch**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

Create a Github account, click [this link](https://github.com/dieghernan/chulapa-101/generate)
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

3. Remove other `remote_theme/theme` instances from your `_config.yml` file.

<div class="alert alert-warning p-3 mx-2" markdown="1">
**Don't forget to deploy your site:**

- On your Github repo, go to *Settings > Github Pages*.
- Select *Source > Github Actions* and set the corresponding action. See an
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

With Gem-based themes, directories such as the `assets`, `_layouts`, `_includes`,
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

To update the theme, run `bundle update`.
