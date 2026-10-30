const sass = require("./browser/node_modules/sass"),
  fs = require("fs");
const { chromium } = require("./browser/node_modules/playwright");
const identity = require("./skin-contrast-identity.json");
let knownFailures = 0;
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
    executablePath: process.env.CHULAPA_CHROMIUM,
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
      const adaptation = root + "/_sass/chulapa/skins/_" + f;
      // Vendor skin card text adjustments now live in separate partials.
      const bootswatch = root + "/_sass/chulapa/skins/bootswatch/_" + f;
      const src = fs.readFileSync(root + "/_sass/skins/" + f, "utf8") +
        (fs.existsSync(adaptation) ? fs.readFileSync(adaptation, "utf8") : "") +
        (fs.existsSync(bootswatch) ? fs.readFileSync(bootswatch, "utf8") : "");
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
        for (const c of checks) {
          const minimum =
            identity.renderedExceptions[`${skin}/${c.kind}`] ?? 4.5;
          assert.ok(
            c.ratio >= minimum,
            `${skin}/${width}/${c.kind}: ${c.ratio}; minimum ${minimum}`,
          );
          if (c.ratio < 4.5) knownFailures++;
        }
        // Preserve readable link accents against the dim page background,
        // including the hover and keyboard-focus states from the PR review.
        if (
          ["twitter-dim", "butterfly", "butterfly-dim", "cyborg", "wandoo"].includes(skin)
        ) {
          await page.setContent(`<style>${css}</style>
            <main><a id="body-link" href="#target">Article link</a>
              <span id="success-text" class="text-success">Success text</span></main>
            <nav class="navbar-chulapa"><div class="navbar-nav">
              <a id="nav-link" class="nav-link" href="#target">Navigation</a>
              <a id="nav-active" class="nav-link active" href="#target">Current page</a>
            </div></nav>
            <footer class="footer-chulapa"><a id="footer-link" href="#target">Footer link</a></footer>`);
          for (const id of ["cyborg", "wandoo"].includes(skin)
            ? ["body-link"]
            : [
                "body-link",
                "nav-link",
                "nav-active",
                "footer-link",
                ...(skin === "butterfly-dim" ? ["success-text"] : []),
              ]) {
            const link = page.locator(`#${id}`);
            for (const state of id === "success-text"
              ? ["normal"]
              : ["normal", "hover", "focus", "active"]) {
              await page.mouse.move(0, 0);
              await page.evaluate(() => document.activeElement?.blur());
              if (state === "hover") await link.hover();
              if (state === "focus") await link.focus();
              if (state === "active") {
                await link.hover();
                await page.mouse.down();
              }
              const contrast = await link.evaluate((el) => {
                const channels = (value) => value.match(/[\d.]+/g).map(Number);
                const luminance = (value) =>
                  channels(value)
                    .slice(0, 3)
                    .map((x) => x / 255)
                    .map((x) =>
                      x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4,
                    )
                    .reduce(
                      (sum, x, i) => sum + x * [0.2126, 0.7152, 0.0722][i],
                      0,
                    );
                let background = el;
                while (
                  background &&
                  channels(getComputedStyle(background).backgroundColor)[3] ===
                    0
                )
                  background = background.parentElement;
                if (!background) throw new Error("No opaque backdrop found");
                const a = luminance(getComputedStyle(el).color);
                const b = luminance(
                  getComputedStyle(background).backgroundColor,
                );
                return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
              });
              if (state === "active") await page.mouse.up();
              assert.ok(
                contrast >= 4.5,
                `${skin}/${width}/${id}/${state}: ${contrast}`,
              );
            }
          }
        }
        results.push({ skin, width, checks });
      }
    }
    console.log(
      `${results.length} skin/viewport combinations checked; ${knownFailures} documented component exceptions below 4.5:1. Targeted link/navigation contrast checks pass.`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
