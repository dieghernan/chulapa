---
title: Add a Font Awesome icon to an article
subtitle: Place an icon in Markdown without losing its meaning
---

Use this guide on an existing site using the theme's stylesheets. Font Awesome
is already loaded; do not add another script or stylesheet to the article.

## Insert the icon

Edit a post or page's `.md` file. Below its front matter (the settings between
`---` lines), paste this complete example, keeping the surrounding text:

```html
<i class="fas fa-exclamation-circle" aria-hidden="true"></i> Check the publication date.
```

<i class="fas fa-exclamation-circle" aria-hidden="true"></i> Check the publication date.

The text carries the meaning; `aria-hidden="true"` keeps the decorative icon
from being announced again by screen readers. Do not replace a link or button's
accessible name with an icon alone.

To choose another icon, use the [Font Awesome catalog](https://fontawesome.com/search?ic=free).
Copy the classes for a free icon available in your configured version; a paid
icon or a class from a different version may not display. Replace only the
example's classes and text, retaining `aria-hidden="true"` for decorative icons.

## Publish and check

Commit the article on the publishing branch, wait for **Actions** to succeed and
open the published page. The GitHub Markdown preview does not establish that
the site's icon stylesheet loaded. Check that the icon and its explanatory text
both appear, including on a narrow screen.

If the icon is missing, check its spelling and whether it is available in your
Font Awesome version or kit. Inspect failed stylesheet/kit requests in the
browser's developer tools; blocked external resources can prevent rendering.
Do not add duplicate loaders as a workaround.

For version selection, v4 compatibility and kit settings, use the
[Font Awesome reference](./02-config#font-awesome).
