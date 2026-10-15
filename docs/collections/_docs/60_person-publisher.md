---
title: Identify a personal site's publisher
subtitle: Set Person in search metadata without changing article authors
excerpt: Configure the publisher of a personal blog and verify the generated structured data.
---

Use this guide for a personal blog that you publish yourself. It changes the
publisher recorded in structured data, the machine-readable description supplied
to search engines. It does not change the author shown on an article or the
site's visible title. The publisher settings are available in v2.1.0 and later.

## Edit the publisher

Open `_config.yml` in your repository and edit its existing `publisher` mapping.
If none exists, add this section once, replacing the example name with yours:

```yaml
publisher:
  type: Person
  name: Jane Doe
```

Keep `Person` with that exact capitalization and preserve unrelated settings.
If your existing publisher has a `logo`, that field is ignored for a person;
you do not need to upload an organization logo for this task.

For a person's photograph, the theme can use the site author's avatar. If you
need a different existing image, set `publisher.image` in the same mapping to
its uploaded path or full URL. Keep `publisher.url` only if you want a publisher
website different from the site's home page. Use the [field reference](./02-config#publisher)
for defaults, image fallbacks and organization settings.

## Publish and inspect the result

Commit to the publishing branch, wait for **Actions** to succeed and open the
published home page and a post. For a local preview, restart Jekyll after editing
`_config.yml`.

View the page's HTML source and find the `application/ld+json` script describing
the website or article. Inside its `publisher` object, check that `@type` is
`Person` and `name` matches your publisher name. Check its `url` and any `image`
URL too, including the repository path when your site uses `baseurl`.

The article's author should still be its original author. A publisher identifies
who publishes the site; changing it does not rewrite guest-author settings.
Structured data does not guarantee a particular search result or preview.

If the publisher still says `Organization`, check the capitalization, duplicate
`publisher` sections and the latest published commit. Check [your theme version](./55-check-theme-version)
and local head/layout overrides if expected metadata is missing; an older local
copy can override the installed theme. Use [publishing checks](./42-unpublished-changes)
for old output and [YAML checks](./43-yaml-errors) for a failed build.
