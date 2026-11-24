import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
const source = readFileSync(new URL("../assets/js/chulapa_mermaid.js", import.meta.url), "utf8");
const { renderDiagrams } = await import("data:text/javascript;base64," + Buffer.from(source).toString("base64"));

function fixture(sources) {
  const blocks = sources.map(textContent => ({
    textContent,
    closest: () => null,
    classList: { contains: () => false },
    querySelector: () => ({ textContent }),
    replaceWith(node) { this.replacement = node; }
  }));
  return {
    blocks,
    // Only return blocks for "pre" queries; empty for rendered-diagram queries
    querySelectorAll: (selector) => {
      if (typeof selector === "string" && selector.includes("chulapa-mermaid")) {
        return blocks
          .map(block => block.replacement)
          .filter(node => node && node.dataset && node.dataset.mermaidSource);
      }
      return blocks;
    },
    createElement: () => ({
      dataset: {},
      className: "",
      innerHTML: "",
      querySelector: () => null,
      removeAttribute() {}
    })
  };
}

function baseMermaid(overrides = {}) {
  return {
    initialize() {},
    async parse() {},
    async render(id, text) {
      return { svg: "<svg></svg>" };
    },
    ...overrides
  };
}

test("no diagram means no library request", async () => {
  await renderDiagrams(fixture([]), () => assert.fail("unexpected import"));
});

test("ordinary code remains unchanged without a library request", async () => {
  const root = fixture(["const x = 1;"]);
  root.blocks[0].querySelector = () => null;
  await renderDiagrams(root, () => assert.fail("unexpected import"));
  assert.equal(root.blocks[0].replacement, undefined);
});

test("recognizes native blocks and Rouge language wrappers", async () => {
  const root = fixture(["flowchart LR\nA-->B", "flowchart TD\nC-->D"]);
  root.blocks[0].classList.contains = name => name === "mermaid";
  root.blocks[0].querySelector = () => null;
  root.blocks[1].closest = () => ({});
  root.blocks[1].querySelector = selector => selector === "code" ?
    { textContent: root.blocks[1].textContent } : null;
  const rendered = [];
  await renderDiagrams(root, async () => ({ default: baseMermaid({
    async render(id, text) { rendered.push(text); return { svg: "<svg></svg>" }; }
  }) }));
  assert.deepEqual(rendered, ["flowchart LR\nA-->B", "flowchart TD\nC-->D"]);
});

test("renders multiple diagrams with distinct IDs and strict mode", async () => {
  const root = fixture(["flowchart LR\nA-->B", "sequenceDiagram\nA->>B: Hello"]);
  const ids = [];
  await renderDiagrams(root, async () => ({ default: {
    initialize(options) {
      assert.equal(options.startOnLoad, false);
      assert.equal(options.securityLevel, "strict");
      assert.equal(options.theme, "base");
      assert.equal(options.look, "classic");
      assert.equal(typeof options.themeVariables, "object");
      assert.equal(typeof options.themeCSS, "string");
    },
    async parse() {},
    async render(id) { ids.push(id); return { svg: "<svg></svg>" }; }
  } }));
  assert.equal(new Set(ids).size, 2);
  for (const block of root.blocks) {
    assert.equal(block.replacement.innerHTML, "<svg></svg>");
    assert.ok(block.replacement.dataset.mermaidSource);
  }
});

test("bad syntax preserves source and does not stop later diagrams", async t => {
  const warnings = t.mock.method(console, "warn", () => {});
  const root = fixture(["invalid", "valid"]);
  await renderDiagrams(root, async () => ({ default: baseMermaid({
    async parse(source) { if (source === "invalid") throw new Error("syntax"); }
  }) }));
  assert.equal(root.blocks[0].replacement, undefined);
  assert.equal(root.blocks[1].replacement.innerHTML, "<svg></svg>");
  assert.equal(warnings.mock.calls.length, 1);
});

test("failed CDN request preserves all diagram sources", async t => {
  const warnings = t.mock.method(console, "warn", () => {});
  const root = fixture(["flowchart LR\nA-->B", "flowchart TD\nC-->D"]);
  await renderDiagrams(root, async () => { throw new Error("offline"); });
  assert.deepEqual(root.blocks.map(block => block.replacement), [undefined, undefined]);
  assert.equal(warnings.mock.calls.length, 1);
});

