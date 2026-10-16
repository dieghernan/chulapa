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

Questions below link to task guides and syntax references.
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

Use [Create and publish a post](./15-create-post) for a dated article, or
[Create a page and link it from the menu](./16-create-page) for standalone
content such as About or Contact. Each guide includes a complete file and
published-result checks.

### Why can I not see my changes?

Follow [Find changes missing from your website](./42-unpublished-changes) to
check the saved commit, publishing run, website address and post date. For a
configuration parse error, use [Fix a YAML configuration error](./43-yaml-errors).

### Why is my photograph missing?

The [image guide](./17-add-image#publish-and-check) covers missing uploads,
filename capitalization and repository paths. If the whole article is stale,
use [the publishing checks](./42-unpublished-changes).

### How do I change the colors or design?

Use [Choose a skin](./22-choose-skin) for a complete design,
[Change a color](./23-change-color) for one adjustment, or
[Change the fonts](./24-change-fonts) for typography. Existing overrides are
explained in [How skins and overrides interact](./26-appearance-precedence).

## How do I...

The answers below cover formatting, optional integrations and advanced
customization. Skip to the task you need.

### ...start with Markdown?

The [theme Markdown cheatsheet](./markdown-cheatsheet) shows syntax and output.
The external [Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/) and
[kramdown reference](https://kramdown.gettalong.org/quickref.html) cover more syntax. The sample
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

Follow [Add a favicon](./52-add-favicon) to upload the package, preserve existing
head snippets and verify the generated addresses with `baseurl`.

### ...add an alert box?

Follow [Add an information or warning box](./49-add-alert) for the attribute
placement, spacing and published-result checks.

### ...add a caption?

Follow [Add a caption below an image](./50-add-caption). Keep descriptive
alternative text as well as the visible caption.

### ...add a footnote?

Follow [Add a footnote to an article](./51-add-footnote) for a matching reference
and definition and a live output example.

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

Follow [Fix a YAML configuration error](./43-yaml-errors). It covers locating
the failing edit, checking indentation/quotes/duplicate sections and rebuilding.
Valid YAML alone does not establish valid skin names, provider IDs or field locations.

### ...know which version of the theme I am using?

Follow [Check which theme version your site uses](./55-check-theme-version)
to inspect the remote-theme selection, resolved gem and published HTML marker.
The marker does not identify an exact unpinned commit or local overrides.

### ...use jekyll-feed instead of <span class="chulapa">Chulapa</span>'s feeds?

Use [Publish posts in the built-in feeds](./56-publish-feeds) for article
selection and subscription links. To preserve an existing plugin feed, follow
[Keep a jekyll-feed subscription address](./57-jekyll-feed); keep its output
separate from the theme's `/atom.xml` and `/rss.xml`.
