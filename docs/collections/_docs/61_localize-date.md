---
title: Display an article date in another language
subtitle: Translate month and weekday names in your content
excerpt: Add a localized date to an existing dated article using the supplied snippet.
tags: [docs, content, writing]
show_tags: true
show_related: true
cloudtag_url: /docs/tags
---

Use this guide when you want to display a date inside an existing article or
custom template. You need a post with a date, or a page whose front matter
explicitly sets `date`. The supplied snippet translates English month and
weekday names into Spanish, French, German or Italian. English is the fallback.

This task changes the date text you insert. It does not change the stored date,
translate the article or replace every date elsewhere on the website.

## Insert the date

Open the article's `.md` file. Below its front matter (the settings between the
`---` lines), insert this complete example, outside any code fence:

{% raw %}
```liquid
{% assign formatted_date = page.date | date: "%A %d, %B %Y" %}
{% include snippets/datetranslate.html date=formatted_date lang="es-ES" %}
```
{% endraw %}

The first line formats the date; the second translates the month and weekday
names. For an article dated `2020-02-14`, this example displays
**viernes 14, febrero 2020**. The format controls order and punctuation; the
translation does not rearrange them or capitalize the names.

For another supported language, replace `es-ES` with `fr`, `de` or `it`.
An unsupported language retains lowercase English names; it does not fetch a
translation service.

## Use the site language when appropriate

To follow the site's existing language setting, omit the `lang` parameter:

{% raw %}
```liquid
{% assign formatted_date = page.date | date: "%A %d, %B %Y" %}
{% include snippets/datetranslate.html date=formatted_date %}
```
{% endraw %}

The snippet uses `locale` from `_config.yml`, falling back to English if absent.
It does not automatically use a page-level locale. Keep the explicit `lang`
parameter for an article that needs a different date language.

Changing site `locale` also changes language metadata; it is not a switch that
translates the whole interface. Keep it accurate for your website. Snippet
parameters and supported-language behavior are in the
[date reference](./04-layouts#localization-of-dates).

## Publish and check

Commit to the publishing branch, wait for **Actions** to succeed and open the
published article. Check the date against the article's actual date, including
month/weekday names, order and punctuation. For a local preview, restart Jekyll
after editing `_config.yml`.

If no date appears, check that the article has a date and that both lines were
saved outside the front matter. If the code appears literally, remove any code
fence surrounding it in the article. GitHub's file preview does not run the
snippet. Use [publishing checks](./42-unpublished-changes) if the site shows old
content. For a custom template, supply its intended dated object's value instead
of assuming that every page has `page.date`.
