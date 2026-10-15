---
title: Keep a jekyll-feed subscription address
subtitle: Preserve an existing feed alongside the theme's Atom and RSS files
---

Use this guide when your existing site uses `jekyll-feed`, especially if readers
already subscribe to `/feed.xml`. If you only need a new subscription feed, use
[the built-in feeds](./56-publish-feeds) without another plugin.

## Check the plugin and its address

Keep your existing `jekyll-feed` dependency and plugin entry. If it is not yet
installed but you need it, follow its [installation guide](https://github.com/jekyll/jekyll-feed#installation)
for your publishing setup. Preserve the other Gemfile dependencies and
`_config.yml` plugins; the theme's `include_on_feed` setting does not configure
the plugin's selection of posts.

Check the existing `feed.path` setting in `_config.yml`. The plugin's default
`/feed.xml` can coexist with the theme's `/atom.xml` and `/rss.xml`. Keep the
existing subscription address unless you have a separate plan for subscribers.

**Avoid duplicate output paths.** Pointing `jekyll-feed` at `/atom.xml` or
`/rss.xml` while the theme generates the same file creates a collision. Do not
use that path as a quick replacement or assume the last generated file is stable.
{: .alert .alert-warning .p-3 .mx-2 .mb-3}

If your existing plugin already uses one of those addresses, resolve the
collision before publishing. This guide covers coexistence at separate URLs;
it does not provide a switch to disable the theme's feeds. Review existing
local overrides and the plugin's configuration rather than inventing a YAML
flag or simply deleting a URL readers use.

## Publish and verify

Commit to the publishing branch and wait for **Actions** to succeed. Open the
existing subscription URL on the published site, including `baseurl` for a
project site. Add it to a feed reader, check a recent entry and follow its link.
Check `/atom.xml` and `/rss.xml` as well if you retain the built-in feeds.

Follow [Edit footer links](./11-edit-footer) to keep the subscription link at
its chosen address, such as `url: /feed.xml`, without a repository prefix.
The theme's standard head still advertises its built-in Atom and RSS feeds;
adding the plugin or changing a footer link does not replace those head links.

If the plugin feed is missing, check that the publishing environment loads
`jekyll-feed`, its configured path and any same-path files. If the entries
are unexpected, use the plugin's own configuration documentation; do not try
to control it with the theme's `include_on_feed` field.
