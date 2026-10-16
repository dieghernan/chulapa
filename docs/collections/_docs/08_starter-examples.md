---
title: Starter examples reference
subtitle: Small site sources and annotated demonstrations
excerpt: Compare the four minimal examples and find their source files and annotated demonstrations.
show_toc: false
---

These examples are for people who already use Jekyll. Each folder contains a
`Gemfile`, `_config.yml`, home page and sample content. They have **no deployment
workflow**. The separate [<span class="chulapa">Chulapa</span> 101 template](https://github.com/dieghernan/chulapa-101)
is a ready-made personal blog with publishing configured; it is not a selector
for these four examples.

| Example | Included content | Annotated demo | Source |
| --- | --- | --- | --- |
| Personal blog | A recent-post card index and a first story | [Blog demo](../demo/starter-personal-blog) | [personal-blog](https://github.com/dieghernan/chulapa/tree/main/examples/personal-blog) |
| Technical blog | A post with code, Mermaid, MathJax and a TOC | [Technical demo](../demo/starter-technical-blog) | [technical-blog](https://github.com/dieghernan/chulapa/tree/main/examples/technical-blog) |
| Portfolio | A projects collection, card index and two project pages | [Portfolio demo](../demo/starter-portfolio) | [portfolio](https://github.com/dieghernan/chulapa/tree/main/examples/portfolio) |
| Project | A landing page with source and getting-started buttons | [Project demo](../demo/starter-project) | [project](https://github.com/dieghernan/chulapa/tree/main/examples/project) |

The demos display source specimens and sample content inside this documentation
site; they do not reproduce each standalone site's home page or skin. The
portfolio demo's illustrative cards link to source files; the copied site's
cards link to generated project pages. The project demo's **Get started** button
opens fictional project copy, not the website setup guide.

All four folders have identical dependency lists: Jekyll `~> 4.4`, remote-theme,
include-cache, GitHub metadata, pagination, sitemap, the GFM Markdown parser,
WEBrick, Windows timezone data and `ostruct`. The Gemfile installs dependencies;
the configuration enables the listed plugins. Remote themes do not install gems.

The examples use the development remote theme with explicit dependencies. Mermaid
requires development changes after v2.1.0. A portfolio's cards do not provide
filtering, and the project example does not supply a documentation sidebar.

For setup, use [Run and publish a starter example](./09-run-starter).
For a first website without local installation, use [the browser tutorial](./00-start).
