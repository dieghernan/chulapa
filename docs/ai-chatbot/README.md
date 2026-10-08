# Chulapa documentation assistant

This assistant implements issue #74 as a documentation-site extension. It
serves an embeddable widget from one Cloudflare Worker. The site's
custom include loads it on the homepage, documentation index and guides, controlled by
`docs_chat` in `docs/_config.yml`. There are no API keys in the browser.

## Build and test

```sh
cd docs/ai-chatbot
npm ci
npm run build
npm test
```

Review `ai-context.md` against the public documentation before deployment.
Regenerate the bundle after changing the context, widget or Worker. Deployments
do not automatically synchronize with Jekyll builds. The selected context is
deliberately limited; the assistant must acknowledge missing information.
It covers installation, theming, layouts, videos, galleries, carousels, tables of
contents, mathematics, navigation, comments, search, feeds and SEO controls. All
FAQ questions are represented in compact summaries, including favicons, icons,
skin previews, YAML errors and replacing the Atom feed with jekyll-feed.
The context includes the public RSS URL as a link for visitors. Feed entries are
not embedded or fetched automatically.

## Cloudflare setup

Keep the account on **Workers Free**. As checked on October 8, 2026, Workers AI
provides 10,000 Neurons per day and stops at that allowance on Free. Do not upgrade
or configure a paid fallback. Account quotas are shared across applications.

The prototype uses `@cf/google/gemma-4-26b-a4b-it`, an `AI` Workers AI binding and
a `CHAT_RATE_LIMIT` rate limiter with five requests per IP per minute. It refuses
inference when either binding is missing. Cloudflare's rate limiter is approximate
and local to each Cloudflare location; it is not a strict global spending counter.
CORS permits the Worker origin, the documentation origin and localhost:4000.
CORS is not protection against direct endpoint calls.

With Wrangler, run `wrangler deploy` from this directory after building. The
configuration includes both bindings. `dashboard-worker.mjs` is a self-contained
bundle for inspection, but the rate limiter must be configured through Wrangler;
it is not currently visible in the dashboard. Never paste credentials into
source files. Keep request-body logging disabled.

Preview the interface through the documentation site's Jekyll build. There is
no separate demo page or preview server. This directory is excluded from the
Jekyll output; the deployed Worker serves the bundled widget.

## Embed in a Chulapa site

After validating the prototype, add this to the site's existing
`_includes/custom/custom_bottomscripts.html`, preserving its other content:

```html
<script defer src="https://YOUR-WORKER.workers.dev/widget.js"
        data-search="{{ '/search' | relative_url }}"></script>
```

For a different site, update the Worker origin allowlist, reviewed context and
the widget's source-link policy before deployment. This prototype currently
answers about Chulapa and permits documentation URLs under its public site.
No chat code is loaded until the script is explicitly added. The widget uses a
Shadow DOM, sanitized Markdown responses, keyboard controls and an external-processing
notice. It does not store conversation history; every question is independent.
Marked and DOMPurify are bundled into the widget, so rendering needs no CDN.
Formatting includes lists, code blocks and tables. Only links to the public
Chulapa documentation site remain clickable; images and interactive HTML are
removed. Visitor questions remain plain text.

## Evaluation

Check documented installation, skins and baseurl questions in English and Spanish.
Ask about an undocumented feature and an unrelated topic. Check that answers
acknowledge missing facts and link to relevant original pages. Check six rapid
questions, malformed and oversized requests, missing bindings and inference
failure. Test narrow screens, keyboard navigation, Escape and long answers.
Mock tests verify failure handling; only live inference can establish model quality.

## Initial live results

Deployed at https://chulapa-ai-prototype.dieghernan.workers.dev on October 8, 2026.
Spanish installation and skin questions returned relevant documentation links.
Questions about built-in payment support and the author's favorite food correctly
acknowledged missing context. The widget was checked at a 390 px viewport width.
Seven local Worker tests pass, including invalid input, unavailable inference,
missing bindings, CORS and a denied rate-limit result.

A live six-request burst returned six successful responses despite the configured
five-per-minute limiter. Enforcement was therefore **not verified** in that test.
Cloudflare documents approximate counters and limits local to each location;
IP limits also affect visitors sharing an address. Investigate the observed burst
behavior before treating this prototype's limiter as suitable for wider exposure.
The account's Free-plan quota remains the cost boundary.

References:

- https://www.malte-grosser.com/post/adding-a-free-ai-chatbot/
- https://www.freecodecamp.org/news/how-to-build-an-embeddable-ai-chatbot-widget-with-cloudflare-workers/
- https://developers.cloudflare.com/workers-ai/platform/pricing/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
