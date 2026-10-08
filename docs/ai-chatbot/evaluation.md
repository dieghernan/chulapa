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

## Variables dictionary update, October 8, 2026

Updated the reviewed context to cover all 33 configurable Chulapa variables,
including navbar hover backgrounds, custom toggle icons and the TOC sidebar
background. Added sizing, Bootstrap overrides, color inheritance and calculated
helper limitations. Moved the variables summary after the overview because
the first live run overlooked facts when the summary appeared later.

Built and deployed Worker version `d0becc8d-9be0-4e30-a3c8-6b4f0d5b244c`.
All 17 local tests passed. Four new evaluation cases and the two live run logs
are saved alongside the existing evaluations. The revised run answered all
three supported questions correctly. One answer omitted `/docs/` from its
dictionary source URL; source URL fidelity remains imperfect. The unsupported
temperature question correctly acknowledged missing context in the first run;
the revised run hit HTTP 429 and was not evaluated. The deployment did not
change the model, bindings or rate limit configuration.

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


## Mermaid context deployment, October 8, 2026

Deployed Worker version `013cd5dc-f707-4eda-91b1-bd62664bb974` with the
Mermaid and clipboard development guidance. All 17 local chatbot tests pass.
Targeted live results are saved in `evaluations/mermaid-final-2026-10-08.jsonl`.
The final answer correctly explains `mermaid: true`, the exclusion from v2.1.0,
and preservation of source text in the visitor's page if the CDN fails. Its
separate YAML and Mermaid examples are complete and its source link is correct.
Earlier runs incorrectly located source preservation on the CDN and nested
Markdown fences; explicit context guidance corrected both in the final run.
These checks consume Workers AI allowance; they do not change the Free plan.

## Starter context deployment, October 8, 2026

Deployed Worker version `140f5ab5-c855-4b49-b207-810f268f3c74` with the
starter examples guidance. All 17 local chatbot tests pass. The targeted live
result is saved in `evaluations/starters-2026-10-08.jsonl`. The reviewed answer
correctly directs readers to copy the portfolio starter and edit `_config.yml`,
explains that cards have no filtering and that starters have no deployment
workflow, and links to the start guide and the `chulapa-101` template option.

## Accessibility context review, October 8, 2026

The local context now distinguishes floating-menu keyboard behavior from the
lateral TOC's preserved Tab behavior, describes local font serving and Cactus
resource gating, and recommends chulapa-101 for a new site with deployment.
Focused cases `accessibility-1` and `resources-1` were added and `starter-1`
was updated. All 17 local tests passed. Deployment and targeted live evaluation
were pending at the time of this review; see the deployment recorded below.

## Chulapa 101 template and accessibility deployment, October 8, 2026

Deployed Worker version `76f6dc51-7442-4e40-83e3-5a48ddc04616` with the updated
template, full configuration, customization hooks and accessibility context.
All 17 local tests pass. Four focused live requests returned HTTP 200; full
responses are saved in `evaluations/starter-template-2026-10-08.jsonl`.

The installation answer correctly describes the template, Pages source,
configuration and deployment. The starter answer identifies the personal blog,
Fuse.js and archives and distinguishes it from a profile selector, but omits
some requested editing paths, pagination and hooks. The accessibility answer
preserves the lateral TOC's Tab behavior and does not claim certification, but
omits the release caveat. The resource answer identifies local theme assets and
conditional Cactus loading, but incorrectly locates font preload in CSS rather
than the HTML head. These observations are response-quality limitations, not
evidence that all live criteria passed.
