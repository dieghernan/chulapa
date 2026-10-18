# Bounded task validation and review follow-ups: 18 October 2026

## Delivered behavior

Specific article/content TOC task examples containing malformed {.no_toc} or the observed one-line kramdown: toc_levels: mapping are withheld, without rewriting the answer or another inference. Questions analyzing supplied syntax and blockquoted examples remain outside that recipe check. Ordinary explain-how requests remain validated. The check does not parse arbitrary YAML, prove all Markdown examples correct or cover every language/intent formulation.

Search-guide discovery questions mentioning cards must contain actual prose citations to docs/tags and, when asking about exclusion, docs/65-search-visibility. URLs inside literal code do not satisfy this requirement. Source coverage does not prove semantic relevance of every sentence; conservative rejection can also withhold an otherwise useful answer. No human usability or false-positive-rate study was performed.

The existing search recovery is returned as HTTP503 with no answer. Only the fixed chat_task_answer_unverified/status diagnostic is emitted. Valid answers and invalid-example discussions are returned unchanged. Rejections remain unavailable in evaluation, not passes or completed reader tasks.

Citation extraction checks real descendant href/src elements in pre/code containers, while ignoring literal escaped code text. GFM may create a real autolink inside inline raw code; that link must still be checked. This distinction was confirmed using rendered Markdown and focused tests. No malicious live request was used to solicit invented URLs.

## PR comments

- [Platform/options inventories](https://github.com/dieghernan/chulapa/pull/164#discussion_r4307163720): reproduced missing provider sections; add English/Spanish everyday synonyms while retaining named-provider isolation.
- [Nested links inside code containers](https://github.com/dieghernan/chulapa/pull/164#discussion_r4307195514): reproduced bypass; inspect descendant link attributes without treating literal code text as citations.
- [Explain-how requests](https://github.com/dieghernan/chulapa/pull/164#discussion_r4307195516): reproduced overbroad exemption; require supplied syntax and actual analysis intent.

Each thread was resolved after a pushed correction and regression checks. Current suite: 77 passing local tests, including Worker-level rejection, unchanged acceptance, fixed diagnostics and one inference. Automated checks establish these implementation behaviors, not model accuracy or human usability.

## Live evidence by source

Twelve authorized independent requests were made without retries. Do not combine overlapping catalog cases across versions into coverage or a global score.

| Source | Evidence | Reviewed result |
| --- | --- | --- |
| ff5be537f | [Four catalog cases](validation-ff5be537f-review.json) | 2 pass, 2 task-validation unavailable |
| ff5be537f | [Four supplementary inventories](inventory-synonyms-ff5be537f-review.json) | 4 pass; all five providers and explicit Cusdis hosting unavailability in English/Spanish |
| dd9e23b90 | [Four catalog cases](validation-dd9e23b90-review.json) | 2 pass, 2 task-validation unavailable |

The final Worker is 64ee01ab-3f43-4d32-b90b-df0264e04cfb at 100% traffic, verified before/after. Its delivered sidebar/gallery examples remain correct. The rejected content-TOC and search-discovery answers were neither returned nor logged; the exact rejected model text is unavailable. Do not assert that the model now produces correct answers to those tasks.

The final probe sent four independent questions in one batch. It continued after semantic task-validation rejections, which do not indicate overload, and would stop on network, rate-limit or other 503 failures. The earlier standard evaluator paused after each 503. The supplementary inventory batch started at least 75 seconds after the final earlier catalog request. No automatic inference retries or paid fallback were added.

On dd9e23b90, 4 of 155 catalog cases have records/reviews: 2 factual passes and 2 unavailable. There are 151 unrun cases plus 2 unavailable retries, so 153 remain pending. The four provider inventories belong to ff5be537f and remain outside that denominator. Historical evidence remains preserved; the active manifest and generated batches are revision-specific.

## Remaining exit criteria

Keep the PR open. These two reader tasks still fail to obtain a usable assistant answer; bounded validation is containment, not a model-quality fix. A documented deterministic recipe or a different answer-generation strategy for the two narrow tasks needs separate implementation/evaluation before claiming resolution. Retain every attempt and distinguish availability from factual accuracy. Broad new batches are lower priority while these known tasks remain unavailable.

Netlify preview remains failed; latest GitHub checks must be reviewed separately. No merge, release publication or tags were created. Public documentation already supports the facts: the chatbot README and evaluation assets changed, ai-context.md/llms.txt did not need a facts or page-index update. No widget controls, theme UI, SEO metadata or PWA implementation changed; no browser usability, accessibility or PWA audit is claimed.
