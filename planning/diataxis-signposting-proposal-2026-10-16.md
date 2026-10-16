# Diátaxis signposting: four-page proposal

Date: 16 October 2026. Baseline: `505fa4836`, main after merged
[PR #145](https://github.com/dieghernan/chulapa/pull/145).
Delivery: [PR #146](https://github.com/dieghernan/chulapa/pull/146).
Status: proposal for review, not a public implementation or user-study result.

Policy update, 16 October 2026: #146 is merged. The comparison and human protocol
below remain the original proposal. The
[subsequent proportionate review](proportionate-validation-review-2026-10-16.md)
uses agents as editorial reviewers; human participation is optional and is not
a prerequisite for deciding whether to implement labels.

## Recommendation and boundary

Keep the existing purpose-oriented titles, subtitles and introductions as the
default. Compare them with a short explicit type declaration on four Docs pages
before deciding whether labels warrant implementation. A type label may help a
reader arriving from search, but that is a hypothesis; this review supplies no
observation that readers are confused or that labels improve completion.

Do not label every page, change templates, add YAML metadata, build a badge
system or rewrite public introductions in this delivery. Demos, skins, service
pages and README are outside this four-page sample. The documentation directory
already groups links by intent. This is not another full inventory or purity
reassessment; historical scores and evaluations remain unchanged.

## Exact patterns for the comparison

Variant A inserts exactly one plain paragraph immediately after the rendered
title/subtitle and before the existing opening paragraph:

| Type | Exact inserted paragraph | Reader expectation |
| --- | --- | --- |
| Tutorial | This is a **tutorial**. | Follow a supplied learning exercise to a first result. |
| How-To | This is a **how-to guide**. | Complete a chosen task on an existing site. |
| Reference | This is **reference**. | Look up supported inputs, defaults and constraints. |
| Explanation | This is an **explanation**. | Understand reasons, relationships and trade-offs. |

Variant B is the current purpose-oriented opening, with no type paragraph. The
expectation column above is a review aid, not another line to append publicly.
Keeping the remainder identical avoids comparing a new label plus a rewritten
introduction against the existing page at the same time.

Use ordinary text for this first comparison. An alert would compete with safety
and compatibility warnings and conflicts with the documentation's alert policy.
A colored badge adds styling, contrast and maintenance questions without evidence
that color helps. If a visual treatment is later tested, it must retain a readable
text label and convey nothing by color alone. Neither variant adds an H1: the
layout already renders the existing title.

## Selected pages and classification evidence

| Page | Type | Why this sample fits | Classification limit |
| --- | --- | --- | --- |
| [Publish your first site](../docs/collections/_docs/00_start.md) | Tutorial | Fixed browser/template exercise, supplied edits, step checks and observable personal blog result. | Installing on an existing Jekyll site is a different task; keep that choice out of the exercise. |
| [Add or change a menu link](../docs/collections/_docs/10_edit-menu.md) | How-To | Existing published site and page are prerequisites; edits one navbar entry and verifies its destination. | The complete YAML specimen supports that task, rather than becoming an independent option catalog. |
| [Layouts and snippets](../docs/collections/_docs/04_layouts.md) | Reference | Layout/page options, parameter/default tables, compatibility limits and complete lookup specimens; procedures link to guides. | Long technical examples are useful Reference. This classification does not certify exhaustive or perfectly accurate API coverage. |
| [How skins and overrides interact](../docs/collections/_docs/26_appearance-precedence.md) | Explanation | Explains why variables, generated palettes and local overrides interact, with maintenance trade-offs. | Links to editing guides are navigation; adding a setup sequence here would create a substantive mixture. |

The current index places these pages in the corresponding sections. Assess the
reader contract and substantive content, not just filenames, headings, code-block
counts or the category already assigned in the index. No ambiguous sample is
silently labeled pure because a dominant intention can be chosen.

## Four concrete opening comparisons

These are rendered-content review specimens, not replacement Markdown files.
The bold first line represents the existing layout title and the italic line its
subtitle. Do not paste those lines into the page body or duplicate its heading.
For each sample, Variant A inserts the stated type paragraph at the marked
position; Variant B goes directly from subtitle to the existing opening shown.
All displayed title/subtitle/opening wording below comes from the current source.

### Tutorial: first publication

**Publish your first site with Chulapa**  
*See your own blog online using only your browser*

A: insert `This is a **tutorial**.` here. B: insert nothing.

> By the end of this tutorial, you will open a public blog with your own site title
> and an edited article. Use the supplied example throughout; you can choose colors
> and add photographs after publishing.

B already names the tutorial and its outcome. A would repeat the category;
observe whether that repetition helps orientation or merely delays the exercise.
The real title retains its existing Chulapa brand span; the text above is a
plain-text transcription for comparison.

### How-To: menu editing

**Add or change a menu link**  
*Make an existing page reachable from your navbar*

A: insert `This is a **how-to guide**.` here. B: insert nothing.

> Use this guide when your site is already published and you have a page to link to.
> If the page does not exist yet, [create it first](../docs/collections/_docs/16_create-page.md).
> A menu entry does not create a page.

B states prerequisites and the task boundary. A's category term must not replace
those details; a visitor still needs to know whether they already have a page.
The source's relative link is rendered above as its equivalent local review link.

### Reference: layouts and snippets

**Layouts and snippets**  
*Layout, snippet and page-option reference*

A: insert `This is **reference**.` here. B: insert nothing.

> Use this page to look up a layout, snippet or page setting. For everyday editing,
> use [Create a post](../docs/collections/_docs/15_create-post.md), [Create a page](../docs/collections/_docs/16_create-page.md) or
> [Add an image](../docs/collections/_docs/17_add-image.md). A **layout** is a page design; **front matter** is
> the settings block between `---` lines at the top of a content file.

B already says "reference" in the subtitle and offers task exits. The question
is whether another label improves a direct search landing without distracting
from the table/section a reader is trying to consult.

### Explanation: skins and overrides

**How skins and overrides interact**  
*Understand which appearance settings take effect*

A: insert `This is an **explanation**.` here. B: insert nothing.

> A skin provides a coordinated starting design. Individual variables customize
> that design; Autothemer supplies a generated palette for values that are still
> undefined. These choices affect appearance rather than the content layout.

B's title/subtitle announce understanding rather than an editing task. Check
whether A makes that expectation clearer to readers who do not know Diátaxis;
do not assume familiarity with its four terms.

## Hybrid pages and index policy

A substantive mixture remains an editorial defect after labeling. Record the
competing task/reference/explanation, its extent and the existing destination
that could absorb it. Fix or explicitly defer that boundary before presenting a
single label as evidence of purity. Minimal specimens, prerequisites, brief
terms and version/safety constraints do not by themselves create a second type.
Never remove useful advanced facts simply to make a label look accurate.

Do not retain "Getting started / Advanced reference" blocks automatically. Check
whether they serve a coherent reader contract or duplicate an existing guide.
Likewise, review useful destinations and active references before any future
anchor removal; age does not justify either preservation or deletion.

Do not add the type beside every directory link now: the existing section headings
already supply it. That repetition would lengthen the index without an observed
need. Any later exception for a mixed search/result list should be tested in
that context, separately from this four-page opening comparison. No global topic
tags, related-card changes or new type-based recommendation logic are proposed.

## Evidence and decision protocol — not executed

Use the existing [user-task protocol](starter-consistency-review-2026-10-16.md#separate-evidence-protocol--still-pending)
for consent, prior experience, device, revision and assistance records. For this
small comparison, show A and B in counterbalanced order across consenting
participants; do not always show the current page first. Keep width, typography,
source revision and all text except the single inserted paragraph identical.

Before the participant reads beyond the opening, ask in plain language what the
page will help them do and what it assumes they already have. Record the answer,
wrong expectations, time and assistance. Then use the matching real task: first
publication, edit an existing menu link, find a supported layout default, or
explain why an override does not recolor a whole skin. Separate orientation from
completion and deployment waiting; category recognition is not task success.

Review label repetition, unfamiliar terms, small-screen reading, assistive
technology order and conflicts with warnings. Report sample size, failures and
qualitative reasons; do not infer population benefit from a small pilot or a
preference vote. Keep B if A offers no clear orientation benefit or obscures
prerequisites. Consider a narrow implementation only if observations justify it;
any wider rollout needs separate content classification and review.

No participants, screenshots of an implemented prototype, measured improvements,
live chatbot evaluation or adoption/purity scores are supplied by this proposal.
Implementation and evaluation remain pending a review decision and access to
participants. Existing first-publication, second-tutorial, advanced-lookup and
chatbot facts/citations/latency evidence tasks are not closed by this document.

## Technical scope and validation

This delivery changes internal planning only. Public pages, layouts, scripts,
styles, metadata, URLs, YAML settings, llms.txt and the selective chatbot context
are unchanged. No public build, chatbot test/deployment, browser audit or live
model run is warranted or claimed for a Markdown proposal. Checked the four
opening excerpts against their sources and their type placements in the current
index; all 31 local links/fragments across this proposal and the main audit
resolve. Public tracked files are unchanged and the gem's file selection excludes
planning. No public prototype or user-session result is implied by those checks.
