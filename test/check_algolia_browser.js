// Uses the generated assets from build_javascript_fixtures.rb without Algolia requests.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('playwright');

async function main() {
  assert.ok(process.argv[2], 'Usage: node test/check_algolia_browser.js FIXTURE_DIRECTORY');
  const browser = await chromium.launch({headless: true, ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE} : {})});
  try {
    for (const prefix of ['', '/project']) {
      const directory = path.join(process.argv[2], `${prefix ? 'subdir' : 'root'}-lunr`);
      const script = fs.readFileSync(path.join(directory, 'assets/js/algolia/algolia-search.js'), 'utf8');
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', route => route.fulfill({contentType: 'text/html', body: '<main id="hits"></main>'}));
      await page.goto(`http://127.0.0.1:8770${prefix}/search.html`);
      await page.evaluate(() => {
        window.algoliasearch = () => ({search() { throw new Error('Unexpected hosted search request'); }});
        window.instantsearch = () => ({addWidgets() {}, start() {}});
        window.instantsearch.widgets = {searchBox: options => options, hits: options => options};
      });
      await page.addScriptTag({content: script});
      const base = `http://127.0.0.1:8770${prefix}`;
      const html = '<p><em>Highlighted</em> <code>code</code> ' +
        '<a href="#video">Video</a> <a href="./sibling?x=1&amp;y=2#part">Sibling</a> ' +
        '<a href="../index">Parent</a> <a href="?view=full#part">Query</a> ' +
        '<a href="/absolute">Root</a> <a href="https://other.example/page">External</a> ' +
        '<a href="//other.example/page">Protocol relative</a> <a href="mailto:hello@example.com">Email</a> ' +
        '<a href="tel:+123">Phone</a> <a href="">Empty</a></p>';
      for (const source of ['highlight', 'fallback']) for (const image of [undefined, '/image.png']) {
        await page.evaluate(({html, source, image}) => {
          const hit = {url: '/docs/article', title: 'Article', html, header_img: image,
            _highlightResult: {title: {value: 'Article'}}};
          if (source === 'highlight') {
            hit.html = '<p>Unhighlighted fallback</p>';
            hit._highlightResult.html = {value: html};
          }
          document.querySelector('#hits').innerHTML = hitTemplate(hit);
        }, {html, source, image});
        const excerpt = page.locator('#hits .border-left');
        const links = await excerpt.locator('a').evaluateAll(nodes => nodes.map(link => link.getAttribute('href')));
        assert.deepEqual(links, [
          `${base}/docs/article#video`, `${base}/docs/sibling?x=1&y=2#part`, `${base}/index`,
          `${base}/docs/article?view=full#part`, '/absolute', 'https://other.example/page',
          '//other.example/page', 'mailto:hello@example.com', 'tel:+123', ''
        ], `${prefix || '/'}/${source}/${image ? 'image' : 'text'} excerpt links`);
        assert.equal(await excerpt.locator('em').textContent(), 'Highlighted');
        assert.equal(await excerpt.locator('code').textContent(), 'code');
        assert.equal(await page.locator('#hits h5 a').getAttribute('href'), `${base}/docs/article`);
      }
      const externalHref = await page.evaluate(() => parsecontent({
        url: '//other.example/docs/article', html: '<p><a href="#part">Section</a></p>'
      }));
      assert.ok(externalHref.includes('href="http://other.example/docs/article#part"'));
      await page.getByRole('link', {name: 'Video', exact: true}).focus();
      await Promise.all([page.waitForURL(`${base}/docs/article#video`), page.keyboard.press('Enter')]);
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`Algolia excerpts passed at ${prefix || '/'}: relative links, fragments, highlighting, fallback and keyboard activation.`);
    }
  } finally {
    await browser.close();
  }
}
main().catch(error => {console.error(error); process.exitCode = 1;});
