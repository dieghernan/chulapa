const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({headless: true, ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE} : {})});
  try {
    const page = await browser.newPage();
    await page.route('**/*', route => route.abort());
    for (const width of [375, 1280]) {
      await page.setViewportSize({width, height: 900});
      for (const folder of fs.readdirSync(process.argv[2])) {
        for (const name of ['default-guest.html', 'landingpage-site.html', 'archive.html', 'indexcategory.html', 'cloudcategory.html', 'cached.html']) {
          await page.setContent(fs.readFileSync(path.join(process.argv[2], folder, name), 'utf8'));
          const cards = page.locator('.p-author.h-card');
          assert.ok(await cards.count(), name);
          for (const card of await cards.all()) assert.equal(await card.isVisible(), false, name);
          assert.ok(await page.evaluate(() => [...document.querySelectorAll('.p-author')].every(card =>
            !card.getClientRects().length && [...card.querySelectorAll('a')].every(link => {
              link.focus();
              return document.activeElement !== link;
            })
          )), `${name}/${width}: author occupies space or accepts keyboard focus`);
        }
      }
    }
    console.log('Hidden authors have no rendered boxes or focusable links at 375/1280px.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
