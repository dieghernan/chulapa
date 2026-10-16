# Final FAQ and Reference routing review

Date: 16 October 2026. Baseline: `e49e30a62`, main after merged
[PR #144](https://github.com/dieghernan/chulapa/pull/144).
Delivery: [PR #145](https://github.com/dieghernan/chulapa/pull/145).
Status: open for review, not merged and not a new Diátaxis score.

## Joint source review and decisions

| Area | Source issue | Final destination and retained detail |
| --- | --- | --- |
| FAQ post/page creation | Repeats filename/front matter/menu steps already covered by complete guides. | Brief distinction between dated articles and standalone content; links to guides 15/16, which retain complete files, prerequisites and publishing checks. |
| FAQ missing photo | Repeats upload/name/publish troubleshooting from guide 17. | Direct link to the complete image guide and guide 42 for stale whole-article output. No missing-upload, capitalization or repository-path advice is lost from the canonical task. |
| FAQ design and previews | Two answers repeat config/save/publish skin instructions. | Route to guides 22/23/24 and Explanation 26; retain the useful warning that previewing documentation does not save a design to the reader's site. |
| FAQ Markdown | Vague "covered" link competes with the syntax destinations. | Explicit theme syntax/output reference; retain external Markdown/kramdown links and parser caveat. |
| Global settings | Footer/optional-feature/collection intros use procedure phrasing inside field lookup. | Declarative field/reference framing; retain every setting table, mapping, default, secret warning, compatibility caveat and provider task link. Required include-cache warning remains concrete. |
| Layouts | Default-layout setup prose and custom-hook instructions interrupt lookup. | Retain complete default mappings, explicit-value precedence, image specimen, component hierarchy and include examples. Link head task 44/hooks reference 45 directly. |
| Existing guide links | Image, footer, migration, theming and hook guides detour through FAQ answers. | Link caption 50, feed compatibility 57, favicon 52 and hook reference 45 directly. Useful FAQ questions remain destinations; no empty aliases or headings are added. |

Search, indexing, cloud setup and sharing workflows delivered in #142 are not
re-extracted. Pagination filename/plugin/config requirements remain useful
reference constraints, not a new standalone task. Provider compatibility, local
override advice, fallback rules and development-version boundaries are retained.
No new guides, settings, layout/runtime changes, page URLs or retired headings.
The FAQ is a question directory; Reference keeps working lookup specimens.

## Entry points and chatbot

Public docs, demos and README references were searched for FAQ fragment links.
The changed guide links now point directly to existing destinations. README/demo
entry links remain valid. All existing FAQ headings still have useful answers;
none is retained solely as empty compatibility scaffolding.

`llms.txt` describes FAQ as a question directory linking guides. Reviewed the
selective context and relevant authoring/skin/hooks/feed evaluation cases in the
three catalogs: facts and existing task/reference citations remain accurate.
No context expansion, new case or chatbot test run is needed for these prose/link
changes. No manual Worker deployment or live model evaluation is performed.
Tests/deployment do not establish answer accuracy or human task success.

## Verification and limits

- Full documentation build with Jekyll 4.4 and this local checkout passes.
- 3,057 generated documentation links/fragments resolve across the built site,
  including links from demos and the existing task/reference destinations.
- Front matter, headings and all fenced examples are byte-for-byte unchanged in
  the eight edited Docs pages. No canonical URL, title, metadata option, code
  specimen or current section destination is deliberately changed. This does
  not assert exhaustive option coverage or unknown external bookmark integrity.
- Chromium previews of FAQ, Global settings and Layouts at 320/1280 px have no
  document-level horizontal overflow. The FAQ post task link is focusable and
  opens guide 15 with Enter. Retained controls, tables and long code specimens
  use the existing styles; this is not a full accessibility/assistive-tech audit.
- No reusable theme/runtime, manifest, service worker or cache changes; no offline
  or PWA-readiness claim. No new automated tests mirror these editorial changes.
- Verified #144 is merged and its official Pages/regression workflows succeeded;
  the active delivery table and implementation order reflect that status. This
  proposed FAQ delivery remains unmerged until its own review is complete.

The optional four-page comparison of explicit Diátaxis labels versus reader-purpose
introductions is the next proposal after this delivery is reviewed/merged.
Real first publication, second tutorial and advanced lookup observations plus
live chatbot facts/citations/latency remain pending under the starter protocol.
Historical inventories, scores and evaluation results are not rewritten.

## Review correction: missing-image destination

The FAQ now opens the complete image guide rather than skipping to its final
publish/check section. Repository-path guidance and the `relative_url` example
appear earlier under "Insert it into the content"; the whole-guide destination
keeps both insertion and troubleshooting accessible. The FAQ link was rendered
and its destination/source content checked. No new anchor, procedure, chatbot
fact or runtime change; the full site build was not repeated for this link fix.
