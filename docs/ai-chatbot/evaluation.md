# Live evaluation

Checked against the deployed Worker on October 8, 2026. These are observations
from particular requests, not guarantees about every future model response.

## Answer quality

| Question | Observed result |
| --- | --- |
| Add a local MP4 video, with code | Correct `snippets/video.html` include with `fileurl` and video documentation source. |
| Change the skin and configure a project site's baseurl, in Spanish | Explains `chulapa-skin.skin`, `chulapa-skin.vars`, restarting Jekyll and an empty or repository-prefixed `baseurl`, with installation and theming sources. |
| Add favicons to a project site | Describes generating icons, hosting assets, the custom head include and URLs respecting `baseurl`, with the FAQ source. |
| Enable built-in payments and a shopping cart | Acknowledges that the reviewed documentation does not describe this feature. |
| Ask the author's favorite food | Acknowledges missing information rather than inventing personal details. |
| Subscribe to RSS | Returns the public RSS URL. |
| Ask whether context documents automatic RSS fetching | Does not claim that the assistant fetches the feed. |

The renderer intentionally keeps external links such as RealFaviconGenerator
as text; only public Chulapa source links are clickable. Liquid examples render
as code, and prose mentions of the theme use the `chulapa` class.

## Request limiting

The binding is configured for five requests per 60 seconds per connecting IP.
A sequential batch of six questions returned six HTTP 200 responses in about
18 seconds. A subsequent batch returned six HTTP 200 responses followed by
HTTP 429 with `Please wait a minute or use site search.` All requests in the
first batch reached the Madrid Cloudflare location.

This confirms a live rejection path. It does not confirm an exact five-request
cutoff or a global quota. Cloudflare documents the binding as local,
permissive and eventually consistent:
[Rate Limiting API](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).
The Workers Free allowance and absence of paid fallbacks remain the cost boundary.

## Updating context

The selective context expansion adds variables, Markdown and highlighting
guidance. It has been built and unit-tested locally but not deployed. After
deployment, check these additional questions:

- How do I change navbar and footer colors? Show `_config.yml` examples.
- How do I disable rounded Bootstrap buttons?
- How do I write a numbered list and a fenced YAML block?
- Does selecting a highlighting style in the demo save it to my site?
- Is the raised TOC button already available in v2.1.0?

When public documentation changes:

1. Review the changed pages and update the corresponding summaries and source
   URLs in `ai-context.md`. Preserve dates and omit drafts and private content.
2. Repeat the relevant questions above and add cases for any newly documented
   feature. Include an unsupported question to check the assistant's boundaries.
3. From `docs/ai-chatbot/`, run `npm ci`, `npm run build` and `npm test`.
4. Deploy the Worker with `npx wrangler deploy`, then repeat the relevant live
   questions and record material differences here.

Jekyll builds and GitHub Pages deployments do not update the Worker context.
Context updates are manual; no automatic RSS retrieval is configured.
