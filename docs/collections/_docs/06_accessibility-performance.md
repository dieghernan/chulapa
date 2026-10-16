---
title: Accessibility and performance
subtitle: Check your site's navigation, colors and resources
excerpt: Verify your published pages with a keyboard, narrow screens and real content.
show_toc: true
permalink: /docs/06-accessibility-performance
tags: [docs, accessibility]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Use this guide to check a published site after changing content, a skin or an
integration. Have the home page, a representative article and search open, along
with any galleries, videos or comments you use.

Some expected controls require `main` after v2.1.0, not the v2.1.0 gem or pin.
Compare your installed version with [the behavior reference](./48-accessibility-reference).
These checks do not establish WCAG compliance by themselves.

## Check your own pages

Open those pages at a narrow phone width and enlarge their text. Confirm that
content remains readable and controls stay reachable. Check long headings and
your actual images, not only short sample content. Repeat after fixing a problem.

Use the steps below for each representative page. Record the page, browser,
viewport and problem so you can verify the same case after changing it.

## Keyboard navigation

1. Use Tab without a mouse. Confirm you can see which link or control has focus.
   Activate **Skip to content** when available and check that it bypasses the menu.
2. Open and close your menu and dropdowns. Use Enter for links, Enter/Space for
   buttons and Escape where a panel supports it. Confirm focus returns to the
   trigger after closing the floating menu.
3. If you use the sidebar TOC, open it, Tab through its controls and close it with
   Escape. Check that closed controls are no longer reachable and that section
   highlighting does not move keyboard focus while you read.
4. In a PhotoSwipe gallery, open an image, browse with arrow keys and close with
   Escape. Check the return to the image link. Try search, comments and your
   other widgets too.

For exact supported behaviors and fallback limits, use
[the keyboard reference](./48-accessibility-reference#keyboard-navigation).
If you use custom layouts or widgets, check their headings, labels and controls
as well as the theme's own navigation.

## Colors and content

Check text and link contrast on the actual backgrounds after changing colors.
Confirm that links remain distinguishable without relying only on color and
that keyboard focus is visible. Use meaningful link text, such as “View my
portfolio”, rather than “Click here”.

Review informative photographs for descriptive alternative text. Gallery snippets
supply generic descriptions; use [custom image markup](./17-add-image) where the
individual photograph conveys information. Give videos a descriptive `name` and
provide captions/transcripts where needed. Give Mermaid diagrams `accTitle` and
`accDescr` and explain complex diagrams in prose. Begin article sections with
`##` below the page title.

Enable reduced motion in your device/browser settings and reload an automatically
cycling carousel. Check that it starts paused, that play/pause is operable and
that the chosen state survives interaction as described by
[the motion reference](./48-accessibility-reference#colors-content-and-motion).

## PWA and offline behavior

Do not infer offline support from a favicon, manifest or an app-like window.
The theme provides no built-in offline mode; see
[offline constraints](./48-accessibility-reference#pwa-and-offline-behavior).
If you added a separate offline implementation, disconnect the network and test
the published pages and integrations before promising that behavior to visitors.

## Resource loading

Check loading on the published home page and an article using your real images
and enabled integrations. Resize large photographs before uploading. Remove
unneeded fonts/integrations and enable MathJax or Mermaid only where needed.

Open a deferred YouTube video or PhotoSwipe image and verify its loading/fallback
behavior. Check comments on an enabled post and confirm that any configured
analytics matches your intended setup. For expected loading behavior and version
limits, use [the resource reference](./48-accessibility-reference#resource-loading).

A score measured on the demo cannot replace these checks on your own site.

## Review coverage

After correcting a problem, repeat the affected steps on the same pages and
check related controls. Include custom headings/labels and third-party widgets
in your review. Record anything you could not test, including browsers or
assistive technologies that were unavailable.

The theme's [automated-review scope](./48-accessibility-reference#review-coverage)
is a separate reference; a passing theme suite does not test your whole site.
