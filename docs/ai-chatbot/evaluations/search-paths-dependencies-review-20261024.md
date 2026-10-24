# Search fixes: follow-up assessment — 24 October 2026

Baseline: [ten-question review](search-comments-batch10-review-20261024.md).

| Evidence | Worker | Case | Result | Finding |
| --- | --- | --- | --- | --- |
| [First follow-up](search-paths-dependencies-after-20261024.jsonl) | fd7168ad | custom-search-script-dependencies | partial | Names dependencies but omits ordering; adds an unrequested /find layout recipe and a misleading source label. |
| [First follow-up](search-paths-dependencies-after-20261024.jsonl) | fd7168ad | search-fusejs-setup-1 | pass | Both paths are /find; distinguishes baseurl and correctly identifies pages/documents index scope. No invented posts/About restriction. |
| [Focused follow-up](search-dependency-focus-after-20261024.jsonl) | dfb48928 | custom-search-script-dependencies | pass | Helper/provider/store before adapter; common scripts/navigation once; correct JavaScript source; no arbitrary path or layout change. |

Source checks: local store templates combine site.pages and site.documents;
the existing Fuse and layout/JavaScript guides already describe paths and
dependency ordering. Context changes clarify existing facts. Selector changes
route dependency troubleshooting to its existing section and suppress generic
setup recipes unless setup/configuration is explicitly asked.

The new selective scope and mixed setup behavior have local regression coverage;
114 tests pass, including all catalog byte-cap checks. Source context is 56,998
bytes against 57,000; selected context is capped at 18,000. No inference retry,
new model, increased output budget or AI Search was used.

Only these three new requests are assessed here. Successful samples on different
versions do not establish current-version coverage for both cases or model
repeatability. Prior three partial cases remain open. Deployment includes the
previous PR review fixes, whose live behavior was not evaluated in this follow-up.
