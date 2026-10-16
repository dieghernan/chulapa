# Chulapa 2.2.0 release notes draft

Status: version 2.2.0 and these notes approved on 16 October 2026 for a preparation PR; not published.

## New capabilities

- Opt-in Mermaid diagrams, PhotoSwipe gallery viewers and production-only GoatCounter analytics.
- Active-section indicators for in-page, sidebar and kramdown tables of contents.
- Microformats2 feeds for archive, category and tag indexes.
- Four minimal starter examples and a revised task-oriented documentation directory, alongside the ready-to-publish Chulapa 101 template.

## Fixes and improvements

- Correct Cactus conversation identifiers without path collisions and include project-site paths in Welcomments submissions (#125).
- Honor hidden dates in tag/category cloud entries (#154) and recommendation cards, fix badge destinations containing `demo` and correct configured image/index sorting.
- Improve keyboard navigation, focus visibility, reduced-motion behavior, carousel controls, video names and local-search feedback.
- Improve deferred YouTube activation and provide a link when JavaScript is disabled.
- Share search, navigation and rendering helpers; retain supported settings and existing custom hooks.

## Upgrade checks

- Back up the site and review local layouts, includes and assets: local copies override the upgraded theme.
- Record and verify existing Cactus conversation IDs before changing adapters. The new ID mapping does not migrate Matrix conversations.
- Verify Welcomments form permalinks include the project `baseurl` and that saved comments match existing posts.
- Check custom skin link/focus contrast and navbar dropdown styling. Carousel and dropdown controls now use native buttons.
- Review manually written links to old `dmo` fragments for tag/category names containing `demo`.
- Equal-score recommendations with identical dates may appear in a different order.
- Verify gallery ordering, installed theme version, public paths, feeds and enabled integrations after updating.

## Compatibility and limits

The declared gem dependency is Jekyll >=3.7 and <5.0. Release validation targets Jekyll 3.10.0 and 4.4.1, not every version in that range. External services retain their own requirements and availability. Cusdis upstream is archived; its guide is only for an existing working self-hosted deployment.

Accessibility checks are representative, not WCAG certification. The theme supplies no service worker or offline cache; a favicon manifest does not establish PWA installability. Live comment posting/migration and chatbot answer quality are not established by builds or deployments.

## Publication gate

Version 2.2.0 and these notes are approved. Obtain separate publication authorization before proceeding. Finalize the release date, remove the `unreleased` marker and reconcile public development labels/data with the published release. Build and verify the final gem, create the reviewed tag, publish the gem and GitHub release, then verify Pages and Worker deployment separately. Do not publish the current candidate artifact as a final release: its HTML marker and changelog intentionally identify it as unreleased.
