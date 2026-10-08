# <span class="chulapa">Chulapa</span> website

This directory contains the source of the [<span class="chulapa">Chulapa</span> documentation site](https://dieghernan.github.io/chulapa/), including the guides in `collections/_docs`, layout demos and skin previews. These Markdown files are maintained sources, not generated output.

The theme source lives in the parent directory. The documentation site uses
its own `_config.yml` and Gemfile, with a remote theme pointing to this
repository's default branch.

To preview the documentation, run these commands from `docs/`:

```sh
bundle install
bundle exec jekyll serve
```

The remote theme supplies layouts, includes and Sass files. Editing those
files in the parent directory does not change the remote theme used by this
preview. See `test/README.md` for checks that use the local theme includes.

## Documentation assistant

The homepage, documentation index and guides load an experimental AI assistant from the
Cloudflare Worker configured under `docs_chat` in this site's `_config.yml`.
Set `docs_chat.enabled: false` to disable it. Keep `worker_url` without a trailing
slash. The custom bottom include loads the widget only on the homepage, `/docs` and documents
in the `docs` collection. Other pages use the ordinary theme includes.

Questions go to Cloudflare Workers AI. The widget includes a processing notice,
source links and a link to the site's search with the configured `baseurl`.
The launcher sits at the bottom right on desktop. Below Bootstrap's 992 px
breakpoint it mirrors the FAB at the bottom left, sharing its margins and
diameter. The theme positions the TOC sidebar control above it. Opening either
navigation closes and hides the chat until both are closed.
Each question is independent. The reviewed context and Worker source live in
`ai-chatbot/`; context changes require rebuilding and redeploying that
Worker separately from the Jekyll site. This integration is specific to this
documentation site and is not a theme feature.
