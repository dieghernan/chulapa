# Answer corrections: 16 October 2026

## Evidence and changes

The [five-case review](review-release-220-five-cases-2026-10-16.md) and [raw answers](release-220-five-cases-2026-10-16.jsonl) concern the deployed baseline `30b1edf83`; they are preserved unchanged. Corrections prepared from those observations:

- Clarify that video fileurl accepts a root-relative path and the snippet applies absolute_url; relative_url and a manual baseurl prefix are not required.
- Separate version checking from custom-head/hooks in the selective context. Identify remote_theme/build evidence for remote installations and Gemfile.lock only for gem installations; cite the exact version guide.
- Prefer the first tutorial for first-site questions and retain the site identity fields and separate home-heading/sample-article checks.
- Supply the two-line Photo walk item to insert after Categories, preserving the existing navbar mapping and complete page specimen.
- Ask the model to use task-specific citations with accurate labels, insertion-only examples and a published-result check. Extend the five existing evaluation expectations rather than adding duplicate cases.

No source URL or supported capability is removed. Condense introductory wording and redundant blank lines to retain the existing 47,000-byte budget: context changes from 46,923 to 46,931 bytes. No model, output limit, bindings or quota changes.

## Offline validation

- npm test: 40 passed; bundle rebuilt with 46,931/47,000 context bytes.
- Evaluation JSON parses and IDs remain unique within each catalog.
- Raw answer file SHA256 is unchanged: bb4005f0c53a012a3c237fdadca0abb540ab63e94a8973934b7510072cc9b8f3.
- Existing public documentation already describes these facts; no public-page or llms.txt change is required. All citations refer to already published pages. No UI, accessibility controls, SEO metadata, PWA assets or release publication change.

## Local deployment

The user explicitly authorized deploying this correction locally without waiting for GitHub Actions. Use the existing Worker, account, AI binding and rate limiter via wrangler.jsonc; no secret is added to source. Deployed locally with Wrangler 4.150.0 from source commit `be75d8ad1` on 16 October 2026. Cloudflare version: `986535e6-f13b-48ac-9c45-bc3b9482c4b8`. Worker: https://chulapa-ai-prototype.dieghernan.workers.dev . Wrangler confirmed the AI and CHAT_RATE_LIMIT (5 requests/60s) bindings. A non-inference GET of /widget.js returned HTTP 200. GitHub Actions was not used for this deployment. The subsequent record-only commit does not change deployed code/context.

No post-correction live inference is authorized or performed. Passing local tests and deployment does not establish improved answer quality. A separately authorized affected-case run is needed to compare answers.
