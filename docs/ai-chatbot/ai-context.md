# Chulapa documentation context

v2.2.0 published on GitHub/RubyGems 21 Oct 2026; use @v2.2.0 for remote_theme.
Current release: v2.2.0; new features absent from v2.1.0. Verify the installed tag/gem version.

22 Oct 2026. llms.txt selective; acknowledge gaps. Preserve config; publish via Actions; verify live. Restart on config edits. Copy URLs; no fetching.
## Overview
Source: https://dieghernan.github.io/chulapa/docs
Responsive Bootstrap Jekyll theme: blogs/portfolios/docs/projects; GitHub Pages/other Jekyll hosts. Search, SEO, multi-author, code highlighting, MathJax, galleries, comments.
## First-site tutorial
Source: https://dieghernan.github.io/chulapa/docs/00-start
Methods: https://dieghernan.github.io/chulapa/docs/01-install
Use the public https://github.com/dieghernan/chulapa-101/generate template; demo: https://dieghernan.github.io/chulapa-101/. Enable Settings > Pages > GitHub Actions; no token/local install, workflow sets baseurl. Edit _config.yml title/description/author/repository/url, change only index.html's title, and edit an existing _posts sample's title/body while keeping filename/front matter. Commit main/master; wait for Actions and verify home/article via Settings > Pages. Replace sample content before sharing.
Chulapa 101 follows main (remote_theme: dieghernan/chulapa, no pin), with Butterfly/Butterfly Dim, three posts, About, archives, Fuse.js and RSS; keep index.html for pagination (5/page). Fuse indexes posts/About only; navbar/footer use _config.yml. Starter has commented/empty sample fields and blog defaults. _includes/custom/custom_head_before_css.html, custom_head.html, custom_bottomscripts.html and giscus.html are comment-only; assets/css/custom.scss has front matter. Giscus needs provider/show_comments.
## Browse documentation topics
Source: https://dieghernan.github.io/chulapa/docs/tags
Docs topics: appearance, content, publishing, search, installation, navigation, identity/branding, comments/analytics, hooks/feeds, accessibility. References/FAQ/tutorials retain direct routes. Providers are alternatives; analytics/distinct feed URLs can coexist. Badges link here; up to three optional cards. Blog tags separate.
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

