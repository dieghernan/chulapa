# Release preparation: 16 October 2026

## Current handoff — 19 October 2026

This document retains the original #163 preparation and artifact evidence below.
#163 is merged; #164 chatbot corrections and #166 appearance selector are also
merged. See the [post-#166 record](post166-release-status-2026-10-19.md) for current
CI and Pages/Worker deployment. The original candidate hash below predates these
changes and is not the final upload. Finalize metadata and rebuild/validate the
final artifact only with a separate publication instruction. 2.2.0 remains
unpublished; the original preparation authorization did not publish it.

## Scope and candidate

Baseline: main `a0d9aca065f01a12fa213adc1ca72c52255ac39e`, merged #162. Local preparation branch: `codex/prepare-2-2-0`.

Approved version: **2.2.0**, a minor release for the new Mermaid, PhotoSwipe, GoatCounter, active TOC and Microformats2 feed capabilities. The user approved version 2.2.0 and the proposed notes on 16 October 2026, authorizing a preparation PR only. Publication remains unauthorized. The gemspec uses 2.2.0 to build a local candidate; the HTML marker and changelog explicitly say unreleased. The published version remains v2.1.0.

Prepared changes: candidate gemspec/HTML marker, unreleased changelog heading, draft release notes, README and installation/layout/version guidance. Existing v2.1.1-dev labels are explained as development changes planned for 2.2.0, preserving v2.1.0 restrictions. llms.txt, selective chatbot context and the existing version evaluation case are aligned. Historical evaluations are unchanged.

## Verified deployments of the baseline

- [Pages run 38910407282](https://github.com/dieghernan/chulapa/actions/runs/38910407282): build and deploy succeeded for the exact baseline SHA.
- [Worker run 38910407533](https://github.com/dieghernan/chulapa/actions/runs/38910407533): waited for that Pages run, then uploaded/deployed the Worker. Cloudflare version: `ca5ed306-dbaa-40ea-8d5d-c24b9ee583d2`.
- Direct HTTP checks: the published video guide returns 200 and contains #162's version notice; Worker GET `/widget.js` returns 200. No inference requests were made.
- These checks establish deployment and asset availability, not chatbot answer quality or human usability. The locally prepared release context is not deployed.

## Candidate artifact and checks

Artifact: `chulapa-jekyll-2.2.0.gem` (ignored local output, not published).
SHA256: `e92e03d7d01a8c176942c641d90ce7b6ef4d5e1f4160dbf17bb60204995deaef`.

- Gem build passed. RubyGems warns that required_ruby_version is unspecified; no untested Ruby minimum was invented.
- Jekyll 4.4.1: installed-gem, root/subdirectory pagination, canonical URLs, sitemap, packaged-file selection and full documentation checks passed.
- Jekyll 3.10.0: the same installed-gem, pagination, sitemap and full documentation checks passed from test/.
- Local chatbot tests: 40 passed. Context remains within the unchanged 47,000-byte budget. Existing focused version case extended; no live evaluation.
- All three evaluation JSON files parse and have unique IDs within each file. Existing fenced examples in the edited public Markdown pages are unchanged. git diff whitespace check passed.
- The baseline regression workflow passed on Jekyll 3/4 and browser checks. Those results concern the baseline, not a new candidate CI run.

The initial Jekyll 3 invocation from the repository root produced an empty temporary index: its current-directory layout lookup selected repository layouts and mishandled their paths on Windows. The documented CI invocation uses test/ as its working directory. The script's misleading header comment was corrected; no runtime workaround was added. Both candidate installation checks passed when run from test/.

## Accessibility, SEO and PWA boundary

Preparation changes version text and explanatory documentation, not navigation behavior, colors, titles, canonical URLs or other SEO metadata. Existing v2.1.0 accessibility limitations remain explicit. The theme still supplies no service worker or offline cache; no installability or accessibility certification is claimed. No new browser interaction or provider submission was performed for this preparation.

## Remaining publication work

The user approved the [release notes](release-2.2.0-notes.md) and authorized committing and pushing this preparation branch to open a PR. Publication and merge are not authorized by this instruction. No tag, GitHub release, RubyGems upload or manual deployment is performed.

After separate publication authorization, finalize the release date and public release/development labels (including `_data/version.yml` and `docs/_data/version.yml`), remove candidate-only text, rebuild and verify the final gem, then publish the reviewed tag, gem and release. Verify Pages and Worker rollout for that final source separately. Current artifact is a test candidate, not the final upload.

Live Cactus/Welcomments posting and migration, optional quota-consuming chatbot evaluation, human usability research and testing every Jekyll version in the declared >=3.7,<5.0 range remain outside this validation.
