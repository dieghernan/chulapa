# Pending evaluation batches: 16 October 2026

155 catalog cases; 56 recorded baseline responses; 56 reviewed. Evaluated source: dd9e23b90; Worker: 64ee01ab-3f43-4d32-b90b-df0264e04cfb. 2 reviewed passes; **153 cases need an initial request or a reviewed-unavailable retry**. These results belong to that evaluated revision, not later local changes. Evidence: [review](validation-dd9e23b90-review.json).

Each planned batch contains at most four independent questions. Commands run from docs/ai-chatbot and consume quota; none were executed to generate this plan. Generated run names include the candidate revision and skip existing run files. Verify the deployed revision first and preserve raw outputs. Unavailable results are retryable plans, not automatic quota-consuming retries. Recheck account allowance before any batch.

Do not execute all three lists: they overlap. Start with a small candidate-regression batch; expand only after reviewing it. The unfinished baseline list records coverage gaps, not a requirement to spend quota on the old revision. Candidate-complete is the eventual full matrix.

## Candidate regressions

| Batch | Case IDs | State |
| --- | --- | --- |
| candidate-regression-01 | `layouts-random-singleton-1`, `layouts-include-cache-1`, `layouts-head-formatting-1`, `layouts-microformats-nested-feed-1` | not_run |
| candidate-regression-02 | `config-author-profile-1`, `layouts-label-headings-1`, `layouts-microformats-1`, `installation-1` | not_run |
| candidate-regression-03 | `installation-2`, `installation-3`, `configuration-3`, `search-comments-2` | not_run |
| candidate-regression-04 | `search-comments-3`, `search-comments-4`, `search-comments-5`, `search-comments-6` | not_run |
| candidate-regression-05 | `theming-4`, `theming-5`, `layouts-1`, `layouts-2` | not_run |
| candidate-regression-06 | `layouts-4`, `layouts-5`, `layouts-6`, `snippets-1` | not_run |
| candidate-regression-07 | `snippets-4`, `snippets-6`, `faq-1`, `faq-2` | needs_request |
| candidate-regression-08 | `faq-4`, `faq-5`, `faq-6`, `reference-edge-cases-1` | not_run |
| candidate-regression-09 | `reference-edge-cases-2`, `reference-edge-cases-3` | not_run |

## No completed baseline response

