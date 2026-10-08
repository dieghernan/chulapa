---
title: Theming <span class="chulapa">Chulapa</span>
subtitle: Customize colors, fonts and components
show_toc: true
h_min: 2
h_max: 5
---

<span class="chulapa">Chulapa</span> lets you customize colors, fonts, spacing, borders and buttons. Use predefined skins or set individual variables to give each site its own appearance.

Set built-in theme variables in `_config.yml`. Use custom CSS for changes
beyond those variables.

**Restart Jekyll after editing `_config.yml`.** Theme variables are compiled
into CSS during the build.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Load Google Fonts

You can easily load new fonts via [Google Fonts](https://fonts.google.com/) like this:

```yaml
googlefonts:
 - url: https://fonts.googleapis.com/css2?family=Raleway&family=Rubik&display=swap
 - url: #Another url
```

For another font provider, use either of these methods:

1. Create or edit `_includes/custom/custom_head.html` to add the provider's
   stylesheet or other HTML inside `<head>`.
2. Create or edit `assets/css/custom.scss` to import fonts and add CSS rules.
   Include the empty YAML front matter required for Jekyll to compile SCSS.

**Loading a font does not apply it.** Set `font-family-base` or
`headings-font-family` under `chulapa-skin.vars` to use it. See
[Variables](#variables).
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Code highlighting

Jekyll uses Rouge to highlight code. <span class="chulapa">Chulapa</span> provides Pygments-compatible CSS styles; choose one from the [live demo](https://dieghernan.github.io/chulapa/docs/syntax-highlighting). The default style is `default`.

```yaml
chulapa-skin:
  highlight   : "ZENBURN" #or any other name, default is 'DEFAULT' style
```

## Skins

This theme includes 40+ skins from [Tophat Themes](https://themesguide.github.io/top-hat/dist/), [Bootswatch](https://bootswatch.com/) and others. Take a look at the [skin previews]({{'./skins' | absolute_url }}). To select one for your site:

```yaml
chulapa-skin:
  skin   : #name of the skin
```

Use the exact skin filename without `.scss`; skin names are case-sensitive
on case-sensitive file systems. Use `vars` to override individual settings.
An unknown skin name causes the Sass import to fail.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Autothemer

Autothemer derives a color palette from `primary`, including colors for
warnings and errors. Explicit colors from the skin or `chulapa-skin.vars`
take precedence over its defaults.

You can combine autothemer with a skin. Its SCSS variables use `!default`,
so values already defined by the skin or `vars` remain in effect.

**A skin can limit the visible effect of autothemer.** Use `vars` to change
colors the skin already defines. Autothemer fills undefined values; it does
not replace an existing palette.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

To enable autothemer:

```yaml
chulapa-skin:
  autothemer  :  true #omit to disable this option

```

## Variables

<span class="chulapa">Chulapa</span> exposes Bootstrap and theme Sass variables
through `chulapa-skin.vars` in `_config.yml`. These variables control many
visual properties; use custom CSS for rules that have no corresponding
variable. See the
[Bootstrap 4 theming reference](https://getbootstrap.com/docs/4.5/getting-started/theming/#variable-defaults).

To translate Sass assignments into `chulapa-skin.vars`, omit the leading `$`
and trailing `;` from each variable. The following examples set the body
background, text color and font:

In SCSS:

```scss
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

$body-bg: #000;
$body-color: #111;
$font-family-base: Montserrat;

```

In `_config.yml`:

```yaml
googlefonts:
 - url: "https://fonts.googleapis.com/css?family=Montserrat&display=swap"

chulapa-skin:
  vars        :
    body-bg: "#000"
    body-color: "#111"
    font-family-base: "Montserrat"
```

The loading order is skin, `chulapa-skin.vars`, autothemer, Bootstrap and
<span class="chulapa">Chulapa</span> component styles. Use `vars` to override a skin's font, primary color
or other variables; autothemer fills in values that are still undefined.

**Quote Sass values in YAML**, especially hex colors such as `"#007bff"`
and font lists such as `"Lato, serif"`. Values are inserted as Sass expressions.
Keep boolean switches such as `autothemer: true` as YAML booleans.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

On top of the default [Bootstrap variables](https://github.com/dieghernan/chulapa/blob/main/_sass/bootstrap/_variables.scss) (500+!) this theme has specific variables that make the customization of specific components easier. See the `vars` dictionary [here]({{ "./docs/variable-dictionary" | absolute_url }}).

The critical variable for `autothemer` is `primary`, so you can create a full
theme just playing with those two options. By default, `primary` is set to
Bootstrap default primary color (<span style="color:#007bff;">#007bff</span> in
v4.x).
{: .alert .alert-info .p-3 .mx-2 .mb-3}

<h2 id="tool"><span class="chulapa">Chulapa</span> theming tool</h2>

An online sandbox is available for previewing theme changes. The drawback is
that you have to work with SASS/SCSS and translate it to your `_config.yml`, but
as explained before, the conversion is not complicated.

<div class="text-center my-4">
  <a class="btn btn-lg btn-primary mx-1" href="https://www.codeply.com/p/qhEml875ge" role="button">Go to the Codeply sandbox</a>
</div>

The sandbox example includes **INDEX** and **CLASSICNAVBARDEMO** sections in
the **HTML** panel for comparing navbar styles.


### Step-by-step example

Let's say we want to implement the [Sunset theme](https://themesguide.github.io/top-hat/dist/sunset/) by TopHat on our site. Having a look to the `theme.scss`, it looks like this:

```scss
/*! Tophat `Sunset` Bootstrap 4.3.1 theme */
@import url(https://fonts.googleapis.com/css?family=Voltaire:200,300,400,700);
$headings-font-family:Voltaire;

// Do not disable Bootstrap grid classes in the sandbox.
$primary: #2F414A;
$secondary: #F47B53;
$success: #420084;
$danger: #f2460d;
$info: #7ebcfa;
$warning: #ff9933;
$light: #eef0f2;
$dark: #000633;
// Do not add a second Bootstrap import in the sandbox.

// Add custom Sass rules here.

```

#### 1. On the tool

1. Open the sandbox and paste the font import and variable assignments above
   its existing imports in the **CSS** panel.
2. Run the sandbox to preview Markdown and Bootstrap components.
3. Modify until you are happy with your configuration.

<h4 id="step-2">2. On your<code> _config.yml</code></h4>

Translate that code as follows:

```yaml
googlefonts:
 - url: "https://fonts.googleapis.com/css?family=Voltaire:200,300,400,700"

chulapa-skin:
  vars  :
    primary: "#2F414A"
    secondary: "#F47B53"
    success: "#420084"
    danger: "#f2460d"
    info: "#7ebcfa"
    warning: "#ff9933"
    light: "#eef0f2"
    dark: "#000633"
    headings-font-family: Voltaire
```

Sunset is already included: set `chulapa-skin.skin: sunset` to use the complete
skin. The example above reproduces its palette and heading font through
`vars`; it does not copy all of the skin's CSS rules. Remove `$` and `;` when
translating assignments, quote hex colors and leave a space after `:`.

**Alternatively**, save your SCSS variables in `_sass/skins/THEMENAME.scss`, then set `skin: THEMENAME` inside `chulapa-skin` in `_config.yml`. Use `!default` for customizable skin variables. Autothemer fills undefined colors; omit a color from your skin if you want autothemer to derive it. Do not add a Bootstrap import: the theme imports Bootstrap after loading the skin. See the [Sunset skin source](https://github.com/dieghernan/chulapa/blob/main/_sass/skins/sunset.scss). To contribute a skin, open a pull request.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

### Using autothemer on Codeply

Autothemer is already installed in the **ply**. To activate it,
uncomment the lines between `/* Start autothemer */` and `/* End autothemer */`
on the **CSS** window.

## Themestr.app

Themestr.app was a tool for generating Bootstrap themes. Its original site
is not required for this workflow. Use the
[Codeply sandbox](https://www.codeply.com/p/qhEml875ge) to preview SCSS changes
and translate them into `_config.yml` variables as described above.

**Keep the theme's Bootstrap import and grid enabled.** Do not add another
`@import "bootstrap";` to your skin. Setting `$enable-grid-classes: false`
removes grid classes used by the theme and breaks its layouts.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}
