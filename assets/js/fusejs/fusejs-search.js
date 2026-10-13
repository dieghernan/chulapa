// Based on https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0
// Sort regions to avoid breaking layout
// Avoid highlighting single characters
// Mask highlighting happening in html tags (class or style)

const highlight = (results, className, termLength) =>
    ChulapaSearch.highlight(results.filter(result => result.matches && result.matches.length), className, termLength, false);

// Event listener to update as you write
// Based on https://stackoverflow.com/questions/75884233/how-to-set-up-fuse-js-like-vs-code
function init() {
    const termsInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');
    if (!termsInput || !resultsContainer) return;
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
        ChulapaSearch.renderEntries(resultsContainer, entries);
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

        const res = highlight(resultFilter, "bg-warning text-dark", termLen); // array of items with highlighted fields
        renderEntries(res);
    }

    ChulapaSearch.bindInput(termsInput, handleInputChange);
}

init();