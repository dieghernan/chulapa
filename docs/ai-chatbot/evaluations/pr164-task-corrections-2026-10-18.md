# PR 164 task corrections: 18 October 2026

## Changes and review comments

Correct exact migration override paths, isolate sidebar TOCs from content TOC recipes, route article TOC and search-exclusion questions, retain complete gallery/navbar examples, clarify footer classes and Autothemer nesting, require heading font selection and explicit head-override merging/video checks. Four routing/context threads were resolved after regression checks and pushed fixes.

A fifth review finding reproduced an HTML-entity citation bypass. Parse rendered Markdown with parse5 8.0.1 and compare complete browser-decoded URL attributes, not regex fragments of raw HTML. Numeric/named entities, unquoted attributes and quotes embedded in paths have focused tests; code samples remain ignored. Existing Worker tests establish one inference followed by fallback for rejected citations. No malicious live chatbot request was needed. This establishes validation behavior, not answer truth or human usability.

The reviewed library budget is 53,000 bytes (actual 52,970); selected input remains capped at 18,000. The increase retains executable recipes rather than removing examples, after removing a navbar example caused an observed child_list regression. Model/output limits, theme files and public page URLs remain unchanged. Canonical documentation already supplies the corrected facts; ai-context.md and the chatbot README changed, llms.txt did not require an entry. No theme UI, SEO metadata or PWA implementation changed; no browser accessibility/PWA audit is claimed.

## Version-specific evidence

| Source | Catalog outcomes | Evidence |
| --- | --- | --- |
| 96a7feeaa | 9 pass, 2 partial, 1 fail | [Review](taskfix-96a7feeaa-review.json) |
| 640ce7555 | 11 pass, 2 partial, 1 fail | [Review](taskfix-640ce7555-review.json) |
| 841b3925f | 2 pass, 2 partial | [Review](taskfix-841b3925f-review.json) |
| c3107102d | 2 pass, 2 partial | [Review](taskfix-c3107102d-review.json) |

These runs overlap; do not sum them into coverage or transfer passes to later runtime code. Provider inventories are supplementary, outside the 155-case catalog: on c3107102d, both English and Spanish singular questions include all five choices and explicitly state original Cusdis hosting no longer works. [Inventory review](inventory-c3107102d-review.json). Earlier Spanish omissions are preserved too.

The latest generated answers still have two known limitations:

- [Content TOC answer](taskfix-c3107102d-20261018.jsonl#L3): nested configuration is valid, but the model again emits {.no_toc}, missing the colon even though the context has fenced {:.no_toc}. A user copying that answer will not exclude the heading. Repeated context edits have not established a consistent fix.
- [Search guide discovery](taskfix-c3107102d-20261018.jsonl#L4): exclusion scope is correct, but the answer drifts into show_related/show_random and omits the visibility-guide/crawler distinction. Do not call context availability a successful task answer.

The final citation parser changes validation after those runs. Its fresh deployment and zero-inference endpoint checks are recorded separately; these historical answers are not new-parser live evidence. The active manifest/register identify what is actually untested on that final artifact. 69 local tests pass. Tests, source hashes and successful deployment are not human usability or general chatbot reliability evidence.

## PR recommendation

Keep the PR open. Stop broad quota-consuming batches while the exact TOC syntax and discovery scope remain inconsistent. Next investigate bounded answer validation or a documented deterministic recipe for these narrow syntax tasks, with failure behavior and faithful treatment of quoted invalid examples; do not silently rewrite arbitrary answers or count a fallback as a correct answer. Recheck both affected tasks on one identified candidate and retain every attempt.

GitHub CI is tracked separately from Netlify: the 640ce7555 Netlify API record had state error, skipped true and no error_message; its log endpoint returned 404. The cause is unconfirmed, not proven to be a theme or chatbot defect. Review the latest commit checks and inspect the provider build settings/logs before merging. No merge, release 2.2.0 publication or tag creation was performed.

## Final deployed artifact

Source 843dc822b, Worker 6ceb37e8-9dc9-4def-9508-bf3ca00790fb at 100% traffic. The decoded-citation thread is resolved after pushed regression fixes. Local suite: 69 passing tests. GET /widget.js returned 200; an empty POST /api/chat returned 400 without inference. No live model requests were made after this parser deployment. The active candidate manifest correctly starts with zero reviewed AI cases and 155 pending; old version evidence remains linked above and is not erased. See citation-843dc822b-review.json for endpoint records.
