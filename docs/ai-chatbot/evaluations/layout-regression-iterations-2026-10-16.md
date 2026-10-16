# Layout regression iterations: 16 October 2026

Latest deployed source: 718fc9f0e. Worker: ad5d0a0f-2b60-40e9-bc5a-17822f326dd8. Model/output budget unchanged. Public documentation and llms.txt unchanged: corrections concern assistant selection and precision, supported by existing documentation and the v2.1.0 layout files. No theme UI, SEO metadata or PWA changes.

50 automated tests pass. Context is 51,870/52,000 UTF-8 bytes, with complete selected sections capped at 18,000. These tests establish implementation behavior, not answer accuracy.

| Source | Cases | Reviewed outcome |
| --- | --- | --- |
| 0209a3d15 | Four first-batch cases | Formatting and inherited microformats pass; singleton unsupported citation rejected (503); cache answer falsely restricts layout availability |
| 5e7dc75dc | Singleton and cache | Singleton passes; cache partial because page-dependent input parameters omitted |
| 718fc9f0e | Cache only | Pass: safe inputs, uncached caller/context helpers, correct hierarchy, standalone search, shared renderers and release caveat |

Raw JSONL and per-source review JSON files are retained beside this report. One observation per case is insufficient to establish consistency. An unsupported citation rejection is a delivered fallback, not an accuracy pass. No automatic second inference was used.

## Coverage and next batches

The baseline still has 56 recorded/reviewed responses and 99 cases without completed records. There are 151 catalog cases never tested on a selection/citation candidate. On the exact latest source, only cache was tested, so 154 cases remain untested. Earlier passes are not carried forward as current-source passes. [Batch register](pending-batches-2026-10-16.md) tracks that distinction.

Before expanding, confirm the three earlier passes on the latest source; then review one batch at a time. Do not merge based only on tests or these limited observations. Full factual coverage, repeatability, fallback rate, latency distribution, live source availability and human usability remain untested.

Seven live requests were made in this iteration (four, two, then one); the first 503 triggered the evaluator's normal cooldown. The dashboard before testing showed 6.62k/10k daily neurons, which may lag; no paid fallback or plan change was made.