test("render failure preserves the failed source and still renders the next diagram", async t => {
  t.mock.method(console, "warn", () => {});
  const root = fixture(["first diagram", "second diagram"]);
  const rendered = [];
  await renderDiagrams(root, async () => ({ default: baseMermaid({
    async render(id, text) {
      rendered.push(text);
      if (text === "first diagram") throw new Error("render failed");
      return { svg: "<svg>second diagram</svg>" };
    }
  }) }));
  assert.deepEqual(rendered, ["first diagram", "second diagram"]);
  assert.equal(root.blocks[0].textContent, "first diagram");
  assert.equal(root.blocks[0].replacement, undefined);
  assert.equal(root.blocks[1].replacement.innerHTML, "<svg>second diagram</svg>");
});

test("waits for fonts before measuring and rendering diagrams", async () => {
  const root = fixture(["flowchart LR\nA-->B"]);
  let ready;
  root.fonts = { ready: new Promise(resolve => { ready = resolve; }) };
  const calls = [];
  const rendering = renderDiagrams(root, async () => ({ default: baseMermaid({
    initialize() { calls.push("initialize"); },
    async parse() { calls.push("parse"); },
    async render() { calls.push("render"); return { svg: "<svg></svg>" }; }
  }) }));
  await Promise.resolve();
  assert.deepEqual(calls, []);
  assert.equal(root.blocks[0].replacement, undefined);
  ready();
  await rendering;
  assert.deepEqual(calls, ["initialize", "parse", "render"]);
  assert.equal(root.blocks[0].replacement.innerHTML, "<svg></svg>");
});

test("initialize uses base theme and skin-derived themeVariables", async () => {
  const root = fixture(["flowchart LR\nA-->B"]);
  let options;
  await renderDiagrams(root, async () => ({ default: baseMermaid({
    initialize(opts) { options = opts; }
  }) }));
  assert.equal(options.theme, "base");
  assert.equal(options.look, "classic");
  assert.equal(options.themeVariables.primaryColor, "#ffffff");
  assert.equal(options.themeVariables.primaryTextColor, "#212529");
  assert.match(options.themeCSS, /chulapa-mermaid-bg/);
});

test("uses a distinct text color for each diagram surface", async t => {
  const values = {
    "--chulapa-mermaid-color": "#313131",
    "--chulapa-mermaid-node-text": "#222222",
    "--chulapa-mermaid-muted-text": "#333333"
  };
  globalThis.getComputedStyle = () => ({ getPropertyValue: name => values[name] ?? "" });
  globalThis.document = { documentElement: {} };
  t.after(() => {
    delete globalThis.getComputedStyle;
    delete globalThis.document;
  });
  let options;
  await renderDiagrams(fixture(["flowchart LR\nA-->B"]), async () => ({
    default: baseMermaid({ initialize(value) { options = value; } })
  }));
  assert.equal(options.themeVariables.signalTextColor, "#313131");
  assert.equal(options.themeVariables.actorTextColor, "#222222");
  assert.equal(options.themeVariables.nodeTextColor, "#222222");
  assert.equal(options.themeVariables.noteTextColor, "#333333");
  assert.equal(options.themeVariables.labelTextColor, "#333333");
  assert.match(options.themeCSS, /\.cluster-label p[^{]*\{[^}]*--chulapa-mermaid-muted-text/);
});

test("keeps the diagram at its viewBox width and makes overflow focusable", async () => {
  const root = fixture(["sequenceDiagram\nA->>B: Hello"]);
  const diagram = root.createElement();
  let width;
  diagram.querySelector = () => ({
    viewBox: { baseVal: { width: 720 } },
    setAttribute(name, value) { if (name === "width") width = value; }
  });
  diagram.scrollWidth = 720;
  diagram.clientWidth = 390;
  root.createElement = () => diagram;

  await renderDiagrams(root, async () => ({ default: baseMermaid() }));

  assert.equal(width, 720);
  assert.equal(diagram.tabIndex, 0);
});

test("reconciles a skin change during initial rendering", async t => {
  globalThis.MutationObserver = class { observe() {} };
  t.after(() => { delete globalThis.MutationObserver; });
  const root = fixture(["flowchart LR\nA-->B", "flowchart LR\nA-->C"]);
  root.documentElement = { dataset: { theme: "light" } };
  const rendered = [];
  let theme;

  await renderDiagrams(root, async () => ({ default: baseMermaid({
    initialize() { theme = root.documentElement.dataset.theme; },
    async render(id) {
      rendered.push(theme);
      root.documentElement.dataset.theme = "dark";
      return { svg: `<svg data-skin="${theme}"></svg>` };
    }
  }) }));

  assert.deepEqual(rendered, ["light", "light", "dark", "dark"]);
  for (const block of root.blocks) {
    assert.equal(block.replacement.innerHTML, '<svg data-skin="dark"></svg>');
  }
});
