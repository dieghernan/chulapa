# Chulapa documentation assistant

This assistant implements issue #74 as a documentation-site extension. It
serves an embeddable widget from one Cloudflare Worker. The site's
custom include loads it on the homepage, documentation index, guides and the
Ask Chulapa announcement post, controlled by
`docs_chat` in `docs/_config.yml`. There are no API keys in the browser.

The launcher combines AI lettering inspired by the
[basic EU AI icon](https://digital-strategy.ec.europa.eu/en/policies/eu-icons-labelling-ai-generated-content)
with a sparkle. This custom launcher graphic is distinct from the official
content labels. The chat header retains the original sparkles.

## Build and test

```sh
cd docs/ai-chatbot
npm ci
npm run build
npm test
```

The deployment-gate test requires Bash. On Windows, it prefers Git Bash from the
standard Git installation and otherwise uses Bash on `PATH`. Build fixtures use
directory junctions on Windows so administrator privileges are not required.

The theme regression workflow also runs `npm test` on pull requests and pushes
to `main`, without deploying or invoking live AI. The tests cover Worker routes,
streamed UTF-8 and input limits, CORS, binding and rate-limiter failures, sanitized
Markdown and links, duplicate submissions, drafts and clipboard failures. A
bundle check compares the generated Worker bundle's context with `ai-context.md` to
catch stale or incomplete generated content.

Review `ai-context.md` against the public documentation before deployment.
The build rejects a source library larger than **53,000 UTF-8 bytes**, before
generating artifacts. This replaces the former 47,000-byte editorial budget: the
reviewed increase preserves explicit provider boundaries and complete recipes
rather than compressing instructions into ambiguous phrases. It is not the
per-request input budget or a model token limit. Keep
supported settings, defaults, release caveats, complete small examples and exact
source URLs; consolidate repeated advice before adding material. Increasing the
budget requires an explicit review of the reason and coverage. Byte reduction
alone does not demonstrate faster or equally accurate answers.
See [the October context review](evaluations/context-review-2026-10-14.md) for
baseline measurements, validation and outstanding live evaluation.
Regenerate the bundle after changing the context, widget or Worker. Deployments
do not automatically synchronize with Jekyll builds. The selected context is
deliberately limited; the assistant must acknowledge missing information.
It covers installation, theming, layouts, videos, galleries, carousels, tables of
contents, mathematics, navigation, comments, search, feeds and SEO controls. All
FAQ questions are represented in compact summaries, including favicons, icons,
skin previews, YAML errors and replacing the Atom feed with jekyll-feed.
It also summarizes selected Sass variables, Markdown syntax and highlighting
style configuration. Unpublished development changes are explicitly marked.
The context includes the public RSS URL as a link for visitors. Feed entries are
not embedded or fetched automatically.

## Local candidate: context selection and citations

The local candidate selects whole sections for each question using explicit topic
aliases, heading/parameter matches and uncommon body terms, including common Spanish terms. It always
keeps the version/preservation instructions and documentation directory, adds
relevant task/reference sections and caps the selected source context at 18,000
UTF-8 bytes. Code fences are not split, including headings inside tutorial code.
No embedding service, extra model call, network retrieval or conversation history
is used. The full source library remains bundled for other questions.

Single-provider setup questions exclude other providers' specific sections.
Comparison, alternative-provider and plain inventory questions retain all supported provider
sections, including their restrictions. Information-box synonyms route to the
existing alert recipe.
This is deterministic topic selection, not semantic search: aliases can miss a
question or select irrelevant sections. Offline coverage checks do not prove the
model will answer correctly. Unknown topics retain the directory and instructions
to acknowledge gaps rather than receiving the whole library.

Prose URLs in inline Markdown links, bare URLs, autolinks, reference links and raw
HTML must exactly match URLs in the selected source context. Fenced and inline
code examples are excluded. An unsupported URL or invented fragment produces a search fallback
without a retry or second inference. This checks URL identity, not semantic support,
HTTP availability or the factual accuracy of the surrounding answer. The existing renderer still
controls which domains become clickable. Future live checks must assess both answer
quality and unnecessary fallback rates.

The active runtime is source `dd9e23b90`, Worker
`64ee01ab-3f43-4d32-b90b-df0264e04cfb`, deployed locally on 18 October 2026.
77 local tests pass. Four catalog requests on this exact artifact produced two
reviewed passes and two task-validation search recoveries (unavailable, not
passes). There are 151 unrun catalog cases plus two unavailable retries:
153 pending. Earlier version outcomes are preserved separately and not transferred.
See the [bounded-validation review](evaluations/pr164-bounded-validation-2026-10-18.md)
and [active manifest](evaluations/candidate-evidence.json).

Four platform/options inventory variants in English/Spanish passed manual review
on the preceding ff5be537f artifact, listing all five providers and explicitly
unavailable original Cusdis hosting. They are supplementary, outside the catalog.
The TOC and guide-discovery tasks still do not receive a successful answer; the
bounded guard prevents delivery of specific observed defects rather than repairing
the model or validating arbitrary prose. Keep the PR open for those limitations
and the unresolved Netlify preview failure. Canonical public documentation already
supports the facts; this routing/validation task did not change ai-context.md or
require a new llms.txt entry. No new UI, SEO metadata or PWA behavior changed.
Historical source 549f876dd was deployed locally on 16 October 2026 as Worker 90b4709a-c8ce-4946-838a-d85d12922e73. All four first-batch cases passed review on this source; 151 cases remained untested on that historical source. See [the batch review](evaluations/candidate-regression-01-549f876dd-review.json). Public documentation
and llms.txt already describe the corrected facts; neither needs a new page or entry.

## Pending evaluations

Run `node evaluation-batches.mjs` to regenerate the offline
[batch register](evaluations/pending-batches-2026-10-16.md) and its JSON companion.
The [candidate evidence manifest](evaluations/candidate-evidence.json) selects the
review and raw response files; regeneration validates their revision, unique IDs
and answer/review consistency before writing either register. Reviewed answers are excluded from pending commands. Cases reviewed as
`unavailable` remain retryable and count toward `candidate_remaining_count`;
`candidate_unavailable_count` identifies that subset. A retry command is a plan,
not an automatic inference. Factual baseline and candidate reviews require a
nonempty answer-bearing HTTP 200 record.

Generated run names include the evaluated revision and skip existing run files
with a retry suffix. The live evaluator reserves its evidence file exclusively
before making requests; reusing a run name fails without modifying old evidence. Change the manifest only when recording
evidence for a new evaluated revision; earlier passes must not be transferred to it.
Earlier passes remain associated with their original sources. Current coverage
is regenerated only from the selected snapshot's raw responses and reviews.

It distinguishes the 56 baseline responses, their reviews, the 99 catalog cases
without a completed baseline record and candidate coverage tied to an exact evaluated source.
The interrupted run may have started a request without writing a result; absence
of a raw record is not proof that no request was initiated.

Planned batches contain at most four cases and explicit IDs. The regression,
unfinished-baseline and complete-candidate lists overlap; do not run all three.
Begin with a small regression batch only after separately authorizing quota use
and verifying deployment. Regenerating the plan sends no requests.

## Automatic deployment

The `Deploy chatbot` workflow deploys the Worker on pushes to `main` that
change `docs/ai-chatbot/` or the workflow itself. It installs dependencies and
runs `npm test`, which rebuilds the context and widget, before deploying with
Wrangler. After tests pass, `wait-for-pages.sh` waits for a successful Pages
push run for the exact same commit before the Worker is deployed. Missing,
failed or cancelled Pages runs prevent deployment, keeping new context citations
from going live before their documentation. The workflow uses the built-in
GitHub token with `actions: read` for this check. It can also be run manually from
GitHub Actions for a commit with a successful Pages push run. Pull requests do not deploy.

Configure repository Actions secrets `CLOUDFLARE_API_TOKEN` (Cloudflare account
permission **Workers Scripts: Edit**) and `CLOUDFLARE_ACCOUNT_ID` for the account
hosting the existing Worker. Deployment uses `wrangler.jsonc`, including the AI
and rate-limiter bindings, and does not invoke live AI. Jekyll deployment remains
separate; documentation changes outside this directory require reviewing and
updating `ai-context.md` to update the chatbot's knowledge.

## Cloudflare setup

The connected Cloudflare Workers Builds trigger uses `main`, root directory
`docs/ai-chatbot`, build command `npm ci && npm test` and deploy command
`npx --yes wrangler@4.150.0 deploy`. Its include watch path is
`docs/ai-chatbot/*`, relative to the repository root; `*` also matches nested
paths. Preview builds are disabled. This trigger runs alongside GitHub Actions
and does not wait for the matching Pages publication. Publish documentation
before deploying context that cites it. Build watch paths are configured in
Cloudflare, not in `wrangler.jsonc`.

Workers Logs is configured in `wrangler.jsonc` with 10% head sampling and
automatic invocation logs disabled. Application diagnostics record only fixed
event categories and HTTP status codes for missing bindings, rate limiting,
limiter failures, inference failures and empty or truncated answers. They do not
record questions, answers, IP addresses, headers or provider exception messages.
Sampling can omit errors, so these logs are diagnostic samples, not complete
error counts. View them in the Worker's Observability tab after deploying the
updated Worker. Request-body logging remains disabled.

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
notice. Recent messages, the draft, retry question, scroll position and open
state are saved in `sessionStorage` for the current tab's browser session.
Following a widget link in the same tab collapses the panel before navigation,
so it does not cover the destination. History and draft remain available when
reopened; modified/new-tab activations leave the current panel open.
Scroll updates are grouped with a 150 ms delay and saved immediately when leaving
the page. Clear chat resets the saved messages and draft; blocked storage does
not prevent the widget from working. Each request sends only the current question,
so displayed history is not conversation context for the model.
Marked and DOMPurify are bundled into the widget, so rendering needs no CDN.
Formatting includes lists, code blocks and tables. Only links to the public
Chulapa documentation site remain clickable; images and interactive HTML are
removed. Visitor questions remain plain text.
Brand mentions in answer prose use the site's `chulapa` class. Code, link text
and identifiers such as `chulapa-skin` retain their original formatting.

## Evaluation

Below the 992 px breakpoint, the chatbot launcher sits above the navbar FAB
with a 1rem gap. Its size and right margin follow the FAB's computed styles.
Opening either navigation panel still hides the chatbot controls.

AI and coding agents must follow [the docs maintenance instructions](../AGENTS.md)
when documentation changes affect the chatbot's reviewed context.

Check documented installation, skins and baseurl questions in English and Spanish.
Ask about an undocumented feature and an unrelated topic. Check that answers
acknowledge missing facts and link to relevant original pages. Check six rapid
questions, malformed and oversized requests, missing bindings and inference
failure. Test narrow screens, keyboard navigation, Escape and long answers.
Mock tests verify failure handling; only live inference can establish model quality.
See `evaluation.md` for recorded live questions, rate-limit observations and the
context update procedure.

Run the documented and community question batches with
`node evaluate-live.mjs RUN-NAME`. To repeat selected cases, append comma-separated
case IDs as a second argument. The runner sends four questions per 75-second
batch and saves full answers in `evaluations/RUN-NAME.jsonl`. These requests
consume live Workers AI allowance. Criteria in the case files require human
review; HTTP 200 alone is not a successful answer.

## Initial live results

Deployed at https://chulapa-ai-prototype.dieghernan.workers.dev on October 8, 2026.
Spanish installation and skin questions returned relevant documentation links.
Questions about built-in payment support and the author's favorite food correctly
acknowledged missing context. The widget was checked at a 390 px viewport width.
Seven local Worker tests pass, including invalid input, unavailable inference,
missing bindings, CORS and a denied rate-limit result.

A live six-request burst returned six successful responses despite the configured
five-per-minute limiter. Enforcement was therefore **not verified** in that test.
The subsequent evaluation recorded a live HTTP 429 rejection. The cutoff is
approximate rather than exactly the sixth request; see `evaluation.md`.
Cloudflare documents approximate counters and limits local to each location;
IP limits also affect visitors sharing an address. Investigate the observed burst
behavior before treating this prototype's limiter as suitable for wider exposure.
The account's Free-plan quota remains the cost boundary.

References:

- https://www.malte-grosser.com/post/adding-a-free-ai-chatbot/
- https://www.freecodecamp.org/news/how-to-build-an-embeddable-ai-chatbot-widget-with-cloudflare-workers/
- https://developers.cloudflare.com/workers-ai/platform/pricing/
- https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/

Provider inventories were subsequently reviewed on c3107102d; see evaluations/inventory-c3107102d-review.json. Those passes are not transferred to the latest citation-parser artifact.

The reviewed library budget increased by 1,000 bytes to retain complete navbar/gallery recipes and explicit override/playback checks after a live regression from removing the navbar example. The selected input cap remains 18,000 bytes; model and output limits are unchanged.

Citation validation parses rendered Markdown with parse5 before checking decoded, complete href/src URLs against selected sources. HTML numeric/named entities cannot hide links; code examples remain excluded. parse5 8.0.1 is promoted from the existing jsdom dependency to a pinned runtime dependency. This changes citation validation, not answer accuracy.


## Bounded task validation

After citation checks, the Worker rejects specific observed task-answer defects
with HTTP 503 and the existing search recovery, without another inference or
silent rewriting. It detects malformed `{.no_toc}` examples and the observed
one-line `kramdown: toc_levels:` mapping for article/content TOC tasks. Questions analyzing supplied
syntax and blockquoted examples are outside that check so an invalid
example can be discussed faithfully. This is an intentional scope limit, not a
claim to validate every Markdown/YAML example.

Search-guide discovery questions mentioning cards must cite the documentation
topics page and, when exclusions are asked about, the visibility guide. URLs must
be actual prose citations, not literals inside code. This checks source coverage,
not whether every surrounding claim is relevant or true. Other languages or
wording outside the narrow English/Spanish intent aliases may not be checked.

Only fixed `chat_task_answer_unverified`/503 diagnostics are logged; no question,
answer or violation details are logged. A rejected answer remains unavailable in
live evaluation, not a correct task answer. Unit/Worker tests cover acceptance,
rejection, unchanged valid output, quoted-invalid discussion and one inference.

Provider inventory routing also recognizes platform/options and Spanish
plataforma/opciones while preserving named-provider setup isolation. Public
configuration facts did not change, so ai-context.md and llms.txt need no update
for this validation/routing change. No widget controls, metadata or PWA behavior
changed; no new browser usability or accessibility evidence is claimed.

Citation extraction ignores literal text inside pre/code while still checking real descendant href/src elements; escaped code examples remain literal. Ordinary explain-how task requests remain validated; syntax-analysis exemption requires both supplied syntax and analysis intent.
