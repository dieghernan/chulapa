---
title: Add a Mermaid diagram
subtitle: Render an accessible flowchart in a post or page
---

Use this guide for an existing Markdown post or page with the `default` layout
or another layout based on `minimal`. The `search` layout does not display page
content.

**Version requirement:** Mermaid is available on `main` after v2.1.0
(v2.1.1-dev), not in the v2.1.0 gem or a remote theme pinned to that release.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Enable and insert the diagram

Add `mermaid: true` to the existing settings block between `---` lines at the top
of your page. Preserve the other fields. Then insert a `mermaid` fenced block
in the body. A complete page example:

````markdown
---
layout: default
title: My publishing workflow
mermaid: true
---

```mermaid
flowchart LR
  accTitle: Publishing workflow
  accDescr: Write content, build the site and publish it.
  A[Write] --> B[Build] --> C[Publish]
```

Saving an article starts the build; a successful build publishes the website.
````

Adapt the labels and accessible description to your diagram. Keep a prose
explanation for complex diagrams.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for **Actions** to
succeed, then open the site from **Settings > Pages**. Check the published page,
not only GitHub's file preview. For a local preview, restart Jekyll after changing
`_config.yml`. If the result is missing, use [the publishing checks](./05-faq#why-can-i-not-see-my-changes).

Use a modern browser with JavaScript modules and ES2024 support (Safari 17.4 or
later). Check that the flowchart replaces the code and fits the page; wide
charts can scroll horizontally. If code remains visible, check `mermaid: true`,
the fence spelling and diagram syntax, then check whether the CDN or JavaScript
is blocked. Mermaid loads from `https://cdn.jsdelivr.net`.

Try the [live Mermaid demo](../demo/13-mermaid). For the library version,
security restrictions and fallback behavior, see
[the Mermaid reference](./04-layouts#mermaid-diagrams).
