---
title: Accessibility and resource-loading reference
subtitle: Expected behavior, version boundaries and limits
---

Lookup for the theme's behavior and limits. Practical verification steps are in
[Check accessibility and performance](./06-accessibility-performance).

The improvements listed here are available on `main` after v2.1.0
(v2.1.1-dev), not in the v2.1.0 gem or pinned remote theme. Actual results depend
on content, colors, integrations and local overrides. No theme setting or test
score establishes WCAG compliance for a complete site.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Keyboard navigation

| Component | Expected behavior in the development version |
| --- | --- |
| Skip link | First Tab stop, bypassing repeated navigation. |
| Floating menu | Enter/Space opens; Escape closes and returns focus to its button. Following a link closes it. Closed links are outside the Tab order. |
| Dropdowns | Native buttons; font inherits the surrounding menu styling. |
| Sidebar TOC | Close control and links are keyboard reachable while open. Escape closes and returns focus; the panel is not a modal focus trap. |
| Active TOC section | Reading-position highlight does not move keyboard focus. |
| PhotoSwipe | Arrow-key browsing and Escape closing; focus returns to the image link. Image links remain usable if the viewer cannot load. |

Without JavaScript, the floating menu exposes ordinary navigation links.
Interactive integrations can still depend on JavaScript and network access.
Custom layouts/widgets only have the semantics and controls their own markup
preserves.

## Colors, content and motion

Article links are underlined and keyboard focus is visible. Custom colors can
weaken those cues or their contrast. Skin selection does not replace a check of
the actual text, links and backgrounds used by a site.

Automatically cycling multi-image carousels have a play/pause control with an
action-specific accessible name and a plain-symbol fallback when icon assets
are unavailable. Reduced motion starts them paused. Slide/navigation interaction
stops rotation until explicit restart; hovering pauses temporarily. `interval=0`
disables cycling. [Carousel reference](./04-layouts#bootstrap-carousel).

Video `name` supplies a descriptive player name, not captions or transcripts.
Mermaid's `accTitle` and `accDescr` describe a diagram; complex content still
needs a prose equivalent. Gallery snippets use generic image descriptions;
individual informative photographs need descriptive custom image markup.
[Media tasks](../docs#how-to-guides) cover adding that content.

Long titles and enlarged text are covered by representative checks, not by a
promise about every custom layout or widget.

## Resource loading

| Integration or resource | Loading behavior or constraint |
| --- | --- |
| PhotoSwipe | Viewer loads when an image is opened. |
| Deferred YouTube | Preview first, player on activation; [loading reference](./04-layouts#deferred-lazy-loading-of-youtube-videos). |
| MathJax and Mermaid | Page opt-ins; unnecessary enabled integrations can add resources. |
| Cactus | Scripts/styles only on `show_comments: true` pages in the development version. |
| Analytics | Optional; configuring GA and GoatCounter enables both counters. GoatCounter has [version/production requirements](./02-config#goatcounter-analytics). |

Large images, additional fonts/icons and external services affect requests and
loading time. Demo measurements do not predict another site's performance.

## PWA and offline behavior

The theme supplies no service worker, offline cache or YAML switch enabling
offline support. A favicon/web app manifest alone establishes neither offline
operation nor guaranteed app installability. Site-specific capabilities depend
on the site's hosting and any separate implementation.

Comments, embedded videos and the documentation chatbot need network access.
A published site must be tested before offline behavior is promised.

## Review coverage

Automated checks exercise keyboard navigation, narrow screens and reduced motion
on representative layouts/skins. They do not cover every site's content,
customizations, browser or assistive technology. Passing them is not a WCAG
certification or a guarantee of loading-performance metrics.

The [review record](https://github.com/dieghernan/chulapa/blob/main/test/accessibility-review.md)
contains technical results and remaining checks. That maintainer evidence is
separate from the [site-checking procedure](./06-accessibility-performance).
