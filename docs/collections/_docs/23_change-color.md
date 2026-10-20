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

The bundled palettes receive small color and YIQ threshold adjustments while
preserving their original primary colors and visual identity. Dark dim skins
retain brighter accents for links and navigation. Some original combinations
remain below 4.5:1; these improvements do not certify every palette as WCAG AA.
Filled buttons retain their original light labels where YIQ adjustments had
changed them to dark text, including hover, focus and active states. Low-contrast
outline labels and borders are adjusted for the skin’s page background;
`Light` and `Dark` variants retain their use on alternate backgrounds.
All eight solid-button variants in the 16 skins authored by dieghernan reach
4.5:1 in normal, hover, focus and active states. Selected fills are darker with
white labels; Listen retains dark labels on bright fills, and Chulapa Success
uses lighter interaction fills. Hootstrap Primary also receives a minimal AA
adjustment. These button-specific changes leave global palette and link accents
unchanged; they do not certify other components or entire skins.
Button corrections apply to unchanged stock colors. Setting a semantic color
through `vars` keeps that variant on the skin’s normal color handling; stock
outline corrections also stop applying if you change the page background.
Autothemer fills palette defaults without importing the Auto skin’s button styles.
No new configuration is required.

Check text contrast on your actual page, particularly when using custom `vars`,
generated palettes, fixed white text, translucent backgrounds or hover/focus
states. Preserving a skin's identity can require accepting a contrast limitation
or choosing different text colors for your site's components.

### Original Bootswatch skins (2.2.0, unreleased)

`cerulean`, `litera` and `pulse` retain Bootswatch 4.6.2's original palettes,
typography and component styles. Select one using the existing `chulapa-skin.skin`
setting; no extra configuration is required. Existing `vars` still override skin
variables. These three skins deliberately keep upstream contrast limitations;
they are not included in the AA button adjustments described above. Cerulean's
gradients also need checking across their full area, not just one background color.
See their previews in the [skin catalog]({{ "/skins" | relative_url }}).
