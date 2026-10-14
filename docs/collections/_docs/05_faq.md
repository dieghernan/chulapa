---
title: Frequently asked questions
subtitle: Some additional information you may find useful
excerpt: Advice and FAQs
show_toc: true
h_max: 3
redirect_from:
  - /docs/05-tips-n-tricks
---

**Getting started:** use [editing and publishing answers](#editing-and-publishing).
**Advanced reference:** find [custom code](#add-custom-html-analytics-css-or-javascript-to-every-page),
[version checks](#know-which-version-of-the-theme-i-am-using) and
[feed compatibility](#use-jekyll-feed-instead-of-chulapas-feeds).
{: .alert .alert-info .p-3 .mx-2 .mb-3}

These answers and examples cover common tasks when using
<span class="chulapa">Chulapa</span>.

## Editing and publishing

### How do I switch from another Jekyll theme?

Follow the [migration guide and checklist](./07-migration) to adapt your
configuration, layouts and integrations. If the build or design is unexpected,
check the [common migration problems](./07-migration#common-migration-problems).

### How do I change my site's name or author?

Follow [Change your site's name and author](./14-site-details) to edit the existing
settings, match the home-page heading and verify publication. The complete
[field reference](./02-config#a-site-settingsseo) remains available for option lookup.

### How do I add a new article or page?

For an article, create `_posts/YYYY-MM-DD-title.md` with a real date and the
settings block at the top. For a standalone page, use `_pages/` in the starter
and add its address to your menu. Follow the complete examples in
[Create a post](./15-create-post) and [Create a page](./16-create-page).

### Why can I not see my changes?

1. Check that you saved the file with **Commit changes** to your site's
   publishing branch (`main` or `master` in the starter).
2. Open **Actions** and wait for the publishing run to finish. If it failed,
   open the run and check its error before changing other settings.
3. Open the website address shown in **Settings > Pages**, then refresh it.
4. If only a new post is missing, check its `YYYY-MM-DD-title.md` filename and
   date. A future-dated post is not published by the normal Jekyll build.

For local preview, restart Jekyll after changing `_config.yml`.

### Why is my photograph missing?

Check that the file was uploaded and saved, and that its filename matches the
link exactly, including uppercase and lowercase letters. Use the image example
in [Add an image](./17-add-image), which handles repository paths.
After publishing, check the article again rather than the GitHub file preview.

### How do I change the colors or design?

Choose a skin from the previews, then change the existing `chulapa-skin.skin`
entry in `_config.yml`. See [Skins](./22-choose-skin). Changing a preview in
your browser does not save the design to your own website.

## How do I...

The answers below cover formatting, optional integrations and advanced
customization. Skip to the task you need.

### ...start with Markdown?

[We've got you covered](./markdown-cheatsheet).

See the [Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/) and
[kramdown reference](https://kramdown.gettalong.org/quickref.html). The sample
configuration uses kramdown with its GFM parser; accepted syntax depends on
your Markdown configuration.

For a complete file with its settings block and text, see
[Create a post](./15-create-post).

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

For Google Analytics or GoatCounter, use the [built-in analytics settings](./02-config#google-analytics)
instead of adding a second copy of their scripts here. GoatCounter is available
in v2.1.1-dev on `main`, not in v2.1.0. Custom hooks remain useful for other
providers or scripts that the theme does not supply.

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

Copy this into your article to display an information box:

```
A simple info alert **check it out!**
{: .alert .alert-info .p-3 .mx-2 .mb-3}
```

A simple info alert **check it out!**
{: .alert .alert-info .p-3 .mx-2 .mb-3}

Use `alert-warning` instead of `alert-info` for a warning. Keep boxes short
and reserve warnings for something the reader needs to avoid or fix.
See [more alert styles](https://getbootstrap.com/docs/4.5/components/alerts/).

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
text appears as <span class="chulapa lead font-weight-bold" style="font-feature-settings: 'liga', 'dlig' 0;">Chulapa</span>.

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

Open the [skin previews](../skins) to compare designs. To try one on your own
site, change `chulapa-skin.skin` in `_config.yml`, save and publish. Follow
[Choose a design](./00-start#6-choose-a-design).
Changing a preview on this documentation site does not change your own site.

### ...find an error in my `_config.yml` file?

Open the failed publishing run in **Actions** and read its error. Check your
last edit for indentation, missing quotes or duplicate sections. A
[YAML checker](https://www.yamllint.com/) can help find formatting mistakes.
For local preview, run `bundle exec jekyll build` to see the error.

A formatting check cannot verify skin names or provider IDs. Compare those
values with [Global settings](./02-config) before trying again.

### ...know which version of the theme I am using?

For a remote theme, check `remote_theme` in `_config.yml`. A suffix such as
`@v2.1.0` pins a release; an unpinned value uses the repository default branch
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
feeds.

Changing its path to `/atom.xml` without removing <span class="chulapa">Chulapa</span>'s Atom feed
creates two pages with the same output path.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

For most sites, keep the built-in feeds and link to `/atom.xml` or `/rss.xml`
from your footer. If you need `jekyll-feed`, follow its
[setup guide](https://github.com/jekyll/jekyll-feed#installation) and keep its
separate `/feed.xml` address to avoid conflicting with the theme's feeds.
