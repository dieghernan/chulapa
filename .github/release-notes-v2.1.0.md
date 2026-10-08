# Chulapa v2.1.0

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

## Compatibility and validation

Existing embedding calls remain supported. Metadata descriptions are now retained without forced truncation, `og:site_name` uses the site title alone and article structured data no longer falls back to site banners or author portraits. Use `schema_image` for representative article images.

Validated with Jekyll 3.10.0 and 4.4.1 on Ruby 3.4.11, including temporary installation of the built gem, complete documentation builds, pagination, metadata and browser playback checks. This is not a full Ruby/Jekyll version matrix.

The deployed documentation reports five valid videos and one breadcrumb in [Google Rich Results Test](https://search.google.com/test/rich-results/result?id=MBjJxgJ6zRAatfZrMh0PEA). Schema.org reports zero errors and warnings. The [Welcome article](https://search.google.com/test/rich-results/result?id=GloMyQr4bJU98ft0wyPxMg) has a valid article and breadcrumb. Validation does not guarantee search appearance.

## Installation

Once published on RubyGems:

```ruby
gem "chulapa-jekyll", "~> 2.1.0"
```

For a pinned remote theme after this release is published:

```yaml
remote_theme: dieghernan/chulapa@v2.1.0
```

**Full changelog**: https://github.com/dieghernan/chulapa/compare/v2.0.1...v2.1.0
