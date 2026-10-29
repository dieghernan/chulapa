const assert = require('node:assert/strict');
const path = require('node:path');
const sass = require('./browser/node_modules/sass');
const { chromium } = require('./browser/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHULAPA_CHROMIUM });
  try {
    const page = await browser.newPage();
    let checks = 0;
    for (const skin of ['none', 'chulapa', 'sketchy', 'gitdev-dark']) {
      for (const vars of ['', '$border-radius-lg: 2rem;', '$enable-rounded: false;']) {
        const css = sass.compileString(
          `@import "skins/${skin}"; ${vars} @import "bootstrap/bootstrap"; @import "chulapa-master";`,
          { loadPaths: [path.resolve(__dirname, '../_sass')], logger: { warn() {} } }
        ).css;
        for (const width of [390, 1280]) {
          await page.setViewportSize({ width, height: 700 });
          await page.setContent(`<style>${css}</style>
            <img id="outside" alt="Outside map">
            <div class="leaflet-container"><img class="leaflet-tile" alt="Map tile">
            <img class="leaflet-marker-icon" alt="Map marker">
            <p><img alt="Popup image"></p></div>`);
          const radii = await page.locator('.leaflet-container img').evaluateAll(images =>
            images.map(image => getComputedStyle(image).borderRadius));
          assert.deepEqual(radii, ['0px', '0px', '0px'], `${skin}/${vars}/${width}`);
          const outsideRadius = await page.locator('#outside').evaluate(image =>
            getComputedStyle(image).borderRadius);
          await page.locator('style').evaluate(style => {
            style.textContent = style.textContent.replace(/\.leaflet-container img\s*\{[^}]*\}/g, '');
          });
          assert.equal(await page.locator('#outside').evaluate(image =>
            getComputedStyle(image).borderRadius), outsideRadius, 'Keep ordinary image rounding');
          checks++;
        }
      }
    }
    console.log(`${checks} Leaflet browser cases passed across skins, rounding settings and viewport sizes.`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
