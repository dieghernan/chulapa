# Chulapa documentation context

Reviewed documentation snapshot, October 8, 2026. Sources are the public documentation
files in docs/collections/_docs and docs/llms.txt. This is a compact selection,
not the complete documentation. Unsupported details must be acknowledged.

## Overview
Source: https://dieghernan.github.io/chulapa/docs
Chulapa is a responsive Jekyll theme for GitHub Pages and other Jekyll hosts.
It supports blogs, portfolios, documentation and project sites. It uses Bootstrap.
Features include search, SEO metadata, navbar layouts, multi-author content,
syntax highlighting, MathJax, galleries and comments.

## Installation
Source: https://dieghernan.github.io/chulapa/docs/01-install
For a new site, create a repository from the chulapa-101 GitHub template, update
_config.yml and replace the sample content. For an existing site, set
remote_theme: dieghernan/chulapa in _config.yml. Remove conflicting theme entries.
Add jekyll-remote-theme and jekyll-include-cache to the Gemfile and the plugins list
in _config.yml, then run bundle install. Remote themes do not install runtime
dependencies automatically; use the dependencies in the theme gemspec for local
or custom builds. An unpinned remote theme follows the default branch. Append
@v2.1.0 to pin that release. GitHub Pages can be deployed with GitHub Actions.
For a gem installation, add gem "chulapa-jekyll" to Gemfile, run bundle and set
theme: chulapa-jekyll in _config.yml. Local files override corresponding theme
files and need manual merging when the theme changes.

## Global settings
Source: https://dieghernan.github.io/chulapa/docs/02-config
Configure site settings in _config.yml and restart Jekyll after changing them.
Set url to the origin, e.g. https://username.github.io, and baseurl to the path
prefix, e.g. /repository, or an empty string for a root site. Explicit values help
canonical links, feeds and images resolve correctly on local and custom builds.
The locale setting controls the HTML language; pages can override it. Site title,
subtitle, description, author, navbar and footer are configurable. Search options
include Algolia, Lunr.js, Fuse.js and Simple-Jekyll-Search. The documentation site
uses Algolia. Public search API keys are distinct from administrative credentials.

## Theming
Source: https://dieghernan.github.io/chulapa/docs/03-theming
Use chulapa-skin.skin in _config.yml to select a built-in skin. Skin names match
the filename without .scss and are case-sensitive on case-sensitive filesystems.
An unknown skin causes the Sass import to fail. There are more than 40 skins.
Set individual overrides under chulapa-skin.vars. Theme variables compile into
CSS during the build; restart Jekyll after configuration changes. Custom CSS goes
in assets/css/custom.scss with empty YAML front matter. Autothemer derives a
palette from primary; explicit skin colors and vars take precedence.
Google Fonts can be loaded with googlefonts URL entries, but loading a font does
not apply it: set font-family-base or headings-font-family under chulapa-skin.vars.
Rouge performs syntax highlighting; chulapa-skin.highlight selects its CSS style.

## Layouts
Source: https://dieghernan.github.io/chulapa/docs/04-layouts
The default layout is for posts, standalone pages and collection documents.
Use layout: default in front matter or configure it through Jekyll defaults.
Optional components are enabled through front matter or defaults. Demos show
rendered examples. Content uses Markdown with YAML front matter.

## Adding videos
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#video-support
Yes, Chulapa supports adding videos to site pages with the Liquid include
snippets/video.html. Supported providers are youtube, vimeo, dailymotion,
google-drive and bilibili. Supply the provider and the video's ID, for example:
{% include snippets/video.html id="YOUR_VIDEO_ID" provider="youtube" %}
You can also embed a local or remote video file using fileurl, for example:
{% include snippets/video.html fileurl="/assets/mp4/sample.mp4" %}
YouTube videos use deferred loading by default: visitors click the preview to
load the player. Use nolazy=true to load the iframe without waiting for a click.
Optional metadata inputs are name, thumbnail_url, upload_date, description and
duration. Supply accurate metadata for each video; the snippet does not infer it.
This feature embeds videos in website content, not uploads inside the chatbot.

## Image galleries and carousels
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#masonry-gallery
For a masonry gallery, use snippets/masonry.html with include_cached. For
internal images, assign image_col: gallery through front matter defaults for the
image directory, then use:
{% include_cached snippets/masonry.html internal="gallery" %}
For external images, assign a comma-separated URL list to a Liquid variable and
pass it as external=that_variable. Optional parameters are index_sort (internal
only, default modified_time), index_sort_asc, index_items (default 100) and random.
random=true shuffles at build time; use the boolean false, not the string "false",
to disable it. Random ordering overrides index_sort.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#bootstrap-carousel
snippets/carousel.html uses the same image sources and ordering options.
interval controls the time between slides in milliseconds (default 5000).
controls and indicators are false by default. Example:
{% include_cached snippets/carousel.html internal="gallery" interval=2000 controls=true indicators=true %}

