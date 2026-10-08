# Live evaluation

## Long-history scrolling

Reproduced the secondary panel scrollbar in Chrome with 20 long restored
messages: the outer panel measured 462 px high with 41,418 px of scrollable
overflow. Clipping the message log's paint overflow and constraining its flex
size leaves scrolling inside the log. After the fix the outer panel's client
and scroll heights both measured 462 px; at a 390 × 780 mobile viewport both
measured 572 px. The message history still scrolls, while header and form stay
visible. Physical iPhone confirmation remains useful.

See [the documentation and community batch review](evaluations/review-2026-10-08.md)
for the expanded question set, raw answers and selective context changes.

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
| What skins are available? | Returns actual names, the complete named-skin list and a link to the visual catalog after adding the inventory and an explicit availability instruction. |

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

Physical iPhone screenshots showed automatic zoom and horizontal clipping when
focusing the question field. The mobile input now uses 16 px text, and the panel
tracks the visual viewport to fit above the keyboard. A repeat on the physical
phone is needed to confirm the result; desktop viewport checks do not reproduce
iOS keyboard behavior.

The deployed selective context expansion adds variables, Markdown and highlighting
guidance. These questions form the regression checklist:

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

## Chat interaction improvements

The question field explains that requests are independent. Opening on screens
below 992 px focuses the close button instead of opening the keyboard. Mobile
answers use 16 px text, code examples have copy buttons and long answers reveal
their beginning unless the reader has scrolled elsewhere while waiting.

Failed requests offer retry and a search link. Retry sends only the failed
question without adding another question bubble. Recent history (up to 20
messages), the draft and unfinished question are stored in sessionStorage for
the current tab. They are never included in inference requests. Clear chat
removes the saved messages and draft. Blocked storage does not prevent chat use.

Widget tests cover focus, failure/retry, payload independence, safe restoration,
copy and clearing. Real viewport checks cover layout and response scrolling;
physical iPhone keyboard and VoiceOver checks remain pending.

Live checks confirmed code copying, history and draft restoration across a reload
and source navigation, mobile close-button focus, desktop input focus and keeping
the reader's scroll position during inference. At 844 × 390 px the compact header
leaves 162 px for messages. A broad navbar/footer question exhausted the output
token limit and produced incomplete YAML; the Worker now rejects responses marked
`finish_reason: length` with a request to ask a more specific question. The prompt
also asks for fewer than 150 words and one small complete example.

Physical iPhone portrait screenshots confirmed opening without the keyboard and
keeping the input visible when typing. Landscape with the keyboard showed the
panel disappearing. Below 260 px of visual viewport height, the widget now uses
a compact composer anchored to the visible viewport top, with input, send and
close controls. Other content returns after the keyboard closes. A completed or
failed request dismisses the focused input in compact mode so the result can be
read. This landscape correction still needs a repeat on the physical phone.
