const sass = require("./browser/node_modules/sass"),
  fs = require("fs");
const root = require("path").resolve(__dirname, "../_sass");
const assert = require("node:assert/strict");
const lum = (c) =>
  c
    .map((x) => x / 255)
    .map((x) => (x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
    .reduce((a, x, i) => a + x * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) =>
  (Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05);
// Run from the repository root after npm ci --prefix test/browser.
// The WCAG calculation here is independent of Sass and checks the stock YIQ output.
const identity = require("./skin-contrast-identity.json");
let knownFailures = 0;
let out = [];
for (const file of fs
  .readdirSync(root + "/skins")
  .filter((x) => x.endsWith(".scss") && x !== "dark-bg.scss")) {
  const name = file.slice(0, -5);
  const src = `@import "skins/${name}"; @import "bootstrap/functions"; @import "bootstrap/variables"; .audit { threshold: #{$yiq-contrasted-threshold}; @each $n,$c in $theme-colors { --#{$n}: #{red($c)},#{green($c)},#{blue($c)}; --#{$n}-text: #{red(color-yiq($c))},#{green(color-yiq($c))},#{blue(color-yiq($c))}; } --dt: #{red($yiq-text-dark)},#{green($yiq-text-dark)},#{blue($yiq-text-dark)}; --lt: #{red($yiq-text-light)},#{green($yiq-text-light)},#{blue($yiq-text-light)}; }`;
  try {
    let css = sass.compileString(src, {
      loadPaths: [root],
      logger: { warn() {}, debug() {} },
    }).css;
    let block = css.slice(css.lastIndexOf(".audit"));
    const get = (k) =>
      block
        .match(new RegExp("--" + k + ": ([^;]+)"))[1]
        .split(",")
        .map(Number);
    let colors = {};
    for (const k of [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ]) {
      const bg = get(k),
        fg = get(k + "-text");
      colors[k] = {
        bg,
        fg,
        ratio: ratio(bg, fg),
        alternative: Math.max(ratio(bg, get("dt")), ratio(bg, get("lt"))),
      };
    }
    const primaryHex =
      "#" +
      colors.primary.bg
        .map((x) => Math.round(x).toString(16).padStart(2, "0"))
        .join("");
    assert.equal(
      primaryHex,
      identity.primaryColors[name],
      `${name}: preserve the original primary`,
    );
    for (const [key, value] of Object.entries(colors)) {
      const minimum = identity.baseExceptions[`${name}/${key}`] ?? 4.5;
      assert.ok(
        value.ratio >= minimum,
        `${name}/${key}: ${value.ratio}; minimum ${minimum}`,
      );
      if (value.ratio < 4.5) knownFailures++;
    }
    out.push({
      name,
      threshold: +block.match(/threshold: ([^;]+)/)[1],
      colors,
    });
  } catch (e) {
    out.push({ name, error: e.message });
  }
}
assert.equal(
  out.filter((s) => s.error).length,
  0,
  JSON.stringify(out.filter((s) => s.error)),
);
console.log(
  `${out.length} original primary colors preserved; ${knownFailures} known base pairs remain below 4.5:1, with no degradation from their recorded original contrast.`,
);
