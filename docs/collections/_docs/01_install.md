---
title: Installation
subtitle: How to use <span class="chulapa">Chulapa</span>
excerpt: Install Chulapa on your Github repo
---

[Chulapa]{.chulapa} was developed in and for Github.
There are two tested possible ways to use [Chulapa]{.chulapa}:

## 1. Use our Github Template <i class="fa-solid fa-thumbs-up fa-xs"></i>

This is the **recommended option**.
Create a Github account, go to [chulapa-101 repo](https://github.com/dieghernan/chulapa-101), fork it and quickstart your site!

## 2. Remote theme method

If you prefer not to use the template, you can use the `jekyll-remote-theme` method.
Just follow these steps:

-   Create a new GitHub repository or go to an existing one
-   Add this line to your `_config.yml` and make sure to remove any previous theme or remote theme parameter:

``` yaml

remote_theme: dieghernan/chulapa

... more config options
```

-   Remove other `remote_theme/theme` instances of your `_config.yml` file.

::: {.alert .alert-warning .p-3 .mx-2 markdown="1"}
**Don't forget to deploy your site:**

-   On your Github repo, go to *Setting \> Github Pages* and publish your site.
-   Add your content.
:::

By using `jekyll-remote-theme` your repo would have remote access to the content of these folders:

-   `assets`
-   `_layouts`
-   `_includes`
-   `_sass`

Note that making copies of theme files will prevent you from receiving any theme updates on those files.

Please read the rest of the docs for further adjustments.

## Gem-based method <i class="fa-regular fa-gem fa-xs"></i>

With Gem-based themes, directories such as the `assets`, `_layouts`, `_includes`, and `_sass` are stored in the theme's gem, hidden from your immediate view.
This allows for easier installation and updating as you don't have to manage any of the theme files.

To install as a Gem-based theme:

1.  Add the following to your `Gemfile`:

    ``` ruby
    gem "chulapa-jekyll"
    ```

2.  Fetch and update bundled gems by running the following [Bundler](https://bundler.io/) command:

    ``` bash
    bundle
    ```

3.  Set the `theme` in your project's Jekyll `_config.yml` file:

    ``` yaml
    theme: chulapa-jekyll
    ```

To update the theme run `bundle update`.