## Mathematical notation and tables of contents
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
Set mathjax: true in page front matter to load MathJax for mathematical notation.
Set show_toc: true for a table of contents, or show_sidetoc: true for a sliding
sidebar table of contents. h_min and h_max control heading levels, default 2 and 4.
Only headings with IDs appear; kramdown generates IDs for Markdown headings.
Supply IDs yourself for HTML headings. These components are available in the
default layout; minimal does not add author panels or tables of contents.

## More layouts and content navigation
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#landing-page
layout: landingpage has the default layout's options with dedicated background
and text colors: landingpage-chulapa-bg-color and landingpage-chulapa-text-color
under chulapa-skin.vars.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#minimal
layout: minimal renders content directly between the navbar and footer. It is
headerless by default. To add a header, set show_header: true and a supported
header_type: base, post, hero, image or splash. header_img sets its image.
For default and landingpage, header_type: none hides the header.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#archive
layout: archive creates a chronological archive of collection documents.
include_collection accepts names without underscores, such as posts,demo,
without spaces around commas; unset means all collections. Standalone pages
are not included. include_missdates: true includes documents without dates.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#cloud-tags-and-categories
Use layout: cloudtag or cloudcategory for tag and category clouds. Create the
cloud page with its permalink and set cloudtag_url or cloudcategory_url on the
content pages or in defaults. include_collection can restrict the collection.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#index-category
layout: indexcategory displays collection documents as cards. index_sort chooses
a front matter field (default name), index_sort_asc: true makes sorting ascending
and index_items limits the number of items (default 10).
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
show_author: true displays the author; page author metadata can override the
global author. show_date displays date and last_modified_at when supplied.
show_sociallinks enables sharing links. show_categories and show_tags display
badges. show_breadcrumb works with breadcrumb_list entries containing label and
url. show_bottomnavs uses page.previous and page.next when Jekyll supplies them;
it does not generate navigation between arbitrary standalone pages.
show_related displays up to three tag-related collection documents: candidates
need two shared tags in the same collection or three across collections.
show_random selects up to three from this candidate pool at build time.

## Configuring site search
Source: https://dieghernan.github.io/chulapa/docs/02-config#search-engines
Set search.provider to lunr, fusejs, simplesearch, algolia or google. Also create
a page with layout: search and a permalink matching search.landing_page
(default /search). Configuring the provider does not create this page.
For an easy local index, for example, use search: { provider: lunr } in _config.yml.
Lunr, Fuse.js and Simple-Jekyll-Search generate indexes during the build.
include_on_search: false excludes a page from these three indexes. search.maxwords
limits content words per indexed document (default 30). Algolia uses a separately
uploaded index; include_on_search affects ranking, not exclusion, so use
algolia.files_to_exclude to exclude files. Google needs google_cse_id.

## Comments
Source: https://dieghernan.github.io/chulapa/docs/02-config#comments
Set comments.provider and show_comments: true on pages or in defaults.
Integrations are disqus, cusdis, giscus, cactus and welcomments. For giscus,
follow its setup and paste the generated script into _includes/custom/giscus.html;
it uses GitHub Discussions. Disqus requires comments.disqus_shortname, Cactus
comments.cactus_shortname and Welcomments comments.website_id. Cusdis needs
cusdis_app_id and, for self-hosting, cusdis_host; its original hosted service is
unavailable and the upstream project is archived.

## Navbar and footer
Source: https://dieghernan.github.io/chulapa/docs/02-config#navbar
The navbar supports links and one level of child links. Omitting navbar.style
uses the classic navbar; fab selects a floating action button and dual switches
between floating and classic at a breakpoint. navbar.expand accepts sm, md, lg
or xl (default md). navbar.brand has title, img and url. navbar.nav entries use
title and url, or title with a child list of title/url entries.
Source: https://dieghernan.github.io/chulapa/docs/02-config#footer
footer.links entries have label, icon (Font Awesome code) and url (or a plain
email address). footer.copyright accepts custom text or HTML.

## Feeds and SEO controls
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
Set include_on_feed: true as a YAML boolean and provide a date to include content
in the theme's Atom (/atom.xml) and RSS (/rss.xml) feeds. Posts already have dates;
standalone pages and other collections need explicit dates.
robots: "noindex, follow" sets HTML crawler directives. It does not make a page
private, change robots.txt or remove sitemap entries. The default is index, follow.
og_image controls the sharing image, separate from the visible header_img.
schema_image overrides a post's BlogPosting image without changing sharing images.

