# Installation topic navigation delivery

Date: 16 October 2026. Baseline: main `a7af9ac81`, after merged PR #152.
Delivery: [PR #153](https://github.com/dieghernan/chulapa/pull/153).
Branch: `codex/docs-installation-topic-navigation`.
Status: reviewed and implemented locally; PR/CI/merge/deployment pending.

## Page dispositions and scope

Review the seven existing installation/migration/starter/version pages from the
execution plan: 01, 07, 08, 09, 20, 21 and 55. All receive `docs` and
`installation`, visible badges and the existing `/docs/tags` destination.

Installation 01 is already a concise method directory. Retain its table and
precise links without adding a redundant related widget or explicit false flag.
The other six pages enable existing related cards. Starter Reference/How-To
08/09 share `starter-examples`; migration, remote theme, gem and version checks
07/20/21/55 share `theme-updates`. These are task topics, not public Diataxis
classification labels. Methods are alternatives, not a prescribed sequence.

Bodies, fenced examples, prerequisites, local-override cautions, publishing
steps, version caveats, public URLs and inline links are unchanged. First-site
and second-photo tutorials retain their explicit progression. No new extraction,
page, theme template, ranking mechanism or configuration option is introduced.

## Rendered recommendations

Actual selections agree at 320 and 1280 CSS pixels:

| Existing guide | Related documentation |
| --- | --- |
| 01-install | No related widget; existing method directory retained |
| 07-migration | Install using a remote theme; Check which theme version your site uses; Install using the theme gem |
| 08-starter-examples | Run and publish a starter example; Installation; Check which theme version your site uses |
| 09-run-starter | Starter examples reference; Installation; Check which theme version your site uses |
| 20-remote-theme | Migrating from another Jekyll theme; Check which theme version your site uses; Install using the theme gem |
| 21-gem-theme | Migrating from another Jekyll theme; Check which theme version your site uses; Install using a remote theme |
| 55-check-theme-version | Migrating from another Jekyll theme; Install using the theme gem; Install using a remote theme |

The paired starter pages rank first for each other; general installation and
version checking supplement them. Migration/update pages lead to compatible
setup/reference tasks. The directory remains an eligible card destination
without displaying its own widget. The existing three-card cap and equal-score
date ordering are unchanged; this is inspected selection, not human usability.

## Verification and limits

- Jekyll 4.4 docs build passes with the configured remote theme.
- `npm test`: all 40 chatbot unit/build tests pass; 154 catalog IDs are unique.
- Edge checks seven pages at 320/1280 px: all badges present, six three-card
  widgets and no widget on Installation; no self cards, card dates or horizontal
  document overflow. Desktop/mobile remote-theme and starter screenshots read
  correctly using existing styles.
- Focused card and installation topic badge activate with Enter. Topic groups
  exist and Docs/blog topic entries remain separate.
- All 38 checked card/topic destinations/fragments resolve. Bodies compare
  unchanged against the baseline after newline normalization. UTF-8 and new
  mojibake checks plus `git diff --check` pass.

Update the partial index, `llms.txt`, selective topic summary and one focused
navigation evaluation case. Context is 46,972/47,000 bytes on Windows, with no
budget increase or runtime/renderer change. Existing installation/starter/migration
cases remain accurate; historical answer evaluations and scores are untouched.

Accessibility review covers affected native-link keyboard operation and reflow,
not full compliance or assistive-technology testing. Existing guide titles,
SEO fields and canonical URLs remain unchanged; no manifest, service worker,
cache or offline change, and no PWA-readiness claim. Documentation navigation
needs no reusable-theme changelog entry.

No live provider/model requests, human study or manual Worker deployment.
Context rollout requires an approved merge and separate verification of the
existing Pages-gated workflow. Technical checks do not prove chatbot precision
or human task completion. Next bounded group: navigation, identity and branding
(10, 11, 14, 52, 53, 54, 60), with the archived draft used selectively as reference.
Issue #125 remains separate runtime work before release.
