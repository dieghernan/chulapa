# Response status by section — 24 October 2026

## Navigation and TOC update

Four fresh answers on `09e75972-8ede-4630-ba6e-c5a504bc709c`: 1 pass,
3 partial, 0 fail/unavailable. [Case review](navigation-toc-after-20261024-review.md).
Navigation and TOC rows reflect this sample; other rows remain tied to their
recorded versions. Task-specific header verification and preserving existing
kramdown options remain necessary follow-ups; sidebar core behavior is correct
but the captured full rubric still has explanatory omissions. All work is in
PR #182; no AI Search calls were made.

## Scoped-rubric follow-up

The [task-scope audit](task-scope-audit-20261024.md) preserves old rubrics and
historical labels. Six fresh baseline answers under scoped criteria gave two
passes/four partials; repeating only the four gaps gave two passes/two partials
on `09b4517c-3705-4009-a1bf-af30be43b5b5`. See [the review](scoped-followup-after-20261024-review.md).
The SEO row incorporates these version-specific scoped results; it must not be
compared as an improvement percentage against the earlier broader rubric.
Saved background-only omissions were not relabeled as fresh passes.

## Feeds and migration update after the second Worker batch

Final six cases on `253c4a59-bd7d-4336-b3f3-c407f11f81e0`: 1 pass, 5 partial,
0 fail. The feeds/migration rows incorporate these outcomes. See the
[final review](feeds-migration-final-20261024-review.md) for remaining gaps.
Two SEO controls on the intermediate Worker remained partial; those results
are not transferred to the final deployment. Other sections and AI Search
remain historical. No new AI Search requests were made.

## SEO update after the first Worker batch

Seven cases were reevaluated on Worker `ac010481-bedc-448a-94be-7512e5825e92`:
1 pass, 6 partial, 0 fail. The original five fail/partial cases are now all partial;
no full-resolution claim. See [the final review](seo-batch1-final-20261024-review.md).
The SEO row below incorporates these seven outcomes; all other sections and the
AI Search table remain historical. No new AI Search requests were made.

## Scope and interpretation