## Alerts, captions and footnotes
Source: https://dieghernan.github.io/chulapa/docs/05-faq
In Markdown, add {: .alert .alert-info .p-3 .mx-2 .mb-3} on the line after a
paragraph to style it as a Bootstrap information alert with kramdown.
For an image caption, place a paragraph after the image followed by {: .caption}.
For footnotes, reference [^1] in text and define [^1]: Footnote text elsewhere.

## FAQ: Markdown and favicons
Source: https://dieghernan.github.io/chulapa/docs/05-faq
For Markdown help, use the Markdown cheatsheet. Create a .md file with YAML
front matter and choose a layout directly or through defaults. The sample
configuration uses kramdown with its GFM parser; syntax depends on configuration.
Place favicon.ico at the domain root for automatic browser discovery. Project
sites under a baseurl should use explicit icon links. Generate icons with
RealFaviconGenerator, host the downloaded assets in assets/favicon/ and paste
the generated HTML into _includes/custom/custom_head.html. Make icon URLs match
the deployed paths including baseurl, then build and check those URLs.

## FAQ: Chulapa font and Font Awesome icons
Source: https://dieghernan.github.io/chulapa/docs/05-faq#chulapa-font
The chulapa font is already installed. Set headings-font-family:
"chulapa, sans-serif" under chulapa-skin.vars to apply it to headings.
For its distinctive ligatures, add font-feature-settings: "liga", "dlig" and
text-rendering: optimizeLegibility to the heading selectors in custom.scss.
The chulapa CSS class applies the font and ligatures: use
<span class="chulapa">Chulapa</span> for an inline name or {: .chulapa} after a
Markdown paragraph to style that paragraph.
Source: https://dieghernan.github.io/chulapa/docs/05-faq
Insert Font Awesome icons as HTML within Markdown, for example:
<i class="fas fa-exclamation-circle"></i>

## FAQ: Previewing skins and diagnosing YAML
Source: https://dieghernan.github.io/chulapa/docs/05-faq
For a temporary skin preview in Chrome, inspect the page, edit the head element
as HTML and append a stylesheet link to
https://dieghernan.github.io/chulapa/assets/css/skins/[NAME OF SKIN].css
using an available skin filename. This preview disappears on reload and does not
change configuration. Set chulapa-skin.skin and rebuild for a permanent change.
To find _config.yml syntax errors, use a YAML syntax checker such as YAML Lint
or inspect the error from bundle exec jekyll build. Valid YAML does not guarantee
valid theme option names, provider IDs or existing skins; check global settings
and the build output as well.

## FAQ: Including posts in feeds and using jekyll-feed
Source: https://dieghernan.github.io/chulapa/docs/05-faq#use-jekyll-feed-instead-of-chulapas-feeds
To include every post in the theme feeds, add a front matter default with
scope: { path: "", type: posts } and values: { include_on_feed: true }, preserving
the other defaults. A date is also required.
jekyll-feed's default /feed.xml can coexist with Chulapa's /atom.xml and /rss.xml.
Setting feed.path to /atom.xml without removing Chulapa's Atom page creates an
output-path collision. For a local or custom build, a post_read site hook can
remove the page whose relative_path, after stripping its leading slash, is
assets/atom.xml. The FAQ provides the full Ruby hook. Keep jekyll-feed in the
Gemfile and plugins list and set feed.path: /atom.xml to produce the replacement.
This keeps Chulapa's RSS feed; include_on_feed still controls RSS inclusion.
Custom plugins do not run in GitHub Pages' default safe build; use your own build
workflow. Excluding the theme feed files alone does not remove feeds supplied by
a gem or remote theme. The theme head advertises Atom and RSS. If RSS is removed,
override _includes/head.html to update its alternate link and update navbar or
footer links; adding a custom_head.html link does not remove the existing link.

## Custom code and version checks
Source: https://dieghernan.github.io/chulapa/docs/05-faq
For a remote theme, check remote_theme in _config.yml: a suffix pins a release.
For a gem theme, check chulapa-jekyll in Gemfile.lock. The HTML source includes
a theme version marker, but it does not identify local overrides or the exact
commit of an unpinned remote theme.
Custom includes allow HTML, scripts and styles without copying layouts:
_includes/custom/custom_head_before_css.html is before the theme stylesheet;
_includes/custom/custom_head.html is at the end of head;
_includes/custom/custom_bottomscripts.html is at the end of body.
Site files override these includes for both remote and gem themes. Keep other
existing snippets when adding new ones. Pages using minimal and search also
include these hooks. Custom CSS belongs in assets/css/custom.scss with empty
YAML front matter so Jekyll compiles it to custom.css.

