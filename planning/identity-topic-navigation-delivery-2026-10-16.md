# Navigation, identity and branding topic delivery

Date: 16 October 2026. Baseline: main `d7e0b78a6`, after merged #153.
Branch: `codex/docs-identity-topic-navigation`.
Status: locally reviewed/implemented; PR, CI, merge and deployment pending.

## Scope and dispositions

Review pages 10, 11, 14, 52, 53, 54 and 60 only. Reuse existing badges,
`show_related` and `/docs/tags`. Menu/footer/site details share `navigation`;
site details/favicon/personal publisher share `site-identity`; favicon/bundled
font/Font Awesome share `branding`. The bundled-font guide also joins existing
`appearance` and `fonts`, connecting it to the previous font/skin guidance.

Icons and publisher each have two relevant candidates; do not add artificial
tags or unrelated filler to reach three. Related cards supplement precise inline
links and do not imply a setup sequence. Site/author identity and publisher
structured data remain distinct; favicon, article illustration, font and icon
instructions retain their own contracts and compatibility/accessibility caveats.

All seven bodies, fenced examples, titles, subtitles, version caveats and inline
links remain unchanged. No public page, Diataxis labels, extraction, theme
renderer, configuration option or recommendation-ranking change. The original
tutorials retain their explicit progression.

## Rendered recommendation review

Actual selections match at 320 and 1280 CSS pixels. The eight previously enabled
appearance pages were included because the font guide changes their candidate
pool, not just the seven pages receiving metadata:

| Guide | Related documentation |
| --- | --- |
| 10-edit-menu | Global settings; Change your site’s name and author; Edit footer links |
| 11-edit-footer | Global settings; Change your site’s name and author; Add or change a menu link |
| 14-site-details | Global settings; Identify a personal site’s publisher; Add a favicon |
| 52-add-favicon | Change your site’s name and author; Identify a personal site’s publisher; Add a Font Awesome icon to an article |
| 53-chulapa-font | Theming Chulapa; Adapt a Sass skin; Change the fonts |
| 54-add-icon | Add a favicon; Use the Chulapa font |
| 60-person-publisher | Change your site’s name and author; Add a favicon |
| 03-theming | Adapt a Sass skin; How skins and overrides interact; Choose a skin |
| 22-choose-skin | Theming Chulapa; Adapt a Sass skin; How skins and overrides interact |
| 23-change-color | Theming Chulapa; Enable Autothemer; How skins and overrides interact |
| 24-change-fonts | Theming Chulapa; Use the Chulapa font; Adapt a Sass skin |
| 25-code-highlighting | Theming Chulapa; Adapt a Sass skin; Choose a skin |
| 26-appearance-precedence | Theming Chulapa; Choose a skin; Adapt a Sass skin |
| 27-autothemer | Theming Chulapa; How skins and overrides interact; Change a color |
| 28-custom-skin | Theming Chulapa; Choose a skin; Use the Chulapa font |

The fonts guide now includes the bundled-font task among its three cards; the
skin/font task also includes it. Other appearance links stay topically relevant.
The existing date tie ordering and three-card cap are preserved. This is source
and rendered editorial review, not a human findability or completion result.

## Verification and known defect

- Full Jekyll 4.4 docs build and all 40 chatbot tests pass.
- Fifteen pages at 320/1280 px: expected two/three non-self Docs cards, visible
  topic badges, no related-card dates and no document horizontal overflow.
- Desktop/mobile site-details, favicon and affected font screenshots inspected.
  Related card and site-identity badge activate with Enter; topic groups exist.
- Docs/blog topic entries remain separate. All 91 checked card/topic destinations
  and fragments resolve across the seven new and eight affected appearance pages.
- Guide bodies compare unchanged after Git newline normalization. UTF-8/new
  mojibake checks, unique evaluation IDs, plan links and `git diff --check` pass.

Captured [#154](https://github.com/dieghernan/chulapa/issues/154): the existing
shared tag/category cloud renderer outputs build dates for undated Docs despite
`show_date: false`. Confirmed in generated HTML and the renderer. Related card
dates are correctly hidden; the cloud-index defect is not fixed by this metadata
PR and remains separate reusable-theme work before release triage. No claim that
all date/structured-data behavior is correct follows from passing these checks.

The topic index, `llms.txt`, selective topic summary and one focused navigation
case reflect the coverage. Context is 46,976/47,000 Windows bytes with no budget
increase; runtime/model/prompt, historical scores and raw evaluations unchanged.
Existing identity/publisher/favicon/font/icon cases retain their facts.

Accessibility verification covers affected native links and responsive reflow,
not full certification or assistive-tech testing. Guide metadata/canonical fields
remain intact; the known cloud-date issue is tracked separately. No manifest,
service-worker, cache or offline changes, and no PWA-readiness claim. No theme
changelog entry for documentation navigation.

No live model/provider queries, manual Worker deployment or participant study.
Publication requires an approved merge and separate workflow/context verification.
Technical checks do not prove chatbot precision or human usability. Next bounded
group: comments and analytics (13, 18, 19, 38-41). Retain #125 migration/provider
warnings and the new #154 rendering issue as separate runtime workstreams.
