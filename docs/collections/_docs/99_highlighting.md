---
title: Syntax highlighting demo
subtitle: Highlighters shipped with this theme.
excerpt: This page is a demo of the different styles of syntax highlighting shipped by default with this theme. Just make your selection below.
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

<h3 id ="config"></h3>
<p>
<div id="selected" class="language-yaml highlighter-rouge"></div>

<script>
  var styles = ['autumn', 'borland', 'bw', 'colorful', 'default', 'emacs',
  	'friendly', 'fruity', 'github', 'manni', 'monokai', 'murphy','native',
  	'pastie','perldoc','tango','trac','vim','vs','zenburn'
  ].sort();
  
  styles.forEach(function(word) {
  	var row = document.createElement('a');
  	row.classList.add('dropdown-item');
  	row.href = 'javascript:void(0)';
  	row.innerHTML = word;
  	row.setAttribute("onclick", "reaplyStyles('" + word + "');");
  	document.getElementById('list').appendChild(row);
  });
  document.getElementById("count").innerHTML = "An overall of <span class='font-weight-bold'>" + styles.length + "</span> highlighting styles available";
  
</script>


<p></p>



#### Python


```python
@requires_authorization
def somefunc(param1='', param2=0):
    r'''A docstring'''
    if param1 > param2: # interesting
        print 'Gre\'ater'
    return (param2 - param1 + 1 + 0b10l) or None

class SomeClass:
    pass
```
