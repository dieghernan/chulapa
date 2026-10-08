# My journal

Copy the contents of this directory into your own site repository.
Edit `_config.yml`: replace `username/site`, the title and description. Set
`url` to your site's origin and `baseurl` to `/repository` for a project site
or `""` for a root site. Replace the sample content and links.

Run from this directory:

```sh
bundle install
bundle exec jekyll serve --url http://localhost:4000 --baseurl ""
```

Open http://localhost:4000. Stop with Ctrl+C. Restart after config changes.

To publish, use a Jekyll GitHub Actions workflow; copying these files alone does
not configure deployment. Follow https://dieghernan.github.io/chulapa/docs/01-install.
Remote themes download their assets during the build, requiring network access.
This example follows Chulapa's default branch. Pin an existing release tag if
you need reproducible theme updates. Mermaid in the technical example requires
the updated default branch or a later release after v2.1.0.
