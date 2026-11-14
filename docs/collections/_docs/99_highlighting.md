---
title: Syntax highlighting reference
subtitle: Available styles and rendered code specimens
excerpt: |
  Browse available syntax highlighting styles and compare rendered code examples.
permalink: /docs/syntax-highlighting
show_toc: false
tags: [docs, appearance, code-highlighting]
show_related: true
show_tags: true
cloudtag_url: /docs/tags
---

Lookup for highlighting style identifiers and code specimens. The selector
previews a style on this page and displays its configuration mapping. For the
editing and publishing procedure, use [Change code highlighting](./25-code-highlighting).

Changing this preview does not save the style on your own website.
{: .alert .alert-info .p-3 .mx-2 .mb-3}

<p id="count" class="lead mb-2"></p>

<div class="dropdown my-4">
  <button class="btn btn-sm btn-primary dropdown-toggle" type="button"
id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
aria-expanded="false">Select style</button>
  <div id="list" class="dropdown-menu" aria-labelledby="dropdownMenuButton"
style="max-height: 30vh;overflow-y: auto;">
  </div>
</div>

<p><span id="config">None</span></p>
<div class="language-yaml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="na">chulapa-skin</span><span class="pi">:</span>
<span class="na">  highlight</span><span class="pi">:</span>  <span class="s" id="selected"></span></code></pre></div></div>

<script>
  var styles = ['abap','algol','algol_nu','arduino','autumn','base16','borland',
  'bw','coffee','cobalt2','colorful','cran','default','dracula','emacs','friendly',
  'friendly_grayscale','fruity','github.dark','github','gruvbox.dark',
  'gruvbox.light','gruvbox','igor','igorpro','inkpot','lightbulb','lilypond',
  'lovelace','magritte','manni','material','molokai','monokai',
  'monokai.sublime','murphy','native','night-owl', 'nord.darker','nord','oksolar.dark',
  'oksolar.light','one.dark','panda', 'paraiso.dark','paraiso.light','pastie','perldoc',
  'rainbow_dash','rrt','sas','selenized.black','selenized.dark',
  'selenized.light','selenized.white','skeletor','solarized.dark',
  'solarized.light','stackoverflow.dark','stackoverflow.light','staroffice',
  'stata.dark','stata.light','tango', 'thankful_eyes','trac','tulip','vim',
  'vs','xcode','zenburn'].sort();
  
  styles.forEach(function(word) {
  	var row = document.createElement('a');
  	row.classList.add('dropdown-item');
  	row.href = 'javascript:void(0)';
    row.textContent = word;
  	row.setAttribute("onclick", "reaplyStyles('" + word + "');");
  	document.getElementById('list').appendChild(row);
  });
  document.getElementById("count").innerHTML = "A total of <span class='font-weight-bold'>" + styles.length + "</span> highlighting styles available";
  
  var csshigh = document.getElementById("csshigh");
  	function reaplyStyles(themename){
  		csshigh.href = 'https://dieghernan.github.io/chulapa/assets/css/highlighter/'+themename+'.css';
  		
  		title = document.getElementById("config");
  		
    title.innerHTML = 'Configuration mapping';
  		
  		sel = document.getElementById("selected");  	
      sel.textContent = themename;
  		btn = document.getElementById("dropdownMenuButton");  	
      btn.textContent = themename;
  		
      return true;
  }

</script>

## Code specimens

The examples below show the selected stylesheet across code languages.

<div markdown="1">

## JavaScript

```javascript
// Label the guides.
const guides = ["Install", "Publish"];
guides.forEach((title, index) => {
  console.log(`${index + 1}. ${title}`);
});
```

## Python

```python
from pathlib import Path


def markdown_pages(directory: Path) -> list[str]:
    # Exclude files whose names start with an underscore.
    return sorted(
        page.name for page in directory.glob("*.md")
        if not page.name.startswith("_")
    )


print(markdown_pages(Path("docs")))
```

## CSS

```css
/* Make keyboard focus visible. */
.card a:focus-visible {
  outline: 2px solid var(--accent, #0645ad);
}

@media (min-width: 48rem) {
  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
```

## SCSS

```scss
$accent: #0645ad;

.card {
  padding: 1rem;

  &__title {
    color: $accent;
  }

  &:focus-within {
    box-shadow: 0 0 0 2px rgba($accent, 0.4);
  }
}
```

## Java

```java
import java.util.List;

public class PageIndex {
    public static void main(String[] args) {
        // Print the names of the guides.
        for (String title : List.of("Install", "Publish")) {
            System.out.printf("Guide: %s%n", title);
        }
    }
}
```

## C#

```csharp
using System;
using System.Linq;

var titles = new[] { "Install", "Publish", "Customize" };
// Select titles that start with a vowel.
var matches = titles.Where(title => "AEIOU".Contains(title[0]));

foreach (var title in matches)
{
    Console.WriteLine($"Guide: {title}");
}
```

## HTML

```html
<!-- Link to the next chapter. -->
<nav aria-label="Series navigation">
  <ol class="chapters">
    <li><a href="/install/" aria-current="page">Install</a></li>
    <li><a href="/publish/">Publish</a></li>
  </ol>
</nav>
```

## R

```r
# Count published pages by section.
pages <- data.frame(
  section = c("Install", "Publish", "Install"),
  published = c(TRUE, FALSE, TRUE)
)

published <- subset(pages, published)
counts <- table(published$section)
print(counts)
```

## Ruby

```ruby
Page = Struct.new(:title, :published, keyword_init: true)

# Keep titles for published pages.
pages = [
  Page.new(title: 'Install', published: true),
  Page.new(title: 'Publish', published: false)
]

pages.select(&:published).each do |page|
  puts "Guide: #{page.title}"
end
```

## PHP

```php
<?php
// Choose which guide titles to print.
$guides = ['Install' => true, 'Publish' => false];

foreach ($guides as $title => $published) {
    if ($published) {
        echo "Guide: $title", PHP_EOL;
    }
}
```

## Markdown

```markdown
# Install the theme

Use **Settings** to find the publishing controls and edit `_config.yml`
to change the site title.

1. Check the publishing branch.
2. Open the [published site](https://example.org/).

> Preview the site before sharing its URL.
```

## YAML

```yaml
# Publish a collection of guides.
collections:
  guides:
    output: true
    permalink: /guides/:name/

defaults:
  - scope:
      path: ""
      type: guides
    values:
      layout: default
      show_toc: true
```

## JSON

```json
{
  "title": "Install",
  "published": true,
  "series": {
    "label": "First-site guide",
    "order": 10
  },
  "tags": ["docs", "setup"],
  "updated": null
}
```

</div>
