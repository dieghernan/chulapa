---
title: Markdown cheatsheet
subtitle: The basic syntax of your page
excerpt: A demo page checking Markdown
categories: [tutorial]
tags: [starter,syntax,markdown]
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

![Branching](https://guides.github.com/activities/hello-world/branching.png)


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


