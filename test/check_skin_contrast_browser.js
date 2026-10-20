const sass = require("./browser/node_modules/sass"),
  fs = require("fs");
const { chromium } = require("./browser/node_modules/playwright");
const root = require("path").resolve(__dirname, ".."),
  keys = [
    "primary",
    "secondary",
    "success",
    "info",
    "warning",
    "danger",
    "light",
    "dark",
  ];
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHULAPA_CHROMIUM || "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();
  await page.route("**/*", (r) => r.abort());
  try {
    const results = [];
    const assert = require("node:assert/strict");
    for (const f of fs
      .readdirSync(root + "/_sass/skins")
      .filter((f) => f.endsWith(".scss") && f !== "dark-bg.scss")) {
      const skin = f.slice(0, -5);
      const src = fs.readFileSync(root + "/_sass/skins/" + f, "utf8");
      let css = sass
        .compileString(
          `@import "skins/${skin}"; @import "bootstrap/bootstrap"; @import "chulapa-master";`,
          { loadPaths: [root + "/_sass"], logger: { warn() {}, debug() {} } },
        )
        .css.replace(/^@import[^\n]+$/gm, "");
      const cards = [...src.matchAll(/\.card\.bg-([\w-]+)/g)].map((m) => m[1]);
      const content = keys
        .map(
          (k) =>
            `<button class="btn btn-${k}" data-key="${k}">Button ${k}</button> <span class="badge badge-${k}" data-key="${k}">Badge ${k}</span>${cards.includes(k) ? `<div class="card bg-${k}" data-key="${k}">Card ${k}</div>` : ""}`,
        )
        .join(" ");
      for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 900 });
        await page.setContent(
          `<style>${css}</style><main style="padding:16px">${content}</main>`,
        );
        const checks = await page.locator("[data-key]").evaluateAll((els) => {
          const rgb = (s) =>
            s
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number);
          const lum = (c) =>
            c
              .map((x) => x / 255)
              .map((x) =>
                x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4,
              )
              .reduce((s, x, i) => s + x * [0.2126, 0.7152, 0.0722][i], 0);
          return els.map((el) => {
            const s = getComputedStyle(el),
              a = lum(rgb(s.color)),
              b = lum(rgb(s.backgroundColor));
            return {
              key: el.dataset.key,
              kind: el.className,
              bg: rgb(s.backgroundColor),
              fg: rgb(s.color),
              ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
            };
          });
        });
        for (const c of checks)
          assert.ok(c.ratio >= 4.5, `${skin}/${width}/${c.kind}: ${c.ratio}`);
        results.push({ skin, width, checks });
      }
    }
    console.log(
      `${results.length} skin/viewport combinations: base buttons, badges and skin-defined cards pass 4.5:1.`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
