import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { changedPages, normalizeHtml, preparePlan } from './indexnow-changes.mjs';
import { pathToUrl, submitPages } from './indexnow.mjs';

const site = 'https://example.com/chulapa';
const options = { site, key: 'test-key', log() {} };
const source1 = '1'.repeat(40);
const source2 = '2'.repeat(40);
const source3 = '3'.repeat(40);
const repository = 'owner/site';
const page = (date, content = 'Hello') => `<!-- Page build ${date.slice(0, 10)} -->\n<script type="application/ld+json">\n{"datePublished": "${date}", "dateModified": "${date}", "headline": "Guide"}\n</script>\n<main>${content}</main>`;

function fixture(t) {
  const cwd = mkdtempSync(join(tmpdir(), 'chulapa-indexnow-'));
  t.after(() => rmSync(cwd, { recursive: true, force: true }));
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git('init', '-q');
  git('config', 'user.name', 'IndexNow Test');
  git('config', 'user.email', 'indexnow@example.com');
  const commit = (source, files) => {
    for (const [path, content] of Object.entries(files)) {
      if (content === null) rmSync(join(cwd, path));
      else {
        mkdirSync(join(cwd, path, '..'), { recursive: true });
        writeFileSync(join(cwd, path), content);
      }
    }
    git('add', '-A');
    git('commit', '-qm', `Deploying to gh-pages from @ ${repository}@${source}`, '--allow-empty');
    const sha = git('rev-parse', 'HEAD');
    git('update-ref', 'refs/remotes/origin/gh-pages', sha);
    return sha;
  };
  const plan = sourceSha => preparePlan({ sourceSha, repository, cwd });
  const checkpoint = sha => git('update-ref', 'refs/remotes/origin/indexnow-state', sha);
  return { cwd, git, commit, plan, checkpoint };
}

test('only JSON-LD date values and the build comment are ignored', () => {
  assert.equal(normalizeHtml(page('2026-10-27T12:00:00Z')), normalizeHtml(page('2026-10-28T14:00:00Z')));
  const variants = [
    page('2026-10-28T14:00:00Z', 'New content'),
    page('2026-10-28T14:00:00Z').replace('Guide', 'New title'),
    page('2026-10-28T14:00:00Z') + '<link rel="icon" href="new.svg">',
    page('2026-10-28T14:00:00Z') + '<meta name="robots" content="noindex">',
    page('2026-10-28T14:00:00Z').replace('<main>', '<main data-date="2026-10-28">'),
  ];
  for (const html of variants) assert.notEqual(normalizeHtml(html), normalizeHtml(page('2026-10-27T12:00:00Z')));
});

test('prose, ordinary scripts, invalid JSON and escaped date names are preserved', () => {
  for (const html of [
    '<p>"dateModified": "2026-10-28"</p>',
    '<script>{"dateModified":"2026-10-28"}</script>',
    '<script type="application/ld+json">{"dateModified":"2026-10-28",}</script>',
    '<script type="application/ld+json">{"description":"\\"dateModified\\": \\"2026-10-28\\""}</script>',
  ]) assert.equal(normalizeHtml(html), html);
  const nested = '<script type=\'application/ld+json\'>{"@graph":[{"dateModified":"today","name":"Visible"}]}</script>';
  assert.match(normalizeHtml(nested), /"dateModified":"\[ignored-date\]"/);
  assert.match(normalizeHtml(nested), /"name":"Visible"/);
});

for (const closingTag of ['</script>', '</SCRIPT >', '</script\t\n bar>', '</script/>']) {
  test(`JSON-LD dates are ignored with closing tag ${JSON.stringify(closingTag)}`, () => {
    const html = `<script type="application/ld+json">{"dateModified":"today"}${closingTag}<p>Visible</p>`;
    const expected = `<script type="application/ld+json">{"dateModified":"[ignored-date]"}${closingTag}<p>Visible</p>`;
    assert.equal(normalizeHtml(html), expected);
  });
}

test('similarly named closing tags do not terminate JSON-LD scripts', () => {
  const html = '<script type="application/ld+json">{"dateModified":"today"}</script-extra></script>';
  assert.equal(normalizeHtml(html), html);
});

test('comparison includes additions, deletions and both sides of renames, but ignores assets and timestamps', t => {
  const f = fixture(t);
  const before = f.commit(source1, { 'index.html': page('2026-10-27'), 'old/index.html': 'Old', 'gone.html': 'Gone', 'stable.html': 'Same', 'image.png': 'old' });
  const after = f.commit(source2, { 'index.html': page('2026-10-28'), 'old/index.html': null, 'new/index.html': 'Old', 'gone.html': null, 'added.html': 'New', 'image.png': 'new' });
  assert.deepEqual(changedPages(before, after, f.cwd), { paths: ['added.html', 'gone.html', 'new/index.html', 'old/index.html'], ignored: 1 });
  assert.equal(readFileSync(join(f.cwd, 'index.html'), 'utf8'), page('2026-10-28'));
});

