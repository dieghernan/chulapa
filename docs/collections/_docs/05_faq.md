---
title: Frequently asked questions
subtitle: Some additional information you may find useful
excerpt: Advice and FAQs
show_toc: true
h_max: 3
redirect_from:
  - /docs/05-tips-n-tricks
---

These answers and examples cover common tasks when using
<span class="chulapa">Chulapa</span>.

## How do I...

### ...know which version of the theme I am using?

For a remote theme, check `remote_theme` in `_config.yml`. A suffix such as
`@v2.0.1` pins a release; an unpinned value uses the repository default branch
and does not identify a fixed version. For a gem-based theme, check the
`chulapa-jekyll` version in `Gemfile.lock`.

For pages using the theme's head include, view the HTML source and look for
this comment near the beginning:

```html

<!-- Chulapa Jekyll Theme - VERSION NUMBER HERE -->

```

**The HTML comment is a theme version marker.** It does not identify the exact
commit of an unpinned remote theme or any local overrides. Use a pinned tag or
`Gemfile.lock` to identify the selected release.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

### ...start with Markdown?

[We've got you covered](./markdown-cheatsheet).

See the [Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/) and
[kramdown reference](https://kramdown.gettalong.org/quickref.html). The sample
configuration uses kramdown with its GFM parser; accepted syntax depends on
your Markdown configuration.

Create a file with a `.md` extension and YAML front matter so Jekyll processes
it. Set a layout in its front matter or through `_config.yml` defaults.

### ...add custom HTML, analytics, CSS or JavaScript to every page?

<span class="chulapa">Chulapa</span> provides three HTML includes for adding your own snippets. Create or
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
<span class="chulapa">Chulapa</span>'s layouts, including `minimal` and `search`. You do not need to copy or
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
Keep its empty YAML front matter so Jekyll compiles it into `custom.css`.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

### ...add favicons?

#### A. Domain-root icon

Place `favicon.ico` at your domain root for browsers that request it
automatically. For a GitHub Pages project site under a path such as
`/repository`, add an explicit icon link using the method below.

#### B. Explicit icon links

1. Go to [https://realfavicongenerator.net/](https://realfavicongenerator.net/) and follow the instructions.
2. Configure the generated icon URLs to match their final location, including
   `baseurl` for a project site.
3. In your repo, copy the HTML code into `_includes/custom/custom_head.html`.
4. Also, download the icon package and host it on your repo on
   `./assets/favicon/`.
5. Build the site and check that the generated icon URLs resolve.

### ...add an alert box?

**Short answer: [Bootstrap](https://getbootstrap.com/docs/4.5/components/alerts/) + [kramdown](https://kramdown.gettalong.org/quickref.html#block-attributes)**. This theme uses [kramdown](https://kramdown.gettalong.org/quickref.html) to parse your Markdown files, meaning that you would get all the benefits of Markdown plus some additional interesting options.

Coming back to the question, you can use this approach:

```
A simple info alert **check it out!**
{: .alert .alert-info .p-3 .mx-2 .mb-3}
```

A simple info alert **check it out!**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

You can use `html` but it will take a little more code:

```
<p class="alert alert-info p-3 mx-2 mb-3">
A simple info alert with html <strong>check it out!</strong>
</p>
```

<p class="alert alert-info p-3 mx-2 mb-3">
A simple info alert with html <strong>check it out!</strong>
</p>

### ...add a caption?

Add a paragraph with the `caption` class after the image:

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

You can use <span class="chulapa">Chulapa</span> as a font just as you would do
for any other font, since it is already installed. On your `_config.yml`:
```
chulapa-skin:
  vars  :
    headings-font-family: "chulapa, sans-serif"
```

This enables the font for headings. Without discretionary ligatures, the
text appears as <span class="lead font-weight-bold" style="font-family: chulapa,sans-serif">Chulapa</span>.

To enable its distinctive ligatures, add these rules to
`assets/css/custom.scss`:

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

The documentation uses the `chulapa` CSS class to apply the font and its
ligatures. For an inline name, use
`<span class="chulapa">Chulapa</span>`. Apply the class to a paragraph to style
its entire text:

```html
Cool! I would like to use it. I love Madrid indeed! There is nothing quite like a relaxing cup of café con leche in Plaza Mayor or a romantic dinner in El Madrid de los Austrias, the oldest part of Madrid.
{: .chulapa}
```

Cool! I would like to use it. I love Madrid indeed! There is nothing quite like
a relaxing cup of café con leche in Plaza Mayor or a romantic dinner in El
Madrid de los Austrias, the oldest part of Madrid.
{: .chulapa}

### ...add a Font Awesome icon in Markdown?

```
<i class="fas fa-exclamation-circle"></i> You just insert the html code

```

<i class="fas fa-exclamation-circle"></i> You just insert the html code

### ...have a quick preview of a page of my site with any skin?

1. On Google Chrome, go to your desired page.
2. Right-click and select *Inspect*.
3. On the Panel, go to the *Elements* window and locate the `<head>` tag.
4. Click on *Edit as HTML*, and just before `</head>`, paste this:

```html
  <link rel="stylesheet" href="https://dieghernan.github.io/chulapa/assets/css/skins/[NAME OF SKIN].css">
```

Replace `[NAME OF SKIN]` with an available preview stylesheet name. This is a
temporary browser preview and is lost on reload; it does not update your site
configuration. To apply a skin permanently, set `chulapa-skin.skin` and rebuild.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

### ...find an error in my `_config.yml` file?

Use [YAML Lint](http://www.yamllint.com/) to check YAML syntax, or inspect the
error reported by `bundle exec jekyll build`.

**Valid YAML does not guarantee valid theme settings.** A syntax checker cannot
verify option names, provider IDs or whether a selected skin exists. Compare
those settings with [Global settings](./02-config) and the build output.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

### ...use jekyll-feed instead of <span class="chulapa">Chulapa</span>'s feeds?

<span class="chulapa">Chulapa</span> generates `/atom.xml` and `/rss.xml`. A document appears in these feeds
only when `include_on_feed: true` and a date are set. To include all posts, add
this default to your `_config.yml`, preserving your other defaults:

```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      include_on_feed: true
```

If you prefer `jekyll-feed`, its default `/feed.xml` can coexist with <span class="chulapa">Chulapa</span>'s
feeds. Changing its path to `/atom.xml` without removing <span class="chulapa">Chulapa</span>'s Atom feed
creates two pages with the same output path.

For sites built locally or with a custom build workflow, you can replace
<span class="chulapa">Chulapa</span>'s Atom feed while keeping its RSS feed. Create
`_plugins/disable_chulapa_atom_feed.rb` in your site with this content:

```ruby
Jekyll::Hooks.register :site, :post_read do |site|
  site.pages.reject! do |page|
    page.relative_path.sub(%r{\A/}, "") == "assets/atom.xml"
  end
end
```

This hook removes <span class="chulapa">Chulapa</span>'s Atom page before plugins generate their output.
Keep `jekyll-feed` in your Gemfile and plugins list, and configure it to
generate the replacement at `/atom.xml` in `_config.yml`:

```yaml
feed:
  path: /atom.xml
```

The theme's page head advertises both `/atom.xml` and `/rss.xml`. This recipe
keeps both URLs available: `jekyll-feed` generates Atom and <span class="chulapa">Chulapa</span> generates
RSS. Keep `include_on_feed: true` for posts that should appear in the RSS feed.
If you remove RSS as well, override `_includes/head.html` in your site to
remove or replace its RSS alternate link, and update RSS links in your navbar
or footer. Adding a link in `custom_head.html` does not remove the original.

Custom plugins are not loaded by GitHub Pages' default safe build; use your own
build workflow for this approach. Adding the theme's feed files to `exclude`
alone does not remove them when they are supplied by a gem or remote theme.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}
