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
Recent messages and interface state are kept in the current tab's
`sessionStorage`; Clear chat resets the messages and draft. Each question is
independent: the request sends only the current question. The reviewed context and Worker source live in
`ai-chatbot/`; context changes require rebuilding and redeploying that
Worker separately from the Jekyll site. This integration is specific to this
documentation site and is not a theme feature.

## Webmentions

This documentation site advertises its receiving endpoint in
`_includes/custom/custom_head.html`. Receiving mentions does not display them
on the site automatically.

The standalone `webmentions.yml` workflow runs after a successful Pages workflow,
using that run's generated site and commit. A manual run builds the docs and also
checks each source against the live site before sending.

Outgoing [Webmentions](https://www.w3.org/TR/webmention/) use canonical pages under
`https://dieghernan.github.io/chulapa` with an `e-content` region or the minimal
layout content boundaries, including guides, posts, demos and skin previews.
Only content links are considered, excluding shared
navigation and footers. Internal `/chulapa` links, non-HTTP links and `fed.brid.gy`
are excluded; links to the author's blog remain eligible.

The first run sends all existing eligible mentions. Later runs process new or
edited content. The `webmention-state` branch records successful deliveries and
destinations without an endpoint; network failures remain pending. Progress is
saved after each destination, so another run can continue after a timeout.
The workflow uses `GITHUB_TOKEN` with write permission for that state branch.
It does not currently notify receivers about removed links or deleted pages.

To inspect a built site without requests or state changes, run from the repository root:

```sh
python scripts/webmentions.py --site docs/_site --state state.json --dry-run
```
