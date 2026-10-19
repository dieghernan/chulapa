# Post-#166 release handoff

Reviewed: 19 October 2026. Source: main
`2337767895da8533cf9a65bbbacd4a91170a8d92`, merge of
[PR #166](https://github.com/dieghernan/chulapa/pull/166).
Internal status reconciliation only; no release, inference or manual deployment.

## Exact-source verification

The public GitHub Actions listing associates the following completed successful
runs with commit `2337767`. The GitHub connector confirms job details for Pages,
Worker and regressions. Direct Actions REST queries from the terminal are denied
by this environment; the public GitHub page and connector provided the evidence.

| Workflow | Run | Verified result |
| --- | --- | --- |
| Official Pages | [39193481371](https://github.com/dieghernan/chulapa/actions/runs/39193481371) | Build, artifact upload and Pages deployment succeeded. |
| Deploy chatbot | [39193481412](https://github.com/dieghernan/chulapa/actions/runs/39193481412) | Build/test, wait for matching Pages and Cloudflare deployment succeeded. |
| Theme regressions | [39193481472](https://github.com/dieghernan/chulapa/actions/runs/39193481472) | All seven jobs succeeded: Jekyll 3/4 Ruby and installed-gem matrices, JavaScript, chatbot and browser. |
| Algolia | [39193481505](https://github.com/dieghernan/chulapa/actions/runs/39193481505) | Success in exact-commit Actions listing. |
| Publish branch | [39193481384](https://github.com/dieghernan/chulapa/actions/runs/39193481384) | Success in exact-commit Actions listing. |
| Jekyll profile | [39193481381](https://github.com/dieghernan/chulapa/actions/runs/39193481381) | Success in exact-commit Actions listing. |

Worker job `117871100761` logs identify the checked-out full SHA above and
Cloudflare version `6e902e42-cda2-4313-8832-1ac232897ec4`, deployed to
`https://chulapa-ai-prototype.dieghernan.workers.dev`. This identifies the
workflow artifact, not independently sampled live inference behavior.

Direct requests to the published skin guide and Worker `/widget.js` both failed
at the proxy CONNECT stage (403, curl HTTP 000). This is an environment access
restriction, not an observed application error. No availability/response-quality
claim follows. Netlify preview failure was known at merge; its cause remains
unconfirmed and official Pages success does not repair or explain it.

## Release and chatbot boundaries

- #163 prepared version 2.2.0, but did not publish it. No `v2.2.0` or `2.2.0` tag
  was returned by the remote tag query during this review. Metadata still labels
  the release unreleased; this does not independently query RubyGems publication.
- #164 and #166 are newer than the original local candidate gem. Do not reuse its
  historical hash as the final artifact. Current CI includes installed-gem checks
  on Jekyll 3 and 4; finalize release date/version labels and validate the final
  exact artifact after a separate explicit publication instruction.
- Draft release notes already include the selector; add the merged chatbot work
  without promising generally accurate answers. Preserve #164's historical live
  evidence and two known content-TOC/guide-discovery limitations. No old accuracy
  result transfers to this deployed source merely because tests pass.
- Next work is a release decision/final-artifact task, not more Diátaxis extraction.
  Netlify diagnosis and narrowly scoped chatbot improvements can be separately
  prioritized. Human research remains optional.

## Validation of this planning update

Passed: 53 local planning links/fragments resolve, `git diff --check` passes,
and the diff is limited to planning. The historical audit body is unchanged.
No public documentation, context facts, examples, theme runtime, a11y/SEO/PWA
behavior or deployment files change. `llms.txt` and selective context need no
update. No local site/browser build or chatbot test rerun is warranted for this
internal record; the CI results above are remote evidence for their exact source.
