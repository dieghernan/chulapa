/**
 * Chulapa Mermaid integration
 *
 * - Forces theme "base" + look "classic" (avoids Mermaid 12 neo/redux defaults)
 * - Builds themeVariables from the skin's CSS custom properties
 * - Re-renders diagrams when the light/dark skin selector changes
 */

function cssVar(name, fallback = "") {
  try {
    if (typeof getComputedStyle !== "function") return fallback;
    const root =
      typeof document !== "undefined" ? document.documentElement : null;
    if (!root) return fallback;
    const value = getComputedStyle(root).getPropertyValue(name).trim();
    return value || fallback;
  } catch {
    return fallback;
  }
}

/** Relative luminance of a CSS color (#rgb, #rrggbb, rgb/rgba). */
function isDarkBackground(bg) {
  let r, g, b;
  if (!bg) return false;
  if (bg.startsWith("#")) {
    const hex = bg.slice(1);
    const full =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    if (full.length < 6) return false;
    r = parseInt(full.slice(0, 2), 16);
    g = parseInt(full.slice(2, 4), 16);
    b = parseInt(full.slice(4, 6), 16);
  } else {
    const m = bg.match(
      /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i
    );
    if (!m) return false;
    r = +m[1];
    g = +m[2];
    b = +m[3];
  }
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.45;
}

function buildThemeVariables() {
  const bg = cssVar("--chulapa-mermaid-bg", "#ffffff");
  const color = cssVar("--chulapa-mermaid-color", "#212529");
  const nodeBg = cssVar("--chulapa-mermaid-node-bg", "#ffffff");
  const nodeBorder = cssVar("--chulapa-mermaid-node-border", "#0d6efd");
  const line = cssVar("--chulapa-mermaid-line", color);
  const mutedBg = cssVar("--chulapa-mermaid-muted-bg", "#f8f9fa");
  const mutedBorder = cssVar("--chulapa-mermaid-muted-border", "#dee2e6");
  const fontFamily = cssVar(
    "--chulapa-mermaid-font-family",
    "system-ui, -apple-system, sans-serif"
  );

  const dark = isDarkBackground(bg);

  return {
    darkMode: dark,

    background: bg,
    fontFamily,

    primaryColor: nodeBg,
    primaryTextColor: color,
    primaryBorderColor: nodeBorder,
    lineColor: line,
    secondaryColor: mutedBg,
    tertiaryColor: bg,
    tertiaryBorderColor: mutedBorder,
    tertiaryTextColor: color,

    noteBkgColor: mutedBg,
    noteTextColor: color,
    noteBorderColor: mutedBorder,
    edgeLabelBackground: bg,
    textColor: color,

    // Flowchart
    mainBkg: nodeBg,
    nodeBorder: nodeBorder,
    clusterBkg: mutedBg,
    clusterBorder: mutedBorder,
    titleColor: color,
    nodeTextColor: color,
    defaultLinkColor: line,

    // Sequence
    actorBkg: nodeBg,
    actorBorder: nodeBorder,
    actorTextColor: color,
    actorLineColor: line,
    signalColor: color,
    signalTextColor: color,
    labelBoxBkgColor: mutedBg,
    labelBoxBorderColor: mutedBorder,
    labelTextColor: color,
    loopTextColor: color,
  };
}

// Extra CSS for cases themeVariables do not fully cover
const themeCSS = `
  .edgeLabel,
  .edgeLabel p {
    background-color: var(--chulapa-mermaid-bg) !important;
  }
  .cluster-label text {
    fill: var(--chulapa-mermaid-color);
  }
`;

function applyMermaidConfig(mermaid) {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: "base",
    look: "classic",
    themeVariables: buildThemeVariables(),
    themeCSS,
  });
}

function isMermaidBlock(pre) {
  return (
    pre.classList.contains("mermaid") ||
    !!pre.closest(".language-mermaid") ||
    !!pre.querySelector("code.language-mermaid")
  );
}

function collectBlocks(root) {
  return Array.from(root.querySelectorAll("pre")).filter(isMermaidBlock);
}

function updateScrollFocus(diagram) {
  if (diagram.scrollWidth > diagram.clientWidth) {
    diagram.tabIndex = 0;
  } else {
    diagram.removeAttribute("tabindex");
  }
}

