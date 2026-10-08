---
title: My project starter
subtitle: An open source project with a clear starting point
layout: landingpage
header_type: hero
project_links:
  - label: Source code
    icon: fab fa-github
    url: https://github.com/dieghernan/chulapa/tree/main/examples/project
  - label: Get started
    icon: fas fa-book
    url: "#getting-started"
show_toc: true
show_related: false
show_random: false
show_comments: false
categories: [starter]
tags: [starter, project]
---

[Get the complete example](https://github.com/dieghernan/chulapa/tree/main/examples/project)
or follow the [start guide](../docs/00-start).
Copy the example's files into your own repository and replace the sample content.
The complete example includes a Gemfile and configuration; this demo displays
its home-page source.

## Home-page header

```yaml
---
layout: landingpage
title: My project
subtitle: Explain what your project helps people do
header_type: hero
project_links:
  - label: Source code
    icon: fab fa-github
    url: https://github.com/username/project
  - label: Get started
    icon: fas fa-book
    url: "#getting-started"
---
```

## Home-page content

## What you can build

Describe a concrete task that your project makes easier. Include an example
of the result and who it is for.

## Getting started

1. Download or install the project using your own installation instructions.
2. Run the smallest useful example.
3. Link to your project's documentation and support channels.

## Contributing

Replace the source-code URL above and explain how people can contribute.

## Site configuration

```yaml
# Edit title, description, repository, url and baseurl before publishing.
remote_theme: dieghernan/chulapa
# The default branch includes development features. Append @TAG to pin a release.
title: My project
description: An open source project with a clear starting point
repository: username/site
url: https://username.github.io
baseurl: /site
locale: en-US
plugins:
  - jekyll-remote-theme
  - jekyll-include-cache
  - jekyll-github-metadata
  - jekyll-paginate
  - jekyll-sitemap
exclude: [Gemfile, Gemfile.lock, README.md, vendor]
kramdown:
  input: GFM
chulapa-skin:
  skin: flatly
navbar:
  brand:
    title: My project
  nav:
    - title: Home
      url: /
```
