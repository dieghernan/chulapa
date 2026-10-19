# Rebuilt candidate after merged #170

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
