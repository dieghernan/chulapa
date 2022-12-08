

// Add anchors for headings
// Adapted from Minimal Mistakes, (c) Michael Rose
$('#maincontent').find('h1, h2, h3, h4, h5, h6').each(function() {
    var id = $(this).attr('id');
    if (id) {
        var anchor = document.createElement("a");
        anchor.className = 'header-link';
        anchor.href = '#' + id;
        anchor.innerHTML = '<span class=\"sr-only\">Permalink</span><i class=\"fas fa-link\"></i>';
        anchor.title = "Permalink";
        $(this).append(anchor);
    }
});