---
title: 'Use the <span class="chulapa">Chulapa</span> font'
subtitle: Apply the bundled font to headings or selected text
tags: [docs, appearance, fonts, branding]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide on an existing site using the theme's stylesheets. The
<span class="chulapa">Chulapa</span> font is already supplied by the theme; no Google Fonts setup is needed.

## Apply it to headings

In `_config.yml`, edit your existing `chulapa-skin.vars` mapping, keeping your
skin and other overrides. Add or update this family; do not create a second
`chulapa-skin` section:

```yaml
chulapa-skin:
  vars:
    headings-font-family: "chulapa, sans-serif"
```

To enable its distinctive ligatures, append these rules to
`assets/css/custom.scss`, preserving existing rules and its empty YAML front
matter. If the file does not exist, the complete example is:

```scss
---
---
h1,h2,h3,h4,h5,h6 {
    -webkit-font-feature-settings: "liga", "dlig";
    -moz-font-feature-settings: "liga=1, dlig=1";
    -moz-font-feature-settings: "liga", "dlig";
    -ms-font-feature-settings: "liga", "dlig";
    -o-font-feature-settings: "liga", "dlig";
    font-feature-settings: "liga", "dlig";
    text-rendering: optimizeLegibility;
}
```

For an existing file, append only the rules; do not add another pair of front
matter delimiters. For other font families, use [Change the fonts](./24-change-fonts).

## Apply it to selected text instead

If you only want the font on selected text, keep your heading configuration and
use the existing `chulapa` class in a Markdown article. The class supplies both
the font and ligature styling:

```html
<span class="chulapa">Chulapa</span>
```

For a whole paragraph with kramdown, put the attribute line directly after it:

```markdown
A relaxing cup of café con leche in Plaza Mayor.
{: .chulapa}
```

## Publish and verify

Commit to the publishing branch, wait for **Actions** to succeed and open an
article on the website. For a local preview, restart Jekyll after changing
`_config.yml`. Compare the headings or selected text with an ordinary paragraph.

If the font appears as ordinary letters without the distinctive ligatures,
check the CSS rules/class and any later overrides. Without ligatures it looks
like <span class="chulapa" style="font-feature-settings: 'liga', 'dlig' 0;">Chulapa</span>;
with the class it looks like <span class="chulapa">Chulapa</span>.
Check the compiled CSS and font requests in your browser. In v2.2.0, preload/CSS use theme-local font assets with `baseurl`; that
loading improvement is not in the v2.1.0 release. For an older theme version,
check the font URL its own stylesheet uses.
For old public content, use [publishing checks](./42-unpublished-changes).
