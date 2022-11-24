---
title: Markdown cheatsheet
subtitle: The basic syntax of your page
excerpt: A demo page checking Markdown
permalink: /docs/markdown-cheatsheet
show_toc: true
h_max: 3
---

## What’s Markdown?

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents. Created by [John Gruber](https://daringfireball.net/projects/markdown/) in 2004, Markdown is now one of the world’s most popular markup languages.

<https://www.markdownguide.org/basic-syntax/>

## Markdown cheatsheet

```markdown
Text can be **bold**, _italic_, or ~~strikethrough~~.
```


Text can be **bold**, _italic_, or ~~strikethrough~~.


```markdown
[Link to another page](./another-page.html).
```

[Link to another page](./another-page.html).

```markdown
There should be whitespace between this paragraph

and this paragraph.
```

There should be whitespace between this paragraph

and this paragraph.

```markdown
# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6
```

# Header 1

## Header 2

### Header 3

#### Header 4

##### Header 5

###### Header 6


```markdown
> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.
```

> This is a blockquote.
>
> When something is important enough, you do it even if the odds are not in your favor.


~~~ markdown
```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

```html
<!--HTML code syntax highlighter-->
<!DOCTYPE html>
<html>
<body>

<p>This is a paragraph.</p>
<p>This is another paragraph.</p>

</body>
</html>
```
~~~

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true;
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

```html
<!--HTML code syntax highlighter-->
<!DOCTYPE html>
<html>
<body>

<p>This is a paragraph.</p>
<p>This is another paragraph.</p>

</body>
</html>
```

```markdown
* This is an unordered list.
* This is an unordered list.
* This is an unordered list.

An a two-level ordered list:

1.  This is an ordered list.
2.  This is an ordered list.
    * Unordered sub-list.
    * Unordered sub-list. 
12. Actual numbers don't matter, just that it's a numbet or not.
4.  And another item.

    You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces.

    # And a header
    
Unordered list can use asterisks:

* Like this
- Or minuses
   -  Minus
      1. One
      2. Two
         + Or pluses
         
And a task list:

- [x] This is a complete item
- [ ] This is an incomplete item

```

* This is an unordered list.
* This is an unordered list.
* This is an unordered list.

An a two-level ordered list:

1.  This is an ordered list.
2.  This is an ordered list.
    * Unordered sub-list.
    * Unordered sub-list. 
12. Actual numbers don't matter, just that it's a numbet or not.
4.  And another item.

    You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces.

    # And a header
    
Unordered list can use asterisks:

* Like this
- Or minuses
   -  Minus
      1. One
      2. Two
         + Or pluses

And a task list:

- [x] This is a complete item
- [ ] This is an incomplete item

```markdown

Use an emoji here: 👍🏻⭐️🏆

```

Use an emoji here: 👍🏻⭐️🏆

```markdown
To quickly turn a URL or email address into a link, enclose it in angle brackets.

<https://www.markdownguide.org>
<fake@example.com>

```

To quickly turn a URL or email address into a link, enclose it in angle brackets.

<https://www.markdownguide.org>
<fake@example.com>

```markdown
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.
```

Here's a simple footnote,[^1] and here's a longer one.[^bignote]

[^1]: This is the first footnote.

[^bignote]: Here's one with multiple paragraphs and code.

    Indent paragraphs to include them in the footnote.

    `{ my code }`

    Add as many paragraphs as you like.

```markdown

A table

| **id** | **name** | **age** | **gender** |
|:-------|:--------:|--------:|:----------:|
| Left   | Center   | Right   | M          |
| 2      | Oliver   | 25      | M          |
| 3      | Shayna   | 18      | F          |
| 4      | Fechin   | 18      | M          |

```

A table

| **id** | **name** | **age** | **gender** |
|:-------|:--------:|--------:|:----------:|
| Left   | Center   | Right   | M          |
| 2      | Oliver   | 25      | M          |
| 3      | Shayna   | 18      | F          |
| 4      | Fechin   | 18      | M          |


```markdown
There's a horizontal rule below this.

* * *

Another

---
```

There's a horizontal rule below this.

* * *

Another

---

```markdown
**Small image**

![Octocat](https://github.githubassets.com/images/icons/emoji/octocat.png)

**Large image**

![Branching](https://guides.github.com/activities/hello-world/branching.png)
```


**Small image**

![Octocat](https://github.githubassets.com/images/icons/emoji/octocat.png)

**Large image**

![Branching](https://picsum.photos/id/36/1200/600.jpg)


### Definition lists can be used with HTML syntax.

```html
<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>
```


<dl>
<dt>Name</dt>
<dd>Godzilla</dd>
<dt>Born</dt>
<dd>1952</dd>
<dt>Birthplace</dt>
<dd>Japan</dd>
<dt>Color</dt>
<dd>Green</dd>
</dl>



```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

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



