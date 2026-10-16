# Affected-case retest: 16 October 2026

## Scope and deployment

User authorized one repeat of the five affected cases. Wrangler deployment listing confirmed 100% traffic on `986535e6-f13b-48ac-9c45-bc3b9482c4b8`, locally deployed from source `be75d8ad15fad655bcf548767b13c1422b37443f`. Checkout `19dbd9f55ebdbfa807223732e3a0cb26406b5c0f` adds only the deployment record. Model remains `@cf/google/gemma-4-26b-a4b-it`; context and prompt are the corrections documented in [the delivery record](answer-corrections-2026-10-16.md). No source, prompt, context or deployment change was made during this retest.

[New raw responses](answer-corrections-retest-2026-10-16.jsonl) preserve all five independent requests. Questions and runner match [the baseline](release-220-five-cases-2026-10-16.jsonl); expected text was strengthened in the correction PR, so comparisons below use the substantive source/rubric rather than a changed numeric score. The original raw responses and review are unchanged.

Exactly five requests, once per case, in catalog order, with the normal cooldown before the fifth. All returned HTTP 200 with answer text and MAD cfRay values. No retries or additional inference.

## Availability and time

| Case | Baseline client time | Retest client time | HTTP |
| --- | --- | --- | --- |
| `installation-1` | 6.004 s | 7.486 s | 200 |
| `snippets-1` | 2.065 s | 2.377 s | 200 |
| `photoswipe-gallery` | 4.435 s | 6.024 s | 200 |
| `version-task-1` | 3.940 s | 3.833 s | 200 |
| `second-photo-tutorial-1` | 6.797 s | 5.281 s | 200 |

Client request-to-JSON time includes network/Worker/model processing and excludes cooldown. This single sample per case cannot establish a latency trend, percentile or guarantee.

## Per-dimension review

Pass = correct for the relevant criterion; partial = incomplete/imprecise; fail = material incorrect instruction. N/A = no code needed. No global score.

| Case | Facts | Actionability | Examples | Sources | Boundaries |
| --- | --- | --- | --- | --- | --- |
| installation-1 | Fail | Partial | N/A | Pass | Pass |
| snippets-1 | Pass | Partial | Pass | Pass | Pass |
| photoswipe-gallery | Pass | Partial | Pass | Pass | Pass |
| version-task-1 | Pass | Pass | N/A | Pass | Pass |
| second-photo-tutorial-1 | Pass | Partial | Pass | Pass | Pass |

### installation-1: better routing, new file-location error

The answer now lists repository/url along with identity fields and links directly to `/docs/00-start`. Publishing checks and branch advice remain correct. However, it says: "`index.html`: Update the title and sample article content." In the reviewed tutorial, index.html holds the home-page heading; the sample article is edited in `_posts/`. Its next bullet correctly names `_posts/`, making the instruction internally inconsistent rather than a safe replacement for the tutorial. This is a new material instruction error compared with the baseline omission. No claim that a person followed it or broke a site.

Minimum follow-up: write separate, explicit context sentences for editing only the index.html title and editing the article only under `_posts/`; preserve the direct tutorial citation. Source: `../../collections/_docs/00_start.md`, steps 3-4.

### snippets-1: incorrect path requirement corrected

Now explicitly says root-relative fileurl and that the snippet applies absolute_url; rejects relative_url/manual baseurl. The complete include is correct, and the canonical video guide plus snippet reference support it. It adds a published-result check but does not explicitly test playback. The specific baseline path error is absent in this answer; this observation is not a reliability guarantee.

### photoswipe-gallery: public check added, remaining omissions

Correct unquoted include boolean, supported snippet, no YAML/plugin and absent from v2.1.0. Now asks readers to open the live site and click an image. It still omits disabled default, loading/fallback details and checking close/Escape/focus restoration. The direct guide supports the instructions. These are completeness limitations, not false configuration advice.

### version-task-1: specific baseline issues corrected

Correctly distinguishes remote_theme suffix/build revision from gem-only Gemfile.lock. Correctly rejects the marker as an exact commit/override identifier, says 2.2.0 is unpublished and identifies v2.1.0 as the published release. It cites only the canonical `/docs/55-check-theme-version`, eliminating the head-hook/index citation mismatch and unsolicited pinning instruction seen in the baseline. No code required by the question.

### second-photo-tutorial-1: insertion example corrected

The answer now gives only the two-line Photo walk item, tells readers to insert it into the existing navbar.nav with matching indentation and preserves existing configuration. File/image names and direct tutorial citation remain correct. It asks readers to verify the menu link/title/image after publishing. It still omits insertion after Categories, explicit existing-image/unused-path prerequisites and the complete page specimen. Given the question's request for file/image/menu routing, the canonical tutorial can supply the complete page; do not call this a destructive replacement or a missing required standalone page example.

## Source and code checks

Returned URLs were checked directly: all returned 200. The snippet reference `#b-snippets` and gallery `#masonry-gallery` fragments exist. The second tutorial and first tutorial destinations are relevant. The MP4 and PhotoSwipe includes and the insertion-only YAML item match documented syntax. HTTP success alone is not the basis for source relevance.

No UI interaction, snippet publication, provider posting, participant task or language variation was tested. Offline source/model tests were not rerun for this records-only update; the correction delivery records their results.

## Recommendation

Keep the observed MP4, version-source and menu-insertion improvements, but do not declare the chatbot fully validated. Address the first-site index/article ambiguity offline before treating that task as ready. Close/focus and tutorial-prerequisite omissions remain candidates for small wording improvements rather than new documentation. Do not run further inference without a newly agreed scope. No release publication occurred.
