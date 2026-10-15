---
title: Frequently asked questions
subtitle: Some additional information you may find useful
excerpt: Advice and FAQs
show_toc: true
h_max: 3
redirect_from:
  - /docs/05-tips-n-tricks
---

Choose a question below for the relevant task or lookup page. For a first site,
use [the publishing tutorial](./00-start); for advanced integration lookup, use
[custom hooks](./45-custom-hooks), [version checks](#know-which-version-of-the-theme-i-am-using)
or [feed compatibility](#use-jekyll-feed-instead-of-chulapas-feeds).

Questions below link to task guides or retain examples still awaiting separation.
This FAQ is not a complete configuration reference.

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

Follow [Find changes missing from your website](./42-unpublished-changes) to
check the saved commit, publishing run, website address and post date. For a
configuration parse error, use [Fix a YAML configuration error](./43-yaml-errors).

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

Follow [Add custom HTML to the page head](./44-custom-head) for an editing
procedure. Look up the three HTML hooks, custom CSS file and insertion order in
[Custom hooks reference](./45-custom-hooks). Built-in
[GoatCounter](./18-goatcounter) and [Google Analytics](./19-google-analytics) have
separate setup guides; adding their scripts a second time can duplicate counts.

### ...add favicons?

#### A. Domain-root icon

See [Add a favicon](./52-add-favicon) for domain-root discovery and why project
sites need an explicit icon link.

#### B. Explicit icon links

Follow [Add a favicon](./52-add-favicon) to upload the package, preserve existing
head snippets and verify the generated addresses with `baseurl`.

### ...add an alert box?

Follow [Add an information or warning box](./49-add-alert) for the attribute
placement, spacing and published-result checks.

### ...add a caption?

Follow [Add a caption below an image](./50-add-caption). Keep descriptive
alternative text as well as the visible caption.

### ...add a footnote?

<span id="fnref:1"></span><span id="fn:1"></span>

Follow [Add a footnote to an article](./51-add-footnote) for a matching reference
and definition and a live output example.

<h3 id="chulapa-font">...use <span class="chulapa">Chulapa</span> font on my theme?</h3>

Follow [Use the bundled font](./53-chulapa-font) for heading configuration,
ligatures and the `chulapa` class on selected text. Other families are covered by
[Change the fonts](./24-change-fonts).

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

Follow [Fix a YAML configuration error](./43-yaml-errors). It covers locating
the failing edit, checking indentation/quotes/duplicate sections and rebuilding.
Valid YAML alone does not establish valid skin names, provider IDs or field locations.

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
