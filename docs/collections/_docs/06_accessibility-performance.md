---
title: Accessibility and performance
subtitle: Check your site's navigation, colors and resources
excerpt: Keyboard behavior, reduced motion and practical loading advice.
show_toc: true
permalink: /docs/06-accessibility-performance
---

The improvements on this page are development changes after v2.1.0. They are
not included in the v2.1.0 gem or pinned remote theme. A theme review does not
establish that every site using it meets WCAG: content, skins, custom colors
and integrations need their own checks.

## Keyboard navigation

The first Tab stop is **Skip to content**, which bypasses the navbar. This also
works with custom layouts derived from `minimal`, without requiring a specific
content wrapper.

The floating navbar button (`fab`, or the floating part of `dual`) opens with
Enter or Space. Opening focuses the first menu link; Escape closes the menu
and returns focus to its button. Closed menu links do not receive Tab focus.
Following a menu link closes the menu. With `dual`, switching to the desktop
navbar also closes the floating menu.

The lateral TOC remains independent. Its open and close controls and navigation
through entries with Tab keep their existing behavior. It does not trap focus
or act as a modal dialog.

Keyboard focus has a visible outline. Heading permalinks appear when focused,
as well as on hover. Card image links use the article title as their accessible
name. Theme navigation and icon transitions respect the browser's
`prefers-reduced-motion` preference.

If JavaScript is disabled, floating navigation has a static link fallback.
The floating-menu controls also work if the jQuery CDN request fails; components
that depend on Bootstrap JavaScript still require its dependencies.

## Colors and content

Prose links in paragraphs and lists are underlined so color is not their only
visual distinction. Navigation links and buttons keep their component styles.
Text link colors have been darkened in the `chulapa`, `navi`, `journal` and
`flatly` skins. Custom `chulapa-skin.vars` values can change the resulting
contrast, so check the rendered site after overriding them.

Card index titles use level-two headings with their previous visual size.
Their subtitles use paragraph semantics and body text color for readability.

Use descriptive links, meaningful image alternatives and a logical heading
structure. For Mermaid diagrams, supply `accTitle` and `accDescr`. Test your
own pages with keyboard navigation, zoom and a screen reader, including search,
comments and any custom widgets.

## Resource loading

The Chulapa font is served from the installed theme's
`assets/fonts/Chulapa/Chulapa-Bold_vmod.otf`. Its preload and CSS URL include
the site's `baseurl`. This avoids a separate CDN request for that font and keeps
it consistent with the installed theme. Google Fonts and Font Awesome still
use their configured external providers.

With Cactus configured, its script and stylesheet load only on pages with
`show_comments: true`. MathJax and Mermaid remain opt-in per page; Mermaid
loads its library only when an enabled page contains diagrams.

Resize large images before publishing, include dimensions where possible and
avoid enabling integrations that your site does not use. Measure representative
pages with your real content and hosting. Local checks cannot establish a
production PageSpeed score or Core Web Vitals result.

## Review coverage

The October 8, 2026 review covers `chulapa`, `navi`, `journal`, `gitdev`, `lux`
and `flatly`, with default, landing, minimal and card-index fixtures at 320,
390 and 1280 px widths. Browser checks include keyboard operation, reduced
motion and the transition between floating and classic navigation.

See the [review record](https://github.com/dieghernan/chulapa/blob/main/test/accessibility-review.md)
for results, remaining checks and reproduction commands.
