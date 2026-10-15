---
title: Change the fonts
subtitle: Load a font stylesheet and apply its families
---

Use this guide for an already published site. In your repository's **Code** tab,
open `_config.yml` and click the pencil. Edit existing entries and preserve
unrelated settings; do not add a second `chulapa-skin` section.

Each skin already has a font choice; changing fonts is optional. For the bundled
font rather than an external stylesheet, use [the bundled-font guide](./53-chulapa-font).

## Load and apply the fonts

Choose families at [Google Fonts](https://fonts.google.com/) and use their
stylesheet URL. Add the URL to the existing `googlefonts` list, then set the
families under your existing `chulapa-skin.vars`. For example:

```yaml
googlefonts:
  - url: "https://fonts.googleapis.com/css2?family=Raleway&family=Rubik&display=swap"

chulapa-skin:
  skin: journal
  vars:
    font-family-base: "Rubik, sans-serif"
    headings-font-family: "Raleway, sans-serif"
```

Keep your selected skin and other variables. The stylesheet loads the families;
`font-family-base` applies Rubik to body text and `headings-font-family` applies
Raleway to headings. Loading a font alone does not apply it.

For another provider, place its stylesheet link in
`_includes/custom/custom_head.html` following that provider's instructions, then
set the family variables as above. See [custom head instructions](./44-custom-head).

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
Check body text and headings on your home page and an article. Confirm that
text remains readable on a narrow screen. If a font is missing, check the family
spelling and stylesheet URL; a blocker or network failure can prevent an external
font from loading, leaving the fallback family.
For local preview, restart Jekyll after changing `_config.yml`: these settings
are compiled into CSS during the build. If changes are missing, use
[the publishing checks](./42-unpublished-changes).

For all relevant fields, see [the font reference](./03-theming#load-google-fonts).
