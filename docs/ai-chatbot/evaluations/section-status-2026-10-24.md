# Response status by section — 24 October 2026

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
finding; its separate column flags the later ten-case 503 batch. Cases with no
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
| `feeds` | 5 | 2 | 2 | 1 | 0 | 1 |
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
| `migration` | 3 | 1 | 1 | 1 | 0 | 1 |
| `navbar` | 2 | 2 | 0 | 0 | 0 | 0 |
| `navigation` | 2 | 0 | 1 | 1 | 0 | 0 |
| `publishing` | 2 | 0 | 2 | 0 | 0 | 0 |
| `pwa` | 1 | 0 | 1 | 0 | 0 | 0 |
| `recommendations` | 3 | 2 | 1 | 0 | 0 | 0 |
| `resources` | 2 | 0 | 2 | 0 | 0 | 0 |
| `search` | 11 | 3 | 8 | 0 | 0 | 0 |
| `seo` | 10 | 4 | 6 | 0 | 0 | 0 |
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
| `navigation` | `navigation-2` |
| `accessibility` | `semantic-html-accessibility` |
| `migration` | `migration-fields-lookup-1` |
| `formatting` | `format-footnote-task-1` |
| `feeds` | `feed-selection-1` |

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
2. Accessibility and navigation: unsupported semantic claims and confusion
   between header project links, breadcrumbs and navbar configuration.
3. Feeds, migration, footnotes and highlighting: unresolved incorrect answers;
   subsequent 503 retries provide no new quality evidence.
4. Search, YAML, starter installation and custom script dependencies: some
   prior failures became partial, with required setup or diagnostic steps omitted.
5. Layout-related sections: distinguish current omissions from outdated release
   wording and overly internal expectations before changing context.

No inference, deployment or public behavior change was performed for this summary.
