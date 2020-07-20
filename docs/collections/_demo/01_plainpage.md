---
title: Plain page
categories: [demo]
tags: [layout-default,header-base]
show_breadcrumb: false
---

This is how a plain page would look like. The layout and header type have been already set on the `_config` file as defaults:

```yaml
  -
    scope:
      path: ""
      type: "demo"
    values:
      layout: "default"
      header_type: "base"
```

That would be the default values for every page on the `demo` collection. The front matter of this page is 

```yaml
---
title: Plain page
categories: [demo]
tags: [layout-default,header-base]
---
```

Given that no other option is enabled, although `tags` and `categories` are declared the badges would not show up. Note that those values would be still available for other uses, as cloud tag creation.
