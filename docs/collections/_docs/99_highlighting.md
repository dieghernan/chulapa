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



Demo of the different pieces of code for testing syntax highlighting.

<div markdown="1">

## Javascript

```javascript
// Cross-browser xml parsing
var parseXML = function( data ) {
  var xml, tmp;
  if ( !data || typeof data !== "string" ) {
    return null;
  }
  try {
    if ( window.DOMParser ) { // Standard
      tmp = new DOMParser();
      xml = tmp.parseFromString( data , "text/xml" );
    } else { // IE
      xml = new ActiveXObject( "Microsoft.XMLDOM" );
      xml.async = false;
      xml.loadXML( data );
    }
  } catch( e ) {
    xml = undefined;
  }
  if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
    jQuery.error( "Invalid XML: " + data );
  }
  return xml;
};

// Bind a function to a context, optionally partially applying any arguments.
var proxy = function( fn, context ) {
  var tmp, args, proxy;

  if ( typeof context === "string" ) {
    tmp = fn[ context ];
    context = fn;
    fn = tmp;
  }

  // Quick check to determine if target is callable, in the spec
  // this throws a TypeError, but we will just return undefined.
  if ( !jQuery.isFunction( fn ) ) {
    return undefined;
  }

  // Simulated bind
  args = core_slice.call( arguments, 2 );
  proxy = function() {
    return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
  };

  // Set the guid of unique handler to the same of original handler, so it can be removed
  proxy.guid = fn.guid = fn.guid || jQuery.guid++;

  return proxy;
};

Sound.play = function() {}
Sound.prototype = { something; }
Sound.prototype.play = function() {}
Sound.prototype.play = myfunc
var parser = document.createElement('a');
parser.href = "http://example.com:3000/pathname/?search=test#hash";
parser.hostname; // => "example.com"


```
  
## Python

```python

#!/usr/bin/python
# -*- coding: utf-8 -*-

import re
import sublime
import sublime_plugin
from datetime import datetime


class SublimeTasksBase(sublime_plugin.TextCommand):
    def run(self, edit):
        self.open_tasks_bullet = self.view.settings().get('open_tasks_bullet')
        self.done_tasks_bullet = self.view.settings().get('done_tasks_bullet')
        self.date_format = self.view.settings().get('date_format')
        if self.view.settings().get('done_tag'):
            self.done_tag = "@done"
        else:
            self.done_tag = ""
        self.runCommand(edit)


class NewCommand(SublimeTasksBase):
    def runCommand(self, edit):
        for region in self.view.sel():
            line = self.view.line(region)
            line_contents = self.view.substr(line).rstrip()
            has_bullet = re.match('^(\s*)[' + re.escape(self.open_tasks_bullet) + re.escape(self.done_tasks_bullet) + ']', self.view.substr(line))
            current_scope = self.view.scope_name(self.view.sel()[0].b)
            if has_bullet:
                grps = has_bullet.groups()
                line_contents = self.view.substr(line) + '\n' + grps[0] + self.open_tasks_bullet + ' '
                self.view.replace(edit, line, line_contents)
            elif 'header' in current_scope:
                header = re.match('^(\s*)\S+', self.view.substr(line))
                if header:
                    grps = header.groups()
                    line_contents = self.view.substr(line) + '\n' + grps[0] + ' ' + self.open_tasks_bullet + ' '
                else:
                    line_contents =  + self.open_tasks_bullet + ' '
                self.view.replace(edit, line, line_contents)
                end = self.view.sel()[0].b
                pt = sublime.Region(end, end)
                self.view.sel().clear()
                self.view.sel().add(pt)
            else:
                has_space = re.match('^(\s+)(.*)', self.view.substr(line))
                if has_space:
                    grps = has_space.groups()
                    spaces = grps[0]
                    line_contents = spaces + self.open_tasks_bullet + ' ' + grps[1]
                    self.view.replace(edit, line, line_contents)
                else:
                    line_contents = ' ' + self.open_tasks_bullet + ' ' + self.view.substr(line)
                    self.view.replace(edit, line, line_contents)
                    end = self.view.sel()[0].b
                    pt = sublime.Region(end, end)
                    self.view.sel().clear()
                    self.view.sel().add(pt)



```

