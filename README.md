[![Chulapa live
preview](https://dieghernan.github.io/chulapa/assets/img/site/banner.png "live preview")](https://dieghernan.github.io/chulapa/)

![GitHub release (latest by
date)](https://img.shields.io/github/v/release/dieghernan/chulapa) [![Gem
Version](https://badge.fury.io/rb/chulapa-jekyll.svg)](https://rubygems.org/gems/chulapa-jekyll)
![GitHub](https://img.shields.io/github/license/dieghernan/chulapa)
![Jekyll](https://img.shields.io/badge/jekyll-3.8.7-blue)
![Bootstrap](https://img.shields.io/badge/bootstrap-4.5.0-blue)
![Fontawesome](https://img.shields.io/badge/fontawesome-6.x-blue)
![Algolia](https://img.shields.io/badge/algolia-4.x-blue)
![lunr](https://img.shields.io/badge/lunr-2.x-blue)
![mathjax](https://img.shields.io/badge/mathjax-3.x-blue)
![GHpages](https://img.shields.io/badge/gh--pages-ready-succes)
![google-analytics](https://img.shields.io/badge/google--analytics-ready-succes)
![disqus](https://img.shields.io/badge/disqus-ready-succes) ![social
sharing](https://img.shields.io/badge/social--sharing-ready-succes)
![seo](https://img.shields.io/badge/seo-ready-succes)
![video](https://img.shields.io/badge/video--support-ok-succes)
[![ko-fi](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg)](https://ko-fi.com/dieghernan)

# [Chulapa](https://dieghernan.github.io/chulapa/)

### A full flexible Jekyll theme for Github Pages

## Notable features

-   **Bootstrap 4** - Fully responsive
-   **Fontawesome 6** - v5 also supported. v4 is supported via shims but would
    be deprecated at some point
-   **3 different navbar styles**
-   **Atom and RSS 2.0** feed
-   **Internal search** by Algolia, Lunr or Google Custom Search
-   **Comments** by Disqus and Giscus
-   **Masonry gallery**
-   **Video support** - self-hosted or from core providers: Youtube, Vimeo,
    DailyMotion...
-   **Structured data** for better SEO
-   **Code highlight** - +20 Pygment styles
-   **Mathjax** inside
-   **Google Analytics**
-   **Twitter/X Cards** and **Open Graph** data valid for Facebook, LinkedIn and
    WhatsApp
-   **14+ preinstalled skins**
-   **Powerful look-and-feel customization** with a dedicated sandbox
-   **Archive, cloud tag and index special layouts**
-   **Do you like breadcrumbs?** We have it.
-   **Multiple authors** with location, picture and social links. Travel blogs
    and colaborative sites welcome!

A great alternative for blogs, news, portfolios and personal sites. Want to know
more? [Go to Docs](https://dieghernan.github.io/chulapa/docs/01-install).

## Installation

Sample `_config` file
[here](https://github.com/dieghernan/chulapa/blob/master/_config.yml).

There are three possible ways for installing Chulapa:

### A. Use our Github Template

**Recommended if your are starting from scratch.**

Create a Github account, click [this
link](https://github.com/dieghernan/chulapa-101/generate) and quickstart your
site!

### B. Remote theme method

**Recommended if you are migrating a previous site.**

If you prefer not to use the template, you can use the `jekyll-remote-theme`
method. Just follow these steps:

1.  Create a new GitHub repository or go to an existing one

2.  Add this line to your `_config.yml`:

    ``` yaml

    remote_theme: dieghernan/chulapa

    ... more config options
    ```

3.  Remove other `remote_theme/theme` instances of your `_config.yml` file.

### C. Gem-based method 💎

With Gem-based themes, directories such as the `assets`, `_layouts`,
`_includes`, and `_sass` are stored in the theme's gem, hidden from your
immediate view. This allows for easier installation and updating as you don't
have to manage any of the theme files.

To install as a Gem-based theme:

1.  Add the following to your `Gemfile`:

    ``` ruby
    gem "chulapa-jekyll"
    ```

2.  Fetch and update bundled gems by running the following
    [Bundler](https://bundler.io/) command:

    ``` bash
    bundle
    ```

3.  Set the `theme` in your project's Jekyll `_config.yml` file:

    ``` yaml
    theme: chulapa-jekyll
    ```

To update the theme run `bundle update`.

## Configuration and Layouts

You have available an extensive documentation
[here](https://dieghernan.github.io/chulapa/docs/01-install)

## Performance

[![Performance](https://raw.githubusercontent.com/dieghernan/chulapa/master/github-metrics.svg)](https://pagespeed.web.dev/report?url=https://dieghernan.github.io/chulapa/)

## License

[The MIT License](https://dieghernan.github.io/chulapa/license)

## Attributions

**Chulapa** is a font owned by the City Council of Madrid designed and produced
by Joancarles Casasín y Pablo Gámez on a previous design of Silvia Fernández
Palomar licensed under [Creative Commons CC BY, Versión
4.0](https://creativecommons.org/licenses/by/4.0/). This theme incorporates a
modification of this work in order to provide support to the english language.

Bootstrap v.4.5 is released under the [MIT
license](https://github.com/twbs/bootstrap/blob/v4.5.0/LICENSE) and is copyright
2020 Twitter.

Fontawesome 6.x is free, open source, and GPL friendly -
[License](https://fontawesome.com/license/free) (Icons: CC BY 4.0, Fonts: SIL
OFL 1.1, Code: MIT License).

This theme incorporates some pieces of code from [Minimal
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
Sans](https://www.silviaferpal.com/portfolio-1/ferpalsans) developed by Silvia
Ferpal and it's free for personal use.

This theme incorporates [Jekyll Pure Liquid Table of
Contents](https://github.com/allejo/jekyll-toc), Copyright © 2017 [Vladimir
"allejo" Jimenez](https://github.com/allejo) distributed under the terms of the
[MIT license](https://github.com/allejo/jekyll-toc/blob/master/LICENSE.MIT.md).

This theme incorporates [Compress HTML in Jekyll](http://jch.penibelst.de/),
Copyright (c) 2014 [Anatol Broder](https://github.com/penibelst) distributed
under the terms of the [MIT
license](https://github.com/penibelst/jekyll-compress-html/blob/master/LICENSE).

This theme incorporates [Lunr](http://lunrjs.com), Copyright (c) 2013 Oliver
Nightingale. Lunr is distributed under the terms of the [MIT
License](https://github.com/olivernn/lunr.js/blob/master/LICENSE).

This theme uses graphic resources from
[Unplash](https://unsplash.com/@dieghernan/collections).

This theme uses graphic resources from
[Pexels](https://www.pexels.com/@dieghernan-3081919/collections/).

This theme uses graphic resources from [Lorem Picsum](https://picsum.photos/).
