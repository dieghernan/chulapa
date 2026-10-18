---
title: Theming <span class="chulapa">Chulapa</span>
subtitle: Appearance settings reference
show_toc: true
h_min: 2
h_max: 5
tags: [docs, appearance, skins, colors, fonts, code-highlighting]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

This page lists appearance settings. For a task, use [Choose a skin](./22-choose-skin),
[Change a color](./23-change-color), [Change fonts](./24-change-fonts) or
[Change code highlighting](./25-code-highlighting). For relationships between
settings, read [How skins and overrides interact](./26-appearance-precedence).
For custom Sass and the Codeply sandbox, use [Adapt a Sass skin](./28-custom-skin).

Settings belong in `_config.yml` and compile into CSS during the build. Local
preview needs a Jekyll restart after configuration changes.

## Skins

| Field | Values / default | Constraint |
| --- | --- | --- |
| `chulapa-skin.skin` | Exact skin filename without `.scss`; default `none`. Examples: `journal`, `gitdev`, `lux`, `flatly`. | Names are case-sensitive on case-sensitive filesystems; unknown names fail the Sass import. |
| `skin: none` | No predefined skin assignments. | Bootstrap/theme defaults and explicit `vars` still apply. |
| `skin: auto` | Loads the generated palette as the selected skin. | Independent of the optional later `autothemer` step. |

The [skin catalog](../skins) provides the named previews. Its current-site
preview is not a skin named `current`. Procedure: [Choose a skin](./22-choose-skin).

### Optional light/dark selector

In **2.2.0 (unreleased)**, a separate `chulapa-skin-dark` mapping enables a
Light/Dark/Auto dropdown in all navigation styles. It accepts the same `skin`,
`highlight`, `vars` and `autothemer` fields. An omitted dark `highlight` inherits
`chulapa-skin.highlight`, falling back to `default` if neither is set. Other
settings have independent defaults. Without this mapping, switching is disabled.
Light is the initial default and Auto follows the device preference. Choices
are stored in the browser's `chulapa-theme` local-storage entry, shared by sites
on the same origin. JavaScript is required for switching; without it, the first
skin remains available. See [setup and checks](./22-choose-skin#let-visitors-switch-between-light-and-dark).

Custom JavaScript controls can call `window.chulapaSetThemeMode('light')`,
`window.chulapaSetThemeMode('dark')` or `window.chulapaSetThemeMode('auto')`.
The function updates the existing selector and saves the preference when browser
storage is available. It ignores invalid modes or requests made without both
managed stylesheet links. It exists only when `chulapa-skin-dark` is enabled.

## Load Google Fonts

| Field | Value / effect |
| --- | --- |
| `googlefonts` | List of mappings with a `url` for each font stylesheet; no additional fonts when absent. |
| `chulapa-skin.vars.font-family-base` | Body font-family expression, including fallback families. |
| `chulapa-skin.vars.headings-font-family` | Heading font-family expression. |

Loading a stylesheet does not apply its families. Other font providers use the
existing custom-head hook. Procedure: [Change fonts](./24-change-fonts).

## Code highlighting

`chulapa-skin.highlight` selects a highlighting stylesheet; its default is
`default`. The setting selects appearance, while Rouge performs syntax
highlighting. [Style specimens](./syntax-highlighting) show the available styles.
Procedure: [Change code highlighting](./25-code-highlighting).

## Autothemer

`chulapa-skin.autothemer` enables the palette-generation step after skin and
`vars` when set to the YAML boolean `true`; omit it or use `false` to disable
that step. It is independent of `skin: auto`. Its default primary color is
Bootstrap 4's `#007bff` when not already assigned.

Existing skin and `vars` assignments remain in effect. Procedure:
[Enable Autothemer](./27-autothemer). Rationale:
[How skins and overrides interact](./26-appearance-precedence).

## Variables

`chulapa-skin.vars` is a mapping of supported Bootstrap/theme Sass variable names
to Sass expressions. Names omit the leading `$` and trailing `;`. Hex colors,
font lists and sizes are quoted strings; switches such as `enable-rounded` are
YAML booleans. For example:

```yaml
chulapa-skin:
  vars:
    body-bg: "#000"
    body-color: "#eee"
    font-family-base: "Montserrat"
```

The corresponding Sass assignments are `$body-bg: #000;`, `$body-color: #eee;`
and `$font-family-base: Montserrat;`. A font stylesheet is a separate input;
[the fonts guide](./24-change-fonts) includes a complete loading/application example.

The [variable dictionary](./variable-dictionary) lists common inputs;
[Bootstrap's variable source](https://github.com/dieghernan/chulapa/blob/main/_sass/bootstrap/_variables.scss)
contains the full Bootstrap definitions. See also the
[Bootstrap 4 theming reference](https://getbootstrap.com/docs/4.5/getting-started/theming/#variable-defaults). Calculated helpers such as
`landingpage-card-bg` and `cactus-btn-text` are not overridable through `vars`.
Custom CSS handles rules without exposed variables; see
[custom HTML and styles](./45-custom-hooks).
