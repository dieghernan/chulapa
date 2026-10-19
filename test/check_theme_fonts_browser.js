// Real HTTP assets and faults. Only Google font responses are intercepted;
// a second pass uses a local CONNECT proxy to fail fonts with no interception.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const selectorDirectory = path.resolve(process.argv[2], 'classic-links');
const skinDirectory = path.resolve(process.argv[3]);
const dependencies = new Map([
  ['https://code.jquery.com/jquery-3.5.1.slim.min.js', require.resolve('jquery/dist/jquery.slim.min.js')],
  ['https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js', require.resolve('popper.js/dist/umd/popper.min.js')],
  ['https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js', require.resolve('bootstrap/dist/js/bootstrap.min.js')]
]);
let fault;
let requests = [];
let origin;
const pendingMain = [];
const server = http.createServer((req, res) => {
  const url = new URL(req.url, origin);
  const send = (status, type, body, headers = {}) => {
    requests.push({path: url.pathname, status});
    res.writeHead(status, {'content-type': type, 'cache-control': 'no-store', ...headers});
    res.end(body);
  };
  if (url.pathname === '/font.otf') return send(fault === 'font-file' ? 404 : 200, 'font/otf',
    fs.readFileSync(path.join(selectorDirectory, 'project/assets/fonts/Chulapa/Chulapa-Bold_vmod.otf')));
  const dependency = url.pathname.match(/^\/dependency-(\d+)\.js$/);
  if (dependency) return send(200, 'application/javascript', fs.readFileSync([...dependencies.values()][Number(dependency[1])]));
  const main = url.pathname.endsWith('/dark/main.css');
  const highlighter = url.pathname.endsWith('/highlighterdark.css');
  if ((fault === 'main' && main) || (fault === 'highlighter' && highlighter)) return send(404, 'text/css', 'Missing essential CSS');
  if (fault === 'foreign' && main) return send(302, 'text/plain', '', {location: origin.replace('127.0.0.1', 'localhost') + '/foreign-main.css'});
  const directory = url.pathname.startsWith('/project/') || url.pathname === '/foreign-main.css' ? selectorDirectory : skinDirectory;
  const relative = url.pathname === '/foreign-main.css' ? '/project/assets/css/dark/main.css' : url.pathname;
  // Per-skin fixtures are built with their own baseurl, without nesting it twice.
  const filename = path.resolve(directory, `.${relative}`);
  if (!filename.startsWith(directory + path.sep) || !fs.existsSync(filename) || !fs.statSync(filename).isFile()) return send(404, 'text/plain', 'Missing');
  let body = fs.readFileSync(filename);
  if (!filename.endsWith('.html') && !filename.endsWith('.css')) {
    const type = filename.endsWith('.js') ? 'application/javascript' : filename.endsWith('.otf') ? 'font/otf' : 'application/octet-stream';
    return send(200, type, body);
  }
  body = body.toString();
  if (filename.endsWith('.html')) {
    body = body.replaceAll('http://catalog.localhost', origin);
    [...dependencies.keys()].forEach((url, index) => { body = body.replaceAll(url, `/dependency-${index}.js`); });
    return send(200, 'text/html', body);
  }
  if (main) {
    if (fault === 'main-empty') body = '';
    if (fault === 'main-truncated') body = body.replace(/:root\s*\{\s*--chulapa-css-ready:[^}]+\}/, '');
    if (fault === 'main-wrong') body = body.replace('main-dark', 'main-light');
    if (fault === 'marker-only') body = ':root { --chulapa-css-ready: main-dark; }';
    if (fault === 'unknown-import') body = body.replace(/@import\s+url\([^)]*\);/, '@import url("/essential.css");');
    if (fault === 'mixed-import') body = body.replace(/@import\s+url/, '@import url("/essential.css");\n@import url');
    if (fault === 'lookalike-host') body = body.replace('https://fonts.googleapis.com/', 'https://fonts.googleapis.com.evil.invalid/');
  }
  if (highlighter && fault === 'highlighter-empty') body = '';
  if (main && (fault === 'late-error' || fault === 'late-success')) {
    const missing = fault === 'late-error';
    pendingMain.push(() => send(missing ? 404 : 200, 'text/css', missing ? '' : body));
    return;
  }
  return send(200, filename.endsWith('.css') || url.pathname === '/foreign-main.css' ? 'text/css' : 'application/octet-stream', body);
});
// The proxy never forwards anything to the Internet, including CONNECT.
const proxy = http.createServer((req, res) => { res.writeHead(502); res.end(); });
proxy.on('connect', (req, socket) => {
  requests.push({connect: req.url, status: 502});
  socket.end('HTTP/1.1 502 Bad Gateway\r\nContent-Length: 0\r\n\r\n');
});
const init = () => {
  window.linkEvents = [];
  window.schemeChanges = 0;
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => window.schemeChanges++);
  for (const type of ['load', 'error']) document.addEventListener(type, event => {
    if (event.target.tagName === 'LINK') window.linkEvents.push({type, href: event.target.href});
  }, true);
};
const snapshot = () => ({
  theme: document.documentElement.dataset.theme, mode: document.documentElement.dataset.themeMode,
  stored: localStorage.getItem('chulapa-theme'), color: getComputedStyle(document.body).backgroundColor,
  links: ['maincss', 'csshigh'].map(id => document.getElementById(id).getAttribute('href')),
  label: document.querySelector('.chulapa-theme-toggle').getAttribute('aria-label'),
  pressed: [...document.querySelectorAll('[data-theme-mode][aria-pressed=true]')].map(node => node.dataset.themeMode),
  events: window.linkEvents
});
async function contextFor(browser, intercepted, colorScheme = 'light') {
  const context = await browser.newContext({colorScheme, reducedMotion: 'reduce', serviceWorkers: 'block'});
  await context.addInitScript(init);
  if (intercepted) await context.route('**/*', route => {
    const url = new URL(route.request().url());
    if (url.origin === 'https://fonts.googleapis.com') {
      requests.push({font: url.href, status: fault === 'fonts-css' ? 404 : fault === 'fonts-disconnect' ? 'aborted' : 200});
      if (fault === 'fonts-disconnect') return route.abort();
      if (fault === 'fonts-css') return route.fulfill({status: 404, contentType: 'text/css', body: ''});
      const css = fault === 'empty' ? '' : url.searchParams.getAll('family').flatMap(value => value.split('|')).map(value => value.split(':')[0]).map(f => `@font-face{font-family:"${f}";src:url(${origin}/font.otf);font-display:swap}`).join('');
      return route.fulfill({contentType: 'text/css', body: css});
    }
    if (['127.0.0.1', 'localhost'].includes(url.hostname)) return route.continue();
    return route.abort();
  });
  return context;
}
async function scheme(page, value) {
  const changes = await page.evaluate(() => window.schemeChanges);
  await page.emulateMedia({colorScheme: value});
  await page.waitForFunction(count => window.schemeChanges > count, changes);
}
async function select(page, mode) { await page.locator(`[data-theme-mode="${mode}"]`).first().dispatchEvent('click'); }
async function settle(page, target) {
  await page.waitForFunction(value => document.documentElement.dataset.theme === value && !document.querySelector('link[media="not all"]'), target);
}
async function attempt(page, flow) {
  if (flow === 'reload' || flow === 'auto-start') {
    await page.evaluate(mode => localStorage.setItem('chulapa-theme', mode), flow === 'reload' ? 'dark' : 'auto');
    await page.reload();
  } else if (flow === 'auto-change') { await select(page, 'auto'); await scheme(page, 'dark'); }
  else await select(page, 'dark');
  await page.waitForFunction(() => window.linkEvents.some(event => /\/(dark\/main|highlighterdark)\.css$/.test(event.href)));
}
async function matrix(browser, intercepted) {
  const scenarios = intercepted ? ['available', 'fonts-css', 'fonts-disconnect', 'font-file', 'empty', 'main', 'highlighter',
    'main-empty', 'main-truncated', 'main-wrong', 'marker-only', 'unknown-import', 'mixed-import', 'lookalike-host', 'foreign', 'highlighter-empty'] : ['fonts-disconnect'];
  for (const scenario of scenarios) for (const flow of ['interactive', 'reload', 'auto-change', 'auto-start']) {
    fault = scenario;
    requests = [];
    const automatic = flow.startsWith('auto');
    const context = await contextFor(browser, intercepted, flow === 'auto-start' ? 'dark' : 'light');
    const page = await context.newPage();
    await page.goto(`${origin}/project/article.html`);
    const light = await page.locator('body').evaluate(node => getComputedStyle(node).backgroundColor);
    await attempt(page, flow);
    const essentialFailure = !['available', 'fonts-css', 'fonts-disconnect', 'font-file', 'empty'].includes(scenario);
    await settle(page, essentialFailure ? 'light' : 'dark');
    const state = await page.evaluate(snapshot);
    const mode = automatic ? 'auto' : 'dark';
    assert.equal(state.mode, mode);
    assert.equal(state.stored, mode);
    assert.equal(state.label, `Color theme: ${automatic ? 'Auto' : 'Dark'}`);
    assert.deepEqual(state.pressed, [mode]);
    assert.equal(state.color === light, essentialFailure, `${scenario}/${flow}: computed skin`);
    assert.deepEqual(state.links, essentialFailure
      ? ['/project/assets/css/main.css', '/project/assets/css/highlighter.css']
      : ['/project/assets/css/dark/main.css', '/project/assets/css/highlighterdark.css']);
    if (scenario === 'fonts-css' || scenario === 'fonts-disconnect') assert.ok(state.events.some(e => e.type === 'error' && e.href.endsWith('/dark/main.css')));
    if (scenario === 'font-file') await page.waitForFunction(() => [...document.fonts].some(font => font.family === 'Inter' && font.status === 'error'));
    if (scenario === 'available') await page.waitForFunction(() => [...document.fonts].some(font => font.family === 'Inter' && font.status === 'loaded'));
    if (!intercepted) assert.ok(requests.some(r => r.connect === 'fonts.googleapis.com:443'));
    if (automatic) {
      await scheme(page, 'light'); await settle(page, 'light');
      fault = 'available';
      await scheme(page, 'dark'); await settle(page, 'dark');
      assert.equal(await page.evaluate(() => localStorage.getItem('chulapa-theme')), 'auto');
    } else if (!essentialFailure) {
      await select(page, 'light'); await settle(page, 'light');
    }
    console.log(`Theme font recovery passed: ${intercepted ? 'font-route' : 'real-proxy'}/${scenario}/${flow}`);
    await context.close();
  }
}
async function sweep(browser) {
  const skins = JSON.parse(fs.readFileSync(path.join(skinDirectory, 'skins.json')));
  fault = 'fonts-disconnect';
  for (const skin of skins) for (const flow of ['interactive', 'reload', 'auto-change', 'auto-start']) {
    const context = await contextFor(browser, false, flow === 'auto-start' ? 'dark' : 'light');
    const page = await context.newPage();
    await page.goto(`${origin}/${skin}/index.html`);
    await attempt(page, flow);
    await settle(page, 'dark');
    assert.equal(await page.locator('#maincss').getAttribute('href'), `/${skin}/assets/css/dark/main.css`);
    assert.equal(await page.evaluate(() => localStorage.getItem('chulapa-theme')), flow.startsWith('auto') ? 'auto' : 'dark');
    console.log(`Skin font recovery passed: ${skin}/${flow}`);
    await context.close();
  }
}
async function catalog(browser) {
  fault = 'available';
  for (const skin of ['gitdev', 'gitdev-dark']) {
    const context = await contextFor(browser, true);
    const page = await context.newPage();
    await page.goto(`${origin}/catalog/skins/${skin}.html`);
    await page.waitForFunction(() => [...document.fonts].some(font => font.family === 'Inter Tight' && font.status === 'loaded'));
    assert.ok((await page.locator('#maincss').getAttribute('href')).endsWith(`/assets/css/skins/${skin}.css`));
    console.log(`Standalone preview fonts passed: ${skin}`);
    await context.close();
  }
}
async function races(browser) {
  for (const scenario of ['late-error', 'late-success']) {
    fault = scenario;
    const context = await contextFor(browser, true);
    const page = await context.newPage();
    await page.goto(`${origin}/project/article.html`);
    const requested = page.waitForRequest(request => request.url().endsWith('/dark/main.css'));
    await select(page, 'dark');
    await requested;
    while (!pendingMain.length) await new Promise(resolve => setImmediate(resolve));
    await select(page, 'light');
    pendingMain.splice(0).forEach(release => release());
    await settle(page, 'light');
    assert.equal(await page.evaluate(() => localStorage.getItem('chulapa-theme')), 'light');
    fault = 'available';
    await select(page, 'dark'); await settle(page, 'dark');
    console.log(`Obsolete stylesheet request passed: ${scenario}`);
    await context.close();
  }
}
async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  await new Promise(resolve => proxy.listen(0, '127.0.0.1', resolve));
  origin = `http://127.0.0.1:${server.address().port}`;
  const options = {headless: true, ...(process.env.CHULAPA_BROWSER_EXECUTABLE ? {executablePath: process.env.CHULAPA_BROWSER_EXECUTABLE} : {})};
  const browser = await chromium.launch(options);
  const blocked = await chromium.launch({...options, proxy: {server: `http://127.0.0.1:${proxy.address().port}`, bypass: '127.0.0.1,localhost'}});
  try {
    if (process.argv[4] !== '--race-only') {
      await matrix(browser, true); await matrix(blocked, false);
      if (process.argv[4] !== '--matrix-only') { await sweep(blocked); await catalog(browser); }
    }
    if (process.argv[4] !== '--matrix-only') await races(browser);
  }
  finally {
    await browser.close(); await blocked.close();
    await Promise.all([server, proxy].map(s => new Promise(resolve => s.close(resolve))));
  }
}
main().catch(error => { console.error(error); server.close(); proxy.close(); process.exitCode = 1; });
