---
title: Theming <span class="chulapa">Chulapa</span>
subtitle: Customize colors, fonts and components
show_toc: true
h_min: 2
h_max: 5
---

**Getting started:** choose a [skin](#skins) or [change one color](#change-one-color).
**Advanced reference:** use [Autothemer](#autothemer) and [variables](#variables)
for more control.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

<span class="chulapa">Chulapa</span> lets you customize colors, fonts, spacing, borders and buttons. Use predefined skins or set individual variables to give each site its own appearance.

Set built-in theme variables in `_config.yml`. Use custom CSS for changes
beyond those variables.

**Restart Jekyll after editing `_config.yml`.** Theme variables are compiled
into CSS during the build.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Skins

A skin is a ready-made design with coordinated colors and fonts.
Choose one from the [skin previews]({{ './skins' | absolute_url }}), then
open `_config.yml` and change the existing `chulapa-skin.skin` entry:


```yaml
chulapa-skin:
  skin: journal
```

Keep any other entries under `chulapa-skin`. Save your changes, wait for
publishing and refresh the site. Try `gitdev`, `lux` or `flatly` for other looks.

Use the exact lowercase name shown by the preview: an unknown name prevents
the site from building.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Change one color

To adjust a skin rather than replace it, add or edit `vars` in the same
`chulapa-skin` section. This example chooses a skin and changes its main color:

```yaml
chulapa-skin:
  skin: journal
  vars:
    primary: "#285d70"
```

Keep the quotes around colors beginning with `#`. Check text and link contrast
after publishing; a color change can affect more than one part of the page.
See the [variable dictionary](./variable-dictionary) for menu and footer colors.

## Load Google Fonts

This is optional: each skin already includes a font choice. To use a different
font, choose it at [Google Fonts](https://fonts.google.com/) and add its stylesheet
URL under `googlefonts` in `_config.yml`. Then apply it to text and headings:


```yaml
googlefonts:
  - url: "https://fonts.googleapis.com/css2?family=Raleway&family=Rubik&display=swap"

chulapa-skin:
  skin: journal
  vars:
    font-family-base: "Rubik, sans-serif"
    headings-font-family: "Raleway, sans-serif"
```

Merge these entries with your existing settings rather than creating a second
`chulapa-skin` section. After publishing, your text should use Rubik and your
headings Raleway.

For another provider, add its font stylesheet to
`_includes/custom/custom_head.html` following the provider's instructions.
Then set `font-family-base` and/or `headings-font-family` as in the example
above: loading a font alone does not apply it. See
[custom HTML and styles](./05-faq#add-custom-html-analytics-css-or-javascript-to-every-page)
for other ways to add fonts.

## Code highlighting

Choose how code blocks look from the
[style previews](https://dieghernan.github.io/chulapa/docs/syntax-highlighting).
In `_config.yml`, change or add `highlight` under your existing `chulapa-skin`
section, keeping your other settings:

```yaml
chulapa-skin:
  highlight: zenburn
```

The default style is `default`. Save, publish and check a page containing a
code block to see the change.

## Autothemer

**Optional, for more control over colors.** You can keep the skin unchanged
if you do not need a generated palette.

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

**Advanced reference.** Sass is the styling language used by the theme. You
can set its supported variables through YAML without editing the theme itself.

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
$body-color: #eee;
$font-family-base: Montserrat;

```

In `_config.yml`:

```yaml
googlefonts:
 - url: "https://fonts.googleapis.com/css?family=Montserrat&display=swap"

chulapa-skin:
  vars        :
    body-bg: "#000"
    body-color: "#eee"
    font-family-base: "Montserrat"
```

Values in `vars` override the skin's variables. Autothemer fills in values
that neither the skin nor `vars` sets.

**Quote Sass values in YAML**, especially hex colors such as `"#007bff"`
and font lists such as `"Lato, serif"`. Values are inserted as Sass expressions.
Keep boolean switches such as `autothemer: true` as YAML booleans.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

For commonly used settings, see the [variable dictionary](./variable-dictionary).
Experienced users can also consult the full
[Bootstrap variable list](https://github.com/dieghernan/chulapa/blob/main/_sass/bootstrap/_variables.scss).

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

**Keep the theme's Bootstrap import and grid enabled.** Do not add another
`@import "bootstrap";` to your skin. Setting `$enable-grid-classes: false`
removes grid classes used by the theme and breaks its layouts.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}
