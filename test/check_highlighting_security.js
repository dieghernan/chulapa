// Run from the repository root: node --test test/check_highlighting_security.js
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const test = require("node:test");

function scriptFrom(file) {
  return fs.readFileSync(file, "utf8").match(/<script>([\s\S]*?)<\/script>/)[1];
}

const payload = '<img src=x onerror="alert(1)">';

test("custom preview keeps dropdown text literal and preserves YAML markup", () => {
  const selected = { value: "", text(value) { this.value = value; } };
  const config = { html(value) { this.value = value; } };
  const button = {};
  let click;
  const document = { getElementById() { return button; } };
  const context = {
    document,
    $(target) {
      if (target === document) return { ready(fn) { fn(); } };
      if (target === ".dropdown-menu a") return { click(fn) { click = fn; } };
      if (target === "#selected") return selected;
      if (target === "#config") return config;
      if (target && target.label) return { text() { return target.label; } };
      if (typeof target === "string" && target.startsWith("link[")) {
        return { remove() {} };
      }
      if (target === "<link>") {
        return { attr() { return this; }, appendTo() {} };
      }
      throw new Error(`Unexpected selector: ${target}`);
    }
  };
  vm.runInNewContext(scriptFrom("docs/_includes/custom/prev.html"), context);
  for (const label of ["github.dark", payload]) {
    click.call({ label });
    assert.equal(selected.value, '"' + label + '"');
    assert.equal(config.value, 'On your <code>_config.yml</code>');
    context.reaplyStyles(label);
    assert.equal(button.textContent, label);
    assert.equal(button.innerHTML, undefined);
  }
});

test("highlighting demo inserts selected styles as text", () => {
  const elements = Object.fromEntries(
    ["list", "count", "csshigh", "config", "selected", "dropdownMenuButton"]
      .map(id => [id, { children: [], appendChild(row) { this.children.push(row); } }])
  );
  const context = {
    document: {
      getElementById(id) { return elements[id]; },
      createElement() { return { classList: { add() {} }, setAttribute() {} }; }
    }
  };
  vm.runInNewContext(scriptFrom("docs/collections/_docs/99_highlighting.md"), context);
  assert.equal(elements.list.children.length, context.styles.length);
  assert.equal(elements.list.children[0].textContent, "abap");
  for (const name of ["github.dark", payload]) {
    context.reaplyStyles(name);
    assert.equal(elements.selected.textContent, name);
    assert.equal(elements.dropdownMenuButton.textContent, name);
    assert.equal(elements.selected.innerHTML, undefined);
    assert.equal(elements.dropdownMenuButton.innerHTML, undefined);
    assert.equal(elements.csshigh.href,
      `https://dieghernan.github.io/chulapa/assets/css/highlighter/${name}.css`);
  }
});