test('bootstrap compares only the previous deployed version, not the whole site', t => {
  const f = fixture(t);
  const first = f.commit(source1, { 'index.html': page('2026-10-27'), 'stable.html': 'Same' });
  const second = f.commit(source2, { 'index.html': page('2026-10-28'), 'new.html': 'New' });
  assert.deepEqual(f.plan(source2), { sourceSha: source2, target: second, baseline: first, bootstrap: true, skip: false, paths: ['new.html'], ignored: 1 });
});

test('a first-ever deployment includes every HTML page', t => {
  const f = fixture(t);
  f.commit(source1, { 'index.html': 'Home', 'file.txt': 'Asset' });
  const plan = f.plan(source1);
  assert.equal(plan.baseline, null);
  assert.deepEqual(plan.paths, ['index.html']);
});

test('a date-only deployment has no URLs but remains eligible to advance the checkpoint', t => {
  const f = fixture(t);
  const before = f.commit(source1, { 'index.html': page('2026-10-27') });
  f.checkpoint(before);
  const target = f.commit(source2, { 'index.html': page('2026-10-28') });
  const plan = f.plan(source2);
  assert.equal(plan.skip, false);
  assert.equal(plan.target, target);
  assert.equal(plan.ignored, 1);
  assert.deepEqual(plan.paths, []);
});

test('checkpoint catches up across failed or skipped notifications', t => {
  const f = fixture(t);
  const first = f.commit(source1, { 'index.html': 'Home' });
  f.checkpoint(first);
  f.commit(source2, { 'a.html': 'Added during failed notification' });
  const third = f.commit(source3, { 'b.html': 'New' });
  const plan = f.plan(source3);
  assert.equal(plan.baseline, first);
  assert.equal(plan.target, third);
  assert.deepEqual(plan.paths, ['a.html', 'b.html']);
  assert.equal(f.git('rev-parse', 'refs/remotes/origin/indexnow-state'), first);
});

test('target is the triggering deployment even when gh-pages has newer commits', t => {
  const f = fixture(t);
  const first = f.commit(source1, { 'index.html': 'Home' });
  f.checkpoint(first);
  const second = f.commit(source2, { 'a.html': 'A' });
  f.commit(source3, { 'b.html': 'B' });
  assert.equal(f.plan(source2).target, second);
  assert.deepEqual(f.plan(source2).paths, ['a.html']);
});

test('handled and older deployments never move state backward', t => {
  const f = fixture(t);
  f.commit(source1, { 'index.html': 'Home' });
  const second = f.commit(source2, { 'new.html': 'New' });
  f.checkpoint(second);
  for (const source of [source1, source2]) {
    assert.equal(f.plan(source).skip, true);
    assert.deepEqual(f.plan(source).paths, []);
  }
});

test('missing mirror and divergent checkpoint fail instead of submitting stale URLs', t => {
  const f = fixture(t);
  f.commit(source1, { 'index.html': 'Home' });
  assert.throws(() => f.plan(source2), /No gh-pages commit matches/);
  f.git('checkout', '--orphan', 'unrelated');
  f.git('rm', '-rf', '.');
  f.git('commit', '--allow-empty', '-qm', 'Unrelated history');
  f.checkpoint(f.git('rev-parse', 'HEAD'));
  assert.throws(() => f.plan(source1), /histories diverge/);
});

test('URL mapping retains baseurl, directory canonicals, deleted paths and encoded names', () => {
  assert.equal(pathToUrl('index.html', site), `${site}/`);
  assert.equal(pathToUrl('docs/index.html', site), `${site}/docs/`);
  assert.equal(pathToUrl('docs\\guide.html', site), `${site}/docs/guide.html`);
  assert.equal(pathToUrl('niño #1.html', site), `${site}/ni%C3%B1o%20%231.html`);
  assert.equal(pathToUrl('asset.png', site), null);
  assert.throws(() => pathToUrl('../outside.html', site), /Invalid published path/);
});

test('dry run and empty lists make no requests', async () => {
  const fetchImpl = () => assert.fail('No request expected');
  assert.deepEqual(await submitPages(['index.html', 'index.html'], { ...options, dryRun: true, fetchImpl }), [`${site}/`]);
  assert.deepEqual(await submitPages([], { ...options, fetchImpl }), []);
});

test('submission batches at 10000, deduplicates and uses the project key location', async () => {
  const requests = [];
  const paths = Array.from({ length: 10001 }, (_, i) => `page-${i}.html`);
  await submitPages([...paths, paths[0]], { ...options, fetchImpl: async (url, init) => {
    assert.equal(url, 'https://api.indexnow.org/indexnow');
    assert.equal(init.method, 'POST');
    requests.push(JSON.parse(init.body));
    return { status: requests.length === 1 ? 200 : 202 };
  } });
  assert.deepEqual(requests.map(request => request.urlList.length), [10000, 1]);
  assert.equal(requests[0].host, 'example.com');
  assert.equal(requests[0].keyLocation, `${site}/test-key.txt`);
});

test('rejection or network failure propagates, preventing the workflow checkpoint step', async () => {
  await assert.rejects(submitPages(['index.html'], { ...options, fetchImpl: async () => ({ status: 429, text: async () => 'Retry later' }) }), /429.*Retry later/);
  await assert.rejects(submitPages(['index.html'], { ...options, fetchImpl: async () => { throw new Error('Network failure'); } }), /Network failure/);
});
