# Chulapa documentation context

Reviewed documentation snapshot, October 13, 2026. Sources are the public documentation
files in docs/collections/_docs and docs/llms.txt. This is a compact selection,
not the complete documentation. Unsupported details must be acknowledged.

## Overview
Source: https://dieghernan.github.io/chulapa/docs
Chulapa is a responsive Jekyll theme for GitHub Pages and other Jekyll hosts.
It supports blogs, portfolios, documentation and project sites. It uses Bootstrap.
Features include search, SEO metadata, navbar layouts, multi-author content,
syntax highlighting, MathJax, galleries and comments.

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
navbar-chulapa-hover-bg-color (link background on hover),
navbar-chulapa-disabled-color (disabled), navbar-chulapa-brand-color (brand),
navbar-chulapa-brand-hover-color (brand hover), navbar-chulapa-toggler-color
(default hamburger stroke), navbar-chulapa-toggler-color-bg (toggle button
background), navbar-chulapa-toggler-icon-bg (toggle button background image as
a Sass url(...) expression, replacing the default icon) and
navbar-chulapa-toggler-border-color (toggle button border).
Footer colors: footer-chulapa-bg-color (background), footer-chulapa-text-color
(text), footer-chulapa-link-color (links), footer-chulapa-hover-color (link hover),
footer-chulapa-icon-color and footer-chulapa-icon-hover-color (social icons).
Hero and landing headers: hero-chulapa-bg-color, hero-chulapa-text-color,
landingpage-chulapa-bg-color and landingpage-chulapa-text-color.
Other variables: blockquote-chulapa-bg-color and blockquote-chulapa-text-color;
footnote-chulapa-text-color for footnotes/captions; pre-chulapa-bg-color for code
blocks (the highlight style can override it); thead-chulapa-bg-color and
thead-chulapa-text-color for table headings; pagination-chulapa-text-color,
pagination-chulapa-text-hover-color and pagination-chulapa-bg-hover-color;
indexcards-chulapa-border-color for indexcategory cards; chulapa-toc-bg for the
table of contents sidebar background.
Unless a skin or vars supplies a value, the navbar background uses primary,
the footer and hero backgrounds use the navbar background and the landing
page background uses the hero background. Many text colors are derived from
these backgrounds. Explicit component colors from a skin or vars keep their
assigned values. vars overrides skin variable assignments; autothemer fills
undefined variables. Changing a palette value such as blue does not necessarily
change a skin's explicitly assigned primary color. Prefer semantic variables
such as primary, danger and body-bg when assigning colors to components.
navbar-chulapa-text-contrast, footer-chulapa-text-contrast, landingpage-card-bg
and cactus-btn-text are calculated helpers, not overridable defaults. The theme
recalculates them; use component variables or custom CSS instead of vars.
Quote hex colors in YAML so # is not treated as a comment. Sizes need Sass units,
for example font-size-base: "1.1rem". Boolean variables use lowercase true/false.
Selected Bootstrap overrides: primary, secondary, success, info, warning,
danger, light, dark; body-bg, body-color, link-color, link-hover-color;
text-muted (also the default index card border color); font-family-base,
headings-font-family, font-family-monospace, font-size-base (default 1rem),
line-height-base (unitless multiplier, default 1.5), headings-color;
border-radius; carousel-control-color
and carousel-indicator-active-bg. enable-rounded: false disables Bootstrap
rounding; enable-responsive-font-sizes: true enables responsive font sizes.
The dictionary is a selection, not a complete list of supported Sass variables.

