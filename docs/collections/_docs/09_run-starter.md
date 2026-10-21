---
title: Run and publish a starter example
subtitle: Set up one of the minimal Jekyll sites
excerpt: Copy a minimal example, preview it locally and configure its publication.
show_toc: true
tags: [docs, installation, starter-examples]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

**Publication pending:** the v2.2.0 instructions below are prepared for the next
release; its tag is not available yet. Until publication, use `@v2.1.0` instead
of `@v2.2.0` in `remote_theme`. Features marked v2.2.0, including Mermaid,
PhotoSwipe and GoatCounter, are absent from v2.1.0.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

Use this guide when you already work with Jekyll and want to run one of the
[starter examples](./08-starter-examples). You need Ruby, Bundler and an internet
connection for gem installation and the remote theme download. The supplied
Gemfiles use Jekyll `~> 4.4`; keep each Gemfile together with its configuration.
For a first site without installing software, use [the browser tutorial](./00-start).

The project example's "Getting started" section is placeholder copy for the
project you are presenting, not an installation procedure for this theme.
The demos show annotated sources inside the documentation site; your copy uses
the example's own skin and generates its own article/project links.

## Prepare your copy

1. Copy the **contents** of your selected example folder into your own site
   repository. Keep `_posts` or `_projects` at the site root, alongside `_config.yml`.
2. Edit the existing `title`, `description` and `repository` values in `_config.yml`.
   Set `url` to your site's origin, such as `https://ana.github.io`, and `baseurl`
   to `/my-blog` for that repository's site or `""` for a site at the domain root.
3. Replace sample content and placeholder links. Blog posts go in
   `_posts/YYYY-MM-DD-title.md`; portfolio projects go in `_projects/`.
4. Keep the supplied design, or follow [Choose a skin](./22-choose-skin).
   To keep a released version, append a tag such as `@v2.2.0` to `remote_theme`;
   Mermaid is available in v2.2.0 and later; it is absent from v2.1.0.

## Preview the site

From your copied site's directory, run:

```sh
bundle install
bundle exec jekyll serve --url http://localhost:4000 --baseurl ""
```

Open <http://localhost:4000>. Check the home page, an article or project, and image
and navigation links. Stop the server with **Ctrl+C** when finished. Restart
Jekyll after editing `_config.yml`.

For the technical blog, also open its sample article and check the code,
rendered diagram, equation and TOC links. Mermaid requires a modern browser with
JavaScript modules/ES2024 support and access to jsDelivr; it is not included in
v2.1.0. See [diagram requirements](./04-layouts#mermaid-diagrams) and
[page feature options](./04-layouts#options). For the portfolio, open both project cards;
for the project landing page, check both buttons after replacing placeholder links.

## Publish the site

Follow [remote-theme publishing](./20-remote-theme#publish-and-check) to configure
GitHub Actions for your copy. The example folders do not include a publishing
workflow; copying them does not publish a site.

Wait for the publishing run to succeed, then open the address in **Settings > Pages**.
Check the same content and links on the public site, including its repository path.
