# Instructions for AI and coding agents

## Write for beginners and experienced users

The main audience includes readers with little or no knowledge of Jekyll,
GitHub or websites. Keep the current documentation pages and public URLs;
put the short first-site walkthrough in `collections/_docs/00_start.md`.

- Start each guide with a useful task and the simplest supported path. State
  prerequisites, where to edit, what to change and how to check the result.
- Explain unfamiliar terms on first use. Prefer user-visible outcomes to
  implementation descriptions. Do not require readers to learn Ruby, Liquid,
  YAML or CSS before completing a task that can be done in the browser.
- Put common tasks before optional integrations and advanced reference.
  Preserve supported settings, defaults, compatibility limits and actionable
  customization or upgrade guidance for experienced readers. Use clear
  headings and direct links so they can find those answers without a tutorial.
- Omit internal architecture, refactoring and rendering details unless they
  help a reader configure, troubleshoot, extend or upgrade their own site.
  Moving an internal explanation to an advanced section is not sufficient:
  retain only actionable guidance and link to complete source examples when
  the implementation itself is the useful reference.
- Provide small complete examples with the destination file stated. Tell
  readers whether to replace existing values or add a new section, and preserve
  unrelated settings. Use valid copyable code without placeholder ellipses.
- Keep version caveats next to the affected feature. Preserve existing heading
  anchors when rearranging sections, including links used by the chatbot.
- Review each guide as a novice: can a reader follow it without guessing the
  next action, and distinguish required steps from optional choices? Also check
  that advanced questions still have precise answers in the reference.
- Review chatbot coverage for both everyday tasks and advanced configuration.
  Editorial reordering alone does not justify changing its selective context.
  Update context only for missing or changed actionable facts or source links,
  explaining the reason; do not copy the beginner walkthrough wholesale.

## Format the theme name in rendered documentation

When rendered documentation refers to the theme by name, use
`<span class="chulapa">Chulapa</span>` so it receives the theme's brand styling.
Apply this to visible prose, headings and front matter that renders as HTML,
including titles, subtitles and excerpts. Follow the examples in
`collections/_docs/01_install.md`.

Keep plain-text metadata, accessible names and image alt text as plain text.
Do not add spans inside code blocks, inline code, URLs, file paths or identifiers
such as `chulapa-skin`. Preserve the spelling required by configuration and code.

## Use alerts consistently

Use ordinary prose for routine steps and recommendations. Use `alert-info`
for a useful clarification, and `alert-warning` for a concrete mistake that can
break publishing, expose a secret or cause conflicting output. Keep notices
short and actionable. Use `{: .alert .alert-info .p-3 .mx-2 .mb-3}` (or
`alert-warning`) for one paragraph; use an HTML container with the same classes
and `markdown="1"` only when the notice needs several paragraphs or a list.
Separate each notice from the preceding paragraph or list with a blank line;
place its attribute line immediately after the notice text. Do not add alerts
merely to emphasize technical background.

## Keep the LLM guide aligned with the docs

When adding documentation in this directory, assess whether the new page should
be included in `llms.txt`. Prioritize installation, configuration, supported
features, troubleshooting and guidance that helps readers use the theme.

- Add useful pages with a concise description and their public documentation URL.
  Keep the guide selective rather than listing every page or copying its content.
- When documentation is moved, removed or materially changed, review affected
  links, descriptions and version caveats in `llms.txt`.
- State in the task summary whether the guide was updated. If a new page does
  not need an entry, briefly explain why.

## Keep the chatbot context aligned with the docs

When changing documentation, configuration examples, supported options, layouts,
snippets, FAQ answers or skin catalogs in this directory, review
`ai-chatbot/ai-context.md` before finishing the task. Documentation is the source
of truth; the chatbot uses a manually maintained summary and cannot fetch pages
or RSS entries to discover changes.

- Update affected facts, defaults, examples, source links and version caveats.
  Remove obsolete guidance. If no context update is needed, explain why in the
  task summary.
- Keep the context selective: add concise, actionable facts and complete small
  examples rather than copying entire pages. Do not introduce unsupported
  settings or treat unanswered community suggestions as implemented features.
- Review the affected cases in `ai-chatbot/evaluation-cases.json`,
  `ai-chatbot/evaluation-extra-cases.json` and
  `ai-chatbot/evaluation-community-cases.json`. Update or add focused cases when
  behavior or advice changes. See `ai-chatbot/evaluation.md` and the recorded
  reviews in `ai-chatbot/evaluations/` for known failure patterns.
- Run `npm test` from `docs/ai-chatbot` after context or chatbot changes. When
  live evaluation is within the authorized scope, repeat the affected cases
  with `node evaluate-live.mjs RUN-NAME CASE-ID,CASE-ID` and review factual
  accuracy, completeness, code and source links; HTTP 200 alone is not success.
  Live evaluation consumes Workers AI allowance.
- State whether the updated context has been deployed. Jekyll builds, commits
  and GitHub Pages deployments do not update the Cloudflare Worker. Deploy it
  only within the user's authorized scope; otherwise report deployment pending.

Keep all chatbot implementation and evaluation assets under `docs/ai-chatbot/`.
Do not add chatbot functionality to the reusable Jekyll theme.
