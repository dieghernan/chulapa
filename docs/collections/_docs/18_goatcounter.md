---
title: Enable GoatCounter analytics
subtitle: Count visits on an existing published site
excerpt: Configure a GoatCounter counting address, publish in production and check a visit.
tags: [docs, analytics]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use this guide when your site is already published and you have created a site
in [GoatCounter](https://www.goatcounter.com/).

This integration requires <span class="chulapa">Chulapa</span> on `main` after
v2.1.0. It is not included in the v2.1.0 release or gem.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Set the counting address

In your repository's **Code** tab, open `_config.yml` and click the pencil.
Find the existing `goatcounter` setting and edit it, or add it once if absent:

```yaml
goatcounter: "https://YOUR-CODE.goatcounter.com/count"
```

Replace `YOUR-CODE` with your GoatCounter site's code. Use the complete HTTPS
counting address, including `/count`, rather than the dashboard address or just
the code. A self-hosted site can use an address such as
`https://stats.example.org/count`. Do not add your blog's repository path to it.
No API key or extra Jekyll plugin is needed.

If you want GoatCounter alone, clear existing `gtag_id` and `analytics_id`
values. Otherwise the Google snippets also load. Remove any manually inserted
copy of the same GoatCounter script from your custom includes to avoid counting
a visit twice. Preserve unrelated settings.

## Publish and check

Save with **Commit changes** on your publishing branch. Wait for the latest run
in **Actions** to succeed, then open your website from **Settings > Pages**.
Visit a page and check your GoatCounter dashboard; the visit may take a little
time to appear. The integration counts page views; it does not display a visitor
counter or configure custom events.

Counting is enabled only in a production build. For your own publishing workflow,
check that it builds with Jekyll's production environment. If you already preview
locally with Jekyll, the equivalent build command is:

```sh
JEKYLL_ENV=production bundle exec jekyll build
```

Normal local preview does not load this tracker, and GoatCounter ignores localhost
by default. Verify the published site instead.

## If no visit appears

- Check the theme version, production build and exact HTTPS counting address.
- Check that a browser blocker has not blocked the tracker. Blocking it does not
  prevent your page from displaying.
- If you configured a Content Security Policy, allow the script from
  `https://gc.zgo.at/count.js` and requests to your counting address.
- For the service's own counting rules and setup, consult
  [GoatCounter help](https://www.goatcounter.com/help/).

To disable the integration, leave `goatcounter` empty and publish again.
For supported values and version constraints, use
[the analytics reference](./02-config#goatcounter-analytics).
