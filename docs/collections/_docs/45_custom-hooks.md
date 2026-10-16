---
title: Custom hooks reference
subtitle: File paths, insertion points and override constraints
tags: [docs, custom-hooks]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Lookup for site-wide custom files. For an editing procedure, use
[Add custom HTML to the page head](./44-custom-head).

| Site-relative path | Content | Insertion point or output |
| --- | --- | --- |
| `_includes/custom/custom_head_before_css.html` | HTML | Inside `<head>`, before the theme stylesheet. |
| `_includes/custom/custom_head.html` | HTML | Near the end of `<head>`, after the theme stylesheet. |
| `_includes/custom/custom_bottomscripts.html` | HTML | At the end of `<body>`, after theme JavaScript dependencies. |
| `assets/css/custom.scss` | CSS/SCSS with empty YAML front matter | Compiles to `assets/css/custom.css`, loaded by the theme head. |

## Scope and precedence

Matching local files override theme files with both `remote_theme` and the gem.
The three HTML hooks require no YAML front matter. Existing snippets in an
individual hook remain the site's responsibility; replacing that file replaces
its contents. No new configuration flag enables these hooks.

The built-in `minimal` layout and layouts based on it use the hooks. The standalone
`search` layout also uses them. A custom layout or copied head/scripts include
only has the insertion points its own code preserves; the theme cannot add a
missing hook to an independent layout.

The source of `custom.scss` includes the front matter delimiters before its rules:

```scss
---
---
body {
  line-height: 1.6;
}
```

The HTML hooks accept HTML, including provider scripts or stylesheet links;
plain CSS belongs in the CSS file. Script execution still depends on the
provider, browser policy and dependency order.

## Integration constraints

Google Analytics and development GoatCounter have [built-in settings](./02-config#google-analytics);
a duplicate custom embed can count twice. GoatCounter is absent from v2.1.0.
Favicons need URLs matching the site's deployed `baseurl`; see
[the favicon task](./52-add-favicon).
The [giscus hook](./13-giscus-comments) is provider-specific and separate from
these site-wide insertion points.
