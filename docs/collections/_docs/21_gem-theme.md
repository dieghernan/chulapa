---
title: Install using the theme gem
subtitle: Add the released theme to an existing Jekyll site
excerpt: Install the theme gem, enable its include-cache plugin and verify your build.
tags: [docs, installation, theme-updates]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide when you already have a Jekyll site and use Bundler to build it.
For a first website without local installation, follow [the browser tutorial](./00-start).
Use gem version 2.2.0 or later for the features marked **v2.2.0**.

## Configure the gem

Work in a branch or save a backup. Add this entry to your existing `Gemfile`,
or edit it if already present:

```ruby
gem "chulapa-jekyll"
```

Keep your Jekyll and other site dependencies. Remove the old theme gem if it
was only used by the theme you are replacing. In `_config.yml`, remove any
`remote_theme` entry and replace the old `theme` value with:

```yaml
theme: chulapa-jekyll
```

Enable `jekyll-include-cache` in the existing `plugins` list. The theme gem
installs it as a dependency, but Jekyll still needs it enabled:

```yaml
plugins:
  - jekyll-include-cache
```

Preserve your other plugins and keep only one list. If switching from the remote
method, remove `jekyll-remote-theme` from that list; remove its Gemfile entry
if nothing else in your site needs it.

From the directory containing your `Gemfile`, run:

```sh
bundle install
bundle exec jekyll serve
```

Open the local address printed by Jekyll. Check the home page and an existing
post or page. Restart the preview after changing `_config.yml`.

Local layouts, includes and matching assets override the installed theme.
Review copied files when changing or updating themes; installing a gem does
not replace those copies. See [local override guidance](./04-layouts#javascript-assets-and-local-overrides).
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

## Publish and check

Commit your configuration and dependency changes, including `Gemfile.lock` if
your repository tracks it. Use a publishing workflow that installs your bundle
and builds with Jekyll. If setting up GitHub Actions, follow the
[publishing setup](./20-remote-theme#publish-and-check), keeping the gem-based
theme setting from this guide.

Wait for the publishing run to succeed and open the deployed site. Check the
home page, an article, images and menu links on a narrow screen. For a different
host, use your existing deployment process. Review the [migration checklist](./07-migration)
when replacing another theme.

To update only the theme and its dependencies, run:

```sh
bundle update chulapa-jekyll
```

Existing version constraints in your `Gemfile` still apply. Review release notes
and local overrides, then repeat the preview and publication checks. For an
unknown `include_cached` tag, check that `jekyll-include-cache` is installed and
enabled before rebuilding.
