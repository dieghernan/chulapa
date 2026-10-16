---
title: Add custom HTML to the page head
subtitle: Use a supported hook without copying a layout
tags: [docs, custom-hooks]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide for an existing site using the theme's layouts. Have the HTML
snippet you want in `<head>` ready. For Google Analytics or GoatCounter, use
the [analytics guides](./18-goatcounter) and [GA4 guide](./19-google-analytics)
instead of installing the same script twice. Check their version requirements.

## Edit the head hook

In your repository, create or edit `_includes/custom/custom_head.html`. Keep
existing snippets in the file. Append the HTML required by your provider; no
YAML front matter or layout copy is needed in this include.

For a small example, this adds application-name metadata:

```html
<meta name="application-name" content="Field Notes">
```

Replace `Field Notes` with your site's name, or use the actual snippet required by your
provider. The hook inserts HTML after the theme's stylesheets, near the end of
`<head>`. Do not paste an entire HTML document into it.

If the provider specifically requires insertion before CSS or at the end of
`<body>`, choose the corresponding file in [the hook reference](./45-custom-hooks)
and follow that provider's dependency/loading instructions instead.

## Publish and verify

Commit on the publishing branch and wait for **Actions** to finish successfully.
Open an article on the website and inspect its HTML source: the sample `meta`
tag, or your snippet, must appear inside `<head>`. Also check a search page if
your site has one; the hook works with the built-in `minimal` and `search` layouts.

If it is missing, check the filename, leading underscore in `_includes`, branch
and deployment. Review any local layout or head include that overrides the theme.
If the HTML appears but a third-party script fails, inspect its network errors,
provider configuration and any browser or Content Security Policy restrictions.
For an old public page, follow [the publishing checks](./42-unpublished-changes).

CSS rules belong in `assets/css/custom.scss`, with its empty YAML front matter
retained, rather than as raw CSS text in this HTML include. See
[the supported files](./45-custom-hooks).
