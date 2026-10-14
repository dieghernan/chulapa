[![Chulapa live
preview](https://dieghernan.github.io/chulapa/assets/img/site/banner.png "live preview")](https://dieghernan.github.io/chulapa/)

![GitHub release (latest by
date)](https://img.shields.io/github/v/release/dieghernan/chulapa)
[![Gem Version](https://badge.fury.io/rb/chulapa-jekyll.svg)](https://badge.fury.io/rb/chulapa-jekyll)
![Gem Total Downloads](https://img.shields.io/gem/dt/chulapa-jekyll)
![License](https://img.shields.io/github/license/dieghernan/chulapa)
![Jekyll](https://img.shields.io/badge/jekyll-%3E%3D3.8.7-blue)
![GitHub Pages](https://img.shields.io/badge/gh--pages-ready-succes)
![Google Analytics](https://img.shields.io/badge/google--analytics-ready-succes)
![Disqus](https://img.shields.io/badge/disqus-ready-succes) ![Social
sharing](https://img.shields.io/badge/social--sharing-ready-succes)
![SEO](https://img.shields.io/badge/seo-ready-succes)
![Video support](https://img.shields.io/badge/video--support-ok-succes)
[![ko-fi](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-yellow.svg)](https://ko-fi.com/dieghernan)

# [<span class="chulapa">Chulapa</span>](https://dieghernan.github.io/chulapa/)

### A flexible, visual Jekyll theme for blogs, portfolios and personal sites

Choose from 40+ skins, customize colors from YAML and publish with GitHub Pages.
Start with the ready-to-publish blog template, then add the features you need.

[Get started](https://dieghernan.github.io/chulapa/docs/00-start) ·
[Browse skins](https://dieghernan.github.io/chulapa/skins) ·
[See real sites](https://dieghernan.github.io/chulapa/showcase)

## Choose your starting point

For your first site, use [chulapa-101](https://github.com/dieghernan/chulapa-101),
the ready-to-publish personal blog template. It includes three sample posts,
a local photograph, About, year, category and tag archives, Fuse.js search,
RSS and a paginated home page, using the predefined Gitdev skin.
[Explore the live starter](https://dieghernan.github.io/chulapa-101/).
Create your repository, enable GitHub Pages with GitHub Actions and edit the
site details and sample content. No local installation is required.

For smaller examples of individual site types, explore the folders below:

| Site | Complete example | Preview |
| --- | --- | --- |
| Personal blog | [A journal and recent-post index](examples/personal-blog) | [Demo](https://dieghernan.github.io/chulapa/demo/starter-personal-blog) |
| Technical blog | [Code, diagrams and equations](examples/technical-blog) | [Demo](https://dieghernan.github.io/chulapa/demo/starter-technical-blog) |
| Portfolio | [A projects collection and card index](examples/portfolio) | [Demo](https://dieghernan.github.io/chulapa/demo/starter-portfolio) |
| Project | [A landing page with source and setup links](examples/project) | [Demo](https://dieghernan.github.io/chulapa/demo/starter-project) |

Each example includes configuration, dependencies and editable content.
For a new site with a publishing workflow, use
[chulapa-101](https://github.com/dieghernan/chulapa-101).
See [the start guide](https://dieghernan.github.io/chulapa/docs/00-start) for
local preview and publishing. Examples follow the default branch; Mermaid
requires development changes after v2.1.0.

## Notable features

- **Responsive design** for phones, tablets and desktops
- **Icons** for menus, links and content
- **3 different navbar styles**
- **Atom and RSS 2.0** feeds
- **Internal search** by Algolia, Lunr, Fuse.js, Simple-Jekyll-Search or Google
  Custom Search
- **Comments** by Disqus, giscus, Cusdis, Cactus and Welcomments
- **Masonry gallery**
- **Video support** - self-hosted videos or videos from providers such as
  YouTube, Vimeo and Dailymotion
- **Search and sharing metadata** generated from your content
- **Styles for code blocks**
- **Mathematical notation** with MathJax
- **[Mermaid diagrams](https://dieghernan.github.io/chulapa/demo/13-mermaid)** - optional per-page rendering (development version after v2.1.0)
- **[PhotoSwipe galleries](https://dieghernan.github.io/chulapa/demo/14-photoswipe)** - opt-in lightboxes for masonry and carousels (v2.1.1-dev, available on `main`; not in v2.1.0)
- **Active TOC sections** - current-section indicators while scrolling (v2.1.1-dev, available on `main`; not in v2.1.0)
- **Google Analytics** and **[GoatCounter](https://dieghernan.github.io/chulapa/docs/02-config#goatcounter-analytics)** - GoatCounter is optional and production-only (v2.1.1-dev, available on `main`; not in v2.1.0)
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

See the [accessibility and performance guide](https://dieghernan.github.io/chulapa/docs/06-accessibility-performance)
for keyboard behavior, color checks and resource loading. These improvements
are development changes after v2.1.0.

See the sample
[`_config.yml` file](https://github.com/dieghernan/chulapa/blob/main/_config.yml).

There are three ways to install <span class="chulapa">Chulapa</span>:

### A. Use our GitHub template

**Recommended if you are starting from scratch.**

Sign in to GitHub and
[create a repository from the template](https://github.com/dieghernan/chulapa-101/generate)
to get started with an editable personal blog. Choose **GitHub Actions** in
your repository's **Settings > Pages**, then update the site details in
`_config.yml` and replace the sample content. Follow the
[starter's setup guide](https://github.com/dieghernan/chulapa-101#create-and-publish-your-site)
for publishing and local preview.

### B. Remote theme method

**Recommended if you are migrating an existing site.**

For an existing Jekyll site, set `remote_theme: dieghernan/chulapa` and follow
[the remote-theme instructions](https://dieghernan.github.io/chulapa/docs/01-install#2-remote-theme-method)
for dependencies and publishing. Without a version tag, this uses development
updates; append `@v2.1.0` to stay on that release.

Use the [migration guide and checklist](https://dieghernan.github.io/chulapa/docs/07-migration)
to adapt your content, navigation and integrations while keeping existing URLs.

### C. Gem-based method 💎

Add `gem "chulapa-jekyll"` to your Gemfile and set `theme: chulapa-jekyll` in
`_config.yml`. Follow [the gem installation steps](https://dieghernan.github.io/chulapa/docs/01-install#3-gem-based-method-)
for required plugins, local preview and updates.

If you have customized theme files in your site, review those copies when
updating: they take precedence over the installed theme.

## Configuration and layouts

See the [documentation](https://dieghernan.github.io/chulapa/docs/01-install)
for installation, configuration, layouts, search, comments and customization.
Start with your site details and content. Add optional integrations when you
need them.

## License

[The MIT License](https://dieghernan.github.io/chulapa/license)

## Attributions

**<span class="chulapa">Chulapa</span>** is a font owned by the City Council of Madrid, designed and produced
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
