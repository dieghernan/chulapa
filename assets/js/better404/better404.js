// You found an Easter egg!
// Get root

// Vars
let homeUrl = "https://dieghernan.github.io/chulapa/";
// with no trailing '/'
homeUrl = homeUrl.replace(/\/+$/, "");
let currentUrl = window.location.href;
let sitemap = "https://dieghernan.github.io/chulapa/sitemap.xml"
// Based in https://ben.balter.com/2022/06/30/helpful-404s-for-jekyll-and-github-pages/
// A: Function definition...
// Own version of closest from 'fastest-levenshtein')
// Single levestein dist https://stackoverflow.com/questions/18516942
// Later implemented as js-levenshtein
const levenshteinDistance = (s, t) => {
    let previous = Array.from({length: s.length + 1}, (_, i) => i);
    for (let i = 1; i <= t.length; i++) {
        const current = [i];
        for (let j = 1; j <= s.length; j++) {
            current[j] = Math.min(previous[j] + 1, current[j - 1] + 1,
                previous[j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1));
        }
        previous = current;
    }
    return previous[s.length];
};
// Iterator to get closest match
const closest = (str, urls) => {
    let best, distance = Infinity;
    for (const url of urls) {
        const candidate = levenshteinDistance(str, url);
        if (candidate < distance) { best = url; distance = candidate; }
    }
    return best;
};
// END A: Function definition...
//  https://ben.balter.com/2022/06/30/helpful-404s-for-jekyll-and-github-pages/
const div = document.getElementById('four-oh-four-suggestion');
if (div) {
    const xhr = new XMLHttpRequest();
    function showLink(url) {
        const link = document.createElement('a');
        link.className = 'alert-link font-weight-bolder';
        link.href = url;
        link.textContent = url.replace(homeUrl, '') || '/';
        div.replaceChildren(link);
    }
    function fallback() { showLink(homeUrl + '/'); }
    xhr.onload = () => {
        if (xhr.status !== 200 || !xhr.responseXML) { fallback(); return; }
        const urls = Array.from(xhr.responseXML.querySelectorAll('urlset > url > loc'))
          .map(el => el.textContent).filter(url => {
              try { return new URL(url).origin === new URL(homeUrl).origin; }
              catch { return false; }
          });
        const match = closest(currentUrl, urls);
        if (match) showLink(match); else fallback();
    };
    xhr.onerror = fallback;
    xhr.ontimeout = fallback;
    xhr.timeout = 10000;
    xhr.open('GET', `${sitemap}`);
    xhr.send();
}
