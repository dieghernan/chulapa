## v2.1.1-dev

### Added

-   Mark archive, category and tag indexes and the pagination example as Microformats2 feeds with structured entries, without additional configuration.

-   Provide complete personal blog, technical blog, portfolio and project starter examples with a start guide and YAML demos.

-   Render Mermaid diagrams with `mermaid: true`, loading the library only on enabled pages containing diagrams and preserving source when rendering fails.

### Fixed

-   Associate Google and simple search labels with their input and load Lunr/Fuse attribution styles from stylesheets rather than body style blocks.

-   Give navbar dropdowns a valid named group role, move no-JavaScript navigation styles into the head and remove redundant void-element slashes, JavaScript types and the empty comments section warning from theme templates.

-   Preserve publication dates on updated pages and author profile URLs in Microformats2, and stop declaring automatic entries for unrestricted minimal layouts ([#86](https://github.com/dieghernan/chulapa/issues/86)).

-   Make floating navigation operable with keyboard input, reveal focused heading permalinks, name card image links and improve text link contrast in the Chulapa, Navi, Journal and Flatly skins.

-   Header project links no longer announce themselves as disabled buttons to assistive technology.

-   Code copy buttons wait for clipboard writes, report failures and no longer clear the clipboard before copying.

### Changed

-   Format generated head HTML and JSON-LD consistently and preserve head indentation when blank-line compression is enabled.

-   Add a skip link and visible keyboard focus, underline prose links and respect reduced-motion preferences without changing the lateral TOC's Tab behavior.

-   Serve the Chulapa font from the installed theme and load Cactus resources only on pages with comments enabled.

-   Raise the TOC sidebar button below the 992 px breakpoint, leaving room for a 56 px floating button and a spacer beneath it.

## v2.1.0 - 2026-10-08

### Fixed

-   `fa_kit_code` now loads the configured Font Awesome kit. The legacy `fa5_kit_code` setting remains supported and retains precedence when both are set.

-   Omit empty title separators, use the site title alone for `og:site_name` and remove obsolete `meta keywords` ([#80](https://github.com/dieghernan/chulapa/issues/80), [#81](https://github.com/dieghernan/chulapa/issues/81)).

-   Correct documentation examples, PageSpeed footnote formatting and responsive heading alignment in the minimal layout demo, clarify skin attribution and autothemer behavior, and exclude the auxiliary music scales widget from indexing.

-   Preserve filenames containing `index.html` in canonical URLs, breadcrumbs and feeds, and retain complete HTML meta descriptions to avoid splitting escaped entities ([#81](https://github.com/dieghernan/chulapa/issues/81)).

-   Avoid repeated subtitles and empty separators in metadata descriptions, and provide a populated category index and explicit search indexing settings in the documentation site ([#81](https://github.com/dieghernan/chulapa/issues/81)).

-   Correct video microdata URLs before and after deferred playback, remove unscoped search and comment properties and load the deferred player script from the installed theme ([#72](https://github.com/dieghernan/chulapa/issues/72)).

-   Consolidate page structured data, complete site name metadata and prevent empty breadcrumb names when the navbar brand contains only an icon ([#69](https://github.com/dieghernan/chulapa/issues/69)).
-   Validate Twitter/X profile URLs before attributing pages to an author and avoid attributing guest pages to the site author's profile ([#66](https://github.com/dieghernan/chulapa/issues/66)).
-   Prevent a JavaScript error on `minimal` pages without `maincontent` and load
    the script from the installed theme instead of the CDN ([#45](https://github.com/dieghernan/chulapa/issues/45)).

### Added

-   Set a page-level `canonical_url` shared by HTML, Open Graph, structured data, breadcrumbs and feeds ([#81](https://github.com/dieghernan/chulapa/issues/81)).

-   Override page language and Open Graph locales, list alternate locales and emit article dates, author profile URLs, sections and tags, including articles in other collections with `og_type` ([#80](https://github.com/dieghernan/chulapa/issues/80)).

-   Configure independent metadata titles with `seo_title` and `og_title`, and optional social image alt text, dimensions and MIME type ([#80](https://github.com/dieghernan/chulapa/issues/80), [#81](https://github.com/dieghernan/chulapa/issues/81)).

-   Override page metadata with `description`, shared by HTML, Open Graph, Twitter/X and JSON-LD without forced truncation ([#81](https://github.com/dieghernan/chulapa/issues/81)).

-   Supply optional video titles, thumbnails, upload dates, descriptions and durations through the video snippets without changing existing playback ([#72](https://github.com/dieghernan/chulapa/issues/72)).

-   Enable a theme header in the `minimal` layout with `show_header: true` while retaining unrestricted content width ([#78](https://github.com/dieghernan/chulapa/issues/78)).

-   Set representative article images with `schema_image`, accepting a URL or list, and avoid using site banners or author avatars as fallback article illustrations ([#72](https://github.com/dieghernan/chulapa/issues/72)).

-   Configure an independent JSON-LD publisher as `Organization` or `Person`, with dedicated name, URL, logo and image settings ([#68](https://github.com/dieghernan/chulapa/issues/68)).

-   Configure robots metadata per page with the `robots` front matter option, preserving `index, follow` by default ([#67](https://github.com/dieghernan/chulapa/issues/67)).
-   New skins:
    -   `listen`
    -   `cyborg`
    -   `darkly`
    -   `flatly`
    -   `materia`
    -   `slate`
    -   `solar`
    -   `butterfly`
    -   `butterfly-dim`
    -   `butterfly-dark`
    -   `yeti`
    -   `united`
    -   `navi`
-   New search with
    [Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search).
-   New search with [Fuse.js](https://fusejs.io).
-   Results with `lunr` and `fusejs` highlight matched terms like `algolia`.
-   Full support for Markdown in titles and subtitles (previously only HTML
    tagging was supported).
-   New widget Random (`show_random`) and the ability to add labels to Random
    and Related posts with `related_label` and `random_label`.
-   New highlight styles:
    -   `abap`
    -   `algol`
    -   `algol_nu`
    -   `arduino`
    -   `base16`
    -   `coffee`
    -   `cobalt2`
    -   `friendly_grayscale`
    -   `github.dark`
    -   `gruvbox.dark`
    -   `gruvbox`
    -   `igor`
    -   `igorpro`
    -   `inkpot`
    -   `lightbulb`
    -   `lilypond`
    -   `lovelace`
    -   `magritte`
    -   `material`
    -   `molokai`
    -   `monokai.sublime`
    -   `nord.darker`
    -   `nord`
    -   `oksolar.dark`
    -   `oksolar.light`
    -   `one.dark`
    -   `paraiso.dark`
    -   `paraiso.light`
    -   `panda`
    -   `rainbow_dash`
    -   `rrt`
    -   `sas`
    -   `selenized.black`
    -   `selenized.dark`
    -   `selenized.light`
    -   `selenized.white`
    -   `solarized.dark`
    -   `solarized.light`
    -   `stackoverflow.light`
    -   `stackoverflow.dark`
    -   `staroffice`
    -   `stata.dark`
    -   `stata.light`
    -   `tulip`
    -   `xcode`

### Changed

-   Fix missing sections in `cloudtag` and `cloudcategory` when a tag or category is named `demo`.
-   `site.search.lunr_maxwords` deprecated (still working). Use
    `site.search.maxwords` instead.
-   New option `site.search.show_attrib` to hide attribution of engine searches
    (not recommended but provided as a feature).

#### Checklist

-   [x] Set the gem and theme version to 2.1.0.
-   [x] Update the development version in the documentation.
-   [x] Confirm `chulapa-101` tracks the default branch without a pinned tag.
-   [x] Publish the GitHub release and update the latest release label in both version files.
-   [x] Validate the deployed video examples and simulated social previews.
-   [ ] Publish the gem on RubyGems.

## v2.0.1 - 2025-02-26

Hotfix release.

### Changed

-   Issue with `group_by` fixed with a pure Liquid approach (compatible with
    Jekyll 3 & 4). This affects the `related` plugin and `cloudtag` and
    `cloudcategory`. Now `cloudtag2` and `cloudcategory2` approaches are not
    recommended anymore and will redirect to `cloudtag` and `cloudcategory`.
    **Plugin `grouptag.rb` not required anymore**.

## v2.0.0 - 2025-02-24

### Added

-   New versions of `cloudtag` and `cloudcategory` (`cloudtag2` and
    `cloudcategory2`) layouts compatible with Jekyll \>= 4.1.0.
-   New skins:
    -   `focal`
    -   `media`
    -   `electro`
    -   `monotone`
    -   `mickie`
    -   `skeeblu`
    -   `minco`

### Changed

-   Twitter share button renamed to X. Also, the icon has been updated.
-   Share on Mastodon link replaced by Share on Bluesky.
-   Update `towards` skin.

## v1.1.0 - 2023-12-13

### Added

-   Add new "Share on Mastodon" button.
-   Add more comment providers:
    -   Cactus
    -   Cusdis
    -   Welcomments
-   New skins:
    -   `gitdev`
    -   `gitdev-dark`
    -   `towards`
-   New `related` component.
-   Add link to headings via JS.
-   Implement `show_sidetoc`.
-   Added support for
    [microformats2](http://microformats.org/wiki/microformats2).

### Changed

-   Improve font loading on skins.
-   Improve Universal skin.
-   Remove Clipboard.js dependency. Chulapa now uses a custom script.
-   Font Awesome Icons now present transitions on hover.
-   YouTube videos are lazy-deferred by default.
-   Improvements on pagination.
-   Several adjustments on skins.

## v1.0.1 - 2022-11-25

This release updated the gem dependencies for compatibility with other Jekyll versions.

## v1.0.0 - 2022-11-24

Public release with a Gem

## v1.0.0-beta.1 - 2020-07-28

Pre-release - first stable beta of the software

### Added

-   First stable beta - Software is public

## \### Changed

## \### Removed

## \### Fixed
