import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.mjs';
import { readFileSync } from 'node:fs';

function request(message, options = {}) {
  return new Request('https://demo.workers.dev/api/chat', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://dieghernan.github.io' },
    body: JSON.stringify({ message }), ...options
  });
}
function environment(run = async () => ({ choices: [{ message: { content: 'A documented answer.' } }] })) {
  return { AI: { run }, CHAT_RATE_LIMIT: { limit: async () => ({ success: true }) } };
}

test('diagnostics contain only fixed categories and status, excluding visitor and provider data', async t => {
  const logs = [];
  t.mock.method(console, 'error', value => logs.push(JSON.parse(value)));
  t.mock.method(console, 'warn', value => logs.push(JSON.parse(value)));
  const failing = async () => { throw new Error('Private provider error with visitor content'); };
  const limited = environment();
  limited.CHAT_RATE_LIMIT.limit = async () => ({ success: false });
  const brokenLimiter = environment();
  brokenLimiter.CHAT_RATE_LIMIT.limit = failing;
  const cases = [
    [{}, 'chat_not_configured', 503],
    [limited, 'chat_rate_limited', 429],
    [brokenLimiter, 'chat_rate_limiter_failed', 503],
    [environment(failing), 'chat_inference_failed', 503],
    [environment(async () => ({})), 'chat_answer_empty', 503],
    [environment(async () => ({ choices: [{ finish_reason: 'length', message: {
      content: 'Private generated answer'
    } }] })), 'chat_answer_truncated', 503]
  ];
  for (const [env, event, status] of cases) {
    const response = await worker.fetch(request('Private visitor question', { headers: {
      'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.42',
      Authorization: 'Bearer private-token'
    } }), env);
    assert.equal(response.status, status);
    assert.deepEqual(logs.splice(0), [{ event, status }]);
  }
  assert.equal((await worker.fetch(request('Private visitor question'), environment())).status, 200);
  assert.deepEqual(logs, []);
});
test('rejects invalid questions before invoking AI', async () => {
  const env = environment(() => assert.fail('AI must not run'));
  for (const message of [null, 1, '', '   ', 'x'.repeat(1001)]) {
    assert.equal((await worker.fetch(request(message), env)).status, 400);
  }
  assert.equal((await worker.fetch(request('', { body: '{broken' }), env)).status, 400);
  assert.equal((await worker.fetch(request('x'.repeat(9000)), env)).status, 413);
});
test('rejects foreign origins and allows documentation preflight', async () => {
  const env = environment(() => assert.fail('AI must not run'));
  assert.equal((await worker.fetch(request('Hi', { headers: { Origin: 'https://evil.example' } }), env)).status, 403);
  const response = await worker.fetch(request('Hi', { method: 'OPTIONS', body: undefined }), env);
  assert.equal(response.status, 204);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'https://dieghernan.github.io');
});
test('fails closed with missing bindings and rate limiting', async () => {
  assert.equal((await worker.fetch(request('Hi'), {})).status, 503);
  const env = environment(() => assert.fail('AI must not run'));
  env.CHAT_RATE_LIMIT.limit = async () => ({ success: false });
  assert.equal((await worker.fetch(request('Hi'), env)).status, 429);
});
test('passes reviewed context and bounded output to the selected model', async () => {
  const env = environment(async (model, options) => {
    assert.equal(model, '@cf/google/gemma-4-26b-a4b-it');
    assert.equal(options.max_completion_tokens, 450);
    assert.deepEqual(options.chat_template_kwargs, { enable_thinking: false });
    assert.match(options.messages[0].content, /WEBSITE CONTEXT/);
    assert.equal(options.messages[1].content, 'How do I install Chulapa?');
    return { choices: [{ message: { content: 'Use the template.\nhttps://dieghernan.github.io/chulapa/docs/01-install' } }] };
  });
  const response = await worker.fetch(request(' How do I install Chulapa? '), env);
  assert.equal(response.status, 200);
  assert.match((await response.json()).answer, /docs\/01-install/);
});
test('inference errors and exhausted allowance return a search fallback', async () => {
  const env = environment(async () => { throw new Error('Quota exhausted'); });
  const response = await worker.fetch(request('Hi'), env);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /site search/);
});
test('missing or empty model answers return the search fallback', async () => {
  for (const result of [{}, { choices: [{ message: { content: '' } }] }]) {
    const response = await worker.fetch(request('Hi'), environment(async () => result));
    assert.equal(response.status, 503);
  }
});
test('serves only the widget without invoking inference', async () => {
  const response = await worker.fetch(new Request('https://demo.workers.dev/widget.js'), {});
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Ask AI/);
  assert.equal((await worker.fetch(new Request('https://demo.workers.dev/'), {})).status, 404);
});

