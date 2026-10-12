# Personal site compatibility validation

Checked on October 12, 2026 with the real `dieghernan/dieghernan.github.io`
site at commit `f186f82c1c251ae6432598d5d2c6506cf86a7525`, using its existing
Gemfile and configuration on Windows with Jekyll 4.4.1.

The comparison used remote-theme commits `c3cab02bf` (base) and `2b226b885`
(PR #96). Temporary configuration overlays selected each theme commit, disabled
incremental builds and fixed the build time. Outputs were written outside the
personal site's source tree; its configuration, source files and existing
`_site` were left unchanged. The personal site's working tree remained clean.

## Local overrides

Both builds retained the real `index.md`, `_layouts/default.html`, custom head
and bottom-script includes and `_includes/custom/giscus.html`. Render profiles
confirmed the local index and default layout were used. The customized homepage
retained three recent-post cards, three project cards, its tag links and Ko-fi
include. All 27 posts retained the local Giscus script and configuration.

## Output and behavior checks

- Both complete builds succeeded and produced the same set of 63 HTML files.
- DOM, attributes, metadata, scripts and text matched after normalizing
  insignificant whitespace and excluding the deliberately randomized content.
- Each of the ten project recommendation panels in both builds contained the
  expected number of distinct eligible documents. Membership was checked
  against all 37 source documents and their tags and collections.
- External gallery carousels retained the same image multiset. The internal
  gallery retained 100 distinct images from the same pool of 142 source files;
  its sampled subset and order can change between builds.
- Browser comparisons at 390 and 1280 px preserved header, main, footer and
  index-section geometry, footer pixels and overflow behavior on the homepage,
  tags, archive, projects and blog index.

Browser checks served generated assets locally and blocked third-party services.
Giscus and Ko-fi configuration and emitted markup were checked; these checks
did not submit comments or exercise the external services themselves.

## Observed render performance

| Profile measurement | Base | PR #96 |
| --- | ---: | ---: |
| Complete render phase | 7.0963 s | 6.2345 s |
| Cloud renderer, two calls | 0.561 s | 0.167 s |
| Footer wrapper, 52 calls | 0.062 s | 0.033 s |
| Fixed footer content | Part of each footer | One render, 0.016 s |

These are one pair of complete local builds, not a statistical benchmark. Total
build duration also includes downloading the remote theme and was not used to
attribute a performance improvement to the PR.
