# Instructions for AI and coding agents

## Check user-facing changes against the documentation

Before completing a change to the reusable Chulapa theme, check whether it
affects documented behavior. This includes configuration options, defaults,
layouts, includes, snippets, navigation, responsive styles, accessibility,
metadata and compatibility with supported Jekyll versions.

- Compare the implementation with the relevant pages under
  `docs/collections/_docs/`, demos, configuration examples and README.
- Update affected documentation and examples in the same task. Describe the
  actual behavior, correct option names and defaults, and any installation or
  version limitations. Avoid documenting development-only changes as released.
- Consider a concise entry in the development changelog for user-facing fixes
  or features. Follow the existing changelog structure; internal changes and
  small wording corrections do not need an entry.
- Validate the affected behavior with appropriate checks. For visual or
  responsive changes, inspect relevant viewport sizes; tests without layout
  support do not establish that the rendered UI is correct.
- In the task summary, state which documentation was updated, or briefly
  explain why a documentation change was unnecessary.

When working in `docs/`, also follow `docs/AGENTS.md`. Theme changes that alter
documented advice may require updating `docs/ai-chatbot/ai-context.md` even when
the implementation is outside `docs/`. Keep chatbot code and evaluation assets
under `docs/ai-chatbot/`; do not add them to the reusable theme.

## Keep agent instructions out of published sites

Keep the root `AGENTS.md` excluded in `_config.yml` and `docs/AGENTS.md` excluded
in `docs/_config.yml`. Keep both outside the gem's packaged file selection.
Do not place agent instruction files in theme `assets/`, `_includes/`,
`_layouts/`, `_sass/` or `_data/`.

Remote themes download the repository but do not publish arbitrary root files
as theme assets. Do not rely on a `.jekyllignore` file: jekyll-remote-theme does
not implement that exclusion mechanism.
