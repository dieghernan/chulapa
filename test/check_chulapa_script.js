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
    classList: { add() {}, remove() {}, contains() { return false; } },
    getAttribute(name) { return this.attributes[name]; },
    removeAttribute(name) { delete this.attributes[name]; },
    closest() { return null; },
    querySelector() { return this.firstChild; },
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

function floatingNavigation() {
  const handlers = { button: {}, menu: {}, window: {} };
  const button = element("button");
  const menu = element("nav");
  const link = element("a");
  const document = {
    activeElement: null,
    getElementById(id) { return { "navi-toggle": button, "navi-menu": menu }[id] || null; },
    createElement: element
  };
  button.setAttribute("aria-expanded", "false");
  button.focus = () => { document.activeElement = button; };
  link.focus = () => { document.activeElement = link; };
  menu.querySelector = () => link;
  menu.contains = target => target === link;
  button.getClientRects = () => [1];
  button.addEventListener = (name, handler) => { handlers.button[name] = handler; };
  menu.addEventListener = (name, handler) => { handlers.menu[name] = handler; };
  vm.runInNewContext(script, {
    document,
    window: { addEventListener(name, handler) { handlers.window[name] = handler; } },
    setTimeout(callback) { callback(); },
    $(value) { if (typeof value === "function") value(); return { tooltip() {} }; }
  });
  return { handlers, button, menu, link, document };
}

test("floating navigation opens, focuses its first link and closes on another click", () => {
  const { handlers, button, menu, link, document } = floatingNavigation();
  handlers.button.click();
  assert.equal(button.attributes["aria-expanded"], "true");
  assert.equal(menu.attributes["aria-hidden"], "false");
  assert.equal(menu.inert, false);
  assert.equal(document.activeElement, link);
  handlers.button.click();
  assert.equal(button.attributes["aria-expanded"], "false");
  assert.equal(menu.attributes["aria-hidden"], "true");
  assert.equal(menu.inert, true);
  assert.equal(document.activeElement, button);
});

for (const target of ["button", "menu"]) {
  test(`Escape on the floating ${target} closes navigation and restores focus`, () => {
    const { handlers, button, menu, document } = floatingNavigation();
    handlers.button.click();
    const prevented = [];
    handlers[target].keydown({ key: "Escape", preventDefault() { prevented.push("default"); }, stopPropagation() { prevented.push("propagation"); } });
    assert.equal(menu.inert, true);
    assert.equal(button.attributes["aria-expanded"], "false");
    assert.equal(document.activeElement, button);
    if (target === "menu") assert.deepEqual(prevented, ["default", "propagation"]);
  });
}

test("dropdown clicks and internal focus keep the menu open; leaving closes without stealing focus", () => {
  const { handlers, button, menu, link, document } = floatingNavigation();
  handlers.button.click();
  handlers.menu.click({ target: { closest() { return { hasAttribute() { return true; } }; } } });
  handlers.menu.focusout();
  assert.equal(menu.inert, false);
  assert.equal(document.activeElement, link);
  const outside = element("input");
  document.activeElement = outside;
  handlers.menu.focusout();
  assert.equal(menu.inert, true);
  assert.equal(button.attributes["aria-expanded"], "false");
  assert.equal(document.activeElement, outside);
});

test("ordinary navigation links close the menu, and a hidden toggle clears the open state", () => {
  const { handlers, button, menu, document } = floatingNavigation();
  handlers.button.click();
  handlers.menu.click({ target: { closest() { return { hasAttribute() { return false; } }; } } });
  assert.equal(menu.inert, true);
  assert.equal(document.activeElement, button);
  handlers.button.click();
  button.getClientRects = () => [];
  const outside = element("input");
  document.activeElement = outside;
  handlers.window.resize();
  assert.equal(menu.inert, true);
  assert.equal(document.activeElement, outside);
});

function clipboardContext(writeText) {
  const button = element("button");
  const calls = [];
  const trigger = {
    tooltip() { return this; },
    attr(name, value) { calls.push(value); return this; }
  };
  const context = {
    document: {
      getElementById(id) {
        if (id === "clipboard_btn0") return button;
        if (id === "clipboard_code0") return { textContent: "a < b & c\n" };
        return null;
      },
      createElement: element
    },
    navigator: { clipboard: writeText ? { writeText } : undefined },
    $(value) { if (typeof value === "function") value(); return trigger; },
    setTimeout() {}
  };
  vm.runInNewContext(script, context);
  return { context, button, calls };
}

test("copy waits for one clipboard write before reporting success", async () => {
  let resolve;
  const writes = [];
  const { context, button, calls } = clipboardContext(text => {
    writes.push(text);
    return new Promise(done => { resolve = done; });
  });
  const copying = context.ch_copy_cliboard(0)();
  assert.deepEqual(writes, ["a < b & c\n"]);
  assert.equal(button.disabled, true);
  assert.deepEqual(calls, []);
  resolve();
  await copying;
  assert.equal(button.disabled, false);
  assert.deepEqual(calls, ["Copied!"]);
});

for (const [name, write] of [
  ["rejected permission", () => Promise.reject(new Error("denied"))],
  ["unavailable API", undefined]
]) {
  test("copy reports failure for " + name, async () => {
    const { context, button, calls } = clipboardContext(write);
    await context.ch_copy_cliboard(0)();
    assert.equal(button.disabled, false);
    assert.deepEqual(calls, ["Unable to copy code"]);
  });
}
