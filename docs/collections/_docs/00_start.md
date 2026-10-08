---
title: Start with a small site
subtitle: Choose an example and make it your own
excerpt: Four complete starting points for a blog, technical blog, portfolio or project.
show_toc: true
---

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

Follow the [GitHub Actions deployment instructions](./01-install#2-remote-theme-method).
Copying an example alone does not configure hosting. These folders do not
include a deployment workflow.

Once your content is in place, add [search and comments](./02-config), explore
[layouts and snippets](./04-layouts) or see [sites using Chulapa](../showcase).
The portfolio example uses a collection index; it does not include filtering.
The project example is a landing page; it does not add a documentation sidebar.
