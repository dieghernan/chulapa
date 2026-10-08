// Requires Playwright and axe-core; see test/README.md for isolated installation.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require("playwright");

const directory = path.resolve(process.argv[2]);
const skins = ["chulapa", "navi", "journal", "gitdev", "lux", "flatly"];

async function main() {
  const browser = await chromium.launch({ channel: process.env.CHULAPA_BROWSER_CHANNEL || "msedge", headless: true });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  // Serve generated local files directly so server failures cannot masquerade as theme defects.
  await context.route("http://localhost:8767/**", route => {
    const filename = path.join(directory, decodeURIComponent(new URL(route.request().url()).pathname));
    return fs.existsSync(filename) && fs.statSync(filename).isFile()
      ? route.fulfill({ path: filename }) : route.fulfill({ status: 404, body: "Not found" });
  });
  const results = [];
  try {
    for (const skin of skins) {
      const page = await context.newPage();
      for (const width of [320, 390, 1280]) {
        await page.setViewportSize({ width, height: 844 });
        for (const layout of ["article", "landing", "minimal", "cards"]) {
          await page.goto(`http://localhost:8767/${skin}/${layout}.html`);
          await page.waitForFunction(() => getComputedStyle(document.body).display === "flex");
          assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${skin}/${layout} overflow at ${width}`);
          await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
          const audit = await page.evaluate(async () => {
            const result = await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } });
            return { violations: result.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), incomplete: result.incomplete.map(v => v.id) };
          });
          results.push({ skin, layout, width, ...audit });
          if (layout === "landing") {
            assert.equal(await page.locator("#toc a").first().evaluate(el => getComputedStyle(el).textDecorationLine), "none", `${skin}: inline TOC styling changed`);
          }

        }
      }
      await page.goto(`http://localhost:8767/${skin}/article.html`);
      await page.keyboard.press("Tab");
      assert.equal(await page.locator(".chulapa-skip-link").evaluate(el => el === document.activeElement), true);
      await page.keyboard.press("Enter");
      assert.equal(await page.evaluate(() => document.activeElement.id), "chulapa-content");
      const toggle = page.locator("#navi-toggle");
      await toggle.focus();
      await page.keyboard.press("Space");
      assert.equal(await toggle.getAttribute("aria-expanded"), "true");
      assert.equal(await page.locator("#navi-menu").evaluate(el => el.contains(document.activeElement)), true);
      await page.keyboard.press("Escape");
      assert.equal(await toggle.getAttribute("aria-expanded"), "false");
      assert.equal(await toggle.evaluate(el => el === document.activeElement), true);
      assert.equal(await page.locator("#navi-menu").evaluate(el => el.inert), true);
      await page.keyboard.press("Enter");
      assert.equal(await toggle.getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Escape");
      // Preserve the sidebar's existing open/close and Tab behavior, without a focus trap.
      await page.locator("#demo").click();
      assert.equal(await page.locator("#demo").getAttribute("aria-expanded"), "true");
      await page.keyboard.press("Tab");
      assert.equal(await page.locator("#sideBar button").evaluate(el => el === document.activeElement), true);
      await page.keyboard.press("Tab");
      assert.equal(await page.locator("#sideBar nav a").first().evaluate(el => el === document.activeElement), true);
      await page.locator("#sideBar button").click();
      assert.equal(await page.locator("#demo").getAttribute("aria-expanded"), "false");
      await page.locator(".chulapa-header-link").first().focus();
      assert.equal(await page.locator(".chulapa-header-link").first().evaluate(el => getComputedStyle(el).opacity), "1");
      assert.equal(await page.locator(".navbar-chulapa-fab-background").evaluate(el => getComputedStyle(el).transitionDuration), "0s");
      assert.equal(await page.locator(".bs-canvas-anim").first().evaluate(el => getComputedStyle(el).transitionDuration), "0s");
      console.log(`Passed ${skin}: 12 layout/viewport audits and keyboard checks`);
      await page.close();
    }
    const page = await context.newPage();
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:8767/navi-dual/article.html");
    await page.locator("#navi-toggle").click();
    await page.setViewportSize({ width: 1280, height: 844 });
    await page.waitForFunction(() => document.getElementById("navi-toggle").getAttribute("aria-expanded") === "false");
    assert.equal(await page.locator("#navi-menu").evaluate(el => el.inert), true);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("http://localhost:8767/navi-classic/article.html");
    await page.locator(".navbar-toggler").focus();
    await page.keyboard.press("Space");
    assert.equal(await page.locator(".navbar-toggler").getAttribute("aria-expanded"), "true");
    console.log("Passed dual resize and classic keyboard navigation");
    await page.route("https://code.jquery.com/**", route => route.abort());
    await page.goto("http://localhost:8767/navi/article.html");
    await page.locator("#navi-toggle").focus();
    await page.keyboard.press("Enter");
    assert.equal(await page.locator("#navi-toggle").getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#navi-toggle").getAttribute("aria-expanded"), "false");
    console.log("Passed floating navigation when the jQuery CDN fails");
    const noScripts = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    await noScripts.route("http://localhost:8767/**", route => {
      const filename = path.join(directory, decodeURIComponent(new URL(route.request().url()).pathname));
      return fs.existsSync(filename) && fs.statSync(filename).isFile()
        ? route.fulfill({ path: filename }) : route.fulfill({ status: 404, body: "Not found" });
    });
    const fallback = await noScripts.newPage();
    await fallback.goto("http://localhost:8767/navi/article.html");
    assert.equal(await fallback.locator("noscript nav a").first().isVisible(), true);
    assert.equal(await fallback.locator("#navi-toggle").isVisible(), false);
    await noScripts.close();
    console.log("Passed floating navigation without JavaScript");
    fs.writeFileSync(path.join(directory, "accessibility-results.json"), JSON.stringify(results, null, 2));
    assert.deepEqual(results.filter(result => result.violations.length), [], "Accessibility violations; see accessibility-results.json");
  } finally {
    await browser.close();
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
