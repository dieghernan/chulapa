---
title: Point a republished article to its original URL
subtitle: Set a canonical URL without changing the copied page's address
excerpt: Identify an article's original version, exclude the duplicate from a jekyll-sitemap index and verify generated metadata.
---

Use this guide when you publish a copy of an article and want its metadata to
identify the original version. You need the original article's complete public
URL and an existing post or page to edit. Ordinary unique articles do not need
a custom canonical URL.

## Identify the original article

Open the copied article's `.md` file. Inside its existing front matter (between
the `---` lines), add or update `canonical_url`, replacing the example with the
actual original article address:

```yaml
canonical_url: https://example.com/original-article/
```

Preserve the copied page's `title`, intended `permalink` and other settings.
Use the complete `https://` address for an original article on another website.
For an original on your own site, a path beginning with `/` is also accepted;
it resolves using your site's `url` and `baseurl`.

**This is not a redirect.** Visitors still open the copy at its existing address.
The canonical URL identifies the original in generated metadata and feed links;
it does not move or delete the copied page.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Exclude the copy from a generated sitemap when applicable

If your publishing setup uses `jekyll-sitemap`, add this to the copied article's
existing front matter:

```yaml
sitemap: false
```

Keep `false` unquoted. The plugin otherwise lists the copied page's actual URL;
`canonical_url` does not rewrite that entry to the original address. Keep the
original article in its own site's sitemap. If you maintain a sitemap another
way, review that setup separately; this field is a `jekyll-sitemap` control.

Do not use the same canonical override on every page of a paginated series.
Those pages are distinct destinations and should retain their own canonical URLs.

## Publish and verify

Commit on the publishing branch, wait for **Actions** to succeed and open the
copy at its existing website address. Confirm that it still displays its content.
View its HTML source and check that `<link rel="canonical">` and `og:url` identify
the original. Check the page/article JSON-LD URL too. If the article is in a built-in
feed, inspect its entry's article link: it should also identify the original.

When using `jekyll-sitemap`, open the published `sitemap.xml` and confirm that
the copy's address is absent. Check the original address directly to make sure
it loads. Local builds cannot establish that an external original is reachable.

If metadata still uses the copy's address, check spelling, the saved publishing
commit and local head/layout overrides. Blank values, unsupported URL schemes
and protocol-relative addresses such as `//example.com/article/` fall back to
the page's own URL. Fragments are removed. See the
[canonical field reference](./04-layouts#seo-metadata) and
[publishing checks](./42-unpublished-changes).
