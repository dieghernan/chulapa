// Event listener to update as you write
// Based on https://stackoverflow.com/questions/75884233/how-to-set-up-fuse-js-like-vs-code
function init() {
    const termsInput = document.getElementById('search');
    const resultsContainer = document.getElementById('results');
    const resultCount = document.getElementById('resultscount');
    const options = {
        keys: ['title', 'subtitle', 'excerpt', 'content', 'categories', 'date', 'tags'],
        isCaseSensitive: false,
        useExtendedSearch: true,
        ignoreLocation: true,
        includeMatches: true,
        includeScore: true,
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
                console.log(i.item.title + " with score " + i.score);
                let searchitem;
                if (i.item.img) {
                    searchitem = `
                        <article class="my-2 text-left">
                            <div class="row">
                                <div class="col">
                                    <h5 class="chulapa-links-hover-only" itemprop="headline">
                                        <a href="${i.item.url}" rel="permalink">${i.item.title}</a>
                                    </h5>
                                </div>
                                <div class="col-4 col-md-3">
                                    <a href="${i.item.url}" rel="permalink">
                                        <div class="rounded-lg chulapa-overlay-img chulapa-gradient chulapa-min-h-10" style="background-image: url('${i.item.img}')"></div>
                                    </a>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    <p>${i.item.excerpt}</p>
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
                                        <a href="${i.item.url}" rel="permalink">${i.item.title}</a>
                                    </h5>
                                </div>
                            </div>
                            <div class="row mt-2">
                                <div class="col">
                                    <p>${i.item.excerpt.split(" ").splice(0, 10).join(" ").trim()}</p>
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
        const terms = termsInput.value;
        if (!terms) {
            resultsContainer.textContent = '';
            return;
        }

        const result = fuse.search(terms, { limit: 10 });
        const items = result.filter((x) => x.score <= 0.75);
        renderEntries(items);
    }

    termsInput.addEventListener('input', handleInputChange);
}

init();
