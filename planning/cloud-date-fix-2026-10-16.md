# Cloud entry hidden-date fix

Date: 16 October 2026. Baseline: main `0b9bbb375`, after merged #158.
Branch: `codex/fix-cloud-entry-dates`. Issue: #154. PR pending.

## Behavior

Cloud entries now require both a date and a candidate whose `show_date` is not
false before emitting the publication date, calendar, update marker and separator.
Keep the clock/reading time, headings, summaries, images, group links, ordering
and cache inputs. No new YAML option. Explicit dates with true/unset visibility
retain `dt-published`; hidden entries omit it without fabricating a replacement.
Both tag/category layouts and their legacy aliases use this renderer.

The layout reference, index task and development changelog document the fix as
available after v2.1.0. `llms.txt` already links both relevant guides and needs no
new entry. Selective chatbot context and the existing cloud-task expectation now
cover the corrected date behavior; the 47,000-byte budget is unchanged. No live
queries or manual Worker deployment; deployed answer quality is unverified.

## Validation

- New real-Jekyll fixture passes on Jekyll 4. It fails without the fix at the
  hidden-date assertion. Tests cover dated true/unset/false candidates, undated
  false/default-false collection documents, two groups/cache reuse, tag/category
  aliases, root/subdir URLs and a visibility edit followed by a same-site rebuild.
- Existing include-cache and Microformats feed checks pass on Jekyll 4.
- Browser: 16 layout/baseurl/viewport combinations at 320/1280, no document
  overflow or hidden-date separators; dated entries and reading times remain.
  Screenshots reviewed with the local renderer fixture and existing theme CSS.
- Docs build and 40 chatbot tests pass. The docs build uses its configured remote
  theme, so local renderer behavior is established by fixtures, not that build.
- UTF-8 and context budget checked. No accessibility certification, human
  usability or live chatbot accuracy claim. Date semantics change intentionally;
  canonical URLs, indexing, titles and routing remain unchanged. No PWA manifest,
  service-worker or caching-strategy change; no offline/installability claim.

Local Windows Jekyll 3.10 renders empty fixture pages, including the pre-existing
include-cache test. Its new test did not pass locally; the cause is not established.
The automatic regression runner discovers the new check in the existing Jekyll
3/4 CI matrix. Require that CI result before treating compatibility as verified.

## Plan status

#158 is merged, with head checks passed and branch deleted. All editorial groups
are delivered. #154 remains open until this fix is reviewed/merged; next is #125
adapter/migration work, followed by release checks. Preserve historical reviews
and keep optional interviews/live chatbot evaluation separate.
