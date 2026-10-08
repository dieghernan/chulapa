---
title: Variables dictionary
permalink: /docs/variable-dictionary
show_toc: true
h_min: 2
h_max: 3
---

This page lists selected <span class="chulapa">Chulapa</span> and Bootstrap variables for customizing
your site. Set them under `chulapa-skin.vars` in `_config.yml`, without the
SCSS `$` prefix or trailing semicolon. For the full set, see the
[<span class="chulapa">Chulapa</span> variables source](https://github.com/dieghernan/chulapa/blob/main/_sass/chulapa/_variables.scss)
and [Bootstrap variables source](https://github.com/dieghernan/chulapa/blob/main/_sass/bootstrap/_variables.scss).

Quote hex colors in YAML so that `#` is not interpreted as a comment. Use
Sass units for sizes, such as `"1.1rem"`, and lowercase `true` or `false` for
boolean variables. For example:

```yaml
chulapa-skin:
  vars:
    primary: "#345678"
    navbar-chulapa-hover-bg-color: "#234567"
    chulapa-toc-bg: "#f5f5f5"
    font-size-base: "1.1rem"
    enable-rounded: false
```

Values in `vars` override the selected skin's variable assignments.
Autothemer fills in variables that are still undefined. See
[Theming Chulapa](./03-theming#variables) for the loading order and font setup.

<h2 id="theming"><span class="chulapa">Chulapa</span>-specific variables</h2>

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

The source also contains calculated helpers such as
`navbar-chulapa-text-contrast`, `footer-chulapa-text-contrast`,
`landingpage-card-bg` and `cactus-btn-text`. These are recalculated by the
theme rather than exposed as overridable defaults. Use the component
variables above or custom CSS to adjust the corresponding styles.

**These are Sass variables, not page options.** Set them under
`chulapa-skin.vars`, then restart Jekyll to rebuild the styles. For layout and
front matter options, see [Layouts and snippets](./04-layouts).
{: .alert .alert-info .p-3 .mx-2 .mb-3}

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
