---
title: Frequently Asked Questions
subtitle: Some additional information you may find useful
excerpt: Advices and FAQs
show_toc: true
h_max: 3
redirect_from:
  - /docs/05-tips-n-tricks
---

Additionally, there are some tips when using <span class="chulapa">Chulapa</span>, as well as code samples.

## How do I...

### ...know which version of the theme I am using?

If you are on `remote_theme` method, go to your `_config` file and have a look there. 

You can also check the version on any page of your site, just watch the source code and look for this tag on top of your page:

```html

<!-- Chulapa Jekyll Theme - VERSION NUMBER HERE -->

```


### ...start with Markdown?

[We've got you covered](./markdown-cheatsheet).

You may want to have a look to this [cheatsheet](https://www.markdownguide.org/cheat-sheet/) and the [kramdown](https://kramdown.gettalong.org/quickref.html) reference, that is the default rendered on [Jekyll](https://jekyllrb.com/docs/configuration/markdown/).

Just create a file with `.md` extension and you are good to go!


### ...add custom HTML, analytics, CSS or JavaScript to every page?

Chulapa provides three HTML includes for adding your own snippets. Create or
edit these files relative to the root of your site, keeping the leading
underscore in `_includes`:

- `_includes/custom/custom_head_before_css.html`: Insert HTML inside `<head>`,
  before the theme's CSS stylesheet.
- `_includes/custom/custom_head.html`: Insert HTML at the end of `<head>`,
  after the theme's CSS stylesheet. Use this for analytics scripts, additional
  stylesheets or favicons.
- `_includes/custom/custom_bottomscripts.html`: Insert HTML at the end of
  `<body>`, after the theme's JavaScript dependencies.

Your site's files override the matching theme includes, including when using
`remote_theme` or the gem-based theme. These snippets appear on pages using
Chulapa's layouts, including `minimal` and `search`. You do not need to copy or
modify the layouts.

For example, if your analytics provider asks you to load a script in `<head>`,
add its snippet to `_includes/custom/custom_head.html`:

```html
<!-- Replace this example with the snippet from your analytics provider. -->
<script defer src="https://analytics.example.com/script.js"
        data-site-id="YOUR_SITE_ID"></script>
```

Follow your provider's instructions when choosing the include and configuring
the script. If the snippet belongs at the end of `<body>`, use
`_includes/custom/custom_bottomscripts.html` instead.

To add CSS rules or override existing ones, use `assets/css/custom.scss`.

### ...add favicons?

#### A. The easy way

Just host your `favicon.ico` on the root of your directory.

#### B. The pro way

1. Go to [https://realfavicongenerator.net/](https://realfavicongenerator.net/) and follow the instructions. 
2. When you are finished, on the **Favicon Generator Options** choose a custom path, as `https://myurl/assets/favicon/`.
3. In your repo, copy the HTML code into `_includes/custom/custom_head.html`.
4. Also, download the icon package and host it on your repo on `./assets/favicon/`.
5. Commit, relax and enjoy!

### ...add a alert box?

**Short answer: [Bootstrap](https://getbootstrap.com/docs/4.5/components/alerts/) + [kramdown](https://kramdown.gettalong.org/quickref.html#block-attributes)**. This theme uses [kramdown](https://kramdown.gettalong.org/quickref.html) to parse your Markdown files, meaning that you would get all the benefits of Markdown plus some additional interesting options.

Coming back to the question, you can use this approach:

```
A simple info alert **check it out!**
{: .alert .alert-info .p-3 .mx-2 .mb-3}
```

A simple info alert **check it out!**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

You can use `html` but it will take a little bit more of coding:

```
<p class="alert alert-info p-3 mx-2 mb-3">
A simple info alert with html <strong>check it out!</strong>
</p>
```

<p class="alert alert-info p-3 mx-2 mb-3">
A simple info alert with html <strong>check it out!</strong>
</p>

### ...add a caption?

You can do it by using `html`, but in case you want to stick with Markdown/kramdown:

```

![example image](https://images.unsplash.com/photo-1532184312173-028645e16ba8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60)

This is a caption
{: .caption}
```

![example image](https://images.unsplash.com/photo-1532184312173-028645e16ba8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60)

This is a caption
{: .caption}

### ...add a footnote?

**Markdown/kramdown**

```
Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.
```

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote.


<h3 id="chulapa-font">...use <span class="chulapa">Chulapa</span> font on my theme?</h3>

You can use <span class="chulapa">Chulapa</span> as a font just as you would do for any other font, since it is already installed. On your `_config`:
```
chulapa-skin: 
  vars  :
    $headings-font-family: chulapa,sans-serif;
```

This would enable it for headings, however they would be displayed as <span class="lead font-weight-bold" style="font-family: chulapa,sans-serif">Chulapa</span>.

You would need also to enable ligatures if you wish to have its unique look. Go to your `./assets/css/custom.scss` file and add:

```scss
h1,h2,h3,h4,h5,h6 {
    -webkit-font-feature-settings: "liga", "dlig";
    -moz-font-feature-settings: "liga=1, dlig=1";
    -moz-font-feature-settings: "liga", "dlig";
    -ms-font-feature-settings: "liga", "dlig";
    -o-font-feature-settings: "liga", "dlig";
    font-feature-settings: "liga", "dlig";
    text-rendering: optimizeLegibility;
}
```

Then your headings would display as <span class="chulapa lead">Chulapa</span>!

As you would notice, on the docs the font is used on the word <span class="chulapa">Chulapa</span>. There is a special `css` class named `chulapa` on this theme that enables that behaviour:

```html
Cool! I would like to use it. I love Madrid indeed! There is nothing quite like a relaxing cup of café con leche in Plaza Mayor or a romantic dinner in El Madrid de los Austrias, the oldest part of Madrid.
{: .chulapa}
```

Cool! I would like to use it. I love Madrid indeed! There is nothing quite like a relaxing cup of café con leche in Plaza Mayor or a romantic dinner in El Madrid de los Austrias, the oldest part of Madrid.
{: .chulapa}

### ...add a Fontawesome icon on Markdown?

```
<i class="fas fa-exclamation-circle"></i> You just insert the html code

```

<i class="fas fa-exclamation-circle"></i> You just insert the html code

### ...have a quick preview of a page of my site with any skin?

1. On Google Chrome, go to your desired page.
2. Right click and *Inspect*
3. On the Panel, go to the *Elements* window and locate the `<head>` tag.
4. Click on *Edit as HTML*, and just before `</head>`, paste this:

```html
  <link rel="stylesheet" href="https://dieghernan.github.io/chulapa/assets/css/skins/[NAME OF SKIN].css">
```

Congratulations! You would have a quick preview of that page as it would be under the [NAME OF SKIN] desired.

### ...find an error on my _config file?

[http://www.yamllint.com/](http://www.yamllint.com/)
