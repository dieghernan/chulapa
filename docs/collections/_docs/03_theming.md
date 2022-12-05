---
title: Theming <span class="chulapa">Chulapa</span>
subtitle: A powerful interface to pimp your site
show_toc: true
h_min: 2
h_max: 5
---

<span class="chulapa">Chulapa</span> has a powerful theming interface, meaning that you could use this template for several sites and the look-and-feel of each one could be completely different. We have already introduced the dual navbar system, but you can customize colors and fonts, and even more characteristics as spacing, border, buttons...

This is not new, the advantage is that you don't need to know how to code, all you need to do is update your `_config` file!

Learn how to do it!

## Load Google Fonts

You can easily load new fonts via [Google Fonts](https://fonts.google.com/) like this:

```yaml
googlefonts:
 - url: https://fonts.googleapis.com/css2?family=Raleway&family=Rubik&display=swap
 - url: #Another url
```

If you use another provider, or you prefer another method, there are two features you may want to explore:
  1. Create a blank file on your repo (or modify) under this path: `_includes/custom/custom_head.html`. The content of this file is injected on the `<head>` of your site. Note that you can include other pieces of code, as favicons or files loaded via cdn.
  2. Create a blank file on your repo (or modify) under this path: `assets/css/custom.css` (or `custom.scss`). You can import your fonts via css there. Note that you can include new css styles or override existing ones there.


**Note that** while this option would load the fonts, you still need to tell the theme to use them via `vars`, please read [this section](https://dieghernan.github.io/chulapa/docs/03-theming#variables) to know how.
{: .alert .alert-warning .p-3 .mx-2 mb-3}


## Code highlighting

Pygments highlighting styles available Have a look to the [Live demo](https://dieghernan.github.io/chulapa/docs/syntax-highlighting) and choose the one you want. **default**



```yaml
chulapa-skin: 
  highlight   : "ZENBURN" #or any other name, default is 'DEFAULT' style
```

## Skins

This theme includes 14+ skins from [Tophat Themes](https://themesguide.github.io/top-hat/dist/), [Bootswatch](https://bootswatch.com/) and others. You can have a look [on this page]({{'./skins' | absolute_url }}). If you want to use in your site:

```yaml
chulapa-skin: 
  skin   : #name of the skin
```

You can use `vars` to override some parts of the theme.

## Autothemer

This is a cool feature to create a full theme based on a single color. Basically it propagates your `primary` color value to all the rest of colors used on your theme. This would produce that the full palette used for warnings, errors, etc. would be based on your theme primary color.

Note that autothemer can be combined also with the skin option, however the approach is non-destructive, meaning that if any specific color (as `warning`) is already specified on the skin or via `vars` it won’t be overridden (variable with `!default`, if you are familiar with SASS/SCSS).

To enable autothemer: 

```yaml
chulapa-skin: 
  autothemer  :  true #omit to disable this option

```

## Variables

<span class="chulapa">Chulapa</span> allows you to adjust any visual feature of your `main.css` via the `_config.yml` file. Given that <span class="chulapa">Chulapa</span> has been developed as a implementation of Bootstrap, it is **strongly recommended** to have a look to its [theming documentation](https://getbootstrap.com/docs/4.5/getting-started/theming/#variable-defaults).

In short, you can override Bootstrap variables via `_config`. Here's an example on how to translate SASS/SCSS theming to your site. On this example the body background, color and the font are modified:

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

`chulapa-skin vars` usually overrides any other value provided by `autothemer` or `theme`, meaning that you can modify any parameter of a skin via this method, i.e, changing the default font or primary color of a specific skin.

**Heads up**: Enclosing your `vars` into `" "` or `' '` is recommended, specially in values with `#` (colors), booleans (`true,false`) or lists (`Lato, serif`). YAML, Liquid and SCSS are playing together on this process.
{: .alert .alert-info .p-3 .mx-2 mb-3}


On top of the default [Bootstrap variables](https://github.com/dieghernan/chulapa/blob/master/_sass/bootstrap/_variables.scss) (500+!) this theme has specific variables that makes the customization of specific components easier. See the `vars` dictionary [here]({{ "./docs/variable-dictionary" | absolute_url }}).

The critical variable for `autothemer` is `primary`, so you can create a full theme just playing with those two options. By default, `primary` is set to Bootstrap default primary color (<span style="color:#007bff;">#007bff</span> in v4.x).
{: .alert .alert-info .p-3 .mx-2 mb-3}


<h2 id="tool"><span class="chulapa">Chulapa</span> theming tool</h2>

It is available an online tool for fast-theming your site. The drawback is that you have to work with SASS/SCSS and translate it to your `_config.yml`, but as explained before, the conversion is not complicated. 

<div class="text-center my-4">
  <a class="btn btn-lg btn-primary mx-1" href="https://www.codeply.com/p/qhEml875ge" role="button">Go to the Codeply sandbox</a>
</div>

There are two pages on that **ply** (**HTML** window), one named **INDEX** and the **CLASSICNAVBARDEMO**, so both navbars styles can be previewed.

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
2. Save the changes and run the **ply**. You would have a preview of the most relevant Markdown and Bootstrap components.
3. Modify until you are happy with your configuration.

<h4 id="step-2">2. On your<code> _config.yml</code></h4>

Translate that code as :

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

The skin is already implemented on your theme. Please remember to remove `$` and `;`, enclose hex colors in `" "` and leave a blank space after `:`.



**Alternatively**, you can save the SCSS code on `_sass/skins/THEMENAME.scss` to create it as a `theme`. Then just call `theme: THEMENAME` on your `_config.yml`. If you have an awesome skin and you want to include it on <span class="chulapa">Chulapa</span> just PR! See [here the code](https://github.com/dieghernan/chulapa/blob/master/_sass/skins/sunset.scss) for Sunset implemented as skin.
{: .alert .alert-info .p-3 .mx-2 mb-2}


### Using Autothemer on Codeply

The Autothemer is already installed in the **ply**, to activate it just uncomment the lines between `/* Start autothemer */` and `/* End autothemer */` on the **CSS** window.

## Themestr.app

[**Theme**str.app](https://themestr.app/) is a fantastic site that allows you to quickly create a Bootstrap theme with a nice and friendly UI. You can create a theme there and pick up the generated  SCSS code. A good practice is to test it before implementing on the <a href="https://www.codeply.com/p/qhEml875ge"><span class="chulapa">Chulapa</span> theming tool</a>.


**Ignore the** `@import "bootstrap";` **and** `$enable-grid-classes:false;` **lines!** Those lines cause an error when deploying this theme.
{: .alert .alert-warning .p-3 .mx-2 mb-3}



