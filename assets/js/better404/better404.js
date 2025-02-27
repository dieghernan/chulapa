---
layout: null
---

// You found an Easter egg!
// Get root
{% assign homeurl = '/' | absolute_url %}
// Vars
let homeUrl = "{{ homeurl }}";
// with no trailing '/'
homeUrl = homeUrl.replace(/\/+$/, "");
let currentUrl = window.location.href;
let sitemap = "{{- 'sitemap.xml' | absolute_url -}}"
// Based in https://ben.balter.com/2022/06/30/helpful-404s-for-jekyll-and-github-pages/
// A: Function definition...
// Own version of closest from 'fastest-levenshtein')
// Single levestein dist https://stackoverflow.com/questions/18516942
// Later implemented as js-levenshtein
const levenshteinDistance = (s, t) => {
    if (!s.length) return t.length;
    if (!t.length) return s.length;
    const arr = [];
    for (let i = 0; i <= t.length; i++) {
        arr[i] = [i];
        for (let j = 1; j <= s.length; j++) {
            arr[i][j] =
                i === 0 ?
                j :
                Math.min(
                    arr[i - 1][j] + 1,
                    arr[i][j - 1] + 1,
                    arr[i - 1][j - 1] + (s[j - 1] === t[i - 1] ? 0 : 1)
                );
        }
    }
    return arr[t.length][s.length];
};
// Iterator to get closest match
const closest = (str, urls) => {
    var arrayLength = urls.length;
    var closest = []; // store their names within a local array
    // Iterate over the distance
    for (var i = 0; i < arrayLength; i++) {
        closest.push(levenshteinDistance(str, urls[i]));
    }
    let min = closest[0];
    let url = urls[0];
    for (var i = 0; i < arrayLength; i++) {
        if (closest[i] > 0) {
            if (closest[i] < min) {
                min = closest[i];
                url = urls[i];
            }
        }
    }
    return url;
};
// END A: Function definition...
//  https://ben.balter.com/2022/06/30/helpful-404s-for-jekyll-and-github-pages/
const div = document.getElementById('four-oh-four-suggestion');
if (div) {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
        if (xhr.status === 200) {
            const xml = xhr.responseXML;
            const urls = Array.from(xml.querySelectorAll('urlset > url > loc')).map((el) => el.textContent);
            const relurl = new URL(closest(currentUrl, urls));
            div.innerHTML = `<a class="alert-link font-weight-bolder" href="${relurl.href}">${relurl.href.replace(homeUrl, "")}</a>`;
        } else {
            div.innerHTML = '<a href="/">/</a>';
        }
    };
    xhr.open('GET', `${sitemap}`);
    xhr.send();
}
