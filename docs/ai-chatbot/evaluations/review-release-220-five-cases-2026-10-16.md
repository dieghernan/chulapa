# Five-case live chatbot review: 16 October 2026

## Scope and provenance

Authorized by the user for five live questions after merged #163; no release publication is authorized. Source and context snapshot: `30b1edf83afb911d3a05b837e70a9d51ae0702be`. Model: `@cf/google/gemma-4-26b-a4b-it`, using the unchanged prompt (under 150 words, one small complete example when needed).

[Pages run 38914909072](https://github.com/dieghernan/chulapa/actions/runs/38914909072) and [Worker run 38914909119](https://github.com/dieghernan/chulapa/actions/runs/38914909119) succeeded for that SHA before the batch. The Worker log records 46,923/47,000 context bytes, the matching Pages gate and Cloudflare version `c8e8f74f-35fe-412f-9025-f2784cd1d81a`.

Local source-context SHA256: `d377d3bbf6d84105d916b8668b616dfdb5a1c69de0ca8469a55e63fde04beab9`. This identifies the reviewed local context; it is not a context hash fetched from the running Worker. The live installation page contained the candidate notice and unreleased HTML marker before evaluation.

[Raw immutable responses](release-220-five-cases-2026-10-16.jsonl) retain questions, expectations, answer text, timestamps, HTTP status, cfRay and durationMs. The runner executed exactly the five selected IDs once, in catalog order, with its normal cooldown before question five. No retry, additional inference or context/prompt change was performed.

## Availability and elapsed time

All five requests returned HTTP 200 with answer text. Every cfRay identifies MAD. Availability does not establish factual correctness.

| Case | HTTP | Client elapsed time |
| --- | --- | --- |
| `installation-1` | 200 | 6.004 s |
| `snippets-1` | 200 | 2.065 s |
| `photoswipe-gallery` | 200 | 4.435 s |
| `version-task-1` | 200 | 3.940 s |
| `second-photo-tutorial-1` | 200 | 6.797 s |

Elapsed time is client request-to-JSON time, including network, Worker and model processing; it excludes the runner cooldown. No model-only latency, percentile, improvement or performance guarantee is inferred.

## Answer review

Rubric: pass = meets the relevant criterion; partial = incomplete or imprecise; fail = a material incorrect instruction or unsupported citation. N/A = code was not required. These categorical observations describe these five answers only, with no aggregate score or population accuracy estimate.

| Case | Facts | Actionability | Examples | Sources | Boundaries |
| --- | --- | --- | --- | --- | --- |
| installation-1 | Partial | Partial | N/A | Partial | Pass |
| snippets-1 | Fail | Partial | Pass | Pass | Pass |
| photoswipe-gallery | Pass | Partial | Pass | Pass | Pass |
| version-task-1 | Partial | Partial | N/A | Fail | Pass |
| second-photo-tutorial-1 | Pass | Partial | Partial | Pass | Pass |

### installation-1

Correctly recommends Chulapa 101, repository creation, GitHub Actions, configuration edits, publishing branch and the public Pages URL. It introduces no local-Ruby or personal-token prerequisite. It omits the repository/url settings, the separate home-page heading edit and the controlled sample-article check. Its reminder to replace sample content is general rather than the supplied exercise. The cited Installation page is a valid method directory, but the answer does not directly route to `/docs/00-start` for the complete exercise.

Minimum improvement: point first-publication questions directly to the first tutorial and mention the repository/url settings and home-heading/article checks without reproducing the entire tutorial. Existing source: `../../collections/_docs/00_start.md`.

### snippets-1

The complete Liquid include uses `snippets/video.html` with `fileurl="/assets/mp4/sample.mp4"` and is valid. The answer correctly cites `/docs/32-embed-video` and explains upload/path substitution. However, it says the path "uses the `relative_url` filter to correctly handle your `baseurl`", although its example has no filter and `_includes/snippets/video.html` already applies `absolute_url` to fileurl. This is an incorrect requirement; adding a repository-prefixed filtered value risks duplicating baseurl. That consequence is inferred from the path handling, not reproduced in a live user site. It also omits opening the published article and verifying playback.

Minimum improvement: distinguish Markdown image paths (which use relative_url) from video fileurl, which takes a root-relative path without a manually added baseurl. Preserve the current correct include and add a playback check. Existing source: `../../collections/_docs/04_layouts.md`, Video support; runtime evidence: `_includes/snippets/video.html` lines 4-5 in the reviewed commit.

### photoswipe-gallery

Correctly gives unquoted `photoswipe=true` on the cached masonry include, rejects page YAML/plugin activation and states it is absent from v2.1.0. The image_col prerequisite is correct. Both cited destinations support the feature; the dedicated guide is present. It omits the disabled default, activation-time loading, image fallback and testing Escape/focus restoration. These are completeness limits, not invented capabilities. The answer does not provide a publish/open-image verification step.

Minimum improvement: add one practical open/close/fallback verification step and retain the source link. Optional loading/default details can stay in the reference. Existing source: `../../collections/_docs/31_photoswipe.md`.

### version-task-1

Correctly says that the marker identifies neither an exact unpinned commit nor local overrides, that 2.2.0 remains unpublished and that v2.1.0 is the published release. It correctly interprets the old development labels. However, "To check your current theme version, refer to your Gemfile.lock" is not qualified as the gem-installation check; an unpinned remote theme requires checking remote_theme/build evidence. Recommending a pin is an optional change, not necessary to identify the current build.

The citation labelled "Custom hooks and version checks" points to `/docs/44-custom-head`, whose task is editing a custom head hook and does not document the version-marker procedure. The citation labelled "Release preparation" points to the general docs index rather than a release-preparation page. All URLs exist, but these labels and destinations do not adequately support the associated version instructions. The exact `/docs/55-check-theme-version` guide is missing.

Minimum improvement: prioritize the canonical version-check guide, distinguish remote_theme from Gemfile.lock and avoid relabelling a general index or head-hook guide as version evidence. Existing source: `../../collections/_docs/55_check-theme-version.md`.

### second-photo-tutorial-1

Correctly names `_pages/photo-walk.md`, the Madrid image and `/photo-walk/`, and links the exact second tutorial. It tells readers to preserve all current menu entries and indentation and to commit both edits, wait for Actions and verify the public heading/image. It does not instruct destructive replacement.

The illustrative YAML shows only Home and Photo walk rather than the starter's existing entries or the fixed insertion after Categories. It omits the complete supplied page specimen (front matter, heading and image expression), the existing-image prerequisite and a check that the menu link works. The code shown is syntactically a complete mapping, but is incomplete as a specimen of the requested controlled exercise. The correct tutorial link lets the reader recover the missing details.

Minimum improvement: show only the two-line menu item to insert after Categories, explicitly preserving the existing navbar mapping; route the page creation to the complete supplied tutorial specimen, or include that specimen if the answer needs to be self-contained. Existing source: `../../collections/_docs/59_photo-page-tutorial.md`.

## Source and syntax checks

The 11 distinct returned URLs were fetched directly: all returned HTTP 200; `#masonry-gallery` and `#navbar` exist in the returned HTML. Documentation destinations were compared with local sources for relevance. HTTP success did not excuse the version answer's citation mismatch. GitHub's generator URL returned HTML, but no repository was created.

Code blocks were reviewed as decoded answer text: the MP4 and PhotoSwipe Liquid includes are complete and match supported parameters; the menu YAML mapping is syntactically complete but does not reproduce the fixed starter insertion. No generated snippets were published and no provider/media interaction was performed. No new tests are claimed for this records-only task.

## Recommendation and limits

Do not treat this as an all-clear for the chatbot. Prioritize the MP4 path instruction and version-source routing, then improve the tutorial/menu example and publish/result checks using existing content. A bounded context/prompt correction can be prepared offline, but any further live batch needs separately agreed scope; no extra requests were made here. The theme release and chatbot evaluation are separate decisions.

These observations are neither human usability evidence nor exhaustive chatbot accuracy. There are no repeated samples, Spanish-language requests, adversarial cases, provider submissions or participant tasks in this run. Timing does not establish a latency trend. The approved release remains unpublished.
