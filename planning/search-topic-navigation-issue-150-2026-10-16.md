# Assessment of search topic navigation issue #150

Date: 16 October 2026. Baseline: main `fb265a74c`, after merged #149.
Issue: https://github.com/dieghernan/chulapa/issues/150
Status update: implemented and merged in #152; #150 is closed. See the
[delivery record](search-topic-navigation-delivery-2026-10-16.md). Pages/Worker
deployment is separately unverified here. The assessment below retains its
original baseline and proposed constraints.

Status reconciliation, 16 October 2026: PR #152 is merged with applicable head
checks passing; #150 is closed and its issue checklist updated. Its branch was
deleted. Pages/Worker deployment remains separately unverified here. The original
assessment/implementation evidence below retains its baseline and limits.

## Finding and priority

The stated gap is present in main: guides 12, 34-37 and 65 have no topic tags,
badges or related cards, and Docs defaults do not enable those controls. They
already have precise task/reference links. Improving discovery is justified,
but absence of badges is not a demonstrated usability failure or runtime bug.
The six pages are existing How-To tasks; no new page extraction or public
Diataxis labels are needed to address this issue.

Use this as the next bounded navigation PR in the pre-release review plan,
following context preparation. It is independent of the #125 Cactus/Welcomments
adapter defects, which still need fixes, compatibility tests and migration
advice before release. Do not reopen merged #147/#149. Interviews are optional;
no human evidence is needed to assess source metadata or resolve a concrete bug.

## Scope and acceptance

| Existing source | Review purpose |
| --- | --- |
| [12 Fuse.js](../docs/collections/_docs/12_fusejs-search.md) | Local provider setup, required search page and baseurl handling. |
| [34 Lunr](../docs/collections/_docs/34_lunr-search.md) | Another local-search task; alternatives are not sequential steps. |
| [35 Simple-Jekyll-Search](../docs/collections/_docs/35_simplesearch-search.md) | Local index/update rules and independent provider selection. |
| [36 Google](../docs/collections/_docs/36_google-search.md) | Engine configuration and external indexing constraints. |
| [37 Algolia](../docs/collections/_docs/37_algolia-search.md) | Separate upload, secret/public keys, exclusions and deprecated-plugin caveat. |
| [65 Search visibility](../docs/collections/_docs/65_search-visibility.md) | Distinguish robots, sitemap, local indexes, Algolia exclusions and public access. |

Reuse `tags`, `show_tags`, `show_related` and `/docs/tags`. A common search topic
and narrower local/hosted/indexing groups are candidates, not an accepted final
taxonomy until actual cards are inspected. Keep relevant non-self documentation
suggestions; fewer than three is acceptable. Do not activate cards on Global
settings just to fill a group. Preserve guide bodies, complete examples, exact
inline links, provider restrictions and public URLs.

Build docs and inspect mobile/desktop reflow, keyboard activation and card/tag
links/fragments. Check that blog tags remain separate. Update topic-index and
`llms.txt` coverage descriptions only as needed. Review selective context and
existing topic-navigation/search-visibility evaluation cases; add only missing
facts. Do not raise the chatbot byte budget for this navigation change. Run
`npm test` for context/case changes. Live answer quality and latency require
separate authorized evaluation; deployment/tests do not prove either.

Record the new PR, actual merge/deployment status and bounded check results in
the active audit. No new YAML options, templates, ranking, search implementation,
public pages or blanket rollout. The separate uncommitted 15-guide integration
work covers five of these six sources but omits guide 65; it is not completion
of #150 and must be narrowed/reviewed against this issue before publication.

## Evidence boundary

This assessment reads source front matter, defaults, the six guide contracts and
the issue's acceptance criteria. It performs no new search-provider operation,
live chatbot inference or Worker deployment. Historical scores and evaluations
remain unchanged. No additional confirmed runtime defect is inferred from the
metadata gap. No accessibility, SEO or PWA improvement is claimed by planning.
