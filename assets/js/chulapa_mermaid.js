const themeCSS = `
  /* Typography */
  & {
    font-family: var(--chulapa-mermaid-font-family);
    color: var(--chulapa-mermaid-color);
  }

  /* Flowcharts */

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: var(--chulapa-mermaid-node-bg);
    stroke: var(--chulapa-mermaid-node-border);
  }

  .nodeLabel,
  .label,
  .edgeLabel {
    color: var(--chulapa-mermaid-color);
  }

  .flowchart-link {
    stroke: var(--chulapa-mermaid-line);
  }

  .marker {
    fill: var(--chulapa-mermaid-line);
    stroke: var(--chulapa-mermaid-line);
  }

  .edgeLabel {
    background-color: var(--chulapa-mermaid-bg);
  }

  .edgeLabel p {
    background-color: var(--chulapa-mermaid-bg);
  }

  .cluster rect {
    fill: var(--chulapa-mermaid-muted-bg);
    stroke: var(--chulapa-mermaid-muted-border);
  }

  .cluster-label text {
    fill: var(--chulapa-mermaid-color);
  }

  /* Sequence diagrams */

  .actor {
    fill: var(--chulapa-mermaid-node-bg);
    stroke: var(--chulapa-mermaid-node-border);
  }

  text.actor,
  .messageText,
  .loopText,
  .labelText {
    fill: var(--chulapa-mermaid-color);
  }

  .actor-line,
  .messageLine0,
  .messageLine1,
  .loopLine {
    stroke: var(--chulapa-mermaid-line);
  }

  .labelBox,
  .note {
    fill: var(--chulapa-mermaid-muted-bg);
    stroke: var(--chulapa-mermaid-muted-border);
  }

  .noteText {
    fill: var(--chulapa-mermaid-color);
  }
`;

export async function renderDiagrams(root = document, load = () =>
  import("https://cdn.jsdelivr.net/npm/mermaid@12.1.0/dist/mermaid.esm.min.mjs")) {
  const blocks = Array.from(root.querySelectorAll("pre")).filter(pre =>
    pre.classList.contains("mermaid") || pre.closest(".language-mermaid") ||
    pre.querySelector("code.language-mermaid"));
  if (!blocks.length) return;
  try {
    const { default: mermaid } = await load();
    if (root.fonts) await root.fonts.ready;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "strict",
      theme: "base",
      themeCSS
    });

    for (const [index, pre] of blocks.entries()) {
      const code = pre.querySelector("code");
      try {
        await mermaid.parse((code || pre).textContent);
        const { svg } = await mermaid.render("chulapa-mermaid-" + index,
          (code || pre).textContent);
        const diagram = root.createElement("div");
        diagram.className = "chulapa-mermaid my-3";
        diagram.style.overflowX = "auto";
        diagram.innerHTML = svg;
        pre.replaceWith(diagram);
      } catch (error) {
        console.warn("Unable to render Mermaid diagram", error);
      }
    }
  } catch (error) {
    console.warn("Unable to load Mermaid; diagram source is preserved", error);
  }
}

if (typeof document !== "undefined") renderDiagrams();