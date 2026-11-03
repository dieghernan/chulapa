const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const sass = require('./browser/node_modules/sass');
const { chromium } = require('./browser/node_modules/playwright');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const markup = read('_includes/search/algolia.html')
  .replace(/{% if site.search.algolia_logo %}|{% endif %}/g, '')
  .replace('{% include search/algolia-logo.svg %}', read('_includes/search/algolia-logo.svg'));

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? { executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE } : {}),
  });
  try {
    const page = await browser.newPage();
    await page.route('**/*', route => route.abort());
    for (const width of [375, 1280]) {
      await page.setViewportSize({ width, height: 900 });
      // Changing stylesheets on the same DOM mirrors the theme selector.
      await page.setContent(`<style id="skin"></style><main class="container p-3">${markup}</main>`);
      for (const skin of ['butterfly', 'butterfly-dim', 'darkly']) {
        const prefix = `@import "skins/${skin}"; @import "bootstrap/bootstrap"; @import "chulapa-master";`;
        const options = { loadPaths: [path.join(root, '_sass')], logger: { warn() {}, debug() {} } };
        const reset = read('_sass/reset-algolia.scss');
        const original = sass.compileString(prefix + reset.slice(0, reset.indexOf('.chulapa-algolia-attribution')), options).css;
        const compiled = sass.compileString(`${prefix} @import "reset-algolia";`, options).css;
        // The Algolia reset must not change any other compiled skin rules.
        const attributionStart = compiled.indexOf('.chulapa-algolia-attribution');
        const withoutAttribution = compiled.slice(0, attributionStart);
        assert.equal(withoutAttribution.trim(), original.trim(), `${skin}: existing skin CSS changed`);
        await page.locator('#skin').evaluate((el, css) => { el.textContent = css; }, compiled.replace(/^@import[^\n]+$/gm, ''));
        const link = page.getByRole('link', { name: 'Search by Algolia' });
        assert.equal(await link.count(), 1);
        await link.focus();
        const state = await link.evaluate(el => {
          const svg = el.querySelector('svg');
          const box = svg.getBoundingClientRect();
          return {
            color: getComputedStyle(el).color,
            body: getComputedStyle(document.body).color,
            fill: getComputedStyle(svg.querySelector('path')).fill,
            focus: document.activeElement === el,
            outline: getComputedStyle(el).outlineStyle,
            width: box.width,
            height: box.height,
            overflow: document.documentElement.scrollWidth > innerWidth,
          };
        });
        assert.equal(state.color, state.body);
        assert.equal(state.fill, state.body);
        assert.equal(state.focus, true);
        assert.equal(state.outline, 'solid');
        assert.ok(state.width > 100 && state.height > 10);
        assert.equal(state.overflow, false);
        if (process.env.CHULAPA_ALGOLIA_SCREENSHOT && skin === 'butterfly-dim' && width === 375) {
          await page.screenshot({ path: process.env.CHULAPA_ALGOLIA_SCREENSHOT });
        }
      }
    }
    console.log('Algolia attribution: adaptive SVG, keyboard focus, no overflow at 375/1280px; existing skin CSS preserved.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
