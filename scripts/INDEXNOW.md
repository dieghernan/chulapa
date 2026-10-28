# IndexNow for the documentation site

This is repository automation, not a setting or feature installed with the theme.
The independent `.github/workflows/indexnow.yml` runs after a successful main-branch
Pages deployment. It does not use either sitemap or change the published HTML.

## Compare and notify

The workflow identifies the deployment's source SHA and finds its matching
generated-site commit in `gh-pages`, using the deployment action's commit message.
It refuses to guess if that commit is missing (for example, when mirroring failed).
Manual runs select the latest successful main-branch Pages workflow through the
GitHub API. They default to `dry_run: true`.

The `indexnow-state` branch points to the last generated-site commit successfully
handled by this workflow. It is only a checkpoint; it is not a publishing branch.
Comparisons include every deployment since that checkpoint. On first use, the
baseline is the target's parent: this avoids resubmitting the entire existing
site, but does not recover notifications missed before the checkpoint existed.
If this is the first-ever deployment, all HTML pages are additions.

Only these differences are ignored in the comparison:

- String values for `datePublished` and `dateModified` in valid JSON-LD scripts.
- The date in the theme's `<!-- Page build YYYY-MM-DD -->` comment.

All other HTML remains significant, including head metadata, links, visible dates,
navigation and footer content. A shared favicon or template change can still
legitimately notify most pages. Changes only to CSS, images or other non-HTML
files do not notify their referring pages. No `noindex`, sitemap or canonical
override filtering is added; changed file paths retain the previous URL mapping.

Added and deleted HTML paths are included. A rename includes both old and new
paths. `index.html` maps to the site root, and `section/index.html` to `section/`.
Requests contain at most 10,000 unique URLs. Only HTTP 200 or 202 counts as an
accepted submission; this does not guarantee crawling or indexing.

The checkpoint advances only after all requests succeed, including comparisons
with no relevant changes. Failed submissions, dry runs and already handled or
older deployments never advance it. Serialized runs and fast-forward checkpoint
updates prevent moving state backward. Divergent histories fail for review.
Retries after a partial batch success or failed checkpoint push may repeat URLs;
delivery is at least once, not exactly once.

## Test without sending notifications

Run `node --test scripts/indexnow.test.mjs`, or `npm test` for all repository
indexing tests. Tests use temporary Git repositories and mocked HTTP responses.

For a real local comparison, fetch `gh-pages` and `indexnow-state` if it exists,
then run from the repository root (replace the SHA with a deployed main commit):

```sh
INDEXNOW_SOURCE_SHA=FULL_DEPLOYED_SOURCE_SHA GITHUB_REPOSITORY=dieghernan/chulapa \
  node scripts/indexnow-changes.mjs
INDEXNOW_SITE=https://dieghernan.github.io/chulapa INDEXNOW_KEY=482ca4f8918044ceaf2760339d398cb5 \
  node scripts/indexnow.mjs --plan indexnow-plan.json --dry-run
```

The plan records baseline, target, bootstrap/skip status, changed paths and the
number of HTML files ignored because only dates changed. Actions saves this plan
as an artifact for 14 days and adds counts to the run summary. A local comparison
does not update any branch. To preview through Actions, run **IndexNow** manually
with **dry_run** checked; uncheck it to submit and advance the checkpoint.

The workflow needs Actions read access to select a successful manual-run target,
and Contents write access to advance `indexnow-state`. It does not modify `main`,
`gh-pages`, the theme's metadata or the blog repository. It requires the existing
`gh-pages` mirror history; do not reset that history or the checkpoint without
reviewing which URLs should be retried.
