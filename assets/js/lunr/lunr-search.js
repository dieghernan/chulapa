// Based on https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0
// Sort regions to avoid breaking layout
// Avoid highlighting single characters
// Mask highlighting happening in html tags (class or style)
// Adaptation of my version of fusejs-search.js

const highlight = (lunrSearchResult, highlightClassName, termLen) => {
    // Set a value in a nested object based on a dot-separated path
    const set = (obj, path, value) => {
        const keys = path.split('.');
        keys.slice(0, -1).reduce((acc, key) => acc[key], obj)[keys[keys.length - 1]] = value;
    };

    // Generate highlighted text based on regions
    const generateHighlightedText = (inputText, regions, termLen) => {
        let content = '';
        let nextUnhighlightedRegionStartingIndex = 0;

        // Sort regions to avoid breaking layout
        regions.sort((a, b) => a[0] - b[0]);

        regions.forEach(region => {
            // Convert [start, len] to [start, end]
            const [start, len] = region;
            const end = start + len;

            // Skip regions that are already included in content
            if (nextUnhighlightedRegionStartingIndex > start) return;

            // Skip short matches to avoid visual cluttering
            if (end - start < 2 || end - start < Math.floor(termLen / 2)) return;

            // Check for HTML tags
            const theInput = inputText.substring(start);
            const indexIniTag = theInput.indexOf("<");
            const indexCloseTag = theInput.indexOf(">");

            if (indexCloseTag < indexIniTag || (indexIniTag === -1 && indexCloseTag > 0)) return;

            // Append unhighlighted and highlighted text
            content += inputText.substring(nextUnhighlightedRegionStartingIndex, start);
            content += `<span class="${highlightClassName}">`;
            content += inputText.substring(start, end);
            content += '</span>';

            nextUnhighlightedRegionStartingIndex = end;
        });

        // Append remaining unhighlighted text
        content += inputText.substring(nextUnhighlightedRegionStartingIndex);

        return content;
    };

    // Highlight search results
    return lunrSearchResult.map(({ item, matches }) => {
        const highlightedItem = { ...item };

        matches.forEach(match => {
            set(highlightedItem, match.key, generateHighlightedText(match.value, match.indices, termLen));
        });

        return highlightedItem;
    });
};

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
    const resultCount = document.getElementById('resultscount');

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

        // Config search
        const idx = lunr(function () {
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
        // Log results
        const itLen = resultFilter.length;
        if (itLen === 0) {
            console.log(`No match for '${terms}'`);
        } else {
            resultFilter.forEach(i => {
                console.log(`Searching string '${terms}' gives Score: ${parseInt(i.score * 1000) / 1000} for title: ${i.item.title}`);
            });
        }

        const res = highlight(resultFilter, "bg-warning text-dark", termLen); // Array of items with highlighted fields
        renderEntries(res);
    }

    termsInput.addEventListener('input', handleInputChange);
}

init();