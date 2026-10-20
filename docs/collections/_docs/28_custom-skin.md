---
title: Adapt a Sass skin
subtitle: Preview existing Sass assignments and apply them to your site
tags: [docs, appearance, skins, fonts, code-highlighting]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide when you already work with Sass/SCSS and have an existing Jekyll
site. Work in a branch or save a backup. For a built-in design, use
[Choose a skin](./22-choose-skin); for one value, use [Change a color](./23-change-color).

## Preview the assignments

Use the optional Codeply sandbox to preview assignments before applying them
to your site. It requires working with Sass/SCSS; you can also apply the example
directly and use your existing local Jekyll preview.

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

### Using autothemer on Codeply

Autothemer is already installed in the **ply**. To activate it,
uncomment the lines between `/* Start autothemer */` and `/* End autothemer */`
on the **CSS** window.

**Keep the theme's Bootstrap import and grid enabled.** Do not add another
`@import "bootstrap";` to your skin. Setting `$enable-grid-classes: false`
removes grid classes used by the theme and breaks its layouts.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
Check the translated colors and heading font on your home page and an article,
including menu controls, grids and text contrast on a narrow screen. If you
created a local skin, ensure its filename matches `chulapa-skin.skin` exactly.
The palette-only example does not copy all original skin CSS rules.
For local preview, restart Jekyll after changing `_config.yml`: these settings
are compiled into CSS during the build. If changes are missing, use
[the publishing checks](./42-unpublished-changes).
