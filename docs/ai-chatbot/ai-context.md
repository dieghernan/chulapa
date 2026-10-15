# Chulapa documentation context

Reviewed snapshot: migration field extraction, 15 October 2026. Selective facts from public
docs and llms.txt, not a full manual. Acknowledge facts absent from this summary.
For edit tasks: preserve unrelated config, commit on publishing branch, wait for
Actions, check Settings > Pages live site. Config changes require local Jekyll
restart. Source URLs must be copied exactly; the model cannot fetch linked pages.
Version caveats marked dev/after v2.1.0 refer to main, not the v2.1.0 gem or pin.

## Overview
Source: https://dieghernan.github.io/chulapa/docs
Responsive Bootstrap-based Jekyll theme for blogs, portfolios, documentation and project sites, on GitHub Pages or other Jekyll hosts. Supports search, SEO, multi-author pages, code highlighting, MathJax, galleries and comments.


## Variables dictionary
Source: https://dieghernan.github.io/chulapa/docs/variable-dictionary
Site Sass variables go under chulapa-skin.vars in _config.yml, not page front matter. Names omit $ and ;. Example:
```yaml
chulapa-skin:
  vars:
    primary: "#285d70"
    navbar-chulapa-bg-color: "#182c38"
    footer-chulapa-link-color: "#a8dae8"
```
Navbar inputs: navbar-chulapa-bg-color (background), navbar-chulapa-text-color (text), navbar-chulapa-hover-color, navbar-chulapa-hover-bg-color, navbar-chulapa-active-color, navbar-chulapa-disabled-color; navbar-chulapa-brand-color, navbar-chulapa-brand-hover-color; navbar-chulapa-toggler-color (hamburger stroke), navbar-chulapa-toggler-color-bg (button background), navbar-chulapa-toggler-icon-bg (Sass url(...) replacing the icon), navbar-chulapa-toggler-border-color.
Footer: footer-chulapa-bg-color, footer-chulapa-text-color, footer-chulapa-link-color, footer-chulapa-hover-color, footer-chulapa-icon-color, footer-chulapa-icon-hover-color.
Headers: hero-chulapa-bg-color, hero-chulapa-text-color, landingpage-chulapa-bg-color, landingpage-chulapa-text-color.
Other inputs: blockquote-chulapa-bg-color, blockquote-chulapa-text-color; footnote-chulapa-text-color (also captions); pre-chulapa-bg-color (highlight style can override); thead-chulapa-bg-color, thead-chulapa-text-color; pagination-chulapa-text-color, pagination-chulapa-text-hover-color, pagination-chulapa-bg-hover-color; indexcards-chulapa-border-color; chulapa-toc-bg.
Without explicit skin/vars assignments: navbar background uses primary; footer/hero use navbar background; landing page uses hero background; text colors may be derived. vars overrides skin assignments; Autothemer fills undefined values. A palette value such as blue need not change an explicitly assigned primary; prefer semantic primary/danger/body-bg.
Calculated helpers navbar-chulapa-text-contrast, footer-chulapa-text-contrast, landingpage-card-bg and cactus-btn-text cannot be overridden through vars; use exposed variables or custom CSS.
Quote hex colors (# otherwise starts a YAML comment), sizes with Sass units and font lists. Boolean switches use unquoted true/false.
Selected Bootstrap inputs: primary, secondary, success, info, warning, danger, light, dark; body-bg, body-color, link-color, link-hover-color, text-muted (also default index-card border); font-family-base, headings-font-family, font-family-monospace; font-size-base (1rem), line-height-base (unitless 1.5), headings-color, border-radius, carousel-control-color, carousel-indicator-active-bg. enable-rounded: false removes rounding; enable-responsive-font-sizes: true enables responsive sizes. This is a selection, not every Sass variable.


## Installation
Source: https://dieghernan.github.io/chulapa/docs/01-install
For a first site use https://github.com/dieghernan/chulapa-101/generate, then Settings > Pages > GitHub Actions. Live example: https://dieghernan.github.io/chulapa-101/ . No personal token or local installation required; workflow supplies baseurl. Edit site details in section A of _config.yml, commit to main/master and replace sample content/photo/alt/credit/About contact details.
Chulapa 101 is one personal blog, not a selector for four profiles: gitdev skin, three posts, local credited photo, About, year/category/tag archives, Fuse.js, RSS. Root files: index.html (must keep that filename for jekyll-paginate; five posts/page), _posts/, _pages/, assets/img/. Fuse indexes posts/About, excluding home, archives, search and 404. Navbar/footer config stays in _config.yml.
Starter config has commented/empty full-sample settings with blog collections/defaults. _includes/custom/ contains comment-only custom_head_before_css.html, custom_head.html, custom_bottomscripts.html and giscus.html; these do not change the skin. assets/css/custom.scss includes YAML front matter. Giscus also needs its provider and show_comments.


## Remote-theme installation
Source: https://dieghernan.github.io/chulapa/docs/20-remote-theme
Existing working Jekyll site: branch/backup; set remote_theme: dieghernan/chulapa@v2.1.0, remove conflicting theme/remote_theme entries. Unpinned dieghernan/chulapa follows main. Merge required runtime dependencies into Gemfile; enable jekyll-remote-theme and jekyll-include-cache in Gemfile/plugins. A remote theme downloads files, not dependencies; consult gemspec/example Gemfile for custom builds. Run bundle install. Retain a working deployment or adapt Chulapa 101's GitHub Actions workflow to branch/source/dependencies.


## Gem-theme installation
Source: https://dieghernan.github.io/chulapa/docs/21-gem-theme
Add gem "chulapa-jekyll" to Gemfile; bundle install; set theme: chulapa-jekyll in _config.yml; remove remote_theme and unused remote-theme plugin/dependency. Enable jekyll-include-cache in plugins. bundle update chulapa-jekyll updates theme/dependencies within existing constraints. Preview with bundle exec jekyll serve. Local matching files override theme files; review/merge them during upgrades. Unknown include_cached: install/enable jekyll-include-cache and restart build.


## Migrating an existing Jekyll site
Source: https://dieghernan.github.io/chulapa/docs/07-migration
Source: https://dieghernan.github.io/chulapa/docs/46-migration-fields
Branch/backup, record URLs; preserve url/baseurl, permalink and domain. Pin remote_theme: dieghernan/chulapa@v2.1.0, remove old theme conflicts and install/enable remote-theme/include-cache. Review local layouts/includes/assets that override theme files; retain useful customizations, prefer hooks over copied layouts.
Review page front matter and config defaults: explicit page layouts win; ordinary posts/pages use default with header_type post/base. Old theme options are not translated. Use author mapping (author.name), exact skin name; rebuild navbar/footer links. Preserve search page/path with matching search.provider and search.landing_page/permalink; existing comment mappings and analytics must not be duplicated. Preserve existing /feed.xml with jekyll-feed if needed, avoiding built-in /atom.xml and /rss.xml collisions.
Guide: twelve checks, Actions setup, six troubleshooting answers; mappings in separate reference. Preview/publish; verify old URLs, metadata and mobile/keyboard behavior. Mermaid/PhotoSwipe/GoatCounter are absent from pinned v2.1.0.


## Basic editing and publishing
Sources: https://dieghernan.github.io/chulapa/docs/00-start
https://dieghernan.github.io/chulapa/docs/15-create-post
https://dieghernan.github.io/chulapa/docs/16-create-page
https://dieghernan.github.io/chulapa/docs/17-add-image
https://dieghernan.github.io/chulapa/docs/42-unpublished-changes
GitHub editing: Code > pencil (existing file), or Add file > Create new file. Save with Commit changes on publishing branch; Actions must succeed before checking Settings > Pages website. For missing changes check branch/build errors/site address and post dates, not just GitHub source preview.
Post: _posts/YYYY-MM-DD-title.md, real non-future date. Complete example:
```markdown
---
layout: default
header_type: post
title: "My first post"
show_date: true
---
My story begins here.
```
Use ## inside article; layout supplies main heading. Public post URL follows permalink, not _posts path. Chulapa 101/personal-blog list posts on home; other designs need an index/link.
Standalone page: _pages/contact.md in Chulapa 101, or root contact.md without _pages setup; front matter layout: default, header_type: base, title: Contact, permalink: /contact/. Preserve existing settings/address and avoid duplicate output paths. Add /contact/ to existing navbar.nav without baseurl; neither creating a file nor adding a menu entry creates the other.
Images: Add file > Upload files into assets/img/, commit image and article edits. In content below front matter:
```liquid
![Describe the photograph]({{ '/assets/img/river.jpg' | relative_url }})
```
Replace filename/alt text; case/extension must match. relative_url adds baseurl once; do not prepend it. Check published article on narrow screens.


## Global settings
Sources: https://dieghernan.github.io/chulapa/docs/02-config
https://dieghernan.github.io/chulapa/docs/14-site-details
Edit existing _config.yml fields, preserving unrelated config; restart local Jekyll after changes. Rename via title/description/author.name without changing url/baseurl/repository/permalinks. Chulapa 101's visible home heading separately uses index.html title; do not rename that file. Check browser title and heading. Page authors and custom footer.copyright are not rewritten; description metadata is not page prose.
url is origin (https://username.github.io); baseurl is /repository or "" for root; repository is username/repository. Explicit values help custom/local canonical/feed/image URLs. locale controls HTML language; page can override. author mapping: name, url, avatar, location, links. author.url accepts profile URL or site-relative /about/, resolving with url/baseurl; default post article:author and dev u-url in visible author cards. Guest authors do not inherit site profile URL. Social profiles use author.links.


## Publisher, analytics and icon configuration
Source: https://dieghernan.github.io/chulapa/docs/02-config
publisher describes JSON-LD publisher, not visible article author. type: Organization (default/fallback) or Person; name/url identify it. Organization uses logo; Person uses image and ignores logo. Paths use url/baseurl. Changing publisher does not change guest authors.
Font Awesome defaults to 6; fa_version: 5 selects 5; fa_v4_support: true enables v4 compatibility. fa_kit_code uses a kit instead of hosted stylesheet. Legacy fa5_kit_code takes precedence: remove it when migrating.


## Google Analytics 4
Source: https://dieghernan.github.io/chulapa/docs/19-google-analytics
Source: https://dieghernan.github.io/chulapa/docs/02-config#google-analytics
Set existing gtag_id to G- measurement ID from GA4 property's web stream. analytics_id is retired Universal Analytics; leave unused values blank. Both independently load snippets. Google tag is NOT production-gated: enabled ID loads during local preview too. Avoid duplicate scripts/custom includes; clear goatcounter for Google-only or gtag_id to disable GA4. Publish; verify matching property's Realtime report. Browser blockers/custom consent may block requests.


## GoatCounter analytics (development after v2.1.0)
Source: https://dieghernan.github.io/chulapa/docs/18-goatcounter
Source: https://dieghernan.github.io/chulapa/docs/02-config#goatcounter-analytics
Set goatcounter: "https://YOUR-CODE.goatcounter.com/count" to the full public HTTPS counting endpoint, not code/dashboard alone. Self-hosted https://stats.example.org/count also works; do not add site's baseurl. Separate GoatCounter account/site required, no API key/plugin. Async https://gc.zgo.at/count.js loads only for nonempty HTTPS endpoint in JEKYLL_ENV=production; normal local preview does not load it, upstream ignores localhost.
Use built-in config, not duplicate custom scripts. Clear gtag_id/analytics_id for GoatCounter-only; otherwise both services count. Publish; visit live page and allow dashboard reporting time. For missing visits check environment, endpoint, blockers and CSP allowances for script/counting address. No visible visitor counter/custom events.
Same-domain canonical path is preferred (www/non-www equivalent); cross-domain canonicals ignored in favor of browser path. Existing canonical includes baseurl; no extra canonical tag needed. Not in v2.1.0.


## Appearance reference
Source: https://dieghernan.github.io/chulapa/docs/03-theming
chulapa-skin.skin: exact case-sensitive filename without .scss; unknown names fail Sass import. Default none; auto selects generated-palette skin. chulapa-skin.highlight defaults to default; Rouge supplies syntax highlighting. vars maps Sass names/expressions without $ or semicolons. Named-skin catalog follows below.


## Changing skins and colors
Source: https://dieghernan.github.io/chulapa/docs/22-choose-skin
Source: https://dieghernan.github.io/chulapa/docs/23-change-color
For an existing site, edit chulapa-skin.skin (e.g. journal) or vars (e.g. primary: "#285d70") in existing _config.yml section. Preserve other entries/overrides, no duplicate sections; quote hex colors. Commit/publish; check home/article/menu, mobile and contrast. Config compiles to CSS: restart local Jekyll. Demo/preview selection does not save own site settings.


## Changing fonts and highlighting
Source: https://dieghernan.github.io/chulapa/docs/24-change-fonts
Source: https://dieghernan.github.io/chulapa/docs/25-code-highlighting
Load googlefonts URL stylesheets AND apply families through chulapa-skin.vars.font-family-base/headings-font-family; loading alone is insufficient. Quote family lists with fallbacks. Other providers use _includes/custom/custom_head.html. Check published body/headings and external stylesheet availability after rebuild.
chulapa-skin.highlight: zenburn changes code appearance, not article typography. Check a language-labelled fenced code block; demo selection alone is not saved.


## Palette precedence and custom skins
Source: https://dieghernan.github.io/chulapa/docs/26-appearance-precedence
Source: https://dieghernan.github.io/chulapa/docs/27-autothemer
Source: https://dieghernan.github.io/chulapa/docs/28-custom-skin
Order: skin, vars, autothemer, Bootstrap, theme components. vars overrides skin assignments; Autothemer fills undefined colors from primary, retaining explicit colors. chulapa-skin.autothemer: true enables the later step; none skin avoids predefined assignments, named skins retain them. false/omission disables only later step; skin: auto independently imports generator.
Custom CSS: assets/css/custom.scss with empty YAML front matter, loaded after theme; specificity still matters. Local matching files override theme and need upgrade review.
Custom skin: _sass/skins/NAME.scss contains SCSS, e.g. $primary: #285d70 !default;. Set skin: NAME in _config.yml, never YAML in Sass. Use !default for customizable variables, no second Bootstrap import. Codeply previews SCSS above existing imports; translate to vars without $/semicolon, quote hex. Keep Bootstrap/grid. INDEX/CLASSICNAVBARDEMO panels and Autothemer CSS markers are supplied; Sunset palette/font example does not reproduce all skin CSS.


## Available skins
Source: https://dieghernan.github.io/chulapa/skins
Named skins: academia, butterfly, butterfly-dark, butterfly-dim, chulapa, cyborg, dark-bg, darkly, deeply, electro, flatly, focal, gitdev, gitdev-dark, graymor, hootstrap, journal, listen, lux, lymcha, materia, media, mickie, minco, minty, monotone, navi, pear, preptor, skeeblu, sketchy, slate, solar, sunset, towards, twitter, twitter-dim, twitter-lights-out, united, universal, wandoo, yeti.
For availability give actual names and catalog link, not just count/setup. Short answers may give named examples explicitly labelled as examples, not complete list. Use a real name such as navi in YAML. Special auto/none are not named visual skins; current preview is not a skin named current.


## Layouts
Source: https://dieghernan.github.io/chulapa/docs/04-layouts
default is for posts/pages/collection documents, via front matter or Jekyll defaults. Markdown content uses YAML front matter. Optional components use front matter/defaults; demos show output.


## Adding videos
Source: https://dieghernan.github.io/chulapa/docs/32-embed-video
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#video-support
Include snippets/video.html. Hosted providers: youtube, vimeo, dailymotion, google-drive, bilibili; provider and video ID required (watch URL v= value, or final path segment of youtu.be/ID and youtube.com/shorts/ID; omit query/fragment, never full URL):
{% include snippets/video.html id="YOUR_VIDEO_ID" provider="youtube" %}
Local/remote file (fileurl wins over provider/id):
{% include snippets/video.html fileurl="/assets/mp4/sample.mp4" %}
YouTube defaults to click-to-load; nolazy=true removes click activation (iframe still has browser lazy loading). video_res="hqdefault" replaces unavailable maxresdefault preview. thumbnail_url is structured metadata only, not preview/player/poster. Metadata inputs name, thumbnail_url, upload_date, description, duration must be accurate; no inference/validation/cropping/fetching. ISO 8601 examples: duration="PT5M", upload_date="2026-10-08T12:00:00Z" (not 5:00). This embeds website video, not uploads into chat.


## Image galleries and carousels
Source: https://dieghernan.github.io/chulapa/docs/30-add-carousel
Source: https://dieghernan.github.io/chulapa/docs/29-add-gallery
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#masonry-gallery
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#bootstrap-carousel
Masonry uses include_cached snippets/masonry.html; internal image directory needs defaults image_col: gallery:
{% include_cached snippets/masonry.html internal="gallery" %}
External source: assign comma-separated URLs to Liquid variable, pass external=that_variable. Internal wins if both supplied. Options: index_sort (internal only; modified_time default), index_sort_asc, index_items (100), random. Boolean random=true shuffles at build time and overrides sort; false disables, quoted "false" is truthy. Filename order: index_sort="basename" index_sort_asc=true random=false. Selected index_sort fields in galleries/carousels are fixed only on main after v2.1.0; the released v2.1.0 does not correctly apply the field. Filename-order and native-button/keyboard-indicator recipes require these dev fixes.
Carousel uses snippets/carousel.html, same sources/order options, plus interval (5000 ms), controls/indicators (false). Example:
{% include_cached snippets/carousel.html internal="gallery" interval=2000 controls=true indicators=true %}


## PhotoSwipe galleries (development after v2.1.0)
Source: https://dieghernan.github.io/chulapa/docs/31-photoswipe
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#photoswipe-lightbox
Demo: https://dieghernan.github.io/chulapa/demo/14-photoswipe
Per-gallery Liquid boolean photoswipe=true (default disabled); no page YAML/plugin:
{% include_cached snippets/masonry.html internal="gallery" photoswipe=true %}
{% include_cached snippets/carousel.html internal="gallery" photoswipe=true controls=true interval=0 %}
Internal/external sources and isolated sequences. Cached variants remain separate. Works with default/minimal/landingpage; search does not render gallery content. PhotoSwipe 5.4.4 CSS/JS from jsDelivr on first opening; browser discovers dimensions and loads offscreen images on demand. Touch/zoom/arrows/Escape, focus trap/restoration, reduced motion; carousel pauses while open. Without JS/assets, original image links work. Not in v2.1.0.


## Mathematical notation and tables of contents
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
mathjax: true enables mathematical notation. show_toc: true adds in-page TOC; show_sidetoc: true adds sliding sidebar. h_min/h_max default 2/4. Only ID-bearing headings appear; Markdown gets generated IDs, HTML needs supplied IDs. default supports panels/TOCs; minimal does not add them.
Dev after v2.1.0: automatic active section for in-page/sidebar/kramdown TOCs with JS, aria-current="location"; only included/rendered headings (skip hidden/closed). No new YAML or focus/Tab changes; anchors work without JS.


## More layouts and content navigation
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#landing-page
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#minimal
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#archive
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#cloud-tags-and-categories
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#index-category
landingpage: default options plus landingpage-chulapa-bg-color/landingpage-chulapa-text-color under chulapa-skin.vars.
minimal: content between navbar/footer, headerless unless show_header: true plus header_type base/post/hero/image/splash; header_img image. default/landingpage use header_type: none to hide header.
Dev: minimal has no automatic h-entry; custom wrapper can use h-entry/p-name/u-url/e-content. default/landingpage keep entry markup. Visible h-card uses selected author.url, resolves url/baseurl, never inherits site URL for guest. show_date retains dt-published alongside dt-updated.
archive: chronological collection documents, not standalone pages; include_collection names without underscores/spaces (e.g. posts,demo), unset all collections; include_missdates: true includes undated documents. cloudtag/cloudcategory need cloud permalink and cloudtag_url/cloudcategory_url in documents/defaults; include_collection restricts scope.
indexcategory: document cards; index_sort default name, descending; index_sort_asc: true ascending; index_items default 10.
Page switches: show_author (page author overrides site), show_date (publication/last_modified_at), show_sociallinks, show_categories/show_tags (badges), show_breadcrumb with breadcrumb_list label/url entries. show_bottomnavs uses supplied page.previous/page.next, not arbitrary standalone-page navigation.
Defaults are scope/value list entries: scope.path: "", scope.type: posts, values.layout: default. Explicit front matter wins; unquoted YAML false, not "false".
show_related: up to 3 collection documents, >=2 shared tags same collection or >=3 cross-collection; more matches first, then newer dates. show_random: up to 3 sampled from same pool at build time, not on reload. Dev singleton pool renders one card; candidate show_date: false hides related/random date footer. Empty panels can mean insufficient matching tags. show_random: false disables article panel; gallery include random is unrelated.

## Configuring site search
Sources: https://dieghernan.github.io/chulapa/docs/02-config#search-engines
https://dieghernan.github.io/chulapa/docs/12-fusejs-search
https://dieghernan.github.io/chulapa/docs/34-lunr-search
https://dieghernan.github.io/chulapa/docs/35-simplesearch-search
https://dieghernan.github.io/chulapa/docs/36-google-search
https://dieghernan.github.io/chulapa/docs/37-algolia-search
search.provider: lunr, fusejs, simplesearch, algolia or google. Create/reuse page with layout: search, title: Search and permalink matching search.landing_page (default /search); provider alone does not create it. Fuse example search: { provider: fusejs, landing_page: /search }, no account/API/plugin; Chulapa 101 already configured. Do not duplicate output or repeat baseurl in config paths. Classic/desktop dual Search link also needs navbar.nav; otherwise visit landing path including actual baseurl or add navbar links.
Local Lunr/Fuse/Simple-Jekyll-Search indexes build-time; include_on_search: false excludes pages; search.maxwords default 30 content words/document. Legacy lunr_maxwords, simplesearch_maxwords, fusejs_maxwords take precedence over shared maxwords. search.show_attrib: false hides local attribution; search.algolia_logo is separate (check plan requirements).
Algolia uses uploaded index; include_on_search affects ranking, not exclusion: algolia.files_to_exclude excludes files. Browser fields algolia.application_id, index_name, search_only_api_key; indexing secret ALGOLIA_API_KEY belongs in environment/secrets, never public config. Docs site uses Algolia. jekyll-algolia is deprecated/unmaintained; install in Gemfile plugin group and upload via bundle exec jekyll algolia after dependency installation, with ALGOLIA_API_KEY secret environment binding (source directory must match). Google needs google_cse_id for an existing configured engine; build/local exclusions do not control Google indexing.


## Comments
Sources: https://dieghernan.github.io/chulapa/docs/02-config#comments
https://dieghernan.github.io/chulapa/docs/13-giscus-comments
https://dieghernan.github.io/chulapa/docs/38-disqus-comments
https://dieghernan.github.io/chulapa/docs/39-cactus-comments
https://dieghernan.github.io/chulapa/docs/40-welcomments-comments
https://dieghernan.github.io/chulapa/docs/41-cusdis-comments
Use comments.provider and show_comments: true on comment-capable pages/defaults. Provider keys: disqus_shortname, cactus_shortname, website_id (Welcomments), cusdis_app_id/cusdis_host. Giscus: public repo, Discussions/app, generated _includes/custom/giscus.html (starter comment-only), GitHub login; keep repo/category/thread mapping.
Cactus: hosted Matrix only, no homeserver option. Current / IDs invalid; override: include.pageurl | url_encode | replace: '_', '%5F'. Changed IDs may detach threads; verify/migrate first.
Welcomments: deliver _data/welcomments/ + rebuild; keep theme templates in PRs. Form permalink omits baseurl: local correction page.url | absolute_url.
Cusdis: archived, original hosting unavailable; self-hosted needs HTTPS cusdis_host (default cusdis.com). No automatic thread migration.


## Navbar and footer
Sources: https://dieghernan.github.io/chulapa/docs/02-config#navbar
https://dieghernan.github.io/chulapa/docs/10-edit-menu
Sources: https://dieghernan.github.io/chulapa/docs/02-config#footer
https://dieghernan.github.io/chulapa/docs/11-edit-footer
navbar.nav entries: title/url, or title/child list of title/url; only one submenu level, use child not child_list. Omitted navbar.style=classic; fab=floating; dual=floating/classic breakpoint. expand sm/md/lg/xl (md default); classic always/never=expanded/collapsed, dual always/never=sm/xl. brand: title,img,url.
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
footer.links: label, icon (Font Awesome), url (plain email without mailto: allowed). footer.copyright: custom HTML/text. Merge existing lists, retain other links/brand/style/expand/copyright. Menu entry does not create page; use paths without baseurl, publish and follow destinations.


## Feeds and SEO controls
Theme feeds /atom.xml and /rss.xml need include_on_feed: true and a date. Posts have dates; pages/collections need explicit ones. robots: "noindex, follow" changes HTML crawler directives (default index, follow), not privacy/robots.txt/sitemap. og_image is social image, header_img visible header, schema_image post JSON-LD image.


## Page metadata and article images
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#seo-metadata
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#social-locales-and-articles
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#article-images
canonical_url: absolute HTTP(S) or /site-path for republished content; changes metadata/feed links, not navigation/redirects. Sitemap still uses actual URL; sitemap: false excludes duplicate. Pagination keeps per-page canonical.
seo_title replaces complete browser/structured title; og_title social title; title visible heading. Description fallback: page description, excerpt, home-page site description, content. og_image_alt/width/height/type describe supplied image, not inspected; page-specific images do not inherit site image metadata.
locale sets HTML language; zh-Hant needs separate og_locale: zh_TW. og_locale_alternate lists real translated locales; [] clears inherited alternates; no translations/hreflang generation. og_type: article enables article metadata for another collection. og_article_author/og_article_section override author URL/first category; guest authors without URL do not inherit site's URL.
schema_image: URL/list for post BlogPosting, fallback page og_image then header_img. Relative images use url/baseurl; no cropping/validation or visible/social image changes.


## Alerts, captions and footnotes
Source: https://dieghernan.github.io/chulapa/docs/05-faq
Separate alert paragraph from preceding paragraph/list by a blank line; append {: .alert .alert-info .p-3 .mx-2 .mb-3} on next line. Caption: paragraph after image followed by {: .caption}. Footnote reference [^1], definition [^1]: Footnote text.


## FAQ: Markdown and favicons
Use .md with YAML front matter/layout (explicit/default). Sample uses kramdown GFM; extensions depend on parser. favicon.ico at domain root is auto-discovered; project/baseurl sites need explicit links. Generate via RealFaviconGenerator, upload assets to assets/favicon/, put generated HTML in _includes/custom/custom_head.html, include baseurl in actual deployed icon URLs and verify.


## FAQ: Chulapa font and Font Awesome icons
Source: https://dieghernan.github.io/chulapa/docs/05-faq#chulapa-font
Built-in chulapa font: headings-font-family: "chulapa, sans-serif" under chulapa-skin.vars. For heading ligatures set font-feature-settings: "liga", "dlig" and text-rendering: optimizeLegibility in custom.scss. The chulapa class applies font/ligatures: <span class="chulapa">Chulapa</span> inline or {: .chulapa} after a Markdown paragraph.
Font Awesome HTML works in Markdown: <i class="fas fa-exclamation-circle"></i>.


## Diagnosing YAML
Source: https://dieghernan.github.io/chulapa/docs/43-yaml-errors
Read failed build filename/line and preceding edits; check indentation, quotes and duplicate sections. YAML Lint or bundle exec jekyll build checks syntax, not valid skin/provider names or field locations. Compare reference; rebuild. Skin previews do not save own site settings; use the skin task.


## FAQ: Including posts in feeds and using jekyll-feed
Source: https://dieghernan.github.io/chulapa/docs/05-faq#use-jekyll-feed-instead-of-chulapas-feeds
For all posts, merge this default with existing defaults; date also required:
```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      include_on_feed: true
```
jekyll-feed /feed.xml can coexist with built-in /atom.xml and /rss.xml. feed.path: /atom.xml collides unless theme Atom output removed. Prefer built-in feeds or keep plugin's separate /feed.xml (preserve existing subscribers). FAQ has no Ruby replacement recipe or YAML disable switch; do not invent one.


## Custom hooks and version checks
Source: https://dieghernan.github.io/chulapa/docs/45-custom-hooks
Source: https://dieghernan.github.io/chulapa/docs/44-custom-head
Source: https://dieghernan.github.io/chulapa/docs/05-faq#know-which-version-of-the-theme-i-am-using
Remote version: remote_theme suffix; gem: chulapa-jekyll in Gemfile.lock. HTML marker identifies neither unpinned commit nor local overrides.
Hooks (minimal/search too): _includes/custom/custom_head_before_css.html before CSS; custom_head.html end of head; _includes/custom/custom_bottomscripts.html end of body. Local files override theme: keep existing snippets, append HTML, no front matter/layout copy; verify published head. CSS: assets/css/custom.scss needs empty YAML front matter for custom.css output. Do not duplicate built-in analytics.


## Layout structure and include caching
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#layout-structure-and-components
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#javascript-assets-and-local-overrides
Dev v2.1.1: compress wraps minimal then default/landingpage; archive/cloudtag/cloudcategory/indexcategory inherit default; search standalone. Collection indexes share components/collection-documents; related/random share components/recommendations (internal renderers, not settings).
Custom shells: components/scripts.html supplies common jQuery/Popper/Bootstrap and fab/dual chulapa_navigation.js once; inherited minimal/search handle this, minimal adds chulapa_script.js. Custom readable/minified Lunr/Fuse adapters require assets/js/chulapa_search.js, provider library and generated store before adapter. Review overrides together during upgrades; standard layouts order dependencies.
jekyll-include-cache required. Dev caches fixed footer/cloud entries; comments remain page-specific in footer.html. Pass all page-dependent inputs to include_cached; use ordinary include for helpers assigning caller variables (canonical URL/language) and hooks reading page context. Never blanket-replace includes.


## Markdown formatting
Source: https://dieghernan.github.io/chulapa/docs/markdown-cheatsheet
**bold**, _italic_, ~~strikethrough~~; blank-line paragraphs; #..###### headings; [label](URL), ![alt](URL), > blockquote; - bullets, 1. ordered list; backtick inline code, language-labelled fences (js/ruby/html/yaml). Pipe tables use separator rows; colons align columns. Sample kramdown GFM differs from some extensions requiring kramdown.input: Kramdown; check generated output.
Content TOC uses two separate lines, not - {:toc}:
```markdown
* Placeholder
{:toc}
```
Placeholder replaced; kramdown.toc_levels: 2..6 sets levels; {:.no_toc} excludes heading. Distinct from show_toc/h_min/h_max. Alert/caption/footnote syntax is above.


## Syntax highlighting styles
Source: https://dieghernan.github.io/chulapa/docs/syntax-highlighting
Style names include github, github.dark, dracula, monokai, solarized.dark, solarized.light, nord, one.dark, zenburn. Example chulapa-skin.highlight: github.dark; rebuild/restart local Jekyll. Demo preview does not save own config. Changes code colors, not skin or language; fenced code needs language ID. Style can override pre-chulapa-bg-color.


## Localized dates
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#localization-of-dates
locale controls HTML language, not complete UI translation. snippets/datetranslate.html accepts an English Liquid-formatted date and optional lang (defaults site.locale):
{% assign formatted = page.date | date: "%A %d, %B %Y" %}
{% include snippets/datetranslate.html date=formatted lang="es-ES" %}
English/French/Spanish/German/Italian supported; unsupported languages keep lowercased English names. Configurable search.label, related_label, random_label; some UI labels stay English. Related/random labels render HTML unchanged: use appropriate heading level, e.g. <h2 class="h5">Related posts</h2>, not a skipped level for visual size.


## Additional navigation and community questions
Published files stay public: robots.txt, robots noindex and sitemap: false are not access control. Privacy needs hosting authentication or not publishing.
Header types: base, post, hero, image, splash (hero is not splash). project_links entries url/icon/label become header buttons. words_per_minute defaults 200. paginator_maxnum numbered window defaults 3, clamped 2..total; first/last/previous/next are separate.
include_collection filters collections, not categories. For custom category cards:
{% assign music_posts = site.categories.music %}
{% include_cached components/indexcards.html cacheddocs=music_posts cachedlimit=5 %}
Not a built-in category front-matter setting. Bootstrap HTML <button class="btn btn-primary">Example</button> works; Markdown button link [Docs](/docs/){: .btn .btn-primary} needs (URL).
Missing include: bundle install, bundle exec jekyll serve, verify theme/remote_theme/plugins. An error alone is not a diagnosis; request config/versions if unresolved.


## Public RSS feed
Source: https://dieghernan.github.io/chulapa/rss.xml
Give this subscription URL when asked. Feed entries are not in context; assistant does not fetch URLs or know latest feed posts.


## Mermaid and clipboard (development version after v2.1.0)
Source: https://dieghernan.github.io/chulapa/docs/33-add-diagram
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#mermaid-diagrams
Demo: https://dieghernan.github.io/chulapa/demo/13-mermaid
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#copying-code
Mermaid defaults disabled. Set mermaid: true (YAML boolean, page/defaults), then fenced mermaid block; show setup YAML and diagram in separate code blocks (never nested triple fences). Minimal-derived layouts supported, search does not show content; no plugin.
Mermaid 12.1.0 from jsDelivr only on enabled pages containing diagrams; ES2024/modules required, Safari 17.4+. Strict mode disables clicks/encodes HTML labels; accTitle/accDescr describe diagrams, wide diagrams scroll. On CDN/render failure original source remains visible on the page, not stored on CDN (library only). Absent from v2.1.0 gem/pin.
Clipboard: HTTPS or localhost plus Clipboard API permission. Dev buttons await write/report failure without clearing first. Rendered Mermaid has no copy button.


## Starter examples
Sources: https://dieghernan.github.io/chulapa/docs/08-starter-examples
https://dieghernan.github.io/chulapa/docs/09-run-starter
Four example folders: personal-blog (posts/card index), technical-blog (code/Mermaid/MathJax/TOC), portfolio (projects collection/two pages), project (landing/source/setup buttons, no docs sidebar). Each has Gemfile/_config.yml/index.md/README, no deployment workflow. Copy contents to own repo; edit title/description/repository/url/baseurl/content/links. Explicit dependencies; unpinned remote follows main, Mermaid absent in v2.1.0. Preview: bundle install then bundle exec jekyll serve --url http://localhost:4000 --baseurl ""; configure Actions using installation guide. Chulapa 101 is the ready-made publishing template, not these folders. Portfolio cards have no filtering.
Demo paths: /demo/starter-personal-blog, /demo/starter-technical-blog, /demo/starter-portfolio, /demo/starter-project.


## Accessibility and resource loading in development
Source: https://dieghernan.github.io/chulapa/docs/06-accessibility-performance
Source: https://dieghernan.github.io/chulapa/docs/06-accessibility-performance#pwa-and-offline-behavior
Dev after v2.1.0; absent from v2.1.0 gem/pin. Skip link first Tab stop. Floating fab/dual uses button: Enter/Space opens/focuses first link, Escape closes/returns focus, closed links outside Tab order. Sidebar TOC is not modal/no focus trap: closed inert/aria-hidden excludes offscreen controls; Escape from trigger/panel and button/overlay close return trigger focus; 44px minimum controls. Existing open-panel Tab order preserved.
Visible focus/permalinks, underlined prose links, article-title names on thumbnail links, reduced-motion navigation/icon transitions. Navbar current destinations aria-current="page"; dropdown and carousel navigation native Enter/Space buttons. List/local search headings h2; tag/category h2/h3; archives year h2, month h3, entry h4. Without show_author, spacing remains without empty aside.
Search landmarks: Lunr, Fuse, Simple-Jekyll-Search, Google. Lunr/Fuse polite result count, clear status on cleared query, paragraph for no results, no focus movement. Welcomments labels field, aria-describedby links Markdown help, paragraph config warnings. No new YAML or WCAG certification.
Carousel: >1 slide and positive interval with Bootstrap yields play/pause icon button (accessible action name, symbol fallback). interval=0 disables cycling/hides button. Reduced motion starts paused; keyboard/pointer slide/navigation stops until explicit start; hover temporarily pauses on hover-capable devices. Turning reduced motion on stops rotation, turning off does not restart; explicit start allowed. Modern/legacy media-query listeners supported. Named indicators (24px minimum), current state, Enter/Space. aria-live=polite stopped/off running.
Carousel include owns deferred ES module assets/js/chulapa_carousel.js; repeated/cached includes share one fetch/execution, including custom layouts. Custom shells still need Bootstrap via components/scripts.html before closing body; standard layouts provide it. Missing dependencies leave motion off, no new option.
Long headings wrap; regressions cover 320px reflow/200% text, not all sites or screen-reader behavior. Video name supplies accessible player/play-button title; empty/whitespace falls back to generic name. Gallery includes still use generic alt text: descriptive alternatives need custom markup; captions/transcripts are author content. Do not invent gallery alt/caption/transcript parameters.
PWA: no built-in service worker, offline cache or YAML enable switch. Docs favicon manifest display standalone, 192px/384px icons; no explicit start_url/scope/512 icon. Manifest alone guarantees neither installability nor offline. Site-specific setup must review HTTPS/baseurl, manifest identity/start URL/scope/icons and service-worker update/cache/fallback if added. External libraries/comments/video/chatbot require network; no offline AI.
Local Chulapa font assets use baseurl in CSS/preload; Google Fonts/Font Awesome external. Cactus JS/CSS only show_comments: true pages. Tests cover representative six skins/layouts, not WCAG certification, guaranteed PageSpeed/Core Web Vitals or all customizations.
Dev list microformats: archive/indexcategory/cloudtag/cloudcategory (cloudtag2/cloudcategory2 aliases) use h-feed, not page-level h-entry; inherited custom list layouts retain it. Heading/canonical identify feed; visible author p-author; entries h-entry with title/URL/date; groups can repeat docs. indexcards/simplelist mark entries, indexcards excerpt p-summary. docs/blog/index.html pagination wraps each page h-feed; custom component users supply wrapper. No new YAML/layout change.
Dev HTML formatting: separate document/head lines and consistent HTML/JSON-LD indentation. Existing compress_html.blanklines: true removes blank lines, preserves head/theme-footer indentation, clips other body whitespace; fixed footer nesting two spaces. Other compression modes follow config. Custom head/comment formatting retained; avoid Liquid -%} trimming HTML boundaries. Sidebar nav name "Sidebar table of contents"; footer nav "Footer links".

## JavaScript maintenance (v2.1.1-dev, main only)
Sources: https://dieghernan.github.io/chulapa/docs/02-config#search-engines
https://dieghernan.github.io/chulapa/docs/04-layouts#deferred-lazy-loading-of-youtube-videos
https://dieghernan.github.io/chulapa/docs/04-layouts#copying-code
Local Lunr/Fuse search: index once, two-character highlighting, 150 ms debounce; Enter searches immediately without reload, clearing query clears results; ranking/providers unchanged.
Deferred YouTube uses youtube-nocookie.com on click (not player API at load); keyboard/repeated activation supported, noscript original-video link, autoplay browser-dependent; nolazy preserved.
Native code-copy/feedback needs no jQuery/Bootstrap (graphical tooltips do); legacy clipboard delegates maintained implementation and handles code outside maincontent without clearing clipboard.
Floating navigation works on search pages; Cusdis resize only its own iframe, finite nonnegative heights. Empty-sitemap 404 falls back to baseurl-aware home. Dev only; no new YAML.

## Documentation assistant session state
Source: https://dieghernan.github.io/chulapa/blog/20261009_building-a-documentation-chatbot
Documentation-site extension, not packaged theme. sessionStorage keeps recent messages/draft for current tab/session, including reload. Same-tab widget links close panel without deleting history/draft; modified/new-tab activation keeps original panel open. Clear chat resets them. Only current question is sent to model; history is not conversation context, so include details in each question.


## Complete option and snippet reference
Sources: https://dieghernan.github.io/chulapa/docs/02-config#xx-other-settings
https://dieghernan.github.io/chulapa/docs/04-layouts#b-snippets
Jekyll/plugin settings (not new theme API): include/exclude, collections_dir, permalink, defaults, pagination, excerpt_separator, kramdown, sass, compress_html. Usually retain starter values. Reference lists content snippets/parameters and separate metadata-helper inventory for custom layouts; ordinary posts need not invoke helpers.
Gallery internal=image_col group, external=comma-separated URLs (internal wins). video fileurl wins; hosted videos need provider/id. Direct youtube.html is always deferred, has no nolazy; for immediate use video.html provider="youtube" nolazy=true. bootstrapdemo.html has no parameters, samples components for skins. Include booleans unquoted (photoswipe=true); quoted "false" can enable features.