| Batch | Case IDs | State |
| --- | --- | --- |
| baseline-unfinished-01 | `migration-theme-1`, `seo-1`, `seo-2`, `seo-3` | no_completed_record |
| baseline-unfinished-02 | `seo-4`, `navigation-1`, `navigation-2`, `navigation-3` | no_completed_record |
| baseline-unfinished-03 | `layouts-7`, `variables-1`, `variables-2`, `variables-3` | no_completed_record |
| baseline-unfinished-04 | `variables-unsupported`, `mermaid-1`, `starter-1`, `starter-2` | no_completed_record |
| baseline-unfinished-05 | `accessibility-1`, `resources-1`, `toc-active-section`, `photoswipe-gallery` | no_completed_record |
| baseline-unfinished-06 | `goatcounter-analytics`, `collection-filename-order`, `javascript-resource-fallbacks`, `custom-search-script-dependencies` | no_completed_record |
| baseline-unfinished-07 | `assistant-session-history`, `semantic-html-accessibility`, `carousel-accessibility-motion`, `sidebar-accessibility-focus` | no_completed_record |
| baseline-unfinished-08 | `pwa-offline-status`, `beginner-post-1`, `beginner-image-1`, `beginner-publishing-1` | no_completed_record |
| baseline-unfinished-09 | `snippet-parameter-reference`, `navigation-edit-existing-1`, `footer-edit-existing-1`, `search-fusejs-setup-1` | no_completed_record |
| baseline-unfinished-10 | `comments-giscus-setup-1`, `search-no-navbar-links-1`, `site-details-edit-1`, `content-post-1` | no_completed_record |
| baseline-unfinished-11 | `content-page-1`, `content-image-1`, `analytics-goat-setup-1`, `analytics-ga4-setup-1` | no_completed_record |
| baseline-unfinished-12 | `related-card-dates-1`, `install-remote-task-1`, `install-gem-task-1`, `appearance-skin-task-1` | no_completed_record |
| baseline-unfinished-13 | `appearance-font-task-1`, `appearance-auto-task-1`, `appearance-sass-task-1`, `media-gallery-task-1` | no_completed_record |
| baseline-unfinished-14 | `media-carousel-task-1`, `media-photoswipe-task-1`, `media-video-task-1`, `media-diagram-task-1` | no_completed_record |
| baseline-unfinished-15 | `provider-lunr-task-1`, `provider-simplesearch-task-1`, `provider-google-task-1`, `provider-algolia-task-1` | no_completed_record |
| baseline-unfinished-16 | `comments-disqus-task-1`, `comments-cactus-task-1`, `comments-welcomments-task-1`, `comments-cusdis-task-1` | no_completed_record |
| baseline-unfinished-17 | `troubleshoot-publishing-task-1`, `troubleshoot-yaml-task-1`, `custom-head-task-1`, `migration-fields-lookup-1` | no_completed_record |
| baseline-unfinished-18 | `accessibility-task-reference-1`, `format-alert-task-1`, `format-caption-task-1`, `format-footnote-task-1` | no_completed_record |
| baseline-unfinished-19 | `favicon-task-1`, `bundled-font-task-1`, `icon-task-1`, `version-task-1` | no_completed_record |
| baseline-unfinished-20 | `feed-coexistence-1`, `feed-selection-1`, `feed-collection-output-1`, `content-toc-task-1` | no_completed_record |
| baseline-unfinished-21 | `person-publisher-task-1`, `localized-date-task-1`, `canonical-article-task-1`, `cloud-task-1` | no_completed_record |
| baseline-unfinished-22 | `sharing-task-1`, `search-visibility-task-1`, `cloud-demo-fragments`, `starter-demo-versus-site` | no_completed_record |
| baseline-unfinished-23 | `documentation-appearance-topics`, `documentation-content-publishing-topics`, `second-photo-tutorial-1`, `documentation-search-topics` | no_completed_record |
| baseline-unfinished-24 | `documentation-installation-topics`, `documentation-identity-topics`, `community-1`, `community-2` | no_completed_record |
| baseline-unfinished-25 | `community-3`, `community-4`, `community-5` | no_completed_record |

## Full candidate matrix

