---
title: Accessibility and resource-loading reference
subtitle: Expected behavior, version boundaries and limits
tags: [docs, accessibility]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Lookup for the theme's behavior and limits. Practical verification steps are in
[Check accessibility and performance](./06-accessibility-performance).

The improvements listed here are available in v2.2.0, not in the v2.1.0 gem or pinned remote theme. Actual results depend
on content, colors, integrations and local overrides. No theme setting or test
score establishes WCAG compliance for a complete site.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

## Keyboard navigation

**Version:** the keyboard/focus improvements below and PhotoSwipe require v2.2.0; they are not included in the v2.1.0 gem or pin.

| Component | Expected behavior in v2.2.0 |
| --- | --- |
| Skip link | First Tab stop, bypassing repeated navigation. On `default` pages, the main landmark includes the page heading and body. |
| Previous/Next documents | Available destinations are Tab-reachable; missing neighbors have no interactive link. |
| Floating menu | Enter/Space opens; Escape closes and returns focus to its button. Following a link closes it. Closed links are outside the Tab order. |
| Dropdowns | Native buttons; font inherits the surrounding menu styling. |
| Sidebar TOC | Close control and links are keyboard reachable while open. Escape closes and returns focus; the panel is not a modal focus trap. |
| Active TOC section | Reading-position highlight does not move keyboard focus. |
| PhotoSwipe | Arrow-key browsing and Escape closing; focus returns to the image link. Image links remain usable if the viewer cannot load. |

Without JavaScript, the floating menu exposes ordinary navigation links.
Interactive integrations can still depend on JavaScript and network access.
Custom layouts/widgets only have the semantics and controls their own markup
preserves.

The optional light/dark/auto selector has a known limitation in v2.2.0: its
toggle suppresses the keyboard focus outline and shadow. Sites requiring a
visible focus indicator for this control need a local CSS override, or can
leave the optional selector disabled. Other navigation focus checks do not
establish visible focus for this toggle.

**Development (v2.2.1):** the selector restores a visible keyboard focus indicator
with a white outline and black outer ring on classic, floating and dual
navigation. This fix is not included in v2.2.0.

## Colors, content and motion

The link/focus improvements here require v2.2.0, not
the v2.1.0 gem or pin. Article links are underlined and keyboard focus is visible.
Custom colors can
weaken those cues or their contrast. Skin selection does not replace a check of
the actual text, links and backgrounds used by a site.

**Development (v2.2.1):** contrast corrections cover the 16 skins authored by
`dieghernan`. They improve default navigation, selected text links and their
interaction states, badges, tag/category labels, outline buttons and text/links
inside contextual cards. Listen's Primary card uses the same dark text as its
Primary button, keeping its green background. Main semantic palettes
are preserved; some badges reuse the readable solid-button fills.

Navigation text defaults adapt to the final configured navigation background.
Explicit navigation text colors remain authoritative. Component corrections skip
custom semantic colors; custom colors and content still need checking. Third-party
skins are unchanged. These changes are not included in v2.2.0 and do not establish
whole-site WCAG conformance.

The carousel motion/control improvements in this paragraph require v2.2.0, not the v2.1.0 gem or pin. Automatically cycling multi-image
carousels have a play/pause control with an
action-specific accessible name and a plain-symbol fallback when icon assets
are unavailable. Reduced motion starts them paused. Slide/navigation interaction
stops rotation until explicit restart; hovering pauses temporarily. `interval=0`
disables cycling. [Carousel reference](./04-layouts#bootstrap-carousel).

In v2.2.0, video `name` supplies descriptive player and
play-button names. In v2.1.0, it supplies video metadata but not those accessible
names. Neither version creates captions or transcripts. Version 2.2.0
also provides a YouTube link when JavaScript is disabled; v2.1.0 lacks that link.
Mermaid (available in v2.2.0, not in the v2.1.0 gem or pin) uses
`accTitle` and `accDescr` to describe a diagram; complex content still
needs a prose equivalent. Gallery snippets use generic image descriptions;
individual informative photographs need descriptive custom image markup.
[Media tasks](../docs#how-to-guides) cover adding that content.

Long titles and enlarged text are covered by representative checks, not by a
promise about every custom layout or widget.

## Resource loading

| Integration or resource | Loading behavior or constraint |
| --- | --- |
| PhotoSwipe | Available in v2.2.0, not in the v2.1.0 gem or pin; viewer loads when an image is opened. |
| Deferred YouTube | Preview first, player on activation; [loading reference](./04-layouts#deferred-lazy-loading-of-youtube-videos). |
| MathJax | Page opt-in; unnecessary enabled integrations can add resources. |
| Mermaid | Page opt-in; available in v2.2.0, not in the v2.1.0 gem or pin. |
| Cactus | Conditional scripts/styles on `show_comments: true` pages require v2.2.0; v2.1.0 loads those resources more broadly. |
| Analytics | Optional; configuring GA and GoatCounter enables both counters. GoatCounter requires v2.2.0 (absent from the v2.1.0 gem/pin) and has [production requirements](./02-config#goatcounter-analytics). |

Large images, additional fonts/icons and external services affect requests and
loading time. Demo measurements do not predict another site's performance.

## PWA and offline behavior

The theme supplies no service worker, offline cache or YAML switch enabling
offline support. A favicon/web app manifest alone establishes neither offline
operation nor guaranteed app installability. Site-specific capabilities depend
on the site's hosting and any separate implementation.

Comments, embedded videos and the documentation chatbot {% include custom/chatbot-icon.html %} need network access.
A published site must be tested before offline behavior is promised.

## Review coverage

Automated checks exercise keyboard navigation, narrow screens and reduced motion
on representative layouts/skins. They do not cover every site's content,
customizations, browser or assistive technology. Passing them is not a WCAG
certification or a guarantee of loading-performance metrics.

The [review record](https://github.com/dieghernan/chulapa/blob/main/test/accessibility-review.md)
contains technical results and remaining checks. That maintainer evidence is
separate from the [site-checking procedure](./06-accessibility-performance).
