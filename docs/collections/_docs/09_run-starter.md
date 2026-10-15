---
title: Run and publish a starter example
subtitle: Set up one of the minimal Jekyll sites
excerpt: Copy a minimal example, preview it locally and configure its publication.
show_toc: true
---

Use this guide when you already work with Jekyll and want to run one of the
[starter examples](./08-starter-examples). You need Ruby, Bundler and an internet
connection for the remote theme download. For a first site without installing
software, use [the browser tutorial](./00-start).

## Prepare your copy

1. Copy the **contents** of your selected example folder into your own site
   repository. Keep `_posts` or `_projects` at the site root, alongside `_config.yml`.
2. Edit the existing `title`, `description` and `repository` values in `_config.yml`.
   Set `url` to your site's origin, such as `https://ana.github.io`, and `baseurl`
   to `/my-blog` for that repository's site or `""` for a site at the domain root.
3. Replace sample content and placeholder links. Blog posts go in
   `_posts/YYYY-MM-DD-title.md`; portfolio projects go in `_projects/`.
4. Keep the supplied design, or follow [Choose a skin](./03-theming#skins).
   To keep a released version, append a tag such as `@v2.1.0` to `remote_theme`;
   Mermaid is unavailable in that release.

## Preview the site

From your copied site's directory, run:

```sh
bundle install
bundle exec jekyll serve --url http://localhost:4000 --baseurl ""
```

Open <http://localhost:4000>. Check the home page, an article or project, and image
and navigation links. Restart Jekyll after editing `_config.yml`.

## Publish the site

Follow [remote-theme publishing](./20-remote-theme#publish-and-check) to configure
GitHub Actions for your copy. The example folders do not include a publishing
workflow; copying them does not publish a site.

Wait for the publishing run to succeed, then open the address in **Settings > Pages**.
Check the same content and links on the public site, including its repository path.
