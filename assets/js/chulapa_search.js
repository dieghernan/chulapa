// Shared presentation for local search engines; index positions are normalized here.
window.ChulapaSearch = (function () {
  function highlight(results, className, termLength, positionsAreLengths) {
    return results.map(({item, matches = []}) => {
      const output = {...item};
      for (const match of matches) {
        const text = String(match.value);
        let content = "", next = 0;
        const ranges = match.indices.map(([start, end]) => [start, positionsAreLengths ? start + end : end + 1])
          .sort((a, b) => a[0] - b[0]);
        for (const [start, end] of ranges) {
          if (start < next || end - start < Math.max(2, Math.floor(termLength / 2))) continue;
          // Leave author-supplied HTML tags and encoded entities intact.
          const before = text.slice(0, start);
          if (before.lastIndexOf("<") > before.lastIndexOf(">") || /[<>]/.test(text.slice(start, end))) continue;
          if (before.lastIndexOf("&") > before.lastIndexOf(";") && /^&[^;\s]*$/.test(before.slice(before.lastIndexOf("&")))) continue;
          if (/&[^;\s]*$/.test(text.slice(start, end))) continue;
          content += text.slice(next, start) + `<span class="${className}">` + text.slice(start, end) + "</span>";
          next = end;
        }
        content += text.slice(next);
        const keys = match.key.split(".");
        const target = keys.slice(0, -1).reduce((value, key) => value[key], output);
        target[keys[keys.length - 1]] = content;
      }
      return output;
    });
  }
  function renderEntries(container, entries) {
    const fragment = document.createDocumentFragment();
    if (!entries.length) {
      const empty = document.createElement("p");
      empty.className = "h6 text-center";
      empty.textContent = "No results found";
      fragment.append(empty);
    }
    for (const item of entries) {
      const article = document.createElement("article");
      article.className = "my-2 text-left";
      article.innerHTML = `<div class="row"><div class="col"><h2 class="h5 chulapa-links-hover-only" itemprop="headline"><a rel="permalink"></a></h2></div></div>
        <div class="row mt-2"><div class="col"><p></p></div></div><hr>`;
      const title = article.querySelector("h2 a");
      title.href = item.url;
      title.innerHTML = item.title;
      article.querySelector("p").innerHTML = item.excerpt.trim();
      if (item.img) {
        const column = document.createElement("div");
        column.className = "col-4 col-md-3";
        const link = document.createElement("a");
        link.href = item.url;
        link.rel = "permalink";
        // Highlight spans belong to the visible title, not its accessible name.
        link.setAttribute("aria-label", title.textContent);
        const image = document.createElement("div");
        image.className = "rounded-lg chulapa-overlay-img chulapa-gradient chulapa-min-h-10";
        image.style.backgroundImage = `url(${JSON.stringify(item.img)})`;
        link.append(image);
        column.append(link);
        article.querySelector(".row").append(column);
      }
      fragment.append(article);
    }
    container.replaceChildren(fragment);
    const status = document.getElementById("resultscount");
    if (status) status.textContent = `${entries.length} ${entries.length === 1 ? "result" : "results"} found`;
  }

  function bindInput(input, render) {
    let timer;
    function update() {
      if (!input.value) {
        const status = document.getElementById("resultscount");
        if (status) status.textContent = "";
      }
      render();
    }
    input.addEventListener("input", () => {
      clearTimeout(timer);
      if (!input.value) update();
      else timer = setTimeout(update, 150);
    });
    if (input.form) input.form.addEventListener("submit", event => {
      event.preventDefault();
      clearTimeout(timer);
      update();
    });
  }
  return {highlight, renderEntries, bindInput};
})();
