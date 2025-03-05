// Based on https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0
// Sort regions to avoid breaking layout
// Avoid highlighting single characters
// Mask highlighting happening in html tags (class or style)

const highlight = (fuseSearchResult, highlightClassName, termLen) => {
    const set = (obj, path, value) => {
        const pathValue = path.split('.');
        let i;

        for (i = 0; i < pathValue.length - 1; i++) {
            obj = obj[pathValue[i]];
        }

        obj[pathValue[i]] = value;
    };

    const generateHighlightedText = (inputText, regions, termLen) => {
        let content = '';
        let nextUnhighlightedRegionStartingIndex = 0;

        // Sort regions to avoid breaking layout
        regions = regions.sort((a, b) => a[0] - b[0]);

        regions.forEach(region => {
            // Was this region already included in content?
            if (nextUnhighlightedRegionStartingIndex > region[0]) {
                return content;
            }

            // Not highlight short matches to avoid visual cluttering
            // min 2 chars
            if (region[1] - region[0] < 2) {
                return content;
            }

            // And based on search term length
            if (region[1] - region[0] < parseInt(termLen / 2)) {
                return content;
            }

            const lastRegionNextIndex = region[1] + 1;

            // Try mask html in database
            const theInput = inputText.substring(region[0]);
            const indexIniTag = theInput.indexOf("<");
            const indexCloseTag = theInput.indexOf(">");

            if (indexCloseTag < indexIniTag || (indexIniTag == -1 && indexCloseTag > 0)) {
                return content;
            }

            content += [
                inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
                `<span class="${highlightClassName}">`,
                inputText.substring(region[0], lastRegionNextIndex),
                '</span>',
            ].join('');

            nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
        });

        content += inputText.substring(nextUnhighlightedRegionStartingIndex);

        return content;
    };

    return fuseSearchResult
        .filter(({ matches }) => matches && matches.length)
        .map(({ item, matches }) => {
            const highlightedItem = { ...item };

            matches.forEach((match) => {
                set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices, termLen));
            });

            return highlightedItem;
        });
};

// Event listener to update as you write
// Based on https://stackoverflow.com/questions/75884233/how-to-set-up-fuse-js-like-vs-code
function init() {
    const termsInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');
    const resultCount = document.getElementById('resultscount');
    const options = {
        keys: ['subtitle', 'content', 'categories', 'date',
            { name: 'title', weight: 1.15 },
            { name: 'tags', weight: 1.1 },
            { name: 'excerpt', weight: 1.05 }
        ],
        isCaseSensitive: false,
        ignoreDiacritics: true,
        includeScore: true,
        includeMatches: true, // For search highlight
        minMatchCharLength: 2,
        threshold: 0.35,
        shouldSort: true,
        ignoreLocation: true,
        ignoreFieldNorm: true,
        useExtendedSearch: true,
    };
    const fuse = new Fuse(store, options);

    function renderEntries(entries) {
        resultsContainer.textContent = '';
        const resl = entries.length;
        if (resl === 0) {
            const el = document.createElement('h6');
            el.className = 'text-center';
            el.textContent = "No results found";
            resultsContainer.appendChild(el);
            return;
        } else {
            entries.forEach(i => {
                let searchitem;
                if (i.img) {
                    searchitem = `
                        <article class="my-2 text-left">
                            <div class="row">
                                <div class="col">
                                    <h5 class="chulapa-links-hover-only" itemprop="headline">
                                        <a href="${i.url}" rel="permalink">${i.title}</a>
                                    </h5>
                                </div>
                                <div class="col-4 col-md-3">
                                    <a href="${i.url}" rel="permalink">
                                        <div class="rounded-lg chulapa-overlay-img chulapa-gradient chulapa-min-h-10" style="background-image: url('${i.img}')"></div>
                                    </a>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    <p>${i.excerpt.trim()}</p>
                                </div>
                            </div>
                            <hr>
                        </article>`;
                } else {
                    searchitem = `
                        <article class="my-2 text-left">
                            <div class="row">
                                <div class="col">
                                    <h5 class="chulapa-links-hover-only" itemprop="headline">
                                        <a href="${i.url}" rel="permalink">${i.title}</a>
                                    </h5>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    <p>${i.excerpt.trim()}</p>
                                </div>
                            </div>
                            <hr>
                        </article>`;
                }
                resultsContainer.innerHTML += searchitem;
            });
        }
    }

    function handleInputChange() {
        let terms = termsInput.value;
        const termLen = terms.length;
        if (!terms) {
            resultsContainer.textContent = '';
            return;
        }
        if (termLen === 1) {
            terms = `^${terms}`;
        }
        const result = fuse.search(terms, { limit: 10 });
        const resultFilter = result.filter((x) => x.score < 0.75);

        // log results
        const itLen = resultFilter.length;
        if (itLen === 0) {
            console.log(`No match for '${terms}'`);
        } else {
            resultFilter.forEach(i => {
                console.log(`Searching string '${terms}' gives Score: ${parseInt(i.score * 1000000) / 1000000} for title: ${i.item.title}`);
            });
        }

        const res = highlight(resultFilter, "bg-warning text-dark", termLen); // array of items with highlighted fields
        renderEntries(res);
    }

    termsInput.addEventListener('input', handleInputChange);
}

init();