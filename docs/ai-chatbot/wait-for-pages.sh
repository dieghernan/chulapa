#!/usr/bin/env bash
# New context citations must not precede their matching documentation deployment.
set -euo pipefail
: "${GITHUB_REPOSITORY:?Missing repository}"
: "${GITHUB_SHA:?Missing commit}"

for attempt in {1..24}; do
  pages_run_id="$(gh run list --repo "$GITHUB_REPOSITORY" \
    --workflow build-chulapa-gh-pages.yml --commit "$GITHUB_SHA" \
    --json databaseId --jq '.[0].databaseId // empty')"
  if [[ -n "$pages_run_id" ]]; then
    gh run watch "$pages_run_id" --repo "$GITHUB_REPOSITORY" --exit-status
    conclusion="$(gh run view "$pages_run_id" --repo "$GITHUB_REPOSITORY" \
      --json conclusion --jq .conclusion)"
    if [[ "$conclusion" != success ]]; then
      echo "Pages did not succeed: $conclusion" >&2
      exit 1
    fi
    echo "Matching Pages deployment succeeded: $pages_run_id"
    exit 0
  fi
  sleep 5
done

echo "No Pages run found for commit $GITHUB_SHA; chatbot deployment stopped." >&2
exit 1
