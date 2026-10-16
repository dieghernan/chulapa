# Comments and analytics topic delivery

Date: 16 October 2026. Baseline: main `246aae5a0`, after merged #155.
Branch: `codex/docs-comments-analytics-topics`.
Delivery: [PR #156](https://github.com/dieghernan/chulapa/pull/156).
Status: merged #156; applicable head checks passed, corrected review thread resolved and branch deleted. Deployment separately unverified.

## Scope and decisions

Review seven existing guides: 13, 18, 19 and 38–41. Five comment-provider
guides share `docs, comments`; the two analytics guides retain `docs, analytics`.
Enable existing topic badges and related cards, using `/docs/tags`. Analytics
shows two relevant candidates, including Global settings, without filler.
Comments cards are alternatives, not a recommended installation sequence;
inline provider/reference links and warnings remain authoritative. Archived
Cusdis remains explicitly restricted to an existing self-hosted deployment.

Bodies, titles, examples, links and version caveats are unchanged. Preserve
Cactus/Welcomments workarounds and migration warnings from #125, GoatCounter's
development-version/production caveats and GA4's separate preview behavior.
No template/ranking changes, new options, public type labels or page extractions.

## Rendered recommendations

Actual cards agree at 320 and 1280 CSS pixels:

| Guide | Related documentation |
| --- | --- |
| 13-giscus-comments | Connect Disqus comments; Connect an existing self-hosted Cusdis service; Connect Welcomments |
| 18-goatcounter | Global settings; Enable Google Analytics 4 |
| 19-google-analytics | Global settings; Enable GoatCounter analytics |
| 38-disqus-comments | Enable giscus comments on a post; Connect an existing self-hosted Cusdis service; Connect Welcomments |
| 39-cactus-comments | Enable giscus comments on a post; Connect an existing self-hosted Cusdis service; Connect Welcomments |
| 40-welcomments-comments | Enable giscus comments on a post; Connect an existing self-hosted Cusdis service; Connect Cactus comments |
| 41-cusdis-comments | Enable giscus comments on a post; Connect Welcomments; Connect Cactus comments |

## Verification and boundaries

- `bundle exec jekyll build --incremental`: passed.
- `npm test` in `docs/ai-chatbot`: 40 passed.
- Browser: seven pages at 320/1280, no horizontal document overflow; three
  comments cards or two analytics cards, Docs-only, non-self and no card dates.
- Eleven distinct card/topic destinations and fragments resolve locally.
- Keyboard: related card and comments badge focus and Enter activation checked.
  Docs and blog topic lists remain separate. Mobile/desktop screenshots reviewed.
- Seven guide bodies unchanged against baseline; changed files UTF-8 clean and
  selective context within the existing 47,000-byte budget.
- Topic index and `llms.txt` coverage summaries updated. Selective chatbot context
  changes only its topic-index summary, not provider facts, sources or runtime.
  Existing giscus, Cactus, Welcomments, Cusdis, GA4 and GoatCounter evaluation
  cases already cover unchanged configuration advice; no duplicate case added.

Accessibility review covers readable card reflow and keyboard links, not a WCAG
certification. Titles, canonical routes, indexing and existing metadata remain
unchanged; generated navigation destinations were checked. No manifest/service
worker changes: the theme has no built-in service worker, and the Docs favicon
manifest alone establishes neither installability nor offline support. External
provider interactions, live AI answers and actual deployments were not tested.
No manual Worker deployment or quota-consuming inference was performed.

Cloud-entry fallback dates remain tracked separately in #154; this PR does not
fix or close it. Historical assessments and optional human research remain
separate from these technical/editorial checks. Next bounded block: hooks,
mappings, feeds and metadata tasks (44, 45, 46, 56, 57, 62 and 63).

## PR review follow-up

The review identified an overbroad alternatives statement in the topic index
and chatbot summary. Narrow it to comment providers/setup methods and state
that Google Analytics and GoatCounter can coexist, matching guides 02/18/19.
Strengthen the existing GA4 evaluation expectation rather than add a duplicate
case. Preserve the previous verification record; this wording correction does
not change provider runtime, card selection, URLs, SEO metadata or PWA behavior.

Follow-up validation: Jekyll build and 40 chatbot tests passed; rendered topic
index contains the coexistence clarification. UTF-8, JSON and context budget
checks passed. No live queries or manual Worker deployment.
