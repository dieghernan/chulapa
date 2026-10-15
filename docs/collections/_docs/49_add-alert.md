---
title: Add an information or warning box
subtitle: Highlight a short message in an existing article
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
