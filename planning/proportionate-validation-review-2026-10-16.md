# Proportionate documentation validation

Date: 16 October 2026. Baseline: `5619c8cc7285f940a5535be25f884ac6e99da961`,
main after merged [#146](https://github.com/dieghernan/chulapa/pull/146).
Delivery: [PR #147](https://github.com/dieghernan/chulapa/pull/147).
Status: completed synthetic editorial review; recommendation submitted for review.
No public implementation or human study.

## Decision proposed

Keep the existing purpose-oriented titles, subtitles and introductions on the
four sampled pages. Do not add explicit Diátaxis sentences across the site.
The retained agent responses describe the intended purpose in both variants.
They do not establish that labels help readers, or that humans need no labels.
Keeping the existing opening is a proportionate editorial choice under this
limited evidence, not a measured usability conclusion.

Human interviews and observed tasks remain optional improvements for this
project, rather than gates to completing the documentation reorganization.
Correctness checks remain required for affected content. Review live chatbot
facts and citations when advice/context changes; tests and deployments do not
establish answer quality. This review changes neither public advice nor context.

## Method and evidence

Compare the four pages from the [merged proposal](diataxis-signposting-proposal-2026-10-16.md).
Each pair contains the title, subtitle and content before the first H2, with or
without the proposal's exact type sentence. Brand markup is stripped from the
packet title. Links are visible but not followed. This deliberately tests opening
interpretation, not task completion or navigation.

Eight isolated agent contexts reviewed one packet each with a specified editorial
lens. They were not given the pair assignment or competing packet. This is not
fully blind: the type sentence is visible. Packet IDs are identifiers, not a
randomized study. All contexts inherit the same model configuration; separate
contexts do not supply independent human evidence or eliminate training knowledge.

See the [manifest](simulations/signposting-2026-10-16/manifest.json),
[instructions and lenses](simulations/signposting-2026-10-16/README.md), and
[packets and responses](simulations/signposting-2026-10-16/).
Two packets (p64 and p85) were restarted after a turn transition left no retained
response. The final retained responses are reported without selecting among
competing results. The other six retained responses came from their original runs.
The primary editor checked observations against the full source pages below.
No scores, elapsed times, preferences or human participants were collected.

## Pair review and full-page adjudication

| Source and retained packets | Opening interpretation | Full-page check and decision |
| --- | --- | --- |
| [First publication](../docs/collections/_docs/00_start.md), p41 / p12 | Both describe publication with a personal title and edited article. Both ask about the example/account beyond the extract. | The first H2 immediately provides the free GitHub account, browser requirement and example preview; step 1 links the template. No missing prerequisite or next step was demonstrated. The absent definition of the theme in the opening is an editorial candidate, not evidence that the tutorial fails; no expansion proposed here. |
| [Menu link](../docs/collections/_docs/10_edit-menu.md), p23 / p64 | Both identify an existing page on a published site and the page-creation prerequisite. | “Edit the link” names `_config.yml`, `navbar.nav`, the path/baseurl rule and preservation of existing settings. The guide links the navbar Reference for broader options. External destinations are not needed for this guide's stated existing-page task; no scope expansion proposed. |
| [Layouts](../docs/collections/_docs/04_layouts.md), p85 / p36 | Both describe lookup rather than a tutorial. Questions concern entry navigation, exact options, defaults and versions absent from the extract. | The next section links feature destinations and states main versus v2.1.0 availability. Layout and snippet sections retain option/parameter specimens and defaults. “Snippet” is not defined in the opening; that observation alone does not establish a lookup failure. No defect requiring an opening change was demonstrated. |
| [Appearance precedence](../docs/collections/_docs/26_appearance-precedence.md), p57 / p78 | Both describe conceptual interaction between skins, variables and Autothemer. | The next H2 explains unchanged colors and the skin → variable → Autothemer order. Later sections explain CSS/local-copy trade-offs and link task guides. Missing diagnostic steps in the extract are not a defect in an Explanation. |

Some response `findings` describe useful existing content rather than defects.
The response classifications indicate whether a statement can be checked within
the extract, not severity or proof of a usability problem. No issue count or
comparative success rate is inferred. This is a four-page sample, not a new
site-wide Diátaxis score. Historical assessments remain unchanged.

## Verification and boundaries

- Passed: all four paired packets differ only by the proposed sentence; all
  eight response files parse as JSON and every finding quotation matches its packet.
- Passed: 41 local planning links/fragments resolve, all four source destinations
  exist, and the diff contains only internal planning. `git diff --check` passed.
- Confirmed: official Pages builds use `docs/`, outside this root `planning/`
  directory. Loading the gemspec confirms no `planning/` files are packaged.
- `llms.txt` and the selective chatbot context need no changes: no public facts,
  guidance or URLs changed. No chatbot tests, live evaluation or deployment.
- No site build or mobile/desktop browser audit: no rendered page, navigation,
  a11y, SEO or PWA behavior changed. This does not assert live behavior passed.

First-publication, second-tutorial and advanced-lookup completion by humans remain
unmeasured. Live chatbot accuracy, citations and latency remain unmeasured here.
Use existing protocols if those optional observations become useful; do not
rename agent outputs as participant evidence. Revisit labels only for a concrete
orientation problem, rather than automatically opening an implementation PR.
