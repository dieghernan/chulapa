---
title: Start a site with <span class="chulapa">Chulapa</span>
subtitle: Choose an example and make it your own
excerpt: Create a personal blog from the Chulapa 101 template or explore four small site examples.
show_toc: true
---

## Start with the GitHub template

For your first site, use [<span class="chulapa">Chulapa</span> 101](https://github.com/dieghernan/chulapa-101).
It is an editable personal blog with publishing workflows already included.
[Explore the live starter](https://dieghernan.github.io/chulapa-101/) before
creating your repository.

The template includes three sample posts, a local photograph with alternative
text and credit, About, archives by year, category and tag, Fuse.js search and
RSS. Its home page lists recent posts with pagination. It uses the predefined
`gitdev` skin without color or CSS overrides.

1. [Create your repository from the template](https://github.com/dieghernan/chulapa-101/generate).
2. In **Settings > Pages**, choose **GitHub Actions** as the source.
3. Edit `_config.yml`: set your title, description, author, `repository`
   (`username/repository`) and `url` (`https://username.github.io`). Commit
   your changes to `main` or `master` to trigger deployment.

The workflow sets the deployment base path. You do not need a personal access
token or a local Ruby installation. Check **Actions** for build progress and
**Settings > Pages** for your website address.

Edit `index.html` for the home page, `_pages/about.md` for About and `_posts/`
for your stories. Images go in `assets/img/`. Navigation, author details,
footer links and the skin are configured in `_config.yml`. Keep the home page
named `index.html`: Jekyll's pagination plugin requires it. The default is five
posts per page. The template is one ordinary site; it has no profile selector.

Its `_config.yml` follows the theme's full configuration with commented options,
including unused settings. Start with site details in section A; the rest of
the blog is configured already. The template's collections and defaults are
adapted to a personal blog rather than the theme's documentation site.
Optional hooks are provided in `_includes/custom/` for head tags, scripts and
Giscus, alongside `assets/css/custom.scss` for CSS or SCSS. They contain comments
only; the predefined skin is unchanged until you add your own styles.
The template README also maps additional extension points for favicons, your
JavaScript, custom skins, page front matter and local layout or include overrides.

See [the template README](https://github.com/dieghernan/chulapa-101#add-your-content)
for editing, image credits and optional local preview.

## Explore minimal examples

Choose the example closest to your site. Each folder contains a Gemfile,
`_config.yml`, a home page and sample content. They use existing Chulapa options;
you can add search, comments and other features later.

## Choose a starting point

| Site | What you get | Preview | Files |
| --- | --- | --- | --- |
| Personal blog | A recent-post card index and a first story | [Blog demo](../demo/starter-personal-blog) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/personal-blog) |
| Technical blog | A post with code, diagrams, equations and a TOC | [Technical demo](../demo/starter-technical-blog) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/technical-blog) |
| Portfolio | A projects collection, card index and two project pages | [Portfolio demo](../demo/starter-portfolio) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/portfolio) |
| Project | A landing page with source and getting-started buttons | [Project demo](../demo/starter-project) | [Copy the files](https://github.com/dieghernan/chulapa/tree/main/examples/project) |

These examples follow the theme's default branch. Mermaid is available in the
development version after v2.1.0 and is not in the v2.1.0 gem or pinned release.
For reproducible theme updates, append an existing release tag to `remote_theme`.
See [installation](./01-install) for release and gem options.

## Make it your own

1. Copy the **contents** of one example folder into your own site repository.
   Keep `_posts` or `_projects` at the site root, alongside `_config.yml`.
2. Edit `title`, `description` and `repository`. Set `url` to your site's origin
   and `baseurl` to `/repository` for a project site or `""` for a root site.
3. Replace the sample content and placeholder links. A blog post goes in
   `_posts/YYYY-MM-DD-title.md`; a portfolio project goes in `_projects/`.
4. Choose a [skin](./03-theming) or keep the example's preset. The presets are
   `journal`, `gitdev`, `lux` and `flatly`, respectively.

You do not need to copy theme layouts, includes or assets. The remote theme
supplies them during the build. The Gemfile includes the dependencies needed
for a local build.

## Preview locally

Install Ruby and Bundler, then run these commands from your copied site:

```sh
bundle install
bundle exec jekyll serve --url http://localhost:4000 --baseurl ""
```

Open <http://localhost:4000>. The local URL options leave your publication
settings unchanged. Restart the server after changing `_config.yml`.
Remote-theme downloads require network access.

## Publish and extend

For a new site with a publishing workflow already included, start with the
[chulapa-101 template](https://github.com/dieghernan/chulapa-101). Use the small
examples above to explore layouts or copy their content into your site.

Follow the [GitHub Actions deployment instructions](./01-install#2-remote-theme-method).
Copying an example alone does not configure hosting. These folders do not
include a deployment workflow.

Once your content is in place, add [search and comments](./02-config), explore
[layouts and snippets](./04-layouts) or see [sites using Chulapa](../showcase).
The portfolio example uses a collection index; it does not include filtering.
The project example is a landing page; it does not add a documentation sidebar.
