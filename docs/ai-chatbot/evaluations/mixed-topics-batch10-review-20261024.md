# Mixed topics: ten-question assessment — 24 October 2026

Worker `1686b41b-51ff-438f-a2b6-cec0fd60fe8f`, confirmed 100% traffic before
requests. [Artifact manifest](mixed-topics-deployment-20261024.json) and
[raw evidence](mixed-topics-batch10-20261024.jsonl).

Ten requests: eight HTTP 200 and two HTTP 503. Manual assessment: **4 pass,
2 partial, 2 fail, 2 unavailable**. No retries, AI Search or extra model calls
were initiated by the evaluator. Its configured pauses after four requests and
after unavailable responses were respected. Seven new expectations were written
before querying; three old expectations were retained verbatim in the evidence.

| Case | Result | Finding |
| --- | --- | --- |
| `search-comments-4` | partial | Correct attribution flag and now recommends shared maxwords. Still omits that a configured legacy lunr_maxwords overrides it and must be removed to use the shared setting. Algolia logo is unasked. |
| `mixed-toc-comments-1` | pass | Both parts answered: boolean page TOC flag and all five providers, original Cusdis hosting unavailable, separate provider/per-page enabling. Sidebar depth example is unnecessary but valid. Cactus statement applies to the supplied adapter. |
| `mixed-toc-title-1` | pass | Correct two-key front matter, full browser/structured-title behavior, actual HTML title check and relevant metadata/TOC sources. Narrow additive example does not replace other fields. |
| `mixed-person-ga4-1` | fail | Person mapping is correct, but nests gtag_id under invented google_analytics mapping; the theme reads site.gtag_id at the root. This configuration would not enable GA4. |
| `mixed-feed-navbar-1` | pass | Correct title/url entry, tells user to insert into existing navbar.nav and verify destination after publication. Uses visitor's relative feed URL rather than the docs site's public URL. |
| `feed-subscribe-link-en-1` | unavailable | HTTP 503: unsupported-source fallback. No generated answer was delivered. Correct public URL was present in selected context; no evidence identifies the actual rejected URL or quota exhaustion. |
| `feed-subscribe-link-es-1` | unavailable | Same HTTP 503 unsupported-source fallback. This is an availability/validation failure, not an assessed incorrect answer. |
| `migration-gem-choice-1` | pass | Correct gem/theme method, remote cleanup, include-cache enabling, bundle installation, URL preservation, local override handling and replacement for old post layout. Does not prescribe remote_theme or claim standard Pages supports gem-only builds. |
| `comments-giscus-setup-1` | partial | Correct embed/provider/per-post/layout steps and publication check; still omits public repository, enabled Discussions and installed app as prerequisites for the reported missing-comment problem. |
| `provider-algolia-task-1` | fail | Exclusion and upload command are correct, but prescribes jekyll_src: docs for an unknown site instead of adapting the source folder. Omits ALGOLIA_API_KEY secret prerequisite; these prevent a usable upload recipe. |

## Source checks and next adjustments

- GA4: `19_google-analytics.md`, `02_config.md` and `_includes/head.html` use
  top-level gtag_id. Give an explicit root-level example and reject the invented
  wrapper in guidance; publisher and analytics scopes are both already selected.
- Algolia: `37_algolia-search.md` requires dependency installation, a private
  ALGOLIA_API_KEY and the actual source directory. The repository example's
  `docs` path must not become a universal instruction. Preserve existing mapping
  and exclusion entries.
- RSS: both subscription queries select Public RSS feed, including the exact
  public URL. Investigate focused reader-subscription guidance and unsupported
  citations without weakening the citation validator or attributing unseen text.
- Giscus/maxwords: the needed facts are already selected. Keep prerequisites
  adjacent to setup and explain removal of legacy overrides when recommending
  the shared field. These remain partial, not demonstrated improvements.

No second live round or context/prompt edit was made after these observations.
The deployed changes are the previously tested PR selector fixes. Source library
remains 56,998/57,000 bytes; selected context remains capped at 18,000 bytes;
117 local tests pass, including all 167 catalog queries. Successful samples do
not establish repeatability or justify applying passes to other Worker versions.

README, catalog and evaluation log are updated. Public documentation, llms.txt
and ai-context.md are unchanged because the documented source facts were already
correct. No reusable-theme accessibility, SEO metadata or PWA behavior changed.
