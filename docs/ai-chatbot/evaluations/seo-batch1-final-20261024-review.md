# SEO batch 1: final validation — 24 October 2026

Worker `ac010481-bedc-448a-94be-7512e5825e92`, verified 100% traffic before queries.
Seven requests, all HTTP 200: 1 pass, 6 partial, 0 fail, 0 unavailable.
Original five: 0 pass, 5 partial, 0 fail; regression pair: 1 pass, 1 partial.

[Raw responses](seo-batch1-final-20261024.jsonl). [Artifact/version manifest](seo-batch1-final-deployment-20261024.json).

| Case | Result | Finding |
| --- | --- | --- |
| `seo-1` | partial | Correct copy exclusion/no redirect/metadata checks and valid YAML. Overstates that the original target remains included in a sitemap; that depends on the original site, not this setting. |
| `seo-2` | partial | Correct four title/description keys and example. Verification incorrectly asks to find seo_title in generated HTML instead of inspecting the rendered title element; core configuration rubric is met, but added advice is imprecise. |
| `seo-3` | pass | Correct locale zh-Hant, og_locale zh_TW, real alternate locales, clearing inheritance and no automatic translations/hreflang; valid YAML and source. |
| `person-publisher-task-1` | partial | Correct minimal type-only edit, independent guest author, image/avatar, ignored logo and published checks. Omits v2.1.0 availability, Organization default and explicit preservation of other fields. |
| `canonical-article-task-1` | partial | Correct minimal fields, preserves layout/title/permalink, no redirect, correct copy-versus-target distinction and metadata/feed/sitemap checks. Omits pagination-canonical caveat in the full existing rubric; requested core task is answered. |
| `sharing-task-1` | partial | Correct five plain-path metadata fields, no header/body mutation, published image/post and exact tag/JSON/baseurl checks. Omits explicit no-cropping/no-inspection and no-guaranteed-preview/ranking limits from the full rubric. |
| `search-visibility-task-1` | partial | Correct independent three-field recipe plus Algolia exclusion/reupload and result checks. Omits jekyll-sitemap prerequisite and robots.txt/public-access/delayed-removal caveats. |

The original five went from 3 fail/2 partial to 5 partial. This is a bounded
improvement in these observed answers, not proof of repeatability. Existing
rubrics were not weakened to turn omissions into passes. Some omissions concern
secondary facts not explicitly requested (pagination, release defaults and preview
limits); review rubric scope separately before treating every such omission as a
context gap. The title-verification issue in seo-2 is a newly observed limitation,
not proof that this deployment caused a regression.

Across this batch: 17 Worker inference requests, no retries or AI Search calls.
The Worker does not expose per-answer neuron usage, so no measured savings are
claimed. All 101 local tests and both dry-runs passed. No new theme behavior,
public guide or llms.txt change; README and manually selected context updated.

Remaining work: original-target sitemap overclaim, exact HTML title inspection,
provider prerequisites/access limits and secondary rubric omissions. Do not mark
the SEO section fully resolved. Further requests were deferred to keep this first
batch bounded; no paid fallback or plan change was introduced.
