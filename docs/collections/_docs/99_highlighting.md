---
title: Syntax highlighting demo
subtitle: Highlighters shipped with this theme.
excerpt: | 
  This page is a demo of the different styles of
  syntax highlighting shipped by default with this
  theme. Just make your selection below.
permalink: /docs/syntax-highlighting
show_toc: false
---

This page is a demo of the different styles of syntax highlighting shipped by default with this theme. Just make your selection below.

<p id="count" class="lead mb-2"></p>

<div class="dropdown my-4">
  <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Theme</button>
  <div id="list" class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="max-height: 30vh;overflow-y: auto;">
  </div>
</div>

<p><span id="config">None</span></p>
<div class="language-yaml highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="na">chulapa-skin</span><span class="pi">:</span> <br><span class="na">  highlight</span><span class="pi">:</span>  <span class="s" id="selected"></span></code></pre></div></div>

<script>
  var styles = ['abap','algol','algol_nu','arduino','autumn','base16','borland',
  'bw','coffee','cobalt2','colorful','cran','default','dracula','emacs','friendly',
  'friendly_grayscale','fruity','github.dark','github','gruvbox.dark',
  'gruvbox.light','gruvbox','igor','igorpro','inkpot','lightbulb','lilypond',
  'lovelace','magritte','manni','material','molokai','monokai',
  'monokai.sublime','murphy','native','nord.darker','nord','oksolar.dark',
  'oksolar.light','one.dark','paraiso.dark','paraiso.light','pastie','perldoc',
  'rainbow_dash','rrt','sas','selenized.black','selenized.dark',
  'selenized.light','selenized.white','skeletor','solarized.dark',
  'solarized.light','staroffice','stata.dark','stata.light','tango',
  'thankful_eyes','trac','tulip','vim','vs','xcode','zenburn'].sort();
  
  styles.forEach(function(word) {
  	var row = document.createElement('a');
  	row.classList.add('dropdown-item');
  	row.href = 'javascript:void(0)';
  	row.innerHTML = word;
  	row.setAttribute("onclick", "reaplyStyles('" + word + "');");
  	document.getElementById('list').appendChild(row);
  });
  document.getElementById("count").innerHTML = "An overall of <span class='font-weight-bold'>" + styles.length + "</span> highlighting styles available";
  
  var csshigh = document.getElementById("csshigh");
  	function reaplyStyles(themename){
  		csshigh.href = 'https://dieghernan.github.io/chulapa/assets/css/highlighter/'+themename+'.css';
  		
  		title = document.getElementById("config");
  		
  		title.innerHTML = 'On your <code>_config.yml</code>';		
  		
  		sel = document.getElementById("selected");  	
  		sel.innerHTML = themename;
  		btn = document.getElementById("dropdownMenuButton");  	
  		btn.innerHTML = themename;
  		
      return true;
  }
  
  
  
</script>



<div markdown="1">
#### Python

```python
from typing import Iterator

# This is an example
class Math:
    @staticmethod
    def fib(n: int) -> Iterator[int]:
        """Fibonacci series up to n."""
        a, b = 0, 1
        while a < n:
            yield a
            a, b = b, a + b

result = sum(Math.fib(42))
print(f"The answer is {result}")


@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass

>>> message = '''interpreter
... prompt'''

```

#### Javascript

```javascript
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
```

#### Java

```java

/**
 * @author John Smith <john.smith@example.com>
*/
package l2f.gameserver.model;

public abstract strictfp class L2Char extends L2Object {
  public static final Short ERROR = 0x0001;

  public void moveTo(int x, int y, int z) {
    _ai = null;
    log("Should not be called");
    if (1 > 5) { // wtf!?
      return;
    }
  }
}

```

#### C#

```csharp
using System.IO.Compression;

#pragma warning disable 414, 3021

namespace MyApplication
{
    [Obsolete("...")]
    class Program : IInterface
    {
        public static List<int> JustDoIt(int count)
        {
            Console.WriteLine($"Hello {Name}!");
            return new List<int>(new int[] { 1, 2, 3 })
        }
    }
}
```

#### Go

```go
package main

import "fmt"

func main() {
    ch := make(chan float64)
    ch <- 1.0e10    // magic number
    x, ok := <- ch
    defer fmt.Println(`exitting now\`)
    go println(len("hello world!"))
    return
}

```


#### HTML

```html
<html>
  <head><title>Title!</title></head>
  <body>
    <p id="foo">Hello, World!</p>
    <script type="text/javascript">var a = 1;</script>
    <style type="text/css">#foo { font-weight: bold; }</style>
  </body>
</html>

```

#### R

```r
library("sf")
dbenford <- function(x){
    log10(1 + 1/x)
}

pbenford <- function(q){
    cumprobs <- cumsum(dbenford(1:9))
    return(cumprobs[q])
}

plot(st_geometry(example), col = "red")

```

</div>
