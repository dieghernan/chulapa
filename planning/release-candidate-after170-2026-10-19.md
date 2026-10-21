# Candidate revisions after merged #170

## Current revision — 21 October 2026

Baseline: main `4efd1e3e9263759e6326474c260badc4580afe4e`, after #176.
Rebase replayed all four planning commits without conflicts. New runtime work
includes #173 original Bootswatch choices, #174 consistent previews/guidance,
#175 preview and dark-asset fixes, and #176 pinned/licensed upstream sources with
separate Chulapa adapters. The older revisions below retain only their own checks.

Current local gem SHA256:
`a755a9c157a3a4e6a6cdde38ea2a189916ec508899c91cf6878481cf52190e90`.
All 450 extracted package files match source bytes. Vendor sources and TopHat/
Bootswatch licenses are included; the installed-gem regression now explicitly
checks their packaged presence. Earlier artifacts are retained locally by hash.
Fresh installed-gem checks pass on this exact hash with Jekyll 3.10.0 and
4.4.1, including package provenance/exclusions, root/project pagination, canonical
URLs, sitemap and complete documentation builds.

Pages [39552038892](https://github.com/dieghernan/chulapa/actions/runs/39552038892)
and Algolia [39552038856](https://github.com/dieghernan/chulapa/actions/runs/39552038856)
succeeded for this exact source. Regression run
[39552038890](https://github.com/dieghernan/chulapa/actions/runs/39552038890)
has six successful jobs (both Ruby/Jekyll versions, both installation versions,
JavaScript and chatbot); the browser job is still running at this checkpoint.
Older browser passes are not transferred.

Worker [run 39548857744](https://github.com/dieghernan/chulapa/actions/runs/39548857744)
succeeded from #175, `c698197c8b33ea656f89f3bfa64d2479be8a2b61`, after its
matching-Pages gate. Job 119053185631 logs identify version
`ff91f0e4-da59-4de4-906a-9750284d14db`. #176 has no Worker-file/workflow diff;
this is retained #175 lineage, not an exact-current-source Worker deployment.
No new live inference/public HTTP checks or manual deployments in this update.

Upgrade notes now include the dark highlighter path
`assets/css/dark/highlighter.css`, paired-asset publication and the vendor-source
separation without extra site-user tooling. Keep the existing CSS completion
marker constraint and documented contrast exceptions. The selector's shared
mixin removes outline and box-shadow on focus/focus-visible; #175 explicitly
records this known limitation. It is not fixed or counted as a passing
visible-focus result here and needs triage before the final release decision.
No skin/control implementation changes are made by this planning PR.

The revised notes remain pending review. Candidate markers, release metadata and
publication authorization are unchanged; no tag, release or gem upload.

## Historical revision — 20 October 2026

Baseline: main `58966b5ddf1f8bd9059c8ea7e466c5ba4a700884`, after GitDev changes,
#172 skin contrast and the Flatly alert correction. PR #171 was rebased on this
baseline without conflicts; its two earlier planning commits were replayed.
The 19 October artifact/evidence below is historical, not the current candidate.

Current local `chulapa-jekyll-2.2.0.gem`, SHA256:
`62d5c82771682c86117db8d256195536db5b441358a82c7178da08d05cdab53a`.
All 336 extracted files match source bytes; package exclusions remain checked by
the installed-gem tests. Existing Sass/Ruby-minimum warnings remain. The new
artifact is retained locally by hash alongside earlier candidates; no upload.
The same artifact passes both installed-gem checks with Jekyll 3.10.0 and
4.4.1, including root/project pagination, canonical URLs, sitemap and complete
documentation builds. These are fresh local results for this hash.

Exact-source Pages [39430159449](https://github.com/dieghernan/chulapa/actions/runs/39430159449),
regressions [39430159490](https://github.com/dieghernan/chulapa/actions/runs/39430159490)
and Algolia [39430159460](https://github.com/dieghernan/chulapa/actions/runs/39430159460)
succeeded. Connector job details confirm all seven regression jobs, including
Jekyll 3/4 installation, Ruby, browser, JavaScript and chatbot.

Worker context changed in #172; [run 39427985494](https://github.com/dieghernan/chulapa/actions/runs/39427985494)
succeeded for `c1edaae46ede0fb72629d716882aa29342e4ad83`, including matching-Pages
wait and Cloudflare deployment. Job 118645292730 logs record version
`003c283d-7144-4aae-badc-4e4a24e7706d`. The subsequent Flatly correction has no
diff in Worker files/workflow; this inherited deployment is separate from
current-main Pages/CI, not an exact-`58966b5dd` Worker run. No new live inference
or availability measurement; previous access/Netlify limits are not claimed fixed.

The revised notes include skin/Flatly contrast improvements and preserve the
recorded component exceptions rather than claiming complete WCAG coverage.
Version/notes approval and publication remain separate: the expanded draft
awaits review, unreleased markers remain, and final bytes require rebuilding
and validating after publication authorization. No release/tag/gem publication.

## Historical revision — 19 October 2026

Source: main `eeb161de61dd57aa95d957b05c0becd87299c1a7`, 19 October 2026.
Local candidate only; no release, tag, upload, inference or manual deployment.

## Exact-source checks

- [Regressions 39261129553](https://github.com/dieghernan/chulapa/actions/runs/39261129553): all seven jobs succeeded, including Jekyll 3/4 behavior and installed-gem matrices, browser, chatbot and JavaScript. Connector job details checked.
- [Pages 39261129472](https://github.com/dieghernan/chulapa/actions/runs/39261129472), [Algolia 39261129667](https://github.com/dieghernan/chulapa/actions/runs/39261129667), [branch publication 39261129492](https://github.com/dieghernan/chulapa/actions/runs/39261129492) and [profile 39261153418](https://github.com/dieghernan/chulapa/actions/runs/39261153418): successful in the public exact-commit Actions listing.
- No new Worker deployment: `docs/ai-chatbot/` and its deployment workflow have no diff from #168 through this source. The valid Worker source remains `ed66ab4ac`, [run 39200007159](https://github.com/dieghernan/chulapa/actions/runs/39200007159), version `5cc044b1-b8a9-4135-a500-66c9bcb0db67`.
- No new direct public HTTP/inference checks. Known proxy and Netlify-preview limitations are not resolved or reclassified by these successes.

## Actual local artifact

`chulapa-jekyll-2.2.0.gem`, SHA256:
`d7bf62fb5867b6b6248d6ca8401181e13a431ac96c96965dcaab4ad342a0bb54`.

Both existing installed-gem checks passed on the same file, from `test/`:

- `BUNDLE_GEMFILE=installation/Gemfile bundle exec ruby check_theme_installation.rb` — Jekyll 4.4.1.
- `BUNDLE_GEMFILE=jekyll3/Gemfile bundle exec ruby check_theme_installation.rb` — Jekyll 3.10.0.

These cover package exclusions, installed rendering, root/project pagination,
canonical URLs, sitemap and complete documentation builds. All 336 extracted
package files match their working source bytes. Existing Sass and unspecified
Ruby-minimum warnings remain. Both this artifact and the older #168 candidate
were retained locally by hash outside the repository; neither is uploaded.

#170's earlier source-specific evidence covers the focused keyboard, sidebar,
HTML5, real-parser microformats and responsive geometry checks. Current CI also
runs the new Ruby/browser regression. Do not infer live human usability or
chatbot accuracy from any of these tests.

## Ready for a release decision

The default-semantics change is integrated. The current candidate supersedes
#168's artifact for validation, but still contains unreleased markers. Revised
notes include #164/#166/#168/#170 and await review. Publication still requires
separate authorization, final date/version/data labels and candidate wording,
then a rebuild and validation of the exact final bytes before tag/gem/release.
No new functionality or broad evaluation batch is needed for this handoff.

Only internal planning changes in this record's PR; no context, runtime or public
URL changes. No additional site/browser/chatbot rerun is needed for these prose
updates. Preserve all earlier hashes and revision-specific evaluation results.
