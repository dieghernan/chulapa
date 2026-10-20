---
title: Change a color
subtitle: Override one design value without replacing the skin
tags: [docs, appearance, colors]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an already published site. In your repository's **Code** tab,
open `_config.yml` and click the pencil. Edit existing entries and preserve
unrelated settings; do not add a second `chulapa-skin` section.

## Edit the color

Find the existing `vars` mapping under `chulapa-skin`, or add it once if absent.
This example keeps the `journal` skin and changes its main color:

```yaml
chulapa-skin:
  skin: journal
  vars:
    primary: "#285d70"
```

Keep your own skin name if different. Quote values beginning with `#` and retain
other overrides. For a specific component, use its name from the
[variable dictionary](./variable-dictionary), such as `navbar-chulapa-bg-color`.
A main-color change does not necessarily replace every color explicitly assigned
by the skin; [the precedence explanation](./26-appearance-precedence) describes why.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
Check the changed component, text/link contrast and hover/focus states on
your home page and an article. Check them on a narrow screen too; a color can
affect more than one component.
For local preview, restart Jekyll after changing `_config.yml`: these settings
are compiled into CSS during the build. If changes are missing, use
[the publishing checks](./42-unpublished-changes).

The [appearance reference](./03-theming#variables) covers supported value syntax
and calculated values that cannot be changed through `vars`.

## Palette contrast (2.2.0, unreleased)

The bundled palettes and their YIQ thresholds have been tuned so automatic
text selection reaches at least 4.5:1 on all eight default semantic colors.
Some colors are darker than in v2.1.0, including backgrounds that skins pair
with fixed white text. No new configuration is required.

Custom `vars`, generated palettes with a custom primary color, translucent
backgrounds and hover/focus states still need checks on your actual page.
A passing palette does not establish whole-page accessibility.
