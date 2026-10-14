---
title: Enable Autothemer
subtitle: Generate colors that your skin has not already assigned
---

Use this guide for an already published site. In your repository's **Code** tab,
open `_config.yml` and click the pencil. Edit existing entries and preserve
unrelated settings; do not add a second `chulapa-skin` section.

## Enable palette generation

Set `autothemer` to the YAML boolean `true` and supply a quoted main color.
For a palette without a predefined skin's color assignments, use `none`:

```yaml
chulapa-skin:
  skin: none
  autothemer: true
  vars:
    primary: "#285d70"
```

`none` changes the selected skin; use it only if that is your intention. To keep
your current skin, preserve its name instead. Autothemer can work with a skin,
but it only fills undefined values. Existing skin colors and `vars` overrides
remain in effect. Keep other custom variables unless you mean to remove them.

To stop this extra palette-generation step, omit `autothemer` or set it to
`false` without quotes. A `skin: auto` selection separately loads the generator;
[the reference](./03-theming#autothemer) distinguishes the two settings.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
Check the main color, backgrounds, warnings, errors and text contrast across
your pages. If a color does not change, check whether your skin or `vars` already
sets it. Use [the precedence explanation](./26-appearance-precedence) to decide
whether to change that variable explicitly.
For local preview, restart Jekyll after changing `_config.yml`: these settings
are compiled into CSS during the build. If changes are missing, use
[the publishing checks](./05-faq#why-can-i-not-see-my-changes).