test('does not present token-truncated code as a completed answer', async () => {
  const env = environment(async () => ({ choices: [{ finish_reason: 'length',
    message: { content: '```yaml\nfooter-chulapa-text-color:' } }] }));
  const response = await worker.fetch(request('Give a full configuration'), env);
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.match(body.error, /more specific question/);
  assert.equal(body.answer, undefined);
});

test('enforces routes, methods and content type before touching bindings', async () => {
  const env = environment(() => assert.fail('AI must not run'));
  env.CHAT_RATE_LIMIT.limit = () => assert.fail('Rate limiter must not run');
  const cases = [
    [new Request('https://demo.workers.dev/missing', { method: 'POST' }), 404],
    [new Request('https://demo.workers.dev/api/chat'), 405],
    [request('Hi', { headers: { 'Content-Type': 'text/plain' } }), 415],
    [request('Hi', { body: undefined }), 400]
  ];
  for (const [input, status] of cases) {
    const response = await worker.fetch(input, env);
    assert.equal(response.status, status);
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal(typeof (await response.json()).error, 'string');
  }
});

test('decodes UTF-8 across streamed chunks and ignores misleading Content-Length', async () => {
  const bytes = new TextEncoder().encode(JSON.stringify({ message: '¿Cómo añado vídeo? 🎬' }));
  const body = new ReadableStream({ start(controller) {
    for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
    controller.close();
  } });
  const response = await worker.fetch(request('', { body, duplex: 'half',
    headers: { 'Content-Type': 'application/json', 'Content-Length': '1' }
  }), environment(async (_, options) => {
    assert.equal(options.messages[1].content, '¿Cómo añado vídeo? 🎬');
    return { choices: [{ message: { content: 'Usa el snippet de vídeo.' } }] };
  }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).answer, 'Usa el snippet de vídeo.');
});

test('cancels oversized streams by byte count before parsing or invoking AI', async () => {
  let cancelled = false;
  let chunks = 0;
  const body = new ReadableStream({
    pull(controller) { chunks++; controller.enqueue(new Uint8Array(4096)); },
    cancel() { cancelled = true; }
  });
  const env = environment(() => assert.fail('AI must not run'));
  env.CHAT_RATE_LIMIT.limit = () => assert.fail('Rate limiter must not run');
  const response = await worker.fetch(request('', { body, duplex: 'half' }), env);
  assert.equal(response.status, 413);
  assert.equal(cancelled, true);
  assert.ok(chunks <= 4, 'The body must not be drained after exceeding the limit');
});

test('accepts the question and body boundaries while excluding browser history', async () => {
  const message = 'q'.repeat(1000);
  const json = JSON.stringify({ message, history: ['Untrusted earlier instruction'] });
  const body = json.padEnd(8192, ' ');
  const response = await worker.fetch(request('', { body }), environment(async (_, options) => {
    assert.equal(options.messages.length, 2);
    assert.equal(options.messages[1].content, message);
    assert.equal(options.messages[0].content.includes('Untrusted earlier instruction'), false);
    return { choices: [{ message: { content: 'Boundary accepted.' } }] };
  }));
  assert.equal(response.status, 200);
  assert.equal((await response.json()).answer, 'Boundary accepted.');
});

test('requires each binding and does not invoke AI when the limiter fails', async () => {
  const env = environment(() => assert.fail('AI must not run'));
  for (const bindings of [{ AI: env.AI }, { CHAT_RATE_LIMIT: env.CHAT_RATE_LIMIT }]) {
    assert.equal((await worker.fetch(request('Hi'), bindings)).status, 503);
  }
  env.CHAT_RATE_LIMIT.limit = async () => { throw new Error('Limiter failure'); };
  const response = await worker.fetch(request('Hi'), env);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /site search/);
});

