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
  const serveFixture = route => {
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
  };
  await context.route("**/*", serveFixture);
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
    for (const skin of ["chulapa", "navi", "journal", "gitdev", "lux", "flatly"]) {
      for (const width of [320, 390, 1280]) {
        await page.setViewportSize({ width, height: 844 });
        await load(skin);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${skin}: page overflow at ${width}`);
        await closed();
        assert.equal(await page.getByRole("navigation", { name: "Footer links", exact: true }).count(), 1);
        assert.equal(await page.locator("footer .chulapa-footer-brand").isVisible(), true);
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
        await toggle.click();
        const dropdown = page.locator('#navi-menu [data-toggle="dropdown"]');
        await dropdown.focus();
        await page.keyboard.press("Enter");
        assert.equal(await dropdown.getAttribute("aria-expanded"), "true", `${skin}: dropdown did not open at ${width}`);
        assert.equal(await toggle.getAttribute("aria-expanded"), "true", "Opening a dropdown must keep floating navigation open");
        await page.keyboard.press("ArrowDown");
        assert.equal(await page.locator("#navi-menu .dropdown-item").first().evaluate(link => link === document.activeElement), true);
        await page.keyboard.press("Escape");
        await closed();
        assert.equal(await toggle.evaluate(button => button === document.activeElement), true);
        await page.locator("#demo").click();
        await page.keyboard.press("Tab");
        assert.equal(await page.locator("#sideBar button").evaluate(button => button === document.activeElement), true);
        await page.keyboard.press("Tab");
        assert.equal(await page.locator("#sideBar nav a").first().evaluate(link => link === document.activeElement), true);
        await page.keyboard.press("Shift+Tab");
        assert.equal(await page.locator("#sideBar button").evaluate(button => button === document.activeElement), true);
        await page.keyboard.press("Enter");
        assert.equal(await page.locator("#demo").getAttribute("aria-expanded"), "false");
        // The three TOCs agree on reading position without moving keyboard focus.
        await page.locator(".chulapa-skip-link").focus();
        const scrollToHeading = async id => {
          await page.evaluate(id => {
            const heading = document.getElementById(id);
            window.scrollTo(0, heading.getBoundingClientRect().top + scrollY - 80);
          }, id);
          await page.waitForFunction(id => ["toc", "sidetoc", "markdown-toc"].every(toc => {
            const links = document.querySelectorAll(`#${toc} a[aria-current="location"]`);
            return links.length === 1 && links[0].getAttribute("href") === "#" + id && links[0].classList.contains("chulapa-toc-active");
          }), id);
          assert.equal(await page.locator(".chulapa-skip-link").evaluate(link => link === document.activeElement), true, "TOC tracking must not move focus");
        };
        await scrollToHeading("first-section");
        await scrollToHeading("second-section");
        await scrollToHeading("first-section");
        const activeStyle = await page.locator('#toc a[aria-current="location"]').evaluate(link => getComputedStyle(link).textDecorationLine);
        assert.ok(activeStyle.includes("underline"), `${skin}: active TOC styling missing`);
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.waitForFunction(() => ["toc", "sidetoc", "markdown-toc"].every(toc => document.querySelector(`#${toc} a[aria-current="location"]`)?.getAttribute("href") === "#last-subsection"));
        assert.equal(await page.locator('#toc a[href="#progress-100%"], #sidetoc a[href="#progress-100%"] ').count(), 2, "Authored HTML heading must appear in both theme TOCs");
        await page.evaluate(() => { document.getElementById("extra-details").open = true; });
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await page.waitForFunction(() => ["toc", "sidetoc"].every(toc => document.querySelector(`#${toc} a[aria-current="location"]`)?.getAttribute("href") === "#progress-100%"));
        await page.evaluate(() => { document.getElementById("extra-details").open = false; });
        await page.waitForFunction(() => ["toc", "sidetoc"].every(toc => document.querySelector(`#${toc} a[aria-current="location"]`)?.getAttribute("href") === "#last-subsection"));

        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForFunction(() => !document.querySelector('#toc a[aria-current], #sidetoc a[aria-current], #markdown-toc a[aria-current]'));

      }
      console.log(`Passed ${skin}: 320/390/1280px reflow, keyboard dropdowns, sidebar Tab behavior and three synchronized TOCs`);
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
    const noScripts = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 320, height: 844 } });
    try {
      await noScripts.route("**/*", serveFixture);
      const fallback = await noScripts.newPage();
      for (const skin of ["chulapa", "navi", "journal", "gitdev", "lux", "flatly", "navi-dual"]) {
        await fallback.goto(`http://localhost:8767/${skin}/article.html`);
        assert.equal(await fallback.locator("#navi-toggle").isVisible(), false, `${skin}: JavaScript-only control must be hidden`);
        const links = fallback.locator("noscript nav a");
        assert.equal(await links.count(), 3, `${skin}: missing brand, home or dropdown child in fallback`);
        for (const link of await links.all()) {
          assert.equal(await link.isVisible(), true, `${skin}: fallback link is hidden`);
          assert.equal(await link.getAttribute("href"), `http://localhost:8767/${skin}/article.html`);
        }
        await links.last().focus();
        await Promise.all([fallback.waitForEvent("load"), fallback.keyboard.press("Enter")]);
        assert.equal(fallback.url(), `http://localhost:8767/${skin}/article.html`);
        assert.equal(await fallback.locator('#toc a[aria-current], #markdown-toc a[aria-current]').count(), 0);
        await fallback.locator("#toc a").first().focus();
        await fallback.keyboard.press("Enter");
        await fallback.waitForURL(`http://localhost:8767/${skin}/article.html#first-section`);
      }
    } finally {
      await noScripts.close();
    }
    console.log("Passed all FAB skins and mobile dual navigation without JavaScript or CDN access");
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