function setDiagramSvg(diagram, markup) {
  diagram.innerHTML = markup;
  const svg = diagram.querySelector("svg");
  const width = svg?.viewBox.baseVal.width;
  if (width > 0) svg.setAttribute("width", width);
}

async function renderOne(mermaid, root, pre, index, renderCounter) {
  const code = pre.querySelector("code");
  const source = (code || pre).textContent;
  try {
    await mermaid.parse(source);
    const id = "chulapa-mermaid-" + index + "-" + renderCounter;
    const { svg } = await mermaid.render(id, source);
    const diagram = root.createElement("div");
    diagram.className = "chulapa-mermaid my-3";
    diagram.dataset.mermaidSource = source;
    setDiagramSvg(diagram, svg);
    pre.replaceWith(diagram);
    updateScrollFocus(diagram);
    return diagram;
  } catch (error) {
    console.warn("Unable to render Mermaid diagram", error);
  }
}

async function reRenderExisting(mermaid, root, renderCounter) {
  const diagrams = Array.from(root.querySelectorAll(".chulapa-mermaid")).filter(
    (node) => node && node.dataset && node.dataset.mermaidSource
  );
  if (!diagrams.length) return;

  for (const [index, diagram] of diagrams.entries()) {
    const source = diagram.dataset.mermaidSource;
    if (!source) continue;
    try {
      await mermaid.parse(source);
      const id = "chulapa-mermaid-r-" + index + "-" + renderCounter;
      const { svg } = await mermaid.render(id, source);
      setDiagramSvg(diagram, svg);
      updateScrollFocus(diagram);
    } catch (error) {
      console.warn("Unable to re-render Mermaid diagram", error);
    }
  }
}

/**
 * Render Mermaid diagrams under root.
 * @param {ParentNode} [root=document]
 * @param {() => Promise<any>} [load] Optional loader (for tests / offline)
 */
export async function renderDiagrams(
  root = document,
  load = () =>
    import(
      "https://cdn.jsdelivr.net/npm/mermaid@12.1.0/dist/mermaid.esm.min.mjs"
    )
) {
  const blocks = collectBlocks(root);
  if (!blocks.length) return;

  try {
    const mod = await load();
    const mermaid = mod.default || mod;
    if (root.fonts) await root.fonts.ready;

    const html = root.documentElement;
    let renderedTheme = html?.dataset.theme;
    applyMermaidConfig(mermaid);

    const resizeObserver = typeof ResizeObserver === "function" ?
      new ResizeObserver(entries => {
        for (const { target } of entries) updateScrollFocus(target);
      }) : null;

    // Local counter so concurrent / sequential test runs get unique IDs
    const renderCounter = Date.now() % 1e9;

    for (const [index, pre] of blocks.entries()) {
      const diagram = await renderOne(mermaid, root, pre, index, renderCounter);
      if (diagram) resizeObserver?.observe(diagram);
    }

    if (typeof MutationObserver === "function" && html) {
      let rendering = Promise.resolve();
      let reRenderCount = 0;
      // The selector updates data-theme after both stylesheets are active.
      // Serialize renders because Mermaid shares configuration across diagrams.
      function refreshTheme() {
        rendering = rendering.then(async () => {
          if (html.dataset.theme === renderedTheme) return;
          if (root.fonts) await root.fonts.ready;
          if (html.dataset.theme === renderedTheme) return;
          renderedTheme = html.dataset.theme;
          applyMermaidConfig(mermaid);
          reRenderCount += 1;
          await reRenderExisting(mermaid, root, renderCounter + reRenderCount);
        }).catch(error => console.warn("Mermaid theme re-render failed", error));
      }
      const observer = new MutationObserver(refreshTheme);
      observer.observe(html, {
        attributes: true,
        attributeFilter: ["data-theme"],
      });
      // Reconcile any change that landed during the initial render.
      refreshTheme();
      await rendering;
    }
  } catch (error) {
    console.warn("Unable to load Mermaid; diagram source is preserved", error);
  }
}

if (typeof document !== "undefined") {
  renderDiagrams();
}
