// Run after check_theme_selector.rb. All faults come from a real local server;
// no request interception and no third-party network access are needed.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const directory = path.resolve(process.argv[2], 'classic-links');
const dependencies = new Map([
  ['https://code.jquery.com/jquery-3.5.1.slim.min.js', require.resolve('jquery/dist/jquery.slim.min.js')],
  ['https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', require.resolve('popper.js/dist/umd/popper.min.js')],
  ['https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', require.resolve('bootstrap/dist/js/bootstrap.min.js')]
]);
let fault;
let requests = [];
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const send = (status, type, body) => {
    requests.push({path: url.pathname, status});
    res.writeHead(status, {'content-type': type, 'cache-control': 'no-store'});
    res.end(body);
  };
  if (url.pathname === '/fonts.css') {
    if (fault === 'fonts-disconnect') {
      requests.push({path: url.pathname, status: 'disconnect'});
      req.socket.destroy();
      return;
    }
    if (fault === 'fonts-css') return send(404, 'text/css', 'Missing fonts');
    const css = fault === 'empty' ? '' : '@font-face{font-family:Inter;src:url(/font.otf);font-display:swap}';
    return send(200, 'text/css', css);
  }
  if (url.pathname === '/font.otf') {
    if (fault === 'font-file') return send(404, 'font/otf', 'Missing font');
    return send(200, 'font/otf', fs.readFileSync(path.join(directory, 'project/assets/fonts/Chulapa/Chulapa-Bold_vmod.otf')));
  }
  const dependency = url.pathname.match(/^\/dependency-(\d+)\.js$/);
  if (dependency) return send(200, 'application/javascript', fs.readFileSync([...dependencies.values()][Number(dependency[1])]));
  if ((fault === 'main' && url.pathname.endsWith('/dark/main.css')) ||
      (fault === 'highlighter' && url.pathname.endsWith('/highlighterdark.css'))) return send(404, 'text/css', 'Missing essential CSS');
  const filename = path.resolve(directory, `.${url.pathname}`);
  if (!filename.startsWith(directory + path.sep) || !fs.existsSync(filename) || !fs.statSync(filename).isFile()) return send(404, 'text/plain', 'Missing');
  let body = fs.readFileSync(filename);
  if (filename.endsWith('.html')) {
    body = body.toString().replace(/https:\/\/fonts\.googleapis\.com\/[^"\s]+/g, '/fonts.css');
    [...dependencies.keys()].forEach((url, index) => { body = body.replaceAll(url, `/dependency-${index}.js`); });
    // Font Awesome and other unrelated integrations are not part of this test.
    body = body.replace(/<link\b[^>]*href="https?:\/\/[^\"]+"[^>]*>/g, '');
    return send(200, 'text/html', body);
  }
  return send(200, filename.endsWith('.css') ? 'text/css' : 'application/octet-stream', body);
});

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/project`;
  const browser = await chromium.launch({headless: true,
    ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE} : {})});
  try {
    for (const scenario of ['available', 'fonts-css', 'fonts-disconnect', 'font-file', 'empty', 'main', 'highlighter']) {
      for (const flow of ['interactive', 'reload', 'auto-change', 'auto-start']) {
        fault = scenario;
        requests = [];
        const automatic = flow.startsWith('auto');
        const context = await browser.newContext({colorScheme: flow === 'auto-start' ? 'dark' : 'light', reducedMotion: 'reduce', serviceWorkers: 'block'});
        await context.addInitScript(() => {
          window.linkEvents = [];
          window.schemeChanges = 0;
          window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => window.schemeChanges++);
          for (const type of ['load', 'error']) document.addEventListener(type, event => {
            if (event.target.tagName === 'LINK') window.linkEvents.push({type, href: event.target.href});
          }, true);
        });
        const page = await context.newPage();
        const choose = async mode => {
          await page.locator('.chulapa-theme-toggle:visible').click();
          await page.locator(`button[data-theme-mode="${mode}"]:visible`).click();
        };
        await page.goto(`${base}/article.html`);
        const light = await page.locator('body').evaluate(node => getComputedStyle(node).backgroundColor);
        if (flow === 'reload' || flow === 'auto-start') {
          await page.evaluate(mode => localStorage.setItem('chulapa-theme', mode), automatic ? 'auto' : 'dark');
          await page.reload();
        } else if (automatic) {
          await choose('auto');
          const changes = await page.evaluate(() => window.schemeChanges);
          await page.emulateMedia({colorScheme: 'dark'});
          await page.waitForFunction(count => window.schemeChanges > count, changes);
        } else await choose('dark');
        const essentialFailure = scenario === 'main' || scenario === 'highlighter';
        if (essentialFailure) await page.waitForFunction(() => !document.querySelector('link[media="not all"]') && document.documentElement.dataset.theme === 'light');
        else await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');
        const state = await page.evaluate(() => ({
          theme: document.documentElement.dataset.theme, mode: document.documentElement.dataset.themeMode,
          stored: localStorage.getItem('chulapa-theme'), color: getComputedStyle(document.body).backgroundColor,
          links: ['maincss', 'csshigh'].map(id => document.getElementById(id).getAttribute('href')),
          label: document.querySelector('.chulapa-theme-toggle').getAttribute('aria-label'),
          pressed: [...document.querySelectorAll('[data-theme-mode][aria-pressed=true]')].map(node => node.dataset.themeMode),
          events: window.linkEvents
        }));
        const mode = automatic ? 'auto' : 'dark';
        assert.equal(state.mode, mode);
        assert.equal(state.stored, mode);
        assert.equal(state.label, `Color theme: ${automatic ? 'Auto' : 'Dark'}`);
        assert.deepEqual(state.pressed, [mode]);
        assert.equal(state.color === light, essentialFailure, `${scenario}/${flow}: computed skin`);
        assert.deepEqual(state.links, essentialFailure
          ? ['/project/assets/css/main.css', '/project/assets/css/highlighter.css']
          : ['/project/assets/css/dark/main.css', '/project/assets/css/highlighterdark.css']);
        if (!essentialFailure) assert.ok(!state.events.some(e => e.type === 'error' && /\/(dark\/main|highlighterdark)\.css$/.test(e.href)));
        if (scenario === 'fonts-css' || scenario === 'fonts-disconnect') assert.ok(state.events.some(e => e.type === 'error' && e.href.endsWith('/fonts.css')));
        assert.ok(requests.some(r => r.path === '/fonts.css'), 'Independent fonts requested');
        if (scenario === 'font-file') {
          await page.waitForFunction(() => [...document.fonts].some(font => font.family === 'Inter' && font.status === 'error'));
          assert.ok(requests.some(r => r.path === '/font.otf' && r.status === 404));
        }
        if (scenario === 'available') await page.waitForFunction(() => [...document.fonts].some(font => font.family === 'Inter' && font.status === 'loaded'));
        // Restoring essential CSS must allow retries without losing Auto.
        if (automatic) {
          const changes = await page.evaluate(() => window.schemeChanges);
          await page.emulateMedia({colorScheme: 'light'});
          await page.waitForFunction(count => window.schemeChanges > count, changes);
          await page.waitForFunction(() => document.documentElement.dataset.theme === 'light');
          fault = 'available';
          await page.emulateMedia({colorScheme: 'dark'});
          try { await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark'); }
          catch (error) {
            console.error(scenario, flow, requests, await page.evaluate(() => ({theme: document.documentElement.dataset, events: window.linkEvents, changes: window.schemeChanges})));
            throw error;
          }
          assert.equal(await page.evaluate(() => localStorage.getItem('chulapa-theme')), 'auto');
        }
        console.log(`Skin font isolation passed: ${scenario}/${flow}`);
        await context.close();
      }
    }
  } finally {
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
