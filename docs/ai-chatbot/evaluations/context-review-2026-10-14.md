# Selective context compaction review

## Scope and measurements

Baseline: main after #120, `39abec50e46be3f63d28707e927ded05cb651eaa`.
The reviewed context decreases from **60,973 to 43,287 UTF-8 bytes (29.0%)**.
These are context-file bytes, not model tokens or the complete request size.
The model still receives the entire selective context on every question.

Repeated publishing/restart instructions are consolidated; topic descriptions,
configuration lists and maintenance explanations are shortened. Historical and
implementation narrative is reduced while retaining supported configuration,
defaults, dependency ordering, complete small task examples, release caveats and
advanced troubleshooting facts. All 45 topic headings remain.

The build now rejects context over **45,000 UTF-8 bytes** before writing deployment
artifacts. This is a review budget with modest headroom, not a provider limit or
a reason to delete supported facts. Review future increases explicitly.

## Evidence and limits

- Compared baseline/current source URL sets, normalizing sentence punctuation:
  all **69 distinct Chulapa URLs** remain, including their fragments. This is
  preservation evidence, not a fresh live link check.
- Compared underscore-separated identifiers: all **90 distinct identifiers**
  remain. This lexical check alone cannot establish semantic equivalence.
- Reviewed the context alongside the **112 unchanged evaluation cases** (57 core,
  50 extra, 5 community). Retained high-risk subjects include pinned-version
  limitations; author versus publisher; search provider exclusions; same-domain
  canonical analytics; include-cache scope; HTML compression; nested microformats;
  snippet defaults; carousel keyboard/motion; related-card dates; and PWA limits.
  This is editorial review, **not 112 successful model answers**.
- `npm test`: **40 passed**, zero failed/skipped. Includes normal bundle/context
  equality, existing Worker/widget tests and two build integration tests: reject
  oversized multibyte context without artifacts; accept the exact byte boundary
  without truncating the embedded context.
- A live baseline question about GoatCounter on v2.1.0 was attempted through the
  configured proxy. CONNECT failed with HTTP 403 before reaching the Worker
  (`curl` exit 56, HTTP 000). Its elapsed time is not inference latency. No live
  baseline/candidate answer comparison or latency improvement is established.

The model, inference parameters, prompt policy, request handling and widget are
unchanged. No retrieval, streaming or conversation-history changes are included.
Public documentation and URLs are unchanged; `llms.txt` needs no new entry for
this internal review. No accessibility, SEO or PWA behavior changes are introduced.

## Deployment and follow-up

This candidate has not been deployed. Merge triggers the existing deployment
workflow after its matching Pages publication. The baseline #120 Pages run passed;
its Worker deployment stopped at the Pages wait step. Retrying after Pages
completed failed at the same step; Cloudflare deployment was skipped. Log downloads
are also proxy-blocked, so the underlying wait failure remains undiagnosed. This
PR does not claim #120 context is live or change the deployment gate.

When endpoint access is available, compare the same questions on baseline and
candidate with fixed model settings. Run the focused version/appearance/search/
SEO/snippet cases first, then the full suite within Workers AI rate limits.
Review factual completeness, runnable code and exact citations independently of
HTTP success. Record repeated elapsed-time samples under comparable conditions;
network time, output length and provider load also affect observed latency.
If answers regress, restore the reviewed baseline and investigate the missing
facts before claiming a performance improvement. Consider retrieval or streaming
only as a separately evaluated change.