## Variables dictionary
Source: https://dieghernan.github.io/chulapa/docs/variable-dictionary
These are Sass variables configured under chulapa-skin.vars in _config.yml,
not page front matter options. Omit the SCSS $ prefix and trailing semicolon;
restart Jekyll after changing them. Example:
```yaml
chulapa-skin:
  vars:
    primary: "#285d70"
    navbar-chulapa-bg-color: "#182c38"
    footer-chulapa-link-color: "#a8dae8"
```
Navbar colors: navbar-chulapa-bg-color (background), navbar-chulapa-text-color
(text), navbar-chulapa-hover-color (hover), navbar-chulapa-active-color (active),
navbar-chulapa-disabled-color (disabled), navbar-chulapa-brand-color (brand),
navbar-chulapa-brand-hover-color (brand hover), navbar-chulapa-toggler-color
(hamburger icon), navbar-chulapa-toggler-color-bg (icon background), and
navbar-chulapa-toggler-border-color (toggler border).
Footer colors: footer-chulapa-bg-color (background), footer-chulapa-text-color
(text), footer-chulapa-link-color (links), footer-chulapa-hover-color (hover),
footer-chulapa-icon-color and footer-chulapa-icon-hover-color (social icons).
Hero and landing headers: hero-chulapa-bg-color, hero-chulapa-text-color,
landingpage-chulapa-bg-color and landingpage-chulapa-text-color.
Other variables: blockquote-chulapa-bg-color and blockquote-chulapa-text-color;
footnote-chulapa-text-color for footnotes/captions; pre-chulapa-bg-color for code
blocks (the highlight style can override it); thead-chulapa-bg-color and
thead-chulapa-text-color for table headings; pagination-chulapa-text-color,
pagination-chulapa-text-hover-color and pagination-chulapa-bg-hover-color;
indexcards-chulapa-border-color for indexcategory cards.
Selected Bootstrap overrides: primary, secondary, success, info, warning,
danger, light, dark; body-bg, body-color, link-color; font-family-base,
headings-font-family, font-size-base, headings-color; carousel-control-color
and carousel-indicator-active-bg. enable-rounded: false disables Bootstrap
rounding; enable-responsive-font-sizes: true enables responsive font sizes.
The dictionary is a selection, not a complete list of supported Sass variables.

## Markdown formatting
Source: https://dieghernan.github.io/chulapa/docs/markdown-cheatsheet
Use **bold**, _italic_ and ~~strikethrough~~. Separate paragraphs with a blank
line; headings use # through ######. Links use [label](URL), images use
![alt text](URL), and blockquotes start with >. Lists use - for bullets or
1. for numbered items. Inline code uses backticks; fenced code blocks use
three backticks with a language identifier such as js, ruby, html or yaml.
Use a pipe table with a heading separator row; colons in the separator control
column alignment. The sample site uses kramdown with the GFM parser; some
kramdown extensions require kramdown.input: Kramdown instead of GFM. Check
generated output when changing parsers. For alerts, captions and footnotes,
use the FAQ examples in this context.

## Syntax highlighting styles
Source: https://dieghernan.github.io/chulapa/docs/syntax-highlighting
The demo previews shipped highlighting styles in the browser. To make a choice
permanent, copy its name into chulapa-skin.highlight in _config.yml and restart
Jekyll. This changes code colors, not the site's skin or the code-block language.
Examples of shipped style names: github, github.dark, dracula, monokai,
solarized.dark, solarized.light, nord, one.dark and zenburn. Example:
```yaml
chulapa-skin:
  highlight: github.dark
```
For code syntax, use a fenced Markdown code block with its language identifier.
The preview alone does not save configuration. The highlight style can override
pre-chulapa-bg-color.

## Development branch change
Source: https://dieghernan.github.io/chulapa/docs/05-faq#know-which-version-of-the-theme-i-am-using
As of October 8, 2026, v2.1.1-dev work merged into the default branch moves the
TOC sidebar button upward below 992 px, reserving a 56 px button and a spacer
underneath. It is available to sites using the updated default branch, including
these docs, but is not included in the pinned v2.1.0 release or gem. Do not
describe it as behavior in v2.1.0; sites must rebuild to receive updated CSS.

## Public RSS feed
Source: https://dieghernan.github.io/chulapa/rss.xml
Use this link when a visitor asks where to subscribe to Chulapa's RSS feed.
The feed's contents are not included in this context. The assistant does not
fetch URLs, so do not claim to have read its entries or know its latest posts.
