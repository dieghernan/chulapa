---
title: Frequently asked questions
subtitle: Some additional information you may find useful
excerpt: Advice and FAQs
show_toc: true
h_max: 3
redirect_from:
  - /docs/05-tips-n-tricks
series:
  - id: maintenance
    order: 5
---

For a new site, start with [the publishing tutorial](./00-start).

## Editing and publishing

### How do I switch from another Jekyll theme?

Use the [migration field mappings and checklist](./07-migration).

### How do I change my site's name or author?

Follow [Change your site's name and author](./14-site-details).

### How do I add a new article or page?

Create a [dated post](./15-create-post) or a [standalone page](./16-create-page).

### Why can I not see my changes?

Check [the publishing run](./42-unpublished-changes) or fix a [YAML error](./43-yaml-errors).

### Why is my photograph missing?

Check uploads, filenames and paths in [Add an image](./17-add-image).

### How do I change the colors or design?

Use [Choose a skin](./22-choose-skin) for a complete design,
[Change a color](./23-change-color) for one adjustment, or
[Change the fonts](./24-change-fonts) for typography. Existing overrides are
explained in [How skins and overrides interact](./26-appearance-precedence).

## How do I...

### ...start with Markdown?

Try the [Markdown cheatsheet](./markdown-cheatsheet) or [create a post](./15-create-post).

### ...add custom HTML, analytics, CSS or JavaScript to every page?

Follow [Add custom HTML to the page head](./44-custom-head) for an editing
procedure. Look up the three HTML hooks, custom CSS file and insertion order in
[Custom hooks reference](./45-custom-hooks). Built-in
[GoatCounter](./18-goatcounter) and [Google Analytics](./19-google-analytics) have
separate setup guides; adding their scripts a second time can duplicate counts.

### ...add favicons?

Follow [Add a favicon](./52-add-favicon).

### ...add an alert box?

Follow [Add an information or warning box](./49-add-alert).

### ...add a caption?

Follow [Add a caption below an image](./50-add-caption).

### ...add a footnote?

Follow [Add a footnote to an article](./51-add-footnote).

<h3 id="chulapa-font">...use <span class="chulapa">Chulapa</span> font on my theme?</h3>

Follow [Use the bundled font](./53-chulapa-font) for heading configuration,
ligatures and the `chulapa` class on selected text. Other families are covered by
[Change the fonts](./24-change-fonts).

### ...add a Font Awesome icon in Markdown?

Follow [Add a Font Awesome icon](./54-add-icon) for an article example,
accessible text and missing-icon checks. Version and kit fields remain in the
[Font Awesome reference](./02-config#font-awesome).

### ...have a quick preview of a page of my site with any skin?

The [skin previews](../skins) compare designs on this documentation site.
They do not save a design to your site; [Choose a skin](./22-choose-skin) covers
applying one to your own pages.

### ...find an error in my `_config.yml` file?

Follow [Fix a YAML configuration error](./43-yaml-errors).

### ...know which version of the theme I am using?

Follow [Check which theme version your site uses](./55-check-theme-version).

### ...use jekyll-feed instead of <span class="chulapa">Chulapa</span>'s feeds?

Use [Publish posts in the built-in feeds](./56-publish-feeds) for article
selection and subscription links. To preserve an existing plugin feed, follow
[Keep a jekyll-feed subscription address](./57-jekyll-feed); keep its output
separate from the theme's `/atom.xml` and `/rss.xml`.
