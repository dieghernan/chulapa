# Chulapa 2.2.0 release notes draft

Status: version 2.2.0 and the original notes were approved on 16 October 2026
for preparation only. This revised draft includes subsequent #164–#176 delivery work and the Flatly follow-up
and is pending maintainer review; the historical approval does not approve
these additions. Not published.

## New capabilities

- Opt-in Mermaid diagrams, PhotoSwipe gallery viewers and production-only GoatCounter analytics.
- Optional light/dark/auto selector across all navigation styles, with remembered preferences and the selected skin applied on initial load (#165).
- Add original Bootswatch skin choices and consistent skin previews/activation guidance. Keep the component-demo selector distinct from actual site switching.
- Active-section indicators for in-page, sidebar and kramdown tables of contents.
- Microformats2 feeds for archive, category and tag indexes.
- Four minimal starter examples and a revised task-oriented documentation directory, alongside the ready-to-publish Chulapa 101 template.

## Fixes and improvements

- Correct Cactus conversation identifiers without path collisions and include project-site paths in Welcomments submissions (#125).
- Honor hidden dates in tag/category cloud entries (#154) and recommendation cards, fix badge destinations containing `demo` and correct configured image/index sorting.
- Keep default-layout headings inside main, exclude theme TOCs from editorial Microformats content and restore keyboard access to available Previous/Next document links.
- Improve GitDev and bundled-skin contrast while preserving original primary colors; correct Flatly alert text/link contrast. Recorded skin/component exceptions remain, so this is not a whole-site contrast guarantee.
- Improve keyboard navigation, focus visibility, reduced-motion behavior, carousel controls, video names and local-search feedback.
- Improve deferred YouTube activation and provide a link when JavaScript is disabled.
- Keep skin switching available when verified, complete stylesheets encounter unavailable Google Fonts imports; retain safe fallback for missing or unverified essential CSS (#168).
- Separate pinned, licensed TopHat/Bootswatch Sass sources from Chulapa adapters; generated files ship in the gem without extra user tools.
- Share search, navigation and rendering helpers; retain supported settings and existing custom hooks.
- Strengthen documentation-assistant topic selection, complete-recipe checks and usable source citations. Known content-TOC and guide-discovery answer limitations remain; technical checks do not certify general answer accuracy.

## Upgrade checks

- Back up the site and review local layouts, includes and assets: local copies override the upgraded theme.
- Record and verify existing Cactus conversation IDs before changing adapters. The new ID mapping does not migrate Matrix conversations.
- Verify Welcomments form permalinks include the project `baseurl` and that saved comments match existing posts.
- Rebuild and publish all generated theme/highlighter CSS together. Older or custom replacement sheets without the expected final completion marker cannot be verified for switching; the controller retains the safe appearance. Custom replacements must keep that marker as the last rule.
- Custom CSS loaders/overrides must use `assets/css/dark/highlighter.css` for the alternate highlighter; the unpublished legacy path is removed. Rebuild and publish the stylesheet pair together.
- Check custom skin link/focus contrast and navbar dropdown styling. Carousel and dropdown controls now use native buttons.
- Review manually written links to old `dmo` fragments for tag/category names containing `demo`.
- Equal-score recommendations with identical dates may appear in a different order.
- Verify gallery ordering, installed theme version, public paths, feeds and enabled integrations after updating.

## Compatibility and limits

The declared gem dependency is Jekyll >=3.7 and <5.0. Release validation targets Jekyll 3.10.0 and 4.4.1, not every version in that range. External services retain their own requirements and availability. Cusdis upstream is archived; its guide is only for an existing working self-hosted deployment.

Accessibility checks are representative, not WCAG certification. The theme supplies no service worker or offline cache; a favicon manifest does not establish PWA installability. Live comment posting/migration and chatbot answer quality are not established by builds or deployments.

A visible-focus limitation on the selector is recorded in #175 and remains to
be triaged before the final release decision; this draft does not claim it fixed.

## Publication gate

Version 2.2.0 remains the approved target. Review and approve this revised draft,
including the latest skin/catalog/provenance additions and the Flatly follow-up, and obtain separate publication authorization
before proceeding. Finalize the release date, remove the `unreleased` marker and reconcile public development labels/data with the published release. Build and verify the final gem, create the reviewed tag, publish the gem and GitHub release, then verify Pages and Worker deployment separately. Do not publish the current candidate artifact as a final release: its HTML marker and changelog intentionally identify it as unreleased.
