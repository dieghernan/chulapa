[![Chulapa live
preview](https://dieghernan.github.io/chulapa/assets/img/site/banner.png "live preview")](https://dieghernan.github.io/chulapa/)

![GitHub release (latest by
date)](https://img.shields.io/github/v/release/dieghernan/chulapa)
[![Gem Version](https://badge.fury.io/rb/chulapa-jekyll.svg)](https://badge.fury.io/rb/chulapa-jekyll)
![Gem Total Downloads](https://img.shields.io/gem/dt/chulapa-jekyll)
![License](https://img.shields.io/github/license/dieghernan/chulapa)
![Jekyll](https://img.shields.io/badge/jekyll-%3E%3D3.8.7-blue)
![Bootstrap](https://img.shields.io/badge/bootstrap-4.5.0-blue)
![Font Awesome](https://img.shields.io/badge/fontawesome-6.x-blue)
![Algolia](https://img.shields.io/badge/algolia-4.x-blue)
![Lunr](https://img.shields.io/badge/lunr-2.x-blue)
![Fuse.js](https://img.shields.io/badge/fuse.js-7.x-blue)
![MathJax](https://img.shields.io/badge/mathjax-3.x-blue)
![GitHub Pages](https://img.shields.io/badge/gh--pages-ready-succes)
![Google Analytics](https://img.shields.io/badge/google--analytics-ready-succes)
![Disqus](https://img.shields.io/badge/disqus-ready-succes) ![Social
sharing](https://img.shields.io/badge/social--sharing-ready-succes)
![SEO](https://img.shields.io/badge/seo-ready-succes)
![Video support](https://img.shields.io/badge/video--support-ok-succes)
[![ko-fi](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg)](https://ko-fi.com/dieghernan)

# [<span class="chulapa">Chulapa</span>](https://dieghernan.github.io/chulapa/)

### A flexible Jekyll theme for GitHub Pages

## Notable features

- **Bootstrap 4** - Fully responsive
- **Font Awesome 6** - v5 is also supported, with optional v4 shims
- **3 different navbar styles**
- **Atom and RSS 2.0** feeds
- **Internal search** by Algolia, Lunr, Fuse.js, Simple-Jekyll-Search or Google
  Custom Search
- **Comments** by Disqus, giscus, Cusdis, Cactus and Welcomments
- **Masonry gallery**
- **Video support** - self-hosted videos or videos from providers such as
  YouTube, Vimeo and Dailymotion
- **Structured data** for better SEO
- **Code highlighting** - Pygments-compatible styles for Rouge
- **MathJax** support
- **Google Analytics**
- **Twitter/X Cards** and **Open Graph** data valid for Facebook, LinkedIn and
  WhatsApp
- **40+ preinstalled skins**
- **Powerful look-and-feel customization** with a dedicated sandbox
- **Archive, tag and category clouds and card index layouts**
- **Breadcrumb navigation**
- **Multiple authors** with locations, pictures and social links for travel
  blogs and collaborative sites

A flexible theme for blogs, news sites, portfolios and personal sites. See the
[documentation](https://dieghernan.github.io/chulapa/docs/01-install) to learn
more.

## Installation

See the sample
[`_config.yml` file](https://github.com/dieghernan/chulapa/blob/main/_config.yml).

There are three ways to install <span class="chulapa">Chulapa</span>:

### A. Use our GitHub template

**Recommended if you are starting from scratch.**

Sign in to GitHub and
[create a repository from the template](https://github.com/dieghernan/chulapa-101/generate)
to get started.

### B. Remote theme method

**Recommended if you are migrating an existing site.**

If you prefer not to use the template, you can use the `jekyll-remote-theme`
method. Just follow these steps:

1. Create a new GitHub repository or open an existing one.

2. Add this line to your `_config.yml`:

    ``` yaml

    remote_theme: dieghernan/chulapa

    ... more config options
    ```

3. Remove any other `remote_theme` entry and the `theme` entry from
   `_config.yml`. Add `jekyll-remote-theme` and `jekyll-include-cache` to your
   `Gemfile` and the `plugins` list in `_config.yml`, then run `bundle install`.
   <span class="chulapa">Chulapa</span> requires `jekyll-include-cache` for its
   `include_cached` tags.

   For local or custom builds, also install the runtime dependencies listed in
   the [gemspec](https://github.com/dieghernan/chulapa/blob/main/chulapa-jekyll.gemspec).
   A remote theme does not install these dependencies for you.

An unpinned remote theme follows the repository default branch. To select a
release, append its tag, for example `remote_theme: dieghernan/chulapa@v2.0.1`.
Development features may be available on the default branch before they are
published in the gem.

### C. Gem-based method 💎

With gem-based themes, directories such as `assets`, `_layouts`, `_includes`
and `_sass` are stored in the theme's gem rather than your site directory.
This makes installation and updates easier because you do not have to manage
the theme files directly.

To install as a gem-based theme:

1. Add the following to your `Gemfile`:

    ``` ruby
    gem "chulapa-jekyll"
    ```

2. Install the bundled gems by running the following
    [Bundler](https://bundler.io/) command:

    ``` bash
    bundle
    ```

3. Set the `theme` in your project's Jekyll `_config.yml` file:

    ``` yaml
    theme: chulapa-jekyll
    ```

Enable `jekyll-include-cache` in the `plugins` list in `_config.yml`. Remove any
`remote_theme` entry when using the gem. To update only the theme and its
dependencies, run `bundle update chulapa-jekyll`.

To preview your site locally, run `bundle exec jekyll serve` from your site
directory. Restart Jekyll after editing `_config.yml` to reload its settings.

## Configuration and layouts

See the [documentation](https://dieghernan.github.io/chulapa/docs/01-install)
for installation, configuration, layouts, search, comments and customization.
Structured data options include an independent `publisher`, representative
article images through `schema_image` and per-page crawler directives through
`robots`.

## License

[The MIT License](https://dieghernan.github.io/chulapa/license)

## Attributions

**Chulapa** is a font owned by the City Council of Madrid, designed and produced
by Joancarles Casasín and Pablo Gámez based on an earlier design by Silvia
Fernández Palomar and licensed under [Creative Commons CC BY, version
4.0](https://creativecommons.org/licenses/by/4.0/). This theme incorporates a
modification of this work to support the English language.

Bootstrap v.4.5 is released under the [MIT
license](https://github.com/twbs/bootstrap/blob/v4.5.0/LICENSE) and is copyright
2020 Twitter.

Font Awesome 6.x is free, open source and GPL-friendly. See its
[License](https://fontawesome.com/license/free) (Icons: CC BY 4.0, Fonts: SIL
OFL 1.1, Code: MIT License).

This theme incorporates code from [Minimal
Mistakes](https://mmistakes.github.io/minimal-mistakes/), Copyright (c)
2013-2020 [Michael Rose](https://mademistakes.com/) and contributors distributed
under the terms of the [MIT
license](https://github.com/mmistakes/minimal-mistakes/blob/master/LICENSE).

This theme incorporates [Pygments CSS
Themes](http://jwarby.github.io/jekyll-pygments-themes/languages/javascript.html),
developed by [jwarby](https://github.com/jwarby/) distributed under the terms of
[The
Unlicense](https://github.com/jwarby/jekyll-pygments-themes/blob/master/UNLICENSE.txt).

This theme incorporates [Ferpal
Sans](https://ferpal.studio/work/ferpal-sans/), developed by Silvia Ferpal.
The font is free for personal use.

This theme incorporates [Jekyll Pure Liquid Table of
Contents](https://github.com/allejo/jekyll-toc), Copyright © 2017 [Vladimir
"allejo" Jimenez](https://github.com/allejo) distributed under the terms of the
[MIT license](https://github.com/allejo/jekyll-toc/blob/master/LICENSE.MIT.md).

This theme incorporates [Compress HTML in Jekyll](http://jch.penibelst.de/),
Copyright (c) 2014 [Anatol Broder](https://github.com/penibelst) distributed
under the terms of the [MIT
license](https://github.com/penibelst/jekyll-compress-html/blob/master/LICENSE).

This theme incorporates [Lunr](https://lunrjs.com), Copyright (c) 2013 Oliver
Nightingale. Lunr is distributed under the terms of the [MIT
License](https://github.com/olivernn/lunr.js/blob/master/LICENSE).

This theme uses graphic resources from
[Unsplash](https://unsplash.com/@dieghernan/collections).

This theme uses graphic resources from
[Pexels](https://www.pexels.com/@dieghernan-3081919/collections/).

This theme uses graphic resources from [Lorem Picsum](https://picsum.photos/).