This is a historical evidence inventory, not a measurement of the currently
deployed Worker. Sections come from the corrected 160-case catalogs. Start with
the per-case table in [the consolidated log](log.md#latest-status-per-tested-catalog-case),
then apply the later ten-case paired retest and the explicit manual reassessments
in [the additional review](review-additional10-20261022.md). The latter reviews
saved answers against current expectations; it is not a new live run.

Pass/partial/fail below describe the latest reviewed answer quality available
under that method. An unavailable retry does not erase the preceding quality
finding; its separate column flags a later ten-case 503 batch unless a newer assessed
answer supersedes that unavailable attempt. Cases with no
assessable answer remain unavailable. Different versions are mixed only for
backlog organization; no overall accuracy or current-runtime claim is made.

The three-case baseline prose review and the later Autothemer rubric correction
also qualify these labels: `theme-selector-demo-1` subsequently gave a valid mapping
and version restriction; `theming-2` needs reassessment under the corrected rubric.
Do not treat its historical missing-`skin: auto` criticism as a valid requirement.
The author-profile reassessment is partial under the full rubric, while its core
URL/guest-author answer is correct; this is a rubric-scope issue to review.

## Worker evidence by functional section

| Section | Cases | Pass | Partial | Fail | No assessable answer | Later 503 retry |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `accessibility` | 5 | 2 | 2 | 1 | 0 | 0 |
| `analytics` | 4 | 4 | 0 | 0 | 0 | 0 |
| `autothemer` | 3 | 1 | 2 | 0 | 0 | 0 |
| `chatbot` | 2 | 2 | 0 | 0 | 0 | 0 |
| `collections` | 7 | 5 | 2 | 0 | 0 | 2 |
| `comments` | 6 | 3 | 3 | 0 | 0 | 1 |
| `configuration` | 3 | 1 | 2 | 0 | 0 | 0 |
| `content` | 5 | 3 | 2 | 0 | 0 | 0 |
| `custom-hooks` | 2 | 1 | 1 | 0 | 0 | 0 |
| `documentation` | 5 | 0 | 4 | 0 | 1 | 1 |
| `favicons` | 2 | 0 | 2 | 0 | 0 | 0 |
| `feeds` | 5 | 2 | 3 | 0 | 0 | 0 |
| `fonts` | 4 | 3 | 1 | 0 | 0 | 0 |
| `footer` | 2 | 1 | 1 | 0 | 0 | 0 |
| `formatting` | 7 | 4 | 2 | 1 | 0 | 1 |
| `galleries` | 7 | 3 | 4 | 0 | 0 | 0 |
| `highlighting` | 1 | 0 | 0 | 1 | 0 | 1 |
| `html-output` | 1 | 0 | 1 | 0 | 0 | 0 |
| `icons` | 2 | 1 | 1 | 0 | 0 | 0 |
| `include-cache` | 1 | 0 | 1 | 0 | 0 | 0 |
| `installation` | 11 | 4 | 7 | 0 | 0 | 0 |
| `layouts` | 4 | 3 | 1 | 0 | 0 | 0 |
| `localization` | 2 | 1 | 1 | 0 | 0 | 0 |
| `math` | 1 | 1 | 0 | 0 | 0 | 0 |
| `mermaid` | 2 | 1 | 1 | 0 | 0 | 0 |
| `microformats` | 3 | 0 | 3 | 0 | 0 | 0 |
| `migration` | 3 | 1 | 2 | 0 | 0 | 0 |
| `navbar` | 2 | 2 | 0 | 0 | 0 | 0 |
| `navigation` | 2 | 1 | 1 | 0 | 0 | 0 |
| `publishing` | 2 | 0 | 2 | 0 | 0 | 0 |
| `pwa` | 1 | 0 | 1 | 0 | 0 | 0 |
| `recommendations` | 3 | 2 | 1 | 0 | 0 | 0 |
| `resources` | 2 | 0 | 2 | 0 | 0 | 0 |
| `search` | 11 | 3 | 8 | 0 | 0 | 0 |
| `seo` | 10 | 8 | 2 | 0 | 0 | 0 |
| `skins` | 9 | 4 | 5 | 0 | 0 | 1 |
| `snippets` | 1 | 1 | 0 | 0 | 0 | 0 |
| `toc` | 4 | 2 | 2 | 0 | 0 | 1 |
| `variables` | 5 | 5 | 0 | 0 | 0 | 0 |
| `version` | 3 | 2 | 1 | 0 | 0 | 0 |
| `video` | 4 | 3 | 1 | 0 | 0 | 0 |
| `yaml` | 1 | 0 | 1 | 0 | 0 | 0 |

## Remaining failed answers

| Section | Case |
| --- | --- |
| `highlighting` | `reference-edge-cases-5` |
| `accessibility` | `semantic-html-accessibility` |
| `formatting` | `format-footnote-task-1` |

## AI Search: explicitly graded paired retest

This table covers only the ten-case paired retest with explicit quality labels.
Other AI Search runs have qualitative observations or unavailable generation;
they are not silently converted into pass/fail counts. The nine-case A/B/C/D
classification assesses sources and retrieval, not answer quality.

| Section | Cases | Pass | Partial | Fail |
| --- | ---: | ---: | ---: | ---: |
| `accessibility` | 1 | 0 | 0 | 1 |
| `analytics` | 1 | 0 | 1 | 0 |
| `installation` | 1 | 0 | 1 | 0 |
| `navigation` | 1 | 0 | 0 | 1 |
| `search` | 2 | 0 | 1 | 1 |
| `seo` | 2 | 0 | 2 | 0 |
| `skins` | 1 | 1 | 0 | 0 |
| `yaml` | 1 | 0 | 1 | 0 |

On 23 October the GA4 five-versus-ten-chunk experiment produced correct core
configuration guidance but omitted citations. Its tuned prompt/model/settings
differ from the paired retest. The tuning smoke returned 429 for generation.
Neither establishes section-wide quality under the new settings.

## Priorities

1. SEO: core social-image/local-search errors improved in the first batch;
   remaining caveats and imprecise verification advice need follow-up.
2. Accessibility retains unsupported semantic claims. Header navigation scope
   is corrected in the new sample; verification and kramdown preservation remain
   actionable gaps, while fuller sidebar explanation is secondary.
3. Footnotes and highlighting retain failed answers followed by unavailable
   retries. Feeds/migration improved in the second batch but remain partial.
4. Search, YAML, starter installation and custom script dependencies: some
   prior failures became partial, with required setup or diagnostic steps omitted.
5. Layout-related sections: distinguish current omissions from outdated release
   wording and overly internal expectations before changing context.

No inference, deployment or public behavior change was performed for this summary.
