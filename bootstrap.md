---
layout: default
title: Bootstrap showcase
---

<header class="pb-1 hero-chulapa-image" style="  background-image: linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.85)), url('https://i.imgur.com/YK1Vrl1.jpg');">
      <div class="container">
          <div class="row">
              <div class="col-xl-10 offset-xl-1 text-md-center">
                  <h1 class="pb-5">Hero with image</h1>
                  <p class="p-2">Create your theme on 5 min (seriously)</p>
              </div>
          </div>
      </div>
  </header>

## Pure Markdown
Text can be **bold**, _italic_, or ~~strikethrough~~. [Link to another page](./another-page.html).


# Header 1
## Header 2
### Header 3

> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.



```js
// Javascript code with syntax highlighting.

// Upon loading, the Google APIs JS client automatically invokes this callback.
googleApiClientReady = function() {
  gapi.auth.init(function() {
    window.setTimeout(checkAuth, 1);
  });
}

function checkAuth() {
  gapi.auth.authorize({
    client_id: OAUTH2_CLIENT_ID,
    scope: OAUTH2_SCOPES,
    immediate: true
  }, handleAuthResult);
}

```

#### Header 4
##### Header 5
###### Header 6

| head1        | head two          | three |
|:-------------|:------------------|:------|
| ok           | good swedish fish | nice  |
| out of stock | good and plenty   | nice  |
| ok           | good `oreos`      | hmm   |
| ok           | good `zoute` drop | yumm  |

### There's a horizontal rule below this.

* * *