## Remote-theme installation
Source: https://dieghernan.github.io/chulapa/docs/20-remote-theme
Existing working Jekyll site: branch/backup; set remote_theme: dieghernan/chulapa@v2.2.0, remove conflicting theme/remote_theme entries. Unpinned dieghernan/chulapa follows main. Merge required runtime dependencies into Gemfile; enable jekyll-remote-theme and jekyll-include-cache in Gemfile/plugins. A remote theme downloads files, not dependencies; consult gemspec/example Gemfile for custom builds. Run bundle install. Retain a working deployment or adapt Chulapa 101's GitHub Actions workflow to branch/source/dependencies.
## Gem-theme installation
Source: https://dieghernan.github.io/chulapa/docs/21-gem-theme
Add gem "chulapa-jekyll" to Gemfile; bundle install; set theme: chulapa-jekyll in _config.yml; remove remote_theme and unused remote-theme plugin/dependency. Enable jekyll-include-cache in plugins. bundle update chulapa-jekyll updates theme/dependencies within existing constraints. Preview with bundle exec jekyll serve. Local matching files override theme files; review/merge them during upgrades. Unknown include_cached: install/enable jekyll-include-cache and restart build.
## Migrating an existing Jekyll site
Source: https://dieghernan.github.io/chulapa/docs/07-migration
Source: https://dieghernan.github.io/chulapa/docs/46-migration-fields
Branch/backup, record URLs; preserve url/baseurl, permalink and domain. Pin remote_theme: dieghernan/chulapa@v2.2.0, remove old theme conflicts and install/enable remote-theme/include-cache. Review local _layouts/, _includes/ and assets/ overrides; retain useful customizations, prefer hooks over copied layouts.
Review page front matter and config defaults: explicit page layouts win; ordinary posts/pages use default with header_type post/base. Old theme options are not translated. Use author mapping (author.name), exact skin name; rebuild navbar/footer links. Preserve search page/path with matching search.provider and search.landing_page/permalink; existing comment mappings and analytics must not be duplicated. Preserve existing /feed.xml with jekyll-feed if needed, avoiding built-in /atom.xml and /rss.xml collisions.
Guide: twelve checks, Actions setup, six troubleshooting answers; mappings in separate reference. Preview/publish; verify old URLs, metadata and mobile/keyboard behavior. Mermaid/PhotoSwipe/GoatCounter are absent from pinned v2.1.0.
## Basic editing and publishing
Sources: https://dieghernan.github.io/chulapa/docs/00-start
https://dieghernan.github.io/chulapa/docs/15-create-post
https://dieghernan.github.io/chulapa/docs/16-create-page
https://dieghernan.github.io/chulapa/docs/17-add-image
https://dieghernan.github.io/chulapa/docs/42-unpublished-changes
GitHub editing: Code > pencil (existing file), or Add file > Create new file. Save with Commit changes on publishing branch; Actions must succeed before checking Settings > Pages website. For missing changes check branch/build errors/site address and post dates, not just GitHub source preview.
For a new post, follow https://dieghernan.github.io/chulapa/docs/15-create-post: Code > Add file > Create new file; create _posts/YYYY-MM-DD-title.md with a real non-future date. Example:
```markdown
---
layout: default
header_type: post
title: "My first post"
show_date: true
---
My story begins here.
```
Use ## inside article; layout supplies main heading. Public post URL follows permalink, not _posts path. Chulapa 101/personal-blog list posts on home; other designs need an index/link. The first-site tutorial edits its sample; use this new-file workflow when asked to create an article.
Standalone page: _pages/contact.md in Chulapa 101, or root contact.md without _pages setup; front matter layout: default, header_type: base, title: Contact, permalink: /contact/. Preserve existing settings/address and avoid duplicate output paths. Add /contact/ to existing navbar.nav without baseurl; neither creating a file nor adding a menu entry creates the other.
Images: Add file > Upload files into assets/img/, commit image and article edits. In content below front matter:
```liquid
![Describe the photograph]({{ '/assets/img/river.jpg' | relative_url }})
```
Replace filename/alt text; case/extension must match. relative_url adds baseurl once; do not prepend it. Check published article on narrow screens.
## Second browser tutorial
Source: https://dieghernan.github.io/chulapa/docs/59-photo-page-tutorial
After publishing Chulapa 101, use its existing assets/img/madrid-at-night.jpg (restore if missing). No local software. Create _pages/photo-walk.md only if /photo-walk/ is unused:
```markdown
---
layout: default
header_type: base
title: "My photo walk"
permalink: /photo-walk/
---
## An evening in Madrid
![Buildings illuminated at night in Madrid]({{ '/assets/img/madrid-at-night.jpg' | relative_url }})
This is my first illustrated page.
```
Insert only this item after Categories in existing _config.yml navbar.nav, not a replacement mapping:
```yaml
  - title: Photo walk
    url: /photo-walk/
```
Match indentation, retain all entries/settings; no second navbar or repository prefix. Commit both edits on the original publishing branch; wait for Actions. From Settings > Pages follow Photo walk and verify title, heading, image and text; return Home and follow it again.
## Global settings
Sources: https://dieghernan.github.io/chulapa/docs/02-config
https://dieghernan.github.io/chulapa/docs/14-site-details
Edit existing _config.yml fields, preserving unrelated config; restart local Jekyll after changes. Rename via title/description/author.name without changing url/baseurl/repository/permalinks. Chulapa 101's visible home heading separately uses index.html title; do not rename that file. Check browser title and heading. Page authors and custom footer.copyright are not rewritten; description metadata is not page prose.
url is origin (https://username.github.io); baseurl is /repository or "" for root; repository is username/repository. Explicit values help custom/local canonical/feed/image URLs. locale controls HTML language; page can override. author mapping: name, url, avatar, location, links. author.url accepts profile URL or site-relative /about/, resolving with url/baseurl. Visible author cards use the selected author's URL; a page-level guest author does not inherit the site author's URL. Social profiles use author.links.
## Publisher, analytics and icon configuration
Source: https://dieghernan.github.io/chulapa/docs/02-config
Publisher setup: https://dieghernan.github.io/chulapa/docs/60-person-publisher
Since v2.1.0: publisher.type accepts Person or Organization; default/fallback is Organization. Set type: Person explicitly in the existing mapping and preserve other fields. name/url identify it. Organization uses logo; Person uses image and ignores logo. Paths use url/baseurl. Article authors unchanged. Verify published application/ld+json publisher, not header/footer.
Font Awesome default=6; fa_version: 5 selects 5; fa_v4_support: true enables v4. fa_kit_code replaces hosted CSS with kit. Legacy fa5_kit_code wins: remove on migration.
## Google Analytics 4
Source: https://dieghernan.github.io/chulapa/docs/19-google-analytics
Source: https://dieghernan.github.io/chulapa/docs/02-config#google-analytics
Set gtag_id to GA4's G- measurement ID. analytics_id is separate, retired Universal Analytics; blank for GA4-only. Both are independent and, when set, load both snippets; no conflict. gtag_id loads in previews too. Avoid duplicate scripts; clear goatcounter for Google-only or gtag_id to disable GA4. Verify Realtime; blockers/consent may block requests.
## GoatCounter analytics (v2.2.0)
Source: https://dieghernan.github.io/chulapa/docs/18-goatcounter
Source: https://dieghernan.github.io/chulapa/docs/02-config#goatcounter-analytics
Set goatcounter: "https://YOUR-CODE.goatcounter.com/count" to the full public HTTPS counting endpoint, not code/dashboard alone. Self-hosted https://stats.example.org/count also works; do not add site's baseurl. Separate GoatCounter account/site required, no API key/plugin. Async https://gc.zgo.at/count.js loads only for nonempty HTTPS endpoint in JEKYLL_ENV=production; normal local preview does not load it, upstream ignores localhost.
Use built-in config, not duplicate custom scripts. Clear gtag_id/analytics_id for GoatCounter-only; otherwise both services count. Publish; visit live page and allow dashboard reporting time. For missing visits check environment, endpoint, blockers and CSP allowances for script/counting address. No visible visitor counter/custom events.
Same-domain canonical path is preferred (www/non-www equivalent); cross-domain canonicals ignored in favor of browser path. Existing canonical includes baseurl; no extra canonical tag needed. Not in v2.1.0.
## Appearance reference
Source: https://dieghernan.github.io/chulapa/docs/03-theming
chulapa-skin.skin: exact case-sensitive filename without .scss; unknown names fail Sass import. Default none; auto selects generated-palette skin. chulapa-skin.highlight defaults to default; Rouge supplies syntax highlighting. vars maps Sass names/expressions without $ or semicolons.
## Light/dark/auto selector
Source: https://dieghernan.github.io/chulapa/docs/22-choose-skin#let-visitors-switch-between-light-and-dark
2.2.0+ only, not v2.1.0. Keep/merge the existing top-level chulapa-skin mapping; chulapa-skin-dark is a separate top-level mapping, never nested or scalar:
```yaml
chulapa-skin:
  skin: gitdev
  highlight: github
chulapa-skin-dark:
  skin: gitdev-dark
  highlight: github.dark
```
Mappings are independent; copy shared vars. Omitted dark highlight inherits light, then default. classic/fab/dual works without menu links. Blank dark disables; Light defaults, Auto follows system. Preference persists same-origin; without storage, current page only. No JS/blocked inline: Light, selector hidden. theme-color uses active vars.primary or browser; preserve custom tags. Both skins credited. Custom CSS overrides both; check widgets/images/diagrams. Incomplete skin/highlighter CSS: Light initially, prior appearance later; mode persists.
Font imports remain. Google Fonts failure falls back; switching needs complete skin/highlighter CSS. Other import errors do not recover. Replacement CSS keeps its completion marker. Not v2.1.0. Demo selector is illustrative only.
## Changing skins and colors
Source: https://dieghernan.github.io/chulapa/docs/22-choose-skin
Source: https://dieghernan.github.io/chulapa/docs/23-change-color
In _config.yml change skin inside the existing chulapa-skin mapping; preserve vars/highlight:
```yaml
chulapa-skin:
  skin: journal
```
Never use root-level skin or scalar chulapa-skin. Preserve settings; no duplicates. Restart Jekyll, publish and verify. Preview does not save.
## Changing fonts and highlighting
Source: https://dieghernan.github.io/chulapa/docs/24-change-fonts
Source: https://dieghernan.github.io/chulapa/docs/25-code-highlighting
Load googlefonts URL AND set chulapa-skin.vars.font-family-base/headings-font-family; loading alone is insufficient. Quote family lists. Other providers: _includes/custom/custom_head.html. Check published body/headings and stylesheet.
highlight: zenburn styles code only; demo selection is not saved.
## Palette precedence and custom skins
Source: https://dieghernan.github.io/chulapa/docs/26-appearance-precedence
Source: https://dieghernan.github.io/chulapa/docs/27-autothemer
Source: https://dieghernan.github.io/chulapa/docs/28-custom-skin
Order: skin → vars → autothemer → Bootstrap → components. vars overrides skin; Autothemer fills undefined colors from primary. chulapa-skin.autothemer is a sibling of vars: set it true; primary belongs inside vars. Example:
```yaml
chulapa-skin:
  autothemer: true
  vars:
    primary: "#800080"
```
Never nest autothemer inside vars. Preserve current skin unless asked. none has no palette. Omit/false disables later step; skin: auto independently imports the generator.
Custom CSS: assets/css/custom.scss needs empty YAML front matter; loads after theme, subject to specificity. Review overrides on upgrade.
Skin: _sass/skins/NAME.scss contains SCSS ($primary: #285d70 !default;), not YAML. Set skin: NAME in _config.yml. !default permits overrides. Never import Bootstrap/grid in a site skin: the theme does it. Codeply needs its existing imports; put SCSS above them. Translate to vars without $/semicolon; quote hex. Codeply panels: INDEX/CLASSICNAVBARDEMO; Autothemer markers. Sunset palette/font omits CSS.
v2.2.0 selector toggle hides focus outline/shadow; use local CSS or disable selector if visible focus required. /docs/48-accessibility-reference.

## Available skins
Source: https://dieghernan.github.io/chulapa/skins
Named skins: academia,cerulean,litera,pulse,butterfly,butterfly-dark,butterfly-dim,chulapa,cyborg,dark-bg,darkly,deeply,electro,flatly,focal,gitdev,gitdev-dark,graymor,hootstrap,journal,listen,lux,lymcha,materia,media,mickie,minco,minty,monotone,navi,pear,preptor,skeeblu,sketchy,slate,solar,sunset,towards,twitter,twitter-dim,twitter-lights-out,united,universal,wandoo,yeti.
Examples+catalog; full list on request. auto/none special; current not a skin.
cerulean/litera/pulse: 2.2.0 only; retain original Bootswatch 4.6.2 palettes/typography/components and contrast limits. Not included in AA adjustments; vars still override. /docs/23-change-color#original-bootswatch-skins.
## Layouts
Source: https://dieghernan.github.io/chulapa/docs/04-layouts
default is for posts/pages/collection documents, via front matter or Jekyll defaults. Markdown content uses YAML front matter. Optional components use front matter/defaults; demos show output.
## Adding videos
Source: https://dieghernan.github.io/chulapa/docs/32-embed-video
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#video-support
Include snippets/video.html. Hosted providers: youtube, vimeo, dailymotion, google-drive, bilibili; provider and video ID required (watch URL v= value, or final path segment of youtu.be/ID and youtube.com/shorts/ID; omit query/fragment, never full URL):
{% include snippets/video.html id="YOUR_VIDEO_ID" provider="youtube" %}
fileurl wins: local=root-relative path, no relative_url/baseurl prefix; external=full HTTPS URL. Snippet applies absolute_url:
{% include snippets/video.html fileurl="/assets/mp4/sample.mp4" %}
YouTube click-to-load; nolazy=true skips click, retains browser lazy loading. video_res="hqdefault" for missing previews. thumbnail_url: metadata only, never preview/player/poster. Inputs name/thumbnail_url/upload_date/description/duration: accurate, no inference/validation/fetching/cropping. ISO 8601: PT5M, 2026-10-08T12:00:00Z; not 5:00. Names/noscript link: v2.2.0, not v2.1.0 (name metadata existed). verify playback/baseurl; not chat uploads.
Dev v2.2.1: VideoObject JSON-LD shares microdata ID, isPartOf→canonical page. Files contentUrl; providers embedUrl. Blank fields omitted; only deferred YouTube auto-fills thumbnail. Repeated IDs need consistent metadata. Survives playback; no loading changes, new options/plugins or guaranteed indexing. No IDs/unknown provider: no JSON-LD.
## Image galleries and carousels
Source: https://dieghernan.github.io/chulapa/docs/30-add-carousel
Source: https://dieghernan.github.io/chulapa/docs/29-add-gallery
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#masonry-gallery
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#bootstrap-carousel
Upload images to assets/img/gallery/. Append to existing _config.yml defaults (do not replace other entries):
```yaml
- scope:
    path: "assets/img/gallery"
  values:
    image_col: gallery
```
A gallery task answer needs BOTH the scoped defaults YAML and the Liquid invocation, not a scope mention alone. In article content: {% include_cached snippets/masonry.html internal="gallery" index_sort="basename" index_sort_asc=true random=false %}. Group must match image_col; publish and check images/order.
External source: assign comma-separated URLs to Liquid variable, pass external=that_variable. Internal wins if both supplied. Options: index_sort (internal only; modified_time default), index_sort_asc, index_items (100), random. Boolean random=true shuffles at build time and overrides sort; false disables, quoted "false" is truthy. Filename order: index_sort="basename" index_sort_asc=true random=false. Selected index_sort fields in galleries/carousels are fixed in v2.2.0; the released v2.1.0 does not correctly apply the field. Filename-order and native-button/keyboard-indicator recipes require v2.2.0.
Carousel uses snippets/carousel.html, same sources/order options, plus interval (5000 ms), controls/indicators (false). Example:
{% include_cached snippets/carousel.html internal="gallery" interval=2000 controls=true indicators=true %}
## PhotoSwipe galleries (v2.2.0)
Source: https://dieghernan.github.io/chulapa/docs/31-photoswipe
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#photoswipe-lightbox
Demo: https://dieghernan.github.io/chulapa/demo/14-photoswipe
Per-gallery Liquid boolean photoswipe=true (default disabled); no page YAML/plugin:
{% include_cached snippets/masonry.html internal="gallery" photoswipe=true %}
{% include_cached snippets/carousel.html internal="gallery" photoswipe=true controls=true interval=0 %}
Internal/external sources and isolated sequences. Cached variants remain separate. Works with default/minimal/landingpage; search does not render gallery content. PhotoSwipe 5.4.4 CSS/JS from jsDelivr on first opening; browser discovers dimensions and loads offscreen images on demand. Touch/zoom/arrows/Escape, focus trap/restoration, reduced motion; carousel pauses while open. Without JS/assets, original image links work. Not in v2.1.0.
## Mathematical notation and tables of contents
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
mathjax: true works in default, minimal and landingpage via the shared head. Only author panels/TOCs are absent from minimal; do not apply that limit to MathJax. Page front matter: show_toc: true adds in-page TOC; show_sidetoc: true adds sidebar. For sidebar h2–h5 set show_sidetoc: true, h_min: 2, h_max: 5 in page front matter, NOT config root. Defaults 2/4. kramdown.toc_levels does not control theme TOCs. Only headings with IDs appear: Markdown generates IDs; HTML needs explicit IDs. default supports panels/TOCs; minimal does not add them.
v2.2.0: automatic active section for in-page/sidebar/kramdown TOCs with JS, aria-current="location"; only included/rendered headings (skip hidden/closed). No new YAML or focus/Tab changes; anchors work without JS.
## More layouts and content navigation
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#landing-page
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#minimal
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#archive
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#index-category
landingpage: default options plus landingpage-chulapa-bg-color/landingpage-chulapa-text-color under chulapa-skin.vars.
minimal: content between navbar/footer, headerless unless show_header: true plus header_type base/post/hero/image/splash; header_img image. default/landingpage use header_type: none to hide header.
archive: collection docs by date; include_collection: posts,demo (no underscores/spaces), unset all; include_missdates: true adds undated docs. cloudtag/cloudcategory list tagged/categorized collection documents; see the dedicated cloud setup below.
indexcategory: document cards; index_sort default name, descending; index_sort_asc: true ascending; index_items default 10.
Page switches: show_author (page author wins), show_date (published/modified), show_sociallinks, show_categories/show_tags badges, show_breadcrumb with breadcrumb_list label/url. show_bottomnavs uses page.previous/page.next, not arbitrary standalone pages.
Defaults list: scope.path: "", scope.type: posts, values.layout: default. Explicit front matter wins; YAML false, not "false".
## Related and random article cards
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
show_related: up to 3 collection documents, >=2 shared tags same collection or >=3 cross-collection; more matches first, then newer dates. show_random: up to 3 sampled from same pool at build time, not on reload. On v2.2.0, a singleton pool renders exactly one card, not three empty cards; candidate show_date: false hides related/random date footer. Empty panels can mean insufficient matching tags. show_random: false disables article panel; gallery include random is unrelated.
related_label/random_label accept raw HTML rendered unchanged. Choose heading level by the section's place in the document hierarchy, not article heading levels; use class h5 for small text, e.g. <h2 class="h5">Related posts</h2>.
## Configuring site search
Sources: https://dieghernan.github.io/chulapa/docs/02-config#search-engines
https://dieghernan.github.io/chulapa/docs/12-fusejs-search
https://dieghernan.github.io/chulapa/docs/34-lunr-search
https://dieghernan.github.io/chulapa/docs/35-simplesearch-search
https://dieghernan.github.io/chulapa/docs/36-google-search
https://dieghernan.github.io/chulapa/docs/37-algolia-search
search.provider: lunr, fusejs, simplesearch, algolia or google. Create/reuse page with layout: search, title: Search and permalink matching search.landing_page (default /search); provider alone does not create it. Fuse example search: { provider: fusejs, landing_page: /search }, no account/API/plugin; Chulapa 101 already configured. Do not duplicate output or repeat baseurl in config paths. Classic/desktop dual Search link also needs navbar.nav; otherwise visit landing path including actual baseurl or add navbar links.
Local Lunr/Fuse/Simple-Jekyll-Search indexes build-time; include_on_search: false is DOCUMENT FRONT MATTER (or defaults.values), NEVER nested under search; excludes pages; search.maxwords default 30 content words/document. Legacy lunr_maxwords, simplesearch_maxwords, fusejs_maxwords take precedence over shared maxwords. search.show_attrib: false hides local attribution; search.algolia_logo is separate (check plan requirements).
Algolia uses uploaded index; include_on_search affects ranking, not exclusion: algolia.files_to_exclude excludes files. Browser fields algolia.application_id, index_name, search_only_api_key; indexing secret ALGOLIA_API_KEY belongs in environment/secrets, never public config. Docs site uses Algolia. jekyll-algolia is deprecated/unmaintained; install in Gemfile plugin group and upload via bundle exec jekyll algolia after dependency installation, with ALGOLIA_API_KEY secret environment binding (source directory must match). Google needs google_cse_id for an existing configured engine; build/local exclusions do not control Google indexing.
## Comments
Source: https://dieghernan.github.io/chulapa/docs/02-config#comments
Select comments.provider in _config.yml. Separately set show_comments: true in the post/page front matter or defaults.values, NEVER inside comments. The page layout must display comments. Providers do not migrate threads automatically.
## Giscus comments
Source: https://dieghernan.github.io/chulapa/docs/13-giscus-comments
Public GitHub repository, Discussions enabled, giscus app installed. Generate the embed at https://giscus.app/ and paste its actual script/IDs into _includes/custom/giscus.html (starter file is comment-only). File existence alone is insufficient. Keep repository/category/thread mapping. Commenters sign in with GitHub.
_config.yml:
```yaml
comments:
  provider: giscus
```
Existing post front matter: show_comments: true. Giscus has NO website_id configuration field (that belongs to Welcomments). Publish; check the interface on the article and the selected Discussions repository.
## Disqus comments
Source: https://dieghernan.github.io/chulapa/docs/38-disqus-comments
comments.provider: disqus; comments.disqus_shortname is the registered Disqus site identifier, not display name. Separately enable show_comments on the post and check the published interface.
## Cactus comments
Source: https://dieghernan.github.io/chulapa/docs/39-cactus-comments
comments.provider: cactus; comments.cactus_shortname is the registered site name. Hosted Matrix only; no homeserver option. Dev fixes IDs: include.pageurl | url_encode | replace: '_', '%5F'. v2.1.0 needs local override. Changes may detach threads: verify/migrate; retain valid local mappings.
## Welcomments comments
Source: https://dieghernan.github.io/chulapa/docs/40-welcomments-comments
comments.provider: welcomments; comments.website_id belongs ONLY to this provider. Deliver _data/welcomments/ plus rebuild; keep theme templates. Dev permalink includes baseurl; v2.1.0 needs page.url | absolute_url | escape locally. Review overrides and existing post slug/thread mapping.
## Cusdis comments
Source: https://dieghernan.github.io/chulapa/docs/41-cusdis-comments
comments.provider: cusdis; comments.cusdis_app_id and HTTPS comments.cusdis_host for an existing deployment. Upstream archived; original hosting unavailable (el hosting original ya no funciona, no solo archivado) (default host cusdis.com). No automatic thread migration.

## Navbar and footer
Sources: https://dieghernan.github.io/chulapa/docs/02-config#navbar
https://dieghernan.github.io/chulapa/docs/10-edit-menu
Sources: https://dieghernan.github.io/chulapa/docs/02-config#footer
https://dieghernan.github.io/chulapa/docs/11-edit-footer
navbar.nav: title/url or title/child list of title/url; one submenu level, child not child_list. Omitted navbar.style=classic; fab=floating; dual=floating/classic breakpoint. expand sm/md/lg/xl (md default); classic always/never=expanded/collapsed, dual always/never=sm/xl. brand: title,img,url.

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
footer.links: label, icon (complete Font Awesome class, e.g. "fas fa-envelope", not "envelope"), url (plain email without mailto: allowed). footer.copyright: custom HTML/text. Merge existing lists, retain other links/brand/style/expand/copyright. Menu entry does not create page; use paths without baseurl, publish and follow destinations.
## SEO controls
Source: https://dieghernan.github.io/chulapa/docs/65-search-visibility
Guide: /docs/65-search-visibility; cards are optional. robots noindex, sitemap: false and local-search exclusions are independent, never privacy. og_image social; header_img visible; schema_image article JSON-LD.
## Page metadata and article images
Dev v2.2.1 /sitemap.txt: output collections + HTML canonical URLs; sitemap: false excludes, noindex does not. No dedup/assets/plugin needed. XML uses actual URLs. Verify/submit public URL.
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#seo-metadata
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#social-locales-and-articles
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#article-images
Source: https://dieghernan.github.io/chulapa/docs/64-post-sharing
Source: https://dieghernan.github.io/chulapa/docs/62-canonical-article
canonical_url: HTTP(S) or /site-path; metadata/feed links, no redirect. jekyll-sitemap uses actual URL; sitemap: false excludes copy. Keep per-page pagination canonicals.
seo_title replaces complete browser/structured title; og_title social title; title visible heading. Description fallback: page description, excerpt, home-page site description, content. og_image_alt/width/height/type describe supplied image, not inspected; page-specific images do not inherit site image metadata.
locale sets HTML language; zh-Hant needs separate og_locale: zh_TW. og_locale_alternate lists real translated locales; [] clears inherited alternates; no translations/hreflang generation. og_type: article enables article metadata for another collection. og_article_author/og_article_section override author URL/first category; guest authors without URL do not inherit site's URL.
Dev v2.2.1 JSON-LD: connected IDs; posts: inLanguage, tags→keywords, categories→articleSection; WebPage.mainEntity→article, primaryImageOfPage→first valid article image (omitted if absent). Native archive/indexcategory/cloudtag/cloudcategory (+aliases): CollectionPage/ItemList matches selection/order/limits; clouds deduplicate, empty lists valid. No automatic custom pagination lists, new YAML or guaranteed rich results. Source: https://dieghernan.github.io/chulapa/docs/02-config#seo.
schema_image: URL/list for post BlogPosting, fallback page og_image then header_img. Relative images use url/baseurl; no cropping/validation or visible/social image changes.
## Alerts, captions and footnotes
Source: https://dieghernan.github.io/chulapa/docs/49-add-alert
Source: https://dieghernan.github.io/chulapa/docs/50-add-caption
Source: https://dieghernan.github.io/chulapa/docs/51-add-footnote
No snippets/alert.html exists; do NOT include one. Alerts use Markdown attributes in v2.1.0 and main: blank line, paragraph, next line {: .alert .alert-info .p-3 .mx-2 .mb-3}. Caption: image, BLANK LINE, caption paragraph then {: .caption}; keep image/caption separate.
```liquid
![River]({{ '/assets/img/river.jpg' | relative_url }})

The river in spring.
{: .caption}
```
Footnotes: [^1] with [^1]: text (kramdown).
## Favicons
Source: https://dieghernan.github.io/chulapa/docs/52-add-favicon
favicon.ico auto-discovered at domain root; project/baseurl sites need explicit links. RealFaviconGenerator: upload assets/favicon/, generated HTML in _includes/custom/custom_head.html, URLs include baseurl; verify.
## Bundled font
Source: https://dieghernan.github.io/chulapa/docs/53-chulapa-font
Bundled chulapa font needs no external loading. To use it on headings, FIRST set headings-font-family: "chulapa, sans-serif" under chulapa-skin.vars; ligature CSS alone does NOT select the font. Then for heading ligatures in assets/css/custom.scss, preserve empty YAML front matter and use:
```scss
---
---
h1, h2, h3, h4, h5, h6 {
  font-feature-settings: "liga", "dlig";
  text-rendering: optimizeLegibility;
}
```
The chulapa class applies font/ligatures: <span class="chulapa">Chulapa</span> inline or {: .chulapa} after a Markdown paragraph.
## Font Awesome
Source: https://dieghernan.github.io/chulapa/docs/54-add-icon
Markdown: <i class="fas fa-exclamation-circle" aria-hidden="true"></i> plus meaningful text; use a free icon matching configured FA version.
## Diagnosing YAML
Source: https://dieghernan.github.io/chulapa/docs/43-yaml-errors
Read failed build filename/line and preceding edits; check indentation, quotes and duplicate sections. YAML Lint or bundle exec jekyll build checks syntax, not valid skin/provider names or field locations. Compare reference; rebuild. Skin previews do not save own site settings; use the skin task.
## Subscription feeds
Source: https://dieghernan.github.io/chulapa/docs/56-publish-feeds
Source: https://dieghernan.github.io/chulapa/docs/57-jekyll-feed
For all posts, merge this default with existing defaults; date also required:
```yaml
defaults:
  - scope:
      path: ""
      type: posts
    values:
      include_on_feed: true
```
jekyll-feed /feed.xml coexists with built-in /atom.xml, /rss.xml; same-path outputs collide. Preserve subscribers; no YAML disable switch. include_on_feed selects posts/collection documents, not ordinary pages or plugin entries. Collections need output: true for linked articles to exist; feed opt-in does not publish them. Set dates explicitly: Jekyll 4 can infer missing dates, unlike 3.
## Check theme version
Source: https://dieghernan.github.io/chulapa/docs/55-check-theme-version
Remote: inspect remote_theme; tag=release, unpinned/branch can move. No exact commit check. Gem: chulapa-jekyll in Gemfile.lock. Published HTML source: search <!-- Chulapa Jekyll Theme - VERSION NUMBER HERE -->; marker gives version, unreleased means development. Missing marker: inspect local _layouts/ and _includes/ overrides. It identifies neither unpinned commit nor local overrides; review overrides manually. Cite this guide, not custom-head/docs index.
## Custom hooks
Source: https://dieghernan.github.io/chulapa/docs/45-custom-hooks
Source: https://dieghernan.github.io/chulapa/docs/44-custom-head
Hooks (minimal/search too): _includes/custom/custom_head_before_css.html before CSS; custom_head.html end of head; _includes/custom/custom_bottomscripts.html end of body. Local _includes/head.html is never overwritten by remote-theme upgrades. Manually merge upstream head changes into that override. Local files override theme: preserve snippets, append HTML, no front matter/layout copy; check published head. CSS: assets/css/custom.scss needs empty YAML front matter for custom.css output. Do not duplicate built-in analytics.
## Layout structure and include caching
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#layout-structure-and-components
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#javascript-assets-and-local-overrides
jekyll-include-cache required. Dev caches fixed footer/cloud entries; comments retain page-specific inputs in footer.html. Pass every page-dependent input to include_cached; use ordinary include for caller-assigning helpers (canonical URL/language) and hooks reading page context. Never blanket-replace includes.
Hierarchy: compress -> minimal -> default/landingpage; archive/cloudtag/cloudcategory/indexcategory inherit default; search standalone. Development refactoring only: collection indexes share components/collection-documents; related/random share components/recommendations (internal renderers, not settings).
Custom shells: components/scripts.html supplies common jQuery/Popper/Bootstrap and fab/dual chulapa_navigation.js once; inherited minimal/search handle this, minimal adds chulapa_script.js. Custom readable/minified Lunr/Fuse adapters require assets/js/chulapa_search.js, provider library and generated store before adapter. Review overrides together during upgrades; standard layouts order dependencies.
## Markdown formatting
Source: https://dieghernan.github.io/chulapa/docs/markdown-cheatsheet
**bold**, _italic_, ~~strikethrough~~; blank-line paragraphs; #..###### headings; [label](URL), ![alt](URL), > blockquote; - bullets, 1. ordered list; backtick inline code, language-labelled fences (js/ruby/html/yaml). Pipe tables use separator rows; colons align columns. Sample kramdown GFM differs from some extensions requiring kramdown.input: Kramdown; check generated output.
Source: https://dieghernan.github.io/chulapa/docs/58-content-toc
Content TOC: two separate lines, not - {:toc}:
```markdown
* Placeholder
{:toc}
```
To exclude a heading, copy the colon exactly:
```markdown
## Omitted heading
{:.no_toc}
```
TOC covers eligible headings before/after marker; marker sets position only. {:.no_toc} excludes from both TOCs. kramdown.toc_levels: 2..6 is site-wide, separate from show_toc/h_min/h_max.
_config.yml (merge, keep parser/options):
```yaml
kramdown:
  toc_levels: 2..6
```
## Syntax highlighting styles
Source: https://dieghernan.github.io/chulapa/docs/syntax-highlighting
Source: https://dieghernan.github.io/chulapa/docs/25-code-highlighting
Style names include github, github.dark, dracula, monokai, solarized.dark, solarized.light, nord, one.dark, zenburn. Demo preview does not save own config. Changes code colors, not skin or language; fenced code needs language ID. Style can override pre-chulapa-bg-color.
## Localized dates
Source: https://dieghernan.github.io/chulapa/docs/61-localize-date
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#localization-of-dates
locale sets HTML language, not full UI translation. datetranslate accepts English-formatted date; lang defaults site.locale, not page locale:
{% assign formatted = page.date | date: "%A %d, %B %Y" %}
{% include snippets/datetranslate.html date=formatted lang="es-ES" %}
English/French/Spanish/German/Italian; others retain lowercase English. Format controls order/punctuation. search.label/related_label/random_label configurable; some UI stays English.
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
## Mermaid and clipboard (v2.2.0)
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
Four folders: personal-blog (posts/cards), technical-blog (code/Mermaid/MathJax/TOC), portfolio (two projects/cards, no filtering), project (landing/buttons, no docs sidebar). Each: Gemfile/_config.yml/index.md/README; no workflow (chulapa-101 has publishing). Copy contents; edit title/description/repository/url/baseurl/content/links. Jekyll ~>4.4; dependencies explicit; unpinned main; Mermaid absent v2.1.0. Preview: bundle install; bundle exec jekyll serve --url http://localhost:4000 --baseurl "". Setup/publication: /docs/09-run-starter. Demos: annotated source, docs skin, not standalone home pages. Project Get started is sample copy, not theme setup.
Demo paths: /demo/starter-personal-blog, /demo/starter-technical-blog, /demo/starter-portfolio, /demo/starter-project.
## Accessibility and resource loading in v2.2.0
Source: https://dieghernan.github.io/chulapa/docs/06-accessibility-performance
Source: https://dieghernan.github.io/chulapa/docs/48-accessibility-reference
v2.2.0; absent from v2.1.0 gem/pin. Skip link first Tab stop. Floating fab/dual uses button: Enter/Space opens/focuses first link, Escape closes/returns focus, closed links outside Tab order. Sidebar TOC is not modal/no focus trap: closed inert/aria-hidden excludes offscreen controls; Escape from trigger/panel and button/overlay close return trigger focus; 44px minimum controls. Existing open-panel Tab order preserved.
Visible focus/permalinks, underlined prose links, article-title names on thumbnail links, reduced-motion navigation/icon transitions. Navbar current destinations aria-current="page"; dropdown and carousel navigation native Enter/Space buttons. List/local search headings h2; tag/category h2/h3; archives year h2, month h3, entry h4. Without show_author, spacing remains without empty aside.
Search landmarks: Lunr, Fuse, Simple-Jekyll-Search, Google. Lunr/Fuse polite result count, clear status on cleared query, paragraph for no results, no focus movement. Welcomments labels field, aria-describedby links Markdown help, paragraph config warnings. No new YAML or WCAG certification.
Carousel: >1 slide and positive interval with Bootstrap yields play/pause icon button (accessible action name, symbol fallback). interval=0 disables cycling/hides button. Reduced motion starts paused; keyboard/pointer slide/navigation stops until explicit start; hover temporarily pauses on hover-capable devices. Turning reduced motion on stops rotation, turning off does not restart; explicit start allowed. Modern/legacy media-query listeners supported. Named indicators (24px minimum), current state, Enter/Space. aria-live=polite stopped/off running.
Carousel include owns deferred ES module assets/js/chulapa_carousel.js; repeated/cached includes share one fetch/execution, including custom layouts. Custom shells still need Bootstrap via components/scripts.html before closing body; standard layouts provide it. Missing dependencies leave motion off, no new option.
Long headings wrap; regressions cover 320px reflow/200% text, not all sites or screen-reader behavior. Video name supplies accessible player/play-button title; empty/whitespace falls back to generic name. Gallery includes still use generic alt text: descriptive alternatives need custom markup; captions/transcripts are author content. Do not invent gallery alt/caption/transcript parameters.
PWA: no built-in service worker, offline cache or YAML enable switch. Docs favicon manifest display standalone, 192px/384px icons; no explicit start_url/scope/512 icon. Manifest alone guarantees neither installability nor offline. Site-specific setup must review HTTPS/baseurl, manifest identity/start URL/scope/icons and service-worker update/cache/fallback if added. External libraries/comments/video/chatbot require network; no offline AI.
Local Chulapa font assets use baseurl in CSS/preload; Google Fonts/Font Awesome external. Cactus JS/CSS only show_comments: true pages. Tests cover representative six skins/layouts, not WCAG certification, guaranteed PageSpeed/Core Web Vitals or all customizations.
## Inherited list microformats (v2.2.0)
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#layout-structure-and-components
v2.2.0 (not v2.1.0): archive/indexcategory/cloudtag/cloudcategory and deprecated cloudtag2/cloudcategory2 wrap h-entry items in h-feed. Inherited lists retain it. Keep the existing custom layout chain; no page setting. indexcards/simplelist mark entries only; custom pages need an h-feed wrapper. docs/blog/index.html wraps each paginated page; clouds may repeat documents.
Article: minimal has no automatic h-entry; custom content may use h-entry with p-name/u-url/e-content. default/landingpage retain h-entry. Updated articles with show_date retain dt-published/dt-updated.
## Generated HTML formatting (v2.2.0)
Source: https://dieghernan.github.io/chulapa/docs/06-accessibility-performance
In v2.2.0: separate document/head lines and consistent HTML/JSON-LD indentation. Existing compress_html.blanklines: true removes blank lines, preserves head/theme-footer indentation, clips other body whitespace; fixed footer nesting two spaces. Other compression modes follow config. Custom head/comment formatting retained; avoid Liquid -%} trimming HTML boundaries.
## JavaScript maintenance (v2.2.0)
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

## Tag/category cloud setup
Source: https://dieghernan.github.io/chulapa/docs/63-tag-category-clouds
Cloud index pages use layout cloudtag/cloudcategory, matching permalink /tags/ or /categories/, and include_collection: posts. Merge badge settings into existing _config.yml posts defaults:
```yaml
defaults:
  - scope: {path: "", type: posts}
    values: {cloudtag_url: /tags/, cloudcategory_url: /categories/, show_tags: true, show_categories: true}
```
These defaults affect posts, not cloud pages; omit repo prefix (baseurl is added). Other collections need matching scope/page and output: true; standalone pages are excluded. v2.2.0 cloud entries with show_date: false hide date/calendar/separator but retain reading time; v2.1.0 lacks this fix.
The old demo bug was asymmetric: badges already linked to #demo while the cloud group was #dmo. v2.2.0 makes both #demo; spaces hyphenate (#demo-topic). Update only manually written old #dmo links; no YAML change fixes fragments.
## Correct file and option scopes
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#options
Source: https://dieghernan.github.io/chulapa/docs/04-layouts#a-note-on-defaults
Source: https://dieghernan.github.io/chulapa/docs/03-theming#variables
minimal can have a hero with show_header: true, header_type: hero and header_img, but show_author does not add an author panel to minimal.
Archive page front matter, NOT an archive mapping in _config.yml:
```yaml
---
layout: archive
include_collection: posts,demo
include_missdates: true
---
```
Five newest post cards need layout: indexcategory, include_collection: posts, index_sort: date, index_sort_asc: false, index_items: 5 in page front matter. Default sorting is name, not date.
Sass switches including enable-rounded belong under chulapa-skin.vars, never _config.yml root. Fonts already loaded via googlefonts do not also require custom_head.html; loading alone still needs font-family-base/headings-font-family vars.
include_on_feed controls theme feeds only, NOT jekyll-feed. Plugin /feed.xml can coexist; /atom.xml or /rss.xml collisions must be resolved, never recommend replacing them with include_on_feed.
## Algolia search
Source: https://dieghernan.github.io/chulapa/docs/37-algolia-search
Source: https://dieghernan.github.io/chulapa/docs/02-config#search-engines
The algolia mapping is TOP LEVEL, a sibling of search, NEVER nested in search:
```yaml
search:
  provider: algolia
algolia:
  application_id: YOUR_APP_ID
  index_name: YOUR_INDEX_NAME
  search_only_api_key: YOUR_PUBLIC_SEARCH_ONLY_KEY
```
ALGOLIA_API_KEY: environment/Actions secret only. Adapt .github/workflows/algolia-search.yml (jekyll_src: docs) OR bundle exec jekyll algolia, not both. Theme installation does not enable uploads. Exclude with algolia.files_to_exclude; include_on_search only ranks via customRanking. jekyll-algolia deprecated/unmaintained; Gemfile group :jekyll_plugins. Verify index/live search.

2.2.0: small palette/YIQ adjustments preserve original primary colors and identity. Some pairs <4.5:1; no palette/page guarantee. Dim links stay bright. Custom colors/transparency/states need checks. /docs/23-change-color.
