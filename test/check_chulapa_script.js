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
  const classes = new Set();
  return {
    tagName,
    children: [],
    attributes: {},
    classList: {
      add(...names) { names.forEach(name => classes.add(name)); },
      remove(...names) { names.forEach(name => classes.delete(name)); },
      contains(name) { return classes.has(name); }
    },
    getAttribute(name) { return this.attributes[name]; },
    removeAttribute(name) { delete this.attributes[name]; },
    closest() { return null; },
    querySelector() { return this.firstChild; },
    setAttribute(name, value) { this.attributes[name] = value; },
    append(...children) { this.children.push(...children); },
    prepend(child) { this.children.unshift(child); }
  };
}

function run(main, body = null) {
  let tooltipCalls = 0;
  const logs = [];
  const context = {
    console: { log(message) { logs.push(message); } },
    document: {
      getElementById(id) { return { maincontent: main, body }[id] || null; },
      createElement: element
    },
    $(value) {
      if (typeof value === "function") { value(); }
      return { tooltip() { tooltipCalls++; } };
    }
  };
  vm.runInNewContext(script, context);
  return { tooltipCalls, logs };
}

test("minimal page without maincontent still initializes tooltips", () => {
  assert.equal(run(null).tooltipCalls, 1);
});

test("empty maincontent still initializes tooltips", () => {
  assert.equal(run({ querySelectorAll() { return []; } }).tooltipCalls, 1);
});

test("maincontent retains heading permalinks and code copy buttons", () => {
  const heading = element("h2");
  heading.id = "example";
  const code = element("code");
  const pre = element("pre");
  pre.firstChild = code;
  const result = run({
    querySelectorAll(selector) { return selector === "pre" ? [pre] : [heading]; }
  });
  assert.equal(result.tooltipCalls, 1);
  assert.equal(heading.children[0].href, "#example");
  assert.equal(heading.children[0].children[0].innerHTML, "Permalink");
  assert.equal(code.attributes.id, "clipboard_code0");
  assert.equal(pre.children[0].id, "clipboard_btn0");
  assert.equal(pre.children[0].attributes["aria-label"], "Copy code to clipboard");
  assert.equal(typeof pre.children[0].onclick, "function");
});

test("headings without IDs and preformatted text without code remain unchanged", () => {
  const heading = element("h2");
  heading.innerHTML = "Heading without ID";
  const pre = element("pre");
  pre.innerHTML = "Plain preformatted text";
  const result = run({ querySelectorAll(selector) { return selector === "pre" ? [pre] : [heading]; } });
  assert.deepEqual(heading.children, []);
  assert.deepEqual(pre.children, []);
  assert.equal(result.tooltipCalls, 1);
});

for (const marker of ["native", "wrapper", "code"]) {
  for (const enabled of [true, false]) {
    test(`${marker} Mermaid block ${enabled ? "is preserved for rendering" : "receives a copy button when disabled"}`, () => {
      const body = element("body");
      body.setAttribute("data-mermaid", String(enabled));
      const pre = element("pre");
      const code = element("code");
      pre.firstChild = code;
      if (marker === "native") pre.classList.add("mermaid");
      if (marker === "wrapper") pre.closest = selector => selector === ".language-mermaid" ? {} : null;
      if (marker === "code") code.classList.add("language-mermaid");
      run({ querySelectorAll(selector) { return selector === "pre" ? [pre] : []; } }, body);
      assert.equal(pre.children.length, enabled ? 0 : 1);
      assert.equal(code.children.length, enabled ? 0 : 1);
      assert.equal(code.getAttribute("id"), enabled ? undefined : "clipboard_code0");
    });
  }
}