![](https://via.placeholder.com/300.png)
![](https://via.placeholder.com/800x200.png)
![](https://via.placeholder.com/1200x200.png)
![](https://via.placeholder.com/2000x200.png)

```
Long, single-line code blocks should not wrap. They should horizontally scroll if they are too long. This line should be long enough to demonstrate this.
```

```
The final element.
```

## Pure HTML
<div class="bs-docs-section clearfix">
   <div class="row">
      <div class="col-lg-12">
         <div class="page-header">
            <h1 id="navbars">Navbars</h1>
         </div>
         <div class="bs-component">
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
               <a class="navbar-brand" href="#">Navbar</a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarColor01">
                  <ul class="navbar-nav mr-auto">
                     <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                     </li>
                  </ul>
                  <form class="form-inline my-2 my-lg-0">
                     <input class="form-control mr-sm-2" type="text" placeholder="Search">
                     <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                  </form>
               </div>
            </nav>
         </div>
         <div class="bs-component">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
               <a class="navbar-brand" href="#">Navbar</a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarColor02">
                  <ul class="navbar-nav mr-auto">
                     <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                     </li>
                  </ul>
                  <form class="form-inline my-2 my-lg-0">
                     <input class="form-control mr-sm-2" type="text" placeholder="Search">
                     <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                  </form>
               </div>
            </nav>
         </div>
         <div class="bs-component">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
               <a class="navbar-brand" href="#">Navbar</a>
               <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
               <span class="navbar-toggler-icon"></span>
               </button>
               <div class="collapse navbar-collapse" id="navbarColor03">
                  <ul class="navbar-nav mr-auto">
                     <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">Features</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">Pricing</a>
                     </li>
                     <li class="nav-item">
                        <a class="nav-link" href="#">About</a>
                     </li>
                  </ul>
                  <form class="form-inline my-2 my-lg-0">
                     <input class="form-control mr-sm-2" type="text" placeholder="Search">
                     <button class="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                  </form>
               </div>
            </nav>
         </div>
      </div>
   </div>
</div>
<div class="bs-docs-section">
   <div class="page-header">
      <div class="row">
         <div class="col-lg-12">
            <h1 id="buttons">Buttons</h1>
         </div>
      </div>
   </div>
   <div class="row">
      <div class="col-lg-7">
         <p class="bs-component">
            <button type="button" class="btn btn-primary">Primary</button>
            <button type="button" class="btn btn-secondary">Secondary</button>
            <button type="button" class="btn btn-success">Success</button>
            <button type="button" class="btn btn-info">Info</button>
            <button type="button" class="btn btn-warning">Warning</button>
            <button type="button" class="btn btn-danger">Danger</button>
            <button type="button" class="btn btn-link">Link</button>
         </p>
         <p class="bs-component">
            <button type="button" class="btn btn-primary disabled">Primary</button>
            <button type="button" class="btn btn-secondary disabled">Secondary</button>
            <button type="button" class="btn btn-success disabled">Success</button>
            <button type="button" class="btn btn-info disabled">Info</button>
            <button type="button" class="btn btn-warning disabled">Warning</button>
            <button type="button" class="btn btn-danger disabled">Danger</button>
            <button type="button" class="btn btn-link disabled">Link</button>
         </p>
         <p class="bs-component">
            <button type="button" class="btn btn-outline-primary">Primary</button>
            <button type="button" class="btn btn-outline-secondary">Secondary</button>
            <button type="button" class="btn btn-outline-success">Success</button>
            <button type="button" class="btn btn-outline-info">Info</button>
            <button type="button" class="btn btn-outline-warning">Warning</button>
            <button type="button" class="btn btn-outline-danger">Danger</button>
         </p>
         <div class="bs-component">
            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
               <button type="button" class="btn btn-primary">Primary</button>
               <div class="btn-group" role="group">
                  <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                     <a class="dropdown-item" href="#">Dropdown link</a>
                     <a class="dropdown-item" href="#">Dropdown link</a>
                  </div>
               </div>
            </div>
            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
               <button type="button" class="btn btn-success">Success</button>
               <div class="btn-group" role="group">
                  <button id="btnGroupDrop2" type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop2">
                     <a class="dropdown-item" href="#">Dropdown link</a>
                     <a class="dropdown-item" href="#">Dropdown link</a>
                  </div>
               </div>
            </div>
            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
               <button type="button" class="btn btn-info">Info</button>
               <div class="btn-group" role="group">
                  <button id="btnGroupDrop3" type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop3">
                     <a class="dropdown-item" href="#">Dropdown link</a>
                     <a class="dropdown-item" href="#">Dropdown link</a>
                  </div>
               </div>
            </div>
            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
               <button type="button" class="btn btn-danger">Danger</button>
               <div class="btn-group" role="group">
                  <button id="btnGroupDrop4" type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
                  <div class="dropdown-menu" aria-labelledby="btnGroupDrop4">
                     <a class="dropdown-item" href="#">Dropdown link</a>
                     <a class="dropdown-item" href="#">Dropdown link</a>
                  </div>
               </div>
            </div>
         </div>
         <div class="bs-component">
            <button type="button" class="btn btn-primary btn-lg">Large button</button>
            <button type="button" class="btn btn-primary">Default button</button>
            <button type="button" class="btn btn-primary btn-sm">Small button</button>
         </div>
      </div>
      <div class="col-lg-5">
         <p class="bs-component">
            <button type="button" class="btn btn-primary btn-lg btn-block">Block level button</button>
         </p>
         <div class="bs-component" style="margin-bottom: 15px;">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
               <label class="btn btn-primary active">
               <input type="checkbox" checked autocomplete="off"> Active
               </label>
               <label class="btn btn-primary">
               <input type="checkbox" autocomplete="off"> Check
               </label>
               <label class="btn btn-primary">
               <input type="checkbox" autocomplete="off"> Check
               </label>
            </div>
         </div>
         <div class="bs-component" style="margin-bottom: 15px;">
            <div class="btn-group btn-group-toggle" data-toggle="buttons">
               <label class="btn btn-primary active">
               <input type="radio" name="options" id="option1" autocomplete="off" checked> Active
               </label>
               <label class="btn btn-primary">
               <input type="radio" name="options" id="option2" autocomplete="off"> Radio
               </label>
               <label class="btn btn-primary">
               <input type="radio" name="options" id="option3" autocomplete="off"> Radio
               </label>
            </div>
         </div>
         <div class="bs-component">
            <div class="btn-group-vertical">
               <button type="button" class="btn btn-primary">Button</button>
               <button type="button" class="btn btn-primary">Button</button>
               <button type="button" class="btn btn-primary">Button</button>
               <button type="button" class="btn btn-primary">Button</button>
               <button type="button" class="btn btn-primary">Button</button>
               <button type="button" class="btn btn-primary">Button</button>
            </div>
         </div>
         <div class="bs-component" style="margin-bottom: 15px;">
            <div class="btn-group" role="group" aria-label="Basic example">
               <button type="button" class="btn btn-secondary">Left</button>
               <button type="button" class="btn btn-secondary">Middle</button>
               <button type="button" class="btn btn-secondary">Right</button>
            </div>
         </div>
         <div class="bs-component" style="margin-bottom: 15px;">
            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
               <div class="btn-group mr-2" role="group" aria-label="First group">
                  <button type="button" class="btn btn-secondary">1</button>
                  <button type="button" class="btn btn-secondary">2</button>
                  <button type="button" class="btn btn-secondary">3</button>
                  <button type="button" class="btn btn-secondary">4</button>
               </div>
               <div class="btn-group mr-2" role="group" aria-label="Second group">
                  <button type="button" class="btn btn-secondary">5</button>
                  <button type="button" class="btn btn-secondary">6</button>
                  <button type="button" class="btn btn-secondary">7</button>
               </div>
               <div class="btn-group" role="group" aria-label="Third group">
                  <button type="button" class="btn btn-secondary">8</button>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
<div class="bs-docs-section">
   <div class="row">
      <div class="col-lg-12">
         <div class="page-header">
            <h1 id="typography">Typography</h1>
         </div>
      </div>
   </div>
   <!-- Headings -->
   <div class="row">
      <div class="col-lg-4">
         <div class="bs-component">
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
            <h3>
               Heading
               <small class="text-muted">with muted text</small>
            </h3>
            <p class="lead">Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
         </div>
      </div>
      <div class="col-lg-4">
         <div class="bs-component">
            <h2>Example body text</h2>
            <p>Nullam quis risus eget <a href="#">urna mollis ornare</a> vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.</p>
            <p><small>This line of text is meant to be treated as fine print.</small></p>
            <p>The following is <strong>rendered as bold text</strong>.</p>
            <p>The following is <em>rendered as italicized text</em>.</p>
            <p>An abbreviation of the word attribute is <abbr title="attribute">attr</abbr>.</p>
         </div>
      </div>
      <div class="col-lg-4">
         <div class="bs-component">
            <h2>Emphasis classes</h2>
            <p class="text-muted">Fusce dapibus, tellus ac cursus commodo, tortor mauris nibh.</p>
            <p class="text-primary">Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
            <p class="text-secondary">Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
            <p class="text-warning">Etiam porta sem malesuada magna mollis euismod.</p>
            <p class="text-danger">Donec ullamcorper nulla non metus auctor fringilla.</p>
            <p class="text-success">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
            <p class="text-info">Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
         </div>
      </div>
   </div>
   <!-- Blockquotes -->
   <div class="row">
      <div class="col-lg-12">
         <h2 id="type-blockquotes">Blockquotes</h2>
      </div>
   </div>
   <div class="row">
      <div class="col-lg-4">
         <div class="bs-component">
            <blockquote class="blockquote">
               <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
               <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </blockquote>
         </div>
      </div>
      <div class="col-lg-4">
         <div class="bs-component">
            <blockquote class="blockquote text-center">
               <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
               <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </blockquote>
         </div>
      </div>
      <div class="col-lg-4">
         <div class="bs-component">
            <blockquote class="blockquote text-right">
               <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
               <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </blockquote>
         </div>
      </div>
   </div>
</div>

