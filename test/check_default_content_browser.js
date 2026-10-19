// Run after check_default_content.rb with DEFAULT_CONTENT_OUTPUT set.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const after = path.resolve(process.argv[2]);
const before = process.argv[3] && path.resolve(process.argv[3]);
const dependencies = new Map([
  ['https://code.jquery.com/jquery-3.5.1.slim.min.js', require.resolve('jquery/dist/jquery.slim.min.js')],
  ['https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', require.resolve('popper.js/dist/umd/popper.min.js')],
  ['https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', require.resolve('bootstrap/dist/js/bootstrap.min.js')]
]);
(async () => {
  const browser = await chromium.launch({headless: true, ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE} : {})});
  try {
    const page = await browser.newPage({reducedMotion: 'reduce'});
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      if (dependencies.has(url.href)) return route.fulfill({path: dependencies.get(url.href), contentType: 'application/javascript'});
      const directory = url.hostname === 'before.localhost' ? before : after;
      const file = directory && path.join(directory, url.pathname.replace(/^\/project\//, ''));
      return file && fs.existsSync(file) && fs.statSync(file).isFile() ? route.fulfill({path: file}) : route.abort();
    });
    const geometry = () => page.evaluate(() => ['main h1', '#maincontent', '#first-section'].map(selector => {
      const node = document.querySelector(selector) || (selector === 'main h1' && document.querySelector('h1'));
      const box = node.getBoundingClientRect(); return {x: box.x, y: box.y, width: box.width};
    }));
    for (const width of [375, 1280]) {
      await page.setViewportSize({width, height: 900});
      for (const name of ['default', 'plain', 'authored-toc', 'archive', 'indexcategory', 'cloudtag', 'cloudcategory', 'cloudtag2', 'cloudcategory2']) {
        let previous;
        if (before && name !== 'authored-toc') { await page.goto(`http://before.localhost/project/${name}.html`); previous = await geometry(); }
        await page.goto(`http://after.localhost/project/${name}.html`);
        assert.equal(await page.locator('main h1').count(), 1);
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
        if (previous) {
          const current = await geometry();
          for (let i = 0; i < current.length; ++i) for (const key of ['x', 'y', 'width']) assert.ok(Math.abs(current[i][key] - previous[i][key]) <= 1, `${name}/${width}/${i}/${key}: ${JSON.stringify({previous,current})}`);
        }
        const session = await page.context().newCDPSession(page);
        const tree = await session.send('Accessibility.getFullAXTree');
        const roles = tree.nodes.filter(n => !n.ignored).map(n => n.role?.value);
        assert.equal(roles.filter(r => r === 'main').length, 1);
        assert.equal(roles.filter(r => r === 'banner').length, 0, 'Page header inside main must not expose a site banner');
        assert.equal(roles.filter(r => r === 'contentinfo').length, 1);
        await session.detach();
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(() => document.activeElement.textContent.trim()), 'Skip to content');
        await page.keyboard.press('Enter');
        assert.equal(await page.evaluate(() => document.activeElement.id), 'chulapa-content');
        if (name === 'default') {
          assert.equal(await page.locator('#sideBar').evaluate(n => n.inert && n.getAttribute('aria-hidden') === 'true'), true);
          await page.locator('#chulapa-sidetoc-toggle').click();
          await page.waitForFunction(() => !document.getElementById('sideBar').inert);
          await page.locator('#sidetoc a').first().click();
          assert.ok(new URL(page.url()).hash, 'Sidebar link did not reach its heading');
          await page.locator('#sideBar button').focus();
          await page.keyboard.press('Escape');
          await page.waitForFunction(() => document.getElementById('sideBar').inert);
          if (process.env.DEFAULT_CONTENT_SCREENSHOTS) {
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.screenshot({path: `${process.env.DEFAULT_CONTENT_SCREENSHOTS}/default-${width}.png`, fullPage: true});
          }
        }
      }
      for (const day of ['01', '02', '03']) {
        await page.goto(`http://after.localhost/project/example/2024/01/${day}/entry.html`);
        const focused = [];
        for (let i = 0; i < 12; i++) {
          await page.keyboard.press('Tab');
          focused.push(await page.evaluate(() => document.activeElement.closest('nav.chulapa-pagination') ? document.activeElement.textContent.trim() : ''));
        }
        if (day !== '01') assert.ok(focused.includes('Previous'), `${day}: Previous not tabbable`);
        if (day !== '03') assert.ok(focused.includes('Next'), `${day}: Next not tabbable`);
        assert.equal(await page.locator('nav.chulapa-pagination a').count(), day === '02' ? 2 : 1);
      }
    }
    console.log('Default layout browser checks passed: keyboard, skip link, sidebar, accessibility roles, geometry and responsive inheritance.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
