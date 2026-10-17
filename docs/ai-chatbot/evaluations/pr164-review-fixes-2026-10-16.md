# PR 164 review corrections: 16 October 2026

The four open findings were reproduced offline before correction.

- Context selection now matches uncommon whole body terms as well as aliases and headings. The catalog question naming journal selects both Changing skins and colors and Available skins. Focused catalog assertions cover required sections; all 155 queries remain within the 18,000-byte cap with complete sections.
- Citation validation uses the existing marked parser for inline links, reference definitions, autolinks, text URLs and HTML. Literal fenced/inline code is excluded. Worker tests verify unavailable/search fallback and exactly one inference for unsupported sources in alternate formats. URL identity does not establish semantic support or HTTP availability.
- Batch regeneration reads candidate-evidence.json and its revision-specific review/raw responses instead of resetting candidate results. Two CLI regenerations are identical. Four passes remain tied to 549f876dd; completed requests are absent from pending commands. Revision mismatches fail before writing output. This does not transfer passes to later code.
- Duplicate review IDs are rejected for baseline and candidate reviews, including identical duplicate assessments. Coverage cannot count two reviews for one case.

56 automated tests pass, including isolated temporary-directory CLI regeneration. No live inference, deployment or release publication was performed for these corrections. The current runtime changes need live evaluation; the historical evaluated source still has 151 cases without candidate responses. The context facts themselves did not change, so public documentation and llms.txt need no update. The assistant README documents the new behavior and evidence workflow.

No theme controls, URLs, SEO metadata, manifest or service worker changed. No new browser accessibility or PWA claims are made. Broader selection can still choose irrelevant sections; live answer quality and false fallback frequency remain untested for this correction.

## Follow-up routing review

Two additional findings were reproduced and corrected offline: information-box questions omitted the existing alert recipe; named-provider isolation discarded alternatives in comparison questions. The existing format-alert-task-1 catalog case now asserts the required section, syntax and source. English/Spanish comparisons retain all five supported comment-provider sections and their restrictions, while single-provider setup remains isolated. The 155-case input-cap checks still pass. 58 local tests pass; these routing corrections remain undeployed and have no live answer evidence. Context facts, public documentation and llms.txt are unchanged.
