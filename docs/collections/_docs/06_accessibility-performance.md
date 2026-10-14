---
title: Accessibility and performance
subtitle: Check your site's navigation, colors and resources
excerpt: Keyboard behavior, reduced motion and practical loading advice.
show_toc: true
permalink: /docs/06-accessibility-performance
---

Make sure visitors can read and use your site on a phone, with a keyboard and
with enlarged text. Start with your own content and the checks below.

## Check your own pages

- Use Tab to move through links and controls. Focus should remain visible;
  Enter opens links, and menu buttons also work with Space.
- Check the home page, an article and search on a narrow screen. Enlarge text
  and confirm that content stays readable and controls remain reachable.
- Describe informative photographs and use meaningful link text, such as
  “View my portfolio”, instead of “Click here”.
- Start article sections with `##`, below the page title.
- Check text and link contrast after changing a skin or colors.
- Try search, comments and any widgets you have enabled.

The improvements described here are development changes after v2.1.0, not
part of the v2.1.0 gem or pinned remote theme. Your content, colors and
integrations still need checking; the theme alone does not establish compliance
with the Web Content Accessibility Guidelines (WCAG).

## Keyboard navigation

The first Tab stop, **Skip to content**, bypasses the menu. Open the floating
menu with Enter or Space; Escape closes it and returns focus to its button.
Following a link also closes it. Dropdown buttons use the same font as the
surrounding menu links.

Open the sidebar table of contents, then Tab through its close button and
links. Escape closes the panel and returns focus. The table of contents
highlights the section you are reading without moving keyboard focus.

In PhotoSwipe galleries, use arrow keys to browse and Escape to close. Focus
returns to the image link. If the viewer cannot load, links still open the
original images. See [PhotoSwipe lightboxes](./04-layouts#photoswipe-lightbox).

With JavaScript disabled, the floating menu provides ordinary navigation links.
Interactive galleries and other integrations may need JavaScript and an
internet connection.

## Colors and content

Keep links distinguishable from ordinary text. The theme underlines article
links and provides visible keyboard focus; check that your custom colors
preserve those cues.

Carousels have a play/pause control when automatic cycling is enabled. A plain
symbol remains if Font Awesome cannot load. They start paused for visitors
who prefer reduced motion and stop when someone interacts with the slides or
navigation controls. Hover pauses temporarily; use the play control to resume
a manually paused slideshow. See [carousel settings](./04-layouts#bootstrap-carousel).

Give videos a descriptive `name` and supply captions or transcripts where
needed. For Mermaid diagrams, use `accTitle` and `accDescr`. Gallery snippets
use generic image descriptions; use custom image markup with descriptive
`alt` text when the photograph conveys information.

Check long titles and enlarged text on your actual pages. If you add custom
layouts or widgets, also check their headings, labels and keyboard controls.

## PWA and offline behavior

The theme does not provide offline support or a setting to enable it.
A favicon or web app manifest alone does not make the site work offline or
guarantee that visitors can install it as an app.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

Adding those capabilities requires a separate setup for your own site and
hosting. Comments, embedded videos and the documentation chatbot need an
internet connection. Test the published site before promising offline access.

## Resource loading

Resize large photographs before uploading and enable only integrations you
use. Extra fonts, icons and external services can add requests and slow loading.

The theme loads PhotoSwipe when a visitor opens an image. Deferred YouTube
videos show a preview first and load the player on activation. See
[video loading](./04-layouts#deferred-lazy-loading-of-youtube-videos).

Enable MathJax or Mermaid only on pages that need them. With Cactus, comment
resources load on pages with `show_comments: true`.

Analytics are optional. If you configure Google Analytics and GoatCounter,
both services count visits. See [analytics settings](./02-config#goatcounter-analytics)
for setup and production-build requirements.

Check loading on your published home page and a representative article with
your actual images and integrations. A test score from this demo does not
predict your site's performance.

## Review coverage

The theme has automated checks for keyboard navigation, narrow screens and
reduced motion. They cover representative layouts and skins, not every site
or customization. Test your own published pages too.

The [review record](https://github.com/dieghernan/chulapa/blob/main/test/accessibility-review.md)
contains the technical results and remaining checks.
