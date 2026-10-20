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
    for (const [key, value] of Object.entries(colors))
      assert.ok(value.ratio >= 4.5, `${name}/${key}: ${value.ratio}`);
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
  `${out.length} palettes: all eight color-yiq text/background pairs meet 4.5:1.`,
);
// Independent checks of luminance accuracy, preference, explicit candidates,
// fallback and the legacy behavior for translucent backgrounds.
const css = sass.compileString(
  `@import "bootstrap/functions"; @import "bootstrap/variables";
.audit {
@for $i from 0 through 255 { --l-#{$i}: #{chulapa-luminance(rgb($i,$i,$i))}; }
--preferred: #{color-yiq(#fff, #123456, #fff)};
--alternate: #{color-yiq(#ff0, #222, #fff)};
--fallback: #{color-yiq(#777, #888, #999)};
--alpha: #{color-yiq(rgba(255,255,255,.5), #123456, #fff)};
}`,
  { loadPaths: [root], logger: { warn() {} } },
).css;
for (let i = 0; i < 256; i++)
  assert.ok(
    Math.abs(
      Number(css.match(new RegExp("--l-" + i + ": ([^;]+)"))[1]) -
        lum([i, i, i]),
    ) < 1e-8,
  );
for (const [key, color] of Object.entries({
  preferred: "#123456",
  alternate: "#222",
  fallback: "#000",
  alpha: "#123456",
}))
  assert.ok(css.includes(`--${key}: ${color};`), key);
console.log(
  "256 grayscale luminance checks and preference/fallback/alpha cases passed.",
);
