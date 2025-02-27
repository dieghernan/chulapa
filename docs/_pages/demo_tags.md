---
layout: cloudtag2
title: Navigate the tags
subtitle: 'Tags from <code>demo</code> and <code>skins</code> collections'
header_type: hero
permalink: /demo/tags
include_collection: demo,skins
breadcrumb_list:
  - label: Home
    url: /
  - label: Demo
    url: /demo
---

Here you can find the list of tags includes in the `demo` and `skins` collections.

Configuring a tag cloud is a two-step process:

**1. Set the url were the tag cloud would be host on the page**

This could be easily done on your `_config` file via [defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/). On this specific case:

```yaml
  -
    scope:
      path: ""
      type: "demo"
    values:
      layout: "default"
      header_type: "base"
      cloudtag_url        : "/demo/tags"
  -
    scope:
      path: ""
      type: "skins"
    values:
      header_type       : "splash"
      cloudtag_url        : "/demo/tags"
```

After this steps, the tags generated on each specific page of the collection would link to `demo/tags`.

**2. Create the page and host it in that `url`**

The front matter of this page:

```yaml
---
layout: cloudtag
title: Navigate the tags
subtitle: 'Tags from <code>demo</code> collection only'
header_type: hero
permalink: /demo/tags
include_collection: demo,skins
breadcrumb_list:
  - label: Home
    url: /
  - label: Demo
    url: /demo
---

```


The tag cloud should be generated right after this line:

---
