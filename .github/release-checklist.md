# Release 2.1.0

Release preparation and validation, October 8, 2026. The candidate is built
locally; no release tag, push or RubyGems publication has been made.

## Scope

- #81: canonical normalization and overrides, shared descriptions, independent
  titles, indexing documentation and real pagination/sitemap checks.
- #80: social titles, site name, image properties, per-page languages, locales,
  alternate locales and article properties.
- #72: extracted microdata, optional video metadata and representative article
  images. All five rendered video examples now supply complete metadata.
- #74: chatbot exploration is excluded from this release.

## Local validation

- [x] Build `chulapa-jekyll-2.1.0.gem` with all new theme snippets included.
- [x] Install the built gem in a temporary directory and use that installation
  to render a site, without copying the theme includes into the site.
- [x] Verify three real paginated blog pages, their canonical/Open Graph URLs,
  crawlable navigation and sitemap entries, at root and with `baseurl`.
- [x] Build the complete documentation site using the installed gem and verify
  the five video examples and generated CSS.
- [x] Check canonical overrides across HTML, Open Graph, JSON-LD, breadcrumbs,
  microformats, Atom and RSS. Preserve the original Atom content base URL.
- [x] Check explicit sitemap exclusions and independent robots/search settings.
- [x] Run metadata, locale, article image, microdata, video example, minimal
  header and JavaScript regression checks.

Additional local validation completed on October 8, 2026:

- [x] Run SEO, head, social, locale/article, article image, microdata and video
  example checks with Jekyll 3.10.0 on Ruby 3.4.11.
- [x] Install the candidate gem temporarily with Jekyll 3.10.0 and build the
  complete documentation, CSS and root/subdirectory pagination fixtures.
- [x] Exercise all five video examples in the browser: both deferred YouTube
  variants, the direct YouTube embed, the local MP4 and Internet Archive MP4.
  The local MP4 advanced beyond 29 seconds and the external MP4 beyond 44 seconds.
  Use the same hostname for the preview page and its local media: the integrated
  browser showed a playback failure with a `127.0.0.1` page and `localhost` media,
  while the `localhost` page played the file correctly.

Reproduce these checks using the commands in `test/README.md`. The installation
check uses already-installed dependencies and does not install the theme into
the user's global gem directory. It builds documentation with Jekyll 4.4.1;
Jekyll 3.10.0 was also checked with a separate compatibility bundle. This does
not constitute a full Jekyll 3.x or Ruby version compatibility matrix.

## External validation

- [x] Schema.org Validator: the five extracted `VideoObject` entities report
  zero errors and zero warnings in code mode.

- [x] [New video metadata, submitted as code](https://search.google.com/test/rich-results/result?id=X8ek7bjYmSf5Pyl-5H0peQ): five valid video items, with no reported critical or optional-field issues.
- [x] [Published Welcome article](https://search.google.com/test/rich-results/result?id=WQOb2bKbj1EEQU0V7OAFsA): one valid article and one valid breadcrumb item.
- [x] Check that the published article/social images and the YouTube/Internet
  Archive thumbnails respond successfully with image content types.
- [x] [Current published documentation](https://search.google.com/test/rich-results/result?id=CXLGFuCyeT9W2Hm_FOJC7w): one valid breadcrumb item and five invalid videos. This is the older deployed version; it does not include the complete metadata added locally.

The code test validates the metadata extracted from generated examples, not
remote accessibility of new local assets or video indexing eligibility. Repeat
URL validation after deployment. A passing test does not guarantee search
appearance or identical cards across social platforms.

## Publication checklist

- [x] Set the gem version and HTML theme marker to 2.1.0.
- [x] Set both development version labels to v2.1.0.
- [x] Keep latest release labels and pinned installation examples at v2.0.1
  until the new release is actually published.
- [x] Confirm `chulapa-101` uses `remote_theme: dieghernan/chulapa` without a
  pinned tag, so its configuration needs no version bump.
- [ ] Commit and review all changes, including the new snippets and thumbnail.
- [ ] Push the reviewed changes and validate the deployed documentation.
- [ ] Check actual social previews for representative published pages.
- [ ] Tag and publish v2.1.0, publish the gem and finalize the changelog date.
- [ ] Update both latest release labels and pinned installation examples.
- [ ] Recheck #72, #80 and #81 against the deployed results before closing them.
