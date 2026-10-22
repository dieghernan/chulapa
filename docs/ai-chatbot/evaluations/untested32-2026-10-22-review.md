# Previously untested catalog cases — 22 October 2026

The 32 cases that had blank rows in the consolidated log were evaluated in
three separate runs: 10, 10 and 12 cases. All 32 requests returned HTTP 200.
Each answer below was reviewed against its catalog criteria and the current
documentation; HTTP 200 alone is not a pass.

Worker version: `15036755-2e9b-4112-8c0a-01b9348d7c62` (100% traffic)  
Response window: `2026-10-22T12:12:07Z` to `2026-10-22T12:20:30Z`

Raw evidence: [batch 1](untested-batch1-2026-10-22.jsonl),
[batch 2](untested-batch2-2026-10-22.jsonl) and
[batch 3](untested-batch3-2026-10-22.jsonl). Machine-readable findings:
[review JSON](untested32-2026-10-22-review.json).

## Batch 1

**10 requests:** 1 pass, 7 partial, 2 fail, 0 unavailable.

| Case | Review | Finding |
| --- | --- | --- |
| `footer-edit-existing-1` | partial | Gives the correct additive `footer.links` entry and preserves existing links/copyright, but the verification is vague and does not tell the reader to follow the contact link after publication. |
| `format-caption-task-1` | partial | Shows descriptive alt text, a `relative_url` image, blank line, caption and immediate `.caption` attribute. Omits checking the actual published image/caption. |
| `format-footnote-task-1` | fail | Gives valid footnote syntax but falsely says the context lacks return-link guidance; does not verify the generated backlink or keyboard operation. |
| `favicon-task-1` | partial | Correctly distinguishes project sites and calls for a custom-head hook plus `baseurl`, but omits a complete `relative_url` link, preservation of existing head content and checking the actual icon URL. |
| `feed-coexistence-1` | partial | Correctly distinguishes built-in feeds from `jekyll-feed` and warns about same-path collisions. Omits preserving the existing subscription address and the theme's standard feed links in the document head. |
| `feed-selection-1` | fail | Correctly covers post inclusion and exclusion, but claims a standalone page can be added to the feed with layout/permalink. Ordinary pages outside collections are not selected this way; collection date requirements are also omitted. |
| `feed-collection-output-1` | pass | Correctly distinguishes feed selection from collection publication and gives `output: true` for a collection document. |
| `documentation-content-publishing-topics` | partial | Links relevant task guides and correctly distinguishes blog tags, but omits that topic coverage is partial and the full `/docs` destination. |
| `documentation-installation-topics` | partial | Correctly says installation methods are alternatives and links starter/version material. The generic topic link is mislabeled as a dedicated installation topic, and the method directory and first-site tutorial destinations are missing. |
| `documentation-identity-topics` | partial | Gives relevant favicon, fonts, icons and publisher pages, but omits the full documentation index and that topic coverage is partial. |

## Batch 2

**10 requests:** 2 pass, 7 partial, 1 fail, 0 unavailable.

| Case | Review | Finding |
| --- | --- | --- |
| `install-remote-task-1` | pass | Gives the pinned remote-theme path, preserves dependencies, enables both required plugins, installs dependencies, reviews overrides and retains or adapts the publishing workflow. |
| `install-gem-task-1` | partial | Gives the gem, theme setting, cache plugin, update command and override review, but does not explicitly remove the unused remote-theme plugin or explain how to publish and verify the migrated site. |
| `media-gallery-task-1` | partial | Gives a scoped image group, valid masonry include, filename ordering and published check. Omits the required v2.2.0 limitation for filename sorting and the instruction to append only to an existing defaults list. |
| `media-carousel-task-1` | partial | Correctly uses `interval=0` and explains the play/pause control behavior, but omits the v2.2.0 keyboard-control limitation and the requested keyboard check. |
| `media-photoswipe-task-1` | pass | Correctly identifies the v2.2.0 requirement, the `photoswipe=true` include parameter, upgrade path and published lightbox check. |
| `media-video-task-1` | partial | Correctly explains the video include, `nolazy`, browser lazy loading and v2.2.0 accessible names/fallback. Omits that click-to-load is the default activation behavior. |
| `media-diagram-task-1` | partial | Correctly covers the boolean setting, fenced diagram, version and accessibility labels, but omits the supported layout/plugin boundaries and visible source fallback behavior. |
| `migration-fields-lookup-1` | fail | Links the reference and distinguishes Algolia exclusions, but incorrectly says `include_on_search: false` affects ranking rather than local-index inclusion and provides none of the requested field mappings. |
| `icon-task-1` | partial | Gives an accessible decorative icon example and supported Font Awesome version settings, but omits placement below front matter, avoiding duplicate loaders and verifying blocked resources/published output. |
| `localized-date-task-1` | partial | Gives a valid Spanish date include and correctly says `locale` is not a full UI translation, but omits supported languages and date-format limitations. |

## Batch 3

**12 requests:** 2 pass, 6 partial, 4 fail, 0 unavailable.

| Case | Review | Finding |
| --- | --- | --- |
| `search-fusejs-setup-1` | partial | Correctly configures Fuse.js at `/find`, requires a matching search page and handles `baseurl`, but omits a concrete page example and published known-title verification. |
| `search-no-navbar-links-1` | pass | Correctly distinguishes the provider, search page and classic/desktop-dual navigation link, with a usable menu entry and publication check. |
| `site-details-edit-1` | partial | Correctly preserves URLs, edits the existing home page and protects author fields, but omits the publishing-branch/Actions workflow and browser-title/home-heading verification. |
| `related-card-dates-1` | pass | Correctly uses existing `show_date: false` on candidate documents/defaults and states that reading time remains visible. |
| `provider-simplesearch-task-1` | partial | Correctly says no hosted account is needed and gives provider/page configuration. Omits preserving existing settings, a published result/clear check and a direct setup guide. |
| `provider-google-task-1` | fail | Correctly says a Jekyll rebuild does not upload pages to Google, but omits `search.provider: google`, the matching search page and any actionable verification. |
| `provider-algolia-task-1` | partial | Correctly separates public and indexing keys, explains exclusions, plugin setup and upload verification, but omits the required application/index/public-key configuration and matching search page. |
| `troubleshoot-publishing-task-1` | partial | Gives useful branch, Actions, Pages address and date/build checks, but omits checking the actual permalink and restarting local Jekyll after config edits. |
| `troubleshoot-yaml-task-1` | fail | Responds with unrelated skin-switch instructions instead of diagnosing the failed file/line, YAML structure or duplicate mappings. |
| `sharing-task-1` | fail | Adds `header_img` despite the request not to change the visible article and shows unquoted Liquid expressions in YAML, making the example invalid. It also misses the upload and source/URL verification steps. |
| `search-visibility-task-1` | fail | Covers crawler `noindex`, sitemap and Algolia, but omits `include_on_search: false` for local indexes and says only that local exclusions do not control Google; the requested local exclusion is not provided. |
| `starter-demo-versus-site` | partial | Correctly distinguishes starter material from installation and links first-site/remote-theme guides, but omits the `/docs/09-run-starter` setup, its Jekyll/Gemfile limitations and the lack of an included deployment workflow. |

**Overall:** 5 pass, 20 partial, 7 fail, 0 unavailable. This is evidence for
the identified Worker version only; it does not establish general chatbot
accuracy or repeatability.
