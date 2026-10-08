# Test site

This directory contains a Jekyll demo site and regression checks for the theme.

## Preview the site

From the repository root:

```powershell
cd test
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000. Jekyll rebuilds the site when its source files
change; refresh the browser to see the result. Stop it with Ctrl+C. Restart
when changing the theme's own files outside `test`.

The Gemfile selects the root gemspec explicitly, avoiding old copies under
`_site`. If an existing lockfile still selects an old version, run
`bundle update chulapa-jekyll` once before starting the server.

On this Windows/Ruby 3.4 setup, `--livereload` fails because EventMachine's
native extension does not load. The normal server works without that option.
The test configuration already has an empty `baseurl`, so no CLI override is
needed.

## Regression checks

Run the checks from the repository root after `bundle install`:

```sh
bundle exec ruby test/check_seo_fixes.rb
bundle exec ruby test/check_head_metadata.rb
bundle exec ruby test/check_fontawesome_kit.rb
bundle exec ruby test/check_skins_grid.rb
bundle exec ruby test/check_social_metadata.rb
bundle exec ruby test/check_article_metadata.rb
bundle exec ruby test/check_article_images.rb
bundle exec ruby test/check_microdata.rb
bundle exec ruby test/check_video_examples.rb
node --test test/check_chulapa_script.js test/check_mermaid.mjs
bundle exec ruby test/check_mermaid.rb
```

The Ruby checks build temporary fixtures or inspect theme sources to verify
metadata and video examples. The JavaScript check exercises the theme script.
They do not require deployment of the demo site.

To check packaging, install the built gem in a temporary directory and build
the test site and complete documentation site from that installation:

```sh
gem build chulapa-jekyll.gemspec
bundle exec ruby test/check_theme_installation.rb
```

This also checks generated pagination, canonical URLs and sitemap entries in
root and subdirectory deployments. It does not install the theme globally.

## Jekyll 3 compatibility

Build the gem from the repository root, then run these commands in PowerShell:

```powershell
cd test
$env:BUNDLE_GEMFILE = Join-Path $PWD 'jekyll3/Gemfile'
bundle install
bundle exec ruby check_seo_fixes.rb
bundle exec ruby check_head_metadata.rb
bundle exec ruby check_social_metadata.rb
bundle exec ruby check_article_metadata.rb
bundle exec ruby check_article_images.rb
bundle exec ruby check_microdata.rb
bundle exec ruby check_video_examples.rb
bundle exec ruby check_minimal_header.rb
bundle exec ruby check_theme_installation.rb
Remove-Item Env:BUNDLE_GEMFILE
```

Run from `test`: Jekyll 3 checks the current directory for layouts before the
fixture source. Running from the repository root can select the wrong layouts.
The compatibility bundle deliberately excludes the local theme dependency so
the installation check can select the temporary installed gem.