## Installation
Source: https://dieghernan.github.io/chulapa/docs/01-install
For a new site, use https://github.com/dieghernan/chulapa-101/generate and enable
Settings > Pages > GitHub Actions. The template is a personal blog with three
sample posts, a local credited photograph, About, year/category/tag archives,
Fuse.js search, RSS and the predefined gitdev skin without CSS overrides.
Live preview: https://dieghernan.github.io/chulapa-101/
Edit title, description, author, repository (username/repository) and url
(https://username.github.io) in _config.yml, then commit to main or master.
The existing Pages workflow supplies the base path; no personal token or local
installation is needed. Content is at the site root: index.html, _posts/,
_pages/ and assets/img/. Navigation and footer links stay in _config.yml. Its configuration follows
the full theme sample with sections, comments and unused settings left empty;
collections/defaults are adapted to the blog. Start with site details in section A.
Optional comment-only hooks are included in _includes/custom/:
custom_head_before_css.html, custom_head.html, custom_bottomscripts.html and
giscus.html; assets/css/custom.scss is included with YAML front matter.
They do not change the skin. Custom CSS loads after theme styles; keep the front
matter. Giscus also needs comments.provider: giscus and show_comments: true.
The home page uses jekyll-paginate with five posts per page and must remain
index.html. This is one ordinary site, not a selector for four profiles.
Fuse.js indexes posts and About; home, archives, search and 404 are excluded.
Replace sample text, photo/alt text/credit and the About contact address.
For an existing site, set
remote_theme: dieghernan/chulapa in _config.yml. Remove conflicting theme entries.
Add jekyll-remote-theme and jekyll-include-cache to the Gemfile and the plugins list
in _config.yml, then run bundle install. Remote themes do not install runtime
dependencies automatically; use the dependencies in the theme gemspec for local
or custom builds. An unpinned remote theme follows the default branch. Append
@v2.1.0 to pin that release. GitHub Pages can be deployed with GitHub Actions.
For a gem installation, add gem "chulapa-jekyll" to Gemfile, run bundle and set
theme: chulapa-jekyll in _config.yml. Local files override corresponding theme
files and need manual merging when the theme changes.
Enable jekyll-include-cache in the gem theme's plugins list too, and remove any
remote_theme entry. Update just the gem theme with bundle update chulapa-jekyll.
Preview locally with bundle exec jekyll serve. An unknown include_cached tag
usually means jekyll-include-cache is missing or not enabled; install it and
add it to plugins, then restart the build.

## Migrating an existing Jekyll site
Source: https://dieghernan.github.io/chulapa/docs/07-migration
Use a migration branch/backup, record important URLs, preserve url/baseurl,
permalink and domain settings. Pin remote_theme: dieghernan/chulapa@v2.1.0;
remove old theme/remote_theme conflicts, install and enable jekyll-remote-theme
and jekyll-include-cache. Review local layouts/includes/assets before switching:
corresponding local files override theme files. Review page front matter and
_config.yml defaults; explicit page layouts override defaults. Common post/page
layouts become default with header_type post/base respectively. Other themes'
option names are not automatically translated. Rebuild navbar/footer and check
search page/provider, existing comment threads and analytics duplicates. Keep
jekyll-feed at /feed.xml if needed to preserve subscribers' existing URL; do not
collide with built-in /atom.xml or /rss.xml. The guide has a twelve-point
checklist, concrete GitHub Actions setup steps and six troubleshooting answers.
Adapt author to a mapping (author.name) and select chulapa-skin.skin by its exact
preview name. Keep useful local customizations and adapt them; prefer supported
custom hooks over copied complete layouts. A complete Fuse.js search example
sets search.provider: fusejs and search.landing_page: /search, with a search.md
page using layout: search and permalink: /search. Preserve the old search path
by matching both settings. Development-only Mermaid,
PhotoSwipe and GoatCounter are not in pinned v2.1.0. Preview, publish and verify
old URLs, mobile/keyboard use and metadata.

## Basic editing and publishing
Sources: https://dieghernan.github.io/chulapa/docs/00-start
https://dieghernan.github.io/chulapa/docs/15-create-post
https://dieghernan.github.io/chulapa/docs/16-create-page
https://dieghernan.github.io/chulapa/docs/17-add-image
https://dieghernan.github.io/chulapa/docs/05-faq
On GitHub, open a file in the Code tab, use the pencil button and save with
Commit changes on the publishing branch. Check Actions for publishing progress
and Settings > Pages for the website address. For a new post, use Add file >
Create new file and name it _posts/YYYY-MM-DD-title.md with a real non-future
date. Start with this complete example:
```markdown
---
layout: default
header_type: post
title: "My first post"
show_date: true
---
My story begins here.
```
The layout supplies the main heading; use ## for sections inside the article.
Post URLs follow the site permalink, not the _posts source path. Chulapa 101
and the personal-blog starter list posts on the home page. Other setups need
an index or link. A standalone page can use _pages/contact.md in the starter,
or contact.md at the root of a site without its _pages setup; set layout:
default, header_type: base, title: Contact and permalink: /contact/ between
--- lines. Avoid duplicate output paths and preserve existing settings when
editing a page. Add /contact/ to the existing navbar.nav without baseurl; the
theme adds it. The link does not create the page, and creating a file does not
add it to the menu.
Upload photographs through Add file > Upload files into assets/img/ and save,
then insert a repository-safe Markdown image in the content:
```liquid
![Describe the photograph]({{ '/assets/img/river.jpg' | relative_url }})
```
Replace the filename and alternative text. Match filename case and extension,
and do not manually prepend baseurl. Keep images below the front matter. Commit
both uploads and content edits on the publishing branch and check the published
article on a narrow screen; GitHub source preview is not the final website. If changes
are missing, check the saved branch, Actions errors, the published website
address and post dates before suggesting configuration changes.

## Global settings
Sources: https://dieghernan.github.io/chulapa/docs/02-config
https://dieghernan.github.io/chulapa/docs/14-site-details
Configure site settings in _config.yml and restart Jekyll after changing them.
For a name/author edit, change existing title, description and author.name while
preserving other settings and url/baseurl/repository/permalinks. The Chulapa 101
home-page heading has a separate title in index.html; edit that existing file
without renaming it. Publish and check the browser title and visible heading.
Page-specific authors and custom footer copyright are not rewritten by changing
site author.name. Description metadata is distinct from visible page prose.
The site author mapping accepts name, url, avatar, location and links. Set
author.url to a profile URL or site-relative path such as /about/; relative paths
use the site's url and baseurl. It supplies the default article:author URL for
posts and, from v2.1.1, u-url in visible Microformats2 author cards. A page author
does not inherit the site author's profile URL. Social links use author.links.
Set url to the origin, e.g. https://username.github.io, and baseurl to the path
prefix, e.g. /repository, or an empty string for a root site. Explicit values help
canonical links, feeds and images resolve correctly on local and custom builds.
The locale setting controls the HTML language; pages can override it. Site title,
subtitle, description, author, navbar and footer are configurable. Search options
include Algolia, Lunr.js, Fuse.js and Simple-Jekyll-Search. The documentation site
uses Algolia. Public search API keys are distinct from administrative credentials.

## Publisher, analytics and icon configuration
Source: https://dieghernan.github.io/chulapa/docs/02-config
publisher identifies the JSON-LD publishing entity, independently of article
authors and visible profiles. publisher.type is Organization (default) or Person;
publisher.name and publisher.url identify it. Organization uses publisher.logo;
Person uses publisher.image and ignores logo. Relative URLs respect url/baseurl.
Changing publisher to Person does not change guest article authors or their
visible profiles; configure the article author separately.
Font Awesome defaults to version 6; fa_version: 5 chooses version 5.
fa_kit_code loads a kit instead of the hosted stylesheet. Legacy fa5_kit_code
takes precedence if both are present; remove it when migrating. fa_v4_support:
true enables version-4 compatibility.

## Google Analytics 4
Source: https://dieghernan.github.io/chulapa/docs/19-google-analytics
Source: https://dieghernan.github.io/chulapa/docs/02-config#google-analytics
Use the Measurement ID from the existing GA4 property's web data stream, starting
G-, as gtag_id in _config.yml. analytics_id is for retired Universal Analytics;
leave it empty. Both IDs independently load snippets. The Google tag is not
production-gated and also loads in local preview when configured. Do not add a
duplicate script through custom includes. Preserve unrelated config; commit to
the publishing branch, wait for Actions and check the published site against the
matching property's Realtime report. Browser blockers or custom consent controls
may block requests. Clear goatcounter for Google-only tracking; clear gtag_id to
disable GA4. Changing one provider does not disable another.

## GoatCounter analytics (development after v2.1.0)
Source: https://dieghernan.github.io/chulapa/docs/18-goatcounter
Source: https://dieghernan.github.io/chulapa/docs/02-config#goatcounter-analytics
Set goatcounter to the complete public HTTPS counting URL, not just a site code:
goatcounter: "https://YOUR-CODE.goatcounter.com/count"
A self-hosted HTTPS endpoint such as https://stats.example.org/count also works.
Create the GoatCounter site separately; no API key or Jekyll plugin is required.
The official async https://gc.zgo.at/count.js loads only with an HTTPS endpoint
and JEKYLL_ENV=production. Missing/empty settings and development builds do not
load it. Shared head covers normal layouts and search. GoatCounter prefers the
path from a same-domain canonical URL (www and non-www are equivalent), otherwise
uses the browser path and ignores cross-domain canonicals. Chulapa already
provides canonical links including baseurl; no extra canonical tag is needed.
baseurl is not added to the external counting URL. Use the built-in analytics
settings instead of inserting duplicate tracker scripts in custom hooks. Upstream ignores
localhost by default. No visitor-count widget or custom event tracking is added.
Google settings remain independent: clear gtag_id and analytics_id to use only
GoatCounter, or both services will load if configured. Commit the counting URL
on the publishing branch, wait for Actions and check a visit on the published
site against the GoatCounter dashboard; allow reporting time. Check production
environment, endpoint, browser blockers and CSP if no visit appears. Not in
released v2.1.0.

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
Enable the palette generator with chulapa-skin.autothemer: true and set a quoted
hex primary color under vars. Loading order is skin, vars, autothemer, Bootstrap,
then theme components. Custom skins go in _sass/skins/NAME.scss; set skin: NAME,
use !default for customizable variables and do not import Bootstrap again.
Put only SCSS variable assignments in that file, for example
$primary: #285d70 !default;. The YAML chulapa-skin.skin: myskin belongs in
_config.yml, never in _sass/skins/myskin.scss.
The Codeply sandbox previews SCSS; translate assignments into vars without $ or
semicolons, quote hex colors and keep the Bootstrap grid enabled.
The docs link the sandbox from the theming page.

## Available skins
Source: https://dieghernan.github.io/chulapa/skins
The visual skin catalog shows previews. Available named skins are:
academia, butterfly, butterfly-dark, butterfly-dim, chulapa, cyborg, dark-bg,
darkly, deeply, electro, flatly, focal, gitdev, gitdev-dark, graymor, hootstrap,
journal, listen, lux, lymcha, materia, media, mickie, minco, minty, monotone,
navi, pear, preptor, skeeblu, sketchy, slate, solar, sunset, towards, twitter,
twitter-dim, twitter-lights-out, united, universal, wandoo, yeti.
When asked which skins are available, give actual names from this list and link
the visual catalog. For a short answer, give examples and explicitly say they
are examples, not the complete list. Do not answer only with the number of skins
or repeat installation instructions. Use a real skin name such as navi in YAML
examples rather than an unspecified placeholder. Separate special options:
auto selects the Autothemer; none selects no skin. The catalog's current preview
is the documentation site's configuration, not a skin named current.

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
If the default YouTube maxresdefault preview is unavailable, choose video_res,
for example video_res="hq2". thumbnail_url is structured metadata only: it does
not change the visible preview, player or poster. Date/duration inputs use
ISO 8601; snippets do not infer or validate them, crop images or fetch metadata.
For a five-minute duration use duration="PT5M", not "00:05:00" or "5:00".
For an upload date use upload_date="2026-10-08T12:00:00Z".

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
For internal images sorted by filename, pass index_sort="basename",
index_sort_asc=true and random=false to the include.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#bootstrap-carousel
snippets/carousel.html uses the same image sources and ordering options.
interval controls the time between slides in milliseconds (default 5000).
controls and indicators are false by default. Example:
{% include_cached snippets/carousel.html internal="gallery" interval=2000 controls=true indicators=true %}

## PhotoSwipe galleries (development after v2.1.0)
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#photoswipe-lightbox
Demo: https://dieghernan.github.io/chulapa/demo/14-photoswipe
Enable per gallery with the Liquid boolean include parameter photoswipe=true:
{% include_cached snippets/masonry.html internal="gallery" photoswipe=true %}
{% include_cached snippets/carousel.html internal="gallery" photoswipe=true controls=true interval=0 %}
No page YAML option or additional Jekyll plugin. Default disabled; internal and
external galleries supported; each gallery has its own sequence. Include caching
keeps enabled and disabled variants separate. The module supports default,
minimal and landingpage layouts. Search does not render gallery content.
PhotoSwipe 5.4.4 CSS and JavaScript load from jsDelivr on the first image opening.
Dimensions are discovered in the browser; offscreen images load on demand.
Supports touch, zoom, arrow keys and Escape, traps focus while open and restores
it to the triggering image. Respects reduced motion; carousel stays still while
open. Without JavaScript or if assets fail, links open the original image.
Not included in the v2.1.0 released gem or a theme pinned to that tag.

## Mathematical notation and tables of contents
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
Set mathjax: true in page front matter to load MathJax for mathematical notation.
Set show_toc: true for a table of contents, or show_sidetoc: true for a sliding
sidebar table of contents. h_min and h_max control heading levels, default 2 and 4.
Only headings with IDs appear; kramdown generates IDs for Markdown headings.
Supply IDs yourself for HTML headings. These components are available in the
default layout; minimal does not add author panels or tables of contents.

Development after v2.1.0: in-page, sidebar and kramdown TOCs automatically
highlight the current included, rendered section while scrolling and mark its link with
aria-current="location". JavaScript is required for highlighting, not for anchor
links. No extra YAML setting; keyboard focus and sidebar Tab order stay unchanged.

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
In v2.1.1-dev (available on main, not in v2.1.0), minimal does not automatically declare a Microformats2 h-entry;
custom content can supply its own h-entry wrapper with p-name, u-url and e-content.
Default and landingpage retain automatic entry markup. Visible author cards
include the selected author's url as u-url, resolving relative paths with url
and baseurl, without inheriting a site profile URL for guest authors. With
show_date enabled, updated pages retain dt-published alongside dt-updated.
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
a front matter field (default name), sorting is descending by default; index_sort_asc: true makes sorting ascending
and index_items limits the number of items (default 10).
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
show_author: true displays the author; page author metadata can override the
global author. show_date displays date and last_modified_at when supplied.
show_sociallinks enables sharing links. show_categories and show_tags display
badges. show_breadcrumb works with breadcrumb_list entries containing label and
url. show_bottomnavs uses page.previous and page.next when Jekyll supplies them;
it does not generate navigation between arbitrary standalone pages.
Set defaults in _config.yml as a list of scope/value mappings: scope.path: "",
scope.type: posts and values.layout: default applies the layout to all posts.
An explicit page front matter value overrides defaults. Use YAML false, not
the quoted string "false", to disable components.
show_related displays up to three tag-related collection documents: candidates
need two shared tags in the same collection or three across collections.
show_random selects up to three from this candidate pool at build time.
In v2.1.1-dev, a candidate with show_date: false has no date footer on either
related or random cards; other candidates retain their existing date display.
The v2.1.1 development version fixes a singleton pool rendering empty cards;
one eligible candidate renders as one card.
Empty related/random panels can mean no documents meet those shared-tag
thresholds. Disable the random panel with show_random: false in front matter.
The gallery include's random parameter does not control the random article panel.

## Configuring site search
Sources: https://dieghernan.github.io/chulapa/docs/02-config#search-engines
https://dieghernan.github.io/chulapa/docs/12-fusejs-search
Set search.provider to lunr, fusejs, simplesearch, algolia or google. Also create
a page with layout: search and a permalink matching search.landing_page
(default /search). Configuring the provider does not create this page.
In classic navigation and desktop dual navigation, the Search menu link also
requires navbar.nav. If it is absent, open the landing page directly, including
the actual site baseurl in the browser address, or configure navbar.nav.
For Fuse.js use search: { provider: fusejs, landing_page: /search } and a page
with layout: search, title: Search and permalink: /search. Reuse an existing
search page and path instead of creating duplicate output. The Chulapa 101
template already has Fuse.js configured. No extra plugin, API key or account is
needed for this provider. Do not repeat baseurl in landing_page or permalink.
Lunr, Fuse.js and Simple-Jekyll-Search generate indexes during the build.
include_on_search: false excludes a page from these three indexes. search.maxwords
limits content words per indexed document (default 30). Algolia uses a separately
uploaded index; include_on_search affects ranking, not exclusion, so use
algolia.files_to_exclude to exclude files. Google needs google_cse_id.
Use search.show_attrib: false to hide attribution for the local providers.
search.algolia_logo is separate; check the Algolia plan's requirements.
lunr_maxwords is deprecated and overrides maxwords for Lunr if both are set;
simplesearch_maxwords and fusejs_maxwords also override the shared maxwords.
Algolia browser settings are application_id, index_name and search_only_api_key
under algolia. Index uploads use the separate ALGOLIA_API_KEY environment
variable; never publish that indexing key in _config.yml.

## Comments
Sources: https://dieghernan.github.io/chulapa/docs/02-config#comments
https://dieghernan.github.io/chulapa/docs/13-giscus-comments
Set comments.provider and show_comments: true on pages or in defaults.
Integrations are disqus, cusdis, giscus, cactus and welcomments. For giscus,
follow its setup and paste the generated script into _includes/custom/giscus.html;
it uses GitHub Discussions. Giscus setup needs a public repository with
Discussions enabled and the giscus app installed; commenters sign in with GitHub.
The starter embed file initially contains only a comment. Select
comments.provider: giscus and show_comments: true on the chosen post, preserving
existing front matter. Keep repository/category/page mapping for existing threads.
Disqus requires comments.disqus_shortname, Cactus
comments.cactus_shortname and Welcomments comments.website_id. Cusdis needs
cusdis_app_id and, for self-hosting, cusdis_host; its original hosted service is
unavailable and the upstream project is archived.

## Navbar and footer
Sources: https://dieghernan.github.io/chulapa/docs/02-config#navbar
https://dieghernan.github.io/chulapa/docs/10-edit-menu
The navbar supports links and one level of child links. Omitting navbar.style
uses the classic navbar; fab selects a floating action button and dual switches
between floating and classic at a breakpoint. navbar.expand accepts sm, md, lg
or xl (default md). navbar.brand has title, img and url. navbar.nav entries use
title and url, or title with a child list of title/url entries.
For dual navigation at lg with a submenu, use exactly child, not child_list:
```yaml
navbar:
  style: dual
  expand: lg
  nav:
    - title: Docs
      child:
        - title: Installation
          url: /docs/01-install
```
Omitting style uses classic; fab and dual are both supported. For classic,
expand: always/never means always expanded/collapsed; for dual those values
select sm/xl respectively. No deeper submenu nesting is documented.
Sources: https://dieghernan.github.io/chulapa/docs/02-config#footer
https://dieghernan.github.io/chulapa/docs/11-edit-footer
footer.links entries have label, icon (Font Awesome code) and url (or a plain
email address, without mailto:). footer.copyright accepts custom text or HTML.
To edit links, merge changes into existing navbar.nav/footer.links; preserve other
links, navbar brand/style/expand and footer copyright. A menu link does not create
a page. Use site-relative paths without repeating baseurl; publish and verify the
actual destinations.

## Feeds and SEO controls
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
Set include_on_feed: true as a YAML boolean and provide a date to include content
in the theme's Atom (/atom.xml) and RSS (/rss.xml) feeds. Posts already have dates;
standalone pages and other collections need explicit dates.
robots: "noindex, follow" sets HTML crawler directives. It does not make a page
private, change robots.txt or remove sitemap entries. The default is index, follow.
og_image controls the sharing image, separate from the visible header_img.
schema_image overrides a post's BlogPosting image without changing sharing images.

## Page metadata and article images
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#seo-metadata
canonical_url sets the original URL for republished content: an absolute HTTP(S)
URL or a site-relative path starting with /. It changes metadata/feed links,
not navigation or redirects. jekyll-sitemap still uses the actual URL; use
sitemap: false on a duplicate. Pagination keeps each page's own canonical URL.
seo_title replaces the complete browser/structured title; og_title replaces
the social title; title remains the visible heading. Page description takes
precedence over excerpt, then home-page site description, then content fallback.
og_image_alt/width/height/type describe the sharing image; the theme does not
inspect the file. Site image metadata is not inherited by page-specific images.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#social-locales-and-articles
locale controls HTML language. For zh-Hant use og_locale: zh_TW separately.
og_locale_alternate is a list of real translated locales; it does not create
translations or hreflang links. Page [] disables inherited alternates.
og_type: article enables Open Graph article metadata on another collection;
og_article_author and og_article_section override author URL and first category.
Guest authors without profile URLs do not inherit the site's author URL.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#article-images
schema_image accepts a URL or list for post BlogPosting JSON-LD, with fallback
to page og_image then header_img. It does not crop/validate images and does not
change the visible header or social image. Relative images use url/baseurl.

## Alerts, captions and footnotes
Source: https://dieghernan.github.io/chulapa/docs/05-faq
Start an alert in its own paragraph, separated from any preceding paragraph
or list by a blank line. In Markdown, add {: .alert .alert-info .p-3 .mx-2 .mb-3} on the line after a
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
Compare designs in the skin previews at https://dieghernan.github.io/chulapa/skins.
To try a skin on your own site, set chulapa-skin.skin in _config.yml and publish.
Changing a preview on the documentation site does not change your own site.
To find _config.yml syntax errors, use a YAML syntax checker such as YAML Lint
or inspect the error from bundle exec jekyll build. Valid YAML does not guarantee
valid theme option names, provider IDs or existing skins; check global settings
and the build output as well.

## FAQ: Including posts in feeds and using jekyll-feed
Source: https://dieghernan.github.io/chulapa/docs/05-faq#use-jekyll-feed-instead-of-chulapas-feeds
To include every post in the theme feeds, add a front matter default with
scope: { path: "", type: posts } and values: { include_on_feed: true }, preserving
the other defaults. A date is also required.
Complete YAML for _config.yml (merge with any existing defaults list):
```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      include_on_feed: true
```
jekyll-feed's default /feed.xml can coexist with Chulapa's /atom.xml and /rss.xml.
Setting feed.path to /atom.xml without removing Chulapa's Atom page creates an
output-path collision. For most sites, keep the built-in feeds and link to
/atom.xml or /rss.xml. If using jekyll-feed, keep its separate /feed.xml URL and
follow the plugin's setup guide. The FAQ no longer provides a Ruby recipe for
replacing the theme feeds; do not describe that recipe as a documented quick
setup or invent a YAML switch to disable them.

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

## Layout structure and include caching
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#layout-structure-and-components
In the v2.1.1 development version, compress wraps minimal, which wraps default
or landingpage. Archive, cloudtag, cloudcategory and indexcategory inherit default;
search is standalone. Collection indexes share components/collection-documents;
related and random panels share components/recommendations. These are internal
renderers, not new configuration options.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#javascript-assets-and-local-overrides
In v2.1.1-dev, minimal/search share components/scripts.html for jQuery, Popper,
Bootstrap and fab/dual chulapa_navigation.js. minimal also loads chulapa_script.js
for content. Custom shells should load common dependencies once; inherited
layouts already handle them. Direct Lunr/Fuse adapters (readable or minified)
require assets/js/chulapa_search.js, the provider library and generated store
before the adapter. Review local layout/include/asset overrides together when
upgrading; standard layouts handle the dependency order.
The required jekyll-include-cache plugin also caches fixed footer content and
cloud entries in this development version. Comments remain in footer.html with
page-specific inputs. Cached includes must receive every page-dependent input
as a parameter. Use ordinary include for helpers that assign caller variables
(canonical URL, page language) and for custom hooks that read page context.

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
For a content TOC, add a list marker followed by {:toc}.
Use two separate lines, exactly as in this Markdown example:
```markdown
* Placeholder
{:toc}
```
Do not write - {:toc} on one line. The placeholder list item is replaced.
kramdown.toc_levels: 2..6 controls its heading levels; {:.no_toc} excludes a
heading. This is distinct
from the theme's automatic show_toc/h_min/h_max settings.

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

## Localized dates
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#localization-of-dates
locale sets the HTML language, not a complete interface translation. Date names
can be translated with snippets/datetranslate.html: pass a Liquid-formatted
English date string as date and optionally lang="es-ES". Example:
{% assign formatted = page.date | date: "%A %d, %B %Y" %}
{% include snippets/datetranslate.html date=formatted lang="es-ES" %}
English, French, Spanish, German and Italian are supported; unsupported languages
keep lowercased English names. Without lang it uses site.locale. Configurable
labels include search.label, related_label and random_label. Related/random
labels render supplied HTML unchanged; use headings matching the page hierarchy,
such as <h2 class="h5">Related posts</h2>, to set visual size without skipping
heading levels. Some UI labels
remain English.

## Additional navigation and community questions
Public Jekyll output remains public. robots.txt, robots: noindex and sitemap:
false do not restrict access or make a page private. Privacy requires actual
authentication/access control at the hosting layer or not publishing the content.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts
Use header_type: splash for a splash landing-page header; hero is a different
header presentation. Supported header types are base, post, hero, image and splash.
project_links is a list of header navigation links styled as buttons, with url,
icon and label fields.
words_per_minute in _config.yml controls reading time (default 200).
paginator_maxnum controls numbered pagination links (default 3), clamped to
2 through the total page count; previous/next and first/last are separate controls.
include_collection filters collection names, not categories. A music category
does not become a collection named music. For custom category cards, use Liquid:
{% assign music_posts = site.categories.music %}
{% include_cached components/indexcards.html cacheddocs=music_posts cachedlimit=5 %}
This is a custom content snippet, not a built-in category front-matter setting.
Bootstrap 4 HTML can be used in Markdown, for example
<button class="btn btn-primary">Example</button>. Markdown links can use
{: .btn .btn-primary}; a complete example is
[Docs](/docs/){: .btn .btn-primary}. [Docs] without (URL) is not a link.
Alerts can use {: .alert .alert-info .p-3} on a paragraph.
For missing theme includes, first run bundle install and bundle exec jekyll serve
and verify theme/remote_theme and required plugins. An error alone does not
establish a specific cause; ask for configuration and versions if it persists.
Footer email links use a plain email address as url, without mailto:.

## Public RSS feed
Source: https://dieghernan.github.io/chulapa/rss.xml
Use this link when a visitor asks where to subscribe to Chulapa's RSS feed.
The feed's contents are not included in this context. The assistant does not
fetch URLs, so do not claim to have read its entries or know its latest posts.


## Mermaid and clipboard (development version after v2.1.0)
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#mermaid-diagrams
Demo: https://dieghernan.github.io/chulapa/demo/13-mermaid
When showing a Mermaid setup, show the YAML front matter in one yaml code
block and the diagram in a separate mermaid code block. Do not nest triple
backtick fences inside another triple-backtick block.
Mermaid is disabled by default. Set mermaid: true as a YAML boolean in page
front matter or front matter defaults and use a fenced mermaid code block.
Works with minimal-derived layouts, without a Jekyll plugin. The search layout
does not display page content.
Mermaid 12.1.0 loads from jsDelivr only on enabled pages with diagrams and needs
modern ES2024/module-capable browsers (Safari 17.4+). Strict mode disables click
handlers and encodes HTML labels. Use accTitle and accDescr for accessibility.
If the CDN request fails or diagram rendering fails, the original diagram code
stays visible in the visitor's page as plain text. It is not stored on the CDN.
The CDN serves only the Mermaid JavaScript library. Wide diagrams scroll.
This feature is not in the v2.1.0 gem or pinned v2.1.0 remote theme.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#copying-code
Copy code requires Clipboard API in HTTPS or localhost and browser permission.
Development buttons await the write, report failure and do not clear the
clipboard first. Rendered Mermaid diagrams do not receive copy buttons.


## Starter examples
Sources: https://dieghernan.github.io/chulapa/docs/08-starter-examples
https://dieghernan.github.io/chulapa/docs/09-run-starter
Four complete starter folders are under examples/ in the repository:
personal-blog (post and card index), technical-blog (code, Mermaid, MathJax and
TOC), portfolio (projects collection and two project pages), project (landing
page and source/setup buttons). Each has Gemfile, _config.yml, index.md and a
README. Copy the contents of one folder to your own repository, update title,
description, repository, url/baseurl and replace sample content and links.
Examples use the default-branch remote theme with explicit Gemfile dependencies.
Pin a release tag for reproducibility; Mermaid is not in v2.1.0.
Preview with bundle install then bundle exec jekyll serve --url
http://localhost:4000 --baseurl "". Follow the installation guide for GitHub
Actions hosting: example folders do not include deployment workflows. The
chulapa-101 template is recommended for a new site with a ready-made publishing
workflow; the small examples help explore layouts.
Portfolio cards do not provide filtering. Project starter is a landing page,
not a documentation sidebar. Starter demo paths are /demo/starter-personal-blog,
/demo/starter-technical-blog, /demo/starter-portfolio and /demo/starter-project.

## Accessibility and resource loading in development
Source: https://dieghernan.github.io/chulapa/docs/06-accessibility-performance
These improvements are development changes after v2.1.0, not in that gem or
pinned remote theme. The first Tab stop skips the navbar. Floating navigation
(fab and the floating part of dual) uses a button: Enter/Space opens it and
focuses the first link; Escape closes it and returns focus to the button.
Closed floating menu links do not receive Tab focus. The lateral TOC keeps its
existing open/close and Tab order without a focus trap or modal role. In
v2.1.1-dev, its closed panel uses inert and aria-hidden so offscreen controls
cannot receive focus. Escape from its trigger or panel closes it and restores
focus to the trigger; button/overlay closing also restores focus. Its open/close
controls have 44px minimum targets.
Keyboard focus is visible; focused heading permalinks appear. Prose links
are underlined and card image links use their article title as a name.
Theme navigation/icon transitions respect prefers-reduced-motion.
In v2.1.1-dev, collection lists and local search results use h2 headings with
their previous visual sizes; tag/category groups use h2 then h3, and archives
use h2 for years, h3 for months and h4 for entries. List thumbnail links use the
article title as an accessible name. Navbar destination links mark the current
page with aria-current="page"; dropdown triggers and carousel previous/next
controls are native buttons supporting Enter/Space. With show_author disabled,
default and landingpage keep a spacing column without an empty aside.
Lunr, Fuse.js, Simple-Jekyll-Search and Google forms expose a search landmark.
Lunr/Fuse announce the rendered result count with a polite status region without
moving focus, clear the status when the query is cleared, and use a paragraph
for no results. Welcomments labels its comment field, links its Markdown
instructions with aria-describedby and uses a paragraph for configuration
warnings. These changes add no YAML settings and do not certify a site as WCAG
compliant; custom content and integrations still need their own checks.
In v2.1.1-dev, carousels with more than one slide and a positive interval have a
play/pause icon button when Bootstrap is available. Its accessible name describes
the action; a plain symbol remains if Font Awesome is unavailable. interval=0 disables cycling and
hides that button. Reduced motion starts paused; keyboard or pointer interaction
with slides/navigation stops cycling until explicit start. Hover temporarily
pauses on hover-capable devices. Enabling reduced motion stops a running
slideshow; changing the preference back does not silently restart it. Live
preference changes support both modern and legacy media-query listener APIs. Visitors
can explicitly start even with reduced motion. Indicators are named native
buttons (24px minimum targets), mark the current slide and support Enter/Space.
The slide container uses aria-live=polite while stopped and off while running.
The local assets/js/chulapa_carousel.js controller loads only on pages containing
carousels. The carousel include declares it as a deferred ES module, shared
across repeated/cached includes (one fetch/execution per document), including
carousels rendered directly inside custom layouts. Custom shells still need
Bootstrap, e.g. components/scripts.html before closing body; standard layouts
already provide it.
No new YAML options are needed. Without the dependencies, automatic motion stays
disabled. Source: https://dieghernan.github.io/chulapa/docs/04-layouts#bootstrap-carousel
Long headings wrap when text is enlarged. Browser regressions cover 320 CSS pixel
reflow (400% zoom equivalent on a 1280px viewport) and 200% text enlargement,
not every site's content or actual screen-reader behavior. Video players and
play buttons use the existing name parameter; provide the actual video title.
Names are trimmed; omitted, empty or whitespace-only values use generic player
names rather than blank accessible labels.
Gallery snippets still generate generic image alternatives. Descriptive alt
text requires author-supplied custom image markup; captions/transcripts require
author content. Do not invent a new gallery alt, captions or transcript option.
PWA status: the reusable theme does not register a service worker or provide an
offline cache. The docs site has a favicon manifest (display=standalone,
192px/384px icons), but currently no explicit start_url, scope or 512px icon.
A manifest alone does not establish cross-browser installability or offline
support. There is no built-in PWA YAML option. Site-specific customization
requires reviewing manifest links, HTTPS, baseurl, identity/start URL/scope,
icons and service-worker cache updates/offline fallbacks if one is added.
External libraries, comments, video and the chatbot have network dependencies;
the AI endpoint requires a live connection. Do not claim an offline chatbot.
Source: https://dieghernan.github.io/chulapa/docs/06-accessibility-performance#pwa-and-offline-behavior
The Chulapa font is served from the installed theme assets, with baseurl in
both CSS and preload, instead of jsDelivr. Google Fonts and Font Awesome still
use external providers. Cactus JS/CSS loads only when show_comments is true.
Its comments container closes before the fixed footer content without requiring
browser repairs to the document structure.
The review covers six skins and representative fixtures, not every skin,
custom widget or production site. Do not claim WCAG certification, a guaranteed
PageSpeed score or a measured Core Web Vitals improvement.

In v2.1.1-dev (available on main, not in v2.1.0), archive, indexcategory, cloudtag and cloudcategory (including
cloudtag2/cloudcategory2 aliases) use h-feed instead of a page-level h-entry.
Custom layouts inheriting from these list layouts retain h-feed through
multiple levels of layout inheritance without additional page configuration.
The page heading and canonical URL name and identify the feed; visible author
cards provide p-author. Listed documents are h-entry objects with title, URL
and available publication date. Cloud groups may repeat documents. indexcards
and simplelist mark individual entries; indexcards exposes its excerpt as
p-summary. The docs/blog/index.html pagination example wraps each results page
in h-feed. Custom component users supply their own feed wrapper. No new YAML
options are needed. These changes are in development and do not alter layout.

In v2.1.1-dev (available on main, not in v2.1.0), generated document openings and head tags use separate lines and
consistent indentation. With the existing compress_html.blanklines: true
setting (already in theme configuration examples), compression removes blank
lines and preserves head and theme footer indentation while clipping the rest
of the body. Fixed footer content uses two spaces per nesting level. Full compression
and disabled compression still follow existing site settings. No new option
is needed. Custom head includes and embedded comment integrations retain their
own formatting. The lateral TOC is named "Sidebar table of contents" and footer
link navigation is named "Footer links" for assistive technology. Liquid -%} can
remove newlines between emitted tags, so avoid trimming across HTML boundaries.