test("highlighted blocks keep their code untouched and get distinct copy targets", () => {
  const blocks = [element("pre"), element("pre")];
  const codes = [element("code"), element("code")];
  blocks.forEach((pre, index) => { pre.classList.add("highlight"); pre.firstChild = codes[index]; });
  run({ querySelectorAll(selector) { return selector === "pre" ? blocks : []; } });
  assert.deepEqual(codes.map(code => code.children), [[], []]);
  assert.deepEqual(codes.map(code => code.getAttribute("id")), ["clipboard_code0", "clipboard_code1"]);
  assert.deepEqual(blocks.map(pre => pre.children[0].id), ["clipboard_btn0", "clipboard_btn1"]);
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
  button.classList.add("text-muted");
  button.setAttribute("aria-label", "Copy code to clipboard");
  const calls = [];
  const timers = [];
  const trigger = {
    tooltip() { return this; },
    attr(name, value) { calls.push(value); button.setAttribute(name, value); return this; }
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
    setTimeout(callback, delay) { timers.push({ callback, delay }); }
  };
  vm.runInNewContext(script, context);
  return { context, button, calls, timers };
}

for (const [name, write, message, style] of [
  ["success", async () => {}, "Copied!", "text-success"],
  ["failure", async () => { throw new Error("denied"); }, "Unable to copy code", "text-danger"]
]) {
  test(`copy ${name} announces the result and restores its accessible label and style`, async () => {
    const { context, button, timers } = clipboardContext(write);
    await context.ch_copy_cliboard(0)();
    assert.equal(button.getAttribute("aria-label"), message);
    assert.equal(button.getAttribute("data-original-title"), message);
    assert.equal(button.classList.contains(style), true);
    assert.equal(button.classList.contains("text-muted"), false);
    assert.deepEqual(timers.map(timer => timer.delay), [1000, 1000]);
    timers.forEach(timer => timer.callback());
    await Promise.resolve();
    assert.equal(button.getAttribute("aria-label"), "Copy code to clipboard");
    assert.equal(button.getAttribute("data-original-title"), undefined);
    assert.equal(button.classList.contains(style), false);
    assert.equal(button.classList.contains("text-muted"), true);
  });
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

function readingPosition() {
  const first = element("h2");
  first.id = "café";
  first.top = 400;
  const excluded = element("h5");
  excluded.id = "excluded";
  excluded.top = 600;
  const last = element("h2");
  last.id = "last";
  last.top = 900;
  const headings = [first, excluded, last];
  headings.forEach(heading => { heading.getBoundingClientRect = () => ({ top: heading.top }); });
  const link = href => { const node = element("a"); node.setAttribute("href", href); return node; };
  const invalid = link("#%ZZ");
  const missing = link("#missing");
  const inline = [link("#last"), invalid, link("#caf%C3%A9"), missing];
  const markdown = [link("#caf%C3%A9"), link("#excluded"), link("#last")];
  const main = { querySelectorAll(selector) { return selector === "pre" ? [] : headings; } };
  const nodes = { maincontent: main, toc: {querySelectorAll: () => inline}, "markdown-toc": {querySelectorAll: () => markdown} };
  headings.forEach(heading => { nodes[heading.id] = heading; });
  const frames = [];
  const listeners = {};
  let resized;
  const context = {
    console: { log() {} },
    document: { getElementById: id => nodes[id] || null, createElement: element, documentElement: {scrollHeight: 3000} },
    window: {
      innerHeight: 800, scrollY: 0,
      addEventListener(type, callback) { listeners[type] = callback; },
      requestAnimationFrame(callback) { frames.push(callback); },
      ResizeObserver: function(callback) { resized = callback; this.observe = node => assert.equal(node, main); }
    },
    $() { return {tooltip() {}}; }
  };
  vm.runInNewContext(script, context);
  return {headings, inline, markdown, invalid, missing, frames, listeners, context, resized,
    flush() { while (frames.length) frames.shift()(); },
    active(links) { return links.filter(link => link.getAttribute("aria-current") === "location").map(link => link.getAttribute("href")); }
  };
}

test("TOCs follow document order, decode IDs and ignore broken anchors", () => {
  const fixture = readingPosition();
  assert.deepEqual(fixture.active(fixture.inline), []);
  fixture.headings[0].top = -200;
  fixture.headings[1].top = 80;
  fixture.listeners.scroll();
  fixture.listeners.scroll();
  assert.equal(fixture.frames.length, 1, "Scroll events are coalesced into one frame");
  fixture.flush();
  assert.deepEqual(fixture.active(fixture.inline), ["#caf%C3%A9"], "Excluded heading keeps its parent section current");
  assert.deepEqual(fixture.active(fixture.markdown), ["#excluded"], "Each TOC follows its own heading selection");
  assert.equal(fixture.invalid.getAttribute("aria-current"), undefined);
  assert.equal(fixture.missing.getAttribute("aria-current"), undefined);
  fixture.headings[2].top = 80;
  fixture.listeners.hashchange();
  fixture.flush();
  assert.deepEqual(fixture.active(fixture.inline), ["#last"]);
  assert.equal(fixture.inline[0].classList.contains("chulapa-toc-active"), true);
});

test("TOCs update on reflow, viewport resize and restored scroll position", () => {
  const fixture = readingPosition();
  fixture.headings[0].top = 80;
  fixture.resized();
  fixture.flush();
  assert.deepEqual(fixture.active(fixture.inline), ["#caf%C3%A9"]);
  fixture.context.window.innerHeight = 200; // Reading line moves from 120 to 50px.
  fixture.listeners.resize();
  fixture.flush();
  assert.deepEqual(fixture.active(fixture.inline), []);
  fixture.context.window.scrollY = 2800;
  fixture.listeners.load();
  fixture.flush();
  assert.deepEqual(fixture.active(fixture.inline), ["#last"], "Short final section is current at the bottom");
});
