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
