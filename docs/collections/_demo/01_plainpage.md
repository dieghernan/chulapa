---
title: Plain page
categories: [demo]
tags: [layout-default,header-base]
show_breadcrumb: false
---

This example shows a plain page. The layout and header type are set as
defaults in `_config.yml`:

```yaml
  -
    scope:
      path: ""
      type: "demo"
    values:
      layout: "default"
      header_type: "base"
```

These defaults apply to every page in the `demo` collection. The front matter
of this page is:

```yaml
---
title: Plain page
categories: [demo]
tags: [layout-default,header-base]
---
```

The tag and category badges are hidden because their display options are not
enabled. The declared `tags` and `categories` remain available for other uses,
such as tag clouds.
