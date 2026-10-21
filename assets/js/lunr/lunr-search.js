// Based on https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0
// Sort regions to avoid breaking layout
// Avoid highlighting single characters
// Mask highlighting happening in html tags (class or style)
// Adaptation of my version of fusejs-search.js

const highlight = (results, className, termLength) =>
    ChulapaSearch.highlight(results, className, termLength, true);

// lunr to fusejs layout
const lunr2fuse = (result) => {
    result.forEach(i => {
        i["item"] = store[i.ref];
        i["refIndex"] = i.ref;

        // Merge positions
        const mergedMap = {};
        Object.values(i.matchData.metadata).forEach(section => {
            Object.entries(section).forEach(([key, value]) => {
                if (!mergedMap[key]) {
                    mergedMap[key] = [];
                }
                if (Array.isArray(value.position)) {
                    mergedMap[key].push(...value.position.filter(p => p !== null)); // Remove null values
                }
            });
        });

        Object.keys(mergedMap).forEach(key => {
            if (mergedMap[key][0] === undefined) {
                delete mergedMap[key];
            }
        });

        // Convert merged object into an array with "indices" first and "key" second
        const mergedArray = Object.entries(mergedMap)
            .filter(([, positions]) => positions.length > 0) // Remove empty positions
            .map(([key, indices]) => ({ indices, key }));
        mergedArray.forEach(k => {
            k["value"] = i.item[k.key];
        });
        i["matches"] = mergedArray;

        delete i['ref'];
        delete i['matchData'];
    });

    return result;
};

// Event listener to update as you write
// Based on https://stackoverflow.com/questions/75884233/how-to-set-up-fuse-js-like-vs-code
function init() {
    const termsInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');
    if (!termsInput || !resultsContainer) return;

    function renderEntries(entries) {
        ChulapaSearch.renderEntries(resultsContainer, entries);
    }

    let idx;
    function handleInputChange() {
        let terms = termsInput.value;
        const termLen = terms.length;
        if (!terms) {
            resultsContainer.textContent = '';
            return;
        }

        // Config search
        if (!idx) idx = lunr(function () {
            this.field('title');
            this.field('subtitle');
            this.field('excerpt');
            this.field('content');
            this.field('categories');
            this.field('date');
            this.field('tags');
            this.ref('id');

            this.pipeline.remove(lunr.trimmer);
            this.metadataWhitelist = ['position'];

            for (const item in store) {
                this.add({
                    title: store[item].title,
                    subtitle: store[item].subtitle,
                    excerpt: store[item].excerpt,
                    content: store[item].content,
                    categories: store[item].categories,
                    date: store[item].date,
                    tags: store[item].tags,
                    id: item
                });
            }
        });

        // Trigger search
        terms = terms.toLowerCase();
        const result = idx.query(q => {
            terms.split(lunr.tokenizer.separator).forEach(term => {
                q.term(term, { boost: 100 });
                if (terms.lastIndexOf(" ") !== terms.length - 1) {
                    q.term(term, {
                        usePipeline: false,
                        wildcard: lunr.Query.wildcard.TRAILING,
                        boost: 10
                    });
                }
                if (term !== "") {
                    q.term(term, {
                        usePipeline: false,
                        editDistance: 1,
                        boost: 1
                    });
                }
            });
        });

        const lunres = lunr2fuse(result);

        const resultFilter = lunres.filter((x) => x.score > 0.5);
        const res = highlight(resultFilter, "bg-warning text-dark", termLen); // Array of items with highlighted fields
        renderEntries(res);
    }

    ChulapaSearch.bindInput(termsInput, handleInputChange);
}

init();