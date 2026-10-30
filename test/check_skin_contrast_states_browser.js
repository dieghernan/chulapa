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
const identity = require("./skin-contrast-identity.json");
const assert = require("node:assert/strict");
const authoredCatalog = fs.readdirSync(root + "/docs/collections/_skins")
  .filter(name => name.endsWith(".md"))
  .filter(name => /^skin_author:\s*dieghernan\s*$/m.test(fs.readFileSync(root + "/docs/collections/_skins/" + name, "utf8")))
  .map(name => name.slice(0, -3)).sort();
assert.deepEqual([...identity.authoredButtonSkins].sort(), authoredCatalog,
  "Cover all original dieghernan skins, without including adaptations");
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
          `<p class="text-${k}" data-pair="text-${k}">${k}</p><button class="btn btn-${k}" data-pair="btn-${k}">${k}</button><button class="btn btn-outline-${k}" data-pair="outline-${k}">${k}</button><button disabled class="btn btn-${k}" data-pair="disabled-${k}">${k}</button><button class="btn btn-${k} focus" data-pair="class-focus-${k}">${k}</button><button class="btn btn-${k} active" data-pair="class-active-${k}">${k}</button><div class="show"><button class="btn btn-${k} dropdown-toggle" data-pair="dropdown-${k}">${k}</button></div><a href="#target" class="badge badge-${k}" data-pair="linked-badge-${k}">${k}</a>`,
      )
      .join("") + '<a href="#target" class="badge chulapa-pill-bg-primary" data-pair="pill-primary">journal</a><a href="#target" class="badge chulapa-pill-bg-secondary" data-pair="pill-secondary">Journal</a>';
    await page.setContent(
      `<style>${css} * {transition:none!important}</style><main>${html}</main>`,
    );
    const {
      root: { nodeId },
    } = await session.send("DOM.getDocument");
    const { nodeIds } = await session.send("DOM.querySelectorAll", {
      nodeId,
      selector: "button,a",
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
            border: rgb(getComputedStyle(el).borderTopColor),
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
    let checked = 0, labelsChecked = 0, outlinesChecked = 0;
    const hex = (rgb) => "#" + rgb.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, "0")).join("");
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      const after = await audit(root + "/_sass", page, session);
      for (const skin of ["butterfly", "butterfly-dim"]) {
        for (const variant of ["primary", "secondary"]) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const reading = after[skin][`pill-${variant}/${state}`];
            assert.ok(reading.ratio >= 4.5,
              `${skin}/${width}/${variant}/${state}: starter tag/category contrast ${reading.ratio}`);
          }
        }
      }
      for (const [skin, variants] of Object.entries(identity.buttonBackgrounds)) {
        for (const [variant, color] of Object.entries(variants))
          assert.equal(hex(after[skin][`btn-${variant}/normal`].bg), color.background,
            `${skin}/${variant}: keep the reviewed filled button background`);
        for (const [variant, color] of Object.entries(variants))
          assert.equal(hex(after[skin][`btn-${variant}/normal`].fg), color.label,
            `${skin}/${variant}: only change the intended filled labels`);
      }
      // Cover every solid variant/state in original dieghernan skins, not only
      // combinations that happened to pass in the historical baseline.
      for (const skin of identity.authoredButtonSkins) {
        for (const variant of colors) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const r = after[skin][`btn-${variant}/${state}`];
            assert.ok(r.ratio >= 4.5, `${skin}/${variant}/${state}: authored button contrast ${r.ratio}`);
          }
        }
      }
      for (const [skin, variants] of Object.entries(identity.consistentButtonLabels)) {
        for (const [variant, expected] of Object.entries(variants)) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const r = after[skin][`btn-${variant}/${state}`];
            assert.equal(hex(r.fg), expected.color, `${skin}/${variant}/${state}: consistent readable label`);
            assert.ok(r.ratio >= expected.minimum, `${skin}/${variant}/${state}: consistent label contrast ${r.ratio}`);
          }
          for (const type of ["disabled", "class-focus", "class-active", "dropdown"])
            assert.equal(hex(after[skin][`${type}-${variant}/normal`].fg), expected.color,
              `${skin}/${type}/${variant}: consistent label`);
        }
      }
      for (const [skin, variants] of Object.entries(identity.aaButtonBackgrounds)) {
        for (const variant of Object.keys(variants)) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const r = after[skin][`btn-${variant}/${state}`];
            assert.equal(hex(r.fg), "#ffffff", `${skin}/${variant}/${state}: AA white label`);
            assert.ok(r.ratio >= 4.5, `${skin}/${variant}/${state}: AA contrast ${r.ratio}`);
          }
        }
      }
      for (const [skin, variants] of Object.entries(identity.lightButtonLabels)) {
        for (const [variant, expected] of Object.entries(variants)) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const r = after[skin][`btn-${variant}/${state}`];
            assert.equal(hex(r.fg), expected.color, `${skin}/${variant}/${state}: original light label`);
            assert.ok(r.ratio >= expected.minimum, `${skin}/${variant}/${state}: ${r.ratio}; accepted minimum ${expected.minimum}`);
            labelsChecked++;
          }
          for (const type of ["disabled", "class-focus", "class-active", "dropdown"]) {
            assert.equal(hex(after[skin][`${type}-${variant}/normal`].fg), expected.color,
              `${skin}/${type}/${variant}: original light label`);
            labelsChecked++;
          }
        }
      }
      for (const [skin, variants] of Object.entries(identity.buttonOutlines)) {
        for (const [variant, expected] of Object.entries(variants)) {
          for (const state of ["normal", "focus"]) {
            const r = after[skin][`outline-${variant}/${state}`];
            assert.equal(hex(r.fg), expected, `${skin}/${variant}/${state}: outline label`);
            assert.equal(hex(r.border), expected, `${skin}/${variant}/${state}: outline border`);
            assert.ok(r.ratio >= 4.5, `${skin}/${variant}/${state}: outline contrast ${r.ratio}`);
            outlinesChecked++;
          }
        }
      }
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
      `${checked} previously AA-passing pairs retain 4.5:1; ${labelsChecked} original light-label states and ${outlinesChecked} readable outline states checked; ${identity.authoredButtonSkins.length * colors.length * 4 * 2} authored solid-button states meet 4.5:1 across both viewports.`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
