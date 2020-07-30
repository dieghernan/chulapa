---
layout: null
---
// adapted from https://experimentingwithcode.com/creating-a-jekyll-blog-with-bootstrap-4-and-sass-part-4/
$(document).ready(function() {
   $('.highlight').each(function(i) {
      if (!$(this).parent().hasClass('highlighter-rouge')) {

        // create an id for the current code section
        var currentId = "codeblock" + (i + 1);

        // find the code section and add the id to it
        var codeSection = $(this).find('code');
        codeSection.attr('id', currentId);

        // now create the button, setting the clipboard target to the id
        var btn = document.createElement('div');
        btn.setAttribute('type', 'btn');
        btn.classList.add( 'btn-copy-code', 'text-right');
        btn.setAttribute('data-clipboard-target', '#' + currentId);
        btn.innerHTML = '<p class="btn btn-primary btn-sm mb-0 "><i class="far fa-copy"></i></p>';
        this.insertBefore(btn, this.firstChild);
      }
    });
    new ClipboardJS('.btn-copy-code');
  });