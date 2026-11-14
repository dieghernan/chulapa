---
title: Change code highlighting
subtitle: Apply a highlighting stylesheet to code blocks
tags: [docs, appearance, code-highlighting]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
series:
  - id: appearance
    order: 6
---

Use this guide for an already published site. In your repository's **Code** tab,
open `_config.yml` and click the pencil. Edit existing entries and preserve
unrelated settings; do not add a second `chulapa-skin` section.

## Select the style

Choose a style from the [highlighting previews](./syntax-highlighting). Change
`highlight` under your existing `chulapa-skin` section:

```yaml
chulapa-skin:
  highlight: zenburn
```

Keep your skin and other settings. `default` is the default highlighting style.
The preview selector changes only the demo, not your site's configuration.

## Publish and check

Use [the publishing checklist](./42-unpublished-changes) to open the updated site.
Open a page containing a fenced code block with a language name, such as
`ruby`. Check the code text, background and contrast, including on a narrow
screen. A highlighting style controls code appearance; it does not change the
font or colors of ordinary article text.
For local preview, restart Jekyll after changing `_config.yml`: these settings
are compiled into CSS during the build. If changes are missing, use
[the publishing checks](./42-unpublished-changes).

For the setting, see [the highlighting reference](./03-theming#code-highlighting).
