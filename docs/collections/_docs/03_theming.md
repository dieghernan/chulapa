---
title: Theming <span class="chulapa">Chulapa</span>
subtitle: Customize colors, fonts and components
show_toc: true
h_min: 2
h_max: 5
---

<span class="chulapa">Chulapa</span> lets you customize colors, fonts, spacing, borders and buttons. Use predefined skins or set individual variables to give each site its own appearance.

Set built-in theme variables in `_config.yml`. Custom CSS is only needed for
changes beyond those variables. Restart Jekyll after changing configuration.

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

**Note that** while this option would load the fonts, you still need to tell the theme to use them via `vars`, please read [this section](https://dieghernan.github.io/chulapa/docs/03-theming#variables) to know how.
{: .alert .alert-warning .p-3 .mx-2 mb-3}

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

You can use `vars` to override some parts of the theme.

## Autothemer

Autothemer derives a color palette from `primary`, including colors for
warnings and errors. Explicit colors from the skin or `chulapa-skin.vars`
take precedence over its defaults.

You can combine autothemer with a skin. Its SCSS variables use `!default`,
so values already defined by the skin or `vars` remain in effect.

To enable autothemer:

```yaml
chulapa-skin:
  autothemer  :  true #omit to disable this option

```

## Variables

<span class="chulapa">Chulapa</span> allows you to adjust any visual feature of your `main.css` via the `_config.yml` file. Given that <span class="chulapa">Chulapa</span> has been developed as an implementation of Bootstrap, it is **strongly recommended** to see its [theming documentation](https://getbootstrap.com/docs/4.5/getting-started/theming/#variable-defaults).

In short, you can override Bootstrap variables via `_config`. Here's an example
on how to translate SASS/SCSS theming to your site. On this example the body
background, color and the font are modified:

On SASS/SCSS:

```scss
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

$body-bg: #000;
$body-color: #111;
$font-family-base: Montserrat;

```

On your `_config.yml` use this:

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

**Heads up**: Enclosing your `vars` into `" "` or `' '` is recommended,
especially for values with `#` (colors), booleans (`true,false`) or lists
(`Lato, serif`). YAML, Liquid and SCSS are playing together on this process.
{: .alert .alert-info .p-3 .mx-2 mb-3}

On top of the default [Bootstrap variables](https://github.com/dieghernan/chulapa/blob/main/_sass/bootstrap/_variables.scss) (500+!) this theme has specific variables that make the customization of specific components easier. See the `vars` dictionary [here]({{ "./docs/variable-dictionary" | absolute_url }}).

The critical variable for `autothemer` is `primary`, so you can create a full
theme just playing with those two options. By default, `primary` is set to
Bootstrap default primary color (<span style="color:#007bff;">#007bff</span> in
v4.x).
{: .alert .alert-info .p-3 .mx-2 mb-3}

<h2 id="tool"><span class="chulapa">Chulapa</span> theming tool</h2>

An online sandbox is available for previewing theme changes. The drawback is
that you have to work with SASS/SCSS and translate it to your `_config.yml`, but
as explained before, the conversion is not complicated.

<div class="text-center my-4">
  <a class="btn btn-lg btn-primary mx-1" href="https://www.codeply.com/p/qhEml875ge" role="button">Go to the Codeply sandbox</a>
</div>

There are two pages on that **ply** (**HTML** window), one named **INDEX** and
the **CLASSICNAVBARDEMO**, so both navbars styles can be previewed.

### Step-by-step example

Let's say we want to implement the [Sunset theme](https://themesguide.github.io/top-hat/dist/sunset/) by TopHat on our site. Having a look to the `theme.scss`, it looks like this:

```scss
/*! Tophat `Sunset` Bootstrap 4.3.1 theme */
@import url(https://fonts.googleapis.com/css?family=Voltaire:200,300,400,700);
$headings-font-family:Voltaire;

# $enable-grid-classes:false; DONT PASTE THIS LINE ON THE PLY!!
$primary: #2F414A;
$secondary: #F47B53;
$success: #420084;
$danger: #f2460d;
$info: #7ebcfa;
$warning: #ff9933;
$light: #eef0f2;
$dark: #000633;
# @import "bootstrap"; DONT PASTE THIS LINE ON THE PLY!!

// Add SASS theme customizations here..

```

#### 1. On the tool

1. Open the **ply** and copy that code on top of the **CSS** window.
2. Save the changes and run the **ply**. You would have a preview of the most
   relevant Markdown and Bootstrap components.
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

The skin is already implemented on your theme. Please remember to remove `$` and
`;`, enclose hex colors in `" "` and leave a blank space after `:`.

**Alternatively**, save your SCSS variables in `_sass/skins/THEMENAME.scss`, then set `skin: THEMENAME` inside `chulapa-skin` in `_config.yml`. Use `!default` for customizable skin variables. Autothemer fills undefined colors; omit a color from your skin if you want autothemer to derive it. Do not add a Bootstrap import: the theme imports Bootstrap after loading the skin. See the [Sunset skin source](https://github.com/dieghernan/chulapa/blob/main/_sass/skins/sunset.scss). To contribute a skin, open a pull request.
{: .alert .alert-info .p-3 .mx-2 mb-2}

### Using autothemer on Codeply

Autothemer is already installed in the **ply**. To activate it,
uncomment the lines between `/* Start autothemer */` and `/* End autothemer */`
on the **CSS** window.

## Themestr.app

Themestr.app was a tool for generating Bootstrap themes. Its original site
currently has an expired TLS certificate. Use the
[Codeply sandbox](https://www.codeply.com/p/qhEml875ge) to preview SCSS changes
and translate them into `_config.yml` variables as described above.

**Ignore the** `@import "bootstrap";` **and** `$enable-grid-classes:false;`
**lines!** Those lines cause an error when deploying this theme.
{: .alert .alert-warning .p-3 .mx-2 mb-3}
