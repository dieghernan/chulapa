// Clipboard
// Uses Bootstrap 4 + JQuery

// Initialize tooltips BST4 - Fancy displaying
// CSS btn-copy-code: Visibility controls that the button is shown only when hovering the code container
//.btn-copy-code{position:absolute;right:30px;visibility:hidden} NOTE: visibilty optional
//.highlighter-rouge:hover button.btn-copy-code{visibility:visible} NOTE: Skip if btn_copy_code not hidden

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

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
//
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

// End helpers tooltip

// Insert buttons 
$(document).ready(function() {	
	// HTML Button styled with BST4
	var copyButton = 	"<button class='btn btn-light btn-sm btn-chulapa-copy-code' " +
	                    "type = 'button' " +
						"data-toggle='tooltip'" +
						"data-placement='left'" +
						"data-clipboard-copy>" +  //Keyword
						"<i class='far fa-copy'></i>" +
						"</button>";
						
    // Insert copy buttons between pre  and code on Rouge:
	$(copyButton).prependTo("pre.highlight");

});

// Copy next Sibling - code part
var clipboard = new ClipboardJS('[data-clipboard-copy]', { // Keyword
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});
// Fancy displaying using BST4
clipboard.on('success', function(e) {
    e.clearSelection();
    setTooltip(e.trigger, 'Copied!');
    var btn = $(e.trigger);
    showTooltip(btn, 'Copied!');
    hideTooltip(btn);
	// Console
    console.info('Text:', e.text);
});

clipboard.on('error', function(e) {
	e.clearSelection();
    warningTooltip(e.trigger, 'Error!');
    var btn = $(e.trigger);
    showTooltip(btn, 'Error!');
    hideTooltip(btn);
});
