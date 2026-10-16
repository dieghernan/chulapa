# Hooks, mappings, feeds and metadata topic delivery

Date: 16 October 2026. Baseline: main `9663b7375`, after merged #156.
Branch: `codex/docs-extension-topic-navigation`.
Delivery: [PR #157](https://github.com/dieghernan/chulapa/pull/157).
Status: open; local checks passed; CI, review, merge and deployment pending.

## Scope and decisions

Review seven existing pages: 44, 45, 46, 56, 57, 62 and 63. Use existing topic
badges, `/docs/tags` and related widgets. Guide bodies, titles, examples, inline
links and version caveats remain unchanged. No extraction, public Diataxis
labels, new YAML options, template/ranking changes or runtime work.

- 44/45: `docs, custom-hooks`, connecting the editing task and insertion-point
  reference. Each has one relevant card; no artificial third candidate.
- 46: `docs, installation, theme-updates`, connecting migration field lookup to
  the procedure, installed version and installation methods. The mapping is not
  an automatic conversion or a promise about another theme.
- 56/57: `docs, feeds`, one reciprocal card each. Built-in Atom/RSS and jekyll-feed
  can coexist at distinct addresses; keep existing subscribers and avoid output
  collisions. Explicit inline reference links remain authoritative.
- 62: `docs, publishing`, connecting the canonical task to article publication
  and sharing metadata. Preserve canonical-versus-redirect/sitemap distinctions.
- 63: `docs, navigation`, connecting post indexes with site navigation settings.
  Keep the exact layout reference and menu task links for implementation details;
  broader site identity is supplementary navigation guidance, not a prerequisite.

The partial topics index and `llms.txt` coverage summary now include hooks and
feeds, with analytics/feed coexistence explicit. The selective chatbot context
updates only its topic summary, within the unchanged 47,000-byte budget. Existing
hook, migration, feed, canonical and cloud evaluation cases cover unchanged facts
and sources; no duplicate case is needed. No context deployment/live inference.

## Rendered recommendations

Cards agree at 320 and 1280 CSS pixels. Include the 15 existing installation,
publication and navigation pages whose candidate pools can change:

| Guide | Related documentation |
| --- | --- |
| 44-custom-head | Custom hooks reference |
| 45-custom-hooks | Add custom HTML to the page head |
| 46-migration-fields | Migrating from another Jekyll theme; Check which theme version your site uses; Install using the theme gem |
| 56-publish-feeds | Keep a jekyll-feed subscription address |
| 57-jekyll-feed | Publish posts in the built-in feeds |
| 62-canonical-article | Create and publish a post; Set a postâ€™s sharing text and images; How publishing fits together |
| 63-tag-category-clouds | Global settings; Change your siteâ€™s name and author; Edit footer links |
| 07-migration | Install using a remote theme; Check which theme version your site uses; Migration field mappings |
| 08-starter-examples | Run and publish a starter example; Installation; Check which theme version your site uses |
| 09-run-starter | Starter examples reference; Installation; Check which theme version your site uses |
| 20-remote-theme | Migrating from another Jekyll theme; Check which theme version your site uses; Migration field mappings |
| 21-gem-theme | Migrating from another Jekyll theme; Check which theme version your site uses; Migration field mappings |
| 55-check-theme-version | Migrating from another Jekyll theme; Migration field mappings; Install using the theme gem |
| 10-edit-menu | Global settings; Add tag and category indexes for your posts; Change your siteâ€™s name and author |
| 11-edit-footer | Global settings; Add tag and category indexes for your posts; Change your siteâ€™s name and author |
| 15-create-post | Create a page and link it from the menu; Add a Mermaid diagram; Display an article date in another language |
| 16-create-page | Create and publish a post; Add a Mermaid diagram; Display an article date in another language |
| 42-unpublished-changes | Fix a YAML configuration error; How publishing fits together; Create and publish a post |
| 43-yaml-errors | Find changes missing from your website; How publishing fits together; Create and publish a post |
| 47-publishing-explained | Find changes missing from your website; Fix a YAML configuration error; Create and publish a post |
| 64-post-sharing | Create and publish a post; Point a republished article to its original URL; How publishing fits together |
| 14-site-details | Global settings; Add tag and category indexes for your posts; Identify a personal siteâ€™s publisher |

## Verification and limitations

- Jekyll documentation build passed; chatbot `npm test`: 40 passed.
- 22 unique pages at 320/1280 (44 checks): no horizontal document overflow;
  card counts, Docs-only non-self destinations and absent card dates checked.
- 38 distinct card/topic destinations and fragments resolve in generated HTML.
- Related card and custom-hooks badge focus and Enter activation passed; Docs
  and blog topic entries remain separate. Mobile/desktop screenshots inspected.
- All seven bodies unchanged against baseline; changed files UTF-8 clean,
  existing context budget preserved and historical audit suffix unchanged.

Accessibility review checks readable card reflow and keyboard links, not WCAG
certification. SEO titles, canonical URLs, indexing and structured metadata are
unchanged; added internal destinations resolve. No manifest/service worker change;
there is no built-in service worker, and the Docs favicon manifest alone does not
establish installability or offline support. No live provider requests, human
usability evidence, measured chatbot quality or manual Worker deployment.

#125 comment adapters and #154 cloud-entry dates remain separate release work.
Next bounded group: general reference and accessibility (02, 04, 05, 06, 48 and
the three 99 reference pages). Review page by page; badges/cards are optional,
and an extraction still requires a concrete defect.
