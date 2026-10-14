---
title: Theming <span class="chulapa">Chulapa</span>
subtitle: Appearance settings reference
show_toc: true
h_min: 2
h_max: 5
---

This page lists appearance settings. For a task, use [Choose a skin](./22-choose-skin),
[Change a color](./23-change-color), [Change fonts](./24-change-fonts) or
[Change code highlighting](./25-code-highlighting). For relationships between
settings, read [How skins and overrides interact](./26-appearance-precedence).

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

## Change one color

Procedure: [Change a color](./23-change-color). Component names and constraints
are in [Variables](#variables) and the [variable dictionary](./variable-dictionary).

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
[custom HTML and styles](./05-faq#add-custom-html-analytics-css-or-javascript-to-every-page).

<h2 id="tool"><span class="chulapa">Chulapa</span> theming tool</h2>

Procedure and [Codeply sandbox](https://www.codeply.com/p/qhEml875ge) details:
[Adapt a Sass skin](./28-custom-skin). The following legacy headings preserve
links to the moved example.

### Step-by-step example

[Sunset assignment example](./28-custom-skin#step-by-step-example).

#### 1. On the tool

[Preview the assignments](./28-custom-skin#1-on-the-tool).

<h4 id="step-2">2. On your<code> _config.yml</code></h4>

[Apply the translated settings](./28-custom-skin#step-2).

### Using autothemer on Codeply

[Sandbox Autothemer and Bootstrap/grid constraints](./28-custom-skin#using-autothemer-on-codeply).
