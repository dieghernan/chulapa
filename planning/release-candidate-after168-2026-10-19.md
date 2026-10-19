# Rebuilt 2.2.0 candidate after #168

Date: 19 October 2026. Source:
`ed66ab4ac2c7124086c218ada8b00abb7c813041`, main after merged
[PR #168](https://github.com/dieghernan/chulapa/pull/168).
Status: local unreleased test candidate; revised notes pending review.
No tag, RubyGems upload, GitHub release, live inference or manual deployment.

## Exact-source workflows

The public GitHub Actions listing identifies these runs with `ed66ab4`.
Connector job details confirm successful Pages build/deploy, the Worker gate and
all seven regression jobs. The Worker job log records version
`5cc044b1-b8a9-4135-a500-66c9bcb0db67`.

| Workflow | Run | Result |
| --- | --- | --- |
| Pages | [39200007160](https://github.com/dieghernan/chulapa/actions/runs/39200007160) | Build and deploy succeeded. |
| Worker | [39200007159](https://github.com/dieghernan/chulapa/actions/runs/39200007159) | Build/test, matching-Pages wait and Cloudflare deploy succeeded. |
| Regressions | [39200007118](https://github.com/dieghernan/chulapa/actions/runs/39200007118) | All seven jobs passed: Jekyll 3/4 behavior and installation, chatbot, JavaScript and Chromium. |
| Algolia | [39200007131](https://github.com/dieghernan/chulapa/actions/runs/39200007131) | Success. |
| Published branch | [39200007217](https://github.com/dieghernan/chulapa/actions/runs/39200007217) | Success. |
| Jekyll profile | [39200007087](https://github.com/dieghernan/chulapa/actions/runs/39200007087) | Success. |

No new direct public HTTP or inference check was performed in this preparation.
Previous proxy restrictions and the known Netlify preview problem are not claimed
resolved. Workflow success establishes deployment, not answer accuracy or actual
mobile browser chrome. Historical live evidence stays attached to its revisions.

## New local artifact

File: `chulapa-jekyll-2.2.0.gem`, ignored local build output.
SHA256: `9f53a03714f29c214b11dccf182fca4ba96d59a1207c740c14fcb95cdfda0d0c`.
The artifact contains the reusable theme from the source above; subsequent edits
in this preparation are internal planning and are excluded from the gem.

- Gem build succeeded; the existing unspecified `required_ruby_version` warning
  remains. No unsupported Ruby minimum was introduced.
- Inspected the actual package: 336 files, including selector/recovery code,
  shared activation helper, attribution include and alternate CSS entry points.
  Internal planning, docs, tests and examples are excluded. Extracted all 336
  packaged files and verified each SHA256 against its working source bytes.
- Installed-gem checks are run from `test/` with the existing installation and
  Jekyll 3 Gemfiles; results are recorded before commit below. These checks cover
  root/project pagination, canonical URLs, sitemap, package boundaries and the
  complete documentation build.

This candidate supersedes the earlier #163 local test artifact as the current
validation target, but remains unsuitable for final upload: its version marker
and changelog still say unreleased. The release data still names v2.1.0 as the
published release and v2.1.1-dev as development. Publication requires reconciling
those labels, the release date and candidate wording, then rebuilding and
validating the final exact bytes. A merge of this planning PR is not publication
authorization or approval of every revised note.

## Scope and upgrade review

The [revised draft notes](release-2.2.0-notes.md) now include #164/#166/#168.
#168's essential upgrade constraint is explicit: rebuild/publish all generated
main/highlighter CSS together. Older or custom replacement sheets without the
expected final completion marker cannot be verified by the selector. Replacement
CSS must retain the correct final marker; it is not a certification of arbitrary
custom/imported CSS. Missing/unverified essential styles still retain fallback.

The Diátaxis editorial program remains closed. Known chatbot TOC/guide-discovery
limitations are separate bounded follow-ups; optional human research is not a
release gate. No new theme option, public page, context change, a11y/SEO/PWA
behavior or runtime change is introduced by this preparation. Existing llms.txt
and selective context already describe the merged runtime; no update or local
chatbot rerun is needed for these planning edits. Remote chatbot CI evidence is
listed above without transferring old live-answer passes.

## Local verification result

Both installed-gem runs passed on this same candidate artifact:

- Jekyll 4.4.1: `BUNDLE_GEMFILE=installation/Gemfile bundle exec ruby check_theme_installation.rb`, from `test/`.
- Jekyll 3.10.0: `BUNDLE_GEMFILE=jekyll3/Gemfile bundle exec ruby check_theme_installation.rb`, from `test/`.

Both report successful installed-gem, pagination and full documentation checks.
Existing Sass deprecation warnings remain on Jekyll 4. The recorded artifact hash
is unchanged after testing. Passed: 56 local planning links/fragments,
`git diff --check`, planning-only scope and unchanged historical audit body.
No theme files, release metadata or evaluation records change in this PR.