## CSS

```css


body {
  font-family: arial;
}

h1, p, table {
  background-color:#CCC;
  border: 1px solid;
  color:#39F;
  text-align: center;
  width: 100%;
}

.addon-store .pagehead h1 { display: inline-block }
.addon-store .addon-summary:after { clear: both }

#addon-store .pagehead .electrocat-small {
    bottom: -7px;
    position: absolute;
    right: 0;
}

.addon-store .addons-nav a.selected {
    border-bottom-color: #d26911;
    color: #333;
    font-weight: bold;
    padding: 0 0 14px;
}

.addon-store .addon-icon {
    background: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 1px 2px rgba(0,0,0,0.15);
    float: left;
    height: 80px;
    margin-right: 14px;
    width: 80px;
}

.addon-store .developer-callout {
    background-color: #f1f1f1;
    background-image: -moz-linear-gradient(#fafafa, #f1f1f1);
    background-image: -webkit-linear-gradient(#fafafa, #f1f1f1);
    background-image: linear-gradient(#fafafa, #f1f1f1);
    background-repeat: repeat-x;
    border: 1px solid #ddd;
    border-bottom: 1px solid #ccc;
    border-radius: 3px;
    box-shadow: inset 0 1px 0 #fff, 0 1px 5px #f1f1f1;
    margin-top: 40px;
    text-shadow: 0 1px 0 #fff;
}

.addon-field-editor .addon-field-list, .addon-field-editor .addon-new-field {
    -moz-box-sizing: border-box;
    border-radius: 3px;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    width: 595px;
}

p { color: red !important; }

@media screen and (min-width: 100px) {}


@main-color: red;

.foo {
	background: @main-color;
}



```

## SCSS

```scss


@import "foo.scss";

@media (min-width: 600px) {}
.seriousError {
    @extend .error;
}

@for $i from 1 through 3 {}


@font-face {
	font-family: "opensans";
	src: font-url("opensans.ttf");
}

$width: 5em;

#main {
    width: $width;
}

p.#{$name} {
    #{$attr}-color: blue;
}






```




## Java

```java

import java.util.Scanner;

public class Life {
    public static void show(boolean[][] grid){
        String s = "";
        for(boolean[] row : grid){
            for(boolean val : row)
                if(val)
                    s += "*";
                else
                    s += ".";
            s += "\n";
        }
        System.out.println(s);
    }

    public static boolean[][] gen(){
        boolean[][] grid = new boolean[10][10];
        for(int r = 0; r < 10; r++)
            for(int c = 0; c < 10; c++)
                if( Math.random() > 0.7 )
                    grid[r][c] = true;
        return grid;
    }

    public static void main(String[] args){
        boolean[][] world = gen();
        show(world);
        System.out.println();
        world = nextGen(world);
        show(world);
        Scanner s = new Scanner(System.in);
        while(s.nextLine().length() == 0){
            System.out.println();
            world = nextGen(world);
            show(world);

        }
    }

    public static boolean[][] nextGen(boolean[][] world){
        boolean[][] newWorld
            = new boolean[world.length][world[0].length];
        int num;
        for(int r = 0; r < world.length; r++){
            for(int c = 0; c < world[0].length; c++){
                num = numNeighbors(world, r, c);
                if( occupiedNext(num, world[r][c]) )
                    newWorld[r][c] = true;
            }
        }
        return newWorld;
    }

    public static boolean occupiedNext(int numNeighbors, boolean occupied){
        if( occupied && (numNeighbors == 2 || numNeighbors == 3))
            return true;
        else if (!occupied && numNeighbors == 3)
            return true;
        else
            return false;
    }

    private static int numNeighbors(boolean[][] world, int row, int col) {
        int num = world[row][col] ? -1 : 0;
        for(int r = row - 1; r <= row + 1; r++)
            for(int c = col - 1; c <= col + 1; c++)
                if( inbounds(world, r, c) && world[r][c] )
                    num++;

        return num;
    }

    private static boolean inbounds(boolean[][] world, int r, int c) {
        return r >= 0 && r < world.length && c >= 0 &&
        c < world[0].length;
    }



}


```

