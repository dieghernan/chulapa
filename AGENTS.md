# Instructions for AI and coding agents

## Avoid unnecessary YAML options

As a general rule, theme changes must not introduce new YAML options in
templates, layout front matter or configuration files. Reuse existing data,
settings and conventions whenever possible. Add a YAML option only when it is
strictly necessary, and explicitly justify why existing mechanisms cannot
support the required behavior. This applies to internal template metadata as
well as user-facing settings. Convenience, speculative flexibility or personal
preference alone is not sufficient justification.

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

## Review accessibility and SEO when relevant

Before completing a change, assess whether it affects accessibility or SEO.
Review affected behavior whenever the change touches user-facing content,
navigation, controls, layouts, styles, media, page URLs or metadata.

- For accessibility, check semantics, accessible names, keyboard operation,
  visible focus, contrast, responsive reflow and reduced-motion behavior as
  relevant. Preserve intentional interactions, including the lateral TOC's
  Tab navigation, unless the task explicitly changes them.
- For SEO, check affected titles, descriptions, canonical URLs, indexing rules,
  language metadata, social previews, structured data and internal links.
- Use checks appropriate to the change. Inspect rendered pages for visual or
  interaction changes; automated audits alone do not establish accessibility.
  Validate generated HTML and URLs for metadata or routing changes.
- Update related documentation and examples when behavior or advice changes.
  Summarize what was checked and any material limitations. If neither area is
  affected, no additional audit is needed.

## Keep agent instructions out of published sites

Keep the root `AGENTS.md` excluded in `_config.yml` and `docs/AGENTS.md` excluded
in `docs/_config.yml`. Keep both outside the gem's packaged file selection.
Do not place agent instruction files in theme `assets/`, `_includes/`,
`_layouts/`, `_sass/` or `_data/`.

Remote themes download the repository but do not publish arbitrary root files
as theme assets. Do not rely on a `.jekyllignore` file: jekyll-remote-theme does
not implement that exclusion mechanism.
