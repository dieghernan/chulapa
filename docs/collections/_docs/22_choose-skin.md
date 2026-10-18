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

## Let visitors switch between light and dark

Available in the development version for **2.2.0 (unreleased)**, after v2.1.0.
The v2.1.0 gem and pinned remote theme do not include this feature.

In `_config.yml`, keep your existing `chulapa-skin` section for the light
appearance. Add a separate `chulapa-skin-dark` section for the dark appearance.
For example, this complete pair uses matching GitDev skins:

```yaml
chulapa-skin:
  skin: gitdev
  highlight: github
chulapa-skin-dark:
  skin: gitdev-dark
  highlight: github.dark
```

Both sections support `skin`, `highlight`, `vars` and `autothemer` with the
[same precedence rules](./26-appearance-precedence). Each section is independent:
copy shared font or color overrides into both if needed. The dark highlighter
uses `chulapa-skin.highlight` when `chulapa-skin-dark.highlight` is omitted,
then `default` if neither is set. Other settings are independent. An unknown
skin or highlighter name fails the build.

After publishing, the navigation shows a sun/moon icon and the current mode,
with **Light**, **Dark** and **Auto** choices in a dropdown. This works with
classic, floating and dual navigation, including sites without menu links.
Light is the initial default. Auto follows the device's color preference and
updates when it changes. The browser remembers the visitor's choice across
pages and tabs. If browser storage is blocked, switching
still works on the current page but the preference cannot be remembered.

Without JavaScript, the site uses `chulapa-skin` and hides the selector. Remove
`chulapa-skin-dark`, or leave all its fields blank, to disable switching.
No additional scripts or styles are loaded when switching is disabled. Existing custom CSS still overrides
both skins; check fixed colors, images, diagrams and embedded comments in both
modes. External widgets do not automatically follow the selector.

If your site's security settings block the selector, visitors still see the
light appearance.

If a skin fails to load, the previous appearance stays available, or Light when
opening a page. Your choice is still remembered. Auto continues to follow device
changes, and opening another page retries your chosen appearance.

Check a home page and an article, including code blocks, keyboard navigation
and the mobile menu. Select Dark, open another page and reload: the page should
start with the dark appearance. Choose Auto and change your device preference
to check both modes. Local previews need a Jekyll restart after config edits.
