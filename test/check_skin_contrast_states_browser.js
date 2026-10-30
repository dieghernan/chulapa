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
    .filter((f) => f.endsWith(".scss") && f !== "dark-bg.scss")
    .filter(f => !process.env.CHULAPA_TEST_SKINS || process.env.CHULAPA_TEST_SKINS.split(",").includes(f.slice(0, -5)))) {
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
          `<p class="text-${k}" data-pair="text-${k}">${k}</p><button class="btn btn-${k}" data-pair="btn-${k}">${k}</button><button class="btn btn-outline-${k}" data-pair="outline-${k}">${k}</button><button disabled class="btn btn-${k}" data-pair="disabled-${k}">${k}</button><button class="btn btn-${k} focus" data-pair="class-focus-${k}">${k}</button><button class="btn btn-${k} active" data-pair="class-active-${k}">${k}</button><div class="show"><button class="btn btn-${k} dropdown-toggle" data-pair="dropdown-${k}">${k}</button></div><a href="#target" class="badge badge-${k}" data-pair="linked-badge-${k}">${k}</a><a href="#target" class="badge chulapa-pill-bg-${k}" data-pair="pill-${k}">${k}</a><div class="card bg-${k}" data-pair="card-${k}">${k}<p><a href="#target" data-pair="card-link-${k}">Card link</a></p></div>`,
      )
      .join("");
    await page.setContent(
      `<style>${css} * {transition:none!important}</style><main class="e-content"><p><a href="#target" data-pair="body-link">Article link</a></p>${html}</main><nav class="navbar navbar-chulapa"><div class="navbar-nav"><a href="#target" class="nav-link" data-pair="nav-link">Navigation</a><a href="#target" class="nav-link active" data-pair="nav-active">Active</a></div></nav><footer class="footer-chulapa"><a href="#target" data-pair="footer-link">Footer</a></footer>`,
    );
    const {
      root: { nodeId },
    } = await session.send("DOM.getDocument");
    const { nodeIds } = await session.send("DOM.querySelectorAll", {
      nodeId,
      selector: "button,a",
    });
    if (process.env.CHULAPA_CONTRAST_SCREENSHOTS && authoredCatalog.includes(skin)) {
      fs.mkdirSync(process.env.CHULAPA_CONTRAST_SCREENSHOTS, {recursive:true});
      await page.locator('[data-pair="card-primary"]').screenshot({path:require('path').join(process.env.CHULAPA_CONTRAST_SCREENSHOTS, `${skin}-${page.viewportSize().width}-card.png`)});
      await page.locator('nav').screenshot({path:require('path').join(process.env.CHULAPA_CONTRAST_SCREENSHOTS, `${skin}-${page.viewportSize().width}-nav.png`)});
    }
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
          const alpha = fg[3] ?? 1;
          const effective = fg.slice(0,3).map((v,i) => v * alpha + back[i] * (1-alpha));
          const a = lum(effective),
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
  if (process.env.CHULAPA_CONTRAST_REPORT) fs.writeFileSync(process.env.CHULAPA_CONTRAST_REPORT, JSON.stringify(output, null, 2));
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
      if (after.listen) {
        for (const state of ["normal", "hover", "focus", "active"]) {
          for (const component of ["card", "card-link"]) {
            assert.deepEqual(after.listen[`${component}-primary/${state}`].fg,
              after.listen[`btn-primary/${state}`].fg,
              `Listen/${component}/${state}: use the Primary button's dark text`);
          }
        }
      }
      for (const skin of identity.authoredButtonSkins.filter(skin => after[skin])) {
        for (const variant of colors) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            for (const component of ["pill", "linked-badge", "card", "card-link", "outline"]) {
              const reading = after[skin][`${component}-${variant}/${state}`];
              assert.ok(reading.ratio >= 4.5, `${skin}/${width}/${component}/${variant}/${state}: contrast ${reading.ratio}`);
            }
          }
        }
      }
      for (const skin of identity.authoredButtonSkins.filter(skin => after[skin])) {
        for (const key of ["body-link", "nav-link", "nav-active", "footer-link"]) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const r = after[skin][`${key}/${state}`];
            assert.ok(r.ratio >= 4.5, `${skin}/${width}/${key}/${state}: ${r.ratio}`);
          }
        }
      }
      for (const [skin, variants] of Object.entries(identity.buttonBackgrounds).filter(([skin]) => after[skin])) {
        for (const [variant, color] of Object.entries(variants))
          assert.equal(hex(after[skin][`btn-${variant}/normal`].bg), color.background,
            `${skin}/${variant}: keep the reviewed filled button background`);
        for (const [variant, color] of Object.entries(variants))
          assert.equal(hex(after[skin][`btn-${variant}/normal`].fg), color.label,
            `${skin}/${variant}: only change the intended filled labels`);
      }
      // Cover every solid variant/state in original dieghernan skins, not only
      // combinations that happened to pass in the historical baseline.
      for (const skin of identity.authoredButtonSkins.filter(skin => after[skin])) {
        for (const variant of colors) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const r = after[skin][`btn-${variant}/${state}`];
            assert.ok(r.ratio >= 4.5, `${skin}/${variant}/${state}: authored button contrast ${r.ratio}`);
          }
        }
      }
      for (const [skin, variants] of Object.entries(identity.consistentButtonLabels).filter(([skin]) => after[skin])) {
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
      for (const [skin, variants] of Object.entries(identity.aaButtonBackgrounds).filter(([skin]) => after[skin])) {
        for (const variant of Object.keys(variants)) {
          for (const state of ["normal", "hover", "focus", "active"]) {
            const r = after[skin][`btn-${variant}/${state}`];
            assert.equal(hex(r.fg), "#ffffff", `${skin}/${variant}/${state}: AA white label`);
            assert.ok(r.ratio >= 4.5, `${skin}/${variant}/${state}: AA contrast ${r.ratio}`);
          }
        }
      }
      for (const [skin, variants] of Object.entries(identity.lightButtonLabels).filter(([skin]) => after[skin])) {
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
      for (const [skin, variants] of Object.entries(identity.buttonOutlines).filter(([skin]) => after[skin])) {
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
      for (const [skin, variants] of Object.entries(baseline.passingPairs).filter(([skin]) => after[skin])) {
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
