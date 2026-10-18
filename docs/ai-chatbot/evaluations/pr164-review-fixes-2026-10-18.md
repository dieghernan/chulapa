# Evaluation bookkeeping corrections: 18 October 2026

Three review findings were verified against source 03f0055df and corrected offline.

- Candidate cases reviewed as unavailable remain retryable. Pending counts and commands include both unrun and reviewed-unavailable cases; their previous evidence remains recorded. Cases with responses awaiting review are not automatically retried.
- Planned run names include the evaluated source and avoid existing JSONL files with numbered retry suffixes. The live evaluator also reserves a new output file exclusively before any inference. Reusing an existing name fails without modifying the file or consuming quota.
- Baseline pass/partial/fail assessments require an answer-bearing HTTP 200 response. The same condition now applies to all factual candidate assessments. Empty, whitespace-only and non-string answers are rejected.

Regression tests cover transient 429/503 cases, partial batches, distinct revisions, occupied attempt names, invalid factual assessments, and preservation of an existing evidence file before any network request. The real batch register was regenerated offline; the four historical passes remain associated with source 549f876dd, with 151 pending candidate cases. Raw results were not changed.

All 62 automated tests pass. No deployment or live evaluation was performed. These changes affect evaluation tooling, not public theme behavior, page metadata, UI controls, manifest or service-worker behavior. The chatbot context and llms.txt do not need changes; the assistant README documents the new commands and coverage semantics. Automated tests do not establish model accuracy or human usability.
