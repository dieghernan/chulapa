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
            <button type="button" class="btn btn-chulapa">Chulapa</button>
            <button type="button" class="btn btn-dark">Dark</button>
            <button type="button" class="btn btn-light">Light</button></p>
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
<div class="bs-docs-section">
   <div class="row">
      <div class="col-lg-12">
         <div class="page-header">
            <h1 id="forms">Forms</h1>
         </div>
      </div>
   </div>
   <div class="row">
      <div class="col-lg-6">
         <div class="bs-component">
            <form>
               <fieldset>
                  <legend>Legend</legend>
                  <div class="form-group row">
                     <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
                     <div class="col-sm-10">
                        <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com">
                     </div>
                  </div>
                  <div class="form-group">
                     <label for="exampleInputEmail1">Email address</label>
                     <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                     <label for="exampleInputPassword1">Password</label>
                     <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                  </div>
                  <div class="form-group">
                     <label for="exampleSelect1">Example select</label>
                     <select class="form-control" id="exampleSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                     </select>
                  </div>
                  <div class="form-group">
                     <label for="exampleSelect2">Example multiple select</label>
                     <select multiple class="form-control" id="exampleSelect2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                     </select>
                  </div>
                  <div class="form-group">
                     <label for="exampleTextarea">Example textarea</label>
                     <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
                  </div>
                  <div class="form-group">
                     <label for="exampleInputFile">File input</label>
                     <input type="file" class="form-control-file" id="exampleInputFile" aria-describedby="fileHelp">
                     <small id="fileHelp" class="form-text text-muted">This is some placeholder block-level help text for the above input. It's a bit lighter and easily wraps to a new line.</small>
                  </div>
                  <fieldset class="form-group">
                     <legend>Radio buttons</legend>
                     <div class="form-check">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios1" value="option1" checked>
                        Option one is this and that&mdash;be sure to include why it's great
                        </label>
                     </div>
                     <div class="form-check">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios2" value="option2">
                        Option two can be something else and selecting it will deselect option one
                        </label>
                     </div>
                     <div class="form-check disabled">
                        <label class="form-check-label">
                        <input type="radio" class="form-check-input" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
                        Option three is disabled
                        </label>
                     </div>
                  </fieldset>
                  <fieldset class="form-group">
                     <legend>Checkboxes</legend>
                     <div class="form-check">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="" checked>
                        Option one is this and that&mdash;be sure to include why it's great
                        </label>
                     </div>
                     <div class="form-check disabled">
                        <label class="form-check-label">
                        <input class="form-check-input" type="checkbox" value="" disabled>
                        Option two is disabled
                        </label>
                     </div>
                  </fieldset>
                  <fieldset class="form-group">
                     <legend>Sliders</legend>
                     <label for="customRange1">Example range</label>
                     <input type="range" class="custom-range" id="customRange1">
                  </fieldset>
                  <button type="submit" class="btn btn-primary">Submit</button>
               </fieldset>
            </form>
         </div>
      </div>
      <div class="col-lg-4 offset-lg-1">
         <form class="bs-component">
            <div class="form-group">
               <fieldset disabled>
                  <label class="control-label" for="disabledInput">Disabled input</label>
                  <input class="form-control" id="disabledInput" type="text" placeholder="Disabled input here..." disabled="">
               </fieldset>
            </div>
            <div class="form-group">
               <fieldset>
                  <label class="control-label" for="readOnlyInput">Readonly input</label>
                  <input class="form-control" id="readOnlyInput" type="text" placeholder="Readonly input here…" readonly>
               </fieldset>
            </div>
            <div class="form-group has-success">
               <label class="form-control-label" for="inputSuccess1">Valid input</label>
               <input type="text" value="correct value" class="form-control is-valid" id="inputValid">
               <div class="valid-feedback">Success! You've done it.</div>
            </div>
            <div class="form-group has-danger">
               <label class="form-control-label" for="inputDanger1">Invalid input</label>
               <input type="text" value="wrong value" class="form-control is-invalid" id="inputInvalid">
               <div class="invalid-feedback">Sorry, that username's taken. Try another?</div>
            </div>
            <div class="form-group">
               <label class="col-form-label col-form-label-lg" for="inputLarge">Large input</label>
               <input class="form-control form-control-lg" type="text" placeholder=".form-control-lg" id="inputLarge">
            </div>
            <div class="form-group">
               <label class="col-form-label" for="inputDefault">Default input</label>
               <input type="text" class="form-control" placeholder="Default input" id="inputDefault">
            </div>
            <div class="form-group">
               <label class="col-form-label col-form-label-sm" for="inputSmall">Small input</label>
               <input class="form-control form-control-sm" type="text" placeholder=".form-control-sm" id="inputSmall">
            </div>
            <div class="form-group">
               <label class="control-label">Input addons</label>
               <div class="form-group">
                  <div class="input-group mb-3">
                     <div class="input-group-prepend">
                        <span class="input-group-text">$</span>
                     </div>
                     <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                     <div class="input-group-append">
                        <span class="input-group-text">.00</span>
                     </div>
                  </div>
               </div>
            </div>
         </form>
         <div class="bs-component">
            <fieldset>
               <legend>Custom forms</legend>
               <div class="form-group">
                  <div class="custom-control custom-radio">
                     <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked>
                     <label class="custom-control-label" for="customRadio1">Toggle this custom radio</label>
                  </div>
                  <div class="custom-control custom-radio">
                     <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                     <label class="custom-control-label" for="customRadio2">Or toggle this other custom radio</label>
                  </div>
                  <div class="custom-control custom-radio">
                     <input type="radio" id="customRadio3" name="customRadio" class="custom-control-input" disabled>
                     <label class="custom-control-label" for="customRadio3">Disabled custom radio</label>
                  </div>
               </div>
               <div class="form-group">
                  <div class="custom-control custom-checkbox">
                     <input type="checkbox" class="custom-control-input" id="customCheck1" checked>
                     <label class="custom-control-label" for="customCheck1">Check this custom checkbox</label>
                  </div>
                  <div class="custom-control custom-checkbox">
                     <input type="checkbox" class="custom-control-input" id="customCheck2" disabled>
                     <label class="custom-control-label" for="customCheck2">Disabled custom checkbox</label>
                  </div>
               </div>
               <div class="form-group">
                  <div class="custom-control custom-switch">
                     <input type="checkbox" class="custom-control-input" id="customSwitch1" checked>
                     <label class="custom-control-label" for="customSwitch1">Toggle this switch element</label>
                  </div>
                  <div class="custom-control custom-switch">
                     <input type="checkbox" class="custom-control-input" disabled id="customSwitch2">
                     <label class="custom-control-label" for="customSwitch2">Disabled switch element</label>
                  </div>
               </div>
               <div class="form-group">
                  <select class="custom-select">
                     <option selected>Open this select menu</option>
                     <option value="1">One</option>
                     <option value="2">Two</option>
                     <option value="3">Three</option>
                  </select>
               </div>
               <div class="form-group">
                  <div class="input-group mb-3">
                     <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile02">
                        <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                     </div>
                     <div class="input-group-append">
                        <span class="input-group-text" id="">Upload</span>
                     </div>
                  </div>
               </div>
            </fieldset>
         </div>
      </div>
   </div>