## C#

```csharp
using System.Collections.Generic;
using System.Linq;
using Abp.Domain.Entities;
using Abp.Domain.Repositories;

namespace Abp.MemoryDb.Repositories
{
    //TODO: Implement thread-safety..?
    public class MemoryRepository<TEntity, TPrimaryKey> : AbpRepositoryBase<TEntity, TPrimaryKey>
        where TEntity : class, IEntity<TPrimaryKey>
    {
        private readonly IMemoryDatabaseProvider _databaseProvider;
        protected MemoryDatabase Database { get { return _databaseProvider.Database; } }

        protected List<TEntity> Table { get { return Database.Set<TEntity>(); } }

        private readonly MemoryPrimaryKeyGenerator<TPrimaryKey> _primaryKeyGenerator;

        public MemoryRepository(IMemoryDatabaseProvider databaseProvider)
        {
            _databaseProvider = databaseProvider;
            _primaryKeyGenerator = new MemoryPrimaryKeyGenerator<TPrimaryKey>();
        }

        public override IQueryable<TEntity> GetAll()
        {
            return Table.AsQueryable();
        }

        public override TEntity Insert(TEntity entity)
        {
            if (entity.IsTransient())
            {
                entity.Id = _primaryKeyGenerator.GetNext();
            }

            Table.Add(entity);
            return entity;
        }

        public override TEntity Update(TEntity entity)
        {
            var index = Table.FindIndex(e => EqualityComparer<TPrimaryKey>.Default.Equals(e.Id, entity.Id));
            if (index >= 0)
            {
                Table[index] = entity;
            }

            return entity;
        }

        public override void Delete(TEntity entity)
        {
            Delete(entity.Id);
        }

        public override void Delete(TPrimaryKey id)
        {
            var index = Table.FindIndex(e => EqualityComparer<TPrimaryKey>.Default.Equals(e.Id, id));
            if (index >= 0)
            {
                Table.RemoveAt(index);
            }
        }
    }
}
```

## HTML

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Meta, title, CSS, favicons, etc. -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Bootstrap</title>

    <!-- Bootstrap core CSS -->
    <link href="./dist/css/bootstrap.css" rel="stylesheet">

    <!-- Documentation extras -->
    <link href="./assets/css/docs.css" rel="stylesheet">
    <link href="./assets/css/pygments-manni.css" rel="stylesheet">

    <link rel="shortcut icon" href="./assets/ico/favicon.png">
  </head>

  <body class="bs-docs-home">

  <!-- Docs master nav -->
  <div class="navbar navbar-inverse navbar-fixed-top bs-docs-nav">
    <div class="container">
      <a href="./" class="navbar-brand">Bootstrap 3 RC1</a>
      <button class="navbar-toggle" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <div class="nav-collapse collapse bs-navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <a href="./getting-started">Getting started</a>
            </li>
            <li>
              <a href="./css">CSS</a>
            </li>
            <li>
              <a href="./components">Components</a>
            </li>
            <li>
              <a href="./javascript">JavaScript</a>
            </li>
            <li>
              <a href="./customize">Customize</a>
            </li>
          </ul>
      </div>
    </div>
  </div>

  <!-- Page content of course! -->
  <div class="bs-masthead">
    <div class="container">
      <h1>Bootstrap 3</h1>
      <p class="lead">Sleek, intuitive, and powerful mobile-first front-end framework for faster and easier web development.</p>
      <p>
        <a href="http://getbootstrap.com/bs-v3.0.0-rc1-dist.zip" class="btn btn-bs btn-large" onclick="_gaq.push(['_trackEvent', 'Jumbotron actions', 'Download', 'Download 3.0.0 RC1']);">Download Bootstrap</a>
      </p>
    </div>
  </div>

  <script src="./assets/js/jquery.js"></script>
  <script src="./dist/js/bootstrap.js"></script>
  <script src="./assets/js/holder.js"></script>
  <script src="./assets/js/application.js"></script>

