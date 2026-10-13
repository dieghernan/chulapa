// Offline browser checks of built templates and the maintained JavaScript assets.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const fixtureRoot = path.resolve(process.argv[2]);
const root = path.resolve(__dirname, '..');
const scripts = new Map([
  ['https://code.jquery.com/jquery-3.5.1.slim.min.js', require.resolve('jquery/dist/jquery.slim.min.js')],
  ['https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', require.resolve('popper.js/dist/umd/popper.min.js')],
  ['https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', require.resolve('bootstrap/dist/js/bootstrap.min.js')],
  ['https://unpkg.com/lunr/lunr.js', require.resolve('lunr/lunr.js')],
  ['https://unpkg.com/lunr/lunr.min.js', require.resolve('lunr/lunr.min.js')],
  ['https://cdn.jsdelivr.net/npm/fuse.js@7.1.0/dist/fuse.min.js', path.join(path.dirname(require.resolve('fuse.js')), 'fuse.min.js')]
]);
let current;
const server = http.createServer((request, response) => {
  const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(/^\/project(?=\/)/, '');
  const file = path.resolve(current, '.' + pathname);
  if (!file.startsWith(current + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { response.writeHead(404); response.end(); return; }
  const types = {'.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.xml': 'application/xml', '.svg': 'image/svg+xml', '.otf': 'font/otf'};
  response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
  response.end(fs.readFileSync(file));
});
(async () => {
  await new Promise(resolve => server.listen(8770, '127.0.0.1', resolve));
  const browser = await chromium.launch({headless: true, ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE} : {})});
  try {
    for (const engine of ['lunr', 'fusejs']) for (const prefix of ['', '/project']) {
      current = path.join(fixtureRoot, `${prefix ? 'subdir' : 'root'}-${engine}`);
      const page = await browser.newPage();
      console.log(`Checking ${engine} at ${prefix || '/'}`);
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', route => {
        const url = route.request().url();
        if (url.startsWith('http://127.0.0.1:8770')) return route.continue();
        if (!scripts.has(url)) return route.abort();
        let body = fs.readFileSync(scripts.get(url), 'utf8');
        if (url.includes('/lunr.min.js')) body += '\nwindow.indexBuilds=0;const originalLunr=lunr;lunr=Object.assign(function(fn){window.indexBuilds++;return originalLunr(fn)},originalLunr);';
        return route.fulfill({contentType: 'text/javascript', body});
      });
      await page.goto(`http://127.0.0.1:8770${prefix}/search.html`);
      assert.deepEqual(errors, [], `Initialization errors for ${engine}`);
      await page.click('#navi-toggle');
      assert.equal(await page.locator('#navi-toggle').getAttribute('aria-expanded'), 'true');
      await page.waitForFunction(() => document.getElementById('navi-menu').contains(document.activeElement), null, {timeout: 5000});
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('#navi-toggle').getAttribute('aria-expanded'), 'false');
      await page.waitForFunction(() => getComputedStyle(document.getElementById('navi-menu')).visibility === 'hidden');
      await page.fill('#search', 'alpha');
      await page.waitForSelector('#results article');
      assert.ok(await page.locator('#results span.bg-warning').count());
      assert.equal(await page.locator('#results article h2.h5').count(), await page.locator('#results article').count());
      assert.equal(await page.locator('#resultscount').getAttribute('role'), 'status');
      assert.match(await page.locator('#resultscount').textContent(), /^\d+ results? found$/);
      assert.equal(await page.locator('#results .col-4 a').first().getAttribute('aria-label'), 'Alpha article 0');
      for (const width of [320, 390, 1280]) {
        await page.setViewportSize({width, height: 844});
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `${engine}: search overflow at ${width}`);
      }
      if (engine === 'fusejs' && !prefix) await page.screenshot({path: path.join(fixtureRoot, 'search-1280.png')});
      assert.ok((await page.locator('#results a').first().getAttribute('href')).includes(prefix + '/2024/'));
      await page.fill('#search', 'beta');
      await page.press('#search', 'Enter');
      await page.waitForFunction(() => document.querySelector('#results').textContent.includes('beta'));
      if (engine === 'lunr') assert.equal(await page.evaluate(() => window.indexBuilds), 1);
      await page.fill('#search', 'alpha');
      await page.fill('#search', '');
      await page.waitForTimeout(200);
      assert.equal(await page.locator('#results').textContent(), '');
      assert.equal(await page.locator('#resultscount').textContent(), '');
      await page.fill('#search', 'zzzzzzzzzzzzzzzzzzzz');
      await page.press('#search', 'Enter');
      assert.equal(await page.locator('#resultscount').textContent(), '0 results found');
      assert.equal(await page.locator('#results p.h6').textContent(), 'No results found');
      assert.equal(await page.locator('#results h1, #results h2, #results h3, #results h4, #results h5, #results h6').count(), 0);
      assert.deepEqual(errors, []);
      // Exercise the same shared code with the readable entry point as well.
      await page.route(`**/${engine}-search.min.js`, route => route.fulfill({contentType: 'text/javascript', body: fs.readFileSync(path.join(root, `assets/js/${engine}/${engine}-search.js`), 'utf8').replace(/^---[\s\S]*?---\s*/, '')}));
      await page.goto(`http://127.0.0.1:8770${prefix}/search.html`);
      await page.fill('#search', 'alpha');
      await page.waitForSelector('#results article');
      assert.ok(await page.locator('#results span.bg-warning').count());
      // Validate the optional simple-search template using its captured SDK options.
      await page.addInitScript(() => { window.SimpleJekyllSearch = options => { window.simpleSearchOptions = options; }; });
      await page.goto(`http://127.0.0.1:8770${prefix}/simple-search.html`);
      await page.evaluate(() => {
        document.getElementById('results-container').innerHTML = window.simpleSearchOptions.searchResultTemplate
          .replaceAll('{url}', '/example.html').replaceAll('{title}', 'Example title')
          .replaceAll('{excerpt}', 'Example excerpt').replaceAll('{img}', ':url(/preview.svg)');
      });
      assert.equal(await page.getByRole('search').count(), 1);
      assert.equal(await page.locator('#results-container article h2.h5').textContent(), 'Example title');
      const previewLink = page.locator('#results-container .col-4 > a');
      assert.equal(await previewLink.count(), 1);
      assert.equal(await previewLink.textContent(), 'Example title');
      assert.equal(await previewLink.locator('.chulapa-overlay-img').count(), 1);
      // Copy the maintained documentation pages, not synthetic substitutes.
      for (const demo of ['lunr', 'fusejs']) {
        await page.goto(`http://127.0.0.1:8770${prefix}/demo/search_${demo}.html`);
        await page.fill('#search', 'alpha');
        await page.press('#search', 'Enter');
        await page.waitForSelector('#results article');
        assert.ok((await page.locator('#results').textContent()).includes('Alpha article 0'));
        await page.click('#navi-toggle');
        assert.equal(await page.locator('#navi-toggle').getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.deepEqual(errors, [], `Documentation demo ${demo}, site provider ${engine}`);
      }
      if (engine === 'lunr') {
        await page.goto(`http://127.0.0.1:8770${prefix}/404.html`);
        await page.fill('#search', 'alpha');
        await page.press('#search', 'Enter');
        await page.waitForSelector('#results article');
        assert.ok((await page.locator('#results').textContent()).includes('Alpha article 0'));
        assert.deepEqual(errors, [], 'Lunr-enabled documentation 404');
      }
      await page.close();
    }
    current = path.join(fixtureRoot, 'root-fusejs');
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    // Block all CDNs: native copying and video activation must still work.
    const external = [];
    await page.route('**/*', route => {
      if (route.request().url().startsWith('http://127.0.0.1:8770')) return route.continue();
      external.push(route.request().url());
      return route.abort();
    });
    await page.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {value: {writeText: async text => {window.copied = text;}}}));
    await page.goto('http://127.0.0.1:8770/video.html');
    await page.click('.btn-chulapa-copy-code');
    assert.equal(await page.evaluate(() => window.copied.trim()), "puts 'hello'");
    assert.equal(await page.locator('.btn-chulapa-copy-code').getAttribute('aria-label'), 'Copied!');
    assert.equal(await page.locator('iframe').count(), 0);
    assert.ok(!external.some(url => url.includes('player_api') || url.includes('iframe_api')));
    await page.locator('.ch_ytdefer_btn').first().focus();
    await page.keyboard.press('Enter');
    await page.waitForSelector('iframe');
    assert.equal(await page.locator('iframe').getAttribute('src'), 'https://www.youtube-nocookie.com/embed/first-video?autoplay=1');
    assert.equal(await page.locator('iframe').getAttribute('title'), 'First video');
    await page.locator('.ch_ytdefer').first().dispatchEvent('click');
    assert.equal(await page.locator('iframe').count(), 1);
    assert.deepEqual(errors, []);
    // The legacy clipboard entry point must reuse existing buttons and handle code outside main.
    await page.evaluate(() => { const pre = document.createElement('pre'); pre.innerHTML = '<code>outside main</code>'; document.body.append(pre); });
    await page.addScriptTag({url: 'http://127.0.0.1:8770/assets/js/clipboard/chulapa_clipboard.js'});
    assert.equal(await page.locator('.btn-chulapa-copy-code').count(), 2);
    assert.equal(await page.locator('[id^="clipboard_btn"]').evaluateAll(nodes => new Set(nodes.map(n => n.id)).size), 2);
    await page.locator('.btn-chulapa-copy-code').last().click();
    assert.equal(await page.evaluate(() => window.copied), 'outside main');
    // Standalone legacy includes also work without a theme script or content wrapper.
    const standalone = await browser.newPage();
    await standalone.route('**/standalone.html', route => route.fulfill({contentType: 'text/html', body: '<body id="body"><main id="maincontent"><h2 id="standalone-heading">Heading</h2><pre><code>standalone</code></pre></main></body>'}));
    await standalone.addInitScript(() => Object.defineProperty(navigator, 'clipboard', {value: {writeText: async text => {window.copied = text;}}}));
    await standalone.goto('http://127.0.0.1:8770/standalone.html');
    await standalone.addScriptTag({url: 'http://127.0.0.1:8770/assets/js/clipboard/chulapa_clipboard.js'});
    await standalone.waitForSelector('.btn-chulapa-copy-code');
    await standalone.locator('.btn-chulapa-copy-code').click();
    assert.equal(await standalone.evaluate(() => window.copied), 'standalone');
    assert.equal(await standalone.locator('.chulapa-header-link').count(), 0, 'Legacy entry point only initializes clipboard behavior');
    await standalone.close();
    // Normalize positions for both engines; preserve HTML attributes and entities.
    await page.addScriptTag({url: 'http://127.0.0.1:8770/assets/js/chulapa_search.js'});
    const highlights = await page.evaluate(() => {
      const highlight = (value, indices, lengths) => ChulapaSearch.highlight([{item: {title: value}, matches: [{key: 'title', value, indices}]}], 'mark', 2, lengths)[0].title;
      return [highlight('ab', [[0, 1]], false), highlight('ab', [[0, 2]], true), highlight('<b class="ab">ab</b>', [[10, 11], [14, 15]], false), highlight('&amp;', [[1, 3]], false), ChulapaSearch.highlight([{item: {title: 'Metadata-only match'}, matches: []}], 'mark', 2, true)[0].title];
    });
    assert.equal(highlights[0], '<span class="mark">ab</span>');
    assert.equal(highlights[1], highlights[0]);
    assert.equal(highlights[2], '<b class="ab"><span class="mark">ab</span></b>');
    assert.equal(highlights[3], '&amp;');
    assert.equal(highlights[4], 'Metadata-only match');
    // Cusdis must ignore other senders and invalid resize values.
    await page.evaluate(() => { const thread = document.createElement('div'); thread.id = 'cusdis_thread'; document.body.append(thread); });
    await page.addScriptTag({url: 'http://127.0.0.1:8770/assets/js/cusdis/chulapa_cusdis.js'});
    const sizes = await page.evaluate(() => {
      const frame = document.querySelector('#cusdis_thread iframe');
      function send(source, data) { window.dispatchEvent(new MessageEvent('message', {source, data: JSON.stringify({from: 'cusdis', event: 'resize', data})})); return frame.style.height; }
      return [send(window, 9999), send(frame.contentWindow, '9999'), send(frame.contentWindow, -5), send(frame.contentWindow, 300)];
    });
    assert.deepEqual(sizes, ['', '', '', '300px']);
    assert.deepEqual(errors, []);
    const noJS = await browser.newContext({javaScriptEnabled: false});
    const noJSPage = await noJS.newPage();
    await noJSPage.route('https://**/*', route => route.abort());
    await noJSPage.goto('http://127.0.0.1:8770/video.html');
    assert.equal(await noJSPage.locator('noscript a[href^="https://www.youtube.com/watch"]').count(), 2);
    assert.equal(await noJSPage.locator('iframe').count(), 0);
    await noJS.close();
    // Bad or unavailable sitemaps retain a valid home link including baseurl.
    await page.close();
    current = path.join(fixtureRoot, 'subdir-fusejs');
    const missing = await browser.newPage();
    await missing.route('**/sitemap.xml', route => route.fulfill({contentType: 'application/xml', body: '<urlset></urlset>'}));
    await missing.route('https://**/*', route => route.abort());
    await missing.goto('http://127.0.0.1:8770/project/404.html');
    await missing.waitForSelector('#four-oh-four-suggestion a');
    assert.equal(await missing.locator('#four-oh-four-suggestion a').getAttribute('href'), 'http://127.0.0.1:8770/project/');
    await missing.unroute('**/sitemap.xml');
    await missing.route('**/sitemap.xml', route => route.abort());
    await missing.reload();
    await missing.waitForSelector('#four-oh-four-suggestion a');
    assert.equal(await missing.locator('#four-oh-four-suggestion a').getAttribute('href'), 'http://127.0.0.1:8770/project/');
    await missing.close();
    console.log('JavaScript browser regressions passed: search engines, clipboard, YouTube, Cusdis and 404 fallbacks.');
  } finally { await browser.close(); server.close(); }
})().catch(error => {server.close(); console.error(error); process.exitCode = 1;});