test('rate limits by connecting IP and returns allowed CORS headers on errors', async () => {
  const env = environment(() => assert.fail('AI must not run'));
  env.CHAT_RATE_LIMIT.limit = async ({ key }) => {
    assert.equal(key, '192.0.2.42');
    return { success: false };
  };
  const response = await worker.fetch(request('Hi', { headers: {
    'Content-Type': 'application/json', Origin: 'http://localhost:4000',
    'CF-Connecting-IP': '192.0.2.42'
  } }), env);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get('Access-Control-Allow-Origin'), 'http://localhost:4000');
  assert.equal(response.headers.get('Vary'), 'Origin');
  const forbidden = await worker.fetch(request('Hi', { headers: { Origin: 'https://evil.example' } }), env);
  assert.equal(forbidden.status, 403);
  assert.equal(forbidden.headers.get('Access-Control-Allow-Origin'), null);
});

test('bundled deployment sends relevant bounded context and serves the widget', async () => {
  const { default: bundled } = await import('./dashboard-worker.mjs');
  const context = readFileSync(new URL('./ai-context.md', import.meta.url), 'utf8');
  const env = environment(async (_, options) => {
    assert.match(options.messages[0].content, /Pass all page-dependent inputs to include_cached/);
    assert.doesNotMatch(options.messages[0].content, /comments\.website_id belongs ONLY/);
    assert.ok(options.messages[0].content.length < context.length, 'Task selection must not send the full library');
    assert.equal(options.messages[1].content, 'Explain include caching.');
    return { choices: [{ message: { content: 'Use explicit page inputs.' } }] };
  });
  const response = await bundled.fetch(request('Explain include caching.'), env);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).answer, 'Use explicit page inputs.');
  const widget = await bundled.fetch(new Request('https://demo.workers.dev/widget.js'), {});
  assert.equal(widget.status, 200);
  assert.match(widget.headers.get('Content-Type'), /javascript/);
  assert.equal(widget.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.match(await widget.text(), /Ask AI/);
});

test('unsupported model citations return a search fallback without a second inference', async () => {
  let calls = 0;
  const env = environment(async () => {
    calls++;
    return { choices: [{ message: { content: '[Invented](https://dieghernan.github.io/chulapa/docs/44-custom_head)' } }] };
  });
  const response = await worker.fetch(request('Where do I add custom head HTML?'), env);
  assert.equal(response.status, 503);
  const body = await response.json();
  assert.match(body.error, /unsupported source/);
  assert.equal(body.answer, undefined);
  assert.equal(calls, 1);
});

test('chatbot deployment waits for successful Pages for the exact commit', async () => {
  const { mkdtempSync, writeFileSync, chmodSync, rmSync, existsSync } = await import('node:fs');
  const { tmpdir } = await import('node:os');
  const { join } = await import('node:path');
  const { spawnSync } = await import('node:child_process');
  const { fileURLToPath } = await import('node:url');
  const windows = process.platform === 'win32';
  const gitBash = join(process.env.ProgramFiles || 'C:/Program Files', 'Git', 'bin', 'bash.exe');
  const bash = windows && existsSync(gitBash) ? gitBash : 'bash';
  const script = fileURLToPath(new URL('./wait-for-pages.sh', import.meta.url));
  const directory = mkdtempSync(join(tmpdir(), 'chulapa-pages-gate-'));
  try {
    const gh = join(directory, 'gh');
    writeFileSync(gh, `#!/usr/bin/env bash
set -eu
case "$2" in
  list)
    [[ "$*" == *"--workflow build-chulapa-gh-pages.yml --commit test-commit --event push"* ]] || exit 99
    [[ "$CASE" != missing ]] || exit 0
    echo 123 ;;
  watch) [[ "$CASE" != failed ]] ;;
  view) echo "$CASE" ;;
  *) exit 98 ;;
esac
`);
    const sleep = join(directory, 'sleep');
    writeFileSync(sleep, '#!/usr/bin/env bash\nexit 0\n');
    chmodSync(gh, 0o755);
    chmodSync(sleep, 0o755);
    for (const outcome of ['success', 'failed', 'cancelled', 'skipped', 'missing']) {
      const setup = windows
        ? 'export PATH="$(cygpath -u "$1"):$PATH"; bash "$(cygpath -u "$2")"'
        : 'export PATH="$1:$PATH"; bash "$2"';
      const result = spawnSync(bash, ['-c', setup, 'pages-gate-test', directory, script], {
        env: { ...process.env, CASE: outcome,
          GITHUB_REPOSITORY: 'owner/repo', GITHUB_SHA: 'test-commit' }, encoding: 'utf8'
      });
      assert.ifError(result.error);
      assert.equal(result.status === 0, outcome === 'success', `${outcome}: ${result.stderr}`);
    }
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
