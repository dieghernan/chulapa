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
    querySelectorAll: () => blocks,
    createElement: () => ({ style: {} })
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
  await renderDiagrams(root, async () => ({ default: {
    initialize() {},
    async parse() {},
    async render(id, text) { rendered.push(text); return { svg: "<svg></svg>" }; }
  } }));
  assert.deepEqual(rendered, ["flowchart LR\nA-->B", "flowchart TD\nC-->D"]);
});

test("renders multiple diagrams with distinct IDs and strict mode", async () => {
  const root = fixture(["flowchart LR\nA-->B", "sequenceDiagram\nA->>B: Hello"]);
  const ids = [];
  await renderDiagrams(root, async () => ({ default: {
    initialize(options) {
      assert.deepEqual(options, { startOnLoad: false, securityLevel: "strict" });
    },
    async parse() {},
    async render(id) { ids.push(id); return { svg: "<svg></svg>" }; }
  } }));
  assert.equal(new Set(ids).size, 2);
  for (const block of root.blocks) {
    assert.equal(block.replacement.innerHTML, "<svg></svg>");
    assert.equal(block.replacement.style.overflowX, "auto");
  }
});

test("bad syntax preserves source and does not stop later diagrams", async t => {
  const warnings = t.mock.method(console, "warn", () => {});
  const root = fixture(["invalid", "valid"]);
  await renderDiagrams(root, async () => ({ default: {
    initialize() {},
    async parse(source) { if (source === "invalid") throw new Error("syntax"); },
    async render() { return { svg: "<svg></svg>" }; }
  } }));
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
  await renderDiagrams(root, async () => ({ default: {
    initialize() {},
    async parse() {},
    async render(id, text) {
      rendered.push(text);
      if (text === "first diagram") throw new Error("render failed");
      return { svg: "<svg>second diagram</svg>" };
    }
  } }));
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
  const rendering = renderDiagrams(root, async () => ({ default: {
    initialize() { calls.push("initialize"); },
    async parse() { calls.push("parse"); },
    async render() { calls.push("render"); return { svg: "<svg></svg>" }; }
  } }));
  await Promise.resolve();
  assert.deepEqual(calls, []);
  assert.equal(root.blocks[0].replacement, undefined);
  ready();
  await rendering;
  assert.deepEqual(calls, ["initialize", "parse", "render"]);
  assert.equal(root.blocks[0].replacement.innerHTML, "<svg></svg>");
});
