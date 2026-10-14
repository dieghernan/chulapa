---
title: Enable Google Analytics 4
subtitle: Connect a published site to an existing GA4 web stream
excerpt: Set a measurement ID, publish and check the integration without adding a duplicate script.
tags: [docs, analytics]
show_related: true
---

Use this guide when your site is published and you have a Google Analytics 4
property with a web data stream for it. In [Google Analytics](https://analytics.google.com/),
open **Admin > Data streams**, select that web stream and copy its
**Measurement ID**, starting with `G-`.

## Set the measurement ID

In your repository's **Code** tab, open `_config.yml` and click the pencil.
Edit the existing `gtag_id` entry, or add it once if absent:

```yaml
gtag_id: G-XXXXXXXXXX
```

Replace the example with your own measurement ID. Preserve unrelated settings.
Leave `analytics_id` empty: it is for retired Universal Analytics, not GA4.
Do not paste an additional Google tag into your custom includes; the theme adds
it from this setting. Remove a manually inserted duplicate of the same tracker.

If you want only Google Analytics, leave `goatcounter` empty. The two integrations
are independent; configuring both loads both services.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
Visit a page and check the **Realtime** report in the matching Analytics property.
Allow time for reporting and check that you copied the ID from the intended stream.

A browser blocker or a site's custom consent controls can prevent the tracking
request. Check those controls if no visit appears. Unlike GoatCounter's built-in
integration, this Google tag is not restricted to production builds; an enabled
ID also loads it during local preview.

To disable this integration, leave `gtag_id` empty and publish again. Also clear
`analytics_id` if it still contains an old value. For the exact settings, use
[the Google Analytics reference](./02-config#google-analytics).