## JavaScript maintenance (v2.1.1-dev, main only)
Sources: https://dieghernan.github.io/chulapa/docs/02-config#search-engines
https://dieghernan.github.io/chulapa/docs/04-layouts#deferred-lazy-loading-of-youtube-videos
https://dieghernan.github.io/chulapa/docs/04-layouts#copying-code
Lunr builds its index once per search page. Lunr and Fuse.js share rendering
and highlighting, including two-character matches. Typing uses a 150 ms debounce;
Enter runs a search immediately without reloading and clearing input clears results.
No new YAML settings are needed. Search ranking and configured providers remain.
Deferred YouTube inserts a youtube-nocookie.com iframe when activated rather than
loading the player API at page load. Keyboard activation and repeated clicks work;
a noscript link opens the original video. Autoplay is requested but browser policy
may block it. Existing nolazy behavior remains available.
Native code copying and accessible feedback do not require jQuery/Bootstrap;
only graphical tooltips do. The legacy clipboard asset delegates to the maintained
implementation, keeps existing buttons and handles code outside maincontent.
Floating navigation also works on search pages without loading the content script.
TOCs reuse heading measurements within each update. Cusdis accepts resize messages
only from its iframe with finite nonnegative numeric heights. The helpful 404
falls back to a baseurl-aware home link when the sitemap is empty or unavailable.
These changes are not in released v2.1.0.


