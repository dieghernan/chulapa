---
title: Variables dictionary
subtitle: Selected variable names, value types and constraints
permalink: /docs/variable-dictionary
show_toc: true
h_min: 2
h_max: 3
---

Lookup for selected variables accepted by `chulapa-skin.vars` in `_config.yml`,
not page front matter. Hex colors and Sass expressions such as sizes/font lists
are quoted strings; switches are YAML booleans. Names omit the Sass `$` prefix
and trailing semicolon. For editing and publishing, use [Change a color](./23-change-color)
or [Change fonts](./24-change-fonts). Mapping syntax specimen:

```yaml
chulapa-skin:
  vars:
    primary: "#345678"
    navbar-chulapa-hover-bg-color: "#234567"
    chulapa-toc-bg: "#f5f5f5"
    font-size-base: "1.1rem"
    enable-rounded: false
```

Precedence and inherited values: [How skins and overrides interact](./26-appearance-precedence).

## <span class="chulapa">Chulapa</span>-specific variables

| `vars` | Description |
|:---|:---|
| `navbar-chulapa-bg-color` | Navbar background color |
| `navbar-chulapa-text-color` | Navbar text color |
| `navbar-chulapa-hover-color` | Navbar text color on hover |
| `navbar-chulapa-hover-bg-color` | Navbar link background color on hover |
| `navbar-chulapa-active-color` | Navbar text color for active item |
| `navbar-chulapa-disabled-color` | Navbar text color for disabled item |
| `navbar-chulapa-brand-color` | Navbar brand color |
| `navbar-chulapa-brand-hover-color` | Navbar brand color on hover |
| `navbar-chulapa-toggler-color` | Stroke color of the default hamburger icon |
| `navbar-chulapa-toggler-color-bg` | Background color of the navbar toggle button |
| `navbar-chulapa-toggler-icon-bg` | Background image of the navbar toggle button, as a Sass `url(...)` expression; overrides the default hamburger icon |
| `navbar-chulapa-toggler-border-color` | Border color of the navbar toggle button |
| `footer-chulapa-bg-color` | Footer background color |
| `footer-chulapa-text-color` | Footer text color |
| `footer-chulapa-link-color` | Footer link color |
| `footer-chulapa-hover-color` | Footer link color on hover |
| `footer-chulapa-icon-color` | Footer color of the social icons |
| `footer-chulapa-icon-hover-color` | Footer color of the social icons on hover |
| `hero-chulapa-bg-color` | Hero header background color |
| `hero-chulapa-text-color` | Hero header text color |
| `landingpage-chulapa-bg-color` | Landing page background color |
| `landingpage-chulapa-text-color` | Landing page text color |
| `blockquote-chulapa-bg-color` | Blockquote background color |
| `blockquote-chulapa-text-color` | Blockquote text color |
| `footnote-chulapa-text-color` | Footnote/captions text color |
| `pre-chulapa-bg-color` | Code block background color (may be overridden depending on your `highlight` option) |
| `thead-chulapa-bg-color` | Table head background color |
| `thead-chulapa-text-color` | Table head text color |
| `pagination-chulapa-text-color` | Pagination text color |
| `pagination-chulapa-text-hover-color` | Pagination text color on hover |
| `pagination-chulapa-bg-hover-color` | Pagination background color on hover |
| `indexcards-chulapa-border-color` | Border color of cards on `indexcategory` layout |
| `chulapa-toc-bg` | Background color of the table of contents sidebar |

Unless a skin or `vars` supplies a value, the navbar background uses
`primary`, the footer and hero backgrounds use the navbar background and
the landing page background uses the hero background. Many text colors are
derived from these backgrounds. Explicit component colors supplied by a
skin or `vars` keep their assigned values.

**Some values cannot be overridden through `vars`.** Helpers such as
`landingpage-card-bg` and `cactus-btn-text` are calculated by the theme;
adding them to `chulapa-skin.vars` has no effect. Use the options in the table
or [custom CSS](./45-custom-hooks)
instead. The [complete <span class="chulapa">Chulapa</span> variable reference](https://github.com/dieghernan/chulapa/blob/main/_sass/chulapa/_variables.scss)
includes these calculated values.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

These inputs belong to site configuration, not article settings.
Page options: [Layouts and snippets](./04-layouts).

## Selected Bootstrap variables

See the full set of variables [here](https://raw.githubusercontent.com/dieghernan/chulapa/main/_sass/bootstrap/_variables.scss).

| `vars` | Description |
|:---|:---|
| `primary` | Primary color |
| `secondary` | Secondary color |
| `success` | Success color |
| `info` | Info color |
| `warning` | Warning color |
| `danger` | Danger color |
| `light` | Light color |
| `dark` | Dark color |
| `enable-rounded` | Set to `false` to disable Bootstrap rounding for buttons and other components |
| `enable-responsive-font-sizes` | Font sizes are responsive when set to `true` |
| `body-bg` | Body background color |
| `body-color` | Body text color |
| `link-color` | Link text color |
| `link-hover-color` | Link text color on hover |
| `text-muted` | Muted text color; also the default border color for index cards |
| `font-family-base` | Main font family |
| `headings-font-family` | Headings font family |
| `font-family-monospace` | Font family for code and other monospace text |
| `font-size-base` | Base font size, with a Sass unit such as `rem`; defaults to `1rem` |
| `line-height-base` | Base line height as a unitless multiplier; defaults to `1.5` |
| `headings-color` | Headings text color |
| `border-radius` | Default border radius for Bootstrap components |
| `carousel-control-color` | Color for carousel controls |
| `carousel-indicator-active-bg` | Color for carousel indicators |

### Color map

The [Bootstrap color palette](https://getbootstrap.com/docs/4.5/getting-started/theming/#color) can be customized using these Sass variables:

These are palette values. Use semantic variables such as `primary`, `danger`
or `body-bg` to assign colors to components. A skin may define semantic
colors explicitly, so changing a palette value such as `blue` does not
necessarily change that skin's `primary` color.

| Variable | Variable | Variable | Variable |
|:---|:---|:---|:---|
| `white` | `gray-100` | `gray-200` | `gray-300` |
| `gray-400` | `gray-500` | `gray-600` | `gray-700` |
| `gray-800` | `gray-900` | `black` | `blue` |
| `indigo` | `purple` | `pink` | `red` |
| `orange` | `yellow` | `green` | `teal` |
| `cyan` | | | |
