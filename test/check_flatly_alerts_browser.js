const assert = require("node:assert/strict");
const sass = require("./browser/node_modules/sass");
const { chromium } = require("./browser/node_modules/playwright");
const path = require("node:path");

(async () => {
  const css = sass
    .compileString(
      '@import "skins/flatly"; @import "bootstrap/bootstrap"; @import "chulapa-master";',
      {
        loadPaths: [path.resolve(__dirname, "../_sass")],
        logger: { warn() {} },
      },
    )
    .css.replace(/^@import[^\n]+$/gm, "");
  const variants = [
    "info",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "light",
    "dark",
  ];
  const html = variants
    .map(
      (
        name,
      ) => `<p class="alert alert-${name} p-3 mx-2 mb-3" data-variant="${name}">
    <span data-check>Autothemer fills colors that the skin and <strong>vars</strong> have not defined.</span>
    <code data-check>vars</code>. See the <a href="#target" data-check>autothemer guide</a>
    or an <a href="#target" class="alert-link" data-check>emphasized guide</a>.
  </p>`,
    )
    .join("");
  const browser = await chromium.launch({
    executablePath: process.env.CHULAPA_CHROMIUM,
    headless: true,
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage();
    await page.route("**/*", (r) => r.abort());
    let checked = 0;
    for (const width of [390, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      await page.setContent(
        `<style>${css} *{transition:none!important}</style><main>${html}</main>`,
      );
      for (const variant of variants) {
        const alert = page.locator(`[data-variant="${variant}"]`);
        for (const element of await alert.locator("[data-check]").all()) {
          const isLink = await element.evaluate((el) => el.tagName === "A");
          for (const state of isLink
            ? ["normal", "hover", "focus"]
            : ["normal"]) {
            await page.mouse.move(0, 0);
            await page.evaluate(() => document.activeElement?.blur());
            if (state === "hover") await element.hover();
            if (state === "focus") await element.focus();
            const ratio = await element.evaluate((el) => {
              const rgb = (value) => value.match(/[\d.]+/g).map(Number);
              const luminance = (c) =>
                c
                  .slice(0, 3)
                  .map((x) => x / 255)
                  .map((x) =>
                    x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4,
                  )
                  .reduce((s, x, i) => s + x * [0.2126, 0.7152, 0.0722][i], 0);
              let parent = el;
              while (
                parent &&
                rgb(getComputedStyle(parent).backgroundColor)[3] === 0
              )
                parent = parent.parentElement;
              if (!parent) throw Error("Missing alert backdrop");
              const a = luminance(rgb(getComputedStyle(el).color)),
                b = luminance(rgb(getComputedStyle(parent).backgroundColor));
              return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
            });
            assert.ok(
              ratio >= 4.5,
              `Flatly ${variant}/${width}/${state}: ${ratio}`,
            );
            checked++;
          }
        }
      }
      if (process.env.CHULAPA_ALERT_SCREENSHOTS)
        await page.screenshot({
          path: path.join(
            process.env.CHULAPA_ALERT_SCREENSHOTS,
            `flatly-alerts-${width}.png`,
          ),
          fullPage: true,
        });
    }
    console.log(
      `${checked} Flatly alert text, code and link contrast checks passed.`,
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