| Batch | Case IDs | State |
| --- | --- | --- |
| candidate-complete-01 | `layouts-random-singleton-1`, `layouts-include-cache-1`, `layouts-head-formatting-1`, `layouts-microformats-nested-feed-1` | not_run |
| candidate-complete-02 | `layouts-microformats-feed-1`, `config-author-profile-1`, `layouts-label-headings-1`, `layouts-microformats-1` | not_run |
| candidate-complete-03 | `installation-1`, `installation-2`, `installation-3`, `installation-4` | not_run |
| candidate-complete-04 | `installation-5`, `installation-6`, `configuration-1`, `configuration-2` | not_run |
| candidate-complete-05 | `configuration-3`, `configuration-4`, `configuration-5`, `configuration-6` | not_run |
| candidate-complete-06 | `search-comments-1`, `search-comments-2`, `search-comments-3`, `search-comments-4` | not_run |
| candidate-complete-07 | `search-comments-5`, `search-comments-6`, `theming-1`, `theming-2` | not_run |
| candidate-complete-08 | `theming-3`, `theming-4`, `theming-5`, `theming-6` | not_run |
| candidate-complete-09 | `layouts-1`, `layouts-2`, `layouts-3`, `layouts-4` | needs_request |
| candidate-complete-10 | `layouts-5`, `layouts-6`, `snippets-1`, `snippets-2` | not_run |
| candidate-complete-11 | `snippets-3`, `snippets-4`, `snippets-5`, `snippets-6` | needs_request |
| candidate-complete-12 | `faq-1`, `faq-2`, `faq-3`, `faq-4` | not_run |
| candidate-complete-13 | `faq-5`, `faq-6`, `reference-edge-cases-1`, `reference-edge-cases-2` | not_run |
| candidate-complete-14 | `reference-edge-cases-3`, `reference-edge-cases-4`, `reference-edge-cases-5`, `reference-edge-cases-6` | not_run |
| candidate-complete-15 | `migration-theme-1`, `seo-1`, `seo-2`, `seo-3` | not_run |
| candidate-complete-16 | `seo-4`, `navigation-1`, `navigation-2`, `navigation-3` | not_run |
| candidate-complete-17 | `layouts-7`, `variables-1`, `variables-2`, `variables-3` | not_run |
| candidate-complete-18 | `variables-unsupported`, `mermaid-1`, `starter-1`, `starter-2` | not_run |
| candidate-complete-19 | `accessibility-1`, `resources-1`, `toc-active-section`, `photoswipe-gallery` | not_run |
| candidate-complete-20 | `goatcounter-analytics`, `collection-filename-order`, `javascript-resource-fallbacks`, `custom-search-script-dependencies` | not_run |
| candidate-complete-21 | `assistant-session-history`, `semantic-html-accessibility`, `carousel-accessibility-motion`, `sidebar-accessibility-focus` | not_run |
| candidate-complete-22 | `pwa-offline-status`, `beginner-post-1`, `beginner-image-1`, `beginner-publishing-1` | not_run |
| candidate-complete-23 | `snippet-parameter-reference`, `navigation-edit-existing-1`, `footer-edit-existing-1`, `search-fusejs-setup-1` | not_run |
| candidate-complete-24 | `comments-giscus-setup-1`, `search-no-navbar-links-1`, `site-details-edit-1`, `content-post-1` | not_run |
| candidate-complete-25 | `content-page-1`, `content-image-1`, `analytics-goat-setup-1`, `analytics-ga4-setup-1` | not_run |
| candidate-complete-26 | `related-card-dates-1`, `install-remote-task-1`, `install-gem-task-1`, `appearance-skin-task-1` | not_run |
| candidate-complete-27 | `appearance-font-task-1`, `appearance-auto-task-1`, `appearance-sass-task-1`, `media-gallery-task-1` | not_run |
| candidate-complete-28 | `media-carousel-task-1`, `media-photoswipe-task-1`, `media-video-task-1`, `media-diagram-task-1` | not_run |
| candidate-complete-29 | `provider-lunr-task-1`, `provider-simplesearch-task-1`, `provider-google-task-1`, `provider-algolia-task-1` | not_run |
| candidate-complete-30 | `comments-disqus-task-1`, `comments-cactus-task-1`, `comments-welcomments-task-1`, `comments-cusdis-task-1` | not_run |
| candidate-complete-31 | `troubleshoot-publishing-task-1`, `troubleshoot-yaml-task-1`, `custom-head-task-1`, `migration-fields-lookup-1` | not_run |
| candidate-complete-32 | `accessibility-task-reference-1`, `format-alert-task-1`, `format-caption-task-1`, `format-footnote-task-1` | not_run |
| candidate-complete-33 | `favicon-task-1`, `bundled-font-task-1`, `icon-task-1`, `version-task-1` | not_run |
| candidate-complete-34 | `feed-coexistence-1`, `feed-selection-1`, `feed-collection-output-1`, `content-toc-task-1` | needs_request |
| candidate-complete-35 | `person-publisher-task-1`, `localized-date-task-1`, `canonical-article-task-1`, `cloud-task-1` | not_run |
| candidate-complete-36 | `sharing-task-1`, `search-visibility-task-1`, `cloud-demo-fragments`, `starter-demo-versus-site` | not_run |
| candidate-complete-37 | `documentation-appearance-topics`, `documentation-content-publishing-topics`, `second-photo-tutorial-1`, `documentation-search-topics` | needs_request |
| candidate-complete-38 | `documentation-installation-topics`, `documentation-identity-topics`, `community-1`, `community-2` | not_run |
| candidate-complete-39 | `community-3`, `community-4`, `community-5` | not_run |

## Candidate responses pending review

None.

## Recorded but not reviewed

None.

Machine-readable entries, source paths and proposed commands: [JSON register](pending-batches-2026-10-16.json).
