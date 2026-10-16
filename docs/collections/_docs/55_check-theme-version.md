---
title: Check which theme version your site uses
subtitle: Identify the selected release before troubleshooting or upgrading
tags: [docs, installation, theme-updates]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an existing site when an option does not match its
documentation or you need to identify your current release. These checks do not
upgrade the theme.

## Check the selected theme

For a remote-theme installation, open `_config.yml` and find `remote_theme`:

```yaml
remote_theme: dieghernan/chulapa@v2.1.0
```

Here, `@v2.1.0` selects that release. An unpinned value such as
`dieghernan/chulapa` follows the repository's default branch; it does not select
a fixed release. An explicit branch can move too. Record the value you actually
have rather than replacing it with this example.

For a gem installation, open `Gemfile.lock` and find the `chulapa-jekyll` entry
and its resolved version. The Gemfile's version requirement alone may allow
more than one version. If you have no lockfile, this check cannot identify the
resolved gem used for the build; inspect the publishing build's dependency output.

## Compare with the published website

Open the published page's HTML source and search for this comment near the
beginning, replacing the example text with the version displayed:

```html
<!-- Chulapa Jekyll Theme - VERSION NUMBER HERE -->
```

An `unreleased` suffix identifies a development build, not a published release.
For example, the 2.2.0 candidate is not yet published even though its source and
locally built gem use that version number.

This marker is present on pages using the theme's head include. If it is absent,
check whether a local layout or head include replaced it. If the page is old,
[verify the publishing run and website address](./42-unpublished-changes).

**The marker is not an exact commit identifier.** It cannot identify a specific
unpinned remote-theme revision or describe local overrides. A version selected
in source also does not prove that the latest build has been published.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

Keep the configured tag or resolved gem version with your troubleshooting
notes. Before relying on a documented feature, check its release caveat. When
ready to change versions, use the [remote-theme](./20-remote-theme) or
[gem installation guide](./21-gem-theme), and review
[local overrides](./45-custom-hooks#scope-and-precedence).
