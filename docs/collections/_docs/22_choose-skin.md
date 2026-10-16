---
title: Choose a skin
subtitle: Apply a predefined design to your site
tags: [docs, appearance, skins]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an already published site. In your repository's **Code** tab,
open `_config.yml` and click the pencil. Edit existing entries and preserve
unrelated settings; do not add a second `chulapa-skin` section.

## Set the skin name

Choose a design from the [skin previews](../skins). Use its exact lowercase
name, then change the existing entry, for example:

```yaml
chulapa-skin:
  skin: journal
```

Keep other entries under `chulapa-skin`, including any `vars` overrides. Other
choices include `gitdev`, `lux` and `flatly`. An unknown name prevents the site
from building; selecting a preview in your browser does not save it to your site.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
Check your home page and an article, including the menu on a narrow screen.
Existing color/font overrides can keep parts of the previous appearance; see
[how skins and overrides interact](./26-appearance-precedence) before removing them.
For local preview, restart Jekyll after changing `_config.yml`: these settings
are compiled into CSS during the build. If changes are missing, use
[the publishing checks](./42-unpublished-changes).

For an individual adjustment, use [Change a color](./23-change-color) instead.
