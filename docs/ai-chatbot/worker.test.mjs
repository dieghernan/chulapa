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

test('bundled deployment includes the complete current reviewed context', async () => {
  const { default: bundled } = await import('./dashboard-worker.mjs');
  const context = readFileSync(new URL('./ai-context.md', import.meta.url), 'utf8');
  const env = environment(async (_, options) => {
    assert.ok(options.messages[0].content.endsWith(context), 'Deployment context is stale or incomplete');
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
