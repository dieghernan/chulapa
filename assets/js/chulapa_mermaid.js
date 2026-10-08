export async function renderDiagrams(root = document, load = () =>
  import("https://cdn.jsdelivr.net/npm/mermaid@12.1.0/dist/mermaid.esm.min.mjs")) {
  const blocks = Array.from(root.querySelectorAll("pre")).filter(pre =>
    pre.classList.contains("mermaid") || pre.closest(".language-mermaid") ||
    pre.querySelector("code.language-mermaid"));
  if (!blocks.length) return;
  try {
    const { default: mermaid } = await load();
    if (root.fonts) await root.fonts.ready;
    mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
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
