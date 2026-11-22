// Run after check_default_content.rb with DEFAULT_CONTENT_OUTPUT set.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const after = path.resolve(process.argv[2]);
const before = process.argv[3] && path.resolve(process.argv[3]);
const dependencies = new Map([
  ['https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js', require.resolve('jquery/dist/jquery.slim.min.js')],
  ['https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js', require.resolve('popper.js/dist/umd/popper.min.js')],
  ['https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js', require.resolve('bootstrap/dist/js/bootstrap.min.js')]
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
    for (const width of [375, 575, 576, 1280]) {
      await page.setViewportSize({width, height: 900});
      await page.goto('http://after.localhost/project/indexcategory.html');
      for (const [day, image] of [['01', 'header.png'], ['02', 'og.png'], ['03', 'og.png'], ['04', null], ['05', null]]) {
        const card = page.locator('.chulapa-border-card-index').filter({
          has: page.locator(`a.u-url[href$="/01/${day}/entry.html"]`)
        });
        const thumbnail = card.locator('.chulapa-card-img');
        const row = await card.locator('.row').boundingBox();
        const body = await card.locator('.col-sm').boundingBox();
        if (!image) {
          assert.equal(await thumbnail.count(), 0);
          assert.ok(Math.abs(body.width - row.width) <= 1);
          continue;
        }
        const box = await thumbnail.boundingBox();
        assert.ok(box && box.width > 0 && box.height > 0, `Hidden image for Entry ${day} at ${width}px`);
        assert.equal(await thumbnail.evaluate(node => getComputedStyle(node).backgroundImage), `url("https://example.com/project/${image}")`);
        if (width < 576) {
          assert.ok(Math.abs(box.width - row.width) <= 1 && box.y + box.height <= body.y + 1);
        } else {
          assert.ok(Math.abs(box.y - body.y) <= 1 && box.x + box.width <= body.x + 1);
        }
      }
    }
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
    }
    for (const width of [320, 575, 576, 768, 1280]) {
      await page.setViewportSize({width, height: 900});
      for (const [day, directions] of [['01', ['next']], ['02', ['prev', 'next']], ['03', ['prev', 'next']], ['05', ['prev']]]) {
        await page.goto(`http://after.localhost/project/example/2024/01/${day}/entry.html`);
        const navigation = page.getByRole('navigation', {name: 'Adjacent pages'});
        const links = navigation.getByRole('link');
        assert.equal(await links.count(), directions.length);
        assert.ok(await navigation.evaluate(nav => nav.scrollWidth <= nav.clientWidth));
        const bounds = await navigation.locator('.pagination').boundingBox();
        const center = bounds.x + bounds.width / 2;
        const focused = [];
        for (let i = 0; i < 12 && focused.length < directions.length; i++) {
          await page.keyboard.press('Tab');
          const link = navigation.locator('a:focus');
          if (!(await link.count())) continue;
          const direction = await link.getAttribute('rel');
          const box = await link.boundingBox();
          assert.ok(box.width >= 24 && box.height >= 24);
          assert.ok(direction === 'prev' ? box.x + box.width <= center : box.x >= center);
          assert.equal(await link.evaluate(anchor => {
            const style = getComputedStyle(anchor);
            return anchor.matches(':focus-visible') && style.outlineStyle === 'solid' && parseFloat(style.outlineWidth) >= 2;
          }), true, `${day}/${width}/${direction}: missing keyboard focus`);
          assert.ok(await link.evaluate(anchor => anchor.scrollWidth <= anchor.clientWidth));
          focused.push(direction);
        }
        assert.deepEqual(focused, directions, `${day}/${width}: keyboard order`);
        if (day === '02') {
          const pairs = await links.evaluateAll(anchors => anchors.map(anchor => {
            const title = anchor.querySelector('.chulapa-post-nav-title');
            const arrow = anchor.querySelector('.chulapa-post-nav-arrow');
            const titleStyle = getComputedStyle(title);
            return {
              sizes: [anchor.clientWidth, anchor.clientHeight, title.clientWidth, title.clientHeight,
                arrow.offsetWidth, arrow.offsetHeight],
              wrap: titleStyle.whiteSpace,
              ellipsis: titleStyle.textOverflow,
              clipped: title.scrollWidth > title.clientWidth
            };
          }));
          assert.deepEqual(pairs[0].sizes, pairs[1].sizes, `${width}: link, title and arrow sizes must match`);
          assert.ok(pairs.every(side => side.wrap === 'nowrap' && side.ellipsis === 'ellipsis'));
          if (width === 320) assert.ok(pairs.every(side => side.clipped), 'Both long titles should truncate on mobile');
          const next = links.last();
          const previousName = 'Previous: Áreas & datos ' + 'Boundary'.repeat(12);
          const nextName = 'Next: Mapas de la costa con varios nombres de localidades y territorios';
          assert.equal(await navigation.getByRole('link', {name: previousName, exact: true}).count(), 1);
          assert.equal(await navigation.getByRole('link', {name: nextName, exact: true}).count(), 1);
          const target = await next.getAttribute('href');
          await Promise.all([page.waitForURL(target), page.keyboard.press('Enter')]);
        }
      }
    }
    console.log('Default layout browser checks passed: keyboard, skip link, sidebar, accessibility roles, geometry and responsive inheritance.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
