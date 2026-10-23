import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createClient, listItems, prepareDocuments, syncDocuments } from './sync-ai-search.mjs';

const page = (text = 'Guide', head = '') => `<html><head>${head}</head><body><nav>Navigation</nav><div class="e-content"><div><p>${text}</p></div></div><footer>Footer</footer></body></html>`;
const core = ['00-start.html', '01-install.html', '04-layouts.html'];

async function fixture(t, extra = {}) {
  const directory = await mkdtemp(join(tmpdir(), 'chulapa-ai-search-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const root = join(directory, 'docs');
  await mkdir(root);
  const pages = Object.fromEntries(core.map(key => [key, page(key)]));
  pages['00-start.html'] = page('Start', '<link rel="canonical" href="https://example.com/chulapa/docs/00-start">');
  Object.assign(pages, extra);
  for (const [key, html] of Object.entries(pages)) await writeFile(join(root, key), html);
  const sitemap = `<urlset>${Object.keys(pages).map(key => `<url><loc>https://example.com/chulapa/docs/${key.replace(/\.html$/, '')}</loc></url>`).join('')}</urlset>`;
  await writeFile(join(directory, 'sitemap.xml'), sitemap);
  return { root, directory };
}

const listing = items => ({ result: items, result_info: { total_count: items.length } });
const item = (key, source_id = 'builtin') => ({ id: `id-${key}`, key, source_id });
const quiet = () => {};

test('dry run validates and cleans a full tree without contacting Cloudflare', async t => {
  const { root } = await fixture(t, {
    'tags.html': '<main>Excluded tags</main>',
    'redirect.html': '<meta http-equiv="refresh" content="0;url=/target">',
    'private.html': '<meta content="noindex, follow" name="robots">'
  });
  const result = await syncDocuments(root, { dryRun: true, cf: () => assert.fail('No network expected'), log: quiet });
  assert.deepEqual(result, { uploaded: 0, deleted: 0, skipped: 2, validated: 3 });
  const { documents } = await prepareDocuments(root);
  assert.match(documents.get('00-start.html'), /<p>Start<\/p>/);
  assert.doesNotMatch(documents.get('00-start.html'), /Navigation|Footer/);
});

test('a malformed later document aborts before any remote request', async t => {
  const { root } = await fixture(t, { 'z-broken.html': '<main>No content wrapper</main>' });
  await assert.rejects(syncDocuments(root, { cf: () => assert.fail('No network expected'), log: quiet }), /e-content.*z-broken/);
});

test('missing core or sitemap-listed pages abort before any remote request', async t => {
  for (const key of ['04-layouts.html', 'other.html']) {
    const { root } = await fixture(t, { 'other.html': page() });
    await rm(join(root, key));
    await assert.rejects(syncDocuments(root, { cf: () => assert.fail('No network expected'), log: quiet }), /Incomplete documentation tree/);
  }
});

test('missing, malformed or unrelated sitemaps are rejected', async t => {
  const { root, directory } = await fixture(t);
  const sitemap = join(directory, 'sitemap.xml');
  await rm(sitemap);
  await assert.rejects(prepareDocuments(root), /ENOENT/);
  for (const content of ['<urlset>', '<urlset><url><loc>https://other.test/docs/a</loc></url></urlset>']) {
    await writeFile(sitemap, content);
    await assert.rejects(prepareDocuments(root), /sitemap|Sitemap/);
  }
});

test('pagination reads all pages instead of stopping at a short page', async () => {
  const requests = [];
  const items = await listItems(async path => {
    requests.push(path);
    return { result: [item(`page-${requests.length}`)], result_info: { total_count: 2 } };
  });
  assert.equal(items.length, 2);
  assert.match(requests[1], /page=2&per_page=50/);
});

test('missing metadata, empty premature pages, duplicate IDs and count changes fail closed', async () => {
  for (const payload of [{ result: [] }, { result: {}, result_info: { total_count: 0 } }, listing([{ key: 'no-id' }])]) {
    await assert.rejects(listItems(async () => payload), /listing|pagination/);
  }
  await assert.rejects(listItems(async () => ({ result: [], result_info: { total_count: 1 } })), /Incomplete/);
  await assert.rejects(listItems(async () => ({ result: [item('same')], result_info: { total_count: 2 } })), /repeated/);
  let count = 1;
  await assert.rejects(listItems(async () => ({ result: [item(String(count))], result_info: { total_count: ++count } })), /count changed/);
});

test('successful uploads preserve cleaned payloads and never delete by default', async t => {
  const { root } = await fixture(t);
  const methods = [];
  const result = await syncDocuments(root, { log: quiet, cf: async (path, options = {}) => {
    methods.push(options.method || 'GET');
    if (!options.method) return listing([item('old.html')]);
    assert.equal(options.method, 'POST');
    const file = options.body.get('file');
    assert.ok(core.includes(file.name));
    const html = await file.text();
    assert.match(html, /<p>(Start|01-install.html|04-layouts.html)<\/p>/);
    assert.doesNotMatch(html, /Navigation|Footer/);
  } });
  assert.deepEqual(result, { uploaded: 3, deleted: 0, skipped: 0 });
  assert.deepEqual(methods, ['GET', 'POST', 'POST', 'POST']);
});

test('pruning follows all uploads and preserves external and legacy ownership', async t => {
  const { root } = await fixture(t);
  const requests = [];
  const result = await syncDocuments(root, { prune: true, log: quiet, cf: async (path, options = {}) => {
    requests.push([path, options.method || 'GET']);
    if (!options.method) return listing([item('old.html'), item('external.html', 'r2:other'), item('legacy.html', null)]);
  } });
  assert.equal(result.deleted, 1);
  assert.deepEqual(requests.slice(1).map(([, method]) => method), ['POST', 'POST', 'POST', 'DELETE']);
  assert.equal(requests.at(-1)[0], '/items/id-old.html');
});

test('a failed upload prevents every stale deletion', async t => {
  const { root } = await fixture(t);
  const requests = [];
  await assert.rejects(syncDocuments(root, { prune: true, log: quiet, cf: async (path, options = {}) => {
    requests.push(options.method || 'GET');
    if (!options.method) return listing([item('old.html')]);
    throw new Error('Upload failed');
  } }), /Upload failed/);
  assert.deepEqual(requests, ['GET', 'POST']);
});

test('409 is explicit without automatic deletion, retries or leaking payloads', async () => {
  const calls = [];
  const client = createClient({ accountId: 'test', apiToken: 'secret', fetchImpl: async (url, options) => {
    calls.push(options.method);
    assert.ok(options.signal instanceof AbortSignal);
    return new Response(JSON.stringify({ errors: [{ message: 'secret server payload' }] }), { status: 409 });
  } });
  await assert.rejects(client('/items', { method: 'POST' }), error => {
    assert.match(error.message, /409.*No automatic deletion/);
    assert.doesNotMatch(error.message, /secret|payload/);
    return true;
  });
  assert.deepEqual(calls, ['POST']);
});

test('network errors and non-JSON responses do not expose credentials', async () => {
  for (const fetchImpl of [async () => { throw new Error('secret transport error'); }, async () => new Response('secret')]) {
    const client = createClient({ accountId: 'test', apiToken: 'secret', fetchImpl });
    await assert.rejects(client('/items'), error => {
      assert.doesNotMatch(error.message, /secret/);
      assert.match(error.message, /failed|invalid JSON/);
      return true;
    });
  }
});

test('CLI dry run works without secrets and rejects unknown options', async t => {
  const { root } = await fixture(t);
  const script = fileURLToPath(new URL('./sync-ai-search.mjs', import.meta.url));
  const options = {
    env: { ...process.env, CLOUDFLARE_ACCOUNT_ID: '', CLOUDFLARE_API_TOKEN: '' },
    encoding: 'utf8', stdio: 'pipe'
  };
  const output = execFileSync(process.execPath, [script, root, '--dry-run'], options);
  assert.match(output, /Validated 3 documents/);
  assert.match(output, /no remote requests/);
  assert.throws(() => execFileSync(process.execPath, [script, root, '--unknown'], options), /Usage:/);
});
