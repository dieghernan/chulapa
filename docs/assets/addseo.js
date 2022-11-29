// Demo purposes
function run() {
    var canurl = document.querySelector("link[rel='canonical']").getAttribute("href");
    var blin = document.getElementById("pglink");
    blin.innerHTML = '<a href="https://pagespeed.web.dev/report?url=' + canurl + '">See full results</a>';
    const url = setUpQuery(canurl);
    fetch(url)
        .then(response => response.json())
        .then(json => {
            // See https://developers.google.com/speed/docs/insights/v5/reference/pagespeedapi/runpagespeed#response
            // to learn more about each of the properties in the response object.
            //showInitialContent(json.id);
            const lighthouse = json.lighthouseResult.categories;
            try {
                showMetric(lighthouse['performance'].score * 100, "p");
                showMetric(lighthouse['accessibility'].score * 100, "a");
                showMetric(lighthouse['best-practices'].score * 100, "bp");
                showMetric(lighthouse['seo'].score * 100, "s");
            } catch {
                console.log("No API Results");
            }
        });
}

function showMetric(value, id) {
    // Set color
    let col = 'success';
    let textcol = 'white';
    if (value < 70) {
        col = "danger"
    } else if (value < 86) {
        col = "warning";
        textcol = 'dark';
    }
    var bgDiv = document.getElementById(id + '_bg');
    bgDiv.classList.remove('bg-light');
    bgDiv.classList.remove('border-light');
    bgDiv.classList.add('bg-' + col);
    bgDiv.classList.add('border-' + col);


    var txtDiv = document.getElementById(id + '_t');
    txtDiv.innerHTML = '<strong>' + value + '</strong>';
    txtDiv.classList.add('text-' + textcol);
    txtDiv.classList.add('text-' + textcol);
}

function setUpQuery(canurl) {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?';
    var url = encodeURIComponent(canurl);
    var query = api + 'url=' + url + '&category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=SEO';
    console.log('Querying ' + query);
    return query;
}

run();
