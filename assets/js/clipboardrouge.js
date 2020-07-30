---
layout: null
---
// adapted from https://experimentingwithcode.com/creating-a-jekyll-blog-with-bootstrap-4-and-sass-part-4/
$('.invisible').tooltip({
    trigger: 'click',
    placement: 'bottom'
});

function setTooltip(btn, message) {
    $(".invisible").tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
}

function hideTooltip(btn) {
    setTimeout(function() {
        $(".invisible").tooltip('hide');
    }, 1000);
}

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
            btn.classList.add('btn-copy-code', 'text-right');
            btn.setAttribute('data-clipboard-target', '#' + currentId);
            btn.innerHTML = '<p class="btn btn-primary btn-sm mb-0 "><i class="far fa-copy"></i><span class="invisible"></span></p>';
            this.insertBefore(btn, this.firstChild);
        }
    });
});

var clipboard = new ClipboardJS('.btn-copy-code');

clipboard.on('success', function(e) {
    setTooltip(e.trigger, 'Copied!');
    hideTooltip(e.trigger);
    e.clearSelection();
});

clipboard.on('error', function(e) {
    setTooltip(e.trigger, 'Failed!');
    hideTooltip(e.trigger);
});
