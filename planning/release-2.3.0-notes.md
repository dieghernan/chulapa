# Chulapa v2.3.0

## Added

- Organize posts and pages into reading series with an ordered index, progress and Previous and Next controls. A page can belong to more than one series. [Series navigation](https://dieghernan.github.io/chulapa/docs/04-layouts#series-navigation)
- Add a visible citation with simplified APA and expandable BibTeX. Citable posts can also opt in to Google Scholar metadata. [Make a post citable](https://dieghernan.github.io/chulapa/docs/04-layouts#make-a-post-citable)
- Add five CSS callouts for notes, tips, important information, warnings and cautions. [Callouts](https://dieghernan.github.io/chulapa/docs/components)
- Publish JSON Feed at `/feed.json` and give readers links to Atom, RSS and JSON Feed at `/subscribe/`. Publish an alternative text sitemap at `/sitemap.txt` using canonical URLs. [Feeds](https://dieghernan.github.io/chulapa/docs/56-publish-feeds) · [Search visibility](https://dieghernan.github.io/chulapa/docs/65-search-visibility#text-sitemap-development)

## Changed and fixed

- Restore visible keyboard focus on the light/dark/auto selector. Improve interaction contrast in the Chulapa-authored skins and align the spacing of built-in and kramdown tables of contents.
- Update Bootstrap to 4.6.2, Popper.js to 1.16.1 and the default hosted Font Awesome Free to 7. Clipboard feedback works when Popper fails to load. [#219](https://github.com/dieghernan/chulapa/issues/219)
- Resolve links in Algolia excerpts against the source article and preserve excerpts without highlight data. Update Fuse.js to 7.5.0 with module loading.
- Improve feed author information, excerpts, reading times and escaping. Connect structured metadata for articles, videos, lists and series.

## Upgrade checks

- Keep `fa_version: 6` if your site relies on the previous hosted Font Awesome version. Enable v4 compatibility in the kit settings if you use a kit with legacy icons.
- Update copied script includes with the new CDN URLs and matching integrity hashes. Update copied Fuse.js pages to load the new module adapter and check search result ordering.
- Check existing feed subscriptions and any custom content at `/feed.json` or `/subscribe/`.

The gem declares Jekyll 3.7 through 4.x. The installed gem was tested with
Jekyll 3.10.0 and 4.4.1. Review local overrides before deploying. [Migration guide](https://dieghernan.github.io/chulapa/docs/07-migration#upgrade-to-v230) · [Full changelog](https://github.com/dieghernan/chulapa/blob/v2.3.0/CHANGELOG.md)
