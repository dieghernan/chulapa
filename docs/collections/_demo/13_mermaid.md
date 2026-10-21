---
title: Mermaid diagrams
subtitle: Flowcharts and sequence diagrams from Markdown
categories: [demo]
header_type: post
tags: [layout-default, header-post, social-links, tags, categories, bottom-navs, author, date, mermaid, diagrams, markdown]
date: 2022-12-01
show_date         : true
show_sociallinks  : true
show_tags         : true
show_categories   : true
show_bottomnavs   : true
show_author: true
show_toc: true
mermaid: true
redirect_from:
  - /demo/mermaid
---

Mermaid support is available in the v2.2.0.
Follow [Add a Mermaid diagram](../docs/33-add-diagram) to enable diagrams on your
page. See the [Mermaid reference](../docs/04-layouts#mermaid-diagrams) for browser
requirements, security restrictions and fallback behavior. The diagrams below
show a publishing workflow and how rendering works in the browser.

## Publishing the documentation

A push to `main` starts this repository's GitHub Pages workflow. It installs
Ruby dependencies from `docs/Gemfile`, builds the documentation with Jekyll,
uploads the generated site and deploys it to Pages. The workflow can also run
on its schedule or be started manually.

```mermaid
flowchart TD
  accTitle: Publishing the Chulapa documentation
  accDescr: A push to main, a scheduled run or a manual trigger starts GitHub Actions. The build job checks out the repository, installs Ruby dependencies, configures Pages, builds the documentation and uploads the site. The deployment job publishes the artifact to GitHub Pages.
  Push[Push to main] --> Build
  Schedule[Scheduled run] --> Build
  Manual[Manual trigger] --> Build
  subgraph Build[Build job]
    Checkout[Check out repository] --> Ruby[Set up Ruby and install docs/Gemfile]
    Ruby --> Pages[Configure GitHub Pages]
    Pages --> Jekyll[Build docs with Jekyll and the Pages baseurl]
    Jekyll --> Artifact[Upload docs/_site artifact]
  end
  Artifact --> Deploy[Deploy job: publish to GitHub Pages]
  Deploy --> Site[Chulapa documentation website]
```

## Rendering Mermaid in a <span class="chulapa">Chulapa</span> page

The browser loads Mermaid from jsDelivr and replaces valid diagram blocks with
diagrams. If loading or rendering fails, the source stays visible.

```mermaid
sequenceDiagram
  accTitle: Rendering Mermaid in Chulapa
  accDescr: The browser loads an enabled page and the Chulapa Mermaid module. When diagram blocks exist, the module imports Mermaid from jsDelivr and renders each block. Successful diagrams replace their source, while failed diagrams keep their source visible.
  participant Browser
  participant Pages as GitHub Pages
  participant Module as Chulapa Mermaid module
  participant CDN as jsDelivr
  Browser->>Pages: Request the Mermaid demo
  Pages-->>Browser: HTML with diagram source and module script
  Browser->>Pages: Request chulapa_mermaid.js
  Pages-->>Browser: JavaScript module
  Browser->>Module: Run module
  opt Mermaid blocks exist
    Module->>CDN: Import Mermaid 12.1.0
    alt Library loads
      CDN-->>Module: Mermaid library
      loop Each diagram block
        Module->>Module: Render SVG
        alt Diagram renders
          Module->>Browser: Replace code block with accessible diagram
        else Invalid diagram
          Module->>Browser: Keep source code visible
        end
      end
    else Library cannot load
      Module->>Browser: Keep source code visible
    end
  end
```
