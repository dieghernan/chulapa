## dev

### Added

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
-   New widget Random (`show_random`) and possibility of add labels to Random
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

-   Fixed a strange bug in `cloudtag/cloudcategory`. If `id="demo"` the section
    is not rendered, possibly due to a collision with a keyword.
-   `site.search.lunr_maxwords` deprecated (still working). Use
    `site.search.maxwords` instead.
-   New option `site.search.show_attrib` to hide attribution of engine searches
    (not recommended but provided as a feature).

#### Checklist

-   [ ] Bump version on `head`
-   [ ] Bump version on docs
-   [ ] Bump version on `chulapa-101` remote theme

## v2.0.1 - 2025-02-26

# HOTFIX

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
-   FontAwesome Icons now present transitions on hover.
-   YouTube videos are lazy-deferred by default.
-   Improvements on pagination.
-   Several adjustments on skins.

## v1.0.1 - 2022-11-25

This version only affects the gem: - Remove dependencies to make it compatible
with other Jekyll versions.

## v1.0.0 - 2022-11-24

Public release with a Gem

## v1.0.0-beta.1 - 2020-07-28

Pre-release - first stable beta of the software

### Added

-   First stable beta - Software is public

## \### Changed

## \### Removed

## \### Fixed
