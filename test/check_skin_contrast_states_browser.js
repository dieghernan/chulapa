const sass = require("./browser/node_modules/sass"),
  fs = require("fs");
const { chromium } = require("./browser/node_modules/playwright");
const colors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
];
const root = require("path").resolve(__dirname, "..");
const baseline = require("./skin-contrast-passing-states.json");
const assert = require("node:assert/strict");
async function audit(sassRoot, page, session) {
  const output = {};
  for (const f of fs
    .readdirSync(sassRoot + "/skins")
    .filter((f) => f.endsWith(".scss") && f !== "dark-bg.scss")) {
    const skin = f.slice(0, -5);
    const css = sass
      .compileString(
        `@import "skins/${skin}"; @import "bootstrap/bootstrap"; @import "chulapa-master";`,
        { loadPaths: [sassRoot], logger: { warn() {} } },
      )
      .css.replace(/^@import[^\n]+$/gm, "");
    const html = colors
      .map(
        (k) =>
          `<p class="text-${k}" data-pair="text-${k}">${k}</p><button class="btn btn-${k}" data-pair="btn-${k}">${k}</button><button class="btn btn-outline-${k}" data-pair="outline-${k}">${k}</button>`,
      )
      .join("");
    await page.setContent(
      `<style>${css} * {transition:none!important}</style><main>${html}</main>`,
    );
    const {
      root: { nodeId },
    } = await session.send("DOM.getDocument");
    const { nodeIds } = await session.send("DOM.querySelectorAll", {
      nodeId,
      selector: "button",
    });
    output[skin] = {};
    for (const state of ["normal", "hover", "focus", "active"]) {
      for (const id of nodeIds)
        await session.send("CSS.forcePseudoState", {
          nodeId: id,
          forcedPseudoClasses:
            state === "normal"
              ? []
              : state === "active"
                ? ["hover", "active"]
                : [state],
        });
      const readings = await page.locator("[data-pair]").evaluateAll((els) => {
        const rgb = (v) => v.match(/[\d.]+/g).map(Number),
          lum = (c) =>
            c
              .slice(0, 3)
              .map((x) => x / 255)
              .map((x) =>
                x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4,
              )
              .reduce((a, x, i) => a + x * [0.2126, 0.7152, 0.0722][i], 0);
        return els.map((el) => {
          let bg = el;
          while (bg && rgb(getComputedStyle(bg).backgroundColor)[3] === 0)
            bg = bg.parentElement;
          const fg = rgb(getComputedStyle(el).color),
            back = rgb(getComputedStyle(bg).backgroundColor);
          const a = lum(fg),
            b = lum(back);
          return {
            key: el.dataset.pair,
            fg,
            bg: back,
            ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
          };
        });
      });
      for (const r of readings)
        if (state === "normal" || !r.key.startsWith("text-"))
          output[skin][r.key + "/" + state] = r;
    }
  }
  return output;
}
(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHULAPA_CHROMIUM,
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.route("**/*", (r) => r.abort());
    const session = await page.context().newCDPSession(page);
    await session.send("DOM.enable");
    await session.send("CSS.enable");
    let checked = 0;
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const after = await audit(root + "/_sass", page, session);
      for (const [skin, variants] of Object.entries(baseline.passingPairs)) {
        assert.ok(after[skin], `Missing skin ${skin}`);
        for (const [variant, states] of Object.entries(variants))
          for (const state of states) {
            const key = variant + "/" + state;
            assert.ok(
              after[skin][key].ratio >= 4.5,
              `${skin}/${width}/${key}: ${after[skin][key].ratio}`,
            );
            checked++;
          }
      }
    }
    console.log(
      `${checked} previously AA-passing foreground/button-state pairs retain 4.5:1 across both viewports.`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
