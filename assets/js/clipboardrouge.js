---
layout: null
---
    
$('.btn-copy-code').tooltip({
    trigger: 'click',
    placement: 'bottom'
});

function showTooltip(btn, message) {
    btn.tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
}

function hideTooltip(btn) {
    setTimeout(function() {
        btn.tooltip('hide');
    }, 1000);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setTooltip(btn, message) {
    btn.classList.remove('btn-light');
    btn.classList.add('btn-success');
    btn.setAttribute('aria-label', message);
    await sleep(1000);
    btn.removeAttribute('aria-label');
    btn.removeAttribute('data-original-title');
    btn.classList.add('btn-light');
    btn.classList.remove('btn-success');
}

async function warningTooltip(btn, message) {
    btn.classList.remove('btn-light');
    btn.classList.add('btn-danger');
    await sleep(500);
    btn.removeAttribute('aria-label');
    btn.removeAttribute('data-original-title');
    btn.classList.add('btn-light');
    btn.classList.remove('btn-danger');
}

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
            //btn.setAttribute('type', 'btn');
            btn.classList.add('text-right', "mb-1");
            btn.innerHTML = '<p><i class="far fa-copy"></i></p>';
            btn.firstChild.classList.add('btn-copy-code', 'btn', 'btn-light', 'btn-sm', 'mb-0')
            btn.firstChild.setAttribute('data-clipboard-target', '#' + currentId);
            this.insertBefore(btn, this.firstChild);
        }
    });
});

var clipboard = new ClipboardJS('.btn-copy-code');

clipboard.on('success', function(e) {
    e.clearSelection();
    setTooltip(e.trigger, 'Copied!');
    var btn = $(e.trigger);
    showTooltip(btn, 'Copied!');
    hideTooltip(btn);
});

clipboard.on('error', function(e) {
    warningTooltip(e.trigger, 'Error!');
    var btn = $(e.trigger);
    showTooltip(btn, 'Error!');
    hideTooltip(btn);
});
