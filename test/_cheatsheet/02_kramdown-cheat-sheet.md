---
title: kramdown cheatsheet
subtitle: Beyond Markdown
excerpt: kramdown supercharges Markdown with some interesting features.
categories: [tutorial]
tags: [starter,syntax,kramdown]
---

## What’s kramdown?

**kramdown** supercharges Markdown with some interesting features.

**kramdown** is the default Jekyll Markdown processor. When creating your site with Jekyll, you can use the standard Markdown syntax plus some specific **kramdown** syntax. Jekyll would render your Markdown/**kramdown** into HTML.

<https://kramdown.gettalong.org/quickref.html>

```markdown
The first paragraph.

Another paragraph

This is a paragraph  
which contains a hard line break.

First level header
==================

Second level header
-------------------

# H1 header

## H2 header

### H3 header

#### H4 header

##### H5 header

###### H6 header

```

The first paragraph.

Another paragraph

This is a paragraph  
which contains a hard line break.

First level header
==================

Second level header
-------------------

# H1 header

## H2 header

### H3 header

#### H4 header

##### H5 header

###### H6 header


## Create a table of contents:

On your `_config.yaml`, define the levels of your toc:

```yaml
kramdown:
  ...
  toc_levels: 2..6

```

Ignore specific headers:

```markdown

## This header would be ignored on the toc.
{:.no_toc}

```

### This header would be ignored on the toc.
{:.no_toc}

Add this to generate table

```markdown

* This line is needed, but won't appear. Replace '*' with '1' to create a numbered list.
{:toc}


```

* This line is needed, but won't appear. Replace '*' with '1' to create a numbered list.
{:toc}


```markdown
> A sample blockquote.
>
> >Nested blockquotes are
> >also possible.
>
> ## Headers work too
> This is the outer quote again.


term
: definition
: another definition

another term
and another term
: and a definition for the term
```
> A sample blockquote.
>
> >Nested blockquotes are
> >also possible.
>
> ## Headers work too
> This is the outer quote again.


term
: definition
: another definition

another term
and another term
: and a definition for the term


```markdown
| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: rules="groups"}

```

| Header1 | Header2 | Header3 |
|:--------|:-------:|--------:|
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|----
| cell1   | cell2   | cell3   |
| cell4   | cell5   | cell6   |
|=====
| Foot1   | Foot2   | Foot3
{: rules="groups"}


```markdown
This is a paragraph
{::comment}
This is a comment which is
completely ignored.
{:/comment}
... paragraph continues here.

Extensions can also be used
inline {::nomarkdown}**see**{:/}!
This is a paragraph … paragraph continues here.

Extensions can also be used inline **see**!
```

This is a paragraph
{::comment}
This is a comment which is
completely ignored.
{:/comment}
... paragraph continues here.

Extensions can also be used
inline {::nomarkdown}**see**{:/}!
This is a paragraph … paragraph continues here.

Extensions can also be used inline **see**!


```markdown
A [link](http://kramdown.gettalong.org "hp")
to the homepage.

A simple info alert **check it out!**
{: #myid .alert .alert-info .p-3 .mx-2 mb-3}

This is a text with a
footnote[^1].

[^1]: And here is the definition.


This is an HTML
example.

*[HTML]: Hyper Text Markup Language


This is **Chulapa**{:.chulapa} *red*{: style="color: red"}.
```

A [link](http://kramdown.gettalong.org "hp")
to the homepage.

A simple info alert **check it out!**
{: #myid .alert .alert-info .p-3 .mx-2 mb-3}

This is a text with a
footnote[^1].

[^1]: And here is the definition.


This is an HTML
example.

*[HTML]: Hyper Text Markup Language

This is **Chulapa**{:.chulapa} *red*{: style="color: red"}.

```markdown
<div markdown="1">This is the first part of a para,
which is continued here.
-  List
-  List **bold**
</div>

```

<div markdown="1">This is the first part of a para,
which is continued here.
-  List
-  List **bold**
</div>