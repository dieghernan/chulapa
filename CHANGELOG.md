## dev

. Fix a strange bug in `cloudtag/cloudcategory`. If `id="demo"` the section is not rendered, possible collusion with keyword.

## v2.0.1 - 2025-02-26

# HOTFIX

### Changed

- Issue with `group_by` fixed with pure Liquid approach (compatible with Jekyll 3 & 4). This affects to `related` plug-in
  and `cloudtag` and `cloudcategory`. Now `cloudtag2` and `cloudcategory2` approaches are not recommended any more and will
  redirect to `cloudtag` and `cloudcategory`. **Plugin `grouptag.rb` not required any more**.

## v2.0.0 - 2025-02-24

### Added

-   New versions of `cloudtag` and `cloudcategory` (`cloudtag2` and `cloudcategory2`) layouts compatible with Jekyll >= 4.1.0.
-   New skins:
    - `focal`
    - `media`
    - `electro`
    - `monotone`
    - `mickie`.
    - `skeeblu`
    - `minco`

### Changed
-   Twitter share button renamed to X. Also, the icon has been updated.
-   Share on Mastodon link replaced by Share on Bluesky.
-   Update `towards` skin.

-   [x] Bump version on `head`
-   [x] Bump version on docs
-   [ ] Bump version on `chulapa-101` remote theme

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
-   Implemented `show_sidetoc`.
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

#### Checklist

-   [x] Bump version on `head`
-   [x] Bump version on docs
-   [ ] Bump version on `chulapa-101` remote theme

## v1.0.1 - 2022-11-25

This version only affects to the gem: - Remove dependencies to make it
compatible with other Jekyll versions.

## v1.0.0 - 2022-11-24

Public release with a Gem

## v1.0.0-beta.1 - 2020-07-28

Pre-release - first stable beta of the software

### Added

-   First stable beta - Software is public

### Changed

-   

### Removed

-   

### Fixed

-   
