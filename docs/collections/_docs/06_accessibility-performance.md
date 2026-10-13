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

- Use Tab to move through links and controls. You should see which one has
  focus; Enter should open links, and menu buttons should also work with Space.
- Check the home page, an article and search on a narrow screen. Enlarge text
  and confirm that it remains readable and controls stay reachable.
- Describe informative photographs with image alternative text. Use meaningful
  link text, such as “View my portfolio”, instead of “Click here”.
- Use headings in order, starting article sections with `##` below the page title.
- Check that text and links remain readable after changing colors or skins.
- Resize large photographs before uploading, and enable only integrations you
  use. Check loading on your published website with your actual content.

The reference below explains the theme's keyboard behavior and optional
features. Improvements described here are development changes after v2.1.0,
not part of the v2.1.0 gem or pinned remote theme. WCAG is the Web Content
Accessibility Guidelines; the theme's checks alone do not establish that your
whole site meets them. Your content, colors and integrations need review too.

## Keyboard navigation

The first Tab stop is **Skip to content**, which bypasses the navbar. This also
works with custom layouts derived from `minimal`, without requiring a specific
content wrapper.

The floating navbar button (`fab`, or the floating part of `dual`) opens with
Enter or Space. Opening focuses the first menu link; Escape closes the menu
and returns focus to its button. Closed menu links do not receive Tab focus.
Following a menu link closes the menu. With `dual`, switching to the desktop
navbar also closes the floating menu.

The sidebar table of contents has its own controls. When closed, its links
are hidden from screen readers and keyboard navigation.
Opening preserves the existing Tab order through its close button and links;
Escape from the panel or its trigger closes it and returns focus to the trigger.
Closing with its button or overlay also returns focus. It does not trap focus
or act as a modal dialog. The open and close buttons provide 44px minimum targets.

The table of contents highlights the section you are reading. This needs
JavaScript and does not move keyboard focus. Hidden headings are skipped until shown; ordinary anchor links
still work without JavaScript.

PhotoSwipe galleries support arrow keys, zoom, Escape and focus containment;
closing the viewer returns focus to the image link. Reduced-motion preferences
disable opening and zoom animations. Original image links remain usable without
JavaScript or when viewer assets fail to load. See [PhotoSwipe lightboxes](./04-layouts#photoswipe-lightbox)
for setup and limitations.

The lateral TOC is named **Sidebar table of contents** and the footer link
navigation is named **Footer links** so assistive technology can distinguish
them from the primary navbar.

Keyboard focus has a visible outline. Heading permalinks appear when focused,
as well as on hover. Card image links use the article title as their accessible
name. Theme navigation and icon transitions respect the browser's
`prefers-reduced-motion` preference.

If JavaScript is disabled, floating navigation has a static link fallback.
The floating-menu controls also work on search pages and if the jQuery CDN request fails; components
that depend on Bootstrap JavaScript still require its dependencies.

## Colors and content

Prose links in paragraphs and lists are underlined so color is not their only
visual distinction. Navigation links and buttons keep their component styles.
Text link colors have been darkened in the `chulapa`, `navi`, `journal` and
`flatly` skins. Custom `chulapa-skin.vars` values can change the resulting
contrast, so check the rendered site after overriding them.

The standard article lists and search results use a heading hierarchy and
name thumbnail links after their articles. Keep a logical heading order in
your own content and custom layouts.

The menu identifies the current page. Dropdown menus and carousel controls
work with Enter and Space. Dropdown buttons keep the menu capitalization
chosen by the skin.

Carousels with more than one image and a positive `interval` expose a
pause/start button when Bootstrap is available. Automatic cycling starts paused
with `prefers-reduced-motion: reduce`, stops when keyboard focus enters the
slides or navigation controls, and resumes only through an explicit start.
Hover temporarily pauses it on devices that support hover. Slide indicators are
named buttons with 24px minimum targets and identify the current slide.
See [Bootstrap carousel](./04-layouts#bootstrap-carousel) for the full behavior.

Lunr, Fuse.js, Simple-Jekyll-Search and Google search forms expose a search
landmark. Lunr and Fuse.js announce the rendered result count through a polite
status region without moving focus; clearing the input clears that status.
The no-results message is a paragraph rather than a heading. Welcomments has
an explicit comment-field label and associates its formatting instructions
with the field; its configuration warning does not add another page heading.

Use descriptive links, meaningful image alternatives and a logical heading
structure. For Mermaid diagrams, supply `accTitle` and `accDescr`. Test your
own pages with keyboard navigation, zoom and a screen reader, including search,
comments and any custom widgets.

Long headings can wrap within their container when text is enlarged. Regression
checks cover 320 CSS pixel reflow (equivalent to 400% zoom on a 1280px-wide
viewport) and 200% text enlargement; also check your actual content and browser
zoom settings. Video players and play buttons use the existing `name` parameter
to distinguish their content. Names are trimmed; omitted, empty or whitespace-only
values use the generic player name. Gallery snippets still generate generic image
alternatives: supply descriptive `alt` text in custom image markup when the
image conveys information, and provide captions or transcripts for media where
needed. The template cannot derive those descriptions from an image URL.

## PWA and offline behavior

The reusable theme does not register a service worker or provide an offline
cache. The documentation site has a favicon manifest with `display: standalone`
and 192px/384px icons, but it currently has no explicit `start_url`, `scope` or
512px icon. That manifest alone does not establish installability across
browsers or offline functionality.

PWA support requires a site-specific review of manifest URLs, icons, HTTPS,
start URL and scope, especially for project sites using `baseurl`. If you add a
service worker through custom code, review updates, stale caches and an offline
fallback. External libraries, comments, videos, analytics and the documentation
chatbot have network dependencies; the chatbot's AI endpoint requires a live
connection. Test the actual deployed site and browser before claiming those
features work offline. There is no built-in PWA YAML option.

## Resource loading

The theme includes its own <span class="chulapa">Chulapa</span> font. Optional
Google Fonts and Font Awesome use external providers, so consider those
requests when choosing additional fonts and icons.

With Cactus configured, its script and stylesheet load only on pages with
`show_comments: true`. MathJax and Mermaid remain opt-in per page; Mermaid
loads its library only when an enabled page contains diagrams.

PhotoSwipe loads its viewer when someone opens an image. It does not need to
download the whole gallery first.

GoatCounter loads its official asynchronous script only when a public HTTPS
endpoint is configured and `JEKYLL_ENV=production`. It is independent of Google
Analytics: configuring both loads both trackers. See [analytics settings](./02-config#goatcounter-analytics).

In v2.1.1-dev, deferred YouTube players load when a visitor activates them.
Use [deferred loading](./04-layouts#deferred-lazy-loading-of-youtube-videos)
if video players are slowing the initial page load.

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
