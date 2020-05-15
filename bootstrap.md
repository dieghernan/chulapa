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


Text can be **bold**, _italic_, or ~~strikethrough~~. [Link to another page](./another-page.html).


# Header 1
## Header 2

> This is a blockquote following a header.
>
> When something is important enough, you do it even if the odds are not in your favor.

### Header 3

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

// Handle the result of a gapi.auth.authorize() call.
function handleAuthResult(authResult) {
  if (authResult && !authResult.error) {
    // Authorization was successful. Hide authorization prompts and show
    // content that should be visible after authorization succeeds.
    $('.pre-auth').hide();
    $('.post-auth').show();
    loadAPIClientInterfaces();
  } else {
    // Make the #login-link clickable. Attempt a non-immediate OAuth 2.0
    // client flow. The current function is called when that flow completes.
    $('#login-link').click(function() {
      gapi.auth.authorize({
        client_id: OAUTH2_CLIENT_ID,
        scope: OAUTH2_SCOPES,
        immediate: false
        }, handleAuthResult);
    });
  }
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


### Buttons

<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-link">Link</button>
<button type="button" class="btn btn-chulapa">Chulapa</button>


<button type="button" class="btn btn-primary disabled">Primary</button>
<button type="button" class="btn btn-secondary disabled">Secondary</button>
<button type="button" class="btn btn-success disabled">Success</button>
<button type="button" class="btn btn-info disabled">Info</button>
<button type="button" class="btn btn-warning disabled">Warning</button>
<button type="button" class="btn btn-danger disabled">Danger</button>
<button type="button" class="btn btn-link disabled">Link</button>
<button type="button" class="btn btn-chulapa disabled">Chulapa</button>


<button type="button" class="btn btn-outline-primary">Primary</button>
<button type="button" class="btn btn-outline-secondary">Secondary</button>
<button type="button" class="btn btn-outline-success">Success</button>
<button type="button" class="btn btn-outline-info">Info</button>
<button type="button" class="btn btn-outline-warning">Warning</button>
<button type="button" class="btn btn-outline-danger">Danger</button>
<button type="button" class="btn btn-outline-chulapa">Chulapa</button>

<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
	<button type="button" class="btn btn-primary">Primary</button>
	<div class="btn-group" role="group">
		<button  type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
		<div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
			<a class="dropdown-item" href="#">Dropdown link</a>
			<a class="dropdown-item" href="#">Dropdown link</a>
		</div>
	</div>
</div>

<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
	<button type="button" class="btn btn-success">Success</button>
	<div class="btn-group" role="group">
		<button  type="button" class="btn btn-success dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
		<div class="dropdown-menu" aria-labelledby="btnGroupDrop2">
			<a class="dropdown-item" href="#">Dropdown link</a>
			<a class="dropdown-item" href="#">Dropdown link</a>
		</div>
	</div>
</div>

<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
	<button type="button" class="btn btn-info">Info</button>
	<div class="btn-group" role="group">
		<button  type="button" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
		<div class="dropdown-menu" aria-labelledby="btnGroupDrop3">
			<a class="dropdown-item" href="#">Dropdown link</a>
			<a class="dropdown-item" href="#">Dropdown link</a>
		</div>
	</div>
</div>

<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
	<button type="button" class="btn btn-danger">Danger</button>
	<div class="btn-group" role="group">
		<button  type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
		<div class="dropdown-menu" aria-labelledby="btnGroupDrop4">
			<a class="dropdown-item" href="#">Dropdown link</a>
			<a class="dropdown-item" href="#">Dropdown link</a>
		</div>
	</div>
</div>

<div class="btn-group" role="group" aria-label="Button group with nested dropdown">
	<button type="button" class="btn btn-chulapa">Chulapa</button>
	<div class="btn-group" role="group">
		<button  type="button" class="btn btn-chulapa dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
		<div class="dropdown-menu" aria-labelledby="btnGroupDrop4">
			<a class="dropdown-item" href="#">Dropdown link</a>
			<a class="dropdown-item" href="#">Dropdown link</a>
		</div>
	</div>
</div>

<div class="my-1">
  <button type="button" class="btn btn-primary btn-lg">Large button</button>
  <button type="button" class="btn btn-primary">Default button</button>
  <button type="button" class="btn btn-primary btn-sm">Small button</button>
</div>

<div class="btn-group btn-group-toggle my-1" data-toggle="buttons">
	<label class="btn btn-primary active">
		<input type="checkbox" checked="" autocomplete="off"> Active
	</label>
	<label class="btn btn-primary">
		<input type="checkbox" autocomplete="off"> Check
	</label>
	<label class="btn btn-primary">
		<input type="checkbox" autocomplete="off"> Check
	</label>
</div>

<div class="btn-group btn-group-toggle my-1" data-toggle="buttons">
	<label class="btn btn-primary active">
		<input type="radio" name="options"  autocomplete="off" checked=""> Active
	</label>
	<label class="btn btn-primary">
		<input type="radio" name="options" autocomplete="off"> Radio
	</label>
	<label class="btn btn-primary">
		<input type="radio" name="options" autocomplete="off"> Radio
	</label>
</div>

<div class="btn-group my-1" role="group" aria-label="Basic example">
	<button type="button" class="btn btn-secondary">Left</button>
	<button type="button" class="btn btn-secondary">Middle</button>
	<button type="button" class="btn btn-secondary">Right</button>
</div>



<div class="btn-toolbar my-1" role="toolbar" aria-label="Toolbar with button groups">
	<div class="btn-group mr-2" role="group" aria-label="First group">
		<button type="button" class="btn btn-secondary">1</button>
		<button type="button" class="btn btn-secondary">2</button>
		<button type="button" class="btn btn-secondary">3</button>
		<button type="button" class="btn btn-secondary">4</button>
	</div>
	<div class="btn-group mr-2" role="group" aria-label="Second group">
		<button type="button" class="btn btn-secondary">5</button>
		<button type="button" class="btn btn-secondary">6</button>
	</div>
</div>