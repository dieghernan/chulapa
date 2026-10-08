// Run from the repository root with: node --test test/check_chulapa_script.js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const test = require("node:test");

const script = fs.readFileSync(
  path.join(__dirname, "../assets/js/chulapa_script.js"), "utf8"
);

function element(tagName) {
  return {
    tagName,
    children: [],
    attributes: {},
    classList: { add() {}, contains() { return true; } },
    setAttribute(name, value) { this.attributes[name] = value; },
    append(...children) { this.children.push(...children); },
    prepend(child) { this.children.unshift(child); }
  };
}

function run(main) {
  let tooltipCalls = 0;
  const context = {
    document: {
      getElementById(id) { return id === "maincontent" ? main : null; },
      createElement: element
    },
    $(value) {
      if (typeof value === "function") { value(); }
      return { tooltip() { tooltipCalls++; } };
    }
  };
  vm.runInNewContext(script, context);
  assert.equal(tooltipCalls, 1);
}

test("minimal page without maincontent still initializes tooltips", () => {
  run(null);
});

test("empty maincontent still initializes tooltips", () => {
  run({ querySelectorAll() { return []; } });
});

test("maincontent retains heading permalinks and code copy buttons", () => {
  const heading = element("h2");
  heading.id = "example";
  const code = element("code");
  const pre = element("pre");
  pre.firstChild = code;
  run({
    querySelectorAll(selector) { return selector === "pre" ? [pre] : [heading]; }
  });
  assert.equal(heading.children[0].href, "#example");
  assert.equal(heading.children[0].children[0].innerHTML, "Permalink");
  assert.equal(code.attributes.id, "clipboard_code0");
  assert.equal(pre.children[0].id, "clipboard_btn0");
  assert.equal(pre.children[0].attributes["aria-label"], "Copy code to clipboard");
  assert.equal(typeof pre.children[0].onclick, "function");
});
