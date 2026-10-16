# Content and publishing documentation navigation

Follow-up to merged PR #147, based on main `9a924b222`, 16 October 2026.
Public deployment and chatbot context rollout are pending merge.

## Scope

Extend existing tag badges and related documentation to 17 existing guides:
15-17, 29-33, 42-43, 47, 49-51, 58, 61 and 64. Reuse `docs`, `content` and
`publishing`, with writing, media, images, galleries and troubleshooting subtopics.
Two shared tags are needed by the existing within-collection selector. Topic
badges use `/docs/tags`; the index remains partial. No new options, templates,
ranking logic, public URLs or blog-post edits. First-site tutorials keep their
explicit progression. Existing guide bodies and inline links are unchanged.

The publishing Explanation shares troubleshooting with missing-change and YAML
guides: it explains why saved source and published output can differ. Sharing
metadata stays in publishing without image/gallery tags: those promoted gallery
recommendations over relevant publication guidance in the first rendered review.

Cards are automatic exploration suggestions, not a prescribed sequence. Ties
retain existing build-date ordering; broad writing/media suggestions can appear
when a topic has fewer close matches. No claim of measured human usefulness.

## Validation and boundaries

- Jekyll 4.4 documentation builds pass with the configured remote theme.
- All 40 chatbot tests pass locally, including Windows-compatible fixtures.
- All 17 pages rendered at 320 and 1280 pixels: three non-self documentation
  cards, visible topic links, no date footers and no document horizontal overflow.
- Image and missing-change cards inspected in desktop/mobile screenshots. A
  focused related link opens with Enter. Documentation topic groups are present.
- All 111 checked card/topic documentation destinations and fragments resolve.
- UTF-8 and new mojibake checks pass; guide bodies match main after Git newline
  normalization. `git diff --check` passes.

Accessibility checks cover the affected native links and responsive card reflow,
not a full audit. Guide titles, metadata, canonical URLs and examples are intact;
only existing tag metadata/navigation changes. No manifest, service worker,
caching or offline behavior changes; no PWA-readiness claim.

Update the topic index description, `llms.txt` and selective chatbot context to
reflect expanded coverage. Extend the appearance navigation evaluation and add
one content/publication topic case. The concise context update fits the existing
46,000-byte budget. No live AI evaluation or manual Worker deployment; rollout
uses the existing Pages-gated workflow after merge. No theme changelog entry is
needed for this documentation-only navigation change.
