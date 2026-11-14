---
title: Add an information or warning box
subtitle: Highlight a short message in an existing article
tags: [docs, content, writing]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
series:
  - id: site-content
    order: 6
---

Use this guide for an existing Markdown post or page. Open its file in your
repository and edit the article body, below the settings block between `---`
lines. The example uses the sample site's kramdown Markdown parser.

## Insert the message

Separate the message from the preceding paragraph or list with a blank line.
Place the attribute line immediately after the message, without a blank line
between them:

```markdown
Useful information for readers.
{: .alert .alert-info .p-3 .mx-2 .mb-3}
```

Replace the message with your text. Use ordinary paragraphs for routine prose;
for a concrete mistake readers need to avoid or fix, replace `alert-info` with
`alert-warning`. Keep the spacing classes and keep the box short. Additional
styles are in [Bootstrap's alert reference](https://getbootstrap.com/docs/4.5/components/alerts/).

## Add a callout with several paragraphs

Use the same alert classes on a container and add `markdown="1"` so kramdown
formats the text inside it. Keep the opening and closing tags on their own
lines. Use a visible label such as **Note** or **Warning** so readers can
identify the callout without relying on color.

```markdown
<div role="note" class="alert alert-info p-3 mx-2 mb-3" markdown="1">
**Note:** Keep a copy of your draft before changing its permalink.

You can include a second paragraph or a list.
</div>
```

See the rendered [callout example](./components#alert). GitHub-style
`> [!NOTE]` syntax renders as a quote in the sample site's kramdown setup.

## Use a callout

In v2.2.1 development, replace the alert classes with one callout class.
CSS adds a title and a Font Awesome icon. The background uses the skin color
at 10% opacity and the body uses the skin's text color. The solid left border
uses the matching accent, adjusted for contrast in some skins. Corners follow
the skin's border radius and rounded-corner setting.

| Class | English label | Spanish label | Skin color |
| --- | --- | --- | --- |
| `callout-note` | Note | Nota | `info` |
| `callout-tip` | Tip | Consejo | `success` |
| `callout-important` | Important | Importante | `danger` |
| `callout-warning` | Warning | Advertencia | `warning` |
| `callout-caution` | Caution | Precaución | `primary` |

Set `aria-label` to the label in your content's language. The visible CSS title
follows the HTML language for English and Spanish.

For a one-paragraph callout, put the attributes on the line immediately after
the paragraph:

```markdown
Keep a copy of your draft before changing its permalink.
{: .callout-note role="note" aria-label="Note"}
```

For several paragraphs or a list, use the container with `markdown="1"`.

See the [five previews](./components#callouts) for a copyable example.
To see callouts in another skin, open its preview from the [skin gallery](../skins)
and scroll to **Callouts** under **<span class="chulapa">Chulapa</span> components**.

## Publish and verify

Commit to the publishing branch and wait for **Actions** to succeed. Open the
published article and check that the message is a padded box and the following
paragraph is outside it. Check a narrow screen too.

If the attribute line appears as text, check your Markdown parser/settings
against [the Markdown reference](./markdown-cheatsheet). If the wrong content is
inside the box, restore the blank line before the message and keep its attribute
line directly attached. For an old public page, use [publishing checks](./42-unpublished-changes).

Example output:

Useful information for readers.
{: .alert .alert-info .p-3 .mx-2 .mb-3}