</div>
<div class="bs-docs-section">
   <div class="row">
      <div class="col-lg-12">
         <div class="page-header">
            <h1 id="navs">Navs</h1>
         </div>
      </div>
   </div>
   <div class="row" style="margin-bottom: 2rem;">
      <div class="col-lg-6">
         <h2 id="nav-tabs">Tabs</h2>
         <div class="bs-component">
            <ul class="nav nav-tabs">
               <li class="nav-item">
                  <a class="nav-link active" data-toggle="tab" href="#home">Home</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link" data-toggle="tab" href="#profile">Profile</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
               </li>
               <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div class="dropdown-menu">
                     <a class="dropdown-item" href="#">Action</a>
                     <a class="dropdown-item" href="#">Another action</a>
                     <a class="dropdown-item" href="#">Something else here</a>
                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="#">Separated link</a>
                  </div>
               </li>
            </ul>
            <div id="myTabContent" class="tab-content">
               <div class="tab-pane fade show active" id="home">
                  <p>Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.</p>
               </div>
               <div class="tab-pane fade" id="profile">
                  <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit.</p>
               </div>
               <div class="tab-pane fade" id="dropdown1">
                  <p>Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork.</p>
               </div>
               <div class="tab-pane fade" id="dropdown2">
                  <p>Trust fund seitan letterpress, keytar raw denim keffiyeh etsy art party before they sold out master cleanse gluten-free squid scenester freegan cosby sweater. Fanny pack portland seitan DIY, art party locavore wolf cliche high life echo park Austin. Cred vinyl keffiyeh DIY salvia PBR, banh mi before they sold out farm-to-table VHS viral locavore cosby sweater.</p>
               </div>
            </div>
         </div>
      </div>
      <div class="col-lg-6">
         <h2 id="nav-pills">Pills</h2>
         <div class="bs-component">
            <ul class="nav nav-pills">
               <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
               </li>
               <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div class="dropdown-menu">
                     <a class="dropdown-item" href="#">Action</a>
                     <a class="dropdown-item" href="#">Another action</a>
                     <a class="dropdown-item" href="#">Something else here</a>
                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="#">Separated link</a>
                  </div>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
               </li>
            </ul>
         </div>
         <br>
         <div class="bs-component">
            <ul class="nav nav-pills flex-column">
               <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
               </li>
               <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                  <div class="dropdown-menu">
                     <a class="dropdown-item" href="#">Action</a>
                     <a class="dropdown-item" href="#">Another action</a>
                     <a class="dropdown-item" href="#">Something else here</a>
                     <div class="dropdown-divider"></div>
                     <a class="dropdown-item" href="#">Separated link</a>
                  </div>
               </li>
               <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
               </li>
               <li class="nav-item">
                  <a class="nav-link disabled" href="#">Disabled</a>
               </li>
            </ul>
         </div>
      </div>
   </div>
   <div class="row">
      <div class="col-lg-6">
         <h2 id="nav-breadcrumbs">Breadcrumbs</h2>
         <div class="bs-component">
            <ol class="breadcrumb">
               <li class="breadcrumb-item active">Home</li>
            </ol>
            <ol class="breadcrumb">
               <li class="breadcrumb-item"><a href="#">Home</a></li>
               <li class="breadcrumb-item active">Library</li>
            </ol>
            <ol class="breadcrumb">
               <li class="breadcrumb-item"><a href="#">Home</a></li>
               <li class="breadcrumb-item"><a href="#">Library</a></li>
               <li class="breadcrumb-item active">Data</li>
            </ol>
         </div>
      </div>
      <div class="col-lg-6">
         <h2 id="pagination">Pagination</h2>
         <div class="bs-component">
            <div>
               <ul class="pagination">
                  <li class="page-item disabled">
                     <a class="page-link" href="#">&laquo;</a>
                  </li>
                  <li class="page-item active">
                     <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">4</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">5</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">&raquo;</a>
                  </li>
               </ul>
            </div>
            <div>
               <ul class="pagination pagination-lg">
                  <li class="page-item disabled">
                     <a class="page-link" href="#">&laquo;</a>
                  </li>
                  <li class="page-item active">
                     <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">&raquo;</a>
                  </li>
               </ul>
            </div>
            <div>
               <ul class="pagination pagination-sm">
                  <li class="page-item disabled">
                     <a class="page-link" href="#">&laquo;</a>
                  </li>
                  <li class="page-item active">
                     <a class="page-link" href="#">1</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">2</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">3</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">4</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">5</a>
                  </li>
                  <li class="page-item">
                     <a class="page-link" href="#">&raquo;</a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   </div>
</div>