</body>
</html>

```

## R

```r
geom_dotplot <- function (mapping = NULL, data = NULL, stat = "bindot", position = "identity",
na.rm = FALSE, binwidth = NULL, binaxis = "x", method="dotdensity", binpositions = "bygroup", stackdir = "up",
stackratio = 1, dotsize = 1, stackgroups = FALSE, ...) {
  GeomDotplot$new(mapping = mapping, data = data, stat = stat, position = position,
  na.rm = na.rm, binwidth = binwidth, binaxis = binaxis, method = method, binpositions = binpositions,
  stackdir = stackdir, stackratio = stackratio, dotsize = dotsize, stackgroups = stackgroups, ...)
}

GeomDotplot <- proto(Geom, {
  objname <- "dotplot"

  new <- function(., mapping = NULL, data = NULL, stat = NULL, position = NULL, ...){
    # This code is adapted from Layer$new. It's needed to pull out the stat_params
    # and geom_params, then manually add binaxis to both sets of params. Otherwise
    # Layer$new will give binaxis only to the geom.

    stat <- Stat$find(stat)
    match.params <- function(possible, params) {
      if ("..." %in% names(possible)) {
        params
      } else {
        params[match(names(possible), names(params), nomatch = 0)]
      }
    }

    params <- list(...)
    # American names must be changed here so that they'll go to geom_params;
    # otherwise they'll end up in stat_params
    params <- rename_aes(params)

    geom_params <- match.params(.$parameters(), params)
    stat_params <- match.params(stat$parameters(), params)
    stat_params <- stat_params[setdiff(names(stat_params), names(geom_params))]
    # Add back binaxis
    stat_params <- c(stat_params, binaxis=params$binaxis)

    # If identical(position, "stack") or position is position_stack() (the test
    #  is kind of complex), tell them to use stackgroups=TRUE instead. Need to
    #  use identical() instead of ==, because == will fail if object is
    #  position_stack() or position_dodge()
    if (!is.null(position) && (identical(position, "stack") || (is.proto(position) && position$objname == "stack")))
      message("position=\"stack\" doesn't work properly with geom_dotplot. Use stackgroups=TRUE instead.")

    if (params$stackgroups && params$method == "dotdensity" && params$binpositions == "bygroup")
      message('geom_dotplot called with stackgroups=TRUE and method="dotdensity". You probably want to set binpositions="all"')

    do.call("layer", list(mapping = mapping, data = data, stat = stat, geom = ., position = position,
                          geom_params = geom_params, stat_params = stat_params, ...))
  }


  reparameterise <- function(., df, params) {
    df$width <- df$width %||%
      params$width %||% (resolution(df$x, FALSE) * 0.9)

    # Set up the stacking function and range
    if(is.null(params$stackdir) || params$stackdir == "up") {
      stackdots <- function(a)  a - .5
      stackaxismin <- 0
      stackaxismax <- 1
    } else if (params$stackdir == "down") {
      stackdots <- function(a) -a + .5
      stackaxismin <- -1
      stackaxismax <- 0
    } else if (params$stackdir == "center") {
      stackdots <- function(a)  a - 1 - max(a - 1) / 2
      stackaxismin <- -.5
      stackaxismax <- .5
    } else if (params$stackdir == "centerwhole") {
      stackdots <- function(a)  a - 1 - floor(max(a - 1) / 2)
      stackaxismin <- -.5
      stackaxismax <- .5
    }


    # Fill the bins: at a given x (or y), if count=3, make 3 entries at that x
    df <- df[rep(1:nrow(df), df$count), ]

    # Next part will set the position of each dot within each stack
    # If stackgroups=TRUE, split only on x (or y) and panel; if not stacking, also split by group
    plyvars <- params$binaxis %||% "x"
    plyvars <- c(plyvars, "PANEL")
    if (is.null(params$stackgroups) || !params$stackgroups)
      plyvars <- c(plyvars, "group")

    # Within each x, or x+group, set countidx=1,2,3, and set stackpos according to stack function
    df <- ddply(df, plyvars, function(xx) {
            xx$countidx <- 1:nrow(xx)
            xx$stackpos <- stackdots(xx$countidx)
            xx
          })


    # Set the bounding boxes for the dots
    if (is.null(params$binaxis) || params$binaxis == "x") {
      # ymin, ymax, xmin, and xmax define the bounding rectangle for each stack
      # Can't do bounding box per dot, because y position isn't real.
      # After position code is rewritten, each dot should have its own bounding box.
      df$xmin <- df$x - df$binwidth / 2
      df$xmax <- df$x + df$binwidth / 2
      df$ymin <- stackaxismin
      df$ymax <- stackaxismax
      df$y    <- 0

    } else if (params$binaxis == "y") {
      # ymin, ymax, xmin, and xmax define the bounding rectangle for each stack
      # Can't do bounding box per dot, because x position isn't real.
      # xmin and xmax aren't really the x bounds, because of the odd way the grob
      # works. They're just set to the standard x +- width/2 so that dot clusters
      # can be dodged like other geoms.
      # After position code is rewritten, each dot should have its own bounding box.
      df <- ddply(df, .(group), transform,
            ymin = min(y) - binwidth[1] / 2,
            ymax = max(y) + binwidth[1] / 2)

      df$xmin <- df$x + df$width * stackaxismin
      df$xmax <- df$x + df$width * stackaxismax
          }
    df
  }
```

## Ruby

```ruby
class HTMLProcessor

  # called before parsing anything
  def start_parsing(scope_name)
    @line = ""
    @offset = 0
    @text= []
  end

  # called after parsing everything
  def end_parsing(scope_name)
    @text.each_with_index do |line, index|
      @text[index] = "<span class='l l-#{index+1} #{scope_name.gsub('.',' ')}'>#{line}</span>"
    end
    puts @text.join("")
  end

  # called before processing a line
  def new_line(line_content)
    @offset = 0
    @line = line_content.clone
    @text << @line
  end

  def open_tag(tag_name, position_in_current_line)
    tag = "<s class='#{tag_name.gsub("."," ")}'>"
    @line.insert(position_in_current_line + @offset, tag)
    @offset += tag.size
  end

  def close_tag(tag_name, position_in_current_line)
    tag = "</s>"
    @line.insert(position_in_current_line + @offset, tag)
    @offset += tag.size
  end

end

syntax = Textpow.syntax('ruby') # or 'source.ruby' or 'lib/textpow/syntax/source.ruby.syntax'
processor = HTMLProcessor.new
syntax.parse(text, processor)

require File.expand_path('../boot', __FILE__)

require 'rails/all'

if defined?(Bundler)
  # If you precompile assets before deploying to production, use this line
  Bundler.require(*Rails.groups(:assets => %w(development test)))
  # If you want your assets lazily compiled in production, use this line
  # Bundler.require(:default, :assets, Rails.env)
end

require 'rubygems'

# Set up gems listed in the Gemfile.
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])


