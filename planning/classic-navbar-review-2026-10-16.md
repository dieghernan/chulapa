# Classic navbar demo parity

Date: 16 October 2026. Baseline: `381e6272f`, main after merged
[PR #143](https://github.com/dieghernan/chulapa/pull/143).
Status: implementation ready for review, not a new Diátaxis score.

## Problem and bounded change

The classic-navbar demo maintained a separate copy of the markup and three CDN
script tags. Its dropdowns were anchors with button roles, it omitted the current
navigation landmark/name and aria-current behavior, and it hard-coded `md` instead
of following `navbar.expand`. Updating the theme did not update this demo.

The actual classic branch is now `_includes/components/navbar-classic.html`,
shared by `_includes/navbar.html` and the demo. The ordinary navbar still selects
classic/fab/dual from the same settings. The demo selects classic directly while
using the site's existing menu and expansion settings. No new YAML, theme design,
public configuration API or alternate menu option is introduced. Existing classes,
labels, links and breakpoints are retained in the theme's classic branch.

The demo uses `components/scripts.html` for its dependencies and shared theme
script, and keeps the custom bottom-script hook once. Its body/main IDs let the
shared script initialize normal heading/copy behavior. Public prose explains how
to try the result, links the existing menu guide and navbar reference, and keeps
the development-after-v2.1.0 boundary beside the controls. The displayed front
matter remains the page's actual front matter; copying it alone does not select
classic navigation for a normal site. No new setup guide is created.

## Verification

- New Jekyll regression builds the actual demo and ordinary navbar. Normalized
  navbar output matches for default/sm/lg/xl/always/never expansion, root and
  `/project`, and classic/fab/dual site styles. It verifies native dropdown buttons,
  active and search destinations, no floating markup in the demo, one copy of
  each common library and one custom hook. Shared markup removes the duplicate
  source of drift rather than adding another reference implementation.
- Full documentation build with Jekyll 4.4 and this local theme passes. All
  3,052 generated documentation links/fragments resolve.
- Existing HTML5 semantics checks pass across classic/fab/dual and root/project
  URLs: syntax, landmarks, IDs, accessible navigation names, head formatting and
  preserved code whitespace. All 34 shared-script JavaScript tests pass.
- Chromium at 320/767/768/1280 px: mobile collapse opens with Enter, first link
  is reachable with Tab, and Space closes it; dropdowns open with Enter/Space,
  ArrowDown reaches a link, Escape closes and returns focus. Desktop is expanded.
  The current link is identified, the navbar stays at the top while scrolling,
  and there is no document-level horizontal overflow. Open menus inspected at
  320/1280 px. Exact CDN dependency bytes served locally pass their SRI hashes;
  no live CDN-availability guarantee or touch/assistive-technology study claimed.
- Demo URL, title, description and search-exclusion setting are preserved. No
  manifest/service-worker/cache changes; no offline or PWA-readiness claim.
  A development changelog entry records the user-facing demo correction.

## Context and remaining work

Reviewed navbar facts, navigation evaluation cases and existing guide/reference
links in `llms.txt` and the selective chatbot context. Supported settings, facts
and source destinations are unchanged, so neither needs expansion or a new entry.
No chatbot context change, live model evaluation or manual deployment is included.
Passing technical tests does not establish chatbot accuracy or observed usability.

After this PR is merged, the next bounded implementation is the final FAQ/Global
settings/Layout routing review identified in the starter report. The proposed
four-page comparison of Diátaxis labels versus purpose-oriented introductions
comes after that; no automatic page-wide labels are introduced here. Real novice
first publication, second tutorial and advanced lookup sessions, plus live chatbot
fact/citation/latency evaluation, remain pending under the existing protocol.
Historical evaluations are retained without rescoring or invented measurements.
