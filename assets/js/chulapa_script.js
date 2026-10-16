// The legacy entry point loads only clipboard behavior from this maintained asset.
var clipboardOnly = document.currentScript && document.currentScript.getAttribute("data-clipboard-only") === "true";
if (!clipboardOnly) {
var sT = document.getElementById("sidetoc");
var btn = document.getElementById("chulapa-sidetoc-toggle");
var body = document.getElementById("body");
var main = document.getElementById("maincontent");
var heads = main ? main.querySelectorAll("h1, h2, h3, h4, h5 , h6") : [];

// First load sidebar
// Create hidden overlay
var iDiv = document.createElement("div");
if (sT) {
  btn.style.marginLeft = "0";
  iDiv.classList.add("bs-canvas-overlay", "bg-dark", "position-fixed",
    "w-100", "h-100");
  iDiv.setAttribute("id", "sideBarOverlay");
  iDiv.setAttribute("onclick", "closeSideBar()");
  body.prepend(iDiv);
  function closeSidebarOnEscape(event) {
    if (event.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
      event.preventDefault();
      event.stopPropagation();
      closeSideBar();
    }
  }
  btn.addEventListener("keydown", closeSidebarOnEscape);
  document.getElementById("sideBar").addEventListener("keydown", closeSidebarOnEscape);
} else if (btn) {
  // ToC was requested but no toc produced
  // Clean up DOM
  btn.remove();
  document.getElementById("sideBar")
    .remove();
}

function openSideBar() {
  var sidebar = document.getElementById("sideBar");
  sidebar.inert = false;
  sidebar.setAttribute("aria-hidden", "false");
  btn.removeAttribute("style");
  btn.setAttribute("aria-expanded", "true");
  document.getElementById("sideBarOverlay")
    .classList.add("show");
  document.getElementById("sideBar")
    .style.marginLeft = "0";
}

function closeSideBar() {
  var sidebar = document.getElementById("sideBar");
  // Return focus before hiding its previous target from assistive technology.
  btn.focus();
  sidebar.inert = true;
  sidebar.setAttribute("aria-hidden", "true");
  document.getElementById("sideBar")
    .removeAttribute("style");
  document.getElementById("sideBarOverlay")
    .classList.remove("show");
  btn.style.marginLeft = "0";
  btn.setAttribute("aria-expanded", "false");
}

// Put anchors on headings
heads.forEach(function (currentValue) {
  var thish = currentValue;
  var id = thish.id;
  if (id) {
    var anchor = document.createElement("a");
    var sp = document.createElement("span");
    var ic = document.createElement("i");
    anchor.classList.add("chulapa-header-link", "ml-2",
      "chulapaDateSocial");
    anchor.href = "#" + id;
    sp.innerHTML = "Permalink";
    sp.classList.add("sr-only");
    ic.classList.add("fas", "fa-link", "fa-2xs", "align-middle");
    anchor.append(sp, ic);
    anchor.title = "Permalink";
    thish.append(anchor);
  } else {
    console.log("Heading :" + thish.innerHTML +
      " does not have id. Can't place anchor here");
  }
});

// Track the reading position without changing focus or anchor navigation.
(function () {
  if (!main) return;
  var headingOrder = Array.from(heads);
  var groups = ["toc", "sidetoc", "markdown-toc"].map(function (id) {
    var toc = document.getElementById(id);
    return toc ? Array.from(toc.querySelectorAll('li > a:first-child[href^="#"]')).map(function (link) {
      var heading;
      var fragment = link.getAttribute("href").slice(1);
      try {
        heading = document.getElementById(decodeURIComponent(fragment));
      } catch (error) {
        // Authored IDs can contain a literal percent sign, not a URI escape.
      }
      heading = heading || document.getElementById(fragment);
      return heading && headingOrder.includes(heading) ? { link: link, heading: heading } : null;
    }).filter(Boolean).sort(function (a, b) {
      return headingOrder.indexOf(a.heading) - headingOrder.indexOf(b.heading);
    }) : [];
  }).filter(function (links) { return links.length; });
  if (!groups.length) return;
  var pending = false;
  var current = new Map();
  function isRendered(heading) {
    if (!heading.getClientRects().length) return false;
    if (heading.checkVisibility) return heading.checkVisibility({ visibilityProperty: true });
    // Closed details can still report rectangles in some browsers.
    var closed = heading.closest("details:not([open])");
    if (closed) {
      var summary = closed.querySelector("summary");
      if (!summary || !summary.contains(heading)) return false;
    }
    var visibility = window.getComputedStyle(heading).visibility;
    return visibility !== "hidden" && visibility !== "collapse";
  }
  function update() {
    pending = false;
    var readingLine = Math.min(120, window.innerHeight / 4);
    var atBottom = window.scrollY > 0 &&
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    var positions = new Map();
    groups.forEach(function (links) {
      links.forEach(function (entry) {
        if (!positions.has(entry.heading)) {
          positions.set(entry.heading, isRendered(entry.heading) ? entry.heading.getBoundingClientRect().top : null);
        }
      });
    });
    groups.forEach(function (links) {
      // Heading order comes from the document, including differently nested TOCs.
      var active = null;
      links.forEach(function (entry) {
        var top = positions.get(entry.heading);
        if (top !== null && (top <= readingLine || atBottom)) {
          active = entry.heading;
        }
      });
      if (current.get(links) === active) return;
      current.set(links, active);
      links.forEach(function (entry) {
        if (entry.heading === active) {
          entry.link.classList.add("chulapa-toc-active");
          entry.link.setAttribute("aria-current", "location");
        } else {
          entry.link.classList.remove("chulapa-toc-active");
          entry.link.removeAttribute("aria-current");
        }
      });
    });
  }
  function schedule() {
    if (!pending) {
      pending = true;
      window.requestAnimationFrame(update);
    }
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  window.addEventListener("hashchange", schedule);
  window.addEventListener("load", schedule);
  // Images, diagrams and web fonts can move headings after the initial render.
  if (window.ResizeObserver) new window.ResizeObserver(schedule).observe(main);
  if (window.MutationObserver) {
    new window.MutationObserver(function (records) {
      // Ignore TOC link styling and unrelated controls to avoid observer loops.
      if (records.some(function (record) {
        return headingOrder.some(function (heading) { return record.target.contains(heading); });
      })) schedule();
    }).observe(document.documentElement, {
      subtree: true,
      attributes: true
    });
  }
  update();
})();

}

// Copy Clipboard
// Insert buttons

function ch_clipboard_setup(root) {
  if (!root) return;
  var clipboardBody = document.getElementById("body");
  root.querySelectorAll("pre").forEach(function (currentValue, currentIndex) {
    var preBlock = currentValue;
    var existingCopy = preBlock.querySelector(".btn-chulapa-copy-code");
    if (existingCopy && existingCopy.classList.contains("btn-chulapa-copy-code")) return;
    var i = currentIndex;
    while (document.getElementById("clipboard_btn" + i)) i++;
    // Select first child
    var codeBlock = preBlock.querySelector("code");
    if (clipboardBody && clipboardBody.getAttribute("data-mermaid") === "true" &&
        (preBlock.classList.contains("mermaid") || preBlock.closest(".language-mermaid") ||
         (codeBlock && codeBlock.classList.contains("language-mermaid")))) {
      return;
    }
    // If first child is code
    if (codeBlock) {
      // Add br is no native
      var hashigh = preBlock.classList.contains("highlight");
      if (hashigh === false){
        preBlock.classList.add("highlight");
        var brk = document.createElement("br");
        codeBlock.prepend(brk);
      }
      // Add id to code block
      codeBlock.setAttribute("id", "clipboard_code" + i);
      // Create button
      var copybtn = document.createElement("button");
      copybtn.classList.add("btn", "text-muted", "btn-sm",
        "btn-chulapa-copy-code");
      copybtn.innerHTML = "<i class='far fa-copy'></i>";
      copybtn.id = "clipboard_btn" + i;
      copybtn.type = "button";
      copybtn.setAttribute("data-toggle", "tooltip");
      copybtn.setAttribute("data-placement", "left");
      copybtn.setAttribute("aria-label", "Copy code to clipboard");
      //Function to copy to clipboard
      copybtn.onclick = ch_copy_cliboard(i);
      preBlock.prepend(copybtn);
    } else {
      console.log("No code block for\n" + preBlock.innerHTML);
    }

  });

}
ch_clipboard_setup(main);

// Copying remains available if the optional tooltip dependencies fail to load.
function tooltipTrigger(button) {
  if (typeof $ !== "function") return null;
  var trigger = $(button);
  return trigger && typeof trigger.tooltip === "function" ? trigger : null;
}
if (typeof $ === "function") $(function () {
  var trigger = tooltipTrigger("[data-toggle='tooltip']");
  if (trigger) trigger.tooltip();
});

function showTooltip(thisbtn, message) {
  if (!thisbtn) return;
  thisbtn.tooltip("hide")
    .attr("data-original-title", message)
    .tooltip("show");
}

function hideTooltip(thisbtn) {
  if (!thisbtn) return;
  setTimeout(function () {
    thisbtn.tooltip("hide");
  }, 1000);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function setTooltip(thisbtn, tooltip, style) {
  thisbtn.classList.remove("text-muted");
  thisbtn.classList.add(style);
  thisbtn.setAttribute("aria-label", tooltip);
  await sleep(1000);
  thisbtn.classList.add("text-muted");
  thisbtn.setAttribute("aria-label", "Copy code to clipboard");
  thisbtn.removeAttribute("data-original-title");
  thisbtn.classList.remove(style);
}

function ch_copy_cliboard(i) {
  return async function () {
    const code = document.getElementById("clipboard_code" + i).textContent;
    const button = document.getElementById("clipboard_btn" + i);
    if (!button || button.disabled) return;
    const trigger = tooltipTrigger(button);
    let style = "text-success";
    let tooltip = "Copied!";
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      style = "text-danger";
      tooltip = "Unable to copy code";
    } finally {
      button.disabled = false;
    }
    setTooltip(button, tooltip, style);
    showTooltip(trigger, tooltip);
    hideTooltip(trigger);
  };
}