## Documentation assistant session state
Source: https://dieghernan.github.io/chulapa/blog/20261009_building-a-documentation-chatbot
The assistant is a documentation-site extension, not bundled with the reusable
theme. Recent messages and drafts are stored in sessionStorage for the current
tab's browser session and can be restored on reload. Clear chat resets them.
Only the current question is sent in each request; displayed history is not
conversation context. Visitors must include necessary details in each question.

## Complete option and snippet reference
Sources: https://dieghernan.github.io/chulapa/docs/02-config#xx-other-settings
https://dieghernan.github.io/chulapa/docs/04-layouts#b-snippets
The configuration guide covers Jekyll include/exclude, collections_dir,
permalink, defaults, pagination, excerpt_separator, kramdown, Sass and
compress_html settings. These are existing Jekyll/plugin settings, not new
Chulapa YAML options. Normal users should keep the starter's values.
The layouts guide lists every content snippet and its include parameters.
Gallery sources are internal (image_col group) or external (comma-separated
addresses); internal takes precedence if both are supplied. video.html uses
fileurl before provider/id; a provider is required for hosted videos. The
direct youtube.html snippet is always deferred and has no nolazy parameter;
use video.html provider="youtube" nolazy=true for immediate loading.
bootstrapdemo.html has no parameters and is the skin-preview component sampler.
Metadata helpers have a separate inventory for custom-layout authors; ordinary
posts do not need to call them. Use unquoted include booleans, including
photoswipe=true; strings such as "false" can enable other snippet features.
