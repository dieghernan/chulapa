# Release 2.1.0

Release preparation and validation, October 8, 2026. The candidate is built
locally. Commit `64b88f51b` was pushed to `main` and deployed successfully;
GitHub release v2.1.0 is finalized on October 8, 2026. RubyGems publication
remains pending and will be performed by the maintainer.

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

- [x] Prepare the [GitHub release](https://github.com/dieghernan/chulapa/releases/tag/v2.1.0)
  from the final release commit, with release notes, the built gem and its
  SHA-256 file.

- [x] Set the gem version and HTML theme marker to 2.1.0.
- [x] Set both development version labels to v2.1.0.
- [x] Confirm `chulapa-101` uses `remote_theme: dieghernan/chulapa` without a
  pinned tag, so its configuration needs no version bump.
- [x] Commit and review all changes, including the new snippets and thumbnail.
- [x] Push the reviewed changes and validate the deployed documentation.
- [x] Check simulated social previews for the published Welcome article with
  OpenGraph.xyz; direct platform caches have not been tested.
- [x] Tag and publish v2.1.0 on GitHub and finalize the changelog date.
- [ ] Publish the gem on RubyGems (maintainer).
- [x] Update both latest release labels and pinned installation examples.
- [x] Recheck #72, #80 and #81 against the deployed results and close them with
  implementation and validation comments.

## Published validation in Chrome

Validated October 8, 2026 after deployment of `64b88f51b`:

- All four GitHub workflows completed successfully.
- [Documentation URL in Google Rich Results Test](https://search.google.com/test/rich-results/result?id=MBjJxgJ6zRAatfZrMh0PEA): five valid videos and one valid breadcrumb.
- Schema.org Validator fetched the documentation URL: 65 items, zero errors
  and zero warnings, including five videos and 57 images.
- [Welcome article URL in Google Rich Results Test](https://search.google.com/test/rich-results/result?id=GloMyQr4bJU98ft0wyPxMg): one valid article and one valid breadcrumb.
- Both published MP4 files and all three YouTube examples played in Chrome;
  the deferred players retained the five video metadata entities.
- Canonical/Open Graph URLs agree on the checked documentation and article.
  The article emits its publication date, tags and representative image.
- The search page emits `noindex, follow`. The skins grid has 41 sibling
  columns, no nested columns and no broken images in the checked state.
- OpenGraph.xyz rendered Facebook and X previews with the article title and
  photograph. Its inspector reported design recommendations: a 714x390 image
  rather than 1200x630, a short title and no marketing text in the photograph.
  These do not indicate missing or invalid metadata. Platform-specific caches
  and actual social posts were not tested.