```
## PHP

```php



<?php

// base class with member properties and methods
class Vegetable {

   var $edible;
   var $color;

   function Vegetable($edible, $color="green")
   {
       $this->edible = $edible;
       $this->color = $color;
   }

   function is_edible()
   {
       return $this->edible;
   }

   function what_color()
   {
       return $this->color;
   }

} // end of class Vegetable

// extends the base class
class Spinach extends Vegetable {

   var $cooked = false;

   function Spinach()
   {
       $this->Vegetable(true, "green");
   }

   function cook_it()
   {
       $this->cooked = true;
   }

   function is_cooked()
   {
       return $this->cooked;
   }

} // end of class Spinach

?>

```


## Markdown


```markdown

Title 1
==

Title 2
-------

# Title 1
## Title 2
### Title 3
#### Title 4
##### Title 5
###### Title 6

Normal text

*Italic*
**Bold on
multiple lines**
*Italic on
multiple lines too*
__It also works with underscores__
_It also works with underscores_

__An empty line

is not allowed__

[Prism](http://www.prismjs.com)
[Prism](http://www.prismjs.com “Prism”)

[prism link]: http://www.prismjs.com (Prism)
[Prism] [prism link]

* This is
* an unordered list

1. This is an
2. ordered list

* *List item in italic*
* **List item in bold**
* [List item as a link](http://example.com “This is an example”)

> This is a quotation
>> With another quotation inside
> _italic here_, __bold there__
> And a [link](http://example.com)


Inline code between backticks `Paragraph`

    some_code(); /* Indented
    with four spaces */

	some_code(); /* Indented
	with a tab */


```


## YAML


```yaml


%YAML 1.2
--- !<tag:clarkevans.com,2002:invoice>
invoice: 34843
date   : 2001-01-23
bill-to: &id001
  given  : Chris
  family : Dumars
  address:
    lines: |
      458 Walkman Dr.
      Suite #292
    city    : Royal Oak
    state   : MI
    postal  : 48046
ship-to:
  <<: *id001
  product:
    - sku         : BL394D
      quantity    : 4
      description : Basketball
      price       : 450.00
    - sku         : BL4438H
      quantity    : 1
      description : Super Hoop
      price       : 2392.00
tax  : 251.42
total: 4443.52
comments:
    Late afternoon is best.
    Backup contact is Nancy


```


## JSON

```json

{
 "query": {
  "count": 10,
  "created": "2011-06-21T08:10:46Z",
  "lang": "en-US",
  "results": {
   "photo": [
    {
     "farm": "6",
     "id": "5855620975",
     "isfamily": "0",
     "isfriend": "0",
     "ispublic": "1",
     "owner": "32021554@N04",
     "secret": "f1f5e8515d",
     "server": "5110",
     "title": "7087 bandit cat"
    },
    {
     "farm": "4",
     "id": "5856170534",
     "isfamily": "0",
     "isfriend": "0",
     "ispublic": "1",
     "owner": "32021554@N04",
     "secret": "ff1efb2a6f",
     "server": "3217",
     "title": "6975 rusty cat"
    },
    {
     "farm": "6",
     "id": "5856172972",
     "isfamily": "0",
     "isfriend": "0",
     "ispublic": "1",
     "owner": "51249875@N03",
     "secret": "6c6887347c",
     "server": "5192",
     "title": "watermarked-cats"
    },
    {
     "farm": "6",
     "id": "5856168328",
     "isfamily": "0",
     "isfriend": "0",
     "ispublic": "1",
     "owner": "32021554@N04",
     "secret": "0c1cfdf64c",
     "server": "5078",
     "title": "7020 mandy cat"
    },
    {
     "farm": "3",
     "id": "5856171774",
     "isfamily": "0",
     "isfriend": "0",
     "ispublic": "1",
     "owner": "32021554@N04",
     "secret": "7f5a3180ab",
     "server": "2696",
     "title": "7448 bobby cat"
    }
   ]
  }
 }
}



```

</div>
