# Instructions for AI and coding agents

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
