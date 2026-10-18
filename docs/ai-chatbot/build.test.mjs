import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, copyFileSync, symlinkSync, writeFileSync, existsSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const directory = fileURLToPath(new URL('.', import.meta.url));
function fixture(context, check) {
  const path = mkdtempSync(join(tmpdir(), 'chulapa-build-'));
  try {
    copyFileSync(join(directory, 'build.mjs'), join(path, 'build.mjs'));
    symlinkSync(join(directory, 'node_modules'), join(path, 'node_modules'),
      process.platform === 'win32' ? 'junction' : 'dir');
    writeFileSync(join(path, 'ai-context.md'), context);
    check(path, () => spawnSync(process.execPath, [join(path, 'build.mjs')], { encoding: 'utf8' }));
  } finally { rmSync(path, { recursive: true, force: true }); }
}

test('oversized UTF-8 context fails before producing deployment artifacts', () => {
  fixture('é'.repeat(26501), (path, run) => {
    const result = run();
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /53002 bytes; limit is 53000/);
    for (const file of ['.build', 'generated-content.mjs', 'dashboard-worker.mjs']) {
      assert.equal(existsSync(join(path, file)), false);
    }
  });
});

test('context at the budget boundary builds without truncation', () => {
  const context = 'é'.repeat(26500);
  fixture(context, (path, run) => {
    writeFileSync(join(path, 'widget.js'), 'window.widgetReady = true;');
    writeFileSync(join(path, 'worker.mjs'), 'export default {};\n');
    const result = run();
    assert.equal(result.status, 0, result.stderr);
    const generated = readFileSync(join(path, 'generated-content.mjs'), 'utf8');
    assert.ok(generated.startsWith(`export const CONTEXT = ${JSON.stringify(context)};\n`));
    assert.ok(existsSync(join(path, 'dashboard-worker.mjs')));
  });
});
