// Run after check_theme_selector.rb. Uses the actual compiled theme and CDN dependencies.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');
const directory = path.resolve(process.argv[2]);
const dependencies = new Map([
  ['https://code.jquery.com/jquery-3.5.1.slim.min.js', require.resolve('jquery/dist/jquery.slim.min.js')],
  ['https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', require.resolve('popper.js/dist/umd/popper.min.js')],
  ['https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', require.resolve('bootstrap/dist/js/bootstrap.min.js')]
]);

async function main() {
  const browser = await chromium.launch({headless: true,
    ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE} : {})});
  try {
    for (const name of ['classic-links', 'classic-empty', 'fab-links', 'fab-empty', 'dual-links', 'dual-empty', 'root', 'disabled']) {
      const context = await browser.newContext({reducedMotion: 'reduce', colorScheme: 'light'});
      const requests = [];
      const errors = [];
      let failDark = false;
      await context.route('**/*', route => {
        const url = new URL(route.request().url());
        if (url.hostname === 'fonts.googleapis.com') return route.fulfill({body: '', contentType: 'text/css'});
        if (dependencies.has(url.href)) return route.fulfill({path: dependencies.get(url.href), contentType: 'application/javascript', headers: {'access-control-allow-origin': '*'}});
        if (url.hostname === `${name}.localhost`) {
          requests.push(url.pathname);
          if (failDark && url.pathname.endsWith('/dark/main.css')) return route.fulfill({status: 404, body: 'Missing CSS'});
          const filename = path.join(directory, name, url.pathname);
          return fs.existsSync(filename) && fs.statSync(filename).isFile()
            ? route.fulfill({path: filename}) : route.fulfill({status: 404, body: 'Missing'});
        }
        return route.abort();
      });
      const base = `http://${name}.localhost:8770${name === 'root' ? '' : '/project'}`;
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}/article.html`);
      const bodyColor = () => page.locator('body').evaluate(node => getComputedStyle(node).backgroundColor);
      const light = await bodyColor();
      if (name === 'disabled') {
        assert.equal(await page.locator('.chulapa-theme-selector').count(), 0);
        assert.deepEqual(requests.filter(url => url.endsWith('.css')).sort(), ['custom', 'highlighter', 'main'].map(file => `/project/assets/css/${file}.css`));
        await context.close();
        continue;
      }
      const openNavigation = async () => {
        const floating = page.locator('#navi-toggle:visible');
        if (await floating.count() && await floating.getAttribute('aria-expanded') === 'false') await floating.click();
        const classic = page.locator('.navbar-toggler:visible:not(#navi-toggle)');
        if (await classic.count() && await classic.getAttribute('aria-expanded') === 'false') await classic.click();
      };
      const choose = async mode => {
        await openNavigation();
        const toggle = page.locator('.chulapa-theme-toggle:visible');
        await toggle.click();
        await page.locator(`button[data-theme-mode="${mode}"]:visible`).click();
      };
      const waitTheme = async theme => {
        try { await page.waitForFunction(value => document.documentElement.dataset.theme === value, theme); }
        catch (error) {
          console.error(name, theme, errors, requests.slice(-8), await page.evaluate(() => ({theme: document.documentElement.dataset.theme, mode: document.documentElement.dataset.themeMode, links: Array.from(document.querySelectorAll('link[rel=stylesheet]')).map(link => ({id: link.id, href: link.href, media: link.media}))})));
          throw error;
        }
      };
      for (const width of [1280, 375]) {
        await page.setViewportSize({width, height: 900});
        await choose('dark');
        await waitTheme('dark');
        assert.notEqual(await bodyColor(), light, `${name}: dark CSS did not apply`);
        assert.equal(await page.locator('body').evaluate(node => getComputedStyle(node).borderTopColor), 'rgb(255, 0, 0)', 'Custom CSS lost precedence');
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}/${width}: overflow`);
        assert.equal(await page.locator('.chulapa-theme-toggle:visible').getAttribute('aria-label'), 'Color theme: Dark');
        await choose('light');
        await waitTheme('light');
        assert.equal(await bodyColor(), light);
      }
      await page.setViewportSize({width: 1280, height: 900});
      await choose('auto');
      await page.emulateMedia({colorScheme: 'dark'});
      await waitTheme('dark');
      await page.emulateMedia({colorScheme: 'light'});
      await waitTheme('light');
      await choose('dark');
      await waitTheme('dark');
      requests.length = 0;
      await page.goto(`${base}/second.html`);
      await waitTheme('dark');
      assert.ok(!requests.some(url => /^\/(?:project\/)?assets\/css\/(main|highlighter)\.css$/.test(url)), 'Saved dark preference loaded light CSS');
      // Reload with slow dark CSS: no first paint may use the light skin.
      await page.addInitScript(() => {
        window.__paints = [];
        new PerformanceObserver(entries => entries.getEntries().forEach(entry => {
          window.__paints.push({name: entry.name, theme: document.documentElement.dataset.theme, color: getComputedStyle(document.body).backgroundColor});
        })).observe({type: 'paint', buffered: true});
      });
      await page.route('**/dark/main.css', async route => {
        await new Promise(resolve => setTimeout(resolve, 200));
        await route.fallback();
      });
      await page.reload();
      await waitTheme('dark');
      await page.waitForFunction(() => window.__paints.length > 0);
      assert.ok((await page.evaluate(() => window.__paints)).every(paint => paint.theme === 'dark' && paint.color !== 'rgb(255, 255, 255)'));
      await page.unroute('**/dark/main.css');
      // Changing another tab updates both selector copies in dual navigation.
      const second = await context.newPage();
      await second.goto(`${base}/article.html`);
      await choose('light');
      await second.waitForFunction(() => document.documentElement.dataset.theme === 'light');
      assert.ok((await second.locator('.chulapa-theme-toggle').evaluateAll(nodes => nodes.map(node => node.getAttribute('aria-label')))).every(label => label === 'Color theme: Light'));
      await second.close();
      // Native dropdown keyboard operation, selection state and Escape focus.
      await openNavigation();
      const toggle = page.locator('.chulapa-theme-toggle:visible');
      await toggle.press('Enter');
      await toggle.press('ArrowDown');
      assert.equal(await page.locator('button[data-theme-mode="light"]:visible').evaluate(node => node === document.activeElement), true);
      await page.locator('button[data-theme-mode="light"]:visible').press('ArrowDown');
      await page.locator('button[data-theme-mode="dark"]:visible').press('Enter');
      await waitTheme('dark');
      assert.equal(await toggle.evaluate(node => node === document.activeElement), true);
      await toggle.press('Enter');
      const toggleId = await toggle.getAttribute('id');
      await page.locator('button[data-theme-mode="dark"]:visible').press('Escape');
      const floatingClosed = await page.locator('#navi-toggle:visible[aria-expanded="false"]').count();
      if (floatingClosed) assert.equal(await page.locator('#navi-toggle').evaluate(node => node === document.activeElement), true);
      else {
        assert.equal(await page.locator('#' + toggleId).getAttribute('aria-expanded'), 'false');
        assert.equal(await toggle.evaluate(node => node === document.activeElement), true);
      }
      // Failed alternate CSS must retain the current usable appearance.
      await choose('light');
      await waitTheme('light');
      failDark = true;
      await choose('dark');
      await page.waitForFunction(() => document.documentElement.dataset.themeMode === 'light');
      assert.equal(await bodyColor(), light);
      failDark = false;
      // Storage errors do not stop current-page switching.
      await page.addInitScript(() => {
        Storage.prototype.getItem = Storage.prototype.setItem = function () { throw new Error('Storage blocked'); };
      });
      await page.reload();
      await choose('dark');
      await waitTheme('dark');
      assert.deepEqual(errors, [], `${name}: JavaScript errors`);
      const nojs = await browser.newContext({javaScriptEnabled: false});
      await nojs.route('**/*', async route => {
        const url = new URL(route.request().url());
        const filename = path.join(directory, name, url.pathname);
        if (url.hostname === `${name}.localhost` && fs.existsSync(filename)) return route.fulfill({path: filename});
        return route.abort();
      });
      const fallback = await nojs.newPage();
      await fallback.goto(`${base}/article.html`);
      assert.equal(await fallback.locator('body').evaluate(node => getComputedStyle(node).backgroundColor), light);
      assert.equal(await fallback.locator('.chulapa-theme-selector:visible').count(), 0);
      await nojs.close();
      await context.close();
      console.log(`Theme browser passed: ${name}, desktop/mobile, light/dark/auto, persistence, first paint, tabs, keyboard, failure and no-JS fallback`);
    }
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
