// Run after build_accessibility_fixtures.rb; see README for browser dependencies.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { chromium } = require("playwright");

assert.ok(process.argv[2], "Usage: node test/check_navigation_browser.js FIXTURE_DIRECTORY");
const directory = path.resolve(process.argv[2]);
const dependencies = new Map([
  ["https://code.jquery.com/jquery-3.5.1.slim.min.js", require.resolve("jquery/dist/jquery.slim.min.js")],
  ["https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js", require.resolve("popper.js/dist/umd/popper.min.js")],
  ["https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js", require.resolve("bootstrap/dist/js/bootstrap.min.js")]
]);

async function main() {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? { executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE } : {})
  });
  const context = await browser.newContext({ reducedMotion: "reduce" });
  await context.route("**/*", route => {
    const url = new URL(route.request().url());
    if (dependencies.has(url.href)) {
      return route.fulfill({ path: dependencies.get(url.href), contentType: "application/javascript", headers: { "access-control-allow-origin": "*" } });
    }
    if (url.origin === "http://localhost:8767") {
      const filename = path.join(directory, decodeURIComponent(url.pathname));
      return fs.existsSync(filename) && fs.statSync(filename).isFile()
        ? route.fulfill({ path: filename }) : route.fulfill({ status: 404, body: "Not found" });
    }
    // Fonts, icons and optional external services are not needed to test navigation.
    return route.abort();
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const load = async skin => {
    await page.goto(`http://localhost:8767/${skin}/article.html`);
    await page.waitForFunction(() => typeof ch_copy_cliboard === "function" && typeof $ === "function" && getComputedStyle(document.body).display === "flex");
    // Offline copies must match the integrity attributes in the actual template.
    const scripts = await page.locator("script[src][integrity]").evaluateAll(nodes => nodes.map(node => ({ src: node.src, integrity: node.integrity })));
    for (const { src, integrity } of scripts) {
      assert.ok(dependencies.has(src), `Unmapped dependency: ${src}`);
      assert.equal("sha384-" + crypto.createHash("sha384").update(fs.readFileSync(dependencies.get(src))).digest("base64"), integrity);
    }
  };
  const closed = async () => {
    await page.waitForFunction(() => document.getElementById("navi-toggle").getAttribute("aria-expanded") === "false");
    assert.equal(await page.locator("#navi-menu").evaluate(menu => menu.inert && menu.getAttribute("aria-hidden") === "true"), true);
  };
  try {
    for (const skin of ["chulapa", "navi", "gitdev"]) {
      for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 844 });
        await load(skin);
        await page.keyboard.press("Tab");
        assert.equal(await page.locator(".chulapa-skip-link").evaluate(link => link === document.activeElement), true);
        await page.keyboard.press("Enter");
        assert.equal(await page.evaluate(() => document.activeElement.id), "chulapa-content");
        const toggle = page.locator("#navi-toggle");
        await toggle.focus();
        await page.keyboard.press("Space");
        assert.equal(await toggle.getAttribute("aria-expanded"), "true");
        assert.equal(await page.locator("#navi-menu a").first().evaluate(link => link === document.activeElement), true);
        await page.keyboard.press("Tab");
        assert.equal(await page.locator("#navi-menu").evaluate(menu => menu.contains(document.activeElement) && !menu.inert), true);
        await page.keyboard.press("Escape");
        await closed();
        assert.equal(await toggle.evaluate(button => button === document.activeElement), true);
        await page.keyboard.press("Enter");
        await page.locator(".chulapa-skip-link").focus();
        await closed();
        assert.equal(await page.locator(".chulapa-skip-link").evaluate(link => link === document.activeElement), true, "Leaving the menu must not steal focus");
        await page.locator("#demo").click();
        await page.keyboard.press("Tab");
        assert.equal(await page.locator("#sideBar button").evaluate(button => button === document.activeElement), true);
        await page.keyboard.press("Tab");
        assert.equal(await page.locator("#sideBar nav a").first().evaluate(link => link === document.activeElement), true);
        await page.keyboard.press("Shift+Tab");
        assert.equal(await page.locator("#sideBar button").evaluate(button => button === document.activeElement), true);
        await page.keyboard.press("Enter");
        assert.equal(await page.locator("#demo").getAttribute("aria-expanded"), "false");
      }
      console.log(`Passed ${skin}: mobile/desktop keyboard navigation and sidebar Tab behavior`);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await load("navi-dual");
    await page.locator("#navi-toggle").click();
    await page.setViewportSize({ width: 1280, height: 844 });
    await closed();
    await page.setViewportSize({ width: 390, height: 844 });
    await load("navi-classic");
    await page.locator(".navbar-toggler").focus();
    await page.keyboard.press("Space");
    await page.waitForFunction(() => document.querySelector(".navbar-toggler").getAttribute("aria-expanded") === "true");
    await page.waitForFunction(() => {
      const menu = document.getElementById(document.querySelector(".navbar-toggler").getAttribute("aria-controls"));
      return menu.classList.contains("show") && !menu.classList.contains("collapsing");
    });
    await page.keyboard.press("Space");
    await page.waitForFunction(() => document.querySelector(".navbar-toggler").getAttribute("aria-expanded") === "false");
    assert.deepEqual(errors, [], "Unexpected JavaScript errors in generated pages");
    console.log("Passed dual resize and classic navigation with actual Bootstrap/jQuery, without CDN access");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
