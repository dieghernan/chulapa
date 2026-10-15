---
title: Add a favicon
subtitle: Publish an icon with a repository-safe address
---

Use this guide for an existing site. The browser-tab icon is a favicon; it is
separate from the site's logo or article images.

## Upload an icon

Generate an icon package at [RealFaviconGenerator](https://realfavicongenerator.net/)
and download it. Upload the extracted files to `assets/favicon/` in your
repository, preserving any files already there. The example below assumes the
package includes `favicon.ico`; match the filename and capitalization to your
actual file.

## Link the icon from the head

Create or edit `_includes/custom/custom_head.html`. Keep existing snippets and
edit any existing favicon link instead of adding a competing copy. For the ICO
file above, this is a complete icon link:

{% raw %}
```liquid
<link rel="icon" type="image/x-icon" href="{{ '/assets/favicon/favicon.ico' | relative_url }}">
```
{% endraw %}

Keep `relative_url`: it adds the site's `baseurl` for project sites. Do not put
`/my-blog` in the path yourself or paste a second `<head>` element into the hook.

For a fuller generated package, use its HTML instead, adjusting every icon URL
to the deployed location. Configure the generator for that location, including
`baseurl`, or use `relative_url` for site-relative paths. Check any manifest's
internal icon paths too. Do not assume adding an icon/manifest provides
[offline support or app installability](./48-accessibility-reference#pwa-and-offline-behavior).

Browsers can also discover `favicon.ico` at the domain root. A file at the root
of a project repository is not necessarily at the domain root; use the explicit
link above for a site under `/repository`.

## Publish and verify

Commit to the publishing branch, wait for **Actions** to succeed and open the
published site. Inspect its HTML source and open the icon URL: a project site
should include its repository path, such as `/my-blog/assets/favicon/favicon.ico`.
Verify the file loads rather than returning a 404, then check the browser tab.

If the tab still shows an old icon while the URL loads the new file, try a fresh
tab or browser session; browsers can cache favicons. For a missing file, check
its upload, exact name and generated path. For missing head HTML, use
[the custom-head checks](./44-custom-head#publish-and-verify).
