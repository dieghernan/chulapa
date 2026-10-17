# Offline correction review: 16 October 2026

Scope: local changes on codex/chatbot-answer-corrections, based on main commit 30b1edf83afb911d3a05b837e70a9d51ae0702be. This candidate has not been deployed. The previous live evaluation used Worker version 82e28155-81a4-45c0-adcc-076c77f8cdc8, source 3966233f7eb4a444ada1e7a2ea4e7a04efeb405f.

## Changes and checks

Select complete topic sections for each question, capped at 18,000 UTF-8 bytes. Keep the reviewed source library under 52,000 bytes. Clarify provider-specific comments, configuration scopes, font loading, layouts, Algolia and complete examples. Reject unsupported Markdown source URLs with the search fallback without a second inference.

All 49 automated tests pass. Routing traces cover 155 catalog questions (1,798–14,167 bytes selected). These traces establish bounds and selected sections, not model accuracy or human usability. All 102 checked Chulapa source URLs and fragments resolve against the existing local docs/_site snapshot; this does not validate the published site or external sources.

## Remaining live work

The baseline has 56 recorded and reviewed responses; 99 cases lack completed records, grouped into 25 batches. Absence of a completed record does not prove that an interrupted request never started.

The corrected candidate has no live results: all 155 cases remain untested, grouped into 39 batches of at most four. There are 9 proposed regression batches drawn from baseline partial or failed answers. Lists overlap and must not be executed cumulatively. See [pending batches](pending-batches-2026-10-16.md) and its JSON commands.

No inference requests or deployments were made during this correction. After deployment is authorized, verify the deployed revision and account allowance, execute one regression batch, preserve raw outputs and review factual accuracy, nesting, examples, version restrictions and citations before expanding.

## Limits

Keyword selection can miss relevant sections. Citation identity checks do not establish semantic relevance or detect every link syntax. Live refusal/fallback frequency, latency, actual model answers, published source availability and human usability remain untested. No claim of improved model accuracy is made.

The change affects the documentation assistant only. Existing public technical documentation already describes the corrected facts; the assistant README and context were updated. No page URLs, metadata, controls, styles, manifest or service-worker behavior changed. Accessibility, SEO and PWA interaction behavior were not re-audited in a browser. Pre-existing observability changes and raw evaluation files were preserved.
